import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../lib/auth';

export default function Login() {
  const [name, setName] = useState('')
  const router = useRouter()
  const { login } = useAuth()

  function handleLogin() {
    // mock login (in-memory)
    login(name)
    // set a mock auth cookie for middleware to check
    if (typeof document !== 'undefined') {
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString()
      document.cookie = `auth_token=mock-token; expires=${expires}; path=/`
    }
    router.push('/reports')
  }

  return (
    <main className="p-6">
      <h2 className="text-lg font-bold mb-4">Login</h2>
      <div className="flex gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} className="border p-2" />
        <button onClick={handleLogin} className="px-3 py-1 bg-blue-500 text-white rounded">Sign in</button>
      </div>
    </main>
  )
}
