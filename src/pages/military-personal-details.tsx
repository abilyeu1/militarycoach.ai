//view imports

import MilitaryPersonalDetails from "@/view/sm-personal-details";
import Head from "next/head";
import { Fragment } from "react";

const MilitaryPersonalDetailsPage = () => {
  return (
    <Fragment>
      <Head>
        <title>militarycoach.ai | Military Personal Details</title>
      </Head>
      <MilitaryPersonalDetails />
    </Fragment>
  );
};

export default MilitaryPersonalDetailsPage;
