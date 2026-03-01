/**
 * SecurityNarrative -- post-reveal ambient text cycling.
 *
 * Displays rotating security-themed status messages below the CTAs.
 * Each message shows for 3s then cross-fades to the next.
 *
 * @module security-narrative
 */

'use client'

import { useEffect, useState } from 'react'

import { useGatewayStore, type GatewayPhase } from '@/stores/gateway.store'

// ---------------------------------------------------------------------------
// Narrative lines
// ---------------------------------------------------------------------------

const NARRATIVES = [
  'Perimeter monitoring active',
  'Route risk: nominal',
  'Check-in intervals: standing by',
  'Emergency channel: open',
  'Advisory feed: streaming',
  'Guardian link: active',
  'Traveler status: all clear',
] as const

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isAmbient(phase: GatewayPhase): boolean {
  return phase === 'ambient'
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SecurityNarrative() {
  const phase = useGatewayStore((s) => s.phase)
  const [index, setIndex] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (!isAmbient(phase)) return

    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % NARRATIVES.length)
        setFading(false)
      }, 300)
    }, 3000)

    return () => clearInterval(interval)
  }, [phase])

  if (!isAmbient(phase)) return null

  return (
    <div
      className="font-mono text-[9px] font-medium uppercase"
      style={{
        letterSpacing: '0.08em',
        color: 'rgba(var(--ambient-ink-rgb), 0.12)',
        transition: 'opacity 300ms ease',
        opacity: fading ? 0 : 1,
      }}
      aria-hidden="true"
    >
      {NARRATIVES[index]}
    </div>
  )
}
