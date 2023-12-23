import crypto from 'crypto';

export const sha256 = {
  hash: (code: string) => crypto.createHash('sha256').update(code).digest('hex'),
  verify: (code: string, hashedCode: string) => sha256.hash(code) === hashedCode,
};
