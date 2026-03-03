// src/components/marketing/platform/portal-card.tsx

import type { PortalData } from '@/lib/interfaces/platform'
import { cn } from '@/lib/utils'

interface PortalCardProps {
  portal: PortalData
  /** Zero-based index for staggered animation delay */
  index: number
}

export function PortalCard({ portal, index }: PortalCardProps) {
  const Icon = portal.icon

  return (
    <article
      data-portal={portal.id}
      className={cn(
        'plt-card-reveal',
        'rounded-2xl p-6 md:p-8',
        // Glass-morphism (canonical recipe from detail-panel.tsx)
        'bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]',
        'border border-white/[0.08]',
        'glass-card-fallback',
        // Subtle top-edge highlight only (no outer ember glow on portal cards)
        'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]',
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Icon */}
      <Icon
        className="h-6 w-6 text-[var(--color-ember-bright)]"
        aria-hidden="true"
        strokeWidth={1.5}
      />

      {/* Portal name */}
      <h3 className="mt-3 text-xl font-bold text-[var(--color-text-primary)]">
        {portal.name}
      </h3>

      {/* Role label */}
      <p className="mt-1 font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-text-tertiary)]">
        {portal.roleLabel}
      </p>

      {/* Description */}
      <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
        {portal.description}
      </p>

      {/* Screenshot placeholder -- hidden on mobile */}
      <div
        className={cn(
          'mt-4 hidden rounded-lg md:block',
          'border border-white/[0.06] bg-white/[0.03]',
          // Cap height for portrait aspect ratio (Traveler App)
          portal.screenshotAspectRatio < 1 && 'max-h-48',
        )}
        style={{ aspectRatio: portal.screenshotAspectRatio }}
        aria-hidden="true"
      >
        <div className="flex h-full items-center justify-center">
          <span className="font-mono text-xs text-[var(--color-text-ghost)]">
            Screenshot coming soon
          </span>
        </div>
      </div>
    </article>
  )
}
