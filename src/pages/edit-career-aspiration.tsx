//next imports
import Head from "next/head";
//react imports
import React, { Fragment } from "react";
//view imports
import EditCareerAspiration from "@/view/career-aspiration/edit-career-aspiration";
const EditCareerAspirationPage = () => {
  return (
    <>
      <Fragment>
        <Head>
          <title>militarycoach.ai | Edit Career Aspiration</title>
        </Head>
        <EditCareerAspiration />
      </Fragment>
    </>
  );
};

export default EditCareerAspirationPage;
