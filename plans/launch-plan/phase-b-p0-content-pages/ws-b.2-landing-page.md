# WS-B.2: Landing Page

> **Workstream ID:** WS-B.2
> **Phase:** B -- P0 Content Pages
> **Assigned Agent:** `react-developer`
> **Status:** Draft
> **Created:** 2026-03-02
> **Last Updated:** 2026-03-02
> **Depends On:** WS-A.1 (Marketing Route Group + Layout), WS-B.1 (Content Strategy + Copy Drafting)
> **Blocks:** WS-C.1 (Gateway Integration)
> **Resolves:** Landing page content gap; SEO-optimized entry point for organic search traffic

---

## 1. Objective

Implement the Safetrekr marketing landing page at `/(marketing)/landing` (URL: `/landing`) as the primary SEO-optimized entry point for organic search traffic. The page presents the full value proposition in a single, scrollable, dark glass-morphism layout with six content sections: hero, value propositions, how-it-works summary, vertical callouts, social proof, and a bottom CTA bar.

The page must be a Next.js server component at the page level (for SEO crawlability and metadata export) with minimal client islands restricted to the breathing-glow CTA buttons and the background particle field animation. All copy comes from WS-B.1 Section 4.4.1. The visual treatment follows the Oblivion HUD dark glass-morphism system established by the existing spatial token architecture in `src/styles/spatial-tokens.css`.

This is the highest-traffic marketing page and the primary conversion surface for "Schedule a Briefing" requests. Performance, accessibility, and visual polish are non-negotiable.

---

## 2. Scope

### In Scope

| # | Item | Notes |
|---|------|-------|
| 1 | `src/app/(marketing)/landing/page.tsx` | Server component replacing WS-A.1 placeholder. Exports SEO metadata. Composes all six sections. |
| 2 | Hero section component | Full-viewport-height dark glass panel with H1, subheadline, primary CTA (breathing glow), secondary CTA, and ParticleField background. |
| 3 | Value propositions section | Three glass cards: Documented Accountability, Operational Control, Real-Time Intelligence. |
| 4 | How It Works summary section | Four-step visual (Plan, Review, Protect, Monitor) with connecting treatment and "Learn more" link. |
| 5 | Vertical callouts section | Five glass cards (K-12, Higher Ed, Churches, Youth Sports, Business) with "Learn more" links. |
| 6 | Social proof section | Three "capability proof" placeholder cards (18 review dimensions, 46 endpoints, 4 portals). Designed for future replacement with real testimonials. |
| 7 | Bottom CTA bar | Full-width glass bar with emotional close copy, "Schedule a Briefing" primary CTA, and "See Pricing" secondary CTA. |
| 8 | `MarketingParticleField` component | Simplified HTML5 Canvas particle animation for marketing pages (no spatial engine dependencies). |
| 9 | Reusable `GlassCard` component | Shared glass-morphism card primitive for use across all B.x marketing pages. |
| 10 | Reusable `SectionContainer` component | Consistent section wrapper with max-width, padding, and optional `id` for deep linking. |
| 11 | Reusable `BreathingCTA` component | Client island for CTA buttons with breathing glow animation. |
| 12 | Landing page section stylesheet | `src/styles/landing.css` with section-specific keyframes and utility classes. |
| 13 | Responsive layout for all six sections | Mobile-first design with breakpoints at `md` (768px) and `lg` (1024px). |
| 14 | Accessibility compliance | Semantic heading hierarchy, ARIA landmarks, focus management, reduced-motion support. |

### Out of Scope

| # | Item | Rationale |
|---|------|-----------|
| 1 | Marketing header and footer | Delivered by WS-A.1. This workstream's page renders inside that layout. |
| 2 | Contact form functionality | WS-A.4 handles form infrastructure. CTAs link to `/contact`. |
| 3 | SEO infrastructure (sitemap, robots.txt, JSON-LD) | WS-A.3 handles site-wide SEO. This workstream exports page-level `metadata` only. |
| 4 | OG image generation | WS-C.4 handles social share images. |
| 5 | Analytics event instrumentation | WS-C.3 handles analytics. This workstream provides `data-analytics-*` attributes on CTAs for future binding. |
| 6 | Gateway integration (linking `/` to `/landing`) | WS-C.1 handles gateway-to-marketing-page routing. |
| 7 | Individual vertical sub-pages (`/solutions/k12`, etc.) | WS-D.1 scope. Vertical cards link to `/solutions` for now. |
| 8 | Real testimonials | Pending pilot customer outreach (WS-B.1 Q-7). Capability proof cards serve as placeholder. |
| 9 | Scroll-triggered entrance animations | Deferred to post-launch polish. Keeps page maximally server-rendered for launch. |

---

## 3. Input Dependencies

| Dependency | Source | Status | Critical? |
|------------|--------|--------|-----------|
| Marketing layout shell (`(marketing)/layout.tsx`, `MarketingHeader`, `MarketingFooter`) | WS-A.1 Deliverables 4.1--4.5 | **Not started** | Yes -- page renders inside this layout |
| Marketing stylesheet (`src/styles/marketing.css`) with `mkt-cta-breathe` keyframe | WS-A.1 Deliverable 4.7 | **Not started** | Yes -- breathing glow CTA depends on this class |
| Landing page copy (hero, value props, how-it-works, verticals, social proof, bottom CTA) | WS-B.1 Section 4.4.1 | Available (draft) | Yes -- all text content |
| Voice and tone guide | WS-B.1 Section 4.1 | Available (draft) | Yes -- governs copy voice |
| SEO title and description | WS-B.1 Section 4.4.1 | Available (draft) | Yes -- metadata export |
| Spatial token system (`src/styles/spatial-tokens.css`) | Codebase | Available | Yes -- all color, spacing, glow, and animation tokens |
| Tailwind theme bridge (`src/app/globals.css`) | Codebase | Available | Yes -- maps CSS vars to Tailwind utilities |
| Glass-morphism pattern (`src/components/districts/detail-panel.tsx`) | Codebase | Available | Yes -- reference implementation for glass surface treatment |
| Breathing glow keyframe pattern (`src/styles/gateway.css`) | Codebase | Available | Yes -- reference for `mkt-cta-breathe` adaptation |
| `ParticleField` reference implementation (`src/components/ambient/ParticleField.tsx`) | Codebase | Available | Yes -- basis for `MarketingParticleField` |
| `cn()` utility (`src/lib/utils.ts`) | Codebase | Available | Yes -- class merging |
| `useReducedMotion` hook (`@tarva/ui/motion`) | `@tarva/ui` package | Available | Yes -- accessibility for animated components |
| Lucide icons (`lucide-react`) | `package.json` dependency | Available | No -- optional for step indicators |
| Logo assets (`public/images/logos/`) | Codebase | Available | No -- not directly used on landing page (header handles logo) |
| `motion/react` package | `package.json` dependency (`motion: ^12.0.0`) | Available | No -- reserved for future entrance animations |

