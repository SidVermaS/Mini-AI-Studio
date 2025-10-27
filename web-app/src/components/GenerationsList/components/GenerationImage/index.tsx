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
  if (String(src)?.includes("null")) {
    return (
      <div
        className={`sm:max-w-56 max-w-36 sm:h-32 md:h-52 h-20 rounded-lg bg-gray-200 flex items-center justify-center ${className}`}
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
      className={`sm:max-w-56 max-w-36 sm:h-32 md:h-52 h-20 rounded-lg object-cover ${className}`}
      loading="lazy"
    />
  );
};

export default GenerationImage;
