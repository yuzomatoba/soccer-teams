import * as jwt from 'jsonwebtoken';
import IUser from '../interfaces/ILogin';

export default function generatingToken(user: IUser) {
  const payload = { email: user.email, username: user.username };
  const secretWord = process.env.JWT_SECRET as string;
  return jwt.sign(payload, secretWord, { algorithm: 'HS256', expiresIn: '1d' });
}