---

## 4. Deliverables

### 4.1 Page Component (`src/app/(marketing)/landing/page.tsx`)

**Replaces:** The placeholder page created by WS-A.1.

**Component type:** Server component (no `'use client'` directive). This is critical for SEO -- search engine crawlers receive the full HTML content without needing JavaScript execution.

**Metadata export:**

```typescript
// src/app/(marketing)/landing/page.tsx

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Safetrekr -- Trip Safety Management for Organizations That Move People',
  description:
    'Every traveler accounted for. Safetrekr replaces spreadsheets and email chains with a documented, auditable safety platform. Independent analyst review. Real-time intelligence. Per-trip pricing.',
  alternates: {
    canonical: '/landing',
  },
}
```

**Composition structure:**

```typescript
export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <ValuePropsSection />
      <HowItWorksSection />
      <VerticalsSection />
      <SocialProofSection />
      <BottomCTASection />
    </>
  )
}
```

The page component is a pure composition root. Each section is a standalone server component (or contains client islands where animation is needed). Sections receive no props -- copy is hardcoded per WS-B.1 specifications, not fetched from a CMS.

**Heading hierarchy for the full page:**

| Level | Element | Content | Section |
|-------|---------|---------|---------|
| H1 | `<h1>` | "Every traveler accounted for." | Hero |
| H2 | `<h2>` | "Every decision documented. Every safeguard verified." | Value Props -- Card 1 |
| H2 | `<h2>` | "One platform. Four portals. Complete lifecycle coverage." | Value Props -- Card 2 |
| H2 | `<h2>` | "Know about threats before they reach your travelers." | Value Props -- Card 3 |
| H2 | `<h2>` | "Four phases. One system of record." | How It Works |
| H2 | `<h2>` | "Built for organizations that move people." | Verticals |
| H2 | `<h2>` | "Trusted by organizations that take safety seriously." | Social Proof |
| H2 | `<h2>` | (Implicit -- emotional close copy block) | Bottom CTA |

Note: The value proposition card headings are H2 because they are sibling sections at the same level of the document outline. Within the How It Works section, step names (Plan, Review, Protect, Monitor) are H3.

---

### 4.2 Hero Section (`src/components/marketing/landing/hero-section.tsx`)

**Component type:** Server component wrapping a client island (`HeroCTAGroup`).

**Visual specification:**

| Property | Value | Token / Class |
|----------|-------|---------------|
| Height | Full viewport minus header | `min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-64px)]` (header is `h-14 md:h-16`) |
| Background | Void (darkest) | `bg-[var(--color-void)]` (inherited from body, no override needed) |
| Particle overlay | `MarketingParticleField` at low opacity | Positioned `absolute inset-0` behind content, `z-0` |
| Content z-index | Above particles | `relative z-10` |
| Vertical alignment | Centered | `flex flex-col items-center justify-center` |
| Max content width | 800px for text block | `max-w-[800px]` |
| Text alignment | Centered | `text-center` |
| Padding | Horizontal gutters | `px-6 lg:px-8` |
| Section element | `<section>` | `<section id="hero" aria-labelledby="hero-heading">` |

**H1 styling:**

```
cn(
  'font-sans text-4xl font-bold tracking-tight',
  'md:text-5xl lg:text-6xl',
  'text-[var(--color-text-primary)]',
  'leading-[1.1]',
)
```

The H1 has `id="hero-heading"` for the section's `aria-labelledby` reference.

**Subheadline styling:**

```
cn(
  'mt-6 text-lg leading-relaxed',
  'md:text-xl md:leading-relaxed',
  'text-[var(--color-text-secondary)]',
  'max-w-[640px] mx-auto',
)
```

**CTA group:** Extracted to a client island component (see 4.2.1) for the breathing glow animation.

**Content (from WS-B.1 Section 4.4.1):**

- H1: "Every traveler accounted for."
- Subheadline: "Safetrekr replaces scattered spreadsheets, email chains, and paper checklists with a single, auditable trip safety platform -- backed by independent analyst review that no competitor offers."
- Primary CTA: "Schedule a Briefing" (links to `/contact`)
- CTA micro-copy: "20-minute briefing. No obligation."
- Secondary CTA: "Explore the Platform" (links to `/launch`)

---

#### 4.2.1 Hero CTA Group (`src/components/marketing/landing/hero-cta-group.tsx`)

**Component type:** Client component (`'use client'`). This is the only client island in the hero section.

**Why client:** The primary CTA uses the `mkt-cta-breathe` CSS animation class. While CSS animations work on server-rendered elements, extracting this as a client component allows the `BreathingCTA` reusable component (4.9) to be used consistently, and prepares for future scroll-position-aware animation triggers without refactoring.

**Markup structure:**

```tsx
<div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
  {/* Primary CTA */}
  <BreathingCTA href="/contact" size="lg">
    Schedule a Briefing
  </BreathingCTA>

  {/* Micro-copy */}
  <p className="text-xs text-[var(--color-text-tertiary)] sm:hidden">
    20-minute briefing. No obligation.
  </p>

  {/* Secondary CTA */}
  <Link
    href="/launch"
    className={cn(
      'rounded-full px-6 py-3 text-sm font-medium',
      'text-[var(--color-text-secondary)]',
      'border border-white/[0.08]',
      'hover:text-[var(--color-text-primary)]',
      'hover:border-white/[0.14]',
      'hover:bg-white/[0.04]',
      'transition-all duration-[var(--duration-hover)]',
      'focus-visible:outline-2 focus-visible:outline-offset-2',
      'focus-visible:outline-[var(--color-ember-bright)]',
    )}
  >
    Explore the Platform
  </Link>
</div>

{/* Micro-copy (desktop -- positioned below CTA row) */}
<p className="mt-4 hidden text-xs text-[var(--color-text-tertiary)] sm:block">
  20-minute briefing. No obligation.
</p>
```

**Responsive behavior:**

| Breakpoint | Layout |
|------------|--------|
| < 640px (`sm`) | CTAs stack vertically, centered. Micro-copy between CTAs. |
| >= 640px (`sm`) | CTAs side-by-side. Micro-copy below the row. |

---

### 4.3 Value Propositions Section (`src/components/marketing/landing/value-props-section.tsx`)

**Component type:** Server component.

**Visual specification:**

| Property | Value | Token / Class |
|----------|-------|---------------|
| Background | Subtle gradient shift | `bg-gradient-to-b from-[var(--color-void)] to-[var(--color-abyss)]` |
| Section padding | `py-24 lg:py-32` | Standard section spacing |
| Grid | 3-column on desktop, single on mobile | `grid grid-cols-1 md:grid-cols-3 gap-8` |
| Section element | `<section>` | `<section id="value-props" aria-labelledby="value-props-heading">` |

