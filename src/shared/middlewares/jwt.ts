import * as JWT from 'jsonwebtoken';
import config from '../../config/';

export default function generateToken(email: string): string {
  return JWT.sign({ email: email }, config.JWT_SECRET, {
    expiresIn: '30d',
  });
}
