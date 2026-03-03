# WS-B.5: Pricing Page

> **Workstream ID:** WS-B.5
> **Phase:** B -- P0 Content Pages
> **Assigned Agent:** `react-developer`
> **Status:** Draft
> **Created:** 2026-03-02
> **Last Updated:** 2026-03-02
> **Depends On:** WS-A.1 (Marketing Route Group + Layout), WS-B.1 (Content Strategy + Copy Drafting), Gap 9 Resolution (Pricing Confirmation)
> **Blocks:** None
> **Resolves:** Pricing page requirement from combined-recommendations.md

---

## 1. Objective

Build the `/pricing` page for the Safetrekr marketing site -- a conversion-focused page that presents the three per-trip pricing tiers, an enterprise contact option, optional add-ons, a value reframe section, and a collapsible FAQ. The page must eliminate pricing ambiguity, reframe per-trip cost as a fraction of the total trip budget, and address budget objections directly.

This page is a high-commercial-intent entry point. Visitors searching for "trip safety management pricing" or "group travel safety cost" are near the decision stage. The page must answer every pricing question a security director, school administrator, or operations lead would have -- and route them to a briefing if they need a custom conversation.

The page renders as a server component inside the `(marketing)` layout from WS-A.1, with a single client component for the FAQ accordion interaction. All sections use glass-morphism card surfaces, the Safetrekr green accent system, and the spatial token vocabulary. Structured data (Product schema + FAQPage schema) is injected for rich SERP results.

**CRITICAL FLAG:** All dollar amounts in this workstream are **[UNVALIDATED]**. They are working values derived from the product codebase (Q-1, Gap 9). The pricing page MUST NOT go live without explicit business owner confirmation of: (a) per-trip prices for T1, T2, and T3; (b) add-on pricing for background checks and insurance; (c) enterprise model details; and (d) cancellation/refund policy. The free trial question (Q-2) is also unresolved and may require a section addition.

---

## 2. Scope

### In Scope

| # | Item | Notes |
|---|------|-------|
| 1 | `src/app/(marketing)/pricing/page.tsx` page component | Server component with SEO metadata; composes all sections |
| 2 | Pricing data module (`src/lib/data/pricing.ts`) | TypeScript-typed arrays of tiers, features, add-ons, and FAQ items |
| 3 | Type definitions (`src/lib/interfaces/pricing.ts`) | `PricingTier`, `PricingFeature`, `PricingAddOn`, `PricingFAQ` interfaces |
| 4 | `PricingTierCard` server component | Glass-morphism card with tier name, price, tagline, feature list, CTA |
| 5 | `EnterpriseTierCard` server component | Distinct card for enterprise "Contact Sales" tier |
| 6 | `ValueReframeSection` server component | Cost comparison, per-traveler math, incident cost framing |
| 7 | `AddOnsSection` server component | Background checks, insurance integration pricing |
| 8 | `PricingFAQ` client component | Collapsible accordion with 6-8 FAQ items; sole client component on this page |
| 9 | Structured data: Product schema | JSON-LD with three Offer objects for T1, T2, T3 (from WS-A.3 `productSchema()`) |
| 10 | Structured data: FAQPage schema | JSON-LD with all FAQ Q&A pairs (from WS-A.3 `faqPageSchema()`) |
| 11 | Structured data: BreadcrumbList schema | JSON-LD breadcrumb: Home > Pricing |
| 12 | SEO metadata | Page title, description, OpenGraph tags, canonical URL via `generatePageMetadata()` |
| 13 | Responsive behavior | Single-column stack on mobile, 2-column on tablet (2 tiers per row + enterprise below), 4-column on desktop |
| 14 | Accessibility | WCAG 2.2 AA: accordion keyboard navigation, aria-expanded, focus management, 4.5:1 contrast ratios |
| 15 | Bottom CTA section | "Schedule a Briefing" (primary) + "Contact Sales for Volume Pricing" (secondary) |
| 16 | Objection hook section | Inline objection handling: "We cannot afford another line item" reframe |

### Out of Scope

| # | Item | Rationale |
|---|------|-----------|
| 1 | Interactive pricing calculator ("Calculate Your Cost") | Deferred to post-launch (D-5 in combined-recommendations). CTA placeholder renders as disabled button with "Coming Soon" label. |
| 2 | Credit package purchase flow | Enterprise/volume pricing requires sales contact; no self-serve checkout at launch |
| 3 | Payment processing UI | No Stripe checkout integration on the marketing site; handled in the product application |
| 4 | A/B testing of pricing tiers | D-8 deferred; no traffic baseline yet |
| 5 | OG image generation for pricing page | WS-C.4 handles per-page OG images |
| 6 | Analytics instrumentation | WS-C.3 handles analytics events; this SOW documents the events that should be tracked but does not implement them |
| 7 | Currency localization | Single-currency (USD) at launch; i18n deferred (D-11) |
| 8 | Free trial section | Blocked on Q-2 resolution; if trial is confirmed, a section must be added before launch |

---

## 3. Input Dependencies

| Dependency | Source | Status | Notes |
|------------|--------|--------|-------|
| Marketing layout shell | WS-A.1 (`src/app/(marketing)/layout.tsx`) | Pending | Header + footer wrap all marketing pages. Pricing page renders inside `<main id="main-content">`. |
| Approved pricing copy | WS-B.1 Section 4.4.5 | Draft Available | Full copy deck for pricing page: hero, tier cards, value reframe, add-ons, FAQ, objection hook, bottom CTA. All dollar amounts flagged [UNVALIDATED]. |
| SEO metadata helper | WS-A.3 (`src/lib/seo/metadata.ts`) | Pending | `generatePageMetadata()` factory function. Pricing page calls it with title, description, path. |
| Structured data helpers | WS-A.3 (`src/lib/seo/structured-data.ts`) | Pending | `productSchema()`, `faqPageSchema()`, `breadcrumbSchema()` functions. |
| JSON-LD component | WS-A.3 (`src/components/seo/json-ld.tsx`) | Pending | Server component that renders `<script type="application/ld+json">`. |
| Glass-morphism pattern | `src/components/districts/detail-panel.tsx` [CODEBASE] | Available | `bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]` + `border border-white/[0.08]` + ember glow shadow. |
| Spatial token system | `src/styles/spatial-tokens.css` [CODEBASE] | Available | Safetrekr dark tokens: `--color-void: #061a23`, `--color-ember: #4ba467`, `--color-ember-bright: #6abf84`, `--color-text-primary: #e8f0f4`, `--color-text-secondary: #929899`. RGB: `--ember-rgb: 75, 164, 103`. |
| `cn()` utility | `src/lib/utils.ts` [CODEBASE] | Available | `clsx` + `tailwind-merge`. Import: `import { cn } from '@/lib/utils'` |
| `motion/react` | `motion` package [CODEBASE] | Available | For FAQ accordion expand/collapse animation only. Import: `import { motion, AnimatePresence } from 'motion/react'`. NEVER `framer-motion`. |
| Pricing confirmation (Q-1) | Business Owner | **UNVALIDATED** | T1: $450, T2: $750, T3: $1,250. All values are working assumptions from the product codebase. |
| Free trial decision (Q-2) | Business Owner | **UNVALIDATED** | If a free trial exists, the pricing page needs a trial section and the FAQ needs a trial question answered. |
| Add-on pricing | Digital Marketing Review | **UNVALIDATED** | Background checks: $35/check. Insurance: $25/participant. From WS-A.3 input dependencies. |
| Lucide icons | `lucide-react` [CODEBASE] | Available | Thin-stroke icons for tier features: `Check`, `ChevronDown`, `ChevronUp`, `ArrowRight`, `Shield`, `Users`, `Globe`, `Building2`, `Zap` |

