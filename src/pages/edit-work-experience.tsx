//view imports
import EditWorkExperienceForm from "@/view/work-experience/edit-work-experience";
import Head from "next/head";
//react imports

import React, { Fragment } from "react";

const EditWorkExperiencePage = () => {
  return (
    <>
      <Fragment>
        <Head>
          <title>militarycoach.ai | Edit Work Experience</title>
        </Head>
        <EditWorkExperienceForm />
      </Fragment>
    </>
  );
};

export default EditWorkExperiencePage;
