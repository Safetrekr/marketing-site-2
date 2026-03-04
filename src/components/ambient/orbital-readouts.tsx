/**
 * OrbitalReadouts -- compact telemetry panel fixed in the bottom-right,
 * positioned to the left of the minimap.
 *
 * Shows 7 district readouts (shortCode, uptime, response time) in a
 * single-column list with staggered flicker animation.
 *
 * Reads live district data from the enrichment store. Highlights the
 * focused district row when a capsule is hovered.
 *
 * Purely decorative: pointer-events disabled, aria-hidden assumed
 * from the parent wrapper.
 *
 * @module orbital-readouts
 * @see WS-1.6 Ambient Effects Layer
 */

'use client'

import { useMemo } from 'react'
import { useEnrichmentStore } from '@/stores/enrichment.store'
import type { DistrictId } from '@/lib/interfaces/district'
import type { DistrictEnrichment } from '@/lib/enrichment/enrichment-types'

// ---------------------------------------------------------------------------
// Flicker delays (staggered so rows don't blink in unison)
// ---------------------------------------------------------------------------

const FLICKER_DELAYS = [0, 2.4, 5.1, 1.7, 7.3, 3.8, 6.0]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Format seconds into a compact uptime string.
 * Examples: "3.2H", "47M", "12S"
 */
function formatCompactUptime(seconds: number): string {
  if (seconds >= 3600) {
    const hours = seconds / 3600
    return `${hours.toFixed(1)}H`
  }
  if (seconds >= 60) {
    const minutes = Math.floor(seconds / 60)
    return `${minutes}M`
  }
  return `${seconds}S`
}

// ---------------------------------------------------------------------------
// District ordering (ring order)
// ---------------------------------------------------------------------------

const DISTRICT_ORDER: DistrictId[] = [
  'how-it-works',
  'who-its-for',
  'platform',
  'security',
  'pricing',
  'get-started',
  'about-us',
]

// ---------------------------------------------------------------------------
// Focus-highlight opacity helpers
// ---------------------------------------------------------------------------

function focusOpacity(
  readoutId: string,
  focusedId: DistrictId | null,
): { label: number; value: number } {
  if (focusedId === null) return { label: 0.25, value: 0.32 }
  if (readoutId === focusedId) return { label: 0.6, value: 0.8 }
  return { label: 0.08, value: 0.12 }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function OrbitalReadouts() {
  const districts = useEnrichmentStore((s) => s.districts)
  const focusedDistrictId = useEnrichmentStore((s) => s.focusedDistrictId)

  const readouts = useMemo(() => {
    return DISTRICT_ORDER.map((id, idx) => {
      const d: DistrictEnrichment = districts[id]
      return {
        id,
        shortCode: d.shortCode,
        uptime: d.uptime,
        responseTimeMs: d.responseTimeMs,
        delay: FLICKER_DELAYS[idx],
      }
    })
  }, [districts])

  return (
    <div
      className="pointer-events-none fixed z-40 flex flex-col gap-[3px]"
      style={{
        left: 16,
        bottom: 48,
      }}
    >
      {readouts.map((readout) => {
        const opacity = focusOpacity(readout.id, focusedDistrictId)

        return (
          <div
            key={readout.id}
            className="flex items-baseline gap-2 whitespace-nowrap"
          >
            <span
              className="enrichment-flicker"
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: 9,
                letterSpacing: '0.08em',
                color: `rgba(var(--ambient-ink-rgb), ${opacity.label})`,
                textTransform: 'uppercase',
                transition: 'color 200ms ease',
                minWidth: 22,
              }}
            >
              {readout.shortCode}
            </span>
            <span
              className="enrichment-flicker"
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: 8,
                letterSpacing: '0.06em',
                color: `rgba(var(--ambient-ink-rgb), ${opacity.value})`,
                textTransform: 'uppercase',
                animationDelay: `${readout.delay}s`,
                transition: 'color 200ms ease',
              }}
            >
              {formatCompactUptime(readout.uptime)}
            </span>
            <span
              className="enrichment-flicker"
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: 8,
                letterSpacing: '0.06em',
                color: `rgba(var(--ambient-ink-rgb), ${opacity.value})`,
                textTransform: 'uppercase',
                animationDelay: `${readout.delay + 1.5}s`,
                transition: 'color 200ms ease',
              }}
            >
              {readout.responseTimeMs}ms
            </span>
          </div>
        )
      })}
    </div>
  )
}
