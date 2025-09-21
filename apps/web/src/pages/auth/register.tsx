import React, { useState } from 'react';
import { useAuth } from '../../lib/auth';

export default function Register() {
  const [name, setName] = useState('newuser');
  const { login } = useAuth();

  return (
    <main className="p-6">
      <h2 className="text-lg font-bold mb-4">Register</h2>
      <div className="flex gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} className="border p-2" />
        <button onClick={() => login(name)} className="px-3 py-1 bg-green-600 text-white rounded">Create</button>
      </div>
    </main>
  );
}
