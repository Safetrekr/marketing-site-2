/**
 * ShowcaseShell — layout orchestrator for the district showcase system.
 *
 * Reads the explore store and renders the appropriate view:
 * - Autoplay / step-focus: full step bar + step card with typewriter
 * - Overview: all steps highlighted, click to focus
 * - Detail mode: compact indicator (center card shrinks)
 *
 * @module showcase/showcase-shell
 */

'use client'

import { useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import type { DistrictShowcaseConfig } from '@/lib/interfaces/district-showcase'
import {
  useDistrictExploreStore,
  exploreSelectors,
} from '@/stores/district-explore.store'
import { useShowcaseAutoplay } from '@/hooks/use-showcase-autoplay'
import { StepBar } from './step-bar'
import { StepCard } from './step-card'
import { CompactIndicator } from './compact-indicator'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CONTENT_EASE = [0.4, 0, 0.2, 1] as const

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface ShowcaseShellProps {
  readonly config: DistrictShowcaseConfig
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ShowcaseShell({ config }: ShowcaseShellProps) {
  const mode = useDistrictExploreStore((s) => s.mode)
  const activeStepIndex = useDistrictExploreStore((s) => s.activeStepIndex)
  const typewriterComplete = useDistrictExploreStore((s) => s.typewriterComplete)
  const isCompact = useDistrictExploreStore(exploreSelectors.isCenterCompact)

  const focusStep = useDistrictExploreStore((s) => s.focusStep)
  const completeTypewriter = useDistrictExploreStore((s) => s.completeTypewriter)
  const enterTiles = useDistrictExploreStore((s) => s.enterTiles)
  const goBack = useDistrictExploreStore((s) => s.goBack)

  // Autoplay driver
  useShowcaseAutoplay({ stepCount: config.steps.length })

  // Keyboard: Escape to go back, arrow keys for steps
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        goBack()
        return
      }
      if (mode === 'overview' || mode === 'step-focus') {
        if (e.key === 'ArrowRight') {
          e.preventDefault()
          const next = Math.min(activeStepIndex + 1, config.steps.length - 1)
          focusStep(next)
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault()
          const prev = Math.max(activeStepIndex - 1, 0)
          focusStep(prev)
        }
      }
    },
    [mode, activeStepIndex, config.steps.length, focusStep, goBack],
  )

  // Reset store when config changes (different district)
  const reset = useDistrictExploreStore((s) => s.reset)
  useEffect(() => {
    reset()
  }, [config.districtId, reset])

  const activeStep = config.steps[activeStepIndex]
  const isAutoplay = mode === 'autoplay'
  const isOverview = mode === 'overview'

  return (
    <div
      className="showcase-shell"
      onKeyDown={handleKeyDown}
      role="region"
      aria-label={`${config.title} showcase`}
    >
      <AnimatePresence mode="wait">
        {isCompact ? (
          /* Compact mode: minimal indicator when dock is expanded */
          <CompactIndicator
            key="compact"
            title={config.title}
            steps={config.steps}
            activeIndex={activeStepIndex}
            onExpand={goBack}
          />
        ) : (
          /* Full showcase view */
          <motion.div
            key="full"
            className="showcase-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: CONTENT_EASE }}
          >
            {/* District title */}
            <motion.span
              className="showcase-district-label"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.3, ease: CONTENT_EASE }}
            >
              {config.title}
            </motion.span>

            {/* Step bar */}
            <StepBar
              steps={config.steps}
              activeIndex={activeStepIndex}
              isAutoplay={isAutoplay}
              overviewGlow={isOverview}
              onStepClick={focusStep}
            />

            {/* Step cards — accumulate during autoplay, persist in overview/step-focus */}
            {(isAutoplay || isOverview || mode === 'step-focus' || mode === 'tiles') && (
              <div className="showcase-step-stack">
                {config.steps
                  .slice(0, isAutoplay ? activeStepIndex + 1 : config.steps.length)
                  .map((step, i) => {
                    const isTyping = isAutoplay && i === activeStepIndex
                    const isHighlighted = mode === 'step-focus' && i === activeStepIndex
                    return (
                      <StepCard
                        key={step.id}
                        step={step}
                        completed={!isTyping}
                        highlighted={isHighlighted}
                        enableTypewriter={isTyping}
                        onTypewriterComplete={isTyping ? completeTypewriter : undefined}
                        onLearnMore={() => {
                          focusStep(i)
                          enterTiles()
                        }}
                        showLearnMore={
                          isTyping
                            ? typewriterComplete && step.subItems.length > 0
                            : false
                        }
                      />
                    )
                  })}
              </div>
            )}

            {/* Bottom CTA */}
            <motion.div
              className="showcase-cta-area"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3, ease: CONTENT_EASE }}
            >
              <Link
                href={config.ctaHref}
                className="showcase-cta"
              >
                {config.ctaLabel}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen reader live region */}
      <div aria-live="polite" className="sr-only">
        {mode === 'step-focus' && activeStep &&
          `Step ${activeStep.number}: ${activeStep.label}`}
        {mode === 'tiles' && activeStep &&
          `Exploring ${activeStep.label}. ${activeStep.subItems.length} items available.`}
        {mode === 'overview' && 'All steps visible. Select a step to explore.'}
      </div>
    </div>
  )
}
