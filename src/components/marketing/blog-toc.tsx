// src/components/marketing/blog-toc.tsx

import { cn } from '@/lib/utils'

interface TocEntry {
  id: string
  text: string
  level: 2 | 3
}

interface BlogTocProps {
  content: string
  className?: string
}

export function BlogToc({ content, className }: BlogTocProps) {
  const entries = extractHeadings(content)
  if (entries.length < 3) return null // Only show TOC for substantial posts

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
        On this page
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

function extractHeadings(markdown: string): TocEntry[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const entries: TocEntry[] = []
  let match: RegExpExecArray | null

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length as 2 | 3
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    entries.push({ id, text, level })
  }

  return entries
}
