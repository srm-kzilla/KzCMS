import Layout from '@/components/Layout';
import UserDataType from '@/interfaces/userDataType';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import nookies from 'nookies';
import server from '@/utils/server';
import DeleteIcon from 'remixicon-react/DeleteBin7LineIcon';
import ProjectListDataType from '@/interfaces/projectListDataType';
import Select from 'react-select';
import axios from 'axios';

interface userListDataType {
  createdAt: string;
  email: string;
  isAdmin: boolean;
  isDeleted: boolean;
  isVerified: boolean;
  projects: string[];
}

interface selectOptionType {
  value: string;
  label: string;
}

const ManageProject = ({
  user,
  projectData,
  userList,
}: {
  user: UserDataType;
  projectData: ProjectListDataType;
  userList: userListDataType[];
}) => {
  const router = useRouter();
  const [addUserModal, setAddUserModal] = useState<boolean>(false);
  const [selectOptions, setSelectOptions] = useState<selectOptionType[]>([]);
  const [userAccessArray, setuserAccessArray] = useState<string[]>([]);
  const [deleteProjectModal, setDeleteProjectModal] = useState<boolean>(false);

  const handleAddUserAccess = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await axios.patch('/api/update-user-access', {
      projectSlug: router.query.project,
      userAccess: userAccessArray,
      token: nookies.get().token,
    });

    if (response.status === 200) {
      router.reload();
    }
  };

  const handleRemoveUserAccess = async (email: string) => {
    const response = await axios.patch('/api/update-user-access', {
      projectSlug: router.query.project,
      userAccess: userAccessArray.filter(user => {
        return user !== email;
      }),
      token: nookies.get().token,
    });

    if (response.status === 200) {
      router.reload();
    }
  };

  const handleDeleteProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axios.post('/api/delete-project', {
      projectSlug: router.query.project,
      token: nookies.get().token,
    });

    if (response.status === 200) {
      router.push('/manage-projects');
    }
  };

  useEffect(() => {
    setSelectOptions(
      userList.map(user => {
        return {
          value: user.email,
          label: user.email,
        };
      }),
    );

    setuserAccessArray(projectData.userAccess);
  }, []);

  return (
    <div>
      <Layout user={user}>
        <div className="w-full h-full flex flex-col gap-10">
          <div className="w-full h-fit flex flex-col md:flex md:flex-row md:justify-between gap-5">
            <div>
              <h1 className="font-bold text-2xl lg:text-4xl">{router.query.project?.toString().toUpperCase()}</h1>
            </div>
            <div>
              <button
                className="w-full flex items-center justify-center gap-2 px-6 py-2 border-2 border-red-500 rounded-lg text-red-500"
                onClick={() => {
                  setDeleteProjectModal(!deleteProjectModal);
                }}
              >
                <DeleteIcon />
                <h1 className="font-bold text-sm md:text-base">Delete Project</h1>
              </button>
            </div>
          </div>
          {deleteProjectModal && (
            <div className="absolute top-0 bottom-0 right-0 left-0 bg-black/40 flex justify-center items-center p-6">
              <div className="w-full lg:w-[500px] p-6 bg-secondary rounded-lg flex flex-col gap-5">
                <div className="w-full flex flex-col justify-center items-center">
                  <h1 className="font-bold text-xl">Are you sure you want to delete </h1>
                  <h1 className="font-bold text-xl">{router.query.project}?</h1>
                </div>
                <form className="w-full h-full flex flex-col gap-5" onSubmit={handleDeleteProject}>
                  <div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center px-6 py-2 border-2 border-red-500 rounded-lg"
                    >
                      <h1 className="font-bold text-sm md:text-base text-red-500">Delete</h1>
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setDeleteProjectModal(!deleteProjectModal);
                      }}
                      className="w-full flex items-center justify-center px-6 py-2 border-2 border-white rounded-lg"
                    >
                      <h1 className="font-bold text-sm md:text-base">Cancel</h1>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          <div className="w-full flex-1 flex flex-col gap-10">
            <div className="w-full flex items-center justify-between">
              <div>
                <h1 className="font-bold lg:text-2xl">MANAGE USER ACCESS</h1>
              </div>
              <div>
                <button
                  onClick={() => {
                    setAddUserModal(!addUserModal);
                  }}
                  className="px-6 py-2 border-2 border-white rounded-lg"
                >
                  <h1 className="font-bold text-sm md:text-base">+ Add User</h1>
                </button>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-5">
              {projectData.userAccess.length !== 0 ? (
                projectData.userAccess.map((user, key) => {
                  return (
                    <div className="w-full p-4 rounded-lg bg-secondary flex justify-between" key={key}>
                      <div>
                        <h1 className="font-bold text-xl">{user}</h1>
                      </div>
                      <div>
                        <button
                          className="text-red-500"
                          onClick={() => {
                            handleRemoveUserAccess(user);
                            console.log(userAccessArray);
                          }}
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex-1 flex flex-col gap-5 justify-center items-center">
                  <div>
                    <button
                      onClick={() => {
                        setAddUserModal(!addUserModal);
                      }}
                      className="px-6 py-2 border-2 border-light border-dashed rounded-lg"
                    >
                      <h1 className="font-bold text-sm md:text-base text-light">+ Add User</h1>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {addUserModal && (
            <div className="absolute top-0 bottom-0 right-0 left-0 bg-black/40 flex justify-center items-center p-6">
              <div className="w-full lg:w-[500px] p-6 bg-secondary rounded-lg flex flex-col gap-5">
                <div className="w-full flex justify-center">
                  <h1 className="font-bold text-2xl">Add User</h1>
                </div>
                <div>
                  <form className="w-full h-full flex flex-col gap-5" onSubmit={handleAddUserAccess}>
                    <div>
                      <Select
                        options={selectOptions}
                        isMulti
                        closeMenuOnSelect={false}
                        onChange={(e: any) => {
                          e.map((user: selectOptionType) => {
                            setuserAccessArray(current => [...current, user.value]);
                          });
                        }}
                        styles={{
                          menu: provided => ({
                            ...provided,
                            width: '100%',
                            color: 'white',
                            fontWeight: 'bold',
                            backgroundColor: '#1E1E1E',
                          }),
                          option: (provided, state) => ({
                            ...provided,
                            color: 'white',
                            backgroundColor: '#1E1E1E',
                            fontWeight: 'bold',
                            ':hover': {
                              backgroundColor: '#2D2D2D',
                              color: 'white',
                              fontWeight: 'bold',
                              cursor: 'pointer',
                            },
                          }),
                          control: provided => ({
                            ...provided,
                            backgroundColor: '#1E1E1E',
                            border: '2px solid white',
                            borderRadius: '8px',
                            color: 'white',
                            fontWeight: 'bold',
                          }),
                          multiValue: provided => ({
                            ...provided,
                            backgroundColor: 'white',
                            color: 'white',
                            fontWeight: 'bold',
                          }),
                          multiValueLabel: provided => ({
                            ...provided,
                            color: '#1E1E1E',
                            fontWeight: 'bold',
                          }),
                          multiValueRemove: provided => ({
                            ...provided,
                            color: '#1E1E1E',
                            fontWeight: 'bold',
                            ':hover': {
                              backgroundColor: 'red',
                              color: '#1E1E1E',
                              fontWeight: 'bold',
                            },
                          }),
                        }}
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center px-6 py-2 border-2 border-white rounded-lg"
                      >
                        <h1 className="font-bold text-sm md:text-base">Add User</h1>
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          setAddUserModal(!addUserModal);
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

export default ManageProject;

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

  const projectListDataResponse = await server.get('/api/projects', {
    headers: {
      Authorization: `Bearer ${cookies.token}`,
    },
  });

  const allUserDataResponse = await server.get('/api/users', {
    headers: {
      Authorization: `Bearer ${cookies.token}`,
    },
  });

  const projectList: ProjectListDataType[] = projectListDataResponse.data.data.filter(
    (project: ProjectListDataType) => {
      return project.projectSlug === ctx.query.project;
    },
  );

  const filteredUserDataResponse: userListDataType[] = allUserDataResponse.data.data.filter(
    (user: userListDataType) => {
      return !projectList[0].userAccess?.includes(user.email);
    },
  );

  return {
    props: {
      user: userResponse.data.data as UserDataType,
      projectData: projectList[0],
      userList: filteredUserDataResponse,
    },
  };
};
