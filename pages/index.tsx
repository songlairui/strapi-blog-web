import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import ProTip from "../src/ProTip";
import Link from "../src/Link";

import Copyright from "../src/Copyright";

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Play Strapi 👋
        </Typography>

        <Link href="/auth/login">Login</Link>
        <br />
        <Link href="/about">About</Link>
        <br />
        <Link href="/connect/github">github Login</Link>
        <br />
        <Link href="blog/posts">blog/posts</Link>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
