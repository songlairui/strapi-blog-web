import React from "react";
import { useRouter } from "next/router";
import { HOST_URL } from "../../../utils/constants";

const providers = [
  //   "discord",
  //   "facebook",
  "github"
  //   "google",
  //   "microsoft",
  //   "twitch",
  //   "twitter",
  //   "instagram",
  //   "vk"
]; // To remove a provider from the list just delete it from this array...

export default function AuthLogin() {
  const {
    query: { id }
  } = useRouter();

  return (
    <div>
      <h1>Login</h1>
      <h3>{id}</h3>
      <div className="social-auth">
        {providers.map(item => (
          <a key={item} href={`${HOST_URL}/connect/${item}`} className="link">
            {item}
          </a>
        ))}
      </div>
    </div>
  );
}
