import { useState } from 'react'
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

export default function SpotifyApp({ onBackToWorld }) {
  const [activeView, setActiveView] = useState('home') // home | trends | search | playlist | library | lyrics
  const [activePlaylist, setActivePlaylist] = useState({ id: 'liked', title: 'Liked Songs' })
  const [searchQuery, setSearchQuery] = useState('')
  const [isFullPlayerOpen, setIsFullPlayerOpen] = useState(false)
  const [isCreatePlaylistOpen, setIsCreatePlaylistOpen] = useState(false)
  const [addToPlaylistSong, setAddToPlaylistSong] = useState(null)

  const { ambientColor } = useMusicPlayer()

  const handleSelectPlaylist = (pl) => {
    setActivePlaylist(pl)
    setActiveView('playlist')
  }

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
          background: `radial-gradient(circle, ${ambientColor || '#1db954'}40 0%, rgba(0,0,0,0) 70%)`
        }}
      />
      <div
        className="aurora-orb-2"
        style={{
          background: `radial-gradient(circle, ${ambientColor || '#2563eb'}30 0%, rgba(0,0,0,0) 70%)`
        }}
      />

      {/* Floating Dynamic Island Navigation (Top Pill) */}
      <FloatingIslandNav
        activeView={activeView}
        setActiveView={setActiveView}
        onBackToWorld={onBackToWorld}
        onOpenFullPlayer={() => setIsFullPlayerOpen(true)}
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
          padding: '10px 20px 110px',
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
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                {/* Centerpiece Soundstage Hero */}
                <SoundstageHero onOpenFullPlayer={() => setIsFullPlayerOpen(true)} />

                {/* Spatial Bento Discovery Hub */}
                <BentoDiscoveryGrid onSelectPlaylist={handleSelectPlaylist} />
              </motion.div>
            )}

            {activeView === 'trends' && (
              <motion.div
                key="trends"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <div style={{ padding: '20px 0 10px' }}>
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
                  <h1 style={{ fontSize: '32px', fontWeight: 900, margin: '10px 0 4px', letterSpacing: '-0.02em' }}>
                    Viral Radar Stream
                  </h1>
                  <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', margin: 0 }}>
                    Real-time songs dominating social media, reels, and streaming charts
                  </p>
                </div>
                <BentoDiscoveryGrid onSelectPlaylist={handleSelectPlaylist} />
              </motion.div>
            )}

            {activeView === 'search' && (
              <motion.div
                key="search"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
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
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
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
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
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
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <SpotifyLyricsView />
              </motion.div>
            )}
          </AnimatePresence>
        </SpotifyErrorBoundary>
      </main>

      {/* Floating Glass Capsule Dock Player */}
      <FloatingDockPlayer onOpenFullPlayer={() => setIsFullPlayerOpen(true)} />

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
