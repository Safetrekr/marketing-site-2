# WS-B.7: Solutions Overview Page

> **Workstream ID:** WS-B.7
> **Phase:** B -- P0 Content Pages
> **Assigned Agent:** `react-developer`
> **Status:** Draft
> **Created:** 2026-03-02
> **Last Updated:** 2026-03-02
> **Depends On:** WS-A.1 (Marketing Layout), WS-B.1 (Content Strategy + Copy Drafting)
> **Blocks:** WS-D.1 (Vertical Solution Pages: `/solutions/k12`, `/solutions/higher-ed`, `/solutions/churches`, `/solutions/youth-sports`, `/solutions/business`)
> **Resolves:** None (new page; implements Solutions copy from WS-B.1 Section 4.4.4)

---

## 1. Objective

Build the `/solutions` page for the Safetrekr marketing site -- a buyer-qualification page that helps prospects self-identify by vertical and understand how Safetrekr addresses the specific compliance, safety, and accountability challenges of their organization type. The page presents five vertical-specific cards (K-12, Higher Education, Churches, Youth Sports, Business) with pain-point/solution pairings, framed by a cross-cutting value proposition and a closing CTA.

The Solutions page is a middle-of-funnel evaluation page. Visitors arriving here have already understood the high-level value proposition (from the landing page or How It Works page) and need to confirm that Safetrekr is built for their specific context. The page tone is "empathetic peer" -- acknowledging vertical-specific pain before presenting Safetrekr's response.

Each vertical card links to a future detail page (`/solutions/{vertical}`) that will be built in Phase D (WS-D.1). At launch, these links render as styled anchor tags pointing to stub routes. WS-D.1 replaces the stubs with full vertical pages.

The page renders as a server component inside the `(marketing)` layout from WS-A.1. There are no client-side interactions on this page -- no modals, no toggles, no client state. This is a pure server-rendered, SEO-optimized content page.

---

## 2. Scope

### In Scope

| # | Item | Notes |
|---|------|-------|
| 1 | `src/app/(marketing)/solutions/page.tsx` page component | Server component with SEO metadata; composes all sections |
| 2 | Solutions data module (`src/lib/data/solutions-verticals.ts`) | TypeScript-typed array of 5 vertical definitions with pain points, solutions, CTAs |
| 3 | Type definitions (`src/lib/interfaces/solutions.ts`) | `SolutionVertical` interface |
| 4 | `VerticalCard` server component | Reusable glass-morphism card rendering one vertical: icon, name, tagline, pain points, solutions, CTA link |
| 5 | `VerticalCardGrid` server component | Responsive grid layout for the 5 vertical cards |
| 6 | Hero section | H1 + H2 with cross-cutting value proposition |
| 7 | Cross-cutting value prop section | Shared operational rigor message below hero |
| 8 | Objection hook section | Inline "spreadsheets vs. system" reframe below cards |
| 9 | Bottom CTA section | "Schedule a Briefing" with vertical-aware micro-copy |
| 10 | Vertical icon selection | One Lucide icon per vertical (see Section 4.2) |
| 11 | Links to future vertical detail pages | Anchor tags to `/solutions/k12`, `/solutions/higher-ed`, `/solutions/churches`, `/solutions/youth-sports`, `/solutions/business` |
| 12 | Responsive layout | Single column on mobile, 2 columns on tablet, 3-then-2 grid on desktop for 5 cards |
| 13 | Accessibility | Semantic HTML, ARIA landmarks, keyboard-navigable links, focus indicators |
| 14 | SEO metadata | Page title, description, OpenGraph tags, structured data |
| 15 | JSON-LD structured data | SoftwareApplication schema with audience targeting |

### Out of Scope

| # | Item | Rationale |
|---|------|-----------|
| 1 | Vertical detail pages (`/solutions/k12`, etc.) | WS-D.1 scope. This workstream creates the overview page that links to them. |
| 2 | Testimonial quotes on vertical cards | WS-B.1 Q-7: pilot customer testimonials not yet available. Placeholder strategy documented but not implemented here. |
| 3 | Image assets for vertical illustrations | No vertical-specific imagery exists. Icons serve as visual anchors. If illustrations are created later, the `VerticalCard` component accepts an optional `illustration` prop for future use. |
| 4 | Contact form or scheduling widget | WS-A.4 handles the contact/scheduling backend. This page links to `/contact`. |
| 5 | Analytics instrumentation | WS-C.3 handles event tracking as a cross-cutting concern. |
| 6 | OG image generation | WS-C.4 handles social images. |
| 7 | Image optimization | WS-C.2 handles asset optimization. |
| 8 | Animation or motion effects on cards | This is a content-heavy evaluation page. Motion adds cognitive load with no functional benefit. Hover transitions (lift, border glow) are CSS-only -- no `motion/react` dependency needed. |

---

## 3. Input Dependencies

### Codebase Files to Reference

| File | What to Use From It |
|------|---------------------|
| `src/app/(marketing)/layout.tsx` | Marketing layout (from WS-A.1). Solutions page renders inside this. Page receives header + footer automatically. |
| `src/styles/spatial-tokens.css` | Safetrekr dark-mode tokens. Solutions page uses: `--color-void: #061a23` (body bg), `--color-ember: #4ba467` (green accent), `--color-ember-bright: #6abf84` (hover accent), `--color-text-primary: #e8f0f4`, `--color-text-secondary: #929899`, `--color-text-tertiary: #5a7a88`. RGB: `--ember-rgb: 75, 164, 103`. |
| `src/components/districts/detail-panel.tsx` | Glass-morphism reference pattern: `bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]`, `border border-white/[0.08]`, ember glow shadow. Vertical cards adapt this pattern. |
| `src/lib/utils.ts` | `cn()` utility. Import: `import { cn } from '@/lib/utils'` |
| `src/app/globals.css` | Tailwind theme bridge. Confirms `bg-void`, `text-text-primary`, `text-ember`, etc. are available as utilities. Font variables: `--font-sans` (Geist Sans). |
| `plans/launch-plan/phase-b-p0-content-pages/ws-b.1-content-strategy-copy-drafting.md` Section 4.4.4 | Authoritative copy source for all Solutions page text: hero, cross-cutting value prop, 5 vertical cards (H3, pain points, solutions, CTAs), objection hook, bottom CTA. |
| `plans/launch-plan/phase-b-p0-content-pages/ws-b.9-about-team-page.md` | Reference for sibling SOW patterns: section layout, glass-morphism card styling, responsive grid conventions, bottom CTA pattern, accessibility patterns. |

