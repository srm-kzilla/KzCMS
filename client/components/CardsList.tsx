import React from 'react';
import { Card, CardPropsType } from './Card';

export interface CardsListPropsType {
  cards: CardPropsType[];
}

interface CardsListProps {
  type: 'main' | 'product' | 'event' | 'other' | null;
  cardList: CardsListPropsType;
}

const CardList = ({ type, cardList }: CardsListProps) => {
  // console.log(cardList);
  return (
    <div className='pt-10 flex flex-wrap justify-evenly w-full h-fit'>
      {
        type !== null ? (
            <div>
              {/*{cardList.cards.map((card, index) => {*/}
              {/*  if (card.cardType === type) {*/}
              {/*    return (*/}
              {/*      <div key={index}>*/}

              {/*      </div>*/}
              {/*    );*/}
              {/*  }*/}
              {/*})}*/}
              {/*<Card title={card.title} websiteUrl={card.websiteUrl} manageUrl={card.manageUrl}*/}
              {/*      cardType={card.cardType} />*/}
              {cardList.cards.filter((card) => card.cardType === type).map((card, index) => {
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
          )
          :
          (
            <div>
              <h1>Loading...</h1>
            </div>
          )
      }
    </div>
  )
    ;
};

export default CardList;
