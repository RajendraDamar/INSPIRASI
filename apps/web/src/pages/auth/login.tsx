import React, { useState } from 'react';
import { useAuth } from '../../lib/auth';

export default function Login() {
  const [name, setName] = useState('tester');
  const { login } = useAuth();

  return (
    <main className="p-6">
      <h2 className="text-lg font-bold mb-4">Login</h2>
      <div className="flex gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} className="border p-2" />
        <button onClick={() => login(name)} className="px-3 py-1 bg-blue-500 text-white rounded">Sign in</button>
      </div>
    </main>
  );
}
