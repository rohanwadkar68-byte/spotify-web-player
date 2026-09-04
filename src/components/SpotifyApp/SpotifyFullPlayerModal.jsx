import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { useMusicPlayer, detectSongMood } from '../../context/MusicPlayerContext.jsx'
import { DEFAULT_ALBUM_COVER } from '../../data/musicLibrary.js'
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

  const [rippleSide, setRippleSide] = useState(null) // 'left' | 'right' | null
  const [showVisualizer, setShowVisualizer] = useState(true)
  const lastTapRef = useRef({ time: 0, side: null })
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-150, 0, 150], [-12, 0, 12])
  const opacity = useTransform(x, [-200, 0, 200], [0.4, 1, 0.4])

  if (!isOpen || !currentTrack) return null

  const liked = isLiked(currentTrack.id)
  const mood = detectSongMood(currentTrack)
  const progressPercent = duration ? Math.min(100, (currentTime / duration) * 100) : 0

  // Double-tap on album art handler
  const handleArtTap = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0
    const clickX = clientX - rect.left
    const side = clickX < rect.width / 2 ? 'left' : 'right'
    const now = Date.now()

    if (now - lastTapRef.current.time < 320 && lastTapRef.current.side === side) {
      // Double tap confirmed!
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

  // Handle drag end for horizontal swipe song changing
  const handleDragEnd = (event, info) => {
    if (info.offset.x < -80 || info.velocity.x < -350) {
      nextTrack()
    } else if (info.offset.x > 80 || info.velocity.x > 350) {
      prevTrack()
    }
  }

  // Handle drag down for dismiss modal
  const handleModalDragEnd = (event, info) => {
    if (info.offset.y > 120 || info.velocity.y > 500) {
      onClose()
    }
  }

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
          padding: '16px 12px'
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
        <div
          style={{
            position: 'absolute',
            bottom: '-15%',
            right: '-15%',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            filter: 'blur(110px)',
            opacity: 0.25,
            pointerEvents: 'none',
            backgroundColor: ambientColor,
            transition: 'background-color 1s ease'
          }}
        />

        {/* Modal Sheet Container with VisionOS Glassmorphism */}
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
            maxWidth: '520px',
            maxHeight: '94vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflowY: 'auto',
            borderRadius: '28px',
            padding: '20px 24px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            background: 'linear-gradient(180deg, rgba(30, 30, 35, 0.82) 0%, rgba(15, 15, 20, 0.94) 100%)',
            backdropFilter: 'blur(40px)',
            boxShadow: `0 25px 50px -12px ${ambientColor}30, 0 0 30px rgba(255, 255, 255, 0.05)`
          }}
        >
          {/* Top Sheet Pull Bar & Header */}
          <div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingBottom: '8px', cursor: 'grab' }}>
              <div style={{ width: '48px', height: '5px', borderRadius: '999px', background: 'rgba(255, 255, 255, 0.3)' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px', marginBottom: '14px' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  cursor: 'pointer'
                }}
                title="Dismiss (Swipe Down)"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255, 255, 255, 0.5)' }}>
                  PLAYING FROM PLAYLIST
                </span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255, 255, 255, 0.9)', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {currentTrack.album || currentTrack.theme || 'Trending Hits'}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span
                  style={{
                    padding: '3px 10px',
                    borderRadius: '999px',
                    fontSize: '10px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    backgroundColor: `${ambientColor}22`,
                    border: `1px solid ${ambientColor}55`,
                    color: ambientColor
                  }}
                >
                  {mood.toUpperCase().replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive 3D Gesture Album Art */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8px 0' }}>
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.45}
              onDragEnd={handleDragEnd}
              onClick={handleArtTap}
              whileTap={{ scale: 0.98 }}
              style={{
                position: 'relative',
                width: '260px',
                height: '260px',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                x,
                rotate,
                opacity
              }}
            >
              <img
                src={currentTrack.image || DEFAULT_ALBUM_COVER}
                alt={currentTrack.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', userSelect: 'none' }}
                onError={(e) => {
                  e.target.src = DEFAULT_ALBUM_COVER
                }}
              />

              {/* Dynamic Sound Pulse Ring */}
              {isPlaying && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '20px',
                    border: `2px solid ${ambientColor}88`,
                    pointerEvents: 'none'
                  }}
                />
              )}

              {/* Double Tap Seek Feedback Ripple: LEFT */}
              {rippleSide === 'left' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: 'absolute',
                    inset: '0 50% 0 0',
                    background: 'rgba(0, 0, 0, 0.65)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff'
                  }}
                >
                  <div style={{ fontSize: '24px', fontWeight: 800 }}>
                    ⏪ -10s
                  </div>
                  <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '4px' }}>Rewind</span>
                </motion.div>
              )}

              {/* Double Tap Seek Feedback Ripple: RIGHT */}
              {rippleSide === 'right' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: 'absolute',
                    inset: '0 0 0 50%',
                    background: 'rgba(0, 0, 0, 0.65)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff'
                  }}
                >
                  <div style={{ fontSize: '24px', fontWeight: 800 }}>
                    +10s ⏩
                  </div>
                  <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '4px' }}>Forward</span>
                </motion.div>
              )}

              {/* Gesture hint */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  insetInline: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  pointerEvents: 'none'
                }}
              >
                <span style={{ padding: '2px 8px', borderRadius: '999px', background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(6px)', fontSize: '10px', color: 'rgba(255, 255, 255, 0.8)' }}>
                  Swipe ← → to skip • Double-tap 10s
                </span>
              </div>
            </motion.div>

            {/* Song Meta (Title, Artist, Like button) */}
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px', padding: '0 6px' }}>
              <div style={{ flex: 1, minWidth: 0, paddingRight: '12px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {currentTrack.title}
                </h2>
                <p style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.6)', margin: '2px 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
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
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#1ed760">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Real-time 60fps Visualizer Canvas */}
          {showVisualizer && (
            <div style={{ margin: '6px 0' }}>
              <AudioVisualizer
                analyserNode={analyserNode}
                isPlaying={isPlaying}
                ambientColor={ambientColor}
              />
            </div>
          )}

          {/* VisionOS Sound Mode Selector */}
          <div style={{ margin: '6px 0' }}>
            <div style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '6px', padding: '0 4px' }}>
              Pure Sound & Spatial Audio
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', background: 'rgba(255, 255, 255, 0.05)', padding: '4px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <button
                type="button"
                onClick={() => setSoundEffectMode('normal')}
                style={{
                  padding: '7px 4px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: 700,
                  transition: 'all 0.2s ease',
                  background: soundEffectMode === 'normal' ? '#ffffff' : 'transparent',
                  color: soundEffectMode === 'normal' ? '#000000' : 'rgba(255, 255, 255, 0.7)'
                }}
              >
                ✨ Studio
              </button>

              <button
                type="button"
                onClick={() => setSoundEffectMode('8d_spatial')}
                style={{
                  padding: '7px 4px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: 700,
                  transition: 'all 0.2s ease',
                  background: soundEffectMode === '8d_spatial' ? 'linear-gradient(135deg, #06b6d4, #3b82f6)' : 'transparent',
                  color: soundEffectMode === '8d_spatial' ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                  boxShadow: soundEffectMode === '8d_spatial' ? '0 4px 14px rgba(6, 182, 212, 0.4)' : 'none'
                }}
                title="360° Orbit around your ears"
              >
                🎧 8D Spatial
              </button>

              <button
                type="button"
                onClick={() => setSoundEffectMode('slowed_reverb')}
                style={{
                  padding: '7px 4px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: 700,
                  transition: 'all 0.2s ease',
                  background: soundEffectMode === 'slowed_reverb' ? 'linear-gradient(135deg, #8b5cf6, #6366f1)' : 'transparent',
                  color: soundEffectMode === 'slowed_reverb' ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                  boxShadow: soundEffectMode === 'slowed_reverb' ? '0 4px 14px rgba(139, 92, 246, 0.4)' : 'none'
                }}
                title="2 AM Aesthetic Slowed & Reverb"
              >
                🌙 Slowed
              </button>

              <button
                type="button"
                onClick={() => setSoundEffectMode('nightcore')}
                style={{
                  padding: '7px 4px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: 800,
                  transition: 'all 0.2s ease',
                  background: soundEffectMode === 'nightcore' ? 'linear-gradient(135deg, #fbbf24, #f43f5e)' : 'transparent',
                  color: soundEffectMode === 'nightcore' ? '#000000' : 'rgba(255, 255, 255, 0.7)',
                  boxShadow: soundEffectMode === 'nightcore' ? '0 4px 14px rgba(251, 191, 36, 0.4)' : 'none'
                }}
                title="1.15x High Energy Tempo"
              >
                ⚡ Nightcore
              </button>
            </div>
          </div>

          {/* Scrubber Progress Bar */}
          <div style={{ marginTop: '8px', marginBottom: '4px', padding: '0 4px' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime || 0}
                onChange={(e) => seekTo(Number(e.target.value))}
                style={{
                  width: '100%',
                  height: '5px',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  background: `linear-gradient(to right, ${ambientColor} ${progressPercent}%, rgba(255,255,255,0.18) ${progressPercent}%)`
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.5)', marginTop: '4px' }}>
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Primary Controls (Shuffle, Prev, Play, Next, Repeat) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 8px' }}>
            <button
              type="button"
              onClick={toggleShuffle}
              style={{
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                padding: '8px',
                color: isShuffle ? '#1ed760' : 'rgba(255, 255, 255, 0.4)'
              }}
              title="Shuffle"
            >
              <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
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
                padding: '8px'
              }}
              title="Previous"
            >
              <svg width="26" height="26" viewBox="0 0 16 16" fill="currentColor">
                <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v10.575a.7.7 0 0 1-1.05.607L4 7.149V12.3a.7.7 0 0 1-1.4 0V1.7a.7.7 0 0 1 .7-.7z"/>
              </svg>
            </button>

            <button
              type="button"
              onClick={togglePlay}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: '#ffffff',
                color: '#000000',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(255, 255, 255, 0.25)',
                transition: 'transform 0.15s ease'
              }}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor" style={{ marginLeft: '2px' }}>
                  <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"/>
                </svg>
              )}
            </button>

            <button
              type="button"
              onClick={nextTrack}
              style={{
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: 'rgba(255, 255, 255, 0.85)',
                padding: '8px'
              }}
              title="Next"
            >
              <svg width="26" height="26" viewBox="0 0 16 16" fill="currentColor">
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
                padding: '8px',
                color: repeatMode !== 'off' ? '#1ed760' : 'rgba(255, 255, 255, 0.4)'
              }}
              title={`Repeat: ${repeatMode}`}
            >
              {repeatMode === 'one' ? (
                <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z"/>
                </svg>
              )}
            </button>
          </div>

          {/* Bottom Toolbar (Volume & Visualizer Toggle) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingInline: '6px', marginTop: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, maxWidth: '200px' }}>
              <button
                type="button"
                onClick={toggleMute}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'rgba(255, 255, 255, 0.6)', padding: '4px' }}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"/>
                    <path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4H.75A.75.75 0 0 0 0 5.6v4.8a.75.75 0 0 0 .75.75h1.316l6.925 4a.75.75 0 0 0 1.125-.65V1.5z"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4H.75A.75.75 0 0 1 0 10.4V5.6A.75.75 0 0 1 .75 4.85h1.316l6.925-4a.75.75 0 0 1 .75 0zM11.5 5.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75zm3-2a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-1.5 0v-7.5a.75.75 0 0 1 .75-.75z"/>
                  </svg>
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(e) => changeVolume(Number(e.target.value))}
                style={{ width: '100%', height: '4px', accentColor: '#ffffff', cursor: 'pointer' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setShowVisualizer((prev) => !prev)}
                style={{
                  padding: '5px 10px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: 700,
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: showVisualizer ? 'rgba(255, 255, 255, 0.18)' : 'transparent',
                  color: showVisualizer ? '#ffffff' : 'rgba(255, 255, 255, 0.5)'
                }}
                title="Toggle Canvas Visualizer"
              >
                <span>📊 Visualizer</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
