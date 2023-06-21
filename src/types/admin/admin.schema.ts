import { z } from 'zod';

export const verifyUserSchema = z.object({
  email: z.string().email(),
  verify: z.boolean(),
});