---

## 4. Deliverables

### 4.1 Type Definitions (`src/lib/interfaces/pricing.ts`)

```typescript
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
  id: 'day-trip' | 'domestic-overnight' | 'international' | 'enterprise'
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
```

### 4.2 Pricing Data Module (`src/lib/data/pricing.ts`)

This module is the single source of truth for all pricing values displayed on the page. When the business owner confirms pricing (Q-1), only this file changes.

```typescript
// src/lib/data/pricing.ts

import type {
  PricingTier,
  PricingAddOn,
  PricingFAQItem,
} from '@/lib/interfaces/pricing'

// ─── [UNVALIDATED] Flag ──────────────────────────────────────────
// All dollar amounts in this file are working assumptions from the
// product codebase. Business owner must confirm before the pricing
// page goes live. See Q-1 (per-trip prices) and Q-2 (free trial).
// ──────────────────────────────────────────────────────────────────

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'day-trip',
    name: 'Day Trip',
    tagline: 'Local and day travel with structured safety management.',
    priceUsd: 450_00, // [UNVALIDATED] $450/trip
    unit: '/trip',
    highlighted: false,
    ctaLabel: 'Schedule a Briefing',
    ctaHref: '/contact',
    features: [
      { label: '10-step trip planning wizard', included: true },
      { label: 'Independent safety analyst review', included: true },
      { label: 'Document and consent collection', included: true },
      { label: 'Background check tracking', included: true },
      { label: 'Emergency preparedness configuration', included: true },
      { label: 'Safety checklist delivery', included: true },
      { label: 'Full audit trail', included: true },
      { label: 'Lodging review with fire safety', included: false },
      { label: 'Extended intelligence monitoring', included: false },
      { label: 'International destination intelligence', included: false },
    ],
  },
  {
    id: 'domestic-overnight',
    name: 'Domestic Overnight',
    tagline: 'Multi-day domestic travel with extended monitoring.',
    priceUsd: 750_00, // [UNVALIDATED] $750/trip
    unit: '/trip',
    highlighted: true,
    badge: 'Most Popular',
    ctaLabel: 'Schedule a Briefing',
    ctaHref: '/contact',
    features: [
      { label: '10-step trip planning wizard', included: true },
      { label: 'Independent safety analyst review', included: true },
      { label: 'Document and consent collection', included: true },
      { label: 'Background check tracking', included: true },
      { label: 'Emergency preparedness configuration', included: true },
      { label: 'Safety checklist delivery', included: true },
      { label: 'Full audit trail', included: true },
      { label: 'Lodging review with fire safety', included: true },
      { label: 'Extended intelligence monitoring', included: true },
      { label: 'Day-by-day itinerary management', included: true },
      { label: 'Transportation documentation', included: true },
      { label: 'Lodging geofence with safe zone', included: true },
      { label: 'International destination intelligence', included: false },
    ],
  },
  {
    id: 'international',
    name: 'International',
    tagline: 'International travel with full-spectrum safety intelligence.',
    priceUsd: 1250_00, // [UNVALIDATED] $1,250/trip
    unit: '/trip',
    highlighted: false,
    ctaLabel: 'Schedule a Briefing',
    ctaHref: '/contact',
    features: [
      { label: '10-step trip planning wizard', included: true },
      { label: 'Independent safety analyst review', included: true },
      { label: 'Document and consent collection', included: true },
      { label: 'Background check tracking', included: true },
      { label: 'Emergency preparedness configuration', included: true },
      { label: 'Safety checklist delivery', included: true },
      { label: 'Full audit trail', included: true },
      { label: 'Lodging review with fire safety', included: true },
      { label: 'Extended intelligence monitoring', included: true },
      { label: 'Day-by-day itinerary management', included: true },
      { label: 'Transportation documentation', included: true },
      { label: 'Lodging geofence with safe zone', included: true },
      { label: 'International destination intelligence', included: true },
      { label: 'Visa and passport tracking', included: true },
      { label: 'Three-tier evacuation protocols', included: true },
      { label: 'Medical facility directory', included: true },
      { label: 'Senior analyst assignment', included: true },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'High-volume organizations and custom requirements.',
    priceUsd: null,
    unit: '',
    highlighted: false,
    ctaLabel: 'Contact Sales',
    ctaHref: '/contact',
    features: [
      { label: 'Volume pricing', included: true },
      { label: 'Dedicated analyst teams', included: true },
      { label: 'Custom integrations', included: true },
      { label: 'Priority support', included: true },
      { label: 'Custom reporting', included: true },
      { label: 'SSO and provisioning', included: true },
    ],
  },
]

export const PRICING_ADD_ONS: PricingAddOn[] = [
  {
    name: 'Background Checks',
    priceDisplay: '$35/check', // [UNVALIDATED]
    description:
      '5 check types: criminal, sex offender, driving, employment, education. Results tracked in participant compliance matrix.',
    integrationNote: 'Checkr, Sterling, or GoodHire integration',
  },
  {
    name: 'Travel Insurance',
    priceDisplay: '$25/participant', // [UNVALIDATED]
    description:
      'Per-participant travel insurance integrated directly into the trip workflow. Added during Step 9 of the trip wizard.',
  },
]

export const PRICING_FAQ_ITEMS: PricingFAQItem[] = [
  {
    question: 'Is there an annual fee?',
    answer:
      'No. You pay per trip. No minimum commitment. No seat licenses. No annual contracts.',
  },
  {
    question: 'What if we only run 2-3 trips a year?',
    answer:
      'Safetrekr is built for organizations of every size. Per-trip pricing means you pay only when you travel. Organizations with infrequent travel often have the least established safety processes -- which means they have the most to gain.',
  },
  {
    question: 'Can we purchase trip credits in advance?',
    answer:
      'Yes. Credit packages are available for organizations that want volume pricing. Contact sales for details.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'Credit card, check, and wire transfer. Stripe-powered payment processing with receipt generation.',
  },
  {
    question: 'What exactly is included in each tier?',
    answer:
      'Every tier includes the full Safetrekr platform: 10-step trip wizard, independent analyst review, document collection, background check tracking, safety checklists, emergency preparedness, traveler delivery via mobile app, and complete audit trail. Higher tiers add capabilities matched to trip complexity -- lodging review, extended intelligence monitoring, and international documentation tracking.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Contact our team for current trial availability and pilot program options.',
    unresolved: true, // Q-2 unresolved -- update when business owner confirms
  },
  {
    question: 'What happens if I need to cancel a trip?',
    answer:
      'Contact our team for details on our cancellation and rescheduling policy.',
    unresolved: true, // Cancellation policy TBD
  },
  {
    question: 'Do you offer volume discounts?',
    answer:
      'Yes. Organizations running more than 10 trips per year qualify for volume pricing through our Enterprise plan. Contact sales for a custom quote.',
  },
]

// ─── Value Reframe Data ──────────────────────────────────────────

export const VALUE_REFRAME = {
  headline: 'Less than 1% of most trip budgets.',
  comparisons: [
    {
      label: 'Average school field trip cost',
      range: '$200-500 per student',
    },
    {
      label: 'Domestic overnight cost',
      range: '$500-1,500 per traveler',
    },
    {
      label: 'International trip cost',
      range: '$2,000-5,000+ per participant',
    },
  ],
  examples: [
    {
      scenario: '30-person domestic overnight',
      tierPrice: 750, // [UNVALIDATED]
      perTraveler: 25, // $750 / 30
      tierName: 'T2',
    },
    {
      scenario: '20-person international trip',
      tierPrice: 1250, // [UNVALIDATED]
      perTraveler: 62.5, // $1,250 / 20
      tierName: 'T3',
    },
  ],
  closingStatement:
    'Safetrekr is not an expense line. It is the cost of documented accountability.',
} as const
```

