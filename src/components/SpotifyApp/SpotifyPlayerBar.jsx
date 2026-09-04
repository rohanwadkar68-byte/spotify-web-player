import { useState } from 'react'
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

export default function SpotifyPlayerBar({ activeView, setActiveView, onOpenMobileNowPlaying }) {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    repeatMode,
    playTrack,
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
    pureSoundMode,
    togglePureSoundMode,
    sleepTimer,
    sleepTimerRemaining,
    setSleepTimerMode,
    cancelSleepTimer
  } = useMusicPlayer()

  const [isHoveringProgress, setIsHoveringProgress] = useState(false)
  const [isHoveringVolume, setIsHoveringVolume] = useState(false)
  const [showSleepMenu, setShowSleepMenu] = useState(false)

  if (!currentTrack) return null

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0
  const liked = isLiked(currentTrack.id)

  return (
    <footer style={{
      height: 90,
      background: '#000000',
      borderTop: '1px solid #282828',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      position: 'relative',
      zIndex: 100,
      userSelect: 'none',
      width: '100%'
    }}>
      {/* LEFT SECTION: Track Details */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          width: '30%',
          minWidth: 180,
          cursor: 'pointer'
        }}
        onClick={() => {
          if (onOpenMobileNowPlaying) {
            onOpenMobileNowPlaying()
          }
        }}
        title="Open Full Player (Gestures & 8D Audio)"
      >
        <img
          src={currentTrack.image}
          alt=""
          style={{
            width: 56,
            height: 56,
            borderRadius: 4,
            objectFit: 'cover',
            boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
            flexShrink: 0
          }}
          onError={(e) => { e.currentTarget.src = DEFAULT_ALBUM_COVER }}
        />

        <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#ffffff',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline' }}
              onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none' }}
            >
              {currentTrack.title}
            </span>
            {isPlaying && <EqualizerBars isPlaying={isPlaying} size="small" />}
          </div>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 500,
              color: '#b3b3b3',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ffffff'
              e.currentTarget.style.textDecoration = 'underline'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#b3b3b3'
              e.currentTarget.style.textDecoration = 'none'
            }}
          >
            {currentTrack.artist}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleLike(currentTrack.id)
          }}
          style={{
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            padding: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 4,
            color: liked ? '#1ed760' : '#b3b3b3',
            transition: 'transform 0.15s, color 0.15s'
          }}
          title={liked ? 'Remove from Your Library' : 'Save to Your Library'}
        >
          {liked ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1ed760">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b3b3b3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          )}
        </button>
      </div>

      {/* CENTER SECTION: Controls + Scrubber */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        width: '40%',
        maxWidth: 600
      }}>
        {/* Buttons Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Shuffle */}
          <button
            onClick={toggleShuffle}
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: isShuffle ? '#1ed760' : '#b3b3b3',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 4
            }}
            title={isShuffle ? 'Disable shuffle' : 'Enable shuffle'}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M13.151.922a.75.75 0 1 0-.302 1.47 4.11 4.11 0 0 1 1.677 1.085l-4.52 4.52a.75.75 0 1 0 1.06 1.06l4.52-4.52a4.11 4.11 0 0 1 1.085 1.677.75.75 0 0 0 1.47-.302V.922h-4.99zM2.5 13.5h1.5a2.5 2.5 0 0 0 2.5-2.5V5A2.5 2.5 0 0 1 9 2.5h1.5a.75.75 0 0 0 0-1.5H9A4 4 0 0 0 5 5v6a1 1 0 0 1-1 1H2.5a.75.75 0 0 0 0 1.5z"/>
            </svg>
            {isShuffle && <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#1ed760', marginTop: 2 }} />}
          </button>

          {/* Previous */}
          <button
            onClick={prevTrack}
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: '#b3b3b3',
              display: 'flex',
              alignItems: 'center',
              padding: 4
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#b3b3b3' }}
            title="Previous"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.576a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"/>
            </svg>
          </button>

          {/* Play / Pause Circular White Button */}
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            style={{
              border: 'none',
              background: '#ffffff',
              color: '#000000',
              width: 32,
              height: 32,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
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
          </motion.button>

          {/* Next */}
          <button
            onClick={nextTrack}
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: '#b3b3b3',
              display: 'flex',
              alignItems: 'center',
              padding: 4
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#b3b3b3' }}
            title="Next"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.714v12.576a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"/>
            </svg>
          </button>

          {/* Repeat */}
          <button
            onClick={toggleRepeat}
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: repeatMode !== 'off' ? '#1ed760' : '#b3b3b3',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 4,
              position: 'relative'
            }}
            title={`Repeat: ${repeatMode}`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L7.439 13.25a.75.75 0 0 1 0-1.06l2.329-2.329a.75.75 0 0 1 1.06 1.06L9.81 12h2.44a2.25 2.25 0 0 0 2.25-2.25v-5A2.25 2.25 0 0 0 12.25 2.5h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5a.75.75 0 0 1 0 1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z"/>
            </svg>
            {repeatMode === 'one' && (
              <span style={{
                position: 'absolute',
                top: -2,
                right: -4,
                fontSize: '8px',
                fontWeight: 900,
                color: '#1ed760'
              }}>
                1
              </span>
            )}
            {repeatMode !== 'off' && <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#1ed760', marginTop: 2 }} />}
          </button>
        </div>

        {/* Scrubber Progress Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          width: '100%'
        }}>
          <span style={{ fontSize: '11px', color: '#b3b3b3', minWidth: 32, textAlign: 'right' }}>
            {formatTime(currentTime)}
          </span>

          <div
            style={{
              flex: 1,
              height: 12,
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              position: 'relative'
            }}
            onMouseEnter={() => setIsHoveringProgress(true)}
            onMouseLeave={() => setIsHoveringProgress(false)}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const clickX = e.clientX - rect.left
              const newRatio = Math.max(0, Math.min(1, clickX / rect.width))
              seekTo(newRatio * (duration || 0))
            }}
          >
            {/* Background Grey Track */}
            <div style={{
              width: '100%',
              height: 4,
              background: '#4d4d4d',
              borderRadius: 2,
              position: 'relative',
              overflow: 'visible'
            }}>
              {/* Green Filled Track */}
              <div style={{
                width: `${progressPercent}%`,
                height: '100%',
                background: isHoveringProgress ? '#1ed760' : '#ffffff',
                borderRadius: 2,
                position: 'relative'
              }}>
                {/* Thumb Circle on Hover */}
                {isHoveringProgress && (
                  <div style={{
                    position: 'absolute',
                    right: -5,
                    top: -4,
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: '#ffffff',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.5)'
                  }} />
                )}
              </div>
            </div>
          </div>

          <span style={{ fontSize: '11px', color: '#b3b3b3', minWidth: 32 }}>
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* RIGHT SECTION: Lyrics, Queue, Volume */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 14,
        width: '30%',
        minWidth: 180
      }}>
        {/* Pure Peace Studio Sound Mode Toggle */}
        <button
          onClick={togglePureSoundMode}
          style={{
            background: pureSoundMode ? 'rgba(30, 215, 96, 0.15)' : 'rgba(255, 255, 255, 0.05)',
            border: pureSoundMode ? '1px solid rgba(30, 215, 96, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 999,
            padding: '4px 10px',
            fontSize: '11px',
            fontWeight: 800,
            color: pureSoundMode ? '#1ed760' : '#888888',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            transition: 'all 0.15s ease'
          }}
          title={pureSoundMode ? 'Studio Peace Audio Active (Pure 320kbps Warmth & Soft Dynamics)' : 'Enable Studio Peace Audio'}
        >
          <span>✨</span>
          <span style={{ fontSize: '10px', letterSpacing: '0.03em' }}>PEACE EQ</span>
        </button>

        {/* Lyrics Button */}
        <button
          onClick={() => setActiveView(activeView === 'lyrics' ? 'home' : 'lyrics')}
          style={{
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            color: activeView === 'lyrics' ? '#1ed760' : '#b3b3b3',
            padding: 4,
            display: 'flex',
            alignItems: 'center'
          }}
          onMouseEnter={(e) => { if (activeView !== 'lyrics') e.currentTarget.style.color = '#ffffff' }}
          onMouseLeave={(e) => { if (activeView !== 'lyrics') e.currentTarget.style.color = '#b3b3b3' }}
          title="Lyrics"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M13.426 2.574a2.831 2.831 0 0 0-4.797 1.55l3.247 3.247a2.831 2.831 0 0 0 1.55-4.797zM10.5 8.743L7.257 5.5 1.745 11.012a2.83 2.83 0 0 0-.825 1.996V14.5a.5.5 0 0 0 .5.5h1.492a2.83 2.83 0 0 0 1.996-.825L10.5 8.743z"/>
          </svg>
        </button>

        {/* Queue Button */}
        <button
          onClick={() => setActiveView(activeView === 'queue' ? 'home' : 'queue')}
          style={{
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            color: activeView === 'queue' ? '#1ed760' : '#b3b3b3',
            padding: 4,
            display: 'flex',
            alignItems: 'center'
          }}
          onMouseEnter={(e) => { if (activeView !== 'queue') e.currentTarget.style.color = '#ffffff' }}
          onMouseLeave={(e) => { if (activeView !== 'queue') e.currentTarget.style.color = '#b3b3b3' }}
          title="Queue"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 0 1 3.5 1h9A2.5 2.5 0 0 1 15 3.5v2A2.5 2.5 0 0 1 12.5 8h-9A2.5 2.5 0 0 1 1 5.5v-2zM3.5 2.5A1 1 0 0 0 2.5 3.5v2A1 1 0 0 0 3.5 6.5h9a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-9z"/>
          </svg>
        </button>

                {/* Sleep Timer Button */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowSleepMenu((prev) => !prev)}
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: sleepTimer ? '#1ed760' : '#b3b3b3',
              padding: 4,
              display: 'flex',
              alignItems: 'center',
              position: 'relative'
            }}
            onMouseEnter={(e) => { if (!sleepTimer) e.currentTarget.style.color = '#ffffff' }}
            onMouseLeave={(e) => { if (!sleepTimer) e.currentTarget.style.color = '#b3b3b3' }}
            title={sleepTimer ? `Sleep Timer: ${sleepTimerRemaining}` : 'Sleep Timer'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
            </svg>
            {sleepTimer && (
              <span style={{
                position: 'absolute',
                top: -8,
                right: -10,
                fontSize: '9px',
                fontWeight: 800,
                color: '#1ed760',
                background: '#121212',
                padding: '1px 4px',
                borderRadius: 999,
                border: '1px solid #1ed760',
                whiteSpace: 'nowrap'
              }}>
                {sleepTimerRemaining}
              </span>
            )}
          </button>

          {/* Sleep Timer Dropdown Popover */}
          {showSleepMenu && (
            <div style={{
              position: 'absolute',
              bottom: 40,
              right: -10,
              background: '#282828',
              borderRadius: 8,
              padding: 6,
              boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
              minWidth: 160,
              zIndex: 99999,
              border: '1px solid #383838',
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}>
              <div style={{ padding: '6px 10px', fontSize: '11px', fontWeight: 800, color: '#b3b3b3', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Sleep Timer
              </div>
              {[15, 30, 45, 60].map((mins) => (
                <button
                  key={mins}
                  onClick={() => {
                    setSleepTimerMode(mins)
                    setShowSleepMenu(false)
                  }}
                  style={{
                    border: 'none',
                    background: sleepTimer?.minutes === mins ? '#3e3e3e' : 'transparent',
                    color: sleepTimer?.minutes === mins ? '#1ed760' : '#ffffff',
                    padding: '8px 10px',
                    borderRadius: 4,
                    fontSize: '13px',
                    fontWeight: 600,
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{mins} minutes</span>
                  {sleepTimer?.minutes === mins && <span>✓</span>}
                </button>
              ))}
              <button
                onClick={() => {
                  setSleepTimerMode('end_of_song')
                  setShowSleepMenu(false)
                }}
                style={{
                  border: 'none',
                  background: sleepTimer?.mode === 'end_of_song' ? '#3e3e3e' : 'transparent',
                  color: sleepTimer?.mode === 'end_of_song' ? '#1ed760' : '#ffffff',
                  padding: '8px 10px',
                  borderRadius: 4,
                  fontSize: '13px',
                  fontWeight: 600,
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>End of track</span>
                {sleepTimer?.mode === 'end_of_song' && <span>✓</span>}
              </button>
              {sleepTimer && (
                <button
                  onClick={() => {
                    cancelSleepTimer()
                    setShowSleepMenu(false)
                  }}
                  style={{
                    border: 'none',
                    borderTop: '1px solid #383838',
                    marginTop: 4,
                    background: 'transparent',
                    color: '#f87171',
                    padding: '8px 10px',
                    borderRadius: 4,
                    fontSize: '12px',
                    fontWeight: 700,
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  Turn off timer
                </button>
              )}
            </div>
          )}
        </div>

        {/* Volume Control */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={toggleMute}
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: '#b3b3b3',
              padding: 4,
              display: 'flex',
              alignItems: 'center'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#b3b3b3' }}
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

          <div
            style={{
              width: 90,
              height: 12,
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onMouseEnter={() => setIsHoveringVolume(true)}
            onMouseLeave={() => setIsHoveringVolume(false)}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const clickX = e.clientX - rect.left
              const newVol = Math.max(0, Math.min(1, clickX / rect.width))
              changeVolume(newVol)
            }}
          >
            <div style={{
              width: '100%',
              height: 4,
              background: '#4d4d4d',
              borderRadius: 2,
              position: 'relative'
            }}>
              <div style={{
                width: `${(isMuted ? 0 : volume) * 100}%`,
                height: '100%',
                background: isHoveringVolume ? '#1ed760' : '#ffffff',
                borderRadius: 2
              }} />
            </div>
          </div>
        </div>

        {/* Fullscreen Gesture Player Button */}
        <button
          onClick={() => {
            if (onOpenMobileNowPlaying) onOpenMobileNowPlaying()
          }}
          style={{
            border: 'none',
            background: 'transparent',
            color: '#b3b3b3',
            cursor: 'pointer',
            padding: 4,
            display: 'flex',
            alignItems: 'center'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#b3b3b3' }}
          title="Full Screen Player (Gestures, 8D Spatial, Visualizer)"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 3 21 3 21 9"></polyline>
            <polyline points="9 21 3 21 3 15"></polyline>
            <line x1="21" y1="3" x2="14" y2="10"></line>
            <line x1="3" y1="21" x2="10" y2="14"></line>
          </svg>
        </button>
      </div>
    </footer>
  )
}
