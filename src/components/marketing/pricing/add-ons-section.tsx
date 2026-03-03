// src/components/marketing/pricing/add-ons-section.tsx

import { cn } from '@/lib/utils'
import type { PricingAddOn } from '@/lib/interfaces/pricing'

interface AddOnsSectionProps {
  addOns: PricingAddOn[]
}

export function AddOnsSection({ addOns }: AddOnsSectionProps) {
  return (
    <section className="mt-16 sm:mt-24" aria-label="Optional add-ons">
      {/* Section label */}
      <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-secondary)] text-center mb-4">
        ADD-ONS // OPTIONAL
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] text-center">
        Optional add-ons.
      </h2>

      <p className="text-[var(--color-text-secondary)] text-center mt-4 max-w-2xl mx-auto">
        Priced per unit. Added during trip creation.
      </p>

      {/* [UNVALIDATED] -- Add-on prices pending Q-1 confirmation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 max-w-3xl mx-auto">
        {addOns.map((addOn) => (
          <div
            key={addOn.name}
            className={cn(
              'rounded-2xl p-6',
              'bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]',
              'border border-white/[0.08]',
              'glass-card-fallback',
            )}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                {addOn.name}
              </h3>
              <span className="text-lg font-mono font-bold text-[var(--color-ember-bright)]">
                {addOn.priceDisplay}
              </span>
            </div>

            <p className="text-sm text-[var(--color-text-secondary)] mt-3">
              {addOn.description}
            </p>

            {addOn.integrationNote && (
              <p className="text-xs font-mono text-[var(--color-text-tertiary)] mt-2">
                {addOn.integrationNote}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
