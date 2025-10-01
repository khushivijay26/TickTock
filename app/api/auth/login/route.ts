import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password } = body || {}
  if (!email || !password) {
    return NextResponse.json({ message: 'Missing credentials' }, { status: 400 })
  }
  const res = NextResponse.json({ ok: true })
  res.cookies.set('ticktock_token', 'demo-token', { httpOnly: true, path: '/' })
  return res
}
