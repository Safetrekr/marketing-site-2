/**
 * BrandMark -- shield logo + tagline + sub-tagline.
 *
 * Fades in during the 'arriving' phase with staggered timing.
 * Shield mark has a breathing green glow animation.
 * Text uses typewriter effect for character-by-character reveal.
 *
 * @module brand-mark
 */

'use client'

import { motion } from 'motion/react'

import { useGatewayStore, type GatewayPhase } from '@/stores/gateway.store'
import { useTypewriter } from '@/hooks/use-typewriter'

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
// Typewriter cursor
// ---------------------------------------------------------------------------

function TypewriterCursor({ visible }: { visible: boolean }) {
  if (!visible) return null
  return (
    <span
      className="gateway-cursor-blink"
      style={{
        display: 'inline-block',
        width: 1,
        height: '1em',
        backgroundColor: 'currentColor',
        marginLeft: 1,
        verticalAlign: 'text-bottom',
        opacity: 0.6,
      }}
      aria-hidden="true"
    />
  )
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function BrandMark() {
  const phase = useGatewayStore((s) => s.phase)

  const isActive = isVisible(phase)

  const tagline = useTypewriter({
    text: 'Every traveler accounted for.',
    enabled: isActive,
    delay: 800,
    speed: 40,
  })

  const subTagline = useTypewriter({
    text: 'SAFETREKR // SECURITY PROTOCOL v2.1',
    enabled: tagline.isComplete,
    delay: 200,
    speed: 25,
  })

  if (!isActive) return null

  const transitioning = isTransitioning(phase)

  return (
    <motion.div
      className="flex flex-col items-center gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: transitioning ? 0 : 1 }}
      transition={{ duration: transitioning ? 0.6 : 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Horizontal logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logos/safetrekr-logo-horiz-light.png"
          alt="Safetrekr"
          className="gateway-shield-breathe"
          style={{ height: 96, width: 'auto' }}
        />
      </motion.div>

      {/* Primary tagline -- typewriter */}
      <p
        className="text-center font-sans text-base font-normal tracking-wide"
        style={{ color: 'var(--color-text-primary)', opacity: 0.85, minHeight: '1.5em' }}
      >
        {tagline.displayText}
        <TypewriterCursor visible={tagline.isTyping} />
      </p>

      {/* Sub-tagline -- typewriter */}
      <p
        className="text-center font-mono text-[10px] font-medium uppercase"
        style={{
          letterSpacing: '0.12em',
          color: 'rgba(var(--ambient-ink-rgb), 0.20)',
          minHeight: '1.2em',
        }}
      >
        {subTagline.displayText}
        <TypewriterCursor visible={subTagline.isTyping} />
      </p>
    </motion.div>
  )
}
