import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { FormEvent, MouseEvent, useState } from "react";
import { toast } from "react-hot-toast";
import DeleteIcon from "remixicon-react/DeleteBin7LineIcon";

export interface Token {
  _id: string;
  name: string;
  createdAt: string;
  createdBy: string;
}

export function ManageTokens({
  tokens,
  projectId,
}: {
  tokens: Token[];
  projectId: string;
}) {
  const [addTokenModal, setAddTokenModal] = useState<boolean>(false);
  const [generatedToken, setGeneratedToken] = useState("");
  const router = useRouter();

  const handleTokenAdd = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      const response = await axios.post("/api/create-token", {
        projectId,
        name: formData.get("tokenName"),
      });

      if (response.status === 200) {
        toast.success("Token created successfully");
        setAddTokenModal(!addTokenModal);
        setGeneratedToken(response.data.token);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.description);
        return;
      }

      toast.error("Error creating token");
    }
  };

  const handleTokenDelete = async (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    const tokenName = event.currentTarget.dataset.name;

    try {
      const response = await axios.post("/api/delete-token", {
        projectId,
        name: tokenName,
      });

      if (response.status === 200) {
        toast.success("Token deleted successfully");
        router.reload();
      }
    } catch (error) {
      toast.error("Error deleting token");
    }
  };

  return (
    <>
      <div className="flex w-full flex-1 flex-col gap-10">
        <div className="flex w-full items-center justify-between">
          <div>
            <h1 className="font-bold lg:text-2xl">MANAGE TOKENS</h1>
          </div>
          <div>
            <button
              onClick={() => {
                setAddTokenModal(!addTokenModal);
              }}
              className="rounded-lg border-2 border-white px-6 py-2"
            >
              <h1 className="text-sm font-bold md:text-base">+ Create Token</h1>
            </button>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-5">
          {tokens.length !== 0 ? (
            tokens.map((token, key) => {
              return (
                <div
                  className="flex w-full justify-between rounded-lg bg-secondary p-4"
                  key={key}
                >
                  <div className="flex w-full items-center justify-between">
                    <h1 className="text-xl font-bold">{token.name}</h1>
                    <div className="flex gap-4 px-8">
                      <span className="text-sm font-bold text-light">
                        Created by: {token.createdBy}
                      </span>
                      <span
                        className="text-sm font-bold text-light"
                        suppressHydrationWarning
                      >
                        {new Date(token.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <button
                      className="text-red-500"
                      onClick={handleTokenDelete}
                      data-name={token.name}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-5">
              <div>
                <button
                  onClick={() => {
                    setAddTokenModal(!addTokenModal);
                  }}
                  className="rounded-lg border-2 border-dashed border-light px-6 py-2"
                >
                  <h1 className="text-sm font-bold text-light md:text-base">
                    + Create Token
                  </h1>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {generatedToken && (
        <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black/40 p-6">
          <div className="flex w-full flex-col gap-5 rounded-lg bg-primary p-6 lg:w-[500px]">
            <div className="flex w-full justify-center">
              <h1 className="text-2xl font-bold">Token Generated</h1>
            </div>
            <div>
              <div className="flex h-full w-full flex-col gap-5">
                <input
                  className="w-full rounded-xl bg-secondary px-5 py-4 outline-none"
                  type="text"
                  placeholder="Token Name"
                  value={generatedToken}
                  readOnly
                  required
                />
                <p className="text-sm font-bold text-light">
                  Copy this token and use it in your project, this token will be
                  visible only once.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setGeneratedToken("");
                      router.reload();
                    }}
                    className="flex w-full items-center justify-center rounded-lg border-2 border-white px-6 py-2"
                  >
                    <h1 className="text-sm font-bold md:text-base">Close</h1>
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedToken);
                      toast.success("Token copied to clipboard");
                    }}
                    className="flex w-full items-center justify-center rounded-lg border-2 border-white px-6 py-2"
                  >
                    <h1 className="text-sm font-bold md:text-base">Copy</h1>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {addTokenModal && (
        <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black/40 p-6">
          <div className="flex w-full flex-col gap-5 rounded-lg bg-primary p-6 lg:w-[500px]">
            <div className="flex w-full justify-center">
              <h1 className="text-2xl font-bold">Create a Token</h1>
            </div>
            <div>
              <form
                className="flex h-full w-full flex-col gap-5"
                onSubmit={handleTokenAdd}
              >
                <input
                  className="w-full rounded-xl bg-secondary px-5 py-4 outline-none"
                  type="text"
                  placeholder="Token Name"
                  name="tokenName"
                  minLength={3}
                  required
                />
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setAddTokenModal(!addTokenModal);
                    }}
                    className="flex w-full items-center justify-center rounded-lg border-2 border-white px-6 py-2"
                  >
                    <h1 className="text-sm font-bold md:text-base">Cancel</h1>
                  </button>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-lg border-2 border-white px-6 py-2"
                  >
                    <h1 className="text-sm font-bold md:text-base">Create</h1>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
