// src/components/marketing/platform/integration-overview.tsx

import {
  INTEGRATION_HIGHLIGHTS,
  ARCHITECTURE_HIGHLIGHTS,
} from '@/lib/config/platform-data'

export function IntegrationOverview() {
  return (
    <section
      aria-labelledby="integration-overview-heading"
      className="px-6 py-16 md:px-8 md:py-24"
    >
      {/* Faint glass panel wrapping the section for visual separation */}
      <div className="mx-auto max-w-5xl rounded-3xl bg-white/[0.02] px-6 py-12 md:px-10 md:py-16">
        {/* Monospace label */}
        <p className="mb-4 text-center font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-text-tertiary)]">
          Architecture // Infrastructure
        </p>

        {/* Sub-header */}
        <h2
          id="integration-overview-heading"
          className="mb-4 text-center font-mono text-sm uppercase tracking-[0.12em] text-[var(--color-ember-bright)]"
        >
          Built on proven infrastructure.
        </h2>

        {/* Introduction text */}
        <p className="mx-auto max-w-2xl text-center leading-relaxed text-[var(--color-text-secondary)]">
          Safetrekr integrates with specialized data providers, compliance
          platforms, and mobile infrastructure to deliver a complete trip safety
          system. Every integration is production-deployed and operational.
        </p>

        {/* Integration highlights grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {INTEGRATION_HIGHLIGHTS.map((integration) => (
            <div key={integration.name} className="flex items-start gap-3">
              <span className="font-mono text-sm text-[var(--color-text-primary)]">
                {integration.name}
              </span>
              <span className="text-sm text-[var(--color-text-secondary)]">
                {integration.purpose}
              </span>
            </div>
          ))}
        </div>

        {/* Architecture badge pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {ARCHITECTURE_HIGHLIGHTS.map((highlight) => (
            <span
              key={highlight}
              className="rounded-full border border-[var(--color-ember-muted)]/30 bg-[var(--color-ember-dim)] px-3 py-1.5 font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-ember-bright)]"
            >
              {highlight}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
