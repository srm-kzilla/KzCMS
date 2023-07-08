import CardList from '@/components/CardsList';
import { useRouter } from 'next/router';
import { cardListMock } from '@/mock/cardListMock';
import Navbar from '@/components/Navbar';
import Home4LineIcon from 'remixicon-react/Home4LineIcon';
import CalendarEventLineIcon from 'remixicon-react/CalendarEventLineIcon';
import ShoppingBag3LineIcon from 'remixicon-react/ShoppingBag3LineIcon';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [category, setCategory] = useState<any>(null);
  useEffect(() => {
    if (router.isReady) {
      setCategory(router.query.category);
    }
  }, [router.isReady]);
  console.log(category);
  const NavbarOptions = {
    options: [
      {
        toolTip: 'Home',
        icon: Home4LineIcon,
        url: '/',
      },
      {
        toolTip: 'Events',
        icon: CalendarEventLineIcon,
        url: '/event',
      },
      {
        toolTip: 'Products',
        icon: ShoppingBag3LineIcon,
        url: '/product',
      },
    ],
  };

  return (
    <div className='w-full flex min-h-screen h-fit bg-cms-dark'>
      <Navbar navBarProps={NavbarOptions} />
      <CardList type={category ? category as 'main' | 'product' | 'event' | 'other' : null} cardList={cardListMock} />
    </div>
  );
}
