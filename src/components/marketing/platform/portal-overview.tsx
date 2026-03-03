// src/components/marketing/platform/portal-overview.tsx

import { PORTALS } from '@/lib/config/platform-data'
import { PortalCard } from './portal-card'

export function PortalOverview() {
  return (
    <section
      aria-labelledby="portal-overview-heading"
      className="px-6 py-16 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Monospace label */}
        <p className="mb-4 text-center font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-text-tertiary)]">
          Architecture // Four Portals
        </p>

        {/* Sub-header */}
        <h2
          id="portal-overview-heading"
          className="mb-12 text-center font-mono text-sm uppercase tracking-[0.12em] text-[var(--color-ember-bright)] md:mb-16"
        >
          Four portals. One platform. Complete separation of duties.
        </h2>

        {/* Portal grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-4">
          {PORTALS.map((portal, index) => (
            <PortalCard key={portal.id} portal={portal} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
