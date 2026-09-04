import { useEffect, useRef, useState } from 'react'

export default function AudioVisualizer({
  analyserNode,
  isPlaying,
  ambientColor = '#1db954',
  className = ''
}) {
  const canvasRef = useRef(null)
  const animFrameRef = useRef(null)
  const [visMode, setVisMode] = useState('bars') // 'bars' | 'wave'

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let isRunning = true

    // Resize handler for crisp Retina DPI
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = Math.max(280, rect.width * dpr)
      canvas.height = Math.max(80, rect.height * dpr)
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    let bufferLength = 64
    let dataArray = new Uint8Array(bufferLength)
    let timeArray = new Uint8Array(bufferLength)

    if (analyserNode) {
      bufferLength = analyserNode.frequencyBinCount || 64
      dataArray = new Uint8Array(bufferLength)
      timeArray = new Uint8Array(bufferLength)
    }

    let idlePhase = 0

    const render = () => {
      if (!isRunning) return

      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height

      ctx.clearRect(0, 0, w, h)

      const activeGlow = ambientColor || '#1db954'

      if (analyserNode && isPlaying) {
        if (visMode === 'bars') {
          analyserNode.getByteFrequencyData(dataArray)

          // 32 stylish neon frequency bars
          const numBars = Math.min(36, Math.max(16, Math.floor(w / 7)))
          const barWidth = Math.max(3, (w / numBars) - 2.5)
          const step = Math.max(1, Math.floor(bufferLength / numBars))

          for (let i = 0; i < numBars; i++) {
            const rawVal = dataArray[i * step] || 0
            const percent = rawVal / 255
            const barHeight = Math.max(4, percent * (h - 8))
            const x = i * (barWidth + 2.5)
            const y = h - barHeight

            // Gradient for neon effect
            const grad = ctx.createLinearGradient(0, y, 0, h)
            grad.addColorStop(0, '#ffffff')
            grad.addColorStop(0.3, activeGlow)
            grad.addColorStop(1, 'rgba(255, 255, 255, 0.08)')

            ctx.save()
            ctx.fillStyle = grad
            ctx.shadowColor = activeGlow
            ctx.shadowBlur = percent > 0.4 ? 12 : 4

            // Rounded top bar
            const radius = Math.min(barWidth / 2, 4)
            ctx.beginPath()
            ctx.moveTo(x + radius, y)
            ctx.lineTo(x + barWidth - radius, y)
            ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius)
            ctx.lineTo(x + barWidth, h)
            ctx.lineTo(x, h)
            ctx.lineTo(x, y + radius)
            ctx.quadraticCurveTo(x, y, x + radius, y)
            ctx.closePath()
            ctx.fill()
            ctx.restore()
          }
        } else {
          // 'wave' mode
          analyserNode.getByteTimeDomainData(timeArray)

          ctx.save()
          ctx.lineWidth = 2.5
          ctx.strokeStyle = activeGlow
          ctx.shadowColor = activeGlow
          ctx.shadowBlur = 10

          ctx.beginPath()
          const sliceWidth = w / bufferLength
          let x = 0

          for (let i = 0; i < bufferLength; i++) {
            const v = timeArray[i] / 128.0
            const y = (v * h) / 2

            if (i === 0) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
            x += sliceWidth
          }

          ctx.stroke()

          // Subtle gradient fill under wave
          ctx.lineTo(w, h)
          ctx.lineTo(0, h)
          ctx.closePath()
          const fillGrad = ctx.createLinearGradient(0, 0, 0, h)
          fillGrad.addColorStop(0, `${activeGlow}33`)
          fillGrad.addColorStop(1, 'rgba(0,0,0,0)')
          ctx.fillStyle = fillGrad
          ctx.fill()
          ctx.restore()
        }
      } else {
        // Idle breathing wave when paused or audio graph loading
        idlePhase += 0.04
        ctx.save()
        ctx.lineWidth = 2
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)'
        ctx.beginPath()
        const sliceWidth = w / 32
        for (let i = 0; i <= 32; i++) {
          const x = i * sliceWidth
          const amp = isPlaying ? 12 : 5
          const y = h / 2 + Math.sin(idlePhase + i * 0.3) * amp
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
        ctx.restore()
      }

      animFrameRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      isRunning = false
      window.removeEventListener('resize', resize)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [analyserNode, isPlaying, ambientColor, visMode])

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        borderRadius: 16,
        background: 'rgba(0, 0, 0, 0.35)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: 12
      }}
      className={className}
    >
      {/* Mode Switcher Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, padding: '0 4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              display: 'inline-block',
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: isPlaying ? ambientColor : '#6b7280',
              boxShadow: isPlaying ? `0 0 8px ${ambientColor}` : 'none',
              transition: 'background-color 0.3s'
            }}
          />
          <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(255, 255, 255, 0.7)' }}>
            {isPlaying ? 'Live 60fps Visualizer' : 'Visualizer Standby'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255, 255, 255, 0.06)', padding: 3, borderRadius: 8, border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <button
            type="button"
            onClick={() => setVisMode('bars')}
            style={{
              padding: '3px 6px',
              borderRadius: 6,
              border: 'none',
              cursor: 'pointer',
              background: visMode === 'bars' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
              color: visMode === 'bars' ? '#ffffff' : 'rgba(255, 255, 255, 0.4)',
              display: 'flex',
              alignItems: 'center',
              fontSize: '11px',
              fontWeight: 700
            }}
            title="Frequency Bars"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 20h2V10H4v10zm6 0h2V4h-2v16zm6 0h2v-7h-2v7zm4 0h2v-4h-2v4z"/>
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setVisMode('wave')}
            style={{
              padding: '3px 6px',
              borderRadius: 6,
              border: 'none',
              cursor: 'pointer',
              background: visMode === 'wave' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
              color: visMode === 'wave' ? '#ffffff' : 'rgba(255, 255, 255, 0.4)',
              display: 'flex',
              alignItems: 'center',
              fontSize: '11px',
              fontWeight: 700
            }}
            title="Sine Waveform"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 12c2.5-6 5.5-6 8 0s5.5 6 8 0 4-4 4-4"/>
            </svg>
          </button>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: 72, display: 'block', cursor: 'pointer' }}
        onClick={() => setVisMode((prev) => (prev === 'bars' ? 'wave' : 'bars'))}
        title="Tap to switch Visualizer mode"
      />
    </div>
  )
}
