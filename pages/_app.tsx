import React from "react";
import App from "next/app";
import Head from "next/head";
import {
  Fab,
  CssBaseline,
  ThemeProvider,
  createStyles,
  makeStyles,
  Theme
} from "@material-ui/core";
import theme from "../src/theme";
import { UserContext } from "../lib/user.context";
import { logout } from "../lib/user";
import HomeIcon from "@material-ui/icons/Home";

import Router from "next/router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1)
      }
    },
    extendedIcon: {
      marginRight: theme.spacing(1)
    }
  })
);

function FloatingActionButtons({ title = "-" }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fab
        variant="extended"
        onClick={() => {
          Router.push("/");
        }}
      >
        <HomeIcon className={classes.extendedIcon} />
        {title}
      </Fab>
    </div>
  );
}

export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
    try {
      this.setUser(JSON.parse(localStorage.getItem("_user_") || "{}"));
    } catch (error) {
      //
    }
  }

  setUser = (payload: any) => {
    this.setState({
      user: payload
    });
  };
  logout = () => {
    logout();
    this.setUser({});
  };

  state = {
    user: {
      username: ""
    },
    setUser: this.setUser,
    logout: this.logout
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>My page</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <UserContext.Provider value={this.state}>
            <Component {...pageProps} />
            <FloatingActionButtons title={this.state.user.username} />
          </UserContext.Provider>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}
