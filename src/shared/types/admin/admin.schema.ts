import { z } from 'zod';

export const verifyUserSchema = z.object({
export const VerifyUserSchema = z.object({
  email: z.string().email(),
  verify: z.boolean(),
});

export const authSchema = z.object({
export const AuthSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const authGetSchema = z.object({
  email: z.string().email(),
});

export const deleteUserSchema = z.object({
  email: z.string().email(),
});

export const updateProjectSchema = z.object({
  adminEmail: z.string().email(),
  projectSlug: z.string(),
  new_user_access: z.array(z.string()),
  deleted_user_access: z.array(z.string()),
});

export type authParamType = z.infer<typeof authSchema>;
export type authGetUserType = z.infer<typeof authGetSchema>;
export type updateProjectSchemaType = z.infer<typeof updateProjectSchema>;
export const AuthGetSchema = z.object({
  email: z.string().email(),
});

export const DeleteUserSchema = z.object({
  email: z.string().email(),
});

export type AuthParamType = z.infer<typeof AuthSchema>;
export type AuthGetUserType = z.infer<typeof AuthGetSchema>;
