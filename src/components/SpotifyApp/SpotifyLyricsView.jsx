import { DEFAULT_ALBUM_COVER } from '../../data/musicLibrary.js'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useMusicPlayer } from '../../context/MusicPlayerContext.jsx'
import { fetchLyricsForTrack } from '../../utils/lyricsService.js'

export default function SpotifyLyricsView() {
  const { currentTrack, isPlaying, currentTime, seekTo } = useMusicPlayer()
  const [lyricsData, setLyricsData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const containerRef = useRef(null)
  const isTouchingRef = useRef(false)
  const lastScrolledIdxRef = useRef(-1)

  // Fetch live lyrics when currentTrack changes
  useEffect(() => {
    if (!currentTrack) {
      setLyricsData(null)
      return
    }

    let isMounted = true
    setLoading(true)

    fetchLyricsForTrack(currentTrack).then((data) => {
      if (isMounted) {
        setLyricsData(data)
        setLoading(false)
      }
    }).catch(() => {
      if (isMounted) setLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [currentTrack?.id, currentTrack?.title])

  const lines = lyricsData?.lines || []

  // Determine active line index based on timestamps
  let activeIndex = -1
  if (lines.length > 0) {
    for (let i = 0; i < lines.length; i++) {
      if (currentTime >= lines[i].time) {
        activeIndex = i
      } else {
        break
      }
    }
  }

  // Smooth auto-scroll active line into view without blocking touch or causing layout jumps
  useEffect(() => {
    if (!containerRef.current || activeIndex < 0 || activeIndex === lastScrolledIdxRef.current) return
    if (isTouchingRef.current) return // User is actively touching/scrolling

    lastScrolledIdxRef.current = activeIndex
    const activeEl = containerRef.current.querySelector(`[data-line-idx="${activeIndex}"]`)
    if (activeEl) {
      const scrollParent = activeEl.closest('.spotify-scroll-view') || activeEl.parentElement
      if (scrollParent) {
        const targetTop = activeEl.offsetTop - (scrollParent.clientHeight / 2) + (activeEl.clientHeight / 2)
        scrollParent.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' })
      }
    }
  }, [activeIndex])

  const handleCopy = () => {
    if (!lyricsData?.rawPlain) return
    navigator.clipboard?.writeText(lyricsData.rawPlain)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!currentTrack) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', color: '#b3b3b3' }}>
        No track is playing right now.
      </div>
    )
  }

  return (
    <div style={{
      padding: '0 20px 120px',
      position: 'relative',
      userSelect: 'none',
      maxWidth: 820
    }}>
      {/* Top Track Header & Copy Option */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 20,
        marginBottom: 24,
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        flexWrap: 'wrap',
        gap: 12
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <img
            src={currentTrack.image}
            alt=""
            style={{ width: 52, height: 52, borderRadius: 4, objectFit: 'cover', flexShrink: 0 }}
            onError={(e) => { e.currentTarget.src = DEFAULT_ALBUM_COVER }}
          />
          <div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>
              {currentTrack.title}
            </div>
            <div style={{ fontSize: '13px', color: '#b3b3b3', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>{currentTrack.artist}</span>
              {lyricsData?.synced && (
                <span style={{
                  background: '#1ed760',
                  color: '#000000',
                  fontSize: '9px',
                  fontWeight: 900,
                  padding: '1px 5px',
                  borderRadius: 3
                }}>
                  SYNCED
                </span>
              )}
            </div>
          </div>
        </div>

        {lyricsData?.rawPlain && (
          <button
            onClick={handleCopy}
            style={{
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#ffffff',
              padding: '6px 14px',
              borderRadius: 9999,
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.16)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)' }}
          >
            {copied ? 'Copied' : 'Copy Lyrics'}
          </button>
        )}
      </div>

      {/* Loading state */}
      {loading && (
        <div style={{ padding: '60px 0', textAlign: 'center', color: '#b3b3b3' }}>
          <div style={{ fontSize: '28px', marginBottom: 10 }}>🎶</div>
          <div style={{ fontSize: '14px', fontWeight: 600 }}>Loading lyrics for {currentTrack.title}...</div>
        </div>
      )}

      {/* Real-time Synced Lyrics Container */}
      {!loading && lines.length > 0 && (
        <div
          ref={containerRef}
          onTouchStart={() => { isTouchingRef.current = true }}
          onTouchEnd={() => { setTimeout(() => { isTouchingRef.current = false }, 1200) }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 26,
            paddingBottom: 40
          }}
        >
          {lines.map((item, idx) => {
            const isCurrent = idx === activeIndex && isPlaying
            const isPast = idx < activeIndex

            return (
              <motion.div
                key={idx}
                data-line-idx={idx}
                onClick={() => { if (typeof item.time === 'number' && isFinite(item.time)) seekTo(item.time) }}
                style={{
                  fontSize: 'clamp(20px, 4vw, 32px)',
                  fontWeight: isCurrent ? 900 : 700,
                  color: isCurrent
                    ? '#ffffff'
                    : isPast
                    ? 'rgba(255, 255, 255, 0.65)'
                    : 'rgba(255, 255, 255, 0.28)',
                  lineHeight: 1.35,
                  letterSpacing: '-0.02em',
                  cursor: 'pointer',
                  transformOrigin: 'left center',
                  transform: isCurrent ? 'scale(1.02)' : 'scale(1)',
                  transition: 'color 0.2s, transform 0.2s',
                  textShadow: isCurrent ? '0 0 24px rgba(255,255,255,0.35)' : 'none'
                }}
              >
                {item.text}
              </motion.div>
            )
          })}
        </div>
      )}

      {/* No lyrics fallback */}
      {!loading && lines.length === 0 && (
        <div style={{ padding: '60px 0', color: '#b3b3b3' }}>
          <div style={{ fontSize: '36px', marginBottom: 12 }}>🎶</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', marginBottom: 6 }}>
            Looks like we don't have the lyrics for this song yet.
          </div>
          <p style={{ fontSize: '14px', maxWidth: 440, lineHeight: 1.5, margin: 0 }}>
            Enjoy the melody! You can search any other song to sing along with real-time synced lyrics.
          </p>
        </div>
      )}
    </div>
  )
}
