import { z } from 'zod';

export const userDetailsSchema = z.object({
  email: z.string().email(),
});

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, { message: 'Must be 5 characters long or more' }),
  created_at: z.coerce.date().optional(),
  isAdmin: z.boolean().optional().default(false),
  isVerified: z.boolean().optional().default(false),
  isDeleted: z.boolean().optional().default(false),
});

export type userType = z.infer<typeof userSchema>;
export type userDetailsType = z.infer<typeof userDetailsSchema>;
