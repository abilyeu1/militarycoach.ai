import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import animatedLogo from "../../../public/assets/animation-logo.svg";
import { useRouter } from "next/router";
import { quotes } from "@/view/data/data";

interface Iprops {
  isSkeletonCodeVisible: any;
}

const ModalFunFacts: FC<Iprops> = ({ isSkeletonCodeVisible }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentIndex(randomIndex);
      setIsAnimating(true);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
    return () => clearTimeout(animationTimeout);
  }, [currentIndex]);

  return (
    <>
      <div
        tabIndex={-1}
        aria-hidden="true"
        className={`z-1 inset-0 h-[100vh] max-h-full w-full items-center justify-center bg-black bg-opacity-50 ${
          isSkeletonCodeVisible ? "fixed z-[99999] flex" : "hidden"
        } `}
      >
        <div className="relative max-h-full w-full max-w-2xl p-4">
          <div className="relative rounded-lg bg-white shadow">
            <div className="flex flex-col p-10 ">
              <div className="flex items-center">
                <Image
                  src={animatedLogo}
                  alt="animatedLogo"
                  className={`${
                    isSkeletonCodeVisible && "custom-spin"
                  } relative mr-2`}
                  width={40}
                  height={40}
                />
                <p className="space-y-3 text-[16px] font-medium md:text-[24px]">
                  {router.pathname === "/military-personal-details"
                    ? "Uploading Resume"
                    : "Generating your personalized response"}
                </p>
              </div>
              <div className="my-5 flex justify-center">
                <div className="min-h-[450px] w-full rounded-xl border border-primary bg-[#FCFFF5] p-8 text-[19px] font-medium md:min-h-[300px]">
                  <p className="text-[22px] font-extrabold md:text-[32px]">
                    Did You Know...?
                  </p>

                  <div className="relative flex w-full items-center justify-center">
                    <div className="absolute top-2 w-full overflow-hidden">
                      <p
                        className={`mt-5 transform text-[13px] font-medium transition-transform duration-1000 ease-in-out md:text-[19px] ${
                          isAnimating ? "-translate-x-full" : "translate-x-0"
                        }`}
                      >
                        {quotes[currentIndex].title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalFunFacts;
