import Navbar from '@/components/Navbar';
import NavbarPropsType from '@/types/NavbarProps';
import React from 'react';

const NavbarOptions: NavbarPropsType = {
  title: 'Test',
  options: [
    {
      title: 'Go Back',
      url: '/',
    },
  ],
};

const Test = () => {
  return (
    <div className="w-full min-h-screen h-fit">
      <Navbar navBarProps={NavbarOptions} />
    </div>
  );
};

export default Test;
