// src/components/marketing/platform/platform-hero.tsx

import { SectionContainer } from '@/components/marketing/section-container'

export function PlatformHero() {
  return (
    <SectionContainer
      aria-labelledby="platform-hero-heading"
      className="pt-24 pb-16 md:pt-32 md:pb-20"
    >
      <div className="mx-auto max-w-4xl text-center">
        {/* Monospace metadata label */}
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-text-tertiary)]">
          Platform // Capabilities
        </p>

        {/* H1 */}
        <h1
          id="platform-hero-heading"
          className="text-4xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-5xl lg:text-6xl"
        >
          Built for the people who plan the trip — and the people who go.
        </h1>

        {/* Sub-text */}
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-[var(--color-text-secondary)] md:text-xl">
          Safetrekr operates through four integrated portals, each designed for
          a specific role in the trip safety lifecycle. Organization
          administrators plan. Independent analysts verify. HQ operations
          monitor. Travelers receive safety information on their devices.
        </p>
      </div>
    </SectionContainer>
  )
}
