// src/components/marketing/platform/feature-grid.tsx

import { DOMAINS } from '@/lib/config/platform-data'
import { DomainCard } from './domain-card'

export function FeatureGrid() {
  return (
    <section
      aria-labelledby="feature-grid-heading"
      className="px-6 py-16 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Monospace label */}
        <p className="mb-4 text-center font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-text-tertiary)]">
          Platform // Capabilities
        </p>

        {/* Sub-header */}
        <h2
          id="feature-grid-heading"
          className="mb-4 text-center font-mono text-sm uppercase tracking-[0.12em] text-[var(--color-ember-bright)]"
        >
          Platform capabilities — verified and operational.
        </h2>

        {/* Divider */}
        <div
          className="mx-auto mb-12 h-px w-16 bg-[var(--color-ember-muted)] md:mb-16"
          aria-hidden="true"
        />

        {/* Domain grid: 1-col mobile, 2-col tablet, 3-col desktop */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {DOMAINS.map((domain, index) => (
            <DomainCard key={domain.id} domain={domain} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
