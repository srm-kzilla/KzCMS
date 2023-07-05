import NavbarPropsType from '@/types/NavbarProps';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import LogoutCircleRLineIcon from 'remixicon-react/LogoutCircleRLineIcon';
import MenuFoldLineIcon from 'remixicon-react/MenuFoldLineIcon';
import MenuUnfoldLineIcon from 'remixicon-react/MenuUnfoldLineIcon';
import UserFillIcon from 'remixicon-react/UserFillIcon';

const Navbar = ({ navBarProps }: { navBarProps: NavbarPropsType }) => {
  const router = useRouter();
  const [mobileNav, setMobileNav] = useState<boolean>(false);
  const [isDesktop, setDesktop] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 1450) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }

    const updateMedia = () => {
      if (window.innerWidth > 1450) {
        setDesktop(true);
      } else {
        setDesktop(false);
      }
    };
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);
  return (
    <div>
      <div
        className={isDesktop ? 'hidden' : mobileNav ? 'hidden' : 'block absolute top-6 left-4'}
        onClick={() => {
          setMobileNav(!mobileNav);
        }}
      >
        <MenuUnfoldLineIcon size={30} />
      </div>
      <div
        className={
          isDesktop
            ? 'w-72 h-screen flex flex-col justify-between bg-[#1f1f1f] font-raleway'
            : mobileNav
            ? 'w-72 h-screen flex flex-col justify-between bg-[#1f1f1f] font-raleway'
            : 'hidden'
        }
      >
        <div>
          <div className="flex flex-col gap-2">
            <div className="p-4 pt-6 border-gray-600 border-b-2 flex items-center justify-between gap-4">
              <h1 className="font-extrabold tracking-wide text-4xl">KzCMS</h1>
              <div
                className="lg:hidden"
                onClick={() => {
                  setMobileNav(!mobileNav);
                }}
              >
                <MenuFoldLineIcon size={30} />
              </div>
            </div>
            <div className="flex flex-col gap-5 p-4">
              <div>
                <h1 className="text-3xl font-medium">{navBarProps.title}</h1>
              </div>
              <div className="flex flex-col gap-2">
                {navBarProps.options.map((item, key) => {
                  return (
                    <div key={key}>
                      <div
                        className={
                          router.pathname === item.url
                            ? 'px-4 py-2 rounded-lg bg-white text-black cursor-pointer'
                            : 'px-4 py-2 rounded-lg hover:bg-white hover:text-black duration-300 cursor-pointer'
                        }
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
        </div>
        <div className="w-full h-14 bg-[#2d2d2d] flex items-center justify-between gap-2 p-2">
          <div className="flex items-center gap-2">
            <div>
              <UserFillIcon />
            </div>
            <div>
              <h1>CoolDude123</h1>
            </div>
          </div>
          <div className="cursor-pointer hover:text-red-500 duration-300">
            <LogoutCircleRLineIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
