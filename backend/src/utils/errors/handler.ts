import { PrismaAppError, PrismaErrorCodes } from "@consts/index";
import {AppError} from "errors/index";
import { Prisma } from "generated/prisma";

export const errorHandler = (error: unknown, mappedError?: PrismaAppError) => {
  if (error instanceof AppError) {
    throw error;
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case PrismaErrorCodes.UNIQUE_VIOLATION:
        throw new AppError(mappedError?.['UNIQUE_VIOLATION'] ?? 'DB001');
      case PrismaErrorCodes.RECORD_NOT_FOUND:
        throw new AppError(mappedError?.['RECORD_NOT_FOUND'] ?? 'DB002');
      case PrismaErrorCodes.FOREIGN_KEY_CONSTRAINT:
        throw new AppError(mappedError?.['FOREIGN_KEY_CONSTRAINT'] ?? 'DB003');
      default:
        throw new AppError(mappedError?.['GENERIC'] ?? 'DB004');
    }
  } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    throw new AppError(mappedError?.['GENERIC'] ?? 'DB004');
  } else if (error instanceof Prisma.PrismaClientInitializationError) {
    throw new AppError(mappedError?.['GENERIC'] ?? 'DB004');
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    throw new AppError(mappedError?.['GENERIC'] ?? 'DB004');
  }
  throw error;
};
