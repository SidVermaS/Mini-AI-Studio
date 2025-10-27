import { ClassName } from "@/types";
import React from "react";
export type GenerationImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  className?: ClassName;
};
const GenerationImage = ({
  src,
  alt,
  className,
  ...props
}: GenerationImageProps) => {
  console.log(`Rendering image: ${String(src)?.includes("null") ? "undefined" : src}`);
  if(String(src)?.includes("null")){
    return (
      <div
        className={ `w-36 md:w-56 h-20 md:h-52 rounded-lg bg-gray-200 flex items-center justify-center ${className}`}
      >
        <span className="text-gray-500 text-sm text-center">Unavailable</span>
      </div>
    );
  }
  return (
    <img
      {...props}
      src={src}
      alt={alt}
      className={ `w-36 md:w-56 h-20 md:h-52 rounded-lg object-cover ${className}`}
    />
  );
};

export default GenerationImage;
