// src/components/marketing/glass-card.tsx

import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  /** 'default' uses standard glass. 'elevated' adds ember glow shadow. */
  variant?: 'default' | 'elevated'
}

export function GlassCard({
  children,
  className,
  variant = 'default',
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl p-8 lg:p-10',
        // Glass material (from detail-panel.tsx pattern)
        'bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]',
        'border border-white/[0.08]',
        // Fallback class for browsers without backdrop-filter
        'glass-card-fallback',
        // Variant: elevated adds ember glow
        variant === 'elevated' &&
          'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_0_1px_0_rgba(var(--ember-rgb),0.3),0_0_24px_rgba(var(--ember-rgb),0.1)]',
        className,
      )}
    >
      {children}
    </div>
  )
}
