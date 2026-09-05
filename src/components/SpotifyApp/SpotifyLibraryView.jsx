import { useMusicPlayer } from '../../context/MusicPlayerContext.jsx'
import { SPOTIFY_PLAYLISTS, DEFAULT_ALBUM_COVER } from '../../data/musicLibrary.js'

export default function SpotifyLibraryView({ onSelectPlaylist, onOpenCreatePlaylist }) {
  const { likedIds, customPlaylists } = useMusicPlayer()

  return (
    <div style={{ padding: '0 16px 80px', display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Top Header with Create Playlist Button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(22px, 4vw, 30px)', fontWeight: 900, color: '#ffffff', margin: '0 0 4px' }}>
            Your Library
          </h1>
          <p style={{ fontSize: '13px', color: '#b3b3b3', margin: 0 }}>
            Playlists & saved songs
          </p>
        </div>

        <button
          onClick={onOpenCreatePlaylist}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: '#1ed760',
            color: '#000000',
            border: 'none',
            borderRadius: 999,
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(30,215,96,0.3)',
            transition: 'transform 0.15s'
          }}
        >
          <span style={{ fontSize: '16px' }}>➕</span>
          <span>Create</span>
        </button>
      </div>

      {/* Liked Songs Special Tile */}
      <div
        onClick={() => onSelectPlaylist && onSelectPlaylist({ id: 'liked', title: 'Liked Songs' })}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '12px 14px',
          background: 'linear-gradient(135deg, rgba(69, 10, 245, 0.4), rgba(142, 142, 229, 0.15))',
          border: '1px solid rgba(142, 142, 229, 0.3)',
          borderRadius: 10,
          cursor: 'pointer',
          transition: 'background 0.2s'
        }}
      >
        <div style={{
          width: 52,
          height: 52,
          borderRadius: 6,
          background: 'linear-gradient(135deg, #450af5, #8e8ee5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '22px',
          color: '#ffffff',
          boxShadow: '0 4px 12px rgba(69, 10, 245, 0.4)',
          flexShrink: 0
        }}>
          ♥
        </div>

        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', marginBottom: 2 }}>
            Liked Songs
          </div>
          <div style={{ fontSize: '12px', color: '#b3b3b3' }}>
            Playlist • {likedIds.length} songs
          </div>
        </div>
      </div>

      {/* USER'S CUSTOM PLAYLISTS */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
            Custom Playlists ({customPlaylists.length})
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 140px), 1fr))',
          gap: 12
        }}>
          {/* Create New Card */}
          <div
            onClick={onOpenCreatePlaylist}
            style={{
              background: '#181818',
              border: '2px dashed rgba(255,255,255,0.15)',
              borderRadius: 8,
              padding: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 160,
              cursor: 'pointer',
              gap: 8,
              transition: 'background 0.2s, border-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#222'
              e.currentTarget.style.borderColor = '#1ed760'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#181818'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
            }}
          >
            <div style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              color: '#1ed760'
            }}>
              ➕
            </div>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', textAlign: 'center' }}>
              New Playlist
            </span>
          </div>

          {/* Custom Playlists List */}
          {customPlaylists.map((pl) => (
            <div
              key={pl.id}
              data-testid={`custom-playlist-${pl.id}`}
              onClick={() => onSelectPlaylist && onSelectPlaylist(pl)}
              style={{
                background: '#181818',
                borderRadius: 8,
                padding: 12,
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#282828' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#181818' }}
            >
              <div style={{
                width: '100%',
                aspectRatio: '1/1',
                borderRadius: 6,
                background: pl.gradient || 'linear-gradient(135deg, #1ed760, #1db954)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '40px',
                marginBottom: 10,
                boxShadow: '0 4px 14px rgba(0,0,0,0.4)'
              }}>
                {pl.emoji || '🎵'}
              </div>

              <div style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: 2,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {pl.title}
              </div>
              <div style={{ fontSize: '11px', color: '#b3b3b3' }}>
                {pl.songIds.length} songs • By You
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CURATED PLAYLISTS */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', margin: '0 0 12px' }}>
          Featured Playlists
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 140px), 1fr))',
          gap: 12
        }}>
          {SPOTIFY_PLAYLISTS.map((pl) => (
            <div
              key={pl.id}
              data-testid={`featured-playlist-${pl.id}`}
              onClick={() => onSelectPlaylist && onSelectPlaylist(pl)}
              style={{
                background: '#181818',
                borderRadius: 8,
                padding: 12,
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#282828' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#181818' }}
            >
              <img
                src={pl.cover}
                alt=""
                style={{ width: '100%', aspectRatio: '1/1', borderRadius: 6, objectFit: 'cover', marginBottom: 10 }}
                onError={(e) => { e.currentTarget.src = DEFAULT_ALBUM_COVER }}
              />
              <div style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: 2,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {pl.title}
              </div>
              <div style={{ fontSize: '11px', color: '#b3b3b3' }}>
                Playlist • Spotify
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
