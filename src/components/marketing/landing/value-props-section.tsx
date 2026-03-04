// src/components/marketing/landing/value-props-section.tsx

import { cn } from '@/lib/utils'
import { SectionContainer } from '@/components/marketing/section-container'
import { GlassCard } from '@/components/marketing/glass-card'

const VALUE_PROPS = [
  {
    label: 'Professional Analyst Review',
    body: 'Every trip is independently reviewed by a trained safety analyst across 18 dimensions -- lodging, fire safety, emergency preparedness, venue verification, transportation, intelligence alerts, and more. Not an algorithm. Not a volunteer parent. A professional who reviews your plans, verifies your destinations, and documents every decision with a full audit trail.',
  },
  {
    label: 'Live Traveler App',
    body: 'Your travelers are not carrying a printed binder. They get a mobile-first portal with live safety checklists, real-time alerts, day-by-day itineraries, and emergency preparedness information -- with acknowledgment tracking so you know who has been reached.',
  },
  {
    label: 'Real-Time Intelligence Monitoring',
    body: 'Safetrekr continuously monitors 11+ authoritative government sources including NWS, USGS, CDC, and the State Department. When conditions change at your destination, alerts are reviewed by analysts and routed to your team via email, SMS, and in-app alerts -- with course-of-action guidance so your team knows what to do, not just what happened.',
  },
  {
    label: 'Board-Ready Documentation',
    body: 'Role-based trip packets for travelers, chaperones, guardians, and administrators -- with your organization\'s branding. Plus a complete audit trail of every alert sent, every checklist acknowledged, and every safety decision made. Defensible documentation for your board, your insurer, and any future review.',
  },
] as const

export function ValuePropsSection() {
  return (
    <SectionContainer
      id="value-props"
      aria-labelledby="value-props-heading"
      className="bg-gradient-to-b from-[var(--color-void)] to-[var(--color-abyss)]"
    >
      {/* Section eyebrow */}
      <p
        className={cn(
          'mb-4 text-center font-mono text-xs font-medium uppercase',
          'tracking-[0.12em]',
          'text-[var(--color-ember)]',
        )}
      >
        Why Safetrekr
      </p>

      {/* Section heading */}
      <h2
        id="value-props-heading"
        className={cn(
          'mb-4 text-center font-sans text-3xl font-bold tracking-tight',
          'md:text-4xl',
          'text-[var(--color-text-primary)]',
        )}
      >
        A platform, not a PDF
      </h2>

      {/* Section subtitle */}
      <p
        className={cn(
          'mx-auto mb-12 max-w-[720px] text-center text-base leading-relaxed',
          'text-[var(--color-text-secondary)]',
        )}
      >
        Most organizations manage trip safety with spreadsheets, group texts, and good intentions.
        Safetrekr replaces that with a professional system that reviews, monitors, and documents
        every trip -- so the answer to &ldquo;what precautions did you take?&rdquo; is a defensible
        record, not a manila folder.
      </p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {VALUE_PROPS.map((prop) => (
          <GlassCard key={prop.label}>
            {/* Mono label */}
            <p
              className={cn(
                'font-mono text-xs font-medium uppercase',
                'tracking-[0.12em]',
                'text-[var(--color-ember-bright)]',
                'mb-3',
              )}
            >
              {prop.label}
            </p>

            {/* Body */}
            <p
              className={cn(
                'text-sm leading-relaxed',
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
