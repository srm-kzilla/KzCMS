import React from 'react';
import { Card, CardPropsType } from './Card';

export interface CardsListPropsType {
  cards: CardPropsType[];
}

interface CardsListProps {
  type: 'all' | 'products' | 'events' | 'others';
  cardList: CardsListPropsType;
}

const CardList = ({ type, cardList }: CardsListProps) => {
  return (
    <div className="mt-20 flex w-screen">
      <div className="pt-10 md:pl-20 flex flex-wrap justify-around md:justify-start w-full h-fit">
        {type === 'all'
          ? cardList.cards.map((card, index) => {
              return (
                <div key={index}>
                  <Card
                    title={card.title}
                    websiteUrl={card.websiteUrl}
                    manageUrl={card.manageUrl}
                    cardType={card.cardType}
                  />
                </div>
              );
            })
          : cardList.cards
              .filter(card => card.cardType === type)
              .map((card, index) => {
                return (
                  <div key={index}>
                    <Card
                      title={card.title}
                      websiteUrl={card.websiteUrl}
                      manageUrl={card.manageUrl}
                      cardType={card.cardType}
                    />
                  </div>
                );
              })}
      </div>
    </div>
  );
};

export default CardList;
