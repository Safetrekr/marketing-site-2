// src/components/marketing/landing/pricing-preview-section.tsx

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { SectionContainer } from '@/components/marketing/section-container'

const TIERS = [
  { price: '$450', label: 'Domestic Day Trip' },
  { price: '$750', label: 'Domestic Multi-Day Trip' },
  { price: '$1,250', label: 'International Trip' },
] as const

export function PricingPreviewSection() {
  return (
    <SectionContainer
      id="pricing-preview"
      aria-labelledby="pricing-preview-heading"
      className="bg-[var(--color-abyss)]"
    >
      {/* Section eyebrow */}
      <p
        className={cn(
          'mb-4 text-center font-mono text-xs font-medium uppercase',
          'tracking-[0.12em]',
          'text-[var(--color-ember)]',
        )}
      >
        Pricing
      </p>

      {/* Section heading */}
      <h2
        id="pricing-preview-heading"
        className={cn(
          'text-center font-sans text-3xl font-bold',
          'md:text-4xl',
          'text-[var(--color-text-primary)]',
          'mb-4',
        )}
      >
        Transparent, trip-based pricing
      </h2>

      {/* Subtitle */}
      <p
        className={cn(
          'mx-auto mb-12 max-w-[560px] text-center text-base leading-relaxed',
          'text-[var(--color-text-secondary)]',
        )}
      >
        Pay only for the trips you plan. No subscriptions, no per-user fees, no hidden costs.
      </p>

      {/* Per-traveler callout */}
      <div className="mb-12 text-center">
        <p
          className={cn(
            'font-mono text-3xl font-bold',
            'text-[var(--color-ember-bright)]',
          )}
        >
          ~$15/traveler
        </p>
        <p
          className={cn(
            'mt-2 text-sm',
            'text-[var(--color-text-secondary)]',
          )}
        >
          For a group of 30 on a domestic day trip -- less than most field trip t-shirts
        </p>
      </div>

      {/* Tier grid */}
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-3">
        {TIERS.map((tier) => (
          <div
            key={tier.label}
            className={cn(
              'rounded-2xl p-8 text-center',
              'bg-white/[0.04] backdrop-blur-[16px]',
              'border border-white/[0.08]',
              'glass-card-fallback',
            )}
          >
            <p
              className={cn(
                'font-mono text-3xl font-bold',
                'text-[var(--color-text-primary)]',
              )}
            >
              {tier.price}
            </p>
            <p
              className={cn(
                'mt-2 font-mono text-xs uppercase',
                'tracking-[0.1em]',
                'text-[var(--color-text-tertiary)]',
              )}
            >
              {tier.label}
            </p>
          </div>
        ))}
      </div>

      {/* Fine print */}
      <p
        className={cn(
          'mt-8 text-center text-xs',
          'text-[var(--color-text-tertiary)]',
        )}
      >
        No subscriptions. No per-user fees. No setup costs. Small international groups (9 or fewer): $750.
      </p>

      {/* CTA link */}
      <div className="mt-8 text-center">
        <Link
          href="/pricing"
          className={cn(
            'inline-flex items-center gap-2',
            'text-sm font-medium',
            'text-[var(--color-ember-bright)]',
            'hover:text-[var(--color-ember-glow)]',
            'transition-colors duration-[var(--duration-hover)]',
            'focus-visible:outline-2 focus-visible:outline-offset-2',
            'focus-visible:outline-[var(--color-ember-bright)]',
          )}
        >
          View Full Pricing Details
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </SectionContainer>
  )
}
