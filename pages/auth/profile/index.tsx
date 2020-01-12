import React from "react";
import { NextPage } from "next";
import { Button } from "@material-ui/core";
import { getUser } from "../../../lib/user_page";
import { logout } from "../../../lib/user";

const Profile: NextPage<any> = function({ user }) {
  return (
    <div>
      <h1>Profile</h1>
      <p>{JSON.stringify(user, null, 1)}</p>
      <Button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </Button>
    </div>
  );
};

Profile.getInitialProps = async ctx => {
  const user = await getUser.required(ctx);

  return { user };
};

export default Profile;
