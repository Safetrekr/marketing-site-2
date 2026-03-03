// src/components/marketing/how-it-works/monitor-phase-section.tsx

import { cn } from '@/lib/utils'
import { PHASES, MONITOR_FEATURES } from '@/lib/data/how-it-works'
import {
  Smartphone,
  WifiOff,
  MapPinCheck,
  CheckCheck,
  Radar,
  MessageSquareWarning,
} from 'lucide-react'

const ICON_MAP = {
  Smartphone,
  WifiOff,
  MapPinCheck,
  CheckCheck,
  Radar,
  MessageSquareWarning,
} as const

export function MonitorPhaseSection() {
  const phase = PHASES[3] // monitor

  return (
    <section
      id="phase-monitor"
      aria-labelledby="phase-monitor-heading"
      className="mx-auto max-w-5xl px-6 py-16 lg:px-8 lg:py-24"
    >
      {/* Phase badge */}
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-ember)]">
        Phase {phase.number} -- {phase.label}
      </p>

      {/* Heading */}
      <h2
        id="phase-monitor-heading"
        className="mt-3 text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl lg:text-4xl"
      >
        {phase.heading}
      </h2>

      {/* Body */}
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--color-text-secondary)] lg:text-lg">
        {phase.body}
      </p>

      {/* Feature cards grid */}
      <div
        className={cn(
          'mt-10 grid gap-4',
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        )}
      >
        {MONITOR_FEATURES.map((feature) => {
          const Icon = ICON_MAP[feature.iconName as keyof typeof ICON_MAP]
          return (
            <div
              key={feature.id}
              className={cn(
                'rounded-2xl p-5',
                'bg-white/[0.06] backdrop-blur-[12px] backdrop-saturate-[130%]',
                'border border-white/[0.08]',
              )}
            >
              <div
                className={cn(
                  'mb-3 flex h-10 w-10 items-center justify-center rounded-xl',
                  'bg-[var(--color-ember-dim)] text-[var(--color-ember-bright)]',
                )}
              >
                {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
              </div>
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                {feature.name}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                {feature.description}
              </p>
            </div>
          )
        })}
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
        Illustration: Traveler app screens
      </div>
    </section>
  )
}
