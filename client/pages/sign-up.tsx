import React, { useState } from "react";
import server from "@/utils/server";
import Image from "next/image";
import { useRouter } from "next/router";
import nookies from "nookies";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

const SignUp = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSUbmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await server.post("/api/auth/signup", user);
      router.push("/login");
    } catch (err: any) {
      setError(!error);
    }
  };

  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>
      <div className="flex min-h-screen w-full flex-col bg-primary">
        <div className="flex h-[90px] w-full items-center gap-5 p-6">
          <div>
            <Image
              src="/srmkzilla-gradient-logo.svg"
              alt="/"
              width={40}
              height={40}
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">KzCMS</h1>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <form
            onSubmit={handleSUbmit}
            className="flex w-full flex-col items-center gap-5 p-6 lg:w-96"
          >
            <div>
              <h1 className="text-2xl font-bold text-highlight">SignUp</h1>
            </div>
            <div className="flex w-full flex-col gap-2">
              <div>
                <input
                  className="w-full rounded-xl bg-secondary px-4 py-4 outline-none"
                  type="email"
                  placeholder="user@gmail.com"
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  className="w-full rounded-xl bg-secondary px-4 py-4 outline-none"
                  type="password"
                  placeholder="password"
                  name="password"
                  onChange={handleChange}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-highlight p-2 text-xl font-medium"
                >
                  SignUp
                </button>
              </div>
              <div className="flex w-full justify-center">
                <h1 className="text-card-gray">
                  Already a user?{" "}
                  <Link className="text-highlight" href={"/login"}>
                    Login
                  </Link>
                </h1>
              </div>
              {error && (
                <div className="flex w-full justify-center">
                  <h1 className="text-red-500">Something went wrong</h1>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);

  if (cookies.token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
