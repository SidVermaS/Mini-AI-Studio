import { ClassName } from "@/types";
import Label, { LabelProps } from "../Label";
import { HTMLInputTypeAttribute } from "react";

export type InputProps = Omit<LabelProps,"htmlFor" | "className"> & {
  id: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  labelClassName?: ClassName;
  inputClassName?: ClassName;
  errorText?: string;
} & React.HTMLAttributes<HTMLInputElement>;
const Input = ({
  id,
  placeholder,errorText,
  type,
  text,
  labelClassName,
  inputClassName,
  ...rest
}: InputProps) => {
  return (
    <div>
      <Label text={text} htmlFor={id} className={`text-var-quaternary ${labelClassName}`} />
      <input
        {...rest}
        id={id}
        type={type}
        placeholder={placeholder}
        className={`border border-var-primary placeholder-gray-400 placeholder:text-sm text-sm focus:outline-none focus:border-var-primary-focus rounded-lg mt-0.5 px-2 py-2 w-full ${inputClassName}`}
      />
      {errorText && <div className="text-red-500 text-xs ">{errorText}</div>}
    </div>
  );
};

export default Input;
