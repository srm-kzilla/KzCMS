import React from 'react';
import Card from '../components/user_cards'; 


interface CardData {
  title: string;
  content: string;
  backgroundColor?: string;
  textColor?: string;
  shadow?: boolean;
}

const cardsData: CardData[] = [
  {
    title: 'User 1',
    content: 'Content for Card 1',
    shadow: true,
  },

  {
    title: 'User 2',
    content: 'Content for Card 1',
    shadow: true,
  },
];

const HorizontalCardRow: React.FC = () => {
  return (
    <div className="justify-center items-center h-screen bg-gray-900 flex-none">
      <div className="grid grid-cols-12 ">
        <div className="col-span-12">
          {cardsData.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
    </div>

    // </div><Button buttonTitle='Manage'  /></>
  );
};

export default HorizontalCardRow;
