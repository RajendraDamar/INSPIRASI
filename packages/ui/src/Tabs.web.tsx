import React from 'react';

export const Tabs: React.FC<{ tabs: string[]; active?: number }>= ({ tabs, active = 0 }) => (
  <div className="flex space-x-2">
    {tabs.map((t, i) => (
      <button key={t} className={`px-3 py-1 rounded ${i === active ? 'bg-primary-600 text-white' : 'bg-gray-100'}`}>{t}</button>
    ))}
  </div>
);

export default Tabs;
