
import { NextRequest, NextResponse } from 'next/server'
import { readdir } from 'fs/promises'
import { join } from 'path'

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get('type') ?? 'images'
  const dir = join(process.cwd(), 'public', 'uploads', type)

  const files = await readdir(dir).catch(() => [] as string[])
  const valid = files.filter((f) => !f.startsWith('.'))

  return NextResponse.json({ files: valid.map((f) => `/uploads/${type}/${f}`) })
}
