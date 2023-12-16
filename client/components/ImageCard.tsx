import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LinkIcon from "remixicon-react/LinkIcon";
import type { ProjectItem } from "@/types";

const ImageCard = (data: ProjectItem) => {
  const { imageURL, title, link, description, author } = data;
  const [, setProjectName] = useState<string>();

  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      setProjectName(router.query.project as string);
    }
  }, [router.isReady, router.query.project]);

  return (
    <article>
      <div className="group h-[300px] w-[320px] overflow-hidden rounded-xl [perspective:1000px] md:w-[400px]">
        <div className="relative h-full w-full shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus:[transform:rotateY(180deg)]">
          <div className="absolute inset-0 flex bg-slate-100">
            <Image
              src={imageURL}
              alt="Project data image"
              width={500}
              height={500}
              unoptimized
            ></Image>
          </div>
          <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-3 bg-black/80 px-3 py-5 text-center text-slate-200 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="text-4xl font-bold">{title}</div>
            <div className="flex">
              <LinkIcon />
              <a href={link} target="_blank" className=" ml-2 font-semibold">
                {link}
              </a>
            </div>
            <div className="mb-2 font-semibold text-card-gray">
              {description}
            </div>
            <div className="flex gap-2">
              <button className="w-20 rounded-xl border-2 p-1 font-bold">
                Edit
              </button>
              <button className="w-20 rounded-xl border-2 border-card-red p-1 font-bold text-card-red">
                Delete
              </button>
            </div>
            {author ? (
              <div className=" text-[#797979]">Last edited by : {author}</div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ImageCard;
