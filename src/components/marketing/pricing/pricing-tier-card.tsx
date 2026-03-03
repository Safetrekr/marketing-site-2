// src/components/marketing/pricing/pricing-tier-card.tsx

import Link from 'next/link'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { PricingTier } from '@/lib/interfaces/pricing'

interface PricingTierCardProps {
  tier: PricingTier
}

/**
 * Formats price in USD cents to a display string.
 * 45000 -> "$450", 125000 -> "$1,250"
 */
function formatPrice(priceUsdCents: number): string {
  const dollars = priceUsdCents / 100
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(dollars)
}

export function PricingTierCard({ tier }: PricingTierCardProps) {
  return (
    <div
      className={cn(
        // Glass material (from detail-panel.tsx pattern)
        'rounded-2xl p-8',
        'bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]',
        'border border-white/[0.08]',
        // Base shadow
        'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_0_1px_0_rgba(var(--ember-rgb),0.3),0_0_24px_rgba(var(--ember-rgb),0.1)]',
        // Flex column for internal layout
        'flex flex-col',
        // Glass fallback
        'glass-card-fallback',
        // Highlighted tier gets stronger glow + brighter background
        tier.highlighted && [
          'bg-white/[0.08]',
          'border-[rgba(var(--ember-rgb),0.3)]',
          'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_0_2px_0_rgba(var(--ember-rgb),0.4),0_0_32px_rgba(var(--ember-rgb),0.15)]',
        ],
      )}
    >
      {/* Badge */}
      {tier.badge && (
        <span className="inline-flex self-start px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-[rgba(var(--ember-rgb),0.15)] text-[var(--color-ember-bright)] border border-[rgba(var(--ember-rgb),0.25)] mb-4">
          <span className="sr-only">Recommended: </span>
          {tier.badge}
        </span>
      )}

      {/* Tier Name */}
      <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-secondary)] mb-1">
        {tier.id === 'day-trip' && 'T1 // DAY TRIP'}
        {tier.id === 'domestic-overnight' && 'T2 // DOMESTIC'}
        {tier.id === 'international' && 'T3 // INTERNATIONAL'}
      </p>
      <h3 className="text-xl font-bold text-[var(--color-text-primary)] tracking-tight">
        {tier.name}
      </h3>

      {/* Price Display */}
      {tier.priceUsd !== null && (
        <div className="flex items-baseline gap-1 mt-4">
          <span className="text-4xl sm:text-5xl font-bold text-[var(--color-text-primary)] tabular-nums">
            {formatPrice(tier.priceUsd)}
          </span>
          <span className="text-base text-[var(--color-text-secondary)]">
            {tier.unit}
          </span>
        </div>
      )}

      {/* Tagline */}
      <p className="text-sm text-[var(--color-text-secondary)] mt-3">
        {tier.tagline}
      </p>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent my-6" />

      {/* Feature List */}
      <ul className="space-y-3 flex-1" role="list">
        {tier.features.map((feature) => (
          <li
            key={feature.label}
            aria-label={`${feature.label}, ${feature.included ? 'included' : 'not included'}`}
          >
            <div className="flex items-start gap-3">
              <Check
                className={cn(
                  'h-4 w-4 mt-0.5 shrink-0',
                  feature.included
                    ? 'text-[var(--color-ember-bright)]'
                    : 'text-[var(--color-text-ghost)]',
                )}
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span
                className={cn(
                  'text-sm',
                  feature.included
                    ? 'text-[var(--color-text-primary)]'
                    : 'text-[var(--color-text-ghost)] line-through',
                )}
              >
                {feature.label}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <Link
        href={tier.ctaHref}
        className={cn(
          'mt-8 block w-full py-3 px-6 rounded-xl text-center text-sm font-semibold',
          'transition-all duration-200',
          'focus-visible:outline-2 focus-visible:outline-offset-2',
          'focus-visible:outline-[var(--color-ember-bright)]',
          // Highlighted tier uses amber for conversion emphasis (AD-2 convention).
          // This is the ONE element on tier cards that uses amber instead of green.
          tier.highlighted
            ? 'bg-amber-500 text-[var(--color-void)] hover:bg-amber-400 font-bold'
            : 'bg-white/[0.06] text-[var(--color-text-primary)] border border-white/[0.08] hover:bg-white/[0.1]',
        )}
      >
        {tier.ctaLabel}
      </Link>
    </div>
  )
}
