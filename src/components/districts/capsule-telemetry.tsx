/**
 * CapsuleTelemetry -- 2 key-value marketing rows for district capsules.
 *
 * Displays tagline and stat line. Marketing capsules are never offline,
 * so no offline/placeholder logic is needed.
 *
 * @module capsule-telemetry
 * @see WS-A.2 Section 4.4.1
 */

import { cn } from '@/lib/utils'
import type { CapsuleTelemetry as CapsuleTelemetryData } from '@/lib/interfaces/district'

export interface CapsuleTelemetryProps {
  /** Marketing telemetry data. */
  telemetry: CapsuleTelemetryData
}

const LABEL_CLASSES = cn(
  'font-sans text-[10px] font-normal tracking-[0.06em] uppercase',
  'leading-none text-[var(--color-text-tertiary)]',
)

const VALUE_CLASSES = cn(
  'font-mono text-[16px] font-medium',
  'leading-none text-[var(--color-text-primary)]',
)

interface TelemetryRowProps {
  label: string
  value: string
}

function TelemetryRow({ label, value }: TelemetryRowProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <span data-slot="telemetry-label" className={LABEL_CLASSES}>
        {label}
      </span>
      <span
        data-slot="telemetry-value"
        className={cn(VALUE_CLASSES, 'tabular-nums')}
      >
        {value}
      </span>
    </div>
  )
}

export function CapsuleTelemetry({ telemetry }: CapsuleTelemetryProps) {
  return (
    <div className="flex flex-col gap-6">
      <TelemetryRow label="TAGLINE" value={telemetry.tagline} />
      <TelemetryRow label="STAT" value={telemetry.statLine} />
    </div>
  )
}
