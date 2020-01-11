import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { sampleFetchWrapper } from "../../utils/sample-api";
import { HOST_URL } from "../../utils/constants";

export default function AccountProvider() {
  const {
    query: { provider, code }
  } = useRouter();
  const [authing, setAuthing] = useState(false);

  const authFn = useCallback(async () => {
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
      localStorage.setItem("_TOKEN_", jwt);
      localStorage.setItem("_user_", user);
      // forward
    }
  }, []);

  useEffect(() => {
    if (!code) {
      return;
    }
    (async function() {
      setAuthing(true);
      try {
        await authFn();
      } catch (error) {
        //
      }
      setAuthing(false);
    })();
  }, []);
  return (
    <div>
      <h1>Provider: {provider}</h1>
      <p>{code}</p>
      <p>{authing ? "Authing ..." : "..."}</p>
      <button disabled={authing} onClick={() => authFn()}>
        auth
      </button>
    </div>
  );
}
