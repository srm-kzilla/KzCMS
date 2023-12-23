import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import server from "@/utils/server";
import nookies, { setCookie } from "nookies";
import { useRouter } from "next/router";
import { type ChangeEvent, useState } from "react";
import type { GetServerSidePropsContext } from "next";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await server.post("/api/auth/login", user);

      setCookie(null, "token", res.data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      await router.push("/");
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.description);
        setError(err.response?.data.description);
        return;
      }
      setError("Something Went Wrong!");
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
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
            onSubmit={handleSubmit}
            className="flex w-full flex-col items-center gap-5 p-6 lg:w-96"
          >
            <div>
              <h1 className="text-2xl font-bold text-highlight">Login</h1>
            </div>
            <div className="flex w-full flex-col gap-2">
              <div>
                <input
                  className="w-full rounded-xl bg-secondary px-4 py-4 outline-none"
                  type="email"
                  placeholder="user@gmail.com"
                  name="email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <input
                  className="w-full rounded-xl bg-secondary px-4 py-4 outline-none"
                  type="password"
                  placeholder="password"
                  name="password"
                  onChange={handleChange}
                  minLength={6}
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-highlight p-2 text-xl font-medium"
                >
                  Login
                </button>
              </div>
              <div className="flex w-full justify-center">
                <h1 className="text-card-gray">
                  Not a user?{" "}
                  <Link className="text-highlight" href="/sign-up">
                    Sign Up
                  </Link>
                </h1>
              </div>
              {error.trim() && (
                <div className="flex w-full justify-center">
                  <h1 className="text-red-500"> {error} </h1>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

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
