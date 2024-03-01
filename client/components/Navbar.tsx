import type { User } from "@/types";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { useState } from "react";
import ArrowDownIcon from "remixicon-react/ArrowDownSFillIcon";
import ArrowUpIcon from "remixicon-react/ArrowUpSFillIcon";
import MyProjectsIcon from "remixicon-react/DashboardLineIcon";
import ManageProjectIcon from "remixicon-react/Layout2LineIcon";
import LogoutIcon from "remixicon-react/LogoutBoxRLineIcon";
import MenuIcon from "remixicon-react/MenuLineIcon";
import SettingsIcon from "remixicon-react/Settings4LineIcon";
import UserIcon from "remixicon-react/UserLineIcon";

const Navbar = ({ user }: { user: User }) => {
  const [options, setOptions] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [passwordModal, setPasswordModal] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");

  const router = useRouter();

  const updateUserPassword = async (email: string, newPassword: string) => {
    const response = await axios.post("/api/update-user-password", {
      email,
      password: newPassword,
    });

    if (response.status === 200) {
      router.reload();
    }
  };

  return (
    <div className="h-full w-full">
      <div className="hidden h-full w-full border-r-2 border-r-secondary p-6 lg:block">
        <div className="flex h-full w-full flex-col justify-between">
          <div className="flex w-full flex-col gap-10">
            <div className="flex items-center gap-5">
              <div>
                <Image
                  width={20}
                  height={20}
                  className="w-8"
                  src="/srmkzilla-gradient-logo.svg"
                  alt=""
                />
              </div>
              <div>
                <h1 className="text-xl font-bold">KzCMS</h1>
              </div>
            </div>
            <div className="flex w-full flex-col gap-3">
              <div>
                <h1 className="text-base font-bold text-highlight">MENU</h1>
              </div>
              <div className="flex w-full flex-col gap-2 pl-3">
                <div
                  className="flex w-full cursor-pointer gap-2 rounded-md px-4 py-2 duration-300 hover:bg-secondary"
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  <div>
                    <MyProjectsIcon className="text-highlight" size={20} />
                  </div>
                  <h1 className="text-text-secondary text-sm font-medium">
                    MY PROJECTS
                  </h1>
                </div>
                {user.isAdmin && (
                  <div>
                    <div
                      className="flex w-full cursor-pointer gap-2 rounded-md px-4 py-2 duration-300 hover:bg-secondary"
                      onClick={() => {
                        router.push("/manage-projects");
                      }}
                    >
                      <div>
                        <ManageProjectIcon
                          className="text-highlight"
                          size={20}
                        />
                      </div>
                      <h1 className="text-text-secondary text-sm font-normal">
                        MANAGE PROJECTS
                      </h1>
                    </div>
                    <div
                      className="flex w-full cursor-pointer gap-2 rounded-md px-4 py-2 duration-300 hover:bg-secondary"
                      onClick={() => {
                        router.push("/manage-users");
                      }}
                    >
                      <div>
                        <UserIcon className="text-highlight" size={20} />
                      </div>
                      <h1 className="text-text-secondary text-sm font-medium">
                        MANAGE USERS
                      </h1>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            {options && (
              <div className="flex w-full flex-col rounded-md bg-secondary">
                <div
                  className="flex cursor-pointer items-center gap-2 p-4 duration-300 hover:bg-primary"
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
                  className="flex cursor-pointer items-center gap-2 p-4 duration-300 hover:bg-primary"
                  onClick={() => {
                    destroyCookie(null, "token");
                    router.push("/login");
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
              className="flex w-full cursor-pointer items-center gap-2 rounded-md bg-secondary p-2"
              onClick={() => {
                setOptions(!options);
              }}
            >
              <div className="flex w-full items-center gap-3">
                <div className="flex h-full w-fit items-center">
                  <UserIcon size={25} />
                </div>
                <div className="flex w-3/4 flex-col">
                  <div className="flex items-center gap-1">
                    <div>
                      <h1 className="text-sm font-bold">{user.email}</h1>
                    </div>
                  </div>
                  <h1 className="text-xs text-light">
                    {user.isAdmin ? "Admin" : "Verified User"}
                  </h1>
                </div>
              </div>
              <div className="flex h-full items-start">
                {options ? (
                  <ArrowUpIcon size={15} />
                ) : (
                  <ArrowDownIcon size={15} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 z-10 flex h-fit w-full flex-col gap-3 bg-primary p-3 lg:hidden">
        <div className="flex h-16 w-full items-center justify-between rounded-lg bg-secondary p-2">
          <div className="flex items-center gap-5">
            <div>
              <Image
                width={20}
                height={20}
                className="w-8"
                src="/srmkzilla-gradient-logo.svg"
                alt=""
              />
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
          <div className="flex h-fit w-full flex-col rounded-lg bg-secondary p-2">
            <div className="flex w-full flex-col gap-3">
              <div>
                <h1 className="text-base font-bold text-highlight">MENU</h1>
              </div>
              <div className="flex w-full flex-col gap-2">
                <div
                  className="flex w-full cursor-pointer gap-2 rounded-md px-4 py-2 duration-300 hover:bg-secondary"
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  <div>
                    <MyProjectsIcon className="text-highlight" size={20} />
                  </div>
                  <h1 className="text-text-secondary text-sm font-medium">
                    MY PROJECTS
                  </h1>
                </div>
                {user.isAdmin && (
                  <div>
                    <div
                      className="flex w-full cursor-pointer gap-2 rounded-md px-4 py-2 duration-300 hover:bg-secondary"
                      onClick={() => {
                        router.push("/manage-projects");
                      }}
                    >
                      <div>
                        <ManageProjectIcon
                          className="text-highlight"
                          size={20}
                        />
                      </div>
                      <h1 className="text-text-secondary text-sm font-medium">
                        MANAGE PROJECTS
                      </h1>
                    </div>
                    <div
                      className="flex w-full cursor-pointer gap-2 rounded-md px-4 py-2 duration-300 hover:bg-secondary"
                      onClick={() => {
                        router.push("/manage-users");
                      }}
                    >
                      <div>
                        <UserIcon className="text-highlight" size={20} />
                      </div>
                      <h1 className="text-text-secondary text-sm font-medium">
                        MANAGE USERS
                      </h1>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex w-full flex-col">
              <div className="flex w-full cursor-pointer gap-2 rounded-md px-4 py-2 duration-300 hover:bg-secondary">
                <div>
                  <SettingsIcon className="text-light" size={20} />
                </div>
                <div>
                  <h1>Settings</h1>
                </div>
              </div>
              <div
                className="flex w-full cursor-pointer gap-2 rounded-md px-4 py-2 duration-300 hover:bg-secondary"
                onClick={() => {
                  destroyCookie(null, "token");
                  router.push("/login");
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
        <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black/40 p-6">
          <div className="flex w-full flex-col gap-5 rounded-lg bg-secondary p-6 lg:w-[500px]">
            <div className="flex w-full flex-col items-center justify-center">
              <h1 className="text-xl font-bold">Update password of </h1>
              <h1 className="text-xl font-bold">{user.email}?</h1>
            </div>
            <form
              className="flex h-full w-full flex-col gap-5"
              onSubmit={(e) => {
                e.preventDefault();
                updateUserPassword(user.email, newPassword);
              }}
            >
              <div>
                <input
                  className="w-full rounded-lg bg-primary px-4 py-2 text-sm outline-none lg:text-base"
                  type="text"
                  placeholder="New Password (At least 5 characters)"
                  pattern=".{5,}"
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-lg border-2 border-white px-6 py-2"
                >
                  <h1 className="text-sm font-bold text-white md:text-base">
                    Update Password
                  </h1>
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    setPasswordModal(!passwordModal);
                  }}
                  className="flex w-full items-center justify-center rounded-lg border-2 border-white px-6 py-2"
                >
                  <h1 className="text-sm font-bold md:text-base">Cancel</h1>
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
