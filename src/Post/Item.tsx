import React, { useState, FunctionComponent } from "react";
import Markdown from "react-markdown";

import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

import { red } from "@material-ui/core/colors";

import {
  IconButton,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  CardActions,
  Menu,
  MenuItem
} from "@material-ui/core";

import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";
import Router from "next/router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 345
    },
    media: {
      height: 0,
      paddingTop: "56.25%" // 16:9
    },
    right: {
      marginLeft: "auto"
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
    limitHeight: {
      height: 140,
      overflow: "auto"
    },
    avatar: {
      backgroundColor: red[500]
    }
  })
);

export const PostItem: FunctionComponent<any> = function({ data }) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {data.id}
          </Avatar>
        }
        action={
          <>
            <IconButton aria-label="settings" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  Router.push("/blog/post/[id]", `/blog/post/${data.id}`);
                }}
              >
                Detail
              </MenuItem>
            </Menu>
          </>
        }
        title={data.title}
        subheader={data.abstract}
      />
      <CardContent className={classes.limitHeight}>
        <Markdown source={data.content || ""} />
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton className={classes.right}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
