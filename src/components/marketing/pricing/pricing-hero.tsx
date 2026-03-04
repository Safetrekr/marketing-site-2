// src/components/marketing/pricing/pricing-hero.tsx

export function PricingHero() {
  return (
    <section className="mb-16 sm:mb-20 pt-16 sm:pt-20 text-center">
      <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-ember)] mb-4">
        PRICING // PER TRIP
      </p>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-text-primary)] leading-[1.08]">
        Transparent, Trip-Based Pricing
      </h1>
      <p className="max-w-3xl mx-auto text-lg sm:text-xl text-[var(--color-text-secondary)] leading-relaxed mt-6">
        Pay only for the trips you plan. No subscriptions, no per-user fees, no
        hidden costs. Professional safety analysis and board-ready trip packets at
        a fraction of traditional risk management costs.
      </p>
    </section>
  )
}
