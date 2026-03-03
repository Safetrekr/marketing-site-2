// src/components/marketing/blog-tag.tsx

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface BlogTagProps {
  tag: string
  size?: 'sm' | 'md'
  showCount?: boolean
  count?: number
}

export function BlogTag({
  tag,
  size = 'md',
  showCount = false,
  count,
}: BlogTagProps) {
  const href = `/blog/tag/${encodeURIComponent(tag.toLowerCase())}`

  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-[var(--color-border-subtle)] font-mono uppercase tracking-wider transition-colors duration-150',
        'text-[var(--color-text-tertiary)] hover:border-[var(--color-ember-muted)] hover:text-[var(--color-ember-bright)]',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]',
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs',
      )}
    >
      {tag}
      {showCount && count !== undefined && (
        <span className="text-[var(--color-text-ghost)]">({count})</span>
      )}
    </Link>
  )
}
