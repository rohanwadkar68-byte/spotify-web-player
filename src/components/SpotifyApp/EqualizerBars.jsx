import React from 'react'

export default function EqualizerBars({ isPlaying = true, size = 'small', color = '#1ed760' }) {
  const height = size === 'large' ? 18 : 12
  const width = size === 'large' ? 3 : 2.5
  const gap = size === 'large' ? 2.5 : 2

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'flex-end',
        gap,
        height,
        padding: '0 2px'
      }}
      title={isPlaying ? 'Playing' : 'Paused'}
    >
      <span
        style={{
          width,
          height: '100%',
          background: color,
          borderRadius: 99,
          transformOrigin: 'bottom',
          animation: isPlaying ? 'eqBounce1 0.7s ease-in-out infinite alternate' : 'none',
          transform: isPlaying ? 'none' : 'scaleY(0.35)',
          transition: 'transform 0.2s ease'
        }}
      />
      <span
        style={{
          width,
          height: '100%',
          background: color,
          borderRadius: 99,
          transformOrigin: 'bottom',
          animation: isPlaying ? 'eqBounce2 0.55s ease-in-out infinite alternate 0.15s' : 'none',
          transform: isPlaying ? 'none' : 'scaleY(0.7)',
          transition: 'transform 0.2s ease'
        }}
      />
      <span
        style={{
          width,
          height: '100%',
          background: color,
          borderRadius: 99,
          transformOrigin: 'bottom',
          animation: isPlaying ? 'eqBounce3 0.8s ease-in-out infinite alternate 0.3s' : 'none',
          transform: isPlaying ? 'none' : 'scaleY(0.4)',
          transition: 'transform 0.2s ease'
        }}
      />
      <style>{`
        @keyframes eqBounce1 {
          0% { transform: scaleY(0.2); }
          50% { transform: scaleY(0.9); }
          100% { transform: scaleY(0.35); }
        }
        @keyframes eqBounce2 {
          0% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
          100% { transform: scaleY(0.2); }
        }
        @keyframes eqBounce3 {
          0% { transform: scaleY(0.85); }
          50% { transform: scaleY(0.3); }
          100% { transform: scaleY(0.75); }
        }
      `}</style>
    </div>
  )
}
