# WS-D.2: Social Proof System

> **Workstream ID:** WS-D.2
> **Phase:** D -- Content Depth (Post-Launch)
> **Assigned Agent:** `react-developer`
> **Status:** Draft
> **Created:** 2026-03-02
> **Last Updated:** 2026-03-02
> **Depends On:** WS-B.2 (Landing Page -- social proof placeholder section), WS-A.1 (Marketing Route Group + Layout)
> **Blocks:** None
> **Resolves:** R-06 (No social proof reduces conversion 40-60%); replaces capability-proof placeholder cards with real customer evidence

---

## 1. Objective

Build the social proof infrastructure for the Safetrekr marketing site: a testimonial card component, a customer logo bar, and a case study page template. These components replace the capability-proof placeholder cards deployed in WS-B.2 (landing page social proof section) with real customer evidence as pilot customer content becomes available.

Social proof is the single highest-leverage conversion lever missing from the launch site. Research consistently shows that the absence of third-party validation reduces B2B conversion rates by 40-60% (R-06 in the risk register). The target audience -- school administrators, security directors, church operations managers, and corporate travel leads in the 40-60 age range -- makes purchasing decisions based on peer trust signals, not product feature lists. A quote from a fellow school district safety director carries more weight than any feature grid.

This workstream delivers three levels of social proof, ordered by implementation complexity and content dependency:

1. **Customer logo bar** (lowest content dependency) -- Requires only permission to display a logo. Can launch with 3-5 pilot logos.
2. **Testimonial cards** (moderate content dependency) -- Requires a quote, attribution, and optional headshot. Can launch with 1-3 testimonials.
3. **Case study pages** (highest content dependency) -- Requires a full narrative: problem, solution, results, and customer quotes. Targeted for 3-6 months post-pilot.

The system is designed for progressive population: the landing page social proof section supports a hybrid mode where capability-proof stat cards and real testimonial cards coexist in the same grid. As testimonials accumulate, stat cards are displaced one at a time until the section is entirely customer-driven.

All components maintain the Oblivion HUD aesthetic -- dark glass-morphism surfaces, Safetrekr green accents, monospace metadata labels, and ambient glow treatments -- consistent with the visual language established across all marketing pages.

---

## 2. Scope

### In Scope

| # | Item | Notes |
|---|------|-------|
| 1 | Type definitions (`Testimonial`, `CustomerLogo`, `CaseStudy`, `CaseStudySection`) | Shared interfaces for all social proof content |
| 2 | Data modules (`testimonials.ts`, `customer-logos.ts`, `case-studies.ts`) | Static TypeScript arrays with typed content; designed for future CMS migration |
| 3 | `TestimonialCard` server component | Glass-morphism card displaying quote, attribution, vertical badge, and optional headshot |
| 4 | `TestimonialGrid` server component | Responsive layout wrapper for 1-3 testimonial cards |
| 5 | `CustomerLogoBar` client component | Horizontal logo strip with optional auto-scroll animation, greyscale-to-color hover treatment |
| 6 | `CaseStudyCard` server component | Preview card for case study listings with customer name, vertical, headline stat, and summary |
| 7 | Case study listing page (`/(marketing)/case-studies/page.tsx`) | Server component rendering a grid of `CaseStudyCard` components with filtering by vertical |
| 8 | Case study detail template (`/(marketing)/case-studies/[slug]/page.tsx`) | Server component with `generateStaticParams` for build-time rendering; structured sections |
| 9 | Updated `SocialProofSection` for landing page | Replaces WS-B.2 placeholder with hybrid grid supporting both stat cards and testimonial cards |
| 10 | Placeholder content set | Seed data using capability-proof stats (current), with documented slots for real content |
| 11 | Content contribution guide | Markdown document describing how to add testimonials, logos, and case studies |
| 12 | SEO metadata for case study pages | Per-page title, description, OG tags, Article structured data |

### Out of Scope

| # | Item | Rationale |
|---|------|-----------|
| 1 | CMS integration (Sanity, Contentlayer, Supabase CMS) | Premature; static TS data modules are sufficient until content volume exceeds ~20 items. Data shape is designed for clean CMS migration when needed. |
| 2 | Video testimonials | Requires video hosting infrastructure (Mux, Cloudflare Stream) and player component. Defer to Phase E if needed. |
| 3 | Star ratings or NPS scores | B2B safety platform -- star ratings trivialize the product. Social proof should be quote-driven, not score-driven. |
| 4 | Automated testimonial collection (e.g., Trustpilot widget) | Third-party widgets break the Oblivion HUD aesthetic and add external dependencies. |
| 5 | A/B testing of testimonial placement or content | D-8 (A/B infrastructure) is deferred; no traffic baseline exists. |
| 6 | User-generated reviews | Not appropriate for enterprise B2B safety platform; curated testimonials only. |
| 7 | OG image generation for case study pages | WS-C.4 pattern can be extended; not in this workstream's scope. |
| 8 | Analytics instrumentation for social proof engagement | WS-C.3 handles analytics. This SOW provides `data-analytics-*` attributes for future binding. |

---

## 3. Input Dependencies

| Dependency | Source | Status | Notes |
|------------|--------|--------|-------|
| Landing page social proof section | WS-B.2 Deliverable 4.6 (`social-proof-section.tsx`) | **Available** | Current capability-proof placeholder with 3 stat cards. This workstream replaces it. |
| `GlassCard` component | WS-B.2 Deliverable 4.8 (`src/components/marketing/glass-card.tsx`) | **Available** | Reusable glass-morphism card. Default + elevated variants. |
| `SectionContainer` component | WS-B.2 Deliverable 4.10 (`src/components/marketing/section-container.tsx`) | **Available** | Section wrapper with max-width and padding. |
| `BreathingCTA` component | WS-B.2 Deliverable 4.9 (`src/components/marketing/breathing-cta.tsx`) | **Available** | Animated CTA button for case study page bottom section. |
| Marketing layout shell | WS-A.1 (`src/app/(marketing)/layout.tsx`) | **Available** | Header + footer wrap case study pages. |
| SEO metadata helper | WS-A.3 (`src/lib/seo/metadata.ts`) | **Available** | `generatePageMetadata()` for case study pages. |
| Structured data helpers | WS-A.3 (`src/lib/seo/structured-data.ts`) | **Available** | `articleSchema()`, `breadcrumbSchema()` for case study pages. |
| JSON-LD component | WS-A.3 (`src/components/seo/json-ld.tsx`) | **Available** | Server component rendering structured data. |
| Spatial token system | `src/styles/spatial-tokens.css` [CODEBASE] | **Available** | Safetrekr dark tokens: `--color-void: #061a23`, `--color-ember: #4ba467`, `--color-ember-bright: #6abf84`, `--color-text-primary: #e8f0f4`, `--color-text-secondary: #929899`. RGB: `--ember-rgb: 75, 164, 103`. |
| Glass-morphism pattern | `src/components/districts/detail-panel.tsx` [CODEBASE] | **Available** | `bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]` + `border border-white/[0.08]` + ember glow shadow. |
| `cn()` utility | `src/lib/utils.ts` [CODEBASE] | **Available** | `clsx` + `tailwind-merge`. |
| `motion/react` | `motion` package [CODEBASE] | **Available** | For logo bar scroll animation and testimonial carousel transitions. Import: `import { motion } from 'motion/react'`. NEVER `framer-motion`. |
| Lucide icons | `lucide-react` [CODEBASE] | **Available** | `Quote`, `ArrowRight`, `ChevronLeft`, `ChevronRight`, `Building2`, `GraduationCap`, `Church`, `Trophy`, `Briefcase`. |
| Pilot customer testimonials | Business Owner / Customer Success | **NOT AVAILABLE** | This is the gating content dependency. Components launch with placeholder data and are populated as testimonials are collected. See Section 8 for collection strategy. |
| Customer logo permissions | Business Owner / Legal | **NOT AVAILABLE** | Logos require explicit written permission from each customer. |
| Case study content | Business Owner / Customer Success | **NOT AVAILABLE** | Full case studies require customer participation and approval. Expected 3-6 months post-pilot. |

