require('dotenv').config();
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  port: z.number().int().positive().optional().default(5050),
  databaseURL: z.string().startsWith('mongodb+srv://').includes('mongodb.net'),
  JWT_SECRET: z.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/),
  level: z.enum(['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly']).optional().default('silly'),
  prefix: z.string().optional().default('/api'),
});

const parsedSchema = envSchema.parse(process.env);

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
