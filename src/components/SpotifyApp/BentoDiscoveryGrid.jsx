import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useMusicPlayer, detectSongMood } from '../../context/MusicPlayerContext.jsx'
import { CURATED_SONGS, SPOTIFY_PLAYLISTS, DEFAULT_ALBUM_COVER } from '../../data/musicLibrary.js'
import EqualizerBars from './EqualizerBars.jsx'

export default function BentoDiscoveryGrid({
  onSelectPlaylist,
  onOpenCreatePlaylist,
  onOpenAddToPlaylist
}) {
  const {
    currentTrack,
    isPlaying,
    playTrack,
    likedIds,
    toggleLike,
    isLiked,
    queue,
    currentIndex,
    soundEffectMode,
    setSoundEffectMode,
    customPlaylists,
    ambientColor
  } = useMusicPlayer()

  const [activeMoodFilter, setActiveMoodFilter] = useState('all')
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const moods = [
    { id: 'sad', label: '🌙 2 AM Sad', color: '#2563eb' },
    { id: 'reels_viral', label: '🔥 Reels Viral', color: '#e1306c' },
    { id: 'romantic', label: '💖 Romantic', color: '#be185d' },
    { id: 'lofi', label: '☕ Cozy Lo-Fi', color: '#1e40af' },
    { id: 'punjabi', label: '💥 Punjabi Hype', color: '#ea580c' }
  ]

  // Filter songs according to mood filter
  const filteredSongs = activeMoodFilter === 'all'
    ? CURATED_SONGS
    : CURATED_SONGS.filter((s) => detectSongMood(s) === activeMoodFilter)

  // Determine Up Next track in queue
  const upNextTrack = queue && queue.length > 0 && currentIndex + 1 < queue.length
    ? queue[currentIndex + 1]
    : CURATED_SONGS.find((s) => s.id !== currentTrack?.id) || CURATED_SONGS[1]

  const viralSpotlightSong = CURATED_SONGS.find((s) => s.theme === 'reels_viral') || CURATED_SONGS[0]

  // All Playlists (Custom + Curated)
  const allPlaylists = [
    ...(customPlaylists || []),
    ...SPOTIFY_PLAYLISTS
  ]

  return (
    <section style={{ margin: '10px 0 40px' }}>
      {/* SECTION 1: Mood Filter Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <div>
          <h2 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 900, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>
            Spatial Hub & Playlists
          </h2>
          <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.55)', margin: '2px 0 0' }}>
            All your playlists, liked vault, and mood intelligence
          </p>
        </div>

        {/* Mood Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, overflowX: 'auto', maxWidth: '100%', padding: '4px 0', WebkitOverflowScrolling: 'touch' }}>
          <button
            type="button"
            onClick={() => setActiveMoodFilter('all')}
            style={{
              padding: '6px 12px',
              borderRadius: 999,
              fontSize: '11px',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              background: activeMoodFilter === 'all' ? '#ffffff' : 'rgba(255, 255, 255, 0.08)',
              color: activeMoodFilter === 'all' ? '#000000' : 'rgba(255, 255, 255, 0.65)'
            }}
          >
            All Tracks
          </button>
          {moods.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setActiveMoodFilter(m.id)}
              style={{
                padding: '6px 12px',
                borderRadius: 999,
                fontSize: '11px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                background: activeMoodFilter === m.id ? m.color : 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                boxShadow: activeMoodFilter === m.id ? `0 0 14px ${m.color}60` : 'none'
              }}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 2: Bento Grid Tiles (Liked Vault, Reels Feature, AI Next, Spatial Lab) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
          gap: 16,
          marginBottom: 32
        }}
      >
        {/* TILE 1: LIKED SONGS VAULT (Iconic Purple Gradient Box) */}
        <div
          data-testid="liked-vault-card"
          className="bento-card"
          onClick={() => onSelectPlaylist({ id: 'liked', title: 'Liked Songs' })}
          style={{
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, rgba(69, 10, 245, 0.3) 0%, rgba(142, 142, 229, 0.2) 100%)',
            border: '1px solid rgba(142, 142, 229, 0.35)',
            cursor: 'pointer',
            minHeight: 160
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span
                style={{
                  padding: '3px 10px',
                  borderRadius: 999,
                  fontSize: '10px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  background: 'rgba(69, 10, 245, 0.45)',
                  color: '#ffffff'
                }}
              >
                💖 LIKED SONGS VAULT
              </span>
              <span style={{ fontSize: '11px', color: '#c7d2fe', fontWeight: 800 }}>
                {likedIds.length} Songs
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '8px 0' }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #450af5, #8e8ee5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px rgba(69, 10, 245, 0.5)',
                  flexShrink: 0
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>

              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 900, color: '#ffffff', margin: 0 }}>
                  Liked Songs
                </h3>
                <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.65)', margin: '2px 0 0' }}>
                  Tap to open collection
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', fontWeight: 700, color: '#1ed760', marginTop: 8 }}>
            <span>Play All Favorites →</span>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: '#1ed760',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000000',
                boxShadow: '0 4px 12px rgba(30, 215, 96, 0.4)'
              }}
            >
              ▶
            </div>
          </div>
        </div>

        {/* TILE 2: Instagram Reels Viral Feature */}
        <div
          className="bento-card"
          style={{
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, rgba(225, 48, 108, 0.18) 0%, rgba(20, 20, 26, 0.7) 100%)',
            border: '1px solid rgba(225, 48, 108, 0.28)',
            minHeight: 160
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span
                style={{
                  padding: '3px 10px',
                  borderRadius: 999,
                  fontSize: '10px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  background: 'rgba(225, 48, 108, 0.25)',
                  color: '#ff4d8d'
                }}
              >
                🔥 REELS VIRAL
              </span>
              <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)' }}>
                Trending
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0' }}>
              <img
                src={viralSpotlightSong.image || DEFAULT_ALBUM_COVER}
                alt=""
                style={{ width: 52, height: 52, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }}
                onError={(e) => { e.currentTarget.src = DEFAULT_ALBUM_COVER }}
              />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {viralSpotlightSong.title}
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.65)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {viralSpotlightSong.artist}
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => playTrack(viralSpotlightSong)}
            style={{
              width: '100%',
              padding: '9px',
              borderRadius: 12,
              border: 'none',
              background: 'linear-gradient(135deg, #e1306c, #fd1d1d)',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              cursor: 'pointer'
            }}
          >
            <span>▶ Play Viral Trend</span>
          </button>
        </div>

        {/* TILE 3: Spatial Studio Radar Status */}
        <div
          className="bento-card"
          style={{
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(20, 20, 26, 0.7) 100%)',
            border: '1px solid rgba(6, 182, 212, 0.25)',
            minHeight: 160
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span
                style={{
                  padding: '3px 10px',
                  borderRadius: 999,
                  fontSize: '10px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  background: 'rgba(6, 182, 212, 0.25)',
                  color: '#38bdf8'
                }}
              >
                🎧 8D SPATIAL & AUDIO
              </span>
            </div>

            <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.8)', margin: '6px 0 10px' }}>
              Mode: <strong style={{ color: '#38bdf8', textTransform: 'capitalize' }}>{soundEffectMode.replace('_', ' ')}</strong>
            </p>

            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setSoundEffectMode('8d_spatial')}
                style={{
                  padding: '5px 10px',
                  borderRadius: 8,
                  fontSize: '10px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  background: soundEffectMode === '8d_spatial' ? '#06b6d4' : 'rgba(255,255,255,0.08)',
                  color: '#ffffff'
                }}
              >
                🎧 8D Orbit
              </button>
              <button
                type="button"
                onClick={() => setSoundEffectMode('slowed_reverb')}
                style={{
                  padding: '5px 10px',
                  borderRadius: 8,
                  fontSize: '10px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  background: soundEffectMode === 'slowed_reverb' ? '#8b5cf6' : 'rgba(255,255,255,0.08)',
                  color: '#ffffff'
                }}
              >
                🌙 Slowed
              </button>
              <button
                type="button"
                onClick={() => setSoundEffectMode('normal')}
                style={{
                  padding: '5px 10px',
                  borderRadius: 8,
                  fontSize: '10px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  background: soundEffectMode === 'normal' ? '#ffffff' : 'rgba(255,255,255,0.08)',
                  color: soundEffectMode === 'normal' ? '#000000' : '#ffffff'
                }}
              >
                ✨ Studio
              </button>
            </div>
          </div>

          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: 8 }}>
            360° dynamic binaural orbit for headphones.
          </div>
        </div>
      </div>

      {/* SECTION 3: ALL PLAYLISTS CAROUSEL / GRID */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              Curated & Custom Playlists
            </h3>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', margin: '2px 0 0' }}>
              Tap any playlist to explore all songs
            </p>
          </div>

          {onOpenCreatePlaylist && (
            <button
              type="button"
              onClick={onOpenCreatePlaylist}
              style={{
                padding: '6px 14px',
                borderRadius: 999,
                fontSize: '11px',
                fontWeight: 800,
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.08)',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 5
              }}
            >
              <span>+ Create Playlist</span>
            </button>
          )}
        </div>

        {/* Horizontal Scrollable or Grid Playlists */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 160px), 1fr))',
            gap: 14
          }}
        >
          {allPlaylists.map((pl) => (
            <div
              key={pl.id}
              data-testid={`playlist-card-${pl.id}`}
              className="bento-card"
              onClick={() => onSelectPlaylist(pl)}
              style={{
                padding: 12,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 8
              }}
            >
              <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', borderRadius: 12, overflow: 'hidden' }}>
                {pl.isCustom ? (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      background: pl.gradient || 'linear-gradient(135deg, #1ed760, #1db954)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '36px'
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
                {/* Play Badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: '#1ed760',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#000000',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
                    fontSize: '12px'
                  }}
                >
                  ▶
                </div>
              </div>

              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {pl.title}
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 2 }}>
                  {pl.description || (pl.songIds ? `${pl.songIds.length} tracks` : 'Playlist')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: ALL SONGS STREAM (with Like ♥ & Add to Playlist + buttons) */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
            {activeMoodFilter === 'all' ? 'All Songs Stream' : `${activeMoodFilter.toUpperCase()} Tracks`}
          </h3>
          <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)' }}>
            {filteredSongs.length} Tracks Available
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {filteredSongs.map((track, idx) => {
            const isThisPlaying = currentTrack?.id === track.id && isPlaying
            const trackLiked = isLiked(track.id)

            return (
              <div
                key={track.id}
                className="bento-card"
                onClick={() => playTrack(track, filteredSongs)}
                style={{
                  padding: '10px 14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                  borderRadius: 14,
                  background: isThisPlaying ? 'rgba(30, 215, 96, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                  border: isThisPlaying ? '1px solid rgba(30, 215, 96, 0.35)' : '1px solid rgba(255, 255, 255, 0.06)'
                }}
              >
                {/* Left: Thumbnail & Song Meta */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0, flex: 1 }}>
                  <div style={{ position: 'relative', width: 44, height: 44, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
                    <img
                      src={track.image || DEFAULT_ALBUM_COVER}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.currentTarget.src = DEFAULT_ALBUM_COVER }}
                    />
                    {isThisPlaying && (
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <EqualizerBars isPlaying={true} size="small" />
                      </div>
                    )}
                  </div>

                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: isThisPlaying ? '#1ed760' : '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {track.title}
                    </div>
                    <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 2 }}>
                      {track.artist}
                    </div>
                  </div>
                </div>

                {/* Right: Like Heart Button & Add to Playlist */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', minWidth: 32, textAlign: 'right' }}>
                    {track.duration || '3:30'}
                  </span>

                  {/* Add to Playlist button */}
                  {onOpenAddToPlaylist && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        onOpenAddToPlaylist(track)
                      }}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        color: 'rgba(255, 255, 255, 0.45)',
                        cursor: 'pointer',
                        padding: 6,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%'
                      }}
                      title="Add to Playlist"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                  )}

                  {/* Like Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleLike(track.id)
                    }}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      padding: 6,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    aria-label={trackLiked ? 'Unlike song' : 'Like song'}
                    data-testid={`like-button-${track.id}`}
                    title={trackLiked ? 'Liked' : 'Like song'}
                  >
                    {trackLiked ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#1ed760">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
