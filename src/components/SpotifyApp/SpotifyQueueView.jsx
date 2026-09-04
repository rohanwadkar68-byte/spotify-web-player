import { useMusicPlayer } from '../../context/MusicPlayerContext.jsx'
import { DEFAULT_ALBUM_COVER } from '../../data/musicLibrary.js'

export default function SpotifyQueueView() {
  const { currentTrack, queue, currentIndex, playTrack, isLiked, toggleLike } = useMusicPlayer()

  const nextTracks = queue.slice(currentIndex + 1)

  return (
    <div style={{ padding: '0 24px 80px', maxWidth: 840 }}>
      <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#ffffff', margin: '0 0 24px' }}>
        Queue
      </h1>

      {/* NOW PLAYING */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#b3b3b3', margin: '0 0 12px' }}>
          Now playing
        </h3>
        {currentTrack && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 16px',
            background: 'rgba(255,255,255,0.08)',
            borderRadius: 6
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <img
                src={currentTrack.image}
                alt=""
                style={{ width: 48, height: 48, borderRadius: 4, objectFit: 'cover' }}
                onError={(e) => { e.currentTarget.src = DEFAULT_ALBUM_COVER }}
              />
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#1ed760' }}>
                  {currentTrack.title}
                </div>
                <div style={{ fontSize: '13px', color: '#b3b3b3' }}>
                  {currentTrack.artist}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <button
                onClick={() => toggleLike(currentTrack.id)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: isLiked(currentTrack.id) ? '#1ed760' : '#b3b3b3' }}
              >
                {isLiked(currentTrack.id) ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1ed760">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b3b3b3" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                )}
              </button>
              <span style={{ fontSize: '13px', color: '#b3b3b3' }}>
                {currentTrack.duration || '3:30'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* NEXT UP */}
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#b3b3b3', margin: '0 0 12px' }}>
          Next up (Autoplay)
        </h3>

        {nextTracks.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {nextTracks.map((song, i) => (
              <div
                key={song.id + '-' + i}
                onClick={() => playTrack(song, queue)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 16px',
                  borderRadius: 4,
                  cursor: 'pointer',
                  transition: 'background 0.15s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ fontSize: '14px', color: '#b3b3b3', width: 20 }}>
                    {i + 1}
                  </span>
                  <img
                    src={song.image}
                    alt=""
                    style={{ width: 40, height: 40, borderRadius: 4, objectFit: 'cover' }}
                    onError={(e) => { e.currentTarget.src = DEFAULT_ALBUM_COVER }}
                  />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff' }}>
                      {song.title}
                    </div>
                    <div style={{ fontSize: '12px', color: '#b3b3b3' }}>
                      {song.artist}
                    </div>
                  </div>
                </div>

                <span style={{ fontSize: '13px', color: '#b3b3b3' }}>
                  {song.duration || '3:30'}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ color: '#b3b3b3', fontSize: '14px', padding: '20px 0' }}>
            Queue empty. Pick any song or playlist to queue more tracks!
          </div>
        )}
      </div>
    </div>
  )
}
