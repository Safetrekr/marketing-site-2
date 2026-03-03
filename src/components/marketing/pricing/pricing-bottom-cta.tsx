// src/components/marketing/pricing/pricing-bottom-cta.tsx

import Link from 'next/link'
import { cn } from '@/lib/utils'

export function PricingBottomCta() {
  return (
    <section className="mt-16 sm:mt-24 lg:mt-32 mb-8" aria-label="Get started">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
          We will walk you through a live pricing scenario for your
          organization.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          {/* Primary CTA -- amber conversion color with breathing glow.
              This is the ONE breathing CTA per page (AD-2 convention).
              Uses mkt-cta-breathe class defined in marketing.css which already
              handles reduced-motion. The amber variant is applied via
              inline shadow overrides. */}
          <Link
            href="/contact"
            className={cn(
              'px-8 py-4 rounded-xl text-base font-semibold',
              'bg-amber-500 text-[var(--color-void)]',
              'hover:bg-amber-400',
              'transition-all duration-200',
              'focus-visible:outline-2 focus-visible:outline-offset-2',
              'focus-visible:outline-amber-400',
              // Breathing glow -- amber variant (CSS class from marketing.css)
              'mkt-cta-breathe-amber',
              // Full-width on mobile
              'w-full sm:w-auto',
            )}
            data-analytics-id="pricing-bottom-cta-primary"
          >
            Schedule a Briefing
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/contact"
            className={cn(
              'px-8 py-4 rounded-xl text-base font-semibold',
              'bg-white/[0.06] text-[var(--color-text-primary)]',
              'border border-white/[0.08]',
              'hover:bg-white/[0.1]',
              'transition-all duration-200',
              'focus-visible:outline-2 focus-visible:outline-offset-2',
              'focus-visible:outline-[var(--color-ember-bright)]',
              // Full-width on mobile
              'w-full sm:w-auto',
            )}
            data-analytics-id="pricing-bottom-cta-secondary"
          >
            Contact Sales for Volume Pricing
          </Link>
        </div>
      </div>
    </section>
  )
}
