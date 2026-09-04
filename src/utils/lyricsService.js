// Universal Real-Time Synced & Plain Lyrics Service via LRCLIB

const lyricsCache = new Map()

/**
 * Parses LRCLIB synced lyrics string into array of timestamped lines
 * E.g. "[00:21.98] तू मेरा कोई ना होके भी कुछ लागे" -> { time: 21.98, text: "तू मेरा कोई ना..." }
 */
export function parseSyncedLyrics(lrcText) {
  if (!lrcText) return []
  const lines = lrcText.split('\n')
  const parsed = []

  const timeRegex = /\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\]/

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue

    const match = trimmed.match(timeRegex)
    if (match) {
      const minutes = parseInt(match[1], 10)
      const seconds = parseInt(match[2], 10)
      const millis = match[3] ? parseFloat('0.' + match[3]) : 0
      const totalSeconds = minutes * 60 + seconds + millis

      const text = trimmed.replace(timeRegex, '').trim()
      if (text) {
        parsed.push({
          time: totalSeconds,
          text: text
        })
      }
    }
  }

  return parsed.sort((a, b) => a.time - b.time)
}

/**
 * Parses plain text lyrics into lines with proportional timestamps based on duration
 */
export function parsePlainLyrics(plainText, duration = 210) {
  if (!plainText) return []
  const rawLines = plainText.split('\n').map((l) => l.trim()).filter(Boolean)
  if (rawLines.length === 0) return []

  const validDuration = (typeof duration === 'number' && !isNaN(duration) && duration > 0) ? duration : 210
  const step = validDuration / rawLines.length
  return rawLines.map((text, idx) => ({
    time: Math.round((idx * step) * 100) / 100,
    text: text
  }))
}

/**
 * Cleans track title for better search hits
 * e.g. "Kesariya (From Brahmastra)" -> "Kesariya"
 */
function cleanSearchTitle(title) {
  if (!title) return ''
  return title
    .replace(/\s*\([^)]*\)/g, '') // remove parenthesis
    .replace(/\s*\[[^\]]*\]/g, '') // remove brackets
    .replace(/\s*-\s*(From|Acoustic|Single|Theme|Remix|Lo-Fi).*$/i, '')
    .trim()
}

/**
 * Fetches lyrics for any track (JioSaavn, iTunes, or local) from LRCLIB
 */
export async function fetchLyricsForTrack(track) {
  if (!track || !track.title) return null

  const cacheKey = `${track.title.toLowerCase()}:::${(track.artist || '').toLowerCase()}`
  if (lyricsCache.has(cacheKey)) {
    return lyricsCache.get(cacheKey)
  }

  const cleanTitle = cleanSearchTitle(track.title)
  const cleanArtist = (track.artist || '').split(',')[0].trim()

  try {
    const url = `https://lrclib.net/api/get?track_name=${encodeURIComponent(cleanTitle)}&artist_name=${encodeURIComponent(cleanArtist)}`
    const res = await fetch(url)

    if (res.ok) {
      const data = await res.json()

      let parsedLines = []
      if (data.syncedLyrics) {
        parsedLines = parseSyncedLyrics(data.syncedLyrics)
      } else if (data.plainLyrics) {
        parsedLines = parsePlainLyrics(data.plainLyrics, track.durationSeconds || 210)
      }

      if (parsedLines.length > 0) {
        const result = {
          synced: !!data.syncedLyrics,
          lines: parsedLines,
          rawPlain: data.plainLyrics || data.syncedLyrics
        }
        lyricsCache.set(cacheKey, result)
        return result
      }
    }
  } catch (err) {
    console.warn('LRCLIB fetch error:', err)
  }

  // Fallback to local lyrics if provided in track object
  if (track.lyrics) {
    const fallbackLines = parsePlainLyrics(track.lyrics, 210)
    const result = {
      synced: false,
      lines: fallbackLines,
      rawPlain: track.lyrics
    }
    lyricsCache.set(cacheKey, result)
    return result
  }

  return null
}
