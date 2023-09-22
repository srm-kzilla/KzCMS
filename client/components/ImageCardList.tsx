import React from 'react';
import ImageCard from '@/components/ImageCard';
import { ImageCardPropsType } from '@/components/ImageCard';

export interface ImageCardsListPropsType {
  imageCards: ImageCardPropsType[];
}

interface ImageCardsListProps {
  imageCardList: ImageCardsListPropsType;
}

const ImageCardList = ({ imageCardList }: ImageCardsListProps) => {
  return (
    <div className="mt-12 flex w-full mb-28">
      <div className="flex flex-wrap justify-center gap-5 md:justify-start h-fit">
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
