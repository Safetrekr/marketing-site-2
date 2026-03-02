/**
 * EnvPanel -- drifting temperature and humidity readout.
 *
 * Shows slowly-changing environmental values to simulate
 * live sensor data from a destination.
 *
 * @module env-panel
 */

'use client'

import { useEffect, useState } from 'react'

import { PanelShell } from './panel-shell'

const POSITION = { top: '35%', right: 16 } as const

// ---------------------------------------------------------------------------
// Drifting value hook (inlined from bottom-status-strip pattern)
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

export function EnvPanel() {
  const temp = useDriftingValue(24.3, 1.5, 3000, 1)
  const humidity = useDriftingValue(62, 5, 4000, 0)

  return (
    <PanelShell label="ENV" position={POSITION} slideFrom="right" hideOnMobile>
      <span>{temp}°C</span>
      <span style={{ marginLeft: 6, opacity: 0.7 }}>{humidity}%RH</span>
    </PanelShell>
  )
}
