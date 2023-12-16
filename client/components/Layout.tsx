import React from "react";
import Navbar from "./Navbar";
import UserDataType from "@/interfaces/userDataType";

const Layout = ({
  user,
  children,
}: {
  user: UserDataType;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className="absolute bottom-0 h-[90px] w-full lg:static lg:h-screen lg:w-[350px]">
        <Navbar user={user} />
      </div>
      <div className="h-screen w-full overflow-auto p-6">{children}</div>
    </div>
  );
};

export default Layout;
