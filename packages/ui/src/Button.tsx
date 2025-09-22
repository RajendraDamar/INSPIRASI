import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded bg-primary-600 text-white hover:bg-primary-700 ${props.className ?? ''}`}
    >
      {children}
    </button>
  );
};