### 4.3 Page Component (`src/app/(marketing)/pricing/page.tsx`)

The page is a **server component** for SEO. Only the FAQ accordion uses a client component (`PricingFAQ`). All other sections are server-rendered.

#### File Structure

```
src/app/(marketing)/pricing/
  page.tsx                          -- Page component (server)
src/components/marketing/pricing/
  pricing-tier-card.tsx             -- Individual tier card (server)
  enterprise-tier-card.tsx          -- Enterprise card (server)
  pricing-tier-grid.tsx             -- Grid layout for tier cards (server)
  value-reframe-section.tsx         -- Cost comparison section (server)
  add-ons-section.tsx               -- Add-on services section (server)
  pricing-faq.tsx                   -- Collapsible FAQ accordion (client)
  pricing-hero.tsx                  -- Hero section (server)
  pricing-objection-hook.tsx        -- Inline objection handling (server)
  pricing-bottom-cta.tsx            -- Bottom CTA bar (server)
```

#### Page Component Structure

```typescript
// src/app/(marketing)/pricing/page.tsx

import { generatePageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import {
  productSchema,
  faqPageSchema,
  breadcrumbSchema,
} from '@/lib/seo/structured-data'
import {
  PRICING_TIERS,
  PRICING_FAQ_ITEMS,
  PRICING_ADD_ONS,
  VALUE_REFRAME,
} from '@/lib/data/pricing'
import { PricingHero } from '@/components/marketing/pricing/pricing-hero'
import { PricingTierGrid } from '@/components/marketing/pricing/pricing-tier-grid'
import { ValueReframeSection } from '@/components/marketing/pricing/value-reframe-section'
import { AddOnsSection } from '@/components/marketing/pricing/add-ons-section'
import { PricingFAQ } from '@/components/marketing/pricing/pricing-faq'
import { PricingObjectionHook } from '@/components/marketing/pricing/pricing-objection-hook'
import { PricingBottomCta } from '@/components/marketing/pricing/pricing-bottom-cta'

// ─── SEO Metadata ─────────────────────────────────────────────────

export const metadata = generatePageMetadata({
  title: 'Pricing -- Per-Trip Safety Management',
  description:
    'Per-trip pricing from $450. No annual contracts. Every trip includes independent safety review, intelligence monitoring, and full audit trail. Compare plans.',
  path: '/pricing',
  keywords: [
    'trip safety management pricing',
    'group travel safety cost',
    'school trip safety pricing',
    'travel risk management pricing',
    'per trip safety pricing',
  ],
})

// ─── Page Component ───────────────────────────────────────────────

export default function PricingPage() {
  // Prepare FAQ items for structured data (strip unresolved items)
  const resolvedFaqItems = PRICING_FAQ_ITEMS
    .filter((item) => !item.unresolved)
    .map((item) => ({
      question: item.question,
      answer: item.answer,
    }))

  return (
    <>
      {/* Structured Data */}
      <JsonLd data={productSchema()} />
      <JsonLd data={faqPageSchema(resolvedFaqItems)} />
      <JsonLd data={breadcrumbSchema([{ name: 'Pricing', path: '/pricing' }])} />

      {/* Page Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <PricingHero />

        <PricingTierGrid tiers={PRICING_TIERS} />

        <AddOnsSection addOns={PRICING_ADD_ONS} />

        <ValueReframeSection data={VALUE_REFRAME} />

        <PricingObjectionHook />

        <PricingFAQ items={PRICING_FAQ_ITEMS} />

        <PricingBottomCta />
      </div>
    </>
  )
}
```

### 4.4 Component Specifications

#### 4.4.1 `PricingHero` (Server Component)

**File:** `src/components/marketing/pricing/pricing-hero.tsx`

**Content (from WS-B.1 Section 4.4.5):**

- H1: "Per-trip pricing. No annual contracts."
- H2/subheadline: "Every trip includes independent safety review, real-time intelligence, traveler delivery, and full audit documentation. You pay for what you use."

**Visual specification:**

```
<section> wrapper
  <h1> -- font-sans text-4xl sm:text-5xl lg:text-6xl font-bold
         tracking-tight text-text-primary leading-[1.08]
  <p>  -- max-w-3xl text-lg sm:text-xl text-text-secondary
         leading-relaxed mt-6
```

- No glass card on the hero; dark void background with no decoration.
- `text-center` on all viewport widths.
- `mb-16 sm:mb-20` spacing below the hero to the tier grid.

#### 4.4.2 `PricingTierCard` (Server Component)

**File:** `src/components/marketing/pricing/pricing-tier-card.tsx`

**Props:**

```typescript
interface PricingTierCardProps {
  tier: PricingTier
}
```

**Visual specification -- Glass-morphism tier card:**

The card uses the exact glass material recipe from `detail-panel.tsx`, with the following layers:

```
Outer wrapper: <div>
  cn(
    // Glass material (from detail-panel.tsx)
    'rounded-2xl p-8',
    'bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]',
    'border border-white/[0.08]',

    // Base shadow
    'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_0_1px_0_rgba(var(--ember-rgb),0.3),0_0_24px_rgba(var(--ember-rgb),0.1)]',

    // Highlighted tier gets stronger glow + slightly brighter background
    tier.highlighted && [
      'bg-white/[0.08]',
      'border-[rgba(var(--ember-rgb),0.3)]',
      'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_0_2px_0_rgba(var(--ember-rgb),0.4),0_0_32px_rgba(var(--ember-rgb),0.15)]',
    ],

    // Flex column for internal layout
    'flex flex-col',
  )
```

