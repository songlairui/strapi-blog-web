import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "../src/Link";

import Layout from "../components/Layout";
import { withAuth } from "../lib/withAuth";

const About = function() {
  return (
    <Layout title="About 👋">
      <Typography variant="h4" component="h1" gutterBottom>
        About 👋
      </Typography>
      <ul>
        <li>Next.js + Strapi</li>
        <li>vps</li>
        <li>docker</li>
        <li>github actions</li>
      </ul>

      <Link href="/">Go to the main page</Link>
    </Layout>
  );
};

export default withAuth(About);
