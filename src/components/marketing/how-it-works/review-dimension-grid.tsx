'use client'

// src/components/marketing/how-it-works/review-dimension-grid.tsx

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import type { ReviewDimension } from '@/lib/interfaces/how-it-works'

interface ReviewDimensionGridProps {
  dimensions: ReviewDimension[]
}

export function ReviewDimensionGrid({ dimensions }: ReviewDimensionGridProps) {
  // Mobile-only expand state
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const toggleDimension = useCallback((id: number) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }, [])

  return (
    <ul
      className={cn(
        'grid gap-3',
        'grid-cols-1',        // mobile: 1 col
        'sm:grid-cols-2',     // tablet: 2 cols
        'lg:grid-cols-3',     // desktop: 3 cols
      )}
      role="list"
    >
      {dimensions.map((dim) => {
        const isExpanded = expandedId === dim.number
        return (
          <li key={dim.number}>
            {/* Mobile: tappable card */}
            <button
              type="button"
              onClick={() => toggleDimension(dim.number)}
              aria-expanded={isExpanded}
              className={cn(
                'flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left',
                'bg-white/[0.03] border border-white/[0.04]',
                'transition-colors duration-150',
                'hover:bg-white/[0.05]',
                'focus-visible:outline-2 focus-visible:outline-offset-[-2px]',
                'focus-visible:outline-[var(--color-ember-bright)]',
                // On desktop, button styling is muted (no expand behavior shown)
                'lg:cursor-default',
              )}
            >
              {/* Number badge */}
              <span
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-md',
                  'bg-[var(--color-ember-dim)] text-[var(--color-ember)]',
                  'text-xs font-bold',
                )}
              >
                {dim.number}
              </span>

              <div className="min-w-0 flex-1">
                {/* Dimension name */}
                <span className="text-sm font-medium text-[var(--color-text-primary)]">
                  {dim.name}
                </span>

                {/* Description -- always visible on desktop, expandable on mobile */}
                <span className="mt-0.5 hidden text-xs leading-relaxed text-[var(--color-text-tertiary)] lg:block">
                  {dim.description}
                </span>

                {/* Mobile expand */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.span
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="mt-0.5 block overflow-hidden text-xs leading-relaxed text-[var(--color-text-tertiary)] lg:hidden"
                    >
                      {dim.description}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
