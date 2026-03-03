// src/components/marketing/legal-toc.tsx

import { cn } from '@/lib/utils'

export interface TocEntry {
  id: string
  text: string
  level: 2 | 3 // Only h2 and h3 appear in TOC
}

interface LegalTocProps {
  entries: TocEntry[]
  className?: string
}

export function LegalToc({ entries, className }: LegalTocProps) {
  if (entries.length === 0) return null

  return (
    <nav
      aria-label="Table of contents"
      className={cn(
        'sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto',
        'hidden lg:block',
        className,
      )}
    >
      <p className="mb-4 font-mono text-xs uppercase tracking-widest text-[var(--color-text-tertiary)]">
        Contents
      </p>
      <ul className="space-y-1.5 border-l border-[var(--color-border-faint)]">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              className={cn(
                'block border-l-2 border-transparent py-1 text-sm leading-snug transition-colors duration-150',
                'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
                'hover:border-[var(--color-ember)]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]',
                entry.level === 2 ? 'pl-4 font-medium' : 'pl-8',
              )}
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
