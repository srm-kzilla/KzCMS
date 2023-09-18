import Layout from "@/components/Layout";
import React from "react";

export default function Home() {
  return (
    <div className="w-full flex min-h-screen h-fit">
      <Layout user={
        {
          name: "Paddy",
        }
      }>
        <div className="w-full h-full flex flex-col gap-10">
          <div className="w-full h-fit">
            <h1 className="font-bold text-2xl lg:text-4xl">MY PROJECTS</h1>
          </div>
        </div>
      </Layout>
    </div>
  );
}
