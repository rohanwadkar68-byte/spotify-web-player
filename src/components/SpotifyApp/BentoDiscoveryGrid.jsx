import { useState } from 'react'
import { motion } from 'framer-motion'
import { useMusicPlayer, detectSongMood } from '../../context/MusicPlayerContext.jsx'
import { CURATED_SONGS, SPOTIFY_PLAYLISTS, DEFAULT_ALBUM_COVER } from '../../data/musicLibrary.js'
import EqualizerBars from './EqualizerBars.jsx'

export default function BentoDiscoveryGrid({ onSelectPlaylist }) {
  const {
    currentTrack,
    isPlaying,
    playTrack,
    likedIds,
    queue,
    currentIndex,
    soundEffectMode,
    setSoundEffectMode,
    ambientColor
  } = useMusicPlayer()

  const [activeMoodFilter, setActiveMoodFilter] = useState('all')

  const moods = [
    { id: 'sad', label: '🌙 2 AM Sad', color: '#2563eb' },
    { id: 'reels_viral', label: '🔥 Reels Viral', color: '#e1306c' },
    { id: 'romantic', label: '💖 Romantic', color: '#be185d' },
    { id: 'lofi', label: '☕ Cozy Lo-Fi', color: '#1e40af' },
    { id: 'punjabi', label: '💥 Punjabi Hype', color: '#ea580c' }
  ]

  // Filter songs according to mood filter
  const filteredSongs = activeMoodFilter === 'all'
    ? CURATED_SONGS.slice(0, 8)
    : CURATED_SONGS.filter((s) => detectSongMood(s) === activeMoodFilter)

  // Determine Up Next track in queue
  const upNextTrack = queue && queue.length > 0 && currentIndex + 1 < queue.length
    ? queue[currentIndex + 1]
    : CURATED_SONGS.find((s) => s.id !== currentTrack?.id) || CURATED_SONGS[1]

  const viralSpotlightSong = CURATED_SONGS.find((s) => s.theme === 'reels_viral') || CURATED_SONGS[0]

  return (
    <section style={{ margin: '10px 0 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>
            Spatial Bento Hub
          </h2>
          <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.55)', margin: '4px 0 0' }}>
            Next-generation music discovery & smart sound intelligence
          </p>
        </div>

        {/* Mood Filter Pill Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, overflowX: 'auto', padding: '4px 0' }}>
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
              background: activeMoodFilter === 'all' ? '#ffffff' : 'rgba(255, 255, 255, 0.08)',
              color: activeMoodFilter === 'all' ? '#000000' : 'rgba(255, 255, 255, 0.65)'
            }}
          >
            All Hits
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

      {/* Bento Grid Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20
        }}
      >
        {/* TILE 1: Instagram Reels Viral Feature */}
        <div
          className="bento-card"
          style={{
            gridColumn: 'span 1',
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, rgba(225, 48, 108, 0.15) 0%, rgba(20, 20, 26, 0.7) 100%)',
            border: '1px solid rgba(225, 48, 108, 0.25)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
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
                🔥 REELS VIRAL SENSATION
              </span>
              <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)' }}>
                Trending #1
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '14px 0' }}>
              <img
                src={viralSpotlightSong.image || DEFAULT_ALBUM_COVER}
                alt=""
                style={{ width: 64, height: 64, borderRadius: 14, objectFit: 'cover', boxShadow: '0 8px 20px rgba(0,0,0,0.5)' }}
                onError={(e) => { e.currentTarget.src = DEFAULT_ALBUM_COVER }}
              />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {viralSpotlightSong.title}
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.65)', marginTop: 2 }}>
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
              padding: '11px',
              borderRadius: 14,
              border: 'none',
              background: 'linear-gradient(135deg, #e1306c, #fd1d1d)',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(225, 48, 108, 0.35)'
            }}
          >
            <span>▶ Play Viral Trend</span>
          </button>
        </div>

        {/* TILE 2: Spatial Studio Radar Status */}
        <div
          className="bento-card"
          style={{
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(20, 20, 26, 0.7) 100%)',
            border: '1px solid rgba(6, 182, 212, 0.25)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
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
                🎧 SPATIAL AUDIO RADAR
              </span>
              <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)' }}>
                360° HRTF
              </span>
            </div>

            <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.8)', margin: '10px 0 16px', lineHeight: 1.4 }}>
              Active Mode: <strong style={{ color: '#38bdf8', textTransform: 'capitalize' }}>{soundEffectMode.replace('_', ' ')}</strong>
            </p>

            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setSoundEffectMode('8d_spatial')}
                style={{
                  padding: '6px 12px',
                  borderRadius: 10,
                  fontSize: '11px',
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
                  padding: '6px 12px',
                  borderRadius: 10,
                  fontSize: '11px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  background: soundEffectMode === 'slowed_reverb' ? '#8b5cf6' : 'rgba(255,255,255,0.08)',
                  color: '#ffffff'
                }}
              >
                🌙 2 AM Slowed
              </button>
              <button
                type="button"
                onClick={() => setSoundEffectMode('normal')}
                style={{
                  padding: '6px 12px',
                  borderRadius: 10,
                  fontSize: '11px',
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

          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: 14 }}>
            Binaural panner orbits 360° continuously around listener ears.
          </div>
        </div>

        {/* TILE 3: Memory Capsule (Liked Songs Mix) */}
        <div
          className="bento-card"
          onClick={() => onSelectPlaylist({ id: 'liked', title: 'Liked Songs' })}
          style={{
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, rgba(69, 10, 245, 0.2) 0%, rgba(142, 142, 229, 0.15) 100%)',
            border: '1px solid rgba(142, 142, 229, 0.25)',
            cursor: 'pointer'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span
                style={{
                  padding: '3px 10px',
                  borderRadius: 999,
                  fontSize: '10px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  background: 'rgba(69, 10, 245, 0.35)',
                  color: '#a5b4fc'
                }}
              >
                💖 MEMORY CAPSULE
              </span>
              <span style={{ fontSize: '11px', color: '#a5b4fc', fontWeight: 700 }}>
                {likedIds.length} Saved
              </span>
            </div>

            <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#ffffff', margin: '8px 0 4px' }}>
              Sneha's Favorites
            </h3>
            <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
              Your personal heart-picked songs in crystal-clear master quality
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#1ed760' }}>
              Open Liked Vault →
            </span>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: '#1ed760',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000000',
                boxShadow: '0 4px 14px rgba(30, 215, 96, 0.4)'
              }}
            >
              ▶
            </div>
          </div>
        </div>

        {/* TILE 4: AI Smart Up Next Song Predictor */}
        <div
          className="bento-card"
          onClick={() => playTrack(upNextTrack)}
          style={{
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, rgba(30, 215, 96, 0.12) 0%, rgba(20, 20, 26, 0.7) 100%)',
            border: '1px solid rgba(30, 215, 96, 0.25)',
            cursor: 'pointer'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span
                style={{
                  padding: '3px 10px',
                  borderRadius: 999,
                  fontSize: '10px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  background: 'rgba(30, 215, 96, 0.2)',
                  color: '#1ed760'
                }}
              >
                ✨ AI UP NEXT PREDICTOR
              </span>
              <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)' }}>
                Mood Aligned
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '10px 0' }}>
              <img
                src={upNextTrack.image || DEFAULT_ALBUM_COVER}
                alt=""
                style={{ width: 52, height: 52, borderRadius: 12, objectFit: 'cover' }}
                onError={(e) => { e.currentTarget.src = DEFAULT_ALBUM_COVER }}
              />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {upNextTrack.title}
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>
                  {upNextTrack.artist}
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginTop: 10 }}>
            <span>Predicted to flow seamlessly</span>
            <span style={{ color: '#1ed760', fontWeight: 700 }}>Tap to Play Now</span>
          </div>
        </div>
      </div>

      {/* Mood Flow Song Stream Grid */}
      <div style={{ marginTop: 32 }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: 14 }}>
          {activeMoodFilter === 'all' ? 'Trending Tracks Stream' : `${activeMoodFilter.toUpperCase()} Tracks`}
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 14
          }}
        >
          {filteredSongs.map((track) => {
            const isThisPlaying = currentTrack?.id === track.id && isPlaying
            return (
              <div
                key={track.id}
                className="bento-card"
                onClick={() => playTrack(track)}
                style={{
                  padding: 14,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12
                }}
              >
                <div style={{ position: 'relative', width: 48, height: 48, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
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
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 2 }}>
                    {track.artist}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
