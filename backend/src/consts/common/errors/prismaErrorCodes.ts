import { ErrorCode } from "./errors";

export const PrismaErrorCodes = {
  UNIQUE_VIOLATION: 'P2002',
  RECORD_NOT_FOUND: 'P2025',
  FOREIGN_KEY_CONSTRAINT: 'P2003',
  CONNECTION_ERROR: 'P1001',
  QUERY_EXECUTION_ERROR: 'P2010',
  VALUE_TOO_LONG: 'P2000',
  GENERIC: 'GENERIC',
};
export type PrismaErrorCode = keyof typeof PrismaErrorCodes;

export type PrismaAppError = Partial<Record<PrismaErrorCode, ErrorCode>>;