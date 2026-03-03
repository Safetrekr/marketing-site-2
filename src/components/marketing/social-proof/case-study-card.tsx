// src/components/marketing/social-proof/case-study-card.tsx

import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { GlassCard } from '@/components/marketing/glass-card'
import type { CaseStudy } from '@/lib/interfaces/social-proof'
import { VERTICAL_META } from '@/lib/data/verticals'

interface CaseStudyCardProps {
  caseStudy: CaseStudy
  className?: string
}

export function CaseStudyCard({ caseStudy, className }: CaseStudyCardProps) {
  const vertical = VERTICAL_META[caseStudy.vertical]

  return (
    <Link
      href={`/case-studies/${caseStudy.slug}`}
      className={cn(
        'group block',
        'focus-visible:outline-2 focus-visible:outline-offset-4',
        'focus-visible:outline-[var(--color-ember-bright)]',
        'rounded-2xl', // match GlassCard radius for focus ring
        className,
      )}
    >
      <GlassCard
        className={cn(
          'h-full transition-all duration-[var(--duration-transition)]',
          'group-hover:bg-white/[0.08]',
          'group-hover:border-white/[0.12]',
        )}
      >
        {/* Hero image (optional) */}
        {caseStudy.heroImageSrc && (
          <div className="relative -mx-8 -mt-8 mb-6 h-40 overflow-hidden rounded-t-2xl lg:-mx-10 lg:-mt-10">
            <Image
              src={caseStudy.heroImageSrc}
              alt={`${caseStudy.customer} case study`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-void)] to-transparent" />
          </div>
        )}

        {/* Vertical badge */}
        <span
          className={cn(
            'inline-block rounded-full px-3 py-1',
            'border border-[var(--color-ember-muted)]',
            'font-mono text-[10px] font-medium uppercase',
            'tracking-[0.12em]',
            'text-[var(--color-ember)]',
            'mb-4',
          )}
        >
          {vertical.label}
        </span>

        {/* Customer name */}
        <h3
          className={cn(
            'font-sans text-lg font-semibold',
            'text-[var(--color-text-primary)]',
          )}
        >
          {caseStudy.customer}
        </h3>

        {/* Title */}
        <p
          className={cn(
            'mt-1 text-sm font-medium',
            'text-[var(--color-ember-bright)]',
          )}
        >
          {caseStudy.title}
        </p>

        {/* Headline stats */}
        {caseStudy.stats.length > 0 && (
          <div className="mt-4 flex gap-6">
            {caseStudy.stats.slice(0, 3).map((stat, i) => (
              <div key={i}>
                <span
                  className={cn(
                    'font-mono text-2xl font-bold',
                    'text-[var(--color-ember)]',
                  )}
                >
                  {stat.value}
                </span>
                <span
                  className={cn(
                    'ml-1 font-mono text-[10px] uppercase',
                    'tracking-[0.08em]',
                    'text-[var(--color-text-tertiary)]',
                  )}
                >
                  {stat.unit ?? stat.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        <p
          className={cn(
            'mt-4 text-sm leading-relaxed',
            'text-[var(--color-text-secondary)]',
            'line-clamp-3',
          )}
        >
          {caseStudy.summary}
        </p>

        {/* Read link */}
        <span
          className={cn(
            'mt-6 inline-flex items-center gap-1.5',
            'text-sm font-medium',
            'text-[var(--color-ember)]',
            'group-hover:text-[var(--color-ember-bright)]',
            'transition-colors duration-[var(--duration-hover)]',
          )}
        >
          Read case study
          <span aria-hidden="true">&rarr;</span>
        </span>
      </GlassCard>
    </Link>
  )
}
