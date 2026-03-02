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
 * Layout: Uses absolute positioning for center stage elements
 * so that brand mark stays fixed and nothing shifts as boot
 * sequence transitions to CTAs.
 *
 * Z-index layers:
 * - z-0:  Ambient background (horizon scan, timecode)
 * - z-20: Edge panels (micro-telemetry)
 * - z-30: Center stage content + nominal badge
 * - z-40: Header bar + district dock
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
import { EdgePanels } from './edge-panels'
import { SecurityNarrative } from './security-narrative'
import { NominalBadge } from './nominal-badge'
import { SkipAffordance } from './skip-affordance'
import { GatewayHeader } from './gateway-header'
import { DistrictDock } from './district-dock'

import { HorizonScanLine } from '@/components/ambient/horizon-scan-line'
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
      className="fixed inset-0 overflow-hidden"
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
      {/* Ambient background layer -- lowest z-index */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <HorizonScanLine />
        <SessionTimecode />
      </div>

      {/* Edge panels: living micro-telemetry at viewport edges */}
      <EdgePanels />

      {/* Center stage -- absolute positioned to prevent layout shift.
          Uses a fixed-size container centered on screen so brand mark
          never moves as boot sequence transitions to CTAs. */}
      <div className="fixed inset-0 z-30 flex items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center" style={{ width: '100%', maxWidth: 640 }}>
          {/* Brand mark: always at the top of this centered block */}
          <div className="pointer-events-auto">
            <BrandMark />
          </div>

          {/* Boot/Reveal zone: fixed-height area below brand mark.
              Both BootSequence and ChoiceReveal render here,
              overlapping so the transition doesn't shift layout. */}
          <div className="relative mt-10 w-full pointer-events-auto" style={{ minHeight: 280 }}>
            {/* Boot sequence occupies this zone during booting */}
            <div className="absolute inset-x-0 top-0 flex justify-center">
              <BootSequence />
            </div>

            {/* Choice reveal occupies this zone after boot */}
            <div className="absolute inset-x-0 top-0 flex flex-col items-center">
              <ChoiceReveal />
              <div className="mt-6">
                <SecurityNarrative />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nominal badge: flashes at center then morphs to top-left */}
      <NominalBadge />

      {/* Header: telemetry stats bar */}
      <GatewayHeader />

      {/* District dock: bottom icon buttons */}
      <DistrictDock />

      {/* Skip affordance */}
      <SkipAffordance />
    </motion.div>
  )
}