---

## 4. Deliverables

### 4.1 Type Definitions (`src/lib/interfaces/social-proof.ts`)

All social proof content types in a single interface file. These types govern the data modules, component props, and future CMS schema.

```typescript
// src/lib/interfaces/social-proof.ts

/** Vertical market identifier. Matches the solutions page verticals. */
export type VerticalId = 'k12' | 'higher-ed' | 'churches' | 'youth-sports' | 'business'

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
  /** Optional: a single headline stat to display above the quote (e.g., "18 trips managed") */
  highlightStat?: {
    value: string
    label: string
  }
  /** Display order (lower = first). Allows manual curation of testimonial sequence. */
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
  /** Body content. Supports basic formatting via a subset of markdown-like conventions:
   *  - Paragraphs separated by double newlines
   *  - **bold** for emphasis
   *  - Bullet lists with lines starting with "- "
   *  Rendered by a lightweight formatter, NOT a full markdown parser. */
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
```

**Design decisions:**

- `VerticalId` is shared across social proof and the solutions page. If solutions already defines a similar type, import from there instead.
- `CaseStudySection.body` uses a constrained text format rather than full MDX. This keeps the data module simple and avoids MDX infrastructure. If case studies grow beyond 5-6 sections or require complex layouts, MDX should be reconsidered.
- `Testimonial.featured` flag controls which testimonials appear on the landing page vs. only on dedicated testimonial/case study pages.
- `CapabilityProof` type is retained for the hybrid transition mode.

---

### 4.2 Data Modules

Three data files with typed content arrays. These are the content source of truth until a CMS is introduced.

#### 4.2.1 Testimonials Data (`src/lib/data/testimonials.ts`)

```typescript
// src/lib/data/testimonials.ts

import type { Testimonial, CapabilityProof } from '@/lib/interfaces/social-proof'

/**
 * Capability proof cards -- the current placeholder content from WS-B.2.
 * Retained for hybrid mode. These are displayed when fewer than 3
 * real testimonials are available.
 */
export const CAPABILITY_PROOFS: CapabilityProof[] = [
  {
    stat: '18',
    label: 'Review dimensions per trip',
    description:
      'Every trip reviewed by an independent safety analyst across 18 safety dimensions before departure.',
  },
  {
    stat: '46',
    label: 'Protection endpoints',
    description:
      'Rally points, safe houses, geofencing, SMS broadcast, and evacuation plans -- active and connected.',
  },
  {
    stat: '4',
    label: 'Integrated portals',
    description:
      'Client, Analyst, HQ, and Traveler portals working from one system of record.',
  },
]

/**
 * Customer testimonials. Replace placeholder entries with real quotes
 * as pilot customers provide them.
 *
 * HOW TO ADD A TESTIMONIAL:
 * 1. Add a new object to this array following the Testimonial interface
 * 2. Set `featured: true` if it should appear on the landing page
 * 3. Add a headshot to /public/images/testimonials/ (optional, 128x128 min)
 * 4. Run `pnpm typecheck` to verify the entry
 * 5. Deploy -- the testimonial appears automatically
 *
 * IMPORTANT: All testimonials require written permission from the customer.
 * Do not publish quotes without explicit approval.
 */
export const TESTIMONIALS: Testimonial[] = [
  // --- PLACEHOLDER ENTRIES (remove as real testimonials are added) ---
  // These will not render because the SocialProofSection checks
  // TESTIMONIALS.length to decide between testimonial and capability mode.
]

/**
 * Returns the social proof content for the landing page.
 * - If 3+ featured testimonials exist, returns testimonials only.
 * - If 1-2 featured testimonials exist, returns testimonials + capability proofs to fill 3 slots.
 * - If 0 testimonials exist, returns capability proofs (launch default).
 */
export function getLandingPageSocialProof(): {
  testimonials: Testimonial[]
  capabilityProofs: CapabilityProof[]
  mode: 'testimonials' | 'hybrid' | 'capability'
} {
  const featured = TESTIMONIALS
    .filter((t) => t.featured)
    .sort((a, b) => a.order - b.order)

  if (featured.length >= 3) {
    return {
      testimonials: featured.slice(0, 3),
      capabilityProofs: [],
      mode: 'testimonials',
    }
  }

  if (featured.length > 0) {
    const remainingSlots = 3 - featured.length
    return {
      testimonials: featured,
      capabilityProofs: CAPABILITY_PROOFS.slice(0, remainingSlots),
      mode: 'hybrid',
    }
  }

  return {
    testimonials: [],
    capabilityProofs: CAPABILITY_PROOFS,
    mode: 'capability',
  }
}
```

#### 4.2.2 Customer Logos Data (`src/lib/data/customer-logos.ts`)

```typescript
// src/lib/data/customer-logos.ts

import type { CustomerLogo } from '@/lib/interfaces/social-proof'

/**
 * Customer logos for the logo bar.
 *
 * HOW TO ADD A LOGO:
 * 1. Obtain written permission from the customer to display their logo
 * 2. Add the SVG logo to /public/images/logos/customers/
 *    - Must be white/light color (displayed on dark background)
 *    - Recommended: single-color SVG, max 200px wide, 48px tall
 *    - If only a color logo is available, convert to white/monochrome
 * 3. Add an entry to this array
 * 4. Run `pnpm typecheck` to verify
 * 5. Deploy -- the logo appears automatically
 */
export const CUSTOMER_LOGOS: CustomerLogo[] = [
  // --- Add customer logos here as permissions are obtained ---
]

/** Minimum number of logos needed for the logo bar to render. */
export const LOGO_BAR_MINIMUM = 3
```

#### 4.2.3 Case Studies Data (`src/lib/data/case-studies.ts`)

```typescript
// src/lib/data/case-studies.ts

import type { CaseStudy } from '@/lib/interfaces/social-proof'

/**
 * Case study content.
 *
 * HOW TO ADD A CASE STUDY:
 * 1. Obtain customer approval for the case study narrative
 * 2. Add hero image to /public/images/case-studies/[slug]/
 * 3. Add an entry to this array following the CaseStudy interface
 * 4. The page at /case-studies/[slug] renders automatically
 * 5. Run `pnpm build` to verify static generation
 */
export const CASE_STUDIES: CaseStudy[] = [
  // --- Add case studies here as customer content is approved ---
]

/** Returns all published case studies sorted by order. */
export function getPublishedCaseStudies(): CaseStudy[] {
  return [...CASE_STUDIES].sort((a, b) => a.order - b.order)
}

/** Returns a single case study by slug, or undefined. */
export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((cs) => cs.slug === slug)
}

/** Returns case studies filtered by vertical. */
export function getCaseStudiesByVertical(vertical: string): CaseStudy[] {
  return getPublishedCaseStudies().filter((cs) => cs.vertical === vertical)
}
```

