/**
 * GatewayScene -- client boundary for the cinematic landing page.
 *
 * Owns the state machine lifecycle:
 * - Mounts the choreography hook (drives timing)
 * - Renders ambient layer (reused from existing components)
 * - Renders brand mark, boot sequence, choice reveal
 * - Handles skip via keyboard/click
 * - Prefetches /launch route for instant transition
 *
 * @module gateway-scene
 */

'use client'

import { useEffect, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'

import { useGatewayStore } from '@/stores/gateway.store'
import { useGatewayChoreography } from '@/hooks/use-gateway-choreography'
import {
  useKeyboardShortcuts,
  type KeyboardShortcutConfig,
} from '@/hooks/use-keyboard-shortcuts'

import { BrandMark } from './brand-mark'
import { BootSequence } from './boot-sequence'
import { ChoiceReveal } from './choice-reveal'
import { EdgeStrip } from './edge-strip'
import { SecurityNarrative } from './security-narrative'
import { SkipAffordance } from './skip-affordance'

import { HorizonScanLine } from '@/components/ambient/horizon-scan-line'
import { CalibrationMarks } from '@/components/ambient/calibration-marks'
import { SessionTimecode } from '@/components/ambient/session-timecode'

// ---------------------------------------------------------------------------
// Reduced motion detection
// ---------------------------------------------------------------------------

function usePrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function GatewayScene() {
  const router = useRouter()
  const phase = useGatewayStore((s) => s.phase)
  const skipToReveal = useGatewayStore((s) => s.skipToReveal)
  const prefersReducedMotion = usePrefersReducedMotion()

  // Drive the state machine
  useGatewayChoreography(prefersReducedMotion)

  // Prefetch /launch route for instant transition
  useEffect(() => {
    router.prefetch('/launch')
  }, [router])

  // Skip on any key during boot
  const handleSkipKey = useCallback(() => {
    skipToReveal()
  }, [skipToReveal])

  // Keyboard shortcuts
  const shortcuts: KeyboardShortcutConfig[] = useMemo(
    () => [
      {
        key: 'Escape',
        handler: handleSkipKey,
        label: 'Skip boot sequence',
      },
    ],
    [handleSkipKey],
  )
  useKeyboardShortcuts(shortcuts)

  // Click/tap to skip during boot
  const handleClick = useCallback(() => {
    if (phase === 'arriving' || phase === 'booting') {
      skipToReveal()
    }
  }, [phase, skipToReveal])

  // Any key to skip (not just Escape)
  useEffect(() => {
    if (phase !== 'arriving' && phase !== 'booting') return

    const handler = (e: KeyboardEvent) => {
      // Don't skip on Tab (let focus management work)
      if (e.key === 'Tab') return
      skipToReveal()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [phase, skipToReveal])

  const isTransitioning = phase === 'transitioning' || phase === 'exited'

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{
        background: 'var(--color-void)',
        cursor: phase === 'arriving' || phase === 'booting' ? 'pointer' : 'default',
      }}
      onClick={handleClick}
      animate={{
        opacity: isTransitioning ? 0 : 1,
      }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Ambient layer */}
      <HorizonScanLine />
      <CalibrationMarks />
      <SessionTimecode />

      {/* Edge strip dots */}
      <EdgeStrip />

      {/* Center stage */}
      <div className="relative z-10 flex flex-col items-center gap-10">
        <BrandMark />
        <BootSequence />
        <ChoiceReveal />
        <SecurityNarrative />
      </div>

      {/* Skip affordance */}
      <SkipAffordance />
    </motion.div>
  )
}
