//react imports
import React, { FC, Fragment } from "react";

//types imports
import { IProps } from "@/types/defaultTypes";

//components imports

//next imports
import { GetServerSideProps } from "next";
import Head from "next/head";

//view imports
import OneTimePassword from "@/view/forget-password/otp-screen";

const OneTimePasswordPage: FC<IProps> = ({ query }) => {
  return (
    <>
      <Fragment>
        <Head>
          <title>militarycoach.ai | One Time Password</title>
        </Head>

        <OneTimePassword query={query} />
      </Fragment>
    </>
  );
};

export default OneTimePasswordPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query;

  return {
    props: {
      query,
    },
  };
};