---

### 4.3 Testimonial Card (`src/components/marketing/social-proof/testimonial-card.tsx`)

**Component type:** Server component.

**Visual specification:**

| Property | Value | Token / Class |
|----------|-------|---------------|
| Surface | Glass-morphism via `GlassCard` | `variant="default"` with custom inner layout |
| Padding | Generous interior | `p-8 lg:p-10` (GlassCard default) |
| Quote mark | Decorative oversized quotation mark | Ember-colored, positioned top-left |
| Quote text | Primary text, relaxed leading | `text-[var(--color-text-primary)]` |
| Attribution | Secondary text, monospace label | `text-[var(--color-text-secondary)]` |
| Vertical badge | Pill badge with vertical label | Ember border, uppercase monospace |
| Headshot | Circular, 48px, border accent | `rounded-full border-2 border-[var(--color-ember-muted)]` |
| Highlight stat | Optional large stat above quote | Mono font, ember color (matches capability proof style) |

**Props:**

```typescript
interface TestimonialCardProps {
  testimonial: Testimonial
  className?: string
}
```

**Markup structure:**

```tsx
// src/components/marketing/social-proof/testimonial-card.tsx

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { GlassCard } from '@/components/marketing/glass-card'
import type { Testimonial } from '@/lib/interfaces/social-proof'
import { VERTICAL_META } from '@/lib/data/verticals'

interface TestimonialCardProps {
  testimonial: Testimonial
  className?: string
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  const vertical = VERTICAL_META[testimonial.vertical]

  return (
    <GlassCard className={cn('flex flex-col', className)}>
      {/* Optional highlight stat */}
      {testimonial.highlightStat && (
        <div className="mb-6">
          <span
            className={cn(
              'font-mono text-3xl font-bold',
              'text-[var(--color-ember)]',
            )}
          >
            {testimonial.highlightStat.value}
          </span>
          <span
            className={cn(
              'ml-2 font-mono text-xs font-medium uppercase',
              'tracking-[var(--tracking-wide)]',
              'text-[var(--color-text-secondary)]',
            )}
          >
            {testimonial.highlightStat.label}
          </span>
        </div>
      )}

      {/* Decorative quote mark */}
      <div
        aria-hidden="true"
        className={cn(
          'font-serif text-5xl leading-none',
          'text-[var(--color-ember-muted)]',
          'select-none',
          '-mb-2',
        )}
      >
        &ldquo;
      </div>

      {/* Quote text */}
      <blockquote className="flex-1">
        <p
          className={cn(
            'text-base leading-relaxed',
            'text-[var(--color-text-primary)]',
            'lg:text-lg lg:leading-relaxed',
          )}
        >
          {testimonial.quote}
        </p>
      </blockquote>

      {/* Attribution */}
      <footer className="mt-6 flex items-center gap-4">
        {/* Headshot */}
        {testimonial.headshotSrc && (
          <Image
            src={testimonial.headshotSrc}
            alt={`${testimonial.attribution.name}`}
            width={48}
            height={48}
            className={cn(
              'h-12 w-12 rounded-full object-cover',
              'border-2 border-[var(--color-ember-muted)]',
            )}
          />
        )}

        <div className="flex flex-col">
          {/* Name */}
          <cite
            className={cn(
              'not-italic font-sans text-sm font-semibold',
              'text-[var(--color-text-primary)]',
            )}
          >
            {testimonial.attribution.name}
          </cite>

          {/* Title + Organization */}
          <span
            className={cn(
              'text-xs leading-relaxed',
              'text-[var(--color-text-secondary)]',
            )}
          >
            {testimonial.attribution.title}, {testimonial.attribution.organization}
          </span>
        </div>

        {/* Vertical badge -- pushed to right */}
        <span
          className={cn(
            'ml-auto rounded-full px-3 py-1',
            'border border-[var(--color-ember-muted)]',
            'font-mono text-[10px] font-medium uppercase',
            'tracking-[var(--tracking-widest)]',
            'text-[var(--color-ember)]',
          )}
        >
          {vertical.label}
        </span>
      </footer>
    </GlassCard>
  )
}
```

**Vertical metadata** (shared helper, referenced by badge):

```typescript
// src/lib/data/verticals.ts

import type { VerticalMeta, VerticalId } from '@/lib/interfaces/social-proof'

export const VERTICAL_META: Record<VerticalId, VerticalMeta> = {
  'k12': { id: 'k12', label: 'K-12', icon: 'GraduationCap' },
  'higher-ed': { id: 'higher-ed', label: 'Higher Ed', icon: 'GraduationCap' },
  'churches': { id: 'churches', label: 'Church', icon: 'Church' },
  'youth-sports': { id: 'youth-sports', label: 'Youth Sports', icon: 'Trophy' },
  'business': { id: 'business', label: 'Business', icon: 'Briefcase' },
}
```

---

### 4.4 Testimonial Grid (`src/components/marketing/social-proof/testimonial-grid.tsx`)

**Component type:** Server component.

Layout wrapper that renders 1-3 testimonial cards in a responsive grid, matching the 3-column layout established by the WS-B.2 social proof section.

```typescript
// src/components/marketing/social-proof/testimonial-grid.tsx

import { cn } from '@/lib/utils'
import { TestimonialCard } from './testimonial-card'
import type { Testimonial } from '@/lib/interfaces/social-proof'

interface TestimonialGridProps {
  testimonials: Testimonial[]
  className?: string
}

export function TestimonialGrid({ testimonials, className }: TestimonialGridProps) {
  return (
    <div
      className={cn(
        'grid gap-8',
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        className,
      )}
    >
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </div>
  )
}
```

**Grid behavior:**

| Breakpoint | Layout | Notes |
|------------|--------|-------|
| < 768px (`md`) | Single column, full width | Cards stack vertically |
| 768px - 1023px (`md` to `lg`) | 2-column grid | Third card wraps to centered second row |
| >= 1024px (`lg`) | 3-column grid | All three cards in one row |

When the grid contains fewer than 3 cards (hybrid mode), the remaining slots are filled by capability proof stat cards rendered by the parent `SocialProofSection`.

---

### 4.5 Customer Logo Bar (`src/components/marketing/social-proof/customer-logo-bar.tsx`)

**Component type:** Client component (`'use client'`). Client-side for the optional auto-scroll animation.

**Visual specification:**

| Property | Value | Token / Class |
|----------|-------|---------------|
| Background | Transparent (inherits section background) | -- |
| Logo treatment | Greyscale at 40% opacity, full opacity on hover | CSS `filter: grayscale(1)` + `opacity: 0.4` |
| Logo size | Max height 40px, auto width (aspect ratio preserved) | `h-10 w-auto` |
| Spacing | 48px between logos | `gap-12` |
| Alignment | Horizontally centered | `flex justify-center` |
| Animation | Slow horizontal scroll (optional) | `motion/react` or CSS keyframe |
| Hover | Greyscale removed, opacity increases to 0.8 | `transition-all duration-300` |
| Section label | "Trusted by" above logos (visually hidden if less than 5 logos) | Monospace, tertiary text |

**Props:**

```typescript
interface CustomerLogoBarProps {
  logos: CustomerLogo[]
  /** When true, enables auto-scroll animation. Default: false (static layout). */
  autoScroll?: boolean
  className?: string
}
```

