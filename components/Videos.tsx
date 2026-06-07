'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

type VideoItem = {
  src: string
  thumbnail?: string
  title: string
  description: string
  isPlaceholder?: boolean
}

const staticVideos: VideoItem[] = [
  {
    src: '/videos/audi.mp4',
    title: 'Audi Aufbereitung',
    description: 'Vollständige Fahrzeugaufbereitung inkl. Lackpflege und Innenreinigung',
  },
  {
    src: '/videos/golf.mp4',
    title: 'Golf Detailing',
    description: 'Professionelles Detailing – von der Felge bis zum Dach',
  },
  {
    src: '/videos/skoda.mp4',
    title: 'Skoda Lackpflege',
    description: 'Maschinenpolish und Lackversiegelung für langanhaltenden Glanz',
  },
]

function VideoCard({ video, index }: { video: VideoItem; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (playing) {
      videoRef.current.pause()
      setPlaying(false)
    } else {
      videoRef.current.play()
      setPlaying(true)
    }
  }

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onEnd = () => setPlaying(false)
    v.addEventListener('ended', onEnd)
    return () => v.removeEventListener('ended', onEnd)
  }, [])

  if (video.isPlaceholder) {
    return (
      <motion.div
        style={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        className="group bg-charcoal-card border border-white/10 overflow-hidden"
      >
        <div className="relative aspect-video bg-charcoal flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white/30 ml-1">
              <path d="M5 3L19 12L5 21V3Z" fill="currentColor" />
            </svg>
          </div>
          <div className="text-center px-6">
            <p className="text-white/50 font-heading text-xs uppercase tracking-widest">
              Video folgt bald
            </p>
            <p className="text-white/25 text-xs mt-1">Platzhalter – Video einfach im Admin hochladen</p>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
            {video.title}
          </h3>
          <p className="text-white/50 text-sm mt-2">{video.description}</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      style={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group bg-charcoal-card border border-white/10 overflow-hidden"
    >
      <div className="relative aspect-video bg-black cursor-pointer" onClick={togglePlay}>
        <video
          ref={videoRef}
          src={video.src}
          className="w-full h-full object-cover"
          preload="metadata"
          playsInline
        />
        {!playing && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors duration-300">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center shadow-xl"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white ml-1">
                <path d="M5 3L19 12L5 21V3Z" fill="currentColor" />
              </svg>
            </motion.div>
          </div>
        )}
        {playing && (
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200"
            onClick={togglePlay}
          >
            <div className="w-14 h-14 rounded-full bg-black/60 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white">
                <path d="M6 4H10V20H6V4ZM14 4H18V20H14V4Z" fill="currentColor" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
          {video.title}
        </h3>
        <p className="text-white/50 text-sm mt-2">{video.description}</p>
      </div>
    </motion.div>
  )
}

export default function Videos() {
  const [uploaded, setUploaded] = useState<VideoItem[]>([])

  useEffect(() => {
    fetch('/api/media?type=videos')
      .then((r) => r.json())
      .then((data) => {
        const items: VideoItem[] = (data.files as string[]).map((src) => ({
          src,
          title: src.split('/').pop()?.replace(/\.[^.]+$/, '') ?? 'Video',
          description: 'Fahrzeugaufbereitung',
        }))
        setUploaded(items)
      })
      .catch(() => {})
  }, [])

  const allVideos = [...staticVideos, ...uploaded]

  return (
    <section id="videos" className="py-24 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          style={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="font-heading font-bold text-gold uppercase tracking-[0.25em] text-sm">
            In Bewegung
          </p>
          <h2 className="section-title mt-2 text-white">Videos</h2>
          <span className="gold-line" />
          <p className="text-white/50 text-lg mt-4 max-w-xl">
            Sehen Sie unsere Aufbereitungen in voller Aktion – von der ersten Reinigung bis zum fertigen Glanz.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allVideos.map((v, i) => (
            <VideoCard key={v.src} video={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
