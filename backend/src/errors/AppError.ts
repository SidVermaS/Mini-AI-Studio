import { ErrorCode, ErrorCodes, HttpStatus, } from "@consts/index";
import type {ErrorCodeValue, } from "@consts/index";
import type {AppErrorJSON, } from "@interfaces/index";
import { ObjUnknown } from "@interfaces/index";
import { ZodError } from "zod";

export default class AppError {
  private _status: HttpStatus;
  private _errorCode: ErrorCode;
  private _message: string;
  private _data?: ObjUnknown;
  constructor(_errorCode: ErrorCode, _data?: ObjUnknown | ZodError | string) {
    this._errorCode = _errorCode;
    const ErrorCodeValue: ErrorCodeValue = ErrorCodes[_errorCode];
    this._status = ErrorCodeValue.status;
    this._message = ErrorCodeValue.message;
    this._data = { error:  _data };
  }
  get errorCode(): ErrorCode {
    return this._errorCode;
  }
  get status(): HttpStatus {
    return this._status;
  }
  get message(): string {
    return this._message;
  }
  get data(): ObjUnknown | undefined {
    return this._data;
  }
  get json(): AppErrorJSON {
    return {
      code: this._errorCode,
      message: this.message,
      ...this._data,
    };
  }
}
