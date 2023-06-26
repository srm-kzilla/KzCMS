import NavbarPropsType from '@/types/NavbarProps';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

const Navbar = ({ navBarProps }: { navBarProps: NavbarPropsType }) => {
  const router = useRouter();
  return (
    <div className="w-72 h-screen flex flex-col justify-between bg-[#1f1f1f] font-raleway">
      <div className="p-4 pt-6 flex flex-col gap-10">
        <div>
          <h1 className="font-extrabold tracking-wide text-4xl">KzCMS</h1>
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <h1 className="text-3xl font-medium">{navBarProps.title}</h1>
          </div>
          <div className="flex flex-col gap-2">
            {navBarProps.options.map((item, key) => {
              return (
                <div key={key}>
                  <div
                    className="px-4 py-2 rounded-lg hover:bg-white hover:text-black duration-300 cursor-pointer"
                    onClick={() => {
                      router.push(item.url);
                    }}
                  >
                    <h1 className="text-xl font-medium">{item.title}</h1>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-full h-12 bg-[#2d2d2d] flex items-center gap-2 p-2">
        <div>
          <Image className="rounded-full" width={40} height={40} src="/userIcon.jpg" alt="/" />
        </div>
        <div>
          <h1>CoolDude123</h1>
        </div>
        <div>
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
