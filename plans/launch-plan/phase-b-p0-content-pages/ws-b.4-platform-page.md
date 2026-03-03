# WS-B.4: Platform Page

> **Workstream ID:** WS-B.4
> **Phase:** B -- P0 Content Pages
> **Assigned Agent:** `react-developer`
> **Status:** Draft
> **Created:** 2026-03-02
> **Last Updated:** 2026-03-02
> **Depends On:** WS-A.1 (Marketing Layout), WS-B.1 (Content Strategy + Copy Drafting)
> **Blocks:** None
> **Resolves:** Combined Recommendations -- Platform Page Requirements

---

## 1. Objective

Build the Platform page at `/(marketing)/platform` -- the feature-comparison destination for evaluators doing side-by-side product analysis. This page communicates the full breadth and depth of Safetrekr through two complementary lenses: a **four-portal overview** that establishes the role-based separation of duties, and a **six-domain feature grid** that enumerates verified product capabilities in scannable glass-morphism cards.

The page is a **server component** for SEO indexability. Every feature bullet listed on this page must trace back to a capability marked **Implemented** in `product-review-safetrekr-app-v2-verified.md`. No scaffolded or planned features appear. The visual treatment follows the Oblivion HUD dark glass-morphism aesthetic established by WS-A.1, using existing spatial tokens, the canonical glass-morphism recipe from `detail-panel.tsx`, and the Safetrekr green accent system.

This is a content-dense page. The primary challenge is presenting approximately 42 feature bullets across six domains without overwhelming the reader. The solution is a responsive grid of glass cards where each domain is a self-contained unit with an icon, a tagline headline, and three-to-seven concise bullets. Vertical rhythm and breathing space between sections prevent visual fatigue.

---

## 2. Scope

### In Scope

| # | Item | Notes |
|---|------|-------|
| 1 | `src/app/(marketing)/platform/page.tsx` | Server component: SEO metadata + page composition |
| 2 | `PlatformHero` component | H1 headline, H2 sub-introduction |
| 3 | `PortalOverview` section component | Sub-header + four portal cards in a responsive grid |
| 4 | `PortalCard` component | Icon, portal name, role line, description, screenshot placeholder |
| 5 | `FeatureGrid` section component | Sub-header + six domain cards in a responsive grid |
| 6 | `DomainCard` component | Icon, domain name, tagline H3, feature bullet list |
| 7 | `IntegrationOverview` section component | Simplified integration architecture section (optional, minimal) |
| 8 | `PlatformCTA` section component | Bottom CTA: "Schedule a Briefing" with breathing glow |
| 9 | `src/lib/config/platform-data.ts` | Typed content data for portals, domains, and integration highlights |
| 10 | `src/lib/interfaces/platform.ts` | TypeScript interfaces for portal and domain data shapes |
| 11 | `src/styles/platform.css` | Platform-page-specific animations: staggered card reveal, icon accent glow |
| 12 | Per-page SEO metadata | `<title>`, `<meta name="description">`, canonical URL, Open Graph tags |
| 13 | Responsive behavior | Mobile single-column, tablet 2-column, desktop 3-column grid for domain cards; mobile stacked, desktop 4-column for portal cards |
| 14 | Accessibility | Semantic headings hierarchy, landmark regions, focus indicators, reduced motion support |

### Out of Scope

| # | Item | Rationale |
|---|------|-----------|
| 1 | Actual portal screenshots | Screenshot capture is a design/product task. This workstream creates placeholder containers with correct aspect ratios and loading states. |
| 2 | Interactive feature demos or embedded video | Over-engineering for launch. The page is a scannable reference, not an interactive experience. |
| 3 | Comparison table against competitors | Not part of the Platform page spec. May become a future marketing asset. |
| 4 | Deep-dive sub-pages per domain | Would create a `/platform/planning`, `/platform/intelligence`, etc. structure. Valuable but out of scope for launch. |
| 5 | Copy authoring | All copy comes from WS-B.1 deliverables. This workstream implements the copy, not writes it. |
| 6 | Analytics instrumentation | WS-C.3 handles event tracking. This workstream provides semantic `data-*` attributes for future instrumentation. |
| 7 | OG images | WS-C.4 handles social images. |
| 8 | Data flow diagram or architecture animation | The integration overview section is static text and a simplified list, not an interactive diagram. |

---

## 3. Input Dependencies

### Codebase Files to Reference

| File | What to Use From It |
|------|---------------------|
| `src/app/(marketing)/layout.tsx` | Marketing layout from WS-A.1. Platform page renders inside this shell (header above, footer below). |
| `src/styles/spatial-tokens.css` | Safetrekr dark-mode tokens. Domain cards use `--color-void: #061a23` page background, `--color-deep: #0a2733` or `--color-surface: #123646` as card interiors. Accent: `--color-ember: #4ba467`, `--color-ember-bright: #6abf84`, `--color-ember-glow: #92d4a6`. Text: `--color-text-primary: #e8f0f4`, `--color-text-secondary: #929899`, `--color-text-tertiary: #5a7a88`. Glow recipes: `--glow-ember-subtle`, `--glow-ember-medium`. RGB components: `--ember-rgb: 75, 164, 103`. |
| `src/components/districts/detail-panel.tsx` | Canonical glass-morphism recipe: `bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]`, `border border-white/[0.08]`. Glow shadow pattern: `shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_0_1px_0_rgba(var(--ember-rgb),0.3),0_0_24px_rgba(var(--ember-rgb),0.1)]`. Domain cards and portal cards use this recipe. |
| `src/lib/utils.ts` | `cn()` utility. Import: `import { cn } from '@/lib/utils'`. |
| `src/app/globals.css` | Tailwind v4 theme bridge. Confirms `bg-void`, `text-text-primary`, `text-ember-bright`, etc. are available as Tailwind utilities. Font families: `--font-sans` (Geist Sans), `--font-mono` (Geist Mono). |
| `src/styles/gateway.css` | Breathing glow keyframes pattern: `@keyframes gateway-cta-breathe` -- 5s `box-shadow` oscillation using `rgba(75, 164, 103, ...)`. Platform CTA reuses the same `mkt-cta-breathe` keyframes from WS-A.1's `marketing.css`. Reduced motion: `animation: none !important`. |
| `plans/launch-plan/phase-b-p0-content-pages/ws-b.1-content-strategy-copy-drafting.md` Section 4.4.3 | All platform page copy: H1, H2, portal card descriptions, domain sub-headers, all 42 feature bullets, bottom CTA text and micro-copy. |
| `plans/launch-plan/initial-thoughts/product-review-safetrekr-app-v2-verified.md` | Verification source for every feature bullet. Only features marked **Implemented** are eligible for the platform page. Cross-reference each bullet against this document. |
| `plans/launch-plan/intitial-reviews/holistic-overview.md` Section 4.4 | Domain taxonomy: Planning & Analysis, Intelligence & Risk, Protection System, Traveler Delivery, Compliance & Audit, HQ Command. |
| `plans/launch-plan/combined-recommendations.md` Platform section | Page requirements: feature grid by domain, four portal overview, integration section (optional), bottom CTA. |

