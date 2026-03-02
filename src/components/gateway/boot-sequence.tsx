/**
 * BootSequence -- system checks container.
 *
 * Renders active/complete checks via AnimatePresence.
 * Waiting and collapsed checks are filtered from the render list.
 *
 * @module boot-sequence
 */

'use client'

import { AnimatePresence, motion } from 'motion/react'

import { useGatewayStore } from '@/stores/gateway.store'
import { SystemCheck } from './system-check'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function BootSequence() {
  const phase = useGatewayStore((s) => s.phase)
  const checks = useGatewayStore((s) => s.checks)
  // Only show during booting phase
  if (phase !== 'booting' && phase !== 'arriving') return null

  const visibleChecks = checks.filter(
    (c) => c.status === 'active' || c.status === 'complete',
  )

  return (
    <div className="flex flex-col items-center gap-8">
      {/* System checks */}
      <motion.div
        className="grid grid-cols-1 gap-x-12 gap-y-3 sm:grid-cols-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <AnimatePresence mode="popLayout">
          {visibleChecks.map((check) => (
            <SystemCheck key={check.id} check={check} />
          ))}
        </AnimatePresence>
      </motion.div>

    </div>
  )
}
