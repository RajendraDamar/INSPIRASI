import React, {useEffect} from 'react';
import Link from 'next/link';
import {useAlerts} from '@inspirasi/api';
import {showWebNotification} from '../lib/notifications';

type AlertItem = { id: string; title: string; body?: string; channel: string };

function AlertCard({title, body}: {title: string; body?: string}){
	return (
		<div className="p-3 border rounded mt-2 bg-white shadow-sm">
			<div className="font-semibold">{title}</div>
			{body ? <div className="text-sm text-gray-600">{body}</div> : null}
		</div>
	);
}

export default function HomePage() {
	const alertsQ = useAlerts();

	useEffect(() => {
		if (alertsQ.data && Array.isArray(alertsQ.data)){
			for (const a of alertsQ.data){
				// trigger a web notification for webpush alerts
				if (a.channel === 'webpush'){
					showWebNotification(a.title, a.body || '');
				}
			}
		}
	}, [alertsQ.data]);

	return (
		<main className="p-6">
			<h2 className="text-xl font-bold mb-4">Overview</h2>
			<section className="mb-6">
				<h3 className="font-semibold">Alerts</h3>
				{alertsQ.isLoading ? (
					<div className="p-3 border rounded mt-2">Loading alerts...</div>
				) : alertsQ.data && alertsQ.data.length > 0 ? (
					<div className="mt-2 space-y-2">
						{alertsQ.data.map((a: AlertItem) => (
							<AlertCard key={a.id} title={a.title} body={a.body} />
						))}
					</div>
				) : (
					<div className="p-3 border rounded mt-2">No alerts</div>
				)}
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
