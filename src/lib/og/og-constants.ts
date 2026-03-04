/**
 * OG Image Constants
 *
 * Hardcoded color values, dimensions, and typography measurements for OG images.
 * These mirror the Safetrekr spatial tokens from `src/styles/spatial-tokens.css`
 * but are expressed as literal strings because Satori (the ImageResponse renderer)
 * does not support CSS custom properties.
 *
 * Source of truth: WS-C.4 Section 4.1.2
 */

// ---------------------------------------------------------------------------
// Canvas
// ---------------------------------------------------------------------------

export const OG_WIDTH = 1200
export const OG_HEIGHT = 630
export const OG_CONTENT_TYPE = 'image/png' as const

// ---------------------------------------------------------------------------
// Color Palette (Safetrekr dark scheme)
// ---------------------------------------------------------------------------

/** Primary background fill -- deepest spatial depth stop */
export const COLOR_VOID = '#061A23'

/** Secondary background -- subtle panel fills, grid overlay base */
export const COLOR_DEEP = '#0A2733'

/** Tertiary fill -- card/panel elements within the image */
export const COLOR_SURFACE = '#123646'

/** Elevated panel fill -- highlight containers */
export const COLOR_RAISED = '#2A4A59'

/** Grid lines, dividers, panel strokes */
export const COLOR_BORDER = '#365462'

/** Primary accent -- accent lines, glow source, logo tint */
export const COLOR_EMBER = '#4BA467'

/** Bright accent -- glow halo, highlighted text */
export const COLOR_EMBER_BRIGHT = '#6ABF84'

/** Glow diffusion -- soft radial gradient source */
export const COLOR_EMBER_GLOW = '#92D4A6'

/** Primary text -- page title, brand name */
export const COLOR_TEXT_PRIMARY = '#E8F0F4'

/** Secondary text -- description, domain URL */
export const COLOR_TEXT_SECONDARY = '#929899'

/** Tertiary text -- decorative labels, grid coordinates */
export const COLOR_TEXT_TERTIARY = '#5A7A88'

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

export const FONT_SANS = 'Geist Sans'
export const FONT_MONO = 'Geist Mono'

export const TITLE_SIZE = 52
export const TITLE_WEIGHT = 700
export const TITLE_LINE_HEIGHT = 1.15
export const TITLE_LETTER_SPACING = '0.02em'
export const TITLE_MAX_WIDTH = 1080

export const DESCRIPTION_SIZE = 26
export const DESCRIPTION_WEIGHT = 400
export const DESCRIPTION_LINE_HEIGHT = 1.4
export const DESCRIPTION_LETTER_SPACING = '0.02em'
export const DESCRIPTION_MAX_WIDTH = 900

export const BADGE_FONT_SIZE = 11
export const BADGE_LETTER_SPACING = '0.12em'

export const DOMAIN_FONT_SIZE = 16
export const DOMAIN_LETTER_SPACING = '0.08em'

export const WORDMARK_FONT_SIZE = 20

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

export const CANVAS_PADDING = 40
export const TITLE_TOP_GAP = 48
export const DESCRIPTION_TOP_GAP = 20
export const ACCENT_LINE_WIDTH = 720
export const ACCENT_LINE_HEIGHT = 2
export const BOTTOM_ROW_TOP_GAP = 24
export const LOGO_HEIGHT = 40
export const CORNER_ARM_LENGTH = 40
export const CORNER_OFFSET = 20

// ---------------------------------------------------------------------------
// Badge
// ---------------------------------------------------------------------------

export const BADGE_HEIGHT = 32
export const BADGE_BORDER_RADIUS = 4
export const BADGE_PADDING_X = 16
export const BADGE_PADDING_Y = 6

// ---------------------------------------------------------------------------
// Background Composition
// ---------------------------------------------------------------------------

export const RADIAL_GLOW = `radial-gradient(circle at 50% 40%, rgba(75, 164, 103, 0.06) 0%, transparent 70%)`

// ---------------------------------------------------------------------------
// Badge Icon + Label Configuration
// ---------------------------------------------------------------------------

