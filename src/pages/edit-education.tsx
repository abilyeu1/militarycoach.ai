// view imports
import EditEducationForm from "@/view/education/edit-education-form";
import Head from "next/head";
//react imports
import React, { Fragment } from "react";

const EditEducationPage = () => {
  return (
    <>
      <Fragment>
        <Head>
          <title>militarycoach.ai | Edit Education</title>
        </Head>
        <EditEducationForm />
      </Fragment>
    </>
  );
};

export default EditEducationPage;
