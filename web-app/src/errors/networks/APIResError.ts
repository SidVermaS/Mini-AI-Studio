

import {AppError} from './AppError';
import { ErrorCode } from './consts';
import { APIResErrorData } from './types';

export class APIResError extends AppError {
  private _status: number;
  private _code: ErrorCode | undefined;

  constructor(status: number, apiResError: APIResErrorData) {
    super(apiResError.message, apiResError?.error);
    this._status = status;
    this._code = apiResError?.code;
  }
  public get status(): number {
    return this._status;
  }
  public get code(): ErrorCode | undefined {
    return this._code;
  }
}

