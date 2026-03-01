/**
 * ChoiceReveal -- CTA container with staggered entrance.
 *
 * Reveals primary and secondary CTAs after the boot sequence.
 * Uses motion/react for entrance animation.
 *
 * @module choice-reveal
 */

'use client'

import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

import { useGatewayStore, type GatewayPhase } from '@/stores/gateway.store'
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
// Component
// ---------------------------------------------------------------------------

export function ChoiceReveal() {
  const phase = useGatewayStore((s) => s.phase)
  const selectDestination = useGatewayStore((s) => s.selectDestination)
  const router = useRouter()

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

  if (!showCTAs(phase)) return null

  return (
    <motion.div
      className="flex flex-col items-center gap-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Descriptor line */}
      <motion.p
        className="text-center font-mono text-[10px] font-medium uppercase"
        style={{
          letterSpacing: '0.08em',
          color: 'rgba(var(--ambient-ink-rgb), 0.18)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        Trip safety intelligence for schools, churches, and organizations
      </motion.p>

      {/* Primary CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.34, 1.56, 0.64, 1], // ease-bounce
        }}
      >
        <GatewayCTA
          label="Enter Mission Control"
          sublabel="Interactive experience"
          variant="primary"
          onClick={handleMissionControl}
          autoFocus
        />
      </motion.div>

      {/* Secondary CTA */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.15,
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
