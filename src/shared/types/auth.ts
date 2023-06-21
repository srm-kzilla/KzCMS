import { z } from 'zod';
export const authSchema = z.object({
  email: z.string().email(),
  hash: z.string(),
});

export type authParamType = z.infer<typeof authSchema>;
