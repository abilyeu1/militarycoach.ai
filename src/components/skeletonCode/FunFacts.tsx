import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import animatedLogo from "../../../public/assets/animation-logo.svg";
import { useRouter } from "next/router";
import { quotes } from "@/view/data/data";
import { useDimension } from "@/hooks/useDimension";

interface IProps {
  isSkeletonCodeVisible: any;
}

const FunFacts: FC<IProps> = ({ isSkeletonCodeVisible }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [width] = useDimension();

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
        className={`w-full ${
          isSkeletonCodeVisible ? "fixed z-[99999] flex" : "hidden"
        } `}
      >
        <div className="max-h-[64vh] min-h-[64vh] w-[85%] p-4 pt-5 lg:w-[50%]">
          <div className="flex max-h-[40vh] min-h-[40vh] flex-col justify-between">
            <div className="flex items-center">
              <Image
                src={animatedLogo}
                alt="animatedLogo"
                className={`${
                  isSkeletonCodeVisible && "custom-spin"
                } relative mr-2`}
                width={width > 768 ? 40 : 20}
                height={width > 768 ? 40 : 20}
              />

              <p className="space-y-3 text-[13px] font-medium md:text-[24px] ">
                Generating your personalized response
              </p>
            </div>
            <div className=" mx-10 flex justify-center">
              <div className="min-h-[320px] w-full rounded-xl border border-primary bg-[#FCFFF5] p-8 text-[19px] font-medium md:min-h-[215px] lg:min-h-[270px]">
                <p className="text-[16px] font-extrabold md:text-[32px]">
                  Did You Know...?
                </p>

                <div className="relative flex w-full items-center justify-center">
                  <div className="absolute top-2 w-full overflow-hidden">
                    <p
                      className={`mt-5 transform text-[13px] font-medium transition-transform duration-1000 ease-in-out lg:text-[17px] ${
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
    </>
  );
};

export default FunFacts;
