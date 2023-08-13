import React from 'react';
import Button from './button';

interface CardProps {
  title: string;
  backgroundColor?: string;
  textColor?: string;
  shadow?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  backgroundColor = 'bg-gray-400',
  textColor = 'text-gray-700',
  shadow = true,
}) => {
  const shadowClasses = shadow ? 'shadow-md' : '';

  return (
    <div
      className={`${backgroundColor} ${shadowClasses} rounded-xl border-none mx-2 py-6 my-2 bg-gray-100 bg-opacity-20 shadow-md`}
    >
      <div className="w-full px-5">
        <div className="flex justify-between">
          <h2 className="text-xl">{title}</h2>
          <Button buttonTitle="Manage" />
        </div>
      </div>
    </div>
  );
};

export default Card;
