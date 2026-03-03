// src/components/marketing/landing/social-proof-section.tsx

import { cn } from '@/lib/utils'
import { SectionContainer } from '@/components/marketing/section-container'
import { GlassCard } from '@/components/marketing/glass-card'

const CAPABILITY_PROOFS = [
  {
    stat: '18',
    label: 'Review dimensions per trip',
    description:
      'Every trip reviewed by an independent safety analyst across 18 safety dimensions before departure.',
  },
  {
    stat: '46',
    label: 'Protection endpoints',
    description:
      'Rally points, safe houses, geofencing, SMS broadcast, and evacuation plans -- active and connected.',
  },
  {
    stat: '4',
    label: 'Integrated portals',
    description:
      'Client, Analyst, HQ, and Traveler portals working from one system of record.',
  },
] as const

export function SocialProofSection() {
  return (
    <SectionContainer
      id="social-proof"
      aria-labelledby="social-proof-heading"
      className="bg-gradient-to-b from-[var(--color-void)] to-[var(--color-abyss)]"
    >
      {/* Section monospace label */}
      <p
        className={cn(
          'mb-4 text-center font-mono text-xs font-medium uppercase',
          'tracking-[0.12em]',
          'text-[var(--color-text-tertiary)]',
        )}
      >
        Platform Metrics
      </p>

      {/* Section heading */}
      <h2
        id="social-proof-heading"
        className={cn(
          'text-center font-sans text-3xl font-bold',
          'md:text-4xl',
          'text-[var(--color-text-primary)]',
          'mb-16 lg:mb-20',
        )}
      >
        Trusted by organizations that take safety seriously.
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {CAPABILITY_PROOFS.map((proof) => (
          <GlassCard key={proof.stat}>
            {/* Stat number */}
            <p
              className={cn(
                'font-mono text-4xl font-bold',
                'text-[var(--color-ember)]',
                'lg:text-5xl',
              )}
            >
              {proof.stat}
            </p>

            {/* Stat label */}
            <p
              className={cn(
                'mt-2 font-sans text-sm font-medium uppercase',
                'tracking-[0.04em]',
                'text-[var(--color-text-primary)]',
              )}
            >
              {proof.label}
            </p>

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
        ))}
      </div>
    </SectionContainer>
  )
}
