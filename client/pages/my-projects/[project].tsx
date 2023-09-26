import ImageCardList from '@/components/ImageCardList';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { imageCardListData } from '@/mock/Data';
import nookies from 'nookies';
import UserDataType from '@/interfaces/userDataType';
import server from '@/utils/server';
import ProjectDataType from '@/interfaces/ProjectDataType';

export default function Project({ user, projectData }: { user: UserDataType; projectData: ProjectDataType[] }) {
  const router = useRouter();

  return (
    <div>
      <Layout user={user}>
        <div className="w-full h-full flex flex-col gap-10">
          <div className="w-full h-fit">
            <h1 className="font-bold text-2xl lg:text-4xl">{router.query.project?.toString().toUpperCase()}</h1>
            <ImageCardList dataList={projectData} />
          </div>
        </div>
      </Layout>
    </div>
  );
}

export const getServerSideProps = async (ctx: any) => {
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

  const projectDataResponse = await server.get(`/api/projects/${project}`, {
    headers: {
      Authorization: `Bearer ${cookies.token}`,
    },
  });

  return {
    props: {
      user: userResponse.data.data as UserDataType,
      projectData: projectDataResponse.data.data,
    },
  };
};