### External Dependencies

| Dependency | Owner | Status | Impact |
|------------|-------|--------|--------|
| Approved Solutions page copy from WS-B.1 | Content Strategist | **Pending** | All text on this page is sourced from WS-B.1 Section 4.4.4. Implementation can begin with draft copy; final text must be confirmed before launch. |
| Marketing layout shell (WS-A.1) | React Developer | **Pending** | Header + footer wrap all marketing pages. Solutions page renders inside `<main id="main-content">`. Components can be developed in isolation before WS-A.1 ships. |
| FERPA/COPPA compliance claims verification | Business Owner (Q-4 from WS-B.1) | **Open** | K-12 card references "FERPA, COPPA" compliance. If Q-4 resolves as "not verified," soften language to "designed with student data privacy in mind" rather than citing specific regulations. |

### Package Dependencies

No new package dependencies. This page uses only:
- `lucide-react` (already installed) -- for vertical icons
- `next/link` (framework) -- for CTA links
- `next` (framework) -- for `Metadata` type

---

## 4. Deliverables

### 4.1 Type Definitions (`src/lib/interfaces/solutions.ts`)

```typescript
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
```

### 4.2 Solutions Data Module (`src/lib/data/solutions-verticals.ts`)

Static data module exporting all vertical definitions. This is the single source of truth -- the page component imports from here and never contains inline content strings.

**All copy below is sourced from WS-B.1 Section 4.4.4.**

```typescript
// src/lib/data/solutions-verticals.ts

import type { SolutionVertical } from '@/lib/interfaces/solutions'

// ---------------------------------------------------------------------------
// Hero + Cross-Cutting Value Prop
// ---------------------------------------------------------------------------

export const SOLUTIONS_HERO = {
  title: 'Your travelers. Your responsibility. Your system.',
  subtitle:
    'Schools, churches, sports teams, universities, and businesses each face unique trip safety challenges. Safetrekr is built to handle all of them -- with independent safety review, real-time intelligence, and documented accountability for every trip.',
} as const

export const CROSS_CUTTING_VALUE_PROP =
  'Every organization on this page shares one thing: the people they send to travel depend on them to come home safely. Safetrekr gives every organization the same operational rigor -- a 10-step planning wizard, independent analyst review, real-time intelligence, and a complete audit trail -- adapted to the compliance requirements and travel patterns of each vertical.'

// ---------------------------------------------------------------------------
// Five Vertical Cards
// ---------------------------------------------------------------------------

export const VERTICALS: SolutionVertical[] = [
  {
    id: 'k12',
    name: 'K-12 Schools',
    iconName: 'GraduationCap',
    tagline: 'Every field trip. Every student. Every safeguard documented.',
    painPoints: [
      'Parental consent forms tracked in folders, not systems',
      'Background checks for chaperones managed manually',
      'No independent review of trip safety plans',
      'Regulatory compliance (FERPA, COPPA) adds complexity to data handling',
    ],
    solutions: [
      'Structured document collection with role-based targeting and automated reminders',
      'Background check compliance matrix showing every chaperone\'s screening status at a glance',
      'Independent analyst review of every trip before departure',
      'Audit trail that answers questions from parents, superintendents, and school boards',
    ],
    ctaLabel: 'Learn more about Safetrekr for K-12',
    ctaHref: '/solutions/k12',
  },
  {
    id: 'higher-ed',
    name: 'Higher Education',
    iconName: 'Building2',
    tagline: 'Study abroad. Exchange programs. Research expeditions. All verified.',
    painPoints: [
      'International travel risk assessment across multiple countries and programs',
      'Institutional liability exposure for student safety abroad',
      'Compliance documentation spread across departments',
      'No centralized system for tracking student safety across all travel programs',
    ],
    solutions: [
      'International trip planning with visa/passport tracking and destination intelligence',
      'Independent analyst review with tiered assignment matched to trip complexity',
      'Real-time intelligence alerts for international destinations',
      'Institutional audit documentation for risk management and legal review',
    ],
    ctaLabel: 'Learn more about Safetrekr for Higher Education',
    ctaHref: '/solutions/higher-ed',
  },
  {
    id: 'churches',
    name: 'Churches & Faith-Based Organizations',
    iconName: 'Church',
    tagline: 'Mission trips deserve mission-grade safety planning.',
    painPoints: [
      'Volunteer screening is manual and inconsistent',
      'International mission trips to complex security environments',
      'Emergency preparedness relies on contact lists, not connected systems',
      'No documentation trail if something goes wrong',
    ],
    solutions: [
      '5 background check types across 3 integrated providers for volunteer screening',
      'International risk assessment with real-time intelligence from multiple sources',
      'Three-tier evacuation planning with rally points, safe houses, and medical facility directories',
      'Complete audit trail from volunteer screening through trip completion',
    ],
    ctaLabel: 'Learn more about Safetrekr for Churches',
    ctaHref: '/solutions/churches',
  },
  {
    id: 'youth-sports',
    name: 'Youth Sports',
    iconName: 'Trophy',
    tagline: 'Tournament travel is complex. Protecting your athletes is not optional.',
    painPoints: [
      'Coach and volunteer screening requirements across multiple jurisdictions',
      'Medical consent and emergency contact collection for minor athletes',
      'Multi-team travel coordination for tournaments and competitions',
      'SafeSport compliance tracking',
    ],
    solutions: [
      'Background check compliance matrix covering every adult with supervisory responsibility',
      'Structured medical consent and document collection with automated reminders',
      'Certification tracking with expiration monitoring (SafeSport, CPR, First Aid)',
      'Real-time alerts and SMS emergency broadcast during travel',
    ],
    ctaLabel: 'Learn more about Safetrekr for Youth Sports',
    ctaHref: '/solutions/youth-sports',
  },
  {
    id: 'business',
    name: 'Business',
    iconName: 'Briefcase',
    tagline: 'Corporate duty of care -- documented, not assumed.',
    painPoints: [
      'Duty of care obligations that are acknowledged but not systematically documented',
      'Employee travel risk varies by destination but is managed the same way',
      'No centralized proof of safety measures for legal or insurance review',
      'Annual contracts and per-seat licensing create cost overhead for variable travel volumes',
    ],
    solutions: [
      'Per-trip pricing with no annual contracts -- pay only when employees travel',
      'Tiered trip complexity matching safety requirements to travel risk level',
      'Independent analyst review provides separation of duties for compliance',
      'Downloadable audit trail for legal, insurance, and procurement review',
    ],
    ctaLabel: 'Learn more about Safetrekr for Business',
    ctaHref: '/solutions/business',
  },
]

// ---------------------------------------------------------------------------
// Objection Hook (inline, below cards)
// ---------------------------------------------------------------------------

export const OBJECTION_HOOK = {
  question: 'Already managing trip safety with spreadsheets and email?',
  answer:
    'A spreadsheet tracks what you enter. It cannot track what you miss. It cannot verify that a background check is current. It cannot deliver a safety alert to a chaperone\'s phone at 2 AM. And when someone asks "Did we do everything we could?" -- a spreadsheet is not proof.',
} as const

// ---------------------------------------------------------------------------
// Bottom CTA
// ---------------------------------------------------------------------------

export const SOLUTIONS_BOTTOM_CTA = {
  headline: 'One platform for every type of organizational travel.',
  buttonLabel: 'Schedule a Briefing',
  microcopy: 'Tell us your vertical. We will tailor the conversation.',
  href: '/contact',
} as const
```

