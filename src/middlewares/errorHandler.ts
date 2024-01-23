import { NextFunction, Request, Response } from 'express';

import { CustomError } from '@/errors/customErrors';
import { InternalServerError, toHttpError } from '@/errors/httpErrors';
import { logger } from '@/utils/logging/logger';

export function errorHandler(
  err: CustomError | Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (res.headersSent) {
    next(err);
    return;
  }

  const httpError = toHttpError(err);

  if (httpError instanceof InternalServerError) {
    logger.error(`Internal server error: ${httpError.stack}`);
  }

  res.status(httpError.statusCode).json({
    errors: {
      code: httpError.name,
      message: httpError.message,
    },
  });
}
