import React from 'react';

export interface ButtonPropsType {
  buttonTitle: string;
  buttonAction: () => void;
}

const Button = ({ buttonTitle, buttonAction }: ButtonPropsType) => {
  return (
    <button
      type="button"
      className="text-[#C4D3E0] bg-gradient-to-tr from-[#5653FF] to-[#B10DFF] hover:bg-gradient-to-br font-medium p-4 mt-12 rounded-lg text-sm w-32 text-center z-10"
      onClick={buttonAction}
    >
      {buttonTitle}
    </button>
  );
};

export default Button;
