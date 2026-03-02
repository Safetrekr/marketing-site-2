/**
 * PanelShell -- shared wrapper for edge micro-telemetry panels.
 *
 * Provides entrance animation (fade + slide from nearest edge),
 * consistent monospace styling, 3-letter label with status dot,
 * and fixed viewport positioning.
 *
 * @module panel-shell
 */

'use client'

import { type ReactNode } from 'react'
import { motion } from 'motion/react'

import { useGatewayStore, type GatewayPhase } from '@/stores/gateway.store'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type SlideDirection = 'top' | 'right' | 'bottom' | 'left'

interface PanelShellProps {
  label: string
  position: React.CSSProperties
  slideFrom: SlideDirection
  children: ReactNode
  /** Hide on mobile (< 768px) — used for left/right panels */
  hideOnMobile?: boolean
}

// ---------------------------------------------------------------------------
// Animation offsets per direction
// ---------------------------------------------------------------------------

const SLIDE_OFFSETS: Record<SlideDirection, { x: number; y: number }> = {
  top: { x: 0, y: -10 },
  right: { x: 10, y: 0 },
  bottom: { x: 0, y: 10 },
  left: { x: -10, y: 0 },
}

// ---------------------------------------------------------------------------
// Opacity dimming during CTA reveal
// ---------------------------------------------------------------------------

function phaseOpacity(phase: GatewayPhase): number {
  if (phase === 'transitioning' || phase === 'exited') return 0
  return 1
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PanelShell({
  label,
  position,
  slideFrom,
  children,
  hideOnMobile,
}: PanelShellProps) {
  const phase = useGatewayStore((s) => s.phase)
  const offset = SLIDE_OFFSETS[slideFrom]

  return (
    <motion.div
      className={`fixed z-20 ${hideOnMobile ? 'hidden sm:block' : ''}`}
      style={{
        ...position,
        pointerEvents: 'none',
      }}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      animate={{ opacity: phaseOpacity(phase), x: 0, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      {/* Label row: 3-letter code + status dot */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          marginBottom: 3,
        }}
      >
        <div
          className="enrichment-rec-pulse"
          style={{
            width: 3,
            height: 3,
            borderRadius: '50%',
            backgroundColor: 'rgba(var(--ember-rgb), 0.50)',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: 7,
            fontWeight: 600,
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            color: 'rgba(var(--ambient-ink-rgb), 0.35)',
            lineHeight: 1,
          }}
        >
          {label}
        </span>
      </div>

      {/* Panel content */}
      <div
        style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: 7,
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'rgba(var(--ambient-ink-rgb), 0.40)',
          lineHeight: 1.4,
        }}
      >
        {children}
      </div>
    </motion.div>
  )
}
