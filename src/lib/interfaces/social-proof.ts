// src/lib/interfaces/social-proof.ts

/** Vertical market identifier. Matches the solutions page verticals. */
export type VerticalId =
  | 'k12'
  | 'higher-ed'
  | 'churches'
  | 'youth-sports'
  | 'business'

/** Display metadata for a vertical market. */
export interface VerticalMeta {
  id: VerticalId
  label: string
  /** Lucide icon name for consistent iconography */
  icon: string
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export interface Testimonial {
  /** Unique identifier for keying and analytics */
  id: string
  /** The testimonial quote. Plain text, no HTML. 1-3 sentences recommended. */
  quote: string
  /** Person who gave the testimonial */
  attribution: TestimonialAttribution
  /** Which vertical this testimonial represents */
  vertical: VerticalId
  /** Optional: path to headshot image relative to /public */
  headshotSrc?: string
  /**
   * Optional: a single headline stat to display above the quote
   * (e.g., "18 trips managed")
   */
  highlightStat?: {
    value: string
    label: string
  }
  /**
   * Display order (lower = first).
   * Allows manual curation of testimonial sequence.
   */
  order: number
  /** When true, this testimonial is eligible for the landing page featured slots */
  featured: boolean
}

export interface TestimonialAttribution {
  name: string
  title: string
  organization: string
  organizationType: VerticalId
}

// ---------------------------------------------------------------------------
// Customer Logos
// ---------------------------------------------------------------------------

export interface CustomerLogo {
  /** Unique identifier */
  id: string
  /** Organization name (used as alt text) */
  name: string
  /** Path to SVG logo relative to /public. Logos must be white/light for dark backgrounds. */
  logoSrc: string
  /** Optional link to case study page */
  caseStudySlug?: string
  /** Which vertical this customer belongs to */
  vertical: VerticalId
  /** Display order */
  order: number
}

// ---------------------------------------------------------------------------
// Case Studies
// ---------------------------------------------------------------------------

export interface CaseStudy {
  /** URL slug: /case-studies/[slug] */
  slug: string
  /** Customer organization name */
  customer: string
  /** Customer vertical */
  vertical: VerticalId
  /** Page title for SEO and card heading */
  title: string
  /** 1-2 sentence summary for card preview and meta description */
  summary: string
  /** Path to hero image relative to /public */
  heroImageSrc?: string
  /** Path to customer logo relative to /public */
  customerLogoSrc?: string
  /** Headline stats displayed on the card and in the hero area */
  stats: CaseStudyStat[]
  /** Structured content sections (ordered) */
  sections: CaseStudySection[]
  /** Pull quotes extracted from the narrative */
  pullQuotes: Testimonial[]
  /** SEO metadata */
  seo: {
    title: string
    description: string
  }
  /** Publication date (ISO 8601). Used for structured data and sorting. */
  publishedAt: string
  /** Display order on listing page */
  order: number
}

export interface CaseStudyStat {
  value: string
  label: string
  /** Optional: unit or context (e.g., "trips", "travelers", "reduction") */
  unit?: string
}

export interface CaseStudySection {
  /** Section type determines rendering treatment */
  type: 'challenge' | 'solution' | 'results' | 'implementation' | 'quote'
  /** Section heading */
  heading: string
  /**
   * Body content. Supports basic formatting via a subset of markdown-like conventions:
   *  - Paragraphs separated by double newlines
   *  - **bold** for emphasis
   *  - Bullet lists with lines starting with "- "
   *  Rendered by a lightweight formatter, NOT a full markdown parser.
   */
  body: string
  /** Optional: image path for the section */
  imageSrc?: string
  /** Optional: image alt text */
  imageAlt?: string
}

// ---------------------------------------------------------------------------
// Capability Proof (existing placeholder card type)
// ---------------------------------------------------------------------------

/** Retained from WS-B.2 for hybrid mode during transition. */
export interface CapabilityProof {
  stat: string
  label: string
  description: string
}
