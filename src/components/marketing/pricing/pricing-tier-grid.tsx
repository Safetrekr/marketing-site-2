// src/components/marketing/pricing/pricing-tier-grid.tsx

import { cn } from '@/lib/utils'
import type { PricingTier } from '@/lib/interfaces/pricing'
import { PricingTierCard } from './pricing-tier-card'
import { EnterpriseTierCard } from './enterprise-tier-card'

interface PricingTierGridProps {
  tiers: PricingTier[]
}

export function PricingTierGrid({ tiers }: PricingTierGridProps) {
  const standardTiers = tiers.filter((t) => t.id !== 'enterprise')
  const enterpriseTier = tiers.find((t) => t.id === 'enterprise')

  return (
    <section aria-label="Pricing tiers">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {standardTiers.map((tier) => (
          <div
            key={tier.id}
            className={cn(
              // Highlighted tier gets a vertical offset on desktop to draw the eye
              tier.highlighted && 'lg:-translate-y-2',
            )}
          >
            <PricingTierCard tier={tier} />
          </div>
        ))}
        {enterpriseTier && <EnterpriseTierCard tier={enterpriseTier} />}
      </div>
    </section>
  )
}
