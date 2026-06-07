import { NextRequest, NextResponse } from 'next/server'
import { unlink } from 'fs/promises'
import { join } from 'path'

function isAuthorized(req: NextRequest) {
  const adminPw = process.env.ADMIN_PASSWORD ?? 'baatz2024'
  const expected = Buffer.from(adminPw).toString('base64')
  return req.cookies.get('admin_session')?.value === expected
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })
  }

  const { path } = await req.json()
  if (!path || typeof path !== 'string') {
    return NextResponse.json({ error: 'Ungültiger Pfad' }, { status: 400 })
  }

  // Only allow deleting from images or uploads directory
  if (!path.startsWith('/uploads/') && !path.startsWith('/images/')) {
    return NextResponse.json({ error: 'Nicht erlaubt' }, { status: 403 })
  }

  const fullPath = join(process.cwd(), 'public', path)
  await unlink(fullPath)
  return NextResponse.json({ success: true })
}