**Icon selection rationale:**

| Vertical | Lucide Icon | Rationale |
|----------|-------------|-----------|
| K-12 Schools | `GraduationCap` | Universally recognized education symbol |
| Higher Education | `Building2` | Represents university/institutional buildings |
| Churches & Faith-Based | `Church` | Direct vertical match |
| Youth Sports | `Trophy` | Evokes competition and athletic achievement |
| Business | `Briefcase` | Standard corporate/business symbol |

All icons are thin-stroke Lucide components already available in the project via `lucide-react`. Rendered at 32px with `text-[var(--color-ember)]` to match the Safetrekr green accent system.

### 4.3 Page Component (`src/app/(marketing)/solutions/page.tsx`)

Server component that composes all sections. Zero client-side JavaScript. The page is entirely server-rendered for maximum SEO value and initial paint performance.

**Component signature:**

```typescript
// src/app/(marketing)/solutions/page.tsx

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  SOLUTIONS_HERO,
  CROSS_CUTTING_VALUE_PROP,
  VERTICALS,
  OBJECTION_HOOK,
  SOLUTIONS_BOTTOM_CTA,
} from '@/lib/data/solutions-verticals'
import { VerticalCardGrid } from '@/components/marketing/solutions/vertical-card-grid'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Safetrekr Solutions -- Trip Safety for Schools, Churches, Sports, Universities, Business',
  description:
    'K-12 field trips. Church mission trips. Youth sports tournaments. Study abroad programs. Corporate travel. One platform built for every type of organizational travel.',
  openGraph: {
    title: 'Safetrekr Solutions -- Trip Safety for Every Vertical',
    description:
      'K-12 field trips. Church mission trips. Youth sports tournaments. Study abroad. Corporate travel. One platform for every type of organizational travel.',
    type: 'website',
    url: 'https://safetrekr.com/solutions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Safetrekr Solutions',
    description:
      'Trip safety for schools, churches, sports teams, universities, and businesses.',
  },
}

export default function SolutionsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {/* Cross-Cutting Value Prop Section */}
      {/* Vertical Cards Section */}
      {/* Objection Hook Section */}
      {/* Bottom CTA Section */}
      {/* JSON-LD Structured Data */}
    </div>
  )
}
```

**Section layout follows the same pattern established in WS-B.9:**

```tsx
<section className="relative py-20 md:py-28">
  <div className="mx-auto max-w-6xl px-6">
    {/* Section header */}
    <div className="mb-12 text-center md:mb-16">
      <h2 className="font-sans text-2xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-3xl">
        {sectionTitle}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)]">
          {subtitle}
        </p>
      )}
    </div>
    {/* Section content */}
  </div>
</section>
```

**Alternating section backgrounds:** Odd sections use `bg-transparent` (inherits void from body). Even sections use `bg-white/[0.02]` to create subtle visual separation. Border separators are omitted in favor of the background difference.

### 4.4 Hero Section

```tsx
<section className="relative flex min-h-[50vh] items-center justify-center py-24 md:py-32">
  <div className="mx-auto max-w-3xl px-6 text-center">
    <h1 className="font-sans text-3xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-5xl">
      {SOLUTIONS_HERO.title}
    </h1>
    <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)] md:text-xl">
      {SOLUTIONS_HERO.subtitle}
    </p>
  </div>
</section>
```

### 4.5 Cross-Cutting Value Prop Section

A single, centered callout box with a subtle green-tinted border, visually distinct from the hero above. Uses the same callout pattern as the "Combined expertise" box in WS-B.9 Section 4.8.

```tsx
<section className="relative bg-white/[0.02] py-16 md:py-20">
  <div className="mx-auto max-w-4xl px-6">
    <div
      className={cn(
        'rounded-xl p-6 md:p-8',
        'border border-[rgba(var(--ember-rgb),0.12)]',
        'bg-[rgba(var(--ember-rgb),0.04)]',
      )}
    >
      <p className="text-center text-base leading-[1.8] text-[var(--color-text-secondary)] md:text-lg">
        {CROSS_CUTTING_VALUE_PROP}
      </p>
    </div>
  </div>
</section>
```

### 4.6 Vertical Card Component (`src/components/marketing/solutions/vertical-card.tsx`)

Server component rendering a single vertical solution card. This component is reusable -- the same component renders all 5 verticals, and will be reused in WS-D.1 for vertical detail page cross-links.

