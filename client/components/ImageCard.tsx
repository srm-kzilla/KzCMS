import Image from 'next/image';
import LinkIcon from 'remixicon-react/LinkIcon';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProjectDataType from '@/interfaces/ProjectDataType';


const ImageCard = (data: ProjectDataType) => {
  const { imageURL, title, link, description, author } = data;
  const [projectName, setProjectName] = useState<string>();

  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      setProjectName(router.query.project as string);
    }
  }, [router.isReady]);

  return (
    <article>
      <div className="group h-[300px] w-[320px] md:w-[400px] [perspective:1000px] rounded-xl overflow-hidden">
        <div className="relative h-full w-full shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-focus:[transform:rotateY(180deg)] group-hover:[transform:rotateY(180deg)]">
          <div className="absolute inset-0 bg-slate-100 flex">
            <Image
              src={imageURL}
              alt="Project data image"
              width={500}
              height={500}
              unoptimized
            ></Image>
          </div>
          <div className="absolute inset-0 h-full w-full bg-black/80 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center justify-center gap-3 py-5 px-3">
            <div className="text-4xl font-bold">{title}</div>
            <div className="flex">
              <LinkIcon />
              <a href={link} target="_blank" className=" font-semibold ml-2">
                {link}
              </a>
            </div>
            <div className="text-card-gray font-semibold mb-2">{description}</div>
            <div className="flex gap-2">
              <button className="p-1 rounded-xl w-20 border-2 font-bold">Edit</button>
              <button className="p-1 rounded-xl w-20 border-2 border-card-red text-card-red font-bold">Delete</button>
            </div>
            {author ? <div className=" text-[#797979]">Last edited by : {author}</div> : null}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ImageCard;
