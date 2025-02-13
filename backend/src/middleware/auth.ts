import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
}

export interface AuthRequest extends Request {
  user: JwtPayload;
}

export const auth = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Please authenticate' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    (req as AuthRequest).user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Please authenticate' });
  }
}) as RequestHandler; 