import React, { useState, useContext } from "react";
import jsCookie from "js-cookie";

import {
  CssBaseline,
  Avatar,
  Typography,
  makeStyles,
  Divider,
  Button
} from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import { NextPage } from "next";

import { HOST_URL } from "../../../utils/constants";
import { logout } from "../../../lib/user";
import { UserContext } from "../../../lib/user.context";
import { withAuth } from "../../../lib/withAuth";
import Layout from "../../../src/Layout";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const presistSessionCookie = () => {
  const _token_ = jsCookie.get("_token_");
  _token_ && jsCookie.set("_token_", _token_, { expires: 1 });
};

const SignIn: NextPage<any> = function({ user }) {
  const [meta, setMeta] = useState(user);
  const classes = useStyles();

  const userCtx = useContext(UserContext);
  return (
    <Layout title="Login  👋">
      <CssBaseline />
      <div className={classes.paper}>
        {meta ? (
          <div>
            login as: {meta.username} @ {meta.provider}
            <br />
            <Button
              onClick={() => {
                logout();
                userCtx.logout();
                setMeta(undefined);
              }}
            >
              Logout
            </Button>
            <Button
              onClick={() => {
                presistSessionCookie();
              }}
            >
              .
            </Button>
          </div>
        ) : (
          <div>
            <div>
              <a href={`${HOST_URL}/api_blog/connect/github`} className="link">
                <Avatar className={classes.avatar}>
                  <GitHubIcon />
                </Avatar>
              </a>
            </div>
            <Divider />

            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default withAuth(SignIn);
