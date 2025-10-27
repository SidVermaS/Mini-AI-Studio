import { ClassName } from "@/types";
import React from "react";
import Loader from "../Loader";
export type ButtonProps = {
  isLoading?: boolean;
  text: string;
  className?: ClassName;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
const Button = ({
  disabled,
  text,
  className,
  isLoading,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={`mt-4 w-full py-1.5 rounded-lg transition-colors button-var-primary ${
        disabled
          ? "button-var-primary-disabled"
          : "button-var-primary hover:button-var-primary-hover"
      } flex justify-center items-center gap-3 ${className}`}
    >
      {isLoading && <Loader className="border-white w-4 h-4" />}
      {text}
    </button>
  );
};

export default Button;
