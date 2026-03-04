/**
 * DistrictCapsule -- mission-briefing glass card for a district in the capsule ring.
 *
 * 208x260px card at default zoom. Three cards (How It Works, Platform, Security)
 * grow to 280x360px at Z3 and reveal expanded content (Evidence Ledger pattern).
 *
 * @module district-capsule
 * @see Phase 2 Card Redesign
 * @see Phase 3 Zoom-Responsive Progressive Disclosure
 */

'use client'

import { forwardRef, useCallback, useMemo, type KeyboardEvent } from 'react'
import { motion } from 'motion/react'

import { cn } from '@/lib/utils'
import type { CapsuleData, DistrictId } from '@/lib/interfaces/district'
import { CAPSULE_CARD_CONFIG } from '@/lib/interfaces/district'
import { capsuleStateVariants } from '@/hooks/use-morph-variants'
import { useEnrichmentStore } from '@/stores/enrichment.store'
import { useSemanticZoom } from '@/hooks/use-semantic-zoom'
import { CapsuleIcon } from './capsule-icons'
import { HowItWorksExpanded } from './capsule-expanded/how-it-works-expanded'
import { PlatformExpanded } from './capsule-expanded/platform-expanded'
import { SecurityExpanded } from './capsule-expanded/security-expanded'

// ---------------------------------------------------------------------------
// Zoom-responsive config
// ---------------------------------------------------------------------------

/** Districts that expand at Z3 with additional detail content. */
const EXPANDABLE_DISTRICTS: ReadonlySet<DistrictId> = new Set([
  'how-it-works',
  'platform',
  'security',
])

/** Expanded card dimensions at Z3. */
const EXPANDED_SIZE = { width: 280, height: 360 }

/** Default card dimensions. */
const DEFAULT_SIZE = { width: 208, height: 260 }

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function resolveVariant(
  isSelected: boolean,
  hasSelection: boolean,
): string {
  if (isSelected) return 'selected'
  if (hasSelection) return 'dimmed'
  return 'idle'
}

