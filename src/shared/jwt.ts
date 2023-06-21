import * as jwt from 'jsonwebtoken';

export async function generateAuthToken(email, id) {
  const SECRET_KEY = process.env.JWT_SECRET;
  const token = jwt.sign({ email: email, id: id }, SECRET_KEY, { expiresIn: '30d' });
  return token;
}