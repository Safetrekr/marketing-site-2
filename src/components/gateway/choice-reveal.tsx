/**
 * ChoiceReveal -- CTA container with staggered entrance.
 *
 * Reveals primary and secondary CTAs after the boot sequence.
 * Text uses typewriter effect for character-by-character reveal.
 *
 * Layout order (top to bottom):
 * 1. Descriptor line (typewriter)
 * 2. "Interactive experience" label
 * 3. Primary CTA: "Enter Mission Control"
 * 4. Secondary CTA: "Read the Brief / Product overview" (bordered)
 *
 * @module choice-reveal
 */

'use client'

import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

import { useGatewayStore, type GatewayPhase } from '@/stores/gateway.store'
import { useTypewriter } from '@/hooks/use-typewriter'
import { GatewayCTA } from './gateway-cta'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function showCTAs(phase: GatewayPhase): boolean {
  return (
    phase === 'revealing' ||
    phase === 'ambient'
  )
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

export function ChoiceReveal() {
  const phase = useGatewayStore((s) => s.phase)
  const selectDestination = useGatewayStore((s) => s.selectDestination)
  const router = useRouter()

  const isActive = showCTAs(phase)

  const descriptor = useTypewriter({
    text: 'Trip safety intelligence for schools, churches, and organizations',
    enabled: isActive,
    delay: 100,
    speed: 20,
  })

  const handleMissionControl = useCallback(() => {
    selectDestination('mission-control')
    // Delay router push to allow exit animation
    setTimeout(() => {
      router.push('/launch')
    }, 600)
  }, [selectDestination, router])

  const handleMarketing = useCallback(() => {
    selectDestination('marketing')
    // Placeholder URL -- traditional site not deployed yet
    window.open('https://safetrekr.com', '_blank')
  }, [selectDestination])

  if (!isActive) return null

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Descriptor line -- typewriter */}
      <p
        className="text-center font-mono text-[10px] font-medium uppercase"
        style={{
          letterSpacing: '0.08em',
          color: 'rgba(var(--ambient-ink-rgb), 0.18)',
          minHeight: '1.2em',
        }}
      >
        {descriptor.displayText}
        <TypewriterCursor visible={descriptor.isTyping} />
      </p>

      {/* "Interactive experience" label ABOVE the CTA */}
      <motion.p
        className="mt-8 font-mono text-[8px] font-medium uppercase"
        style={{
          letterSpacing: '0.08em',
          color: 'rgba(var(--ambient-ink-rgb), 0.15)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        Interactive experience
      </motion.p>

      {/* Primary CTA */}
      <motion.div
        className="mt-3"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          delay: 0.2,
          ease: [0.34, 1.56, 0.64, 1], // ease-bounce
        }}
      >
        <GatewayCTA
          label="Enter Mission Control"
          variant="primary"
          onClick={handleMissionControl}
          autoFocus
        />
      </motion.div>

      {/* Secondary CTA */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <GatewayCTA
          label="Read the Brief"
          sublabel="Product overview"
          variant="secondary"
          onClick={handleMarketing}
        />
      </motion.div>
    </motion.div>
  )
}
