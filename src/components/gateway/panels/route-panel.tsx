/**
 * RoutePanel -- animated SVG dashed route trace.
 *
 * Shows a small polyline with flowing dashes representing
 * a route being analyzed. Uses CSS animation for dash flow.
 *
 * @module route-panel
 */

'use client'

import { PanelShell } from './panel-shell'

const POSITION = { top: 48, left: 16 } as const

export function RoutePanel() {
  return (
    <PanelShell label="RTE" position={POSITION} slideFrom="top">
      <svg
        width={60}
        height={14}
        viewBox="0 0 60 14"
        fill="none"
        style={{ display: 'block' }}
      >
        <polyline
          className="gateway-route-flow"
          points="2,12 12,4 24,10 36,3 48,8 58,2"
          stroke="rgba(var(--ember-rgb), 0.45)"
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 3"
          fill="none"
        />
        {/* Waypoint dots */}
        {[
          [2, 12],
          [24, 10],
          [48, 8],
          [58, 2],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={1.5}
            fill="rgba(var(--ember-rgb), 0.40)"
          />
        ))}
      </svg>
    </PanelShell>
  )
}
