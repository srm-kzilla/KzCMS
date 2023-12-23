import db from '@/loaders/database';
import LoggerInstance from '@/loaders/logger';
import { NextFunction, Request, Response } from 'express';
import { MESSAGES_TEXT } from '../constants';
import { ERRORS } from '../errors';
import { ProjectIdType } from '../types';
import { sha256 } from '../utils/hash';

type RequestLocation = 'body' | 'params' | 'query';

export const validateToken = ({ idFrom }: { idFrom: RequestLocation }) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers['api_key'] as string | undefined;

      if (!token) {
        throw {
          statusCode: ERRORS.MISSING_ACCESS_TOKEN.code,
          message: ERRORS.MISSING_ACCESS_TOKEN.message.error,
          description: ERRORS.MISSING_ACCESS_TOKEN.message.error_description,
        };
      }

      const { projectId } = req[idFrom] as ProjectIdType;

      const hashedToken = sha256.hash(token);

      const tokenExists = await (await db()).collection('tokens').findOne(
        { projectId, token: hashedToken },
        {
          projection: {
            projectId: 1,
          },
        },
      );

      if (!tokenExists) {
        throw {
          statusCode: ERRORS.UNAUTHORIZED.code,
          message: MESSAGES_TEXT.INVALID_TOKEN_OR_PROJECT_NOT_EXISTS,
          description: ERRORS.UNAUTHORIZED.message.error_description,
        };
      }

      next();
    } catch (error) {
      LoggerInstance.error(error);
      res.status(error.statusCode ?? ERRORS.UNAUTHORIZED.code).json({
        success: false,
        message: error.message ?? ERRORS.UNAUTHORIZED.message.error,
        description: ERRORS.UNAUTHORIZED.message.error_description,
      });
    }
  };
};