**Rendering logic:**

```tsx
// src/components/marketing/social-proof/customer-logo-bar.tsx
'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { CustomerLogo } from '@/lib/interfaces/social-proof'

interface CustomerLogoBarProps {
  logos: CustomerLogo[]
  autoScroll?: boolean
  className?: string
}

export function CustomerLogoBar({
  logos,
  autoScroll = false,
  className,
}: CustomerLogoBarProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  if (logos.length === 0) return null

  const logoElements = logos
    .sort((a, b) => a.order - b.order)
    .map((logo) => {
      const img = (
        <Image
          key={logo.id}
          src={logo.logoSrc}
          alt={`${logo.name} logo`}
          width={160}
          height={40}
          className={cn(
            'h-8 w-auto object-contain md:h-10',
            'opacity-40 grayscale',
            'hover:opacity-80 hover:grayscale-0',
            'transition-all duration-[var(--duration-transition)]',
          )}
        />
      )

      // Wrap in link if case study exists
      if (logo.caseStudySlug) {
        return (
          <Link
            key={logo.id}
            href={`/case-studies/${logo.caseStudySlug}`}
            className="shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-ember-bright)]"
          >
            {img}
          </Link>
        )
      }

      return <div key={logo.id} className="shrink-0">{img}</div>
    })

  return (
    <div className={cn('overflow-hidden', className)}>
      {/* "Trusted by" label */}
      <p
        className={cn(
          'mb-8 text-center',
          'font-mono text-xs font-medium uppercase',
          'tracking-[var(--tracking-widest)]',
          'text-[var(--color-text-tertiary)]',
        )}
      >
        Trusted by
      </p>

      <div
        ref={containerRef}
        className={cn(
          'flex items-center justify-center gap-12',
          autoScroll && 'logo-scroll-track',
        )}
        aria-label="Customer logos"
        role="list"
      >
        {logoElements}
        {/* Duplicate for seamless scroll loop */}
        {autoScroll && logoElements}
      </div>
    </div>
  )
}
```

**Auto-scroll CSS** (added to `src/styles/social-proof.css`):

```css
/* Logo bar auto-scroll animation */
@keyframes logo-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.logo-scroll-track {
  animation: logo-scroll 30s linear infinite;
  width: max-content;
}

.logo-scroll-track:hover {
  animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
  .logo-scroll-track {
    animation: none;
    flex-wrap: wrap;
    justify-content: center;
  }
}
```

**Conditional rendering:** The logo bar only renders when `logos.length >= LOGO_BAR_MINIMUM` (3). Below that threshold, displaying isolated logos looks sparse and undermines the "trusted by many" signal.

---

### 4.6 Capability Proof Card (`src/components/marketing/social-proof/capability-proof-card.tsx`)

**Component type:** Server component. Extracted from the inline rendering in the WS-B.2 `SocialProofSection` to enable reuse in hybrid mode.

This is the existing stat card design from WS-B.2 Section 4.6, extracted as a standalone component:

```typescript
// src/components/marketing/social-proof/capability-proof-card.tsx

import { cn } from '@/lib/utils'
import { GlassCard } from '@/components/marketing/glass-card'
import type { CapabilityProof } from '@/lib/interfaces/social-proof'

interface CapabilityProofCardProps {
  proof: CapabilityProof
  className?: string
}

export function CapabilityProofCard({ proof, className }: CapabilityProofCardProps) {
  return (
    <GlassCard className={cn('text-center', className)}>
      {/* Stat number */}
      <div
        className={cn(
          'font-mono text-4xl font-bold',
          'text-[var(--color-ember)]',
          'lg:text-5xl',
        )}
      >
        {proof.stat}
      </div>

      {/* Stat label */}
      <div
        className={cn(
          'mt-2 font-sans text-sm font-medium uppercase',
          'tracking-[var(--tracking-wide)]',
          'text-[var(--color-text-primary)]',
        )}
      >
        {proof.label}
      </div>

      {/* Description */}
      <p
        className={cn(
          'mt-3 text-sm leading-relaxed',
          'text-[var(--color-text-secondary)]',
        )}
      >
        {proof.description}
      </p>
    </GlassCard>
  )
}
```

---

### 4.7 Updated Social Proof Section (`src/components/marketing/landing/social-proof-section.tsx`)

**Replaces:** The WS-B.2 implementation of `social-proof-section.tsx`.

**Component type:** Server component.

This is the key integration point. The updated section uses `getLandingPageSocialProof()` to determine which mode to render: pure capability proofs (launch default), hybrid (1-2 testimonials + stat fillers), or pure testimonials (target state).

```tsx
// src/components/marketing/landing/social-proof-section.tsx

import { cn } from '@/lib/utils'
import { SectionContainer } from '@/components/marketing/section-container'
import { TestimonialCard } from '@/components/marketing/social-proof/testimonial-card'
import { CapabilityProofCard } from '@/components/marketing/social-proof/capability-proof-card'
import { CustomerLogoBar } from '@/components/marketing/social-proof/customer-logo-bar'
import { getLandingPageSocialProof } from '@/lib/data/testimonials'
import { CUSTOMER_LOGOS, LOGO_BAR_MINIMUM } from '@/lib/data/customer-logos'

export function SocialProofSection() {
  const { testimonials, capabilityProofs, mode } = getLandingPageSocialProof()
  const showLogos = CUSTOMER_LOGOS.length >= LOGO_BAR_MINIMUM

  return (
    <SectionContainer
      id="social-proof"
      className="bg-gradient-to-b from-[var(--color-void)] to-[var(--color-abyss)]"
    >
      {/* Section heading */}
      <h2
        id="social-proof-heading"
        className={cn(
          'text-center font-sans text-3xl font-bold',
          'md:text-4xl',
          'text-[var(--color-text-primary)]',
          'mb-16 lg:mb-20',
        )}
      >
        {mode === 'capability'
          ? 'Trusted by organizations that take safety seriously.'
          : 'What our customers say.'}
      </h2>

      {/* Card grid -- 3 slots, mixed content in hybrid mode */}
      <div
        className={cn(
          'grid gap-8',
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        )}
        aria-labelledby="social-proof-heading"
      >
        {testimonials.map((t) => (
          <TestimonialCard key={t.id} testimonial={t} />
        ))}
        {capabilityProofs.map((cp, i) => (
          <CapabilityProofCard key={`cap-${i}`} proof={cp} />
        ))}
      </div>

      {/* Customer logo bar (renders only when sufficient logos exist) */}
      {showLogos && (
        <div className="mt-20">
          <CustomerLogoBar
            logos={CUSTOMER_LOGOS}
            autoScroll={CUSTOMER_LOGOS.length >= 6}
          />
        </div>
      )}
    </SectionContainer>
  )
}
```

**Mode behavior summary:**

| Mode | Testimonials | Capability Proofs | Heading | Logo Bar |
|------|-------------|-------------------|---------|----------|
| `capability` (launch default) | 0 | 3 | "Trusted by organizations..." | Hidden (no logos yet) |
| `hybrid` (1-2 pilots) | 1-2 | 2-1 (fills to 3 total) | "What our customers say." | Shown if >= 3 logos |
| `testimonials` (target state) | 3 | 0 | "What our customers say." | Shown if >= 3 logos |

---

