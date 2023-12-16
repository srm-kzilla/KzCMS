import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import nookies from "nookies";
import server from "@/utils/server";
import DeleteIcon from "remixicon-react/DeleteBin7LineIcon";
import ProjectListDataType from "@/interfaces/projectListDataType";
import Select from "react-select";
import axios from "axios";
import Head from "next/head";
import UserDataType from "@/interfaces/userDataType";
import type { GetServerSidePropsContext } from "next";

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
  const userAccessList = useRef<string[]>([]);

  const handleAddUserAccess = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await axios.patch("/api/update-user-access", {
      projectSlug: router.query.project,
      userAccess: userAccessArray,
    });

    if (response.status === 200) {
      router.reload();
    }
  };

  const handleRemoveUserAccess = async (email: string) => {
    const response = await axios.patch("/api/update-user-access", {
      projectSlug: router.query.project,
      userAccess: userAccessArray.filter((user) => {
        return user !== email;
      }),
    });

    if (response.status === 200) {
      router.reload();
    }
  };

  const handleDeleteProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axios.post("/api/delete-project", {
      projectSlug: router.query.project,
    });

    if (response.status === 200) {
      router.push("/manage-projects");
    }
  };

  useEffect(() => {
    setSelectOptions(
      userList.map((user) => {
        return {
          value: user.email,
          label: user.email,
        };
      }),
    );

    userAccessList.current = projectData.userAccess;
    setuserAccessArray(projectData.userAccess);
  }, []);

  return (
    <>
      <Head>
        <title>{router.query.project?.toString().toUpperCase()}</title>
      </Head>
      <Layout user={user}>
        <div className="flex h-full w-full flex-col gap-10">
          <div className="flex h-fit w-full flex-col gap-5 md:flex md:flex-row md:justify-between">
            <div>
              <h1 className="text-2xl font-bold lg:text-4xl">
                {router.query.project?.toString().toUpperCase()}
              </h1>
            </div>
            <div>
              <button
                className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-red-500 px-6 py-2 text-red-500"
                onClick={() => {
                  setDeleteProjectModal(!deleteProjectModal);
                }}
              >
                <DeleteIcon />
                <h1 className="text-sm font-bold md:text-base">
                  Delete Project
                </h1>
              </button>
            </div>
          </div>
          {deleteProjectModal && (
            <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black/40 p-6">
              <div className="flex w-full flex-col gap-5 rounded-lg bg-secondary p-6 lg:w-[500px]">
                <div className="flex w-full flex-col items-center justify-center">
                  <h1 className="text-xl font-bold">
                    Are you sure you want to delete{" "}
                  </h1>
                  <h1 className="text-xl font-bold">{router.query.project}?</h1>
                </div>
                <form
                  className="flex h-full w-full flex-col gap-5"
                  onSubmit={handleDeleteProject}
                >
                  <div>
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center rounded-lg border-2 border-red-500 px-6 py-2"
                    >
                      <h1 className="text-sm font-bold text-red-500 md:text-base">
                        Delete
                      </h1>
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setDeleteProjectModal(!deleteProjectModal);
                      }}
                      className="flex w-full items-center justify-center rounded-lg border-2 border-white px-6 py-2"
                    >
                      <h1 className="text-sm font-bold md:text-base">Cancel</h1>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          <div className="flex w-full flex-1 flex-col gap-10">
            <div className="flex w-full items-center justify-between">
              <div>
                <h1 className="font-bold lg:text-2xl">MANAGE USER ACCESS</h1>
              </div>
              <div>
                <button
                  onClick={() => {
                    setAddUserModal(!addUserModal);
                  }}
                  className="rounded-lg border-2 border-white px-6 py-2"
                >
                  <h1 className="text-sm font-bold md:text-base">+ Add User</h1>
                </button>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-5">
              {projectData.userAccess.length !== 0 ? (
                projectData.userAccess.map((user, key) => {
                  return (
                    <div
                      className="flex w-full justify-between rounded-lg bg-secondary p-4"
                      key={key}
                    >
                      <div>
                        <h1 className="text-xl font-bold">{user}</h1>
                      </div>
                      <div>
                        <button
                          className="text-red-500"
                          onClick={() => {
                            handleRemoveUserAccess(user);
                          }}
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center gap-5">
                  <div>
                    <button
                      onClick={() => {
                        setAddUserModal(!addUserModal);
                      }}
                      className="rounded-lg border-2 border-dashed border-light px-6 py-2"
                    >
                      <h1 className="text-sm font-bold text-light md:text-base">
                        + Add User
                      </h1>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {addUserModal && (
            <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black/40 p-6">
              <div className="flex w-full flex-col gap-5 rounded-lg bg-secondary p-6 lg:w-[500px]">
                <div className="flex w-full justify-center">
                  <h1 className="text-2xl font-bold">Add User</h1>
                </div>
                <div>
                  <form
                    className="flex h-full w-full flex-col gap-5"
                    onSubmit={handleAddUserAccess}
                  >
                    <div>
                      <Select
                        options={selectOptions}
                        isMulti
                        closeMenuOnSelect={false}
                        onChange={(e: any) => {
                          e.map((user: selectOptionType) => {
                            setuserAccessArray((current) => [
                              ...current,
                              user.value,
                            ]);
                          });
                        }}
                        styles={{
                          menu: (provided) => ({
                            ...provided,
                            width: "100%",
                            color: "white",
                            fontWeight: "bold",
                            backgroundColor: "#1E1E1E",
                          }),
                          option: (provided, state) => ({
                            ...provided,
                            color: "white",
                            backgroundColor: "#1E1E1E",
                            fontWeight: "bold",
                            ":hover": {
                              backgroundColor: "#2D2D2D",
                              color: "white",
                              fontWeight: "bold",
                              cursor: "pointer",
                            },
                          }),
                          control: (provided) => ({
                            ...provided,
                            backgroundColor: "#1E1E1E",
                            border: "2px solid white",
                            borderRadius: "8px",
                            color: "white",
                            fontWeight: "bold",
                          }),
                          multiValue: (provided) => ({
                            ...provided,
                            backgroundColor: "white",
                            color: "white",
                            fontWeight: "bold",
                          }),
                          multiValueLabel: (provided) => ({
                            ...provided,
                            color: "#1E1E1E",
                            fontWeight: "bold",
                          }),
                          multiValueRemove: (provided) => ({
                            ...provided,
                            color: "#1E1E1E",
                            fontWeight: "bold",
                            ":hover": {
                              backgroundColor: "red",
                              color: "#1E1E1E",
                              fontWeight: "bold",
                            },
                          }),
                        }}
                      />
                    </div>
                    <div>
                      <button
                        disabled={userAccessArray === userAccessList.current}
                        type="submit"
                        className="flex w-full items-center justify-center rounded-lg border-2 border-white px-6 py-2"
                      >
                        <h1 className="text-sm font-bold md:text-base">
                          Add User
                        </h1>
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          setAddUserModal(!addUserModal);
                        }}
                        className="flex w-full items-center justify-center rounded-lg border-2 border-white px-6 py-2"
                      >
                        <h1 className="text-sm font-bold md:text-base">
                          Cancel
                        </h1>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default ManageProject;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);

  if (!cookies.token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const userResponse = await server.get("/api/users/user", {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    });

    const projectListDataResponse = await server.get("/api/projects", {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    });

    const allUserDataResponse = await server.get("/api/users", {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    });

    const projectList: ProjectListDataType[] =
      projectListDataResponse.data.data.filter(
        (project: ProjectListDataType) => {
          return project.projectSlug === ctx.query.project;
        },
      );

    const filteredUserDataResponse: userListDataType[] =
      allUserDataResponse.data.data.filter((user: userListDataType) => {
        return !projectList[0].userAccess?.includes(user.email);
      });

    return {
      props: {
        user: userResponse.data.data as UserDataType,
        projectData: projectList[0],
        userList: filteredUserDataResponse,
      },
    };
  } catch (err) {
    nookies.destroy(ctx, "token");
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};
