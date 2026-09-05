import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { useMusicPlayer, detectSongMood, detectSongEra } from '../../context/MusicPlayerContext.jsx'
import { DEFAULT_ALBUM_COVER } from '../../data/musicLibrary.js'
import { fetchLyricsForTrack, parsePlainLyrics } from '../../utils/lyricsService.js'
import AudioVisualizer from './AudioVisualizer.jsx'

function formatTime(sec) {
  if (!sec || isNaN(sec) || !isFinite(sec)) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s < 10 ? '0' : ''}${s}`
}

export default function SpotifyFullPlayerModal({ isOpen, onClose }) {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    repeatMode,
    isLiked,
    togglePlay,
    nextTrack,
    prevTrack,
    seekTo,
    seekRelative,
    changeVolume,
    toggleMute,
    toggleLike,
    toggleShuffle,
    toggleRepeat,
    ambientColor,
    soundEffectMode,
    setSoundEffectMode,
    analyserNode
  } = useMusicPlayer()

  const [rippleSide, setRippleSide] = useState(null)
  const [showVisualizer, setShowVisualizer] = useState(true)
  const [activeTab, setActiveTab] = useState('player') // 'player' | 'lyrics'
  const [lyricsData, setLyricsData] = useState(null)
  const [lyricsLoading, setLyricsLoading] = useState(false)
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)

  const lastTapRef = useRef({ time: 0, side: null })
  const lyricsContainerRef = useRef(null)
  const lastScrolledIdxRef = useRef(-1)

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-150, 0, 150], [-10, 0, 10])
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Fetch real-time synced lyrics when track changes
  useEffect(() => {
    if (!currentTrack) {
      setLyricsData(null)
      return
    }

    // Instantly display track lyrics if present for zero-latency lyrics display
    if (currentTrack.lyrics) {
      setLyricsData({
        synced: false,
        lines: parsePlainLyrics(currentTrack.lyrics, 210),
        rawPlain: currentTrack.lyrics
      })
      setLyricsLoading(false)
    } else {
      setLyricsLoading(true)
    }

    let isMounted = true

    fetchLyricsForTrack(currentTrack)
      .then((data) => {
        if (isMounted && data && data.lines && data.lines.length > 0) {
          setLyricsData(data)
          setLyricsLoading(false)
        }
      })
      .catch(() => {
        if (isMounted) setLyricsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [currentTrack?.id, currentTrack?.title])

  // Determine active lyrics line
  const lines = lyricsData?.lines || []
  let activeLyricIdx = -1
  if (lines.length > 0) {
    for (let i = 0; i < lines.length; i++) {
      if (currentTime >= lines[i].time) {
        activeLyricIdx = i
      } else {
        break
      }
    }
  }

  // Auto-scroll active lyric line smoothly
  useEffect(() => {
    if (!lyricsContainerRef.current || activeLyricIdx < 0 || activeLyricIdx === lastScrolledIdxRef.current) return
    lastScrolledIdxRef.current = activeLyricIdx
    const activeEl = lyricsContainerRef.current.querySelector(`[data-modal-line-idx="${activeLyricIdx}"]`)
    if (activeEl) {
      const parent = lyricsContainerRef.current
      const targetTop = activeEl.offsetTop - parent.clientHeight / 2 + activeEl.clientHeight / 2
      parent.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' })
    }
  }, [activeLyricIdx])

  if (!isOpen || !currentTrack) return null

  const liked = isLiked(currentTrack.id)
  const mood = detectSongMood(currentTrack)
  const progressPercent = duration ? Math.min(100, (currentTime / duration) * 100) : 0

  // Double-tap on album art handler (+10s / -10s seek)
  const handleArtTap = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0
    const clickX = clientX - rect.left
    const side = clickX < rect.width / 2 ? 'left' : 'right'
    const now = Date.now()

    if (now - lastTapRef.current.time < 320 && lastTapRef.current.side === side) {
      if (side === 'left') {
        seekRelative(-10)
        setRippleSide('left')
      } else {
        seekRelative(10)
        setRippleSide('right')
      }
      setTimeout(() => setRippleSide(null), 700)
      lastTapRef.current = { time: 0, side: null }
    } else {
      lastTapRef.current = { time: now, side }
    }
  }

  // Swipe album art to skip tracks
  const handleDragEnd = (event, info) => {
    if (info.offset.x < -70 || info.velocity.x < -300) {
      nextTrack()
    } else if (info.offset.x > 70 || info.velocity.x > 300) {
      prevTrack()
    }
  }

  // Swipe down on sheet to close
  const handleModalDragEnd = (event, info) => {
    if (info.offset.y > 100 || info.velocity.y > 450) {
      onClose()
    }
  }

  const artSize = isMobile ? Math.min(Math.round(window.innerHeight * 0.25), 180) : 240

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.88)',
          backdropFilter: 'blur(32px)',
          userSelect: 'none',
          padding: isMobile ? '8px 6px' : '16px 12px'
        }}
      >
        {/* Ambient Aurora Glowing Orbs */}
        <div
          style={{
            position: 'absolute',
            top: '-15%',
            left: '-15%',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            filter: 'blur(110px)',
            opacity: 0.35,
            pointerEvents: 'none',
            backgroundColor: ambientColor,
            transition: 'background-color 1s ease'
          }}
        />

        {/* Modal Sheet Container */}
        <motion.div
          initial={{ y: '100%', opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0, bottom: 0.6 }}
          onDragEnd={handleModalDragEnd}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '500px',
            height: isMobile ? '96vh' : '92vh',
            maxHeight: '740px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRadius: isMobile ? '24px' : '28px',
            padding: isMobile ? '12px 14px' : '18px 22px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            background: 'linear-gradient(180deg, rgba(28, 28, 34, 0.9) 0%, rgba(12, 12, 16, 0.98) 100%)',
            backdropFilter: 'blur(40px)',
            boxShadow: `0 25px 50px -12px ${ambientColor}35, 0 0 30px rgba(255, 255, 255, 0.05)`,
            overflow: 'hidden'
          }}
        >
          {/* 1. TOP HEADER (Swipe handle, dismiss, title, & Tab Switcher) */}
          <div style={{ flexShrink: 0 }}>
            {/* Drag Handle */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingBottom: 4, cursor: 'grab' }}>
              <div style={{ width: '40px', height: '4px', borderRadius: '999px', background: 'rgba(255, 255, 255, 0.3)' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '2px 0 6px' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  cursor: 'pointer'
                }}
                title="Dismiss"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              {/* Center Tab Switcher: Music vs Lyrics */}
              <div
                style={{
                  display: 'flex',
                  background: 'rgba(255, 255, 255, 0.08)',
                  padding: '2px 3px',
                  borderRadius: 999,
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <button
                  type="button"
                  data-testid="modal-player-tab-btn"
                  onClick={() => setActiveTab('player')}
                  style={{
                    border: 'none',
                    borderRadius: 999,
                    padding: '4px 12px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: activeTab === 'player' ? '#ffffff' : 'transparent',
                    color: activeTab === 'player' ? '#000000' : 'rgba(255, 255, 255, 0.7)',
                    transition: 'all 0.2s'
                  }}
                >
                  💽 Soundstage
                </button>
                <button
                  type="button"
                  data-testid="modal-lyrics-tab-btn"
                  onClick={() => setActiveTab('lyrics')}
                  style={{
                    border: 'none',
                    borderRadius: 999,
                    padding: '4px 12px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: activeTab === 'lyrics' ? '#1ed760' : 'transparent',
                    color: activeTab === 'lyrics' ? '#000000' : 'rgba(255, 255, 255, 0.7)',
                    transition: 'all 0.2s'
                  }}
                >
                  🎤 Lyrics
                </button>
              </div>

              {/* Mood & Era Pill */}
              <span
                data-testid="full-player-era-badge"
                style={{
                  padding: '3px 8px',
                  borderRadius: '999px',
                  fontSize: '9px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  backgroundColor: `${ambientColor}25`,
                  border: `1px solid ${ambientColor}55`,
                  color: ambientColor
                }}
              >
                {detectSongEra(currentTrack) === 'retro_90s'
                  ? '📻 90S NOSTALGIA'
                  : mood === 'sad'
                  ? '🌙 2 AM SAD REEL'
                  : mood === 'reels_viral'
                  ? '🔥 REELS VIRAL'
                  : `✨ ${mood.toUpperCase().replace('_', ' ')} PEAK`}
              </span>
            </div>
          </div>

          {/* 2. MIDDLE VIEWPORT (Album Art & Visualizer OR Synced Lyrics) */}
          <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
            {activeTab === 'player' ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                {/* 3D Gesture Album Art */}
                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.45}
                  onDragEnd={handleDragEnd}
                  onClick={handleArtTap}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    position: 'relative',
                    width: artSize,
                    height: artSize,
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: '0 16px 36px rgba(0,0,0,0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    x,
                    rotate,
                    opacity
                  }}
                >
                  <img
                    src={currentTrack.image || DEFAULT_ALBUM_COVER}
                    alt={currentTrack.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
                    onError={(e) => { e.currentTarget.src = DEFAULT_ALBUM_COVER }}
                  />

                  {/* Pulsing Playing Ring */}
                  {isPlaying && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '16px',
                        border: `2px solid ${ambientColor}88`,
                        pointerEvents: 'none'
                      }}
                    />
                  )}

                  {/* Double Tap Rewind Ripple */}
                  {rippleSide === 'left' && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: '0 50% 0 0',
                        background: 'rgba(0, 0, 0, 0.7)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff'
                      }}
                    >
                      <span style={{ fontSize: '20px', fontWeight: 800 }}>⏪ -10s</span>
                    </div>
                  )}

                  {/* Double Tap Forward Ripple */}
                  {rippleSide === 'right' && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: '0 0 0 50%',
                        background: 'rgba(0, 0, 0, 0.7)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff'
                      }}
                    >
                      <span style={{ fontSize: '20px', fontWeight: 800 }}>+10s ⏩</span>
                    </div>
                  )}

                  {/* Gesture Pill */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '6px',
                      insetInline: 0,
                      display: 'flex',
                      justifyContent: 'center',
                      pointerEvents: 'none'
                    }}
                  >
                    <span style={{ padding: '2px 6px', borderRadius: 999, background: 'rgba(0, 0, 0, 0.75)', fontSize: '9px', color: 'rgba(255, 255, 255, 0.8)' }}>
                      Swipe ← → to skip • Double tap 10s
                    </span>
                  </div>
                </motion.div>

                {/* Compact Real-Time Visualizer Canvas */}
                {showVisualizer && (
                  <div style={{ width: '100%', maxWidth: '340px', marginTop: 8 }}>
                    <AudioVisualizer
                      analyserNode={analyserNode}
                      isPlaying={isPlaying}
                      ambientColor={ambientColor}
                    />
                  </div>
                )}
              </div>
            ) : (
              /* REAL-TIME SYNCHRONIZED LYRICS VIEW */
              <div
                ref={lyricsContainerRef}
                style={{
                  height: '100%',
                  overflowY: 'auto',
                  padding: '8px 12px',
                  WebkitOverflowScrolling: 'touch',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12
                }}
              >
                {lyricsLoading ? (
                  <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', padding: '40px 0', fontSize: '13px' }}>
                    Loading lyrics...
                  </div>
                ) : lines.length > 0 ? (
                  lines.map((line, idx) => {
                    const isActive = idx === activeLyricIdx
                    return (
                      <div
                        key={idx}
                        data-modal-line-idx={idx}
                        onClick={() => seekTo(line.time)}
                        style={{
                          fontSize: isActive ? '18px' : '14px',
                          fontWeight: isActive ? 800 : 500,
                          color: isActive ? '#1ed760' : 'rgba(255, 255, 255, 0.4)',
                          transform: isActive ? 'scale(1.02)' : 'scale(1)',
                          transformOrigin: 'left center',
                          transition: 'all 0.25s ease',
                          cursor: 'pointer',
                          lineHeight: 1.4,
                          padding: '4px 0'
                        }}
                      >
                        {line.text}
                      </div>
                    )
                  })
                ) : (
                  <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', padding: '40px 0', fontSize: '13px' }}>
                    Lyrics not available for this track.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 3. PINNED BOTTOM CONTROLS (ALWAYS 100% VISIBLE ON ANY MOBILE SCREEN) */}
          <div style={{ flexShrink: 0, marginTop: 6, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {/* Song Meta (Title, Artist & Like Heart) */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
              <div style={{ minWidth: 0, flex: 1, paddingRight: 8 }}>
                <h2 data-testid="full-player-song-title" style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: 800, color: '#ffffff', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {currentTrack.title}
                </h2>
                <p style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.6)', margin: '1px 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {currentTrack.artist}
                </p>
              </div>

              <button
                type="button"
                onClick={() => toggleLike(currentTrack.id)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title={liked ? 'Liked' : 'Like song'}
              >
                {liked ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#1ed760">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                )}
              </button>
            </div>

            {/* Scrubber Progress Bar */}
            <div style={{ padding: '0 4px' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime || 0}
                  onChange={(e) => seekTo(Number(e.target.value))}
                  style={{
                    width: '100%',
                    height: '4px',
                    borderRadius: '999px',
                    cursor: 'pointer',
                    background: `linear-gradient(to right, ${ambientColor} ${progressPercent}%, rgba(255,255,255,0.18) ${progressPercent}%)`
                  }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.5)', marginTop: '2px' }}>
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Primary Controls (Shuffle, Prev, Play/Pause, Next, Repeat) */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
              <button
                type="button"
                onClick={toggleShuffle}
                style={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  padding: '6px',
                  color: isShuffle ? '#1ed760' : 'rgba(255, 255, 255, 0.4)'
                }}
                title="Shuffle"
              >
                <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.39a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75 13.15.922z"/>
                </svg>
              </button>

              <button
                type="button"
                onClick={prevTrack}
                style={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  color: 'rgba(255, 255, 255, 0.85)',
                  padding: '6px'
                }}
                title="Previous"
              >
                <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v10.575a.7.7 0 0 1-1.05.607L4 7.149V12.3a.7.7 0 0 1-1.4 0V1.7a.7.7 0 0 1 .7-.7z"/>
                </svg>
              </button>

              <button
                type="button"
                onClick={togglePlay}
                style={{
                  width: isMobile ? '50px' : '56px',
                  height: isMobile ? '50px' : '56px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  color: '#000000',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(255, 255, 255, 0.25)'
                }}
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" style={{ marginLeft: '2px' }}>
                    <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"/>
                  </svg>
                )}
              </button>

              <button
                type="button"
                data-testid="full-player-next-btn"
                onClick={nextTrack}
                style={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  color: 'rgba(255, 255, 255, 0.85)',
                  padding: '6px'
                }}
                title="Next"
              >
                <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.714v10.575a.7.7 0 0 0 1.05.607L12 7.149V12.3a.7.7 0 0 0 1.4 0V1.7a.7.7 0 0 0-.7-.7z"/>
                </svg>
              </button>

              <button
                type="button"
                onClick={toggleRepeat}
                style={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  padding: '6px',
                  color: repeatMode !== 'off' ? '#1ed760' : 'rgba(255, 255, 255, 0.4)'
                }}
                title={`Repeat: ${repeatMode}`}
              >
                {repeatMode === 'one' ? (
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z"/>
                  </svg>
                )}
              </button>
            </div>

            {/* Sound Mode Selector Pills (Compact Row) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', background: 'rgba(255, 255, 255, 0.04)', padding: '3px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.07)' }}>
              <button
                type="button"
                onClick={() => setSoundEffectMode('normal')}
                style={{
                  padding: '5px 2px',
                  borderRadius: '9px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '10px',
                  fontWeight: 700,
                  background: soundEffectMode === 'normal' ? '#ffffff' : 'transparent',
                  color: soundEffectMode === 'normal' ? '#000000' : 'rgba(255, 255, 255, 0.65)'
                }}
              >
                ✨ Studio
              </button>
              <button
                type="button"
                onClick={() => setSoundEffectMode('8d_spatial')}
                style={{
                  padding: '5px 2px',
                  borderRadius: '9px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '10px',
                  fontWeight: 700,
                  background: soundEffectMode === '8d_spatial' ? 'linear-gradient(135deg, #06b6d4, #3b82f6)' : 'transparent',
                  color: soundEffectMode === '8d_spatial' ? '#ffffff' : 'rgba(255, 255, 255, 0.65)'
                }}
              >
                🎧 8D Orbit
              </button>
              <button
                type="button"
                onClick={() => setSoundEffectMode('slowed_reverb')}
                style={{
                  padding: '5px 2px',
                  borderRadius: '9px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '10px',
                  fontWeight: 700,
                  background: soundEffectMode === 'slowed_reverb' ? 'linear-gradient(135deg, #8b5cf6, #6366f1)' : 'transparent',
                  color: soundEffectMode === 'slowed_reverb' ? '#ffffff' : 'rgba(255, 255, 255, 0.65)'
                }}
              >
                🌙 Slowed
              </button>
              <button
                type="button"
                onClick={() => setSoundEffectMode('nightcore')}
                style={{
                  padding: '5px 2px',
                  borderRadius: '9px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '10px',
                  fontWeight: 800,
                  background: soundEffectMode === 'nightcore' ? 'linear-gradient(135deg, #fbbf24, #f43f5e)' : 'transparent',
                  color: soundEffectMode === 'nightcore' ? '#000000' : 'rgba(255, 255, 255, 0.65)'
                }}
              >
                ⚡ Fast
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
