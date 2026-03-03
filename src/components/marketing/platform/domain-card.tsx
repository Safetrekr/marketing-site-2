// src/components/marketing/platform/domain-card.tsx

import type { DomainData } from '@/lib/interfaces/platform'
import { cn } from '@/lib/utils'

interface DomainCardProps {
  domain: DomainData
  /** Zero-based index for staggered animation delay */
  index: number
}

export function DomainCard({ domain, index }: DomainCardProps) {
  const Icon = domain.icon
  const headingId = `domain-${domain.id}`

  return (
    <article
      data-domain={domain.id}
      className={cn(
        'plt-card-reveal',
        'relative overflow-hidden rounded-2xl p-6 md:p-8',
        // Glass-morphism (canonical recipe)
        'bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]',
        'border border-white/[0.08]',
        'glass-card-fallback',
        // Hover: gentle glow + brighter border (CSS-only, no JS)
        'transition-all duration-[var(--duration-hover)]',
        'hover:border-white/[0.12] hover:shadow-[var(--glow-ember-subtle)]',
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Top accent line (pseudo-element via dedicated div) */}
      <div
        className="plt-accent-breathe absolute left-6 right-6 top-0 h-[2px] rounded-full bg-[var(--color-ember-muted)]"
        aria-hidden="true"
      />

      {/* Icon */}
      <Icon
        className="h-5 w-5 text-[var(--color-ember)]"
        aria-hidden="true"
        strokeWidth={1.5}
      />

      {/* Domain name label */}
      <p className="mt-3 font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-ember-bright)]">
        {domain.name}
      </p>

      {/* Tagline H3 */}
      <h3
        id={headingId}
        className="mt-2 text-lg font-semibold leading-snug text-[var(--color-text-primary)]"
      >
        {domain.tagline}
      </h3>

      {/* Feature bullet list */}
      <ul aria-labelledby={headingId} className="mt-4 space-y-2">
        {domain.features.map((feature) => (
          <li
            key={feature}
            className="relative pl-4 text-sm leading-relaxed text-[var(--color-text-secondary)] before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--color-ember-muted)]"
          >
            {feature}
          </li>
        ))}
      </ul>
    </article>
  )
}
