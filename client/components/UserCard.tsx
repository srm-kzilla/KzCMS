import UserDataType from '@/interfaces/userDataType';
import React, { useState } from 'react';

interface UserCardProps {
  user: UserDataType;
  verifyUser: (email: string) => void;
  deleteUser: (email: string) => void;
  updateUserPassword: (email: string, newPassword: string) => void;
}

const UserCard = ({ user, verifyUser, deleteUser, updateUserPassword }: UserCardProps) => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [passwordModal, setPasswordModal] = useState<boolean>(false);

  return (
    <div className="w-full md:w-[400px] h-fit p-6 rounded-lg bg-secondary flex flex-col gap-5 overflow-hidden">
      {deleteModal && (
        <div className="absolute top-0 bottom-0 right-0 left-0 bg-black/40 flex justify-center items-center p-6">
          <div className="w-full lg:w-[500px] p-6 bg-secondary rounded-lg flex flex-col gap-5">
            <div className="w-full flex flex-col justify-center items-center">
              <h1 className="font-bold text-xl">Are you sure you want to delete </h1>
              <h1 className="font-bold text-xl">{user.email}?</h1>
            </div>
            <form
              className="w-full h-full flex flex-col gap-5"
              onSubmit={e => {
                e.preventDefault();
                deleteUser(user.email);
              }}
            >
              <div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-6 py-2 border-2 border-red-500 rounded-lg"
                >
                  <h1 className="font-bold text-sm md:text-base text-red-500">Delete</h1>
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    setDeleteModal(!deleteModal);
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
      <div>
        <div>
          <h1 className="font-bold text-base lg:text-2xl">{user.email}</h1>
        </div>
        <div className="w-full flex gap-2">
          <h1 className="font-bold text-sm text-gray-500">{user.isAdmin ? 'Admin' : 'User'}</h1>
          <div className="font-bold text-sm text-gray-500">
            <h1>|</h1>
          </div>
          <div className="font-bold text-sm text-gray-500">
            <h1>{user.isVerified ? 'Verified' : 'Unverified'}</h1>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex flex-col gap-3 lg:flex lg:flex-row">
          <div className="w-full">
            <button
              onClick={() => {
                setDeleteModal(!deleteModal);
              }}
              className="w-full flex items-center justify-center px-6 py-2 border-2 border-red-500 rounded-lg"
            >
              <h1 className="font-bold text-sm md:text-base text-red-500">Delete User</h1>
            </button>
          </div>
          {!user.isVerified && (
            <div className="w-full">
              <button
                onClick={() => {
                  verifyUser(user.email);
                }}
                className="w-full flex items-center justify-center px-6 py-2 border-2 border-blue-500 rounded-lg"
              >
                <h1 className="font-bold text-sm md:text-base text-blue-500">Verify User</h1>
              </button>
            </div>
          )}
        </div>
        <div>
          <div className="w-full">
            <button
              onClick={() => {
                setPasswordModal(!passwordModal);
              }}
              className="w-full flex items-center justify-center px-6 py-2 border-2 border-white rounded-lg"
            >
              <h1 className="font-bold text-sm md:text-base text-white">Update Password</h1>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
