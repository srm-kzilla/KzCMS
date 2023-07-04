import NavbarPropsType from '@/types/NavbarProps';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import LogoutCircleRLineIcon from 'remixicon-react/LogoutCircleRLineIcon';
import MenuFoldLineIcon from 'remixicon-react/MenuFoldLineIcon';
import MenuUnfoldLineIcon from 'remixicon-react/MenuUnfoldLineIcon';
import kzillaIcon from '../public/srmkzilla-gradient-logo.svg';

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
        <MenuUnfoldLineIcon size={35} />
      </div>
      <div
        className={
          isDesktop
            ? 'w-fit h-screen flex flex-col justify-between bg-cms-dark font-raleway shadow-xl shadow-black'
            : mobileNav
            ? 'w-fit h-screen flex flex-col justify-between bg-cms-dark font-raleway shadow-xl shadow-black'
            : 'hidden'
        }
      >
        <div>
          <div className="flex flex-col gap-2">
            <div className="p-4 pt-6 w-full h-full border-gray-600 border-b-2 flex flex-col items-center justify-between lg:justify-center gap-4">
              <Image className="w-10" src={kzillaIcon} alt="SRMKZILLA" />
              <div
                className="lg:hidden"
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
                            <span className="tooltiptext font-bold">{item.toolTip}</span>
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
          <div className="cursor-pointer hover:text-red-500 duration-300">
            <LogoutCircleRLineIcon size={35} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
