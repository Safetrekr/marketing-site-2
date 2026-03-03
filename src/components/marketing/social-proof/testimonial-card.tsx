// src/components/marketing/social-proof/testimonial-card.tsx

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { GlassCard } from '@/components/marketing/glass-card'
import type { Testimonial } from '@/lib/interfaces/social-proof'
import { VERTICAL_META } from '@/lib/data/verticals'

interface TestimonialCardProps {
  testimonial: Testimonial
  className?: string
}

export function TestimonialCard({
  testimonial,
  className,
}: TestimonialCardProps) {
  const vertical = VERTICAL_META[testimonial.vertical]

  return (
    <GlassCard
      className={cn('flex flex-col', className)}
    >
      {/* Optional highlight stat */}
      {testimonial.highlightStat && (
        <div className="mb-6">
          <span
            className={cn(
              'font-mono text-3xl font-bold',
              'text-[var(--color-ember)]',
            )}
          >
            {testimonial.highlightStat.value}
          </span>
          <span
            className={cn(
              'ml-2 font-mono text-xs font-medium uppercase',
              'tracking-[0.08em]',
              'text-[var(--color-text-secondary)]',
            )}
          >
            {testimonial.highlightStat.label}
          </span>
        </div>
      )}

      {/* Decorative quote mark */}
      <div
        aria-hidden="true"
        className={cn(
          'font-serif text-5xl leading-none',
          'text-[var(--color-ember-muted)]',
          'select-none',
          '-mb-2',
        )}
      >
        &ldquo;
      </div>

      {/* Quote text */}
      <blockquote className="flex-1">
        <p
          className={cn(
            'text-base leading-relaxed',
            'text-[var(--color-text-primary)]',
            'lg:text-lg lg:leading-relaxed',
          )}
        >
          {testimonial.quote}
        </p>

        {/* Attribution */}
        <footer className="mt-6 flex items-center gap-4">
          {/* Headshot */}
          {testimonial.headshotSrc && (
            <Image
              src={testimonial.headshotSrc}
              alt={testimonial.attribution.name}
              width={48}
              height={48}
              className={cn(
                'h-12 w-12 rounded-full object-cover',
                'border-2 border-[var(--color-ember-muted)]',
              )}
            />
          )}

          <div className="flex flex-col">
            {/* Name */}
            <cite
              className={cn(
                'not-italic font-sans text-sm font-semibold',
                'text-[var(--color-text-primary)]',
              )}
            >
              {testimonial.attribution.name}
            </cite>

            {/* Title + Organization */}
            <span
              className={cn(
                'text-xs leading-relaxed',
                'text-[var(--color-text-secondary)]',
              )}
            >
              {testimonial.attribution.title},{' '}
              {testimonial.attribution.organization}
            </span>
          </div>

          {/* Vertical badge -- pushed to right */}
          <span
            className={cn(
              'ml-auto hidden rounded-full px-3 py-1 sm:inline-block',
              'border border-[var(--color-ember-muted)]',
              'font-mono text-[10px] font-medium uppercase',
              'tracking-[0.12em]',
              'text-[var(--color-ember)]',
            )}
          >
            {vertical.label}
          </span>
        </footer>
      </blockquote>
    </GlassCard>
  )
}
