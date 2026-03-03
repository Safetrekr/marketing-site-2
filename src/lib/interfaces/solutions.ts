// src/lib/interfaces/solutions.ts

/** A single vertical solution for the Solutions overview page. */
export interface SolutionVertical {
  /** Unique identifier, used as React key and URL slug */
  id: string
  /** Display name shown as card title */
  name: string
  /** Lucide icon component name */
  iconName: string
  /** H3 tagline for the card */
  tagline: string
  /** 3-4 pain points the vertical faces */
  painPoints: string[]
  /** 3-4 Safetrekr solutions addressing the pain points */
  solutions: string[]
  /** CTA label (e.g., "Learn more about Safetrekr for K-12") */
  ctaLabel: string
  /** Link to vertical detail page (e.g., "/solutions/k12") */
  ctaHref: string
}

// ---------------------------------------------------------------------------
// Vertical Detail Page Types (WS-D.1)
// ---------------------------------------------------------------------------

/** A single regulatory or compliance requirement relevant to a vertical. */
export interface VerticalRegulation {
  /** Short regulatory name (e.g., "FERPA", "SafeSport") */
  name: string
  /** Full name of the regulation or standard */
  fullName: string
  /** One-sentence description of what the regulation requires */
  description: string
  /** How Safetrekr addresses or aligns with this requirement */
  safetrekrAlignment: string
  /** Whether this compliance claim has been verified by legal/business owner */
  verified: boolean
}

/** An expanded challenge faced by the vertical (deeper than overview pain points). */
export interface VerticalChallenge {
  /** Short challenge title (e.g., "Consent Tracking at Scale") */
  title: string
  /** 2-3 sentence narrative describing the challenge in the buyer's language */
  description: string
}

/** Safetrekr's response to a vertical challenge, mapped to platform capabilities. */
export interface VerticalResponse {
  /** Short response title (e.g., "Structured Document Collection") */
  title: string
  /** 2-3 sentence description of the Safetrekr capability */
  description: string
  /** Optional reference to a verified platform feature from the product review */
  featureRef?: string
}

/** A platform feature highlighted for its relevance to the vertical. */
export interface VerticalFeatureSpotlight {
  /** Feature title */
  title: string
  /** 1-2 sentence description of the feature in vertical context */
  description: string
  /** Optional quantitative metric (e.g., "18 review dimensions") */
  metric?: string
  /** Lucide icon name for visual anchor */
  iconName?: string
}

/** Case study placeholder structure for future activation. */
export interface CaseStudyPlaceholderData {
  /** Vertical type label (e.g., "K-12 School District") */
  verticalType: string
  /** Suggested case study title for when real data is available */
  suggestedTitle: string
  /** Suggested metrics to capture from the pilot (e.g., "Time to complete trip planning") */
  suggestedMetrics: string[]
  /** Placeholder body copy */
  placeholderCopy: string
}

/** Full-depth vertical detail page data. */
export interface VerticalDetailData {
  /** Vertical identifier (matches SolutionVertical.id and URL slug) */
  id: string
  /** Display name */
  name: string
  /** Lucide icon name (matches SolutionVertical.iconName) */
  iconName: string

  // Hero
  /** H1 headline for the vertical page */
  heroHeadline: string
  /** H2 subheadline (1-2 sentences) */
  heroSubheadline: string

  // The Challenge (expanded from SolutionVertical.painPoints)
  /** Section intro copy for "The Challenge" */
  challengeIntro: string
  /** 4-6 expanded challenges */
  challenges: VerticalChallenge[]

  // The Safetrekr Response (expanded from SolutionVertical.solutions)
  /** Section intro copy for "The Safetrekr Response" */
  responseIntro: string
  /** 4-6 responses mapped to challenges */
  responses: VerticalResponse[]

  // Regulatory and Compliance
  /** Section intro copy for regulatory section */
  regulatoryIntro: string
  /** 3-5 regulations relevant to this vertical */
  regulations: VerticalRegulation[]

  // Feature Spotlight
  /** 3-4 platform features most relevant to this vertical */
  featureSpotlights: VerticalFeatureSpotlight[]

  // Differentiator Callout
  /** The vertical-specific "accountability question" that the analyst review answers */
  accountabilityQuestion: string
  /** The answer framing Safetrekr's independent analyst review */
  accountabilityAnswer: string

  // Case Study Placeholder
  caseStudy: CaseStudyPlaceholderData

  // Objection Hook (vertical-specific)
  /** The most common objection from this vertical's buyers */
  objectionQuestion: string
  /** The reframe + proof response */
  objectionAnswer: string

  // CTA
  /** Vertical-aware micro-copy for the bottom CTA */
  ctaMicrocopy: string

  // SEO
  seoTitle: string
  seoDescription: string
  /** Primary SEO keywords for this vertical page */
  seoKeywords: string[]
}
