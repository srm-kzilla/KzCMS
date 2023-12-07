import { z } from 'zod';

export const VerifyUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
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

export const TokenSchema = z.object({
  name: z.string(),
  token: z.string(),
});

export const TokenGetSchema = z.object({
  projectId: z.string(),
});

export const TokenUpdateSchema = z.object({
  projectId: z.string(),
  name: z.string(),
});

export type UpdateProjectSchemaType = z.infer<typeof UpdateProjectSchema>;
export type VerifyUserType = z.infer<typeof VerifyUserSchema>;

export type Token = z.infer<typeof TokenSchema>;
export type TokenCreateSchemaType = Pick<Token, 'name'>;
export type TokenGetSchemaType = z.infer<typeof TokenGetSchema>;
export type TokenUpdateSchemaType = z.infer<typeof TokenUpdateSchema>;