**Internal layout:**

```
[Badge] -- Only if tier.badge is set. Positioned above tier name.
  <span> -- inline-flex px-3 py-1 rounded-full text-xs font-mono
            uppercase tracking-widest
            bg-[rgba(var(--ember-rgb),0.15)]
            text-ember-bright
            border border-[rgba(var(--ember-rgb),0.25)]

[Tier Name]
  <h3> -- text-xl font-bold text-text-primary tracking-tight

[Price Display]
  <div> -- flex items-baseline gap-1 mt-4
    <span> -- text-5xl font-bold text-text-primary tabular-nums
              "$450" (formatted from priceUsd / 100)
    <span> -- text-base text-text-secondary "/trip"

[Tagline]
  <p> -- text-sm text-text-secondary mt-3

[Divider]
  <div> -- h-px bg-gradient-to-r from-transparent
            via-white/[0.08] to-transparent my-6

[Feature List]
  <ul> -- space-y-3 flex-1
    <li> for each feature:
      <div> -- flex items-start gap-3
        IF included:
          <Check> icon -- h-4 w-4 text-ember-bright mt-0.5 shrink-0
          <span> -- text-sm text-text-primary
        IF NOT included:
          <Check> icon -- h-4 w-4 text-text-ghost mt-0.5 shrink-0
          <span> -- text-sm text-text-ghost line-through

[CTA Button]
  <a> -- mt-8 block
    // Primary button for highlighted tier:
    cn(
      'w-full py-3 px-6 rounded-xl text-center text-sm font-semibold',
      'transition-all duration-200',
      tier.highlighted
        ? 'bg-ember text-void hover:bg-ember-bright'
        : 'bg-white/[0.06] text-text-primary border border-white/[0.08] hover:bg-white/[0.1]',
    )
```

**Highlighted tier CTA button color note:** The `bg-ember` token resolves to `#4ba467` (Safetrekr green) via the spatial token system. For conversion emphasis, the highlighted tier CTA uses amber (`#F59E0B`) per the holistic overview Section 6 note about amber for conversion. Implement as:

```
tier.highlighted
  ? 'bg-amber-500 text-void hover:bg-amber-400 font-bold'
  : 'bg-white/[0.06] text-text-primary border border-white/[0.08] hover:bg-white/[0.1]'
```

This is the ONE element on the pricing page that uses amber instead of green -- consistent with the "Get Started" district capsule convention where amber signals conversion action.

**Accessibility:**

- The entire feature list is an `<ul>` with `role="list"`.
- Each feature `<li>` uses `aria-label` to include the included/excluded state: `aria-label="10-step trip planning wizard, included"` or `aria-label="International destination intelligence, not included"`.
- The CTA is an `<a>` tag (not a button) because it navigates to `/contact`.

#### 4.4.3 `EnterpriseTierCard` (Server Component)

**File:** `src/components/marketing/pricing/enterprise-tier-card.tsx`

Distinct from standard tier cards. Uses the same glass-morphism base but with a different price display area.

**Price area replacement:**

```
Instead of "$1,250 /trip":
  <span> -- text-2xl font-bold text-text-primary
            "Custom Pricing"
  <p> -- text-sm text-text-secondary mt-2
         "Volume pricing, dedicated analyst teams, custom
          integrations, and priority support."
```

**CTA:** "Contact Sales" -- uses the green-bordered outline style (not amber, not filled).

#### 4.4.4 `PricingTierGrid` (Server Component)

**File:** `src/components/marketing/pricing/pricing-tier-grid.tsx`

**Props:**

```typescript
interface PricingTierGridProps {
  tiers: PricingTier[]
}
```

**Layout specification:**

```
<section> wrapper -- mt-12
  <div> grid
    // Mobile: single column stack
    // Tablet (sm): 2 columns (T1+T2 top row, T3+Enterprise bottom)
    // Desktop (lg): 4 columns, equal width
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"

  Render first 3 tiers with PricingTierCard.
  Render enterprise tier with EnterpriseTierCard.

  // The highlighted tier (T2 Domestic Overnight) gets a slight
  // vertical offset to draw the eye:
  // On lg screens, the highlighted tier card gets -translate-y-2
```

**Highlighted tier prominence:** On desktop (lg+), the highlighted card receives `lg:-translate-y-2` to lift it visually above its siblings, drawing the eye to the recommended tier.

#### 4.4.5 `ValueReframeSection` (Server Component)

**File:** `src/components/marketing/pricing/value-reframe-section.tsx`

This is the most conversion-critical section on the page. It reframes the per-trip cost as negligible relative to trip budgets and catastrophic relative to incident costs.

**Props:**

```typescript
interface ValueReframeSectionProps {
  data: typeof VALUE_REFRAME
}
```

**Layout:**

```
<section> -- mt-24 sm:mt-32

  [Section H2]
  <h2> -- text-3xl sm:text-4xl font-bold text-text-primary text-center
          "Less than 1% of most trip budgets."

  [Comparison Grid] -- glass card
  <div> -- glass-morphism card (same recipe as tier cards)
           mt-12 p-8 sm:p-12

    [Trip Cost Comparisons] -- 3 items in a row (mobile: stacked)
    <div> -- grid grid-cols-1 sm:grid-cols-3 gap-8

      For each comparison:
        <div>
          <p> -- text-xs font-mono uppercase tracking-widest
                 text-text-secondary
                 "{label}"
          <p> -- text-2xl font-bold text-text-primary mt-2
                 "{range}"

    [Divider]
    <div> -- h-px bg-gradient-to-r from-transparent
              via-white/[0.08] to-transparent my-8

    [Per-Traveler Examples]
    <div> -- grid grid-cols-1 sm:grid-cols-2 gap-8

      For each example:
        <div> -- glass card (lighter: bg-white/[0.04])
                 rounded-xl p-6
          <p> -- text-sm text-text-secondary
                 "{scenario}"
          <p> -- text-lg font-bold text-ember-bright mt-2
                 "${perTraveler} per traveler" [UNVALIDATED]
          <p> -- text-xs text-text-tertiary mt-1
                 "${tierPrice} {tierName} / {group size} travelers"

    [Incident Cost Comparison]
    <div> -- mt-8 text-center
      <p> -- text-sm text-text-secondary
             "Compare: legal consultation starts at $300/hour.
              A single liability claim can exceed six figures.
              Insurance premium increases after an incident
              are permanent."

    [Closing Statement]
    <p> -- text-lg text-text-primary font-semibold text-center mt-8
           "{closingStatement}" -- from VALUE_REFRAME
```

**All dollar amounts in this section carry the [UNVALIDATED] flag.** The per-traveler calculations are derived from the working tier prices and assumed group sizes. Both inputs require business owner confirmation.

