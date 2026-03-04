// src/components/marketing/landing/hero-section.tsx

import { cn } from '@/lib/utils'
import { MarketingParticleField } from '@/components/marketing/marketing-particle-field'
import { HeroCTAGroup } from './hero-cta-group'

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[calc(100vh-56px)] flex-col items-center justify-center overflow-hidden md:min-h-[calc(100vh-64px)]"
    >
      {/* Particle field background */}
      <div className="absolute inset-0 z-0">
        <MarketingParticleField />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[800px] px-6 text-center lg:px-8">
        {/* Monospace metadata label */}
        <p
          className={cn(
            'font-mono text-xs font-medium uppercase',
            'tracking-[0.12em]',
            'text-[var(--color-ember)]',
            'mb-6',
          )}
        >
          Trip Safety Management Platform
        </p>

        {/* H1 */}
        <h1
          id="hero-heading"
          className={cn(
            'font-sans text-4xl font-bold tracking-tight',
            'md:text-5xl lg:text-6xl',
            'text-[var(--color-text-primary)]',
            'leading-[1.1]',
          )}
        >
          You&rsquo;re responsible for their safety.
          <br />
          Can you prove it?
        </h1>

        {/* Subheadline */}
        <p
          className={cn(
            'mt-6 text-lg leading-relaxed',
            'md:text-xl md:leading-relaxed',
            'text-[var(--color-text-secondary)]',
            'mx-auto max-w-[640px]',
          )}
        >
          Safetrekr assigns a professional safety analyst to every trip your
          organization runs. Professionally reviewed before departure. Actively
          monitored during travel. Fully documented for the record.
        </p>

        {/* CTA group (client island) */}
        <HeroCTAGroup />
      </div>
    </section>
  )
}