### External Dependencies

| Dependency | Owner | Status | Impact |
|------------|-------|--------|--------|
| WS-A.1 marketing layout shell | Engineering (WS-A.1) | **Not started** | Platform page cannot render without header/footer layout. Placeholder page from WS-A.1 exists at route; this workstream replaces it. |
| WS-B.1 finalized platform copy | Narrative Strategist (WS-B.1) | **Draft** | Copy text for H1, H2, portal descriptions, domain taglines, all 42 feature bullets, CTA text. Implementation can begin with draft copy from Section 4.4.3 of WS-B.1 and swap to final copy when approved. |
| Lucide React icons for domain/portal icons | npm package | **Available** | `lucide-react` is already in `package.json`. Specific icon selections are made in this workstream (see D-4). |
| Portal screenshot assets | Product / Design | **Not started** | Placeholder containers render with an aspect-ratio-preserving gray card and "Screenshot coming soon" label. Real screenshots are a content update, not a code change. |

---

## 4. Deliverables

### 4.1 Route File and SEO Metadata

**File:** `src/app/(marketing)/platform/page.tsx`

This file replaces the placeholder page created by WS-A.1. It is a **server component** (no `'use client'` directive) to ensure full SSR and SEO indexability. The page composes all section components in vertical order and exports Next.js metadata.

```tsx
// src/app/(marketing)/platform/page.tsx

import type { Metadata } from 'next'

import { PlatformHero } from '@/components/marketing/platform/platform-hero'
import { PortalOverview } from '@/components/marketing/platform/portal-overview'
import { FeatureGrid } from '@/components/marketing/platform/feature-grid'
import { IntegrationOverview } from '@/components/marketing/platform/integration-overview'
import { PlatformCTA } from '@/components/marketing/platform/platform-cta'

export const metadata: Metadata = {
  title: 'Safetrekr Platform -- Trip Safety Management Features',
  description:
    'Four portals. 10-step trip wizard. Independent analyst review. Real-time intelligence. 46-endpoint protection system. Offline-first traveler app. See the full Safetrekr platform.',
  alternates: {
    canonical: '/platform',
  },
  openGraph: {
    title: 'Safetrekr Platform -- Trip Safety Management Features',
    description:
      'Four portals. 10-step trip wizard. Independent analyst review. Real-time intelligence. 46-endpoint protection system. Offline-first traveler app.',
    url: '/platform',
    type: 'website',
  },
}

export default function PlatformPage() {
  return (
    <main id="main-content" className="flex flex-col">
      <PlatformHero />
      <PortalOverview />
      <FeatureGrid />
      <IntegrationOverview />
      <PlatformCTA />
    </main>
  )
}
```

**Key decisions:**
- `id="main-content"` matches the skip-to-content link target from WS-A.1.
- All section components are server components (no `'use client'`). The breathing glow CTA animation is CSS-only (no JS interactivity required in the button itself -- the link wraps to `/contact`).
- Metadata uses the SEO title and description from WS-B.1 Section 4.4.3.

---

### 4.2 TypeScript Interfaces

**File:** `src/lib/interfaces/platform.ts`

Defines the data shapes consumed by all platform page components.

```tsx
// src/lib/interfaces/platform.ts

import type { LucideIcon } from 'lucide-react'

/**
 * A portal in the four-portal architecture.
 * Each portal targets a specific user role in the trip safety lifecycle.
 */
export interface PortalData {
  /** Unique identifier for the portal (used as React key and data-attribute) */
  id: 'client' | 'analyst' | 'hq' | 'traveler'
  /** Display name: "Client Portal", "Analyst Portal", etc. */
  name: string
  /** One-line role description: "For organization administrators." */
  roleLabel: string
  /** 2-3 sentence description of what the portal enables */
  description: string
  /** Lucide icon component reference */
  icon: LucideIcon
  /** Aspect ratio for the screenshot placeholder (width/height) */
  screenshotAspectRatio: number
}

/**
 * A feature domain in the six-domain feature grid.
 * Each domain groups related capabilities under a theme.
 */
export interface DomainData {
  /** Unique identifier (used as React key and data-attribute) */
  id: 'planning' | 'intelligence' | 'protection' | 'delivery' | 'compliance' | 'hq-command'
  /** Display name: "Planning & Analysis", etc. */
  name: string
  /** One-line tagline used as H3: "Structured trip planning from day trips to international travel." */
  tagline: string
  /** 3-7 feature bullet strings. Each is a single, concise sentence. */
  features: string[]
  /** Lucide icon component reference */
  icon: LucideIcon
}

/**
 * An integration highlight for the simplified integration section.
 */
export interface IntegrationHighlight {
  /** Integration name: "AviationStack", "Checkr", etc. */
  name: string
  /** One-line purpose */
  purpose: string
  /** Optional category for grouping */
  category: 'data' | 'compliance' | 'infrastructure' | 'delivery'
}
```

---

### 4.3 Content Data File

**File:** `src/lib/config/platform-data.ts`

Single source of truth for all platform page content. Imports Lucide icons and exports typed arrays. All feature bullets are sourced from WS-B.1 Section 4.4.3, which in turn traces to `product-review-safetrekr-app-v2-verified.md` (Implemented features only).

