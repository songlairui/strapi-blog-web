import { NextPageContext } from "next";
import cookies from "next-cookies";
import { fetchUser } from "./user";
import { ServerResponse } from "http";

const defaultRedirect = {
  server(res: ServerResponse) {
    res.writeHead(302, {
      Location: "/auth/login"
    });
    return res.end();
  },
  client() {
    window.location.href = "/auth/login";
  }
};

export const getUser = (ctx: NextPageContext) => {
  const allCookies = cookies(ctx);
  console.info("allCookies", allCookies);
  return fetchUser(allCookies._token_);
};

getUser.required = async (ctx: NextPageContext, redirect = defaultRedirect) => {
  const allCookies = cookies(ctx);

  const user = await fetchUser(allCookies._token_);

  // A redirect is needed to authenticate to Auth0
  if (!user) {
    if (typeof window === "undefined" && ctx.res) {
      return redirect.server(ctx.res);
    }
    redirect.client();
  }

  return user;
};
