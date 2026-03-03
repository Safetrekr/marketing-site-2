// src/components/marketing/landing/how-it-works-section.tsx

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { SectionContainer } from '@/components/marketing/section-container'

const STEPS = [
  {
    number: 1,
    label: 'Phase 01 // Plan',
    name: 'Plan',
    description:
      'Guided 10-step wizard captures every detail: logistics, rosters, lodging, venues, transportation, and emergency preparedness.',
  },
  {
    number: 2,
    label: 'Phase 02 // Review',
    name: 'Review',
    description:
      'An independent safety analyst reviews every trip across 18 dimensions. Separation of duties is enforced by the platform, not by policy.',
  },
  {
    number: 3,
    label: 'Phase 03 // Protect',
    name: 'Protect',
    description:
      '46-endpoint protection system activates rally points, safe houses, geofencing, and SMS emergency broadcast. Intelligence alerts are delivered in real time.',
  },
  {
    number: 4,
    label: 'Phase 04 // Monitor',
    name: 'Monitor',
    description:
      'Live traveler delivery through the mobile app. Geo-triggered checklists. Alert acknowledgment tracking. Every interaction documented.',
  },
] as const

export function HowItWorksSection() {
  return (
    <SectionContainer
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="bg-[var(--color-abyss)]"
    >
      {/* Section monospace label */}
      <p
        className={cn(
          'mb-4 text-center font-mono text-xs font-medium uppercase',
          'tracking-[0.12em]',
          'text-[var(--color-text-tertiary)]',
        )}
      >
        System Overview
      </p>

      {/* Section heading */}
      <h2
        id="how-it-works-heading"
        className={cn(
          'text-center font-sans text-3xl font-bold',
          'md:text-4xl',
          'text-[var(--color-text-primary)]',
          'mb-16 lg:mb-20',
        )}
      >
        Four phases. One system of record.
      </h2>

      {/* Steps grid */}
      <div className="relative">
        {/* Desktop horizontal connector line */}
        <div
          className={cn(
            'absolute top-6 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)]',
            'hidden md:block',
            'h-0 border-t-2 border-dashed border-[var(--color-ember-muted)]',
            'landing-step-connector',
          )}
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8 lg:gap-12">
          {STEPS.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Mobile vertical connector line (between steps, not after last) */}
              {index < STEPS.length - 1 && (
                <div
                  className={cn(
                    'absolute left-6 top-12 h-[calc(100%+48px)] w-0',
                    'border-l-2 border-dashed border-[var(--color-ember-muted)]',
                    'landing-step-connector-vertical',
                    'md:hidden',
                  )}
                  aria-hidden="true"
                />
              )}

              {/* Step number circle */}
              <div
                className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-full',
                  'border-2 border-[var(--color-ember)]',
                  'text-[var(--color-ember)] font-mono text-lg font-bold',
                  'bg-[var(--color-abyss)]',
                  'relative z-10',
                )}
              >
                {step.number}
              </div>

              {/* Phase label */}
              <p
                className={cn(
                  'mt-4 font-mono text-[10px] font-medium uppercase',
                  'tracking-[0.12em]',
                  'text-[var(--color-text-tertiary)]',
                )}
              >
                {step.label}
              </p>

              {/* Step name */}
              <h3
                className={cn(
                  'mt-2 font-sans text-lg font-semibold',
                  'text-[var(--color-text-primary)]',
                )}
              >
                {step.name}
              </h3>

              {/* Step description */}
              <p
                className={cn(
                  'mt-2 text-sm leading-relaxed',
                  'text-[var(--color-text-secondary)]',
                )}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Section CTA link */}
      <div className="mt-12 text-center">
        <Link
          href="/how-it-works"
          className={cn(
            'inline-flex items-center gap-2',
            'text-sm font-medium',
            'text-[var(--color-ember-bright)]',
            'hover:text-[var(--color-ember-glow)]',
            'transition-colors duration-[var(--duration-hover)]',
            'focus-visible:outline-2 focus-visible:outline-offset-2',
            'focus-visible:outline-[var(--color-ember-bright)]',
          )}
        >
          See how it works
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </SectionContainer>
  )
}