```tsx
// src/lib/config/platform-data.ts

import {
  LayoutDashboard,  // Client Portal
  Shield,           // Analyst Portal
  Monitor,          // HQ Console
  Smartphone,       // Traveler App
  ClipboardList,    // Planning & Analysis
  AlertTriangle,    // Intelligence & Risk
  ShieldCheck,      // Protection System
  Send,             // Traveler Delivery
  FileCheck,        // Compliance & Audit
  Settings,         // HQ Command
} from 'lucide-react'

import type { PortalData, DomainData, IntegrationHighlight } from '@/lib/interfaces/platform'

// ─── Portal Data ────────────────────────────────────────────────────────────

export const PORTALS: PortalData[] = [
  {
    id: 'client',
    name: 'Client Portal',
    roleLabel: 'For organization administrators.',
    description:
      'Plan trips with the 10-step wizard. Manage rosters, collect documents, track background checks, and monitor real-time intelligence alerts. Your operational command center for every trip.',
    icon: LayoutDashboard,
    screenshotAspectRatio: 16 / 10,
  },
  {
    id: 'analyst',
    name: 'Analyst Portal',
    roleLabel: 'For independent safety analysts.',
    description:
      'Review every trip across 18 safety dimensions. Triage intelligence alerts. Flag issues, assign checklists, and make approval decisions -- all documented with full audit trail.',
    icon: Shield,
    screenshotAspectRatio: 16 / 10,
  },
  {
    id: 'hq',
    name: 'HQ Console',
    roleLabel: 'For Safetrekr operations.',
    description:
      'Manage organizations, analysts, policies, and platform configuration. Monitor system health, manage review queues, and oversee the analyst workforce.',
    icon: Monitor,
    screenshotAspectRatio: 16 / 10,
  },
  {
    id: 'traveler',
    name: 'Traveler App',
    roleLabel: 'For travelers, chaperones, and guardians.',
    description:
      'Native mobile app with offline-first architecture. Receive live itineraries, safety checklists, intelligence alerts, and emergency preparedness information. Acknowledge alerts. Access emergency contacts. All on-device, even without connectivity.',
    icon: Smartphone,
    screenshotAspectRatio: 9 / 16,   // Mobile app: portrait aspect ratio
  },
]

// ─── Domain Data ────────────────────────────────────────────────────────────

export const DOMAINS: DomainData[] = [
  {
    id: 'planning',
    name: 'Planning & Analysis',
    tagline: 'Structured trip planning from day trips to international travel.',
    icon: ClipboardList,
    features: [
      '10-step trip creation wizard with tier-based complexity (T1 / T2 / T3)',
      'Traveler registry with intelligent matching, bulk CSV/Excel import, and automatic deduplication',
      'Flight lookup via AviationStack API with auto-populated airline and terminal data',
      'Day-by-day itinerary builder with auto-populated events from flights, lodging, and venues',
      'Ground transportation documentation between itinerary events',
      'Real-time add-on pricing calculated per participant count',
      'Client dashboard with KPI cards, activity feed, and sortable trip directory',
    ],
  },
  {
    id: 'intelligence',
    name: 'Intelligence & Risk',
    tagline: 'Real-time threat monitoring with analyst triage.',
    icon: AlertTriangle,
    features: [
      'TarvaRI intelligence engine with multi-source data aggregation',
      'Alert classification by severity (critical, high, medium, low) and category (weather, security, health, transport, political)',
      'Risk scoring with percentile confidence bands (P5, P50, P95)',
      'Analyst triage workflow: pending, approved, rejected, snoozed',
      'Delivery routing by urgency: urgent, AM digest, PM digest, scheduled',
      'Continuous feed with infinite scroll, severity color coding, and status indicators',
      'Traveler acknowledgment tracking with proof of receipt',
    ],
  },
  {
    id: 'protection',
    name: 'Protection System',
    tagline: 'Active emergency preparedness, not a binder on a shelf.',
    icon: ShieldCheck,
    features: [
      '46-endpoint protection API covering rally points, safe houses, musters, and check-ins',
      'Rally point management with GPS coordinates, approval workflows, and automatic geofence creation',
      'Safe house management with type categorization and exit-alert geofencing',
      'Three-tier evacuation planning: shelter in place, local evacuation, relocation',
      'Medical facility directory with trauma capability levels and estimated travel times',
      'Emergency kit profile recommendations based on trip characteristics',
      'Automatic geofence synchronization when protection resources change',
    ],
  },
  {
    id: 'delivery',
    name: 'Traveler Delivery',
    tagline: 'Safety information on every traveler\'s device, with proof.',
    icon: Send,
    features: [
      'Native mobile app (iOS and Android) with offline-first SQLite architecture',
      'Geo-triggered checklist delivery activated by zone entry',
      'Time-relative checklist delivery (configurable days before departure)',
      'Background geofence monitoring with violation alerts for chaperones and guardians',
      'SMS emergency broadcast to all trip participants',
      'Alert acknowledgment with audit trail',
      'Role-based trip packet generation for offline reference',
    ],
  },
  {
    id: 'compliance',
    name: 'Compliance & Audit',
    tagline: 'Background checks, documents, certifications -- tracked automatically.',
    icon: FileCheck,
    features: [
      '5 background check types (criminal, sex offender, driving, employment, education)',
      '3 integrated screening providers (Checkr, Sterling, GoodHire)',
      'Participant-by-check compliance matrix with six-status tracking',
      '9 document requirement templates (4 consent types + 5 document types) with role-based targeting',
      'Configurable due dates with automated reminders (7, 3, 1 day before deadline)',
      '12 predefined certification types with expiration monitoring (valid, expiring, expired)',
      'Full evidence and activity audit trail with three source types (client, analyst, system)',
    ],
  },
  {
    id: 'hq-command',
    name: 'HQ Command',
    tagline: 'Team roles, branding, and platform configuration.',
    icon: Settings,
    features: [
      '10 system-level roles with ascending privilege and automatic portal routing',
      'Team invitation and role assignment (Org Admin, Billing Admin, Security Officer)',
      'Organization branding: logo, brand colors, trip packet watermarks, security hotline',
      'Trip defaults: chaperone ratios, floor policies, required data fields, packet templates',
      'Two-factor authentication and security device management',
      'GDPR-compliant privacy controls: contact visibility, analytics opt-in/out, data export, account deletion',
      'Consent history with timestamped audit trail',
    ],
  },
]

// ─── Integration Highlights ─────────────────────────────────────────────────

export const INTEGRATION_HIGHLIGHTS: IntegrationHighlight[] = [
  { name: 'AviationStack', purpose: 'Real-time flight data lookup during trip creation', category: 'data' },
  { name: 'TarvaRI', purpose: 'Multi-source intelligence aggregation and risk scoring', category: 'data' },
  { name: 'Checkr / Sterling / GoodHire', purpose: 'Background check screening across five check types', category: 'compliance' },
  { name: 'Supabase', purpose: 'PostgreSQL with Row Level Security and real-time subscriptions', category: 'infrastructure' },
  { name: 'Stripe', purpose: 'Payment processing for trip purchases and add-on services', category: 'infrastructure' },
  { name: 'MapLibre GL', purpose: 'Interactive map visualization for lodging, venues, and emergency facilities', category: 'data' },
  { name: 'expo-location', purpose: 'Native geofencing with background monitoring on mobile devices', category: 'delivery' },
  { name: 'expo-sqlite', purpose: 'Offline-first action queue for the Traveler App', category: 'delivery' },
]
```

**Note on icon selection:** The specific Lucide icon for each portal and domain is a preliminary choice. Final icon selection may change during implementation without affecting component contracts. See D-4.

---

### 4.4 PlatformHero Component

**File:** `src/components/marketing/platform/platform-hero.tsx`

Server component. Renders the page headline and introductory text. Establishes the visual entry point with generous vertical spacing and centered text alignment.

```tsx
// src/components/marketing/platform/platform-hero.tsx

interface PlatformHeroProps {}

export function PlatformHero({}: PlatformHeroProps) {
  // Returns:
  // <section> with aria-labelledby pointing to the H1 id
  // H1: "Built for the people who plan the trip -- and the people who go."
  // H2/p: Safetrekr four-portal introduction paragraph
}
```

**Visual specification:**

| Property | Value | Rationale |
|----------|-------|-----------|
| Container | `<section aria-labelledby="platform-hero-heading">` | Landmark for screen readers |
| Max width | `max-w-4xl mx-auto` | Constrains line length for readability (~65-75ch) |
| Vertical padding | `pt-24 pb-16 md:pt-32 md:pb-20` | Generous breathing room below the fixed header (header height ~64px + scroll clearance) |
| Horizontal padding | `px-6 md:px-8` | Consistent with other marketing pages |
| H1 | `text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-text-primary)] text-center` | Large, centered, high-contrast |
| Sub-text | `text-lg md:text-xl text-[var(--color-text-secondary)] text-center mt-6 max-w-3xl mx-auto leading-relaxed` | Secondary color, slightly smaller, generous leading for multi-sentence text |

