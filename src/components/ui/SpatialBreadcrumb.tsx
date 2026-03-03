/**
 * SpatialBreadcrumb -- semantic path breadcrumb for the ZUI.
 *
 * Displays the operator's current semantic position derived from
 * camera state. Shows a navigable path that deepens as the user
 * zooms into districts and stations.
 *
 * - Z0/Z1: "Launch"
 * - Z2: "Launch > {DistrictName}"
 * - Z3: "Launch > {DistrictName} > Station"
 *
 * Each segment (except the terminal) is clickable and flies the
 * camera to the corresponding spatial position.
 *
 * Uses @tarva/ui Breadcrumb primitives with spatial styling overrides.
 *
 * @module SpatialBreadcrumb
 * @see WS-1.4 Deliverable 4.3
 */

'use client'

import { useCallback } from 'react'
import { ChevronRight } from 'lucide-react'

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@tarva/ui'

import { useCameraStore } from '@/stores/camera.store'
import { useUIStore, uiSelectors } from '@/stores/ui.store'
import { DISTRICTS, type DistrictId } from '@/lib/interfaces/district'
import { returnToHub, flyToDistrict } from '@/lib/spatial-actions'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface SpatialBreadcrumbProps {
  className?: string
}

export function SpatialBreadcrumb({ className }: SpatialBreadcrumbProps) {
  const semanticLevel = useCameraStore((s) => s.semanticLevel)
  const selectedDistrictId = useUIStore((s) => s.selectedDistrictId)
  const isDistrictView = useUIStore(uiSelectors.isDistrictView)
  const morphTargetId = useUIStore(uiSelectors.morphTargetId)
  const reverseMorph = useUIStore((s) => s.reverseMorph)

  // Resolve district display name from the selected ID or morph target
  const activeDistrictId = isDistrictView ? morphTargetId : selectedDistrictId
  const selectedDistrict = activeDistrictId
    ? DISTRICTS.find((d) => d.id === activeDistrictId)
    : null

  const handleLaunchClick = useCallback(() => {
    if (isDistrictView) {
      // In district view, go back through the morph state machine
      reverseMorph()
    } else {
      returnToHub()
    }
  }, [isDistrictView, reverseMorph])

  const handleDistrictClick = useCallback(() => {
    if (activeDistrictId) {
      flyToDistrict(activeDistrictId as DistrictId)
    }
  }, [activeDistrictId])

  // Show district crumb when in district view OR at Z2/Z3 with a selection
  const showDistrict =
    (isDistrictView && selectedDistrict) ||
    ((semanticLevel === 'Z2' || semanticLevel === 'Z3') && selectedDistrict)
  const showStation = semanticLevel === 'Z3' && selectedDistrict

  return (
    <Breadcrumb
      className={cn('pointer-events-auto fixed top-12 left-4', className)}
      aria-label="Spatial navigation breadcrumb"
    >
      <BreadcrumbList
        className={cn(
          'gap-1.5',
          'font-mono text-[11px] font-normal',
          'tracking-[0.02em]',
        )}
      >
        {/* Launch segment */}
        <BreadcrumbItem>
          {showDistrict ? (
            <BreadcrumbLink asChild>
              <button
                onClick={handleLaunchClick}
                className={cn(
                  'cursor-pointer font-mono text-[11px] font-normal',
                  'tracking-[0.02em] opacity-55',
                  'transition-opacity hover:opacity-80',
                )}
                type="button"
              >
                Launch
              </button>
            </BreadcrumbLink>
          ) : (
            <BreadcrumbPage
              className={cn(
                'font-mono text-[11px] font-normal',
                'tracking-[0.02em] opacity-55',
              )}
            >
              Launch
            </BreadcrumbPage>
          )}
        </BreadcrumbItem>

        {/* District segment */}
        {showDistrict && (
          <>
            <BreadcrumbSeparator className="opacity-30">
              <ChevronRight className="h-3 w-3" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              {showStation ? (
                <BreadcrumbLink asChild>
                  <button
                    onClick={handleDistrictClick}
                    className={cn(
                      'cursor-pointer font-mono text-[11px] font-normal',
                      'tracking-[0.02em] opacity-55',
                      'transition-opacity hover:opacity-80',
                    )}
                    type="button"
                  >
                    {selectedDistrict.displayName}
                  </button>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage
                  className={cn(
                    'font-mono text-[11px] font-normal',
                    'tracking-[0.02em] opacity-55',
                  )}
                >
                  {selectedDistrict.displayName}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </>
        )}

        {/* Station segment (placeholder for Phase 1) */}
        {showStation && (
          <>
            <BreadcrumbSeparator className="opacity-30">
              <ChevronRight className="h-3 w-3" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage
                className={cn(
                  'font-mono text-[11px] font-normal',
                  'tracking-[0.02em] opacity-55',
                )}
              >
                Station
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
