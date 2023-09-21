import React from 'react';
import ImageCard from './ImageCard';
import { ImageCardPropsType } from './ImageCard';

export interface ImageCardsListPropsType {
  imageCards: ImageCardPropsType[];
}

interface ImageCardsListProps {
  imageCardList: ImageCardsListPropsType;
}

const ImageCardList = ({ imageCardList }: ImageCardsListProps) => {
  return (
    <div className="mt-12 flex w-full">
      <div className="flex flex-wrap justify-around gap-5 md:justify-start h-fit">
        {imageCardList.imageCards.map((card, index) => {
              return (
                <div key={index}>
                  <ImageCard {...card}/>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default ImageCardList;
