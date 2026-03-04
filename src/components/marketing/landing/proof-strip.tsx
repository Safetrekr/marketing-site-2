// src/components/marketing/landing/proof-strip.tsx

import { cn } from '@/lib/utils'

const PROOF_POINTS = [
  { value: '18', label: 'Review Dimensions' },
  { value: '11+', label: 'Intel Sources' },
  { value: '4', label: 'Portals' },
  { value: '46+', label: 'Destinations' },
] as const

export function ProofStrip() {
  return (
    <div
      className={cn(
        'border-y border-white/[0.06]',
        'bg-white/[0.02]',
        'py-8',
      )}
    >
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-8 px-6 md:gap-16 lg:gap-20">
        {PROOF_POINTS.map((point) => (
          <div key={point.label} className="text-center">
            <p
              className={cn(
                'font-mono text-2xl font-bold',
                'text-[var(--color-ember-bright)]',
              )}
            >
              {point.value}
            </p>
            <p
              className={cn(
                'mt-1 font-mono text-[10px] uppercase',
                'tracking-[0.12em]',
                'text-[var(--color-text-tertiary)]',
              )}
            >
              {point.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
