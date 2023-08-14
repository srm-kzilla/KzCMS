import Image from 'next/image';
import Button from './Button';
import { deleteButtonTitle } from '@/constants/constants';

export default function SponsorLogoCard() {
  const handleDelete = () => {};
  return (
    <div className=" w-48 bg-cms-grey flex flex-col justify-center items-center p-5 rounded-lg">
      <Image src={'/Google.png'} alt="Sponsor logo" width={'70'} height="50" />
      <Button buttonTitle={deleteButtonTitle} onClick={handleDelete} />
    </div>
  );
}
