import { StatusCodes } from 'http-status-codes';

import { CustomError, ErrorCode } from './customErrors';

export class HttpError extends Error {
  public statusCode: number;

  public constructor(statusCode: number, code: string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = code;
  }
}

export class NotFoundError extends HttpError {
  public constructor(code: string, message: string) {
    super(StatusCodes.NOT_FOUND, code, message);
  }
}

export class InternalServerError extends HttpError {
  public stack: string | undefined;

  public constructor(stack: string | undefined, message: string) {
    super(StatusCodes.INTERNAL_SERVER_ERROR, ErrorCode.UNKNOWN_ERROR, message);
    this.stack = stack;
  }
}

export function toHttpError(customError: CustomError | Error): HttpError {
  switch (customError.name) {
    case ErrorCode.PATH_NOT_FOUND_ERROR:
      return new NotFoundError(customError.name, customError.message);
    default:
      return new InternalServerError(
        customError.stack,
        process.env.NODE_ENV === 'development'
          ? customError.message
          : 'The server is temporarily unable to service your request.',
      );
  }
}
