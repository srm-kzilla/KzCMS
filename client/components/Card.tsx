import React, { useState } from 'react';
import Link from 'next/link';
import ExternalLinkFillIcon from 'remixicon-react/ExternalLinkFillIcon';
import { useRouter } from 'next/router';

export interface CardPropsType {
  title: string;
  websiteUrl: string;
  manageUrl: string;
  cardType: string;
}

export const Card = ({ title, websiteUrl, manageUrl, cardType }: CardPropsType) => {
  const router = useRouter();

  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cardRect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: e.clientX - cardRect.left, y: e.clientY - cardRect.top });
  };

  return (
    <div
      className="m-3 group/card flex flex-col w-auto h-60 p-12 rounded-xl bg-[#161B22] border-2 border-[#2C3239] relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="top-0 left-0 w-full h-60 bg-[#161B22] group-hover/card:bg-opacity-25 rounded-xl backdrop-filter backdrop-blur-3xl overflow-hidden z-10 absolute"></div>
      <Link href={websiteUrl} className="text-3xl font-bold flex gap-20 z-10">
        {title}
        <ExternalLinkFillIcon />
      </Link>
      <button
        type="button"
        className="text-[#C4D3E0] bg-gradient-to-tr from-[#5653FF] to-[#B10DFF] hover:bg-gradient-to-br font-medium p-5 mt-10 rounded-lg text-sm w-32 text-center z-10"
        onClick={() => {
          router.push(manageUrl);
        }}
      >
        Manage
      </button>
      <div
        className="absolute opacity-40 bg-gradient-radial from-[#31b5d3] to-[#050709] rounded-full transform -translate-x-1/2 -translate-y-1/2 transition duration-300 ease-in-out"
        style={{ top: position.y, left: position.x, width: '30rem', height: '30rem' }}
      ></div>
    </div>
  );
};

export default Card;
