import { z } from 'zod';
import { EMAIL_REGEX_PATTERN } from '@/shared/constants';

export const EmailSchema = z
  .string()
  .email()
  .refine(email => {
    return EMAIL_REGEX_PATTERN.test(email);
  }, "Invalid email format");

export const UserSchema = z.object({
  email: EmailSchema,
  password: z.string().min(5, { message: 'Must be 5 characters long or more' }),
  created_at: z.coerce.date().optional(),
  isAdmin: z.boolean().optional().default(false),
  isVerified: z.boolean().optional().default(false),
  isDeleted: z.boolean().optional().default(false),
});

export type UserType = z.infer<typeof UserSchema>;
