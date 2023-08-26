import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import LogoutCircleRLineIcon from 'remixicon-react/LogoutCircleRLineIcon';
import MenuFoldLineIcon from 'remixicon-react/MenuFoldLineIcon';
import MenuUnfoldLineIcon from 'remixicon-react/MenuUnfoldLineIcon';
import useIsDesktop from '@/hooks/useIsDesktop';
import { kZgradientLogoAlt, kZgradientLogoURL } from '@/constants/constants';

interface NavbarPropsOptionsType {
  options: NavbarOptionsType[];
}

interface NavbarOptionsType {
  toolTip: string;
  icon: any;
  url: string;
}

const Navbar = ({ navBarProps }: { navBarProps: NavbarPropsOptionsType }) => {
  const router = useRouter();
  const [mobileNav, setMobileNav] = useState<boolean>(false);
  const [isDesktop] = useIsDesktop();
  return (
    <div className="z-30">
      <div
        className={isDesktop ? 'hidden' : mobileNav ? 'hidden' : 'absolute h-24 w-20 flex justify-center items-center'}
        onClick={() => {
          setMobileNav(!mobileNav);
        }}
      >
        <MenuUnfoldLineIcon size={35} />
      </div>
      <div
        className={
          isDesktop
            ? 'w-fit h-screen fixed top-0 left-0 flex flex-col justify-between bg-cms-dark font-raleway shadow-xl shadow-black'
            : mobileNav
            ? 'w-fit h-screen fixed top-0 left-0 flex flex-col justify-between bg-cms-dark font-raleway shadow-xl shadow-black'
            : 'hidden'
        }
      >
        <div>
          <div className="flex flex-col gap-2">
            <div className="p-4 pt-6 w-full h-full border-gray-600 border-b-2 flex flex-col items-center justify-between lg:justify-center gap-4">
              <Image className="w-10" width={10} height={10} src={kZgradientLogoURL} alt={kZgradientLogoAlt} />
              <div
                className={isDesktop ? 'hidden' : mobileNav ? 'block' : 'hidden'}
                onClick={() => {
                  setMobileNav(!mobileNav);
                }}
              >
                <MenuFoldLineIcon size={35} />
              </div>
            </div>
            <div className="flex flex-col gap-5 p-4">
              <div className="flex flex-col gap-2">
                {navBarProps.options.map((item, key) => {
                  const Icon = item.icon;
                  return (
                    <div key={key}>
                      <div
                        className={
                          router.pathname === item.url
                            ? 'p-2 rounded-lg bg-white text-black cursor-pointer'
                            : 'p-2 rounded-lg hover:bg-white hover:text-black duration-300 cursor-pointer'
                        }
                        onClick={() => {
                          router.push(item.url);
                        }}
                      >
                        {isDesktop ? (
                          <div className="tooltip">
                            <div>
                              <Icon size={35} />
                            </div>
                            <span className="tooltiptext">{item.toolTip}</span>
                          </div>
                        ) : (
                          <div>
                            <Icon size={35} />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-fit flex items-center justify-center gap-2 p-2 mb-4">
          <div
            className="cursor-pointer hover:text-red-500 duration-300"
            onClick={() => {
              //   TODO: Add logout functionality
            }}
          >
            <LogoutCircleRLineIcon size={35} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
