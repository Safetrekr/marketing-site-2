/**
 * DistrictViewDock -- glass panel with marketing district information.
 *
 * Now supports three content modes driven by the district explore store:
 * - default: Original marketing description + bullets + CTA
 * - tiles: Sub-item tile grid for the active showcase step
 * - detail: Expanded view with full detail for a selected sub-item
 *
 * Position mirrors based on `panelSide`: docks to the right for
 * right-opening districts, left for left-opening districts.
 *
 * @module district-view-dock
 */

'use client'

import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { DISTRICTS, type DistrictId } from '@/lib/interfaces/district'
import type { PanelSide } from '@/lib/morph-types'
import { DISTRICT_SHOWCASE_CONFIGS } from '@/lib/data/district-showcases'
import {
  useDistrictExploreStore,
  exploreSelectors,
} from '@/stores/district-explore.store'
import { DockTiles } from './dock-tiles'
import { DockDetail } from './dock-detail'

// ---------------------------------------------------------------------------
// Marketing district descriptions (default mode)
// ---------------------------------------------------------------------------

interface MarketingDockConfig {
  readonly description: string
  readonly bullets: readonly string[]
  readonly ctaLabel: string
  readonly ctaHref: string
  readonly isConversion?: boolean
}

const MARKETING_DOCK_CONFIG: Record<DistrictId, MarketingDockConfig> = {
  'how-it-works': {
    description: 'See how Safetrekr protects your people with real-time tracking and automated safety workflows.',
    bullets: ['Real-time tracking', 'Automated check-ins', 'Emergency response'],
    ctaLabel: 'Read More',
    ctaHref: '/how-it-works',
  },
  'who-its-for': {
    description: 'Built for the people accountable when the group travels — schools, churches, youth sports, and businesses.',
    bullets: ['Trip leaders', 'Safety officers', 'Administrators'],
    ctaLabel: 'Read More',
    ctaHref: '/solutions',
  },
  'platform': {
    description: 'Satellite and cellular hybrid connectivity with a real-time dashboard and reporting engine.',
    bullets: ['Hybrid connectivity', 'Real-time dashboard', 'API integrations'],
    ctaLabel: 'Read More',
    ctaHref: '/platform',
  },
  'security': {
    description: 'Enterprise-grade data protection with SOC 2 Type II certification and end-to-end encryption.',
    bullets: ['SOC 2 Type II', 'E2E encryption', 'Audit logging'],
    ctaLabel: 'Read More',
    ctaHref: '/security',
  },
  'pricing': {
    description: 'Transparent per-seat pricing with a free tier for small teams and enterprise custom plans.',
    bullets: ['Free tier', 'Volume discounts', 'Enterprise plans'],
    ctaLabel: 'Read More',
    ctaHref: '/pricing',
  },
  'get-started': {
    description: 'Start protecting your team today with a 15-minute onboarding walkthrough and free trial.',
    bullets: ['Free trial', 'Onboarding specialist', '15-min walkthrough'],
    ctaLabel: 'Request a Sample Trip Package',
    ctaHref: '/contact',
    isConversion: true,
  },
  'about-us': {
    description: 'Built by safety professionals with real-world field operations experience.',
    bullets: ['US-based team', 'Safety credentials', 'Field-tested'],
    ctaLabel: 'Read More',
    ctaHref: '/about',
  },
}

// ---------------------------------------------------------------------------
// Default Dock Content
// ---------------------------------------------------------------------------

