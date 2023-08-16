import Image from 'next/image';
import Button from './Button';
import { deleteButtonTitle } from '@/constants/constants';

interface SponsorLogoCardPropsType{
  src: string,
  alt: string
}

export default function SponsorLogoCard({src, alt} : SponsorLogoCardPropsType) {
  const handleDelete = () => {};
  return (
    <div className=" w-48 bg-cms-grey flex flex-col justify-center items-center p-5 rounded-lg">
      <Image src={src} alt={alt} width={'70'} height="50" />
      <Button buttonTitle={deleteButtonTitle} onClick={handleDelete} />
    </div>
  );
}
