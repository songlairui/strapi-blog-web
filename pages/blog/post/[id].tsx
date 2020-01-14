import React from "react";
import useSWR from "swr";
import { NextPage } from "next";
import Markdown from "react-markdown";

import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

import { Typography, IconButton } from "@material-ui/core";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import Link from "../../../src/Link";

import { fetcher } from "../../../utils/sample-api";
import Layout from "../../../components/Layout";
import { useRouter } from "next/router";

const fetcherWithId = (url: string, id: string) => {
  return fetcher(`${url}${id}`);
};

interface Post {
  id: number;
  title: string;
  abstract: string;
  content: string | null;
}

const END_POINT = "/posts/";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper
    },
    card: {},
    media: {
      height: 0,
      paddingTop: "56.25%" // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: "rotate(180deg)"
    },
    avatar: {
      backgroundColor: red[500]
    }
  })
);

const AllPosts: NextPage = function() {
  const classes = useStyles();

  const {
    query: { id }
  } = useRouter();

  const { data: item, error } = useSWR<Post>(
    id ? [END_POINT, id] : null,
    fetcherWithId
  );

  return (
    <Layout
      title="All Posts 👋"
      tip="TODO: 0. Detail; 1. Category; 2. Pagination; 3. Filter;"
    >
      <Typography variant="h4" component="h1" gutterBottom>
        All Posts👋
      </Typography>
      <Link href="/">Go to the main page</Link>
      {error ? <div>failed to load</div> : null}

      <div className={classes.root}>
        {!item ? (
          <div>loading...</div>
        ) : (
          <Card className={classes.card} variant="outlined">
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {item.id}
                </Avatar>
              }
              action={
                <>
                  <IconButton aria-label="settings">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                </>
              }
              title={item.title}
              subheader={item.abstract}
            />
            <CardContent>
              <Markdown source={item.content || ""} />
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <IconButton aria-label="delete">
                <DeleteIcon />
              </IconButton>
              <IconButton className={classes.expand}>
                <EditIcon />
              </IconButton>
            </CardActions>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default AllPosts;
