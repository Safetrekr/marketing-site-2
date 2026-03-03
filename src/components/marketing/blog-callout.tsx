// src/components/marketing/blog-callout.tsx

import { cn } from '@/lib/utils'

interface BlogCalloutProps {
  type?: 'tip' | 'warning' | 'info' | 'important'
  title?: string
  children: React.ReactNode
}

const CALLOUT_CONFIG: Record<
  string,
  { border: string; bg: string; label: string }
> = {
  tip: {
    border: 'border-l-[var(--color-ember)]',
    bg: 'bg-[rgba(var(--ember-rgb),0.04)]',
    label: 'Tip',
  },
  warning: {
    border: 'border-l-amber-500',
    bg: 'bg-amber-500/[0.04]',
    label: 'Warning',
  },
  info: {
    border: 'border-l-[var(--color-teal)]',
    bg: 'bg-[rgba(var(--teal-rgb),0.04)]',
    label: 'Note',
  },
  important: {
    border: 'border-l-[var(--color-ember-bright)]',
    bg: 'bg-[rgba(var(--ember-bright-rgb),0.06)]',
    label: 'Important',
  },
}

export function BlogCallout({
  type = 'info',
  title,
  children,
}: BlogCalloutProps) {
  const config = CALLOUT_CONFIG[type] ?? CALLOUT_CONFIG.info

  return (
    <aside
      role="note"
      className={cn(
        'my-6 rounded-r-lg border-l-[3px] p-4',
        config.border,
        config.bg,
      )}
    >
      <p className="mb-1 font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)]">
        {title ?? config.label}
      </p>
      <div className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
        {children}
      </div>
    </aside>
  )
}