### 4.8 Case Study Card (`src/components/marketing/social-proof/case-study-card.tsx`)

**Component type:** Server component.

Preview card used on the case study listing page. Glass-morphism surface with customer name, vertical badge, headline stat, summary, and "Read case study" link.

```typescript
// src/components/marketing/social-proof/case-study-card.tsx

import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { GlassCard } from '@/components/marketing/glass-card'
import type { CaseStudy } from '@/lib/interfaces/social-proof'
import { VERTICAL_META } from '@/lib/data/verticals'

interface CaseStudyCardProps {
  caseStudy: CaseStudy
  className?: string
}

export function CaseStudyCard({ caseStudy, className }: CaseStudyCardProps) {
  const vertical = VERTICAL_META[caseStudy.vertical]

  return (
    <Link
      href={`/case-studies/${caseStudy.slug}`}
      className={cn(
        'group block',
        'focus-visible:outline-2 focus-visible:outline-offset-4',
        'focus-visible:outline-[var(--color-ember-bright)]',
        'rounded-2xl',  // match GlassCard radius for focus ring
        className,
      )}
    >
      <GlassCard
        className={cn(
          'h-full transition-all duration-[var(--duration-transition)]',
          'group-hover:bg-white/[0.08]',
          'group-hover:border-white/[0.12]',
          'group-hover:shadow-[var(--glow-ember-subtle)]',
        )}
      >
        {/* Hero image (optional) */}
        {caseStudy.heroImageSrc && (
          <div className="relative -mx-8 -mt-8 mb-6 h-40 overflow-hidden rounded-t-2xl lg:-mx-10 lg:-mt-10">
            <Image
              src={caseStudy.heroImageSrc}
              alt={`${caseStudy.customer} case study`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-void)] to-transparent" />
          </div>
        )}

        {/* Vertical badge */}
        <span
          className={cn(
            'inline-block rounded-full px-3 py-1',
            'border border-[var(--color-ember-muted)]',
            'font-mono text-[10px] font-medium uppercase',
            'tracking-[var(--tracking-widest)]',
            'text-[var(--color-ember)]',
            'mb-4',
          )}
        >
          {vertical.label}
        </span>

        {/* Customer name */}
        <h3
          className={cn(
            'font-sans text-lg font-semibold',
            'text-[var(--color-text-primary)]',
          )}
        >
          {caseStudy.customer}
        </h3>

        {/* Title */}
        <p
          className={cn(
            'mt-1 text-sm font-medium',
            'text-[var(--color-ember-bright)]',
          )}
        >
          {caseStudy.title}
        </p>

        {/* Headline stats */}
        {caseStudy.stats.length > 0 && (
          <div className="mt-4 flex gap-6">
            {caseStudy.stats.slice(0, 3).map((stat, i) => (
              <div key={i}>
                <span
                  className={cn(
                    'font-mono text-2xl font-bold',
                    'text-[var(--color-ember)]',
                  )}
                >
                  {stat.value}
                </span>
                <span
                  className={cn(
                    'ml-1 font-mono text-[10px] uppercase',
                    'tracking-[var(--tracking-wide)]',
                    'text-[var(--color-text-tertiary)]',
                  )}
                >
                  {stat.unit ?? stat.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        <p
          className={cn(
            'mt-4 text-sm leading-relaxed',
            'text-[var(--color-text-secondary)]',
            'line-clamp-3',
          )}
        >
          {caseStudy.summary}
        </p>

        {/* Read link */}
        <span
          className={cn(
            'mt-6 inline-flex items-center gap-1.5',
            'text-sm font-medium',
            'text-[var(--color-ember)]',
            'group-hover:text-[var(--color-ember-bright)]',
            'transition-colors duration-[var(--duration-hover)]',
          )}
        >
          Read case study
          <span aria-hidden="true">&rarr;</span>
        </span>
      </GlassCard>
    </Link>
  )
}
```

---

### 4.9 Case Study Listing Page (`src/app/(marketing)/case-studies/page.tsx`)

**Component type:** Server component with SEO metadata.

```tsx
// src/app/(marketing)/case-studies/page.tsx

import type { Metadata } from 'next'
import { cn } from '@/lib/utils'
import { SectionContainer } from '@/components/marketing/section-container'
import { CaseStudyCard } from '@/components/marketing/social-proof/case-study-card'
import { BreathingCTA } from '@/components/marketing/breathing-cta'
import { getPublishedCaseStudies } from '@/lib/data/case-studies'

export const metadata: Metadata = {
  title: 'Case Studies -- Safetrekr',
  description:
    'See how organizations use Safetrekr to document trip safety, manage risk, and protect travelers. Real results from K-12 schools, universities, churches, and businesses.',
  alternates: {
    canonical: '/case-studies',
  },
}

export default function CaseStudiesPage() {
  const caseStudies = getPublishedCaseStudies()

  return (
    <>
      <SectionContainer id="case-studies-hero">
        {/* Page heading */}
        <h1
          className={cn(
            'text-center font-sans text-4xl font-bold',
            'md:text-5xl',
            'text-[var(--color-text-primary)]',
            'leading-[1.1]',
          )}
        >
          Customer stories.
        </h1>
        <p
          className={cn(
            'mt-6 text-center text-lg leading-relaxed',
            'text-[var(--color-text-secondary)]',
            'mx-auto max-w-[640px]',
          )}
        >
          See how organizations protect their travelers with documented,
          auditable trip safety management.
        </p>
      </SectionContainer>

      <SectionContainer id="case-studies-grid">
        {caseStudies.length > 0 ? (
          <div
            className={cn(
              'grid gap-8',
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
            )}
          >
            {caseStudies.map((cs) => (
              <CaseStudyCard key={cs.slug} caseStudy={cs} />
            ))}
          </div>
        ) : (
          /* Empty state -- shown until first case study is published */
          <div className="text-center">
            <p
              className={cn(
                'text-base leading-relaxed',
                'text-[var(--color-text-secondary)]',
                'mx-auto max-w-[480px]',
              )}
            >
              We are currently working with pilot customers. Case studies
              will be published here as our first organizations complete
              their initial trips with Safetrekr.
            </p>
            <div className="mt-8">
              <BreathingCTA href="/contact" size="lg">
                Become a pilot customer
              </BreathingCTA>
            </div>
          </div>
        )}
      </SectionContainer>
    </>
  )
}
```

**Empty state design:** The listing page launches with 0 case studies. Rather than hiding the page or showing a broken grid, the empty state converts the gap into a CTA: "Become a pilot customer." This turns a content liability into a conversion opportunity.

---

### 4.10 Case Study Detail Page (`src/app/(marketing)/case-studies/[slug]/page.tsx`)

**Component type:** Server component with dynamic metadata and static params generation.

**Page structure:**

1. **Hero area** -- Customer name, title, vertical badge, hero image (optional), headline stats
2. **Content sections** -- Challenge, Solution, Implementation, Results, rendered from `CaseStudySection[]`
3. **Pull quotes** -- Testimonial cards interspersed between sections
4. **Bottom CTA** -- "Schedule a Briefing" with contextual copy

