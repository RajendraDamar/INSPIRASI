import React from 'react';

export const Card: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="p-4 rounded shadow bg-surface-light dark:bg-surface-dark">{children}</div>
);

export default Card;
