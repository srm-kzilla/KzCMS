import { title } from 'process';
import CardList from '@/components/CardsList';
import { useRouter } from 'next/router';
import { cardListMock } from '@/mock/cardListMock';

export default function Home() {
  const router = useRouter();
  const { category } = router.query;

  return (
    <div className="w-full min-h-screen h-fit bg-kzBlack">
      <CardList type={category as "main" | "product" | "event" | "other" | "all"} cardList={cardListMock} />
    </div>
  );
}
