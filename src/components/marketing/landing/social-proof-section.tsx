// src/components/marketing/landing/social-proof-section.tsx

import { cn } from '@/lib/utils'
import { SectionContainer } from '@/components/marketing/section-container'
import { TestimonialCard } from '@/components/marketing/social-proof/testimonial-card'
import { CapabilityProofCard } from '@/components/marketing/social-proof/capability-proof-card'
import { CustomerLogoBar } from '@/components/marketing/social-proof/customer-logo-bar'
import { getLandingPageSocialProof } from '@/lib/data/testimonials'
import { CUSTOMER_LOGOS, LOGO_BAR_MINIMUM } from '@/lib/data/customer-logos'

export function SocialProofSection() {
  const { testimonials, capabilityProofs, mode } = getLandingPageSocialProof()
  const showLogos = CUSTOMER_LOGOS.length >= LOGO_BAR_MINIMUM

  return (
    <SectionContainer
      id="social-proof"
      aria-labelledby="social-proof-heading"
      className="bg-gradient-to-b from-[var(--color-void)] to-[var(--color-abyss)]"
    >
      {/* Section monospace label */}
      <p
        className={cn(
          'mb-4 text-center font-mono text-xs font-medium uppercase',
          'tracking-[0.12em]',
          'text-[var(--color-text-tertiary)]',
        )}
      >
        {mode === 'capability' ? 'Platform Metrics' : 'Social Proof'}
      </p>

      {/* Section heading */}
      <h2
        id="social-proof-heading"
        className={cn(
          'text-center font-sans text-3xl font-bold',
          'md:text-4xl',
          'text-[var(--color-text-primary)]',
          'mb-16 lg:mb-20',
        )}
      >
        {mode === 'capability'
          ? 'Trusted by organizations that take safety seriously.'
          : 'What our customers say.'}
      </h2>

      {/* Card grid -- 3 slots, mixed content in hybrid mode */}
      <div
        className={cn(
          'grid gap-8',
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        )}
      >
        {testimonials.map((t) => (
          <TestimonialCard key={t.id} testimonial={t} />
        ))}
        {capabilityProofs.map((cp, i) => (
          <CapabilityProofCard key={`cap-${i}`} proof={cp} />
        ))}
      </div>

      {/* Customer logo bar (renders only when sufficient logos exist) */}
      {showLogos && (
        <div className="mt-20">
          <CustomerLogoBar
            logos={CUSTOMER_LOGOS}
            autoScroll={CUSTOMER_LOGOS.length >= 6}
          />
        </div>
      )}
    </SectionContainer>
  )
}
