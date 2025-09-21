import React from 'react';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { children?: React.ReactNode };

export const Button = ({ children, ...props }: ButtonProps) => (
  <button {...props} className={`px-4 py-2 rounded bg-primary-600 text-white ${props.className ?? ''}`}>
    {children}
  </button>
);

export default Button;
