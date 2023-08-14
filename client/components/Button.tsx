import React from 'react';

export interface ButtonPropsType extends React.HTMLAttributes<HTMLButtonElement> {
  buttonTitle: string;
  width?: string;
}

const Button = ({ buttonTitle, width, ...rest }: ButtonPropsType) => {
  const buttonCSS = {
    width: width || 'fit-content',
  };

  return (
    <button
      type="submit"
      {...rest}
      className="text-button-textColor bg-button-idle-gradient hover:bg-button-hover-gradient font-medium p-4 mt-12 rounded-lg text-sm w-32 text-center z-10 duration-300"
      style={buttonCSS}
    >
      {buttonTitle}
    </button>
  );
};

export default Button;
