import { HttpStatus } from "../status";


export type ErrorCodeValue = {
    status: HttpStatus;
    message: string;
};

export const ErrorCodes = {
    //#region Auth
    AUTH001: {
        status: HttpStatus.UNAUTHORIZED,
        message: 'Email or password is incorrect',
    },
    AUTH002: {
        status: HttpStatus.NOT_FOUND,
        message: 'User does not exist. Please sign up.',
    },
    AUTH003: {
        status: HttpStatus.CONFLICT,
        message: 'Email is already registered',
    },
    AUTH004: {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Data is missing',
    },
    //#endregion Auth
      //#region Database
  DB001: {
    status: HttpStatus.CONFLICT,
    message: 'The data with the same identifier already exists',
  },
  DB002: {
    status: HttpStatus.NOT_FOUND,
    message: 'Data not found',
  },
  DB003: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Referred data is invalid',
  },
  DB004: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Failed to complete the operation',
  },
  DB005: {
    status: 503,
    message: 'Database unavailable',
  },
  //#endregion Database
}
export type ErrorCode = keyof typeof ErrorCodes;
