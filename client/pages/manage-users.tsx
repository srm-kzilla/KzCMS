import Layout from '@/components/Layout';
import UserDataType from '@/interfaces/userDataType';
import server from '@/utils/server';
import nookies from 'nookies';
import React from 'react';

const manageUsers = ({ user }: { user: UserDataType }) => {
  return (
    <div className="w-full flex min-h-screen h-fit">
      <Layout user={user}>
        <div className="w-full h-full flex flex-col gap-10">
          <div className="w-full h-fit">
            <h1 className="font-bold text-2xl lg:text-4xl">MANAGE USERS</h1>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default manageUsers;

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
