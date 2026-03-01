/**
 * SystemCheck -- individual disposable check element.
 *
 * Renders differently based on status:
 * - waiting: hidden (filtered by parent)
 * - active: label + progress bar
 * - complete: label + completion value + pulse
 * - collapsed: filtered out by parent (AnimatePresence handles exit)
 *
 * Stateless: all timing lives in the choreography hook.
 *
 * @module system-check
 */

'use client'

import { motion } from 'motion/react'

import { CheckProgressBar } from './check-progress-bar'
import type { SystemCheckState } from '@/stores/gateway.store'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface SystemCheckProps {
  check: SystemCheckState
}

export function SystemCheck({ check }: SystemCheckProps) {
  return (
    <motion.div
      layout
      className="flex items-center gap-3"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Status dot */}
      <div
        className={check.status === 'complete' ? 'gateway-check-pulse' : ''}
        style={{
          width: 4,
          height: 4,
          borderRadius: '50%',
          backgroundColor:
            check.status === 'complete'
              ? 'rgba(var(--ember-rgb), 0.50)'
              : 'rgba(var(--ember-rgb), 0.16)',
          transition: 'background-color 600ms ease',
          flexShrink: 0,
        }}
      />

      {/* Label */}
      <span
        className="font-mono text-[8px] font-medium uppercase"
        style={{
          letterSpacing: '0.08em',
          color:
            check.status === 'complete'
              ? 'rgba(var(--ambient-ink-rgb), 0.20)'
              : 'rgba(var(--ambient-ink-rgb), 0.35)',
          transition: 'color 400ms ease',
          width: 100,
          flexShrink: 0,
        }}
      >
        {check.label}
      </span>

      {/* Progress bar (active) or completion value (complete) */}
      {check.status === 'active' && (
        <CheckProgressBar progress={check.progress} />
      )}

      {check.status === 'complete' && (
        <motion.span
          className="font-mono text-[8px] font-medium uppercase"
          style={{
            letterSpacing: '0.08em',
            color: 'rgba(var(--ambient-ink-rgb), 0.35)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
        >
          {check.completionValue}
        </motion.span>
      )}
    </motion.div>
  )
}
