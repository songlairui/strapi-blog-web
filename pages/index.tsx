import React from "react";
import Typography from "@material-ui/core/Typography";

import Link from "../src/Link";

import Layout from "../components/Layout";
import { withAuth } from "../lib/withAuth";

const Index = function() {
  return (
    <Layout title=" Play Strapi 👋">
      <Typography variant="h4" component="h1" gutterBottom>
        Play Strapi 👋
      </Typography>
      <Link href="/about">About</Link>
      <br />
      <Link href="blog/posts">blog/posts</Link>
      <br />
      <Link href="/auth/login">Login</Link>
    </Layout>
  );
};

export default withAuth(Index);
