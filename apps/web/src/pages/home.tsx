import React from 'react';
import Link from 'next/link';

export default function HomePage() {
	return (
		<main className="p-6">
			<h2 className="text-xl font-bold mb-4">Overview</h2>
			<section className="mb-6">
				<h3 className="font-semibold">Alerts</h3>
				<div className="p-3 border rounded mt-2">No alerts</div>
			</section>

			<section className="mb-6">
				<h3 className="font-semibold">Forecast</h3>
				<div className="flex gap-2 mt-2">
					<Link href="/forecast/wave" className="px-3 py-1 border rounded">Wave</Link>
					<Link href="/forecast/wind" className="px-3 py-1 border rounded">Wind</Link>
					<Link href="/forecast/tide" className="px-3 py-1 border rounded">Tide</Link>
					<Link href="/forecast/weather" className="px-3 py-1 border rounded">Weather</Link>
				</div>
			</section>

			<section className="mb-6">
				<h3 className="font-semibold">Reports</h3>
				<div className="p-3 border rounded mt-2">Recent reports summary</div>
			</section>
		</main>
	);
}
