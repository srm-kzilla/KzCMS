import Navbar from "./Navbar";
import type { User } from "@/types";
import type { ReactNode } from "react";

const Layout = ({ user, children }: { user: User; children: ReactNode }) => {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden lg:flex-row">
      <div className=" h-[90px] w-full lg:static lg:h-screen lg:w-[350px]">
        <Navbar user={user} />
      </div>
      <div className="h-screen w-full overflow-auto p-6">{children}</div>
    </div>
  );
};

export default Layout;
