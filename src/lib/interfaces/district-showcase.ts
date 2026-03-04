/**
 * District showcase types for the animated step bar + expanding dock system.
 *
 * Each district defines a set of steps (shown in the center card step bar)
 * and sub-items per step (shown as dock tiles when "Learn More" is clicked).
 *
 * @module district-showcase
 */

import type { DistrictId } from '@/lib/interfaces/district'

// ---------------------------------------------------------------------------
// Sub-item (dock tile → detail view)
// ---------------------------------------------------------------------------

/** A single sub-item within a showcase step, rendered as a dock tile. */
export interface ShowcaseSubItem {
  /** Unique identifier within the step. */
  readonly id: string
  /** Short label for the tile face. */
  readonly label: string
  /** Lucide icon name for the tile. */
  readonly iconName: string
  /** Brief description shown on tile hover or below the tile. */
  readonly description: string
  /** Full detail content for the expanded dock view. String or paragraph array. */
  readonly detail: string | readonly string[]
}

// ---------------------------------------------------------------------------
// Step (center card step bar node)
// ---------------------------------------------------------------------------

/** A single step in the district showcase, rendered as a node on the step bar. */
export interface ShowcaseStep {
  /** Unique step identifier. */
  readonly id: string
  /** Display number (1-based). */
  readonly number: number
  /** Short label shown below the step node. */
  readonly label: string
  /** 1-2 sentence summary for typewriter reveal. */
  readonly summary: string
  /** Sub-items that populate dock tiles when "Learn More" is clicked. */
  readonly subItems: readonly ShowcaseSubItem[]
}

// ---------------------------------------------------------------------------
// District showcase config
// ---------------------------------------------------------------------------

/** Complete showcase configuration for a single district. */
export interface DistrictShowcaseConfig {
  /** Which district this config belongs to. */
  readonly districtId: DistrictId
  /** District title (shown in compact center card). */
  readonly title: string
  /** Ordered list of steps for the step bar. */
  readonly steps: readonly ShowcaseStep[]
  /** CTA label at the bottom of the center card. */
  readonly ctaLabel: string
  /** CTA navigation href. */
  readonly ctaHref: string
}
