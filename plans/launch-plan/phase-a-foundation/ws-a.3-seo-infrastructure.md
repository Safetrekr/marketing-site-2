# WS-A.3: SEO Infrastructure

> **Workstream ID:** WS-A.3
> **Phase:** A -- Foundation & Infrastructure
> **Assigned Agent:** `world-class-digital-marketing-lead` (strategy) -> `react-developer` (implementation)
> **Status:** Draft
> **Created:** 2026-03-02
> **Last Updated:** 2026-03-02
> **Depends On:** WS-A.1 (Route Structure -- needs page URLs to define sitemap, canonicals, metadata)
> **Blocks:** Phase B pages (metadata patterns must exist before content pages ship), WS-C.4 (OG Images -- depends on image strategy defined here)
> **Resolves:** Gap 5 (No SEO Infrastructure)

---

## 1. Objective

Establish the complete SEO infrastructure for the Safetrekr marketing site so that every page ships with correct metadata, structured data, canonical URLs, social cards, and crawl directives from day one. This workstream creates the foundational files and helper utilities that all Phase B content pages will consume. No page may reach production without passing through the metadata and structured data patterns defined here.

The target audience -- security directors, safety officers, and risk managers at schools, churches, youth sports organizations, and businesses -- discovers solutions through search. Safetrekr operates in a keyword space with low competition and high commercial intent. Correct technical SEO from launch gives Safetrekr a compounding advantage that is difficult for competitors to replicate retroactively.

This is a strategy and specification workstream. The digital marketing lead defines what the SEO infrastructure must do and why. The react developer implements it. Every specification below is written to be implementable without consulting external documentation.

---

## 2. Scope

### In Scope

| # | Item | Notes |
|---|------|-------|
| 1 | `src/app/robots.ts` | Programmatic robots.txt with allow/disallow rules |
| 2 | `src/app/sitemap.ts` | Dynamic sitemap generation with all marketing page URLs, priorities, and change frequencies |
| 3 | Site configuration constant | `src/lib/config/site.ts` -- single source of truth for domain, brand name, social handles, default metadata |
| 4 | Metadata helper utility | `src/lib/seo/metadata.ts` -- factory function that generates consistent Next.js `Metadata` objects per page |
| 5 | Structured data helpers | `src/lib/seo/structured-data.ts` -- typed functions that produce JSON-LD objects for Organization, BreadcrumbList, SoftwareApplication, Product, FAQPage, HowTo |
| 6 | Structured data component | `src/components/seo/json-ld.tsx` -- server component that renders a `<script type="application/ld+json">` tag |
| 7 | Root layout metadata enhancement | Update `src/app/layout.tsx` metadata export with OG defaults, Twitter card defaults, and canonical base |
| 8 | Marketing layout metadata | Update `src/app/(marketing)/layout.tsx` with Organization JSON-LD injection |
| 9 | Per-page metadata specification | Exact title, description, OG, and structured data for every marketing page defined in this document |
| 10 | OG image strategy | Decision on static vs. dynamic approach, specifications for WS-C.4 to implement |
| 11 | Default OG image | Static fallback image at `public/og/default.png` (1200x630) |

### Out of Scope

| # | Item | Rationale |
|---|------|-----------|
| 1 | Per-page OG image generation (dynamic `opengraph-image.tsx`) | WS-C.4 implements OG image generation using the strategy defined here |
| 2 | Blog/article metadata patterns | WS-D.4 (Blog) will extend the patterns defined here with Article schema |
| 3 | Vertical sub-page metadata | WS-D.1 (Vertical Pages) will add vertical-specific metadata using these helpers |
| 4 | Analytics instrumentation | WS-C.3 handles GA4, Search Console, and event tracking |
| 5 | Performance optimization (LCP, CLS) | Covered by general development practices and WS-C.2 |
| 6 | Link building or off-page SEO | Post-launch marketing activity, not infrastructure |
| 7 | Content writing (titles, descriptions) | This workstream defines the patterns and constraints; WS-B.1 (Content Strategy) provides final copy |
| 8 | Social media profile creation | Marketing operations task outside codebase scope |

---

## 3. Input Dependencies

| Dependency | Source | Status | Notes |
|------------|--------|--------|-------|
| Route structure | WS-A.1 [CODEBASE] | Complete | All 10 marketing page routes defined under `src/app/(marketing)/`. URLs: `/landing`, `/how-it-works`, `/platform`, `/solutions`, `/pricing`, `/security`, `/about`, `/contact`, `/legal/terms`, `/legal/privacy`. Non-marketing routes: `/` (gateway), `/launch` (spatial ZUI), `/login`. |
| Root layout metadata | `src/app/layout.tsx` [CODEBASE] | Available | Currently exports basic `Metadata`: title `"Safetrekr"`, description `"Every traveler accounted for. Trip safety intelligence for schools, churches, and organizations."`, favicon configuration. |
| Login page metadata | `src/app/login/page.tsx` [CODEBASE] | Available | Exports `metadata: { title: 'Welcome to Safetrekr' }`. Pattern to follow: page-level metadata override. |
| Logo assets | `public/images/logos/` [CODEBASE] | Available | `safetrekr-logo-horiz-dark.svg`, `safetrekr-logo-horiz-light.svg`, `safetrekr-mark-dark.svg`, `safetrekr-mark-light.svg`, plus PNG variants. Use for Organization schema `logo` field. |
| Favicon assets | `public/` [CODEBASE] | Available | `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `android-chrome-192x192.png`, `android-chrome-512x512.png`. Already referenced in root layout. |
| Brand colors | `src/styles/spatial-tokens.css` [CODEBASE] | Available | Safetrekr primary green: `#4BA467`. Void background: `#061A23`. Text primary: `#E8F0F4`. These values are needed for OG image generation (WS-C.4) and are documented here for reference. |
| Pricing model | Digital Marketing Review [PLAN] | Available | Per-trip: $450 (T1 Day Trip), $750 (T2 Domestic Overnight), $1,250 (T3 International). Add-ons: $35/background check, $25/traveler insurance. Required for Product structured data on pricing page. |
| Next.js 16 SEO conventions | Framework [EXTERNAL] | Available | App Router natively supports `robots.ts`, `sitemap.ts`, `metadata` exports, `generateMetadata`, and `opengraph-image.tsx`. No third-party SEO packages needed. |
| Domain (Q-8) | Business Owner | **Unresolved** | Assumed `safetrekr.com`. The site config constant abstracts this so changing the domain requires editing one file. See Open Questions. |

