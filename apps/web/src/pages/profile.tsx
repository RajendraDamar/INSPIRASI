import React from 'react';
import { useAuth } from '../lib/auth';

export default function Profile() {
  const { user } = useAuth();
  return (
    <main className="p-6">
      <h2 className="text-lg font-bold mb-4">Profile</h2>
      <div>{user ? <div>Name: {user.name}</div> : <div>Not signed in</div>}</div>
    </main>
  );
}
