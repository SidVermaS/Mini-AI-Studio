import { ObjUnknown } from "@/types";

export class AppError extends Error {
  private _error?: ObjUnknown | unknown;
  constructor(message: string, error?: ObjUnknown | unknown) {
    super(message);
    this._error = error;
  }
  public get error(): ObjUnknown | unknown | undefined {
    return this._error;
  }
}
