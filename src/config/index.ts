import { MONGODB_URI_REGEX_PATTERN } from '@/shared/constants';
import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.string().regex(/^\d+$/).optional().default('5050'),
  MONGODB_URI: z.string().refine(value => {
    return MONGODB_URI_REGEX_PATTERN.test(value);
  }, 'Invalid MongoDB URI'),
  JWT_SECRET: z.string(),
  LEVEL: z.enum(['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly']).optional().default('silly'),
  PREFIX: z.string().optional().default('/api'),
  AWS_REGION: z.string().optional().default('ap-south-1'),
  AWS_CLIENT_KEY: z.string(),
  AWS_CLIENT_SECRET: z.string(),
  AWS_BUCKET_NAME: z.string(),
});

const parsedSchema = envSchema.parse(process.env);

export type envSchemaType = z.infer<typeof envSchema>;

export default {
  NODE_ENV: parsedSchema.NODE_ENV,

  PORT: parsedSchema.PORT,

  MONGODB_URI: parsedSchema.MONGODB_URI,

  JWT_SECRET: parsedSchema.JWT_SECRET,

  LOGS: {
    LEVEL: parsedSchema.LEVEL,
  },

  API: {
    PREFIX: parsedSchema.PREFIX,
  },

  AWS: {
    region: parsedSchema.AWS_REGION,
    clientKey: parsedSchema.AWS_CLIENT_KEY,
    clientSecret: parsedSchema.AWS_CLIENT_SECRET,
    bucketName: parsedSchema.AWS_BUCKET_NAME,
  },
};
