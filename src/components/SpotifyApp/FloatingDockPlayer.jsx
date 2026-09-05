import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useMusicPlayer } from '../../context/MusicPlayerContext.jsx'
import { DEFAULT_ALBUM_COVER } from '../../data/musicLibrary.js'
import EqualizerBars from './EqualizerBars.jsx'

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s < 10 ? '0' : ''}${s}`
}

export default function FloatingDockPlayer({ onOpenFullPlayer }) {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    repeatMode,
    togglePlay,
    nextTrack,
    prevTrack,
    seekTo,
    changeVolume,
    toggleMute,
    toggleLike,
    isLiked,
    toggleShuffle,
    toggleRepeat,
    ambientColor,
    soundEffectMode,
    setSoundEffectMode
  } = useMusicPlayer()

  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!currentTrack) return null

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0
  const liked = isLiked(currentTrack.id)

  // MOBILE COMPACT FLOATING PILL
  if (isMobile) {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: 10,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          justifyContent: 'center',
          padding: '0 8px',
          pointerEvents: 'none'
        }}
      >
        <motion.div
          role="region"
          aria-label="Music Player"
          data-testid="floating-dock-player"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onClick={onOpenFullPlayer}
          className="glass-capsule"
          style={{
            pointerEvents: 'auto',
            width: '100%',
            maxWidth: 480,
            borderRadius: 18,
            padding: '7px 12px 9px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: `0 12px 30px -5px ${ambientColor}40, 0 0 20px rgba(0,0,0,0.6)`
          }}
        >
          {/* Bottom Glowing Progress Line */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 2.5,
              background: 'rgba(255, 255, 255, 0.15)'
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                background: ambientColor || '#1ed760',
                boxShadow: `0 0 8px ${ambientColor || '#1ed760'}`
              }}
            />
          </div>

          {/* Left: Thumbnail & Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, flex: 1 }}>
            <img
              src={currentTrack.image || DEFAULT_ALBUM_COVER}
              alt=""
              style={{
                width: 38,
                height: 38,
                borderRadius: 8,
                objectFit: 'cover',
                flexShrink: 0
              }}
              onError={(e) => { e.currentTarget.src = DEFAULT_ALBUM_COVER }}
            />
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#ffffff',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {currentTrack.title}
                </span>
                {isPlaying && <EqualizerBars isPlaying={isPlaying} size="small" />}
              </div>
              <div
                style={{
                  fontSize: '10px',
                  color: 'rgba(255, 255, 255, 0.55)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {currentTrack.artist}
              </div>
            </div>
          </div>

          {/* Right: Like + Play + Next buttons */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Like */}
            <button
              type="button"
              onClick={() => toggleLike(currentTrack.id)}
              style={{
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                padding: 4,
                display: 'flex',
                alignItems: 'center'
              }}
              title={liked ? 'Liked' : 'Like'}
            >
              {liked ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1ed760">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              )}
            </button>

            {/* Play/Pause */}
            <button
              type="button"
              onClick={togglePlay}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: '#ffffff',
                color: '#000000',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(255, 255, 255, 0.3)'
              }}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"/>
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" style={{ marginLeft: 2 }}>
                  <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"/>
                </svg>
              )}
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={nextTrack}
              style={{
                border: 'none',
                background: 'transparent',
                color: 'rgba(255, 255, 255, 0.8)',
                cursor: 'pointer',
                padding: 4
              }}
              title="Next Track"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.714v10.575a.7.7 0 0 0 1.05.607L12 7.149V12.3a.7.7 0 0 0 1.4 0V1.7a.7.7 0 0 0-.7-.7z"/>
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  // DESKTOP FLOATING CAPSULE DOCK
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 16,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 16px',
        pointerEvents: 'none'
      }}
    >
      <motion.div
        role="region"
        aria-label="Music Player"
        data-testid="floating-dock-player"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 24, stiffness: 260 }}
        className="glass-capsule"
        style={{
          pointerEvents: 'auto',
          width: '100%',
          maxWidth: 960,
          borderRadius: 24,
          padding: '10px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          boxShadow: `0 20px 45px -10px ${ambientColor}35, 0 0 25px rgba(0,0,0,0.6)`
        }}
      >
        {/* LEFT: Mini Rotating Artwork & Song Info */}
        <div
          onClick={onOpenFullPlayer}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            minWidth: 160,
            maxWidth: 260,
            cursor: 'pointer'
          }}
          title="Click to open Fullscreen Spatial Player"
        >
          <div style={{ position: 'relative', width: 44, height: 44, flexShrink: 0 }}>
            <img
              src={currentTrack.image || DEFAULT_ALBUM_COVER}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'cover',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
              }}
              className={isPlaying ? 'animate-spin-slow' : ''}
              onError={(e) => { e.currentTarget.src = DEFAULT_ALBUM_COVER }}
            />
            {isPlaying && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: `2px solid ${ambientColor}88`,
                  pointerEvents: 'none'
                }}
              />
            )}
          </div>

          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#ffffff',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {currentTrack.title}
              </span>
              {isPlaying && <EqualizerBars isPlaying={isPlaying} size="small" />}
            </div>
            <div
              style={{
                fontSize: '11px',
                color: 'rgba(255, 255, 255, 0.55)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {currentTrack.artist}
            </div>
          </div>

          {/* Like button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              toggleLike(currentTrack.id)
            }}
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: 4,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {liked ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#1ed760">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            )}
          </button>
        </div>

        {/* CENTER: Playback Controls & Progress Scrubber */}
        <div style={{ flex: 1, maxWidth: 440, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* Shuffle */}
            <button
              type="button"
              onClick={toggleShuffle}
              style={{
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: isShuffle ? '#1ed760' : 'rgba(255, 255, 255, 0.45)',
                padding: 4
              }}
              title="Shuffle"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.39a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75 13.15.922z"/>
              </svg>
            </button>

            {/* Prev */}
            <button
              type="button"
              onClick={prevTrack}
              style={{
                border: 'none',
                background: 'transparent',
                color: 'rgba(255, 255, 255, 0.8)',
                cursor: 'pointer',
                padding: 4
              }}
              title="Previous"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v10.575a.7.7 0 0 1-1.05.607L4 7.149V12.3a.7.7 0 0 1-1.4 0V1.7a.7.7 0 0 1 .7-.7z"/>
              </svg>
            </button>

            {/* Big Play / Pause Button */}
            <button
              type="button"
              onClick={togglePlay}
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: '#ffffff',
                color: '#000000',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(255, 255, 255, 0.3)',
                transition: 'transform 0.15s'
              }}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginLeft: 2 }}>
                  <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"/>
                </svg>
              )}
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={nextTrack}
              style={{
                border: 'none',
                background: 'transparent',
                color: 'rgba(255, 255, 255, 0.8)',
                cursor: 'pointer',
                padding: 4
              }}
              title="Next"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.714v10.575a.7.7 0 0 0 1.05.607L12 7.149V12.3a.7.7 0 0 0 1.4 0V1.7a.7.7 0 0 0-.7-.7z"/>
              </svg>
            </button>

            {/* Repeat */}
            <button
              type="button"
              onClick={toggleRepeat}
              style={{
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: repeatMode !== 'off' ? '#1ed760' : 'rgba(255, 255, 255, 0.45)',
                padding: 4
              }}
              title={`Repeat: ${repeatMode}`}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z"/>
              </svg>
            </button>
          </div>

          {/* Scrubber Line */}
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.45)', minWidth: 26, textAlign: 'right' }}>
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime || 0}
              onChange={(e) => seekTo(Number(e.target.value))}
              style={{
                width: '100%',
                height: 4,
                cursor: 'pointer',
                background: `linear-gradient(to right, ${ambientColor} ${progressPercent}%, rgba(255,255,255,0.15) ${progressPercent}%)`
              }}
            />
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.45)', minWidth: 26 }}>
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* RIGHT: Quick Sound Mode Pill + Volume + Expand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Quick Sound Mode Pill */}
          <button
            type="button"
            onClick={() => {
              const nextMode =
                soundEffectMode === 'normal'
                  ? '8d_spatial'
                  : soundEffectMode === '8d_spatial'
                  ? 'slowed_reverb'
                  : soundEffectMode === 'slowed_reverb'
                  ? 'nightcore'
                  : 'normal'
              setSoundEffectMode(nextMode)
            }}
            style={{
              padding: '5px 10px',
              borderRadius: 999,
              fontSize: '11px',
              fontWeight: 800,
              border: '1px solid rgba(255, 255, 255, 0.15)',
              cursor: 'pointer',
              background:
                soundEffectMode === '8d_spatial'
                  ? 'linear-gradient(135deg, #06b6d4, #3b82f6)'
                  : soundEffectMode === 'slowed_reverb'
                  ? 'linear-gradient(135deg, #8b5cf6, #6366f1)'
                  : soundEffectMode === 'nightcore'
                  ? 'linear-gradient(135deg, #fbbf24, #f43f5e)'
                  : 'rgba(255, 255, 255, 0.08)',
              color: soundEffectMode === 'nightcore' ? '#000000' : '#ffffff',
              boxShadow: soundEffectMode !== 'normal' ? '0 2px 10px rgba(0,0,0,0.4)' : 'none'
            }}
            title="Tap to toggle sound modes: 8D Spatial, Slowed, Nightcore, Studio"
          >
            {soundEffectMode === '8d_spatial'
              ? '🎧 8D'
              : soundEffectMode === 'slowed_reverb'
              ? '🌙 Slowed'
              : soundEffectMode === 'nightcore'
              ? '⚡ Nightcore'
              : '✨ Studio'}
          </button>

          {/* Volume Control */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => setShowVolumeSlider((v) => !v)}
              style={{
                border: 'none',
                background: 'transparent',
                color: isMuted ? '#f87171' : 'rgba(255, 255, 255, 0.65)',
                cursor: 'pointer',
                padding: 4
              }}
              title="Volume"
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

            {showVolumeSlider && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 38,
                  right: -10,
                  background: 'rgba(20, 20, 26, 0.95)',
                  backdropFilter: 'blur(20px)',
                  padding: '8px 12px',
                  borderRadius: 14,
                  border: '1px solid rgba(255,255,255,0.12)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                  width: 120
                }}
              >
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => changeVolume(Number(e.target.value))}
                  style={{ width: '100%', height: 4, cursor: 'pointer' }}
                />
              </div>
            )}
          </div>

          {/* Full Screen Expand Button */}
          <button
            type="button"
            onClick={onOpenFullPlayer}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title="Expand Full Gestures & Spatial Theater"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 3 21 3 21 9"></polyline>
              <polyline points="9 21 3 21 3 15"></polyline>
              <line x1="21" y1="3" x2="14" y2="10"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
          </button>
        </div>
      </motion.div>
    </div>
  )
}