**Component signature:**

```typescript
// src/components/marketing/solutions/vertical-card.tsx

import Link from 'next/link'
import {
  GraduationCap,
  Building2,
  Church,
  Trophy,
  Briefcase,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SolutionVertical } from '@/lib/interfaces/solutions'

// Map icon name strings to Lucide components
const ICON_MAP: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  GraduationCap,
  Building2,
  Church,
  Trophy,
  Briefcase,
}

interface VerticalCardProps {
  vertical: SolutionVertical
}

export function VerticalCard({ vertical }: VerticalCardProps) {
  const Icon = ICON_MAP[vertical.iconName]

  return (
    <article
      className={cn(
        'group flex flex-col rounded-2xl',
        // Glass material (matches detail-panel.tsx canonical pattern)
        'bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]',
        'border border-white/[0.08]',
        // Hover: lift + border glow
        'transition-all duration-200',
        'hover:-translate-y-1',
        'hover:border-[rgba(var(--ember-rgb),0.2)]',
        'hover:shadow-[0_12px_24px_rgba(0,0,0,0.15),0_0_1px_0_rgba(var(--ember-rgb),0.3)]',
      )}
      aria-labelledby={`vertical-${vertical.id}-title`}
    >
      {/* Card header: icon + name + tagline */}
      <div className="p-6 pb-0 md:p-8 md:pb-0">
        {/* Icon */}
        {Icon && (
          <div
            className={cn(
              'mb-4 flex h-12 w-12 items-center justify-center rounded-xl',
              'bg-[rgba(var(--ember-rgb),0.08)]',
              'border border-[rgba(var(--ember-rgb),0.12)]',
            )}
          >
            <Icon size={24} className="text-[var(--color-ember)]" aria-hidden="true" />
          </div>
        )}

        {/* Vertical name */}
        <h3
          id={`vertical-${vertical.id}-title`}
          className="font-sans text-lg font-bold text-[var(--color-text-primary)] md:text-xl"
        >
          {vertical.name}
        </h3>

        {/* Tagline */}
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-ember)] md:text-base">
          {vertical.tagline}
        </p>
      </div>

      {/* Divider */}
      <div className="mx-6 my-4 h-px bg-white/[0.06] md:mx-8" aria-hidden="true" />

      {/* Pain points */}
      <div className="px-6 md:px-8">
        <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-text-tertiary)]">
          The challenge
        </h4>
        <ul className="mt-3 space-y-2" role="list">
          {vertical.painPoints.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm leading-relaxed text-[var(--color-text-secondary)]"
            >
              <span
                className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-text-tertiary)]"
                aria-hidden="true"
              />
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* Solutions */}
      <div className="px-6 pt-4 md:px-8">
        <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-ember)]">
          Safetrekr solution
        </h4>
        <ul className="mt-3 space-y-2" role="list">
          {vertical.solutions.map((solution, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm leading-relaxed text-[var(--color-text-secondary)]"
            >
              <span
                className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-ember)]"
                aria-hidden="true"
              />
              {solution}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA link */}
      <div className="mt-auto p-6 pt-6 md:p-8 md:pt-6">
        <Link
          href={vertical.ctaHref}
          className={cn(
            'inline-flex items-center gap-1.5 text-sm font-semibold',
            'text-[var(--color-ember)]',
            'transition-colors duration-200',
            'group-hover:text-[var(--color-ember-bright)]',
            // Focus
            'rounded-sm',
            'focus-visible:outline-2 focus-visible:outline-offset-2',
            'focus-visible:outline-[var(--color-ember-bright)]',
          )}
        >
          {vertical.ctaLabel}
          <ArrowRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  )
}
```

**Key design decisions in the card:**

1. **Glass-morphism surface** matches the canonical pattern from `detail-panel.tsx`: `bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]` + `border border-white/[0.08]`.
2. **Two-section content** (pain points vs. solutions) separated by a thin divider. Pain point bullets use `--color-text-tertiary` dots; solution bullets use `--color-ember` (green) dots -- creating a visual "problem dim / solution bright" hierarchy.
3. **Section labels** ("The challenge" / "Safetrekr solution") use uppercase tracking-wide tertiary text, consistent with the HUD labeling style used across the spatial interface.
4. **CTA at the bottom** with `mt-auto` to push it to the card bottom regardless of content length. Uses `<Link>` for client-side navigation to future vertical pages.
5. **Hover state** lifts the card (`-translate-y-1`) and adds a subtle ember border glow. No `motion/react` import needed -- CSS transitions only.
6. **`aria-labelledby`** links the article landmark to the vertical name heading for screen reader identification.

### 4.7 Vertical Card Grid (`src/components/marketing/solutions/vertical-card-grid.tsx`)

Server component that arranges the 5 vertical cards in a responsive grid.

**Component signature:**

```typescript
// src/components/marketing/solutions/vertical-card-grid.tsx

import type { SolutionVertical } from '@/lib/interfaces/solutions'
import { VerticalCard } from './vertical-card'

interface VerticalCardGridProps {
  verticals: SolutionVertical[]
}

export function VerticalCardGrid({ verticals }: VerticalCardGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {verticals.map((vertical) => (
        <VerticalCard key={vertical.id} vertical={vertical} />
      ))}
    </div>
  )
}
```

**Responsive grid behavior:**

| Breakpoint | Columns | Cards per Row | Notes |
|------------|---------|---------------|-------|
| < 768px (mobile) | 1 | 1 | Full-width stacked cards |
| >= 768px (tablet) | 2 | 2 + 2 + 1 | Last card spans single column, left-aligned |
| >= 1024px (desktop) | 3 | 3 + 2 | First row of 3, second row of 2 cards |

The 5-card layout naturally produces an asymmetric bottom row. This is intentional -- the bottom row of 2 cards on desktop creates visual breathing room before the objection hook section. The cards are left-aligned (not centered) in the grid, which matches the standard CSS Grid behavior and avoids the visual weight imbalance of a centered orphan row.

If centering the bottom row is preferred for aesthetic reasons, add this utility to the grid container:

