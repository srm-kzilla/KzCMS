import EditData from "@/components/EditData";
import ImageCardList from "@/components/ImageCardList";
import Layout from "@/components/Layout";
import Head from "next/head";
import server from "@/utils/server";
import nookies from "nookies";
import { useRouter } from "next/router";
import { useState } from "react";
import AddCircleLineIcon from "remixicon-react/AddCircleLineIcon";
import CloseCircleLineIcon from "remixicon-react/CloseCircleLineIcon";
import type { AxiosResponse } from "axios";
import type { ProjectItem, User } from "@/types";
import type { GetServerSidePropsContext } from "next";

export default function Project({
  user,
  projectData,
}: {
  user: User;
  projectData: ProjectItem[];
}) {
  const router = useRouter();
  const [addAssetState, setAddAssetState] = useState(false);

  const handleAddAsset = () => {
    if (!addAssetState) {
      setAddAssetState(true);
    } else if (addAssetState) {
      setAddAssetState(false);
    }
  };

  return (
    <>
      <Head>
        <title>{router.query.project?.toString().toUpperCase()}</title>
      </Head>
      <Layout user={user}>
        <div className="flex h-full w-full flex-col gap-10">
          <div className="h-fit w-full">
            <h1 className="text-2xl font-bold lg:text-4xl">
              {router.query.project?.toString().toUpperCase()}
            </h1>
            <div>
              <div className="flex items-center justify-end">
                {!addAssetState ? (
                  <button
                    className="flex items-center justify-center gap-2 rounded-lg bg-secondary px-5 py-3"
                    onClick={handleAddAsset}
                  >
                    <AddCircleLineIcon />
                    Add Asset
                  </button>
                ) : (
                  <button
                    className="flex items-center justify-center gap-2 rounded-lg bg-secondary px-5 py-3"
                    onClick={handleAddAsset}
                  >
                    <CloseCircleLineIcon />
                  </button>
                )}
              </div>

              <EditData
                addAssetState={addAssetState}
                setAddAssetState={setAddAssetState}
              />
            </div>
            <ImageCardList dataList={projectData} />
          </div>
        </div>
      </Layout>
    </>
  );
}

interface projectDataResponseType {
  data: AxiosResponse<ProjectItem[]>;
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);
  const { project } = ctx.query;

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

    const projectDataResponse: projectDataResponseType = await server.get(
      `/api/projects/${project}`,
      {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      },
    );

    return {
      props: {
        user: userResponse.data.data as User,
        projectData: projectDataResponse.data.data as ProjectItem[],
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
