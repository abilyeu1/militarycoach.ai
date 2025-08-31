// view imports
import EditPersonalDetails from "@/view/personal-details/edit-personal-details-form";
import Head from "next/head";
//react imports

import React, { Fragment } from "react";

const EditPersonalDetailsPage = () => {
  return (
    <>
      <Fragment>
        <Head>
          <title>militarycoach.ai | Edit Personal Details</title>
        </Head>
        <EditPersonalDetails />
      </Fragment>
    </>
  );
};

export default EditPersonalDetailsPage;