**H1 text (from WS-B.1):**
> Built for the people who plan the trip -- and the people who go.

**Sub-text (from WS-B.1):**
> Safetrekr operates through four integrated portals, each designed for a specific role in the trip safety lifecycle. Organization administrators plan. Independent analysts verify. HQ operations monitor. Travelers receive safety information on their devices.

---

### 4.5 PortalOverview Component

**File:** `src/components/marketing/platform/portal-overview.tsx`

Server component. Renders the four-portal overview section as a responsive grid of `PortalCard` components.

```tsx
// src/components/marketing/platform/portal-overview.tsx

import { PORTALS } from '@/lib/config/platform-data'
import { PortalCard } from './portal-card'

interface PortalOverviewProps {}

export function PortalOverview({}: PortalOverviewProps) {
  // Returns:
  // <section aria-labelledby="portal-overview-heading">
  //   Sub-header H2: "Four portals. One platform. Complete separation of duties."
  //   Grid of 4 PortalCard components
  // </section>
}
```

**Layout specification:**

| Property | Value | Rationale |
|----------|-------|-----------|
| Container | `<section aria-labelledby="portal-overview-heading">` | Landmark section |
| Outer padding | `py-16 md:py-24 px-6 md:px-8` | Consistent section spacing |
| Max width | `max-w-7xl mx-auto` | Full-width grid container |
| Sub-header H2 | `text-sm font-mono uppercase tracking-[0.12em] text-[var(--color-ember-bright)] text-center mb-12 md:mb-16` | Mono-spaced, green accent, wide tracking -- matches the "mission control readout" aesthetic |
| Grid | `grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8` | Single column on mobile, 2-column on tablet (768px+), 4-column on desktop (1280px+) |

**Responsive breakpoints:**

| Viewport | Columns | Card behavior |
|----------|---------|---------------|
| < 768px | 1 | Full-width stacked cards, screenshot placeholder hidden to save vertical space |
| 768px--1279px | 2 | 2x2 grid, screenshot placeholders visible |
| >= 1280px | 4 | 4-across row, one card per portal |

---

### 4.6 PortalCard Component

**File:** `src/components/marketing/platform/portal-card.tsx`

Server component. Renders a single portal card with glass-morphism surface.

```tsx
// src/components/marketing/platform/portal-card.tsx

import type { PortalData } from '@/lib/interfaces/platform'
import { cn } from '@/lib/utils'

interface PortalCardProps {
  portal: PortalData
}

export function PortalCard({ portal }: PortalCardProps) {
  // Returns:
  // <article data-portal={portal.id}>
  //   Icon (Lucide, 24x24, ember-bright color)
  //   Portal name (H3, text-primary, font-bold)
  //   Role label (mono, uppercase, text-tertiary, small)
  //   Description (text-secondary, relaxed leading)
  //   Screenshot placeholder (aspect-ratio container with border)
  // </article>
}
```

**Visual specification:**

| Property | Value | Rationale |
|----------|-------|-----------|
| Card surface | `bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]` | Canonical glass-morphism from `detail-panel.tsx` |
| Card border | `border border-white/[0.08]` | Matches `detail-panel.tsx` |
| Card radius | `rounded-2xl` (16px) | Slightly less than detail-panel's 32px -- cards are smaller, so less radius keeps proportions |
| Card padding | `p-6 md:p-8` | Comfortable interior spacing |
| Card shadow | `shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]` | Subtle top-edge highlight only; no outer ember glow on portal cards (reserved for domain cards) |
| Icon | `w-6 h-6 text-[var(--color-ember-bright)]` | Green accent, modest size |
| Portal name H3 | `text-xl font-bold text-[var(--color-text-primary)] mt-3` | Clear hierarchy below section H2 |
| Role label | `text-xs font-mono uppercase tracking-[0.08em] text-[var(--color-text-tertiary)] mt-1` | De-emphasized role identifier |
| Description | `text-sm text-[var(--color-text-secondary)] mt-3 leading-relaxed` | Readable body text |
| Screenshot placeholder | `mt-4 rounded-lg bg-white/[0.03] border border-white/[0.06]` with `aspect-ratio` set from `portal.screenshotAspectRatio` | Preserves correct aspect ratio (16:10 for web portals, 9:16 for Traveler App). Contains centered "Screenshot coming soon" label in `text-[var(--color-text-ghost)]` mono text. |
| Screenshot placeholder (mobile) | `hidden md:block` | Hidden below 768px to save vertical space on mobile |
| Focus indicator | Not applicable (card is not interactive) | Cards are not links or buttons; no focus state needed |

**Traveler App card special handling:** The Traveler App has a portrait aspect ratio (9:16). On the 4-column desktop layout, this creates a taller card than the web portal cards. To maintain row alignment, the screenshot placeholder for the Traveler App uses `max-h-48` to cap its height, with the interior image set to `object-cover` when a real screenshot is eventually provided.

---

### 4.7 FeatureGrid Component

**File:** `src/components/marketing/platform/feature-grid.tsx`

Server component. Renders the six-domain feature grid as a responsive card layout.

```tsx
// src/components/marketing/platform/feature-grid.tsx

import { DOMAINS } from '@/lib/config/platform-data'
import { DomainCard } from './domain-card'

interface FeatureGridProps {}

export function FeatureGrid({}: FeatureGridProps) {
  // Returns:
  // <section aria-labelledby="feature-grid-heading">
  //   Sub-header H2: "Platform capabilities -- verified and operational."
  //   Divider line (thin, border-white/[0.06])
  //   Grid of 6 DomainCard components
  // </section>
}
```

**Layout specification:**

| Property | Value | Rationale |
|----------|-------|-----------|
| Container | `<section aria-labelledby="feature-grid-heading">` | Landmark section |
| Outer padding | `py-16 md:py-24 px-6 md:px-8` | Consistent section spacing |
| Max width | `max-w-7xl mx-auto` | Matches portal overview width |
| Sub-header H2 | `text-sm font-mono uppercase tracking-[0.12em] text-[var(--color-ember-bright)] text-center mb-4` | Same readout style as portal overview |
| Divider | `w-16 h-px bg-[var(--color-ember-muted)] mx-auto mb-12 md:mb-16` | Thin green accent line separating header from grid |
| Grid | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8` | Single column on mobile, 2-column on tablet, 3-column on desktop. Six cards fill a 3x2 grid on desktop. |

**Responsive breakpoints:**

| Viewport | Columns | Layout |
|----------|---------|--------|
| < 768px | 1 | Full-width stacked cards |
| 768px--1023px | 2 | 2-column, 3 rows |
| >= 1024px | 3 | 3-column, 2 rows (balanced 3x2 grid) |

---

### 4.8 DomainCard Component

**File:** `src/components/marketing/platform/domain-card.tsx`

Server component. Renders a single feature domain card with glass-morphism surface, domain icon, tagline, and bullet list.

```tsx
// src/components/marketing/platform/domain-card.tsx

import type { DomainData } from '@/lib/interfaces/platform'
import { cn } from '@/lib/utils'

interface DomainCardProps {
  domain: DomainData
}

