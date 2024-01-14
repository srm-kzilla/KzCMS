import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import Head from "next/head";
import server from "@/utils/server";
import axios from "axios";
import nookies from "nookies";
import { useRouter } from "next/router";
import { type FormEvent, useState, useEffect } from "react";
import type { Project, User } from "@/types";
import type { GetServerSidePropsContext } from "next";

const Index = ({
  user,
  projectList,
}: {
  user: User;
  projectList: Project[];
}) => {
  const [addProjectModal, setAddProjectModal] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>("");
  const [typeName, setTypeName] = useState<string>("");
  const [projectListState, setProjectListState] = useState<Project[]>(projectList); // [1
  const router = useRouter();

  const handleCreateProject = async (e: FormEvent) => {
    e.preventDefault();
    const response = await axios.post("/api/create-project", {
      projectName,
      typeName,
    });

    if (response.status === 200) {
      router.reload();
    }
  };

  return (
    <>
      <Head>
        <title>Manage Projects</title>
      </Head>
      <div className="flex h-fit min-h-screen w-full">
        <Layout user={user}>
          <div className="flex h-full w-full flex-col gap-10">
            <div className="flex h-fit w-full flex-col gap-3 md:flex md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold lg:text-4xl">
                  MANAGE PROJECTS
                </h1>
              </div>
              <div>
                <button
                  onClick={() => {
                    setAddProjectModal(!addProjectModal);
                  }}
                  className="rounded-lg border-2 border-white px-6 py-2"
                >
                  <h1 className="text-sm font-bold md:text-base">
                    + Create Project
                  </h1>
                </button>
              </div>
            </div>
            <div className="flex h-fit w-full flex-col justify-center gap-5 md:flex-row md:flex-wrap md:justify-start">
              {projectListState.length !== 0 ? (
                projectListState.map((project, key) => {
                  return (
                    <div key={key}>
                      <ProjectCard
                        projectData={project}
                        redirectUrl={"/manage-projects"}
                      />
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center gap-5">
                  <div>
                    <button
                      onClick={() => {
                        setAddProjectModal(!addProjectModal);
                      }}
                      className="rounded-lg border-2 border-dashed border-light px-6 py-2"
                    >
                      <h1 className="text-sm font-bold text-light md:text-base">
                        + Create Project
                      </h1>
                    </button>
                  </div>
                </div>
              )}
            </div>
            {addProjectModal && (
              <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black/40 p-6">
                <div className="flex w-full flex-col gap-5 rounded-lg bg-secondary p-6 lg:w-[500px]">
                  <div className="flex w-full justify-center">
                    <h1 className="text-2xl font-bold">Create Project</h1>
                  </div>
                  <div>
                    <form
                      className="flex h-full w-full flex-col gap-5"
                      onSubmit={handleCreateProject}
                    >
                      <div>
                        <input
                          className="w-full rounded-lg bg-primary px-4 py-2 outline-none"
                          type="text"
                          placeholder="Project Name"
                          onChange={(e) => {
                            setProjectName(e.target.value);
                          }}
                          required={true}
                        />
                      </div>
                      <div>
                        <input
                          className="w-full rounded-lg bg-primary px-4 py-2 outline-none"
                          type="text"
                          placeholder="Type Name"
                          onChange={(e) => {
                            setTypeName(e.target.value);
                          }}
                          required={true}
                        />
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="flex w-full items-center justify-center rounded-lg border-2 border-white px-6 py-2"
                        >
                          <h1 className="text-sm font-bold md:text-base">
                            Create Project
                          </h1>
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            setAddProjectModal(!addProjectModal);
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
      </div>
    </>
  );
};

export default Index;

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

    const user: User = userResponse.data.data;

    const projectListDataResponse = await server.get("/api/projects", {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    });

    const projectList: Project[] = projectListDataResponse.data.data.filter(
      (project: { isDeleted: boolean }) => {
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
    nookies.destroy(ctx, "token");
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};
