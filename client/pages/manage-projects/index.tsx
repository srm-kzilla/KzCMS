import Layout from '@/components/Layout';
import React from 'react';
import nookies from 'nookies';
import UserDataType from '@/interfaces/userDataType';
import server from '@/utils/server';
import { GetServerSidePropsContext } from 'next';
import ProjectListDataType from '@/interfaces/projectListDataType';
import ProjectCard from '@/components/ProjectCard';

const Index = ({ user, projectList }: { user: UserDataType; projectList: ProjectListDataType[] }) => {
  return (
    <div className="w-full flex min-h-screen h-fit">
      <Layout user={user}>
        <div className="w-full h-full flex flex-col gap-10">
          <div className="w-full h-fit">
            <h1 className="font-bold text-2xl lg:text-4xl">MANAGE PROJECTS</h1>
          </div>
          <div className="flex flex-col md:flex-wrap md:flex-row justify-center gap-5 md:justify-start h-fit w-full">
            {projectList.map((project, key) => {
              return (
                <div key={key}>
                  <ProjectCard projectData={project} redirectUrl={'/manage-projects'} />
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Index;

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

  const user: UserDataType = userResponse.data.data;

  const projectListDataResponse = await server.get('/api/projects', {
    headers: {
      Authorization: `Bearer ${cookies.token}`,
    },
  });

  const projectList: ProjectListDataType[] = projectListDataResponse.data.data;

  return {
    props: {
      user,
      projectList,
    },
  };
};
