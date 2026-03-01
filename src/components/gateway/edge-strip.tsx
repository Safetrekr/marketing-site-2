/**
 * EdgeStrip -- collapsed check dots at viewport edges.
 *
 * Renders 3px green dots at fixed positions around the viewport
 * perimeter. Each dot appears when its corresponding check collapses.
 *
 * @module edge-strip
 */

'use client'

import { useGatewayStore } from '@/stores/gateway.store'

// ---------------------------------------------------------------------------
// Dot positions (viewport-relative, matching CalibrationMarks 12px inset)
// ---------------------------------------------------------------------------

const DOT_POSITIONS = [
  { top: 12, left: '25%' },
  { top: 12, left: '75%' },
  { top: '40%', right: 12 },
  { top: '60%', right: 12 },
  { bottom: 32, left: '25%' },
  { bottom: 32, left: '75%' },
  { bottom: 32, left: '50%' },
  { top: '50%', left: 12 },
] as const

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function EdgeStrip() {
  const checks = useGatewayStore((s) => s.checks)

  return (
    <>
      {checks.map((check, i) => {
        if (check.status !== 'collapsed') return null
        const pos = DOT_POSITIONS[i]
        if (!pos) return null

        return (
          <div
            key={check.id}
            className="gateway-dot-appear enrichment-rec-pulse fixed"
            style={{
              width: 3,
              height: 3,
              borderRadius: '50%',
              backgroundColor: 'rgba(var(--ember-rgb), 0.30)',
              zIndex: 30,
              ...pos,
            }}
            aria-hidden="true"
          />
        )
      })}
    </>
  )
}