export function DomainCard({ domain }: DomainCardProps) {
  // Returns:
  // <article data-domain={domain.id}>
  //   Top accent line (2px, ember-muted, full-width at card top)
  //   Icon (Lucide, 20x20, ember color)
  //   Domain name (all-caps mono label, ember-bright)
  //   Tagline H3 (text-primary, font-semibold)
  //   Feature bullet list (<ul> with custom bullet styling)
  // </article>
}
```

**Visual specification:**

| Property | Value | Rationale |
|----------|-------|-----------|
| Card surface | `bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]` | Canonical glass-morphism |
| Card border | `border border-white/[0.08]` | Standard glass border |
| Card radius | `rounded-2xl` (16px) | Consistent with portal cards |
| Card padding | `p-6 md:p-8` | Comfortable interior |
| Top accent line | `before:absolute before:top-0 before:left-6 before:right-6 before:h-[2px] before:bg-[var(--color-ember-muted)] before:rounded-full` via `relative overflow-hidden` on card | Subtle green accent at card top edge. Uses CSS pseudo-element. Inset from card edges by 24px for elegance. |
| Card hover (CSS only) | `hover:border-white/[0.12] hover:shadow-[var(--glow-ember-subtle)]` with `transition-all duration-[var(--duration-hover)]` | Gentle glow on hover. No JS needed. CSS transition respects `prefers-reduced-motion` (transitions are not affected by the global animation disable, but duration can be reduced). |
| Icon | `w-5 h-5 text-[var(--color-ember)]` | Standard ember color (not bright -- saves bright for the domain name) |
| Domain name label | `text-xs font-mono uppercase tracking-[0.12em] text-[var(--color-ember-bright)] mt-3` | All-caps readout label above tagline |
| Tagline H3 | `text-lg font-semibold text-[var(--color-text-primary)] mt-2 leading-snug` | Readable, not too large -- the card is information-dense |
| Feature list `<ul>` | `mt-4 space-y-2` | Vertical spacing between bullets |
| Feature list `<li>` | `text-sm text-[var(--color-text-secondary)] leading-relaxed pl-4 relative before:absolute before:left-0 before:top-[0.6em] before:w-1 before:h-1 before:rounded-full before:bg-[var(--color-ember-muted)]` | Custom bullet: small green dot (ember-muted) positioned via pseudo-element. Text is secondary color for scannability. |
| Focus indicator | Not applicable (card is not interactive) | Cards are static content. No focus state needed. |

**Semantic structure within each card:**
```html
<article data-domain="planning" class="...glass...">
  <div class="...accent-line..." aria-hidden="true" />
  <PlanningIcon class="w-5 h-5 text-ember" aria-hidden="true" />
  <p class="...domain-label...">Planning & Analysis</p>
  <h3 id="domain-planning" class="...tagline...">
    Structured trip planning from day trips to international travel.
  </h3>
  <ul aria-labelledby="domain-planning" class="...feature-list...">
    <li>10-step trip creation wizard with tier-based complexity (T1 / T2 / T3)</li>
    <!-- ...remaining features... -->
  </ul>
</article>
```

---

### 4.9 IntegrationOverview Component

**File:** `src/components/marketing/platform/integration-overview.tsx`

Server component. Renders a simplified integration architecture section. Per the combined recommendations, this section is **optional and simplified** -- a brief text introduction followed by a compact list of integration highlights, not an interactive diagram.

```tsx
// src/components/marketing/platform/integration-overview.tsx

import { INTEGRATION_HIGHLIGHTS } from '@/lib/config/platform-data'

interface IntegrationOverviewProps {}

export function IntegrationOverview({}: IntegrationOverviewProps) {
  // Returns:
  // <section aria-labelledby="integration-overview-heading">
  //   H2 sub-header: "Built on proven infrastructure."
  //   Brief 1-2 sentence introduction
  //   Compact grid/list of integration highlights
  //   Architecture summary bullets (4-portal architecture, RLS, offline-first, 46-endpoint API)
  // </section>
}
```

**Layout specification:**

| Property | Value | Rationale |
|----------|-------|-----------|
| Container | `<section aria-labelledby="integration-overview-heading">` | Landmark section |
| Outer padding | `py-16 md:py-24 px-6 md:px-8` | Consistent |
| Max width | `max-w-5xl mx-auto` | Slightly narrower than the full grid sections -- text-focused content reads better constrained |
| Background | Subtle differentiation from adjacent sections: `bg-white/[0.02] rounded-3xl mx-4 md:mx-auto` (a faint glass panel wrapping the whole section) | Visually separates this optional section from the feature grid above and CTA below |
| Sub-header H2 | Same readout style as other sections | Consistency |
| Introduction text | `text-[var(--color-text-secondary)] text-center max-w-2xl mx-auto leading-relaxed` | Brief context-setting paragraph |
| Integration list | `grid grid-cols-1 md:grid-cols-2 gap-4 mt-8` | Two-column grid of name + purpose pairs |
| Each integration item | `flex items-start gap-3` with name in `font-mono text-sm text-[var(--color-text-primary)]` and purpose in `text-sm text-[var(--color-text-secondary)]` | Clean, scannable format |
| Architecture highlights | `mt-8 flex flex-wrap justify-center gap-4` -- small "badge" style pills with mono text | "Four-Portal Architecture", "Row Level Security", "Offline-First Mobile", "46-Endpoint Protection API", "Real-Time Subscriptions" |
| Badge pill style | `text-xs font-mono uppercase tracking-[0.08em] text-[var(--color-ember-bright)] bg-[var(--color-ember-dim)] px-3 py-1.5 rounded-full border border-[var(--color-ember-muted)]/30` | Small, accent-colored pills that summarize architectural highlights |

---

### 4.10 PlatformCTA Component

**File:** `src/components/marketing/platform/platform-cta.tsx`

Server component. Renders the bottom call-to-action section. The CTA button uses the same `mkt-cta-breathe` animation class defined in `marketing.css` by WS-A.1.

```tsx
// src/components/marketing/platform/platform-cta.tsx

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface PlatformCTAProps {}

