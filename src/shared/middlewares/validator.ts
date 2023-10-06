import { z } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { ERRORS } from '../errors';

type RequestLocation = 'query' | 'body' | 'params';

export function validateRequest(location: RequestLocation, schema: z.AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req[location] = await schema.parseAsync(req[location]);
      next();
    } catch (error) {
      const message = error;
      return res.status(ERRORS.MALFORMED_BODY.code).json({ error: ERRORS.MALFORMED_BODY, message });
    }
  };
}
