import { ClassName } from "@/types";
import React from "react";
export type LoaderProps = {
  parentClassName?: ClassName;
  className?: ClassName;
};
const Loader = ({ parentClassName,className }: LoaderProps): React.JSX.Element => {
  return (
    <div className={parentClassName}>
      <div
        className={`w-8 h-8 border-4 border-white-500 border-t-transparent rounded-full animate-spin border-purple-500  ${className}`}
      ></div>
    </div>
  );
};

export default Loader;
