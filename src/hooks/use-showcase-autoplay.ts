/**
 * useShowcaseAutoplay — auto-advances through showcase steps with timing.
 *
 * Each step holds for the typewriter duration + a pause, then advances.
 * After the last step, waits 1s and resets to overview mode.
 *
 * @module use-showcase-autoplay
 */

'use client'

import { useEffect, useRef } from 'react'
import { useDistrictExploreStore } from '@/stores/district-explore.store'

interface UseShowcaseAutoplayOptions {
  /** Total number of steps in the showcase. */
  stepCount: number
  /** Pause duration (ms) after typewriter completes before advancing. Default 1000. */
  pauseAfterStep?: number
  /** Pause duration (ms) after the last step before resetting to overview. Default 1000. */
  pauseAfterComplete?: number
}

export function useShowcaseAutoplay({
  stepCount,
  pauseAfterStep = 1000,
  pauseAfterComplete = 1000,
}: UseShowcaseAutoplayOptions) {
  const mode = useDistrictExploreStore((s) => s.mode)
  const autoplayStepIndex = useDistrictExploreStore((s) => s.autoplayStepIndex)
  const typewriterComplete = useDistrictExploreStore((s) => s.typewriterComplete)
  const advanceAutoplay = useDistrictExploreStore((s) => s.advanceAutoplay)
  const setMode = useDistrictExploreStore((s) => s.setMode)

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  // Advance or complete when typewriter finishes during autoplay
  useEffect(() => {
    if (mode !== 'autoplay' || !typewriterComplete) return

    const isLastStep = autoplayStepIndex >= stepCount - 1

    timerRef.current = setTimeout(
      () => {
        if (isLastStep) {
          // All steps played — reset to overview
          setMode('overview')
        } else {
          advanceAutoplay()
        }
      },
      isLastStep ? pauseAfterComplete : pauseAfterStep,
    )

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [
    mode,
    typewriterComplete,
    autoplayStepIndex,
    stepCount,
    pauseAfterStep,
    pauseAfterComplete,
    advanceAutoplay,
    setMode,
  ])
}
