"use client";
import ClockCircleOutlined from "@ant-design/icons/ClockCircleOutlined";
import { Generation } from "@/types";
import GenerationImage from "../GenerationImage";
import { formatDateMMDDYYYYHHMM } from "@/utils";

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
      <div className="flex justify-between">
        <div>{status}</div>
        <div className="text-[12px] text-gray-500">
          <ClockCircleOutlined className="mr-0.5 w-4 h-4" />{formatDateMMDDYYYYHHMM(createdAt)}
        </div>
      </div>
      <div className="text-[12px]">{prompt}</div>
      <div className="flex justify-between gap-4 mt-2">
        <GenerationImage
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${inputImageUrl}`}
          alt="input"
          className=""
        />
        <GenerationImage
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${outputImageUrl}`}
          alt="output"
          className=""
        />
      </div>
    </div>
  );
};

export default GenerationItem;
