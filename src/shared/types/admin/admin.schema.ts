import { z } from 'zod';
import { emailSchema } from '../user/user.schema';

export const VerifyUserSchema = z.object({
  email: emailSchema,
  verify: z.boolean(),
});

export const UpdateProjectSchema = z.object({
  adminEmail: emailSchema,
  projectSlug: z.string(),
  newUserAccess: z.array(z.string().email()).refine(
    array => {
      const set = new Set(array);
      return set.size === array.length;
    },
    {
      message: 'Array must contain unique email addresses',
    },
  ),
  deletedUserAccess: z.array(z.string().email()).refine(
    array => {
      const set = new Set(array);
      return set.size === array.length;
    },
    {
      message: 'Array must contain unique email addresses',
    },
  ),
});

export type UpdateProjectSchemaType = z.infer<typeof UpdateProjectSchema>;
