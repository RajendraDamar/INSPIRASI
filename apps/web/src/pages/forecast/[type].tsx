import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const types = ['wave', 'wind', 'tide', 'weather'] as const;

export default function ForecastType() {
	const router = useRouter();
	const { type } = router.query as { type?: string };
	const active = typeof type === 'string' ? type : 'wave';

	return (
		<main className="p-6">
			<h2 className="text-xl font-bold mb-4">Forecast — {active}</h2>
			<div className="flex gap-2 mb-4">
				{types.map((t) => (
					<Link key={t} href={`/forecast/${t}`} className={`px-3 py-1 border rounded ${t === active ? 'bg-gray-100' : ''}`}>
						{t}
					</Link>
				))}
			</div>

			<div className="p-4 border rounded">Here is deterministic content for <strong>{active}</strong> forecast.</div>
		</main>
	);
}
