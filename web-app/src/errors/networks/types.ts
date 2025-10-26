import { ObjUnknown } from "@/types";
import { ErrorCode } from "./consts";

export type APIResErrorData ={
  code?: ErrorCode;
  message: string;
  error?: ObjUnknown | string;
}
