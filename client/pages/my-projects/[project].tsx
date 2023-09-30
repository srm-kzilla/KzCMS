import ImageCardList from '@/components/ImageCardList';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import nookies, { parseCookies } from 'nookies';
import UserDataType from '@/interfaces/userDataType';
import server from '@/utils/server';
import ProjectDataType from '@/interfaces/ProjectDataType';
import { AxiosResponse } from 'axios';
import { useState } from 'react';
import AddCircleLineIcon from 'remixicon-react/AddCircleLineIcon';
import CloseCircleLineIcon from 'remixicon-react/CloseCircleLineIcon';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Project({ user, projectData }: { user: UserDataType; projectData: ProjectDataType[] }) {
  const router = useRouter();
  const [addAssetState, setAddAssetState] = useState(false);
  const [data, setData] = useState({
    image: '',
    title: '',
    link: '',
  });
  const [error, setError] = useState(false);

  const cookies = parseCookies();
  const { token } = cookies;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.type === 'file' ? e.target.files![0] : e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', data.image);
    formData.append('title', data.title);
    formData.append('link', data.link);

    try {
      const response = await server.post(`/api/projects/${router.query.project}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setAddAssetState(false);
      toast.success("Data Uploaded Successfully!");
    } catch (err: any) {
      setError(true);
      console.log(err);
    }
  };

  const handleAddAsset = () => {
    if (addAssetState === false) {
      setAddAssetState(true);
    } else if (addAssetState === true) {
      setAddAssetState(false);
    }
  };

  return (
    <div>
      <Layout user={user}>
        <div className="w-full h-full flex flex-col gap-10">
          <div className="w-full h-fit">
            <h1 className="font-bold text-2xl lg:text-4xl">{router.query.project?.toString().toUpperCase()}</h1>
            <div>
              <div className="flex justify-end items-center">
                {!addAssetState ? (
                  <button
                    className="flex justify-center items-center gap-2 bg-secondary py-3 px-5 rounded-lg"
                    onClick={handleAddAsset}
                  >
                    <AddCircleLineIcon />
                    Add Asset
                  </button>
                ) : (
                  <button
                    className="flex justify-center items-center gap-2 bg-secondary py-3 px-5 rounded-lg"
                    onClick={handleAddAsset}
                  >
                    <CloseCircleLineIcon />
                  </button>
                )}
              </div>
              <ToastContainer theme='dark' />
              {addAssetState ? (
                <div className="absolute top-0 left-0 w-full h-full bg-black/70 backdrop-blur-sm z-10 flex justify-center items-center">
                  <form
                    className="flex flex-col justify-center items-center gap-2 p-7 bg-primary w-80 md:w-96 h-fit rounded-2xl"
                    onSubmit={handleSubmit}
                  >
                    <div className="text-xl font-bold">Add Asset</div>
                    <div className="w-full flex flex-col gap-3">
                      <input
                        className="w-full px-5 py-4 rounded-xl outline-none bg-secondary"
                        type="text"
                        placeholder="Title"
                        name="title"
                        onChange={handleChange}
                        required
                      />
                      <input
                        className="w-full pr-5 file:py-4 rounded-xl text-gray-400 cursor-pointer focus:outline-none bg-secondary"
                        type="file"
                        name="image"
                        onChange={handleChange}
                        required
                      />
                      <input
                        className="w-full px-5 py-4 rounded-xl outline-none bg-secondary"
                        type="text"
                        placeholder="Project URL"
                        name="link"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {error ? <p className="text-red-500">Something went wrong!</p> : null}
                    <input
                      type="submit"
                      value="Submit"
                      // onClick={handleSubmit}
                      className="bg-highlight text-primary font-semibold py-3 px-5 rounded-lg cursor-pointer hover:bg-highlight/80 transition-all mt-5"
                    />
                    <button onClick={() => setAddAssetState(false)} className="hover:text-highlight">
                      Close
                    </button>
                  </form>
                </div>
              ) : null}
            </div>
            <ImageCardList dataList={projectData} />
          </div>
        </div>
      </Layout>
    </div>
  );
}

interface projectDataResponseType {
  data: AxiosResponse<ProjectDataType[]>;
}

export const getServerSideProps = async (ctx: any) => {
  const cookies = nookies.get(ctx);
  const { project } = ctx.query;

  if (!cookies.token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const userResponse = await server.get('/api/users/user', {
    headers: {
      Authorization: `Bearer ${cookies.token}`,
    },
  });

  const projectDataResponse: projectDataResponseType = await server.get(`/api/projects/${project}`, {
    headers: {
      Authorization: `Bearer ${cookies.token}`,
    },
  });

  return {
    props: {
      user: userResponse.data.data as UserDataType,
      projectData: projectDataResponse.data.data as ProjectDataType[],
    },
  };
};
