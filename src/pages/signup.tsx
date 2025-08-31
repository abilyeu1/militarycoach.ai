"use-client";

// React Imports
import { Fragment } from "react";

// View Imports
import SignUp from "@/view/signup";

// Next JS Imports
import { NextPage } from "next";
import Head from "next/head";

const SignUpPage: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>militarycoach.ai | SignUp</title>
      </Head>
      <SignUp />
    </Fragment>
  );
};

export default SignUpPage;
