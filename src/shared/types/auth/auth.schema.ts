import { z } from 'zod';
import { EmailSchema } from '@/shared/types';

export const AuthSchema = z.object({
  email: EmailSchema,
  password: z.string().min(5, { message: 'Must be 5 characters long or more' }),
});

export const AuthGetSchema = z.object({
  email: EmailSchema,
});

export type UserSchemaType = z.infer<typeof AuthSchema>;
export type AuthGetUserType = z.infer<typeof AuthGetSchema>;
