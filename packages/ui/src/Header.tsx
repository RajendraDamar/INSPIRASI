import React from 'react';

export const Header: React.FC<{ title?: string; className?: string }> = ({ title = 'App', className = '' }) => (
  <header className={`w-full py-3 px-2 border-b border-gray-200 dark:border-gray-700 ${className}`}>
    <div className="max-w-4xl mx-auto text-lg font-semibold">{title}</div>
  </header>
);

export default Header;
