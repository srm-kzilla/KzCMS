import { z } from 'zod';
import { EmailSchema } from '../user/user.schema';

export const VerifyUserSchema = z.object({
  email: EmailSchema,
  verify: z.boolean(),
});

const UserEmailSchema = z.array(z.string().email()).refine(
  array => {
    const set = new Set(array);
    return set.size === array.length;
  },
  {
    message: 'Array must contain unique email addresses',
  },
);

export const UpdateProjectSchema = z.object({
  adminEmail: EmailSchema,
  projectSlug: z.string(),
  newUserAccess: UserEmailSchema,
  deletedUserAccess: UserEmailSchema,
});

export const GetTokenSchema = z.object({
  projectSlug: z.string(),
});

export type UpdateProjectSchemaType = z.infer<typeof UpdateProjectSchema>;
export type VerifyUserType = z.infer<typeof VerifyUserSchema>;
export type GetTokenSchemaType = z.infer<typeof GetTokenSchema>;
