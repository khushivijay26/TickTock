import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Ticktock — Timesheet App</h1>
        <p className="mb-6">Starter scaffold. Use the login page to proceed.</p>
        <div className="flex gap-3">
          <Link
            href="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </main>
  )
}
