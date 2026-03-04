// src/components/marketing/how-it-works/plan-phase-section.tsx

import { cn } from '@/lib/utils'
import { PHASES, WIZARD_STEPS } from '@/lib/data/how-it-works'
import { WizardStepper } from './wizard-stepper'

export function PlanPhaseSection() {
  const phase = PHASES[0] // plan

  return (
    <section
      id="phase-plan"
      aria-labelledby="phase-plan-heading"
      className="mx-auto max-w-5xl px-6 py-16 lg:px-8 lg:py-24"
    >
      {/* Phase badge */}
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-ember)]">
        Step {phase.number} -- {phase.label}
      </p>

      {/* Heading */}
      <h2
        id="phase-plan-heading"
        className="mt-3 text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl lg:text-4xl"
      >
        {phase.heading}
      </h2>

      {/* Body */}
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--color-text-secondary)] lg:text-lg">
        {phase.body}
      </p>

      {/* Wizard stepper (client component) */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
          10-Step Trip Creation Wizard
        </h3>
        <WizardStepper steps={WIZARD_STEPS} />
      </div>

      {/* Supporting statement */}
      <p className="mt-8 max-w-3xl text-sm leading-relaxed text-[var(--color-text-tertiary)] italic lg:text-base">
        {phase.supportingStatement}
      </p>

      {/* Illustration placeholder */}
      <div
        className={cn(
          'mt-10 flex h-48 items-center justify-center rounded-2xl',
          'border-2 border-dashed border-white/[0.08]',
          'text-sm text-[var(--color-text-ghost)]',
        )}
        aria-hidden="true"
      >
        Illustration: Trip creation wizard
      </div>
    </section>
  )
}
