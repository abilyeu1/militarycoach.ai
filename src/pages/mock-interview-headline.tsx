"use-client";

// React Imports
import { Fragment } from "react";

// Next JS Imports
import { NextPage } from "next";
import Head from "next/head";
import Headline from "@/view/mock-interview-prep/headline";

const loginPage: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>militarycoach.ai | Mock interview headline</title>
      </Head>

      <Headline />
    </Fragment>
  );
};

export default loginPage;
