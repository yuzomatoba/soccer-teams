import { Request, Response, NextFunction } from 'express';
import loginFieldsValidation from '../utils/validation/login.validation';

const loginValidation = (req: Request, res: Response, next: NextFunction) => {
  const message = loginFieldsValidation(req.body);

  if (message) return res.status(400).json({ message });

  next();
};

export default loginValidation;
