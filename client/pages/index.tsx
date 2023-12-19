import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import Head from "next/head";
import server from "@/utils/server";
import nookies from "nookies";
import type { Project, User } from "@/types";
import type { GetServerSidePropsContext } from "next";

export default function Home({
  user,
  projectList,
}: {
  user: User;
  projectList: Project[];
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
              {projectList.length === 0 ? (
                <h1 className="text-sm font-bold text-light md:text-base">
                  You Don't Have Access To Any Projects.
                </h1>
              ) : (
                projectList.map((project, key) => {
                  return (
                    <div key={key}>
                      <ProjectCard
                        projectData={project}
                        redirectUrl={"/my-projects"}
                      />
                    </div>
                  );
                })
              )}
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

    const user: User = userResponse.data.data;

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
