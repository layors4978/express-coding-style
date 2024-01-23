export class CustomError extends Error {
  public constructor(code: string, message: string) {
    super(message);
    this.name = code;
  }
}

export enum ErrorCode {
  PATH_NOT_FOUND_ERROR = 'PATH_NOT_FOUND_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export function toCustomError(code: string, message: string): CustomError {
  return new CustomError(code, message);
}

export function PathNotFoundError(message: string): CustomError {
  return toCustomError(ErrorCode.PATH_NOT_FOUND_ERROR, message);
}
