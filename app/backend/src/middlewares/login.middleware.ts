import { Request, Response, NextFunction } from 'express';
// import loginFieldsValidation from '../utils/validation/login.validation';

const loginValidation = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  // Apoio do Gabriel Palhares para resolver o problema de validação e email e senha.
  // const message = loginFieldsValidation(req.body);
  if (!/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(email) || password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  // if (message) return res.status(400).json({ message });
  next();
};

export default loginValidation;
