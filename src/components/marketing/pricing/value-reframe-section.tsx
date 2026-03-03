// src/components/marketing/pricing/value-reframe-section.tsx

import { cn } from '@/lib/utils'
import type { VALUE_REFRAME } from '@/lib/data/pricing'

interface ValueReframeSectionProps {
  data: typeof VALUE_REFRAME
}

/**
 * Formats a number as currency display.
 * 25 -> "$25", 62.5 -> "$62.50"
 */
function formatPerTraveler(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function ValueReframeSection({ data }: ValueReframeSectionProps) {
  return (
    <section className="mt-16 sm:mt-24 lg:mt-32" aria-label="Value comparison">
      {/* Section label */}
      <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-secondary)] text-center mb-4">
        CONTEXT // VALUE
      </p>

      {/* Section H2 */}
      <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] text-center">
        {data.headline}
      </h2>

      {/* Comparison Glass Card */}
      <div
        className={cn(
          'mt-12 p-8 sm:p-12 rounded-2xl',
          'bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]',
          'border border-white/[0.08]',
          'glass-card-fallback',
        )}
      >
        {/* Trip Cost Comparisons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {data.comparisons.map((comparison) => (
            <div key={comparison.label}>
              <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-secondary)]">
                {comparison.label}
              </p>
              <p className="text-2xl font-bold text-[var(--color-text-primary)] mt-2">
                {comparison.range}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent my-8" />

        {/* Per-Traveler Examples */}
        {/* [UNVALIDATED] -- Per-traveler calculations derived from working tier prices and assumed group sizes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {data.examples.map((example) => (
            <div
              key={example.scenario}
              className={cn(
                'rounded-xl p-6',
                'bg-white/[0.04]',
                'border border-white/[0.06]',
              )}
            >
              <p className="text-sm text-[var(--color-text-secondary)]">
                {example.scenario}
              </p>
              <p className="text-lg font-bold text-[var(--color-ember-bright)] mt-2">
                {formatPerTraveler(example.perTraveler)} per traveler
              </p>
              <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
                ${example.tierPrice.toLocaleString()} {example.tierName} /{' '}
                {example.scenario.match(/\d+/)?.[0]} travelers
              </p>
            </div>
          ))}
        </div>

        {/* Incident Cost Comparison */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mx-auto">
            {data.incidentCost}
          </p>
        </div>

        {/* Closing Statement */}
        <p className="text-lg text-[var(--color-text-primary)] font-semibold text-center mt-8">
          {data.closingStatement}
        </p>
      </div>
    </section>
  )
}
