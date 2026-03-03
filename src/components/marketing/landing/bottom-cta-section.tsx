// src/components/marketing/landing/bottom-cta-section.tsx

import { cn } from '@/lib/utils'
import { SectionContainer } from '@/components/marketing/section-container'
import { BottomCTAButtons } from './bottom-cta-buttons'

export function BottomCTASection() {
  return (
    <SectionContainer
      id="bottom-cta"
      aria-labelledby="bottom-cta-heading"
      className="bg-[var(--color-void)]"
    >
      <div
        className={cn(
          'mx-auto max-w-3xl rounded-2xl px-8 py-16 text-center',
          'bg-white/[0.04] backdrop-blur-[16px]',
          'border border-white/[0.08]',
          'glass-card-fallback',
          'lg:px-16 lg:py-20',
        )}
      >
        {/* Emotional close */}
        <h2
          id="bottom-cta-heading"
          className={cn(
            'font-sans text-2xl font-bold',
            'md:text-3xl',
            'text-[var(--color-text-primary)]',
            'leading-snug',
          )}
        >
          Your travelers trust you to bring them home safely.
        </h2>

        {/* Resolution line */}
        <p
          className={cn(
            'mt-4 text-base leading-relaxed',
            'text-[var(--color-text-secondary)]',
            'mx-auto max-w-[480px]',
          )}
        >
          Safetrekr makes sure that trust is backed by a system -- not just good
          intentions.
        </p>

        {/* CTA buttons (client island) */}
        <BottomCTAButtons />
      </div>
    </SectionContainer>
  )
}
