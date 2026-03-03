'use client'

// src/components/marketing/breathing-cta.tsx

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface BreathingCTAProps {
  href: string
  children: React.ReactNode
  className?: string
  /** 'md' for inline contexts, 'lg' for hero/standalone contexts */
  size?: 'md' | 'lg'
  /** Optional data attribute for analytics binding (WS-C.3) */
  'data-analytics-id'?: string
}

export function BreathingCTA({
  href,
  children,
  className,
  size = 'md',
  ...rest
}: BreathingCTAProps) {
  return (
    <Link
      href={href}
      className={cn(
        'mkt-cta-breathe',
        'inline-flex items-center justify-center',
        'rounded-full font-medium',
        'bg-[var(--color-ember)] text-[var(--color-void)]',
        'hover:bg-[var(--color-ember-bright)]',
        'active:scale-[0.97]',
        'transition-all duration-[var(--duration-hover)]',
        'focus-visible:outline-2 focus-visible:outline-offset-2',
        'focus-visible:outline-[var(--color-ember-bright)]',
        // Size variants
        size === 'md' && 'px-5 py-2 text-sm',
        size === 'lg' && 'px-8 py-3.5 text-base',
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  )
}
