import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  const adminPw = process.env.ADMIN_PASSWORD ?? 'baatz2024'

  if (password !== adminPw) {
    return NextResponse.json({ error: 'Falsches Passwort' }, { status: 401 })
  }

  const token = Buffer.from(adminPw).toString('base64')
  const res = NextResponse.json({ success: true })
  res.cookies.set('admin_session', token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24,
    sameSite: 'strict',
  })
  return res
}

export async function DELETE(req: NextRequest) {
  const res = NextResponse.json({ success: true })
  res.cookies.delete('admin_session')
  return res
}
