import React, { useMemo, useState } from 'react';

type Report = { id: string; title: string; date: string };

const sample: Report[] = [
  { id: 'r1', title: 'Report A', date: '2025-09-19' },
  { id: 'r2', title: 'Report B', date: '2025-09-20' },
  { id: 'r3', title: 'Report C', date: '2025-09-21' },
];

export default function History() {
  const [order, setOrder] = useState<'newest' | 'oldest'>('newest');

  const reports = useMemo(() => {
    const copy = [...sample];
    copy.sort((a, b) => (order === 'newest' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)));
    return copy;
  }, [order]);

  return (
    <main className="p-6">
      <h2 className="text-lg font-bold mb-4">History</h2>
      <div className="mb-3">
        <label className="mr-2">Sort:</label>
        <select value={order} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setOrder(e.target.value as 'newest' | 'oldest')} className="border p-1">
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      <div className="space-y-3">
        {reports.map((r) => (
          <div key={r.id} className="p-3 border rounded">
            <div className="font-semibold">{r.title}</div>
            <div className="text-sm text-gray-600">{r.date}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
