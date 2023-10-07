import server from '@/utils/server';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export default function EditData({
  addAssetState,
  setAddAssetState,
}: {
  addAssetState: boolean;
  setAddAssetState: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
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

  return (
    <>
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
              className="bg-highlight text-primary font-semibold py-3 px-5 rounded-lg cursor-pointer hover:bg-highlight/80 transition-all mt-5"
            />
            <button
              onClick={() => {
                setAddAssetState(false);
                setError(false);
              }}
              className="hover:text-highlight"
            >
              Close
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}
