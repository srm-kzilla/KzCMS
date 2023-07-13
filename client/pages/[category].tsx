import CardList from '@/components/CardsList';
import { useRouter } from 'next/router';
import { cardListMock } from '@/mock/cardListMock';
import Navbar from '@/components/Navbar';
import Home4LineIcon from 'remixicon-react/Home4LineIcon';
import CalendarEventLineIcon from 'remixicon-react/CalendarEventLineIcon';
import ShoppingBag3LineIcon from 'remixicon-react/ShoppingBag3LineIcon';
import { useEffect, useState } from 'react';
import TitleBar from '@/components/TitleBar';

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
        url: '/events',
      },
      {
        toolTip: 'Products',
        icon: ShoppingBag3LineIcon,
        url: '/products',
      },
    ],
  };

  const capitalize = (text: string) => {
    if (text) {
      return text.charAt(0).toUpperCase() + text.slice(1);
    }
    return '';
  };
  console.log(category);

  return (
    <div className="w-full flex min-h-screen h-fit bg-cms-dark">
      <Navbar navBarProps={NavbarOptions} />
      <div className="md:pl-4">
        <TitleBar title={capitalize(category as 'all' | 'products' | 'events' | 'others')} />
        <CardList type={category as 'all' | 'products' | 'events' | 'others'} cardList={cardListMock} />
      </div>
    </div>
  );
}
