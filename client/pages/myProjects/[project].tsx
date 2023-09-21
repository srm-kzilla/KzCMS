import ImageCardList from '@/components/ImageCardList';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { imageCardListData } from '@/mock/Data';

export default function Project() {
  const router = useRouter();

  return (
    <div>
      <Layout
        user={{
          name: 'Paddy',
        }}
      >
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
