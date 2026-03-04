// src/components/marketing/landing/how-it-works-section.tsx

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { SectionContainer } from '@/components/marketing/section-container'

const STEPS = [
  {
    number: 1,
    label: 'Step 01 // Plan',
    name: 'Plan Your Trip',
    description:
      'Complete our guided 10-step wizard in about 15 minutes. Destinations, dates, travelers, flights, lodging, venues, itinerary, and transportation -- with interactive maps and bulk participant import.',
  },
  {
    number: 2,
    label: 'Step 02 // Review',
    name: 'Professional Analyst Review',
    description:
      'A safety analyst validates every location across 18 dimensions within 3-5 business days. They build your emergency preparedness plan, map nearby hospitals with trauma levels, and assess real-time intelligence for your destinations.',
  },
  {
    number: 3,
    label: 'Step 03 // Connect',
    name: 'Travelers Get Connected',
    description:
      'Travelers, chaperones, and guardians access the Traveler App. Safety checklists are delivered live. Emergency information is on-device. Documents and consents can be submitted directly. Every acknowledgment is tracked.',
  },
  {
    number: 4,
    label: 'Step 04 // Monitor',
    name: 'Travel With Confidence',
    description:
      'During travel, Safetrekr continuously monitors conditions at your destinations. Alerts are reviewed by analysts and routed to your team via email, SMS, and in-app -- with acknowledgment tracking, escalation, and course-of-action guidance.',
  },
  {
    number: 5,
    label: 'Step 05 // Document',
    name: 'Document Everything',
    description:
      'After travel, your complete record is ready -- every alert sent, every checklist acknowledged, every safety decision documented with timestamps. Board-ready packets for your board, insurer, and parents.',
  },
] as const

export function HowItWorksSection() {
  return (
    <SectionContainer
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="bg-[var(--color-abyss)]"
    >
      {/* Section eyebrow */}
      <p
        className={cn(
          'mb-4 text-center font-mono text-xs font-medium uppercase',
          'tracking-[0.12em]',
          'text-[var(--color-ember)]',
        )}
      >
        How It Works
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
        From trip idea to defensible record in 5 steps
      </h2>

      {/* Steps grid */}
      <div className="relative">
        {/* Desktop horizontal connector line */}
        <div
          className={cn(
            'absolute top-6 left-[calc(10%+24px)] right-[calc(10%+24px)]',
            'hidden lg:block',
            'h-0 border-t-2 border-dashed border-[var(--color-ember-muted)]',
            'landing-step-connector',
          )}
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5 md:gap-8 lg:gap-6">
          {STEPS.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Mobile vertical connector line (between steps, not after last) */}
              {index < STEPS.length - 1 && (
                <div
                  className={cn(
                    'absolute left-6 top-12 h-[calc(100%+48px)] w-0',
                    'border-l-2 border-dashed border-[var(--color-ember-muted)]',
                    'landing-step-connector-vertical',
                    'lg:hidden',
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
          Learn More About the Process
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </SectionContainer>
  )
}
