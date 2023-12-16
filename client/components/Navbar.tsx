import React, { useState } from 'react';
import ArrowDownIcon from 'remixicon-react/ArrowDownSFillIcon';
import ArrowUpIcon from 'remixicon-react/ArrowUpSFillIcon';
import MyProjectsIcon from 'remixicon-react/DashboardLineIcon';
import ManageProjectIcon from 'remixicon-react/Layout2LineIcon';
import SettingsIcon from 'remixicon-react/Settings4LineIcon';
import LogoutIcon from 'remixicon-react/LogoutBoxRLineIcon';
import { useRouter } from 'next/router';
import UserIcon from 'remixicon-react/UserLineIcon';
import MenuIcon from 'remixicon-react/MenuLineIcon';
import Image from 'next/image';
import { destroyCookie } from 'nookies';
import UserDataType from '@/interfaces/userDataType';
import axios from 'axios';

const Navbar = ({ user }: { user: UserDataType }) => {
  const [options, setOptions] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [passwordModal, setPasswordModal] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>('');

  const router = useRouter();

  const updateUserPassword = async (email: string, newPassword: string) => {
    const response = await axios.post('/api/update-user-password', {
      email,
      password: newPassword,
    });

    if (response.status === 200) {
      router.reload();
    }
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-full border-r-2 border-r-secondary p-6 hidden lg:block">
        <div className="w-full h-full flex flex-col justify-between">
          <div className="w-full flex flex-col gap-10">
            <div className="flex gap-5 items-center">
              <div>
                <Image width={20} height={20} className="w-8" src="/srmkzilla-gradient-logo.svg" alt="" />
              </div>
              <div>
                <h1 className="text-xl font-bold">KzCMS</h1>
              </div>
            </div>
            <div className="w-full flex flex-col gap-3">
              <div>
                <h1 className="text-highlight font-bold text-base">MENU</h1>
              </div>
              <div className="w-full flex flex-col pl-3 gap-2">
                <div
                  className="w-full flex gap-2 hover:bg-secondary duration-300 cursor-pointer px-4 py-2 rounded-md"
                  onClick={() => {
                    router.push('/');
                  }}
                >
                  <div>
                    <MyProjectsIcon className="text-highlight" size={20} />
                  </div>
                  <h1 className="text-sm font-medium text-text-secondary">MY PROJECTS</h1>
                </div>
                {user.isAdmin && (
                  <div>
                    <div
                      className="w-full flex gap-2 hover:bg-secondary duration-300 cursor-pointer px-4 py-2 rounded-md"
                      onClick={() => {
                        router.push('/manage-projects');
                      }}
                    >
                      <div>
                        <ManageProjectIcon className="text-highlight" size={20} />
                      </div>
                      <h1 className="text-sm font-medium text-text-secondary">MANAGE PROJECTS</h1>
                    </div>
                    <div
                      className="w-full flex gap-2 hover:bg-secondary duration-300 cursor-pointer px-4 py-2 rounded-md"
                      onClick={() => {
                        router.push('/manage-users');
                      }}
                    >
                      <div>
                        <UserIcon className="text-highlight" size={20} />
                      </div>
                      <h1 className="text-sm font-medium text-text-secondary">MANAGE USERS</h1>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            {options && (
              <div className="w-full bg-secondary flex flex-col rounded-md">
                <div
                  className="flex gap-2 items-center hover:bg-primary duration-300 cursor-pointer p-4"
                  onClick={() => {
                    setPasswordModal(!passwordModal);
                  }}
                >
                  <div>
                    <SettingsIcon className="text-light" size={20} />
                  </div>
                  <div>
                    <h1>Change Password</h1>
                  </div>
                </div>
                <div
                  className="flex gap-2 items-center hover:bg-primary duration-300 cursor-pointer p-4"
                  onClick={() => {
                    destroyCookie(null, 'token');
                    router.push('/login');
                  }}
                >
                  <div>
                    <LogoutIcon className="text-red-500" size={20} />
                  </div>
                  <div>
                    <h1>Log Out</h1>
                  </div>
                </div>
              </div>
            )}
            <div
              className="w-full flex items-center gap-2 bg-secondary rounded-md cursor-pointer p-2"
              onClick={() => {
                setOptions(!options);
              }}
            >
              <div className="flex w-full gap-3 items-center">
                <div className="w-fit h-full flex items-center">
                  <UserIcon size={25} />
                </div>
                <div className="w-3/4 flex flex-col">
                  <div className="flex gap-1 items-center">
                    <div>
                      <h1 className="text-sm font-bold">{user.email}</h1>
                    </div>
                  </div>
                  <h1 className="text-light text-xs">Admin</h1>
                </div>
              </div>
              <div className="h-full flex items-start">
                {options ? <ArrowUpIcon size={15} /> : <ArrowDownIcon size={15} />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-fit bg-primary absolute bottom-0 lg:hidden p-3 flex flex-col gap-3 z-10">
        <div className="w-full h-16 bg-secondary rounded-lg p-2 flex items-center justify-between">
          <div className="flex gap-5 items-center">
            <div>
              <Image width={20} height={20} className="w-8" src="/srmkzilla-gradient-logo.svg" alt="" />
            </div>
            <div>
              <h1 className="text-xl font-bold">KzCMS</h1>
            </div>
          </div>
          <div
            onClick={() => {
              setMobileNav(!mobileNav);
            }}
          >
            <MenuIcon size={25} />
          </div>
        </div>
        {mobileNav && (
          <div className="w-full h-fit bg-secondary flex flex-col rounded-lg p-2">
            <div className="w-full flex flex-col gap-3">
              <div>
                <h1 className="text-highlight font-bold text-base">MENU</h1>
              </div>
              <div className="w-full flex flex-col gap-2">
                <div
                  className="w-full flex gap-2 hover:bg-secondary duration-300 cursor-pointer px-4 py-2 rounded-md"
                  onClick={() => {
                    router.push('/');
                  }}
                >
                  <div>
                    <MyProjectsIcon className="text-highlight" size={20} />
                  </div>
                  <h1 className="text-sm font-medium text-text-secondary">MY PROJECTS</h1>
                </div>
                {user.isAdmin && (
                  <div>
                    <div
                      className="w-full flex gap-2 hover:bg-secondary duration-300 cursor-pointer px-4 py-2 rounded-md"
                      onClick={() => {
                        router.push('/manage-projects');
                      }}
                    >
                      <div>
                        <ManageProjectIcon className="text-highlight" size={20} />
                      </div>
                      <h1 className="text-sm font-medium text-text-secondary">MANAGE PROJECTS</h1>
                    </div>
                    <div
                      className="w-full flex gap-2 hover:bg-secondary duration-300 cursor-pointer px-4 py-2 rounded-md"
                      onClick={() => {
                        router.push('/manage-users');
                      }}
                    >
                      <div>
                        <UserIcon className="text-highlight" size={20} />
                      </div>
                      <h1 className="text-sm font-medium text-text-secondary">MANAGE USERS</h1>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col">
              <div className="w-full flex gap-2 hover:bg-secondary duration-300 cursor-pointer px-4 py-2 rounded-md">
                <div>
                  <SettingsIcon className="text-light" size={20} />
                </div>
                <div>
                  <h1>Settings</h1>
                </div>
              </div>
              <div
                className="w-full flex gap-2 hover:bg-secondary duration-300 cursor-pointer px-4 py-2 rounded-md"
                onClick={() => {
                  destroyCookie(null, 'token');
                  router.push('/login');
                }}
              >
                <div>
                  <LogoutIcon className="text-red-500" size={20} />
                </div>
                <div>
                  <h1>Log Out</h1>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {passwordModal && (
        <div className="absolute top-0 bottom-0 right-0 left-0 bg-black/40 flex justify-center items-center p-6">
          <div className="w-full lg:w-[500px] p-6 bg-secondary rounded-lg flex flex-col gap-5">
            <div className="w-full flex flex-col justify-center items-center">
              <h1 className="font-bold text-xl">Update password of </h1>
              <h1 className="font-bold text-xl">{user.email}?</h1>
            </div>
            <form
              className="w-full h-full flex flex-col gap-5"
              onSubmit={e => {
                e.preventDefault();
                updateUserPassword(user.email, newPassword);
              }}
            >
              <div>
                <input
                  className="w-full px-4 py-2 rounded-lg bg-primary outline-none text-sm lg:text-base"
                  type="text"
                  placeholder="New Password (At least 5 characters)"
                  pattern=".{5,}"
                  onChange={e => {
                    setNewPassword(e.target.value);
                  }}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-6 py-2 border-2 border-white rounded-lg"
                >
                  <h1 className="font-bold text-sm md:text-base text-white">Update Password</h1>
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    setPasswordModal(!passwordModal);
                  }}
                  className="w-full flex items-center justify-center px-6 py-2 border-2 border-white rounded-lg"
                >
                  <h1 className="font-bold text-sm md:text-base">Cancel</h1>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
