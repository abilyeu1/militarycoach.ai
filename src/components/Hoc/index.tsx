//hooks imports
import { useDimension } from "@/hooks/useDimension";
import { HOCIProps } from "@/types";
//view imports
import Navbar from "@/view/navbar";
import SideBar from "@/view/navbar/side-bar";

//next imports
import { useRouter } from "next/router";

//react imports
import React, { FC, useEffect, useState } from "react";
import LoadingOverlay from "react-loading-overlay-ts";

const HOC: FC<HOCIProps> = ({ children }) => {
  const [width] = useDimension();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const headerRoutes = [
    "tools",
    "bullet-translator",
    "pricing",
    "cover-letter-wizard",
    "skills-gap-analysis",
    "history",
    "career-wizard",
    "mock-interview-prep",
    "profile",
    "support",
    "mock-interview-headline",
  ];

  /**
   * @description Handle Route Change and set loading state.
   * @returns void
   */
  const handleRouteChange = (): (() => void) => {
    const handleStart = () => {
      setLoading(true);
    };

    const handleComplete = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  };

  useEffect(() => {
    handleRouteChange();
  }, []);

  return (
    <>
      <LoadingOverlay active={loading} spinner className="h-[100vh]">
        <div>
          <div>
            {headerRoutes.some((route) => router.pathname.includes(route)) ? (
              <div className="header min-h-[8dvh]">
                {width > 1024 ? <Navbar /> : <SideBar />}
              </div>
            ) : (
              ""
            )}

            <div className="children bg-lightYellow ">{children}</div>
          </div>
        </div>
      </LoadingOverlay>
    </>
  );
};

export default HOC;
