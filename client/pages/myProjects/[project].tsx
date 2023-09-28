import ImageCardList from '@/components/ImageCardList';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { imageCardListData } from '@/mock/Data';
import nookies from 'nookies';
import UserDataType from '@/interfaces/userDataType';
import server from '@/utils/server';
import { GetServerSidePropsContext } from 'next';

export default function Project({ user }: { user: UserDataType }) {
  const router = useRouter();

  return (
    <div>
      <Layout user={user}>
        <div className="w-full h-full flex flex-col gap-10">
          <div className="w-full h-fit">
            <h1 className="font-bold text-2xl lg:text-4xl">{router.query.project?.toString().toUpperCase()}</h1>
            <ImageCardList imageCardList={imageCardListData} />
          </div>
        </div>
      </Layout>
    </div>
  );
}

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

  return {
    props: {
      user: userResponse.data.data as UserDataType,
    },
  };
};
