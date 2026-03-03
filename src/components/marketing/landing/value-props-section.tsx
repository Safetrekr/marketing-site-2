// src/components/marketing/landing/value-props-section.tsx

import { cn } from '@/lib/utils'
import { SectionContainer } from '@/components/marketing/section-container'
import { GlassCard } from '@/components/marketing/glass-card'

const VALUE_PROPS = [
  {
    label: 'Accountability',
    heading: 'Every decision documented. Every safeguard verified.',
    body: 'Independent safety analysts review every trip across 18 dimensions before departure. Every checklist acknowledgment, every background check, every approval decision -- timestamped, attributed, and audit-ready.',
  },
  {
    label: 'Control',
    heading: 'One platform. Four portals. Complete lifecycle coverage.',
    body: 'Organization administrators plan trips. Independent analysts verify safety. Travelers receive live safety information on their phones. HQ monitors the entire operation. One system of record replaces dozens of disconnected tools.',
  },
  {
    label: 'Intelligence',
    heading: 'Know about threats before they reach your travelers.',
    body: "Safetrekr's intelligence engine monitors destinations for security, weather, health, transport, and political risks. Alerts are risk-scored, analyst-triaged, and delivered to the people who need them -- with proof of receipt.",
  },
] as const

export function ValuePropsSection() {
  return (
    <SectionContainer
      id="value-props"
      aria-labelledby="value-props-heading"
      className="bg-gradient-to-b from-[var(--color-void)] to-[var(--color-abyss)]"
    >
      {/* Visually hidden section heading for accessibility */}
      <h2 id="value-props-heading" className="sr-only">
        Core Capabilities
      </h2>

      {/* Section monospace label */}
      <p
        className={cn(
          'mb-12 text-center font-mono text-xs font-medium uppercase',
          'tracking-[0.12em]',
          'text-[var(--color-text-tertiary)]',
        )}
      >
        Core Capabilities
      </p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {VALUE_PROPS.map((prop) => (
          <GlassCard key={prop.label}>
            {/* Mono label */}
            <p
              className={cn(
                'font-mono text-xs font-medium uppercase',
                'tracking-[0.12em]',
                'text-[var(--color-ember)]',
                'mb-3',
              )}
            >
              {prop.label}
            </p>

            {/* Heading */}
            <h2
              className={cn(
                'font-sans text-xl font-semibold leading-snug',
                'text-[var(--color-text-primary)]',
              )}
            >
              {prop.heading}
            </h2>

            {/* Body */}
            <p
              className={cn(
                'mt-4 text-sm leading-relaxed',
                'text-[var(--color-text-secondary)]',
              )}
            >
              {prop.body}
            </p>
          </GlassCard>
        ))}
      </div>
    </SectionContainer>
  )
}
