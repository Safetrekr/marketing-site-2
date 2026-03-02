/**
 * RiskPanel -- cycling risk status ticker.
 *
 * Rotates through risk levels with a flicker shimmer effect.
 *
 * @module risk-panel
 */

'use client'

import { useEffect, useState } from 'react'

import { PanelShell } from './panel-shell'

const POSITION = { top: 48, right: 16 } as const
const RISK_LEVELS = ['LOW', 'NOM', 'CLR', 'MON'] as const

export function RiskPanel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % RISK_LEVELS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <PanelShell label="RSK" position={POSITION} slideFrom="top">
      <span className="enrichment-flicker">
        {RISK_LEVELS[index]}
      </span>
    </PanelShell>
  )
}
