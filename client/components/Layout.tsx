import React from 'react';
import Navbar from './Navbar';
import UserDataType from '@/interfaces/userDataType';

const Layout = ({user, children}: {user: UserDataType, children: React.ReactNode}) => {
  return (
    <div className='w-full h-screen overflow-hidden flex'>
      <div className='lg:w-[350px] lg:h-screen absolute lg:static w-full h-[90px] bottom-0'>
        <Navbar user={user} />
      </div>
      <div className='w-full h-screen overflow-auto p-6'>
        {children}
      </div>
    </div>
  );
};

export default Layout;
