import { z } from 'zod';

export const VerifyUserSchema = z.object({
  email: z.string().email(),
  verify: z.boolean(),
});

export const AuthSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const AuthGetSchema = z.object({
  email: z.string().email(),
});

export const DeleteUserSchema = z.object({
  email: z.string().email(),
});
export const userDetailsSchema = z.object({
  userid: z.string(),
});

export type AuthParamType = z.infer<typeof AuthSchema>;
export type AuthGetUserType = z.infer<typeof AuthGetSchema>;
