
import { NextRequest, NextResponse } from 'next/server'
import { rename } from 'fs/promises'
import { join, dirname, basename } from 'path'

function isAuthorized(req: NextRequest) {
  const adminPw = process.env.ADMIN_PASSWORD ?? 'baatz2024'
  const expected = Buffer.from(adminPw).toString('base64')
  return req.cookies.get('admin_session')?.value === expected
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })
  }

  const { oldPath, newName } = await req.json()

  if (!oldPath || !newName || typeof oldPath !== 'string' || typeof newName !== 'string') {
    return NextResponse.json({ error: 'Ungültige Parameter' }, { status: 400 })
  }

  if (!oldPath.startsWith('/images/') && !oldPath.startsWith('/uploads/')) {
    return NextResponse.json({ error: 'Nicht erlaubt' }, { status: 403 })
  }

  // Sanitize new name – keep only safe characters
  const safeName = newName.replace(/[^a-zA-Z0-9.\-_äöüÄÖÜß ]/g, '_').trim()
  if (!safeName) return NextResponse.json({ error: 'Ungültiger Name' }, { status: 400 })

  const fullOldPath = join(process.cwd(), 'public', oldPath)
  const newFullPath = join(dirname(fullOldPath), safeName)
  await rename(fullOldPath, newFullPath)

  const newRelPath = oldPath.replace(basename(oldPath), safeName)
  return NextResponse.json({ success: true, newPath: newRelPath })
}
