/**
 * CapsuleHealthBar -- 3px animated status bar for district capsules.
 *
 * All marketing capsules show "OPERATIONAL" green glow. The "Get Started"
 * capsule (isConversion) uses amber (#F59E0B) instead.
 *
 * Animation uses CSS @keyframes (Ambient tier) defined in atrium.css.
 * Stagger delay is driven by `data-index` attribute (1.2s per capsule).
 *
 * @module capsule-health-bar
 * @see WS-A.2 Section 4.4.3
 */

import { HEALTH_STATE_MAP, type HealthState } from '@/lib/interfaces/district'

export interface CapsuleHealthBarProps {
  /** Current health state. */
  health: HealthState
  /** Index 0-5 for stagger delay (1.2s per capsule). */
  capsuleIndex: number
  /** Whether this is the conversion district (uses amber accent). */
  isConversion?: boolean
}

export function CapsuleHealthBar({ health, capsuleIndex, isConversion }: CapsuleHealthBarProps) {
  const { color } = HEALTH_STATE_MAP[health]

  return (
    <div
      className="capsule-health-bar"
      data-index={capsuleIndex}
      data-health={health}
      style={{
        backgroundColor: isConversion ? '#F59E0B' : `var(${color})`,
      }}
      role="presentation"
      aria-hidden="true"
    />
  )
}
