import Navbar from '@/components/Navbar';
import ShoppingBag3LineIcon from 'remixicon-react/ShoppingBag3LineIcon';
import Home4LineIcon from 'remixicon-react/Home4LineIcon';
import CalendarEventLineIcon from 'remixicon-react/CalendarEventLineIcon';

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
      url: '/event',
    },
    {
      toolTip: 'Products',
      icon: ShoppingBag3LineIcon,
      url: '/product',
    },
  ],
};

export default function Home() {
  return (
    <div className='w-full min-h-screen h-fit'>
      <Navbar navBarProps={NavbarOptions} />
    </div>
  );
}
