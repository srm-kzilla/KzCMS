import ImageCardList from '@/components/ImageCardList';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import UserDataType from '@/interfaces/userDataType';
import server from '@/utils/server';
import ProjectDataType from '@/interfaces/ProjectDataType';
import { AxiosResponse } from 'axios';
import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import AddCircleLineIcon from 'remixicon-react/AddCircleLineIcon';
import CloseCircleLineIcon from 'remixicon-react/CloseCircleLineIcon';
import 'react-toastify/dist/ReactToastify.css';
import EditData from '@/components/EditData';

export default function Project({ user, projectData }: { user: UserDataType; projectData: ProjectDataType[] }) {
  const router = useRouter();
  const [addAssetState, setAddAssetState] = useState(false);

  const handleAddAsset = () => {
    if (addAssetState === false) {
      setAddAssetState(true);
    } else if (addAssetState === true) {
      setAddAssetState(false);
    }
  };

  return (
    <div>
      <Layout user={user}>
        <div className="w-full h-full flex flex-col gap-10">
          <div className="w-full h-fit">
            <h1 className="font-bold text-2xl lg:text-4xl">{router.query.project?.toString().toUpperCase()}</h1>
            <div>
              <div className="flex justify-end items-center">
                {!addAssetState ? (
                  <button
                    className="flex justify-center items-center gap-2 bg-secondary py-3 px-5 rounded-lg"
                    onClick={handleAddAsset}
                  >
                    <AddCircleLineIcon />
                    Add Asset
                  </button>
                ) : (
                  <button
                    className="flex justify-center items-center gap-2 bg-secondary py-3 px-5 rounded-lg"
                    onClick={handleAddAsset}
                  >
                    <CloseCircleLineIcon />
                  </button>
                )}
              </div>
              
              <EditData addAssetState={addAssetState} setAddAssetState={setAddAssetState}/>
            </div>
            <ImageCardList dataList={projectData} />
          </div>
        </div>
      </Layout>
    </div>
  );
}

interface projectDataResponseType {
  data: AxiosResponse<ProjectDataType[]>;
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);
  const { project } = ctx.query;

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

  const projectDataResponse: projectDataResponseType = await server.get(`/api/projects/${project}`, {
    headers: {
      Authorization: `Bearer ${cookies.token}`,
    },
  });

  return {
    props: {
      user: userResponse.data.data as UserDataType,
      projectData: projectDataResponse.data.data as ProjectDataType[],
    },
  };
};