---

## 4. Deliverables

### 4.1 Site Configuration (`src/lib/config/site.ts`)

Single source of truth for all SEO-relevant site constants. Every metadata helper, sitemap entry, and structured data object reads from this file. When the domain question (Q-8) is resolved, only this file changes.

```typescript
// src/lib/config/site.ts

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
  logoPath: '/images/logos/safetrekr-logo-horiz-dark.svg',

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
```

**Key design decisions:**

- The `url` field uses `NEXT_PUBLIC_SITE_URL` environment variable with a fallback. This allows preview deployments (Vercel) to use their own domain while production uses the canonical domain.
- The `name` field is the authoritative source for brand spelling. Every other file imports from here.
- The `description` field is the default fallback description. Individual pages must override it with page-specific copy.

### 4.2 Robots Configuration (`src/app/robots.ts`)

Next.js App Router convention: a `robots.ts` file in the app directory auto-generates `/robots.txt`.

```typescript
// src/app/robots.ts

import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/config/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',       // API routes -- no crawlable content
          '/login',      // Authentication page -- no SEO value
          '/launch',     // Spatial ZUI -- client-rendered SPA, not crawlable
          '/spike',      // Dev test harness -- must never be indexed
        ],
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  }
}
```

**Rationale for each disallow rule:**

| Path | Reason |
|------|--------|
| `/api/` | Server-side API routes (AI, districts, receipts, telemetry). No user-facing content. Trailing slash ensures all sub-routes are blocked. |
| `/login` | Authentication page. Not a search entry point. Contains no content worth indexing. |
| `/launch` | Spatial ZUI. Entirely client-rendered (`'use client'`). Search engines cannot meaningfully crawl or index CSS-transform-based spatial interfaces. Users reach it from marketing pages or gateway, never from search. |
| `/spike` | Development test harness page. Must never appear in search results. |

**What is NOT blocked:**

| Path | Reason |
|------|--------|
| `/` (gateway) | Currently the cinematic boot sequence. Allowed because it may become the landing page (Q-11). Blocking it would hurt if the gateway is replaced. The gateway itself is a thin server component shell wrapping a client component, so search engines will see the shell. |
| `/landing` through `/legal/privacy` | All marketing pages. These are the primary SEO targets. |
| `/_next/static/` | Not explicitly blocked. Next.js handles caching headers for static assets. Blocking `_next` is unnecessary and can interfere with resource loading for crawlers that execute JavaScript. |

### 4.3 Sitemap Configuration (`src/app/sitemap.ts`)

Dynamic sitemap generation using Next.js App Router convention.

```typescript
// src/app/sitemap.ts

import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url

  // Static marketing pages with manually assigned priorities.
  // Priority values signal relative importance to crawlers.
  // changeFrequency indicates expected update cadence.
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/landing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/platform`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/security`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/legal/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  return staticPages
}
```

**Priority assignment rationale:**

| Page | Priority | Rationale |
|------|----------|-----------|
| `/landing` | 1.0 | Primary SEO landing page. Highest-value entry point for organic traffic. Targets core keywords: "group travel safety management," "trip safety platform." |
| `/how-it-works` | 0.9 | Key conversion page. Maps to "how does trip safety software work" informational queries. Contains the 4-phase lifecycle that differentiates Safetrekr. |
| `/platform` | 0.9 | Feature overview targeting "duty of care travel management," "travel risk management solution." Core commercial intent page. |
| `/solutions` | 0.9 | Vertical overview page. Gateway to vertical-specific pages (WS-D.1). Targets "school trip safety software," "mission trip safety," etc. |
| `/pricing` | 0.8 | High commercial intent. Buyers searching for "trip safety management pricing" or "group travel safety cost" are near decision stage. |
| `/contact` | 0.8 | Conversion endpoint. "Schedule a briefing" / "request demo" page. High priority because it is the terminal conversion action. |
| `/security` | 0.7 | Trust-building page for the Decision-Making Unit (IT/InfoSec, Legal Counsel). Important but lower search volume than core pages. |
| `/about` | 0.6 | Brand credibility page. Lower direct search value but important for E-E-A-T signals. |
| `/legal/terms` | 0.3 | Legal requirement. Minimal search value. Rarely updated. |
| `/legal/privacy` | 0.3 | Legal requirement. Minimal search value. Rarely updated. |

**Future extension:** When WS-D.1 (Vertical Pages) and WS-D.4 (Blog) ship, this sitemap must be updated to include `/solutions/k12-schools`, `/solutions/churches`, `/solutions/youth-sports`, `/solutions/higher-ed`, `/solutions/businesses`, and all blog post URLs. The blog URLs should be generated dynamically from a content source (CMS or file system). The current implementation is intentionally static and simple.

**Note on the gateway (`/`):** The root URL is intentionally excluded from the sitemap. It currently serves a cinematic boot sequence that is not SEO-optimized content. If Q-11 is resolved in favor of moving the landing page to `/`, then `/landing` should be removed from the sitemap and `/` added at priority 1.0. The `SITE_CONFIG.url` value already provides the base URL without a trailing slash, so adding `{ url: baseUrl, ... }` would represent the homepage.

### 4.4 Metadata Helper Utility (`src/lib/seo/metadata.ts`)

A factory function that generates type-safe Next.js `Metadata` objects with enforced conventions. Every marketing page calls this function instead of manually constructing metadata. This ensures consistency in title format, description length, OG fields, and Twitter card configuration.

```typescript
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
    title: fullTitle,
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
```

**Title tag formula:**

```
{Page-Specific Title} | Safetrekr
```

- Total length target: under 60 characters (including ` | Safetrekr` which is 13 characters, leaving 47 for the page title).
- The page title should lead with the primary keyword or a benefit statement.
- Examples:
  - `Pricing -- Per-Trip Safety Management | Safetrekr` (49 chars)
  - `How It Works -- 4-Phase Trip Safety | Safetrekr` (47 chars)
  - `Platform -- Duty of Care Management | Safetrekr` (47 chars)

**Meta description formula:**

```
{What it is} for {who it's for}. {Key differentiator}. {CTA}.
```

- Length: 130-160 characters. Search engines truncate after approximately 155-160 characters.
- Must include the primary keyword naturally (not stuffed).
- Must end with a call-to-action: "Book a demo," "Learn more," "Compare plans," "Schedule a briefing."
- Must not duplicate another page's description.

