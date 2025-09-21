import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../lib/auth';

export default function ReportsIndex() {
  const { requireAuth } = useAuth();

  useEffect(() => {
    requireAuth();
  }, []);

  return (
    <main className="p-6">
      <h2 className="text-lg font-bold mb-4">Reports</h2>
      <div className="p-3 border rounded">Protected reports dashboard (mock)</div>
      <div className="mt-3">
        <Link href="/reports/history" className="text-blue-600">View history</Link>
      </div>
    </main>
  );
}
