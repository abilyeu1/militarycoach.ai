import { ButtonProps } from "@/types";
import React, { FC } from "react";

const Button: FC<ButtonProps> = (props) => {
  const { className, onClick, children, ...otherProps } = props;
  return (
    <button
      type="button"
      className={`rounded-lg  bg-primary px-6 py-3  text-white ${className} `}
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
