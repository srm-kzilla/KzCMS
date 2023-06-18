import * as yup from 'yup';

export const adminSchema = yup.object({
  email: yup.string().required(),
  projectSlug: yup.array().required(),
});

export type Admin = yup.InferType<typeof adminSchema>;