Note: The section heading from WS-B.1 is implicit (the three cards together convey the value). If a section heading is desired for accessibility, add a visually-hidden H2: `<h2 id="value-props-heading" className="sr-only">Why Safetrekr</h2>`.

**Card content (from WS-B.1 Section 4.4.1):**

| Card | Heading (H2) | Body |
|------|-------------|------|
| 1 | "Every decision documented. Every safeguard verified." | "Independent safety analysts review every trip across 18 dimensions before departure. Every checklist acknowledgment, every background check, every approval decision -- timestamped, attributed, and audit-ready." |
| 2 | "One platform. Four portals. Complete lifecycle coverage." | "Organization administrators plan trips. Independent analysts verify safety. Travelers receive live safety information on their phones. HQ monitors the entire operation. One system of record replaces dozens of disconnected tools." |
| 3 | "Know about threats before they reach your travelers." | "Safetrekr's intelligence engine monitors destinations for security, weather, health, transport, and political risks. Alerts are risk-scored, analyst-triaged, and delivered to the people who need them -- with proof of receipt." |

**Card label (above heading):** Each card has a label in mono font:

| Card | Label |
|------|-------|
| 1 | "Documented Accountability" |
| 2 | "Operational Control" |
| 3 | "Real-Time Intelligence" |

Label styling:

```
cn(
  'font-mono text-xs font-medium uppercase',
  'tracking-[var(--tracking-widest)]',
  'text-[var(--color-ember)]',
  'mb-3',
)
```

**Card heading styling:**

```
cn(
  'font-sans text-xl font-semibold leading-snug',
  'text-[var(--color-text-primary)]',
)
```

**Card body styling:**

```
cn(
  'mt-4 text-sm leading-relaxed',
  'text-[var(--color-text-secondary)]',
)
```

Each card uses the shared `GlassCard` component (Deliverable 4.8) with internal padding of `p-8 lg:p-10`.

---

### 4.4 How It Works Section (`src/components/marketing/landing/how-it-works-section.tsx`)

**Component type:** Server component.

**Visual specification:**

| Property | Value | Token / Class |
|----------|-------|---------------|
| Background | Abyss | `bg-[var(--color-abyss)]` |
| Section padding | `py-24 lg:py-32` | Standard section spacing |
| Section heading (H2) | "Four phases. One system of record." | Centered |
| Step layout | 4-column horizontal on desktop, vertical stack on mobile | See grid below |
| Connecting element | Dashed horizontal line (desktop) or vertical line (mobile) between steps | CSS `border-dashed` |
| Section element | `<section>` | `<section id="how-it-works" aria-labelledby="how-it-works-heading">` |
| CTA link | "See how it works" linking to `/how-it-works` | Below the steps |

**Section heading styling:**

```
cn(
  'text-center font-sans text-3xl font-bold',
  'md:text-4xl',
  'text-[var(--color-text-primary)]',
  'mb-16 lg:mb-20',
)
```

**Step grid:**

| Breakpoint | Layout |
|------------|--------|
| < 768px (`md`) | Single column. Steps stacked vertically with vertical dashed connector line on the left. |
| >= 768px (`md`) | 4-column grid: `grid grid-cols-4 gap-8 lg:gap-12`. Horizontal dashed connector line runs between step number circles. |

**Step component structure (repeated 4 times):**

Each step renders:

1. **Step number circle** -- A 48px circle with ember border, containing the step number.

   ```
   cn(
     'flex h-12 w-12 items-center justify-center rounded-full',
     'border-2 border-[var(--color-ember)]',
     'text-[var(--color-ember)] font-mono text-lg font-bold',
     'bg-[var(--color-abyss)]',        // match section bg for connector line to pass behind
     'relative z-10',                    // above the connector line
   )
   ```

2. **Step name (H3):**

   ```
   cn(
     'mt-4 font-sans text-lg font-semibold',
     'text-[var(--color-text-primary)]',
   )
   ```

3. **Step description:**

   ```
   cn(
     'mt-2 text-sm leading-relaxed',
     'text-[var(--color-text-secondary)]',
   )
   ```

**Step content (from WS-B.1 Section 4.4.1):**

| Step | Number | Name (H3) | Description |
|------|--------|-----------|-------------|
| 1 | 1 | Plan | "Guided 10-step wizard captures every detail: logistics, rosters, lodging, venues, transportation, and emergency preparedness." |
| 2 | 2 | Review | "An independent safety analyst reviews every trip across 18 dimensions. Separation of duties is enforced by the platform, not by policy." |
| 3 | 3 | Protect | "46-endpoint protection system activates rally points, safe houses, geofencing, and SMS emergency broadcast. Intelligence alerts are delivered in real time." |
| 4 | 4 | Monitor | "Live traveler delivery through the mobile app. Geo-triggered checklists. Alert acknowledgment tracking. Every interaction documented." |

**Connector line (desktop):**

A horizontal dashed line running through the vertical center of the step number circles. Implementation: a `<div>` positioned absolutely behind the grid with:

```
cn(
  'absolute top-6 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)]',
  'hidden md:block',
  'h-0 border-t-2 border-dashed border-[var(--color-ember-muted)]',
)
```

The `top-6` aligns with the vertical center of the `h-12` step circles. The horizontal insets skip the outer halves of the first and last step columns.

**Connector line (mobile):**

A vertical dashed line on the left side running between step circles. Implementation: each step (except the last) has an `::after` pseudo-element or a sibling `<div>`:

```
cn(
  'absolute left-6 top-12 h-full w-0',
  'border-l-2 border-dashed border-[var(--color-ember-muted)]',
  'md:hidden',
)
```

**Section CTA link:**

Below the step grid, centered:

```tsx
<Link
  href="/how-it-works"
  className={cn(
    'mt-12 inline-flex items-center gap-2',
    'text-sm font-medium',
    'text-[var(--color-ember-bright)]',
    'hover:text-[var(--color-ember-glow)]',
    'transition-colors duration-[var(--duration-hover)]',
    'focus-visible:outline-2 focus-visible:outline-offset-2',
    'focus-visible:outline-[var(--color-ember-bright)]',
  )}
>
  See how it works
  <span aria-hidden="true">&rarr;</span>
</Link>
```

---

### 4.5 Verticals Section (`src/components/marketing/landing/verticals-section.tsx`)

**Component type:** Server component.

**Visual specification:**

| Property | Value | Token / Class |
|----------|-------|---------------|
| Background | Void | `bg-[var(--color-void)]` |
| Section padding | `py-24 lg:py-32` | Standard section spacing |
| Section heading (H2) | "Built for organizations that move people." | Centered |
| Card layout | Responsive grid | See grid below |
| Section element | `<section>` | `<section id="verticals" aria-labelledby="verticals-heading">` |

**Section heading styling:** Same as How It Works (Deliverable 4.4 heading spec).

**Card grid:**

