import React from 'react';

export const PageWrapper: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`min-h-screen p-4 bg-surface-light dark:bg-surface-dark ${className}`}>{children}</div>
);

export default PageWrapper;
