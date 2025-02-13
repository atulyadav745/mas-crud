// src/utils/asyncHandler.ts
import { Response, NextFunction, RequestHandler } from 'express';
import { AuthRequest } from '../middleware/auth';

export const asyncHandler = (
  fn: (req: AuthRequest, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
  return (req, res, next) => {
    // Assert req as AuthRequest so that our controller function sees req.user
    Promise.resolve(fn(req as AuthRequest, res, next)).catch(next);
  };
};
