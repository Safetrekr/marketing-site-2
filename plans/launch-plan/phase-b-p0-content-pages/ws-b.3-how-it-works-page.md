# WS-B.3: How It Works Page

> **Workstream ID:** WS-B.3
> **Phase:** B -- P0 Content Pages
> **Assigned Agent:** `react-developer`
> **Status:** Draft
> **Created:** 2026-03-02
> **Last Updated:** 2026-03-02
> **Depends On:** WS-A.1 (Marketing Route Group + Layout), WS-B.1 (Content Strategy + Copy Drafting)
> **Blocks:** None
> **Resolves:** Combined Recommendations -- How It Works page requirements

---

## 1. Objective

Build the `/how-it-works` page for the Safetrekr marketing site -- the page that converts curiosity into confidence by telling the complete system story in under three minutes of reading time. The page walks prospects through Safetrekr's four-phase trip lifecycle (Plan, Review, Protect, Monitor), with the independent analyst review as the visual and narrative centerpiece.

This page carries the heaviest persuasion burden in the site. The landing page declares what Safetrekr is. This page proves how it works. Every section must back its claims with specific, code-verified product capabilities: the 10-step wizard, 18 analyst review dimensions, 46-endpoint protection system, and geo-triggered traveler delivery.

The page renders as a server component inside the `(marketing)` layout from WS-A.1, with isolated client components only for the collapsible wizard accordion and the review dimension grid interaction. All copy is sourced from a static data module so the narrative strategist can update text without touching component code.

**Design intent:** Oblivion HUD dark glass-morphism aesthetic. The Review section (Phase 2) receives elevated visual treatment -- brighter glow, wider padding, distinct background tone -- to signal that independent analyst review is the platform's killer differentiator. No competitor offers this. The page must make that unmistakable.

---

## 2. Scope

### In Scope

| # | Item | Notes |
|---|------|-------|
| 1 | `src/app/(marketing)/how-it-works/page.tsx` | Server component with SEO metadata; composes all sections in sequence |
| 2 | Page data module (`src/lib/data/how-it-works.ts`) | All copy: hero, problem statement, phase headings/bodies, wizard steps, review dimensions, protection features, monitor features, documentation close, CTA |
| 3 | Type definitions (`src/lib/interfaces/how-it-works.ts`) | `Phase`, `WizardStep`, `ReviewDimension`, `ProtectionFeature`, `MonitorFeature`, `HowItWorksCta` |
| 4 | `PhaseLifecycleNav` server component | Horizontal (desktop) / vertical (mobile) visual showing Plan, Review, Protect, Monitor with connecting lines and phase icons |
| 5 | `PlanPhaseSection` server component | Phase 1 wrapper: heading, body, wizard stepper container |
| 6 | `WizardStepper` client component | Collapsible accordion of 10 wizard steps with expand/collapse interaction |
| 7 | `ReviewPhaseSection` server component | Phase 2 wrapper: CENTERPIECE treatment with elevated glass-morphism |
| 8 | `ReviewDimensionGrid` client component | Responsive grid of 18 review dimension cards with expand interaction on mobile |
| 9 | `ProtectPhaseSection` server component | Phase 3 wrapper: protection system feature cards in 2x3 grid |
| 10 | `MonitorPhaseSection` server component | Phase 4 wrapper: traveler app feature bullets |
| 11 | `DocumentationClosing` server component | Audit trail messaging section |
| 12 | `HowItWorksHero` server component | H1, H2 subheadline, phase lifecycle nav |
| 13 | `ProblemStatement` server component | Opening "Spreadsheets. Email chains." block |
| 14 | `BottomCtaSection` server component | "Schedule a Briefing" primary CTA + "Download Overview" secondary CTA. Shared component usable by other marketing pages. |
| 15 | Per-section illustration placeholders | Dashed-border placeholder divs with "Illustration" label for future design assets |
| 16 | Responsive behavior | Full-width sections on all breakpoints; grids collapse gracefully (3-col to 2-col to 1-col) |
| 17 | SEO metadata | `generateMetadata()` with title, description, canonical URL, OpenGraph tags |
| 18 | Accessibility | Semantic HTML, heading hierarchy (single H1, H2 per section, H3 for sub-sections), keyboard-navigable accordion, ARIA attributes on interactive elements |

### Out of Scope

| # | Item | Rationale |
|---|------|-----------|
| 1 | Final illustrations or screenshots | No designer assigned. Placeholder divs are created for future asset insertion. |
| 2 | Scroll-spy or sticky phase navigation | Adds complexity and motion-sickness risk. Static phase nav is sufficient for launch. Can be added post-launch. |
| 3 | Animated number counters | "18 dimensions" and "46 endpoints" are compelling as static text. Intersection Observer animations are Phase D polish. |
| 4 | Comparison table vs. competitors | No verified competitor data exists. The differentiator messaging ("No competitor offers this") is sufficient. |
| 5 | Video walkthroughs or embedded demos | No video assets exist. Placeholder can be added to illustration slots if video is produced post-launch. |
| 6 | Analytics instrumentation | WS-C.3 handles analytics events. This workstream creates the DOM structure; event tracking is wired later. |
| 7 | OG image generation | WS-C.4 handles social images. |
| 8 | Contact form or scheduling widget | WS-A.4 handles form backend. CTA links to `/contact`. |

---

## 3. Input Dependencies

### Codebase Files to Reference

| File | What to Use From It |
|------|---------------------|
| `src/app/(marketing)/layout.tsx` | Marketing layout (from WS-A.1). How It Works page renders inside `<main id="main-content">`. |
| `src/styles/spatial-tokens.css` | Safetrekr dark-mode tokens. Background: `--color-void: #061a23`. Primary accent: `--color-ember: #4ba467`, `--color-ember-bright: #6abf84`. Text: `--color-text-primary: #e8f0f4`, `--color-text-secondary: #929899`. Glows: `--glow-ember-medium`, `--glow-ember-bright`. RGB: `--ember-rgb: 75, 164, 103`. |
| `src/components/districts/detail-panel.tsx` | Glass-morphism reference recipe: `bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]` + `border border-white/[0.08]` + ember glow shadow. |
| `src/app/globals.css` | Tailwind theme bridge. Confirms `bg-void`, `text-text-primary`, `text-ember`, etc. are available as utilities. Font: `--font-sans` (Geist Sans), `--font-mono` (Geist Mono). |
| `src/lib/utils.ts` | `cn()` utility. Import: `import { cn } from '@/lib/utils'`. |
| `src/lib/config/marketing-nav.ts` | Navigation config from WS-A.1. Confirms `/how-it-works` is already in the header nav links. |

### Planning Documents

| Document | What to Use From It |
|----------|---------------------|
| `plans/launch-plan/phase-b-p0-content-pages/ws-b.1-content-strategy-copy-drafting.md` Section 4.4.2 | Complete copy for all sections: hero, problem statement, four phases, wizard steps, review dimensions, protection features, monitor features, documentation closing, bottom CTA. |
| `plans/launch-plan/initial-thoughts/product-review-safetrekr-app-v2-verified.md` Section 1 | 10-step wizard details (verified). |
| `plans/launch-plan/initial-thoughts/product-review-safetrekr-app-v2-verified.md` Section 8 | 18 analyst review dimensions (verified). Tiered assignment model. Evidence and activity tracking. Approval workflow. |
| `plans/launch-plan/initial-thoughts/product-review-safetrekr-app-v2-verified.md` Section 6 | 46-endpoint protection system (verified). Rally points, safe houses, musters, check-ins, evacuation plans, medical facilities, emergency kits, geofence sync. |
| `plans/launch-plan/initial-thoughts/product-review-safetrekr-app-v2-verified.md` Section 9 | Traveler app delivery, offline-first architecture, geofence monitoring, SMS broadcast. |
| `plans/launch-plan/combined-recommendations.md` lines 254-265 | Page requirements: four-phase lifecycle, centerpiece review section, wizard walkthrough, protection overview, bottom CTA. |

### External Dependencies

| Dependency | Owner | Status | Impact |
|------------|-------|--------|--------|
| Marketing layout shell | WS-A.1 | Pending | Cannot render page without `(marketing)/layout.tsx`. Header + footer wrap. |
| Finalized copy | WS-B.1 | Draft available | Draft copy from Section 4.4.2 is complete and can be used directly. Final polish may adjust wording but not structure. |
| Illustration assets | Unassigned (designer) | NOT STARTED | Placeholder divs are created. No visual impact on page structure. |
| Shared BottomCtaSection | WS-B.2 or this workstream | TBD (see Q-1) | If WS-B.2 ships first and creates a shared CTA component, this workstream reuses it. Otherwise, this workstream creates it. |

### Package Dependencies

No new packages required. All dependencies are already in the project:

| Package | Already Installed | Purpose |
|---------|-------------------|---------|
| `lucide-react` | Yes | Thin-stroke icons for phase indicators, wizard steps, feature cards |
| `motion/react` | Yes | Enter/exit animations for accordion expand/collapse (client components only) |
| `next/image` | Framework | Not needed unless illustrations include raster images. Placeholder divs use CSS only. |

---

## 4. Deliverables

