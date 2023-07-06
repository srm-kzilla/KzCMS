import { title } from 'process';
import CardList from '@/components/CardsList';
import { cardListMock } from '@/mock/cardListMock';

export default function Home() {
  return (
    <div className="w-full min-h-screen h-fit bg-kzBlack">
      <CardList type="all" cardList={cardListMock} />
    </div>
  );
}
