/**
 * BeaconPanel -- signal strength bars with pulse dot.
 *
 * Shows 4 signal bars that cycle strength periodically,
 * simulating an active traveler beacon signal.
 *
 * @module beacon-panel
 */

'use client'

import { useEffect, useState } from 'react'

import { PanelShell } from './panel-shell'

const POSITION = { top: '60%', right: 16 } as const
const BAR_HEIGHTS = [3, 5, 7, 9]

export function BeaconPanel() {
  const [strength, setStrength] = useState(4)

  useEffect(() => {
    const interval = setInterval(() => {
      // Cycle between 3 and 4 bars active (strong signal)
      setStrength(Math.random() > 0.3 ? 4 : 3)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <PanelShell label="BCN" position={POSITION} slideFrom="right" hideOnMobile>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 1.5 }}>
        {BAR_HEIGHTS.map((h, i) => (
          <div
            key={i}
            style={{
              width: 2,
              height: h,
              borderRadius: 0.5,
              backgroundColor:
                i < strength
                  ? 'rgba(var(--ember-rgb), 0.50)'
                  : 'rgba(var(--ambient-ink-rgb), 0.10)',
              transition: 'background-color 600ms ease',
            }}
          />
        ))}
        <div
          className="enrichment-rec-pulse"
          style={{
            width: 3,
            height: 3,
            borderRadius: '50%',
            backgroundColor: 'rgba(var(--ember-rgb), 0.50)',
            marginLeft: 3,
          }}
        />
      </div>
    </PanelShell>
  )
}
