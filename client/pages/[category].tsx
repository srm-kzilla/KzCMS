import { title } from 'process';
import CardList from '@/components/CardsList';
import { useRouter } from 'next/router';
import { cardListMock } from '@/mock/cardListMock';

export default function Home() {
  const router = useRouter();
  const { category } = router.query;

  return (
    <div className="w-full min-h-screen h-fit">
      <CardList type={category as string} cardList={cardListMock} />
    </div>
  );
}
