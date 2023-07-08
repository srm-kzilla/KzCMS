import React from 'react';
import { Card, CardPropsType } from './Card';

export interface CardsListPropsType {
  cards: CardPropsType[];
}

interface CardsListProps {
  type: 'all' | 'product' | 'event' | 'other';
  cardList: CardsListPropsType;
}

const CardList = ({ type, cardList }: CardsListProps) => {
  console.log('Type', type);
  return (
    <div className='pt-10 flex flex-wrap justify-evenly w-full h-fit'>
      <div>
        {
          type === 'all' ? (
              cardList.cards.map((card, index) => {
                console.log('Card:', card);
                return (
                  <div key={index}>
                    <Card title={card.title} websiteUrl={card.websiteUrl} manageUrl={card.manageUrl}
                          cardType={card.cardType} />
                  </div>
                );
              })
            ) :
            cardList.cards.filter((card) => card.cardType === type).map((card, index) => {
                console.log('Card:', card);
                return (
                  <div key={index}>
                    <Card title={card.title} websiteUrl={card.websiteUrl} manageUrl={card.manageUrl}
                          cardType={card.cardType} />
                  </div>
                );
              },
            )}
      </div>
    </div>
  )
    ;
};

export default CardList;
