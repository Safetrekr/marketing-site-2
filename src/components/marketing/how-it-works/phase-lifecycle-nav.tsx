// src/components/marketing/how-it-works/phase-lifecycle-nav.tsx

import { cn } from '@/lib/utils'
import { PHASES } from '@/lib/data/how-it-works'
import {
  ClipboardList,
  ShieldCheck,
  Smartphone,
  Radar,
  FileCheck,
} from 'lucide-react'

const ICON_MAP = {
  ClipboardList,
  ShieldCheck,
  Smartphone,
  Radar,
  FileCheck,
} as const

export function PhaseLifecycleNav() {
  return (
    <nav
      aria-label="Trip lifecycle steps"
      className="mx-auto max-w-5xl px-6 py-12 lg:px-8 lg:py-16"
    >
      {/* Desktop: horizontal row */}
      <ol className="hidden items-center justify-between md:flex">
        {PHASES.map((phase, i) => {
          const Icon = ICON_MAP[phase.iconName as keyof typeof ICON_MAP]
          return (
            <li
              key={phase.id}
              className="flex flex-1 items-center"
            >
              {/* Phase node */}
              <a
                href={`#phase-${phase.id}`}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-xl px-3 py-3',
                  'transition-colors duration-200',
                  'hover:bg-white/[0.04]',
                  'focus-visible:outline-2 focus-visible:outline-offset-2',
                  'focus-visible:outline-[var(--color-ember-bright)]',
                )}
              >
                <div
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-full',
                    'bg-[var(--color-ember-dim)] text-[var(--color-ember-bright)]',
                    'border border-[var(--color-ember-muted)]',
                  )}
                >
                  {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
                  Step {phase.number}
                </span>
                <span className="text-sm font-medium text-[var(--color-text-primary)] text-center">
                  {phase.label}
                </span>
              </a>
              {/* Connector line (not after last) */}
              {i < PHASES.length - 1 && (
                <div
                  className="h-px flex-1 bg-gradient-to-r from-[var(--color-ember-muted)] to-transparent"
                  aria-hidden="true"
                />
              )}
            </li>
          )
        })}
      </ol>

      {/* Mobile: vertical list */}
      <ol className="flex flex-col gap-3 md:hidden">
        {PHASES.map((phase) => {
          const Icon = ICON_MAP[phase.iconName as keyof typeof ICON_MAP]
          return (
            <li key={phase.id}>
              <a
                href={`#phase-${phase.id}`}
                className={cn(
                  'flex items-center gap-4 rounded-xl px-4 py-3',
                  'bg-white/[0.03]',
                  'border border-white/[0.04]',
                  'transition-colors duration-200',
                  'hover:bg-white/[0.06]',
                  'focus-visible:outline-2 focus-visible:outline-offset-2',
                  'focus-visible:outline-[var(--color-ember-bright)]',
                )}
              >
                <div
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                    'bg-[var(--color-ember-dim)] text-[var(--color-ember-bright)]',
                  )}
                >
                  {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)]">
                    Step {phase.number}
                  </span>
                  <span className="ml-2 text-sm font-medium text-[var(--color-text-primary)]">
                    {phase.label}
                  </span>
                </div>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
