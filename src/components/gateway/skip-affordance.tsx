/**
 * SkipAffordance -- "Press any key to skip" hint.
 *
 * Appears during the boot sequence (arriving/booting phases).
 * On mobile, shows "TAP TO SKIP" instead.
 *
 * @module skip-affordance
 */

'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

import { useGatewayStore, type GatewayPhase } from '@/stores/gateway.store'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isSkippable(phase: GatewayPhase): boolean {
  return phase === 'arriving' || phase === 'booting'
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SkipAffordance() {
  const phase = useGatewayStore((s) => s.phase)
  const [visible, setVisible] = useState(false)

  // Show after a short delay so it doesn't flash immediately
  useEffect(() => {
    if (!isSkippable(phase)) {
      setVisible(false)
      return
    }

    const timer = setTimeout(() => setVisible(true), 1500)
    return () => clearTimeout(timer)
  }, [phase])

  if (!visible) return null

  return (
    <motion.div
      className="fixed bottom-16 left-1/2 z-30 -translate-x-1/2 font-mono text-[9px] font-medium uppercase"
      style={{
        letterSpacing: '0.08em',
        color: 'rgba(var(--ambient-ink-rgb), 0.12)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      aria-hidden="true"
    >
      <span className="hidden sm:inline">Press any key to skip</span>
      <span className="sm:hidden">Tap to skip</span>
    </motion.div>
  )
}
