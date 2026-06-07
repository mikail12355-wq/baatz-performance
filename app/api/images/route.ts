
import { NextResponse } from 'next/server'
import { readdir } from 'fs/promises'
import { join } from 'path'

async function listImages(dir: string, baseUrl: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true }).catch(() => [])
  const results: string[] = []

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue
    const fullPath = join(dir, entry.name)
    const urlPath = `${baseUrl}/${entry.name}`

    if (entry.isDirectory()) {
      results.push(...(await listImages(fullPath, urlPath)))
    } else if (/\.(jpg|jpeg|png|webp|gif)$/i.test(entry.name)) {
      results.push(urlPath)
    }
  }

  return results
}

export async function GET() {
  const publicDir = join(process.cwd(), 'public')

  const [gallery, uploaded] = await Promise.all([
    listImages(join(publicDir, 'images'), '/images'),
    listImages(join(publicDir, 'uploads', 'images'), '/uploads/images'),
  ])

  return NextResponse.json({ gallery, uploaded })
}
