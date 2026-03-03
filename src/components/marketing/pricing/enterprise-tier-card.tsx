// src/components/marketing/pricing/enterprise-tier-card.tsx

import Link from 'next/link'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { PricingTier } from '@/lib/interfaces/pricing'

interface EnterpriseTierCardProps {
  tier: PricingTier
}

export function EnterpriseTierCard({ tier }: EnterpriseTierCardProps) {
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
      )}
    >
      {/* Tier Label */}
      <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-secondary)] mb-1">
        ENTERPRISE // CUSTOM
      </p>
      <h3 className="text-xl font-bold text-[var(--color-text-primary)] tracking-tight">
        {tier.name}
      </h3>

      {/* Price Display -- Custom Pricing */}
      <div className="mt-4">
        <span
          className="text-2xl font-bold text-[var(--color-text-primary)]"
          aria-label="Custom Pricing, contact sales for details"
        >
          Custom Pricing
        </span>
      </div>

      {/* Tagline / Description */}
      <p className="text-sm text-[var(--color-text-secondary)] mt-3">
        Volume pricing, dedicated analyst teams, custom integrations, and
        priority support. Contact our team to build a plan that fits your travel
        program.
      </p>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent my-6" />

      {/* Feature List */}
      <ul className="space-y-3 flex-1" role="list">
        {tier.features.map((feature) => (
          <li
            key={feature.label}
            aria-label={`${feature.label}, included`}
          >
            <div className="flex items-start gap-3">
              <Check
                className="h-4 w-4 mt-0.5 shrink-0 text-[var(--color-ember-bright)]"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span className="text-sm text-[var(--color-text-primary)]">
                {feature.label}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {/* CTA Button -- Green-bordered outline style (not amber, not filled) */}
      <Link
        href={tier.ctaHref}
        className={cn(
          'mt-8 block w-full py-3 px-6 rounded-xl text-center text-sm font-semibold',
          'transition-all duration-200',
          'bg-white/[0.06] text-[var(--color-text-primary)]',
          'border border-white/[0.08]',
          'hover:bg-white/[0.1]',
          'focus-visible:outline-2 focus-visible:outline-offset-2',
          'focus-visible:outline-[var(--color-ember-bright)]',
        )}
      >
        {tier.ctaLabel}
      </Link>
    </div>
  )
}
