/**
 * DistrictViewContent -- renders the MarketingScene ambient background
 * for the active district, passing `dockSide` so scenes know which
 * side to clear for the dock panel.
 *
 * @module district-view-content
 */

'use client'

import type { DistrictId } from '@/lib/interfaces/district'
import type { PanelSide } from '@/lib/morph-types'
import { MarketingScene } from './scenes'

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface DistrictViewContentProps {
  readonly districtId: DistrictId
  readonly panelSide: PanelSide
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function DistrictViewContent({ districtId, panelSide }: DistrictViewContentProps) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <MarketingScene districtId={districtId} dockSide={panelSide} />
    </div>
  )
}
