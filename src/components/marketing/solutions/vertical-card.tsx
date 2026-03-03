// src/components/marketing/solutions/vertical-card.tsx

import Link from 'next/link'
import {
  GraduationCap,
  Building2,
  Church,
  Trophy,
  Briefcase,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SolutionVertical } from '@/lib/interfaces/solutions'

// Map icon name strings to Lucide components
const ICON_MAP: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  GraduationCap,
  Building2,
  Church,
  Trophy,
  Briefcase,
}

interface VerticalCardProps {
  vertical: SolutionVertical
}

export function VerticalCard({ vertical }: VerticalCardProps) {
  const Icon = ICON_MAP[vertical.iconName]

  return (
    <article
      className={cn(
        'group flex flex-col rounded-2xl',
        // Glass material (matches detail-panel.tsx canonical pattern)
        'bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]',
        'border border-white/[0.08]',
        // Hover: lift + border glow
        'transition-all duration-200',
        'hover:-translate-y-1',
        'hover:border-[rgba(var(--ember-rgb),0.2)]',
        'hover:shadow-[0_12px_24px_rgba(0,0,0,0.15),0_0_1px_0_rgba(var(--ember-rgb),0.3)]',
      )}
      aria-labelledby={`vertical-${vertical.id}-title`}
    >
      {/* Card header: icon + name + tagline */}
      <div className="p-6 pb-0 md:p-8 md:pb-0">
        {/* Icon */}
        {Icon && (
          <div
            className={cn(
              'mb-4 flex h-12 w-12 items-center justify-center rounded-xl',
              'bg-[rgba(var(--ember-rgb),0.08)]',
              'border border-[rgba(var(--ember-rgb),0.12)]',
            )}
          >
            <Icon
              size={24}
              className="text-[var(--color-ember)]"
              aria-hidden="true"
            />
          </div>
        )}

        {/* Vertical name */}
        <h3
          id={`vertical-${vertical.id}-title`}
          className="font-sans text-lg font-bold text-[var(--color-text-primary)] md:text-xl"
        >
          {vertical.name}
        </h3>

        {/* Tagline */}
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-ember-bright)] md:text-base">
          {vertical.tagline}
        </p>
      </div>

      {/* Divider */}
      <div
        className="mx-6 my-4 h-px bg-white/[0.06] md:mx-8"
        aria-hidden="true"
      />

      {/* Pain points */}
      <div className="px-6 md:px-8">
        <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-text-tertiary)]">
          The challenge
        </h4>
        <ul className="mt-3 space-y-2" role="list">
          {vertical.painPoints.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm leading-relaxed text-[var(--color-text-secondary)]"
            >
              <span
                className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-text-tertiary)]"
                aria-hidden="true"
              />
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* Solutions */}
      <div className="px-6 pt-4 md:px-8">
        <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-ember-bright)]">
          Safetrekr solution
        </h4>
        <ul className="mt-3 space-y-2" role="list">
          {vertical.solutions.map((solution, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm leading-relaxed text-[var(--color-text-secondary)]"
            >
              <span
                className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-ember)]"
                aria-hidden="true"
              />
              {solution}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA link */}
      <div className="mt-auto p-6 pt-6 md:p-8 md:pt-6">
        <Link
          href={vertical.ctaHref}
          className={cn(
            'inline-flex items-center gap-1.5 text-sm font-semibold',
            'text-[var(--color-ember)]',
            'transition-colors duration-200',
            'group-hover:text-[var(--color-ember-bright)]',
            // Focus
            'rounded-sm',
            'focus-visible:outline-2 focus-visible:outline-offset-2',
            'focus-visible:outline-[var(--color-ember-bright)]',
          )}
        >
          {vertical.ctaLabel}
          <ArrowRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  )
}
