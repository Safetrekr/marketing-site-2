/**
 * CapsuleRing -- circular layout for 6 district capsules.
 *
 * 840x840px container with capsules placed via trigonometry at
 * 300px radius, 60-degree spacing, first capsule at 12 o'clock
 * (-90 degrees / 270 degrees).
 *
 * The capsule dims when selected; a separate DetailPanel appears
 * alongside it (rendered by MorphOrchestrator).
 *
 * @module capsule-ring
 * @see WS-1.2 Section 4.3
 * @see WS-2.1 Section 4.11
 */

'use client'

import { createRef, useMemo, type RefObject } from 'react'
import { motion } from 'motion/react'

import { CAPSULE_RING_RADIUS, CAPSULE_ANGULAR_SPACING, CAPSULE_RING_CONTAINER_SIZE } from '@/lib/constants'
import type { CapsuleData, DistrictId } from '@/lib/interfaces/district'
import type { MorphPhase, PanelSide } from '@/lib/morph-types'
import { RING_SHIFT } from '@/lib/morph-types'
import { resolveMorphVariant } from '@/hooks/use-morph-variants'
import { DistrictCapsule } from './district-capsule'
import { HubCenterGlyph } from './hub-center-glyph'

// ---------------------------------------------------------------------------
// Layout constants
// ---------------------------------------------------------------------------

export const RING_SIZE = CAPSULE_RING_CONTAINER_SIZE
export const RING_CENTER = RING_SIZE / 2
const CAPSULE_WIDTH = 208
const CAPSULE_HEIGHT = 260
const START_ANGLE_DEG = -90

// ---------------------------------------------------------------------------
// Helpers (exported for orchestrator panel positioning)
// ---------------------------------------------------------------------------

/**
 * Compute capsule top-left position within the ring container.
 */
export function computeCapsulePosition(ringIndex: number): { left: number; top: number } {
  const angleDeg = START_ANGLE_DEG + ringIndex * CAPSULE_ANGULAR_SPACING
  const angleRad = (angleDeg * Math.PI) / 180

  const cx = RING_CENTER + CAPSULE_RING_RADIUS * Math.cos(angleRad)
  const cy = RING_CENTER + CAPSULE_RING_RADIUS * Math.sin(angleRad)

  return {
    left: cx - CAPSULE_WIDTH / 2,
    top: cy - CAPSULE_HEIGHT / 2,
  }
}

/**
 * Compute capsule center point within the ring container.
 */
export function computeCapsuleCenter(ringIndex: number): { x: number; y: number } {
  const angleDeg = START_ANGLE_DEG + ringIndex * CAPSULE_ANGULAR_SPACING
  const angleRad = (angleDeg * Math.PI) / 180

  return {
    x: RING_CENTER + CAPSULE_RING_RADIUS * Math.cos(angleRad),
    y: RING_CENTER + CAPSULE_RING_RADIUS * Math.sin(angleRad),
  }
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface CapsuleRingProps {
  data: CapsuleData[]
  selectedId: DistrictId | null
  onSelect: (id: DistrictId) => void
  morphPhase?: MorphPhase
  /** Which side the detail panel is on. Null when no panel is visible. */
  panelSide?: PanelSide | null
  /** Rotation in degrees applied to the ring so the clicked capsule faces the panel. */
  ringRotation?: number
  /** Stagger delay between capsule entrance animations (ms). 0 = no entrance animation. */
  entranceStagger?: number
  /** Optional children rendered inside the ring container (e.g. DetailPanel, ConnectorLines). */
  children?: React.ReactNode
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/** Spring config for the ring shift animation. */
const RING_SHIFT_SPRING = {
  type: 'spring' as const,
  stiffness: 140,
  damping: 24,
}

export function CapsuleRing({
  data,
  selectedId,
  onSelect,
  morphPhase,
  panelSide = null,
  ringRotation = 0,
  entranceStagger = 0,
  children,
}: CapsuleRingProps) {
  const capsuleRefs = useMemo(() => {
    const refs: Record<string, RefObject<HTMLDivElement | null>> = {}
    for (const capsule of data) {
      refs[capsule.district.id] = createRef<HTMLDivElement>()
    }
    return refs as Record<DistrictId, RefObject<HTMLDivElement | null>>
  }, [data])

  const hasSelection = selectedId !== null
  const activeMorphPhase = morphPhase ?? 'idle'

  // Compute ring shift target: ring shifts AWAY from the panel side + rotates
  const ringShiftTarget = useMemo(() => {
    if (!panelSide) return { x: 0, scale: 1, rotate: 0 }
    return {
      x: panelSide === 'right' ? -RING_SHIFT.offset : RING_SHIFT.offset,
      scale: RING_SHIFT.scale,
      rotate: ringRotation,
    }
  }, [panelSide, ringRotation])

  return (
    <div
      className="absolute"
      data-morph-phase={activeMorphPhase}
      style={{
        left: -(RING_SIZE / 2),
        top: -(RING_SIZE / 2),
        width: RING_SIZE,
        height: RING_SIZE,
        pointerEvents: 'auto',
        overflow: 'visible',
      }}
    >
      {/* Animated ring content -- shifts, scales, and rotates */}
      <motion.div
        animate={ringShiftTarget}
        transition={RING_SHIFT_SPRING}
        style={{
          width: RING_SIZE,
          height: RING_SIZE,
          position: 'relative',
          transformOrigin: 'center center',
        }}
      >
        {data.map((capsule) => {
          const position = computeCapsulePosition(capsule.district.ringIndex)
          const isSelected = selectedId === capsule.district.id

          const animateTarget = resolveMorphVariant(
            isSelected,
            activeMorphPhase,
          )

          const entranceDelay = entranceStagger
            ? capsule.district.ringIndex * (entranceStagger / 1000)
            : 0

          return (
            <motion.div
              key={capsule.district.id}
              className="absolute"
              style={{ left: position.left, top: position.top }}
              initial={entranceStagger ? { opacity: 0, scale: 0.85 } : undefined}
              animate={{ rotate: -ringRotation, opacity: 1, scale: 1 }}
              transition={{
                rotate: RING_SHIFT_SPRING,
                opacity: { duration: 0.6, delay: entranceDelay, ease: [0.4, 0, 0.2, 1] },
                scale: { duration: 0.8, delay: entranceDelay, ease: [0.22, 1, 0.36, 1] },
              }}
            >
              <DistrictCapsule
                ref={capsuleRefs[capsule.district.id]}
                data={capsule}
                isSelected={isSelected}
                hasSelection={hasSelection}
                onSelect={onSelect}
                morphAnimateTarget={activeMorphPhase !== 'idle' ? animateTarget : undefined}
              />
            </motion.div>
          )
        })}

        <motion.div
          initial={entranceStagger ? { opacity: 0, scale: 0.7 } : undefined}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <HubCenterGlyph hasSelection={hasSelection} />
        </motion.div>
      </motion.div>

      {/* DetailPanel + ConnectorLines -- NOT shifted, stay in ring container coords */}
      {children}
    </div>
  )
}
