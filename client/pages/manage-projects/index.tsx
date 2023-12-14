import Layout from '@/components/Layout';
import React, { useState } from 'react';
import nookies from 'nookies';
import UserDataType from '@/interfaces/userDataType';
import server from '@/utils/server';
import { GetServerSidePropsContext } from 'next';
import ProjectListDataType from '@/interfaces/projectListDataType';
import ProjectCard from '@/components/ProjectCard';
import axios from 'axios';
import { useRouter } from 'next/router';

const Index = ({ user, projectList }: { user: UserDataType; projectList: ProjectListDataType[] }) => {
  const [addProjectModal, setAddProjectModal] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>('');
  const [typeName, setTypeName] = useState<string>('');
  const router = useRouter();

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.post('/api/create-project', {
      projectName,
      typeName,
    });

    if (response.status === 200) {
      router.reload();
    }
  };

  return (
    <div className="w-full flex min-h-screen h-fit">
      <Layout user={user}>
        <div className="w-full h-full flex flex-col gap-10">
          <div className="w-full h-fit flex flex-col gap-3 md:flex md:flex-row md:justify-between md:items-center">
            <div>
              <h1 className="font-bold text-2xl lg:text-4xl">MANAGE PROJECTS</h1>
            </div>
            <div>
              <button
                onClick={() => {
                  setAddProjectModal(!addProjectModal);
                }}
                className="px-6 py-2 border-2 border-white rounded-lg"
              >
                <h1 className="font-bold text-sm md:text-base">+ Create Project</h1>
              </button>
            </div>
          </div>
          <div className="flex flex-col md:flex-wrap md:flex-row justify-center gap-5 md:justify-start h-fit w-full">
            {projectList.length !== 0 ? (
              projectList.map((project, key) => {
                return (
                  <div key={key}>
                    <ProjectCard projectData={project} redirectUrl={'/manage-projects'} />
                  </div>
                );
              })
            ) : (
              <div className="flex-1 flex flex-col gap-5 justify-center items-center">
                <div>
                  <button
                    onClick={() => {
                      setAddProjectModal(!addProjectModal);
                    }}
                    className="px-6 py-2 border-2 border-light border-dashed rounded-lg"
                  >
                    <h1 className="font-bold text-sm md:text-base text-light">+ Create Project</h1>
                  </button>
                </div>
              </div>
            )}
          </div>
          {addProjectModal && (
            <div className="absolute top-0 bottom-0 right-0 left-0 bg-black/40 flex justify-center items-center p-6">
              <div className="w-full lg:w-[500px] p-6 bg-secondary rounded-lg flex flex-col gap-5">
                <div className="w-full flex justify-center">
                  <h1 className="font-bold text-2xl">Create Project</h1>
                </div>
                <div>
                  <form className="w-full h-full flex flex-col gap-5" onSubmit={handleCreateProject}>
                    <div>
                      <input
                        className="w-full px-4 py-2 rounded-lg bg-primary outline-none"
                        type="text"
                        placeholder="Project Name"
                        onChange={e => {
                          setProjectName(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <input
                        className="w-full px-4 py-2 rounded-lg bg-primary outline-none"
                        type="text"
                        placeholder="Type Name"
                        onChange={e => {
                          setTypeName(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center px-6 py-2 border-2 border-white rounded-lg"
                      >
                        <h1 className="font-bold text-sm md:text-base">Create Project</h1>
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          setAddProjectModal(!addProjectModal);
                        }}
                        className="w-full flex items-center justify-center px-6 py-2 border-2 border-white rounded-lg"
                      >
                        <h1 className="font-bold text-sm md:text-base">Cancel</h1>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
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

  try {
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

    const projectList: ProjectListDataType[] = projectListDataResponse.data.data.filter(
      (project: { isDeleted: any }) => {
        return !project.isDeleted;
      },
    );

    return {
      props: {
        user,
        projectList,
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
