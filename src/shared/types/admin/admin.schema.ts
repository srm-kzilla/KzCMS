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

export const UpdateProjectSchema = z.object({
  adminEmail: z.string().email(),
  projectSlug: z.string(),
  new_user_access: z.array(z.string()),
  deleted_user_access: z.array(z.string()),
});

export type AuthParamType = z.infer<typeof AuthSchema>;
export type AuthGetUserType = z.infer<typeof AuthGetSchema>;
export type UpdateProjectSchemaType = z.infer<typeof UpdateProjectSchema>;
