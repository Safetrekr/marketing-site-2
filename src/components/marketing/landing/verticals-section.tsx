// src/components/marketing/landing/verticals-section.tsx

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { SectionContainer } from '@/components/marketing/section-container'
import { GlassCard } from '@/components/marketing/glass-card'

const VERTICALS = [
  {
    name: 'K-12 Schools',
    slug: 'k12',
    description:
      'Field trips, athletic travel, overnight excursions. Built for FERPA compliance and the duty-of-care requirements that schools face daily -- with background checks, document collection, and board-ready documentation that satisfies your board and your insurer.',
  },
  {
    name: 'Higher Education',
    slug: 'higher-ed',
    description:
      'Study abroad, research travel, collegiate athletics. Designed for environments where Clery Act compliance, Title IX obligations, and institutional risk management are priorities.',
  },
  {
    name: 'Churches & Mission',
    slug: 'churches',
    description:
      'Mission trips, youth retreats, service projects. Insurance-compliant documentation, volunteer background screening, and professional safety planning for remote destinations and extended durations.',
  },
  {
    name: 'Corporate & Sports',
    slug: 'business',
    description:
      'Conferences, tournaments, team travel, executive offsites. Duty-of-care compliance, real-time risk intelligence, and professional documentation for organizations that move groups of people.',
  },
] as const

export function VerticalsSection() {
  return (
    <SectionContainer
      id="verticals"
      aria-labelledby="verticals-heading"
      className="bg-[var(--color-void)]"
    >
      {/* Section eyebrow */}
      <p
        className={cn(
          'mb-4 text-center font-mono text-xs font-medium uppercase',
          'tracking-[0.12em]',
          'text-[var(--color-ember)]',
        )}
      >
        Solutions
      </p>

      {/* Section heading */}
      <h2
        id="verticals-heading"
        className={cn(
          'text-center font-sans text-3xl font-bold',
          'md:text-4xl',
          'text-[var(--color-text-primary)]',
          'mb-4',
        )}
      >
        Built for your organization
      </h2>

      {/* Subtitle */}
      <p
        className={cn(
          'mx-auto mb-16 max-w-[640px] text-center text-base leading-relaxed lg:mb-20',
          'text-[var(--color-text-secondary)]',
        )}
      >
        Every organization type has different compliance requirements, trip patterns, and
        stakeholders. Safetrekr is built for all of them.
      </p>

      {/* Cards grid -- 2x2 */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {VERTICALS.map((vertical) => (
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
              href={`/solutions/${vertical.slug}`}
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
              Explore Solutions
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </GlassCard>
        ))}
      </div>
    </SectionContainer>
  )
}
