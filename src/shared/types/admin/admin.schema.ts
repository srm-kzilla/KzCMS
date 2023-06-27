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

export const updateProjectSchema = z.object({
  adminEmail: z.string().email(),
  projectSlug: z.string(),
  new_user_access: z.array(z.string()),
  deleted_user_access: z.array(z.string()),
});

export type AuthParamType = z.infer<typeof authSchema>;
export type AuthGetUserType = z.infer<typeof authGetSchema>;
export type UpdateProjectSchemaType = z.infer<typeof updateProjectSchema>;
