import React, { FC } from "react";
import animatedLogo from "../../../public/assets/animation-logo.svg";
import Image from "next/image";
import { useRouter } from "next/router";

interface Iprops {
  isSkeletonCodeVisible: any;
}

const SkeletonCode: FC<Iprops> = ({ isSkeletonCodeVisible }) => {
  const router = useRouter();

  return (
    <div className="min-h-[64vh] max-h-[64vh] p-4 pt-5 ">
      <div
        className={`animate-pulse space-x-4 w-full  rounded-xl  ${
          router.pathname === "/cover-letter-wizard"
            ? "w-full"
            : "md:max-w-[60%]"
        }`}
      >
        <div className="flex items-start">
          <Image
            src={animatedLogo}
            alt="animatedLogo"
            className={`${
              isSkeletonCodeVisible && "custom-spin"
            } relative mr-2`}
            width={40}
            height={40}
          />
          <div className="flex-1 space-y-6 py-1">
            <div className="space-y-3">
              <div
                className={`${
                  router.pathname === "/cover-letter-wizard"
                    ? "h-[60vh]"
                    : "h-[40vh]"
                }   bg-[#F5F5F5] rounded-lg`}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${
          router.pathname === "/cover-letter-wizard" ? "hidden" : "block"
        }`}
      >
        <div className="flex justify-end my-5">
          <div className="animate-pulse md:max-w-[60%] w-full">
            <div className="space-y-2 flex flex-col items-end">
              <div className="h-10  bg-primary opacity-[0.50] rounded-lg md:w-[300px]"></div>
              <div className="h-10 bg-primary opacity-[0.50] rounded-lg md:w-[400px]"></div>
              <div className="h-10  bg-primary opacity-[0.50] rounded-lg md:w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCode;
