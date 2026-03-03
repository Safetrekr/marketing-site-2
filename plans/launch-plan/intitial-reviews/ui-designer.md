# Safetrekr Marketing Site -- UI Design Review

**Reviewer:** World-Class UI Designer
**Date:** 2026-03-02
**Scope:** Launch page strategy, visual identity, component design, typography, color, layout
**Audience:** Security directors, safety officers, risk managers, administrators

---

## Table of Contents

1. [Visual Identity Assessment](#1-visual-identity-assessment)
2. [Card Design for Launch Page](#2-card-design-for-launch-page)
3. [Typography System](#3-typography-system)
4. [Color Strategy](#4-color-strategy)
5. [Component Library for Content Pages](#5-component-library-for-content-pages)
6. [Iconography](#6-iconography)
7. [Responsive Layout Strategy](#7-responsive-layout-strategy)
8. [Recommended Card and Page Structure](#8-recommended-card-and-page-structure)

---

## 1. Visual Identity Assessment

### The Core Question: Is "Mission Control" Right for Safety Professionals?

**Yes -- but the current execution needs recalibration.**

The "mission control" aesthetic is one of the strongest brand differentiators Safetrekr could deploy. Every competitor in the trip safety space uses the same template: stock photos of smiling students on buses, rounded corners, pastel gradients, and a sans-serif font called something like "Circular" or "Graphik." Safetrekr's dark command-center identity says something fundamentally different: *we take this as seriously as you do.*

Security directors and risk managers live in a world of checklists, audit trails, compliance matrices, and incident response plans. A UI that evokes operational discipline -- not vacation brochures -- speaks their language. The dark background, green accent, glass-morphism, and breathing animations create an environment that feels *secure*, *monitored*, and *alive.* That is exactly the right emotional register for selling a safety platform.

### What Needs to Change

The current implementation overshoots in three specific ways that undermine the authority it is trying to build.

**Problem 1: Fake Telemetry Destroys Trust**

The gateway header displays cycling radio frequencies (11.434 GHz), hex trace IDs (7F2A.B91C), epoch counters, and "uplink" signal strength bars. The edge panels show heartbeat traces, route path animations, and chrono ring fills. None of this data is real. It is theater.

A security director will see this in one of two ways: either they will recognize it as decorative fiction and wonder why a safety company is faking data, or they will take it at face value and be confused about what a radio frequency has to do with their school trip to Washington, D.C. Neither reaction builds trust.

**Recommendation:** Replace all fake telemetry with real or meaningful content. The header bar should show actual marketing navigation. The edge panels should show actual value propositions, trust indicators (number of trips managed, travelers protected, organizations served), or testimonial fragments. If you want the "living data" aesthetic, show real metrics -- even if they are aggregate or anonymized platform statistics.

**Problem 2: Extreme Subtlety Reads as Broken**

The current color opacity strategy is extraordinarily conservative. CTA buttons use `rgba(ink, 0.03)` backgrounds with `rgba(ink, 0.08)` borders. Secondary CTAs are at `rgba(ink, 0.02)`. Text appears at 12-20% opacity. On many displays -- especially the large external monitors safety directors use, or the fluorescent-lit office environments where purchasing decisions happen -- these elements will be barely visible or completely invisible.

This is not restraint. This is invisibility. A 50-year-old risk manager reviewing this site on a Dell monitor in a bright office will not see half the interface.

**Recommendation:** Raise the floor on all opacity values significantly. The glass-morphism aesthetic can survive at `rgba(ink, 0.06)` rest / `rgba(ink, 0.12)` hover for backgrounds, and `rgba(ink, 0.15)` rest / `rgba(ink, 0.25)` hover for borders. Text should never be below 40% opacity for any element the user is intended to read. Primary text should be 85-100% opacity. Labels should be 50-65% opacity. Ambient decorative text (if any) can be 25-35% opacity.

**Problem 3: Monospace Everything Is a Readability Tax**

Every text element in the current gateway uses monospace font at 8-11px, uppercase, with wide letter-spacing. This is the single largest barrier to conversion on the current site. Monospace is harder to scan than proportional text. Uppercase is harder to read than sentence case. Wide letter-spacing at small sizes creates word-spacing ambiguity. Combined, they create an interface that requires effort to parse.

Safety professionals are busy. They are evaluating your product alongside three competitors. If your headlines take even 500ms longer to read, you lose.

**Recommendation:** See the Typography section below. The short answer is: sans-serif for communication, monospace only for operational flavor accents.

### What to Keep

- **Dark background:** Keep. It creates the "entering a secure environment" feeling. It also differentiates instantly from every competitor.
- **Green primary accent (#4BA467):** Keep. Green means safe, operational, "go." Perfect for a safety product. It avoids the overused blue and the alarming red.
- **Glass-morphism effects:** Keep, but increase opacity. The frosted-glass cards are sophisticated and timeless when they are actually visible.
- **Breathing glow animations:** Keep on the primary CTA only. Remove from everything else. One breathing element creates a focal point. Eight breathing elements create a seizure risk.
- **The shield logo with typewriter tagline:** Keep. "Every traveler accounted for" is a strong tagline and the typewriter reveal is an earned moment of delight on the landing page.

### Summary Verdict

The identity is 70% correct. The emotional register (operational, secure, alive) is right. The execution needs to shift from "sci-fi movie prop" to "real operations center" by (a) eliminating fake data, (b) increasing contrast and visibility, and (c) using professional typography for communication while keeping monospace as an accent.

---

## 2. Card Design for Launch Page

### Design Philosophy

The current spatial ZUI uses capsule cards (192x228px) arranged in a ring with range rings, connection paths, and coordinate overlays. This is a stunning demo of the ZUI engine. It is not a marketing layout.

Marketing cards need to accomplish three things in under 2 seconds:

1. **Identification:** "What is this card about?" (icon + title)
2. **Value signal:** "Why should I click?" (subtitle or one-line description)
3. **Action affordance:** "I can click this." (hover state, arrow, visual weight)

### Card Anatomy

```
+----------------------------------------------------------+
|                                                          |
|   [40px icon]                                            |
|                                                          |
|   CARD TITLE                           18px semibold     |
|   One line of supporting text          14px regular      |
|   that explains the value.             50% opacity       |
|                                                          |
|                                        [arrow -->]       |
+----------------------------------------------------------+
```

### Dimensions and Layout

- **Card width:** Fluid within a CSS Grid column. Minimum 320px, maximum 480px.
- **Card height:** Auto, driven by content. Minimum effective height approximately 180px with padding.
- **Padding:** 32px all sides (following the 8-point grid).
- **Border radius:** 16px. This is softer than the current capsule radius (28px) but still feels modern. 28px on a rectangular card will look overly rounded.
- **Background:** `rgba(var(--ambient-ink-rgb), 0.04)` at rest. This is transparent enough for the dark background to show through but visible enough to define the card boundary.
- **Border:** `1px solid rgba(var(--ambient-ink-rgb), 0.08)` at rest.
- **Backdrop filter:** `blur(12px)` to maintain the glass-morphism language.

### Hover State

The hover state should feel like the card is "activating" -- a subtle power-on effect.

```
Rest  -->  Hover
-------    -------
bg: 0.04   bg: 0.08
border: 0.08   border: 0.15
no glow    box-shadow: 0 0 32px rgba(75, 164, 103, 0.10),
                       0 0 8px rgba(75, 164, 103, 0.15)
scale: 1   scale: 1 (no scale change -- scale transforms are playful, not professional)
arrow: 50% opacity   arrow: 80% opacity, translateX(4px)
icon: 40% opacity    icon: 70% opacity, color shifts to --color-ember-bright
```

The icon color shift on hover creates a "lighting up" effect that echoes the mission-control language without any animation.

### Active/Pressed State

```
bg: 0.10
border: 0.18
scale: 0.99 (very subtle inward press)
```

### Focus State

```
outline: 2px solid rgba(75, 164, 103, 0.40)
outline-offset: 4px
```

This matches the existing `focus-visible` pattern in the GatewayCTA component.

### Card Variants

**Standard Card (for primary navigation):**
Full-width within grid column. Contains icon, title, description, and arrow. This is the default.

**Featured Card (for hero placement):**
Spans 2 columns on desktop. Taller card with room for a brief content preview or animated illustration. Use for "How It Works" or "Platform" -- whichever is the primary marketing message.

**Compact Card (for secondary items):**
Smaller padding (24px), no description line, icon and title only. Use for items like "About" or "Blog" if they appear in the launch grid at all.

### ASCII Mockup: Desktop Grid Layout

```
+-----------------------------------------------------+
|                                                     |
|  SAFETREKR                           [Nav links]    |
|  Every traveler accounted for.                      |
|                                                     |
+-----------------------------------------------------+

   +---------------------------+  +---------------------------+
   |                           |  |                           |
   |  [shield icon]            |  |  [route icon]             |
   |                           |  |                           |
   |  How It Works             |  |  Platform                 |
   |  See the 4-step process   |  |  Explore the product      |
   |  from plan to protect.    |  |  across all four portals. |
   |                     -->   |  |                     -->   |
   +---------------------------+  +---------------------------+

   +---------------------------+  +---------------------------+
   |                           |  |                           |
   |  [building icon]          |  |  [lock icon]              |
   |                           |  |                           |
   |  Solutions                |  |  Security & Compliance    |
   |  For schools, churches,   |  |  SOC 2, encryption, RLS,  |
   |  sports, and business.    |  |  and audit trails.        |
   |                     -->   |  |                     -->   |
   +---------------------------+  +---------------------------+

   +---------------------------+  +---------------------------+
   |                           |  |                           |
   |  [layers icon]            |  |  [dollar icon]            |
   |                           |  |                           |
   |  Pricing                  |  |  About Safetrekr          |
   |  Transparent per-trip     |  |  Our mission and the      |
   |  pricing. No seat fees.   |  |  team behind the shield.  |
   |                     -->   |  |                     -->   |
   +---------------------------+  +---------------------------+
```

### Card Interaction Timing

All transitions should use `200ms` duration with `cubic-bezier(0.4, 0, 0.2, 1)` easing (the existing `--ease-default`). No stagger on hover -- stagger is for entrance animations only. Cards should feel instantly responsive on hover.

### Card Entrance Animation

When the launch page loads (or the user navigates from the landing page), cards should stagger in from below:

- **Delay:** 80ms between each card
- **Duration:** 400ms per card
- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` (the existing `--ease-morph`)
- **Transform:** `opacity: 0, y: 24px` to `opacity: 1, y: 0`

This is fast enough to feel snappy but slow enough for the eye to track the sequence. Six cards at 80ms stagger means the last card appears at 400ms + 400ms = 800ms total. Under one second. Good.

---

## 3. Typography System

### The Problem with Monospace Everywhere

The current implementation uses monospace (`Geist Mono` / `JetBrains Mono`) for all text, including headlines, body copy, CTAs, descriptions, and navigation labels. Font sizes range from 7px to 11px with aggressive letter-spacing (0.08em-0.12em) and universal uppercase.

This creates three measurable problems:

1. **Reduced reading speed.** Monospaced typefaces are approximately 10-15% slower to read than proportional typefaces at the same size, because the fixed character width disrupts the natural rhythm of word shapes.
2. **Reduced scannability.** Uppercase text removes ascender/descender variation, which the human eye uses to recognize word shapes. Combined with wide letter-spacing, every word becomes a uniform rectangle.
3. **Accessibility failure.** 7-9px text is below WCAG 2.2 minimum recommendations. Even at 11px, monospace uppercase with 0.12em tracking is functionally equivalent to approximately 9px of readable text.

### Recommended Type System

**Font Stack:**

| Role | Font | Fallback |
|------|------|----------|
| Headlines | Geist Sans | Inter, -apple-system, sans-serif |
| Body | Geist Sans | Inter, -apple-system, sans-serif |
| UI labels | Geist Sans | Inter, -apple-system, sans-serif |
| Data/status accents | Geist Mono | JetBrains Mono, SF Mono, monospace |

Geist Sans is already defined in the token system (`--font-sans`) but never used in the gateway. It is an excellent choice for a technical product: geometric enough to feel precise, humanist enough to feel approachable.

**Type Scale (Major Second -- 1.125 ratio):**

| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| Display | 48px | 600 (semibold) | 1.1 | Hero headline only |
| H1 | 36px | 600 | 1.2 | Page titles |
| H2 | 28px | 600 | 1.25 | Section headings |
| H3 | 22px | 600 | 1.3 | Card titles, subheadings |
| H4 | 18px | 600 | 1.35 | Card titles (compact) |
| Body Large | 18px | 400 | 1.6 | Hero descriptions, lead text |
| Body | 16px | 400 | 1.6 | Standard body text |
| Body Small | 14px | 400 | 1.5 | Card descriptions, secondary text |
| Caption | 12px | 500 | 1.4 | Labels, metadata |
| Micro | 10px | 500 | 1.3 | Monospace accents, status labels |

**Weight Usage:**

- `400` (Regular): Body text, descriptions.
- `500` (Medium): Labels, captions, navigation items, monospace accents.
- `600` (Semibold): All headings. Semibold is stronger than medium but lighter than bold, which avoids the heavy-handed feel of 700-weight headlines.

**Case Rules:**

| Element | Case | Letter-spacing |
|---------|------|----------------|
| Display/H1/H2 | Sentence case | -0.02em (tight) |
| H3/H4 | Sentence case | 0em (normal) |
| Body text | Sentence case | 0em |
| Navigation links | Sentence case | 0em |
| CTA buttons | Sentence case | 0.01em |
| Monospace labels | Uppercase | 0.06em |
| Status badges | Uppercase | 0.04em |

The only elements that should be uppercase are the monospace accent labels. Headlines, navigation, CTAs, and body text should all be sentence case. This is the single change that will have the largest impact on readability and professionalism.

### Where Monospace Adds Value

Monospace should be used sparingly and intentionally in these specific contexts:

- **Status indicators:** "OPERATIONAL" / "4 PORTALS" / "46 ENDPOINTS"
- **Version/protocol labels:** "SECURITY PROTOCOL v2.1"
- **Data points in cards:** "T1 / T2 / T3" trip tier labels
- **Badge text:** "SOC 2" / "256-BIT" / "HIPAA"
- **Small decorative accents:** The "SAFETREKR // MISSION CONTROL" header line

This creates a dual-register typography system where the professional sans-serif handles communication and the monospace handles operational flavor. The monospace elements function as visual "equipment labels" -- the stenciled text you see on actual military or operations equipment. They add authenticity without taxing readability.

### CTA Typography

Current CTA: `font-mono text-[11px] font-semibold uppercase tracking-[0.08em]`

Recommended CTA: `font-sans text-[15px] font-semibold tracking-[0.01em]` with sentence case.

The CTA text is the single most important piece of text on the page. Making it larger, proportional, and sentence case will measurably improve click-through rate. The button itself (pill shape, glass background, breathing glow) already communicates "mission control." The text inside does not need to reinforce it with monospace.

---

## 4. Color Strategy

### Current Palette Assessment

The current Safetrekr palette is well-structured:

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-void` | `#061A23` | Deepest background |
| `--color-abyss` | `#08202B` | Layer 1 background |
| `--color-deep` | `#0A2733` | Card/panel background |
| `--color-surface` | `#123646` | Elevated surfaces |
| `--color-raised` | `#2A4A59` | Raised elements |
| `--color-overlay` | `#365462` | Overlays, borders |
| `--color-ember` (primary) | `#4BA467` | Green accent |
| `--color-teal` (secondary) | `#365462` | Teal-slate accent |

**Verdict:** This palette is good. The green-over-dark-teal combination is distinctive, professional, and appropriate for a safety brand. It avoids the cliches of "corporate blue" and "startup purple." Do not change the brand colors.

### Dark vs. Light for Marketing

**The landing page (/) and launch page (/launch) should remain dark.** The dark environment creates the "entering a secure facility" moment. It differentiates Safetrekr from every competitor. And it makes the green glow effects visually powerful.

**Content pages should use a hybrid approach: dark header/footer with a softened content area.**

For long-form content (feature descriptions, comparison tables, pricing details), reading 2000+ words on `#061A23` is visually fatiguing. The solution is not to switch to a white background (which would destroy brand continuity) but to raise the content area background:

```
Page chrome (header, footer, sidebar): --color-void (#061A23)
Content area background:               --color-deep (#0A2733)
Card/panel backgrounds:                 --color-surface (#123646)
```

This creates a subtle depth layering where the content area is slightly lighter than the frame around it, improving readability without breaking the dark aesthetic.

Text contrast on `#0A2733`:
- Primary text `#E8F0F4` against `#0A2733` = contrast ratio 12.1:1 (passes AAA)
- Secondary text `#929899` against `#0A2733` = contrast ratio 5.6:1 (passes AA)
- Tertiary text `#5A7A88` against `#0A2733` = contrast ratio 3.1:1 (passes AA for large text only)

For body copy, use primary or secondary text colors only. Tertiary should be reserved for decorative or non-essential labels.

### Vertical Color Coding

Color-coding verticals is a valid strategy but must be executed with restraint. Each vertical gets an accent color that appears as a thin left-edge stripe on cards, an icon tint, or a tab indicator. The primary green (#4BA467) always dominates the UI. Vertical colors are signals, not themes.

| Vertical | Accent | Hex | Rationale |
|----------|--------|-----|-----------|
| K-12 Schools | Academic Blue | `#3B82F6` | Institutional, educational |
| Higher Education | Scholarly Purple | `#8B5CF6` | Distinct from K-12, academic gravitas |
| Churches & Faith | Warm Gold | `#F59E0B` | Traditional, dignified |
| Youth Sports | Active Coral | `#EF4444` | Energetic, athletic |
| Business & Corporate | Professional Slate | `#94A3B8` | Neutral, corporate |

**Usage rules:**
- Vertical accent colors appear ONLY in the Solutions section and vertical-specific pages.
- The accent appears as a 3px left border on solution cards, a tint on the vertical icon, and as a subtle background wash at approximately 5% opacity behind the vertical hero section.
- Vertical accent colors never replace the primary green for CTAs, links, or status indicators.
- On the launch page, all cards use the primary green. No vertical coding at the top-level navigation.

### Color for Interactive States

| State | Background | Border | Text |
|-------|-----------|--------|------|
| Rest | `rgba(ink, 0.04)` | `rgba(ink, 0.08)` | `--color-text-secondary` (title), `--color-text-tertiary` (desc) |
| Hover | `rgba(ink, 0.08)` | `rgba(ink, 0.15)` | `--color-text-primary` (title), `--color-text-secondary` (desc) |
| Active | `rgba(ink, 0.10)` | `rgba(ink, 0.18)` | Same as hover |
| Focus | `rgba(ink, 0.08)` | `2px outline --color-ember at 40%` | Same as hover |
| Disabled | `rgba(ink, 0.02)` | `rgba(ink, 0.04)` | `--color-text-ghost` |

---

## 5. Component Library for Content Pages

Content pages (How It Works, Solutions, Pricing, Security, Platform, About) each need a specific set of components. Below is the design pattern for each.

### 5.1 Hero Section

Every content page opens with a hero section that establishes context.

```
+------------------------------------------------------------------+
|                                                                  |
|  [Monospace badge: "HOW IT WORKS"]        <-- 10px, uppercase,   |
|                                               40% opacity        |
|  Plan, Review, Protect, Travel.           <-- 36px, semibold,    |
|                                               sentence case      |
|  Safetrekr walks your organization        <-- 18px, regular,     |
|  through four phases of trip safety           60% opacity,       |
|  management.                                  max-width: 640px   |
|                                                                  |
|  [Primary CTA button]  [Secondary link]                          |
|                                                                  |
+------------------------------------------------------------------+
```

- **Background:** `--color-void` with a subtle radial gradient centered below the text, creating a dim green glow (matching the breathing glow language but static).
- **Monospace badge:** This is where the monospace-uppercase treatment is appropriate. Small, labeled, decorative. It says "you are now in the HOW IT WORKS section" like a room label in a building.
- **Headline:** Sans-serif, 36px, semibold. The largest text on the page. Sentence case.
- **Description:** Sans-serif, 18px, regular, 60% opacity. Two to three lines maximum. Constrained to 640px width for optimal line length (65-75 characters).
- **CTA:** Primary (green glow button) and secondary (text link with arrow).

### 5.2 Feature Grid

For displaying platform capabilities (used on Platform, How It Works pages).

```
   [icon]              [icon]              [icon]
   Feature Title       Feature Title       Feature Title
   Two lines of        Two lines of        Two lines of
   description.        description.        description.
```

- **Layout:** 3 columns on desktop, 2 on tablet, 1 on mobile.
- **Icon:** 32px, line-stroke style, `--color-ember` at 50% opacity, rising to 70% on parent card hover.
- **Title:** 18px, semibold, sans-serif.
- **Description:** 14px, regular, 50% opacity.
- **Spacing:** 24px gap between columns, 48px gap between rows.
- **No card background.** Feature grids are open layouts, not boxed cards. This prevents visual competition with the navigation cards on the launch page.

### 5.3 Step-by-Step Flow (for "How It Works")

A horizontal timeline or numbered sequence showing the Safetrekr workflow.

```
  (1)----------(2)----------(3)----------(4)
  Plan          Review       Protect      Travel

  Create trip   Safety       Emergency    Live safety
  with the      analyst      prep and     checklists
  10-step       reviews      intel        and alerts
  wizard.       every trip.  monitoring.  on the app.
```

- **Layout:** Horizontal on desktop with connecting line. Vertical stack on mobile.
- **Number circles:** 40px diameter, `--color-ember` border at 30%, number in `--color-ember` at 80%. Active/hover: fill to `--color-ember` at 15% with brighter border.
- **Connecting line:** 1px, `rgba(ink, 0.08)`. Dashed pattern. This echoes the range-ring language from the ZUI without the full sci-fi treatment.
- **Step title:** 16px, semibold.
- **Step description:** 14px, regular, 50% opacity. Three lines maximum.

### 5.4 Comparison Table

For feature comparison across tiers or competitors.

- **Structure:** Standard `<table>` with `<thead>` and `<tbody>`.
- **Header row:** `--color-surface` background. Monospace labels for tier names ("T1 / DAY TRIP").
- **Cell text:** 14px, sans-serif.
- **Check marks:** Green (#4BA467) circle with checkmark. Not a generic checkmark -- use the shield brand element in miniature.
- **Alternating rows:** No background alternation. Use horizontal border lines (`rgba(ink, 0.06)`) to separate rows. Background alternation on dark themes creates visual noise.
- **Sticky header:** The header row should stick on scroll.

### 5.5 Testimonial Cards

```
+----------------------------------------------------------+
|                                                          |
|  "Safetrekr changed how we approach trip safety.         |
|   The analyst review alone is worth the investment."     |
|                                                          |
|  [Avatar]  Sarah Mitchell                                |
|            Director of Risk, Lincoln Academy              |
|            [K-12 Schools badge]                          |
|                                                          |
+----------------------------------------------------------+
```

- **Quote text:** 18px, regular, italic (Geist Sans italic if available, otherwise oblique). Quote marks in `--color-ember` at 20% opacity, 48px display size, positioned as a decorative element above the text.
- **Attribution:** 14px, semibold for name, 12px regular for title and organization.
- **Vertical badge:** Small pill badge with the vertical accent color and vertical name.
- **Card background:** `rgba(ink, 0.04)`, same as navigation cards.

### 5.6 Pricing Tiers

```
   +-------------------+  +-------------------+  +-------------------+
   |                   |  |   RECOMMENDED      |  |                   |
   |  T1 Day Trip      |  |  T2 Domestic       |  |  T3 International |
   |                   |  |                    |  |                   |
   |  $450             |  |  $750              |  |  $1,250           |
   |  per trip         |  |  per trip          |  |  per trip         |
   |                   |  |                    |  |                   |
   |  - Basic wizard   |  |  - Full wizard     |  |  - Full wizard    |
   |  - Safety review  |  |  - Safety review   |  |  - Safety review  |
   |  - Checklists     |  |  - Intel alerts    |  |  - Intel alerts   |
   |                   |  |  - Emergency prep  |  |  - Emergency prep |
   |                   |  |  - Traveler app    |  |  - Traveler app   |
   |                   |  |                    |  |  - Geofencing     |
   |                   |  |                    |  |  - Passport mgmt  |
   |                   |  |                    |  |                   |
   |  [Get Started]    |  |  [Get Started]     |  |  [Contact Sales]  |
   +-------------------+  +-------------------+  +-------------------+
```

- **Layout:** 3 columns on desktop, horizontal scroll or stack on mobile.
- **Recommended tier:** Slightly taller card with a `--color-ember` top border (2px) and a "RECOMMENDED" monospace badge. Subtle green glow on the card edge.
- **Price:** 36px, semibold, `--color-text-primary`.
- **"per trip" label:** 14px, regular, 50% opacity. This is important -- Safetrekr's per-trip pricing is a differentiator vs. per-seat SaaS models. Make the pricing model instantly clear.
- **Feature list:** 14px with small green check icons. Features present in higher tiers but not the current tier are shown with a dim dash.
- **CTA button:** Primary style for the recommended tier. Secondary/outline style for others.
- **Add-on callout:** Below the pricing tiers, a single row showing add-on pricing (background checks $35/check, insurance $25/participant) as inline items.

### 5.7 CTA Blocks (Inline and Terminal)

**Inline CTA** (appears between content sections):

```
+------------------------------------------------------------------+
|                                                                  |
|  Ready to protect your next trip?                                |
|  [Schedule a Demo]   [View Pricing -->]                          |
|                                                                  |
+------------------------------------------------------------------+
```

- Single line of text + two actions.
- Background: very subtle radial green glow (static, not animated).
- Text: 22px, semibold.

**Terminal CTA** (appears at the bottom of every content page):

```
+------------------------------------------------------------------+
|                                                                  |
|  [Shield logo, 48px, subtle glow]                                |
|                                                                  |
|  Every Traveler Accounted For                                    |
|                                                                  |
|  Start protecting your organization's travelers today.           |
|                                                                  |
|  [Start Free Trial]      [Schedule a Demo]                       |
|                                                                  |
|  SAFETREKR // SECURITY PROTOCOL v2.1                             |
|                                                                  |
+------------------------------------------------------------------+
```

- Full-width dark section.
- Centered layout. Shield logo with breathing glow (the one place this animation is appropriate outside the landing page).
- Two CTA buttons: primary and secondary.
- Monospace protocol label as a bottom accent.

### 5.8 Stats/Metrics Bar

A horizontal bar showing key platform numbers. Used on the "About" page and optionally on the landing hero.

```
  46              4              10+            5
  Protection     Integrated     Review         Verticals
  Endpoints      Portals        Sections       Supported
```

- **Numbers:** 36px, semibold, `--color-ember-bright`.
- **Labels:** 12px, medium, 50% opacity. Uppercase monospace. This is a correct use of monospace -- it reads as "data labels on an instrument panel."
- **Layout:** 4 items in a row, evenly distributed. Separated by 1px vertical dividers at 8% opacity.

---

## 6. Iconography

### Current State

The gateway uses inline SVGs at 18px with `strokeWidth: 1`, matching a thin-line Feather-style aesthetic. Icons include: bot/agent, chat bubble, grid/kanban, hexagon, chart, and terminal.

These icons are appropriate for the Tarva product suite (dev tools, ERP, code editors). They are not appropriate for a safety product marketing to non-technical buyers.

### Recommended Icon Strategy

**Style:** Outlined (not filled), 24px canvas, `strokeWidth: 1.5`. This is slightly thicker than the current 1.0 stroke, making icons more legible at the sizes needed for marketing cards (32-40px rendered size).

**Icon set:** Custom SVG icons themed to safety and operations. Do not use generic business icons (briefcase, handshake, lightbulb). Each icon should evoke the "operations equipment" language.

**Recommended icons for marketing cards:**

| Card | Icon Concept | Description |
|------|-------------|-------------|
| How It Works | Shield with checkmark | The brand mark in miniature. Communicates "process that leads to safety." |
| Platform | Monitor with grid layout | A screen showing 4 quadrants (representing 4 portals). |
| Solutions | Building with shield | An abstract building (organization) with a small shield overlay. |
| Security & Compliance | Lock with certificate | A padlock with a checkmark badge, suggesting verified security. |
| Pricing | Layers/tiers | Three stacked horizontal bars at increasing widths, representing T1/T2/T3. |
| About | People with shield | Two abstract figures with a shield between them. Communicates "people protected." |

**Icon colors:**
- Rest state: `--color-ember` at 40% opacity (the muted green).
- Hover state: `--color-ember-bright` at 70% opacity.
- This creates the "powering on" metaphor on hover.

**Icon sizes by context:**

| Context | Rendered Size | Stroke Width |
|---------|---------------|-------------|
| Marketing card icon | 40px | 1.5 |
| Feature grid icon | 32px | 1.5 |
| Inline icon (in text) | 20px | 1.5 |
| Navigation icon | 18px | 1.5 |
| Badge/label icon | 16px | 2.0 (thicker at small sizes for legibility) |

### Icon Delivery

All icons should be in a single SVG sprite (`/images/icons/marketing-icons.svg`) referenced via `<use>`. This is consistent with the existing codebase pattern and ensures a single HTTP request for all icons.

---

## 7. Responsive Layout Strategy

### The Core Challenge

The current spatial ZUI is inherently a desktop-first experience: a pannable, zoomable canvas with mouse-driven interactions. This cannot translate to mobile. The marketing site needs a completely different layout strategy for smaller viewports.

### Breakpoint System

| Breakpoint | Width | Columns | Target |
|-----------|-------|---------|--------|
| Mobile | < 640px | 1 | Phones in portrait |
| Tablet | 640-1023px | 2 | iPads, small laptops |
| Desktop | 1024-1439px | 3 | Standard laptops |
| Wide | >= 1440px | 3 (with max-width container) | Large monitors |

**Container:** Max-width 1200px, centered, with 24px horizontal padding on mobile, 32px on tablet, 48px on desktop. This prevents content from stretching edge-to-edge on wide monitors, which would destroy readability.

### Landing Page (/) Responsive Behavior

- **Desktop:** Full gateway experience with boot sequence, edge panels, brand mark, CTAs, and district dock.
- **Tablet:** Same experience but hide edge panels. The brand mark, boot sequence, and CTAs are centered and scale naturally.
- **Mobile:** Skip the boot sequence entirely. Show the brand mark, tagline, primary CTA, and secondary CTA immediately. The typewriter effect can remain for a touch of delight, but the edge panels and district dock should be hidden.

Rationale: Mobile users on 4G connections need to reach the CTA in under 3 seconds. A multi-second boot sequence with system checks is too much friction.

### Launch Page (/launch) Responsive Behavior

- **Desktop (3-column grid):**
  ```
  [Card] [Card] [Card]
  [Card] [Card] [Card]
  ```
  With optional featured card spanning 2 columns in the first row.

- **Tablet (2-column grid):**
  ```
  [Card] [Card]
  [Card] [Card]
  [Card] [Card]
  ```
  All cards are standard width. No featured variant.

- **Mobile (1-column stack):**
  ```
  [Card]
  [Card]
  [Card]
  [Card]
  [Card]
  [Card]
  ```
  Cards become full-width. Padding reduces to 24px. Card height is auto. The icon moves inline with the title (left-aligned, icon on the left, title to the right) to save vertical space.

  Mobile card layout:
  ```
  +---------------------------------------------+
  | [icon]  Card Title                     -->   |
  |         One line of description.             |
  +---------------------------------------------+
  ```

### Content Pages Responsive Behavior

- **Feature grids:** 3-col desktop, 2-col tablet, 1-col mobile.
- **Step-by-step flow:** Horizontal on desktop (with connecting line), vertical stack on mobile (with connecting vertical line).
- **Pricing tiers:** 3-col desktop, horizontal scroll on tablet (with visible overflow hint), vertical stack on mobile.
- **Comparison tables:** Standard table on desktop, card-based layout on mobile (each row becomes a card showing the feature name and check/dash for each tier).
- **Testimonials:** Single column on all sizes. Testimonial cards are wide by nature and stack well.
- **Stats bar:** 4-across on desktop, 2x2 grid on tablet, 2x2 grid on mobile.

### Navigation Responsive Behavior

- **Desktop:** Horizontal nav bar with logo (left) and text links (right).
- **Tablet (640-1023px):** Same horizontal bar but with abbreviated labels or icon+text.
- **Mobile (< 640px):** Logo (left) and hamburger menu (right). The hamburger opens a full-screen overlay with navigation links stacked vertically, large tap targets (48px minimum height), and a close button in the top-right.

The mobile menu overlay should use the dark `--color-void` background with a slight blur on the content behind it, maintaining the "secure environment" language even in the navigation.

---

## 8. Recommended Card and Page Structure

### My Recommendation vs. the Owner's Initial Ideas

The owner suggested: **How It Works, Solutions, Pricing, About, Security.**

My assessment of each:

| Owner's Idea | Verdict | Reasoning |
|-------------|---------|-----------|
| How It Works | **Keep. Elevate.** | Essential for a product this complex. Must be the primary card. |
| Solutions | **Keep.** | Important for vertical-specific messaging. |
| Pricing | **Keep.** | Per-trip pricing is a differentiator. Make it transparent and prominent. |
| About | **Deprioritize.** | Move to footer nav or make it a compact card. "About" does not earn a primary card position. Nobody evaluates a safety platform based on the About page. The origin story should be woven into the hero copy and the Security page. |
| Security | **Keep. Rename.** | Rename to "Security & Compliance." For this audience, compliance (SOC 2, audit trails, RBAC) is as important as encryption. The "&" makes it clear this covers both. |

**What I would add:**

| Addition | Reasoning |
|----------|-----------|
| **Platform** | Safety directors want to SEE the product before they talk to sales. A "Platform" or "Product Tour" card that leads to screenshots, feature grids, and portal-by-portal breakdowns is essential. This is the "show me" card that no competitor provides well. |

### Recommended Final Structure: 6 Cards

```
1. How It Works        (primary, featured)
2. Platform            (primary)
3. Solutions           (primary)
4. Security & Compliance (primary)
5. Pricing             (primary)
6. About               (secondary, compact)
```

### Card Details

**Card 1: How It Works**
- Icon: Shield with checkmark
- Title: "How It Works"
- Description: "See the 4-step process from plan to protect."
- Page content: Step-by-step flow (Plan, Review, Protect, Travel), each with feature detail and screenshot.
- This card can be featured (2-column span on desktop) to visually prioritize it.

**Card 2: Platform**
- Icon: Monitor with quadrant grid
- Title: "Platform"
- Description: "Explore the product across all four portals."
- Page content: Portal-by-portal breakdown (Client, Analyst, HQ, Traveler App). Feature grids. Screenshots. The Traveler App section is especially important -- show the mobile experience.

**Card 3: Solutions**
- Icon: Building with shield
- Title: "Solutions"
- Description: "For schools, churches, sports, and business."
- Page content: Vertical-specific pages (one per vertical) with tailored messaging, relevant features, and vertical accent colors. Landing on the Solutions page shows a switcher or set of sub-cards for each vertical.

**Card 4: Security & Compliance**
- Icon: Lock with certificate badge
- Title: "Security & Compliance"
- Description: "SOC 2, encryption, RLS, and full audit trails."
- Page content: Security architecture overview, compliance certifications, RBAC explanation, data handling policies. This page should feel like a security white paper, not a marketing brochure. Use the monospace accents here more liberally -- this is the one content page where the "operations" tone should be strongest.

**Card 5: Pricing**
- Icon: Three stacked tiers
- Title: "Pricing"
- Description: "Transparent per-trip pricing. No seat fees."
- Page content: Tier comparison (T1/T2/T3), feature matrix, add-on pricing, volume credit packages, FAQ.

**Card 6: About**
- Icon: People with shield (or team icon)
- Title: "About Safetrekr"
- Description: "Our mission and the team behind the shield."
- Page content: Origin story, mission statement, team bios (if applicable), partner logos.
- This card uses the compact variant (smaller, no full description) to visually deprioritize it relative to the five primary cards.

### Navigation Bar Structure

The top navigation bar on all pages after the launch page:

```
[Safetrekr logo]   How It Works | Platform | Solutions | Pricing | Security   [Start Trial] [Login]
```

- "About" moves to the footer.
- "Security & Compliance" abbreviates to "Security" in the nav bar for space reasons, but the full title appears on the page itself.
- CTA buttons in the nav: "Start Trial" (primary, green) and "Login" (text link, secondary).

### Footer Structure

```
+------------------------------------------------------------------+
|                                                                  |
|  [Safetrekr logo]                                                |
|  Every traveler accounted for.                                   |
|                                                                  |
|  Product          Solutions         Company         Legal        |
|  How It Works     K-12 Schools      About           Privacy     |
|  Platform         Higher Ed         Careers         Terms       |
|  Pricing          Churches          Blog            Cookie      |
|  Security         Youth Sports      Contact         DPA         |
|  Changelog        Business          Press Kit       Security    |
|                                                                  |
|  ----                                                            |
|  (c) 2026 Safetrekr. All rights reserved.                       |
|  SAFETREKR // SECURITY PROTOCOL v2.1                             |
|                                                                  |
+------------------------------------------------------------------+
```

The footer is the one place where extensive navigation is expected and appropriate. The monospace protocol line at the very bottom is a nice brand touch.

---

## Appendix A: Design Token Adjustments

Changes to `src/styles/spatial-tokens.css` needed for marketing site:

```css
/* Marketing-specific opacity overrides */
[data-page-type='marketing'] {
  --opacity-glass-rest: 0.04;       /* up from 0.03 */
  --opacity-glass-hover: 0.08;      /* up from 0.06 */
  --opacity-glass-active: 0.12;     /* up from 0.08 */
  --opacity-text-ambient: 0.65;     /* up from 0.50 */
  --opacity-text-ghost: 0.35;       /* up from 0.20 */
}
```

These overrides allow the spatial ZUI (/launch) to keep its extremely subtle treatment while the marketing pages have enough contrast for readability.

## Appendix B: Accessibility Checklist for Marketing Site

| Requirement | Target | Method |
|------------|--------|--------|
| Color contrast (text) | >= 4.5:1 for body, >= 3:1 for large text | axe-core audit |
| Color contrast (UI components) | >= 3:1 against adjacent colors | Manual check |
| Touch targets | >= 48dp with 8dp spacing | Responsive testing |
| Focus indicators | 2px outline, 4px offset, >= 3:1 contrast | Keyboard navigation test |
| Alt text | All decorative images aria-hidden, all meaningful images have alt | HTML audit |
| Heading hierarchy | H1 -> H2 -> H3, no skipped levels | axe-core |
| Reduced motion | All animations disabled under prefers-reduced-motion | Media query test |
| Keyboard navigation | All interactive elements reachable via Tab | Manual test |
| Screen reader | All cards announced with role, name, and description | NVDA/VoiceOver test |
| Font size minimum | 14px for body text, 12px for captions | Visual audit |

## Appendix C: Component Inventory

Complete list of components needed for the marketing site build:

| Component | Used On | Priority |
|-----------|---------|----------|
| MarketingCard | Launch page | P0 |
| MarketingCardCompact | Launch page | P0 |
| MarketingCardFeatured | Launch page | P1 |
| PageHero | All content pages | P0 |
| FeatureGrid | Platform, How It Works | P0 |
| FeatureGridItem | Platform, How It Works | P0 |
| StepFlow | How It Works | P0 |
| StepFlowItem | How It Works | P0 |
| ComparisonTable | Pricing, Platform | P1 |
| TestimonialCard | Solutions, About | P1 |
| PricingTier | Pricing | P0 |
| PricingTierFeature | Pricing | P0 |
| CTAInline | All content pages | P0 |
| CTATerminal | All content pages | P0 |
| StatsBar | About, Home | P1 |
| StatsBarItem | About, Home | P1 |
| VerticalCard | Solutions | P1 |
| NavBar | All pages | P0 |
| NavBarMobileMenu | All pages (mobile) | P0 |
| Footer | All pages | P0 |
| FooterColumn | All pages | P0 |
| BadgeMonospace | Various | P1 |
| MarketingIcon | Various | P0 |
| PageSection | All content pages | P0 |
| PageSectionDivider | All content pages | P2 |
| ScreenshotFrame | Platform | P1 |
| PortalSwitcher | Platform | P1 |

---

*End of UI Design Review. All recommendations are based on analysis of the current codebase (`gateway-scene.tsx`, `gateway-cta.tsx`, `district-dock.tsx`, `gateway-header.tsx`, `gateway.css`, `spatial-tokens.css`), the verified product capabilities document, and the target audience profile.*
