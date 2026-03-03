// src/components/marketing/landing/verticals-section.tsx

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { SectionContainer } from '@/components/marketing/section-container'
import { GlassCard } from '@/components/marketing/glass-card'

const VERTICALS = [
  {
    name: 'K-12 Schools',
    description:
      'Field trip safety, parental consent, background screening, and regulatory compliance -- documented for every trip.',
  },
  {
    name: 'Higher Education',
    description:
      'Study abroad risk management, international safety review, and institutional audit documentation.',
  },
  {
    name: 'Churches',
    description:
      'Mission trip safety planning, volunteer screening, international risk assessment, and emergency preparedness.',
  },
  {
    name: 'Youth Sports',
    description:
      'Tournament travel coordination, coach screening, medical consent, and real-time alerts for traveling teams.',
  },
  {
    name: 'Business',
    description:
      'Corporate duty of care documented, not assumed. Travel risk management with per-trip pricing.',
  },
] as const

export function VerticalsSection() {
  return (
    <SectionContainer
      id="verticals"
      aria-labelledby="verticals-heading"
      className="bg-[var(--color-void)]"
    >
      {/* Section monospace label */}
      <p
        className={cn(
          'mb-4 text-center font-mono text-xs font-medium uppercase',
          'tracking-[0.12em]',
          'text-[var(--color-text-tertiary)]',
        )}
      >
        Verticals
      </p>

      {/* Section heading */}
      <h2
        id="verticals-heading"
        className={cn(
          'text-center font-sans text-3xl font-bold',
          'md:text-4xl',
          'text-[var(--color-text-primary)]',
          'mb-16 lg:mb-20',
        )}
      >
        Built for organizations that move people.
      </h2>

      {/* Cards grid -- first 3 in a row, last 2 centered */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {VERTICALS.slice(0, 3).map((vertical) => (
          <GlassCard key={vertical.name}>
            <h3
              className={cn(
                'font-sans text-lg font-semibold',
                'text-[var(--color-text-primary)]',
              )}
            >
              {vertical.name}
            </h3>

            <p
              className={cn(
                'mt-4 text-sm leading-relaxed',
                'text-[var(--color-text-secondary)]',
              )}
            >
              {vertical.description}
            </p>

            <Link
              href="/solutions"
              className={cn(
                'mt-4 inline-flex items-center gap-1.5',
                'text-sm font-medium',
                'text-[var(--color-ember)]',
                'hover:text-[var(--color-ember-bright)]',
                'transition-colors duration-[var(--duration-hover)]',
                'focus-visible:outline-2 focus-visible:outline-offset-2',
                'focus-visible:outline-[var(--color-ember-bright)]',
              )}
            >
              Learn more
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </GlassCard>
        ))}

        {/* Cards 4-5: centered in a spanning row on lg */}
        <div className="flex flex-col gap-6 sm:col-span-2 sm:flex-row sm:justify-center lg:col-span-3">
          {VERTICALS.slice(3).map((vertical) => (
            <GlassCard
              key={vertical.name}
              className="sm:max-w-[calc(50%-12px)] lg:max-w-[calc(33.333%-16px)]"
            >
              <h3
                className={cn(
                  'font-sans text-lg font-semibold',
                  'text-[var(--color-text-primary)]',
                )}
              >
                {vertical.name}
              </h3>

              <p
                className={cn(
                  'mt-4 text-sm leading-relaxed',
                  'text-[var(--color-text-secondary)]',
                )}
              >
                {vertical.description}
              </p>

              <Link
                href="/solutions"
                className={cn(
                  'mt-4 inline-flex items-center gap-1.5',
                  'text-sm font-medium',
                  'text-[var(--color-ember)]',
                  'hover:text-[var(--color-ember-bright)]',
                  'transition-colors duration-[var(--duration-hover)]',
                  'focus-visible:outline-2 focus-visible:outline-offset-2',
                  'focus-visible:outline-[var(--color-ember-bright)]',
                )}
              >
                Learn more
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </GlassCard>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}
