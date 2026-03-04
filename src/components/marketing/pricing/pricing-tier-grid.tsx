// src/components/marketing/pricing/pricing-tier-grid.tsx

import { cn } from '@/lib/utils'
import type { PricingTier } from '@/lib/interfaces/pricing'
import { PricingTierCard } from './pricing-tier-card'

interface PricingTierGridProps {
  tiers: PricingTier[]
}

export function PricingTierGrid({ tiers }: PricingTierGridProps) {
  return (
    <section aria-label="Pricing tiers">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={cn(
              tier.highlighted && 'lg:-translate-y-2',
            )}
          >
            <PricingTierCard tier={tier} />
          </div>
        ))}
      </div>
    </section>
  )
}
