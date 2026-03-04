/**
 * IdleNudge -- world-space prompt that appears after 5s of no interaction.
 *
 * Renders "STATION ONLINE // SELECT A MODULE TO BEGIN" below the capsule
 * ring as ghost monospace text. Fades after first interaction (click,
 * scroll, or pan).
 *
 * @module idle-nudge
 */

'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

import { useCameraStore } from '@/stores/camera.store'
import { useUIStore } from '@/stores/ui.store'
import { CAPSULE_RING_CONTAINER_SIZE } from '@/lib/constants'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function IdleNudge() {
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dismissed = useRef(false)

  // Show after 5s idle
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      if (!dismissed.current) setVisible(true)
    }, 5000)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  // Dismiss on any interaction: zoom change, morph start, or click
  useEffect(() => {
    if (dismissed.current) return

    const initialZoom = useCameraStore.getState().zoom

    const unsubCamera = useCameraStore.subscribe((state) => {
      if (
        Math.abs(state.zoom - initialZoom) > 0.02 ||
        state.isPanning
      ) {
        dismissed.current = true
        setVisible(false)
      }
    })

    const unsubUI = useUIStore.subscribe((state) => {
      if (state.morph.phase !== 'idle') {
        dismissed.current = true
        setVisible(false)
      }
    })

    return () => {
      unsubCamera()
      unsubUI()
    }
  }, [])

  const cy = CAPSULE_RING_CONTAINER_SIZE / 2

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-none absolute flex justify-center"
          style={{
            left: 0,
            top: cy + 430,
            width: CAPSULE_RING_CONTAINER_SIZE,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span
            className="font-mono text-[10px] tracking-[0.16em] uppercase"
            style={{ color: 'rgba(var(--ambient-ink-rgb), 0.18)' }}
          >
            STATION ONLINE // SELECT A MODULE TO BEGIN
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
