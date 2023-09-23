import Layout from '@/components/Layout'
import React from 'react'
import nookies from 'nookies';

const manageProjects = () => {
  return (
    <div className="w-full flex min-h-screen h-fit">
      <Layout user={
        {
          name: "Paddy",
        }
      }>
        <div className="w-full h-full flex flex-col gap-10">
          <div className="w-full h-fit">
            <h1 className="font-bold text-2xl lg:text-4xl">MANAGE PROJECTS</h1>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default manageProjects

export const getServerSideProps = async (ctx: any) => {
  const cookies = nookies.get(ctx)

  if (!cookies.token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}