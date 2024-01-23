import { NextFunction, Request, Response } from 'express';

import { PathNotFoundError } from '@/errors/customErrors';

export function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  return next(PathNotFoundError('Path not found.'));
}
