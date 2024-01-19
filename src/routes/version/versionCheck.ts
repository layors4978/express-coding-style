import { VERSION } from '@/env';
import { NextFunction, Request, Response } from 'express';

export function versionCheck(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  res.json({ version: VERSION });
}
