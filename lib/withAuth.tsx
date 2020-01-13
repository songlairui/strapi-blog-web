import React, { useContext, useEffect } from "react";
import { NextPage } from "next";
import { getUser } from "./user_page";
import { UserContext } from "./user.context";

export const withAuth = function(PageComponent: NextPage) {
  const WithAuth: NextPage<any> = pageProps => {
    const userCtx = useContext(UserContext);
    const user = pageProps.user;
    useEffect(() => {
      if (user) {
        userCtx.setUser(user);
        window.__user = user;
      }
    }, []);
    return <PageComponent {...pageProps} />;
  };
  const oriInit = PageComponent.getInitialProps;
  WithAuth.getInitialProps = async ctx => {
    let baseData;
    if (oriInit) {
      baseData = await oriInit(ctx);
    }
    const user = await getUser(ctx);
    return { ...baseData, user };
  };
  return WithAuth;
};
