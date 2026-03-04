// src/components/marketing/how-it-works/review-phase-section.tsx

import { cn } from '@/lib/utils'
import {
  PHASES,
  REVIEW_DIMENSIONS,
} from '@/lib/data/how-it-works'
import { ReviewDimensionGrid } from './review-dimension-grid'

export function ReviewPhaseSection() {
  const phase = PHASES[1] // review

  return (
    <section
      id="phase-review"
      aria-labelledby="phase-review-heading"
      className={cn(
        // Full-bleed background treatment for the centerpiece
        'relative py-16 lg:py-24',
        // Subtle radial gradient spotlight behind the section
        'before:pointer-events-none before:absolute before:inset-0',
        'before:bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(var(--ember-rgb),0.06),transparent)]',
      )}
    >
      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        {/* Elevated glass card wrapping the entire section */}
        <div
          className={cn(
            'rounded-3xl p-8 lg:p-12',
            // Elevated glass -- brighter than standard cards
            'bg-white/[0.08] backdrop-blur-[16px] backdrop-saturate-[130%]',
            'border border-white/[0.10]',
            // Ember glow shadow (elevated variant)
            'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_0_1px_0_rgba(var(--ember-rgb),0.4),0_0_32px_rgba(var(--ember-rgb),0.12)]',
          )}
        >
          {/* Phase badge */}
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-ember)]">
            Step {phase.number} -- {phase.label}
          </p>

          {/* Heading */}
          <h2
            id="phase-review-heading"
            className="mt-3 text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl lg:text-4xl"
          >
            {phase.heading}
          </h2>

          {/* Body */}
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--color-text-secondary)] lg:text-lg">
            {phase.body}
          </p>

          {/* Stat callout */}
          <div className="mt-8 flex items-baseline gap-3">
            <span className="text-5xl font-bold text-[var(--color-ember-bright)] lg:text-6xl">
              18
            </span>
            <span className="text-lg text-[var(--color-text-secondary)]">
              review dimensions. One independent analyst.
            </span>
          </div>

          {/* Review dimension grid (client component) */}
          <div className="mt-8">
            <ReviewDimensionGrid dimensions={REVIEW_DIMENSIONS} />
          </div>

          {/* Supporting statement */}
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-[var(--color-text-tertiary)] lg:text-base">
            {phase.supportingStatement}
          </p>

          {/* Objection hook */}
          {phase.objectionHook && (
            <blockquote
              className={cn(
                'mt-8 rounded-xl px-6 py-4',
                'border-l-2 border-[var(--color-ember)]',
                'bg-white/[0.03]',
                'text-sm leading-relaxed text-[var(--color-text-secondary)] italic',
              )}
            >
              {phase.objectionHook}
            </blockquote>
          )}
        </div>

        {/* Illustration placeholder */}
        <div
          className={cn(
            'mx-auto mt-10 flex h-56 max-w-4xl items-center justify-center rounded-2xl',
            'border-2 border-dashed border-white/[0.08]',
            'text-sm text-[var(--color-text-ghost)]',
          )}
          aria-hidden="true"
        >
          Illustration: Analyst review workspace
        </div>
      </div>
    </section>
  )
}
