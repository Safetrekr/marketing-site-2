/**
 * HudRadarWidget -- fixed-position compact radar + gauge display.
 *
 * Combines a small concentric-ring radar with the three semicircular
 * gauge arcs (SYS / THR / AGT) into a single widget positioned in
 * the upper-left corner of the viewport, below the breadcrumbs.
 *
 * @module hud-radar-widget
 */

'use client'

import { useMemo } from 'react'
import { useEnrichmentStore } from '@/stores/enrichment.store'

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

const SIZE = 160
const CX = SIZE / 2
const CY = SIZE / 2

// Concentric radar rings
const RING_RADII = [24, 40, 56, 72]

// Gauge arcs (semicircle, open at bottom)
const GAUGE_DEFS = [
  { radius: 28, color: 'rgba(var(--healthy-rgb), 0.35)', label: 'SYS' },
  { radius: 40, color: 'rgba(14, 165, 233, 0.35)', label: 'THR' },
  { radius: 52, color: 'rgba(var(--ember-rgb), 0.30)', label: 'AGT' },
] as const

const TRACK_COLOR = 'rgba(var(--ambient-ink-rgb), 0.04)'
const TICK_COLOR = 'rgba(var(--ambient-ink-rgb), 0.05)'
const LABEL_COLOR = 'rgba(var(--ambient-ink-rgb), 0.22)'
const RING_STROKE = 'rgba(var(--ambient-ink-rgb), 0.04)'
const SWEEP_STROKE = 'rgba(var(--ember-rgb), 0.08)'

// ---------------------------------------------------------------------------
// Arc math
// ---------------------------------------------------------------------------

const toRad = (deg: number) => (deg * Math.PI) / 180
const arcX = (deg: number, r: number) => CX + r * Math.cos(toRad(deg))
const arcY = (deg: number, r: number) => CY + r * Math.sin(toRad(deg))

function semiArcPath(r: number, startDeg: number, endDeg: number) {
  const x1 = arcX(startDeg, r)
  const y1 = arcY(startDeg, r)
  const x2 = arcX(endDeg, r)
  const y2 = arcY(endDeg, r)
  return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`
}

function filledArcPath(r: number, percent: number) {
  const fillDeg = 180 - (percent / 100) * 180
  return semiArcPath(r, 180, fillDeg)
}

// Tick marks on gauge arcs
const TICK_COUNT = 12
const TICK_LEN = 3

function generateTicks(r: number) {
  const ticks: { x1: number; y1: number; x2: number; y2: number }[] = []
  for (let i = 0; i <= TICK_COUNT; i++) {
    const deg = 180 - (i / TICK_COUNT) * 180
    ticks.push({
      x1: arcX(deg, r - TICK_LEN / 2),
      y1: arcY(deg, r - TICK_LEN / 2),
      x2: arcX(deg, r + TICK_LEN / 2),
      y2: arcY(deg, r + TICK_LEN / 2),
    })
  }
  return ticks
}

// Cross-hair tick marks on ring perimeters
const CROSSHAIR_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function HudRadarWidget() {
  const performance = useEnrichmentStore((s) => s.performance)

  const gaugePercents = useMemo(
    () => [
      Math.round(performance.systemHealthPct),
      Math.round(performance.throughputPct),
      Math.round(performance.agentCapacityPct),
    ],
    [performance.systemHealthPct, performance.throughputPct, performance.agentCapacityPct],
  )

  return (
    <div
      className="pointer-events-none fixed z-40"
      style={{ top: 76, left: 12 }}
      aria-hidden="true"
    >
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Concentric radar rings */}
        {RING_RADII.map((r) => (
          <circle key={r} cx={CX} cy={CY} r={r} stroke={RING_STROKE} strokeWidth={0.5} />
        ))}

        {/* Cross-hair ticks on outer ring */}
        {CROSSHAIR_ANGLES.map((deg) => {
          const outerR = RING_RADII[RING_RADII.length - 1]
          return (
            <line
              key={deg}
              x1={arcX(deg, outerR - 3)}
              y1={arcY(deg, outerR - 3)}
              x2={arcX(deg, outerR + 3)}
              y2={arcY(deg, outerR + 3)}
              stroke={TICK_COLOR}
              strokeWidth={0.5}
            />
          )
        })}

        {/* Radar sweep line (rotates via enrichment-sweep keyframes) */}
        <g
          style={{
            transformOrigin: `${CX}px ${CY}px`,
            animation: 'enrichment-sweep 24s linear infinite',
          }}
        >
          <line
            x1={CX}
            y1={CY}
            x2={CX}
            y2={CY - RING_RADII[RING_RADII.length - 1]}
            stroke={SWEEP_STROKE}
            strokeWidth={0.5}
          />
        </g>

        {/* Gauge arcs (upper semicircle) */}
        {GAUGE_DEFS.map((gauge, idx) => {
          const percent = gaugePercents[idx]
          const ticks = generateTicks(gauge.radius)
          const labelX = arcX(0, gauge.radius) + 4
          const labelY = arcY(0, gauge.radius) + 10
          const nameX = arcX(180, gauge.radius) - 4
          const nameY = arcY(180, gauge.radius) + 10

          return (
            <g key={gauge.radius}>
              {/* Track */}
              <path
                d={semiArcPath(gauge.radius, 180, 0)}
                stroke={TRACK_COLOR}
                strokeWidth={1.5}
                strokeLinecap="round"
                fill="none"
              />
              {/* Fill */}
              <path
                d={filledArcPath(gauge.radius, percent)}
                stroke={gauge.color}
                strokeWidth={1.5}
                strokeLinecap="round"
                fill="none"
              />
              {/* Ticks */}
              {ticks.map((t, i) => (
                <line
                  key={i}
                  x1={t.x1}
                  y1={t.y1}
                  x2={t.x2}
                  y2={t.y2}
                  stroke={TICK_COLOR}
                  strokeWidth={0.5}
                />
              ))}
              {/* Percent */}
              <text
                x={labelX}
                y={labelY}
                textAnchor="start"
                dominantBaseline="central"
                fill={LABEL_COLOR}
                fontFamily="var(--font-mono, monospace)"
                fontSize={7}
                letterSpacing="0.05em"
              >
                {percent}%
              </text>
              {/* Name */}
              <text
                x={nameX}
                y={nameY}
                textAnchor="end"
                dominantBaseline="central"
                fill={LABEL_COLOR}
                fontFamily="var(--font-mono, monospace)"
                fontSize={6}
                letterSpacing="0.08em"
                opacity={0.7}
              >
                {gauge.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
