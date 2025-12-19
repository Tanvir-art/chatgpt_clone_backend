import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

export const internalAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const key = req.headers['x-internal-key'];

  if (key !== process.env.INTERNAL_API_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next();
};
