import { z } from 'zod';

export const VerifyUserSchema = z.object({
  email: z.string().email(),
  verify: z.boolean(),
});

export const UpdateProjectSchema = z.object({
  adminEmail: z.string().email(),
  projectSlug: z.string(),
  newUserAccess: z.array(z.string().email()),
  deletedUserAccess: z.array(z.string().email()),
});

export type UpdateProjectSchemaType = z.infer<typeof UpdateProjectSchema>;
export type VerifyUserType = z.infer<typeof VerifyUserSchema>;