### 4.1 Type Definitions (`src/lib/interfaces/how-it-works.ts`)

```typescript
// src/lib/interfaces/how-it-works.ts

/** One of the four lifecycle phases. */
export interface Phase {
  /** Unique phase identifier: 'plan' | 'review' | 'protect' | 'monitor' */
  id: 'plan' | 'review' | 'protect' | 'monitor'
  /** Display number (1-4) */
  number: number
  /** Short phase name for the lifecycle nav */
  label: string
  /** Lucide icon component name */
  iconName: string
  /** Heading (H2) for the phase section */
  heading: string
  /** Body paragraph(s) for the phase section */
  body: string
  /** Supporting statement after feature content */
  supportingStatement: string
  /** Inline objection hook text (optional, only Phase 2 uses this) */
  objectionHook?: string
}

/** One step of the 10-step trip creation wizard. */
export interface WizardStep {
  /** Step number (1-10) */
  number: number
  /** Step name (bold display) */
  name: string
  /** 1-2 sentence description */
  description: string
}

/** One of the 18 analyst review dimensions. */
export interface ReviewDimension {
  /** Dimension number (1-18) */
  number: number
  /** Dimension name */
  name: string
  /** Brief description of what the analyst reviews in this dimension */
  description: string
}

/** A protection system feature card. */
export interface ProtectionFeature {
  /** Unique identifier */
  id: string
  /** Feature name (bold display) */
  name: string
  /** 1-2 sentence description */
  description: string
  /** Lucide icon component name */
  iconName: string
}

/** A monitor/traveler delivery feature bullet. */
export interface MonitorFeature {
  /** Unique identifier */
  id: string
  /** Feature name (bold display) */
  name: string
  /** 1-2 sentence description */
  description: string
  /** Lucide icon component name */
  iconName: string
}

/** Bottom CTA configuration. */
export interface HowItWorksCta {
  /** CTA section headline */
  headline: string
  /** Supporting body text */
  body: string
  /** Primary CTA button label */
  primaryLabel: string
  /** Primary CTA href */
  primaryHref: string
  /** Primary CTA micro-copy */
  primaryMicrocopy: string
  /** Secondary CTA button label */
  secondaryLabel: string
  /** Secondary CTA href */
  secondaryHref: string
  /** Secondary CTA micro-copy */
  secondaryMicrocopy: string
}
```

### 4.2 Page Data Module (`src/lib/data/how-it-works.ts`)

Static data module exporting all page content. This is the single source of truth -- page and section components import from here and never contain inline content strings.

All copy below is sourced from `ws-b.1-content-strategy-copy-drafting.md` Section 4.4.2 and the verified product review. The copy is reproduced verbatim from the approved draft.

```typescript
// src/lib/data/how-it-works.ts

import type {
  Phase,
  WizardStep,
  ReviewDimension,
  ProtectionFeature,
  MonitorFeature,
  HowItWorksCta,
} from '@/lib/interfaces/how-it-works'

// ---------------------------------------------------------------------------
// SEO
// ---------------------------------------------------------------------------

export const HOW_IT_WORKS_SEO = {
  title: 'How Safetrekr Works -- Plan, Review, Protect, Monitor',
  description:
    'Four phases cover the full trip lifecycle. Independent analyst review across 18 dimensions. 46-endpoint protection system. Geo-triggered traveler delivery. See how Safetrekr documents every safeguard.',
  canonical: '/how-it-works',
} as const

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const HERO = {
  h1: 'From trip planning to traveler protection. One system of record.',
  h2: 'Safetrekr replaces scattered spreadsheets, email chains, and paper checklists with a verified, auditable safety platform that covers every stage of the trip lifecycle.',
} as const

// ---------------------------------------------------------------------------
// Problem Statement
// ---------------------------------------------------------------------------

export const PROBLEM_STATEMENT = {
  intro: 'Spreadsheets. Email chains. Paper checklists. Hope.',
  body: 'That is how most organizations manage trip safety today. It works -- until it does not. Until a background check expires and nobody notices. Until an emergency contact form is missing and nobody follows up. Until someone asks: "Did you do everything you could?"',
  close: 'Safetrekr replaces hope with a system.',
} as const

// ---------------------------------------------------------------------------
// Phases
// ---------------------------------------------------------------------------

export const PHASES: Phase[] = [
  {
    id: 'plan',
    number: 1,
    label: 'Plan',
    iconName: 'ClipboardList',
    heading: 'Plan with structure, not spreadsheets.',
    body: "Safetrekr's 10-step trip creation wizard walks administrators through every detail a safety reviewer needs -- from basic logistics to emergency preparedness. The wizard enforces completeness at each stage, reducing back-and-forth between trip organizers and safety teams.",
    supportingStatement:
      'Every trip starts as a draft and moves through a clear lifecycle: draft, in review, active, in progress, completed. Nothing falls through the cracks because the system enforces the process.',
  },
  {
    id: 'review',
    number: 2,
    label: 'Review',
    iconName: 'ShieldCheck',
    heading: 'Verify with independence, not assumption.',
    body: 'This is what makes Safetrekr fundamentally different. Every trip submitted by an organization passes through an independent analyst review before it can be approved for travel. The analyst is not part of the trip planning team. They are a separate pair of eyes -- enforced by the platform, not by policy.',
    supportingStatement:
      'Analysts are assigned by tier: junior analysts review day trips, mid-level analysts handle domestic overnight travel, senior analysts cover international trips. Each analyst\'s workload is tracked, and every review decision is timestamped and attributed.',
    objectionHook:
      '"We already have a safety review process." -- Safetrekr does not replace your process. It documents and standardizes it, adds independent verification, and creates the audit trail that proves it happened.',
  },
  {
    id: 'protect',
    number: 3,
    label: 'Protect',
    iconName: 'Shield',
    heading: 'Protect with systems, not checklists on a shelf.',
    body: "Safetrekr's protection system goes beyond static emergency preparedness data. A 46-endpoint API manages rally points, safe houses, musters, check-ins, and evacuation plans -- all connected to active geofencing on travelers' devices.",
    supportingStatement:
      'Emergency preparedness is not a binder on a shelf. It is an active, connected system that knows where your travelers are and what threats are nearby.',
  },
  {
    id: 'monitor',
    number: 4,
    label: 'Monitor',
    iconName: 'Radio',
    heading: 'Deliver to every traveler. Document every interaction.',
    body: "The Safetrekr Traveler App puts safety information directly in participants' hands -- with proof that it was received.",
    supportingStatement:
      'When a parent asks whether their child received the safety briefing, the answer is not "we sent an email." The answer is: "They acknowledged it on their phone at 3:47 PM on Tuesday. Here is the record."',
  },
]

// ---------------------------------------------------------------------------
// Wizard Steps (Phase 1)
// ---------------------------------------------------------------------------

export const WIZARD_STEPS: WizardStep[] = [
  {
    number: 1,
    name: 'Trip Type Selection',
    description:
      'Choose the complexity tier: T1 (day trip), T2 (domestic overnight), or T3 (international). The selected tier determines which safety requirements apply.',
  },
  {
    number: 2,
    name: 'Basic Information',
    description:
      'Trip name, destination, travel dates, departure city, purpose, rally point, and point of contact.',
  },
  {
    number: 3,
    name: 'Participants',
    description:
      'Add travelers, chaperones, and guardians individually or in bulk. CSV and Excel import with intelligent field matching and automatic deduplication.',
  },
  {
    number: 4,
    name: 'Air Travel',
    description:
      'Flight details with built-in flight lookup that auto-populates airline, airport, terminal, and gate from a flight number.',
  },
  {
    number: 5,
    name: 'Lodging',
    description:
      'Accommodations with check-in/check-out dates, floor assignments, and contact information. Automatic fire safety flagging for rooms above the sixth floor.',
  },
  {
    number: 6,
    name: 'Venues',
    description:
      'Every venue catalogued by category: museum, historical site, educational facility, sports venue, entertainment venue, restaurant, park, or other.',
  },
  {
    number: 7,
    name: 'Itinerary',
    description:
      'Day-by-day event schedule with times and locations. Events from flights, lodging, and venues are auto-populated.',
  },
  {
    number: 8,
    name: 'Transportation',
    description:
      'Ground transportation modes between events: walking, public transit, rideshare, charter bus, or private vehicles.',
  },
  {
    number: 9,
    name: 'Add-Ons',
    description:
      'Optional services including background check packages, travel insurance, and accessibility or dietary tracking. Pricing calculated in real time.',
  },
  {
    number: 10,
    name: 'Review',
    description:
      'Final summary of every detail for confirmation before submission to safety review.',
  },
]

// ---------------------------------------------------------------------------
// Review Dimensions (Phase 2 -- CENTERPIECE)
// ---------------------------------------------------------------------------

export const REVIEW_DIMENSIONS_HEADER = {
  subheading: '18 review dimensions. One independent analyst.',
} as const

export const REVIEW_DIMENSIONS: ReviewDimension[] = [
  { number: 1, name: 'Overview', description: 'Trip summary and key metrics' },
  { number: 2, name: 'Participants', description: 'Roster verification' },
  { number: 3, name: 'Air Travel', description: 'Flight details review' },
  {
    number: 4,
    name: 'Lodging',
    description:
      'Accommodation review with interactive map and fire safety assessment',
  },
  { number: 5, name: 'Venues', description: 'Venue review with map overlay' },
  { number: 6, name: 'Itinerary', description: 'Day-by-day timeline review' },
  {
    number: 7,
    name: 'Transportation',
    description: 'Ground transport review',
  },
  {
    number: 8,
    name: 'Safety Review',
    description:
      'Safety checklist verification with participant compliance tracking',
  },
  {
    number: 9,
    name: 'Emergency Preparedness',
    description:
      'Contacts, services, facilities, evacuation plans, and kit profiles',
  },
  {
    number: 10,
    name: 'Documents',
    description: 'Document requirement and submission status verification',
  },
  {
    number: 11,
    name: 'Background Checks',
    description:
      'Screening status verification across all participants and check types',
  },
  {
    number: 12,
    name: 'Intel Alerts',
    description: 'Real-time alert review and acknowledgment workflow',
  },
  {
    number: 13,
    name: 'Issues',
    description: 'Issue flagging, categorization, and resolution tracking',
  },
  {
    number: 14,
    name: 'Evidence and Activity',
    description: 'Evidence management and documented audit trail',
  },
  {
    number: 15,
    name: 'Checklists',
    description:
      'Assignment, release timing, audience targeting, and acknowledgment tracking',
  },
  {
    number: 16,
    name: 'Packet Builder',
    description: 'Trip packet assembly for role-based distribution',
  },
  {
    number: 17,
    name: 'Communications',
    description: 'Activity tracking',
  },
  {
    number: 18,
    name: 'Approval',
    description:
      'Final approve, reject, or conditional approval with documented reason codes',
  },
]

// ---------------------------------------------------------------------------
// Protection Features (Phase 3)
// ---------------------------------------------------------------------------

export const PROTECTION_FEATURES: ProtectionFeature[] = [
  {
    id: 'rally-points',
    name: 'Rally Points',
    description:
      'Designated assembly locations with GPS coordinates, contact information, and automatic geofence creation. Geofences alert on entry.',
    iconName: 'MapPin',
  },
  {
    id: 'safe-houses',
    name: 'Safe Houses',
    description:
      'Vetted safe locations with approval workflows and automatic geofence creation. Geofences alert on exit -- tracking when travelers leave safe zones.',
    iconName: 'Home',
  },
  {
    id: 'evacuation-plans',
    name: 'Evacuation Plans',
    description:
      'Three escalation tiers: shelter in place, local evacuation, and full relocation. Each with designated decision-makers and transport protocols.',
    iconName: 'Route',
  },
  {
    id: 'medical-facilities',
    name: 'Medical Facility Directory',
    description:
      'Nearby facilities catalogued with trauma capability levels (Level I through Level V), estimated travel times, and primary/backup designation.',
    iconName: 'Hospital',
  },
  {
    id: 'emergency-kits',
    name: 'Emergency Kit Profiles',
    description:
      'Recommended medical kit configurations based on group composition, environment type, and expected emergency response times.',
    iconName: 'BriefcaseMedical',
  },
  {
    id: 'real-time-intel',
    name: 'Real-Time Intelligence',
    description:
      'TarvaRI intelligence engine monitors destinations for security, weather, health, transport, and political risks. Alerts are risk-scored with percentile confidence bands and analyst-triaged before delivery.',
    iconName: 'Radar',
  },
]

// ---------------------------------------------------------------------------
// Monitor Features (Phase 4)
// ---------------------------------------------------------------------------

export const MONITOR_FEATURES: MonitorFeature[] = [
  {
    id: 'live-delivery',
    name: 'Live Trip Delivery',
    description:
      'Itineraries, safety checklists, intelligence alerts, and emergency preparedness information delivered to a native mobile app.',
    iconName: 'Smartphone',
  },
  {
    id: 'offline-first',
    name: 'Offline-First Architecture',
    description:
      'All critical trip data cached locally in SQLite. Travelers can access safety information even without network connectivity.',
    iconName: 'WifiOff',
  },
  {
    id: 'geo-checklists',
    name: 'Geo-Triggered Checklists',
    description:
      'Context-appropriate safety guidance activated when participants enter designated zones. Pre-departure checklists triggered by date.',
    iconName: 'MapPinCheck',
  },
  {
    id: 'acknowledgment',
    name: 'Alert Acknowledgment',
    description:
      'Two-way confirmation that safety-critical information has been received and reviewed. Every acknowledgment recorded.',
    iconName: 'CheckCheck',
  },
  {
    id: 'geofence-monitoring',
    name: 'Geofence Monitoring',
    description:
      'Background location monitoring against trip-defined zones. Violation alerts surface to chaperones and guardians when travelers leave safe zones.',
    iconName: 'Radar',
  },
  {
    id: 'sms-broadcast',
    name: 'SMS Emergency Broadcast',
    description:
      'Chaperones can send SMS broadcast messages to all trip participants directly from the app.',
    iconName: 'MessageSquareWarning',
  },
]

// ---------------------------------------------------------------------------
// Documentation Closing
// ---------------------------------------------------------------------------

export const DOCUMENTATION_CLOSING = {
  heading: 'Document everything. Prove everything.',
  body: [
    'Every action in Safetrekr is logged: trip creation, participant additions, document submissions, analyst reviews, approval decisions, alert deliveries, checklist acknowledgments. The audit trail captures who did what, when, and why.',
    'When stakeholders ask questions -- when a superintendent, a board member, an insurance provider, or a parent asks what safeguards were in place -- you have answers. Timestamped, attributed, and complete.',
  ],
} as const

// ---------------------------------------------------------------------------
// Bottom CTA
// ---------------------------------------------------------------------------

export const BOTTOM_CTA: HowItWorksCta = {
  headline: 'Your travelers trust you to bring them home safely.',
  body: 'Safetrekr makes sure that trust is backed by a system -- not just good intentions.',
  primaryLabel: 'Schedule a Briefing',
  primaryHref: '/contact',
  primaryMicrocopy: '20 minutes. No obligation.',
  secondaryLabel: 'Download the Platform Overview',
  secondaryHref: '/resources/platform-overview',
  secondaryMicrocopy: '4-page overview. PDF.',
}
```

