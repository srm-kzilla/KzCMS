import { useState } from "react";
import type { User } from "@/types";

interface UserCardProps {
  user: User;
  verifyUser: (email: string, verify: boolean) => void;
  deleteUser: (email: string) => void;
  updateUserPassword: (email: string, newPassword: string) => void;
}

const UserCard = ({
  user,
  verifyUser,
  deleteUser,
  updateUserPassword,
}: UserCardProps) => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [passwordModal, setPasswordModal] = useState<boolean>(false);
  const { email, isAdmin, isVerified } = user;

  return (
    <div className="flex h-fit w-full flex-col gap-5 overflow-hidden rounded-lg bg-secondary p-6 md:w-[400px]">
      {deleteModal && (
        <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black/40 p-6">
          <div className="flex w-full flex-col gap-5 rounded-lg bg-secondary p-6 lg:w-[500px]">
            <div className="flex w-full flex-col items-center justify-center">
              <h1 className="text-xl font-bold">
                Are you sure you want to delete{" "}
              </h1>
              <h1 className="text-xl font-bold">{email}?</h1>
            </div>
            <form
              className="flex h-full w-full flex-col gap-5"
              onSubmit={(e) => {
                e.preventDefault();
                deleteUser(email);
              }}
            >
              <div>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-lg border-2 border-red-500 px-6 py-2"
                >
                  <h1 className="text-sm font-bold text-red-500 md:text-base">
                    Delete
                  </h1>
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    setDeleteModal(!deleteModal);
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
      {passwordModal && (
        <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black/40 p-6">
          <div className="flex w-full flex-col gap-5 rounded-lg bg-secondary p-6 lg:w-[500px]">
            <div className="flex w-full flex-col items-center justify-center">
              <h1 className="text-xl font-bold">Update password of </h1>
              <h1 className="text-xl font-bold">{email}?</h1>
            </div>
            <form
              className="flex h-full w-full flex-col gap-5"
              onSubmit={(e) => {
                e.preventDefault();
                updateUserPassword(email, newPassword);
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
      <div>
        <div>
          <h1 className="text-base font-bold lg:text-2xl">{email}</h1>
        </div>
        <div className="flex w-full gap-2">
          <h1 className="text-sm font-bold text-gray-500">
            {isAdmin ? "Admin" : "User"}
          </h1>
          <div className="text-sm font-bold text-gray-500">
            <h1>|</h1>
          </div>
          <div className="text-sm font-bold text-gray-500">
            <h1>{isVerified ? "Verified" : "Unverified"}</h1>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full flex-col gap-3 lg:flex lg:flex-row">
          <div className="w-full">
            <button
              onClick={() => {
                setDeleteModal(!deleteModal);
              }}
              className="flex w-full items-center justify-center rounded-lg border-2 border-red-500 px-6 py-2"
            >
              <h1 className="text-sm font-bold text-red-500 md:text-base">
                Delete User
              </h1>
            </button>
          </div>
          <div className="w-full">
            <button
              onClick={() => {
                verifyUser(email, !isVerified);
              }}
              className={"flex w-full items-center justify-center rounded-lg border-2 px-6 py-2" + (isVerified ? " border-blue-500" : " border-green-500")}
            >
            <h1 className={`text-sm font-bold md:text-base ${isVerified ? 'text-blue-500' : 'text-green-500'}`}>
              {isVerified ? 'Unverify User' : 'Verify User'}
            </h1>
            </button>
          </div>
        </div>
        <div>
          <div className="w-full">
            <button
              onClick={() => {
                setPasswordModal(!passwordModal);
              }}
              className="flex w-full items-center justify-center rounded-lg border-2 border-white px-6 py-2"
            >
              <h1 className="text-sm font-bold text-white md:text-base">
                Update Password
              </h1>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