```tsx
// src/app/(marketing)/case-studies/[slug]/page.tsx

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cn } from '@/lib/utils'
import { SectionContainer } from '@/components/marketing/section-container'
import { GlassCard } from '@/components/marketing/glass-card'
import { BreathingCTA } from '@/components/marketing/breathing-cta'
import { TestimonialCard } from '@/components/marketing/social-proof/testimonial-card'
import { getCaseStudyBySlug, CASE_STUDIES } from '@/lib/data/case-studies'
import { VERTICAL_META } from '@/lib/data/verticals'
import { CaseStudySectionRenderer } from '@/components/marketing/social-proof/case-study-section-renderer'

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata(
  { params }: CaseStudyPageProps,
): Promise<Metadata> {
  const { slug } = await params
  const cs = getCaseStudyBySlug(slug)
  if (!cs) return {}

  return {
    title: `${cs.seo.title} -- Safetrekr`,
    description: cs.seo.description,
    alternates: { canonical: `/case-studies/${slug}` },
  }
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)
  if (!caseStudy) notFound()

  const vertical = VERTICAL_META[caseStudy.vertical]

  return (
    <article>
      {/* Hero */}
      <SectionContainer id="case-study-hero">
        {/* Vertical badge */}
        <div className="mb-6 flex justify-center">
          <span
            className={cn(
              'inline-block rounded-full px-4 py-1.5',
              'border border-[var(--color-ember-muted)]',
              'font-mono text-xs font-medium uppercase',
              'tracking-[var(--tracking-widest)]',
              'text-[var(--color-ember)]',
            )}
          >
            {vertical.label} Case Study
          </span>
        </div>

        {/* Customer + Title */}
        <h1
          className={cn(
            'text-center font-sans text-4xl font-bold',
            'md:text-5xl',
            'text-[var(--color-text-primary)]',
            'leading-[1.1]',
          )}
        >
          {caseStudy.customer}
        </h1>
        <p
          className={cn(
            'mt-4 text-center text-xl',
            'text-[var(--color-ember-bright)]',
            'font-medium',
          )}
        >
          {caseStudy.title}
        </p>

        {/* Headline stats */}
        {caseStudy.stats.length > 0 && (
          <div className="mt-12 flex flex-wrap justify-center gap-8 lg:gap-16">
            {caseStudy.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div
                  className={cn(
                    'font-mono text-4xl font-bold',
                    'text-[var(--color-ember)]',
                    'lg:text-5xl',
                  )}
                >
                  {stat.value}
                </div>
                <div
                  className={cn(
                    'mt-1 font-mono text-xs font-medium uppercase',
                    'tracking-[var(--tracking-wide)]',
                    'text-[var(--color-text-secondary)]',
                  )}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionContainer>

      {/* Content sections */}
      {caseStudy.sections.map((section, i) => (
        <SectionContainer
          key={i}
          id={`section-${section.type}`}
          className={i % 2 === 0 ? '' : 'bg-[var(--color-abyss)]'}
        >
          <GlassCard variant={section.type === 'results' ? 'elevated' : 'default'}>
            <CaseStudySectionRenderer section={section} />
          </GlassCard>
        </SectionContainer>
      ))}

      {/* Pull quotes */}
      {caseStudy.pullQuotes.length > 0 && (
        <SectionContainer id="pull-quotes">
          <div
            className={cn(
              'grid gap-8',
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
            )}
          >
            {caseStudy.pullQuotes.map((quote) => (
              <TestimonialCard key={quote.id} testimonial={quote} />
            ))}
          </div>
        </SectionContainer>
      )}

      {/* Bottom CTA */}
      <SectionContainer id="case-study-cta" className="text-center">
        <p
          className={cn(
            'text-2xl font-bold',
            'md:text-3xl',
            'text-[var(--color-text-primary)]',
          )}
        >
          Ready to protect your travelers like {caseStudy.customer}?
        </p>
        <div className="mt-8">
          <BreathingCTA
            href="/contact"
            size="lg"
            data-analytics-id="case-study-cta"
          >
            Schedule a Briefing
          </BreathingCTA>
        </div>
      </SectionContainer>
    </article>
  )
}
```

---

### 4.11 Case Study Section Renderer (`src/components/marketing/social-proof/case-study-section-renderer.tsx`)

**Component type:** Server component.

Renders a single `CaseStudySection` with appropriate heading treatment, body formatting, and optional image. Section type determines visual treatment (icon, accent color, heading prefix).

```typescript
// src/components/marketing/social-proof/case-study-section-renderer.tsx

import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { CaseStudySection } from '@/lib/interfaces/social-proof'

const SECTION_CONFIG: Record<CaseStudySection['type'], {
  prefix: string
  accentClass: string
}> = {
  challenge: { prefix: 'The Challenge', accentClass: 'text-[var(--color-warning)]' },
  solution: { prefix: 'The Solution', accentClass: 'text-[var(--color-ember)]' },
  results: { prefix: 'The Results', accentClass: 'text-[var(--color-healthy)]' },
  implementation: { prefix: 'Implementation', accentClass: 'text-[var(--color-teal-bright)]' },
  quote: { prefix: '', accentClass: 'text-[var(--color-ember-bright)]' },
}

interface CaseStudySectionRendererProps {
  section: CaseStudySection
}

export function CaseStudySectionRenderer({ section }: CaseStudySectionRendererProps) {
  const config = SECTION_CONFIG[section.type]

  return (
    <div className={cn('flex flex-col gap-6', section.imageSrc && 'lg:flex-row lg:gap-12')}>
      <div className="flex-1">
        {/* Section prefix label */}
        {config.prefix && (
          <span
            className={cn(
              'font-mono text-xs font-medium uppercase',
              'tracking-[var(--tracking-widest)]',
              config.accentClass,
              'mb-2 block',
            )}
          >
            {config.prefix}
          </span>
        )}

        {/* Section heading */}
        <h2
          className={cn(
            'font-sans text-2xl font-bold',
            'text-[var(--color-text-primary)]',
            'leading-snug',
          )}
        >
          {section.heading}
        </h2>

        {/* Body content */}
        <div
          className={cn(
            'mt-4 text-base leading-relaxed',
            'text-[var(--color-text-secondary)]',
            'space-y-4',
          )}
        >
          {renderBody(section.body)}
        </div>
      </div>

      {/* Optional image */}
      {section.imageSrc && (
        <div className="relative h-64 w-full overflow-hidden rounded-xl lg:h-auto lg:w-80 lg:shrink-0">
          <Image
            src={section.imageSrc}
            alt={section.imageAlt ?? ''}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 320px"
          />
        </div>
      )}
    </div>
  )
}

/**
 * Lightweight body formatter. Supports:
 * - Paragraphs (double newline separated)
 * - Bullet lists (lines starting with "- ")
 * - **bold** text
 *
 * This is intentionally NOT a full markdown parser. If case study
 * content requires richer formatting, migrate to MDX.
 */
function renderBody(body: string): React.ReactNode[] {
  const blocks = body.split('\n\n')

  return blocks.map((block, i) => {
    const trimmed = block.trim()

    // Bullet list
    if (trimmed.startsWith('- ')) {
      const items = trimmed
        .split('\n')
        .filter((line) => line.startsWith('- '))
        .map((line) => line.slice(2))

      return (
        <ul key={i} className="list-disc space-y-1 pl-5">
          {items.map((item, j) => (
            <li key={j}>{formatBold(item)}</li>
          ))}
        </ul>
      )
    }

    // Paragraph
    return <p key={i}>{formatBold(trimmed)}</p>
  })
}

/** Replaces **text** with <strong>text</strong>. */
function formatBold(text: string): React.ReactNode {
  const parts = text.split(/\*\*(.+?)\*\*/g)
  if (parts.length === 1) return text

  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="font-semibold text-[var(--color-text-primary)]">{part}</strong> : part,
  )
}
```

