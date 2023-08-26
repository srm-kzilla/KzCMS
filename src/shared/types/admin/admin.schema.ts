import { z } from 'zod';
import { emailSchema } from '../user/user.schema';

export const VerifyUserSchema = z.object({
  email: emailSchema,
  verify: z.boolean(),
});

export const UpdateProjectSchema = z.object({
  adminEmail: emailSchema,
  projectSlug: z.string(),
  newUserAccess: z.array(z.string().email()),
  deletedUserAccess: z.array(z.string().email()),
});

export type UpdateProjectSchemaType = z.infer<typeof UpdateProjectSchema>;
export type VerifyUserType = z.infer<typeof VerifyUserSchema>;
