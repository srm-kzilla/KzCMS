import { z } from 'zod';
export const newUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, { message: 'Must be 5 characters long or more' }),
  projects: z.array(z.string()).optional().default([]),
  created_at: z.coerce.date().optional(),
  isAdmin: z.boolean().optional().default(false),
  isVerified: z.boolean().optional().default(false),
  isDeleted: z.boolean().optional().default(false),
});

export type UserScemaType = z.infer<typeof newUserSchema>;
