import React from 'react';
import Card from './Card';
import CardsListPropsType from '@/types/CardsListProps';

const CardList = ({ cardListProps }: { cardListProps: CardsListPropsType }) => {
  return (
    <div className="pt-10 flex flex-wrap justify-evenly w-auto min-h-full">
      {cardListProps.cards.map((card, index) => {
        if (card.type == cardListProps.type || cardListProps.type == 'all') {
          return (
            <div key={index}>
              <Card cardProps={card} />
            </div>
          );
        }
      })}
    </div>
  );
};

export default CardList;
