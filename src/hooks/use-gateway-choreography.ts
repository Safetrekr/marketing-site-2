/**
 * Gateway choreography hook -- timing orchestration for boot sequence.
 *
 * Drives the gateway state machine through phases by scheduling
 * transitions via setTimeout. Follows the same pattern as
 * useMorphChoreography: hook watches phase, schedules next transition,
 * cleans up timers on unmount.
 *
 * Progress bar fill uses rAF for smooth 60fps animation.
 *
 * @module use-gateway-choreography
 */

'use client'

import { useEffect, useRef, useCallback } from 'react'

import { useGatewayStore } from '@/stores/gateway.store'
import { GATEWAY_CHECKS } from '@/lib/gateway-checks'

// ---------------------------------------------------------------------------
// Timing constants
// ---------------------------------------------------------------------------

/** Time before brand mark starts fading in. */
const ARRIVAL_DELAY = 200

/** Duration of arrival phase (brand fade-in). */
const ARRIVAL_DURATION = 1300

/** Stagger between check starts (ms). */
const CHECK_STAGGER = 600

/** Duration of active check (progress bar fill). */
const CHECK_ACTIVE_DURATION = 700

/** Hold time after check completes before collapsing. */
const CHECK_COMPLETE_HOLD = 300

/** Delay after last check before "ALL SYSTEMS NOMINAL" flash. */
const NOMINAL_DELAY = 400

/** Duration of the nominal flash display. */
const NOMINAL_DURATION = 1200

/** Delay after nominal flash before CTAs appear. */
const REVEAL_DELAY = 200

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useGatewayChoreography(
  prefersReducedMotion: boolean,
): void {
  const phase = useGatewayStore((s) => s.phase)
  const hasSeenRitual = useGatewayStore((s) => s.hasSeenRitual)
  const setPhase = useGatewayStore((s) => s.setPhase)
  const setCheckStatus = useGatewayStore((s) => s.setCheckStatus)
  const setCheckProgress = useGatewayStore((s) => s.setCheckProgress)
  const setNominalFlash = useGatewayStore((s) => s.setNominalFlash)
  const skipToReveal = useGatewayStore((s) => s.skipToReveal)
  const reset = useGatewayStore((s) => s.reset)

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const rafsRef = useRef<number[]>([])

  const clearAllTimers = useCallback(() => {
    for (const t of timersRef.current) clearTimeout(t)
    for (const r of rafsRef.current) cancelAnimationFrame(r)
    timersRef.current = []
    rafsRef.current = []
  }, [])

  const addTimer = useCallback((fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms)
    timersRef.current.push(t)
    return t
  }, [])

  // rAF-driven progress bar fill
  const animateProgress = useCallback(
    (checkIndex: number, duration: number) => {
      const startTime = performance.now()
      const tick = (now: number) => {
        const elapsed = now - startTime
        const t = Math.min(1, elapsed / duration)
        setCheckProgress(checkIndex, t)
        if (t < 1) {
          const raf = requestAnimationFrame(tick)
          rafsRef.current.push(raf)
        }
      }
      const raf = requestAnimationFrame(tick)
      rafsRef.current.push(raf)
    },
    [setCheckProgress],
  )

  // Start the sequence on mount
  useEffect(() => {
    // If reduced motion or return visitor, skip to reveal
    if (prefersReducedMotion || hasSeenRitual) {
      // Check for ?ritual=1 override
      const forceRitual =
        typeof window !== 'undefined' &&
        new URL(window.location.href).searchParams.get('ritual') === '1'

      if (!forceRitual) {
        // Collapse all checks, show reveal directly
        for (let i = 0; i < GATEWAY_CHECKS.length; i++) {
          setCheckStatus(i, 'collapsed')
          setCheckProgress(i, 1)
        }
        addTimer(() => setPhase('revealing'), 300)
        return () => clearAllTimers()
      }
    }

    // Reset and start
    reset()
    addTimer(() => setPhase('arriving'), ARRIVAL_DELAY)

    return () => clearAllTimers()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Run once on mount
  }, [])

  // Phase-driven scheduling
  useEffect(() => {
    if (phase === 'arriving') {
      addTimer(() => setPhase('booting'), ARRIVAL_DURATION)
    }

    if (phase === 'booting') {
      const totalChecks = GATEWAY_CHECKS.length

      for (let i = 0; i < totalChecks; i++) {
        const startDelay = i * CHECK_STAGGER

        // Activate check
        addTimer(() => {
          setCheckStatus(i, 'active')
          animateProgress(i, CHECK_ACTIVE_DURATION)
        }, startDelay)

        // Complete check
        addTimer(() => {
          setCheckStatus(i, 'complete')
        }, startDelay + CHECK_ACTIVE_DURATION)

        // Collapse check
        addTimer(() => {
          setCheckStatus(i, 'collapsed')
        }, startDelay + CHECK_ACTIVE_DURATION + CHECK_COMPLETE_HOLD)
      }

      // After all checks: nominal flash then reveal
      const allDoneTime =
        (totalChecks - 1) * CHECK_STAGGER +
        CHECK_ACTIVE_DURATION +
        CHECK_COMPLETE_HOLD

      addTimer(() => {
        setNominalFlash(true)
      }, allDoneTime + NOMINAL_DELAY)

      addTimer(() => {
        setNominalFlash(false)
        setPhase('revealing')
      }, allDoneTime + NOMINAL_DELAY + NOMINAL_DURATION)
    }

    if (phase === 'revealing') {
      addTimer(() => setPhase('ambient'), 1500)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps -- Phase-driven
  }, [phase])

  // Cleanup on unmount
  useEffect(() => {
    return () => clearAllTimers()
  }, [clearAllTimers])
}
