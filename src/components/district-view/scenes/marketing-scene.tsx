/**
 * MarketingScene -- shared ambient background for all marketing districts.
 *
 * Renders a generic decorative background with subtle grid lines,
 * floating particles, and per-district color tinting. Replaces the
 * 6 individual Tarva scene components.
 *
 * Purely decorative: no interactivity, pointer-events disabled.
 *
 * @module marketing-scene
 * @see WS-A.2 Section 4.7.1
 */

'use client'

import { useEffect, useRef } from 'react'
import type { DistrictId } from '@/lib/interfaces/district'
import type { PanelSide } from '@/lib/morph-types'

// ---------------------------------------------------------------------------
// Per-district accent colors for subtle tinting
// ---------------------------------------------------------------------------

const DISTRICT_ACCENTS: Record<DistrictId, { rgb: string; alpha: number }> = {
  'how-it-works': { rgb: 'var(--ember-rgb)', alpha: 0.06 },
  'who-its-for': { rgb: 'var(--teal-bright-rgb)', alpha: 0.06 },
  'platform': { rgb: 'var(--healthy-rgb)', alpha: 0.04 },
  'security': { rgb: 'var(--ember-bright-rgb)', alpha: 0.05 },
  'pricing': { rgb: 'var(--ember-rgb)', alpha: 0.04 },
  'get-started': { rgb: '245, 158, 11', alpha: 0.06 },
}

// ---------------------------------------------------------------------------
// Grid lines (decorative)
// ---------------------------------------------------------------------------

function GridLines() {
  return (
    <svg
      width="100%"
      height="100%"
      style={{ position: 'absolute', inset: 0, opacity: 0.03 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="marketing-grid" width="80" height="80" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="80" y2="0" stroke="currentColor" strokeWidth="0.5" />
          <line x1="0" y1="0" x2="0" y2="80" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#marketing-grid)" />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Floating particles (canvas-based, lightweight)
// ---------------------------------------------------------------------------

function FloatingParticles({ accentRgb }: { accentRgb: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Resolve CSS variable if needed
    let resolvedRgb = accentRgb
    if (accentRgb.startsWith('var(')) {
      const cs = getComputedStyle(canvas)
      const varName = accentRgb.replace('var(', '').replace(')', '')
      resolvedRgb = cs.getPropertyValue(varName).trim() || '75, 164, 103'
    }

    const w = canvas.width
    const h = canvas.height

    // Generate particle positions (deterministic from dimensions)
    const particles = Array.from({ length: 20 }, (_, i) => ({
      x: ((i * 137.5) % w),
      y: ((i * 97.3) % h),
      size: 1 + (i % 3) * 0.5,
      speed: 0.1 + (i % 5) * 0.05,
      phase: i * 0.8,
    }))

    let raf: number

    const animate = () => {
      const t = performance.now() / 1000
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        const x = p.x + Math.sin(t * p.speed + p.phase) * 30
        const y = p.y + Math.cos(t * p.speed * 0.7 + p.phase) * 20
        const alpha = 0.15 + Math.sin(t * 0.5 + p.phase) * 0.1

        ctx.beginPath()
        ctx.arc(x, y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${resolvedRgb}, ${alpha})`
        ctx.fill()
      }

      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [accentRgb])

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      }}
    />
  )
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface MarketingSceneProps {
  readonly districtId: DistrictId
  readonly dockSide: PanelSide
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function MarketingScene({ districtId, dockSide }: MarketingSceneProps) {
  const accent = DISTRICT_ACCENTS[districtId]

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        // Shift content away from the dock panel
        paddingLeft: dockSide === 'left' ? 360 : 0,
        paddingRight: dockSide === 'right' ? 360 : 0,
      }}
    >
      {/* Subtle radial gradient tint */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 50% 50%, rgba(${accent.rgb}, ${accent.alpha}) 0%, transparent 70%)`,
        }}
      />

      {/* Grid lines */}
      <GridLines />

      {/* Floating particles */}
      <FloatingParticles accentRgb={accent.rgb} />
    </div>
  )
}
