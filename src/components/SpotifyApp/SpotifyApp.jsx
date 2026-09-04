import { DEFAULT_ALBUM_COVER } from '../../data/musicLibrary.js'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMusicPlayer } from '../../context/MusicPlayerContext.jsx'
import SpotifySidebar from './SpotifySidebar.jsx'
import SpotifyTopBar from './SpotifyTopBar.jsx'
import SpotifyHomeView from './SpotifyHomeView.jsx'
import SpotifySearchView from './SpotifySearchView.jsx'
import SpotifyPlaylistView from './SpotifyPlaylistView.jsx'
import SpotifyLyricsView from './SpotifyLyricsView.jsx'
import SpotifyQueueView from './SpotifyQueueView.jsx'
import SpotifyLibraryView from './SpotifyLibraryView.jsx'
import SpotifyPlayerBar from './SpotifyPlayerBar.jsx'
import SpotifyMobilePlayer from './SpotifyMobilePlayer.jsx'
import SpotifyErrorBoundary from './SpotifyErrorBoundary.jsx'
import EqualizerBars from './EqualizerBars.jsx'
import CreatePlaylistModal from './CreatePlaylistModal.jsx'
import AddToPlaylistModal from './AddToPlaylistModal.jsx'
import SpotifyFullPlayerModal from './SpotifyFullPlayerModal.jsx'

