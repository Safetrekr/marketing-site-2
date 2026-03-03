// src/components/marketing/pricing/pricing-hero.tsx

export function PricingHero() {
  return (
    <section className="mb-16 sm:mb-20 pt-16 sm:pt-20 text-center">
      <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-secondary)] mb-4">
        PRICING // PER TRIP
      </p>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-text-primary)] leading-[1.08]">
        Per-trip pricing. No annual contracts.
      </h1>
      <p className="max-w-3xl mx-auto text-lg sm:text-xl text-[var(--color-text-secondary)] leading-relaxed mt-6">
        Every trip includes independent safety review, real-time intelligence,
        traveler delivery, and full audit documentation. You pay for what you
        use.
      </p>
    </section>
  )
}
