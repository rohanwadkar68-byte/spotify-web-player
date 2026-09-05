import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMusicPlayer } from '../../context/MusicPlayerContext.jsx'
import FloatingIslandNav from './FloatingIslandNav.jsx'
import SoundstageHero from './SoundstageHero.jsx'
import BentoDiscoveryGrid from './BentoDiscoveryGrid.jsx'
import FloatingDockPlayer from './FloatingDockPlayer.jsx'
import SpotifySearchView from './SpotifySearchView.jsx'
import SpotifyPlaylistView from './SpotifyPlaylistView.jsx'
import SpotifyLyricsView from './SpotifyLyricsView.jsx'
import SpotifyLibraryView from './SpotifyLibraryView.jsx'
import SpotifyErrorBoundary from './SpotifyErrorBoundary.jsx'
import CreatePlaylistModal from './CreatePlaylistModal.jsx'
import AddToPlaylistModal from './AddToPlaylistModal.jsx'
import SpotifyFullPlayerModal from './SpotifyFullPlayerModal.jsx'
import { SPOTIFY_PLAYLISTS, DEFAULT_ALBUM_COVER } from '../../data/musicLibrary.js'

export default function SpotifyApp({ onBackToWorld }) {
  const [activeView, setActiveView] = useState('home') // home | playlists | trends | search | playlist | library | lyrics
  const [activePlaylist, setActivePlaylist] = useState({ id: 'liked', title: 'Liked Songs' })
  const [searchQuery, setSearchQuery] = useState('')
  const [isFullPlayerOpen, setIsFullPlayerOpen] = useState(false)
  const [isCreatePlaylistOpen, setIsCreatePlaylistOpen] = useState(false)
  const [addToPlaylistSong, setAddToPlaylistSong] = useState(null)
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)

  const { ambientColor, customPlaylists, likedIds } = useMusicPlayer()

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleSelectPlaylist = (pl) => {
    setActivePlaylist(pl)
    setActiveView('playlist')
  }

  const allPlaylists = [
    ...(customPlaylists || []),
    ...SPOTIFY_PLAYLISTS
  ]

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100%',
        background: '#08080b',
        color: '#ffffff',
        fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        zIndex: 999999
      }}
    >
      {/* Dynamic Multi-Layer Liquid Aurora Mesh Background */}
      <div
        className="aurora-orb-1"
        style={{
          background: `radial-gradient(circle, ${ambientColor || '#1db954'}35 0%, rgba(0,0,0,0) 70%)`
        }}
      />
      <div
        className="aurora-orb-2"
        style={{
          background: `radial-gradient(circle, ${ambientColor || '#2563eb'}25 0%, rgba(0,0,0,0) 70%)`
        }}
      />

      {/* Floating Dynamic Island Navigation */}
      <FloatingIslandNav
        activeView={activeView}
        setActiveView={setActiveView}
        onBackToWorld={onBackToWorld}
        onOpenFullPlayer={() => setIsFullPlayerOpen(true)}
        onOpenLikedPlaylist={() => handleSelectPlaylist({ id: 'liked', title: 'Liked Songs' })}
      />

      {/* Main Spatial Scrollable Canvas */}
      <main
        className="spotify-scroll-view"
        style={{
          flex: 1,
          position: 'relative',
          zIndex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: isMobile ? '6px 12px 130px' : '10px 20px 120px',
          maxWidth: 1180,
          width: '100%',
          margin: '0 auto',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <SpotifyErrorBoundary onReset={() => setActiveView('home')}>
          <AnimatePresence mode="wait">
            {activeView === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
              >
                {/* Centerpiece Soundstage Hero (Mobile Responsive) */}
                <SoundstageHero onOpenFullPlayer={() => setIsFullPlayerOpen(true)} />

                {/* Quick Search Banner */}
                <div
                  data-testid="quick-search-bar"
                  onClick={() => setActiveView('search')}
                  className="bento-card"
                  style={{
                    margin: '14px 0 16px',
                    padding: '12px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    cursor: 'pointer',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: 999
                  }}
                >
                  <span style={{ fontSize: '16px' }}>🔍</span>
                  <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', fontWeight: 600 }}>
                    What do you want to play? Search Hindi songs, artists, trends...
                  </span>
                </div>

                {/* Spatial Bento Discovery Hub with Liked Songs, Playlists, and Song rows */}
                <BentoDiscoveryGrid
                  onSelectPlaylist={handleSelectPlaylist}
                  onOpenCreatePlaylist={() => setIsCreatePlaylistOpen(true)}
                  onOpenAddToPlaylist={(song) => setAddToPlaylistSong(song)}
                />
              </motion.div>
            )}

            {/* DEDICATED PLAYLISTS HUB VIEW */}
            {activeView === 'playlists' && (
              <motion.div
                key="playlists"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                style={{ padding: '16px 4px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
                  <div>
                    <h1 style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: 900, color: '#ffffff', margin: 0 }}>
                      Playlists & Collections
                    </h1>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', margin: '4px 0 0' }}>
                      Curated mixes, your liked songs vault, and custom creations
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsCreatePlaylistOpen(true)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 999,
                      fontSize: '12px',
                      fontWeight: 800,
                      background: '#1ed760',
                      color: '#000000',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      boxShadow: '0 4px 14px rgba(30, 215, 96, 0.4)'
                    }}
                  >
                    <span>+ New Playlist</span>
                  </button>
                </div>

                {/* Liked Songs Featured Banner */}
                <div
                  className="bento-card"
                  onClick={() => handleSelectPlaylist({ id: 'liked', title: 'Liked Songs' })}
                  style={{
                    padding: 24,
                    borderRadius: 20,
                    marginBottom: 24,
                    background: 'linear-gradient(135deg, rgba(69, 10, 245, 0.4) 0%, rgba(142, 142, 229, 0.25) 100%)',
                    border: '1px solid rgba(142, 142, 229, 0.4)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: 16,
                        background: 'linear-gradient(135deg, #450af5, #8e8ee5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 24px rgba(69, 10, 245, 0.6)',
                        flexShrink: 0
                      }}
                    >
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="#ffffff">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </div>

                    <div>
                      <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#c7d2fe', letterSpacing: '0.08em' }}>
                        AUTO-GENERATED VAULT
                      </span>
                      <h2 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 900, color: '#ffffff', margin: '2px 0' }}>
                        Liked Songs
                      </h2>
                      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                        {likedIds.length} tracks liked by you
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: '#1ed760',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#000000',
                      boxShadow: '0 4px 14px rgba(30, 215, 96, 0.4)',
                      flexShrink: 0
                    }}
                  >
                    ▶
                  </div>
                </div>

                {/* All Playlist Cards */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 170px), 1fr))',
                    gap: 16
                  }}
                >
                  {allPlaylists.map((pl) => (
                    <div
                      key={pl.id}
                      className="bento-card"
                      onClick={() => handleSelectPlaylist(pl)}
                      style={{
                        padding: 14,
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10
                      }}
                    >
                      <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', borderRadius: 14, overflow: 'hidden' }}>
                        {pl.isCustom ? (
                          <div
                            style={{
                              width: '100%',
                              height: '100%',
                              background: pl.gradient || 'linear-gradient(135deg, #1ed760, #1db954)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '40px'
                            }}
                          >
                            {pl.emoji || '🎵'}
                          </div>
                        ) : (
                          <img
                            src={pl.cover || DEFAULT_ALBUM_COVER}
                            alt={pl.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => { e.currentTarget.src = DEFAULT_ALBUM_COVER }}
                          />
                        )}
                        <div
                          style={{
                            position: 'absolute',
                            bottom: 8,
                            right: 8,
                            width: 34,
                            height: 34,
                            borderRadius: '50%',
                            background: '#1ed760',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#000000',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                            fontSize: '13px'
                          }}
                        >
                          ▶
                        </div>
                      </div>

                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {pl.title}
                        </div>
                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 2 }}>
                          {pl.description || (pl.songIds ? `${pl.songIds.length} tracks` : 'Playlist')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeView === 'trends' && (
              <motion.div
                key="trends"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
              >
                <div style={{ padding: '16px 0 12px' }}>
                  <span
                    style={{
                      padding: '4px 12px',
                      borderRadius: 999,
                      fontSize: '11px',
                      fontWeight: 800,
                      background: 'rgba(225, 48, 108, 0.2)',
                      border: '1px solid rgba(225, 48, 108, 0.4)',
                      color: '#ff4d8d',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase'
                    }}
                  >
                    🔥 LIVE REELS & TRENDING CHARTS
                  </span>
                  <h1 style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: 900, margin: '10px 0 4px', letterSpacing: '-0.02em' }}>
                    Viral Radar Stream
                  </h1>
                  <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)', margin: 0 }}>
                    Real-time songs dominating social media, reels, and streaming charts
                  </p>
                </div>
                <BentoDiscoveryGrid
                  onSelectPlaylist={handleSelectPlaylist}
                  onOpenCreatePlaylist={() => setIsCreatePlaylistOpen(true)}
                  onOpenAddToPlaylist={(song) => setAddToPlaylistSong(song)}
                />
              </motion.div>
            )}

            {activeView === 'search' && (
              <motion.div
                key="search"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
              >
                <SpotifySearchView
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </motion.div>
            )}

            {activeView === 'library' && (
              <motion.div
                key="library"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
              >
                <SpotifyLibraryView
                  onSelectPlaylist={handleSelectPlaylist}
                  onOpenCreatePlaylist={() => setIsCreatePlaylistOpen(true)}
                />
              </motion.div>
            )}

            {activeView === 'playlist' && (
              <motion.div
                key="playlist"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
              >
                <SpotifyPlaylistView
                  playlist={activePlaylist}
                  onBack={() => setActiveView('home')}
                  onOpenAddToPlaylist={(song) => setAddToPlaylistSong(song)}
                />
              </motion.div>
            )}

            {activeView === 'lyrics' && (
              <motion.div
                key="lyrics"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
              >
                <SpotifyLyricsView />
              </motion.div>
            )}
          </AnimatePresence>
        </SpotifyErrorBoundary>
      </main>

      {/* Floating Glass Capsule Dock Player (Mobile-Optimized Compact Pill) */}
      <FloatingDockPlayer onOpenFullPlayer={() => setIsFullPlayerOpen(true)} />

      {/* Mobile Bottom Navigation Bar (Thumb Friendly) */}
      <nav
        className="mobile-only"
        aria-label="Mobile Navigation"
        style={{
            position: 'fixed',
            bottom: 74,
            left: 0,
            right: 0,
            zIndex: 49,
            display: 'flex',
            justifyContent: 'center',
            padding: '0 12px',
            pointerEvents: 'none'
          }}
        >
          <div
            className="glass-capsule"
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: '100%',
              maxWidth: 420,
              padding: '6px 8px',
              borderRadius: 999,
              boxShadow: '0 8px 24px rgba(0,0,0,0.6)'
            }}
          >
            <button
              type="button"
              onClick={() => setActiveView('home')}
              style={{
                border: 'none',
                background: 'transparent',
                color: activeView === 'home' ? '#1ed760' : 'rgba(255,255,255,0.6)',
                fontSize: '11px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                padding: '4px 8px',
                cursor: 'pointer'
              }}
            >
              <span>✨</span>
              <span>Discover</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView('search')}
              style={{
                border: 'none',
                background: 'transparent',
                color: activeView === 'search' ? '#1ed760' : 'rgba(255,255,255,0.6)',
                fontSize: '11px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                padding: '4px 8px',
                cursor: 'pointer'
              }}
            >
              <span>🔍</span>
              <span>Search</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView('playlists')}
              style={{
                border: 'none',
                background: 'transparent',
                color: activeView === 'playlists' ? '#1ed760' : 'rgba(255,255,255,0.6)',
                fontSize: '11px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                padding: '4px 8px',
                cursor: 'pointer'
              }}
            >
              <span>🎵</span>
              <span>Playlists</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView('trends')}
              style={{
                border: 'none',
                background: 'transparent',
                color: activeView === 'trends' ? '#1ed760' : 'rgba(255,255,255,0.6)',
                fontSize: '11px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                padding: '4px 8px',
                cursor: 'pointer'
              }}
            >
              <span>🔥</span>
              <span>Viral</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView('lyrics')}
              style={{
                border: 'none',
                background: 'transparent',
                color: activeView === 'lyrics' ? '#1ed760' : 'rgba(255,255,255,0.6)',
                fontSize: '11px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                padding: '4px 8px',
                cursor: 'pointer'
              }}
            >
              <span>🎤</span>
              <span>Lyrics</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView('library')}
              style={{
                border: 'none',
                background: 'transparent',
                color: activeView === 'library' ? '#1ed760' : 'rgba(255,255,255,0.6)',
                fontSize: '11px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                padding: '4px 8px',
                cursor: 'pointer'
              }}
            >
              <span>📚</span>
              <span>Library</span>
            </button>
          </div>
        </nav>

      {/* VisionOS Gesture-Driven Fullscreen Spatial Player Modal */}
      <SpotifyFullPlayerModal
        isOpen={isFullPlayerOpen}
        onClose={() => setIsFullPlayerOpen(false)}
      />

      {/* Create Playlist Modal */}
      <CreatePlaylistModal
        isOpen={isCreatePlaylistOpen}
        onClose={() => setIsCreatePlaylistOpen(false)}
        onCreated={(newPl) => {
          setActivePlaylist(newPl)
          setActiveView('playlist')
        }}
      />

      {/* Add To Playlist Modal */}
      <AddToPlaylistModal
        isOpen={Boolean(addToPlaylistSong)}
        song={addToPlaylistSong}
        onClose={() => setAddToPlaylistSong(null)}
        onOpenCreatePlaylist={() => {
          setAddToPlaylistSong(null)
          setIsCreatePlaylistOpen(true)
        }}
      />
    </div>
  )
}
