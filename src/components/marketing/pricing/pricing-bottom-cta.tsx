// src/components/marketing/pricing/pricing-bottom-cta.tsx

import Link from 'next/link'
import { cn } from '@/lib/utils'

export function PricingBottomCta() {
  return (
    <section className="mt-16 sm:mt-24 lg:mt-32 mb-8" aria-label="Get started">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
          Start with one trip
        </h2>
        <p className="mt-4 text-lg text-[var(--color-text-secondary)] leading-relaxed">
          At $450, a single domestic day trip falls within principal discretionary
          spending authority at most schools. No procurement committee. No board
          approval required. See what a professionally reviewed trip looks like.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          {/* Primary CTA */}
          <Link
            href="/contact"
            className={cn(
              'px-8 py-4 rounded-xl text-base font-semibold',
              'bg-amber-500 text-[var(--color-void)]',
              'hover:bg-amber-400',
              'transition-all duration-200',
              'focus-visible:outline-2 focus-visible:outline-offset-2',
              'focus-visible:outline-amber-400',
              'mkt-cta-breathe-amber',
              'w-full sm:w-auto',
            )}
            data-analytics-id="pricing-bottom-cta-primary"
          >
            Request a Sample Trip Package
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/how-it-works"
            className={cn(
              'px-8 py-4 rounded-xl text-base font-semibold',
              'bg-white/[0.06] text-[var(--color-text-primary)]',
              'border border-white/[0.08]',
              'hover:bg-white/[0.1]',
              'transition-all duration-200',
              'focus-visible:outline-2 focus-visible:outline-offset-2',
              'focus-visible:outline-[var(--color-ember-bright)]',
              'w-full sm:w-auto',
            )}
            data-analytics-id="pricing-bottom-cta-secondary"
          >
            See How It Works
          </Link>
        </div>
      </div>
    </section>
  )
}