#### 4.4.6 `AddOnsSection` (Server Component)

**File:** `src/components/marketing/pricing/add-ons-section.tsx`

**Props:**

```typescript
interface AddOnsSectionProps {
  addOns: PricingAddOn[]
}
```

**Layout:**

```
<section> -- mt-24

  <h2> -- text-2xl sm:text-3xl font-bold text-text-primary text-center
          "Optional add-ons."

  <p> -- text-text-secondary text-center mt-4 max-w-2xl mx-auto
         "Priced per unit. Added during trip creation."

  <div> -- grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12
           max-w-3xl mx-auto

    For each add-on:
      <div> -- glass card (bg-white/[0.06] backdrop-blur-[16px]
               border border-white/[0.08] rounded-2xl p-6)

        <div> -- flex items-center justify-between
          <h3> -- text-lg font-bold text-text-primary
                  "{name}"
          <span> -- text-lg font-mono font-bold text-ember-bright
                    "{priceDisplay}" [UNVALIDATED]

        <p> -- text-sm text-text-secondary mt-3
               "{description}"

        IF integrationNote:
          <p> -- text-xs font-mono text-text-tertiary mt-2
                 "{integrationNote}"
```

#### 4.4.7 `PricingFAQ` (Client Component)

**File:** `src/components/marketing/pricing/pricing-faq.tsx`

This is the **sole client component** on the pricing page. It manages accordion open/close state and keyboard interaction.

**Directive:** `'use client'`

**Props:**

```typescript
interface PricingFAQProps {
  items: PricingFAQItem[]
}
```

**State:**

```typescript
const [openIndex, setOpenIndex] = useState<number | null>(null)

function toggleItem(index: number) {
  setOpenIndex((prev) => (prev === index ? null : index))
}
```

Only one FAQ item is open at a time (accordion pattern, not disclosure group). Opening a new item closes the previously open one.

**Layout:**

```
<section> -- mt-24 sm:mt-32

  <h2> -- text-2xl sm:text-3xl font-bold text-text-primary text-center
          "Frequently asked questions."

  <div> -- mt-12 max-w-3xl mx-auto space-y-4

    For each item (index):
      <div> -- glass card (bg-white/[0.04] border border-white/[0.06]
               rounded-xl overflow-hidden)

        <button> -- FAQ trigger
          cn(
            'w-full flex items-center justify-between',
            'px-6 py-5 text-left',
            'text-text-primary text-base font-medium',
            'hover:bg-white/[0.04]',
            'transition-colors duration-150',
            'focus-visible:outline-2 focus-visible:outline-offset-[-2px]',
            'focus-visible:outline-[var(--color-ember-bright)]',
          )
          onClick={() => toggleItem(index)}
          aria-expanded={openIndex === index}
          aria-controls={`faq-answer-${index}`}
          id={`faq-question-${index}`}

          <span>{item.question}</span>
          <ChevronDown> icon
            cn(
              'h-5 w-5 shrink-0 text-text-secondary',
              'transition-transform duration-200',
              openIndex === index && 'rotate-180',
            )

        <AnimatePresence>
          {openIndex === index && (
            <motion.div
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-5 text-sm text-text-secondary leading-relaxed">
                {item.answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
```

**Keyboard accessibility:**

- `Enter` or `Space` on a trigger button toggles the item.
- `aria-expanded` reflects the open/closed state.
- `aria-controls` connects the button to its content panel.
- `role="region"` + `aria-labelledby` on the content panel.
- Focus ring: `focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--color-ember-bright)]` -- green ring, inset 2px to avoid clipping on rounded corners.
- Tab order is natural (each trigger button is in document order).

**Animation:**

- Uses `motion/react` `AnimatePresence` for height animation on expand/collapse.
- Duration: `200ms` with the standard `ease-default` curve from spatial-tokens: `cubic-bezier(0.4, 0, 0.2, 1)`.
- Content fades in with opacity alongside the height transition.

**Unresolved items:** FAQ items with `unresolved: true` are still rendered (to show the visitor that the topic is addressed) but with a softer answer that routes to the sales team. They are excluded from the FAQPage structured data (see page component, Section 4.3).

#### 4.4.8 `PricingObjectionHook` (Server Component)

**File:** `src/components/marketing/pricing/pricing-objection-hook.tsx`

**Content (from WS-B.1):**

> "We cannot afford another line item."
>
> What does one unmanaged incident cost your organization? Legal consultation starts at $300/hour. A single liability claim can exceed six figures. Insurance premium increases after an incident are permanent. Safetrekr costs less per traveler than a meal at the hotel.

**Layout:**

```
<section> -- mt-24

  <div> -- glass card (bg-white/[0.04] border border-white/[0.06]
           rounded-2xl p-8 sm:p-12 max-w-3xl mx-auto text-center)

    <p> -- text-lg font-semibold text-text-primary italic
           "We cannot afford another line item."

    <div> -- h-px bg-gradient-to-r from-transparent
              via-white/[0.08] to-transparent my-6

    <p> -- text-sm text-text-secondary leading-relaxed
           "What does one unmanaged incident cost..."
```

This section uses a slightly lighter glass card (`bg-white/[0.04]`) and center-aligned text to visually distinguish it from the primary content sections.

#### 4.4.9 `PricingBottomCta` (Server Component)

**File:** `src/components/marketing/pricing/pricing-bottom-cta.tsx`

**Content (from WS-B.1):**

- Primary CTA: "Schedule a Briefing"
- Micro-copy: "We will walk you through a live pricing scenario for your organization."
- Secondary CTA: "Contact Sales for Volume Pricing"

**Layout:**

```
<section> -- mt-24 sm:mt-32 mb-8

  <div> -- text-center max-w-2xl mx-auto

    <p> -- text-lg text-text-secondary leading-relaxed
           "We will walk you through a live pricing scenario..."

    <div> -- flex flex-col sm:flex-row items-center justify-center
              gap-4 mt-8

      [Primary CTA]
      <a href="/contact">
        cn(
          'px-8 py-4 rounded-xl text-base font-semibold',
          'bg-amber-500 text-void hover:bg-amber-400',
          'transition-all duration-200',
          // Breathing glow animation (one per page)
          'animate-[cta-breathe_3s_ease-in-out_infinite]',
        )
        "Schedule a Briefing"

      [Secondary CTA]
      <a href="/contact">
        cn(
          'px-8 py-4 rounded-xl text-base font-semibold',
          'bg-white/[0.06] text-text-primary',
          'border border-white/[0.08]',
          'hover:bg-white/[0.1]',
          'transition-all duration-200',
        )
        "Contact Sales for Volume Pricing"
```

**Breathing glow animation:** The primary CTA on this page uses the same breathing glow as the gateway CTA (`gateway-cta-breathe`). This is the only element on the page with the animation, per the one-breathing-CTA-per-page rule from AD-2. The keyframe animation should be defined in `globals.css` (or reuse the existing gateway animation if available):

