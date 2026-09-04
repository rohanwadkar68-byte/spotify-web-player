import { useMusicPlayer } from '../../context/MusicPlayerContext.jsx'
import { SPOTIFY_PLAYLISTS, DEFAULT_ALBUM_COVER } from '../../data/musicLibrary.js'

export default function SpotifySidebar({ activeView, setActiveView, onSelectPlaylist, onOpenCreatePlaylist }) {
  const { likedIds, customPlaylists } = useMusicPlayer()

  return (
    <aside style={{
      width: 260,
      background: '#000000',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      padding: '8px 0 8px 8px',
      flexShrink: 0,
      height: '100%',
      userSelect: 'none'
    }}>
      {/* TOP: Brand & Primary Links */}
      <div style={{
        background: '#121212',
        borderRadius: 8,
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20
      }}>
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#1ed760">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.309c-.217.357-.681.472-1.038.254-2.846-1.74-6.429-2.133-10.648-1.17-.409.094-.816-.164-.91-.572-.094-.408.163-.815.572-.91 4.624-1.057 8.577-.611 11.77 1.341.356.218.471.682.254 1.057zm1.469-3.267c-.274.444-.858.586-1.302.312-3.257-2.002-8.223-2.583-12.076-1.413-.501.152-1.033-.135-1.185-.636-.152-.501.135-1.033.636-1.185 4.408-1.338 9.882-.693 13.615 1.621.444.275.586.859.312 1.301zm.127-3.411c-3.906-2.319-10.347-2.533-14.073-1.401-.6.182-1.237-.162-1.419-.762-.182-.6.162-1.237.762-1.419 4.279-1.299 11.393-1.043 15.892 1.628.539.32.715 1.02.396 1.558-.32.539-1.02.715-1.558.396z"/>
          </svg>
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
            Spotify
          </span>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            onClick={() => setActiveView('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              cursor: 'pointer',
              color: activeView === 'home' ? '#ffffff' : '#b3b3b3',
              fontSize: '14px',
              fontWeight: 700,
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff' }}
            onMouseLeave={(e) => { if (activeView !== 'home') e.currentTarget.style.color = '#b3b3b3' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              {activeView === 'home' ? (
                <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33z"/>
              ) : (
                <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33A2 2 0 0 1 22 7.577V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-5h-3v5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z"/>
              )}
            </svg>
            <span>Home</span>
          </div>

          <div
            onClick={() => setActiveView('search')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              cursor: 'pointer',
              color: activeView === 'search' ? '#ffffff' : '#b3b3b3',
              fontSize: '14px',
              fontWeight: 700,
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff' }}
            onMouseLeave={(e) => { if (activeView !== 'search') e.currentTarget.style.color = '#b3b3b3' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              {activeView === 'search' ? (
                <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 1 0 1.414-1.414l-4.344-4.344a9.157 9.157 0 0 0 2.077-5.816c0-5.14-4.226-9.28-9.407-9.28z"/>
              ) : (
                <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 1 0 1.414-1.414l-4.344-4.344a9.157 9.157 0 0 0 2.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.279 7.407-7.279s7.407 3.273 7.407 7.279-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.279z"/>
              )}
            </svg>
            <span>Search</span>
          </div>
        </div>
      </div>

      {/* BOTTOM: Your Library */}
      <div style={{
        background: '#121212',
        borderRadius: 8,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Library Header with + Create Button */}
        <div style={{
          padding: '16px 16px 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#b3b3b3'
        }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              cursor: 'pointer',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#b3b3b3' }}
            onClick={() => setActiveView('library')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1.5-.866zM16 4.732l4 2.31V20h-4V4.732zM8 3a1 1 0 0 0-1 1v16a1 1 0 0 0 2 0V4a1 1 0 0 0-1-1z"/>
            </svg>
            <span style={{ fontSize: '14px', fontWeight: 700 }}>Your Library</span>
          </div>

          <button
            onClick={onOpenCreatePlaylist}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#b3b3b3',
              cursor: 'pointer',
              padding: 6,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            title="Create playlist"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ffffff'
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#b3b3b3'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1z"/>
            </svg>
          </button>
        </div>

        {/* Playlists Scroll Area */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0 8px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          scrollbarWidth: 'thin'
        }}>
          {/* Liked Songs Item */}
          <div
            onClick={() => {
              if (onSelectPlaylist) onSelectPlaylist({ id: 'liked', title: 'Liked Songs' })
              setActiveView('playlist')
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '8px 10px',
              borderRadius: 6,
              cursor: 'pointer',
              background: activeView === 'playlist' ? '#242424' : 'transparent',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => { if (activeView !== 'playlist') e.currentTarget.style.background = '#1a1a1a' }}
            onMouseLeave={(e) => { if (activeView !== 'playlist') e.currentTarget.style.background = 'transparent' }}
          >
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 4,
              background: 'linear-gradient(135deg, #450af5, #8e8ee5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>

            <div style={{ minWidth: 0 }}>
              <div style={{
                fontSize: '14px',
                fontWeight: 700,
                color: activeView === 'playlist' ? '#1ed760' : '#ffffff',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                Liked Songs
              </div>
              <div style={{ fontSize: '12px', color: '#b3b3b3' }}>
                Playlist • {likedIds.length} songs
              </div>
            </div>
          </div>

          {/* User's Custom Playlists */}
          {customPlaylists && customPlaylists.map((pl) => (
            <div
              key={pl.id}
              onClick={() => {
                if (onSelectPlaylist) onSelectPlaylist(pl)
                setActiveView('playlist')
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '8px 10px',
                borderRadius: 6,
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#1a1a1a' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
            >
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 4,
                background: pl.gradient || '#282828',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                flexShrink: 0
              }}>
                {pl.emoji || '🎵'}
              </div>

              <div style={{ minWidth: 0 }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#ffffff',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {pl.title}
                </div>
                <div style={{ fontSize: '12px', color: '#b3b3b3' }}>
                  Playlist • {pl.songIds.length} songs
                </div>
              </div>
            </div>
          ))}


          {/* Curated Playlists */}
          {SPOTIFY_PLAYLISTS.map((pl) => (
            <div
              key={pl.id}
              onClick={() => {
                if (onSelectPlaylist) onSelectPlaylist(pl)
                setActiveView('playlist')
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '8px 10px',
                borderRadius: 6,
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#1a1a1a' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
            >
              <img
                src={pl.cover}
                alt=""
                style={{ width: 48, height: 48, borderRadius: 4, objectFit: 'cover', flexShrink: 0 }}
                onError={(e) => { e.currentTarget.src = DEFAULT_ALBUM_COVER }}
              />

              <div style={{ minWidth: 0 }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#ffffff',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {pl.title}
                </div>
                <div style={{ fontSize: '12px', color: '#b3b3b3' }}>
                  Playlist • Spotify
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
