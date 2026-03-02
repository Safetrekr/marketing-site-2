/**
 * EmergencyPanel -- mini canvas waveform.
 *
 * Shows a small sine wave animation representing an open
 * emergency communication channel. Reuses the MiniWaveform
 * pattern from bottom-status-strip.tsx.
 *
 * @module emergency-panel
 */

'use client'

import { useEffect, useRef } from 'react'

import { PanelShell } from './panel-shell'

const POSITION = { bottom: 36, left: 16 } as const
const WAVE_COLOR = 'rgba(var(--ember-rgb), 0.50)'

// ---------------------------------------------------------------------------
// Mini waveform (inlined from bottom-status-strip pattern)
// ---------------------------------------------------------------------------

function MiniWaveform() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height

    const animate = () => {
      const t = performance.now() / 1000
      ctx.clearRect(0, 0, w, h)
      ctx.strokeStyle = WAVE_COLOR
      ctx.lineWidth = 1
      ctx.beginPath()

      for (let x = 0; x < w; x++) {
        const y =
          h / 2 +
          Math.sin(x * 0.25 + t * 3) * 2 +
          Math.sin(x * 0.12 + t * 1.5) * 1.5
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }

      ctx.stroke()
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={40}
      height={8}
      style={{ width: 40, height: 8, opacity: 0.8 }}
    />
  )
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function EmergencyPanel() {
  return (
    <PanelShell label="EMG" position={POSITION} slideFrom="bottom">
      <MiniWaveform />
    </PanelShell>
  )
}
