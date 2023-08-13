import React from 'react';
import Card from '../components/user_cards'; 
import { cardData } from '@/utils/constants';

interface CardData {
  title: string;
  backgroundColor?: string;
  textColor?: string;
  shadow?: boolean;
}

const HorizontalCardRow: React.FC = () => {
  return (
    <div className="justify-center items-center h-screen bg-gray-900 flex-none">
      <div className="grid grid-cols-12">
        <div className="col-span-12">
          {cardData.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
    );
};

export default HorizontalCardRow;
