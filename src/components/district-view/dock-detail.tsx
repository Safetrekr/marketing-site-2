/**
 * DockDetail — expanded detail view for a selected sub-item.
 *
 * Shows full description content and a sidebar list of sibling
 * sub-items for quick switching.
 *
 * @module dock-detail
 */

'use client'

import { motion } from 'motion/react'
import type { ShowcaseSubItem } from '@/lib/interfaces/district-showcase'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MORPH_EASE = [0.22, 1, 0.36, 1] as const

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface DockDetailProps {
  readonly subItem: ShowcaseSubItem
  readonly allSubItems: readonly ShowcaseSubItem[]
  readonly onSelectSubItem: (id: string) => void
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function DockDetail({ subItem, allSubItems, onSelectSubItem }: DockDetailProps) {
  const detailParagraphs = Array.isArray(subItem.detail)
    ? subItem.detail
    : [subItem.detail]

  return (
    <motion.div
      className="dock-detail"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.3, ease: MORPH_EASE }}
    >
      <div className="dock-detail-content">
        {/* Item heading */}
        <div className="dock-detail-header">
          <span className="dock-detail-monogram" aria-hidden="true">
            {subItem.label.slice(0, 2).toUpperCase()}
          </span>
          <h3 className="dock-detail-title">{subItem.label}</h3>
        </div>

        {/* Full detail text */}
        <div className="dock-detail-body">
          {detailParagraphs.map((paragraph, i) => (
            <p key={i} className="dock-detail-paragraph">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Sibling navigation */}
      {allSubItems.length > 1 && (
        <div className="dock-detail-siblings">
          <span className="dock-detail-siblings-label">Related Items</span>
          <div className="dock-detail-siblings-list">
            {allSubItems.map((item) => (
              <button
                key={item.id}
                className="dock-detail-sibling"
                data-active={item.id === subItem.id || undefined}
                onClick={() => onSelectSubItem(item.id)}
                aria-label={item.label}
                aria-current={item.id === subItem.id ? 'true' : undefined}
              >
                <span className="dock-detail-sibling-monogram">
                  {item.label.slice(0, 2).toUpperCase()}
                </span>
                <span className="dock-detail-sibling-name">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
