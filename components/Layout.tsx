import React, { useContext, FunctionComponent } from "react";
import Head from "next/head";
import { Container, Button, Box } from "@material-ui/core";

import { UserContext } from "../lib/user.context";
import ProTip from "../src/ProTip";
import Link from "../src/Link";
import Copyright from "../src/Copyright";

type Props = {
  title?: string;
  tip?: string;
};

const Layout: FunctionComponent<Props> = function({
  title = "Lary - strapi",
  tip,
  children
}) {
  const { user, logout } = useContext(UserContext);
  return (
    <Container maxWidth="md">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <header>
        <nav>
          <Link href="/">Home</Link> |{" "}
          {user.username && user.username !== "_" ? (
            <>
              [{user.username}]<Button onClick={logout}>Logout</Button>
            </>
          ) : (
            <Link href="/auth/login">Login</Link>
          )}
        </nav>
      </header>

      <Box my={4}>{children}</Box>
      <footer>
        <ProTip>{tip}</ProTip>
        <Copyright />
      </footer>
    </Container>
  );
};

export default Layout;
