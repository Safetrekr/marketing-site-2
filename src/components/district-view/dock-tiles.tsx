/**
 * DockTiles — grid of square tile buttons for showcase sub-items.
 *
 * Renders a 3-column grid of glass-morphism tiles. Each tile shows
 * an icon and label. Clicking a tile enters detail mode.
 *
 * @module dock-tiles
 */

'use client'

import { motion } from 'motion/react'
import type { ShowcaseSubItem } from '@/lib/interfaces/district-showcase'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MORPH_EASE = [0.22, 1, 0.36, 1] as const
const STAGGER_DELAY = 0.03 // 30ms between tiles

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface DockTilesProps {
  readonly subItems: readonly ShowcaseSubItem[]
  readonly activeSubItemId: string | null
  readonly onSelect: (id: string) => void
  readonly stepLabel: string
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function DockTiles({ subItems, activeSubItemId, onSelect, stepLabel }: DockTilesProps) {
  return (
    <div className="dock-tiles-container">
      {/* Step label */}
      <motion.span
        className="dock-tiles-step-label"
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: MORPH_EASE }}
      >
        {stepLabel}
      </motion.span>

      {/* Tile grid */}
      <div className="dock-tiles-grid" role="grid" aria-label={`${stepLabel} items`}>
        {subItems.map((item, i) => {
          const isActive = item.id === activeSubItemId

          return (
            <motion.button
              key={item.id}
              className="dock-tile"
              data-active={isActive || undefined}
              onClick={() => onSelect(item.id)}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: STAGGER_DELAY * i,
                duration: 0.3,
                ease: MORPH_EASE,
              }}
              aria-label={`${item.label}: ${item.description}`}
            >
              {/* Icon placeholder (monogram) */}
              <span className="dock-tile-icon" aria-hidden="true">
                {item.label.slice(0, 2).toUpperCase()}
              </span>
              <span className="dock-tile-label">{item.label}</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
