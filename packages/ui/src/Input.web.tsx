import React from 'react';

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input {...props} className={`border p-2 rounded ${props.className ?? ''}`} />
);

export default Input;
