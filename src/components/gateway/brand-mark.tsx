/**
 * BrandMark -- shield logo + tagline + sub-tagline.
 *
 * Fades in during the 'arriving' phase with staggered timing.
 * Shield mark has a breathing green glow animation.
 *
 * @module brand-mark
 */

'use client'

import { motion } from 'motion/react'

import { useGatewayStore, type GatewayPhase } from '@/stores/gateway.store'

// ---------------------------------------------------------------------------
// Visibility helpers
// ---------------------------------------------------------------------------

function isVisible(phase: GatewayPhase): boolean {
  return phase !== 'idle' && phase !== 'exited'
}

function isTransitioning(phase: GatewayPhase): boolean {
  return phase === 'transitioning'
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function BrandMark() {
  const phase = useGatewayStore((s) => s.phase)

  if (!isVisible(phase)) return null

  const transitioning = isTransitioning(phase)

  return (
    <motion.div
      className="flex flex-col items-center gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: transitioning ? 0 : 1 }}
      transition={{ duration: transitioning ? 0.6 : 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Shield mark */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logos/safetrekr-mark-light.svg"
          alt="Safetrekr"
          className="gateway-shield-breathe hidden dark:block"
          style={{ width: 64, height: 64 }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logos/safetrekr-mark-dark.svg"
          alt="Safetrekr"
          className="gateway-shield-breathe dark:hidden block"
          style={{ width: 64, height: 64 }}
        />
      </motion.div>

      {/* Primary tagline */}
      <motion.p
        className="text-center font-sans text-base font-normal tracking-wide"
        style={{ color: 'var(--color-text-primary)', opacity: 0.85 }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 0.85, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        Every traveler accounted for.
      </motion.p>

      {/* Sub-tagline */}
      <motion.p
        className="text-center font-mono text-[10px] font-medium uppercase"
        style={{
          letterSpacing: '0.12em',
          color: 'rgba(var(--ambient-ink-rgb), 0.20)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        SAFETREKR // SECURITY PROTOCOL v2.1
      </motion.p>
    </motion.div>
  )
}