```css
@keyframes cta-breathe {
  0%, 100% {
    box-shadow:
      0 0 12px rgba(245, 158, 11, 0.2),
      0 0 4px rgba(245, 158, 11, 0.1);
  }
  50% {
    box-shadow:
      0 0 24px rgba(245, 158, 11, 0.35),
      0 0 8px rgba(245, 158, 11, 0.2);
  }
}
```

Note: The breathing glow uses amber (`245, 158, 11`) RGB values, not green, because this is a conversion CTA.

### 4.5 Structured Data

Three JSON-LD blocks are injected on the pricing page. All use the helpers defined in WS-A.3.

#### 4.5.1 Product Schema

Uses `productSchema()` from `src/lib/seo/structured-data.ts`. The function produces:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Safetrekr Trip Safety Management",
  "description": "Per-trip safety management with independent analyst review.",
  "brand": {
    "@type": "Brand",
    "name": "Safetrekr"
  },
  "offers": [
    {
      "@type": "Offer",
      "name": "Day Trip (T1)",
      "price": "450",
      "priceCurrency": "USD",
      "description": "Single-day trip safety management with route analysis, chaperone coordination, and independent safety review.",
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "name": "Domestic Overnight (T2)",
      "price": "750",
      "priceCurrency": "USD",
      "description": "Multi-day domestic trip safety management with lodging verification, extended itinerary review, and 24/7 monitoring.",
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "name": "International (T3)",
      "price": "1250",
      "priceCurrency": "USD",
      "description": "International trip safety management with country risk intelligence, embassy coordination, and full safety analyst review.",
      "availability": "https://schema.org/InStock"
    }
  ]
}
```

**[UNVALIDATED]** All price values in the Product schema must be confirmed by the business owner before the pricing page goes live. Publishing incorrect prices in structured data can trigger Google's misleading content policies.

#### 4.5.2 FAQPage Schema

Uses `faqPageSchema()` from `src/lib/seo/structured-data.ts`. Only resolved FAQ items (those without `unresolved: true`) are included in the structured data. This prevents unresolved placeholder answers from appearing as rich results in Google SERPs.

The page component filters FAQ items before passing to the schema helper:

```typescript
const resolvedFaqItems = PRICING_FAQ_ITEMS
  .filter((item) => !item.unresolved)
  .map((item) => ({
    question: item.question,
    answer: item.answer,
  }))
```

This produces a FAQPage schema with 6 Q&A pairs (excluding the free trial and cancellation policy items until Q-2 is resolved).

#### 4.5.3 BreadcrumbList Schema

Uses `breadcrumbSchema()` from `src/lib/seo/structured-data.ts`:

```typescript
breadcrumbSchema([{ name: 'Pricing', path: '/pricing' }])
```

Produces: Home > Pricing breadcrumb for SERP display.

### 4.6 SEO Metadata

The page exports metadata using the `generatePageMetadata()` helper from WS-A.3:

```typescript
export const metadata = generatePageMetadata({
  title: 'Pricing -- Per-Trip Safety Management',
  description:
    'Per-trip pricing from $450. No annual contracts. Every trip includes independent safety review, intelligence monitoring, and full audit trail. Compare plans.',
  path: '/pricing',
  keywords: [
    'trip safety management pricing',
    'group travel safety cost',
    'school trip safety pricing',
    'travel risk management pricing',
    'per trip safety pricing',
  ],
})
```

**Rendered title tag:** `Pricing -- Per-Trip Safety Management | Safetrekr` (51 characters -- within 60 char target)

**Meta description:** 156 characters -- within 130-160 range. Includes primary keyword ("per-trip pricing"), key differentiator ("independent safety review"), and implicit CTA ("Compare plans").

### 4.7 Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| **Mobile** (`< 640px`) | All content stacks vertically. Tier cards: 1 column. Value comparisons: 1 column. Per-traveler examples: 1 column. FAQ: full-width. |
| **Tablet** (`sm: 640px-1023px`) | Tier cards: 2 columns (T1+T2 top row, T3+Enterprise bottom row). Value comparisons: 3 columns. Per-traveler examples: 2 columns. |
| **Desktop** (`lg: 1024px+`) | Tier cards: 4 columns. Highlighted tier (T2) has `-translate-y-2` lift. Value comparisons: 3 columns. Full horizontal layout. |
| **Wide** (`xl: 1280px+`) | `max-w-7xl` container caps content width. Generous padding. Same column structure as desktop. |

**Mobile-specific adjustments:**

- Tier card prices reduce from `text-5xl` to `text-4xl` on mobile for readability.
- CTA buttons become full-width (`w-full`) on mobile.
- Section margins reduce from `mt-24 sm:mt-32` to `mt-16` on mobile.
- FAQ accordion triggers get larger touch targets (minimum 48px height).

### 4.8 Accessibility Specification

| Requirement | Implementation |
|-------------|----------------|
| **Color contrast** | All text meets WCAG 2.2 AA minimum 4.5:1 ratio. `--color-text-primary: #e8f0f4` on `--color-void: #061a23` = 13.2:1. `--color-text-secondary: #929899` on `--color-void: #061a23` = 6.7:1. Amber CTA text (`--color-void`) on `bg-amber-500` = 8.2:1. |
| **Focus indicators** | All interactive elements use `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]` (Safetrekr green outline). FAQ buttons use `outline-offset-[-2px]` to avoid rounded-corner clipping. |
| **Keyboard navigation** | FAQ accordion: `Enter`/`Space` to toggle. Tab order follows document flow. No arrow-key navigation required (this is a disclosure pattern, not a tablist). |
| **Screen reader** | FAQ: `aria-expanded`, `aria-controls`, `role="region"`, `aria-labelledby`. Feature list: `<ul>` with `<li>` elements. Badge: uses `sr-only` span for "Most Popular" context. Enterprise card: price reads as "Custom Pricing, contact sales for details" via aria-label. |
| **Reduced motion** | FAQ expand/collapse animation respects `prefers-reduced-motion: reduce` -- motion duration set to 0ms. Breathing CTA animation paused. |
| **Touch targets** | All buttons and links meet 44x44px minimum touch target on mobile. FAQ triggers: min-height 48px with padding. CTA buttons: `py-4` = 64px height. |
| **Heading hierarchy** | `h1` (hero) > `h2` (tier grid section, value reframe, add-ons, FAQ, objection hook) > `h3` (tier names, add-on names). No skipped levels. |
| **Price readability** | Prices use `tabular-nums` for aligned digits. Font size 48px on desktop, 36px on mobile. Unit ("/trip") is visually smaller but in the same DOM element for screen reader continuity. |

---

## 5. Integration Points

### 5.1 Navigation

The pricing page is linked from:

