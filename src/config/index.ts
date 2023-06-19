require('dotenv').config();
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
  level: z.enum(['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly']).optional().default('silly'),

  prefix: z.string().optional().default('/api'),
});

/**
 * Parses the environment variables using the schema defined above
 */

const parsedSchema = envSchema.parse(process.env);

/**
 * Exports the Updated Schema
 */
export default {
  NODE_ENV: parsedSchema.NODE_ENV,

  port: parsedSchema.port,

  databaseURL: parsedSchema.databaseURL,

  JWT_SECRET: parsedSchema.JWT_SECRET,

  logs: {
    level: parsedSchema.level,
  },

  api: {
    prefix: parsedSchema.prefix,
  },
};
