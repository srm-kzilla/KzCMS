import { z } from 'zod';

export const AuthSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z.string().min(5, { message: 'Must be 5 characters long or more' }),
});

export const AuthGetSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
});

export type UserSchemaType = z.infer<typeof AuthSchema>;
export type AuthGetUserType = z.infer<typeof AuthGetSchema>;
