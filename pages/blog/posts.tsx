import React, { useState } from "react";
import useSWR from "swr";
import { NextPage } from "next";

import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

import { Typography, Button, Grid } from "@material-ui/core";

import Link from "../../src/Link";

import { fetcher } from "../../utils/sample-api";
import Layout from "../../components/Layout";
import { PostItem } from "../../src/Post/Item";

const fetcherWithSort = (url: string, sort: string) => {
  console.info("fetcher wrap", url, sort);
  return fetcher(`${url}?${sort}`);
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
      padding: 6
    },
    gridList: {
      // width: 500,
      // height: 450
    }
  })
);

interface Post {
  id: number;
  title: string;
  abstract: string;
  content: string | null;
}

const END_POINT = "/posts";
const SORT_PARAM = "_sort=id:DESC";

const AllPosts: NextPage = function() {
  const classes = useStyles();

  const [sort, setSort] = useState(SORT_PARAM);
  const { data, error } = useSWR<Post[]>([END_POINT, sort], fetcherWithSort);

  return (
    <Layout
      title="All Posts 👋"
      tip="TODO: 0. Detail; 1. Category; 2. Pagination; 3. Filter;"
    >
      <Typography variant="h4" component="h1" gutterBottom>
        All Posts👋
      </Typography>
      <Link href="/">Go to the main page</Link>
      <Button
        onClick={() => {
          const nextSort =
            sort === "_sort=id:ASC" ? "_sort=id:DESC" : "_sort=id:ASC";
          setSort(nextSort);
        }}
      >
        {sort}
      </Button>
      {error ? <div>failed to load</div> : null}
      <div className={classes.root}>
        {!data ? (
          <div>loading...</div>
        ) : (
          <Grid container className={classes.gridList} spacing={1}>
            {data.map(item => (
              <Grid item key={item.id} xs={6} sm={4}>
                <PostItem data={item} />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </Layout>
  );
};

export default AllPosts;
