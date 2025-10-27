"use client";
import { Generation } from "@/types";
import GenerationImage from "../GenerationImage";

export type GenerationProps = Generation;
const GenerationItem = ({
  id,
  prompt,
  inputImageUrl,
  outputImageUrl,
  createdAt,
  cursorId,
  status,
}: GenerationProps) => {
  return (
    <div className="rounded-xl shadow-[0_0_10px_0_rgba(0,0,0,0.2)] px-6 py-4">
      <div>{prompt}</div>
      <div className="flex justify-between gap-4 mt-1">
        <GenerationImage
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${inputImageUrl}`}
          alt="input"
          className="h-30 w-30 rounded-lg object-cover"
        />
        <GenerationImage
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${outputImageUrl}`}
          alt="output"
          className="h-30 w-30 rounded-lg object-cover"
        />
      </div>
    </div>
  );
};

export default GenerationItem;