| Breakpoint | Layout |
|------------|--------|
| < 640px (`sm`) | Single column, full-width cards |
| >= 640px, < 1024px (`sm` to `lg`) | 2-column grid. Fifth card spans full width or centers in its row. `grid grid-cols-2 gap-6` with last card using `sm:col-span-2 sm:max-w-[calc(50%-12px)] sm:mx-auto` |
| >= 1024px (`lg`) | 3-column first row, 2-column second row centered. `grid grid-cols-3 gap-6` for first 3 cards, then a nested `flex justify-center gap-6` row for the remaining 2 cards. |

Alternative simpler grid approach (recommended for implementation simplicity):

```
cn(
  'grid gap-6',
  'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
)
```

The 5 cards flow naturally: 1 per row on mobile, 2+2+1 on tablet, 3+2 on desktop. The last card on tablet and the last 2 on desktop naturally center due to grid behavior. For explicit centering of the partial row on desktop, wrap the last 2 cards in a `col-span-3` flex container:

```tsx
{/* Cards 1-3 */}
<GlassCard>...</GlassCard>
<GlassCard>...</GlassCard>
<GlassCard>...</GlassCard>

{/* Cards 4-5: centered in a spanning row on lg */}
<div className="sm:col-span-2 lg:col-span-3 flex flex-col sm:flex-row justify-center gap-6">
  <GlassCard className="sm:max-w-[calc(50%-12px)] lg:max-w-[calc(33.333%-16px)]">...</GlassCard>
  <GlassCard className="sm:max-w-[calc(50%-12px)] lg:max-w-[calc(33.333%-16px)]">...</GlassCard>
</div>
```

**Card content (from WS-B.1 Section 4.4.1):**

| Card | Vertical Name (H3) | Description | Link |
|------|---------------------|-------------|------|
| 1 | K-12 Schools | "Field trip safety, parental consent, background screening, and regulatory compliance -- documented for every trip." | `/solutions` |
| 2 | Higher Education | "Study abroad risk management, international safety review, and institutional audit documentation." | `/solutions` |
| 3 | Churches | "Mission trip safety planning, volunteer screening, international risk assessment, and emergency preparedness." | `/solutions` |
| 4 | Youth Sports | "Tournament travel coordination, coach screening, medical consent, and real-time alerts for traveling teams." | `/solutions` |
| 5 | Business | "Corporate duty of care documented, not assumed. Travel risk management with per-trip pricing." | `/solutions` |

Each card contains:
- H3 vertical name
- Description paragraph
- "Learn more" link with right arrow

**Card heading styling:**

```
cn(
  'font-sans text-lg font-semibold',
  'text-[var(--color-text-primary)]',
)
```

**Card description styling:** Same as value prop card body (Deliverable 4.3).

**Card link styling:**

```
cn(
  'mt-4 inline-flex items-center gap-1.5',
  'text-sm font-medium',
  'text-[var(--color-ember)]',
  'hover:text-[var(--color-ember-bright)]',
  'transition-colors duration-[var(--duration-hover)]',
  'focus-visible:outline-2 focus-visible:outline-offset-2',
  'focus-visible:outline-[var(--color-ember-bright)]',
)
```

---

### 4.6 Social Proof Section (`src/components/marketing/landing/social-proof-section.tsx`)

**Component type:** Server component.

**Visual specification:**

| Property | Value | Token / Class |
|----------|-------|---------------|
| Background | Gradient from void to abyss | `bg-gradient-to-b from-[var(--color-void)] to-[var(--color-abyss)]` |
| Section padding | `py-24 lg:py-32` | Standard section spacing |
| Section heading (H2) | "Trusted by organizations that take safety seriously." | Centered |
| Card layout | 3-column grid | `grid grid-cols-1 md:grid-cols-3 gap-8` |
| Section element | `<section>` | `<section id="social-proof" aria-labelledby="social-proof-heading">` |

**Placeholder card design (capability proof pattern):**

Each card uses `GlassCard` with a distinct visual treatment to differentiate from value prop cards:

1. **Stat number** -- Large, mono-font, ember-colored:

   ```
   cn(
     'font-mono text-4xl font-bold',
     'text-[var(--color-ember)]',
     'lg:text-5xl',
   )
   ```

2. **Stat label** -- Concise descriptor:

   ```
   cn(
     'mt-2 font-sans text-sm font-medium uppercase',
     'tracking-[var(--tracking-wide)]',
     'text-[var(--color-text-primary)]',
   )
   ```

3. **Description** -- Supporting detail:

   ```
   cn(
     'mt-3 text-sm leading-relaxed',
     'text-[var(--color-text-secondary)]',
   )
   ```

**Card content (from WS-B.1 Section 4.4.1):**

| Card | Stat | Label | Description |
|------|------|-------|-------------|
| A | 18 | "Review dimensions per trip" | "Every trip reviewed by an independent safety analyst across 18 safety dimensions before departure." |
| B | 46 | "Protection endpoints" | "Rally points, safe houses, geofencing, SMS broadcast, and evacuation plans -- active and connected." |
| C | 4 | "Integrated portals" | "Client, Analyst, HQ, and Traveler portals working from one system of record." |

**Future replacement strategy:**

When real testimonials become available (WS-B.1 Q-7), this section's cards will be replaced with a testimonial format:

```
"[Quote]" -- [Name], [Title], [Organization Type]
```

The `GlassCard` wrapper and 3-column grid remain the same. Only the card interior content changes. This is a content update, not a structural change.

---

### 4.7 Bottom CTA Section (`src/components/marketing/landing/bottom-cta-section.tsx`)

**Component type:** Server component wrapping a client island (`BottomCTAButtons`).

**Visual specification:**

| Property | Value | Token / Class |
|----------|-------|---------------|
| Background | Glass panel over void | Full-width `GlassCard` variant with reduced border-radius |
| Card styling | Elevated glass | `bg-white/[0.04] backdrop-blur-[16px] border border-white/[0.08] rounded-2xl` |
| Section padding | `py-24 lg:py-32` with `px-6 lg:px-8` |
| Content alignment | Centered | `text-center` |
| Max text width | 640px | `max-w-[640px] mx-auto` |
| Section element | `<section>` | `<section id="bottom-cta" aria-labelledby="bottom-cta-heading">` |

**Copy (from WS-B.1 Section 4.4.1):**

Line 1 (emotional close):
> "Your travelers trust you to bring them home safely."

Line 2 (system resolution):
> "Safetrekr makes sure that trust is backed by a system -- not just good intentions."

Line 1 uses H2-level styling (visually hidden heading for accessibility). Line 2 uses subheadline styling matching the hero subheadline but at smaller scale.

**Emotional close styling:**

```
cn(
  'font-sans text-2xl font-bold',
  'md:text-3xl',
  'text-[var(--color-text-primary)]',
  'leading-snug',
)
```

**Resolution line styling:**

```
cn(
  'mt-4 text-base leading-relaxed',
  'text-[var(--color-text-secondary)]',
  'max-w-[480px] mx-auto',
)
```

