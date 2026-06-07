import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { randomUUID } from 'crypto'

export type Booking = {
  id: string
  createdAt: string
  service: string
  vehicle: string
  date: string
  time: string
  name: string
  phone: string
  email: string
  message: string
  status: 'neu' | 'bestätigt' | 'abgesagt'
}

const dataDir = join(process.cwd(), 'data')
const bookingsPath = join(dataDir, 'bookings.json')

async function readBookings(): Promise<Booking[]> {
  try {
    return JSON.parse(await readFile(bookingsPath, 'utf-8'))
  } catch {
    return []
  }
}

async function saveBookings(bookings: Booking[]) {
  await mkdir(dataDir, { recursive: true })
  await writeFile(bookingsPath, JSON.stringify(bookings, null, 2))
}

function isAuthorized(req: NextRequest) {
  const expected = Buffer.from(process.env.ADMIN_PASSWORD ?? 'baatz2024').toString('base64')
  return req.cookies.get('admin_session')?.value === expected
}

// GET – alle Buchungen (nur Admin)
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })
  return NextResponse.json(await readBookings())
}

// POST – neue Buchung (öffentlich)
export async function POST(req: NextRequest) {
  const { service, vehicle, date, time, name, phone, email, message } = await req.json()
  if (!service || !vehicle || !date || !time || !name || !phone) {
    return NextResponse.json({ error: 'Pflichtfelder fehlen' }, { status: 400 })
  }
  const booking: Booking = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    service, vehicle, date, time,
    name, phone, email: email ?? '', message: message ?? '',
    status: 'neu',
  }
  const bookings = await readBookings()
  bookings.unshift(booking)
  await saveBookings(bookings)
  return NextResponse.json({ success: true, id: booking.id })
}

// PATCH – Status ändern (nur Admin)
export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })
  const { id, status } = await req.json()
  const bookings = await readBookings()
  const idx = bookings.findIndex((b) => b.id === id)
  if (idx === -1) return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 })
  bookings[idx].status = status
  await saveBookings(bookings)
  return NextResponse.json({ success: true })
}

// DELETE – Buchung löschen (nur Admin)
export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })
  const { id } = await req.json()
  await saveBookings((await readBookings()).filter((b) => b.id !== id))
  return NextResponse.json({ success: true })
}
