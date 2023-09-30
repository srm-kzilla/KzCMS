import Layout from '@/components/Layout';
import UserDataType from '@/interfaces/userDataType';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import nookies from 'nookies';
import server from '@/utils/server';

const ManageProject = ({ user }: { user: UserDataType }) => {
  const router = useRouter();

  return (
    <div>
      <Layout user={user}>
        <div className="w-full h-full flex flex-col gap-10">
          <div className="w-full h-fit">
            <h1 className="font-bold text-2xl lg:text-4xl">{router.query.project?.toString().toUpperCase()}</h1>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ManageProject;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);
  const { project } = ctx.query;

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
