import { z } from 'zod';
import { emailSchema } from '../user/user.schema';

export const VerifyUserSchema = z.object({
  email: emailSchema,
  verify: z.boolean(),
});

const userEmailSchema = z.array(z.string().email()).refine(
  array => {
    const set = new Set(array);
    return set.size === array.length;
  },
  {
    message: 'Array must contain unique email addresses',
  },
)

export const UpdateProjectSchema = z.object({
  adminEmail: emailSchema,
  projectSlug: z.string(),
  newUserAccess: userEmailSchema,
  deletedUserAccess: userEmailSchema
});

export type UpdateProjectSchemaType = z.infer<typeof UpdateProjectSchema>;
export type VerifyUserType = z.infer<typeof VerifyUserSchema>;