**CTA buttons:** Extracted to a `BottomCTAButtons` client island:

```tsx
<div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
  <BreathingCTA href="/contact" size="lg">
    Schedule a Briefing
  </BreathingCTA>

  <Link
    href="/pricing"
    className={cn(
      /* Ghost button -- same as hero secondary CTA */
    )}
  >
    See Pricing
  </Link>
</div>
```

---

### 4.8 Reusable Glass Card (`src/components/marketing/glass-card.tsx`)

**Component type:** Server component. No animation, no interactivity -- pure styled wrapper.

**Signature:**

```typescript
// src/components/marketing/glass-card.tsx

import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  /** 'default' uses standard glass. 'elevated' adds ember glow shadow. */
  variant?: 'default' | 'elevated'
}

export function GlassCard({
  children,
  className,
  variant = 'default',
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl p-8 lg:p-10',
        // Glass material (from detail-panel.tsx pattern)
        'bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]',
        'border border-white/[0.08]',
        // Variant: elevated adds ember glow
        variant === 'elevated' &&
          'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_0_1px_0_rgba(var(--ember-rgb),0.3),0_0_24px_rgba(var(--ember-rgb),0.1)]',
        className,
      )}
    >
      {children}
    </div>
  )
}
```

**Glass recipe source:** Adapted from `src/components/districts/detail-panel.tsx` lines 91-96. The `bg-white/[0.06]`, `backdrop-blur-[16px]`, `backdrop-saturate-[130%]`, `border border-white/[0.08]` pattern is the established glass-morphism treatment in this codebase.

**`@supports` fallback for backdrop-filter:**

For older browsers that do not support `backdrop-filter`, add a fallback in `src/styles/landing.css`:

```css
@supports not (backdrop-filter: blur(16px)) {
  .glass-card-fallback {
    background: rgba(6, 26, 35, 0.92);  /* --color-void at 92% */
  }
}
```

The `GlassCard` component should include a `glass-card-fallback` class in its class list so the fallback applies automatically.

**Reuse across workstreams:** This component lives in `src/components/marketing/` (not `landing/`) because it will be used by WS-B.3 (How It Works), WS-B.4 (Platform), WS-B.5 (Pricing), WS-B.6 (Security), and WS-B.7 (Solutions) pages.

---

### 4.9 Reusable Breathing CTA (`src/components/marketing/breathing-cta.tsx`)

**Component type:** Client component (`'use client'`).

**Signature:**

```typescript
// src/components/marketing/breathing-cta.tsx
'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface BreathingCTAProps {
  href: string
  children: React.ReactNode
  className?: string
  /** 'md' for inline contexts, 'lg' for hero/standalone contexts */
  size?: 'md' | 'lg'
  /** Optional data attribute for analytics binding (WS-C.3) */
  'data-analytics-id'?: string
}

export function BreathingCTA({
  href,
  children,
  className,
  size = 'md',
  ...rest
}: BreathingCTAProps) {
  return (
    <Link
      href={href}
      className={cn(
        'mkt-cta-breathe',                          // breathing glow animation (marketing.css)
        'inline-flex items-center justify-center',
        'rounded-full font-medium',
        'bg-[var(--color-ember)] text-[var(--color-void)]',
        'hover:bg-[var(--color-ember-bright)]',
        'active:scale-[0.97]',
        'transition-all duration-[var(--duration-hover)]',
        'focus-visible:outline-2 focus-visible:outline-offset-2',
        'focus-visible:outline-[var(--color-ember-bright)]',
        // Size variants
        size === 'md' && 'px-5 py-2 text-sm',
        size === 'lg' && 'px-8 py-3.5 text-base',
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  )
}
```

**Animation dependency:** Requires the `mkt-cta-breathe` class from `src/styles/marketing.css` (delivered by WS-A.1). The keyframe is a 5s `ease-in-out` infinite `box-shadow` oscillation using the safetrekr green `rgba(75, 164, 103, ...)`.

**Reduced motion:** The `mkt-cta-breathe` class includes a `@media (prefers-reduced-motion: reduce)` override in `marketing.css` that disables animation and applies a static glow. No additional reduced-motion handling is needed in this component.

**Reuse across workstreams:** Used on every marketing page that has a "Schedule a Briefing" CTA.

---

### 4.10 Reusable Section Container (`src/components/marketing/section-container.tsx`)

**Component type:** Server component.

**Signature:**

```typescript
// src/components/marketing/section-container.tsx

import { cn } from '@/lib/utils'

interface SectionContainerProps {
  children: React.ReactNode
  className?: string
  /** HTML id for deep linking and aria-labelledby references */
  id?: string
  /** Semantic element: 'section' (default) or 'div' */
  as?: 'section' | 'div'
}

export function SectionContainer({
  children,
  className,
  id,
  as: Element = 'section',
}: SectionContainerProps) {
  return (
    <Element id={id} className={cn('py-24 lg:py-32', className)}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {children}
      </div>
    </Element>
  )
}
```

**Max width:** `max-w-7xl` = 1280px, matching the header's content max-width from WS-A.1 Deliverable 4.3.

**Padding:** `px-6 lg:px-8` matches the header horizontal padding from WS-A.1. Vertical padding `py-24 lg:py-32` provides generous section spacing (96px mobile, 128px desktop).

---

### 4.11 Marketing Particle Field (`src/components/marketing/marketing-particle-field.tsx`)

**Component type:** Client component (`'use client'`).

**Relationship to existing `ParticleField`:** This is a **new, simplified component** adapted from `src/components/ambient/ParticleField.tsx`. The existing `ParticleField` is tightly coupled to the spatial ZUI engine through its dependencies on `useCameraStore` (parallax offset) and `usePanPause` (pause during pan). The marketing version strips these dependencies because marketing pages have no spatial camera or pan interaction.

**Differences from existing `ParticleField`:**

| Aspect | Spatial `ParticleField` | Marketing `MarketingParticleField` |
|--------|------------------------|------------------------------------|
| Particle count | 18 | 12 (fewer for subtle background) |
| Opacity range | 0.015 -- 0.08 | 0.01 -- 0.05 (dimmer) |
| Camera parallax | Yes (`useCameraStore.getState()` per frame) | No (no spatial camera) |
| Pan pause | Yes (`usePanPause()`) | No (no pan interaction) |
| Ember color | Hardcoded `224, 82, 0` (tarva-core orange) | Reads from `--ember-rgb` CSS variable (safetrekr green: `75, 164, 103`) |
| Reduced motion | `useReducedMotion` from `@tarva/ui/motion` | Same -- `useReducedMotion` from `@tarva/ui/motion` |
| Canvas sizing | Matches viewport | Matches parent container |
| Z-index | `z-index: 1` fixed | `z-index: 0` absolute within parent |

**Signature:**

