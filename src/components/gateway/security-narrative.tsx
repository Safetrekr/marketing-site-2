/**
 * SecurityNarrative -- post-reveal ambient text cycling.
 *
 * Displays rotating security-themed status messages below the CTAs.
 * Each message types in character-by-character, holds, then types the next.
 *
 * @module security-narrative
 */

'use client'

import { useEffect, useState, useCallback } from 'react'

import { useGatewayStore, type GatewayPhase } from '@/stores/gateway.store'
import { useTypewriter } from '@/hooks/use-typewriter'

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
  const [hold, setHold] = useState(false)

  const active = isAmbient(phase)

  const handleComplete = useCallback(() => {
    setHold(true)
  }, [])

  const { displayText, isTyping } = useTypewriter({
    text: NARRATIVES[index],
    enabled: active && !hold,
    delay: 0,
    speed: 30,
    onComplete: handleComplete,
  })

  // Hold for 2.5s then advance
  useEffect(() => {
    if (!hold || !active) return
    const timer = setTimeout(() => {
      setHold(false)
      setIndex((prev) => (prev + 1) % NARRATIVES.length)
    }, 2500)
    return () => clearTimeout(timer)
  }, [hold, active])

  if (!active) return null

  return (
    <div
      className="font-mono text-[9px] font-medium uppercase"
      style={{
        letterSpacing: '0.08em',
        color: 'rgba(var(--ambient-ink-rgb), 0.12)',
        minHeight: '1.2em',
      }}
      aria-hidden="true"
    >
      {displayText}
      {isTyping && (
        <span
          className="gateway-cursor-blink"
          style={{
            display: 'inline-block',
            width: 1,
            height: '1em',
            backgroundColor: 'currentColor',
            marginLeft: 1,
            verticalAlign: 'text-bottom',
            opacity: 0.6,
          }}
        />
      )}
    </div>
  )
}