```css
/* Optional: center the last row of cards */
.grid > :last-child:nth-child(3n - 1) {
  grid-column: 2;
}
```

This decision should be made during visual review. The default (left-aligned) is recommended for the "mission control" aesthetic -- grids in HUD interfaces align to hard edges, not centered floats.

### 4.8 Objection Hook Section

Rendered directly in the page component. This is a standalone copy block that addresses the most common objection ("we use spreadsheets") and does not need its own component.

```tsx
<section className="relative py-16 md:py-20">
  <div className="mx-auto max-w-3xl px-6">
    <div
      className={cn(
        'rounded-xl p-6 md:p-8',
        'border border-white/[0.06]',
        'bg-white/[0.03]',
      )}
    >
      <p className="text-center text-lg font-semibold text-[var(--color-text-primary)]">
        {OBJECTION_HOOK.question}
      </p>
      <p className="mt-4 text-center text-base leading-[1.8] text-[var(--color-text-secondary)]">
        {OBJECTION_HOOK.answer}
      </p>
    </div>
  </div>
</section>
```

**Design notes:**
- The objection hook is visually distinct from the cross-cutting value prop (Section 4.5). The value prop uses an ember-tinted border (`rgba(var(--ember-rgb), 0.12)`); the objection hook uses a neutral border (`white/[0.06]`). This signals that the hook is a different kind of content -- a challenge/response -- not a brand statement.
- The question is rendered in `text-lg font-semibold text-primary` (bold, bright) and the answer in `text-base text-secondary` (regular, dimmer), creating a visual Q-and-A rhythm.

### 4.9 Bottom CTA Section

Follows the same pattern established in WS-B.9 Section 4.11, with the addition of micro-copy below the button.

```tsx
<section className="relative py-20 md:py-28">
  <div className="mx-auto max-w-2xl px-6 text-center">
    <h2 className="font-sans text-2xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-3xl">
      {SOLUTIONS_BOTTOM_CTA.headline}
    </h2>
    <div className="mt-8">
      <Link
        href={SOLUTIONS_BOTTOM_CTA.href}
        className={cn(
          'inline-flex items-center rounded-lg px-8 py-3',
          'bg-[var(--color-ember)] text-base font-semibold text-[var(--color-void)]',
          'transition-all duration-200',
          'hover:bg-[var(--color-ember-bright)]',
          'focus-visible:outline-2 focus-visible:outline-offset-2',
          'focus-visible:outline-[var(--color-ember-bright)]',
          // Breathing glow (from WS-A.1 marketing.css: mkt-cta-breathe)
          'mkt-cta-breathe',
        )}
      >
        {SOLUTIONS_BOTTOM_CTA.buttonLabel}
      </Link>
    </div>
    <p className="mt-4 text-sm text-[var(--color-text-tertiary)]">
      {SOLUTIONS_BOTTOM_CTA.microcopy}
    </p>
  </div>
</section>
```

### 4.10 JSON-LD Structured Data

Include structured data in the page for SEO. The page component renders a `<script type="application/ld+json">` block.

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Safetrekr",
  "url": "https://safetrekr.com",
  "applicationCategory": "BusinessApplication",
  "description": "Trip safety management platform for schools, churches, youth sports, universities, and businesses.",
  "operatingSystem": "Web",
  "audience": [
    {
      "@type": "EducationalAudience",
      "educationalRole": "administrator",
      "audienceType": "K-12 Schools"
    },
    {
      "@type": "Audience",
      "audienceType": "Higher Education"
    },
    {
      "@type": "Audience",
      "audienceType": "Churches and Faith-Based Organizations"
    },
    {
      "@type": "Audience",
      "audienceType": "Youth Sports Organizations"
    },
    {
      "@type": "Audience",
      "audienceType": "Businesses"
    }
  ],
  "offers": {
    "@type": "Offer",
    "description": "Per-trip pricing with no annual contracts",
    "url": "https://safetrekr.com/pricing"
  }
}
```

Render this in the page component:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(softwareApplicationSchema),
  }}
/>
```

The schema object should be defined as a `const` within the page component file.

### 4.11 Barrel Export (`src/components/marketing/solutions/index.ts`)

```typescript
// src/components/marketing/solutions/index.ts

export { VerticalCard } from './vertical-card'
export { VerticalCardGrid } from './vertical-card-grid'
```

### 4.12 Component File Manifest

Complete list of all new files to be created:

| # | File Path | Type | Directive | Dependencies |
|---|-----------|------|-----------|--------------|
| 1 | `src/app/(marketing)/solutions/page.tsx` | Server component | -- | All data from `solutions-verticals.ts`, `VerticalCardGrid`, `cn`, `Link`, Metadata type |
| 2 | `src/lib/interfaces/solutions.ts` | Type definitions | -- | None |
| 3 | `src/lib/data/solutions-verticals.ts` | Static data module | -- | `SolutionVertical` interface |
| 4 | `src/components/marketing/solutions/vertical-card.tsx` | Server component | -- | `Link`, `lucide-react` icons, `cn`, `SolutionVertical` type |
| 5 | `src/components/marketing/solutions/vertical-card-grid.tsx` | Server component | -- | `VerticalCard`, `SolutionVertical` type |
| 6 | `src/components/marketing/solutions/index.ts` | Barrel export | -- | Re-exports `VerticalCard` and `VerticalCardGrid` |

**New directories:**

| Directory | Purpose |
|-----------|---------|
| `src/components/marketing/solutions/` | Solutions page section components |
| `src/lib/data/` | Static data modules (may already exist from WS-B.9) |
| `src/lib/interfaces/` | Type definitions (directory exists) |

**Total new TypeScript/TSX files: 6**
**Total new image files: 0**
**Total modified existing files: 0**

### 4.13 Assembled Page Structure

The complete page component composes sections in this order:

```tsx
export default function SolutionsPage() {
  return (
    <div className="min-h-screen">
      {/* 1. Hero -- transparent bg */}
      <section className="relative flex min-h-[50vh] items-center justify-center py-24 md:py-32">
        {/* H1 + H2 */}
      </section>

      {/* 2. Cross-cutting value prop -- bg-white/[0.02] */}
      <section className="relative bg-white/[0.02] py-16 md:py-20">
        {/* Ember-tinted callout box */}
      </section>

      {/* 3. Vertical cards -- transparent bg */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <VerticalCardGrid verticals={VERTICALS} />
        </div>
      </section>

      {/* 4. Objection hook -- bg-white/[0.02] */}
      <section className="relative bg-white/[0.02] py-16 md:py-20">
        {/* Q + A objection reframe */}
      </section>

      {/* 5. Bottom CTA -- transparent bg */}
      <section className="relative py-20 md:py-28">
        {/* Headline + Schedule a Briefing button + microcopy */}
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
    </div>
  )
}
```

### 4.14 Future Vertical Detail Page Stubs (Phase D Preparation)

WS-D.1 will create full vertical detail pages at the routes referenced by each card's `ctaHref`. At Solutions page launch, these routes may not yet exist. Two approaches are available:

**Option A (recommended): WS-A.1 creates placeholder pages.**
If WS-A.1 generates placeholder route files for all marketing pages (as specified in its scope), then `/solutions/k12`, `/solutions/higher-ed`, etc. will resolve to placeholder "Coming Soon" pages. The `<Link>` tags on the vertical cards will work correctly, and Next.js build will succeed.

**Option B: Defensive linking.**
If WS-A.1 does not create vertical page stubs, this workstream adds minimal placeholder pages:

```typescript
// src/app/(marketing)/solutions/[vertical]/page.tsx

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const VALID_VERTICALS = ['k12', 'higher-ed', 'churches', 'youth-sports', 'business']

interface VerticalPageProps {
  params: Promise<{ vertical: string }>
}

export async function generateStaticParams() {
  return VALID_VERTICALS.map((v) => ({ vertical: v }))
}

export async function generateMetadata({ params }: VerticalPageProps): Promise<Metadata> {
  const { vertical } = await params
  if (!VALID_VERTICALS.includes(vertical)) return {}
  return {
    title: `${vertical} Solutions | Safetrekr`,
    robots: { index: false },
  }
}

export default async function VerticalDetailPage({ params }: VerticalPageProps) {
  const { vertical } = await params
  if (!VALID_VERTICALS.includes(vertical)) notFound()

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-lg text-[var(--color-text-secondary)]">
        Detailed solutions page coming soon.
      </p>
      <Link
        href="/solutions"
        className="mt-4 text-sm font-semibold text-[var(--color-ember)] hover:text-[var(--color-ember-bright)]"
      >
        Back to Solutions Overview
      </Link>
    </div>
  )
}
```

**Decision:** Use Option A if WS-A.1 confirms placeholder route generation. Use Option B only if vertical routes would 404 at build time. This decision is deferred to implementation time.

---

## 5. Acceptance Criteria

| ID | Criterion | Verification Method |
|----|-----------|---------------------|
| AC-1 | `/solutions` route resolves and renders inside the marketing layout (header visible above, footer visible below, WS-A.1 shell intact) | Manual: navigate to `/solutions` in dev server; verify header and footer presence |
| AC-2 | Hero section displays the correct H1 ("Your travelers. Your responsibility. Your system.") and H2 subtitle | Manual: visual inspection; compare against WS-B.1 Section 4.4.4 |
| AC-3 | Cross-cutting value prop renders in a green-tinted callout box with the full paragraph text, no truncation | Manual: verify border color is ember-tinted; compare text against `CROSS_CUTTING_VALUE_PROP` constant |
| AC-4 | Five vertical cards render in a responsive grid: 3-column on desktop (>= 1024px), 2-column on tablet (768-1023px), single column on mobile (< 768px) | Manual: resize browser at each breakpoint; verify column count |
| AC-5 | Each vertical card displays: icon, vertical name, tagline, 3-4 pain points under "The challenge", 3-4 solutions under "Safetrekr solution", and a CTA link | Manual: inspect each of the 5 cards for complete content |
| AC-6 | Pain point bullet dots are tertiary-colored (`--color-text-tertiary`); solution bullet dots are ember-colored (`--color-ember`) | Manual: visual inspection of bullet dot colors on each card |
| AC-7 | Each card CTA link points to the correct vertical detail route (`/solutions/k12`, `/solutions/higher-ed`, `/solutions/churches`, `/solutions/youth-sports`, `/solutions/business`) | DevTools: inspect `<a>` href values on each card CTA |
| AC-8 | Card hover state lifts the card (-translate-y-1) and adds ember border glow | Manual: hover over each card; verify lift + glow transition |
| AC-9 | Objection hook section renders the question in bold/bright text and the answer in regular/dim text | Manual: visual inspection |
| AC-10 | Bottom CTA renders "Schedule a Briefing" button linking to `/contact` with the `mkt-cta-breathe` glow animation class and micro-copy below | Manual: verify link target, visual glow effect, and micro-copy text |
| AC-11 | All interactive elements (CTA links on each card, bottom CTA button) have visible focus indicators: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]` | Manual: Tab through all interactive elements; verify focus rings |
| AC-12 | Page metadata renders correct `<title>` ("Safetrekr Solutions -- Trip Safety for Schools, Churches, Sports, Universities, Business"), `<meta name="description">`, and OpenGraph tags | DevTools: inspect `<head>` elements |
| AC-13 | JSON-LD structured data (`application/ld+json`) renders with SoftwareApplication schema including all 5 audience types | DevTools: inspect `<script type="application/ld+json">` content; validate with Google Rich Results Test |
| AC-14 | All glass-morphism surfaces use the canonical pattern from `detail-panel.tsx`: `bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]` + `border border-white/[0.08]` | Code review: verify CSS classes on all card components |
| AC-15 | No hardcoded hex colors in component files -- only spatial token CSS variables | Code review: grep for hex color values (`#[0-9a-fA-F]`) in solutions page components; expect 0 results |
| AC-16 | No `import` from `'framer-motion'` anywhere -- only `'motion/react'` if needed (this page should not need motion/react at all) | Code review: grep returns 0 results for `framer-motion` |
| AC-17 | No `'use client'` directive in any component file -- entire page is server-rendered | Code review: grep for `'use client'` in solutions page components; expect 0 results |
| AC-18 | `pnpm typecheck` passes with zero errors after all files are created | CLI: run `pnpm typecheck` |
| AC-19 | `pnpm lint` passes with zero errors after all files are created | CLI: run `pnpm lint` |
| AC-20 | `pnpm build` completes successfully | CLI: run `pnpm build` |
| AC-21 | Page is fully keyboard-navigable: Tab moves through CTA links in card order (K-12, Higher Ed, Churches, Youth Sports, Business, then bottom CTA) | Manual: Tab through entire page; verify logical focus order |
| AC-22 | Each card `<article>` has `aria-labelledby` pointing to the card's heading element | DevTools: inspect ARIA attributes on each article |
| AC-23 | Cards do not depend on each other's vertical order -- reordering the `VERTICALS` array in the data module changes the display order without code changes | Code review: verify cards are rendered via `.map()` over the array, not hardcoded |
| AC-24 | Page renders correctly with `prefers-reduced-motion: reduce` enabled -- card hover transitions are instant or absent | Manual: enable reduced motion in OS settings; verify behavior |
| AC-25 | All 5 Lucide icons render correctly at the specified size (24px) in the ember green color | Manual: visual inspection of each card's icon |