export function PlatformCTA({}: PlatformCTAProps) {
  // Returns:
  // <section aria-labelledby="platform-cta-heading" class="text-center">
  //   H2: "See Safetrekr in action."
  //   <Link href="/contact"> with breathing glow button
  //   Micro-copy: "20 minutes. We walk you through every portal."
  // </section>
}
```

**Visual specification:**

| Property | Value | Rationale |
|----------|-------|-----------|
| Container | `<section aria-labelledby="platform-cta-heading">` | Landmark |
| Outer padding | `py-24 md:py-32 px-6 md:px-8` | Extra generous spacing -- CTA is the visual anchor at page bottom |
| H2 | `text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] text-center` | Large, centered, commanding |
| CTA button | `<Link href="/contact">` wrapping a styled `<span>` | Server-rendered link, no client JS needed |
| Button classes | `inline-flex items-center justify-center px-8 py-4 mt-8 rounded-full bg-[var(--color-ember)] text-white font-semibold text-lg tracking-[0.02em] mkt-cta-breathe` | Green background, white text, breathing glow animation. `mkt-cta-breathe` class from WS-A.1 `marketing.css`. |
| Button hover | `hover:bg-[var(--color-ember-bright)] transition-colors duration-[var(--duration-hover)]` | Slightly brighter on hover |
| Button focus | `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]` | Standard focus indicator from codebase pattern |
| Button text | "Schedule a Briefing" | Primary CTA text from WS-B.1 |
| Micro-copy | `text-sm font-mono text-[var(--color-text-tertiary)] mt-4 tracking-[0.04em]` | "20 minutes. We walk you through every portal." -- de-emphasized, sets expectation |

**CTA H2 text (from WS-B.1):**
> See Safetrekr in action.

**Button text:**
> Schedule a Briefing

**Micro-copy:**
> 20 minutes. We walk you through every portal.

---

### 4.11 Platform Page Stylesheet

**File:** `src/styles/platform.css`

Minimal stylesheet for platform-page-specific CSS that cannot be expressed in Tailwind utilities. Imported in the page file or via the marketing layout.

```css
/* =================================================================
   Platform Page -- CSS Animations & Overrides
   =================================================================
   Platform-specific styles. The mkt-cta-breathe animation is defined
   in marketing.css (WS-A.1). This file covers only animations and
   styles unique to the platform page.

   Prefix: plt- (avoids collision with mkt-, gateway-, ambient-)
   ================================================================= */

/* ── Staggered card entrance (subtle fade-up) ───────────────────── */

@keyframes plt-card-reveal {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.plt-card-reveal {
  animation: plt-card-reveal 0.5s var(--ease-default) both;
}

/* Stagger delays applied via inline style: style="animation-delay: ${index * 80}ms" */

/* ── Domain card top accent line pulse (very subtle) ────────────── */

@keyframes plt-accent-breathe {
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.7;
  }
}

.plt-accent-breathe {
  animation: plt-accent-breathe 6s var(--ease-glow) infinite;
}

/* ── Reduced motion: disable all platform animations ────────────── */

@media (prefers-reduced-motion: reduce) {
  .plt-card-reveal,
  .plt-accent-breathe {
    animation: none !important;
    opacity: 1;
    transform: none;
  }
}
```

**Import strategy:** This stylesheet is imported in the platform page file:
```tsx
import '@/styles/platform.css'
```

Alternatively, if the marketing layout from WS-A.1 uses a `marketing.css` that aggregates sub-page styles, `platform.css` can be imported there. The decision is deferred to implementation -- either approach works because CSS imports are deduplicated by the build system.

---

### 4.12 File Manifest

Complete list of files created or modified by this workstream:

| # | File Path | Type | Server/Client |
|---|-----------|------|---------------|
| 1 | `src/app/(marketing)/platform/page.tsx` | New (replaces WS-A.1 placeholder) | Server |
| 2 | `src/lib/interfaces/platform.ts` | New | N/A (types only) |
| 3 | `src/lib/config/platform-data.ts` | New | N/A (data only) |
| 4 | `src/components/marketing/platform/platform-hero.tsx` | New | Server |
| 5 | `src/components/marketing/platform/portal-overview.tsx` | New | Server |
| 6 | `src/components/marketing/platform/portal-card.tsx` | New | Server |
| 7 | `src/components/marketing/platform/feature-grid.tsx` | New | Server |
| 8 | `src/components/marketing/platform/domain-card.tsx` | New | Server |
| 9 | `src/components/marketing/platform/integration-overview.tsx` | New | Server |
| 10 | `src/components/marketing/platform/platform-cta.tsx` | New | Server |
| 11 | `src/styles/platform.css` | New | N/A (CSS) |

**Total: 11 new files, 0 modified files.**

All components are server components (no `'use client'` directive). This maximizes SEO indexability and minimizes client-side JavaScript. The breathing glow on the CTA is CSS-only. The staggered card reveal animation is also CSS-only (no motion/react dependency for this page). If intersection-observer-triggered entrance animations are desired in the future, a small client component wrapper can be added without restructuring.

---

## 5. Acceptance Criteria

| ID | Criterion | Verification Method |
|----|-----------|---------------------|
| AC-1 | `/platform` route renders the platform page inside the marketing layout (header visible above, footer visible below) | Manual: navigate to `/platform` in dev server; verify header and footer presence |
| AC-2 | Page is fully server-rendered: no `'use client'` directive in any platform component file | Code review: grep for `'use client'` in `src/components/marketing/platform/` and `src/app/(marketing)/platform/` -- returns 0 results |
| AC-3 | HTML `<title>` is "Safetrekr Platform -- Trip Safety Management Features" and `<meta name="description">` matches WS-B.1 specification | DevTools: inspect `<head>` elements; verify title and description |
| AC-4 | Open Graph `og:title`, `og:description`, and `og:url` tags are present in page source | DevTools or `curl` page source; verify OG meta tags |
| AC-5 | H1 renders the correct headline text from WS-B.1: "Built for the people who plan the trip -- and the people who go." | Manual: visually verify on page |
| AC-6 | Portal overview section renders exactly 4 portal cards with correct names: Client Portal, Analyst Portal, HQ Console, Traveler App | Manual: count cards and verify names |
| AC-7 | Each portal card displays the portal name, role label, description text, and a screenshot placeholder container | Manual: inspect each of the 4 portal cards |
| AC-8 | Feature grid section renders exactly 6 domain cards with correct domain names: Planning & Analysis, Intelligence & Risk, Protection System, Traveler Delivery, Compliance & Audit, HQ Command | Manual: count cards and verify names |
| AC-9 | Each domain card displays the domain name, tagline H3, icon, and a bullet list of 7 features | Manual: inspect each of the 6 domain cards; verify bullet count |
| AC-10 | All 42 feature bullets on the page trace to **Implemented** features in `product-review-safetrekr-app-v2-verified.md` -- no scaffolded or planned features present | Code review: cross-reference `platform-data.ts` features against verified product review |
| AC-11 | Integration overview section renders with integration highlight list and architecture badge pills | Manual: scroll to integration section; verify content |
| AC-12 | Bottom CTA section renders H2 "See Safetrekr in action.", a "Schedule a Briefing" button linking to `/contact`, and micro-copy text | Manual: scroll to bottom; verify CTA text, button text, link href, micro-copy |
| AC-13 | CTA button has the `mkt-cta-breathe` class and displays the breathing glow animation | Manual: verify pulsing glow on CTA button (requires WS-A.1 `marketing.css` to be in place) |
| AC-14 | Glass-morphism on portal cards and domain cards uses the canonical recipe: `bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]`, `border border-white/[0.08]` | DevTools: inspect computed styles on card elements |
| AC-15 | At viewport widths < 768px, page renders in single-column layout with portal cards stacked and screenshot placeholders hidden | Manual: resize browser below 768px; verify single-column layout and hidden screenshots |
| AC-16 | At viewport widths 768px--1023px, domain cards render in a 2-column grid | Manual: resize to tablet width; verify 2-column domain grid |
| AC-17 | At viewport widths >= 1024px, domain cards render in a 3-column grid (3x2) | Manual: resize to desktop width; verify 3x2 domain grid |
| AC-18 | At viewport widths >= 1280px, portal cards render in a 4-column row | Manual: resize to wide desktop; verify 4-across portal layout |
| AC-19 | Page has correct heading hierarchy: single H1 (hero), then H2s for each section, then H3s for domain taglines | DevTools: inspect heading levels; verify no skipped levels, single H1 |
| AC-20 | All section containers use `<section>` elements with `aria-labelledby` pointing to their heading `id` | DevTools: inspect section elements and verify `aria-labelledby` attributes |
| AC-21 | Feature bullet lists use `<ul>` elements with `aria-labelledby` pointing to their domain heading | DevTools: inspect list elements |
| AC-22 | All Lucide icons in cards have `aria-hidden="true"` (decorative) | DevTools: inspect icon SVG elements |
| AC-23 | CTA link has appropriate accessible name ("Schedule a Briefing") | DevTools: inspect link; verify accessible name matches visible text |
| AC-24 | CTA button focus indicator matches codebase pattern: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]` | Manual: Tab to CTA button; verify green focus ring |
| AC-25 | `prefers-reduced-motion: reduce` disables all platform page animations (`plt-card-reveal`, `plt-accent-breathe`); content remains visible (opacity: 1) | Manual: enable reduced motion in OS; verify no animations and content still visible |
| AC-26 | All platform component files use ONLY spatial token CSS variables for colors -- no hardcoded hex values in component files (hex values allowed only in `platform.css` for animation keyframes if needed) | Code review: grep for `#[0-9a-fA-F]` in `src/components/marketing/platform/` -- returns 0 results |
| AC-27 | No `import` from `'framer-motion'` anywhere in platform files -- only `'motion/react'` if needed (currently not expected) | Code review: `grep -r "framer-motion" src/components/marketing/platform/` returns 0 results |
| AC-28 | `pnpm typecheck` passes with zero errors after all files are created | CLI: run `pnpm typecheck` |
| AC-29 | `pnpm lint` passes with zero errors after all files are created | CLI: run `pnpm lint` |
| AC-30 | `pnpm build` completes successfully | CLI: run `pnpm build` |
| AC-31 | Traveler App portal card screenshot placeholder uses portrait aspect ratio (9:16) while other portal cards use landscape (16:10) | DevTools: inspect aspect-ratio CSS on screenshot placeholder containers |
| AC-32 | Domain card hover state shows a subtle ember glow (`--glow-ember-subtle`) and brighter border (`border-white/[0.12]`) with a smooth CSS transition | Manual: hover over domain cards; verify glow appearance and smooth transition |

