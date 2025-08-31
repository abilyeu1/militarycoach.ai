// view imports

import { GetServerSideProps } from "next/types";
import CareerWizards from "../view/career-wizard";

// react imports
import React, { Fragment } from "react";
import { GET } from "@/services/API/AxiosRequests";
import { URL } from "@/services/API";
import MockInterViewPrep from "@/view/mock-interview-prep";
import Head from "next/head";

const MockInterViewPrepPage = ({ conversation }: any) => {
  return (
    <Fragment>
      <Head>
        <title>militarycoach.ai | Mock Interview Prep</title>
      </Head>
      <MockInterViewPrep conversation={conversation} />
    </Fragment>
  );
};

export default MockInterViewPrepPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { chatID } = context.query;

  const token = context.req.cookies.accessToken;

  if (chatID) {
    const conversation = await GET(URL.GET_CHAT_BY_ID(chatID), token);
    return {
      props: {
        conversation,
      },
    };
  }

  return {
    props: {
      conversation: 0,
    },
  };
};
