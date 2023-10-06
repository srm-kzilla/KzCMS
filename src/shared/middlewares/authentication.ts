import { NextFunction, Request, Response } from 'express';
import { verifyToken } from './jwt';
import LoggerInstance from '@/loaders/logger';
import db from '@/loaders/database';
import { ERRORS } from '../errors';

export default function authenticateToken({ verifyAdmin } = { verifyAdmin: false }) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader?.split(' ')[1];

      if (!token) {
        LoggerInstance.error('Token Not Found');
        throw { statusCode: ERRORS.MISSING_ACCESS_TOKEN.code, message: ERRORS.MISSING_ACCESS_TOKEN.message };
      }

      const { email } = verifyToken(token);

      const data = await (await db()).collection('users').findOne({ email });

      if (!data) {
        LoggerInstance.error('User Not Found');
        throw { statusCode: ERRORS.RESOURCE_NOT_FOUND.code, message: ERRORS.RESOURCE_NOT_FOUND.message };
      }

      if (verifyAdmin && !data.isAdmin) {
        LoggerInstance.error('User Not Admin');
        throw { statusCode: ERRORS.FORBIDDEN_ACCESS_ERROR.code, message: ERRORS.FORBIDDEN_ACCESS_ERROR.message };
      }

      if (!verifyAdmin && !data.isVerified) {
        LoggerInstance.error('User Not Verified');
        throw { statusCode: ERRORS.FORBIDDEN_ACCESS_ERROR.code, message: ERRORS.FORBIDDEN_ACCESS_ERROR.message };
      }

      res.locals.user = data;

      next();
    } catch (error) {
      LoggerInstance.error(error);
      res
        .status(error.statusCode ?? ERRORS.UNAUTHORIZED.code)
        .json({ success: false, message: error.message ?? ERRORS.UNAUTHORIZED.message.error });
    }
  };
}