- **Marketing header** (WS-A.1): "Pricing" nav link in the main navigation bar.
- **Landing page bottom CTA** (WS-B.2): "See Pricing" secondary CTA.
- **Solutions page** (WS-B.7): Implicit link via "Schedule a Briefing" CTAs.
- **District capsule** (WS-A.2): "Pricing" district capsule in the ZUI links to `/pricing`.

### 5.2 Outbound Links

| Link | Destination | Context |
|------|-------------|---------|
| "Schedule a Briefing" CTA (primary) | `/contact` | Bottom CTA + each tier card CTA |
| "Contact Sales" CTA | `/contact` | Enterprise tier card + secondary bottom CTA |

### 5.3 Analytics Events (Specification Only)

These events should be implemented in WS-C.3. Documented here for the analytics team:

| Event Name | Trigger | Properties |
|------------|---------|------------|
| `pricing_page_view` | Page load | `{ page: '/pricing' }` |
| `pricing_tier_cta_click` | Tier card CTA clicked | `{ tier_id: string, tier_name: string, price: number }` |
| `pricing_enterprise_cta_click` | Enterprise CTA clicked | `{ source: 'enterprise_card' }` |
| `pricing_faq_toggle` | FAQ item expanded | `{ question: string, index: number }` |
| `pricing_bottom_cta_click` | Bottom CTA clicked | `{ cta_type: 'primary' \| 'secondary' }` |

---

## 6. Visual Reference -- Section Order

The page sections render in the following order from top to bottom:

```
1. Hero (H1 + subheadline)
   ↓ 64px gap
2. Tier Grid (4 cards: Day Trip, Domestic Overnight, International, Enterprise)
   ↓ 96px gap
3. Add-Ons Section (Background Checks, Travel Insurance)
   ↓ 96px gap
4. Value Reframe Section (trip cost comparisons, per-traveler math, incident costs)
   ↓ 96px gap
5. Objection Hook ("We cannot afford another line item")
   ↓ 96px gap
6. FAQ Accordion (6-8 collapsible items)
   ↓ 96px gap
7. Bottom CTA ("Schedule a Briefing" + "Contact Sales")
   ↓ 32px bottom padding
```

**Section dividers:** No explicit `<hr>` elements. Spacing between sections (96px on desktop, 64px on mobile) creates visual separation. Each section has its own glass card or distinct background treatment, making dividers unnecessary.

---

## 7. Risk and Mitigation

| # | Risk | Severity | Mitigation |
|---|------|----------|------------|
| 1 | **[CRITICAL] Pricing values unvalidated (Q-1)** | High | All dollar amounts flagged `[UNVALIDATED]` in data module and structured data. Page MUST NOT go live without business owner sign-off. Single file (`src/lib/data/pricing.ts`) controls all values -- one-file change when confirmed. |
| 2 | **[CRITICAL] Product schema with incorrect prices** | High | Publishing wrong prices in structured data violates Google policies. Product schema uses the same data source as the UI. Both update atomically via `pricing.ts`. |
| 3 | **Free trial decision unresolved (Q-2)** | Medium | FAQ includes a soft answer ("Contact our team for current trial availability"). If a trial is confirmed, add a prominent trial section above the tier grid and update the FAQ answer. |
| 4 | **Cancellation policy undefined** | Medium | FAQ includes a soft answer routing to the sales team. Update when policy is confirmed. |
| 5 | **Add-on prices unvalidated** | Medium | Background check ($35) and insurance ($25) prices carry the same `[UNVALIDATED]` flag. Sourced from WS-A.3 digital marketing review input. |
| 6 | **Amber CTA color not in token system** | Low | The amber conversion color (`#F59E0B`) is used via Tailwind's built-in `amber-500` utility, not through the spatial token system. This is intentional -- amber is a conversion-only accent that should not proliferate. Document this exception in the codebase. |
| 7 | **FAQ structured data exclusion of unresolved items** | Low | Unresolved FAQ items are rendered on-page but excluded from the FAQPage schema. When resolved, remove the `unresolved: true` flag and they automatically appear in structured data. |

---

## 8. Acceptance Criteria

### Functional

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | Page renders at `/(marketing)/pricing` within the marketing layout (header + footer) | Navigate to URL, verify header/footer presence |
| 2 | Three tier cards display with correct names, prices [UNVALIDATED], taglines, and feature lists | Visual inspection against WS-B.1 copy deck Section 4.4.5 |
| 3 | Enterprise card displays "Custom Pricing" with "Contact Sales" CTA | Visual inspection |
| 4 | Highlighted tier (T2 Domestic Overnight) has visual prominence (badge, stronger glow, vertical lift) | Visual inspection on desktop viewport |
| 5 | Value reframe section displays trip cost comparisons and per-traveler calculations | Visual inspection; verify math is correct ($750 / 30 = $25, $1,250 / 20 = $62.50) |
| 6 | Add-ons section displays background check and insurance pricing | Visual inspection |
| 7 | FAQ accordion opens/closes items correctly | Click each item; verify only one open at a time |
| 8 | FAQ unresolved items render with soft answers | Verify free trial and cancellation items show contact routing |
| 9 | All tier card CTAs link to `/contact` | Click each CTA; verify navigation |
| 10 | Bottom CTA primary links to `/contact` | Click; verify navigation |
| 11 | Breathing glow animation on primary bottom CTA | Visual inspection; verify amber glow pulse |

### SEO

| # | Criterion | Verification |
|---|-----------|--------------|
| 12 | `<title>` tag reads "Pricing -- Per-Trip Safety Management \| Safetrekr" | View page source or browser tab |
| 13 | `<meta name="description">` present with 130-160 characters | View page source |
| 14 | Canonical URL set to `https://www.safetrekr.com/pricing` | View page source |
| 15 | Product JSON-LD present with 3 Offer objects | View page source; validate at search.google.com/test/rich-results |
| 16 | FAQPage JSON-LD present with 6 resolved Q&A pairs (not 8) | View page source; validate at search.google.com/test/rich-results |
| 17 | BreadcrumbList JSON-LD present: Home > Pricing | View page source |

### Accessibility

| # | Criterion | Verification |
|---|-----------|--------------|
| 18 | FAQ accordion keyboard-navigable (Tab, Enter/Space) | Keyboard-only navigation test |
| 19 | `aria-expanded` toggles correctly on FAQ buttons | Screen reader or DevTools inspection |
| 20 | All text passes 4.5:1 contrast ratio | axe-core or Lighthouse audit |
| 21 | Focus indicators visible on all interactive elements | Tab through page; verify green outlines |
| 22 | Page heading hierarchy is valid (h1 > h2 > h3, no skipped levels) | Heading outline tool or axe-core |
| 23 | Reduced motion: animations paused when `prefers-reduced-motion: reduce` | OS/browser reduced motion setting |

### Responsive

| # | Criterion | Verification |
|---|-----------|--------------|
| 24 | Mobile (375px): All content stacks vertically, CTAs full-width | Resize to 375px or device emulator |
| 25 | Tablet (768px): Tier cards 2-column, value comparisons 3-column | Resize to 768px |
| 26 | Desktop (1280px): Tier cards 4-column, highlighted tier lifted | Resize to 1280px |

