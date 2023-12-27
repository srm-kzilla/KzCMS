import server from "@/utils/server";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function EditData({
  assetProjectId,
  addAssetState,
  setAddAssetState,
  assetTitle,
  assetDescription,
  assetLink,
}: {
  assetProjectId?: string;
  addAssetState: boolean;
  setAddAssetState: React.Dispatch<React.SetStateAction<boolean>>;
  assetTitle?: string;
  assetDescription?: string;
  assetLink?: string;
}) {
  const router = useRouter();
  const [data, setData] = useState({
    title: assetTitle || "",
    description: assetDescription || "",
    image: new Blob(),
    link: assetLink || "",
  });
  const [error, setError] = useState(false);

  const cookies = parseCookies();
  const { token } = cookies;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setData({
      ...data,
      [e.target.name]:
        (e.target as HTMLInputElement).type === "file"
          ? (e.target as HTMLInputElement).files?.[0]
          : e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const projectUrlRegex = /^https?:\/\/[\w.-]+\.[a-zA-Z]{2,}$/i;

      if (!projectUrlRegex.test(data.link)) {
        setError(true);
        toast.error("Invalid Project URL!");
        return;
      }

      await server.patch(
        `/api/projects/${assetProjectId}/data`,
        {
          title: data.title,
          description: data.description,
          link: data.link,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.image.name && data.image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        const formData = new FormData();
        formData.append("image", data.image);

        await server.patch(`/api/projects/${assetProjectId}/image`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setAddAssetState(false);
      toast.success("Data Uploaded Successfully!");
      router.reload();
    } catch (err) {
      setError(true);
    }
  };

  return (
    <>
      {addAssetState ? (
        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black/70 backdrop-blur-sm">
          <form
            className="flex h-fit w-80 flex-col items-center justify-center gap-2 rounded-2xl bg-primary p-7 md:w-96"
            onSubmit={handleSubmit}
          >
            <div className="text-xl font-bold">Add Asset</div>
            <div className="flex w-full flex-col gap-3">
              <input
                className="w-full rounded-xl bg-secondary px-5 py-4 outline-none"
                type="text"
                placeholder="Title"
                name="title"
                value={data.title}
                onChange={handleChange}
                required
              />
              <textarea
                className="w-full rounded-xl bg-secondary px-5 py-4 outline-none"
                placeholder="Description"
                name="description"
                value={data.description}
                onChange={handleChange}
                required
              />
              <input
                className="w-full cursor-pointer rounded-xl bg-secondary pr-5 text-gray-400 file:py-4 focus:outline-none"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
              <input
                className="w-full rounded-xl bg-secondary px-5 py-4 outline-none"
                type="text"
                placeholder="Project URL"
                name="link"
                value={data.link}
                onChange={handleChange}
                required
              />
            </div>
            {error ? (
              <p className="text-red-500">Something went wrong!</p>
            ) : null}
            <input
              type="submit"
              value="Submit"
              className="mt-5 cursor-pointer rounded-lg bg-highlight px-5 py-3 font-semibold text-primary transition-all hover:bg-highlight/80"
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
