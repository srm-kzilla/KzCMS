import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import nookies from "nookies";
import server from "@/utils/server";
import Head from "next/head";
import UserDataType from "@/interfaces/userDataType";
import ProjectListDataType from "@/interfaces/projectListDataType";
import type { GetServerSidePropsContext } from "next";

export default function Home({
  user,
  projectList,
}: {
  user: UserDataType;
  projectList: ProjectListDataType[];
}) {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="flex h-fit min-h-screen w-full">
        <Layout user={user}>
          <div className="flex h-full w-full flex-col gap-10">
            <div className="h-fit w-full">
              <h1 className="text-2xl font-bold lg:text-4xl">MY PROJECTS</h1>
            </div>
            <div className="flex h-fit w-full flex-col justify-center gap-5 md:flex-row md:flex-wrap md:justify-start">
              {projectList.map((project, key) => {
                return (
                  <div key={key}>
                    <ProjectCard
                      projectData={project}
                      redirectUrl={"/my-projects"}
                    />
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

    const user: UserDataType = userResponse.data.data;

    const projectListDataResponse = await server.get(
      "/api/users/user/projects",
      {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      },
    );

    return {
      props: {
        user,
        projectList: projectListDataResponse.data.projects,
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
