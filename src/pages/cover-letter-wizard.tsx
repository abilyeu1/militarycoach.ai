// view imports

import { URL } from "@/services/API";
import { GET } from "@/services/API/AxiosRequests";
import CoverLetterWizard from "@/view/cover-letter-wizard";
import { GetServerSideProps } from "next";
import Head from "next/head";
// react imports
import React, { Fragment } from "react";

const CoverLetterWizardPage = ({ conversation }: any) => {
  return (
    <Fragment>
      <Head>
        <title>militarycoach.ai | Cover Letter Wizard</title>
      </Head>
      <CoverLetterWizard conversation={conversation} />
    </Fragment>
  );
};

export default CoverLetterWizardPage;
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
