'use client'

// src/components/marketing/landing/hero-cta-group.tsx

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { BreathingCTA } from '@/components/marketing/breathing-cta'

export function HeroCTAGroup() {
  return (
    <>
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
        {/* Primary CTA */}
        <BreathingCTA
          href="/contact"
          size="lg"
          data-analytics-id="landing-hero-cta"
        >
          Schedule a Briefing
        </BreathingCTA>

        {/* Micro-copy (mobile -- between CTAs) */}
        <p className="text-xs text-[var(--color-text-tertiary)] sm:hidden">
          20-minute briefing. No obligation.
        </p>

        {/* Secondary CTA */}
        <Link
          href="/launch"
          className={cn(
            'rounded-full px-6 py-3 text-sm font-medium',
            'text-[var(--color-text-secondary)]',
            'border border-white/[0.08]',
            'hover:text-[var(--color-text-primary)]',
            'hover:border-white/[0.14]',
            'hover:bg-white/[0.04]',
            'transition-all duration-[var(--duration-hover)]',
            'focus-visible:outline-2 focus-visible:outline-offset-2',
            'focus-visible:outline-[var(--color-ember-bright)]',
          )}
        >
          Explore the Platform
        </Link>
      </div>

      {/* Micro-copy (desktop -- below CTA row) */}
      <p className="mt-4 hidden text-xs text-[var(--color-text-tertiary)] sm:block">
        20-minute briefing. No obligation.
      </p>
    </>
  )
}
