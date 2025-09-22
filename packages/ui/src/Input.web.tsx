import React from 'react';

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input
    {...props}
    className={`border border-gray-300 bg-surface-light dark:bg-surface-dark p-2 rounded text-black dark:text-white ${props.className ?? ''}`}
  />
);

export default Input;
