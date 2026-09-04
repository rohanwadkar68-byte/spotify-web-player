import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMusicPlayer } from '../../context/MusicPlayerContext.jsx'

const COVER_GRADIENTS = [
  { gradient: 'linear-gradient(135deg, #ff0844, #ffb199)', emoji: '🎂' },
  { gradient: 'linear-gradient(135deg, #1ed760, #1db954)', emoji: '🎵' },
  { gradient: 'linear-gradient(135deg, #7928ca, #ff0080)', emoji: '✨' },
  { gradient: 'linear-gradient(135deg, #f12711, #f5af19)', emoji: '🔥' },
  { gradient: 'linear-gradient(135deg, #2b5876, #4e4376)', emoji: '🌙' },
  { gradient: 'linear-gradient(135deg, #ff758c, #ff7eb3)', emoji: '💖' }
]

export default function CreatePlaylistModal({ isOpen, onClose, onCreated }) {
  const { createPlaylist } = useMusicPlayer()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (!isOpen) return null

  const handleCreate = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    const selected = COVER_GRADIENTS[selectedIndex]
    const newPl = createPlaylist({
      title: title.trim(),
      description: description.trim() || 'Created with love',
      gradient: selected.gradient,
      emoji: selected.emoji
    })

    setTitle('')
    setDescription('')
    onCreated && onCreated(newPl)
    onClose()
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
            maxWidth: 440,
            color: '#ffffff',
            boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
            display: 'flex',
            flexDirection: 'column',
            gap: 20
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800 }}>Create Playlist</h2>
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

          {/* Cover & Inputs Row */}
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            {/* Live Cover Preview */}
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: 8,
                background: COVER_GRADIENTS[selectedIndex].gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '36px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
                flexShrink: 0
              }}
            >
              {COVER_GRADIENTS[selectedIndex].emoji}
            </div>

            {/* Inputs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, minWidth: 0 }}>
              <input
                type="text"
                autoFocus
                placeholder="Playlist name (e.g. Sneha's Jam)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  background: '#3e3e3e',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 6,
                  padding: '10px 12px',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: 600,
                  outline: 'none'
                }}
              />
              <input
                type="text"
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  background: '#3e3e3e',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 6,
                  padding: '8px 12px',
                  color: '#b3b3b3',
                  fontSize: '12px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Choose Cover Vibe */}
          <div>
            <div style={{ fontSize: '12px', color: '#b3b3b3', fontWeight: 700, marginBottom: 8 }}>
              Choose Cover Theme
            </div>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
              {COVER_GRADIENTS.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 8,
                    background: item.gradient,
                    border: selectedIndex === idx ? '2px solid #ffffff' : '2px solid transparent',
                    cursor: 'pointer',
                    fontSize: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: selectedIndex === idx ? 'scale(1.08)' : 'scale(1)',
                    transition: 'all 0.15s',
                    flexShrink: 0
                  }}
                >
                  {item.emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 6 }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                padding: '10px 16px'
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCreate}
              disabled={!title.trim()}
              style={{
                background: title.trim() ? '#1ed760' : 'rgba(30,215,96,0.4)',
                color: '#000000',
                border: 'none',
                borderRadius: 999,
                fontSize: '13px',
                fontWeight: 800,
                cursor: title.trim() ? 'pointer' : 'not-allowed',
                padding: '10px 24px',
                transition: 'all 0.2s'
              }}
            >
              Create
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
