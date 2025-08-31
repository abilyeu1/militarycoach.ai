import { RightBarProps } from "@/types";
import React, { FC } from "react";

const RightBar: FC<RightBarProps> = ({ className, children }) => {
  return (
    <div
      className={`h-full w-full rounded-xl border border-GrayBorder bg-white p-4 ${className}`}
    >
      {children}
    </div>
  );
};

export default RightBar;
