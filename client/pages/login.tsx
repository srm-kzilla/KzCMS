import React from 'react';
import server from '@/utils/server';
import Image from 'next/image';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { useRouter } from 'next/router';

const Login = () => {
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });
  const [error, setError] = React.useState(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSUbmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await server.post('/api/auth/login', user);

      setCookie(null, 'token', response.data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });

      router.push('/');
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-primary flex flex-col">
      <div className="w-full h-[90px] flex gap-5 p-6 items-center">
        <div>
          <Image src="/srmkzilla-gradient-logo.svg" alt="/" width={40} height={40} />
        </div>
        <div>
          <h1 className="font-bold text-2xl">KzCMS</h1>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <form onSubmit={handleSUbmit} className="flex w-full lg:w-96 flex-col p-6 gap-5 items-center">
          <div>
            <h1 className="font-bold text-2xl text-highlight">Login</h1>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div>
              <input
                className="w-full px-4 py-4 rounded-xl outline-none bg-secondary"
                type="email"
                placeholder="user@gmail.com"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                className="w-full px-4 py-4 rounded-xl outline-none bg-secondary"
                type="password"
                placeholder="password"
                name="password"
                onChange={handleChange}
              />
            </div>
            <div>
              <button type="submit" className="rounded-lg bg-highlight text-xl font-medium w-full p-2">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
