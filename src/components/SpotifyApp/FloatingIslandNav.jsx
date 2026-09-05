import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useMusicPlayer } from '../../context/MusicPlayerContext.jsx'
import EqualizerBars from './EqualizerBars.jsx'
import { DEFAULT_ALBUM_COVER } from '../../data/musicLibrary.js'

export default function FloatingIslandNav({
  activeView,
  setActiveView,
  onBackToWorld,
  onOpenFullPlayer,
  onOpenLikedPlaylist
}) {
  const { currentTrack, isPlaying, ambientColor, likedIds } = useMusicPlayer()
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const navItems = [
    { id: 'home', label: 'Discover', icon: '✨' },
    { id: 'search', label: 'Search', icon: '🔍' },
    { id: 'playlists', label: 'Playlists', icon: '🎵' },
    { id: 'trends', label: 'Viral Radar', icon: '🔥' },
    { id: 'lyrics', label: 'Lyrics', icon: '🎤' },
    { id: 'library', label: 'Library', icon: '📚' }
  ]

  // Mobile Top Bar
  if (isMobile) {
    return (
      <header
        style={{
          position: 'sticky',
          top: 8,
          zIndex: 50,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          padding: '0 10px',
          pointerEvents: 'none'
        }}
      >
        <div
          className="glass-capsule"
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
            padding: '6px 12px',
            borderRadius: 999,
            width: '100%',
            maxWidth: 500
          }}
        >
          {/* Brand Logo */}
          <div
            onClick={() => setActiveView('home')}
            style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1db954, #1ed760)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 12px rgba(30, 215, 96, 0.4)'
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#000000">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 900, letterSpacing: '0.02em', color: '#ffffff' }}>
              SPOTIFY
            </span>
          </div>

          {/* Center: Live Track Pill if playing */}
          {currentTrack && (
            <div
              onClick={onOpenFullPlayer}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(255, 255, 255, 0.08)',
                border: `1px solid ${ambientColor}55`,
                padding: '3px 8px 3px 4px',
                borderRadius: 999,
                cursor: 'pointer',
                maxWidth: 140,
                minWidth: 0
              }}
            >
              <img
                src={currentTrack.image || DEFAULT_ALBUM_COVER}
                alt=""
                style={{ width: 20, height: 20, borderRadius: '50%', objectFit: 'cover' }}
                className={isPlaying ? 'animate-spin-slow' : ''}
              />
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {currentTrack.title}
              </span>
            </div>
          )}

          {/* Right: Liked shortcut + Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {/* Liked Songs Quick Shortcut */}
            <button
              type="button"
              onClick={onOpenLikedPlaylist}
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                background: 'rgba(69, 10, 245, 0.3)',
                border: '1px solid rgba(142, 142, 229, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#ffffff'
              }}
              title={`Liked Songs (${likedIds.length})`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#1ed760">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>

            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setActiveView('search')}
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                background: activeView === 'search' ? '#ffffff' : 'rgba(255, 255, 255, 0.08)',
                color: activeView === 'search' ? '#000000' : '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="Search"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>

            {onBackToWorld && (
              <button
                type="button"
                onClick={onBackToWorld}
                style={{
                  padding: '4px 8px',
                  borderRadius: 999,
                  background: 'rgba(30, 215, 96, 0.15)',
                  border: '1px solid rgba(30, 215, 96, 0.4)',
                  color: '#1ed760',
                  fontSize: '10px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                ↩ World
              </button>
            )}
          </div>
        </div>
      </header>
    )
  }

  // Desktop Navigation Capsule
  return (
    <header
      style={{
        position: 'sticky',
        top: 14,
        zIndex: 50,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '0 16px',
        pointerEvents: 'none'
      }}
    >
      <div
        className="glass-capsule"
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          padding: '6px 14px',
          borderRadius: 999,
          maxWidth: 980,
          width: '100%'
        }}
      >
        {/* Left: Brand Icon & Live Pulse */}
        <div
          onClick={() => setActiveView('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
            padding: '4px 8px'
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1db954, #1ed760)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(30, 215, 96, 0.45)'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#000000">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
          </div>
          <span style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '0.04em', color: '#ffffff' }}>
            AETHERIA
          </span>
        </div>

        {/* Center: Interactive View Switcher Pills */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '3px 4px',
            borderRadius: 999,
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          {navItems.map((item) => {
            const isActive = activeView === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveView(item.id)}
                style={{
                  border: 'none',
                  outline: 'none',
                  cursor: 'pointer',
                  padding: '6px 14px',
                  borderRadius: 999,
                  fontSize: '12px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  background: isActive ? '#ffffff' : 'transparent',
                  color: isActive ? '#000000' : 'rgba(255, 255, 255, 0.65)',
                  boxShadow: isActive ? '0 4px 12px rgba(255, 255, 255, 0.2)' : 'none'
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Right: Liked shortcut + Search + Live Status Capsule */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Liked Shortcut */}
          <button
            type="button"
            onClick={onOpenLikedPlaylist}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '5px 12px',
              borderRadius: 999,
              background: 'rgba(69, 10, 245, 0.25)',
              border: '1px solid rgba(142, 142, 229, 0.35)',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer'
            }}
            title="Open Liked Songs Vault"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#1ed760">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span>Liked ({likedIds.length})</span>
          </button>

          {/* Search Trigger */}
          <button
            type="button"
            onClick={() => setActiveView('search')}
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: activeView === 'search' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              cursor: 'pointer'
            }}
            title="Search Music"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>

          {/* Now Playing Live Pill */}
          {currentTrack && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={onOpenFullPlayer}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(255, 255, 255, 0.08)',
                border: `1px solid ${ambientColor}55`,
                padding: '3px 10px 3px 4px',
                borderRadius: 999,
                cursor: 'pointer',
                maxWidth: 180
              }}
              title="Open Fullscreen Spatial Player"
            >
              <img
                src={currentTrack.image || DEFAULT_ALBUM_COVER}
                alt=""
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
                className={isPlaying ? 'animate-spin-slow' : ''}
              />
              <span
                style={{
                  fontSize: '11px',
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
            </motion.div>
          )}

          {onBackToWorld && (
            <button
              type="button"
              onClick={onBackToWorld}
              style={{
                padding: '5px 12px',
                borderRadius: 999,
                background: 'rgba(30, 215, 96, 0.15)',
                border: '1px solid rgba(30, 215, 96, 0.4)',
                color: '#1ed760',
                fontSize: '11px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}
            >
              <span>↩</span>
              <span>World</span>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