### 4.3 Page Component (`src/app/(marketing)/how-it-works/page.tsx`)

Server component that composes all sections. Exports `generateMetadata()` for SEO. Renders inside the `(marketing)` layout from WS-A.1.

```typescript
// src/app/(marketing)/how-it-works/page.tsx

import type { Metadata } from 'next'

import { HOW_IT_WORKS_SEO } from '@/lib/data/how-it-works'
import { HowItWorksHero } from '@/components/marketing/how-it-works/hero'
import { ProblemStatement } from '@/components/marketing/how-it-works/problem-statement'
import { PhaseLifecycleNav } from '@/components/marketing/how-it-works/phase-lifecycle-nav'
import { PlanPhaseSection } from '@/components/marketing/how-it-works/plan-phase-section'
import { ReviewPhaseSection } from '@/components/marketing/how-it-works/review-phase-section'
import { ProtectPhaseSection } from '@/components/marketing/how-it-works/protect-phase-section'
import { MonitorPhaseSection } from '@/components/marketing/how-it-works/monitor-phase-section'
import { DocumentationClosing } from '@/components/marketing/how-it-works/documentation-closing'
import { BottomCtaSection } from '@/components/marketing/shared/bottom-cta-section'

export function generateMetadata(): Metadata {
  return {
    title: HOW_IT_WORKS_SEO.title,
    description: HOW_IT_WORKS_SEO.description,
    alternates: { canonical: HOW_IT_WORKS_SEO.canonical },
    openGraph: {
      title: HOW_IT_WORKS_SEO.title,
      description: HOW_IT_WORKS_SEO.description,
      url: HOW_IT_WORKS_SEO.canonical,
      type: 'website',
    },
  }
}

export default function HowItWorksPage() {
  return (
    <>
      <HowItWorksHero />
      <ProblemStatement />
      <PhaseLifecycleNav />
      <PlanPhaseSection />
      <ReviewPhaseSection />
      <ProtectPhaseSection />
      <MonitorPhaseSection />
      <DocumentationClosing />
      <BottomCtaSection page="how-it-works" />
    </>
  )
}
```

**Component tree diagram:**

```
(marketing)/layout.tsx              (server -- from WS-A.1)
  MarketingHeader                   (client -- from WS-A.1)
  <main id="main-content">
    how-it-works/page.tsx           (server)
      HowItWorksHero               (server)
      ProblemStatement              (server)
      PhaseLifecycleNav             (server)
      PlanPhaseSection              (server)
        WizardStepper               (CLIENT -- accordion interaction)
      ReviewPhaseSection            (server)
        ReviewDimensionGrid         (CLIENT -- expand interaction)
      ProtectPhaseSection           (server)
      MonitorPhaseSection           (server)
      DocumentationClosing          (server)
      BottomCtaSection              (server)
  MarketingFooter                   (server -- from WS-A.1)
```

### 4.4 Section Components

