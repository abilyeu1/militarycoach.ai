//view imports

import ProfileCards from "@/view/profile/profile-cards";
import Head from "next/head";
import { Fragment } from "react";
//react imports

const profile = () => {
  return (
    <Fragment>
      <Head>
        <title>militarycoach.ai | Profile</title>
      </Head>

      <div className="my-10 flex min-h-[91vh] flex-col justify-center bg-white px-4 md:my-0 md:px-16">
        <p className="text-[30px] font-bold">My Profile</p>

        <ProfileCards />
      </div>
    </Fragment>
  );
};

export default profile;
