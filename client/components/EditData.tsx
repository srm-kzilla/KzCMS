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

  const [error, setError] = useState(false);

  const cookies = parseCookies();
  const { token } = cookies;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataUpdateSignal = new AbortController();
    const imageUpdateSignal = new AbortController();
    try {
      const formData = new FormData(e.currentTarget);
      const title = String(formData.get("title"));
      const description = String(formData.get("description"));
      const link = String(formData.get("link"));
      const image = formData.get("image") as File | null;

      if (title !== assetTitle || description !== assetDescription || link !== assetLink) {
        await server.patch(
          `/api/projects/${assetProjectId}/data`,
          {
            title,
            description,
            link,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            signal: dataUpdateSignal.signal,
          },
        );
      }

      if (image?.name) {
        const formData = new FormData();
        formData.append("image", image);

        await server.patch(`/api/projects/${assetProjectId}/image`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          signal: imageUpdateSignal.signal,
        });
      }

      setAddAssetState(false);
      toast.success("Data Uploaded Successfully!");
      router.reload();
    } catch (err) {
      dataUpdateSignal.abort();
      imageUpdateSignal.abort();
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
            <div className="text-xl font-bold">Edit Asset</div>
            <div className="flex w-full flex-col gap-3">
              <input
                className="w-full rounded-xl bg-secondary px-5 py-4 outline-none"
                type="text"
                placeholder="Title"
                name="title"
                defaultValue={assetTitle}
                required
              />
              <textarea
                className="w-full rounded-xl bg-secondary px-5 py-4 outline-none"
                placeholder="Description"
                name="description"
                defaultValue={assetDescription}
                required
              />
              <input
                className="w-full cursor-pointer rounded-xl bg-secondary pr-5 text-gray-400 file:py-4 focus:outline-none"
                type="file"
                name="image"
                accept="image/jpeg, image/jpg, image/png, image/gif"
              />
              <input
                className="w-full rounded-xl bg-secondary px-5 py-4 outline-none"
                type="url"
                placeholder="Project URL"
                name="link"
                defaultValue={assetLink}
                required
              />
            </div>
            {error ? (
              <p className="text-red-500">Failed to update data</p>
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
