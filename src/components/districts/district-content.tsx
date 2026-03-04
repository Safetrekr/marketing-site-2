/**
 * DistrictContent -- renders the showcase system inside the district
 * shell (detail panel).
 *
 * All 7 districts use the animated step bar + typewriter system.
 * Each district's steps and sub-items are defined in district-showcases.ts.
 *
 * @module district-content
 * @see district-showcase plan
 */

'use client'

import type { DistrictId } from '@/lib/interfaces/district'
import { DISTRICT_SHOWCASE_CONFIGS } from '@/lib/data/district-showcases'
import { ShowcaseShell } from './showcase'

import '@/styles/showcase.css'

// ============================================================================
// District Content
// ============================================================================

interface DistrictContentProps {
  readonly districtId: DistrictId
}

export function DistrictContent({ districtId }: DistrictContentProps) {
  const config = DISTRICT_SHOWCASE_CONFIGS[districtId]

  return <ShowcaseShell config={config} />
}
