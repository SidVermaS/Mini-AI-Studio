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
