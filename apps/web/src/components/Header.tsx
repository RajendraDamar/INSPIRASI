import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../lib/auth';

export default function Header() {
	const router = useRouter();
	const { user, logout } = useAuth();

	return (
		<header className="bg-white border-b p-3 flex items-center justify-between">
			<div className="flex items-center gap-4">
				<div className="text-sm font-medium">Location: <span className="font-semibold">Bali</span></div>
				<nav className="flex gap-2">
					<Link href="/home" className={`px-2 py-1`}>Home</Link>
					<Link href="/forecast/wave" className={`px-2 py-1`}>Forecast</Link>
					<Link href="/reports" className={`px-2 py-1`}>Reports</Link>
				</nav>
			</div>

			<div className="flex items-center gap-3">
				<button aria-label="search" onClick={() => router.push('/search')} className="px-2">🔍</button>
				<button aria-label="notifications" onClick={() => alert('No notifications')} className="px-2">🔔</button>
				{user ? (
					<div className="flex items-center gap-2">
						<button onClick={() => router.push('/profile')} className="px-2">{user.name}</button>
						<button onClick={() => router.push('/settings')} className="px-2">⚙️</button>
						<button onClick={() => logout()} className="px-2">Sign out</button>
					</div>
				) : (
					<div className="flex items-center gap-2">
						<button onClick={() => router.push('/auth/login')} className="px-2">Login</button>
						<button onClick={() => router.push('/auth/register')} className="px-2">Register</button>
					</div>
				)}
			</div>
		</header>
	);
}
