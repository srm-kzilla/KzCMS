import UserDataType from '@/interfaces/userDataType';
import React from 'react';

const UserCard = ({ user }: { user: UserDataType }) => {
  return (
    <div className="w-full md:w-[400px] h-[250px] p-6 rounded-lg bg-secondary">
      <div>
        <h1 className="font-bold text-2xl">{user.email}</h1>
      </div>
      <div className="w-full flex gap-2">
        <div className="font-bold text-sm text-gray-500">{user.isAdmin ? <h1>Admin</h1> : <h1>User</h1>}</div>
        <div className="font-bold text-sm text-gray-500">
          <h1>|</h1>
        </div>
        <div className="font-bold text-sm text-gray-500">
          {user.isVerified ? (
            <div>
              <h1>Verified</h1>
            </div>
          ) : (
            <div>
              <h1>Unverified</h1>
            </div>
          )}
        </div>
        <div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
