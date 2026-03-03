'use client'

// src/components/marketing/social-proof/customer-logo-bar.tsx

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { CustomerLogo } from '@/lib/interfaces/social-proof'

interface CustomerLogoBarProps {
  logos: CustomerLogo[]
  /** When true, enables auto-scroll animation. Default: false (static layout). */
  autoScroll?: boolean
  className?: string
}

export function CustomerLogoBar({
  logos,
  autoScroll = false,
  className,
}: CustomerLogoBarProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  if (logos.length === 0) return null

  const sortedLogos = [...logos].sort((a, b) => a.order - b.order)

  const logoElements = sortedLogos.map((logo) => {
    const img = (
      <Image
        src={logo.logoSrc}
        alt={`${logo.name} logo`}
        width={160}
        height={40}
        className={cn(
          'h-8 w-auto object-contain md:h-10',
          'opacity-40 grayscale',
          'hover:opacity-80 hover:grayscale-0',
          'transition-all duration-[var(--duration-transition)]',
        )}
      />
    )

    // Wrap in link if case study exists
    if (logo.caseStudySlug) {
      return (
        <Link
          key={logo.id}
          href={`/case-studies/${logo.caseStudySlug}`}
          className={cn(
            'shrink-0',
            'focus-visible:outline-2 focus-visible:outline-offset-4',
            'focus-visible:outline-[var(--color-ember-bright)]',
          )}
        >
          {img}
        </Link>
      )
    }

    return (
      <div key={logo.id} className="shrink-0">
        {img}
      </div>
    )
  })

  return (
    <div className={cn('overflow-hidden', className)}>
      {/* "Trusted by" label */}
      <p
        className={cn(
          'mb-8 text-center',
          'font-mono text-xs font-medium uppercase',
          'tracking-[0.12em]',
          'text-[var(--color-text-tertiary)]',
        )}
      >
        Trusted by
      </p>

      <div
        ref={containerRef}
        className={cn(
          'flex items-center justify-center gap-12',
          autoScroll && 'logo-scroll-track',
        )}
        aria-label="Customer logos"
        role="list"
      >
        {logoElements}
        {/* Duplicate for seamless scroll loop */}
        {autoScroll && logoElements}
      </div>
    </div>
  )
}
