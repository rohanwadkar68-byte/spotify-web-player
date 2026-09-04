import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useMusicPlayer } from '../../context/MusicPlayerContext.jsx'
import { CURATED_SONGS, SPOTIFY_PLAYLISTS, DEFAULT_ALBUM_COVER } from '../../data/musicLibrary.js'
import EqualizerBars from './EqualizerBars.jsx'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

const LIVE_TRENDS_STORAGE_KEY = 'sneha_spotify_live_trends_v2'

const MOOD_PILLS = [
  { id: 'all', label: 'All', icon: '✨' },
  { id: 'sad', label: '🌙 2 AM Sad Reels', icon: '🌙' },
  { id: 'reels_viral', label: '🔥 Instagram Viral', icon: '🔥' },
  { id: 'romantic', label: '💖 Romantic', icon: '💖' },
  { id: 'lofi', label: '☕ Cozy Lo-Fi', icon: '☕' },
  { id: 'indie', label: '🎸 Indie & Acoustic', icon: '🎸' }
]

export default function SpotifyHomeView({ onSelectPlaylist, onOpenCreatePlaylist, onOpenAddToPlaylist }) {
  const { currentTrack, isPlaying, playTrack, togglePlay, recentlyPlayed, clearRecentlyPlayed, customPlaylists } = useMusicPlayer()
  const greeting = getGreeting()

  const [selectedMood, setSelectedMood] = useState('all')
  const [liveTrends, setLiveTrends] = useState(() => {
    try {
      const saved = localStorage.getItem(LIVE_TRENDS_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.tracks && parsed.tracks.length > 0) return parsed.tracks
      }
    } catch {}
    return []
  })

  // Dynamic live trend sync from JioSaavn Trending API (refreshes automatically)
  useEffect(() => {
    let isMounted = true
    async function syncLiveTrends() {
      try {
        const saved = localStorage.getItem(LIVE_TRENDS_STORAGE_KEY)
        if (saved) {
          const parsed = JSON.parse(saved)
          // If cached within 12 hours, keep using cache
          if (parsed.timestamp && Date.now() - parsed.timestamp < 12 * 60 * 60 * 1000 && parsed.tracks?.length > 0) {
            return
          }
        }

        const res = await fetch('https://jiosaavn-api-nine.vercel.app/api/playlists?id=47599074')
        if (!res.ok) return
        const data = await res.json()
        const songs = data?.data?.songs || []
        if (songs.length > 0 && isMounted) {
          const parsedTracks = songs.map((s) => {
            const dlUrl = s.downloadUrl?.[s.downloadUrl.length - 1]?.url || s.downloadUrl?.[0]?.url || s.url
            const imgUrl = s.image?.[s.image.length - 1]?.url || s.image?.[0]?.url || DEFAULT_ALBUM_COVER
            const artistName = s.artists?.primary?.[0]?.name || s.primaryArtists || 'Artist'
            return {
              id: 'live_' + (s.id || Math.random()),
              title: s.name || s.title || 'Trending Song',
              artist: artistName,
              image: imgUrl,
              url: dlUrl,
              theme: 'reels_viral',
              badge: '🔥 Live Trend',
              duration: s.duration ? Math.floor(s.duration / 60) + ':' + (s.duration % 60 < 10 ? '0' : '') + (s.duration % 60) : '3:15'
            }
          }).filter((t) => !!t.url).slice(0, 10)

          if (parsedTracks.length > 0) {
            setLiveTrends(parsedTracks)
            localStorage.setItem(LIVE_TRENDS_STORAGE_KEY, JSON.stringify({
              timestamp: Date.now(),
              tracks: parsedTracks
            }))
          }
        }
      } catch (err) {
        console.warn('Live trend sync skipped:', err)
      }
    }

    syncLiveTrends()
    return () => { isMounted = false }
  }, [])


  const quickAccessItems = [
    {
      id: 'liked',
      title: 'Liked Songs',
      type: 'playlist',
      gradient: 'linear-gradient(135deg, #450af5, #8e8ee5)',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#ffffff">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      )
    },
    ...CURATED_SONGS.slice(0, 5).map((song) => ({
      id: song.id,
      title: song.title,
      type: 'song',
      image: song.image,
      songObj: song
    }))
  ]

  return (
    <div style={{ padding: '0 16px 80px', display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Dynamic Greeting & Mood Filter Pills */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h1 style={{
          fontSize: 'clamp(22px, 4vw, 32px)',
          fontWeight: 900,
          color: '#ffffff',
          margin: 0,
          letterSpacing: '-0.03em'
        }}>
          {greeting}
        </h1>

        {/* Mood Filter Pills: Instant 1-tap vibe switcher */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          overflowX: 'auto',
          paddingBottom: 4,
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch'
        }}>
          {MOOD_PILLS.map((pill) => {
            const isSelected = selectedMood === pill.id
            return (
              <button
                key={pill.id}
                onClick={() => setSelectedMood(pill.id)}
                style={{
                  background: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.08)',
                  color: isSelected ? '#000000' : '#ffffff',
                  border: isSelected ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 999,
                  padding: '7px 14px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'all 0.15s ease',
                  boxShadow: isSelected ? '0 2px 8px rgba(255,255,255,0.2)' : 'none'
                }}
              >
                <span>{pill.icon}</span>
                <span>{pill.label}</span>
              </button>
            )
          })}
        </div>

        {/* 6 Quick-Access Cards Grid (Responsive 2 columns on mobile, 3 columns on desktop) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 150px), 1fr))',
          gap: 8
        }}>
          {quickAccessItems.map((item) => {
            const isThisPlaying = item.type === 'song' && currentTrack?.id === item.id && isPlaying
            return (
              <QuickAccessCard
                key={item.id}
                item={item}
                isThisPlaying={isThisPlaying}
                onPlay={() => {
                  if (item.type === 'song') {
                    if (currentTrack?.id === item.id) {
                      togglePlay()
                    } else {
                      playTrack(item.songObj, CURATED_SONGS)
                    }
                  } else {
                    onSelectPlaylist && onSelectPlaylist({ id: 'liked', title: 'Liked Songs' })
                  }
                }}
              />
            )
          })}
        </div>
      </div>

            {/* RECENTLY PLAYED SHELF */}
      {recentlyPlayed && recentlyPlayed.length > 0 && (
        <ShelfSection
          title="Recently Played"
          action={
            <button
              onClick={clearRecentlyPlayed}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#b3b3b3',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                padding: '4px 8px'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#b3b3b3' }}
            >
              Clear
            </button>
          }
        >
          {recentlyPlayed.slice(0, 8).map((song) => (
            <SongSquareCard
              key={song.id}
              song={song}
              isCurrent={currentTrack?.id === song.id}
              isPlaying={isPlaying}
              onOpenAddToPlaylist={onOpenAddToPlaylist}
              onPlay={() => {
                if (currentTrack?.id === song.id) togglePlay()
                else playTrack(song, recentlyPlayed)
              }}
            />

          ))}
        </ShelfSection>
      )}

      {/* SHELF 1: Custom Playlists by You */}
      <ShelfSection
        title={`Your Playlists (${customPlaylists.length})`}
        action={
          <button
            onClick={onOpenCreatePlaylist}
            style={{
              background: '#1ed760',
              border: 'none',
              borderRadius: 999,
              color: '#000000',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              padding: '6px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}
          >
            <span>➕</span>
            <span>New Playlist</span>
          </button>
        }
      >
        {/* Create New Card */}
        <div
          onClick={onOpenCreatePlaylist}
          style={{
            background: '#181818',
            border: '2px dashed rgba(255,255,255,0.2)',
            borderRadius: 6,
            padding: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 180,
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
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
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

        {customPlaylists.map((pl) => (
          <div
            key={pl.id}
            onClick={() => onSelectPlaylist && onSelectPlaylist(pl)}
            style={{
              background: '#181818',
              padding: 12,
              borderRadius: 6,
              cursor: 'pointer',
              transition: 'background 0.2s',
              position: 'relative'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#282828' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#181818' }}
          >
            <div style={{
              width: '100%',
              aspectRatio: '1/1',
              borderRadius: 4,
              background: pl.gradient || '#282828',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '42px',
              marginBottom: 10,
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}>
              {pl.emoji || '🎵'}
            </div>
            <div style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: 4,
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
      </ShelfSection>

      {/* SHELF: 🔥 Instagram Reels Viral Hits */}
      {(selectedMood === 'all' || selectedMood === 'reels_viral') && (
        <ShelfSection
          title="🔥 Instagram Reels Viral Hits"
          action={
            <span style={{ fontSize: '11px', color: '#e1306c', fontWeight: 700 }}>
              Trending Explore
            </span>
          }
        >
          {CURATED_SONGS.filter((s) => s.theme === 'reels_viral').map((song) => (
            <SongSquareCard
              key={song.id}
              song={song}
              isCurrent={currentTrack?.id === song.id}
              isPlaying={isPlaying}
              onOpenAddToPlaylist={onOpenAddToPlaylist}
              onPlay={() => {
                if (currentTrack?.id === song.id) togglePlay()
                else playTrack(song, CURATED_SONGS)
              }}
            />
          ))}
        </ShelfSection>
      )}

      {/* SHELF: 🌙 2 AM Broken Heart Reels */}
      {(selectedMood === 'all' || selectedMood === 'sad') && (
        <ShelfSection
          title="🌙 2 AM Broken Heart Reels"
          action={
            <span style={{ fontSize: '11px', color: '#60a5fa', fontWeight: 700 }}>
              Deep Soulful Indie
            </span>
          }
        >
          {CURATED_SONGS.filter((s) => s.theme === 'sad').map((song) => (
            <SongSquareCard
              key={song.id}
              song={song}
              isCurrent={currentTrack?.id === song.id}
              isPlaying={isPlaying}
              onOpenAddToPlaylist={onOpenAddToPlaylist}
              onPlay={() => {
                if (currentTrack?.id === song.id) togglePlay()
                else playTrack(song, CURATED_SONGS)
              }}
            />
          ))}
        </ShelfSection>
      )}

      {/* SHELF: ⚡ Live Instagram & Spotify Charts (Auto-Synced from Internet) */}
      {(selectedMood === 'all' || selectedMood === 'reels_viral') && liveTrends && liveTrends.length > 0 && (
        <ShelfSection
          title="⚡ Live Trends (Auto-Synced)"
          action={
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#1ed760', display: 'inline-block', boxShadow: '0 0 8px #1ed760' }} />
              <span style={{ fontSize: '11px', color: '#1ed760', fontWeight: 700 }}>
                Live Updated
              </span>
            </div>
          }
        >
          {liveTrends.map((song) => (
            <SongSquareCard
              key={song.id}
              song={song}
              isCurrent={currentTrack?.id === song.id}
              isPlaying={isPlaying}
              onOpenAddToPlaylist={onOpenAddToPlaylist}
              onPlay={() => {
                if (currentTrack?.id === song.id) togglePlay()
                else playTrack(song, liveTrends)
              }}
            />
          ))}
        </ShelfSection>
      )}

      {/* SHELF: Featured Curated Playlists */}
      {selectedMood === 'all' && (
        <ShelfSection title="Featured Playlists">
          {SPOTIFY_PLAYLISTS.map((pl) => (
            <PlaylistCard
              key={pl.id}
              playlist={pl}
              onClick={() => onSelectPlaylist && onSelectPlaylist(pl)}
            />
          ))}
        </ShelfSection>
      )}

      {/* SHELF: Romantic Melodies */}
      {(selectedMood === 'all' || selectedMood === 'romantic') && (
        <ShelfSection title="Romantic Melodies">
          {CURATED_SONGS.filter((s) => s.theme === 'romantic').map((song) => (
            <SongSquareCard
              key={song.id}
              song={song}
              isCurrent={currentTrack?.id === song.id}
              isPlaying={isPlaying}
              onOpenAddToPlaylist={onOpenAddToPlaylist}
              onPlay={() => {
                if (currentTrack?.id === song.id) togglePlay()
                else playTrack(song, CURATED_SONGS)
              }}
            />
          ))}
        </ShelfSection>
      )}

      {/* SHELF: Pop & Indie */}
      {(selectedMood === 'all' || selectedMood === 'indie') && (
        <ShelfSection title="Pop & Indie Favorites">
          {CURATED_SONGS.filter((s) => s.theme === 'pop' || s.theme === 'indie').map((song) => (
            <SongSquareCard
              key={song.id}
              song={song}
              isCurrent={currentTrack?.id === song.id}
              isPlaying={isPlaying}
              onOpenAddToPlaylist={onOpenAddToPlaylist}
              onPlay={() => {
                if (currentTrack?.id === song.id) togglePlay()
                else playTrack(song, CURATED_SONGS)
              }}
            />
          ))}
        </ShelfSection>
      )}

      {/* SHELF: Lo-Fi */}
      {(selectedMood === 'all' || selectedMood === 'lofi') && (
        <ShelfSection title="Lo-Fi & Relax">
          {CURATED_SONGS.filter((s) => s.theme === 'lofi').map((song) => (
            <SongSquareCard
              key={song.id}
              song={song}
              isCurrent={currentTrack?.id === song.id}
              isPlaying={isPlaying}
              onOpenAddToPlaylist={onOpenAddToPlaylist}
              onPlay={() => {
                if (currentTrack?.id === song.id) togglePlay()
                else playTrack(song, CURATED_SONGS)
              }}
            />
          ))}
        </ShelfSection>
      )}

    </div>
  )
}

function QuickAccessCard({ item, isThisPlaying, onPlay }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onPlay}
      style={{
        height: 52,
        background: hovered ? '#383838' : '#282828',
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'background 0.2s',
        position: 'relative'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: '100%', minWidth: 0, flex: 1, paddingRight: 6 }}>
        {item.gradient ? (
          <div style={{
            width: 52,
            height: 52,
            background: item.gradient,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            {item.icon}
          </div>
        ) : (
          <img
            src={item.image}
            alt=""
            style={{ width: 52, height: 52, objectFit: 'cover', flexShrink: 0 }}
            onError={(e) => { e.currentTarget.src = DEFAULT_ALBUM_COVER }}
          />
        )}
        <span style={{
          fontSize: '12px',
          fontWeight: 700,
          color: '#ffffff',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {item.title}
        </span>
      </div>

      {(hovered || isThisPlaying) && (
        <div style={{
          marginRight: 8,
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: '#1ed760',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#000000',
          flexShrink: 0,
          boxShadow: '0 4px 10px rgba(0,0,0,0.4)'
        }}>
          {isThisPlaying ? (
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style={{ marginLeft: 1 }}>
              <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"/>
            </svg>
          )}
        </div>
      )}
    </div>
  )
}

function ShelfSection({ title, children, action }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 0 14px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
          {title}
        </h2>
        {action}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 140px), 1fr))',
        gap: 14
      }}>
        {children}
      </div>
    </div>
  )
}


function PlaylistCard({ playlist, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        background: hovered ? '#282828' : '#181818',
        padding: 12,
        borderRadius: 6,
        cursor: 'pointer',
        transition: 'background 0.2s',
        position: 'relative'
      }}
    >
      <img
        src={playlist.cover}
        alt=""
        style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: 4, marginBottom: 10 }}
        onError={(e) => { e.currentTarget.src = DEFAULT_ALBUM_COVER }}
      />
      <div style={{
        fontSize: '13px',
        fontWeight: 700,
        color: '#ffffff',
        marginBottom: 4,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        {playlist.title}
      </div>
      <div style={{
        fontSize: '11px',
        color: '#b3b3b3',
        lineHeight: 1.3,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        {playlist.description}
      </div>
    </div>
  )
}

function SongSquareCard({ song, isCurrent, isPlaying, onPlay, onOpenAddToPlaylist }) {
  const [hovered, setHovered] = useState(false)
  const isThisPlaying = isCurrent && isPlaying

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onPlay}
      style={{
        background: hovered ? '#282828' : '#181818',
        padding: 12,
        borderRadius: 6,
        cursor: 'pointer',
        transition: 'background 0.2s',
        position: 'relative'
      }}
    >
      <div style={{ position: 'relative' }}>
        <img
          src={song.image}
          alt=""
          style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: 4, marginBottom: 10, display: 'block' }}
          onError={(e) => { e.currentTarget.src = DEFAULT_ALBUM_COVER }}
        />
        {/* Badge Chip */}
        {song.badge && (
          <div style={{
            position: 'absolute',
            top: 6,
            left: 6,
            background: (song.badge.includes('2 AM') || song.badge.includes('Sad') || song.badge.includes('Broken'))
              ? 'rgba(37, 99, 235, 0.9)'
              : (song.badge.includes('Reels') || song.badge.includes('Insta') || song.badge.includes('Trend'))
              ? 'rgba(225, 48, 108, 0.9)'
              : 'rgba(29, 185, 84, 0.9)',
            backdropFilter: 'blur(4px)',
            borderRadius: 4,
            padding: '2px 6px',
            fontSize: '9px',
            fontWeight: 800,
            color: '#ffffff',
            boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
            pointerEvents: 'none',
            zIndex: 2,
            whiteSpace: 'nowrap'
          }}>
            {song.badge}
          </div>
        )}
        {/* Quick Add to Playlist Button */}
        {onOpenAddToPlaylist && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onOpenAddToPlaylist(song)
            }}
            style={{
              position: 'absolute',
              top: 6,
              right: 6,
              background: 'rgba(0,0,0,0.65)',
              border: 'none',
              borderRadius: '50%',
              width: 26,
              height: 26,
              color: '#ffffff',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(4px)',
              transition: 'transform 0.15s'
            }}
            title="Add to playlist"
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.15)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
          >
            ➕
          </button>
        )}
        {isThisPlaying && (

          <div style={{
            position: 'absolute',
            bottom: 16,
            right: 8,
            background: 'rgba(0,0,0,0.75)',
            borderRadius: 999,
            padding: '4px 6px',
            display: 'flex',
            alignItems: 'center',
            backdropFilter: 'blur(4px)'
          }}>
            <EqualizerBars isPlaying={true} />
          </div>
        )}
      </div>
      <div style={{
        fontSize: '13px',
        fontWeight: 700,
        color: isCurrent ? '#1ed760' : '#ffffff',
        marginBottom: 4,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        {song.title}
      </div>
      <div style={{
        fontSize: '11px',
        color: '#b3b3b3',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        {song.artist}
      </div>
    </div>
  )
}
