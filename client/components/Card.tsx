import React from 'react';
import Link from 'next/link';
import ExternalLinkFillIcon from 'remixicon-react/ExternalLinkFillIcon';
import { useRouter } from 'next/router';

export interface CardPropsType {
  title: string;
  websiteUrl: string;
  manageUrl: string;
  type: string;
}

export const Card = ({ cardProps }: { cardProps: CardPropsType }) => {
  const router = useRouter();

  return (
    <div className="m-5 flex flex-col w-auto p-12 rounded-3xl bg-[121212] shadow-[inset_-20px_-12px_60px_#58acf525] hover:shadow-[inset_-20px_-12px_60px_#58acf530]">
      <Link href={cardProps.websiteUrl} className="text-3xl font-bold flex gap-2 pr-20">
        {cardProps.title}
        <ExternalLinkFillIcon />
      </Link>
      <button
        type="button"
        className="text-white bg-[#ff644e] shadow-[inset_-10px_-10px_30px_#12121270] opacity-90 hover:shadow-[inset_-10px_-10px_30px_#12121240] font-medium p-5 mt-10 rounded-xl text-sm w-32 text-center"
        onClick={() => {
          router.push(cardProps.manageUrl);
        }}
      >
        Manage
      </button>
    </div>
  );
};

export default Card;
