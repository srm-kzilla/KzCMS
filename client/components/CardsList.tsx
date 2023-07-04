import React from 'react';
import Card from './Card';
import { CardPropsType } from './Card';

export interface CardsListPropsType {
  cards: CardPropsType[];
}

interface CardsListProps {
  type: string;
  cardList: CardsListPropsType;
}

const CardList = ({ type, cardList }: CardsListProps) => {
  return (
    <div className="pt-10 flex flex-wrap justify-evenly w-auto min-h-full">
      {cardList.cards.map((card, index) => {
        if (card.cardType == type || type == 'all') {
          return (
            <div key={index}>
              <Card title={card.title} websiteUrl={card.websiteUrl} manageUrl={card.manageUrl} cardType={card.cardType} />
            </div>
          );
        }
      })}
    </div>
  );
};

export default CardList;
