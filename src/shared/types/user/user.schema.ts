import { z } from 'zod';

export const UserSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z.string().min(5, { message: 'Must be 5 characters long or more' }),
  created_at: z.coerce.date().optional(),
  isAdmin: z.boolean().optional().default(false),
  isVerified: z.boolean().optional().default(false),
  isDeleted: z.boolean().optional().default(false),
});

export type UserType = z.infer<typeof UserSchema>;
