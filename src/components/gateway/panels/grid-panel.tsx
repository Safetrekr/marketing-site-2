/**
 * GridPanel -- drifting latitude/longitude coordinate readout.
 *
 * Simulates live GPS positioning data with slowly-changing values.
 *
 * @module grid-panel
 */

'use client'

import { useEffect, useState } from 'react'

import { PanelShell } from './panel-shell'

const POSITION = { bottom: 36, right: 16 } as const

// ---------------------------------------------------------------------------
// Drifting value hook
// ---------------------------------------------------------------------------

function useDriftingValue(
  base: number,
  variance: number,
  intervalMs: number,
  decimals = 1,
): string {
  const [value, setValue] = useState(base)

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(base + (Math.random() - 0.5) * 2 * variance)
    }, intervalMs)
    return () => clearInterval(interval)
  }, [base, variance, intervalMs])

  return value.toFixed(decimals)
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function GridPanel() {
  const lat = useDriftingValue(33.4484, 0.001, 5000, 4)
  const lng = useDriftingValue(112.074, 0.001, 6000, 3)

  return (
    <PanelShell label="GRD" position={POSITION} slideFrom="bottom">
      <span>{lat}°N</span>
      <span style={{ marginLeft: 4, opacity: 0.7 }}>{lng}°W</span>
    </PanelShell>
  )
}
