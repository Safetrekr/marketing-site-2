// src/components/marketing/how-it-works/document-phase-section.tsx

import { cn } from '@/lib/utils'
import { PHASES } from '@/lib/data/how-it-works'
import {
  Bell,
  CheckCheck,
  ShieldCheck,
  FileText,
  Palette,
  Scale,
} from 'lucide-react'

const DOCUMENT_FEATURES = [
  {
    icon: Bell,
    name: 'Alert Records',
    description: 'Every alert sent, with source, severity, delivery channel, and timestamp.',
  },
  {
    icon: CheckCheck,
    name: 'Checklist Acknowledgments',
    description: 'Every checklist acknowledged, with recipient and acknowledgment time.',
  },
  {
    icon: ShieldCheck,
    name: 'Analyst Review Trail',
    description: 'Every analyst review decision documented with evidence and audit trail.',
  },
  {
    icon: FileText,
    name: 'Role-Based Trip Packets',
    description: 'Board-ready packets in four variants: traveler, chaperone, guardian, and administrator.',
  },
  {
    icon: Palette,
    name: 'Organization Branding',
    description: 'Trip packets carry your organization\'s logo, colors, watermarks, and custom cover titles.',
  },
  {
    icon: Scale,
    name: 'Defensible Record',
    description: 'A complete record for your board, insurance provider, and parents.',
  },
] as const

export function DocumentPhaseSection() {
  const phase = PHASES[4] // document

  return (
    <section
      id="phase-document"
      aria-labelledby="phase-document-heading"
      className="mx-auto max-w-5xl px-6 py-16 lg:px-8 lg:py-24"
    >
      {/* Step badge */}
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-ember)]">
        Step {phase.number} -- {phase.label}
      </p>

      {/* Heading */}
      <h2
        id="phase-document-heading"
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
        {DOCUMENT_FEATURES.map((feature) => {
          const Icon = feature.icon
          return (
            <div
              key={feature.name}
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
                <Icon className="h-5 w-5" aria-hidden="true" />
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
    </section>
  )
}
