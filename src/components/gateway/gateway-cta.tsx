/**
 * GatewayCTA -- glass pill CTA button.
 *
 * Primary variant has breathing glow and dominant styling.
 * Secondary variant is intentionally whisper-quiet.
 *
 * @module gateway-cta
 */

'use client'

import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface GatewayCTAProps {
  label: string
  sublabel?: string
  variant: 'primary' | 'secondary'
  onClick: () => void
  autoFocus?: boolean
}

export function GatewayCTA({
  label,
  sublabel,
  variant,
  onClick,
  autoFocus,
}: GatewayCTAProps) {
  if (variant === 'secondary') {
    return (
      <button
        onClick={onClick}
        className={cn(
          'font-mono text-[9px] font-medium uppercase',
          'tracking-[0.08em]',
          'transition-all duration-200',
          'hover:underline hover:underline-offset-4',
          'focus-visible:outline-2 focus-visible:outline-offset-2',
          'focus-visible:outline-[rgba(var(--ember-bright-rgb),0.40)]',
        )}
        style={{
          color: 'rgba(var(--ambient-ink-rgb), 0.15)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'rgba(var(--ambient-ink-rgb), 0.35)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'rgba(var(--ambient-ink-rgb), 0.15)'
        }}
      >
        {label}
        {sublabel && (
          <span
            className="mt-1 block text-[8px]"
            style={{ color: 'rgba(var(--ambient-ink-rgb), 0.10)' }}
          >
            {sublabel}
          </span>
        )}
      </button>
    )
  }

  return (
    <div className="flex flex-col items-center gap-1.5">
      <button
        onClick={onClick}
        autoFocus={autoFocus}
        className={cn(
          'gateway-cta-breathe',
          'rounded-full px-8 py-3',
          'font-mono text-[11px] font-semibold uppercase',
          'tracking-[0.08em]',
          'backdrop-blur-[8px]',
          'transition-all duration-200',
          'hover:border-[rgba(var(--ambient-ink-rgb),0.12)]',
          'hover:bg-[rgba(var(--ambient-ink-rgb),0.06)]',
          'active:scale-[0.97]',
          'focus-visible:outline-2 focus-visible:outline-offset-4',
          'focus-visible:outline-[rgba(var(--ember-bright-rgb),0.40)]',
        )}
        style={{
          color: 'var(--color-ember-bright)',
          background: 'rgba(var(--ambient-ink-rgb), 0.03)',
          border: '1px solid rgba(var(--ambient-ink-rgb), 0.08)',
          minWidth: 240,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--color-ember-glow)'
          e.currentTarget.classList.remove('gateway-cta-breathe')
          e.currentTarget.style.boxShadow =
            '0 0 40px rgba(75, 164, 103, 0.18), 0 0 16px rgba(75, 164, 103, 0.30), 0 0 4px rgba(146, 212, 166, 0.50)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--color-ember-bright)'
          e.currentTarget.classList.add('gateway-cta-breathe')
          e.currentTarget.style.boxShadow = ''
        }}
      >
        {label}
      </button>
      {sublabel && (
        <span
          className="font-mono text-[8px] font-medium uppercase"
          style={{
            letterSpacing: '0.08em',
            color: 'rgba(var(--ambient-ink-rgb), 0.15)',
          }}
        >
          {sublabel}
        </span>
      )}
    </div>
  )
}
