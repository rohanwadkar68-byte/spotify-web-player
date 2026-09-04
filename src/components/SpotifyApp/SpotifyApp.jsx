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

      {/* MOBILE FULL-SCREEN NOW PLAYING OVERLAY */}
      <AnimatePresence>
        {isMobile && mobileNowPlayingOpen && currentTrack && (
          <SpotifyErrorBoundary onReset={() => setMobileNowPlayingOpen(false)}>
            <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 240 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999999,
              background: 'linear-gradient(to bottom, #2b1154 0%, #121212 65%)',
              display: 'flex',
              flexDirection: 'column',
              padding: '20px 24px 32px',
              color: '#ffffff'
            }}
          >
            {/* Top Bar with Down Chevron */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <button
                onClick={() => setMobileNowPlayingOpen(false)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: '#ffffff',
                  fontSize: '24px',
                  cursor: 'pointer'
                }}
              >
                ⌄
              </button>
              <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#b3b3b3' }}>
                PLAYING FROM PLAYLIST
              </span>
              <div style={{ width: 24 }} />
            </div>

            {/* Album Cover */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
              <img
                src={currentTrack.image}
                alt=""
                style={{
                  width: '75vw',
                  maxWidth: 290,
                  aspectRatio: '1/1',
                  borderRadius: 8,
                  objectFit: 'cover',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.6)'
                }}
                onError={(e) => { e.currentTarget.src = DEFAULT_ALBUM_COVER }}
              />
            </div>

            {/* Song Title & Like */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <div style={{ minWidth: 0, flex: 1, paddingRight: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <h2 style={{
                    fontSize: '20px',
                    fontWeight: 900,
                    margin: '0 0 4px',
                    color: '#ffffff',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {currentTrack.title}
                  </h2>
                  {isPlaying && <EqualizerBars isPlaying={isPlaying} size="large" />}
                </div>
                <div style={{ fontSize: '14px', color: '#b3b3b3', fontWeight: 500 }}>
                  {currentTrack.artist}
                </div>
              </div>

              <button
                onClick={() => toggleLike(currentTrack.id)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 4 }}
              >
                {isLiked(currentTrack.id) ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#1ed760">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                )}
              </button>
            </div>

            {/* Scrubber */}
            <div style={{ marginBottom: 20 }}>
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={(e) => seekTo(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#1ed760', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#b3b3b3', marginTop: 4 }}>
                <span>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60) < 10 ? '0' : ''}{Math.floor(currentTime % 60)}</span>
                <span>{Math.floor(duration / 60)}:{Math.floor(duration % 60) < 10 ? '0' : ''}{Math.floor(duration % 60)}</span>
              </div>
            </div>

            {/* Play Controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginBottom: 24 }}>
              <button
                onClick={prevTrack}
                style={{ border: 'none', background: 'transparent', color: '#ffffff', cursor: 'pointer', fontSize: '24px' }}
              >
                ⏮
              </button>

              <button
                onClick={togglePlay}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: '#ffffff',
                  color: '#000000',
                  border: 'none',
                  fontSize: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>

              <button
                onClick={nextTrack}
                style={{ border: 'none', background: 'transparent', color: '#ffffff', cursor: 'pointer', fontSize: '24px' }}
              >
                ⏭
              </button>
            </div>

            {/* Karaoke Lyrics Button */}
            <button
              onClick={() => {
                setMobileNowPlayingOpen(false)
                setActiveView('lyrics')
              }}
              style={{
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.1)',
                color: '#ffffff',
                padding: '12px',
                borderRadius: 12,
                fontWeight: 800,
                fontSize: '13px',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              Lyrics
            </button>
          </motion.div>
        </SpotifyErrorBoundary>
      )}
    </AnimatePresence>

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

