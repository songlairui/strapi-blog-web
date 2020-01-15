import React, { useState } from "react";
import useSWR from "swr";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Markdown from "react-markdown";
import { ControlledEditor } from "@monaco-editor/react";

import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

import {
  Typography,
  IconButton,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PublishIcon from "@material-ui/icons/Publish";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import Link from "../../../src/Link";

import { fetcher } from "../../../utils/sample-api";
import Layout from "../../../src/Layout";

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
  const [previewing, setPreviewing] = useState(true);
  const [tmpText, setTmpText] = useState("");
  const classes = useStyles();

  const {
    query: { id }
  } = useRouter();

  const { data: item, error } = useSWR<Post>(
    id ? [END_POINT, id] : null,
    fetcherWithId
  );

  const handleEditorDidMount = console.warn.bind(null, "handleEditorDidMount");
  const handleEditorChange = (_: any, value?: string) => {
    setTmpText(value || "");
  };

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
                  {tmpText && tmpText !== item.content && (
                    <>
                      <IconButton aria-label="publish">
                        <PublishIcon />
                      </IconButton>
                      <IconButton
                        aria-label="restore"
                        onClick={() => {
                          setTmpText("");
                        }}
                      >
                        <SettingsBackupRestoreIcon />
                      </IconButton>
                    </>
                  )}

                  <IconButton
                    aria-label="edit"
                    onClick={() => {
                      setPreviewing(!previewing);
                    }}
                  >
                    {previewing ? <EditIcon /> : <VisibilityIcon />}
                  </IconButton>
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
              {previewing ? (
                <Markdown source={tmpText || item.content || ""} />
              ) : (
                <ControlledEditor
                  height="300px"
                  language="markdown"
                  value={tmpText || item.content || ""}
                  editorDidMount={handleEditorDidMount}
                  onChange={handleEditorChange}
                  options={{ scrollBeyondLastLine: false }}
                />
              )}
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
