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
      className={`rounded-lg object-cover ${className}`}
      width={300}
      height={300}
    />
  );
};

export default GenerationImage;
