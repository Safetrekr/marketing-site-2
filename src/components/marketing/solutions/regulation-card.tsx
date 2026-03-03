// src/components/marketing/solutions/regulation-card.tsx

import type { VerticalRegulation } from '@/lib/interfaces/solutions'
import { cn } from '@/lib/utils'

interface RegulationCardProps {
  regulation: VerticalRegulation
}

export function RegulationCard({ regulation }: RegulationCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl p-6',
        'bg-white/[0.04] border border-white/[0.06]',
      )}
    >
      {/* Regulation name + verification badge */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-sans text-base font-semibold text-[var(--color-text-primary)]">
            {regulation.name}
          </h3>
          <p className="mt-1 text-xs text-[var(--color-text-tertiary)]">
            {regulation.fullName}
          </p>
        </div>
        <span
          className={cn(
            'flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium',
            regulation.verified
              ? 'bg-[rgba(var(--ember-rgb),0.12)] text-[var(--color-ember)]'
              : 'bg-white/[0.06] text-[var(--color-text-tertiary)]',
          )}
        >
          {regulation.verified ? 'Verified' : 'Under review'}
        </span>
      </div>

      {/* Description */}
      <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
        {regulation.description}
      </p>

      {/* Safetrekr alignment */}
      <div className="mt-4 border-t border-white/[0.06] pt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-text-tertiary)]">
          Safetrekr alignment
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
          {regulation.safetrekrAlignment}
        </p>
      </div>
    </div>
  )
}
