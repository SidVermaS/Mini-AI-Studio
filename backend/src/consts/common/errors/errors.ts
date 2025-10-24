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
    AUTH005: {
        status: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized access',
    },
    AUTH006: {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Payload is invalid',
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

   //#region General
  GEN001: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Something went wrong! Please try after sometime',
  },
  GEN002: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Invalid payload',
  },
  GEN003: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Payload is empty',
  },
  GEN004: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Invalid parameter',
  },
  GEN005: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Invalid query',
  },
  GEN006: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Invalid data',
  },
  GEN007: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Invalid input data',
  },
  //#endregion General
 
}
export type ErrorCode = keyof typeof ErrorCodes;
