'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please provide email and password')
      return
    }
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    if (res.ok) {
      router.push('/dashboard')
    } else {
      const data = await res.json()
      setError(data?.message || 'Login failed')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 bg-white shadow rounded overflow-hidden">
        <div className="p-8">
          <h2 className="text-xl font-semibold mb-6">Welcome back</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
                className="w-full border rounded px-3 py-2" placeholder="name@example.com" />
            </div>
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)}
                className="w-full border rounded px-3 py-2" placeholder="********" />
            </div>
            <div className="flex items-center">
              <input id="remember" type="checkbox" className="mr-2"/>
              <label htmlFor="remember" className="text-sm">Remember me</label>
            </div>
            {error && <div className="text-red-600">{error}</div>}
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded">Sign in</button>
              <button type="button" onClick={()=>{setEmail('demo@example.com'); setPassword('password')}} className="px-4 py-2 border rounded">Fill demo</button>
            </div>
          </form>
        </div>
        <div className="p-8 bg-blue-600 text-white flex items-center">
          <div>
            <h3 className="text-2xl font-bold mb-2">ticktock</h3>
            <p className="max-w-sm">A small timesheet app demo. Login with any credentials (dummy auth).</p>
          </div>
        </div>
      </div>
    </main>
  )
}
