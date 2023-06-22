import * as JWT from 'jsonwebtoken';
import config from '../../config/';

export default function generateToken(email: string): string {
  return JWT.sign({ email }, config.JWT_SECRET, {
    expiresIn: '30d',
  });
}

export function verifyToken(token: string) {
  const data = JWT.verify(token, config.JWT_SECRET) as string;

  return JSON.parse(data) as { email: string };
}
