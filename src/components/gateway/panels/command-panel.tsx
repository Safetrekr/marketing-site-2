/**
 * CommandPanel -- verification seal with chrono ring + timestamp.
 *
 * Shows a small progress ring (filling over 30s) alongside a
 * compact hex timestamp and "VERIFIED" label.
 *
 * @module command-panel
 */

'use client'

import { useEffect, useState } from 'react'

import { PanelShell } from './panel-shell'

const POSITION = { top: '35%', left: 16 } as const

// Circle geometry: r=5, circumference = 2 * PI * 5 ≈ 31.4
const RADIUS = 5
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

// ---------------------------------------------------------------------------
// Compact hex timestamp (updates every 10s)
// ---------------------------------------------------------------------------

function useHexTimestamp(): string {
  const [hex, setHex] = useState(() =>
    Math.floor(Date.now() / 1000)
      .toString(16)
      .slice(-4)
      .toUpperCase(),
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setHex(
        Math.floor(Date.now() / 1000)
          .toString(16)
          .slice(-4)
          .toUpperCase(),
      )
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  return hex
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function CommandPanel() {
  const hex = useHexTimestamp()

  return (
    <PanelShell label="CMD" position={POSITION} slideFrom="left" hideOnMobile>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        {/* Chrono ring */}
        <svg
          width={14}
          height={14}
          viewBox="0 0 14 14"
          style={{ display: 'block' }}
        >
          {/* Background ring */}
          <circle
            cx={7}
            cy={7}
            r={RADIUS}
            fill="none"
            stroke="rgba(var(--ambient-ink-rgb), 0.10)"
            strokeWidth={1}
          />
          {/* Filling ring */}
          <circle
            className="gateway-chrono-fill"
            cx={7}
            cy={7}
            r={RADIUS}
            fill="none"
            stroke="rgba(var(--ember-rgb), 0.45)"
            strokeWidth={1}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
            strokeLinecap="round"
            transform="rotate(-90 7 7)"
          />
        </svg>

        <div>
          <div style={{ fontSize: 7, opacity: 0.8 }}>{hex}</div>
          <div
            className="enrichment-flicker"
            style={{
              fontSize: 6,
              color: 'rgba(var(--ember-rgb), 0.50)',
            }}
          >
            VERIFIED
          </div>
        </div>
      </div>
    </PanelShell>
  )
}
