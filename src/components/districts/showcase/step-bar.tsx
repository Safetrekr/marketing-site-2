/**
 * StepBar — horizontal step nodes with animated connector line.
 *
 * Renders a row of numbered nodes connected by a line. Active node
 * is enlarged with a green glow. Supports compact mode (no labels).
 *
 * @module showcase/step-bar
 */

'use client'

import { motion } from 'motion/react'
import type { ShowcaseStep } from '@/lib/interfaces/district-showcase'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const NODE_SIZE_INACTIVE = 28
const NODE_SIZE_ACTIVE = 36
const NODE_SIZE_COMPACT_INACTIVE = 14
const NODE_SIZE_COMPACT_ACTIVE = 18

const SPRING = { stiffness: 300, damping: 28, mass: 0.6 }

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface StepBarProps {
  readonly steps: readonly ShowcaseStep[]
  readonly activeIndex: number
  /** Whether the bar is in compact mode (detail view). */
  readonly compact?: boolean
  /** Whether autoplay is active (dims interactivity hints). */
  readonly isAutoplay?: boolean
  /** Called when user clicks a step node. */
  readonly onStepClick?: (index: number) => void
  /** Whether all nodes should glow (overview state). */
  readonly overviewGlow?: boolean
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function StepBar({
  steps,
  activeIndex,
  compact = false,
  isAutoplay = false,
  onStepClick,
  overviewGlow = false,
}: StepBarProps) {
  return (
    <div
      className="showcase-step-bar"
      data-compact={compact || undefined}
      role="tablist"
      aria-label="Showcase steps"
    >
      {/* Connector line (background) */}
      <div className="showcase-step-connector" aria-hidden="true">
        {/* Progress fill */}
        <motion.div
          className="showcase-step-connector-fill"
          animate={{
            scaleX: steps.length > 1 ? activeIndex / (steps.length - 1) : 0,
          }}
          transition={{ type: 'spring', ...SPRING }}
          style={{ transformOrigin: '0 0' }}
        />
      </div>

      {/* Step nodes */}
      {steps.map((step, i) => {
        const isActive = i === activeIndex
        const isPast = i < activeIndex
        const size = compact
          ? (isActive ? NODE_SIZE_COMPACT_ACTIVE : NODE_SIZE_COMPACT_INACTIVE)
          : (isActive ? NODE_SIZE_ACTIVE : NODE_SIZE_INACTIVE)

        // In compact mode, render non-interactive indicators (avoids nested buttons)
        if (compact) {
          return (
            <div
              key={step.id}
              className="showcase-step-node"
              data-active={isActive || undefined}
              data-past={isPast || undefined}
              aria-hidden="true"
            >
              <motion.div
                className="showcase-step-dot"
                animate={{ width: size, height: size }}
                transition={{ type: 'spring', ...SPRING }}
              >
                <span className="showcase-step-number">{step.number}</span>
              </motion.div>
            </div>
          )
        }

        return (
          <button
            key={step.id}
            className="showcase-step-node"
            data-active={isActive || undefined}
            data-past={isPast || undefined}
            data-glow={overviewGlow || undefined}
            role="tab"
            aria-selected={isActive}
            aria-label={`Step ${step.number}: ${step.label}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onStepClick?.(i)}
            disabled={isAutoplay}
          >
            <motion.div
              className="showcase-step-dot"
              animate={{ width: size, height: size }}
              transition={{ type: 'spring', ...SPRING }}
            >
              <span className="showcase-step-number">{step.number}</span>
            </motion.div>

            <motion.span
              className="showcase-step-label"
              data-active={isActive || undefined}
              initial={false}
              animate={{ opacity: isActive ? 1 : 0.4 }}
              transition={{ duration: 0.2 }}
            >
              {step.label}
            </motion.span>
          </button>
        )
      })}
    </div>
  )
}