---

## 6. Decisions Made

| # | Decision | Rationale | Alternatives Considered |
|---|----------|-----------|------------------------|
| D-1 | All platform page components are server components (no `'use client'`) | Page is content-heavy with no interactive state. Server rendering maximizes SEO, minimizes JS payload, and ensures the full page content is in the initial HTML response. The only "animation" is CSS-only (breathing glow, card reveal). | Client components with `motion/react` entrance animations (adds ~30KB to client bundle for purely decorative animations that CSS handles adequately) |
| D-2 | Content data lives in `src/lib/config/platform-data.ts`, types in `src/lib/interfaces/platform.ts` | Follows codebase convention: types in `src/lib/interfaces/`, config as a separate concern [CODEBASE: CLAUDE.md]. Single source of truth for all platform page text, enabling copy updates without touching component files. | Inline content in components (makes copy updates require touching every component); CMS-driven content (over-engineering for launch -- no CMS exists) |
| D-3 | Six domains, not five -- includes "HQ Command" (Organization Management) as the sixth domain | The holistic overview lists six domains including "HQ Command." WS-B.1 Section 4.4.3 documents "Organization Management" as Domain 6 with full feature bullets. Combined recommendations also reference six domains. Dropping it would omit verified capabilities (RBAC, branding, 2FA, GDPR controls). | Five domains (would omit team management, branding, security features -- significant capability gap for enterprise evaluators) |
| D-4 | Lucide icons are used for portal and domain visual anchors | `lucide-react` is already in the project's `package.json` and used elsewhere in the codebase (e.g., `SpatialBreadcrumb.tsx`). Consistent icon library. Specific icon choices (`LayoutDashboard`, `Shield`, `ClipboardList`, etc.) are preliminary and can be swapped during implementation without changing component contracts -- icons are passed as data from `platform-data.ts`. | Custom SVG icons per domain (design overhead for launch; Lucide covers the use cases); no icons (reduces visual anchoring on a dense page) |
| D-5 | Platform CSS classes prefixed with `plt-` | Follows the namespace convention established by WS-A.1 (`mkt-` prefix for marketing, D-5) and the existing codebase (`gateway-`, `ambient-`). Prevents collision as the stylesheet count grows. | `platform-` prefix (longer but more readable); `mkt-platform-` (over-qualified); no prefix (collision risk with future stylesheets) |
| D-6 | CSS-only staggered card reveal instead of `motion/react` entrance animations | Keeps the page 100% server-rendered. CSS `animation-delay` on each card achieves the visual stagger. If intersection-observer-triggered animations are desired later, a thin client wrapper component (`<AnimateOnScroll>`) can be added without restructuring any existing component. | `motion/react` with `whileInView` (requires `'use client'` on every card or a parent wrapper, adds JS to the client bundle, creates a hydration boundary); no entrance animation (page loads as a static wall of cards -- less polished) |
| D-7 | Portal card screenshot placeholder is hidden on mobile (< 768px) | Mobile users are scrolling through a long page. Showing empty screenshot placeholders wastes viewport space and provides no value until real screenshots exist. The description text alone communicates the portal's purpose on mobile. | Show placeholder on all viewports (wastes mobile scroll space with "Coming soon" boxes); use a smaller thumbnail on mobile (still no content to show) |
| D-8 | Domain card hover glow uses `--glow-ember-subtle` (not `--glow-ember-medium`) | Subtle glow is more appropriate for content cards. Medium and bright glows are reserved for interactive elements (CTAs, selected states). Six simultaneously-glowing cards would be visually noisy. | `--glow-ember-medium` (too bright for a passive hover); no hover effect (makes the page feel static and unresponsive to interaction) |
| D-9 | Integration overview section uses "badge pill" architecture highlights instead of a data flow diagram | A static ASCII or SVG diagram would be hard to make accessible, hard to maintain, and adds complexity for minimal conversion value. Badge pills are scannable, accessible (just text), and communicate the key architectural differentiators. | ASCII data flow diagram from the product review (not accessible, poor mobile experience); interactive diagram (massive over-engineering for an optional section); no integration section (misses opportunity to communicate technical credibility) |
| D-10 | Feature bullets use custom CSS pseudo-element dots instead of default `list-style` | Default disc bullets are too large and cannot be color-matched to `--color-ember-muted`. Custom 4px circles (`before:w-1 before:h-1 before:rounded-full before:bg-[var(--color-ember-muted)]`) maintain the green accent throughout the card while keeping bullets subtle. | Default `list-style-disc` (cannot be colored with CSS alone in all browsers); SVG bullet icons (over-engineering); dash bullets (inconsistent with the visual system) |
| D-11 | Traveler App portal card uses `max-h-48` cap on screenshot placeholder | The 9:16 portrait aspect ratio would create a very tall placeholder that breaks row alignment in the 4-column desktop grid. Capping max height keeps the grid balanced while still communicating the mobile form factor. When real screenshots are added, the image should use `object-cover` to fill the capped container. | No height cap (grid row becomes very tall, dominated by one empty placeholder); use landscape screenshots for mobile app too (misrepresents the product) |
| D-12 | The `DomainData.features` array contains plain strings, not structured objects | Feature bullets are display-only text with no metadata requirements (no links, no status indicators, no icons). Plain strings keep the data shape simple and the component rendering trivial. If features later need categorization (e.g., "new", "beta"), the type can be extended to `string | { text: string; badge?: string }` without breaking existing consumers. | Structured objects with `text`, `icon`, `status` fields (YAGNI for launch); markdown strings (requires a parser for simple text) |

