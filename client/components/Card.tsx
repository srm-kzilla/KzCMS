import React, { useState } from 'react';
import Link from 'next/link';
import ExternalLinkFillIcon from 'remixicon-react/ExternalLinkFillIcon';
import { useRouter } from 'next/router';
import Button from './Button';
import { projectCardButtonTitle } from '@/constants/constants';

export interface CardPropsType {
  title: string;
  websiteUrl: string;
  manageUrl: string;
  cardType: 'all' | 'products' | 'events' | 'others';
}

export const Card = ({ title, websiteUrl, manageUrl, cardType }: CardPropsType) => {
  const router = useRouter();

  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cardRect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: e.clientX - cardRect.left, y: e.clientY - cardRect.top });
  };

  const gotoRoute = () => {
    router.push(manageUrl);
  };

  return (
    <div
      className="mt-7 md:m-8 group/card flex flex-col h-60 p-12 rounded-xl bg-cms-grey border-2 border-cms-lightGrey relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="top-0 left-0 w-full h-60 bg-cms-grey group-hover/card:bg-opacity-25 rounded-xl backdrop-filter backdrop-blur-3xl overflow-hidden z-10 absolute"></div>
      <Link href={websiteUrl} className="text-3xl font-bold flex justify-between items-center z-10 w-[220px] md:w-80">
        {title}
        <ExternalLinkFillIcon />
      </Link>
      <Button buttonTitle={projectCardButtonTitle} onClick={gotoRoute} />

      <div
        className="absolute opacity-40 bg-gradient-radial from-[#31b5d3] to-[#050709] rounded-full transform -translate-x-1/2 -translate-y-1/2 transition duration-300 ease-in-out"
        style={{ top: position.y, left: position.x, width: '30rem', height: '30rem' }}
      >
        bB
      </div>
    </div>
  );
};

export default Card;
