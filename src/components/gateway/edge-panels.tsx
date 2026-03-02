/**
 * EdgePanels -- living micro-telemetry panels at viewport edges.
 *
 * Replaces the old EdgeStrip (simple dots). Each completed system
 * check spawns a themed micro-panel at a specific viewport edge,
 * showing live-updating telemetry detail. Creates the effect of a
 * "growing" intelligence dashboard around the user.
 *
 * Panel order matches check order in gateway-checks.ts:
 * 0: Route (top-left)    1: Risk (top-right)
 * 2: Env (right-top)     3: Beacon (right-bottom)
 * 4: Grid (bottom-right) 5: Emergency (bottom-left)
 * 6: Guardian (left-bottom) 7: Command (left-top)
 *
 * @module edge-panels
 */

'use client'

import { useGatewayStore } from '@/stores/gateway.store'

import { RoutePanel } from './panels/route-panel'
import { RiskPanel } from './panels/risk-panel'
import { EnvPanel } from './panels/env-panel'
import { BeaconPanel } from './panels/beacon-panel'
import { GridPanel } from './panels/grid-panel'
import { EmergencyPanel } from './panels/emergency-panel'
import { GuardianPanel } from './panels/guardian-panel'
import { CommandPanel } from './panels/command-panel'

// ---------------------------------------------------------------------------
// Panel components mapped to check indices
// ---------------------------------------------------------------------------

const PANELS = [
  RoutePanel,
  RiskPanel,
  EnvPanel,
  BeaconPanel,
  GridPanel,
  EmergencyPanel,
  GuardianPanel,
  CommandPanel,
] as const

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function EdgePanels() {
  const checks = useGatewayStore((s) => s.checks)

  return (
    <>
      {checks.map((check, i) => {
        if (check.status !== 'collapsed') return null
        const Panel = PANELS[i]
        if (!Panel) return null
        return <Panel key={check.id} />
      })}
    </>
  )
}