export default function SpotifyApp({ onBackToWorld }) {
  const [activeView, setActiveView] = useState('home') // home | search | playlist | library | lyrics | queue
  const [activePlaylist, setActivePlaylist] = useState({ id: 'liked', title: 'Liked Songs' })
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  const [mobileNowPlayingOpen, setMobileNowPlayingOpen] = useState(false)
  const [isCreatePlaylistOpen, setIsCreatePlaylistOpen] = useState(false)
  const [addToPlaylistSong, setAddToPlaylistSong] = useState(null)


  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    changeVolume,
    toggleMute,
    playTrack,
    togglePlay,
    nextTrack,
    prevTrack,
    seekTo,
    toggleLike,
    isLiked,
    ambientColor,
    sleepTimer,
    sleepTimerRemaining,
    setSleepTimerMode,
    cancelSleepTimer
  } = useMusicPlayer()

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleSelectPlaylist = (pl) => {
    setActivePlaylist(pl)
    setActiveView('playlist')
  }

  return (
    <div className="spotify-scroll-view" style={{
      position: 'fixed',
      inset: 0,
      width: '100vw',
      height: '100%',
      background: '#000000',
      color: '#ffffff',
      fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      zIndex: 999999
    }}>
      {/* MAIN CONTAINER */}
      <div style={{
        flex: 1,
        display: 'flex',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* DESKTOP SIDEBAR */}
        {!isMobile && (
          <SpotifySidebar
            activeView={activeView}
            setActiveView={setActiveView}
            onSelectPlaylist={handleSelectPlaylist}
            onOpenCreatePlaylist={() => setIsCreatePlaylistOpen(true)}
          />
        )}

        {/* MAIN SCROLLABLE CONTENT */}
        <div style={{
          flex: 1,
          background: '#121212',
          backgroundImage: activeView === 'lyrics'
            ? `linear-gradient(to bottom, ${ambientColor || '#2b1154'}55 0%, #121212 500px)`
            : `linear-gradient(to bottom, ${ambientColor || '#1d2228'}33 0%, #121212 380px)`,
          borderRadius: !isMobile ? 8 : 0,
          margin: !isMobile ? '8px 8px 8px 0' : 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          paddingBottom: isMobile ? 124 : 16,
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'thin'
        }}>
          {/* Top Bar */}
          <SpotifyTopBar
            activeView={activeView}
            setActiveView={setActiveView}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onBackToWorld={onBackToWorld}
          />

          {/* Views Routing wrapped in ErrorBoundary */}
          <div className="spotify-scroll-view" style={{ flex: 1, paddingTop: 16 }}>
            <SpotifyErrorBoundary onReset={() => setActiveView('home')}>
              {activeView === 'home' && (
                <SpotifyHomeView
                  onSelectPlaylist={handleSelectPlaylist}
                  onOpenCreatePlaylist={() => setIsCreatePlaylistOpen(true)}
                  onOpenAddToPlaylist={(song) => setAddToPlaylistSong(song)}
                />
              )}
              {activeView === 'search' && (
                <SpotifySearchView
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              )}
              {activeView === 'library' && (
                <SpotifyLibraryView
                  onSelectPlaylist={handleSelectPlaylist}
                  onOpenCreatePlaylist={() => setIsCreatePlaylistOpen(true)}
                />
              )}
              {activeView === 'playlist' && (
                <SpotifyPlaylistView
                  playlist={activePlaylist}
                  onOpenAddToPlaylist={(song) => setAddToPlaylistSong(song)}
                  onNavigateSearch={() => setActiveView('search')}
                  onDeleteCurrentPlaylist={() => {
                    setActivePlaylist({ id: 'liked', title: 'Liked Songs' })
                    setActiveView('home')
                  }}
                />
              )}
              {activeView === 'lyrics' && (
                <SpotifyLyricsView />
              )}
              {activeView === 'queue' && (
                <SpotifyQueueView />
              )}
            </SpotifyErrorBoundary>
          </div>

        </div>
      </div>

      {/* DESKTOP BOTTOM PLAYER (Visible only >= 768px) */}
      {!isMobile && (
        <SpotifyPlayerBar
          activeView={activeView}
          setActiveView={setActiveView}
          onOpenMobileNowPlaying={() => setMobileNowPlayingOpen(true)}
        />
      )}


      {/* MOBILE FIXED BOTTOM DOCK (Mini Player + Bottom Navigation) */}
      {isMobile && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Mini Player */}
          <div style={{ pointerEvents: 'auto' }}>
            <SpotifyMobilePlayer
              onOpenFullNowPlaying={() => setMobileNowPlayingOpen(true)}
            />
          </div>

          {/* Bottom Navigation Bar */}
          <div style={{
            height: 56,
            background: 'rgba(18, 18, 18, 0.98)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            pointerEvents: 'auto',
            userSelect: 'none'
          }}>
            {/* Home */}
            <button
              onClick={() => setActiveView('home')}
              style={{
                border: 'none',
                background: 'transparent',
                color: activeView === 'home' ? '#ffffff' : '#b3b3b3',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33z"/>
              </svg>
              <span>Home</span>
            </button>

            {/* Search */}
            <button
              onClick={() => setActiveView('search')}
              style={{
                border: 'none',
                background: 'transparent',
                color: activeView === 'search' ? '#ffffff' : '#b3b3b3',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 1 0 1.414-1.414l-4.344-4.344a9.157 9.157 0 0 0 2.077-5.816c0-5.14-4.226-9.28-9.407-9.28z"/>
              </svg>
              <span>Search</span>
            </button>

            {/* Your Library */}
            <button
              onClick={() => setActiveView('library')}
              style={{
                border: 'none',
                background: 'transparent',
                color: activeView === 'library' ? '#ffffff' : '#b3b3b3',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >

              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1.5-.866zM16 4.732l4 2.31V20h-4V4.732zM8 3a1 1 0 0 0-1 1v16a1 1 0 0 0 2 0V4a1 1 0 0 0-1-1z"/>
              </svg>
              <span>Your Library</span>
            </button>

            {/* Back to World */}
            <button
              onClick={onBackToWorld}
              style={{
                border: 'none',
                background: 'transparent',
                color: '#1ed760',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                fontSize: '11px',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              <span style={{ fontSize: '15px' }}>↩</span>
              <span>World</span>
            </button>
          </div>
        </div>
      )}

      {/* VISIONOS GESTURE-DRIVEN FULL PLAYER MODAL */}
      <SpotifyFullPlayerModal
        isOpen={mobileNowPlayingOpen}
        onClose={() => setMobileNowPlayingOpen(false)}
      />

    {/* CREATE PLAYLIST MODAL */}
    <CreatePlaylistModal
      isOpen={isCreatePlaylistOpen}
      onClose={() => setIsCreatePlaylistOpen(false)}
      onCreated={(newPl) => {
        setActivePlaylist(newPl)
        setActiveView('playlist')
      }}
    />

    {/* ADD TO PLAYLIST MODAL */}
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

