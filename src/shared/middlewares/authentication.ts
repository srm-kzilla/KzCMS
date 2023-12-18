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
        throw {
          statusCode: ERRORS.MISSING_ACCESS_TOKEN.code,
          message: ERRORS.MISSING_ACCESS_TOKEN.message.error,
          description: ERRORS.MISSING_ACCESS_TOKEN.message.error_description,
        };
      }

      const { email } = verifyToken(token);

      const data = await (await db()).collection('users').findOne({ email });

      if (!data) {
        throw {
          statusCode: ERRORS.USER_NOT_FOUND.code,
          message: ERRORS.USER_NOT_FOUND.message.error,
          description: ERRORS.USER_NOT_FOUND.message.error_description,
        };
      }

      if (verifyAdmin && !data.isAdmin) {
        throw {
          statusCode: ERRORS.FORBIDDEN_ACCESS_ERROR.code,
          message: ERRORS.FORBIDDEN_ACCESS_ERROR.message.error,
          description: ERRORS.FORBIDDEN_ACCESS_ERROR.message.error_description,
        };
      }

      if (!verifyAdmin && !data.isVerified) {
        throw {
          statusCode: ERRORS.FORBIDDEN_ACCESS_ERROR.code,
          message: ERRORS.FORBIDDEN_ACCESS_ERROR.message.error,
          description: ERRORS.FORBIDDEN_ACCESS_ERROR.message.error_description,
        };
      }

      res.locals.user = data;

      next();
    } catch (error) {
      LoggerInstance.error(error);
      res
        .status(error.statusCode ?? ERRORS.UNAUTHORIZED.code)
        .json({
          success: false,
          message: error.message ?? ERRORS.UNAUTHORIZED.message.error,
          description: ERRORS.UNAUTHORIZED.message.error_description,
        });
    }
  };
}