---

## 6. Decisions Made

| # | Decision | Rationale | Alternatives Considered |
|---|----------|-----------|------------------------|
| D-1 | Entire page is a server component with zero client-side JavaScript | The Solutions overview page has no interactive elements requiring client state (no modals, no toggles, no forms). Pure server rendering maximizes SEO value, eliminates JS bundle cost, and produces the fastest possible initial paint. | Client component for card hover animations (CSS transitions achieve the same effect without JS); client component for future A/B testing (use feature flags at the server/middleware level instead) |
| D-2 | Vertical card data lives in a static TypeScript module, not in a CMS or database | Vertical definitions change infrequently (adding/removing a vertical is a business decision, not a content update). Static data provides full type safety, zero runtime latency, and no external dependency. | Supabase table (adds API call for static content); MDX per vertical (over-engineering for card-level content); inline in component (unstructured, harder to maintain) |
| D-3 | Pain points and solutions are separate arrays, not interleaved pairs | Visually, the card presents pain points as a block and solutions as a block, not as matched pairs. Separate arrays match the visual structure and are simpler to author. If future design requires matched pairs (pain + solution side-by-side), the interface can be extended to `{ pain: string; solution: string }[]` without breaking the existing data shape. | Paired `{ pain, solution }[]` array (visual design does not match pairs); combined prose paragraph (loses scannability) |
| D-4 | Lucide icons are used instead of custom SVG illustrations or images | No vertical-specific imagery exists. Lucide icons are already in the project dependency tree, render crisply at any size, support the thin-stroke HUD aesthetic, and add zero additional bundle cost. The `VerticalCard` component uses a string-to-component `ICON_MAP`, making icon changes a data-only edit. | Custom SVG illustrations per vertical (design effort, blocks implementation); stock photos (conflicts with dark HUD aesthetic); emoji (unprofessional for enterprise audience); no visual (cards feel text-heavy) |
| D-5 | Card CTA uses `<Link>` (Next.js client-side navigation) not `<a>` tag | Even though the vertical detail pages do not yet exist, using `<Link>` ensures correct client-side navigation when WS-D.1 creates them. Next.js `<Link>` prefetches on hover, providing faster navigation. The server component can import `next/link` without requiring `'use client'`. | Plain `<a>` tag (loses prefetch behavior; still works but slower); disabled/greyed-out link with "Coming Soon" tooltip (looks broken; undermines confidence) |
| D-6 | Solutions page components are namespaced under `src/components/marketing/solutions/` | Follows the codebase convention of domain-specific component directories established by the spatial engine (`districts/`, `spatial/`, `ambient/`) and extended by WS-B.9 (`marketing/about/`). | Flat in `src/components/marketing/` (namespace pollution); co-located in route directory (Next.js discourages for shared components); single file with all components (hard to navigate) |
| D-7 | The 5-card grid uses standard CSS Grid left-alignment, not centered orphan rows | HUD interfaces align content to grid edges. Centered orphan rows create visual "float" that conflicts with the precision aesthetic. Standard left-alignment also requires zero custom CSS beyond Tailwind grid utilities. | Centered last row via custom CSS (aesthetic preference; can be added later); 5-column grid (cards too narrow on desktop); 2-3-2-3 alternating layout (over-engineered) |
| D-8 | Objection hook is inline in the page component, not a separate reusable component | The objection hook is page-specific content from the copy deck. It is not reused elsewhere. Extracting it to a component would add indirection without reuse benefit. | Shared `ObjectionBlock` component (no second use case); omit the objection hook (loses valuable conversion copy) |
| D-9 | Card hover uses CSS transitions only, no `motion/react` | The hover effect is a simple translate + shadow change. CSS transitions handle this with zero JavaScript. Adding `motion/react` would require `'use client'` on the card component, breaking the server-rendering advantage. | `motion/react` `whileHover` (forces client component; unnecessary for CSS-achievable effect); no hover effect (cards feel flat and non-interactive) |
| D-10 | Dynamic route with `[vertical]` slug is used for placeholder pages (Option B), not individual page files | A single dynamic route with `generateStaticParams` handles all 5 verticals. This avoids creating 5 nearly-identical placeholder files and establishes the routing pattern that WS-D.1 will expand. The `VALID_VERTICALS` array prevents arbitrary slug resolution. | 5 individual `page.tsx` files (duplication); no placeholder pages (broken links at build time if WS-A.1 does not create them); redirect to `/solutions` (loses URL intent) |

---

## 7. Open Questions

