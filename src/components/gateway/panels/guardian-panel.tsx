/**
 * GuardianPanel -- SVG heartbeat trace with connection status.
 *
 * Shows a heartbeat-style line that draws itself in, simulating
 * a live guardian connection link.
 *
 * @module guardian-panel
 */

'use client'

import { PanelShell } from './panel-shell'

const POSITION = { top: '60%', left: 16 } as const

export function GuardianPanel() {
  return (
    <PanelShell label="GDN" position={POSITION} slideFrom="left" hideOnMobile>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <svg
          width={50}
          height={10}
          viewBox="0 0 50 10"
          fill="none"
          style={{ display: 'block' }}
        >
          <polyline
            className="gateway-heartbeat-draw"
            points="0,5 10,5 14,1 18,9 22,5 50,5"
            stroke="rgba(var(--ember-rgb), 0.45)"
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="60"
            strokeDashoffset="60"
            fill="none"
          />
        </svg>
        <span
          className="enrichment-flicker"
          style={{ fontSize: 6 }}
        >
          LINKED
        </span>
      </div>
    </PanelShell>
  )
}
