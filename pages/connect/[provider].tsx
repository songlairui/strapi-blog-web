import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetcher } from "../../utils/sample-api";
import jscookies from "js-cookie";

const loginViaProvider = async (provider: string, code: string) => {
  const { jwt, user } = await fetcher(
    `/auth/${provider}/callback?code=${code}`,
    { method: "GET" }
  );
  console.info("jwt ", jwt, user);
  if (jwt) {
    // Set the user's credentials
    jscookies.set("_token_", jwt, { expires: 7 });
    localStorage.setItem("_user_", JSON.stringify(user || {}));
    window.__user = user;
    // forward
  }
  return { jwt, user };
};

export default function AccountProvider() {
  const { provider, code, push } = useRouter().query as any;
  const [authing, setAuthing] = useState(false);

  useEffect(() => {
    console.info("effecting", code, provider);
    if (!code) {
      return;
    }
    (async function() {
      setAuthing(true);
      try {
        await loginViaProvider(provider, code);
        push("/auth/profile");
      } catch (error) {
        //
      }
      setAuthing(false);
    })();
  }, [code]);

  return (
    <div>
      <h1>Provider: {provider}</h1>
      <p>{code}</p>
      <p>{authing ? "Authing ..." : "..."}</p>
      <button
        disabled={authing || !code}
        onClick={() => loginViaProvider(provider, code)}
      >
        auth
      </button>
    </div>
  );
}
