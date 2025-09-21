import React from 'react';

export const Card: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="p-4 rounded shadow bg-white dark:bg-gray-800">{children}</div>
);

export default Card;
