import ImageCard, { ImageCardPropsType } from '@/components/ImageCard';
import ImageCardList from '@/components/ImageCardList';
import { ImageCardsListPropsType } from '@/components/ImageCardList';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Project() {

  const imageCardMockData: ImageCardPropsType = {
    imageLink: 'https://picsum.photos/200/400.jpg',
    title: 'Title',
    sponsorLink: 'https://eatwholy.com/',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
    autorName: 'Author Name',
  };

  const imageCardListData: ImageCardsListPropsType = {
    imageCards: [imageCardMockData, imageCardMockData, imageCardMockData, imageCardMockData, imageCardMockData],
  };

  const router = useRouter();

  const imgLoader = ({}) => {
    return `https://picsum.photos/200/400.jpg`;
  };



  return (
    <div>
      {/* <Navbar navBarProps={NavbarOptions} /> */}
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
          <div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