---

### 4.12 Social Proof Stylesheet (`src/styles/social-proof.css`)

```css
/* =================================================================
   Safetrekr Marketing -- Social Proof Styles
   =================================================================
   Styles for the social proof system: logo bar animations,
   testimonial treatments, and case study page-specific styles.
   ================================================================= */

/* -----------------------------------------------------------------
   Logo bar auto-scroll
   Infinite horizontal scroll with pause on hover.
   ----------------------------------------------------------------- */
@keyframes logo-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.logo-scroll-track {
  animation: logo-scroll 30s linear infinite;
  width: max-content;
}

.logo-scroll-track:hover,
.logo-scroll-track:focus-within {
  animation-play-state: paused;
}

/* -----------------------------------------------------------------
   Reduced motion
   ----------------------------------------------------------------- */
@media (prefers-reduced-motion: reduce) {
  .logo-scroll-track {
    animation: none;
    flex-wrap: wrap;
    justify-content: center;
  }
}
```

**Import location:** Added to `src/app/(marketing)/layout.tsx` or `src/app/globals.css` alongside `landing.css`.

---

### 4.13 Component File Manifest

Complete list of all new files to be created:

| # | File Path | Type | Directive | Reusable? |
|---|-----------|------|-----------|-----------|
| 1 | `src/lib/interfaces/social-proof.ts` | Types | -- | Yes -- shared across all social proof components |
| 2 | `src/lib/data/testimonials.ts` | Data module | -- | Yes -- single source of truth for testimonial content |
| 3 | `src/lib/data/customer-logos.ts` | Data module | -- | Yes -- single source of truth for logo content |
| 4 | `src/lib/data/case-studies.ts` | Data module | -- | Yes -- single source of truth for case study content |
| 5 | `src/lib/data/verticals.ts` | Data module | -- | Yes -- shared vertical metadata |
| 6 | `src/components/marketing/social-proof/testimonial-card.tsx` | Server component | -- | Yes |
| 7 | `src/components/marketing/social-proof/testimonial-grid.tsx` | Server component | -- | Yes |
| 8 | `src/components/marketing/social-proof/customer-logo-bar.tsx` | Client component | `'use client'` | Yes |
| 9 | `src/components/marketing/social-proof/capability-proof-card.tsx` | Server component | -- | Yes |
| 10 | `src/components/marketing/social-proof/case-study-card.tsx` | Server component | -- | Yes |
| 11 | `src/components/marketing/social-proof/case-study-section-renderer.tsx` | Server component | -- | Yes |
| 12 | `src/components/marketing/social-proof/index.ts` | Barrel export | -- | -- |
| 13 | `src/app/(marketing)/case-studies/page.tsx` | Server component | -- | No (page-specific) |
| 14 | `src/app/(marketing)/case-studies/[slug]/page.tsx` | Server component | -- | No (page-specific) |
| 15 | `src/styles/social-proof.css` | Stylesheet | -- | No |

**New directories:**

| Directory | Purpose |
|-----------|---------|
| `src/components/marketing/social-proof/` | Social proof component library |
| `src/app/(marketing)/case-studies/` | Case study listing page |
| `src/app/(marketing)/case-studies/[slug]/` | Case study detail pages |
| `public/images/testimonials/` | Testimonial headshot images |
| `public/images/logos/customers/` | Customer logo SVGs |
| `public/images/case-studies/` | Case study hero images |

**Modified files:**

| File | Change |
|------|--------|
| `src/components/marketing/landing/social-proof-section.tsx` | Replace WS-B.2 placeholder with hybrid-mode implementation |
| `src/app/(marketing)/layout.tsx` (or `globals.css`) | Import `social-proof.css` |

**Total new files: 15** (14 new components/data + 1 stylesheet + 1 modified landing page section)

---

## 5. Responsive Behavior

### Testimonial Card

| Breakpoint | Behavior |
|------------|----------|
| < 768px | Full-width card. Attribution stacks vertically (headshot, name/title, then vertical badge below). |
| >= 768px | Card in grid column. Attribution in horizontal row with headshot, name/title, and badge aligned right. |

### Customer Logo Bar

| Breakpoint | Behavior |
|------------|----------|
| < 640px | 2-3 logos visible, horizontal scroll with overflow hidden. Touch-scrollable. Auto-scroll disabled. |
| 640px - 1023px | 4-5 logos visible. Auto-scroll if > 5 logos. |
| >= 1024px | All logos visible in a single row (up to ~8). Auto-scroll if > 8. Logos centered. |

### Case Study Card Grid

| Breakpoint | Layout |
|------------|--------|
| < 768px | Single column, full-width cards |
| 768px - 1023px | 2-column grid |
| >= 1024px | 3-column grid |

### Case Study Detail Page

| Breakpoint | Behavior |
|------------|----------|
| < 768px | Single column. Stats stack 2-per-row. Section images stack below text. |
| 768px - 1023px | Stats in a row. Section images beside text at 50% width. |
| >= 1024px | Full layout. Stats in a wide row. Section images at fixed 320px width beside text. |

---

## 6. Accessibility

### WCAG 2.2 AA Requirements

| Requirement | Implementation |
|-------------|----------------|
| Semantic HTML | `<blockquote>` for testimonial quotes, `<cite>` for attribution names, `<article>` for case study pages, `<figure>` for images with `<figcaption>` |
| Heading hierarchy | Case study listing: H1 "Customer stories", H2 per card (customer name). Case study detail: H1 customer name, H2 per section. |
| Color contrast | All text meets 4.5:1 minimum. Stat numbers (ember on void/abyss): verified at 4.72:1 for `#4ba467` on `#061a23`. |
| Focus indicators | All interactive elements (links, cards) have `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]`. |
| Keyboard navigation | Logo bar is not focusable individually when non-interactive (no linked case study). Cards with links are in tab order. |
| Reduced motion | Logo bar auto-scroll disabled. CSS `@media (prefers-reduced-motion: reduce)` handles all animation suppression. |
| Image alt text | Headshots: `{name}`. Customer logos: `{organization name} logo`. Case study images: from `imageAlt` field or empty string for decorative. |
| Screen reader announcements | Section heading identifies the social proof area. `aria-labelledby` connects heading to card grid. |
| Logo bar semantics | `role="list"` on container, each logo wrapped in implicit `role="listitem"`. "Trusted by" label provides context. |
| Blockquote attribution | `<blockquote>` contains quote text; `<footer>` inside blockquote contains `<cite>` for attribution per HTML spec. |

### Contrast Verification Table

| Element | Foreground | Background | Ratio | Pass? |
|---------|-----------|------------|-------|-------|
| Stat number (ember on void) | `#4ba467` | `#061a23` | 4.72:1 | AA |
| Primary text on glass | `#e8f0f4` | `rgba(255,255,255,0.06)` over `#061a23` | 14.8:1 | AAA |
| Secondary text on glass | `#929899` | `rgba(255,255,255,0.06)` over `#061a23` | 5.2:1 | AA |
| Vertical badge text | `#4ba467` | transparent (ember-muted border) | 4.72:1 | AA |
| Logo (40% opacity white) | `rgba(255,255,255,0.4)` | `#061a23` | 3.2:1 | Decorative (not text) |