```typescript
// src/components/marketing/marketing-particle-field.tsx
'use client'

import { useCallback, useEffect, useRef } from 'react'
import { useReducedMotion } from '@tarva/ui/motion'

interface MarketingParticleFieldProps {
  /** Number of particles. Default: 12 */
  particleCount?: number
  /** Opacity range [min, max]. Default: [0.01, 0.05] */
  opacityRange?: [number, number]
  /** Additional CSS classes for the canvas container */
  className?: string
}

export function MarketingParticleField({
  particleCount = 12,
  opacityRange = [0.01, 0.05],
  className,
}: MarketingParticleFieldProps) {
  // ...
}
```

**Color resolution:** Instead of hardcoding ember RGB values, the component reads the computed `--ember-rgb` CSS variable at canvas setup time:

```typescript
const computedStyle = getComputedStyle(canvas)
const emberRGB = computedStyle.getPropertyValue('--ember-rgb').trim()
// Parses "75, 164, 103" into [75, 164, 103]
```

This makes the component color-scheme-aware without conditional logic.

**Performance considerations:**

- Canvas size matches container via `getBoundingClientRect()`, respects `devicePixelRatio` for Retina.
- Uses `requestAnimationFrame` loop with proper cleanup on unmount.
- Delta-time capped at 100ms to prevent large jumps after tab suspension.
- On reduced motion: renders a single static frame at midpoint opacity, then stops the rAF loop.
- On `resize`: debounces canvas re-creation with a 200ms timeout.

**Positioning in the hero section:**

```tsx
<section className="relative min-h-[calc(100vh-64px)] overflow-hidden">
  <div className="absolute inset-0 z-0">
    <MarketingParticleField />
  </div>
  <div className="relative z-10">
    {/* Hero content */}
  </div>
</section>
```

---

### 4.12 Landing Page Stylesheet (`src/styles/landing.css`)

**Imported by:** `src/app/(marketing)/landing/page.tsx` (or by the marketing layout if landing-specific styles are needed globally).

**Contents:**

```css
/* =================================================================
   Safetrekr Marketing -- Landing Page Styles
   =================================================================
   Section-specific styles for the landing page.
   General marketing styles (mkt-cta-breathe, header scroll) live
   in src/styles/marketing.css (WS-A.1).
   ================================================================= */

/* -----------------------------------------------------------------
   How It Works: Step connector line
   Uses border-image for gradient fade at endpoints.
   ----------------------------------------------------------------- */
.landing-step-connector {
  border-top: 2px dashed var(--color-ember-muted);
}

.landing-step-connector-vertical {
  border-left: 2px dashed var(--color-ember-muted);
}

/* -----------------------------------------------------------------
   Glass card backdrop-filter fallback
   For browsers that do not support backdrop-filter.
   ----------------------------------------------------------------- */
@supports not (backdrop-filter: blur(16px)) {
  .glass-card-fallback {
    background: rgba(6, 26, 35, 0.92);
  }
}

/* -----------------------------------------------------------------
   Reduced motion: disable any landing-specific animations
   ----------------------------------------------------------------- */
@media (prefers-reduced-motion: reduce) {
  .landing-step-connector,
  .landing-step-connector-vertical {
    border-style: solid;       /* Dashed can cause visual vibration */
  }
}
```

---

### 4.13 Component File Manifest

Complete list of all new files to be created:

| # | File Path | Type | Directive | Reusable? |
|---|-----------|------|-----------|-----------|
| 1 | `src/app/(marketing)/landing/page.tsx` | Server component | -- | No (page-specific) |
| 2 | `src/components/marketing/landing/hero-section.tsx` | Server component | -- | No |
| 3 | `src/components/marketing/landing/hero-cta-group.tsx` | Client component | `'use client'` | No |
| 4 | `src/components/marketing/landing/value-props-section.tsx` | Server component | -- | No |
| 5 | `src/components/marketing/landing/how-it-works-section.tsx` | Server component | -- | No |
| 6 | `src/components/marketing/landing/verticals-section.tsx` | Server component | -- | No |
| 7 | `src/components/marketing/landing/social-proof-section.tsx` | Server component | -- | No |
| 8 | `src/components/marketing/landing/bottom-cta-section.tsx` | Server component | -- | No |
| 9 | `src/components/marketing/landing/bottom-cta-buttons.tsx` | Client component | `'use client'` | No |
| 10 | `src/components/marketing/glass-card.tsx` | Server component | -- | Yes -- all B.x pages |
| 11 | `src/components/marketing/breathing-cta.tsx` | Client component | `'use client'` | Yes -- all B.x pages |
| 12 | `src/components/marketing/section-container.tsx` | Server component | -- | Yes -- all B.x pages |
| 13 | `src/components/marketing/marketing-particle-field.tsx` | Client component | `'use client'` | Yes -- any marketing page needing ambient particles |
| 14 | `src/components/marketing/landing/index.ts` | Barrel export | -- | -- |
| 15 | `src/styles/landing.css` | Stylesheet | -- | No (landing-specific) |

**New directories:**

| Directory | Purpose |
|-----------|---------|
| `src/components/marketing/landing/` | Landing page section components |

**Modified files:**

| File | Change |
|------|--------|
| `src/app/(marketing)/landing/page.tsx` | Replace WS-A.1 placeholder with full landing page |

**Total new files: 15** (14 new + 1 replacement of existing placeholder)

---

## 5. Acceptance Criteria

