import { NextFunction, Request, Response } from 'express';
import { verifyToken } from './jwt';
import db from '@/loaders/database';
import { ERRORS } from '../errors';

export default function authenticateToken({ verifyAdmin } = { verifyAdmin: false }) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader?.split(' ')[1];

      if (!token) {
        throw { statusCode: ERRORS.MISSING_ACCESS_TOKEN.code, message: ERRORS.MISSING_ACCESS_TOKEN.message };
      }

      const { email } = verifyToken(token);

      const data = await (await db()).collection('users').findOne({ email });

      if (!data) {
        throw { statusCode: ERRORS.USER_NOT_FOUND.code, message: ERRORS.USER_NOT_FOUND.message };
      }

      if (verifyAdmin && !data.isAdmin) {
        throw { statusCode: ERRORS.FORBIDDEN_ACCESS_ERROR.code, message: ERRORS.FORBIDDEN_ACCESS_ERROR.message };
      }

      if (!verifyAdmin && !data.isVerified) {
        throw { statusCode: ERRORS.FORBIDDEN_ACCESS_ERROR.code, message: ERRORS.FORBIDDEN_ACCESS_ERROR.message };
      }

      res.locals.user = data;

      next();
    } catch (error) {
      res
        .status(error.statusCode ?? ERRORS.UNAUTHORIZED.code)
        .json({ success: false, message: error.message ?? ERRORS.UNAUTHORIZED.message.error });
    }
  };
}
