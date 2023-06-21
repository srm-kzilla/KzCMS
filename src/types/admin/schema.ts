import { z } from 'zod';

export const deleteUserSchema = z.object({
  email: z.string().email(),
});
