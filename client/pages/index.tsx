import Layout from '@/components/Layout';
import React from 'react';
import nookies from 'nookies';
import server from '@/utils/server';
import UserDataType from '@/interfaces/userDataType';

export default function Home({user}: {user: UserDataType}) {
  console.log(user);
  return (
    <div className="w-full flex min-h-screen h-fit">
      <Layout
        user={user}
      >
        <div className="w-full h-full flex flex-col gap-10">
          <div className="w-full h-fit">
            <h1 className="font-bold text-2xl lg:text-4xl">MY PROJECTS</h1>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export const getServerSideProps = async (ctx: any) => {
  const cookies = nookies.get(ctx);

  if (!cookies.token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const userResponse = await server.get('/api/users/user', {
    headers: {
      Authorization: `Bearer ${cookies.token}`,
    },
  });



  return {
    props: {
      user: userResponse.data.data as UserDataType,
    },
  };
};