function DefaultDockContent({ districtId }: { districtId: DistrictId }) {
  const district = DISTRICTS.find((d) => d.id === districtId)
  const displayName = district?.displayName ?? districtId
  const config = MARKETING_DOCK_CONFIG[districtId]

  return (
    <div className="flex flex-col gap-0 px-6 pt-8 pb-8">
      {/* District name */}
      <span
        className="block font-mono text-[18px] font-medium tracking-[0.08em] uppercase"
        style={{ color: 'rgba(var(--ambient-ink-rgb), 0.3)' }}
      >
        {displayName}
      </span>

      {/* Description */}
      <p
        className="mt-4 font-mono text-[11px] leading-[1.5]"
        style={{ color: 'rgba(var(--ambient-ink-rgb), 0.25)' }}
      >
        {config.description}
      </p>

      {/* CTA link */}
      <Link
        href={config.ctaHref}
        className={cn(
          'mt-5 block w-full rounded-md py-2 text-center',
          'border border-white/[0.06]',
          'bg-white/[0.04]',
          'font-mono text-[9px] font-medium tracking-[0.1em] uppercase',
          'transition-all duration-200',
          'hover:border-white/[0.12] hover:bg-white/[0.06]',
          'focus-visible:outline-2 focus-visible:outline-offset-2',
          'focus-visible:outline-[var(--color-ember-bright)]',
        )}
        style={{
          color: config.isConversion
            ? '#F59E0B'
            : 'rgba(var(--ambient-ink-rgb), 0.35)',
          pointerEvents: 'auto',
        }}
      >
        {config.ctaLabel}
      </Link>

      {/* Separator */}
      <div
        className="my-5"
        style={{
          height: 1,
          backgroundColor: 'rgba(var(--ambient-ink-rgb), 0.04)',
        }}
      />

      {/* Status section */}
      <div className="flex flex-col gap-2">
        <span
          className="block font-mono text-[9px] font-medium tracking-[0.1em] uppercase"
          style={{ color: 'rgba(var(--ambient-ink-rgb), 0.15)' }}
        >
          STATUS
        </span>
        <div className="flex items-center gap-2">
          <div
            className="district-health-dot-pulse"
            style={{
              width: 4,
              height: 4,
              borderRadius: '50%',
              backgroundColor: config.isConversion
                ? '#F59E0B'
                : 'var(--color-healthy, #22c55e)',
              flexShrink: 0,
            }}
          />
          <span
            className="font-mono text-[11px]"
            style={{ color: 'rgba(var(--ambient-ink-rgb), 0.25)' }}
          >
            Operational
          </span>
        </div>
      </div>

      {/* Separator */}
      <div
        className="my-5"
        style={{
          height: 1,
          backgroundColor: 'rgba(var(--ambient-ink-rgb), 0.04)',
        }}
      />

      {/* Highlights list */}
      <div className="flex flex-col gap-3">
        <span
          className="block font-mono text-[9px] font-medium tracking-[0.1em] uppercase"
          style={{ color: 'rgba(var(--ambient-ink-rgb), 0.15)' }}
        >
          HIGHLIGHTS
        </span>
        <div className="flex flex-wrap gap-2">
          {config.bullets.map((bullet) => (
            <span
              key={bullet}
              className={cn(
                'rounded-md px-2.5 py-1',
                'border border-white/[0.06]',
                'bg-white/[0.02]',
                'font-mono text-[9px] tracking-[0.08em] uppercase',
              )}
              style={{ color: 'rgba(var(--ambient-ink-rgb), 0.2)' }}
            >
              {bullet}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface DistrictViewDockProps {
  readonly districtId: DistrictId
  readonly panelSide: PanelSide
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function DistrictViewDock({ districtId, panelSide }: DistrictViewDockProps) {
  const mode = useDistrictExploreStore((s) => s.mode)
  const activeStepIndex = useDistrictExploreStore((s) => s.activeStepIndex)
  const selectedSubItemId = useDistrictExploreStore((s) => s.selectedSubItemId)
  const isDockExpanded = useDistrictExploreStore(exploreSelectors.isDockExpanded)
  const isDockActive = useDistrictExploreStore(exploreSelectors.isDockActive)

  const selectSubItem = useDistrictExploreStore((s) => s.selectSubItem)
  const goBack = useDistrictExploreStore((s) => s.goBack)

  const showcaseConfig = DISTRICT_SHOWCASE_CONFIGS[districtId]
  const activeStep = showcaseConfig.steps[activeStepIndex]

  const isRight = panelSide === 'right'
  const slideFrom = isRight ? 40 : -40

  // Dock width: 360px default, ~60vw when expanded
  const dockWidth = isDockExpanded ? 'min(60vw, 900px)' : '360px'

  return (
    <motion.div
      className={cn(
        'fixed top-[42px] bottom-0',
        isRight ? 'right-0 border-l' : 'left-0 border-r',
        'border-white/[0.06]',
        'backdrop-blur-[16px] backdrop-saturate-[130%]',
        'overflow-y-auto',
      )}
      style={{
        background: 'rgba(var(--ambient-ink-rgb), 0.04)',
        zIndex: 31,
        pointerEvents: 'auto',
      }}
      initial={{ x: slideFrom, opacity: 0, width: '360px' }}
      animate={{ x: 0, opacity: 1, width: dockWidth }}
      exit={{ x: slideFrom, opacity: 0 }}
      transition={{
        x: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
        opacity: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
        width: { type: 'spring', stiffness: 200, damping: 26 },
      }}
    >
      {/* Back button (shown in tiles and detail modes) */}
      {isDockActive && (
        <motion.button
          className="dock-back-button"
          onClick={goBack}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.2 }}
          aria-label={mode === 'detail' ? 'Back to tiles' : 'Back to step view'}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M9 3L5 7L9 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-mono text-[9px] tracking-[0.08em] uppercase">
            {mode === 'detail' ? 'All Items' : 'Overview'}
          </span>
        </motion.button>
      )}

      <AnimatePresence mode="wait">
        {mode === 'detail' && activeStep && selectedSubItemId ? (
          /* Detail mode: full sub-item content */
          <DockDetail
            key="detail"
            subItem={activeStep.subItems.find((s) => s.id === selectedSubItemId) ?? activeStep.subItems[0]}
            allSubItems={activeStep.subItems}
            onSelectSubItem={selectSubItem}
          />
        ) : isDockActive && activeStep ? (
          /* Tiles mode: grid of sub-item tiles */
          <DockTiles
            key="tiles"
            subItems={activeStep.subItems}
            activeSubItemId={selectedSubItemId}
            onSelect={selectSubItem}
            stepLabel={activeStep.label}
          />
        ) : (
          /* Default mode: marketing description */
          <DefaultDockContent key="default" districtId={districtId} />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
