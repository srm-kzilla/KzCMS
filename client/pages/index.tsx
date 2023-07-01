import { title } from 'process';
import CardList from '@/components/CardsList';
import CardsListPropsType from '@/types/CardsListProps';

const cardListMock: CardsListPropsType = {
  type: 'all',
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
      type: '0',
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

export default function Home() {
  return (
    <div className="w-full min-h-screen h-fit">
      <CardList cardListProps={cardListMock} />
    </div>
  );
}