export type BadgeIcon =
  | 'shield'
  | 'process'
  | 'grid'
  | 'building'
  | 'bars'
  | 'lock'
  | 'people'
  | 'arrow'
  | 'document'
  | 'shield-check'

export interface OgPageConfig {
  /** Page title rendered at 52px Bold. Max ~60 characters (2 lines). */
  title: string
  /** Short description at 26px Regular. Max ~120 characters (2 lines). */
  description: string
  /** Badge label (uppercase). Example: "PRICING", "PLATFORM". */
  badgeLabel: string
  /** Badge icon variant. Determines the geometric icon rendered in the badge. */
  badgeIcon: BadgeIcon
  /** Descriptive alt text for the OG image. */
  alt: string
}

// ---------------------------------------------------------------------------
// Per-Page Content Registry
// ---------------------------------------------------------------------------

export const OG_PAGE_CONFIGS = {
  landing: {
    title: 'Trip Safety Intelligence\nfor Organizations',
    description:
      'Every trip independently reviewed by a certified safety analyst.',
    badgeLabel: 'OVERVIEW',
    badgeIcon: 'shield',
    alt: 'Safetrekr -- Trip safety intelligence platform for schools, churches, and organizations',
  },
  'how-it-works': {
    title: 'How Safetrekr Works:\n4-Phase Trip Safety',
    description:
      'Plan, review, prepare, and travel with confidence. Independent analyst review at every phase.',
    badgeLabel: 'PROCESS',
    badgeIcon: 'process',
    alt: 'Safetrekr process -- Four phases of trip safety management from planning to post-trip review',
  },
  platform: {
    title: 'The Safetrekr Platform:\nDuty of Care Management',
    description:
      'Real-time intelligence, geo-triggered checklists, analyst review, and mobile traveler app.',
    badgeLabel: 'PLATFORM',
    badgeIcon: 'grid',
    alt: 'Safetrekr platform features -- Real-time intelligence and duty of care management dashboard',
  },
  solutions: {
    title: 'Solutions for Every\nOrganization Type',
    description:
      'Trip safety management for K-12 schools, churches, youth sports, higher ed, and businesses.',
    badgeLabel: 'INDUSTRIES',
    badgeIcon: 'building',
    alt: 'Safetrekr solutions -- Trip safety management across schools, churches, youth sports, and businesses',
  },
  pricing: {
    title: 'Pricing -- Per-Trip\nSafety Management',
    description:
      'Independent analyst review included in every tier. Day trips, overnight, and international plans.',
    badgeLabel: 'PRICING',
    badgeIcon: 'bars',
    alt: 'Safetrekr pricing -- Per-trip safety management starting at $450 with analyst review included',
  },
  security: {
    title: 'Security and Compliance',
    description:
      'SOC 2, encryption at rest and in transit, role-based access, and audit logging.',
    badgeLabel: 'SECURITY',
    badgeIcon: 'lock',
    alt: 'Safetrekr security -- SOC 2 compliant platform with encryption, access controls, and audit logging',
  },
  about: {
    title: 'Built by Safety\nProfessionals',
    description:
      'Meet the team behind the platform that keeps every traveler accounted for.',
    badgeLabel: 'TEAM',
    badgeIcon: 'people',
    alt: 'About Safetrekr -- Team of safety professionals, security experts, and technologists',
  },
  contact: {
    title: 'Request a Sample Trip Package',
    description:
      'Request a personalized demo of Safetrekr for your organization.',
    badgeLabel: 'CONNECT',
    badgeIcon: 'arrow',
    alt: 'Contact Safetrekr -- Schedule a personalized safety briefing and platform demo',
  },
  terms: {
    title: 'Terms of Service',
    description:
      'Legal terms governing the use of the Safetrekr trip safety management platform.',
    badgeLabel: 'LEGAL',
    badgeIcon: 'document',
    alt: 'Safetrekr Terms of Service',
  },
  privacy: {
    title: 'Privacy Policy',
    description:
      'How Safetrekr collects, uses, and protects your data.',
    badgeLabel: 'LEGAL',
    badgeIcon: 'shield-check',
    alt: 'Safetrekr Privacy Policy',
  },
} as const satisfies Record<string, OgPageConfig>

export type OgPageKey = keyof typeof OG_PAGE_CONFIGS
