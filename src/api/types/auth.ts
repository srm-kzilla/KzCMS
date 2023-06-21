import { z } from 'zod';

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const authGetSchema = z.object({
  email: z.string().email(),
});

export type authParamType = z.infer<typeof authSchema>;
export type authGetUserType = z.infer<typeof authGetSchema>;
