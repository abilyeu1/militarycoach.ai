// React Imports
import { Fragment } from "react";

// View Imports
import ForgetPassword from "@/view/forget-password";

// Next  Imports
import { NextPage } from "next";
import Head from "next/head";

const ForgetPasswordPage: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>militarycoach.ai | Forgot Password</title>
      </Head>

      <ForgetPassword />
    </Fragment>
  );
};

export default ForgetPasswordPage;
