import { motion, AnimatePresence } from 'framer-motion'
import { useMusicPlayer } from '../../context/MusicPlayerContext.jsx'
import { DEFAULT_ALBUM_COVER } from '../../data/musicLibrary.js'

export default function AddToPlaylistModal({ isOpen, onClose, song, onOpenCreatePlaylist }) {
  const { customPlaylists, addSongToPlaylist, removeSongFromPlaylist } = useMusicPlayer()

  if (!isOpen || !song) return null

  const handleToggle = (playlist) => {
    const isInside = playlist.songIds.includes(song.id)
    if (isInside) {
      removeSongFromPlaylist(playlist.id, song.id)
    } else {
      addSongToPlaylist(playlist.id, song.id)
    }
  }

  return (
    <AnimatePresence>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999999,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: '#282828',
            borderRadius: 14,
            padding: 24,
            width: '100%',
            maxWidth: 400,
            color: '#ffffff',
            boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            maxHeight: '85vh',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>Add to Playlist</h2>
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#b3b3b3',
                fontSize: '20px',
                cursor: 'pointer',
                padding: 4
              }}
            >
              ✕
            </button>
          </div>

          {/* Target Song Info */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '10px 12px',
            background: '#1a1a1a',
            borderRadius: 8
          }}>
            <img
              src={song.image || DEFAULT_ALBUM_COVER}
              alt=""
              style={{ width: 44, height: 44, borderRadius: 4, objectFit: 'cover' }}
              onError={(e) => { e.currentTarget.src = DEFAULT_ALBUM_COVER }}
            />
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {song.title}
              </div>
              <div style={{ fontSize: '12px', color: '#b3b3b3', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {song.artist}
              </div>
            </div>
          </div>

          {/* New Playlist Shortcut Button */}
          <button
            onClick={() => {
              onClose()
              onOpenCreatePlaylist && onOpenCreatePlaylist()
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '10px',
              borderRadius: 8,
              background: 'rgba(255,255,255,0.08)',
              border: '1px dashed rgba(255,255,255,0.2)',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
          >
            <span style={{ fontSize: '16px' }}>➕</span>
            <span>New Playlist</span>
          </button>

          {/* Playlists List */}
          <div style={{
            overflowY: 'auto',
            maxHeight: 240,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            paddingRight: 4
          }}>
            {customPlaylists.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px 0', color: '#b3b3b3', fontSize: '13px' }}>
                No custom playlists yet. Tap "New Playlist" above to create one!
              </div>
            ) : (
              customPlaylists.map((pl) => {
                const isInside = pl.songIds.includes(song.id)
                return (
                  <div
                    key={pl.id}
                    data-playlist-row={pl.id}
                    onClick={() => handleToggle(pl)}
                    style={{

                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      borderRadius: 6,
                      background: isInside ? 'rgba(30,215,96,0.12)' : '#1e1e1e',
                      border: isInside ? '1px solid rgba(30,215,96,0.4)' : '1px solid transparent',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                      <div style={{
                        width: 36,
                        height: 36,
                        borderRadius: 4,
                        background: pl.gradient || '#333',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        flexShrink: 0
                      }}>
                        {pl.emoji || '🎵'}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {pl.title}
                        </div>
                        <div style={{ fontSize: '11px', color: '#b3b3b3' }}>
                          {pl.songIds.length} songs
                        </div>
                      </div>
                    </div>

                    {/* Checkbox Icon */}
                    <div style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: isInside ? '#1ed760' : 'transparent',
                      border: isInside ? 'none' : '2px solid #777',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#000000',
                      fontSize: '13px',
                      fontWeight: 900,
                      flexShrink: 0
                    }}>
                      {isInside && '✓'}
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Done Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
            <button
              onClick={onClose}
              style={{
                background: '#1ed760',
                color: '#000000',
                border: 'none',
                borderRadius: 999,
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                padding: '8px 24px'
              }}
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
