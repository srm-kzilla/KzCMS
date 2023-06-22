import { NextFunction, Request, Response } from 'express';
import db from '../../loaders/database';
import { verifyToken } from './jwt';
import LoggerInstance from '../../loaders/logger';

export default async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
      LoggerInstance.error('Token Not Found');
      throw { statusCode: 401, message: 'Token Not Found' };
    }

    const jwtData = verifyToken(token);

    const data = await (await db()).collection('users').findOne({ email: jwtData.email });

    if (!data) {
      LoggerInstance.error('User Not Found');
      throw { statusCode: 401, message: 'User Not Found' };
    }

    if (!data.isAdmin && !data.isVerified) {
      throw { statusCode: 401, message: 'Not authorized' };
    }

    res.locals.user = data;

    next();
  } catch (error) {
    LoggerInstance.error(error);
    res.status(401).json({ success: false, message: error.message ?? 'Internal server error' });
  }
}