### 4.5 Structured Data Helpers (`src/lib/seo/structured-data.ts`)

Typed helper functions that produce JSON-LD objects. Each function returns a plain JavaScript object that the `JsonLd` component serializes into a `<script>` tag.

```typescript
// src/lib/seo/structured-data.ts

import { SITE_CONFIG } from '@/lib/config/site'

// ─── Organization Schema ───────────────────────────────────────────
// Placed on every marketing page via the marketing layout.
// Tells search engines who Safetrekr is as a company.

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}${SITE_CONFIG.logoPath}`,
    description:
      'Enterprise trip safety management platform for organizations that move groups of people.',
    sameAs: [
      `https://www.linkedin.com/company/${SITE_CONFIG.social.linkedin}`,
      `https://twitter.com/${SITE_CONFIG.social.twitter}`,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: SITE_CONFIG.contactEmail,
    },
  }
}

// ─── BreadcrumbList Schema ─────────────────────────────────────────
// Placed on every page to help search engines understand site hierarchy.
// Generates breadcrumb rich results in SERPs.

export interface BreadcrumbItem {
  name: string
  path: string
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_CONFIG.url,
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.name,
        item: `${SITE_CONFIG.url}${item.path}`,
      })),
    ],
  }
}

// ─── SoftwareApplication Schema ────────────────────────────────────
// Placed on the landing page (primary SEO homepage).
// Rich result: shows app category, pricing range, OS support.

export function softwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_CONFIG.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, iOS, Android',
    description:
      'Enterprise trip safety management platform with independent safety analyst review, real-time intelligence, and mobile traveler app.',
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '450',
      highPrice: '1250',
      priceCurrency: 'USD',
      offerCount: '3',
    },
  }
}

// ─── Product Schema with Offers ────────────────────────────────────
// Placed on the pricing page.
// Rich result: shows pricing tiers directly in SERPs.

export function productSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Safetrekr Trip Safety Management',
    description: 'Per-trip safety management with independent analyst review.',
    brand: {
      '@type': 'Brand',
      name: SITE_CONFIG.name,
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Day Trip (T1)',
        price: '450',
        priceCurrency: 'USD',
        description:
          'Single-day trip safety management with route analysis, chaperone coordination, and independent safety review.',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Domestic Overnight (T2)',
        price: '750',
        priceCurrency: 'USD',
        description:
          'Multi-day domestic trip safety management with lodging verification, extended itinerary review, and 24/7 monitoring.',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'International (T3)',
        price: '1250',
        priceCurrency: 'USD',
        description:
          'International trip safety management with country risk intelligence, embassy coordination, and full safety analyst review.',
        availability: 'https://schema.org/InStock',
      },
    ],
  }
}

// ─── FAQPage Schema ────────────────────────────────────────────────
// Placed on any page with an FAQ section (pricing, solutions).
// Rich result: shows expandable Q&A directly in SERPs.

export interface FAQItem {
  question: string
  answer: string
}

export function faqPageSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

// ─── HowTo Schema ─────────────────────────────────────────────────
// Placed on the How It Works page.
// Rich result: shows step-by-step process in SERPs.

export interface HowToStep {
  name: string
  text: string
}

export function howToSchema(steps: HowToStep[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How Safetrekr Works',
    description:
      'A step-by-step overview of how Safetrekr manages trip safety from planning through post-trip reporting.',
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  }
}

// ─── WebPage Schema (for pages without a more specific type) ───────
// Optional enrichment for pages that do not fit other schema types.

export function webPageSchema(options: {
  name: string
  description: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: options.name,
    description: options.description,
    url: `${SITE_CONFIG.url}${options.path}`,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  }
}
```

### 4.6 JSON-LD Component (`src/components/seo/json-ld.tsx`)

A minimal server component that renders structured data into the page `<head>` via Next.js's automatic head management.

```typescript
// src/components/seo/json-ld.tsx

/**
 * Renders one or more JSON-LD structured data blocks as <script> tags.
 *
 * Usage:
 * ```tsx
 * import { JsonLd } from '@/components/seo/json-ld'
 * import { organizationSchema, breadcrumbSchema } from '@/lib/seo/structured-data'
 *
 * export default function PricingPage() {
 *   return (
 *     <>
 *       <JsonLd data={organizationSchema()} />
 *       <JsonLd data={breadcrumbSchema([{ name: 'Pricing', path: '/pricing' }])} />
 *       {/* page content */}
 *     </>
 *   )
 * }
 * ```
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

**Design notes:**

- Server component (no `'use client'`). JSON-LD is static markup that does not need client-side interactivity.
- Uses `dangerouslySetInnerHTML` because this is the standard Next.js pattern for injecting JSON-LD. The data is generated by our own typed functions, not from user input, so XSS risk is zero.
- Each `JsonLd` instance produces one `<script>` tag. Pages with multiple schema types (e.g., pricing page has Organization + BreadcrumbList + Product + FAQPage) render multiple instances.

### 4.7 Root Layout Metadata Enhancement

Update the existing `src/app/layout.tsx` metadata export to include site-wide defaults that individual pages inherit and override.

**Current state** (from codebase):

```typescript
export const metadata: Metadata = {
  title: 'Safetrekr',
  description: 'Every traveler accounted for. Trip safety intelligence for schools, churches, and organizations.',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}
```

**Updated state:**

```typescript
import { SITE_CONFIG } from '@/lib/config/site'

