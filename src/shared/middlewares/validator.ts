import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

type RequestLocation = 'query' | 'body' | 'params';

export function validateRequest(location: RequestLocation, schema: z.AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    let _location: Record<string, unknown> | string | string[] | undefined;
    switch (location) {
      case 'query':
        _location = req.query;
        break;
      case 'body':
        _location = req.body;
        break;
      case 'params':
        _location = req.params;
        break;
    }
    try {
      await schema.parseAsync(_location);
      next();
    } catch (error) {
      const message = error.errors[0];
      return res.status(421).json({ error: message });
    }
  };
}