All section components live in `src/components/marketing/how-it-works/`. The shared `BottomCtaSection` lives in `src/components/marketing/shared/`.

#### 4.4.1 HowItWorksHero (`src/components/marketing/how-it-works/hero.tsx`)

Server component. Renders the H1 headline and H2 subheadline.

```typescript
// src/components/marketing/how-it-works/hero.tsx

import { HERO } from '@/lib/data/how-it-works'

export function HowItWorksHero() {
  return (
    <section className="mx-auto max-w-4xl px-6 pt-24 pb-12 text-center lg:px-8 lg:pt-32 lg:pb-16">
      <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-5xl">
        {HERO.h1}
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)] lg:text-xl">
        {HERO.h2}
      </p>
    </section>
  )
}
```

**Styling notes:**
- Top padding accounts for the fixed header from WS-A.1 (the marketing layout adds `scroll-padding-top` or the page adds its own `pt-24`).
- Text centered. H1 scales from `text-3xl` (mobile) to `text-5xl` (desktop).
- H2 is muted secondary text. Max-width `2xl` to prevent lines from stretching too wide.

#### 4.4.2 ProblemStatement (`src/components/marketing/how-it-works/problem-statement.tsx`)

Server component. The "Spreadsheets. Email chains." opening.

```typescript
// src/components/marketing/how-it-works/problem-statement.tsx

import { cn } from '@/lib/utils'
import { PROBLEM_STATEMENT } from '@/lib/data/how-it-works'

export function ProblemStatement() {
  return (
    <section
      className={cn(
        'mx-auto max-w-3xl px-6 py-12 lg:px-8 lg:py-16',
        // Glass card
        'rounded-2xl',
        'bg-white/[0.04] backdrop-blur-[12px]',
        'border border-white/[0.06]',
      )}
    >
      <p className="text-xl font-semibold tracking-wide text-[var(--color-ember-bright)] lg:text-2xl">
        {PROBLEM_STATEMENT.intro}
      </p>
      <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)] lg:text-lg">
        {PROBLEM_STATEMENT.body}
      </p>
      <p className="mt-6 text-lg font-medium text-[var(--color-text-primary)] lg:text-xl">
        {PROBLEM_STATEMENT.close}
      </p>
    </section>
  )
}
```

**Styling notes:**
- Light glass-morphism card (`0.04` opacity -- lighter than standard `0.06` to differentiate from phase cards).
- The intro line ("Spreadsheets. Email chains.") is styled in the primary accent color (`--color-ember-bright` / green) for emphasis.
- The closing line ("Safetrekr replaces hope with a system.") returns to full-bright primary text.

#### 4.4.3 PhaseLifecycleNav (`src/components/marketing/how-it-works/phase-lifecycle-nav.tsx`)

Server component. A static horizontal visual (desktop) or vertical list (mobile) showing the four phases with icons and connecting lines.