export const metadata: Metadata = {
  // Title template: child pages provide a title, this template wraps it.
  // If a child exports title: 'Pricing', the rendered title becomes 'Pricing | Safetrekr'.
  // The `default` is used when no child provides a title (e.g., the gateway page at /).
  title: {
    template: `%s | ${SITE_CONFIG.name}`,
    default: `${SITE_CONFIG.name} -- ${SITE_CONFIG.tagline}`,
  },

  description: SITE_CONFIG.description,

  // Favicons (unchanged)
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },

  // Site-wide Open Graph defaults
  openGraph: {
    type: 'website',
    siteName: SITE_CONFIG.name,
    locale: SITE_CONFIG.locale,
    images: [
      {
        url: `${SITE_CONFIG.url}${SITE_CONFIG.defaultOgImage}`,
        width: SITE_CONFIG.ogImageDimensions.width,
        height: SITE_CONFIG.ogImageDimensions.height,
        alt: SITE_CONFIG.name,
      },
    ],
  },

  // Site-wide Twitter Card defaults
  twitter: {
    card: 'summary_large_image',
    creator: `@${SITE_CONFIG.social.twitter}`,
    site: `@${SITE_CONFIG.social.twitter}`,
  },

  // Web app manifest
  manifest: undefined, // Add when PWA support is needed

  // Additional meta
  metadataBase: new URL(SITE_CONFIG.url),
}
```

**Key change: `metadataBase`**

Setting `metadataBase` is critical. Next.js uses it to resolve relative OG image URLs into absolute URLs. Without it, OG images may render as relative paths that social platforms cannot fetch. This single line prevents a class of bugs where social cards show broken images.

**Key change: `title.template`**

The `template` pattern means child pages only need to export `title: 'Pricing'` and the root layout automatically wraps it as `Pricing | Safetrekr`. This replaces the manual `fullTitle` construction in `generatePageMetadata` for simple cases. The `generatePageMetadata` helper still constructs the full title explicitly for pages that need fine-grained control (e.g., keyword-optimized titles that differ from the simple pattern).

### 4.8 Marketing Layout Enhancement

Update `src/app/(marketing)/layout.tsx` to inject the Organization JSON-LD on every marketing page. This avoids duplicating the Organization schema in every individual page file.

```typescript
// Addition to src/app/(marketing)/layout.tsx
// (Existing header/footer code from WS-A.1 remains unchanged)

import { JsonLd } from '@/components/seo/json-ld'
import { organizationSchema } from '@/lib/seo/structured-data'

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <a href="#main-content" className={/* skip-to-content styles */}>
        Skip to main content
      </a>
      <MarketingHeader />
      <main id="main-content">
        {children}
      </main>
      <MarketingFooter />
    </>
  )
}
```

### 4.9 Per-Page Metadata Specification

Every marketing page must export metadata using the `generatePageMetadata` helper. Below is the exact specification for each page. Phase B content teams must use these as the starting point and may refine copy, but must not change the structural pattern.

**Important:** The title and description values below are working drafts. WS-B.1 (Content Strategy) may refine them. The structural pattern (helper function, field requirements) is the non-negotiable deliverable of this workstream.

#### Landing Page (`/landing`)

```typescript
// src/app/(marketing)/landing/page.tsx

import { generatePageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import {
  softwareApplicationSchema,
  breadcrumbSchema,
} from '@/lib/seo/structured-data'

export const metadata = generatePageMetadata({
  title: 'Trip Safety Intelligence for Organizations',
  description:
    'Safetrekr manages trip safety for schools, churches, and organizations. Every trip independently reviewed by a certified safety analyst. Book a demo.',
  path: '/landing',
  keywords: [
    'group travel safety management',
    'trip safety platform',
    'travel risk management software',
    'duty of care travel',
  ],
})

// In the page component body:
// <JsonLd data={softwareApplicationSchema()} />
// <JsonLd data={breadcrumbSchema([])} />
// (Empty breadcrumb array = only "Home" breadcrumb item shown)
```

| Field | Value | Char Count |
|-------|-------|------------|
| Title (rendered) | Trip Safety Intelligence for Organizations \| Safetrekr | 56 |
| Description | Safetrekr manages trip safety for schools, churches, and organizations. Every trip independently reviewed by a certified safety analyst. Book a demo. | 151 |
| Structured Data | Organization (via layout), SoftwareApplication, BreadcrumbList | -- |

#### How It Works (`/how-it-works`)

```typescript
export const metadata = generatePageMetadata({
  title: 'How It Works -- 4-Phase Trip Safety',
  description:
    'Plan, review, prepare, and travel with confidence. See how Safetrekr manages every phase of trip safety with independent analyst review. Learn more.',
  path: '/how-it-works',
  keywords: [
    'how trip safety software works',
    'trip safety management process',
    'independent safety review',
  ],
})

// Structured data: Organization (layout), BreadcrumbList, HowTo
// HowTo steps populated from page content (WS-B.3 provides the 4 phases)
```

| Field | Value | Char Count |
|-------|-------|------------|
| Title (rendered) | How It Works -- 4-Phase Trip Safety \| Safetrekr | 49 |
| Description | Plan, review, prepare, and travel with confidence. See how Safetrekr manages every phase of trip safety with independent analyst review. Learn more. | 152 |
| Structured Data | Organization (via layout), BreadcrumbList, HowTo | -- |

#### Platform (`/platform`)

```typescript
export const metadata = generatePageMetadata({
  title: 'Platform -- Duty of Care Management',
  description:
    'Real-time intelligence, geo-triggered checklists, analyst review, and mobile traveler app. The platform built for organizational duty of care. Schedule a briefing.',
  path: '/platform',
  keywords: [
    'duty of care travel management',
    'travel risk management solution',
    'trip safety platform features',
  ],
})

// Structured data: Organization (layout), BreadcrumbList
```

| Field | Value | Char Count |
|-------|-------|------------|
| Title (rendered) | Platform -- Duty of Care Management \| Safetrekr | 49 |
| Description | Real-time intelligence, geo-triggered checklists, analyst review, and mobile traveler app. The platform built for organizational duty of care. Schedule a briefing. | 163 |
| Structured Data | Organization (via layout), BreadcrumbList | -- |

#### Solutions (`/solutions`)

```typescript
export const metadata = generatePageMetadata({
  title: 'Solutions by Industry',
  description:
    'Trip safety management for K-12 schools, churches, youth sports, higher ed, and businesses. See how Safetrekr fits your organization. Compare solutions.',
  path: '/solutions',
  keywords: [
    'school trip safety software',
    'mission trip safety',
    'youth sports travel management',
    'study abroad risk management',
  ],
})

// Structured data: Organization (layout), BreadcrumbList
```

| Field | Value | Char Count |
|-------|-------|------------|
| Title (rendered) | Solutions by Industry \| Safetrekr | 34 |
| Description | Trip safety management for K-12 schools, churches, youth sports, higher ed, and businesses. See how Safetrekr fits your organization. Compare solutions. | 153 |
| Structured Data | Organization (via layout), BreadcrumbList | -- |

#### Pricing (`/pricing`)

```typescript
export const metadata = generatePageMetadata({
  title: 'Pricing -- Per-Trip Safety Management',
  description:
    'Trip safety starting at $450 per trip. Independent analyst review included in every tier. Day trips, overnight, and international plans. Compare pricing.',
  path: '/pricing',
  keywords: [
    'trip safety management pricing',
    'group travel safety cost',
    'per-trip safety management',
  ],
})

// Structured data: Organization (layout), BreadcrumbList, Product (with Offers), FAQPage
// FAQPage items populated from pricing FAQ content (WS-B.5 provides the FAQ copy)
```

| Field | Value | Char Count |
|-------|-------|------------|
| Title (rendered) | Pricing -- Per-Trip Safety Management \| Safetrekr | 51 |
| Description | Trip safety starting at $450 per trip. Independent analyst review included in every tier. Day trips, overnight, and international plans. Compare pricing. | 153 |
| Structured Data | Organization (via layout), BreadcrumbList, Product, FAQPage | -- |

#### Security (`/security`)

```typescript
export const metadata = generatePageMetadata({
  title: 'Security and Compliance',
  description:
    'SOC 2, encryption at rest and in transit, role-based access, and audit logging. See how Safetrekr protects your organization and traveler data. Learn more.',
  path: '/security',
  keywords: [
    'trip safety software security',
    'travel management data security',
    'duty of care compliance',
  ],
})

// Structured data: Organization (layout), BreadcrumbList
```

| Field | Value | Char Count |
|-------|-------|------------|
| Title (rendered) | Security and Compliance \| Safetrekr | 36 |
| Description | SOC 2, encryption at rest and in transit, role-based access, and audit logging. See how Safetrekr protects your organization and traveler data. Learn more. | 155 |
| Structured Data | Organization (via layout), BreadcrumbList | -- |

#### About (`/about`)

```typescript
export const metadata = generatePageMetadata({
  title: 'About Safetrekr',
  description:
    'Built by safety professionals, security experts, and technologists. Meet the team behind the platform that keeps every traveler accounted for.',
  path: '/about',
  keywords: [
    'safetrekr team',
    'trip safety company',
    'travel risk management company',
  ],
})

// Structured data: Organization (layout), BreadcrumbList
```

| Field | Value | Char Count |
|-------|-------|------------|
| Title (rendered) | About Safetrekr \| Safetrekr | 28 |
| Description | Built by safety professionals, security experts, and technologists. Meet the team behind the platform that keeps every traveler accounted for. | 143 |
| Structured Data | Organization (via layout), BreadcrumbList | -- |

#### Contact (`/contact`)

```typescript
export const metadata = generatePageMetadata({
  title: 'Schedule a Briefing',
  description:
    'Request a personalized demo of Safetrekr for your organization. See how independent safety analyst review works for your trips. Schedule a briefing today.',
  path: '/contact',
  keywords: [
    'trip safety demo',
    'safetrekr demo request',
    'schedule safety briefing',
  ],
})

// Structured data: Organization (layout), BreadcrumbList
```

| Field | Value | Char Count |
|-------|-------|------------|
| Title (rendered) | Schedule a Briefing \| Safetrekr | 32 |
| Description | Request a personalized demo of Safetrekr for your organization. See how independent safety analyst review works for your trips. Schedule a briefing today. | 155 |
| Structured Data | Organization (via layout), BreadcrumbList | -- |

#### Terms of Service (`/legal/terms`)

```typescript
export const metadata = generatePageMetadata({
  title: 'Terms of Service',
  description:
    'Safetrekr terms of service. Read our legal terms governing the use of the Safetrekr trip safety management platform.',
  path: '/legal/terms',
  noIndex: false, // Legal pages should be indexable for transparency
})

// Structured data: Organization (layout), BreadcrumbList
// BreadcrumbList: [{ name: 'Legal', path: '/legal/terms' }, { name: 'Terms of Service', path: '/legal/terms' }]
// Note: Since there is no /legal index page, the breadcrumb uses /legal/terms directly.
```

| Field | Value | Char Count |
|-------|-------|------------|
| Title (rendered) | Terms of Service \| Safetrekr | 29 |
| Description | Safetrekr terms of service. Read our legal terms governing the use of the Safetrekr trip safety management platform. | 113 |
| Structured Data | Organization (via layout), BreadcrumbList | -- |

#### Privacy Policy (`/legal/privacy`)

```typescript
export const metadata = generatePageMetadata({
  title: 'Privacy Policy',
  description:
    'Safetrekr privacy policy. Learn how we collect, use, and protect your data on the Safetrekr trip safety management platform.',
  path: '/legal/privacy',
  noIndex: false,
})

// Structured data: Organization (layout), BreadcrumbList
```

| Field | Value | Char Count |
|-------|-------|------------|
| Title (rendered) | Privacy Policy \| Safetrekr | 27 |
| Description | Safetrekr privacy policy. Learn how we collect, use, and protect your data on the Safetrekr trip safety management platform. | 121 |
| Structured Data | Organization (via layout), BreadcrumbList | -- |

### 4.10 OG Image Strategy

**Decision: Hybrid approach -- static default now, dynamic per-page in WS-C.4.**

| Phase | Approach | Timeline |
|-------|----------|----------|
| WS-A.3 (this workstream) | Create one static default OG image at `public/og/default.png`. All pages use this as fallback. | Immediate |
| WS-C.4 (OG Images) | Implement `opengraph-image.tsx` files using Next.js ImageResponse API for per-page dynamic images. | Phase C |

**Default OG Image Specification (`public/og/default.png`):**

| Property | Value |
|----------|-------|
| Dimensions | 1200 x 630 px |
| Format | PNG |
| Background | `#061A23` (Safetrekr void) |
| Visual | Centered Safetrekr logo (horizontal, light variant) over a subtle grid pattern reminiscent of the spatial ZUI. Green accent glow beneath the logo. |
| Text | Tagline below logo: "Trip Safety Intelligence" in Geist Sans, `#E8F0F4`, 32px |
| Bottom bar | `www.safetrekr.com` in Geist Mono, `#929899`, 18px |
| Brand colors used | Background `#061A23`, Primary green `#4BA467` (glow), Text `#E8F0F4`, Secondary text `#929899` |
| File size target | Under 200 KB (optimize with TinyPNG or similar) |

**Per-Page OG Image Specification (for WS-C.4):**

Each dynamic OG image should follow this template:

| Property | Value |
|----------|-------|
| Dimensions | 1200 x 630 px |
| Background | `#061A23` with subtle grid overlay |
| Top-left | Safetrekr logo mark (light, 40px height) |
| Center | Page title in Geist Sans Bold, `#E8F0F4`, 48px, max 2 lines |
| Below title | Page description excerpt in Geist Sans, `#929899`, 24px, max 2 lines |
| Bottom | Green accent line (2px, `#4BA467`) spanning 60% width, centered |
| Bottom-right | `www.safetrekr.com` in Geist Mono, `#929899`, 16px |

**Social card specifications:**

| Platform | Card Type | Image Dimensions | Notes |
|----------|-----------|-----------------|-------|
| LinkedIn | Link preview | 1200 x 630 px | Most important for B2B. Uses OG tags. |
| Twitter/X | summary_large_image | 1200 x 630 px | Falls back to Twitter-specific tags, then OG tags. |
| Facebook | Link preview | 1200 x 630 px | Uses OG tags. |
| Slack | Unfurl preview | 1200 x 630 px | Uses OG tags. |
| iMessage | Link preview | 1200 x 630 px | Uses OG tags. |

All platforms converge on the same 1200x630 image size and OG tag format. The `twitter:card: 'summary_large_image'` directive ensures the large image format on Twitter/X.

### 4.11 Canonical URL Strategy

**Rule:** Every page has exactly one canonical URL. The canonical always points to the `SITE_CONFIG.url` domain.

| Scenario | Canonical URL | Implementation |
|----------|---------------|----------------|
| Marketing page at `/pricing` | `https://www.safetrekr.com/pricing` | Set via `generatePageMetadata({ path: '/pricing' })` which populates `alternates.canonical` |
| Page accessed via Vercel preview URL | Still `https://www.safetrekr.com/pricing` | `SITE_CONFIG.url` is set via `NEXT_PUBLIC_SITE_URL` env var. Production sets this to the canonical domain. Preview deploys may set it differently or rely on the fallback. |
| Page with query parameters (e.g., `?utm_source=linkedin`) | `https://www.safetrekr.com/pricing` (without params) | Next.js canonical tag strips query parameters by default when using `alternates.canonical` with a path. |
| Trailing slash `/pricing/` | `https://www.safetrekr.com/pricing` (no trailing slash) | Next.js App Router does not add trailing slashes by default. If `trailingSlash: true` is ever set in `next.config.ts`, the canonical must be updated. |
| `www` vs non-`www` | `https://www.safetrekr.com` | DNS or hosting-level redirect: non-www redirects to www with 301. Not implemented in code; configured in DNS/Vercel. |
| `http` vs `https` | `https://` always | Enforced by hosting platform (Vercel auto-redirects HTTP to HTTPS). |

**Q-11 impact on canonicals:** If the landing page is eventually moved from `/landing` to `/`, the canonical for that page changes from `https://www.safetrekr.com/landing` to `https://www.safetrekr.com`. This is a one-line change in the page's `generatePageMetadata` call. A 301 redirect from `/landing` to `/` must be added simultaneously to preserve any accumulated link equity.

### 4.12 File Manifest

Complete list of all new files created by this workstream:

| # | File Path | Type | Purpose |
|---|-----------|------|---------|
| 1 | `src/lib/config/site.ts` | Configuration | Site-wide constants: domain, name, social handles, OG defaults |
| 2 | `src/app/robots.ts` | Next.js convention | Generates `/robots.txt` with allow/disallow rules |
| 3 | `src/app/sitemap.ts` | Next.js convention | Generates `/sitemap.xml` with all marketing page URLs |
| 4 | `src/lib/seo/metadata.ts` | Utility | `generatePageMetadata()` factory function for consistent metadata |
| 5 | `src/lib/seo/structured-data.ts` | Utility | Typed helpers for Organization, Breadcrumb, Product, FAQ, HowTo JSON-LD |
| 6 | `src/components/seo/json-ld.tsx` | Server component | Renders `<script type="application/ld+json">` tags |
| 7 | `public/og/default.png` | Static image | Default OG image (1200x630, Safetrekr branding) |

**Files modified by this workstream:**

| # | File Path | Change |
|---|-----------|--------|
| 1 | `src/app/layout.tsx` | Enhanced metadata export: `title.template`, `metadataBase`, OG/Twitter defaults. Import `SITE_CONFIG`. |
| 2 | `src/app/(marketing)/layout.tsx` | Add `JsonLd` component rendering `organizationSchema()`. |
| 3 | Each `src/app/(marketing)/*/page.tsx` (10 files) | Replace basic metadata with `generatePageMetadata()` call. Add page-specific `JsonLd` components for BreadcrumbList and any page-specific schemas. |

**Total new files: 7**
**Total modified files: 12** (root layout + marketing layout + 10 page files)

---

## 5. Acceptance Criteria

| ID | Criterion | Verification Method |
|----|-----------|---------------------|
| AC-1 | `GET /robots.txt` returns a valid robots.txt with `Allow: /`, `Disallow: /api/`, `Disallow: /login`, `Disallow: /launch`, `Disallow: /spike`, and a `Sitemap:` directive pointing to `/sitemap.xml` | `curl http://localhost:3000/robots.txt` in dev server. Verify exact content matches specification. |
| AC-2 | `GET /sitemap.xml` returns valid XML containing all 10 marketing page URLs with correct priorities and changeFrequency values matching Section 4.3 | `curl http://localhost:3000/sitemap.xml` and validate against the specification table. |
| AC-3 | Sitemap does NOT include `/`, `/launch`, `/login`, `/spike`, or `/api/` URLs | Inspect sitemap XML output for absence of non-marketing URLs. |
| AC-4 | Every marketing page renders a `<title>` tag matching the format `{Page Title} \| Safetrekr` with total length under 60 characters | DevTools: inspect `<title>` element on each of the 10 marketing pages. |
| AC-5 | Every marketing page renders a `<meta name="description">` tag with content between 100 and 165 characters that includes a call-to-action | DevTools: inspect meta description on each page. Verify character count and CTA presence. |
| AC-6 | Every marketing page renders a `<link rel="canonical">` tag with the correct absolute URL (domain + path, no trailing slash, no query params) | DevTools: inspect canonical link on each page. |
| AC-7 | Every marketing page renders `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, and `og:site_name` Open Graph tags | DevTools: inspect OG meta tags. All 6 fields must be present on every marketing page. |
| AC-8 | Every marketing page renders `twitter:card` (value: `summary_large_image`), `twitter:title`, `twitter:description`, and `twitter:image` tags | DevTools: inspect Twitter card meta tags on each page. |
| AC-9 | The `og:image` and `twitter:image` values resolve to a valid, loadable PNG image at the specified URL | `curl` the image URL; verify HTTP 200 and `Content-Type: image/png`. |
| AC-10 | The default OG image at `public/og/default.png` is 1200x630 pixels and under 200 KB | Verify with `file` and `identify` commands or image editor. |
| AC-11 | Every marketing page contains at least one `<script type="application/ld+json">` tag with valid JSON | DevTools: inspect script tags. Parse JSON content and verify no syntax errors. |
| AC-12 | Every marketing page's JSON-LD includes an Organization schema with correct `name`, `url`, `logo`, and `contactPoint` fields | Parse the Organization JSON-LD on each page and verify field values match SITE_CONFIG. |
| AC-13 | Every marketing page's JSON-LD includes a BreadcrumbList schema with position 1 as "Home" pointing to the site root | Parse BreadcrumbList JSON-LD on each page. Verify `itemListElement[0]` is Home. |
| AC-14 | The landing page (`/landing`) includes SoftwareApplication JSON-LD with `applicationCategory: "BusinessApplication"` and `offers.lowPrice: "450"` | Parse the SoftwareApplication JSON-LD on `/landing`. |
| AC-15 | The pricing page (`/pricing`) includes Product JSON-LD with three Offer objects at prices 450, 750, and 1250 USD | Parse the Product JSON-LD on `/pricing`. |
| AC-16 | The root layout `metadata` export includes `metadataBase` set to the SITE_CONFIG URL | Code review: verify `metadataBase: new URL(SITE_CONFIG.url)` in `src/app/layout.tsx`. |
| AC-17 | The root layout `metadata` uses `title.template: '%s \| Safetrekr'` so child pages only need to export a plain title string | Code review + manual test: export `title: 'Test'` from a page, verify rendered title is `Test \| Safetrekr`. |
| AC-18 | `SITE_CONFIG.url` reads from `NEXT_PUBLIC_SITE_URL` environment variable with fallback to `https://www.safetrekr.com` | Code review of `src/lib/config/site.ts`. |
| AC-19 | `pnpm typecheck` passes with zero errors after all files are created | CLI: run `pnpm typecheck`. |
| AC-20 | `pnpm lint` passes with zero errors after all files are created | CLI: run `pnpm lint`. |
| AC-21 | `pnpm build` completes successfully and no build warnings reference missing metadata or malformed structured data | CLI: run `pnpm build`. |
| AC-22 | Google Rich Results Test (https://search.google.com/test/rich-results) validates the Organization, BreadcrumbList, and Product JSON-LD on the built site without errors | Run Rich Results Test against the deployed preview URL (Vercel) or a locally served production build. |
| AC-23 | No marketing page has duplicate meta tags (two descriptions, two titles) when inspected in DevTools | Manual inspection of rendered HTML for each page. |
| AC-24 | The `generatePageMetadata` function produces a valid `Metadata` type accepted by Next.js without type errors | Code review + `pnpm typecheck`. |

---

## 6. Decisions Made

| # | Decision | Rationale | Alternatives Considered |
|---|----------|-----------|------------------------|
| D-1 | Use Next.js native SEO conventions (`robots.ts`, `sitemap.ts`, metadata exports) with zero third-party SEO packages | Next.js 16 App Router provides first-class support for all required SEO features. Adding packages like `next-seo` would duplicate built-in functionality, increase bundle size, and create a maintenance burden. The codebase already has zero SEO dependencies [CODEBASE: `package.json`]. | `next-seo` package (redundant with App Router), `next-sitemap` package (overkill for static pages) |
| D-2 | Create a `SITE_CONFIG` constant rather than hardcoding the domain in each file | The domain is unresolved (Q-8). Centralizing it in one file means resolving Q-8 requires changing a single value. Environment variable override enables preview deployments to use their own domain. | Hardcoded domain strings in each file (fragile, error-prone on domain change), Next.js `env.local` only (no fallback, poor DX) |
| D-3 | Create a `generatePageMetadata` helper function rather than leaving each page to construct metadata manually | Enforces consistent title format, description constraints, OG fields, and Twitter card configuration. Prevents the class of bugs where a developer forgets an OG tag or uses the wrong title format. Makes metadata a one-line call in each page file. | Manual metadata objects in each page (error-prone, inconsistent), CMS-driven metadata (over-engineering for static marketing site) |
| D-4 | Inject Organization JSON-LD via the marketing layout rather than in each individual page | Organization schema is identical across all marketing pages. Placing it in the layout avoids 10 instances of identical code. Individual pages add page-specific schemas (Product, FAQ, HowTo) separately. | Per-page Organization schema (duplication), Global layout injection (would also add it to gateway/launch pages where it is less relevant) |
| D-5 | Use `summary_large_image` Twitter card type for all pages | The large image format maximizes visual impact on Twitter/X and LinkedIn. Safetrekr's B2B audience shares content on LinkedIn where link previews with large images get significantly higher engagement. | `summary` card (smaller image, less engaging), per-page card type selection (unnecessary complexity) |
| D-6 | Static default OG image now, dynamic per-page images in WS-C.4 | A static default unblocks all Phase B page development immediately. Dynamic generation requires design work and testing that is better scoped to WS-C.4. Pages use the default until WS-C.4 delivers per-page images. | Dynamic-only (blocks Phase B), No OG images at launch (broken social cards), Manually designed static images per page (does not scale) |
| D-7 | Disallow `/launch` in robots.txt but do NOT add `noindex` meta tag | The spatial ZUI is client-rendered and provides no crawlable text content. Blocking it via robots.txt is sufficient. Adding a `noindex` meta tag would require the crawler to first render the page (defeating the purpose). If `/launch` is later made crawlable, removing the robots.txt rule is simpler than removing an embedded meta tag. | `noindex` meta tag (requires rendering), Both robots.txt and noindex (redundant and conflicting signals), Allow crawling (wastes crawl budget on non-indexable content) |
| D-8 | Exclude the gateway (`/`) from the sitemap but allow it in robots.txt | The gateway is a cinematic experience, not a content page. Including it in the sitemap would signal to search engines that it is an important content page, which it is not. However, blocking it in robots.txt would prevent crawlers from discovering it if Q-11 resolves to keeping the gateway at `/`. Allowing but not prioritizing is the safest default. | Include in sitemap at priority 0.5 (misleading -- it is not content), Block in robots.txt (prevents future flexibility if gateway becomes the homepage) |
| D-9 | Title template uses pipe separator ` \| ` not dash ` -- ` | The pipe is the industry-standard separator for title tags. It is more visually compact than a dash in SERPs, leaving more room for the page-specific portion. Google recognizes both but pipe is more common in SaaS titles. | Dash separator ` -- ` (wider, fewer characters for page title), Colon ` : ` (unusual for SaaS), No separator (no brand name in title) |
| D-10 | Structured data helpers return plain objects, not JSX | Returning plain JavaScript objects keeps the helpers framework-agnostic and testable. The `JsonLd` component handles serialization. This separation allows unit testing schema output without rendering React components. | Return JSX `<script>` tags directly (couples to React), Return JSON strings (requires double-serialization) |

---

## 7. Open Questions

| # | Question | Impact | Owner | Resolution Deadline |
|---|----------|--------|-------|---------------------|
| OQ-1 | What is the production domain? `safetrekr.com`, `www.safetrekr.com`, or something else? (Relates to Q-8 from combined recommendations) | Affects every canonical URL, OG image absolute URL, sitemap URL, and Organization schema URL. Currently defaulting to `https://www.safetrekr.com`. Changing the domain requires updating only `SITE_CONFIG.url` and the `NEXT_PUBLIC_SITE_URL` environment variable. | Business Owner | Before production deployment |
| OQ-2 | Will the landing page eventually move from `/landing` to `/`? (Relates to Q-11 from combined recommendations) | If yes, the sitemap, canonical URL, and breadcrumb schema for the landing page all change. A 301 redirect from `/landing` to `/` must be implemented. The gateway currently at `/` would need to move to `/experience` or similar. This is a manageable migration but must be planned. | Product / Engineering | Before Phase B content is finalized |
| OQ-3 | Are social media profiles (LinkedIn, Twitter/X) already created with the handles `safetrekr`? | The Organization schema and Twitter card tags reference these handles. If the handles differ, `SITE_CONFIG.social` must be updated. If profiles do not exist, the `sameAs` array in Organization schema should omit non-existent URLs. | Marketing / Business Owner | Before this workstream ships |
| OQ-4 | Is the contact email `hello@safetrekr.com` correct for the Organization schema `contactPoint`? | This email appears in structured data and may be surfaced by search engines. Must be a monitored inbox. | Business Owner | Before this workstream ships |
| OQ-5 | Should the pricing page Product schema include `priceValidUntil` dates? | Adding `priceValidUntil` can trigger rich pricing snippets in SERPs but requires maintenance to keep dates current. Omitting it is safer if pricing is stable. | Product / Marketing | Before WS-B.5 (Pricing page) ships |
| OQ-6 | Should the pricing FAQ content be drafted as part of this workstream or deferred to WS-B.5? | The FAQPage schema requires actual question/answer content. This workstream provides the `faqPageSchema` helper and the `JsonLd` component. The actual FAQ items are content, which belongs in WS-B.5. Confirming this boundary ensures no work falls through the cracks. | Engineering Lead | Before implementation begins |

---

## 8. Risk Register

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|------------|--------|------------|
| R-1 | Domain (Q-8) is not resolved before this workstream ships, causing hardcoded `https://www.safetrekr.com` to appear in canonical URLs and structured data | Medium | Medium | `SITE_CONFIG.url` reads from `NEXT_PUBLIC_SITE_URL` env var. Production deployment must set this variable. The fallback domain is reasonable and can be changed in one place. No page-level code references the domain directly. |
| R-2 | The `title.template` pattern in root layout conflicts with non-marketing pages (gateway, launch, login) that need different title formats | Low | Medium | Non-marketing pages can override the template by exporting `title: { absolute: 'My Custom Title' }` instead of a plain string. This is documented Next.js behavior. The login page already uses `title: 'Welcome to Safetrekr'` which would render as `Welcome to Safetrekr \| Safetrekr` (acceptable). The gateway should use `title: { absolute: 'Safetrekr -- Trip Safety Intelligence' }` to bypass the template. |
| R-3 | OG image URLs return 404 because `public/og/default.png` is not created before pages reference it | Medium | High | AC-9 and AC-10 verify image availability. The static image must be created and committed before the metadata changes are merged. If the image is delayed, the fallback is that social cards show no image (degraded but not broken). |
| R-4 | Structured data validation errors (e.g., missing required fields in Product schema) cause Google to ignore rich results | Medium | Medium | AC-22 requires passing Google Rich Results Test before merge. The typed helper functions enforce required fields at the TypeScript level. Schema objects are tested against the Rich Results Test as part of QA. |
| R-5 | `metadataBase` breaks OG image URLs in development because `NEXT_PUBLIC_SITE_URL` is not set locally | Medium | Low | The fallback value `https://www.safetrekr.com` in `SITE_CONFIG.url` ensures `metadataBase` always has a valid value. In development, OG images will point to the production domain (which may not resolve), but this only affects social card testing in dev. Social card testing should use the Vercel preview deployment where the env var is set correctly. |
| R-6 | Phase B content teams ignore the metadata patterns and create inconsistent metadata | Medium | Medium | The `generatePageMetadata` helper is the only sanctioned way to produce metadata for marketing pages. This is documented in the per-page specifications. Code review must verify that Phase B pages use the helper. AC-4, AC-5, and AC-6 enforce format compliance. |
| R-7 | `sitemap.ts` uses `new Date()` for `lastModified`, which means every build generates a new date even if content has not changed | Low | Low | This is acceptable for launch. Search engines use `lastModified` as a hint, not a directive. A more sophisticated approach (reading file modification dates from git) can be implemented post-launch. The current approach ensures the sitemap is always fresh. |
| R-8 | JSON-LD scripts injected via `dangerouslySetInnerHTML` could theoretically be an XSS vector if schema data were derived from user input | Very Low | High | Schema data is generated exclusively by typed helper functions in `src/lib/seo/structured-data.ts` that use hardcoded values from `SITE_CONFIG` and page-level constants. No user input flows into JSON-LD. The `JsonLd` component's `data` prop accepts only `Record<string, unknown>` objects from our own code. |
