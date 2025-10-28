import { ClassName } from "@/types";
import { MouseEventHandler } from "react";

export type DropdownItemProps = {
  className?: ClassName;
  text: string;
  onClick?: MouseEventHandler<HTMLDivElement>
};
const DropdownItem = ({ className,onClick, text }: DropdownItemProps) => {
  return <div onClick={onClick} className={ `hover:bg-var-primary-hover  px-2.5 text-[12px] text-var-secondary cursor-pointer ${className}`}>{text}</div>;
};

export default DropdownItem;
