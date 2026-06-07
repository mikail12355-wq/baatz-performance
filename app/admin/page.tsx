'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'

type Tab = 'termine' | 'bilder' | 'videos' | 'hochladen'

type ImageItem = {
  path: string
  isUploaded: boolean
}

type Booking = {
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

// ─── Login ────────────────────────────────────────────────────────────────────
function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    })
    if (res.ok) { onLogin() } else { setError('Falsches Passwort') }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="bg-white border border-gray-200 p-10 w-full max-w-md shadow-sm">
        <p className="font-heading font-black text-2xl uppercase tracking-widest text-charcoal mb-1">
          Baatz<span className="text-gold">.</span> Admin
        </p>
        <p className="text-gray-400 text-sm mb-8">Bitte melden Sie sich an</p>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Passwort"
            className="w-full border border-gray-200 px-4 py-3 focus:outline-none focus:border-gold transition-colors font-body"
            autoFocus
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="btn-primary w-full justify-center">Anmelden</button>
        </form>
        <p className="text-gray-300 text-xs mt-6">Standard-Passwort: baatz2024 (in .env.local ändern)</p>
      </div>
    </div>
  )
}

// ─── Rename Modal ─────────────────────────────────────────────────────────────
function RenameModal({
  item,
  onClose,
  onRenamed,
}: {
  item: ImageItem
  onClose: () => void
  onRenamed: (oldPath: string, newPath: string) => void
}) {
  const filename = item.path.split('/').pop() ?? ''
  const [name, setName] = useState(filename)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const save = async () => {
    if (!name.trim() || name === filename) { onClose(); return }
    setSaving(true)
    const res = await fetch('/api/rename', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oldPath: item.path, newName: name }),
    })
    if (res.ok) {
      const { newPath } = await res.json()
      onRenamed(item.path, newPath)
      onClose()
    } else {
      setError('Umbenennen fehlgeschlagen')
    }
    setSaving(false)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image preview */}
        <div className="relative aspect-video bg-gray-100">
          <Image src={item.path} alt="" fill className="object-cover" sizes="448px" />
        </div>

        <div className="p-6 space-y-4">
          <h3 className="font-heading font-black text-lg uppercase tracking-tight text-charcoal">
            Bild umbenennen
          </h3>

          <div>
            <label className="font-heading font-bold text-xs uppercase tracking-wider text-gray-400 block mb-2">
              Dateiname
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && save()}
              className="w-full border border-gray-200 px-4 py-3 focus:outline-none focus:border-gold transition-colors font-body text-sm"
              autoFocus
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {!item.isUploaded && (
            <p className="text-amber-500 text-xs bg-amber-50 border border-amber-100 px-3 py-2">
              Hinweis: Galerie-Bilder werden nach dem Umbenennen nicht mehr automatisch angezeigt.
            </p>
          )}

          <div className="flex gap-3">
            <button
              onClick={save}
              disabled={saving}
              className="btn-primary flex-1 justify-center !py-3"
            >
              {saving ? 'Speichern...' : 'Speichern'}
            </button>
            <button
              onClick={onClose}
              className="flex-1 border border-gray-200 text-gray-500 font-heading font-bold text-sm uppercase tracking-wider py-3 hover:border-gray-400 transition-colors"
            >
              Abbrechen
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Image Card ───────────────────────────────────────────────────────────────
function ImageCard({
  item,
  onDelete,
  onEdit,
}: {
  item: ImageItem
  onDelete: (path: string) => void
  onEdit: (item: ImageItem) => void
}) {
  const filename = item.path.split('/').pop() ?? ''
  const folder = item.path.split('/').slice(-2, -1)[0] ?? ''

  return (
    <div className="group relative bg-gray-100 overflow-hidden">
      <div className="relative aspect-[4/3]">
        <Image
          src={item.path}
          alt={filename}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-200 flex items-center justify-center gap-2">
          <button
            onClick={() => onEdit(item)}
            title="Umbenennen"
            className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-charcoal w-9 h-9 flex items-center justify-center hover:bg-gold hover:text-white"
          >
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" fill="currentColor"/>
            </svg>
          </button>
          <button
            onClick={() => onDelete(item.path)}
            title="Löschen"
            className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-red-500 w-9 h-9 flex items-center justify-center hover:bg-red-500 hover:text-white"
          >
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
              <path d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>
      {/* Info bar */}
      <div className="px-2 py-1.5 bg-white border-t border-gray-100 flex items-center justify-between gap-1">
        <span className="text-[11px] text-gray-500 truncate font-body">{filename}</span>
        {!item.isUploaded && (
          <span className="text-[10px] font-heading font-bold uppercase tracking-wide text-gold/80 flex-shrink-0 bg-gold/10 px-1.5 py-0.5">
            {folder}
          </span>
        )}
        {item.isUploaded && (
          <span className="text-[10px] font-heading font-bold uppercase tracking-wide text-green-600 flex-shrink-0 bg-green-50 px-1.5 py-0.5">
            Neu
          </span>
        )}
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [tab, setTab] = useState<Tab>('termine')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [bookingFilter, setBookingFilter] = useState<'alle' | 'neu' | 'bestätigt' | 'abgesagt'>('alle')
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null)

  const [images, setImages] = useState<ImageItem[]>([])
  const [videos, setVideos] = useState<string[]>([])
  const [filter, setFilter] = useState<'alle' | 'galerie' | 'hochgeladen'>('alle')

  const [uploading, setUploading] = useState(false)
  const [drag, setDrag] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [editItem, setEditItem] = useState<ImageItem | null>(null)

  const loadAll = useCallback(async () => {
    const [imgRes, vidRes] = await Promise.all([
      fetch('/api/images'),
      fetch('/api/media?type=videos'),
    ])
    const { gallery, uploaded } = await imgRes.json()
    const { files: vids } = await vidRes.json()

    setImages([
      ...(gallery as string[]).map((p) => ({ path: p, isUploaded: false })),
      ...(uploaded as string[]).map((p) => ({ path: p, isUploaded: true })),
    ])
    setVideos(vids as string[])
  }, [])

  const loadBookings = useCallback(async () => {
    const res = await fetch('/api/bookings')
    if (res.ok) setBookings(await res.json())
  }, [])

  useEffect(() => {
    if (authed) {
      loadAll()
      loadBookings()
    }
  }, [authed, loadAll, loadBookings])

  const deleteFile = async (path: string) => {
    if (!confirm('Bild wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.')) return
    await fetch('/api/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path }),
    })
    setImages((prev) => prev.filter((i) => i.path !== path))
  }

  const deleteVideo = async (path: string) => {
    if (!confirm('Video wirklich löschen?')) return
    await fetch('/api/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path }),
    })
    setVideos((prev) => prev.filter((v) => v !== path))
  }

  const handleRenamed = (oldPath: string, newPath: string) => {
    setImages((prev) =>
      prev.map((i) => (i.path === oldPath ? { ...i, path: newPath } : i))
    )
  }

  const uploadFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setUploading(true)
    for (const file of Array.from(files)) {
      const fd = new FormData()
      fd.append('file', file)
      await fetch('/api/upload', { method: 'POST', body: fd })
    }
    await loadAll()
    setUploading(false)
    setTab('bilder')
    setFilter('hochgeladen')
  }

  const filteredImages =
    filter === 'galerie'
      ? images.filter((i) => !i.isUploaded)
      : filter === 'hochgeladen'
      ? images.filter((i) => i.isUploaded)
      : images

  if (!authed) return <LoginForm onLogin={() => setAuthed(true)} />

  const updateBookingStatus = async (id: string, status: Booking['status']) => {
    await fetch('/api/bookings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status } : b))
  }

  const deleteBooking = async (id: string) => {
    if (!confirm('Buchung wirklich löschen?')) return
    await fetch('/api/bookings', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setBookings((prev) => prev.filter((b) => b.id !== id))
  }

  const statusConfig = {
    neu:        { label: 'Neu',        bg: 'bg-blue-50',   text: 'text-blue-600',  border: 'border-blue-200' },
    bestätigt:  { label: 'Bestätigt',  bg: 'bg-green-50',  text: 'text-green-600', border: 'border-green-200' },
    abgesagt:   { label: 'Abgesagt',   bg: 'bg-red-50',    text: 'text-red-500',   border: 'border-red-200' },
  }

  const filteredBookings = bookingFilter === 'alle'
    ? bookings
    : bookings.filter((b) => b.status === bookingFilter)

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: 'termine', label: 'Termine', count: bookings.filter(b => b.status === 'neu').length || undefined },
    { key: 'bilder', label: 'Bilder', count: images.length },
    { key: 'videos', label: 'Videos', count: videos.length },
    { key: 'hochladen', label: 'Hochladen' },
  ]

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <a href="/" className="font-heading font-black text-xl uppercase tracking-widest text-charcoal">
            Baatz<span className="text-gold">.</span>
          </a>
          <span className="text-gray-300">|</span>
          <span className="font-heading font-bold text-sm uppercase tracking-wider text-gray-500">Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            className="font-heading font-bold text-xs uppercase tracking-wider text-gray-400 hover:text-charcoal transition-colors"
          >
            Website ansehen
          </a>
          <button
            onClick={async () => { await fetch('/api/auth', { method: 'DELETE' }); setAuthed(false) }}
            className="font-heading font-bold text-xs uppercase tracking-wider text-gray-400 hover:text-red-500 transition-colors"
          >
            Abmelden
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="max-w-6xl mx-auto flex gap-0">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`font-heading font-bold text-sm uppercase tracking-wider px-6 py-4 border-b-2 transition-colors ${
                tab === t.key
                  ? 'border-gold text-charcoal'
                  : 'border-transparent text-gray-400 hover:text-charcoal'
              }`}
            >
              {t.label}
              {t.count !== undefined && (
                <span className="ml-2 text-[11px] font-body bg-gray-100 px-1.5 py-0.5 rounded-full text-gray-500">
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* ── Termine Tab ── */}
        {tab === 'termine' && (
          <div>
            {/* Summary bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex gap-4">
                {(['alle', 'neu', 'bestätigt', 'abgesagt'] as const).map((f) => {
                  const count = f === 'alle' ? bookings.length : bookings.filter(b => b.status === f).length
                  return (
                    <button
                      key={f}
                      onClick={() => setBookingFilter(f)}
                      className={`font-heading font-bold text-xs uppercase tracking-wider px-4 py-2 border transition-colors ${
                        bookingFilter === f
                          ? 'bg-charcoal border-charcoal text-white'
                          : 'bg-white border-gray-200 text-gray-500 hover:border-charcoal'
                      }`}
                    >
                      {f === 'alle' ? 'Alle' : f.charAt(0).toUpperCase() + f.slice(1)} ({count})
                    </button>
                  )
                })}
              </div>
              <button
                onClick={loadBookings}
                className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-2 text-gray-500 hover:border-gold hover:text-gold transition-colors font-heading font-bold text-xs uppercase tracking-wider"
              >
                <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                  <path d="M4 4v5h5M16 16v-5h-5M4.93 9A8 8 0 1115.07 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Aktualisieren
              </button>
            </div>

            {filteredBookings.length === 0 ? (
              <div className="bg-white border border-gray-100 p-12 text-center">
                <p className="font-heading font-bold text-gray-300 uppercase tracking-wider">
                  {bookingFilter === 'alle' ? 'Noch keine Buchungen vorhanden' : `Keine ${bookingFilter} Buchungen`}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredBookings.map((b) => {
                  const cfg = statusConfig[b.status]
                  const expanded = expandedBooking === b.id
                  const dateStr = new Date(b.date).toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' })

                  return (
                    <div key={b.id} className="bg-white border border-gray-200 overflow-hidden">
                      {/* Card header */}
                      <div
                        className="flex flex-wrap items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => setExpandedBooking(expanded ? null : b.id)}
                      >
                        {/* Status badge */}
                        <span className={`font-heading font-bold text-xs uppercase tracking-wider px-2.5 py-1 border flex-shrink-0 ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                          {cfg.label}
                        </span>

                        {/* Date & time */}
                        <div className="flex items-center gap-1.5 text-charcoal font-heading font-bold text-sm flex-shrink-0">
                          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-gold">
                            <rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" strokeWidth="1.4"/>
                            <path d="M2 7H14M5 1V4M11 1V4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                          </svg>
                          {dateStr} · {b.time} Uhr
                        </div>

                        {/* Divider */}
                        <div className="hidden sm:block w-px h-4 bg-gray-200" />

                        {/* Name */}
                        <span className="font-body text-sm text-charcoal font-medium">{b.name}</span>

                        {/* Divider */}
                        <div className="hidden sm:block w-px h-4 bg-gray-200" />

                        {/* Service */}
                        <span className="text-sm text-gray-500 font-body">{b.service}</span>

                        {/* Divider */}
                        <div className="hidden sm:block w-px h-4 bg-gray-200" />

                        {/* Vehicle */}
                        <span className="text-sm text-gray-400 font-body">{b.vehicle}</span>

                        {/* Expand chevron */}
                        <svg viewBox="0 0 20 20" fill="none" className={`w-4 h-4 text-gray-300 ml-auto transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>
                          <path d="M5 8L10 13L15 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>

                      {/* Expanded details */}
                      {expanded && (
                        <div className="border-t border-gray-100 px-5 py-5 bg-gray-50">
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5 text-sm">
                            {[
                              { label: 'Telefon', value: b.phone },
                              { label: 'E-Mail', value: b.email || '–' },
                              { label: 'Gebucht am', value: new Date(b.createdAt).toLocaleString('de-DE') },
                              { label: 'Fahrzeug', value: b.vehicle },
                              { label: 'Leistung', value: b.service },
                              ...(b.message ? [{ label: 'Anmerkung', value: b.message }] : []),
                            ].map((item) => (
                              <div key={item.label}>
                                <p className="font-heading font-bold text-xs uppercase tracking-wider text-gray-400 mb-0.5">{item.label}</p>
                                <p className="text-charcoal font-body">{item.value}</p>
                              </div>
                            ))}
                          </div>

                          {/* Actions */}
                          <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-200">
                            {b.status !== 'bestätigt' && (
                              <button
                                onClick={() => updateBookingStatus(b.id, 'bestätigt')}
                                className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white font-heading font-bold text-xs uppercase tracking-wider px-4 py-2 transition-colors"
                              >
                                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5"><path d="M3 8L6.5 11.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                Bestätigen
                              </button>
                            )}
                            {b.status !== 'abgesagt' && (
                              <button
                                onClick={() => updateBookingStatus(b.id, 'abgesagt')}
                                className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white font-heading font-bold text-xs uppercase tracking-wider px-4 py-2 transition-colors"
                              >
                                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5"><path d="M4 4L12 12M4 12L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                                Absagen
                              </button>
                            )}
                            {b.status === 'neu' && (
                              <a
                                href={`tel:${b.phone}`}
                                className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white font-heading font-bold text-xs uppercase tracking-wider px-4 py-2 transition-colors"
                              >
                                <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5"><path d="M3.654 1.328a.678.678 0 00-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 004.168 6.608 17.569 17.569 0 006.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 00-.063-1.015l-2.307-1.794a.678.678 0 00-.58-.122l-2.19.547a1.745 1.745 0 01-1.657-.459L5.534 9.098a1.745 1.745 0 01-.46-1.657l.548-2.19a.678.678 0 00-.122-.58L3.654 1.328z"/></svg>
                                Anrufen
                              </a>
                            )}
                            <button
                              onClick={() => deleteBooking(b.id)}
                              className="flex items-center gap-1.5 ml-auto text-red-400 hover:text-red-600 font-heading font-bold text-xs uppercase tracking-wider px-3 py-2 border border-red-200 hover:border-red-400 transition-colors"
                            >
                              <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5"><path d="M7 2a1 1 0 00-.894.553L5.382 4H2a1 1 0 100 2v8a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 009 2H7zm0 6a1 1 0 012 0v4a1 1 0 11-2 0V8z"/></svg>
                              Löschen
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ── Bilder Tab ── */}
        {tab === 'bilder' && (
          <div>
            {/* Sub-filter */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <h2 className="font-heading font-black text-2xl uppercase tracking-tight text-charcoal">
                Alle Bilder
              </h2>
              <div className="flex gap-2">
                {(['alle', 'galerie', 'hochgeladen'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`font-heading font-bold text-xs uppercase tracking-wider px-4 py-2 border transition-colors ${
                      filter === f
                        ? 'bg-charcoal border-charcoal text-white'
                        : 'bg-white border-gray-200 text-gray-500 hover:border-charcoal'
                    }`}
                  >
                    {f === 'alle' ? `Alle (${images.length})` : f === 'galerie' ? `Galerie (${images.filter(i => !i.isUploaded).length})` : `Hochgeladen (${images.filter(i => i.isUploaded).length})`}
                  </button>
                ))}
              </div>
            </div>

            {filteredImages.length === 0 ? (
              <div className="bg-white border border-gray-100 p-12 text-center">
                <p className="font-heading font-bold text-gray-300 uppercase tracking-wider">Keine Bilder vorhanden</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {filteredImages.map((img) => (
                  <ImageCard
                    key={img.path}
                    item={img}
                    onDelete={deleteFile}
                    onEdit={setEditItem}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Videos Tab ── */}
        {tab === 'videos' && (
          <div>
            <h2 className="font-heading font-black text-2xl uppercase tracking-tight text-charcoal mb-6">
              Videos
            </h2>
            {videos.length === 0 ? (
              <div className="bg-white border border-gray-100 p-12 text-center">
                <p className="font-heading font-bold text-gray-300 uppercase tracking-wider">Keine Videos vorhanden</p>
                <button
                  onClick={() => setTab('hochladen')}
                  className="btn-primary mt-4"
                >
                  Video hochladen
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {videos.map((vid) => (
                  <div key={vid} className="bg-white border border-gray-200 overflow-hidden group">
                    <div className="relative aspect-video bg-black">
                      <video src={vid} className="w-full h-full object-cover" preload="metadata" />
                    </div>
                    <div className="p-4 flex items-center justify-between gap-2">
                      <p className="text-sm font-body text-gray-500 truncate">
                        {vid.split('/').pop()}
                      </p>
                      <button
                        onClick={() => deleteVideo(vid)}
                        className="flex-shrink-0 flex items-center gap-1.5 text-red-400 hover:text-red-600 font-heading font-bold text-xs uppercase transition-colors"
                      >
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                          <path d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"/>
                        </svg>
                        Löschen
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Hochladen Tab ── */}
        {tab === 'hochladen' && (
          <div>
            <h2 className="font-heading font-black text-2xl uppercase tracking-tight text-charcoal mb-6">
              Medien hochladen
            </h2>
            <div
              onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => { e.preventDefault(); setDrag(false); uploadFiles(e.dataTransfer.files) }}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed p-20 text-center cursor-pointer transition-all duration-200 ${
                drag ? 'border-gold bg-gold/5' : 'border-gray-200 bg-white hover:border-gold hover:bg-gold/5'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*"
                className="hidden"
                onChange={(e) => uploadFiles(e.target.files)}
              />
              <div className="flex flex-col items-center gap-4">
                {uploading ? (
                  <>
                    <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                    <p className="font-heading font-bold uppercase tracking-wider text-gold text-lg">Wird hochgeladen...</p>
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 48 48" fill="none" className="w-14 h-14 text-gray-300">
                      <path d="M24 32V16M24 16L16 24M24 16L32 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="4" y="36" width="40" height="8" rx="1" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <div>
                      <p className="font-heading font-bold uppercase tracking-wider text-charcoal text-lg">
                        Bilder &amp; Videos hierher ziehen
                      </p>
                      <p className="text-gray-400 text-sm mt-1">oder klicken zum Auswählen</p>
                    </div>
                    <p className="text-gray-300 text-xs">JPG, PNG, WEBP, MP4, MOV unterstützt</p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Rename Modal */}
      {editItem && (
        <RenameModal
          item={editItem}
          onClose={() => setEditItem(null)}
          onRenamed={handleRenamed}
        />
      )}
    </div>
  )
}
