// src/components/marketing/landing/cost-of-inaction-section.tsx

import { cn } from '@/lib/utils'
import { SectionContainer } from '@/components/marketing/section-container'

const STATS = [
  {
    value: '$434M',
    label: 'K-12 large losses (2024), up from $105M in 2021',
  },
  {
    value: '2x',
    label: 'Defense costs doubled 2017-2022 -- regardless of prior claims',
  },
  {
    value: '$50K-$500K+',
    label: 'Typical cost of a single trip-related incident',
  },
] as const

export function CostOfInactionSection() {
  return (
    <SectionContainer
      id="cost-of-inaction"
      aria-labelledby="cost-of-inaction-heading"
      className="bg-gradient-to-b from-[var(--color-abyss)] to-[var(--color-void)]"
    >
      {/* Section eyebrow */}
      <p
        className={cn(
          'mb-4 text-center font-mono text-xs font-medium uppercase',
          'tracking-[0.12em]',
          'text-[var(--color-ember)]',
        )}
      >
        The Cost of Inaction
      </p>

      {/* Section heading */}
      <h2
        id="cost-of-inaction-heading"
        className={cn(
          'text-center font-sans text-3xl font-bold',
          'md:text-4xl',
          'text-[var(--color-text-primary)]',
          'mb-16 lg:mb-20',
        )}
      >
        What happens when you don&rsquo;t have a plan
      </h2>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
        {STATS.map((stat) => (
          <div key={stat.value} className="text-center">
            <p
              className={cn(
                'font-mono text-4xl font-bold',
                'md:text-5xl',
                'text-[var(--color-ember-bright)]',
              )}
            >
              {stat.value}
            </p>
            <p
              className={cn(
                'mt-3 text-sm leading-relaxed',
                'text-[var(--color-text-secondary)]',
                'mx-auto max-w-[280px]',
              )}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Source attribution */}
      <p
        className={cn(
          'mt-12 text-center font-mono text-[10px] uppercase',
          'tracking-[0.1em]',
          'text-[var(--color-text-tertiary)]',
        )}
      >
        Sources: United Educators, Large Loss Report 2025; NBOA, June 2025
      </p>
    </SectionContainer>
  )
}
