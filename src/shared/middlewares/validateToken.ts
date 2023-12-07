import db from '@/loaders/database';
import LoggerInstance from '@/loaders/logger';
import { NextFunction, Request, Response } from 'express';
import { MESSAGES_TEXT } from '../constants';
import { ERRORS } from '../errors';
import { Token } from '../types';

type RequestLocation = 'body' | 'params' | 'query';

export const validateToken = ({ path }: { path: RequestLocation }) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader?.split(' ')[1];

      if (!token) {
        throw { statusCode: ERRORS.MISSING_ACCESS_TOKEN.code, message: ERRORS.MISSING_ACCESS_TOKEN.message.error };
      }

      const { id } = req[path] as { id: string };

      const tokens = (await (await db()).collection('tokens').findOne({
        projectId: id,
      })) as unknown as {
        tokens: Token[];
      } | null;

      if (!tokens || !tokens.tokens.find(t => t.token === token)) {
        throw { statusCode: ERRORS.UNAUTHORIZED.code, message: MESSAGES_TEXT.INVALID_TOKEN_OR_PROJECT_NOT_EXISTS };
      }

      next();
    } catch (error) {
      LoggerInstance.error(error);
      res
        .status(error.statusCode ?? ERRORS.UNAUTHORIZED.code)
        .json({ success: false, message: error.message ?? ERRORS.UNAUTHORIZED.message.error });
    }
  };
};
