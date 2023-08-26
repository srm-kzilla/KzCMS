import React from 'react';

export interface ButtonPropsType extends React.HTMLAttributes<HTMLButtonElement> {
  buttonTitle: string;
}

const Button = ({ buttonTitle, ...rest }: ButtonPropsType) => {
  return (
    <button
      type="button"
      {...rest}
      className="text-button-textColor bg-button-idle-gradient hover:bg-button-hover-gradient font-medium p-4 mt-12 rounded-lg text-sm w-32 text-center z-10 duration-300"
    >
      {buttonTitle}
    </button>
  );
};

export default Button;