```typescript
// src/components/marketing/how-it-works/phase-lifecycle-nav.tsx

import { cn } from '@/lib/utils'
import { PHASES } from '@/lib/data/how-it-works'
// Import Lucide icons by name mapping
import {
  ClipboardList,
  ShieldCheck,
  Shield,
  Radio,
} from 'lucide-react'

const ICON_MAP = {
  ClipboardList,
  ShieldCheck,
  Shield,
  Radio,
} as const

export function PhaseLifecycleNav() {
  return (
    <nav
      aria-label="Trip lifecycle phases"
      className="mx-auto max-w-4xl px-6 py-12 lg:px-8 lg:py-16"
    >
      {/* Desktop: horizontal row */}
      <ol className="hidden items-center justify-between md:flex">
        {PHASES.map((phase, i) => {
          const Icon = ICON_MAP[phase.iconName as keyof typeof ICON_MAP]
          return (
            <li
              key={phase.id}
              className="flex flex-1 items-center"
            >
              {/* Phase node */}
              <a
                href={`#phase-${phase.id}`}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-xl px-4 py-3',
                  'transition-colors duration-200',
                  'hover:bg-white/[0.04]',
                  'focus-visible:outline-2 focus-visible:outline-offset-2',
                  'focus-visible:outline-[var(--color-ember-bright)]',
                )}
              >
                <div
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-full',
                    'bg-[var(--color-ember-dim)] text-[var(--color-ember-bright)]',
                    'border border-[var(--color-ember-muted)]',
                  )}
                >
                  {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
                  Phase {phase.number}
                </span>
                <span className="text-sm font-medium text-[var(--color-text-primary)]">
                  {phase.label}
                </span>
              </a>
              {/* Connector line (not after last) */}
              {i < PHASES.length - 1 && (
                <div
                  className="h-px flex-1 bg-gradient-to-r from-[var(--color-ember-muted)] to-transparent"
                  aria-hidden="true"
                />
              )}
            </li>
          )
        })}
      </ol>

      {/* Mobile: vertical list */}
      <ol className="flex flex-col gap-3 md:hidden">
        {PHASES.map((phase) => {
          const Icon = ICON_MAP[phase.iconName as keyof typeof ICON_MAP]
          return (
            <li key={phase.id}>
              <a
                href={`#phase-${phase.id}`}
                className={cn(
                  'flex items-center gap-4 rounded-xl px-4 py-3',
                  'bg-white/[0.03]',
                  'border border-white/[0.04]',
                  'transition-colors duration-200',
                  'hover:bg-white/[0.06]',
                  'focus-visible:outline-2 focus-visible:outline-offset-2',
                  'focus-visible:outline-[var(--color-ember-bright)]',
                )}
              >
                <div
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                    'bg-[var(--color-ember-dim)] text-[var(--color-ember-bright)]',
                  )}
                >
                  {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)]">
                    Phase {phase.number}
                  </span>
                  <span className="ml-2 text-sm font-medium text-[var(--color-text-primary)]">
                    {phase.label}
                  </span>
                </div>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
```

**Styling notes:**
- Desktop: horizontal `flex` row with phase nodes connected by gradient connector lines.
- Mobile: vertical `flex-col` list with compact phase cards.
- Each phase node links to `#phase-{id}` anchors on the corresponding section (in-page navigation).
- Phase icons rendered inside circular badges with green accent background (`--color-ember-dim` bg, `--color-ember-bright` icon).
- Keyboard navigable. Focus ring uses `--color-ember-bright`.

#### 4.4.4 PlanPhaseSection (`src/components/marketing/how-it-works/plan-phase-section.tsx`)

Server component wrapper for Phase 1. Contains the heading, body text, and the `WizardStepper` client component.

```typescript
// src/components/marketing/how-it-works/plan-phase-section.tsx

import { cn } from '@/lib/utils'
import { PHASES, WIZARD_STEPS } from '@/lib/data/how-it-works'
import { WizardStepper } from './wizard-stepper'

export function PlanPhaseSection() {
  const phase = PHASES[0] // plan

  return (
    <section
      id="phase-plan"
      aria-labelledby="phase-plan-heading"
      className="mx-auto max-w-5xl px-6 py-16 lg:px-8 lg:py-24"
    >
      {/* Phase badge */}
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-ember)]">
        Phase {phase.number} -- {phase.label}
      </p>

      {/* Heading */}
      <h2
        id="phase-plan-heading"
        className="mt-3 text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl lg:text-4xl"
      >
        {phase.heading}
      </h2>

      {/* Body */}
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--color-text-secondary)] lg:text-lg">
        {phase.body}
      </p>

      {/* Wizard stepper (client component) */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
          10-Step Trip Creation Wizard
        </h3>
        <WizardStepper steps={WIZARD_STEPS} />
      </div>

      {/* Supporting statement */}
      <p className="mt-8 max-w-3xl text-sm leading-relaxed text-[var(--color-text-tertiary)] italic lg:text-base">
        {phase.supportingStatement}
      </p>

      {/* Illustration placeholder */}
      <div
        className={cn(
          'mt-10 flex h-48 items-center justify-center rounded-2xl',
          'border-2 border-dashed border-white/[0.08]',
          'text-sm text-[var(--color-text-ghost)]',
        )}
        aria-hidden="true"
      >
        Illustration: Trip creation wizard
      </div>
    </section>
  )
}
```

#### 4.4.5 WizardStepper (`src/components/marketing/how-it-works/wizard-stepper.tsx`)

**Client component.** Collapsible accordion showing 10 wizard steps. Each step shows a number badge and name. Clicking a step expands its description. Multiple steps can be open simultaneously.

```typescript
'use client'

// src/components/marketing/how-it-works/wizard-stepper.tsx

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { WizardStep } from '@/lib/interfaces/how-it-works'

interface WizardStepperProps {
  steps: WizardStep[]
}

export function WizardStepper({ steps }: WizardStepperProps) {
  const [openSteps, setOpenSteps] = useState<Set<number>>(new Set())

  const toggleStep = useCallback((stepNumber: number) => {
    setOpenSteps((prev) => {
      const next = new Set(prev)
      if (next.has(stepNumber)) {
        next.delete(stepNumber)
      } else {
        next.add(stepNumber)
      }
      return next
    })
  }, [])

  const expandAll = useCallback(() => {
    setOpenSteps(new Set(steps.map((s) => s.number)))
  }, [steps])

  const collapseAll = useCallback(() => {
    setOpenSteps(new Set())
  }, [])

  const allOpen = openSteps.size === steps.length

  return (
    <div className="mt-4">
      {/* Expand/collapse all toggle */}
      <div className="mb-3 flex justify-end">
        <button
          type="button"
          onClick={allOpen ? collapseAll : expandAll}
          className={cn(
            'text-xs font-medium text-[var(--color-ember-bright)]',
            'hover:text-[var(--color-ember-glow)]',
            'transition-colors duration-150',
            'focus-visible:outline-2 focus-visible:outline-offset-2',
            'focus-visible:outline-[var(--color-ember-bright)]',
          )}
        >
          {allOpen ? 'Collapse all' : 'Expand all'}
        </button>
      </div>

      {/* Step list */}
      <ol className="space-y-2">
        {steps.map((step) => {
          const isOpen = openSteps.has(step.number)
          return (
            <li
              key={step.number}
              className={cn(
                'rounded-xl',
                'bg-white/[0.03]',
                'border border-white/[0.06]',
                'transition-colors duration-200',
                isOpen && 'bg-white/[0.05] border-white/[0.08]',
              )}
            >
              <button
                type="button"
                onClick={() => toggleStep(step.number)}
                aria-expanded={isOpen}
                aria-controls={`wizard-step-${step.number}-content`}
                className={cn(
                  'flex w-full items-center gap-4 px-4 py-3 text-left',
                  'focus-visible:outline-2 focus-visible:outline-offset-[-2px]',
                  'focus-visible:outline-[var(--color-ember-bright)]',
                  'rounded-xl',
                )}
              >
                {/* Number badge */}
                <span
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                    'bg-[var(--color-ember-dim)] text-[var(--color-ember-bright)]',
                    'text-sm font-bold',
                  )}
                >
                  {step.number}
                </span>

                {/* Step name */}
                <span className="flex-1 text-sm font-medium text-[var(--color-text-primary)]">
                  {step.name}
                </span>

                {/* Chevron */}
                <ChevronDown
                  className={cn(
                    'h-4 w-4 shrink-0 text-[var(--color-text-tertiary)]',
                    'transition-transform duration-200',
                    isOpen && 'rotate-180',
                  )}
                  aria-hidden="true"
                />
              </button>

              {/* Expandable content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`wizard-step-${step.number}-content`}
                    role="region"
                    aria-labelledby={`wizard-step-${step.number}-trigger`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-4 pl-16 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                      {step.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
```

**Interaction notes:**
- Steps default to collapsed. User can expand any step individually.
- "Expand all / Collapse all" toggle at top-right.
- `AnimatePresence` from `motion/react` handles smooth height animations.
- Number badge aligns with the phase lifecycle nav badge styling.
- `aria-expanded` and `aria-controls` for screen reader support.
- Focus ring on each step trigger.

#### 4.4.6 ReviewPhaseSection (`src/components/marketing/how-it-works/review-phase-section.tsx`)

**Server component. CENTERPIECE section.** This is the most visually prominent section on the page. It receives elevated glass-morphism treatment to signal that independent analyst review is the killer differentiator.

```typescript
// src/components/marketing/how-it-works/review-phase-section.tsx

import { cn } from '@/lib/utils'
import {
  PHASES,
  REVIEW_DIMENSIONS_HEADER,
  REVIEW_DIMENSIONS,
} from '@/lib/data/how-it-works'
import { ReviewDimensionGrid } from './review-dimension-grid'

export function ReviewPhaseSection() {
  const phase = PHASES[1] // review

  return (
    <section
      id="phase-review"
      aria-labelledby="phase-review-heading"
      className={cn(
        // Full-bleed background treatment for the centerpiece
        'relative py-16 lg:py-24',
        // Subtle radial gradient spotlight behind the section
        'before:pointer-events-none before:absolute before:inset-0',
        'before:bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(var(--ember-rgb),0.06),transparent)]',
      )}
    >
      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        {/* Elevated glass card wrapping the entire section */}
        <div
          className={cn(
            'rounded-3xl p-8 lg:p-12',
            // Elevated glass -- brighter than standard cards
            'bg-white/[0.08] backdrop-blur-[16px] backdrop-saturate-[130%]',
            'border border-white/[0.10]',
            // Ember glow shadow (elevated variant)
            'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_0_1px_0_rgba(var(--ember-rgb),0.4),0_0_32px_rgba(var(--ember-rgb),0.12)]',
          )}
        >
          {/* Phase badge */}
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-ember)]">
            Phase {phase.number} -- {phase.label}
          </p>

          {/* Heading */}
          <h2
            id="phase-review-heading"
            className="mt-3 text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl lg:text-4xl"
          >
            {phase.heading}
          </h2>

          {/* Body */}
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--color-text-secondary)] lg:text-lg">
            {phase.body}
          </p>

          {/* Stat callout */}
          <div className="mt-8 flex items-baseline gap-3">
            <span className="text-5xl font-bold text-[var(--color-ember-bright)] lg:text-6xl">
              18
            </span>
            <span className="text-lg text-[var(--color-text-secondary)]">
              review dimensions. One independent analyst.
            </span>
          </div>

          {/* Review dimension grid (client component) */}
          <div className="mt-8">
            <ReviewDimensionGrid dimensions={REVIEW_DIMENSIONS} />
          </div>

          {/* Supporting statement */}
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-[var(--color-text-tertiary)] lg:text-base">
            {phase.supportingStatement}
          </p>

          {/* Objection hook */}
          {phase.objectionHook && (
            <blockquote
              className={cn(
                'mt-8 rounded-xl px-6 py-4',
                'border-l-2 border-[var(--color-ember)]',
                'bg-white/[0.03]',
                'text-sm leading-relaxed text-[var(--color-text-secondary)] italic',
              )}
            >
              {phase.objectionHook}
            </blockquote>
          )}
        </div>

        {/* Illustration placeholder */}
        <div
          className={cn(
            'mx-auto mt-10 flex h-56 max-w-4xl items-center justify-center rounded-2xl',
            'border-2 border-dashed border-white/[0.08]',
            'text-sm text-[var(--color-text-ghost)]',
          )}
          aria-hidden="true"
        >
          Illustration: Analyst review workspace
        </div>
      </div>
    </section>
  )
}
```

**Centerpiece visual treatment rationale:**

1. **Elevated glass-morphism:** Background opacity `0.08` (vs standard `0.06`), border opacity `0.10` (vs `0.08`), stronger ember glow shadow with `0.4` proximity glow and `0.12` ambient spread.
2. **Radial gradient spotlight:** A subtle `before:` pseudo-element creates a green-tinted radial gradient above the section, drawing the eye.
3. **Large stat callout:** "18" rendered at `text-5xl` / `text-6xl` in primary accent color. This is the single most memorable number on the page.
4. **Rounded `3xl` card:** Larger border radius than other sections (`2xl`), signaling visual importance.
5. **Full-bleed background:** The section breaks out of the standard `max-w-5xl` container for the background treatment while the content remains centered.

#### 4.4.7 ReviewDimensionGrid (`src/components/marketing/how-it-works/review-dimension-grid.tsx`)

**Client component.** Renders 18 review dimensions in a responsive grid. On mobile, dimensions show only number and name; tapping expands the description. On desktop, all descriptions are always visible (the grid has enough space).

```typescript
'use client'

// src/components/marketing/how-it-works/review-dimension-grid.tsx

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import type { ReviewDimension } from '@/lib/interfaces/how-it-works'

interface ReviewDimensionGridProps {
  dimensions: ReviewDimension[]
}

export function ReviewDimensionGrid({ dimensions }: ReviewDimensionGridProps) {
  // Mobile-only expand state
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const toggleDimension = useCallback((id: number) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }, [])

  return (
    <ul
      className={cn(
        'grid gap-3',
        'grid-cols-1',        // mobile: 1 col
        'sm:grid-cols-2',     // tablet: 2 cols
        'lg:grid-cols-3',     // desktop: 3 cols
      )}
      role="list"
    >
      {dimensions.map((dim) => {
        const isExpanded = expandedId === dim.number
        return (
          <li key={dim.number}>
            {/* Mobile: tappable card */}
            <button
              type="button"
              onClick={() => toggleDimension(dim.number)}
              aria-expanded={isExpanded}
              className={cn(
                'flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left',
                'bg-white/[0.03] border border-white/[0.04]',
                'transition-colors duration-150',
                'hover:bg-white/[0.05]',
                'focus-visible:outline-2 focus-visible:outline-offset-[-2px]',
                'focus-visible:outline-[var(--color-ember-bright)]',
                // On desktop, button styling is muted (no expand behavior shown)
                'lg:cursor-default',
              )}
            >
              {/* Number badge */}
              <span
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-md',
                  'bg-[var(--color-ember-dim)] text-[var(--color-ember)]',
                  'text-xs font-bold',
                )}
              >
                {dim.number}
              </span>

              <div className="min-w-0 flex-1">
                {/* Dimension name */}
                <span className="text-sm font-medium text-[var(--color-text-primary)]">
                  {dim.name}
                </span>

                {/* Description -- always visible on desktop, expandable on mobile */}
                <span className="mt-0.5 hidden text-xs leading-relaxed text-[var(--color-text-tertiary)] lg:block">
                  {dim.description}
                </span>

                {/* Mobile expand */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.span
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="mt-0.5 block overflow-hidden text-xs leading-relaxed text-[var(--color-text-tertiary)] lg:hidden"
                    >
                      {dim.description}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
```

**Layout notes:**
- 3 columns on `lg` (6 rows of 3), 2 columns on `sm` (9 rows of 2), 1 column on mobile (18 rows).
- On desktop (`lg:`) descriptions are always visible; the expand interaction only applies to mobile/tablet.
- Compact cards with small number badges. The grid is dense by design -- 18 items should feel comprehensive, not overwhelming.
- Each card is keyboard-navigable with focus rings.

#### 4.4.8 ProtectPhaseSection (`src/components/marketing/how-it-works/protect-phase-section.tsx`)

Server component. Phase 3 wrapper with 6 protection feature cards in a 2x3 grid.

```typescript
// src/components/marketing/how-it-works/protect-phase-section.tsx

import { cn } from '@/lib/utils'
import { PHASES, PROTECTION_FEATURES } from '@/lib/data/how-it-works'
import {
  MapPin,
  Home,
  Route,
  Hospital,
  BriefcaseMedical,
  Radar,
} from 'lucide-react'

const ICON_MAP = {
  MapPin,
  Home,
  Route,
  Hospital,
  BriefcaseMedical,
  Radar,
} as const

export function ProtectPhaseSection() {
  const phase = PHASES[2] // protect

  return (
    <section
      id="phase-protect"
      aria-labelledby="phase-protect-heading"
      className="mx-auto max-w-5xl px-6 py-16 lg:px-8 lg:py-24"
    >
      {/* Phase badge */}
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-ember)]">
        Phase {phase.number} -- {phase.label}
      </p>

      {/* Heading */}
      <h2
        id="phase-protect-heading"
        className="mt-3 text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl lg:text-4xl"
      >
        {phase.heading}
      </h2>

      {/* Body */}
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--color-text-secondary)] lg:text-lg">
        {phase.body}
      </p>

      {/* Feature cards grid */}
      <div
        className={cn(
          'mt-10 grid gap-4',
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        )}
      >
        {PROTECTION_FEATURES.map((feature) => {
          const Icon = ICON_MAP[feature.iconName as keyof typeof ICON_MAP]
          return (
            <div
              key={feature.id}
              className={cn(
                'rounded-2xl p-5',
                // Glass card
                'bg-white/[0.06] backdrop-blur-[12px] backdrop-saturate-[130%]',
                'border border-white/[0.08]',
              )}
            >
              {/* Icon */}
              <div
                className={cn(
                  'mb-3 flex h-10 w-10 items-center justify-center rounded-xl',
                  'bg-[var(--color-ember-dim)] text-[var(--color-ember-bright)]',
                )}
              >
                {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
              </div>

              {/* Name */}
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                {feature.name}
              </h3>

              {/* Description */}
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                {feature.description}
              </p>
            </div>
          )
        })}
      </div>

      {/* Supporting statement */}
      <p className="mt-8 max-w-3xl text-sm leading-relaxed text-[var(--color-text-tertiary)] italic lg:text-base">
        {phase.supportingStatement}
      </p>

      {/* Illustration placeholder */}
      <div
        className={cn(
          'mt-10 flex h-48 items-center justify-center rounded-2xl',
          'border-2 border-dashed border-white/[0.08]',
          'text-sm text-[var(--color-text-ghost)]',
        )}
        aria-hidden="true"
      >
        Illustration: Protection system map view
      </div>
    </section>
  )
}
```

#### 4.4.9 MonitorPhaseSection (`src/components/marketing/how-it-works/monitor-phase-section.tsx`)

Server component. Phase 4 wrapper with 6 monitor feature cards in a 2x3 grid. Structurally identical to ProtectPhaseSection with different data.

```typescript
// src/components/marketing/how-it-works/monitor-phase-section.tsx

import { cn } from '@/lib/utils'
import { PHASES, MONITOR_FEATURES } from '@/lib/data/how-it-works'
import {
  Smartphone,
  WifiOff,
  MapPinCheck,
  CheckCheck,
  Radar,
  MessageSquareWarning,
} from 'lucide-react'

const ICON_MAP = {
  Smartphone,
  WifiOff,
  MapPinCheck,
  CheckCheck,
  Radar,
  MessageSquareWarning,
} as const

export function MonitorPhaseSection() {
  const phase = PHASES[3] // monitor

  return (
    <section
      id="phase-monitor"
      aria-labelledby="phase-monitor-heading"
      className="mx-auto max-w-5xl px-6 py-16 lg:px-8 lg:py-24"
    >
      {/* Phase badge */}
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-ember)]">
        Phase {phase.number} -- {phase.label}
      </p>

      {/* Heading */}
      <h2
        id="phase-monitor-heading"
        className="mt-3 text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl lg:text-4xl"
      >
        {phase.heading}
      </h2>

      {/* Body */}
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--color-text-secondary)] lg:text-lg">
        {phase.body}
      </p>

      {/* Feature cards grid */}
      <div
        className={cn(
          'mt-10 grid gap-4',
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        )}
      >
        {MONITOR_FEATURES.map((feature) => {
          const Icon = ICON_MAP[feature.iconName as keyof typeof ICON_MAP]
          return (
            <div
              key={feature.id}
              className={cn(
                'rounded-2xl p-5',
                'bg-white/[0.06] backdrop-blur-[12px] backdrop-saturate-[130%]',
                'border border-white/[0.08]',
              )}
            >
              <div
                className={cn(
                  'mb-3 flex h-10 w-10 items-center justify-center rounded-xl',
                  'bg-[var(--color-ember-dim)] text-[var(--color-ember-bright)]',
                )}
              >
                {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
              </div>
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                {feature.name}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                {feature.description}
              </p>
            </div>
          )
        })}
      </div>

      {/* Supporting statement */}
      <p className="mt-8 max-w-3xl text-sm leading-relaxed text-[var(--color-text-tertiary)] italic lg:text-base">
        {phase.supportingStatement}
      </p>

      {/* Illustration placeholder */}
      <div
        className={cn(
          'mt-10 flex h-48 items-center justify-center rounded-2xl',
          'border-2 border-dashed border-white/[0.08]',
          'text-sm text-[var(--color-text-ghost)]',
        )}
        aria-hidden="true"
      >
        Illustration: Traveler app screens
      </div>
    </section>
  )
}
```

**Implementation note:** ProtectPhaseSection and MonitorPhaseSection share identical layout structure. The implementing agent should extract a shared `PhaseFeatureGrid` component or keep them separate if the two sections diverge in future iterations. Decision D-7 covers this.

#### 4.4.10 DocumentationClosing (`src/components/marketing/how-it-works/documentation-closing.tsx`)

Server component. The audit trail messaging section before the bottom CTA.

```typescript
// src/components/marketing/how-it-works/documentation-closing.tsx

import { cn } from '@/lib/utils'
import { DOCUMENTATION_CLOSING } from '@/lib/data/how-it-works'

export function DocumentationClosing() {
  return (
    <section
      aria-labelledby="documentation-heading"
      className={cn(
        'mx-auto max-w-4xl px-6 py-16 text-center lg:px-8 lg:py-24',
      )}
    >
      <h2
        id="documentation-heading"
        className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl"
      >
        {DOCUMENTATION_CLOSING.heading}
      </h2>
      {DOCUMENTATION_CLOSING.body.map((paragraph, i) => (
        <p
          key={i}
          className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)] lg:text-lg"
        >
          {paragraph}
        </p>
      ))}
    </section>
  )
}
```

#### 4.4.11 BottomCtaSection (`src/components/marketing/shared/bottom-cta-section.tsx`)

Server component. Shared across marketing pages. Renders a full-width CTA block with primary and secondary buttons.

```typescript
// src/components/marketing/shared/bottom-cta-section.tsx

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { BOTTOM_CTA as HOW_IT_WORKS_CTA } from '@/lib/data/how-it-works'
// Future: import CTA data from other page data modules based on `page` prop

interface BottomCtaSectionProps {
  /** Which page's CTA data to use */
  page: 'how-it-works' | 'landing' | 'platform' | 'solutions' | 'about'
}

// CTA data registry -- each page maps to its own CTA content
const CTA_REGISTRY = {
  'how-it-works': HOW_IT_WORKS_CTA,
  // Other pages will add their CTA data here as they are built
} as Record<string, typeof HOW_IT_WORKS_CTA>

export function BottomCtaSection({ page }: BottomCtaSectionProps) {
  const cta = CTA_REGISTRY[page]
  if (!cta) return null

  return (
    <section
      aria-labelledby="bottom-cta-heading"
      className={cn(
        'mx-auto max-w-4xl px-6 py-16 text-center lg:px-8 lg:py-24',
      )}
    >
      <h2
        id="bottom-cta-heading"
        className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl"
      >
        {cta.headline}
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--color-text-secondary)] lg:text-lg">
        {cta.body}
      </p>

      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
        {/* Primary CTA */}
        <div className="flex flex-col items-center gap-1.5">
          <Link
            href={cta.primaryHref}
            className={cn(
              'inline-flex items-center justify-center rounded-xl px-8 py-3',
              'bg-[var(--color-ember)] text-white',
              'text-sm font-semibold tracking-wide',
              'transition-all duration-200',
              'hover:bg-[var(--color-ember-bright)] hover:shadow-[var(--glow-ember-medium)]',
              'focus-visible:outline-2 focus-visible:outline-offset-2',
              'focus-visible:outline-[var(--color-ember-bright)]',
              // Breathing glow animation
              'animate-[breathe_5s_ease-in-out_infinite]',
            )}
          >
            {cta.primaryLabel}
          </Link>
          <span className="text-xs text-[var(--color-text-tertiary)]">
            {cta.primaryMicrocopy}
          </span>
        </div>

        {/* Secondary CTA */}
        <div className="flex flex-col items-center gap-1.5">
          <Link
            href={cta.secondaryHref}
            className={cn(
              'inline-flex items-center justify-center rounded-xl px-8 py-3',
              'bg-white/[0.06] text-[var(--color-text-primary)]',
              'border border-white/[0.08]',
              'text-sm font-medium tracking-wide',
              'transition-all duration-200',
              'hover:bg-white/[0.10] hover:border-white/[0.12]',
              'focus-visible:outline-2 focus-visible:outline-offset-2',
              'focus-visible:outline-[var(--color-ember-bright)]',
            )}
          >
            {cta.secondaryLabel}
          </Link>
          <span className="text-xs text-[var(--color-text-tertiary)]">
            {cta.secondaryMicrocopy}
          </span>
        </div>
      </div>
    </section>
  )
}
```

**Shared component notes:**
- The `page` prop selects CTA content from a registry. Each marketing page adds its CTA data to `CTA_REGISTRY` as it is built.
- If WS-B.2 creates this component first, this workstream adds the `how-it-works` entry to the registry. If this workstream ships first, it creates the component and WS-B.2 extends it.
- Primary CTA uses the `breathe` keyframe animation from the spatial ZUI ambient system (if available from WS-A.1's header CTA implementation). If not available, the implementing agent adds a `@keyframes breathe` rule.

### 4.5 File Tree Summary

```
src/
  app/(marketing)/
    how-it-works/
      page.tsx                              # Server component -- page entry
  components/marketing/
    how-it-works/
      hero.tsx                              # Server -- H1, H2
      problem-statement.tsx                 # Server -- opening problem block
      phase-lifecycle-nav.tsx               # Server -- 4-phase horizontal/vertical nav
      plan-phase-section.tsx                # Server -- Phase 1 wrapper
      wizard-stepper.tsx                    # CLIENT -- 10-step accordion
      review-phase-section.tsx              # Server -- Phase 2 CENTERPIECE wrapper
      review-dimension-grid.tsx             # CLIENT -- 18-dimension responsive grid
      protect-phase-section.tsx             # Server -- Phase 3 wrapper
      monitor-phase-section.tsx             # Server -- Phase 4 wrapper
      documentation-closing.tsx             # Server -- audit trail messaging
    shared/
      bottom-cta-section.tsx                # Server -- reusable CTA block
  lib/
    data/
      how-it-works.ts                       # All page copy and structured content
    interfaces/
      how-it-works.ts                       # TypeScript type definitions
```

**Total new files: 14**

| Category | Server Components | Client Components | Data/Types |
|----------|-------------------|-------------------|------------|
| Count | 9 | 2 | 3 |
| Files | page.tsx, hero, problem-statement, lifecycle-nav, plan-phase, review-phase, protect-phase, monitor-phase, documentation-closing | wizard-stepper, review-dimension-grid | how-it-works.ts (data), how-it-works.ts (interfaces), bottom-cta-section |

### 4.6 Responsive Behavior

| Breakpoint | Layout Behavior |
|------------|-----------------|
| `< 640px` (mobile) | Single column. Phase lifecycle nav stacks vertically. Wizard steps full-width. Review dimensions 1-column (expandable). Feature cards 1-column. CTA buttons stack vertically. |
| `640px-767px` (sm) | Review dimensions 2-column grid. Feature cards 2-column. CTA buttons side-by-side. |
| `768px-1023px` (md) | Phase lifecycle nav goes horizontal. Feature cards 2-column. |
| `>= 1024px` (lg) | Review dimensions 3-column grid. Feature cards 3-column. Full desktop layout with wider padding and larger type. |

### 4.7 Accessibility Requirements

| Requirement | Implementation |
|-------------|----------------|
| Heading hierarchy | Single `<h1>` in hero. `<h2>` per section. `<h3>` for sub-sections (wizard title, feature card names). |
| Landmark regions | Each section wrapped in `<section>` with `aria-labelledby` referencing its heading `id`. Lifecycle nav uses `<nav aria-label="Trip lifecycle phases">`. |
| Keyboard navigation | All interactive elements (accordion triggers, dimension cards, CTA links, lifecycle nav links) are keyboard-focusable with visible focus rings using `focus-visible:outline-[var(--color-ember-bright)]`. |
| Accordion ARIA | `aria-expanded` on triggers. `aria-controls` linking trigger to content panel. Content panels have `role="region"` with `aria-labelledby`. |
| Link purpose | CTA links have descriptive text ("Schedule a Briefing", "Download the Platform Overview"). No "click here" or bare URLs. |
| Color contrast | All text meets WCAG 2.2 AA minimum contrast ratio (4.5:1 for body text, 3:1 for large text). `--color-text-primary: #e8f0f4` on `--color-void: #061a23` = 13.6:1. `--color-text-secondary: #929899` on `--color-void: #061a23` = 6.7:1. Both pass. |
| Reduced motion | `motion/react` animations respect `prefers-reduced-motion` by default. Accordion expand/collapse will be instant when reduced motion is preferred. |
| Illustration placeholders | Marked `aria-hidden="true"` since they contain no meaningful content. |

---

## 5. Acceptance Criteria

### Functional

| # | Criterion | Verification |
|---|-----------|--------------|
| AC-1 | Page renders at `/(marketing)/how-it-works` inside the marketing layout | Navigate to URL; header and footer from WS-A.1 visible |
| AC-2 | All four phase sections render with correct headings, body text, and supporting statements | Visual inspection against copy deck Section 4.4.2 |
| AC-3 | 10-step wizard accordion expands and collapses individual steps | Click each step; verify description appears/disappears |
| AC-4 | "Expand all / Collapse all" toggle works correctly | Click toggle; verify all steps open; click again; all close |
| AC-5 | 18 review dimensions render in a 3-column grid on desktop | Resize to `>= 1024px`; count 3 columns, 6 rows |
| AC-6 | Review dimensions are expandable on mobile (< 1024px) | Resize to mobile; tap a dimension; verify description appears |
| AC-7 | Review dimensions show descriptions always on desktop | Resize to desktop; verify descriptions visible without interaction |
| AC-8 | 6 protection feature cards render in a 2x3 grid on desktop | Visual inspection at `>= 1024px` |
| AC-9 | 6 monitor feature cards render in a 2x3 grid on desktop | Visual inspection at `>= 1024px` |
| AC-10 | Phase lifecycle nav renders horizontal on desktop, vertical on mobile | Resize browser; verify layout switch at `768px` |
| AC-11 | Phase lifecycle nav links scroll to corresponding sections | Click "Review" in nav; page scrolls to `#phase-review` |
| AC-12 | Bottom CTA "Schedule a Briefing" links to `/contact` | Click CTA; verify navigation |
| AC-13 | Illustration placeholder divs are visible (dashed border) | Visual inspection |
| AC-14 | Page passes `pnpm typecheck` with zero errors | Run `pnpm typecheck` |
| AC-15 | Page passes `pnpm lint` with zero errors | Run `pnpm lint` |

### Visual / Design

| # | Criterion | Verification |
|---|-----------|--------------|
| AC-16 | Review section (Phase 2) is visually distinct -- elevated glass-morphism, brighter glow, radial gradient background | Visual inspection; compare to Phase 1 and 3 cards |
| AC-17 | "18" stat callout is the largest number on the page | Visual inspection |
| AC-18 | Glass-morphism cards use the correct recipe from `detail-panel.tsx` | Inspect element; verify `backdrop-blur`, `bg-white/[0.06]`, `border-white/[0.08]` |
| AC-19 | Safetrekr green accent (`--color-ember: #4ba467`) used for all accent elements when `data-color-scheme="safetrekr"` is active | Inspect computed styles |
| AC-20 | Page background is `--color-void` (`#061a23` in Safetrekr dark mode) | Inspect body background |

### Accessibility

| # | Criterion | Verification |
|---|-----------|--------------|
| AC-21 | Single `<h1>` on the page | DOM inspection |
| AC-22 | All accordion triggers have `aria-expanded` attribute | DOM inspection |
| AC-23 | All interactive elements have visible focus rings | Tab through page; verify rings visible |
| AC-24 | Page has no accessibility violations at axe-core level | Run `axe` in browser DevTools |
| AC-25 | All `<section>` elements have `aria-labelledby` | DOM inspection |

### SEO

| # | Criterion | Verification |
|---|-----------|--------------|
| AC-26 | `<title>` matches `HOW_IT_WORKS_SEO.title` | View page source |
| AC-27 | `<meta name="description">` matches `HOW_IT_WORKS_SEO.description` | View page source |
| AC-28 | Canonical URL is `/how-it-works` | View page source |
| AC-29 | OpenGraph tags present | View page source |

### Performance

| # | Criterion | Verification |
|---|-----------|--------------|
| AC-30 | Only 2 client components in the page tree (`WizardStepper`, `ReviewDimensionGrid`) | Review component tree; no unexpected `'use client'` boundaries |
| AC-31 | No layout shift when accordion opens/closes | Observe CLS in DevTools |
| AC-32 | Page loads in under 2 seconds on a 4G connection | Lighthouse audit |

---

## 6. Decisions Made

| # | Decision | Rationale | Alternatives Considered |
|---|----------|-----------|------------------------|
| D-1 | **Server-first rendering.** Page component and 9 of 11 section components are server components. Only `WizardStepper` and `ReviewDimensionGrid` use `'use client'`. | Marketing page is SEO-critical. Server components mean zero JS for most of the page. Only interactive elements (accordion, expandable grid) require client-side hydration. | Making the entire page a client component for animation flexibility -- rejected because it ships unnecessary JS for a content page. |
| D-2 | **Accordion over tabs for the 10-step wizard.** | 10 steps is too many for a tab bar. Tabs force horizontal scrolling on mobile and hide step names. Accordion allows users to scan all step names at once and expand selectively. | Tabs (rejected: 10 items overflow on mobile), numbered list (rejected: not interactive, misses the "explore at your pace" behavior), stepper/progress bar (rejected: implies sequential workflow which is not the user's experience on this marketing page). |
| D-3 | **Static phase lifecycle nav (no scroll-spy).** | Scroll-spy adds animation complexity, motion-sickness risk, and bundle weight. A static horizontal nav with anchor links achieves 90% of the value at 10% of the cost. Can be upgraded post-launch. | Sticky nav with scroll-spy highlighting (rejected: Phase D polish), parallax phase transitions (rejected: over-engineering for content page). |
| D-4 | **Review centerpiece uses elevated glass-morphism (not a separate visual system).** | Staying within the glass-morphism system but using elevated parameters (brighter glow, higher opacity, larger radius) signals importance without introducing a new visual paradigm. | Full-bleed background color change (rejected: breaks the HUD aesthetic), animated border glow (rejected: distracting for a section the user needs to read carefully), custom illustration-heavy layout (rejected: no illustration assets available). |
| D-5 | **Content in data module, not inline JSX.** | Separates content from presentation. The narrative strategist can update copy by editing `how-it-works.ts` without understanding React component structure. Type safety catches missing fields at build time. | Inline strings in JSX (rejected: couples content to presentation, makes copy review harder), MDX files (rejected: over-engineering for a single page; MDX is appropriate for blog content, not structured marketing sections). |
| D-6 | **Review dimensions: always-visible descriptions on desktop, expandable on mobile.** | On desktop the 3-column grid has enough space for name + description in each cell. On mobile, showing 18 descriptions creates excessive scrolling; expandable cards let users explore selectively. | Always expandable on all breakpoints (rejected: unnecessary friction on desktop where space is abundant), tooltip on hover (rejected: not accessible, not available on touch devices). |
| D-7 | **Separate ProtectPhaseSection and MonitorPhaseSection (no shared PhaseFeatureGrid).** | The two sections may diverge in future iterations (Phase 3 may add a map visualization, Phase 4 may add app screenshots). Extracting a shared component now creates premature coupling. If they remain identical after two more pages ship, refactor then. | Shared `PhaseFeatureGrid` component (acceptable alternative, but YAGNI for now). |
| D-8 | **BottomCtaSection is a shared component with a page-keyed CTA registry.** | Multiple marketing pages use the same CTA layout with different copy. A registry pattern avoids prop-drilling large objects while keeping the component shared. | Per-page inline CTA (rejected: duplication), single CTA with complex props (acceptable but less clean than a registry). |
| D-9 | **Illustration placeholders use dashed-border divs, not SVG graphics.** | No designer is assigned. Placeholder divs clearly communicate "asset needed here" without implying the final visual. Easy to replace: swap the `div` for an `<Image>` component. | Solid gray boxes (rejected: too ambiguous), stock illustrations (rejected: wrong tone for the brand). |

---

## 7. Open Questions

| # | Question | Impact | Recommended Resolution | Owner |
|---|----------|--------|----------------------|-------|
| Q-1 | Does WS-B.2 (Landing Page) create a shared `BottomCtaSection` component, or should this workstream create it? | Avoids duplication. If WS-B.2 ships first and creates the component, this workstream extends its CTA registry. If this workstream ships first, it creates the component. | Whichever workstream ships first creates the shared component at `src/components/marketing/shared/bottom-cta-section.tsx`. The second workstream adds its page entry to the registry. | Agent coordination |
| Q-2 | Should the `breathe` keyframe animation on the primary CTA button be defined in this workstream or inherited from WS-A.1's header CTA? | The header CTA in WS-A.1 likely defines `@keyframes breathe` in globals or a shared CSS file. If so, reuse it. If not, define it here. | Check WS-A.1 output for `@keyframes breathe`. If absent, add to `globals.css`. | Implementing agent |
| Q-3 | Should the "Download the Platform Overview" secondary CTA link to an actual PDF, or a placeholder? | No PDF asset exists. The link should resolve to avoid a 404. | Link to `/resources/platform-overview` (a future page). If that route does not exist, use `href="#"` with a `title="Coming soon"` attribute and disable the link visually. Flag as a content dependency for the business owner. | Business owner |
| Q-4 | Are the Lucide icon names (`MapPinCheck`, `BriefcaseMedical`, `MessageSquareWarning`) available in the installed version of `lucide-react`? | If any icon is not available, a fallback must be chosen. | Verify during implementation. Fallbacks: `MapPinCheck` -> `MapPin`, `BriefcaseMedical` -> `Briefcase`, `MessageSquareWarning` -> `MessageSquare`. | Implementing agent |
| Q-5 | Should the Phase 2 Review section include a visual comparing "before Safetrekr" (spreadsheet) vs. "after Safetrekr" (18-dimension review)? | Could strengthen the centerpiece. But no design assets exist for this. | Defer to post-launch. The copy alone (objection hook + stat callout) is sufficient for conversion. Add a before/after visual when illustration assets are available. | Designer (future) |

---

## 8. Risk Register

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|-----------|--------|------------|
| R-1 | **Copy not finalized before implementation begins.** WS-B.1 produces draft copy; final polish may change wording. | Medium | Low | All copy is already specified in Section 4.4.2 of the copy deck and reproduced in the data module (Section 4.2 above). The implementing agent uses this copy directly. If the narrative strategist revises wording after implementation, only `src/lib/data/how-it-works.ts` needs to be updated -- no component changes. |
| R-2 | **WS-A.1 (Marketing Layout) is not ready when this workstream starts.** | Low | High | This workstream cannot ship without the marketing layout. However, the implementing agent can develop and test all components in isolation (e.g., Storybook or a temporary test route) while waiting for WS-A.1 to merge. Only the final page route integration depends on WS-A.1. |
| R-3 | **No illustration or screenshot assets exist.** The page has 4 illustration placeholder slots. | High | Medium | Placeholder divs with dashed borders are included in the deliverables. The page is functional and visually complete without illustrations. When assets become available, each placeholder is replaced with a single `<Image>` component swap. No structural changes required. |
| R-4 | **Shared component conflict with WS-B.2.** Both pages need a BottomCtaSection. If both workstreams create the component independently, a merge conflict occurs. | Medium | Low | Resolution: the first workstream to merge creates `src/components/marketing/shared/bottom-cta-section.tsx` with the registry pattern. The second workstream adds its entry. If a conflict occurs, the implementing agent resolves it by merging both page entries into the registry. |
| R-5 | **Review dimension descriptions lack sufficient detail for marketing impact.** The current descriptions are functional ("Roster verification") but may not convey value to a buyer. | Medium | Medium | The copy deck provides the names and descriptions as-is. If the narrative strategist wants to enhance descriptions (e.g., "Roster verification" -> "Every participant verified against the traveler registry"), they update `REVIEW_DIMENSIONS` in the data module. No component changes needed. |
| R-6 | **Performance risk from two client components on an otherwise server-rendered page.** | Low | Low | Both client components (`WizardStepper`, `ReviewDimensionGrid`) are small (accordion + expandable grid). They import only `useState`, `useCallback`, and `motion/react`'s `AnimatePresence`. No heavy libraries. Expected hydration cost: < 15KB gzipped combined. Monitor with Lighthouse after implementation. |
| R-7 | **Lucide icon availability.** Some icon names may not exist in the installed version of `lucide-react`. | Low | Low | Fallback icon names are documented in Q-4. The implementing agent verifies availability during implementation and substitutes if needed. |
