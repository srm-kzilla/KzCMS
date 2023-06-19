require('dotenv').config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),

  /**
   * Enforce the port to be an positive integer | optional | default: 5050
   */
  port: z.number().int().positive().optional().default(5050),

  /**
   *  Validates if the string provided is a valid MongoDB connection string | required
   */
  databaseURL: z.string().startsWith('mongodb+srv://').includes('mongodb.net'),

  /**
   * Validates if the string provided is a valid JWT secret | required
   */
  JWT_SECRET: z.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/),

  /**
   * Enforce the log level to be one of the following: error, warn, info, http, verbose, debug, silly | optional | default: silly
   */
  logs: z.object({
    level: z.enum(['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly']).optional().default('silly'),
  }),

  api: z.object({
    prefix: z.string().optional().default('/api'),
  }),
});

export default envSchema.parse(process.env);
