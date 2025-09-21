import React from 'react';
import Link from 'next/link';

export default function ReportsIndex() {
  return (
    <main className="p-6">
      <h2 className="text-lg font-bold mb-4">Reports</h2>
      <div className="p-3 border rounded">Protected reports dashboard (mock)</div>
      <div className="mt-3">
        <Link href="/reports/history" className="text-blue-600">View history</Link>
      </div>
    </main>
  )
}
