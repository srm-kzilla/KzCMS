import Navbar from '@/components/Navbar';
import ShoppingBag3LineIcon from 'remixicon-react/ShoppingBag3LineIcon';
import Home4LineIcon from 'remixicon-react/Home4LineIcon';
import CalendarEventLineIcon from 'remixicon-react/CalendarEventLineIcon';
import CardList from '@/components/CardsList';
import { cardListMock } from '@/mock/cardListMock';
import TitleBar from '@/components/TitleBar';

// Mock data for Navbar
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

export default function Home() {
  return (
    <div className="w-full flex min-h-screen h-fit">
      <Navbar navBarProps={NavbarOptions} />
      <div className="md:pl-4">
        <TitleBar title="Srmkzilla Cockpit" />
        <CardList type={'all'} cardList={cardListMock} />
      </div>
    </div>
  );
}
