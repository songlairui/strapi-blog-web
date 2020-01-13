import React, { useEffect, useState } from "react";

import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  Box,
  makeStyles,
  Divider,
  Button
} from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import { NextPage } from "next";

import Copyright from "../../../src/Copyright";
import { HOST_URL } from "../../../utils/constants";
import { getUser } from "../../../lib/user_page";
import { logout } from "../../../lib/user";

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

const SignIn: NextPage<any> = function({ user }) {
  const [meta, setMeta] = useState(user);
  const classes = useStyles();

  useEffect(() => {
    if (user) {
      window.__user = user;
    }
  }, []);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        {meta ? (
          <div>
            login as: {meta.username} @ {meta.provider}
            <br />
            <Button
              onClick={() => {
                logout();
                setMeta(undefined);
              }}
            >
              Logout
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
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

SignIn.getInitialProps = async ctx => {
  const user = await getUser(ctx);

  return { user };
};

export default SignIn;
