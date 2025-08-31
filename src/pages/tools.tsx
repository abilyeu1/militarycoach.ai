//hooks imports
import { useDimension } from "@/hooks/useDimension";

//view imports
import ToolsCards from "@/view/tools/Tools-Cards";

//next imports
import Head from "next/head";

//react imports
import React, { Fragment } from "react";

const Tools = () => {
  const [width] = useDimension();
  return (
    <Fragment>
      <Head>
        <title>militarycoach.ai | Tools</title>
      </Head>
      <div className="flex min-h-[91vh] flex-col justify-center px-4 md:px-16 ">
        <div className="flex w-full flex-col justify-start">
          <p className="mt-5 text-[30px] font-bold md:pt-0">Home</p>
          <p className="text-[18px] text-textGray">
            Personalized career coaching powered by Generative AI.
          </p>
        </div>
        <ToolsCards />
      </div>
    </Fragment>
  );
};

export default Tools;
