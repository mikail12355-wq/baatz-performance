import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

function isAuthorized(req: NextRequest) {
  const adminPw = process.env.ADMIN_PASSWORD ?? 'baatz2024'
  const expected = Buffer.from(adminPw).toString('base64')
  return req.cookies.get('admin_session')?.value === expected
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'Keine Datei' }, { status: 400 })

  const isVideo = file.type.startsWith('video/')
  const subDir = isVideo ? 'videos' : 'images'
  const dir = join(process.cwd(), 'public', 'uploads', subDir)
  await mkdir(dir, { recursive: true })

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')
  await writeFile(join(dir, safeName), buffer)

  return NextResponse.json({ success: true, path: `/uploads/${subDir}/${safeName}` })
}