| ID | Criterion | Verification Method |
|----|-----------|---------------------|
| AC-1 | `/landing` renders inside the marketing layout (header above, footer below) with all six content sections visible in scroll order: hero, value props, how-it-works, verticals, social proof, bottom CTA | Manual: navigate to `/landing` in dev server; scroll through entire page |
| AC-2 | Hero section occupies full viewport height minus header (`min-h-[calc(100vh-64px)]`) with H1 "Every traveler accounted for." visible and centered | Manual: verify in browser at 1280px and 375px widths |
| AC-3 | `MarketingParticleField` renders drifting particles behind the hero content at low opacity; particles respond to the safetrekr green color scheme (not tarva-core orange) | Manual: visually confirm particle color is green `#4ba467` not orange `#e05200` |
| AC-4 | Primary CTA "Schedule a Briefing" renders with breathing glow animation (`mkt-cta-breathe` class active) and navigates to `/contact` on click | Manual: inspect element for class; click and verify navigation |
| AC-5 | Secondary CTA "Explore the Platform" renders as a ghost button and navigates to `/launch` on click | Manual: click and verify navigation |
| AC-6 | Three value proposition cards render in a 3-column grid on desktop (>= 768px) and single-column stack on mobile (< 768px) | Manual: resize browser; verify grid collapse |
| AC-7 | Each value prop card uses the glass-morphism surface treatment: `bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%] border border-white/[0.08]` | DevTools: inspect computed styles on card elements |
| AC-8 | How It Works section renders 4 steps with numbered circles, connecting dashed line, step names (Plan, Review, Protect, Monitor), and descriptions | Manual: visually verify section layout |
| AC-9 | How It Works steps render in 4-column horizontal layout on desktop (>= 768px) and vertical stack with left-side connector on mobile (< 768px) | Manual: resize and verify layout change |
| AC-10 | "See how it works" link in the How It Works section navigates to `/how-it-works` | Manual: click and verify navigation |
| AC-11 | Five vertical callout cards render with correct vertical names, descriptions, and "Learn more" links pointing to `/solutions` | Manual: verify card content and link targets |
| AC-12 | Social proof section renders 3 capability-proof cards with stat numbers (18, 46, 4), labels, and descriptions | Manual: verify card content matches WS-B.1 spec |
| AC-13 | Bottom CTA section renders emotional close copy with "Schedule a Briefing" (breathing glow) and "See Pricing" (ghost) buttons | Manual: verify copy, button styling, and navigation targets (`/contact`, `/pricing`) |
| AC-14 | Page exports correct SEO `metadata`: title contains "Safetrekr -- Trip Safety Management", description contains "Every traveler accounted for" | DevTools: inspect `<title>` and `<meta name="description">` in rendered HTML |
| AC-15 | Only one `<h1>` element exists on the page ("Every traveler accounted for."). All other section headings are `<h2>`. Step names within How It Works are `<h3>`. | DevTools: query `document.querySelectorAll('h1')` returns 1 element; verify heading hierarchy |
| AC-16 | All interactive elements (CTAs, links) have visible focus indicators: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]` | Manual: Tab through all interactive elements; verify focus rings |
| AC-17 | Each section uses `<section>` element with `id` and `aria-labelledby` referencing its heading | DevTools: inspect section elements for ARIA attributes |
| AC-18 | `MarketingParticleField` renders a single static frame and stops animation when `prefers-reduced-motion: reduce` is active | Manual: enable reduced motion in OS; confirm particles are static |
| AC-19 | Breathing glow animation on CTAs stops and shows static glow when `prefers-reduced-motion: reduce` is active | Manual: enable reduced motion; confirm CTA has static box-shadow, no animation |
| AC-20 | Page renders as a server component (no `'use client'` on `page.tsx`). Client islands are limited to: `HeroCTAGroup`, `BottomCTAButtons`, `MarketingParticleField`, `BreathingCTA` | Code review: verify directive presence/absence |
| AC-21 | No `import` from `'framer-motion'` anywhere in new files -- only `'motion/react'` | Code review: `grep -r "framer-motion" src/components/marketing/` returns 0 results |
| AC-22 | All new components use only spatial token CSS variables or Tailwind utilities mapped to those tokens -- no hardcoded hex colors in component files | Code review: grep for `#[0-9a-fA-F]` in component `.tsx` files (only `landing.css` and `marketing-particle-field.tsx` may contain raw color values for canvas rendering and `@supports` fallback) |
| AC-23 | `pnpm typecheck` passes with zero errors after all files are created | CLI: `pnpm typecheck` |
| AC-24 | `pnpm lint` passes with zero errors after all files are created | CLI: `pnpm lint` |
| AC-25 | `pnpm build` completes successfully | CLI: `pnpm build` |
| AC-26 | Glass cards display a reasonable fallback (solid dark background) on browsers without `backdrop-filter` support | Code review: verify `@supports not (backdrop-filter: blur(16px))` rule in `landing.css`; optional manual test in Safari private browsing with forced fallback |
| AC-27 | The page has a `data-analytics-id` attribute on both "Schedule a Briefing" CTA instances for future analytics binding (WS-C.3) | DevTools: verify `data-analytics-id="landing-hero-cta"` and `data-analytics-id="landing-bottom-cta"` |

---

## 6. Decisions Made

| # | Decision | Rationale | Alternatives Considered |
|---|----------|-----------|------------------------|
| D-1 | Server component page with client islands for animation only | Maximizes SEO crawlability. Search engines get full HTML without JavaScript execution. Only 3 client components (CTA groups + particle field) need hydration. | Entire page as client component (worse SEO, larger bundle); RSC with `use client` at section level (more hydration than needed) |
| D-2 | New `MarketingParticleField` instead of refactoring existing spatial `ParticleField` | The existing `ParticleField` is tightly coupled to the spatial ZUI via `useCameraStore` and `usePanPause`. Refactoring it to accept optional dependencies would introduce conditional logic in a performance-critical rAF loop and risk regressions in the spatial experience. A separate component avoids touching the spatial engine. | Refactor existing with optional deps (coupling risk, regression risk); Remove particle background entirely (loses ambient depth) |
| D-3 | Reusable `GlassCard`, `BreathingCTA`, and `SectionContainer` in `src/components/marketing/` | These patterns repeat across all 7+ marketing pages. Extracting them now prevents copy-paste drift and ensures visual consistency. Living in `marketing/` (not `landing/`) signals cross-page reuse. | Inline styles per page (drift risk, no consistency); Single uber-component with mode props (over-abstraction) |
| D-4 | `MarketingParticleField` reads `--ember-rgb` from computed CSS instead of hardcoding color values | Makes the component color-scheme-aware automatically. If the `data-color-scheme` attribute changes (e.g., tarva-core orange vs safetrekr green), particles update without code changes. | Hardcode safetrekr green (breaks if color scheme changes); Accept color as prop (extra coupling between parent and child) |
| D-5 | No scroll-triggered entrance animations at launch | Keeps the page maximally server-rendered with minimal JavaScript. Entrance animations require `IntersectionObserver` client wrappers on every section, increasing hydration surface. Can be added as a post-launch polish pass without structural changes. | Animate on scroll with `motion/react` (more JS, more client components, polish is not launch-critical) |
| D-6 | Value proposition card headings are H2, not H3 | Each value proposition is a top-level concept at the same document outline depth as section headings. Using H3 would imply they are subordinate to a parent H2 -- but the section has no visible heading. A `sr-only` parent H2 is added for accessibility, but the card headings themselves are H2 to maintain a flat, scannable outline. | H3 under visible section heading (requires inventing a visible heading that WS-B.1 does not specify) |
| D-7 | Step connector lines use CSS borders (not SVG paths) | Simpler to implement, maintain, and make responsive. CSS dashed borders are well-supported, lightweight, and require no SVG viewBox calculations. The visual effect (dashed line between step circles) does not require SVG precision. | SVG connecting paths (over-engineering for dashed lines); No connectors (loses visual flow between steps) |
| D-8 | Each section gets an `id` attribute for deep linking | Allows direct linking to sections (e.g., `/landing#how-it-works`) from other pages, the gateway, or external sources. Also enables `aria-labelledby` references for accessibility. IDs follow the pattern: `hero`, `value-props`, `how-it-works`, `verticals`, `social-proof`, `bottom-cta`. | No IDs (no deep linking capability); Random IDs (not human-readable) |
| D-9 | Vertical callout cards link to `/solutions` (overview), not to individual vertical sub-pages | Individual vertical pages (`/solutions/k12`, etc.) are WS-D.1 scope and do not exist yet. Linking to `/solutions` now is correct for launch. When WS-D.1 delivers sub-pages, each card's `href` is updated to the specific vertical URL -- a one-line change per card. | Link to `#` (broken link UX); Link to non-existent pages (404 risk) |
| D-10 | `data-analytics-id` attributes on CTAs instead of event handlers | Analytics instrumentation is WS-C.3 scope. Adding data attributes now gives WS-C.3 stable selectors to bind events to without modifying landing page components later. No runtime cost -- attributes are inert until WS-C.3 adds listeners. | Inline analytics calls (premature, creates WS-C.3 dependency); No attributes (WS-C.3 has to grep for elements by class/text, fragile) |