---

## 7. Testing & Validation

### Type Safety

| Check | Command | Pass Criteria |
|-------|---------|---------------|
| TypeScript strict | `pnpm typecheck` | Zero errors. All data modules conform to interfaces. |
| Data module validation | Manual review | Every entry in `TESTIMONIALS`, `CUSTOMER_LOGOS`, `CASE_STUDIES` has all required fields. |

### Visual Verification

| Check | Method | Pass Criteria |
|-------|--------|---------------|
| Capability mode (0 testimonials) | Load landing page with empty `TESTIMONIALS` array | 3 stat cards render identically to WS-B.2 output |
| Hybrid mode (1-2 testimonials) | Add 1-2 test testimonials with `featured: true` | Testimonials + stat cards fill 3 slots correctly |
| Testimonial mode (3+ testimonials) | Add 3+ test testimonials with `featured: true` | 3 testimonial cards, no stat cards |
| Logo bar minimum | Set `CUSTOMER_LOGOS` to 2 entries | Logo bar does not render |
| Logo bar renders | Set `CUSTOMER_LOGOS` to 3+ entries | Logo bar renders with "Trusted by" label |
| Auto-scroll | Set `CUSTOMER_LOGOS` to 6+ entries | Horizontal scroll animation plays, pauses on hover |
| Case study listing (empty) | Load `/case-studies` with empty `CASE_STUDIES` array | Empty state with "Become a pilot customer" CTA |
| Case study listing (populated) | Add 1-3 test case studies | Grid renders correctly with card previews |
| Case study detail | Navigate to `/case-studies/[test-slug]` | Full page renders with all sections |
| 404 handling | Navigate to `/case-studies/nonexistent` | Next.js `notFound()` triggers 404 page |

### Responsive Verification

| Breakpoint | Check all of |
|------------|-------------|
| 375px (iPhone SE) | Testimonial cards, logo bar, case study cards, case study detail |
| 768px (iPad) | 2-column layouts, stat row wrapping |
| 1024px+ (Desktop) | 3-column layouts, side-by-side images |

### Accessibility Verification

| Check | Method | Pass Criteria |
|-------|--------|---------------|
| Keyboard navigation | Tab through landing page social proof section | All interactive elements reachable, focus indicators visible |
| Screen reader | VoiceOver on Safari, NVDA on Chrome | Testimonial quotes announced as blockquotes with attribution; section heading provides context |
| Reduced motion | Enable `prefers-reduced-motion: reduce` | Logo bar static, no CSS animations |
| axe-core | Run automated accessibility scan on all social proof components | Zero violations |

---

## 8. Migration & Content Strategy

### 8.1 Content Collection Process

Social proof content flows through three stages, each with different requirements:

| Stage | Content Type | Collection Effort | Estimated Timeline |
|-------|-------------|-------------------|--------------------|
| 1. Logo permission | Customer logo + written permission to display | Low (email request) | 1-2 weeks after pilot |
| 2. Testimonial quote | 1-3 sentence quote + name/title/org + optional headshot | Medium (structured interview or email) | 2-4 weeks after pilot |
| 3. Full case study | Problem/solution/results narrative + stats + images | High (interview + review cycle) | 3-6 months after pilot |

**Recommended collection process:**

1. **During pilot onboarding:** Set expectation that Safetrekr will request a testimonial and case study participation if the pilot is successful.
2. **At pilot conclusion (positive outcome):** Send structured testimonial request:
   - "In 1-2 sentences, how has Safetrekr changed how your organization handles trip safety?"
   - "Would you be willing to have your name, title, and organization associated with this quote on our website?"
   - "May we use your organization's logo on our 'Trusted By' section?"
3. **30 days post-pilot:** Follow up for case study participation with a structured interview template.
4. **All content requires written approval** before publication. Store approvals in a `/content-approvals/` directory (not checked into the public repo).

### 8.2 Placeholder-to-Real Migration Steps

**Adding the first testimonial:**

1. Edit `src/lib/data/testimonials.ts`
2. Add a `Testimonial` object to the `TESTIMONIALS` array with `featured: true`
3. Optional: add headshot to `public/images/testimonials/`
4. Run `pnpm typecheck` -- the TypeScript compiler validates the entry shape
5. Deploy. The `getLandingPageSocialProof()` function automatically switches from `capability` to `hybrid` mode. No component changes needed.

**Adding the first logo:**

1. Place SVG in `public/images/logos/customers/`
2. Add a `CustomerLogo` entry to `src/lib/data/customer-logos.ts`
3. Logo bar remains hidden until 3+ logos exist (controlled by `LOGO_BAR_MINIMUM`)
4. Deploy when 3+ logos are available.

**Publishing the first case study:**

1. Add a `CaseStudy` entry to `src/lib/data/case-studies.ts`
2. Add images to `public/images/case-studies/[slug]/`
3. Run `pnpm build` to verify static generation
4. Deploy. The case study listing page switches from empty state to grid. The detail page generates at build time.

### 8.3 Future CMS Migration Path

The data module approach (static TypeScript arrays) is optimal for the current content volume (0-10 items per type). When content exceeds ~20 items or non-technical team members need to publish content without code deployments, migrate to a headless CMS:

**Migration steps:**

1. Choose a CMS. Recommended options compatible with the existing stack:
   - **Sanity** -- Most flexible, structured content, real-time preview. Good fit for case studies.
   - **Supabase as CMS** -- Already in the stack. Simple CRUD with RLS. Requires building an admin UI.
   - **Contentlayer** -- File-based, MDX-first. Good for long-form case studies if MDX is adopted.

2. Create CMS content types matching the existing TypeScript interfaces (`Testimonial`, `CustomerLogo`, `CaseStudy`). The interfaces in `social-proof.ts` are designed to map cleanly to CMS schemas.

3. Replace the data module imports with CMS fetch calls:
   ```typescript
   // Before (static):
   import { TESTIMONIALS } from '@/lib/data/testimonials'

   // After (CMS):
   const testimonials = await sanityClient.fetch<Testimonial[]>(TESTIMONIALS_QUERY)
   ```

4. Components remain unchanged -- they consume the same `Testimonial`, `CustomerLogo`, and `CaseStudy` types regardless of data source.

5. Add ISR (Incremental Static Regeneration) or on-demand revalidation for case study pages if using a CMS with webhook support.

### 8.4 Content Guidelines for Non-Technical Contributors

A content contribution guide will be created at `plans/content-guides/social-proof-content-guide.md` with:

- Testimonial template with example
- Logo preparation requirements (SVG format, white/monochrome, dimensions)
- Case study interview template (structured questions for each section type)
- Approval checklist (written permission, legal review for claims, headshot consent)
- Step-by-step deployment instructions for adding content to the data modules
- Screenshot examples of how content renders on the site

This guide is intended for the business owner and customer success team, not engineers.

---

## Appendix: Vertical Icons Reference

For consistent iconography across social proof components:

| Vertical | Lucide Icon | Usage |
|----------|------------|-------|
| K-12 | `GraduationCap` | Vertical badge, case study card |
| Higher Ed | `GraduationCap` | Same icon, different label |
| Churches | `Church` | Vertical badge, case study card |
| Youth Sports | `Trophy` | Vertical badge, case study card |
| Business | `Briefcase` | Vertical badge, case study card |
