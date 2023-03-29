import * as jsonwebtoken from 'jsonwebtoken';

type JWT = {
  email: string;
};

export default function tokenValidation(token: string) {
  const secretWord = process.env.JWT_SECRET as string;
  const credential = jsonwebtoken.verify(token, secretWord);
  return credential as JWT;
}
