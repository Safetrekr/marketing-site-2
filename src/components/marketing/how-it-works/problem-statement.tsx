// src/components/marketing/how-it-works/problem-statement.tsx

import { cn } from '@/lib/utils'
import { PROBLEM_STATEMENT } from '@/lib/data/how-it-works'

export function ProblemStatement() {
  return (
    <section
      className={cn(
        'mx-auto max-w-3xl px-6 py-12 lg:px-8 lg:py-16',
        // Glass card
        'rounded-2xl',
        'bg-white/[0.04] backdrop-blur-[12px]',
        'border border-white/[0.06]',
      )}
    >
      <p className="text-xl font-semibold tracking-wide text-[var(--color-ember-bright)] lg:text-2xl">
        {PROBLEM_STATEMENT.intro}
      </p>
      <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)] lg:text-lg">
        {PROBLEM_STATEMENT.body}
      </p>
      <p className="mt-6 text-lg font-medium text-[var(--color-text-primary)] lg:text-xl">
        {PROBLEM_STATEMENT.close}
      </p>
    </section>
  )
}
