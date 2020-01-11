import * as React from "react";

import { NextPage } from "next";
import Link from "next/link";

import Layout from "../components/Layout";

const IndexPage: NextPage = () => {
  return (
    <Layout title="Strapi | Songlairui">
      <h1>Play Strapi 👋</h1>
      <p>ideas</p>

      <Link href="/connect/github">
        <a>github Login</a>
      </Link>
    </Layout>
  );
};

export default IndexPage;
