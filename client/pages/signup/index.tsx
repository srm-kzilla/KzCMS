import Button from '@/components/Button';
import { kzCMSTitle, loginTitle, signupTitle } from '@/constants/constants';
import Link from 'next/link';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Required'),
});

const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

export default function Signup() {
  const handleSubmit = (values: typeof initialValues) => {
    console.log(values);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-login-grey">
      <div className="w-1/3 min-w-[350px] bg-login-blue bg-opacity-20 backdrop-blur-lg p-10 rounded-2xl border-[1px] border-login-blue border-opacity-100 z-10">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form>
            <div className="flex flex-col gap-5 opacity-100">
              <h1 className="text-5xl font-semibold">{kzCMSTitle}</h1>
              <h2 className="text-3xl">{signupTitle}</h2>
              <Field
                type="email"
                name="email"
                placeholder="Username"
                className="bg-black bg-opacity-0 p-3 pl-1 border-b-[1.5px]"
                required
              />
              <ErrorMessage name="email" component="div" className="error text-xs text-gray-300" />
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="bg-black bg-opacity-0 p-3 pl-1 border-b-[1.5px]"
                minLength={6}
                required
              />
              <ErrorMessage name="password" component="div" className="error text-xs text-gray-300" />
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="bg-black bg-opacity-0 p-3 pl-1 border-b-[1.5px]"
              />
              <ErrorMessage name="confirmPassword" component="div" className="error text-xs text-gray-300" />
              <Button buttonTitle={signupTitle} width="100%" />
              <Link href={'/login'} className="underline underline-offset-2 text-gray-300">
                {loginTitle}
              </Link>
            </div>
          </Form>
        </Formik>
      </div>

      {/* Background svgs */}
      <div className="absolute w-screen h-screen overflow-hidden">
        <div className="absolute -left-[550px] md:-left-[455px] w-[700px] top-24">
          <Image src={'/bgCircle.svg'} alt="bgCircle" height={914} width={914} />
        </div>
        <div className="absolute -right-[300px] -top-[315px] md:-top-[410px] md:-right-[300px] w-[500px] md:w-[700px]">
          <Image src={'/bgDashedCircle.svg'} alt="bgCircle" height={914} width={914} />
        </div>
        <div className="absolute -right-[100px] -bottom-[90px] md:-bottom-[190px] md:-right-[200px] w-[300px] md:w-[500px]">
          <Image src={'/bgArrows.svg'} alt="bgCircle" height={914} width={914} />
        </div>
      </div>
    </div>
  );
}
