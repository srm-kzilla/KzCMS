import { NextFunction, Request, Response } from 'express';
import db from '../../loaders/database';
import { verifyToken } from './jwt';
import LoggerInstance from '../../loaders/logger';

export default function authenticateToken(verifyAdmin: boolean) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader?.split(' ')[1];

      if (!token) {
        LoggerInstance.error('Token Not Found');
        throw { statusCode: 401, message: 'Token Not Found' };
      }

      const { email } = verifyToken(token);

      const data = await (await db()).collection('users').findOne({ email });

      if (!data) {
        LoggerInstance.error('User Not Found');
        throw { statusCode: 404, message: 'User Not Found' };
      }

      if (verifyAdmin && !data.isAdmin) {
        LoggerInstance.error('User Not Admin');
        throw { statusCode: 403, message: 'User Not Admin' };
      }

      if (!verifyAdmin && !data.isVerified) {
        LoggerInstance.error('User Not Verified');
        throw { statusCode: 403, message: 'User Not Verified' };
      }

      res.locals.user = data;

      next();
    } catch (error) {
      LoggerInstance.error(error);
      res.status(error.statusCode ?? 500).json({ success: false, message: error.message ?? 'Internal server error' });
    }
  };
}
