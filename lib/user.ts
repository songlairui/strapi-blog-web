import { useState, useEffect } from "react";
import jsCookie from "js-cookie";

import { fetcher } from "../utils/sample-api";

function requestMe(token: string, cookie: string) {
  return fetcher.raw(`/users/me`, {
    headers: {
      ...(token ? { authorization: `Bearer ${token}` } : null),
      ...(cookie ? { cookie } : null)
    }
  });
}

// const runner = async (actions: any[]) => {
//   let result;

//   for (let action of actions) {
//     const {
//       getData,
//       condition = (o: any) => !!o,
//       resolve = (o: any) => o,
//       reject = (_: any) => null,
//       isDone = (_: any) => true
//     } = action;
//     const data = await getData();

//     result = (condition(data) ? resolve : reject)(data);

//     if (isDone(data)) {
//       break;
//     }
//   }
//   return result;
// };
// const actions = [
//   {
//     getData: () => (typeof window !== "undefined" ? window.__user : null),
//     isDone: () => false
//   },
//   {
//     getData: () => getUserData(cookie),
//     condition: (res: any) => res.ok,
//     async resolve(res: any) {
//       const json = await res.json();
//       setMe[choice](json);
//       return json;
//     },
//     reject: clearMe[choice],
//     isDone: () => true
//   }
// ];
// return runner(actions);

export async function fetchUser(token = "", cookie = "") {
  // [server-side, client-side]

  const tmp = typeof window !== "undefined" ? window.__user : null;
  if (tmp) {
    return tmp;
  }
  if (!token) {
    return null;
  }
  const res = await requestMe(token, cookie);
  if (!res.ok) {
    if (typeof window !== "undefined") {
      delete window.__user;
    }
    return;
  }

  const json = await res.json();
  if (typeof window !== "undefined") {
    window.__user = json;
  }
  return json;
}

export function useFetchUser({ required } = {} as any) {
  const [loading, setLoading] = useState(
    () => !(typeof window !== "undefined" && window.__user)
  );
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return window.__user || null;
  });

  useEffect(() => {
    if (!loading && user) {
      return;
    }
    setLoading(true);
    let isMounted = true;

    fetchUser().then(user => {
      // Only set the user if the component is still mounted
      if (isMounted) {
        // When the user is not logged in but login is required
        if (required && !user) {
          window.location.href = "/api/login";
          return;
        }
        setUser(user);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return { user, loading };
}

export const logout = () => {
  jsCookie.remove("_token_");
  if (typeof window !== "undefined") {
    delete window.__user;
  }
};
