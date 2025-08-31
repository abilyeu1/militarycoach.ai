"use-client";

// React Imports
import { Fragment } from "react";

// View Imports
import Login from "@/view/login";

// Next JS Imports
import { NextPage } from "next";
import Head from "next/head";

const loginPage: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>militarycoach.ai | Login</title>
      </Head>

      <Login />
    </Fragment>
  );
};

export default loginPage;
