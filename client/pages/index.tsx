import Layout from '@/components/Layout';
import React from 'react';
import nookies from 'nookies';
import server from '@/utils/server';
import UserDataType from '@/interfaces/userDataType';
import ProjectCard from '@/components/ProjectCard';
import { GetServerSidePropsContext } from 'next';
import ProjectListDataType from '@/interfaces/projectListDataType';
import Head from 'next/head';

export default function Home({ user, projectList }: { user: UserDataType; projectList: ProjectListDataType[] }) {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="w-full flex min-h-screen h-fit">
        <Layout user={user}>
          <div className="w-full h-full flex flex-col gap-10">
            <div className="w-full h-fit">
              <h1 className="font-bold text-2xl lg:text-4xl">MY PROJECTS</h1>
            </div>
            <div className="flex flex-col md:flex-wrap md:flex-row justify-center gap-5 md:justify-start h-fit w-full">
              {projectList.map((project, key) => {
                return (
                  <div key={key}>
                    <ProjectCard projectData={project} redirectUrl={'/my-projects'} />
                  </div>
                );
              })}
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
}

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

  try {
    const userResponse = await server.get('/api/users/user', {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    });

    const user: UserDataType = userResponse.data.data;

    const projectListDataResponse = await server.get('/api/users/user/projects', {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    });

    return {
      props: {
        user,
        projectList: projectListDataResponse.data.projects,
      },
    };
  } catch (err) {
    nookies.destroy(ctx, 'token');
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};
