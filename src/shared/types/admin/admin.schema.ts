import { z } from 'zod';
import { EmailSchema } from '@/shared/types';

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
  projectSlug: z.string(),
  userAccess: UserEmailSchema,
});

export const UpdateDomainsSchema = z.object({
  projectSlug: z.string(),
  allowedDomains: z.array(z.string()),
});

export type UpdateProjectSchemaType = z.infer<typeof UpdateProjectSchema>;
export type VerifyUserType = z.infer<typeof VerifyUserSchema>;
export type UpdateDomainsSchemaType = z.infer<typeof UpdateDomainsSchema>;
