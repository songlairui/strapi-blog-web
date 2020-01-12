import React, { useState } from "react";
import useSWR from "swr";
import { NextPage } from "next";
import Markdown from "react-markdown";

import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

import {
  Container,
  Typography,
  Box,
  Divider,
  IconButton,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions,
  Button
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import ProTip from "../../src/ProTip";
import Link from "../../src/Link";
import Copyright from "../../src/Copyright";

import { fetcher } from "../../utils/sample-api";

const fetcherWithSort = (url: string, sort: string) => {
  console.info("fetcher wrap", url, sort);
  return fetcher(`${url}?${sort}`);
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "33.33%",
      flexShrink: 0
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary
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
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          All Posts
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
        {!data ? <div>loading...</div> : null}
        <div className={classes.root}>
          {data &&
            data.map(item => (
              <ExpansionPanel key={item.id} defaultExpanded={true}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  id={`${item.id}`}
                >
                  <Typography className={classes.heading}>
                    {item.title}
                  </Typography>
                  <Typography className={classes.secondaryHeading}>
                    {item.abstract}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div>
                    <Markdown source={item.content || ""} />
                  </div>
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions>
                  <Button size="small">[{item.id}]</Button>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ExpansionPanelActions>
              </ExpansionPanel>
            ))}
        </div>
        <ProTip>TODO: 0. Detail; 1. Category; 2. Pagination; 3. Filter;</ProTip>
        <Copyright />
      </Box>
    </Container>
  );
};

export default AllPosts;
