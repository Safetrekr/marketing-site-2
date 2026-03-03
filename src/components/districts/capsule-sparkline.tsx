/**
 * CapsuleSparkline -- decorative mini chart for district capsules.
 *
 * Renders @tarva/ui Sparkline in teal with 0.30 opacity.
 *
 * @module capsule-sparkline
 * @see WS-1.2 Section 4.7
 */

import type { CSSProperties } from 'react'

import { Sparkline } from '@tarva/ui'

export interface CapsuleSparklineProps {
  /** Array of numeric data points for the sparkline. */
  data: number[]
}

export function CapsuleSparkline({ data }: CapsuleSparklineProps) {
  return (
    <div data-slot="capsule-sparkline">
      <Sparkline
        data={data}
        width={152}
        height={24}
        strokeWidth={1}
        variant="neutral"
        showFill={false}
        animated={false}
        aria-hidden="true"
        style={
          {
            '--trend-neutral': 'var(--color-teal)',
          } as CSSProperties
        }
      />
    </div>
  )
}
