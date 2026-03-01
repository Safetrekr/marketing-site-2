/**
 * CheckProgressBar -- 2px progress fill for system checks.
 *
 * Progress value is driven by rAF in the choreography hook.
 * Uses inline style for width to avoid CSS class churn.
 *
 * @module check-progress-bar
 */

'use client'

interface CheckProgressBarProps {
  progress: number
}

export function CheckProgressBar({ progress }: CheckProgressBarProps) {
  return (
    <div
      className="relative overflow-hidden rounded-[1px]"
      style={{
        width: 120,
        height: 2,
        background: 'rgba(var(--ambient-ink-rgb), 0.04)',
      }}
    >
      <div
        className="absolute inset-y-0 left-0 rounded-[1px]"
        style={{
          width: `${progress * 100}%`,
          background: 'var(--color-ember)',
          transition: 'none',
        }}
      />
    </div>
  )
}
