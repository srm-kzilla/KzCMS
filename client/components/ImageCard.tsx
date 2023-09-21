import Image from 'next/image';
import Link from 'next/link';
import LinkIcon from 'remixicon-react/LinkIcon';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useIsDesktop from '@/hooks/useIsDesktop';

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
  console.log(project);

  const imgLoader = ({}) => {
    return `${imageLink}`;
  };

  return (
    <div
      className={`flex flex-col md:flex-row w-[600px] bg-[#2d2d2d] rounded-xl overflow-hidden items-center pr-5 h-[250px]`}
    >
      <div className="h-full w-1/3 flex-grow-0 flex-shrink-0 pr-5">
          <Image
            className="cursor-pointer h-full"
            loader={imgLoader}
            src={imageLink as string}
            alt="Data Image"
            width={600}
            height={600}
            onClick={ useIsDesktop() ? () => window.open(imageLink as string) : ()=>{}}
          ></Image>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="text-4xl font-bold">{title}</div>
        <div className="flex">
          <LinkIcon />
          <Link href={sponsorLink as string} className=" font-semibold ml-2">
            {sponsorLink}
          </Link>
        </div>
        <div className="text-[#999999] font-semibold mb-2">{description}</div>
        <div className="flex gap-2">
          {/* <Button buttonTitle="Edit" /> */}
          <button className='p-1 rounded-xl w-20 border-2 font-bold'>Edit</button>
          <button className='p-1 rounded-xl w-20 border-2 border-[#FF0000] text-[#FF0000] font-bold'>Delete</button>
          {/* <Button buttonTitle="Delete" /> */}
        </div>
        <div className=" text-[#797979]">Last edited by : {autorName}</div>
      </div>
    </div>
  );
};

export default ImageCard;
