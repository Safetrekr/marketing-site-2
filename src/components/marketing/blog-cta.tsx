// src/components/marketing/blog-cta.tsx

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface BlogCtaProps {
  href: string
  label: string
  description?: string
  variant?: 'default' | 'subtle'
}

export function BlogCta({
  href,
  label,
  description,
  variant = 'default',
}: BlogCtaProps) {
  return (
    <div
      className={cn(
        'my-8 rounded-xl border p-6 text-center',
        variant === 'default'
          ? 'border-[var(--color-ember-muted)] bg-[rgba(var(--ember-rgb),0.04)]'
          : 'border-[var(--color-border-subtle)] bg-white/[0.02]',
      )}
    >
      {description && (
        <p className="mb-3 text-sm text-[var(--color-text-secondary)]">
          {description}
        </p>
      )}
      <Link
        href={href}
        className={cn(
          'inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium transition-colors duration-200',
          'bg-[var(--color-ember)] text-white hover:bg-[var(--color-ember-bright)]',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]',
        )}
      >
        {label}
      </Link>
    </div>
  )
}
