import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { CURATED_SONGS, DEFAULT_ALBUM_COVER } from '../data/musicLibrary.js'

const MusicPlayerContext = createContext(null)

const LIKED_STORAGE_KEY = 'sneha_spotify_liked_v2'
const RECENTLY_PLAYED_KEY = 'sneha_spotify_recent_v1'
const CUSTOM_PLAYLISTS_KEY = 'sneha_spotify_custom_playlists_v1'

const DEFAULT_CUSTOM_PLAYLISTS = [
  {
    id: 'sneha_birthday_special',
    title: "Sneha's Special Mix 🎂",
    description: 'Personal favorite songs curated for Sneha',
    cover: 'https://c.saavncdn.com/238/Romantic-Classics-Hits-Hindi-2026-20260529163838-500x500.jpg',
    gradient: 'linear-gradient(135deg, #ff0844, #ffb199)',
    emoji: '🎂',
    songIds: ['kesariya', 'tu_hai_kahan', 'apna_bana_le'],
    isCustom: true
  }
]


export function detectSongMood(track) {
  if (!track) return 'romantic'
  if (track.theme) return track.theme

  const text = ((track.title || '') + ' ' + (track.artist || '') + ' ' + (track.album || '') + ' ' + (track.genre || '')).toLowerCase()
  if (
    text.includes('sad') ||
    text.includes('choo') ||
    text.includes('kahani') ||
    text.includes('faasle') ||
    text.includes('husn') ||
    text.includes('baarishein') ||
    text.includes('tu hai kahan') ||
    text.includes('dard') ||
    text.includes('broken') ||
    text.includes('intezaar') ||
    text.includes('judaai') ||
    text.includes('judai') ||
    text.includes('alone') ||
    text.includes('heartbreak')
  ) {
    return 'sad'
  }
  if (
    text.includes('reels') ||
    text.includes('viral') ||
    text.includes('insta') ||
    text.includes('sajni') ||
    text.includes('dunki') ||
    text.includes('animal') ||
    text.includes('o maahi') ||
    text.includes('pehle bhi') ||
    text.includes('trending')
  ) {
    return 'reels_viral'
  }
  if (
    text.includes('lofi') ||
    text.includes('lo-fi') ||
    text.includes('chill') ||
    text.includes('relax') ||
    text.includes('midnight') ||
    text.includes('study')
  ) {
    return 'lofi'
  }
  if (
    text.includes('taylor') ||
    text.includes('pop') ||
    text.includes('english') ||
    text.includes('stephen') ||
    text.includes('until i found')
  ) {
    return 'pop'
  }
  if (
    text.includes('anuv') ||
    text.includes('indie') ||
    text.includes('acoustic') ||
    text.includes('prateek') ||
    text.includes('local train')
  ) {
    return 'indie'
  }
  if (
    text.includes('punjabi') ||
    text.includes('dhillon') ||
    text.includes('sidhu') ||
    text.includes('party') ||
    text.includes('diljit')
  ) {
    return 'punjabi'
  }
  return 'romantic'
}

export function getTrackAmbientColor(track) {
  const mood = detectSongMood(track)
  switch (mood) {
    case 'sad':
      return '#2563eb' // Soulful midnight blue
    case 'reels_viral':
      return '#e1306c' // Instagram vibrant berry
    case 'romantic':
      return '#be185d' // Rose pink
    case 'pop':
      return '#7c3aed' // Violet purple
    case 'lofi':
      return '#1e40af' // Midnight navy
    case 'indie':
      return '#0f766e' // Calm teal
    case 'punjabi':
      return '#ea580c' // Vibrant amber
    default:
      return '#1db954' // Spotify green
  }
}

export function detectSongEra(track) {
  if (!track) return 'modern_peak'
  if (track.era) return track.era

  const text = ((track.title || '') + ' ' + (track.artist || '') + ' ' + (track.album || '') + ' ' + (track.genre || '')).toLowerCase()
  if (
    text.includes('199') ||
    text.includes('198') ||
    text.includes('197') ||
    text.includes('retro') ||
    text.includes('classic romantic') ||
    text.includes('udit narayan') ||
    text.includes('kumar sanu') ||
    text.includes('alka yagnik') ||
    text.includes('jo jeeta wohi sikandar') ||
    text.includes('ddlj') ||
    text.includes('aashiqui') ||
    text.includes('kishore kumar') ||
    text.includes('lata mangeshkar') ||
    text.includes('mohammed rafi') ||
    text.includes('jo jeeta')
  ) {
    return 'retro_90s'
  }

  return 'modern_peak'
}

