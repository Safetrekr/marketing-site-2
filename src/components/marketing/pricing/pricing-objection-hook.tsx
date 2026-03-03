// src/components/marketing/pricing/pricing-objection-hook.tsx

import { cn } from '@/lib/utils'

export function PricingObjectionHook() {
  return (
    <section className="mt-16 sm:mt-24" aria-label="Cost objection reframe">
      <div
        className={cn(
          'rounded-2xl p-8 sm:p-12 max-w-3xl mx-auto text-center',
          'bg-white/[0.04]',
          'border border-white/[0.06]',
        )}
      >
        <p className="text-lg font-semibold text-[var(--color-text-primary)] italic">
          &ldquo;We cannot afford another line item.&rdquo;
        </p>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent my-6" />

        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
          What does one unmanaged incident cost your organization? Legal
          consultation starts at $300/hour. A single liability claim can exceed
          six figures. Insurance premium increases after an incident are
          permanent. Safetrekr costs less per traveler than a meal at the hotel.
        </p>
      </div>
    </section>
  )
}
