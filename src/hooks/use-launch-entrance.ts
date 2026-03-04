/**
 * Launch entrance choreography hook.
 *
 * Orchestrates a ~6s cinematic boot sequence: camera flies from Z0 (0.15)
 * to Z1 (0.7) with a slow spring while UI layers stagger in via CSS
 * animations gated by `[data-entrance]` on the page wrapper.
 *
 * Follows the same timer-based phase scheduling pattern as
 * `use-gateway-choreography.ts`.
 *
 * @module use-launch-entrance
 */

'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

import { useCameraStore } from '@/stores/camera.store'
import { ZOOM_DEFAULT, ZOOM_ENTRANCE_START, ENTRANCE_SPRING_CONFIG } from '@/lib/constants'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type LaunchEntrancePhase =
  | 'idle'        // Not yet started (SSR / pre-hydration)
  | 'booting'     // 0–400ms: void visible, dot grid reveal
  | 'flying'      // 400–~1600ms: camera animating Z0→Z1
  | 'populating'  // ~1600–2800ms: capsules staggering in
  | 'enriching'   // 2800–3600ms: enrichment layers fading in
  | 'revealing'   // 3600–5600ms: HUD instruments appearing
  | 'ready'       // 5600ms+: fully interactive

export interface LaunchEntranceResult {
  phase: LaunchEntrancePhase
  /** True when the entrance has completed or was skipped. */
  isReady: boolean
  /** True when the entrance was entirely skipped (no animation). */
  wasSkipped: boolean
}

// ---------------------------------------------------------------------------
// Session storage key
// ---------------------------------------------------------------------------

const SESSION_KEY = 'safetrekr-launch-seen'

// ---------------------------------------------------------------------------
// Skip conditions
// ---------------------------------------------------------------------------

function shouldSkipEntrance(): boolean {
  if (typeof window === 'undefined') return true

  const url = new URL(window.location.href)
  if (url.searchParams.get('district')) return true

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true

  try {
    if (sessionStorage.getItem(SESSION_KEY) === '1') return true
  } catch {
    // sessionStorage may be unavailable
  }

  return false
}

/** Check if the URL has a district param (used to detect skip before effects). */
function _hasDistrictParam(): boolean {
  if (typeof window === 'undefined') return false
  return new URL(window.location.href).searchParams.has('district')
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useLaunchEntrance(): LaunchEntranceResult {
  const phaseRef = useRef<LaunchEntrancePhase>('idle')
  const wasSkippedRef = useRef(false)
  const [renderCount, forceRender] = useState(0)

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const rafsRef = useRef<number[]>([])
  const unsubsRef = useRef<Array<() => void>>([])

  const setPhase = useCallback((next: LaunchEntrancePhase) => {
    phaseRef.current = next
    forceRender((n) => n + 1)
  }, [])

  const clearAllTimers = useCallback(() => {
    for (const t of timersRef.current) clearTimeout(t)
    for (const r of rafsRef.current) cancelAnimationFrame(r)
    for (const u of unsubsRef.current) u()
    timersRef.current = []
    rafsRef.current = []
    unsubsRef.current = []
  }, [])

  const addTimer = useCallback((fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms)
    timersRef.current.push(t)
    return t
  }, [])

  // --- Hydration gate -------------------------------------------------------
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // --- Camera initialization (before paint) ---------------------------------
  useLayoutEffect(() => {
    if (!isHydrated) return
    if (shouldSkipEntrance()) {
      wasSkippedRef.current = true
      phaseRef.current = 'ready'
      forceRender((n) => n + 1)
      return
    }

    // Set camera to Z0 before the browser paints
    useCameraStore.getState().setCamera({
      zoom: ZOOM_ENTRANCE_START,
      semanticLevel: 'Z0',
    })

    phaseRef.current = 'booting'
    forceRender((n) => n + 1)
  }, [isHydrated])

  // --- Start the camera fly-in ----------------------------------------------
  const startFlyIn = useCallback(() => {
    const { viewportWidth, viewportHeight, flyTo } = useCameraStore.getState()

    if (viewportWidth === 0 || viewportHeight === 0) {
      // Viewport not measured yet — retry next frame
      const raf = requestAnimationFrame(() => startFlyIn())
      rafsRef.current.push(raf)
      return
    }

    const targetOffsetX = viewportWidth / 2
    const targetOffsetY = viewportHeight / 2
    flyTo(targetOffsetX, targetOffsetY, ZOOM_DEFAULT, ENTRANCE_SPRING_CONFIG)
  }, [])

  // --- Phase-driven scheduling ----------------------------------------------
  useEffect(() => {
    const phase = phaseRef.current

    if (phase === 'booting') {
      // After 400ms: start camera fly-in
      addTimer(() => {
        startFlyIn()
        setPhase('flying')
      }, 400)
    }

    if (phase === 'flying') {
      // Hybrid: subscribe to camera store for Z0→Z1 transition
      const unsubscribe = useCameraStore.subscribe((state) => {
        if (state.semanticLevel === 'Z1' && phaseRef.current === 'flying') {
          setPhase('populating')
          unsubscribe()
        }
      })
      unsubsRef.current.push(unsubscribe)

      // Failsafe timer (in case spring is slower than expected)
      addTimer(() => {
        if (phaseRef.current === 'flying') {
          setPhase('populating')
        }
      }, 2400)
    }

    if (phase === 'populating') {
      // 6 capsules x 200ms stagger = ~1200ms
      addTimer(() => setPhase('enriching'), 1200)
    }

    if (phase === 'enriching') {
      addTimer(() => setPhase('revealing'), 800)
    }

    if (phase === 'revealing') {
      addTimer(() => {
        setPhase('ready')
        try {
          sessionStorage.setItem(SESSION_KEY, '1')
        } catch {
          // sessionStorage may be unavailable
        }
      }, 2000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Phase-driven scheduling
  }, [renderCount])

  // --- User interruption: skip to ready on pan/zoom -------------------------
  useEffect(() => {
    if (phaseRef.current === 'ready' || phaseRef.current === 'idle') return

    let prevZoom = useCameraStore.getState().zoom

    const unsubscribe = useCameraStore.subscribe((state) => {
      if (phaseRef.current === 'ready' || phaseRef.current === 'idle') return

      const userPanned = state.isPanning
      const userZoomed =
        Math.abs(state.zoom - prevZoom) > 0.01 && !state.isAnimating

      prevZoom = state.zoom

      if (userPanned || userZoomed) {
        clearAllTimers()
        setPhase('ready')
        try {
          sessionStorage.setItem(SESSION_KEY, '1')
        } catch {
          // sessionStorage may be unavailable
        }
      }
    })
    unsubsRef.current.push(unsubscribe)

    return unsubscribe
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Re-subscribe when phase changes
  }, [renderCount])

  // --- Cleanup on unmount ---------------------------------------------------
  useEffect(() => {
    return () => clearAllTimers()
  }, [clearAllTimers])

  return {
    phase: phaseRef.current,
    isReady: phaseRef.current === 'ready',
    wasSkipped: wasSkippedRef.current,
  }
}
