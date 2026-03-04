/**
 * DetailPanel -- expanded district panel that appears alongside the capsule.
 *
 * Positioned offset to the left or right of the selected capsule
 * based on its ring quadrant. Contains district header, close button,
 * and DistrictContent (station cards).
 *
 * @module detail-panel
 * @see WS-2.1 Section 4.11
 */

'use client'

import { motion } from 'motion/react'

import { cn } from '@/lib/utils'
import type { DistrictId } from '@/lib/interfaces/district'
import { getDistrictById } from '@/lib/spatial-actions'
import {
  DETAIL_PANEL_DIMENSIONS,
  getPanelSide,
  computePanelPosition,
} from '@/lib/morph-types'
import {
  useDistrictExploreStore,
  exploreSelectors,
} from '@/stores/district-explore.store'
import { RING_CENTER } from './capsule-ring'
import { DistrictContent } from './district-content'

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface DetailPanelProps {
  districtId: DistrictId
  ringIndex: number
  onClose: () => void
  /** When true, the panel is promoted to a fixed viewport-centered overlay
   *  above the district view (used during entering-district / district phases). */
  promoted?: boolean
  /** Which side the dock is on, so we can offset the centering. */
  dockSide?: 'left' | 'right'
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function DetailPanel({
  districtId,
  ringIndex,
  onClose,
  promoted = false,
  dockSide = 'right',
}: DetailPanelProps) {
  const district = getDistrictById(districtId)
  const displayName = district?.displayName ?? districtId
  const isCompact = useDistrictExploreStore(exploreSelectors.isCenterCompact)
  const goBack = useDistrictExploreStore((s) => s.goBack)

  const side = getPanelSide(ringIndex)
  const position = computePanelPosition(ringIndex, RING_CENTER)
  const slideDirection = side === 'right' ? 40 : -40

  // Compact width when dock is expanded (detail mode)
  const COMPACT_WIDTH = 320
  const fullWidth = Math.min(DETAIL_PANEL_DIMENSIONS.width, 800)
  const panelWidth = promoted && isCompact ? COMPACT_WIDTH : fullWidth

  // When promoted: fixed, centered in the content area between
  // back button (~70px) and dock (360px), above the overlay (zIndex 33).
  // When compact: push to far left of the remaining space (clear the expanded dock).
  // Dock expands to ~60vw on the right, so available left space = ~40vw.
  // NOTE: No CSS `transform` here — Framer Motion controls `transform`
  // for its animations (scale, x), so a CSS transform would be overridden.
  const getPromotedLeft = () => {
    if (isCompact) {
      // Position snug against the expanded dock with a small gap.
      // Dock is min(60vw, 900px) wide. Card sits just to its left.
      return dockSide === 'right'
        ? `calc(100vw - min(60vw, 900px) - ${COMPACT_WIDTH + 24}px)`
        : `calc(min(60vw, 900px) + 24px)`
    }
    return dockSide === 'right'
      ? `calc((100vw - 360px) / 2 - ${panelWidth / 2 - 60}px)`
      : `calc(360px + (100vw - 360px) / 2 - ${panelWidth / 2 + 40}px)`
  }

  const promotedStyle: React.CSSProperties = promoted
    ? {
        position: 'fixed',
        top: 86,
        bottom: isCompact ? 'auto' : 86,
        left: getPromotedLeft(),
        height: 'auto',
        zIndex: 33,
        pointerEvents: 'auto',
        transition: 'left 0.5s cubic-bezier(0.22, 1, 0.36, 1), padding 0.3s ease',
      }
    : {
        position: 'absolute' as const,
        left: position.left,
        top: position.top,
        width: DETAIL_PANEL_DIMENSIONS.width,
        height: DETAIL_PANEL_DIMENSIONS.height,
        zIndex: 20,
        pointerEvents: 'auto',
      }

  return (
    <motion.div
      data-detail-panel
      onClick={(e) => e.stopPropagation()}
      className={cn(
        'rounded-[32px]',
        isCompact ? 'p-5' : 'p-10',
        // Glass material
        'bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]',
        'border border-white/[0.08]',
        // Ember glow
        'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_0_1px_0_rgba(var(--ember-rgb),0.3),0_0_24px_rgba(var(--ember-rgb),0.1)]',
      )}
      style={promotedStyle}
      initial={{ opacity: 0, x: promoted ? 0 : slideDirection, scale: 0.96, width: promoted ? fullWidth : DETAIL_PANEL_DIMENSIONS.width }}
      animate={{ opacity: 1, x: 0, scale: 1, width: promoted ? panelWidth : DETAIL_PANEL_DIMENSIONS.width }}
      exit={{
        opacity: 0,
        x: promoted ? 0 : slideDirection * 0.67,
        scale: 0.96,
        transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
      }}
      transition={{
        type: 'spring',
        stiffness: 140,
        damping: 22,
        mass: 1,
        width: { type: 'spring', stiffness: 200, damping: 26 },
      }}
    >
      <div className={cn('flex h-full flex-col overflow-hidden', isCompact ? 'gap-3' : 'gap-6')}>
        {/* Header — minimal when compact (title is in CompactIndicator) */}
        {isCompact ? (
          <div className="flex items-center justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation()
                goBack()
              }}
              className={cn(
                'flex h-7 items-center gap-1.5 rounded-full px-2.5',
                'bg-white/[0.04] hover:bg-white/[0.08]',
                'border border-white/[0.06] hover:border-white/[0.12]',
                'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
                'transition-all duration-200',
                'focus-visible:outline-2 focus-visible:outline-offset-2',
                'focus-visible:outline-[var(--color-ember-bright)]',
              )}
              aria-label={`Expand ${displayName} panel`}
            >
              {/* Expand icon (diagonal arrows outward) */}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M7 1h4v4M5 11H1V7M11 1L7 5M1 11l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-mono text-[9px] tracking-[0.06em] uppercase">Expand</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <h2 className="font-sans text-[32px] font-bold tracking-[0.02em] uppercase text-[var(--color-text-primary)] leading-[1.1]">
              {displayName}
            </h2>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full',
                'bg-white/[0.04] hover:bg-white/[0.08]',
                'border border-white/[0.06] hover:border-white/[0.12]',
                'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
                'transition-all duration-200',
                'focus-visible:outline-2 focus-visible:outline-offset-2',
                'focus-visible:outline-[var(--color-ember-bright)]',
              )}
              aria-label={`Close ${displayName} district`}
            >
              <svg width="16" height="16" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        )}

        {/* District content (station cards) */}
        <div className="flex flex-1 flex-col gap-4 overflow-auto">
          <DistrictContent districtId={districtId} />
        </div>
      </div>
    </motion.div>
  )
}
