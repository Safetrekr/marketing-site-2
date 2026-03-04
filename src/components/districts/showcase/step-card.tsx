/**
 * StepCard — typewriter text reveal + "Learn More" button for active step.
 *
 * Shows the step summary with character-by-character typing animation,
 * a blinking cursor, and a glass-morphism "Explore this step" button
 * that appears after the typewriter completes.
 *
 * @module showcase/step-card
 */

'use client'

import { motion, AnimatePresence } from 'motion/react'
import type { ShowcaseStep } from '@/lib/interfaces/district-showcase'
import { useTypewriter } from '@/hooks/use-typewriter'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CONTENT_EASE = [0.4, 0, 0.2, 1] as const

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface StepCardProps {
  readonly step: ShowcaseStep
  /** Whether the typewriter should run. */
  readonly enableTypewriter?: boolean
  /** Called when typewriter finishes. */
  readonly onTypewriterComplete?: () => void
  /** Called when "Learn More" is clicked. */
  readonly onLearnMore?: () => void
  /** Whether the learn more button should be visible. */
  readonly showLearnMore?: boolean
  /** Whether this step is already completed (skip typewriter, show full text + Learn More). */
  readonly completed?: boolean
  /** Whether this step's "Explore" button is highlighted (user selected this step). */
  readonly highlighted?: boolean
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function StepCard({
  step,
  enableTypewriter = true,
  onTypewriterComplete,
  onLearnMore,
  showLearnMore = false,
  completed = false,
  highlighted = false,
}: StepCardProps) {
  const { displayText, isTyping } = useTypewriter({
    text: step.summary,
    speed: 28,
    enabled: enableTypewriter && !completed,
    onComplete: onTypewriterComplete,
  })

  const text = completed ? step.summary : displayText
  const showCursor = !completed && isTyping
  const shouldShowLearnMore = completed
    ? step.subItems.length > 0
    : showLearnMore

  return (
    <div className="showcase-step-card" data-completed={completed || undefined} data-highlighted={highlighted || undefined}>
      {/* Step heading */}
      <motion.h3
        className="showcase-step-heading"
        initial={completed ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: CONTENT_EASE }}
      >
        {step.label}
      </motion.h3>

      {/* Typewriter text (or full text for completed steps) */}
      <div className="showcase-typewriter">
        <span className="showcase-typewriter-text">
          {text}
        </span>
        {showCursor && (
          <span className="showcase-typewriter-cursor" aria-hidden="true">
            _
          </span>
        )}
      </div>

      {/* Screen reader: full text immediately */}
      <span className="sr-only">{step.summary}</span>

      {/* Learn More button */}
      <AnimatePresence>
        {shouldShowLearnMore && (
          <motion.button
            className="showcase-learn-more"
            data-highlighted={highlighted || undefined}
            onClick={onLearnMore}
            initial={completed ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.25, ease: CONTENT_EASE }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="shrink-0"
              aria-hidden="true"
            >
              <path
                d="M4 2L8 6L4 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="showcase-learn-more-label">Explore this step</span>
            <span className="showcase-learn-more-count">
              {step.subItems.length} items
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
