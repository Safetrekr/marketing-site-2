// src/components/marketing/platform/platform-cta.tsx

import Link from 'next/link'

export function PlatformCTA() {
  return (
    <section
      aria-labelledby="platform-cta-heading"
      className="px-6 py-24 text-center md:px-8 md:py-32"
    >
      {/* CTA heading */}
      <h2
        id="platform-cta-heading"
        className="text-3xl font-bold text-[var(--color-text-primary)] md:text-4xl"
      >
        See Safetrekr in action.
      </h2>

      {/* CTA button with breathing glow */}
      <Link
        href="/contact"
        className="mkt-cta-breathe mt-8 inline-flex items-center justify-center rounded-full bg-[var(--color-ember)] px-8 py-4 text-lg font-semibold tracking-[0.02em] text-white transition-colors duration-[var(--duration-hover)] hover:bg-[var(--color-ember-bright)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]"
        data-analytics-id="platform-cta-schedule-briefing"
      >
        Schedule a Briefing
      </Link>

      {/* Micro-copy */}
      <p className="mt-4 font-mono text-sm tracking-[0.04em] text-[var(--color-text-tertiary)]">
        20 minutes. We walk you through every portal.
      </p>
    </section>
  )
}