| # | Question | Impact | Owner | Resolution Deadline |
|---|----------|--------|-------|---------------------|
| OQ-1 | Should the K-12 card cite "FERPA, COPPA" explicitly, or use softer language ("designed with student data privacy in mind")? Depends on WS-B.1 Q-4 resolution (FERPA compliance verification). | Affects one pain point bullet on the K-12 card. If Q-4 resolves "not verified," change from `'Regulatory compliance (FERPA, COPPA) adds complexity to data handling'` to `'Student data privacy requirements add complexity to data handling'`. | Business Owner | Before production launch |
| OQ-2 | Should the bottom CTA ("Schedule a Briefing") link to `/contact` or to an external scheduling tool (e.g., Calendly)? | Matches OQ-1 from WS-A.1 and OQ-3 from WS-B.9. If external, the link needs `target="_blank"` and `rel="noopener noreferrer"`. Affects both the bottom CTA and potentially the card CTAs. | Product | Before WS-A.4 implementation |
| OQ-3 | Should the desktop grid center the bottom row (2 cards in 3-column grid), or leave it left-aligned? | Aesthetic preference only. Left-aligned is the default and matches HUD aesthetic. Centering requires one CSS rule (see Section 4.7). | Design | During visual review |
| OQ-4 | Are there additional verticals to include beyond the 5 specified (K-12, Higher Ed, Churches, Youth Sports, Business)? The copy deck mentions potential for "summer camps" and "nonprofit organizations." | Would add 1-2 more cards to the grid. Grid layout handles 6 or 7 cards naturally (2 rows of 3, or 3+3+1). Data change only -- no component changes needed. | Product | Before implementation begins |
| OQ-5 | Should each vertical card include a small testimonial quote placeholder (even without real testimonials yet)? WS-B.1 Q-7 notes that pilot customer testimonials are not yet available. | Would add visual weight to cards and reserve space for future content. The `SolutionVertical` interface can include an optional `testimonial?: { quote: string; attribution: string }` field. | Product | Before implementation begins |
| OQ-6 | Should vertical card links be temporarily disabled (visually dimmed with "Coming soon" indicator) until WS-D.1 creates detail pages, or should they link to placeholder pages? | If disabled: cards look complete but non-functional. If placeholder: cards link to minimal "coming soon" pages. Placeholder is preferred (see D-10). | Product | During implementation |

---

## 8. Risk Register

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|------------|--------|------------|
| R-1 | Approved copy from WS-B.1 is delayed, blocking page implementation | Medium | High | The Solutions page copy in WS-B.1 Section 4.4.4 is already drafted in detail. Implementation can proceed with draft copy. The data module (`solutions-verticals.ts`) is the single point of copy change -- updating text requires editing one file, no component changes. |
| R-2 | Glass-morphism `backdrop-blur` causes performance issues on low-end mobile devices with 5 cards visible simultaneously | Medium | Medium | The Solutions page has 5 blur surfaces (fewer than the spatial ZUI). On mobile, cards stack vertically, so only 1-2 blur surfaces are in the viewport at any time. Follow WS-A.1 R-1 mitigation: use `@supports (backdrop-filter: blur(16px))` to fall back to `bg-[var(--color-deep)]/90` on unsupported browsers. |
| R-3 | Card content length varies significantly across verticals, causing uneven card heights in the grid | Medium | Low | CSS Grid with `grid-cols-*` ensures equal column width. Card height is determined by content. The `mt-auto` on the CTA link pushes it to the bottom of each card, visually aligning CTA positions even when content lengths differ. If uneven heights are visually problematic, add `items-stretch` to the grid container (which is the default for CSS Grid). |
| R-4 | FERPA/COPPA language on K-12 card creates compliance risk if claims are not verified | Medium | High | OQ-1 tracks this. The data module uses a single string that can be edited without touching components. If Q-4 from WS-B.1 resolves "not verified," update the pain point text to softer language before production launch. No build or component changes needed. |
| R-5 | WS-D.1 vertical detail pages are delayed, leaving card CTA links pointing to placeholder pages for an extended period | Medium | Medium | Placeholder pages (Section 4.14) provide a graceful degradation path. They render a "coming soon" message with a back link to `/solutions`. Setting `robots: { index: false }` on placeholder metadata prevents search engines from indexing incomplete pages. |
| R-6 | WS-A.1 (marketing layout) is not yet complete, blocking page composition | Medium | High | Solutions page components (cards, grid, data module) can be developed and type-checked in isolation. The page component depends on WS-A.1 only for the wrapping layout. If urgently needed, the page can render with a minimal local layout wrapper as a temporary shim. |
| R-7 | Five verticals may not be the final set -- product adds or removes verticals before launch | Low | Low | The page renders cards from an array (`VERTICALS`). Adding a vertical requires adding one object to the array. Removing requires deleting one object. No component changes. The grid layout handles 4, 5, 6, or 7 cards naturally. The `SolutionVertical` interface is stable across any number of verticals. |
| R-8 | Card hover effects (lift + glow) are too subtle on the dark background and feel non-interactive | Low | Medium | Current spec uses `-translate-y-1` (4px lift) and ember border glow. If testing reveals insufficient feedback, increase to `-translate-y-1.5` (6px) and strengthen the glow shadow. No structural changes needed -- only Tailwind class values. |
| R-9 | Bottom row of 2 cards on desktop (in 3-column grid) looks unfinished or sparse | Low | Low | OQ-3 tracks the centering question. The default left-alignment is intentional for HUD aesthetic. If the bottom row looks sparse, options include: center the row (1 CSS rule), add a 6th vertical (product decision), or use a 2-column grid on desktop instead of 3 (changes one Tailwind class). |

---

## Estimated Effort

**Size:** S-M (Small to Medium)
**Estimated time:** 2-3 hours implementation + verification
**Files touched:** 6 new TypeScript/TSX files, 0 image files, 0 modified existing files

**Effort breakdown:**

| Task | Estimate |
|------|----------|
| Type definitions + data module | 30 min |
| VerticalCard component | 45 min |
| VerticalCardGrid + page composition | 30 min |
| SEO metadata + JSON-LD | 15 min |
| Responsive testing (3 breakpoints) | 20 min |
| Keyboard + focus indicator verification | 15 min |
| TypeCheck + Lint + Build verification | 15 min |

**Why this is smaller than WS-B.9 (About page):**
- No client components (zero `'use client'` boundaries)
- No modal or interactive state management
- No image asset migration
- No focus trap implementation
- One card component reused 5 times vs. multiple specialized components
- Pure content page with CSS-only hover effects