/** Map expandable district IDs to their expanded content component. */
function ExpandedContent({ districtId }: { districtId: DistrictId }) {
  switch (districtId) {
    case 'how-it-works':
      return <HowItWorksExpanded />
    case 'platform':
      return <PlatformExpanded />
    case 'security':
      return <SecurityExpanded />
    default:
      return null
  }
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface DistrictCapsuleProps {
  data: CapsuleData
  isSelected: boolean
  hasSelection: boolean
  onSelect: (id: DistrictId) => void
  style?: { left: number; top: number }
  morphAnimateTarget?: string
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const DistrictCapsule = forwardRef<HTMLDivElement, DistrictCapsuleProps>(
  function DistrictCapsule(
    {
      data,
      isSelected,
      hasSelection,
      onSelect,
      style,
      morphAnimateTarget,
    },
    ref,
  ) {
    const resolvedVariant = morphAnimateTarget
      ? morphAnimateTarget
      : resolveVariant(isSelected, hasSelection)

    const { isStation } = useSemanticZoom()

    const isExpandable = EXPANDABLE_DISTRICTS.has(data.district.id)
    const isExpanded = isExpandable && isStation

    const cardSize = useMemo(() => {
      if (isExpanded) return EXPANDED_SIZE
      return DEFAULT_SIZE
    }, [isExpanded])

    const handleKeySelect = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(data.district.id)
        }
      },
      [onSelect, data.district.id],
    )

    const handleMouseEnter = useCallback(() => {
      useEnrichmentStore.getState().setFocusedDistrict(data.district.id)
    }, [data.district.id])

    const handleMouseLeave = useCallback(() => {
      useEnrichmentStore.getState().setFocusedDistrict(null)
    }, [])

    const cardConfig = CAPSULE_CARD_CONFIG[data.district.id]
    const isConversion = data.district.isConversionDistrict

    return (
      <motion.div
        ref={ref}
        role="button"
        tabIndex={0}
        aria-label={`${data.district.displayName} -- ${cardConfig.benefitText}`}
        data-district={data.district.id}
        data-selected={isSelected || undefined}
        data-expanded={isExpanded || undefined}
        variants={capsuleStateVariants}
        initial="idle"
        animate={resolvedVariant}
        whileHover={
          hasSelection
            ? undefined
            : 'hover'
        }
        onClick={() => onSelect(data.district.id)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeySelect}
        className={cn(
          'district-capsule group absolute rounded-[28px]',
          // Glass material
          'bg-[rgba(var(--ambient-ink-rgb),0.05)] backdrop-blur-[12px] backdrop-saturate-[120%]',
          'border border-[rgba(var(--ambient-ink-rgb),0.10)]',
          'contain-[layout_style]',
          'focus-visible:outline-2 focus-visible:outline-offset-2',
          'focus-visible:outline-[var(--color-ember-bright)]',
          'cursor-pointer',
        )}
        style={{
          ...(style ? { left: style.left, top: style.top } : {}),
          width: cardSize.width,
          height: cardSize.height,
          padding: '20px 18px 16px',
          transition: 'width 400ms cubic-bezier(0.22, 1, 0.36, 1), height 400ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div className="flex h-full flex-col">
          {/* Icon + Title + Accent Line */}
          <div className="flex flex-col items-center gap-1.5">
            <CapsuleIcon
              districtId={data.district.id}
              size={24}
              className={cn(
                'transition-opacity duration-300',
                isConversion
                  ? 'text-[#F59E0B] opacity-70 group-hover:opacity-90'
                  : 'text-[var(--color-ember)] opacity-60 group-hover:opacity-85',
              )}
            />
            <span className="font-sans text-[14px] font-semibold tracking-[0.08em] uppercase leading-none text-[var(--color-text-primary)] opacity-90">
              {data.district.displayName}
            </span>
            {/* Accent line */}
            <div
              className="capsule-health-bar"
              data-index={data.district.ringIndex}
              data-health="OPERATIONAL"
              style={{
                width: 40,
                height: 2,
                borderRadius: 1,
                backgroundColor: isConversion
                  ? '#F59E0B'
                  : 'var(--color-healthy)',
                marginTop: 2,
              }}
              aria-hidden="true"
            />
          </div>

          {/* Sector label + benefit text */}
          <div className="mt-3 flex flex-col gap-1">
            <span
              className="font-mono text-[9px] tracking-[0.1em] uppercase leading-none"
              style={{ color: 'rgba(var(--ambient-ink-rgb), 0.5)' }}
            >
              {cardConfig.sectorLabel}
            </span>
            <p
              className="font-sans text-[12px] leading-[1.4]"
              style={{ color: 'rgba(var(--ambient-ink-rgb), 0.8)' }}
            >
              {cardConfig.benefitText}
            </p>
          </div>

          {/* Metric label + value */}
          <div className="mt-3 flex flex-col gap-0.5">
            <span
              className="font-mono text-[9px] tracking-[0.1em] uppercase leading-none"
              style={{ color: 'rgba(var(--ambient-ink-rgb), 0.4)' }}
            >
              {cardConfig.metricLabel}
            </span>
            <span
              className="font-mono text-[11px] tracking-[0.04em] leading-none"
              style={{
                color: isConversion
                  ? 'rgba(245, 158, 11, 0.85)'
                  : 'var(--color-ember-bright)',
              }}
            >
              {cardConfig.metricValue}
            </span>
          </div>

          {/* Expanded content (Z3 only, expandable cards only) */}
          {isExpanded && (
            <div
              style={{
                overflow: 'hidden',
                opacity: 1,
                transition: 'opacity 300ms ease',
              }}
            >
              <div
                style={{
                  borderTop: '1px solid rgba(var(--ambient-ink-rgb), 0.06)',
                  marginTop: 8,
                  paddingTop: 4,
                }}
              >
                <ExpandedContent districtId={data.district.id} />
              </div>
            </div>
          )}

          {/* EXPLORE > affordance */}
          <div className="mt-auto flex justify-end">
            <span
              className="font-mono text-[9px] tracking-[0.08em] uppercase transition-opacity duration-200 opacity-30 group-hover:opacity-70"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              EXPLORE &gt;
            </span>
          </div>
        </div>
      </motion.div>
    )
  },
)
