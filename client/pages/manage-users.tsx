import Layout from '@/components/Layout';
import UserCard from '@/components/UserCard';
import UserDataType from '@/interfaces/userDataType';
import server from '@/utils/server';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import React from 'react';

const manageUsers = ({ user, userList }: { user: UserDataType; userList: UserDataType[] }) => {
  const router = useRouter();
  const verifyUser = async (email: string) => {
    const response = await axios.patch('/api/verify-user', {
      email,
    });

    if (response.status === 200) {
      router.reload();
    }
  };
  const deleteUser = async (email: string) => {
    const response = await axios.post('/api/delete-user', { email });

    if (response.status === 200) {
      router.reload();
    }
  };
  const updateUserPassword = async (email: string, newPassword: string) => {
    const response = await axios.post('/api/update-user-password', {
      email,
      password: newPassword,
    });

    if (response.status === 200) {
      router.reload();
    }
  };

  return (
    <div className="w-full flex min-h-screen h-fit">
      <Layout user={user}>
        <div className="w-full h-full flex flex-col gap-10">
          <div className="w-full h-fit">
            <h1 className="font-bold text-2xl lg:text-4xl">MANAGE USERS</h1>
          </div>
          <div className="w-full flex flex-col md:flex md:flex-row md:flex-wrap gap-5">
            {userList.map((user, key) => {
              return (
                <div key={key}>
                  <UserCard
                    user={user}
                    verifyUser={verifyUser}
                    deleteUser={deleteUser}
                    updateUserPassword={updateUserPassword}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default manageUsers;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
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

  const userListResponse = await server.get('/api/users', {
    headers: {
      Authorization: `Bearer ${cookies.token}`,
    },
  });

  return {
    props: {
      user: userResponse.data.data as UserDataType,
      userList: userListResponse.data.data as UserDataType[],
    },
  };
};
