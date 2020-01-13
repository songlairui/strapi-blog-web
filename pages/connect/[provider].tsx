import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { sampleFetchWrapper } from "../../utils/sample-api";
import { HOST_URL } from "../../utils/constants";
import jscookies from "js-cookie";

const loginViaProvider = async (provider: string, code: string) => {
  const {
    jwt,
    user
  } = await sampleFetchWrapper(
    `${HOST_URL}/auth/${provider}/callback?code=${code}`,
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
  const { provider, code } = useRouter().query as any;
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
