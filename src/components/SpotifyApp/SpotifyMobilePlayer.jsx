import { useMusicPlayer } from '../../context/MusicPlayerContext.jsx'
import { DEFAULT_ALBUM_COVER } from '../../data/musicLibrary.js'
import EqualizerBars from './EqualizerBars.jsx'

export default function SpotifyMobilePlayer({ onOpenFullNowPlaying }) {
  const { currentTrack, isPlaying, currentTime, duration, togglePlay, toggleLike, isLiked } = useMusicPlayer()

  if (!currentTrack) return null

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0
  const liked = isLiked(currentTrack.id)

  return (
    <div
      onClick={onOpenFullNowPlaying}
      style={{
        margin: '0 8px 6px',
        height: 56,
        background: '#282828',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 12px 0 8px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        cursor: 'pointer',
        userSelect: 'none'
      }}
    >
      {/* Bottom Progress Line */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        background: 'rgba(255,255,255,0.15)'
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          background: '#ffffff',
          transform: `scaleX(${progressPercent / 100})`,
          transformOrigin: 'left',
          transition: 'transform 0.25s linear'
        }} />
      </div>

      {/* Left: Thumbnail & Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, flex: 1, paddingRight: 8 }}>
        <img
          src={currentTrack.image}
          alt=""
          style={{ width: 40, height: 40, borderRadius: 4, objectFit: 'cover', flexShrink: 0 }}
          onError={(e) => { e.currentTarget.src = DEFAULT_ALBUM_COVER }}
        />
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#ffffff',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {currentTrack.title}
            </span>
            {isPlaying && <EqualizerBars isPlaying={isPlaying} size="small" />}
          </div>
          <div style={{
            fontSize: '11px',
            color: '#b3b3b3',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}>
            <span>{currentTrack.artist}</span>
            <span style={{
              fontSize: '9px',
              fontWeight: 800,
              color: '#1ed760',
              background: 'rgba(30, 215, 96, 0.12)',
              borderRadius: 3,
              padding: '1px 4px',
              letterSpacing: '0.02em'
            }}>
              ✨ Peace EQ
            </span>
          </div>
        </div>
      </div>

      {/* Right: Like & Play Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        {/* Heart Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleLike(currentTrack.id)
          }}
          style={{
            border: 'none',
            background: 'transparent',
            padding: 6,
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          {liked ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#1ed760">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b3b3b3" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          )}
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            togglePlay()
          }}
          style={{
            border: 'none',
            background: 'transparent',
            color: '#ffffff',
            padding: 6,
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          {isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