### Performance

| # | Criterion | Verification |
|---|-----------|--------------|
| 27 | Page is a server component (no full-page `'use client'`) | Verify only `pricing-faq.tsx` has `'use client'` directive |
| 28 | No unnecessary client-side JavaScript for static content | Bundle analyzer; verify tier cards, value section, add-ons are server-rendered |
| 29 | Page loads within 2s on 3G throttled connection | Lighthouse performance audit |

### Data Integrity

| # | Criterion | Verification |
|---|-----------|--------------|
| 30 | All pricing values sourced from `src/lib/data/pricing.ts` (single source of truth) | Code review; no hardcoded prices in components |
| 31 | Structured data prices match displayed prices | Compare JSON-LD output with tier card display |
| 32 | `[UNVALIDATED]` comments present in data module | Code review of `pricing.ts` |

---

## 9. Implementation Checklist

Ordered by implementation sequence. Each item can be verified independently.

- [ ] **9.1** Create `src/lib/interfaces/pricing.ts` with type definitions (Section 4.1)
- [ ] **9.2** Create `src/lib/data/pricing.ts` with all pricing data, flagged [UNVALIDATED] (Section 4.2)
- [ ] **9.3** Create `src/components/marketing/pricing/pricing-hero.tsx` (Section 4.4.1)
- [ ] **9.4** Create `src/components/marketing/pricing/pricing-tier-card.tsx` with glass-morphism (Section 4.4.2)
- [ ] **9.5** Create `src/components/marketing/pricing/enterprise-tier-card.tsx` (Section 4.4.3)
- [ ] **9.6** Create `src/components/marketing/pricing/pricing-tier-grid.tsx` with responsive 1/2/4 column grid (Section 4.4.4)
- [ ] **9.7** Create `src/components/marketing/pricing/value-reframe-section.tsx` (Section 4.4.5)
- [ ] **9.8** Create `src/components/marketing/pricing/add-ons-section.tsx` (Section 4.4.6)
- [ ] **9.9** Create `src/components/marketing/pricing/pricing-faq.tsx` as client component with accordion (Section 4.4.7)
- [ ] **9.10** Create `src/components/marketing/pricing/pricing-objection-hook.tsx` (Section 4.4.8)
- [ ] **9.11** Create `src/components/marketing/pricing/pricing-bottom-cta.tsx` with breathing glow (Section 4.4.9)
- [ ] **9.12** Create `src/app/(marketing)/pricing/page.tsx` composing all sections (Section 4.3)
- [ ] **9.13** Verify structured data (Product + FAQPage + BreadcrumbList) renders in page source
- [ ] **9.14** Verify SEO metadata (title, description, canonical, keywords)
- [ ] **9.15** Test responsive layout at 375px, 768px, 1024px, 1280px breakpoints
- [ ] **9.16** Test FAQ accordion keyboard navigation (Tab, Enter, Space)
- [ ] **9.17** Test `prefers-reduced-motion: reduce` (animations paused)
- [ ] **9.18** Run axe-core audit; resolve any violations
- [ ] **9.19** `pnpm typecheck` passes with zero errors
- [ ] **9.20** `pnpm lint` passes with zero errors
- [ ] **9.21** Validate structured data at https://search.google.com/test/rich-results

---

## 10. File Manifest

All files created or modified by this workstream.

### New Files

| File | Type | Purpose |
|------|------|---------|
| `src/lib/interfaces/pricing.ts` | Types | `PricingTier`, `PricingFeature`, `PricingAddOn`, `PricingFAQItem` interfaces |
| `src/lib/data/pricing.ts` | Data | All pricing tiers, add-ons, FAQ items, value reframe data. Single source of truth. |
| `src/app/(marketing)/pricing/page.tsx` | Page | Server component page with metadata, structured data, section composition |
| `src/components/marketing/pricing/pricing-hero.tsx` | Component | Hero section (server) |
| `src/components/marketing/pricing/pricing-tier-card.tsx` | Component | Individual tier card (server) |
| `src/components/marketing/pricing/enterprise-tier-card.tsx` | Component | Enterprise "Contact Sales" card (server) |
| `src/components/marketing/pricing/pricing-tier-grid.tsx` | Component | Responsive grid layout for tier cards (server) |
| `src/components/marketing/pricing/value-reframe-section.tsx` | Component | Cost comparison and per-traveler calculations (server) |
| `src/components/marketing/pricing/add-ons-section.tsx` | Component | Add-on services section (server) |
| `src/components/marketing/pricing/pricing-faq.tsx` | Component | Collapsible FAQ accordion (client -- sole client component) |
| `src/components/marketing/pricing/pricing-objection-hook.tsx` | Component | Inline objection handling (server) |
| `src/components/marketing/pricing/pricing-bottom-cta.tsx` | Component | Bottom CTA bar with breathing glow (server) |

### Modified Files

| File | Modification | Reason |
|------|-------------|--------|
| `src/app/globals.css` | Add `@keyframes cta-breathe` if not already present | Breathing glow animation for bottom CTA. May already exist from gateway implementation; reuse if so. |

### Dependencies on Other Workstreams

| File | From WS | Must Exist Before Implementation |
|------|---------|----------------------------------|
| `src/app/(marketing)/layout.tsx` | WS-A.1 | Yes -- provides header/footer shell |
| `src/lib/seo/metadata.ts` | WS-A.3 | Yes -- provides `generatePageMetadata()` |
| `src/lib/seo/structured-data.ts` | WS-A.3 | Yes -- provides `productSchema()`, `faqPageSchema()`, `breadcrumbSchema()` |
| `src/components/seo/json-ld.tsx` | WS-A.3 | Yes -- provides `<JsonLd>` component |
| `src/lib/config/site.ts` | WS-A.3 | Yes -- provides `SITE_CONFIG` for metadata |

---

## 11. Open Questions (Workstream-Specific)

These are in addition to the project-level Q-1 and Q-2 from combined-recommendations.md.

| # | Question | Impact | Needed By |
|---|----------|--------|-----------|
| Q-B.5.1 | Should the pricing calculator CTA ("Calculate Your Cost") render as a disabled button with "Coming Soon," or be omitted entirely from the initial launch? | Visual presence on page; sets expectation with visitors | Before implementation |
| Q-B.5.2 | Is the "Most Popular" badge on T2 (Domestic Overnight) correct, or should it be placed on a different tier? | Badge placement on tier cards | Before implementation |
| Q-B.5.3 | Should the per-traveler examples in the value reframe section use specific group sizes (30 domestic, 20 international), or should they be configurable/editable? | Data module structure | Before implementation |
| Q-B.5.4 | Are the add-on integration providers (Checkr, Sterling, GoodHire) confirmed and contractually available? Should they be named on the marketing site? | Add-on section copy | Before launch |
