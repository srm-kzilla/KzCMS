import Image from 'next/image';
import LinkIcon from 'remixicon-react/LinkIcon';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export interface ImageCardPropsType {
  imageLink: String;
  title: String;
  sponsorLink: String | null;
  description: String;
  autorName: String;
}

const ImageCard = (data: ImageCardPropsType) => {
  const { imageLink, title, sponsorLink, description, autorName } = data;
  const [project, setProject] = useState<any>(null);

  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      setProject(router.query.project);
    }
  }, [router.isReady]);

  const imgLoader = ({}) => {
    return `${imageLink}`;
  };

  return (
    <article className="">
      <div className="group h-[300px] w-[320px] md:w-[400px] [perspective:1000px] rounded-xl overflow-hidden">
        <div className="relative h-full w-full shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-focus:[transform:rotateY(180deg)] group-hover:[transform:rotateY(180deg)]">
          <div className="absolute inset-0 bg-slate-100 flex">
            <Image
              src={imageLink as string}
              loader={imgLoader}
              alt="Project data image"
              width={500}
              height={500}
              unoptimized
            ></Image>
            <h1 className="text-3xl font-bold absolute bottom-10 z-10 w-full bg-white/50 text-gray-900 group-hover:hidden text-center">{title}</h1>
          </div>
          <div className="absolute inset-0 h-full w-full bg-black/80 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center justify-center gap-3 py-5 px-3">
            <div className="text-4xl font-bold">{title}</div>
            <div className="flex">
              <LinkIcon />
              <div onClick={() => window.open(sponsorLink as string)} className=" font-semibold ml-2">
                {sponsorLink}
              </div>
            </div>
            <div className="text-card-gray font-semibold mb-2">{description}</div>
            <div className="flex gap-2">
              <button className="p-1 rounded-xl w-20 border-2 font-bold">Edit</button>
              <button className="p-1 rounded-xl w-20 border-2 border-card-red text-card-red font-bold">Delete</button>
            </div>
            <div className=" text-[#797979]">Last edited by : {autorName}</div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ImageCard;
