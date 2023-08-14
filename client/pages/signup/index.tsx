import Button from '@/components/Button';
import { signupButtonTitle } from '@/constants/constants';
import Link from 'next/link';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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
    <div className=" w-screen h-screen flex items-center justify-center bg-[#27262C]">
      <div className=" w-1/3 min-w-[350px] bg-[#7D7AFF] bg-opacity-20 backdrop-blur-lg p-10 rounded-2xl border-[1px] border-[#7D7AFF] border-opacity-100 z-10">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form>
            <div className="flex flex-col gap-5 opacity-100">
              <h1 className=" text-5xl font-semibold">KZCMS</h1>
              <h2 className="text-3xl">Sign Up</h2>
              <Field
                type="email"
                name="email"
                placeholder="Username"
                className=" bg-black bg-opacity-0 p-3 pl-1 border-b-[1.5px]"
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
              <Button buttonTitle={signupButtonTitle} width="100%" />
              <Link href={'/login'} className=" underline underline-offset-2 text-[#D0D0D0]">
                Login
              </Link>
            </div>
          </Form>
        </Formik>
      </div>

      {/* Background svgs */}
      <div className="absolute w-screen h-screen overflow-hidden">
        <svg
          width="914"
          height="914"
          viewBox="0 0 914 914"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -left-[550px] md:-left-[455px] w-[700px]"
        >
          <path
            d="M914 457C914 709.394 709.394 914 457 914C204.606 914 0 709.394 0 457C0 204.606 204.606 0 457 0C709.394 0 914 204.606 914 457Z"
            fill="#A020F0"
            fill-opacity="0.8"
          />
          <path
            d="M779 103C779 82.0132 761.987 65 741 65C720.013 65 703 82.0132 703 103C703 123.987 720.013 141 741 141C761.987 141 779 123.987 779 103Z"
            fill="#93DFFF"
          />
        </svg>
        <svg
          width="1071"
          height="1071"
          viewBox="0 0 1071 1071"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -right-[300px] -top-[600px] md:-right-[300px] w-[500px] md:w-[700px]"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.74588 478.875C6.45305 443.724 13.6302 408.869 24.2774 374.866L374.866 24.2774C408.869 13.6303 443.724 6.45311 478.875 2.74593L2.74588 478.875ZM167.745 924.888C182.089 938.441 196.998 951.05 212.394 962.717L962.717 212.394C951.05 196.998 938.441 182.089 924.888 167.745L167.745 924.888ZM321.784 1026.7C303.114 1018.59 284.812 1009.37 266.979 999.027L999.027 266.979C1009.37 284.812 1018.59 303.114 1026.7 321.784L321.784 1026.7ZM388.76 1050.62C411.114 1056.96 433.8 1061.82 456.662 1065.19L1065.19 456.662C1061.82 433.8 1056.96 411.114 1050.62 388.76L388.76 1050.62ZM633.215 1062.01C603.014 1067.6 572.427 1070.57 541.814 1070.94L1070.94 541.814C1070.57 572.427 1067.6 603.014 1062.01 633.215L633.215 1062.01ZM768.272 1017.85C820.978 992.408 870.379 957.825 914.102 914.102C957.825 870.379 992.408 820.978 1017.85 768.272L768.272 1017.85ZM878.045 123.694L123.694 878.045C110.977 862.803 99.239 847.021 88.4798 830.781L830.781 88.4798C847.021 99.239 862.803 110.977 878.045 123.694ZM55.2624 773.104L773.104 55.2624C754.193 45.896 734.844 37.7155 715.167 30.7207L30.7207 715.167C37.7155 734.844 45.896 754.193 55.2624 773.104ZM10.8703 644.124C5.92028 620.137 2.62664 595.877 0.989349 571.526L571.526 0.98938C595.877 2.62668 620.137 5.92033 644.123 10.8703L10.8703 644.124Z"
            fill="#A020F0"
            fill-opacity="0.8"
          />
        </svg>
        <svg
          width="691"
          height="663"
          viewBox="0 0 691 663"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -right-[100px] -bottom-[280px] md:-right-[200px] w-[300px] md:w-[500px]"
        >
          <path
            d="M120.365 117.539L400.913 196.295L192.434 399.879L120.365 117.539Z"
            fill="#8C40ED"
            fill-opacity="0.5"
          />
          <path
            d="M225.502 211.606L506.05 290.363L297.571 493.946L225.502 211.606Z"
            fill="#8C40ED"
            fill-opacity="0.5"
          />
          <path
            d="M334.603 304.432L615.15 383.188L406.671 586.771L334.603 304.432Z"
            fill="#8240ED"
            fill-opacity="0.5"
          />
        </svg>
      </div>
    </div>
  );
}
