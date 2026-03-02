/**
 * NominalBadge -- "ALL SYSTEMS NOMINAL" persistent status graphic.
 *
 * After the boot sequence completes, this badge appears at center,
 * then morphs to the top-left corner where it persists as a compact
 * status indicator with a breathing green glow.
 *
 * Uses motion/react layout animation for the center-to-corner morph.
 *
 * @module nominal-badge
 */

'use client'

import { motion, AnimatePresence } from 'motion/react'

import { useGatewayStore, type GatewayPhase } from '@/stores/gateway.store'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function shouldShow(phase: GatewayPhase, nominalFlash: boolean): boolean {
  return (
    nominalFlash ||
    phase === 'revealing' ||
    phase === 'ambient'
  )
}

function isSettled(phase: GatewayPhase): boolean {
  return phase === 'revealing' || phase === 'ambient'
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function NominalBadge() {
  const phase = useGatewayStore((s) => s.phase)
  const nominalFlash = useGatewayStore((s) => s.nominalFlash)

  const visible = shouldShow(phase, nominalFlash)
  const settled = isSettled(phase)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="nominal-badge"
          className="fixed z-30"
          style={{ pointerEvents: 'none' }}
          initial={{
            top: '50%',
            left: '50%',
            x: '-50%',
            y: '-50%',
            scale: 1,
          }}
          animate={
            settled
              ? {
                  top: 16,
                  left: 16,
                  x: 0,
                  y: 0,
                  scale: 0.85,
                }
              : {
                  top: '50%',
                  left: '50%',
                  x: '-50%',
                  y: '-50%',
                  scale: 1,
                }
          }
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            duration: settled ? 0.8 : 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          aria-hidden="true"
        >
          <div
            className={settled ? 'gateway-shield-breathe' : ''}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 10px',
              borderRadius: 20,
              background: 'rgba(var(--ambient-ink-rgb), 0.03)',
              border: '1px solid rgba(var(--ember-rgb), 0.12)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {/* Status dot */}
            <div
              className="enrichment-rec-pulse"
              style={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                backgroundColor: 'rgba(var(--ember-rgb), 0.60)',
                flexShrink: 0,
              }}
            />

            {/* Label */}
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: settled ? 7 : 10,
                fontWeight: 600,
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color: settled
                  ? 'rgba(var(--ember-rgb), 0.40)'
                  : 'var(--color-ember-bright)',
                whiteSpace: 'nowrap',
                transition: 'font-size 0.8s ease, color 0.8s ease',
              }}
            >
              ALL SYSTEMS NOMINAL
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