---

## 7. Open Questions

| # | Question | Impact | Owner | Blocking? |
|---|----------|--------|-------|-----------|
| Q-1 | Should the hero section include a subtle ambient effect beyond the particle field (e.g., a radial gradient vignette behind the text, or a faint grid pulse)? | Visual polish. Low structural impact -- any ambient effect would be an additional absolutely-positioned layer in the hero section. | Design / Product Owner | No -- can be added later without structural changes |
| Q-2 | Should the "Explore the Platform" secondary CTA open `/launch` in the same tab or a new tab? The spatial ZUI is a different experience paradigm. Opening in a new tab preserves the landing page scroll position but adds complexity for users. | UX decision. Code change is trivial (`target="_blank"` + `rel="noopener noreferrer"` if new tab). | Product Owner | No -- default to same tab; can be changed with one attribute |
| Q-3 | Should vertical callout cards include an icon or illustration for each vertical (e.g., a school building icon for K-12, a church icon for Churches)? WS-B.1 does not specify icons. | Visual differentiation. If yes, need to source or create 5 icons. Lucide has `School`, `GraduationCap`, `Church`, `Trophy`, `Building2` that could work. | Design / Product Owner | No -- cards work without icons; icons can be added later |
| Q-4 | When the social proof section transitions from capability-proof cards to real testimonials, should the section layout change (e.g., carousel instead of 3 cards)? | Architecture impact is low -- the `GlassCard` grid stays the same for 3 testimonials. A carousel would be a different component. | Product Owner | No -- cross that bridge when testimonials exist |
| Q-5 | Should the bottom CTA bar have any visual differentiation from the surrounding sections (e.g., a full-bleed glass panel that breaks out of the `max-w-7xl` container)? | Visual emphasis. If full-bleed, the `SectionContainer` wrapper is replaced with a custom full-width treatment. | Design / Product Owner | No -- can adjust after initial implementation |
| Q-6 | Should mobile visitors see the particle field? Canvas-based animation can impact battery life and performance on lower-end mobile devices. | Performance on mobile. Options: (a) always show, (b) hide below a breakpoint via `hidden md:block` on the canvas container, (c) reduce particle count on mobile via a media query check in JS. | Engineering / Product Owner | No -- default to always show; can add breakpoint hide if performance data warrants it |
| Q-7 | Does the page need structured data (JSON-LD) for Organization or Product schema? | SEO enhancement. WS-A.3 handles SEO infrastructure, but page-specific JSON-LD would be exported from this page component. | SEO / WS-A.3 owner | No -- deferred to WS-A.3 |

---

## 8. Risk Register

| # | Risk | Likelihood | Impact | Mitigation | Owner |
|---|------|------------|--------|------------|-------|
| R-1 | **WS-A.1 layout not ready** when landing page development begins. Page cannot be tested in context (no header, no footer, no `mkt-cta-breathe` keyframe). | Medium | Medium | Develop page in isolation. Import `marketing.css` directly in the page file during development, then remove the import when WS-A.1 layout imports it globally. Create a temporary `_dev-layout.tsx` wrapper in the landing directory if needed for visual testing. | Engineering |
| R-2 | **WS-B.1 copy changes** after implementation begins. Late copy revisions require content updates across 6 sections. | Medium | Low | Architecture is decoupled from content. Copy lives as hardcoded strings in each section component. Changes are text-only edits, not structural. Establish a copy freeze date with the WS-B.1 owner before implementation begins. | Product Owner / WS-B.1 Owner |
| R-3 | **Glass-morphism performance on older or low-end devices**. Multiple `backdrop-filter: blur()` elements on a single page can cause GPU strain, especially on mobile. | Medium | Medium | (1) `GlassCard` includes a `@supports not (backdrop-filter)` fallback with a solid dark background. (2) Limit total number of simultaneously-visible glass cards -- the vertical scroll layout naturally means only 2-3 cards are in the viewport at once. (3) If performance profiling reveals issues, add `content-visibility: auto` on sections below the fold to defer paint work. | Engineering |
| R-4 | **MarketingParticleField performance on mobile.** Canvas animation may drain battery on mobile devices with limited GPU resources. | Low | Medium | (1) Default particle count is 12 (lower than spatial's 18). (2) Opacity range is dimmer (0.01-0.05 vs 0.015-0.08). (3) Reduced motion is fully respected. (4) If mobile performance data warrants it, hide the canvas below `md` breakpoint with `className="hidden md:block"` -- no structural change needed. | Engineering |
| R-5 | **CTA destination pages not ready.** "Schedule a Briefing" links to `/contact` (WS-A.4) and "See Pricing" links to `/pricing` (WS-B.5). If those workstreams are delayed, CTAs navigate to placeholder pages. | Medium | Low | WS-A.1 creates placeholder pages for all marketing routes. Users will see a styled "Content pending" placeholder -- not a 404. Acceptable for development; must be resolved before production launch. | Engineering / WS-A.4 / WS-B.5 Owners |
| R-6 | **Heading hierarchy conflicts with marketing layout.** If the marketing header or footer includes heading elements, the H1/H2 hierarchy on the landing page could be disrupted. | Low | Low | WS-A.1 spec does not include heading elements in the header or footer (navigation uses `<nav>`, not headings). Verify heading hierarchy with `document.querySelectorAll('h1, h2, h3')` after both workstreams are integrated. | Engineering |
| R-7 | **Color variable resolution in MarketingParticleField.** Reading `--ember-rgb` from `getComputedStyle` may fail if the canvas renders before CSS is applied, or if the variable name changes. | Low | Low | Read the CSS variable once during canvas setup (inside `useEffect`), not in the animation loop. Fall back to hardcoded safetrekr green `75, 164, 103` if the computed value is empty. Add a comment noting the variable dependency. | Engineering |
| R-8 | **Vertical card count changes.** If a vertical is added or removed (e.g., "Nonprofit" added, "Business" removed), the grid layout must accommodate 4 or 6 cards instead of 5. | Low | Low | The CSS grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`) handles any number of items gracefully. The centered partial-row treatment (Deliverable 4.5) uses flexbox, which also adapts to any count. No code changes needed for the grid -- only content additions/removals. | Product Owner |
