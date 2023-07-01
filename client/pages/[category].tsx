import { title } from 'process';
import CardList from '@/components/CardsList';
import CardsListPropsType from '@/types/CardsListProps';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const { category } = router.query;
  const cardListMock: CardsListPropsType = {
    type: category as string,
    cards: [
      {
        title: 'Mozofest',
        websiteUrl: 'https://mozofest.srmkzilla.net/',
        manageUrl: '/mozofest',
        type: 'main',
      },
      {
        title: 'Mozofest',
        websiteUrl: 'https://mozofest.srmkzilla.net/',
        manageUrl: '/mozofest',
        type: 'project',
      },
      {
        title: 'Mozofest',
        websiteUrl: 'https://mozofest.srmkzilla.net/',
        manageUrl: '/mozofest',
        type: 'main',
      },
      {
        title: 'Mozofest',
        websiteUrl: 'https://mozofest.srmkzilla.net/',
        manageUrl: '/mozofest',
        type: 'main',
      },
      {
        title: 'Mozofest',
        websiteUrl: 'https://mozofest.srmkzilla.net/',
        manageUrl: '/mozofest',
        type: 'other',
      },
    ],
  };

  return (
    <div className="w-full min-h-screen h-fit">
      <CardList cardListProps={cardListMock} />
    </div>
  );
}
