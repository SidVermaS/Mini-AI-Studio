"use client";
import ClockCircleOutlined from "@ant-design/icons/ClockCircleOutlined";
import { ClassName, Generation, Status } from "@/types";
import GenerationImage from "../GenerationImage";
import { capitalizeFirstLetter, formatDateMMDDYYYYHHMM } from "@/utils";

export type GenerationProps = Generation;
const STATUS: Record<Status, ClassName> = {
  PROCESSING: "bg-yellow-200 text-yellow-700",
  COMPLETED: "bg-green-200 text-green-700",
  FAILED: "bg-red-200 text-red-700",
};
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
      <div className="flex justify-between items-center">
        <div
          className={`flex justify-center items-center text-center text-[10px] font-medium px-2 py-[0.5px] rounded-md ${STATUS[status]}`}
        >
          {capitalizeFirstLetter(status)}
        </div>
        <div className="text-[12px] text-gray-500">
          <ClockCircleOutlined className="mr-0.5 w-4 h-4" />
          {formatDateMMDDYYYYHHMM(createdAt)}
        </div>
      </div>
      <div className="text-[14px] mt-4">{prompt}</div>
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
