import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../lib/auth';

export default function Login() {
  const [name, setName] = useState('')
  const router = useRouter()
  const { login } = useAuth()
  async function handleLogin() {
    // call server API to set httpOnly cookie
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })

    if (res.ok) {
      // update client-side state for UI
      login(name)
      // redirect to reports (middleware will allow based on server cookie)
      router.push('/reports')
    } else {
      // handle error (simple alert for now)
      alert('Login failed')
    }
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
