// src/components/marketing/social-proof/capability-proof-card.tsx

import { cn } from '@/lib/utils'
import { GlassCard } from '@/components/marketing/glass-card'
import type { CapabilityProof } from '@/lib/interfaces/social-proof'

interface CapabilityProofCardProps {
  proof: CapabilityProof
  className?: string
}

export function CapabilityProofCard({
  proof,
  className,
}: CapabilityProofCardProps) {
  return (
    <GlassCard className={cn('text-center', className)}>
      {/* Stat number */}
      <div
        className={cn(
          'font-mono text-4xl font-bold',
          'text-[var(--color-ember)]',
          'lg:text-5xl',
        )}
      >
        {proof.stat}
      </div>

      {/* Stat label */}
      <div
        className={cn(
          'mt-2 font-sans text-sm font-medium uppercase',
          'tracking-[0.04em]',
          'text-[var(--color-text-primary)]',
        )}
      >
        {proof.label}
      </div>

      {/* Description */}
      <p
        className={cn(
          'mt-3 text-sm leading-relaxed',
          'text-[var(--color-text-secondary)]',
        )}
      >
        {proof.description}
      </p>
    </GlassCard>
  )
}
