import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useMusicPlayer, detectSongMood } from '../../context/MusicPlayerContext.jsx'
import { CURATED_SONGS, DEFAULT_ALBUM_COVER } from '../../data/musicLibrary.js'
import AudioVisualizer from './AudioVisualizer.jsx'

export default function SoundstageHero({ onOpenFullPlayer }) {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    nextTrack,
    prevTrack,
    toggleLike,
    isLiked,
    ambientColor,
    soundEffectMode,
    setSoundEffectMode,
    analyserNode,
    playTrack
  } = useMusicPlayer()

  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const activeTrack = currentTrack || CURATED_SONGS[0]
  const liked = activeTrack ? isLiked(activeTrack.id) : false
  const mood = activeTrack ? detectSongMood(activeTrack) : 'romantic'

  const handleHeroPlay = () => {
    if (!currentTrack) {
      playTrack(activeTrack)
    } else {
      togglePlay()
    }
  }

  // Responsive dimensions
  const discSize = isMobile ? 140 : 210
  const sleeveSize = isMobile ? 140 : 210
  const discSlide = isMobile ? (isPlaying ? 35 : 15) : (isPlaying ? 55 : 25)

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        borderRadius: isMobile ? 22 : 32,
        padding: isMobile ? '20px 16px' : '36px 32px',
        margin: isMobile ? '10px 0 20px' : '18px 0 28px',
        background: `radial-gradient(ellipse at 80% 20%, ${ambientColor}22 0%, rgba(20, 20, 26, 0.65) 60%, rgba(12, 12, 16, 0.85) 100%)`,
        backdropFilter: 'blur(36px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: `0 30px 60px -20px ${ambientColor}25, 0 0 40px rgba(0,0,0,0.5)`,
        overflow: 'hidden'
      }}
    >
      {/* Background Accent Glow Ring */}
      <div
        style={{
          position: 'absolute',
          right: '-8%',
          top: '-20%',
          width: isMobile ? '260px' : '450px',
          height: isMobile ? '260px' : '450px',
          borderRadius: '50%',
          background: ambientColor,
          filter: 'blur(100px)',
          opacity: isPlaying ? 0.35 : 0.2,
          transition: 'all 0.8s ease',
          pointerEvents: 'none'
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: isMobile ? 'column-reverse' : 'row',
          gap: isMobile ? 24 : 36,
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* LEFT: Track Info, Controls & Sound Mode */}
        <div style={{ width: '100%', flex: 1, minWidth: 0, textAlign: isMobile ? 'center' : 'left' }}>
          {/* Spotlight Pill Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 12,
              justifyContent: isMobile ? 'center' : 'flex-start',
              flexWrap: 'wrap'
            }}
          >
            <span
              style={{
                padding: '3px 10px',
                borderRadius: 999,
                fontSize: '10px',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: `${ambientColor}28`,
                border: `1px solid ${ambientColor}60`,
                color: ambientColor,
                boxShadow: `0 0 16px ${ambientColor}30`
              }}
            >
              SPOTLIGHT • {mood.toUpperCase().replace('_', ' ')}
            </span>
            {isPlaying && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '10px', color: '#1ed760', fontWeight: 800 }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1ed760] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1ed760]" />
                </span>
                LIVE PLAYING
              </span>
            )}
          </div>

          {/* Song Title & Artist */}
          <h1
            style={{
              fontSize: isMobile ? '24px' : 'clamp(28px, 4vw, 42px)',
              fontWeight: 900,
              lineHeight: 1.15,
              color: '#ffffff',
              margin: '0 0 6px',
              letterSpacing: '-0.02em',
              whiteSpace: isMobile ? 'normal' : 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {activeTrack.title}
          </h1>
          <p
            style={{
              fontSize: isMobile ? '13px' : 'clamp(14px, 2vw, 17px)',
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.7)',
              margin: '0 0 20px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {activeTrack.artist} • <span style={{ color: 'rgba(255,255,255,0.45)' }}>{activeTrack.album || 'Master Audio'}</span>
          </p>

          {/* Primary Controls Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? 12 : 16,
              marginBottom: 20,
              justifyContent: isMobile ? 'center' : 'flex-start'
            }}
          >
            {/* Prev Track */}
            <button
              type="button"
              onClick={prevTrack}
              style={{
                width: isMobile ? 38 : 44,
                height: isMobile ? 38 : 44,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="Previous Track"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v10.575a.7.7 0 0 1-1.05.607L4 7.149V12.3a.7.7 0 0 1-1.4 0V1.7a.7.7 0 0 1 .7-.7z"/>
              </svg>
            </button>

            {/* Big Glow Play/Pause Button */}
            <button
              type="button"
              onClick={handleHeroPlay}
              style={{
                width: isMobile ? 54 : 64,
                height: isMobile ? 54 : 64,
                borderRadius: '50%',
                background: '#ffffff',
                color: '#000000',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: `0 8px 25px ${ambientColor}60, 0 0 0 4px rgba(255, 255, 255, 0.15)`,
                transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg width={isMobile ? 22 : 26} height={isMobile ? 22 : 26} viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"/>
                </svg>
              ) : (
                <svg width={isMobile ? 22 : 26} height={isMobile ? 22 : 26} viewBox="0 0 16 16" fill="currentColor" style={{ marginLeft: 2 }}>
                  <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"/>
                </svg>
              )}
            </button>

            {/* Next Track */}
            <button
              type="button"
              onClick={nextTrack}
              style={{
                width: isMobile ? 38 : 44,
                height: isMobile ? 38 : 44,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="Next Track"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.714v10.575a.7.7 0 0 0 1.05.607L12 7.149V12.3a.7.7 0 0 0 1.4 0V1.7a.7.7 0 0 0-.7-.7z"/>
              </svg>
            </button>

            {/* Like Button */}
            <button
              type="button"
              onClick={() => toggleLike(activeTrack.id)}
              style={{
                width: isMobile ? 38 : 44,
                height: isMobile ? 38 : 44,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title={liked ? 'In your Liked collection' : 'Save to Liked'}
            >
              {liked ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1ed760">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              )}
            </button>

            {/* Expand Spatial Theater */}
            <button
              type="button"
              onClick={onOpenFullPlayer}
              style={{
                padding: isMobile ? '8px 12px' : '10px 16px',
                borderRadius: 999,
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                fontSize: isMobile ? '11px' : '12px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                cursor: 'pointer'
              }}
              title="Open Gesture & Spatial Theater"
            >
              <span>🪐 Theater</span>
            </button>
          </div>

          {/* Instant Sound Mode Selector Pills */}
          <div>
            <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.45)', marginBottom: 8, textAlign: isMobile ? 'center' : 'left' }}>
              Sound Architecture Modes
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 6,
                justifyContent: isMobile ? 'center' : 'flex-start'
              }}
            >
              <button
                type="button"
                onClick={() => setSoundEffectMode('normal')}
                style={{
                  padding: '5px 12px',
                  borderRadius: 999,
                  fontSize: '11px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  background: soundEffectMode === 'normal' ? '#ffffff' : 'rgba(255, 255, 255, 0.08)',
                  color: soundEffectMode === 'normal' ? '#000000' : 'rgba(255, 255, 255, 0.75)'
                }}
              >
                ✨ Studio
              </button>

              <button
                type="button"
                onClick={() => setSoundEffectMode('8d_spatial')}
                style={{
                  padding: '5px 12px',
                  borderRadius: 999,
                  fontSize: '11px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  background: soundEffectMode === '8d_spatial' ? 'linear-gradient(135deg, #06b6d4, #3b82f6)' : 'rgba(255, 255, 255, 0.08)',
                  color: soundEffectMode === '8d_spatial' ? '#ffffff' : 'rgba(255, 255, 255, 0.75)'
                }}
                title="360° Binaural Orbit around head"
              >
                🎧 8D Spatial
              </button>

              <button
                type="button"
                onClick={() => setSoundEffectMode('slowed_reverb')}
                style={{
                  padding: '5px 12px',
                  borderRadius: 999,
                  fontSize: '11px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  background: soundEffectMode === 'slowed_reverb' ? 'linear-gradient(135deg, #8b5cf6, #6366f1)' : 'rgba(255, 255, 255, 0.08)',
                  color: soundEffectMode === 'slowed_reverb' ? '#ffffff' : 'rgba(255, 255, 255, 0.75)'
                }}
                title="0.88x Slowed + Reverb"
              >
                🌙 Slowed
              </button>

              <button
                type="button"
                onClick={() => setSoundEffectMode('nightcore')}
                style={{
                  padding: '5px 12px',
                  borderRadius: 999,
                  fontSize: '11px',
                  fontWeight: 800,
                  border: 'none',
                  cursor: 'pointer',
                  background: soundEffectMode === 'nightcore' ? 'linear-gradient(135deg, #fbbf24, #f43f5e)' : 'rgba(255, 255, 255, 0.08)',
                  color: soundEffectMode === 'nightcore' ? '#000000' : 'rgba(255, 255, 255, 0.75)'
                }}
                title="1.15x High Energy Tempo"
              >
                ⚡ Nightcore
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: 3D Interactive Vinyl Stage + Live 60fps Visualizer */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {/* Vinyl & Sleeve Combo Container */}
          <div
            style={{
              position: 'relative',
              width: isMobile ? 190 : 280,
              height: isMobile ? 150 : 230,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            onClick={onOpenFullPlayer}
            title="Click to expand full interactive gestures"
          >
            {/* Spinning Vinyl Record Disc */}
            <motion.div
              animate={isPlaying ? { x: discSlide, rotate: 360 } : { x: isMobile ? 12 : 25, rotate: 0 }}
              transition={
                isPlaying
                  ? { x: { duration: 0.8, type: 'spring' }, rotate: { duration: 10, repeat: Infinity, ease: 'linear' } }
                  : { x: { duration: 0.6, type: 'spring' }, rotate: { duration: 0.5 } }
              }
              className="vinyl-disc"
              style={{
                position: 'absolute',
                width: discSize,
                height: discSize,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1
              }}
            >
              {/* Vinyl Center Spindle Label */}
              <div
                style={{
                  width: isMobile ? 50 : 75,
                  height: isMobile ? 50 : 75,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid #111111',
                  position: 'relative'
                }}
              >
                <img
                  src={activeTrack.image || DEFAULT_ALBUM_COVER}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.currentTarget.src = DEFAULT_ALBUM_COVER }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: '#08080b',
                    border: '2px solid rgba(255,255,255,0.3)'
                  }}
                />
              </div>
            </motion.div>

            {/* Album Sleeve Jacket */}
            <div
              style={{
                position: 'relative',
                width: sleeveSize,
                height: sleeveSize,
                borderRadius: isMobile ? 14 : 18,
                overflow: 'hidden',
                zIndex: 2,
                boxShadow: '0 16px 36px rgba(0,0,0,0.7)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                transform: `translateX(${isMobile ? -20 : -30}px)`
              }}
            >
              <img
                src={activeTrack.image || DEFAULT_ALBUM_COVER}
                alt={activeTrack.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.currentTarget.src = DEFAULT_ALBUM_COVER }}
              />

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%)',
                  pointerEvents: 'none'
                }}
              />
            </div>
          </div>

          {/* Embedded 60fps Real-Time Audio Visualizer */}
          <div style={{ width: '100%', maxWidth: isMobile ? 280 : 340, marginTop: 10 }}>
            <AudioVisualizer
              analyserNode={analyserNode}
              isPlaying={isPlaying}
              ambientColor={ambientColor}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
