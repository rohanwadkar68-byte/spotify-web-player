import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useMusicPlayer } from '../../context/MusicPlayerContext.jsx'
import { DEFAULT_ALBUM_COVER, CURATED_SONGS } from '../../data/musicLibrary.js'

function decodeHtml(html) {
  if (!html) return ''
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

const BROWSE_GENRES = [
  { id: 'romance', name: 'Romance 💖', color: '#e13300', query: 'Romantic Hindi' },
  { id: 'bollywood', name: 'Bollywood 💫', color: '#e8115b', query: 'Arijit Singh' },
  { id: 'indie', name: 'Indie & Acoustic 🎸', color: '#8d67ab', query: 'Anuv Jain' },
  { id: 'lofi', name: 'Lo-Fi & Chill 🌙', color: '#148a08', query: 'Lofi Chill' },
  { id: 'vilen', name: 'Teddy\'s Vilen 🧸', color: '#006450', query: 'Vilen' },
  { id: 'pop', name: 'Pop Hits ✨', color: '#503750', query: 'Taylor Swift' },
  { id: 'punjabi', name: 'Punjabi Beats 🔥', color: '#bc5900', query: 'AP Dhillon' },
  { id: 'party', name: 'Celebration 🎂', color: '#e91429', query: 'Birthday Celebration' }
]

export default function SpotifySearchView({ searchQuery, setSearchQuery }) {
  const { currentTrack, isPlaying, playTrack, togglePlay, toggleLike, isLiked, queue } = useMusicPlayer()
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const debounceRef = useRef(null)

  // Real-time debounced search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([])
      setLoading(false)
      return
    }

    setLoading(true)
    clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(async () => {
      let found = []

      // 1. JioSaavn API
      try {
        const res = await fetch('https://jiosaavn-api-nine.vercel.app/api/search/songs?query=' + encodeURIComponent(searchQuery))
        if (res.ok) {
          const data = await res.json()
          const items = data?.data?.results || []
          if (items.length > 0) {
            found = items.slice(0, 16).map((item) => {
              const dlUrl =
                item.downloadUrl?.[item.downloadUrl.length - 1]?.url ||
                item.downloadUrl?.[0]?.url ||
                item.url

              const imgUrl =
                item.image?.[item.image.length - 1]?.url ||
                item.image?.[0]?.url ||
                DEFAULT_ALBUM_COVER

              const artistName =
                item.artists?.primary?.[0]?.name ||
                item.primaryArtists ||
                item.album?.name ||
                'Artist'

              return {
                id: item.id || String(Math.random()),
                title: decodeHtml(item.name || item.title || 'Song'),
                artist: decodeHtml(artistName),
                album: decodeHtml(item.album?.name || 'Single'),
                image: imgUrl,
                url: dlUrl,
                duration: item.duration ? Math.floor(item.duration / 60) + ':' + (item.duration % 60 < 10 ? '0' : '') + (item.duration % 60) : '3:30'
              }
            }).filter((i) => !!i.url)
          }
        }
      } catch (e) {
        console.warn('JioSaavn search err:', e)
      }

      // 2. iTunes fallback
      if (found.length === 0) {
        try {
          const itunesRes = await fetch('https://itunes.apple.com/search?term=' + encodeURIComponent(searchQuery) + '&entity=song&limit=15')
          if (itunesRes.ok) {
            const data = await itunesRes.json()
            if (data.results && data.results.length > 0) {
              found = data.results.map((item) => ({
                id: String(item.trackId || Math.random()),
                title: decodeHtml(item.trackName || 'Song'),
                artist: decodeHtml(item.artistName || 'Artist'),
                album: decodeHtml(item.collectionName || 'Single'),
                image: item.artworkUrl100?.replace('100x100', '300x300') || DEFAULT_ALBUM_COVER,
                url: item.previewUrl,
                duration: item.trackTimeMillis ? Math.floor(item.trackTimeMillis / 60000) + ':' + (Math.floor((item.trackTimeMillis % 60000) / 1000) < 10 ? '0' : '') + Math.floor((item.trackTimeMillis % 60000) / 1000) : '3:00'
              })).filter((i) => !!i.url)
            }
          }
        } catch (e) {
          console.warn('iTunes fallback err:', e)
        }
      }

      // 3. Fallback to matching local curated songs
      if (found.length === 0) {
        found = CURATED_SONGS.filter(
          (s) =>
            s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.artist.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }

      setResults(found)
      setLoading(false)
    }, 350)
  }, [searchQuery])

  const topResult = results[0]
  const songResults = results.slice(1, 5)
  const moreResults = results.slice(5)

  return (
    <div style={{ padding: '0 16px 80px' }}>
      {/* Prominent Global Search Input Bar */}
      <div style={{ margin: '8px 0 20px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            borderRadius: 999,
            padding: '10px 18px',
            maxWidth: 620,
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" color="#1ed760">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            data-testid="search-input-field"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search songs, artists, reels viral, podcasts..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: 600
            }}
            autoFocus
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#ffffff',
                width: 22,
                height: 22,
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px'
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* CASE 1: EMPTY SEARCH — BROWSE ALL GENRE CARDS */}
      {!searchQuery.trim() && (
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', margin: '0 0 16px' }}>
            Browse all genres
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: 18
          }}>
            {BROWSE_GENRES.map((genre) => (
              <motion.div
                key={genre.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSearchQuery(genre.query)}
                style={{
                  height: 140,
                  background: genre.color,
                  borderRadius: 8,
                  padding: 16,
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
              >
                <span style={{
                  fontSize: '20px',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.2,
                  display: 'block',
                  maxWidth: '70%'
                }}>
                  {genre.name}
                </span>

                {/* Tilted rotated mini vinyl / graphic in bottom right */}
                <div style={{
                  position: 'absolute',
                  right: -10,
                  bottom: -6,
                  width: 72,
                  height: 72,
                  borderRadius: 4,
                  background: 'rgba(0,0,0,0.3)',
                  transform: 'rotate(25deg)',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px'
                }}>
                  💿
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* CASE 2: LOADING SPINNER */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#b3b3b3' }}>
          <div style={{ fontSize: '32px', marginBottom: 10 }}>⏳</div>
          <div style={{ fontSize: '15px', fontWeight: 600 }}>Searching songs for Sneha...</div>
        </div>
      )}

      {/* CASE 3: SEARCH RESULTS LAYOUT (TOP RESULT + SONGS) */}
      {!loading && results.length > 0 && (
        <div>
          {/* Top Result + Top 4 Songs Two Column Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24,
            marginBottom: 36
          }}>
            {/* Left Column: Top Result Card */}
            {topResult && (
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', margin: '0 0 16px' }}>
                  Top result
                </h3>
                <TopResultCard
                  song={topResult}
                  isCurrent={currentTrack?.id === topResult.id}
                  isPlaying={isPlaying}
                  onPlay={() => {
                    if (currentTrack?.id === topResult.id) togglePlay()
                    else playTrack(topResult, [topResult, ...queue])
                  }}
                />
              </div>
            )}

            {/* Right Column: Top 4 Songs */}
            <div>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', margin: '0 0 16px' }}>
                Songs
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {songResults.map((song) => (
                  <SearchSongRow
                    key={song.id}
                    song={song}
                    isCurrent={currentTrack?.id === song.id}
                    isPlaying={isPlaying}
                    isLiked={isLiked(song.id)}
                    onLike={() => toggleLike(song.id)}
                    onPlay={() => {
                      if (currentTrack?.id === song.id) togglePlay()
                      else playTrack(song, [song, ...queue])
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* More Results */}
          {moreResults.length > 0 && (
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', margin: '0 0 16px' }}>
                More for "{searchQuery}"
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {moreResults.map((song) => (
                  <SearchSongRow
                    key={song.id}
                    song={song}
                    isCurrent={currentTrack?.id === song.id}
                    isPlaying={isPlaying}
                    isLiked={isLiked(song.id)}
                    onLike={() => toggleLike(song.id)}
                    onPlay={() => {
                      if (currentTrack?.id === song.id) togglePlay()
                      else playTrack(song, [song, ...queue])
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* CASE 4: NO RESULTS */}
      {!loading && searchQuery.trim() && results.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#b3b3b3' }}>
          <div style={{ fontSize: '36px', marginBottom: 12 }}>🔍</div>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', margin: '0 0 6px' }}>
            No results found for "{searchQuery}"
          </h3>
          <p style={{ fontSize: '14px', margin: 0 }}>
            Make sure your words are spelled correctly or try searching a different singer or romantic song.
          </p>
        </div>
      )}
    </div>
  )
}

function TopResultCard({ song, isCurrent, isPlaying, onPlay }) {
  const [hovered, setHovered] = useState(false)
  const isThisPlaying = isCurrent && isPlaying

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onPlay}
      style={{
        background: hovered ? '#282828' : '#181818',
        padding: 24,
        borderRadius: 8,
        cursor: 'pointer',
        transition: 'background 0.2s',
        position: 'relative',
        height: 220,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <div>
        <img
          src={song.image}
          alt=""
          style={{
            width: 92,
            height: 92,
            borderRadius: 4,
            objectFit: 'cover',
            marginBottom: 16,
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
          }}
          onError={(e) => { e.currentTarget.src = DEFAULT_ALBUM_COVER }}
        />
        <div style={{
          fontSize: '28px',
          fontWeight: 900,
          color: '#ffffff',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          lineHeight: 1.1,
          marginBottom: 6
        }}>
          {song.title}
        </div>
        <div style={{ fontSize: '14px', color: '#b3b3b3', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span>Song</span>
          <span>•</span>
          <span style={{ color: '#ffffff', fontWeight: 600 }}>{song.artist}</span>
        </div>
      </div>

      {/* Floating Green Circular Play Button */}
      {(hovered || isThisPlaying) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            position: 'absolute',
            right: 24,
            bottom: 24,
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: '#1ed760',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
            color: '#000000'
          }}
        >
          {isThisPlaying ? (
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" style={{ marginLeft: 2 }}>
              <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"/>
            </svg>
          )}
        </motion.div>
      )}
    </div>
  )
}

function SearchSongRow({ song, isCurrent, isPlaying, isLiked, onLike, onPlay }) {
  const [hovered, setHovered] = useState(false)
  const isThisPlaying = isCurrent && isPlaying

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onPlay}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 12px',
        borderRadius: 4,
        background: hovered ? '#282828' : 'transparent',
        cursor: 'pointer',
        transition: 'background 0.15s'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
        {/* Cover / Play Overlay */}
        <div style={{ position: 'relative', width: 44, height: 44, flexShrink: 0 }}>
          <img
            src={song.image}
            alt=""
            style={{ width: '100%', height: '100%', borderRadius: 4, objectFit: 'cover' }}
            onError={(e) => { e.currentTarget.src = DEFAULT_ALBUM_COVER }}
          />
          {(hovered || isThisPlaying) && (
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.5)',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              {isThisPlaying ? (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="#1ed760">
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

        <div style={{ minWidth: 0 }}>
          <div style={{
            fontSize: '14px',
            fontWeight: 600,
            color: isCurrent ? '#1ed760' : '#ffffff',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {song.title}
          </div>
          <div style={{
            fontSize: '12px',
            color: '#b3b3b3',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {song.artist}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onLike()
          }}
          style={{
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            padding: 4,
            display: 'flex',
            alignItems: 'center',
            color: isLiked ? '#1ed760' : '#b3b3b3'
          }}
        >
          {isLiked ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#1ed760">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b3b3b3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          )}
        </button>

        <span style={{ fontSize: '13px', color: '#b3b3b3', minWidth: 36, textAlign: 'right' }}>
          {song.duration || '3:30'}
        </span>
      </div>
    </div>
  )
}
