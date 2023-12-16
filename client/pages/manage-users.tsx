import Layout from "@/components/Layout";
import UserCard from "@/components/UserCard";
import server from "@/utils/server";
import axios from "axios";
import { useRouter } from "next/router";
import nookies from "nookies";
import Head from "next/head";
import { User } from "@/types";
import type { GetServerSidePropsContext } from "next";

const manageUsers = ({
  user,
  userList,
}: {
  user: User;
  userList: User[];
}) => {
  const router = useRouter();
  const verifyUser = async (email: string) => {
    const response = await axios.patch("/api/verify-user", {
      email,
    });

    if (response.status === 200) {
      router.reload();
    }
  };
  const deleteUser = async (email: string) => {
    const response = await axios.post("/api/delete-user", { email });

    if (response.status === 200) {
      router.reload();
    }
  };
  const updateUserPassword = async (email: string, newPassword: string) => {
    const response = await axios.post("/api/update-user-password", {
      email,
      password: newPassword,
    });

    if (response.status === 200) {
      router.reload();
    }
  };

  const filteredUserList = userList.filter((list) => list.email !== user.email);

  return (
    <>
      <Head>
        <title>Manage Users</title>
      </Head>
      <div className="flex h-fit min-h-screen w-full">
        <Layout user={user}>
          <div className="flex h-full w-full flex-col gap-10">
            <div className="h-fit w-full">
              <h1 className="text-2xl font-bold lg:text-4xl">MANAGE USERS</h1>
            </div>
            <div className="flex w-full flex-col gap-5 md:flex md:flex-row md:flex-wrap">
              {filteredUserList.map((user, key) => {
                return (
                  <div key={key}>
                    <UserCard
                      user={user}
                      verifyUser={verifyUser}
                      deleteUser={deleteUser}
                      updateUserPassword={updateUserPassword}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
};

export default manageUsers;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);

  if (!cookies.token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const userResponse = await server.get("/api/users/user", {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    });

    const userListResponse = await server.get("/api/users", {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    });

    return {
      props: {
        user: userResponse.data.data as User,
        userList: userListResponse.data.data as User[],
      },
    };
  } catch (err) {
    nookies.destroy(ctx, "token");
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};
