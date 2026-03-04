// src/lib/interfaces/pricing.ts

/**
 * A single feature included in a pricing tier.
 * Used to render the feature checklist on each tier card.
 */
export interface PricingFeature {
  /** Short label displayed in the feature list */
  label: string
  /** Whether this feature is included in the tier (false = greyed out) */
  included: boolean
  /** Optional tooltip or expanded description */
  detail?: string
}

/**
 * Represents one pricing tier (T1, T2, T3, or Enterprise).
 * The `price` field is null for enterprise (contact sales).
 */
export interface PricingTier {
  /** Machine-readable tier ID */
  id: 'day-trip' | 'domestic-overnight' | 'international'
  /** Human-readable tier name */
  name: string
  /** Short tagline describing the tier use case */
  tagline: string
  /** Price in USD cents (null for enterprise "Contact Sales") */
  priceUsd: number | null
  /** Pricing display unit (e.g., "/trip") */
  unit: string
  /** Ordered list of features for this tier */
  features: PricingFeature[]
  /** Whether this tier should be visually highlighted (recommended) */
  highlighted: boolean
  /** CTA button label */
  ctaLabel: string
  /** CTA button href */
  ctaHref: string
  /** Optional badge text (e.g., "Most Popular") */
  badge?: string
}

/**
 * An optional add-on service.
 */
export interface PricingAddOn {
  /** Add-on name */
  name: string
  /** Price display string (e.g., "$35/check") */
  priceDisplay: string
  /** Description of the add-on */
  description: string
  /** Integration note (e.g., "Checkr, Sterling, or GoodHire") */
  integrationNote?: string
}

/**
 * A single FAQ question-answer pair.
 */
export interface PricingFAQItem {
  /** The question text */
  question: string
  /** The answer text (supports inline markup via className prose) */
  answer: string
  /** Whether this item is flagged as unresolved (Q-2, cancellation policy) */
  unresolved?: boolean
}
