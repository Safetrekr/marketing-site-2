// src/lib/seo/metadata.ts

import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/config/site'

/**
 * Options for generating page-specific metadata.
 * Required fields enforce that no page ships without essential SEO attributes.
 */
export interface PageMetadataOptions {
  /**
   * Page-specific title. Will be formatted as "{title} | Safetrekr".
   * Keep under 50 characters (the " | Safetrekr" suffix adds ~13 chars).
   * Must include the primary keyword for the page.
   */
  title: string

  /**
   * Page-specific meta description.
   * Must be 130-160 characters. Include the target keyword and a CTA.
   * Formula: "{What it is} for {who it's for}. {Key differentiator}. {CTA}."
   */
  description: string

  /**
   * Canonical URL path (without domain). Example: '/pricing'
   * Domain is prepended from SITE_CONFIG.
   */
  path: string

  /**
   * OG image path (without domain). Defaults to SITE_CONFIG.defaultOgImage.
   * When WS-C.4 creates per-page images, update this field.
   * Example: '/og/pricing.png'
   */
  ogImage?: string

  /**
   * Optional OG title override. If omitted, uses the same title.
   * Use when the social share title should differ from the search title.
   * Example: search title might be keyword-optimized, social title more engaging.
   */
  ogTitle?: string

  /**
   * Optional OG description override. If omitted, uses the same description.
   */
  ogDescription?: string

  /**
   * Additional keywords for the page (used in metadata, not as a ranking signal,
   * but useful for internal documentation of target keywords per page).
   */
  keywords?: string[]

  /**
   * Whether this page should be indexed. Defaults to true.
   * Set to false for pages that should not appear in search results.
   */
  noIndex?: boolean
}

/**
 * Generates a complete Next.js Metadata object for a marketing page.
 *
 * Usage in a page file:
 * ```ts
 * import { generatePageMetadata } from '@/lib/seo/metadata'
 *
 * export const metadata = generatePageMetadata({
 *   title: 'Pricing',
 *   description: 'Per-trip safety management starting at $450. Independent analyst review included. Compare plans and book a demo.',
 *   path: '/pricing',
 * })
 * ```
 */
export function generatePageMetadata(options: PageMetadataOptions): Metadata {
  const {
    title,
    description,
    path,
    ogImage,
    ogTitle,
    ogDescription,
    keywords,
    noIndex = false,
  } = options

  const canonicalUrl = `${SITE_CONFIG.url}${path}`
  const fullTitle = `${title} | ${SITE_CONFIG.name}`
  const imageUrl = `${SITE_CONFIG.url}${ogImage || SITE_CONFIG.defaultOgImage}`

  return {
    // Use absolute title to bypass the root layout template (%s | Safetrekr)
    // since we construct the full title ourselves.
    title: { absolute: fullTitle },
    description,
    keywords,

    // Canonical URL
    alternates: {
      canonical: canonicalUrl,
    },

    // Open Graph (critical for LinkedIn sharing in B2B)
    openGraph: {
      type: 'website',
      title: ogTitle || fullTitle,
      description: ogDescription || description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      images: [
        {
          url: imageUrl,
          width: SITE_CONFIG.ogImageDimensions.width,
          height: SITE_CONFIG.ogImageDimensions.height,
          alt: `${title} - ${SITE_CONFIG.name}`,
          type: 'image/png',
        },
      ],
    },

    // Twitter Card (summary_large_image for maximum visual impact)
    twitter: {
      card: 'summary_large_image',
      title: ogTitle || fullTitle,
      description: ogDescription || description,
      images: [imageUrl],
      creator: `@${SITE_CONFIG.social.twitter}`,
      site: `@${SITE_CONFIG.social.twitter}`,
    },

    // Robots directive
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  }
}
