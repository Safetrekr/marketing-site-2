/**
 * ScrollHint -- viewport-fixed scroll-to-zoom affordance.
 *
 * Shows a small mouse icon + "SCROLL TO EXPLORE" text at bottom-center
 * of the viewport. Appears 2s after entrance completes, fades out after
 * 6s OR on first scroll/zoom. Persisted via localStorage so it only
 * shows once per device.
 *
 * @module scroll-hint
 */

'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

import { useCameraStore } from '@/stores/camera.store'

// ---------------------------------------------------------------------------
// Persistence
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'safetrekr-scroll-hint-seen'

function hasSeenHint(): boolean {
  if (typeof window === 'undefined') return true
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function markHintSeen(): void {
  try {
    localStorage.setItem(STORAGE_KEY, '1')
  } catch {
    // localStorage may be unavailable
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ScrollHint() {
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Show after 2s delay, hide after 6s or on zoom
  useEffect(() => {
    if (hasSeenHint()) return

    // Appear after 2s
    timerRef.current = setTimeout(() => {
      setVisible(true)

      // Auto-hide after 6s
      timerRef.current = setTimeout(() => {
        setVisible(false)
        markHintSeen()
      }, 6000)
    }, 2000)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  // Dismiss on any zoom change
  useEffect(() => {
    if (!visible) return

    const initialZoom = useCameraStore.getState().zoom
    const unsubscribe = useCameraStore.subscribe((state) => {
      if (Math.abs(state.zoom - initialZoom) > 0.02) {
        setVisible(false)
        markHintSeen()
      }
    })

    return unsubscribe
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-none fixed bottom-8 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
        >
          {/* Mouse icon */}
          <svg
            width="20"
            height="28"
            viewBox="0 0 20 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity: 0.5 }}
          >
            {/* Mouse body */}
            <rect
              x="1"
              y="1"
              width="18"
              height="26"
              rx="9"
              stroke="currentColor"
              strokeWidth="1"
              className="text-[var(--color-text-secondary)]"
            />
            {/* Scroll wheel indicator (animated line) */}
            <motion.line
              x1="10"
              y1="7"
              x2="10"
              y2="12"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              className="text-[var(--color-ember)]"
              animate={{ y1: [7, 10, 7], y2: [12, 15, 12] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>

          <span
            className="font-mono text-[9px] tracking-[0.14em] uppercase"
            style={{ color: 'rgba(var(--ambient-ink-rgb), 0.35)' }}
          >
            SCROLL TO EXPLORE
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