function decodeHtml(html) {
  if (!html) return ''
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

export function MusicPlayerProvider({ children }) {
  const [likedIds, setLikedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(LIKED_STORAGE_KEY)
      return saved ? JSON.parse(saved) : ['kesariya', 'tu_hai_kahan', 'apna_bana_le']
    } catch {
      return ['kesariya', 'tu_hai_kahan', 'apna_bana_le']
    }
  })

  const [recentlyPlayed, setRecentlyPlayed] = useState(() => {
    try {
      const saved = localStorage.getItem(RECENTLY_PLAYED_KEY)
      return saved ? JSON.parse(saved) : CURATED_SONGS.slice(0, 4)
    } catch {
      return CURATED_SONGS.slice(0, 4)
    }
  })

  const [customPlaylists, setCustomPlaylists] = useState(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_PLAYLISTS_KEY)
      return saved ? JSON.parse(saved) : DEFAULT_CUSTOM_PLAYLISTS
    } catch {
      return DEFAULT_CUSTOM_PLAYLISTS
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOM_PLAYLISTS_KEY, JSON.stringify(customPlaylists))
    } catch (err) {
      console.warn('Failed to save custom playlists:', err)
    }
  }, [customPlaylists])


  const [queue, setQueue] = useState(CURATED_SONGS)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentTrack, setCurrentTrack] = useState(CURATED_SONGS[0])
  const [sessionPlayedIds, setSessionPlayedIds] = useState(() => new Set([CURATED_SONGS[0]?.id || 'kesariya']))
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.85)
  const [isMuted, setIsMuted] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)
  const [repeatMode, setRepeatMode] = useState('all') // off | all | one

  // Sleep Timer: { mode: 'minutes' | 'end_of_song', minutes?: number, endTime?: number }
  const [sleepTimer, setSleepTimer] = useState(null)
  const [sleepTimerRemaining, setSleepTimerRemaining] = useState(null)

  // Pure Studio Peace Audio Mode (default enabled for warmth and soft dynamics)
  const PURE_SOUND_KEY = 'sneha_spotify_pure_sound_v1'
  const [pureSoundMode, setPureSoundMode] = useState(() => {
    try {
      const saved = localStorage.getItem(PURE_SOUND_KEY)
      return saved !== null ? JSON.parse(saved) : true
    } catch {
      return true
    }
  })

  // Advanced Sound Modes: 'normal' | '8d_spatial' | 'slowed_reverb' | 'nightcore'
  const SOUND_EFFECT_KEY = 'sneha_spotify_sound_effect_v1'
  const [soundEffectMode, setSoundEffectModeState] = useState(() => {
    try {
      const saved = localStorage.getItem(SOUND_EFFECT_KEY)
      return saved || 'normal'
    } catch {
      return 'normal'
    }
  })

  const audioRef = useRef(null)
  const audioCtxRef = useRef(null)
  const bassFilterRef = useRef(null)
  const vocalFilterRef = useRef(null)
  const highShelfRef = useRef(null)
  const pannerRef = useRef(null)
  const pannerAnimationIdRef = useRef(null)
  const analyserRef = useRef(null)
  const [analyserNode, setAnalyserNode] = useState(null)
  const fadeIntervalRef = useRef(null)
  const fetchingRecommendationsRef = useRef(false)
  const originalVolumeRef = useRef(0.85)
  const lastTimeRef = useRef(0)

  const clearFadeInterval = () => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current)
      fadeIntervalRef.current = null
    }
  }

  const applySoundEffectMode = (mode) => {
    if (pannerAnimationIdRef.current) {
      cancelAnimationFrame(pannerAnimationIdRef.current)
      pannerAnimationIdRef.current = null
    }

    const audio = audioRef.current
    const panner = pannerRef.current
    const bass = bassFilterRef.current
    const vocal = vocalFilterRef.current
    const high = highShelfRef.current

    // Reset panner to neutral center
    if (panner) {
      if ('pan' in panner && panner.pan) {
        panner.pan.value = 0
      } else if (panner.positionX) {
        panner.positionX.value = 0
        panner.positionY.value = 0
        panner.positionZ.value = 1
      }
    }

    if (mode === '8d_spatial') {
      if (audio) audio.playbackRate = 1.0
      if (bass) bass.gain.value = 2.0
      if (vocal) vocal.gain.value = 1.5
      if (high) high.gain.value = -1.0

      let angle = 0
      const animate8D = () => {
        angle += 0.02
        if (pannerRef.current) {
          const p = pannerRef.current
          if ('pan' in p && p.pan) {
            p.pan.value = Math.sin(angle)
          } else if (p.positionX) {
            p.positionX.value = Math.sin(angle) * 3
            p.positionZ.value = Math.cos(angle) * 3
          }
        }
        pannerAnimationIdRef.current = requestAnimationFrame(animate8D)
      }
      pannerAnimationIdRef.current = requestAnimationFrame(animate8D)
    } else if (mode === 'slowed_reverb') {
      if (audio) audio.playbackRate = 0.88
      if (bass) bass.gain.value = 3.5
      if (vocal) vocal.gain.value = 1.0
      if (high) high.gain.value = -3.5
    } else if (mode === 'nightcore') {
      if (audio) audio.playbackRate = 1.15
      if (bass) bass.gain.value = 0.5
      if (vocal) vocal.gain.value = 2.0
      if (high) high.gain.value = 3.0
    } else {
      // Normal / Pure Studio Peace Mode
      if (audio) audio.playbackRate = 1.0
      if (bass) bass.gain.value = pureSoundMode ? 1.2 : 0
      if (vocal) vocal.gain.value = pureSoundMode ? 1.6 : 0
      if (high) high.gain.value = pureSoundMode ? -1.8 : 0
    }
  }

  const setSoundEffectMode = (mode) => {
    setSoundEffectModeState(mode)
    try {
      localStorage.setItem(SOUND_EFFECT_KEY, mode)
    } catch (e) {}
    applySoundEffectMode(mode)
  }

  // Initialize Web Audio API DSP Pipeline for Pure Studio Clarity + 8D Spatial + Visualizer
  const initWebAudio = () => {
    if (audioCtxRef.current || typeof window === 'undefined') return
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx || !audioRef.current) return

    try {
      const ctx = new AudioCtx()
      const audio = audioRef.current

      const source = ctx.createMediaElementSource(audio)

      // 1. Warm Acoustic Lows (110Hz +1.2dB) - gives rich body without boominess
      const bass = ctx.createBiquadFilter()
      bass.type = 'lowshelf'
      bass.frequency.value = 110
      bass.gain.value = pureSoundMode ? 1.2 : 0
      bassFilterRef.current = bass

      // 2. Vocal Intimacy & Clarity (2.8kHz +1.6dB, Q=1.0) - crystal-clear vocal articulation
      const vocal = ctx.createBiquadFilter()
      vocal.type = 'peaking'
      vocal.frequency.value = 2800
      vocal.Q.value = 1.0
      vocal.gain.value = pureSoundMode ? 1.6 : 0
      vocalFilterRef.current = vocal

      // 3. Ear-Peace Anti-Fatigue High Shelf (5.2kHz -1.8dB) - eliminates ear-piercing sibilance
      const high = ctx.createBiquadFilter()
      high.type = 'highshelf'
      high.frequency.value = 5200
      high.gain.value = pureSoundMode ? -1.8 : 0
      highShelfRef.current = high

      // 4. Studio Dynamics Compressor - smooths loudness jumps for a relaxed listening feel
      const compressor = ctx.createDynamicsCompressor()
      compressor.threshold.value = -16
      compressor.knee.value = 12
      compressor.ratio.value = 3.0
      compressor.attack.value = 0.005
      compressor.release.value = 0.25

      // 5. 8D Spatial Audio Panner
      let panner = null
      try {
        if (ctx.createStereoPanner) {
          panner = ctx.createStereoPanner()
          panner.pan.value = 0
        } else if (ctx.createPanner) {
          panner = ctx.createPanner()
          panner.panningModel = 'HRTF'
          if (panner.positionX) {
            panner.positionX.value = 0
            panner.positionY.value = 0
            panner.positionZ.value = 1
          }
        }
      } catch (pErr) {
        console.warn('Panner creation error:', pErr)
      }
      pannerRef.current = panner

      // 6. Real-time Visualizer Analyser Node
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 256
      analyser.smoothingTimeConstant = 0.82
      analyserRef.current = analyser
      setAnalyserNode(analyser)

      // Connect Chain: source -> bass -> vocal -> high -> compressor -> (panner) -> analyser -> destination
      source.connect(bass)
      bass.connect(vocal)
      vocal.connect(high)
      high.connect(compressor)

      if (panner) {
        compressor.connect(panner)
        panner.connect(analyser)
      } else {
        compressor.connect(analyser)
      }

      analyser.connect(ctx.destination)
      audioCtxRef.current = ctx

      // Apply initial sound effect mode if set
      applySoundEffectMode(soundEffectMode)
    } catch (e) {
      console.warn('Web Audio initialization fallback:', e)
    }
  }

  const togglePureSoundMode = () => {
    setPureSoundMode((prev) => {
      const next = !prev
      try {
        localStorage.setItem(PURE_SOUND_KEY, JSON.stringify(next))
        if (soundEffectMode === 'normal') {
          if (bassFilterRef.current) bassFilterRef.current.gain.value = next ? 1.2 : 0
          if (vocalFilterRef.current) vocalFilterRef.current.gain.value = next ? 1.6 : 0
          if (highShelfRef.current) highShelfRef.current.gain.value = next ? -1.8 : 0
        }
      } catch (e) {
        console.warn(e)
      }
      return next
    })
  }

  // Initialize HTML5 Audio instance
  useEffect(() => {
    if (typeof window === 'undefined') return

    const audio = new Audio()
    audio.crossOrigin = 'anonymous'
    audio.preload = 'metadata'
    audio.volume = volume
    audioRef.current = audio

    const onTimeUpdate = () => {
      const cur = audio.currentTime || 0
      if (Math.abs(cur - lastTimeRef.current) >= 0.25 || cur === 0) {
        lastTimeRef.current = cur
        setCurrentTime(cur)
      }
    }

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0)
    }

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.pause()
    }
  }, [])

  // Auto-play next track when current ends or on audio error
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onEnded = () => {
      // Check sleep timer end_of_song mode
      if (sleepTimer?.mode === 'end_of_song') {
        audio.pause()
        setIsPlaying(false)
        setSleepTimer(null)
        setSleepTimerRemaining(null)
        return
      }

      if (repeatMode === 'one') {
        audio.currentTime = 0
        audio.play().catch(() => {})
      } else {
        handleSmartNext(true)
      }
    }

    const onError = (e) => {
      console.warn('Audio playback stream error on track:', currentTrack?.title, e)
      handleSmartNext(true)
    }

    audio.addEventListener('ended', onEnded)
    audio.addEventListener('error', onError)
    return () => {
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('error', onError)
    }
  }, [repeatMode, queue, currentIndex, isShuffle, currentTrack, sleepTimer])

  // Sleep timer interval watcher with smooth fade out
  useEffect(() => {
    if (!sleepTimer || sleepTimer.mode !== 'minutes') {
      setSleepTimerRemaining(null)
      return
    }

    const interval = setInterval(() => {
      const now = Date.now()
      const diffMs = sleepTimer.endTime - now

      if (diffMs <= 0) {
        // Sleep Timer Reached: Stop audio smoothly
        const audio = audioRef.current
        if (audio) {
          audio.pause()
          audio.volume = originalVolumeRef.current
        }
        setIsPlaying(false)
        setSleepTimer(null)
        setSleepTimerRemaining(null)
      } else {
        const totalSec = Math.ceil(diffMs / 1000)
        const mins = Math.floor(totalSec / 60)
        const secs = totalSec % 60
        setSleepTimerRemaining(`${mins}:${secs < 10 ? '0' : ''}${secs}`)

        // Smooth volume fade out in last 10 seconds
        if (totalSec <= 10) {
          const audio = audioRef.current
          if (audio) {
            const factor = Math.max(0, totalSec / 10)
            audio.volume = originalVolumeRef.current * factor
          }
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [sleepTimer])

  useEffect(() => {
    try {
      localStorage.setItem(LIKED_STORAGE_KEY, JSON.stringify(likedIds))
    } catch (e) {
      console.warn(e)
    }
  }, [likedIds])

  useEffect(() => {
    try {
      localStorage.setItem(RECENTLY_PLAYED_KEY, JSON.stringify(recentlyPlayed))
    } catch (e) {
      console.warn(e)
    }
  }, [recentlyPlayed])

  const setSleepTimerMode = (minutesOrMode) => {
    if (!minutesOrMode) {
      cancelSleepTimer()
      return
    }

    originalVolumeRef.current = volume

    if (minutesOrMode === 'end_of_song') {
      setSleepTimer({ mode: 'end_of_song' })
      setSleepTimerRemaining('End of Song')
    } else {
      const mins = Number(minutesOrMode)
      const endTime = Date.now() + mins * 60 * 1000
      setSleepTimer({ mode: 'minutes', minutes: mins, endTime })
      setSleepTimerRemaining(`${mins}:00`)
    }
  }

  const cancelSleepTimer = () => {
    setSleepTimer(null)
    setSleepTimerRemaining(null)
    const audio = audioRef.current
    if (audio) {
      audio.volume = isMuted ? 0 : volume
    }
  }

  const clearRecentlyPlayed = () => {
    setRecentlyPlayed([])
    try {
      localStorage.removeItem(RECENTLY_PLAYED_KEY)
    } catch (e) {
      console.warn(e)
    }
  }

  const playTrack = (track, customQueue = null) => {
    if (!track || !track.url) return
    const audio = audioRef.current
    if (!audio) return

    clearFadeInterval()

    if (customQueue && customQueue.length > 0) {
      setQueue(customQueue)
      const foundIdx = customQueue.findIndex((t) => t.id === track.id)
      setCurrentIndex(foundIdx >= 0 ? foundIdx : 0)
    } else {
      const foundIdx = queue.findIndex((t) => t.id === track.id)
      if (foundIdx >= 0) {
        setCurrentIndex(foundIdx)
      } else {
        setQueue((q) => [track, ...q])
        setCurrentIndex(0)
      }
    }

    setCurrentTrack(track)
    originalVolumeRef.current = volume
    const targetVolume = isMuted ? 0 : volume

    // Add to recently played (deduplicated, max 20)
    setRecentlyPlayed((prev) => {
      const filtered = prev.filter((item) => item.id !== track.id)
      return [track, ...filtered].slice(0, 20)
    })

    // Track played in session for Never-Repeat smart auto-advance
    setSessionPlayedIds((prev) => {
      const next = new Set(prev)
      next.add(track.id)
      return next
    })

    // Activate Web Audio DSP Chain for Studio Peace sound
    try {
      if (audioCtxRef.current) {
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume().catch(() => {})
        }
      } else {
        initWebAudio()
      }
    } catch (e) {}

    // Smooth Crossfade: If music is already playing, fade down quickly, swap song, fade up
    if (!audio.paused && audio.src && targetVolume > 0.05) {
      const startVol = audio.volume
      const steps = 5
      let step = 0

      fadeIntervalRef.current = setInterval(() => {
        step++
        audio.volume = Math.max(0, startVol * (1 - step / steps))

        if (step >= steps) {
          clearFadeInterval()
          audio.src = track.url
          audio.currentTime = 0
          audio.volume = 0
          const playPromise = audio.play()
          if (playPromise?.catch) playPromise.catch(() => {})

          // Smooth fade-in
          let inStep = 0
          const inSteps = 8
          fadeIntervalRef.current = setInterval(() => {
            inStep++
            audio.volume = Math.min(targetVolume, (targetVolume * inStep) / inSteps)
            if (inStep >= inSteps) {
              clearFadeInterval()
              audio.volume = targetVolume
            }
          }, 35)
          applySoundEffectMode(soundEffectMode)
        }
      }, 25)
    } else {
      audio.src = track.url
      audio.currentTime = 0
      audio.volume = 0
      const playPromise = audio.play()
      if (playPromise?.catch) playPromise.catch(() => {})

      // Smooth subtle fade-in on initial play
      let inStep = 0
      const inSteps = 6
      fadeIntervalRef.current = setInterval(() => {
        inStep++
        audio.volume = Math.min(targetVolume, (targetVolume * inStep) / inSteps)
        if (inStep >= inSteps) {
          clearFadeInterval()
          audio.volume = targetVolume
        }
      }, 30)
      applySoundEffectMode(soundEffectMode)
    }
  }

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    clearFadeInterval()

    // Resume or init Web Audio context
    try {
      if (audioCtxRef.current) {
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume().catch(() => {})
        }
      } else {
        initWebAudio()
      }
    } catch (e) {}

    if (isPlaying) {
      audio.pause()
    } else {
      if (!audio.src && currentTrack?.url) {
        audio.src = currentTrack.url
      }
      audio.volume = isMuted ? 0 : volume
      audio.play().catch(() => {})
    }
  }

  /**
   * Smart Mood-Based Next:
   * Chaining logic:
   * - Sad song (Choo Lo, Husn, Kahani Suno, Faasle) -> next sad song!
   * - Reels viral (Sajni, O Maahi, Pehle Bhi Main) -> next reels viral song!
   * - Romantic (Kesariya, Apna Bana Le, Shayad) -> next romantic song!
   * Auto-fetches from JioSaavn matching this exact mood when queue is running low.
   */
  const handleSmartNext = async (isAuto = false) => {
    const currentMood = detectSongMood(currentTrack)
    const currentEra = detectSongEra(currentTrack)
    const primaryArtist = (currentTrack?.artist || '').split(',')[0].trim()

    // 1. Gather all candidate songs (from current queue + CURATED_SONGS)
    const allPool = [...(queue || [])]
    CURATED_SONGS.forEach((s) => {
      if (!allPool.some((t) => t.id === s.id)) {
        allPool.push(s)
      }
    })

    // 2. Strict Vibe & Era Lock:
    // Only pick songs that match the SAME MOOD and the SAME ERA!
    // Never mix 90s vintage into a 2024 modern peak session, and vice-versa!
    let unplayedMatches = allPool.filter((t) =>
      t.id !== currentTrack?.id &&
      detectSongMood(t) === currentMood &&
      detectSongEra(t) === currentEra &&
      !sessionPlayedIds.has(t.id)
    )

    // 3. Choose next track
    let chosenTrack = null
    if (unplayedMatches.length > 0) {
      chosenTrack = isShuffle
        ? unplayedMatches[Math.floor(Math.random() * unplayedMatches.length)]
        : unplayedMatches[0]
    }

    // 4. If no unplayed candidate in exact mood with same era, try unplayed candidates from compatible moods WITH SAME ERA!
    if (!chosenTrack) {
      const moodAffinity = {
        sad: ['lofi', 'romantic'],
        romantic: ['lofi', 'sad', 'reels_viral'],
        reels_viral: ['punjabi', 'romantic'],
        lofi: ['sad', 'romantic'],
        punjabi: ['reels_viral']
      }
      const compatibleMoods = moodAffinity[currentMood] || ['romantic', 'reels_viral']
      const unplayedCompatible = allPool.filter((t) =>
        t.id !== currentTrack?.id &&
        compatibleMoods.includes(detectSongMood(t)) &&
        detectSongEra(t) === currentEra &&
        !sessionPlayedIds.has(t.id)
      )
      if (unplayedCompatible.length > 0) {
        chosenTrack = isShuffle
          ? unplayedCompatible[Math.floor(Math.random() * unplayedCompatible.length)]
          : unplayedCompatible[0]
      }
    }

    // 5. If we found an unplayed track, play it immediately!
    if (chosenTrack) {
      playTrack(chosenTrack)
    }

    // 6. Dynamic Fetch: Keep pipeline full of fresh unplayed songs from JioSaavn API matching BOTH mood AND era!
    const remainingUnplayed = allPool.filter((t) =>
      detectSongMood(t) === currentMood &&
      detectSongEra(t) === currentEra &&
      !sessionPlayedIds.has(t.id)
    ).length

    if (remainingUnplayed <= 2 && !fetchingRecommendationsRef.current) {
      fetchingRecommendationsRef.current = true
      try {
        let query = ''
        if (currentEra === 'modern_peak') {
          if (currentMood === 'sad') {
            query = 'viral indie acoustic sad hindi 2024 2025 anuv jain local train'
          } else if (currentMood === 'reels_viral') {
            query = 'instagram reels viral songs hindi 2024 2025'
          } else if (currentMood === 'lofi') {
            query = 'hindi lofi chill relaxed acoustic 2024'
          } else if (currentMood === 'punjabi') {
            query = 'karan aujla ap dhillon trending punjabi 2024 2025'
          } else {
            query = `${primaryArtist} romantic hits modern 2024 2025`
          }
        } else {
          // Retro 90s era
          query = '90s bollywood romantic evergreen classics kumar sanu udit'
        }

        const res = await fetch('https://jiosaavn-api-nine.vercel.app/api/search/songs?query=' + encodeURIComponent(query))
        if (res.ok) {
          const data = await res.json()
          const items = data?.data?.results || []
          if (items.length > 0) {
            const existingIds = new Set([...(queue || []).map((s) => s.id), ...sessionPlayedIds])
            const newTracks = items
              .map((item) => {
                const dlUrl = item.downloadUrl?.[item.downloadUrl.length - 1]?.url || item.downloadUrl?.[0]?.url || item.url
                const imgUrl = item.image?.[item.image.length - 1]?.url || item.image?.[0]?.url || DEFAULT_ALBUM_COVER
                const artistName = item.artists?.primary?.[0]?.name || item.primaryArtists || 'Artist'
                return {
                  id: item.id || String(Math.random()),
                  title: decodeHtml(item.name || item.title || 'Song'),
                  artist: decodeHtml(artistName),
                  image: imgUrl,
                  url: dlUrl,
                  theme: currentMood,
                  era: currentEra,
                  badge: currentEra === 'modern_peak'
                    ? (currentMood === 'sad' ? '🌙 2 AM Sad Reel' : '🔥 Peak Trending')
                    : '📻 90s Nostalgia',
                  duration: item.duration ? Math.floor(item.duration / 60) + ':' + (item.duration % 60 < 10 ? '0' : '') + (item.duration % 60) : '3:30'
                }
              })
              .filter((t) => !!t.url && !existingIds.has(t.id))
              .slice(0, 6)

            if (newTracks.length > 0) {
              setQueue((prev) => [...prev, ...newTracks])
              // If we were waiting for an unplayed track because local library was depleted, play first fresh fetched track!
              if (!chosenTrack && newTracks[0]) {
                playTrack(newTracks[0])
                chosenTrack = newTracks[0]
              }
            }
          }
        }
      } catch (e) {
        console.warn('Auto-recommendation fetch error:', e)
      } finally {
        fetchingRecommendationsRef.current = false
      }
    }

    // 7. Fallback if absolutely every track in the unplayed pool is exhausted:
    if (!chosenTrack) {
      setSessionPlayedIds(new Set([currentTrack?.id]))
      const sameEraTracks = allPool.filter((t) => detectSongEra(t) === currentEra && t.id !== currentTrack?.id)
      if (sameEraTracks.length > 0) {
        playTrack(sameEraTracks[0])
      } else {
        const nextIdx = (currentIndex + 1) % queue.length
        playTrack(queue[nextIdx])
      }
    }
  }

  const handlePrev = () => {
    if (!queue || queue.length === 0) return
    const audio = audioRef.current

    // If more than 3 seconds into the track, restart it
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0
      return
    }

    const prevIdx = (currentIndex - 1 + queue.length) % queue.length
    playTrack(queue[prevIdx])
  }

  const seekTo = (seconds) => {
    const audio = audioRef.current
    if (!audio) return
    const secNum = Number(seconds)
    if (isNaN(secNum) || !isFinite(secNum)) return
    const durNum = (duration && isFinite(duration)) ? duration : 0
    const clamped = Math.max(0, Math.min(secNum, durNum))
    try {
      audio.currentTime = clamped
      setCurrentTime(clamped)
    } catch (e) {
      console.warn('Seek error:', e)
    }
  }

  const seekRelative = (seconds) => {
    const audio = audioRef.current
    if (!audio) return
    const cur = audio.currentTime || 0
    const dur = (duration && isFinite(duration)) ? duration : 99999
    const target = Math.max(0, Math.min(cur + seconds, dur))
    try {
      audio.currentTime = target
      setCurrentTime(target)
    } catch (e) {
      console.warn('seekRelative error:', e)
    }
  }

  const changeVolume = (newVol) => {
    const clamped = Math.max(0, Math.min(1, newVol))
    setVolume(clamped)
    originalVolumeRef.current = clamped
    setIsMuted(clamped === 0)
    if (audioRef.current) {
      audioRef.current.volume = clamped
    }
  }

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false)
      if (audioRef.current) audioRef.current.volume = volume > 0 ? volume : 0.5
    } else {
      setIsMuted(true)
      if (audioRef.current) audioRef.current.volume = 0
    }
  }

  const toggleLike = (songId) => {
    setLikedIds((prev) =>
      prev.includes(songId) ? prev.filter((id) => id !== songId) : [...prev, songId]
    )
  }

  const isLiked = (songId) => likedIds.includes(songId)

  const toggleShuffle = () => setIsShuffle((prev) => !prev)

  const toggleRepeat = () => {
    setRepeatMode((prev) => {
      if (prev === 'off') return 'all'
      if (prev === 'all') return 'one'
      return 'off'
    })
  }

  const ambientColor = getTrackAmbientColor(currentTrack)

  const createPlaylist = ({ title, description, gradient, emoji }) => {
    const newPl = {
      id: 'custom_' + Date.now(),
      title: title?.trim() || 'My Playlist #' + (customPlaylists.length + 1),
      description: description?.trim() || 'Created with love for Sneha',
      gradient: gradient || 'linear-gradient(135deg, #1ed760, #1db954)',
      emoji: emoji || '🎵',
      songIds: [],
      isCustom: true,
      createdAt: Date.now()
    }
    setCustomPlaylists((prev) => [newPl, ...prev])
    return newPl
  }

  const deletePlaylist = (playlistId) => {
    setCustomPlaylists((prev) => prev.filter((p) => p.id !== playlistId))
  }

  const addSongToPlaylist = (playlistId, songId) => {
    setCustomPlaylists((prev) =>
      prev.map((p) => {
        if (p.id === playlistId) {
          if (!p.songIds.includes(songId)) {
            return { ...p, songIds: [...p.songIds, songId] }
          }
        }
        return p
      })
    )
  }

  const removeSongFromPlaylist = (playlistId, songId) => {
    setCustomPlaylists((prev) =>
      prev.map((p) => {
        if (p.id === playlistId) {
          return { ...p, songIds: p.songIds.filter((id) => id !== songId) }
        }
        return p
      })
    )
  }

  const value = {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    queue,
    currentIndex,
    isShuffle,
    repeatMode,
    likedIds,
    recentlyPlayed,
    clearRecentlyPlayed,
    customPlaylists,
    createPlaylist,
    deletePlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    sleepTimer,
    sleepTimerRemaining,
    setSleepTimerMode,
    cancelSleepTimer,
    ambientColor,
    playTrack,
    togglePlay,
    nextTrack: () => handleSmartNext(false),
    prevTrack: handlePrev,
    seekTo,
    seekRelative,
    changeVolume,
    toggleMute,
    toggleLike,
    isLiked,
    toggleShuffle,
    toggleRepeat,
    setQueue,
    pureSoundMode,
    togglePureSoundMode,
    soundEffectMode,
    setSoundEffectMode,
    analyserNode,
    detectSongEra,
    currentEra: detectSongEra(currentTrack)
  }


  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
    </MusicPlayerContext.Provider>
  )
}

export function useMusicPlayer() {
  const ctx = useContext(MusicPlayerContext)
  if (!ctx) {
    throw new Error('useMusicPlayer must be used within MusicPlayerProvider')
  }
  return ctx
}
