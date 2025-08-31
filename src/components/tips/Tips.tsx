import Image from "next/image";
import React, { FC } from "react";
import tipsIcon from "../../../public/assets/tips-img.svg";
import { TipsProps } from "@/types";

const Tips: FC<TipsProps> = (props) => {
  const { position, top, className, children, ...otherProps } = props;
  return (
    <div className={`flex px-4 ${position}`}>
      <div>
        <Image src={tipsIcon} alt="tipsIcon" height={20} width={50} />
      </div>

      <div
        className={`mb-2 flex-1 rounded-lg bg-[#2A3726] p-3 text-white lg:relative xl:p-5 ${className}`}
        {...otherProps}
      >
        <div>
          <p className="text-[14px] xl:text-[16px]">{children}</p>
        </div>

        <div
          className={`absolute left-0 hidden lg:block ${top} h-2 w-2 -translate-x-1/2 rotate-45 transform bg-[#2A3726]`}
        ></div>
      </div>
    </div>
  );
};

export default Tips;
