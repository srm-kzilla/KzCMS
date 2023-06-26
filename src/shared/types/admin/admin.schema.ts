import { z } from 'zod';

export const verifyUserSchema = z.object({
  email: z.string().email(),
  verify: z.boolean(),
});

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const authGetSchema = z.object({
  email: z.string().email(),
});

export const deleteUserSchema = z.object({
  email: z.string().email(),
});
export const userDetailsSchema = z.object({
  userid: z.string(),
});

export type authParamType = z.infer<typeof authSchema>;
export type authGetUserType = z.infer<typeof authGetSchema>;
