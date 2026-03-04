/**
 * CompactIndicator — minimal center card shown when dock is expanded.
 *
 * Shows district title + compact step bar + active step label.
 * Clicking it collapses the dock back to tiles mode.
 *
 * @module showcase/compact-indicator
 */

'use client'

import { motion } from 'motion/react'
import type { ShowcaseStep } from '@/lib/interfaces/district-showcase'
import { StepBar } from './step-bar'

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface CompactIndicatorProps {
  readonly title: string
  readonly steps: readonly ShowcaseStep[]
  readonly activeIndex: number
  readonly onExpand: () => void
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function CompactIndicator({
  title,
  steps,
  activeIndex,
  onExpand,
}: CompactIndicatorProps) {
  return (
    <motion.div
      className="showcase-compact"
      onClick={onExpand}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onExpand()
        }
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28, mass: 0.6 }}
      aria-label={`Expand ${title} showcase. Currently on step ${activeIndex + 1} of ${steps.length}`}
    >
      <span className="showcase-compact-title">{title}</span>
      <div className="showcase-compact-bar">
        <StepBar
          steps={steps}
          activeIndex={activeIndex}
          compact
        />
        <span className="showcase-compact-indicator">
          Step {activeIndex + 1}/{steps.length}
        </span>
      </div>
    </motion.div>
  )
}