---

## 7. Open Questions

| # | Question | Impact | Owner | Resolution Deadline |
|---|----------|--------|-------|---------------------|
| OQ-1 | Should the portal cards link to anything (e.g., anchor links to a future portal detail section, or an external demo URL)? Currently they are static `<article>` elements, not links. | If linked, each card needs an `<a>` or `<Link>` wrapper, a destination URL, and focus/hover interaction states. Adding links is a non-breaking enhancement. | Product | Before implementation |
| OQ-2 | Should the "Schedule a Briefing" CTA button link to `/contact` or to an external scheduling tool (Calendly, etc.)? This mirrors OQ-1 from WS-A.1. | Affects the `href` value on the CTA `<Link>`. If external, needs `target="_blank"` and `rel="noopener noreferrer"` plus a visual indicator (external link icon). | Product | Before WS-A.4 implementation |
| OQ-3 | Is the "HQ Command" domain name correct for the sixth domain, or should it remain "Organization Management" as labeled in WS-B.1 Section 4.4.3? The holistic overview uses "HQ Command" while the copy SOW uses "Organization Management." | Affects the domain `name` field in `platform-data.ts` and the card heading text. Purely a copy decision. | WS-B.1 Copy Review | Before implementation |
| OQ-4 | Should the integration overview section be included at launch, or deferred? The combined recommendations mark it as "optional, simplified." If deferred, the `IntegrationOverview` component can be omitted from the page composition with no impact on other sections. | If deferred: remove 1 component from the page, simplify the data file. The section is self-contained and can be added later without modifying other components. | Product | Before implementation |
| OQ-5 | When real portal screenshots become available, what format should they be? Next.js `<Image>` with `next/image` would provide automatic optimization, but requires knowing dimensions ahead of time. | If `next/image`: need actual image files in `public/` or a remote source URL. If standard `<img>`: simpler but no optimization. The placeholder container already has the correct aspect ratio, so swapping in a real image is a minimal change. | Engineering | Before screenshots are ready (post-launch acceptable) |
| OQ-6 | Should domain cards use a "read more" expand/collapse pattern on mobile to reduce initial scroll depth, showing only the tagline and first 3 bullets with a "Show all" toggle? | Would require a client component for toggle state (`'use client'`). Currently all 7 bullets render on all viewports. On a ~400px mobile viewport, 6 domain cards x ~7 bullets = significant scroll depth. | Design / UX | Before implementation |

---

## 8. Risk Register

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|------------|--------|------------|
| R-1 | Glass-morphism `backdrop-blur` on 10 simultaneous cards (4 portal + 6 domain) causes scroll jank on low-end mobile devices | Medium | Medium | Test on real devices (target: iPhone SE 3rd gen, mid-range Android). If jank is detected, reduce blur radius to `backdrop-blur-[8px]` (from 16px) on mobile via `md:backdrop-blur-[16px]`. Worst case: remove `backdrop-blur` on mobile entirely and fall back to `bg-[var(--color-surface)]/90` (solid dark). Use `@supports (backdrop-filter: blur(16px))` to conditionally apply. Cards would still look good without blur -- the border and subtle background opacity carry the glass effect. |
| R-2 | Page is too long on mobile: 1 hero + 4 portal cards + 6 domain cards (7 bullets each) + integration section + CTA = estimated 12-15 screen-heights of scroll on a phone | Medium | Medium | Mitigated by: (a) hiding screenshot placeholders on mobile (D-7), saving ~400px per portal card; (b) potential collapse pattern for domain features (OQ-6); (c) the page serves evaluators doing feature comparison, who expect and accept a content-dense page. Monitor session depth analytics post-launch (WS-C.3). If bounce rate is high, consider tabbed or accordion domain navigation as a follow-up. |
| R-3 | WS-B.1 copy is not finalized before this workstream begins implementation | High | Low | Implementation can proceed with draft copy from WS-B.1 Section 4.4.3 (which is already comprehensive). Copy is isolated in `platform-data.ts` -- updating text is a single-file change with no component modifications. No risk of architectural rework from copy changes. |
| R-4 | Lucide icon selections do not visually communicate the domain concepts effectively | Low | Low | Icons are data-driven (passed via `platform-data.ts`), not hard-coded in components. Swapping an icon is a one-line change in the data file. Final icon selection can happen during visual review without any component changes. |
| R-5 | WCAG contrast ratio failure for domain name labels: `--color-ember-bright: #6abf84` on `bg-white/[0.06]` (which over `--color-void: #061a23` resolves to approximately `#0d2a34`) | Low | High | `#6abf84` on `#0d2a34` yields approximately 6.2:1 contrast ratio, which passes WCAG AA for normal text (requires 4.5:1) and AA for large text (requires 3:1). The domain name label is small text (12px), so the 4.5:1 threshold applies -- 6.2:1 passes. However, verify with a contrast checker during implementation using actual rendered colors (glass surface compositing can shift perceived contrast). If marginal, use `--color-ember-glow: #92d4a6` which provides higher contrast. |
| R-6 | Staggered CSS card reveal animation creates a delayed content paint, affecting Largest Contentful Paint (LCP) | Low | Medium | The `plt-card-reveal` animation is `0.5s` with staggered delays up to `0.5s + (9 * 80ms) = 1.22s` for the last card. However, the hero H1 is the LCP candidate (largest visible text), and it has no animation delay. Domain cards below the fold do not affect LCP. If CWV impact is detected, remove animation entirely -- content visibility is more important than polish. |
| R-7 | Content changes in the product review (features reclassified from Implemented to Scaffolded) invalidate feature bullets already published on the platform page | Low | Medium | Feature bullets in `platform-data.ts` include comments tracing to the product review section. Any re-verification pass can cross-reference the data file against the source document. The single-file content isolation makes updates fast. |

---

## Estimated Effort

**Size:** M (Medium)
**Estimated time:** 4-6 hours implementation + verification
**Files created:** 11 new files, 0 modified files
**Dependencies blocking start:** WS-A.1 (marketing layout must exist for the page to render inside it)
**Dependencies blocking content finalization:** WS-B.1 (final copy approval -- implementation can start with draft copy)
