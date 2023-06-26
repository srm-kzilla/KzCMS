import Image from 'next/image';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import NavbarPropsType from '@/types/NavbarProps';

const inter = Inter({ subsets: ['latin'] });

// Mock data
const NavbarOptions: NavbarPropsType = {
  title: 'Categories',
  options: [
    {
      title: 'All',
      url: '/all',
    },
    {
      title: 'Main Website',
      url: '/main',
    },
    {
      title: 'Events',
      url: '/events',
    },
    {
      title: 'Products',
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
