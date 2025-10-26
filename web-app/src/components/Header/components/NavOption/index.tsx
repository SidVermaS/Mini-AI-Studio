import { ClassName } from "@/types";

export type NavOptionProps = {
  className?: ClassName;
  icon: React.ReactNode;
  text: string;
};
const NavOption = ({ className, icon, text }: NavOptionProps) => {
  return (
    <div className={`flex items-center cursor-pointer transition-opacity text-var-secondary hover:text-var-secondary-hover ${className}`}>
      {icon}
      <span className="ml-2 text-[12px]">{text}</span>
    </div>
  );
};

export default NavOption;
