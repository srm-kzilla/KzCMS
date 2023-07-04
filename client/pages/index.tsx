import Navbar from '@/components/Navbar';
import NavbarPropsType from '@/types/NavbarProps';
import ShoppingBag3LineIcon from 'remixicon-react/ShoppingBag3LineIcon';
import Home4LineIcon from 'remixicon-react/Home4LineIcon';
import CalendarEventLineIcon from 'remixicon-react/CalendarEventLineIcon';

// Mock data
const NavbarOptions: NavbarPropsType = {
  title: 'Categories',
  options: [
    {
      title: 'Home',
      icon: Home4LineIcon,
      url: '/',
    },
    {
      title: 'Events',
      icon: CalendarEventLineIcon,
      url: '/events',
    },
    {
      title: 'Products',
      icon: ShoppingBag3LineIcon,
      url: '/products',
    },
  ],
};

export default function Home() {
  return (
    <div className="w-full min-h-screen h-fit">
      <Navbar navBarProps={NavbarOptions} />
    </div>
  );
}
