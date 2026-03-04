// src/lib/config/site.ts

/**
 * Site-wide configuration constant.
 *
 * Single source of truth for all SEO-relevant site constants.
 * Every metadata helper, sitemap entry, and structured data object
 * reads from this file. When the domain is resolved, only this
 * file changes.
 */
/** Base path for GitHub Pages subpath hosting. Empty string for root hosting. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''

export const SITE_CONFIG = {
  /** Primary domain with protocol. No trailing slash. */
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.safetrekr.com',

  /** Brand name -- always "Safetrekr" (never camelCase "SafeTrekr") */
  name: 'Safetrekr',

  /** Default meta description (used as fallback when pages omit their own) */
  description:
    'Trip safety management platform for schools, churches, and organizations. Every trip independently reviewed by a certified safety analyst.',

  /** Default tagline appended after pipe in title tags */
  tagline: 'Trip Safety Intelligence',

  /** Social media handles (without @ prefix) */
  social: {
    twitter: 'safetrekr',
    linkedin: 'safetrekr',
  },

  /** Contact email for Organization schema */
  contactEmail: 'hello@safetrekr.com',

  /** Logo URL path (relative to domain, used in structured data) */
  logoPath: `${BASE_PATH}/images/logos/safetrekr-logo-horiz-dark.svg`,

  /** Default OG image path (relative to domain) */
  defaultOgImage: '/og/default.png',

  /** OG image dimensions */
  ogImageDimensions: {
    width: 1200,
    height: 630,
  },

  /** Locale */
  locale: 'en_US',

  /** Language */
  language: 'en',
} as const

export type SiteConfig = typeof SITE_CONFIG
