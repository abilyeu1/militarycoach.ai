import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import timer from "../../../public/assets/timer.svg";
import { useDimension } from "@/hooks/useDimension";
import { LeftBarProps } from "@/types";

const LeftBar: FC<LeftBarProps> = ({
  title,
  children,
  routerPath,
  className,
  description,
}) => {
  const [width] = useDimension();
  return (
    <div
      className={` rounded-xl border border-GrayBorder bg-white p-4 ${className}`}
    >
      <div className="flex items-center justify-between border-b border-GrayBorder pb-4">
        <div>
          <p className="text-[22px] font-bold text-black md:text-[32px]">
            {" "}
            {title}{" "}
          </p>
          <p className="text-[12px] tracking-wide text-textGray md:text-[16px]">
            {" "}
            {description}{" "}
          </p>
        </div>
        <div>
          <Link href={`${routerPath}`} className="flex items-center">
            {width > 1024 ? (
              <Image src={timer} alt="timer" width={24} height={24} />
            ) : (
              <Image src={timer} alt="timer" width={18} height={18} />
            )}
            <p className="mx-2 text-[14px] text-primary  md:text-[18px]">
              History
            </p>
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
};

export default LeftBar;
