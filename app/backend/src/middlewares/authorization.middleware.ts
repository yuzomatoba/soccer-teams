import { Request, Response, NextFunction, RequestHandler } from 'express';
import * as jwt from 'jsonwebtoken';

const authorizationMiddleware:
RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  try {
    const user = jwt.verify(authorization, process.env.JWT_SECRET as string);
    req.body.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid valid token' });
  }
};

export default authorizationMiddleware;
