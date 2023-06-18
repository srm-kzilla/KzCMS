import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

export const signupSchema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

export const userSchema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

export type Login = yup.InferType<typeof loginSchema>;
export type Signup = yup.InferType<typeof signupSchema>;
export type User = yup.InferType<typeof userSchema>;
