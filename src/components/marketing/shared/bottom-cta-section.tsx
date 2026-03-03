// src/components/marketing/shared/bottom-cta-section.tsx

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { BOTTOM_CTA as HOW_IT_WORKS_CTA } from '@/lib/data/how-it-works'
// Future: import CTA data from other page data modules based on `page` prop

interface BottomCtaSectionProps {
  /** Which page's CTA data to use */
  page: 'how-it-works' | 'landing' | 'platform' | 'solutions' | 'about'
}

// CTA data registry -- each page maps to its own CTA content
const CTA_REGISTRY = {
  'how-it-works': HOW_IT_WORKS_CTA,
  // Other pages will add their CTA data here as they are built
} as Record<string, typeof HOW_IT_WORKS_CTA>

export function BottomCtaSection({ page }: BottomCtaSectionProps) {
  const cta = CTA_REGISTRY[page]
  if (!cta) return null

  return (
    <section
      aria-labelledby="bottom-cta-heading"
      className="mx-auto max-w-4xl px-6 py-16 text-center lg:px-8 lg:py-24"
    >
      <h2
        id="bottom-cta-heading"
        className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl"
      >
        {cta.headline}
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--color-text-secondary)] lg:text-lg">
        {cta.body}
      </p>

      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
        {/* Primary CTA */}
        <div className="flex flex-col items-center gap-1.5">
          <Link
            href={cta.primaryHref}
            className={cn(
              'mkt-cta-breathe',
              'inline-flex items-center justify-center rounded-xl px-8 py-3',
              'bg-[var(--color-ember)] text-white',
              'text-sm font-semibold tracking-wide',
              'transition-all duration-200',
              'hover:bg-[var(--color-ember-bright)] hover:shadow-[var(--glow-ember-medium)]',
              'focus-visible:outline-2 focus-visible:outline-offset-2',
              'focus-visible:outline-[var(--color-ember-bright)]',
            )}
          >
            {cta.primaryLabel}
          </Link>
          <span className="text-xs text-[var(--color-text-tertiary)]">
            {cta.primaryMicrocopy}
          </span>
        </div>

        {/* Secondary CTA */}
        <div className="flex flex-col items-center gap-1.5">
          <Link
            href={cta.secondaryHref}
            className={cn(
              'inline-flex items-center justify-center rounded-xl px-8 py-3',
              'bg-white/[0.06] text-[var(--color-text-primary)]',
              'border border-white/[0.08]',
              'text-sm font-medium tracking-wide',
              'transition-all duration-200',
              'hover:bg-white/[0.10] hover:border-white/[0.12]',
              'focus-visible:outline-2 focus-visible:outline-offset-2',
              'focus-visible:outline-[var(--color-ember-bright)]',
            )}
          >
            {cta.secondaryLabel}
          </Link>
          <span className="text-xs text-[var(--color-text-tertiary)]">
            {cta.secondaryMicrocopy}
          </span>
        </div>
      </div>
    </section>
  )
}
