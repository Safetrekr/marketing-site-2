# Safetrekr Launch Page -- Interface Architecture Review

**Author**: Autonomous Interface Architect
**Date**: 2026-03-02
**Scope**: Spatial ZUI repurposing, transition choreography, content page architecture, navigation model, responsive strategy, recommended card structure, animation spec
**Audience for this document**: Engineering team, product owner
**Audience for the deliverable**: Security directors, safety officers, risk managers, administrators responsible for group travel safety

---

## Executive Summary

The existing spatial ZUI engine is a genuinely remarkable piece of engineering. The CSS-transform camera, spring physics, morph choreography, and ambient effect layers create an experience that is visually differentiated from every other SaaS marketing site on the internet. The recommendation is to preserve and adapt this engine wholesale -- not gut it. The 6-capsule ring geometry is ideal for the marketing story Safetrekr needs to tell. The morph system maps naturally to "click card, see content page." The ambient effects reinforce the "mission control for trip safety" brand positioning that will resonate with this audience.

The core changes are content and data, not architecture. Swap Tarva district IDs for Safetrekr marketing page IDs. Replace telemetry RPMs with marketing metrics. Reroute the morph destination from Tarva app previews to long-form content pages. Add responsive fallback for mobile. Preserve everything else.

---

## 1. Spatial ZUI Repurposing

### What to Keep

The entire spatial rendering pipeline survives intact:

| Component | Status | Notes |
|---|---|---|
| `SpatialViewport` | Keep | Pan/zoom interaction, viewport measurement |
| `SpatialCanvas` | Keep | CSS-transform engine, direct DOM writes |
| `camera.store.ts` | Keep | Camera state, `subscribe()` pattern for rAF |
| `spatial-math.ts` | Keep | Zoom-to-cursor, coordinate transforms |
| `MorphOrchestrator` | Adapt | Replace district data with marketing card data |
| `CapsuleRing` | Adapt | Same geometry (6 at 300px, 60-degree spacing) |
| `DistrictCapsule` | Adapt | New content: title, subtitle, marketing telemetry |
| `DotGrid` | Keep | Background layer |
| `HaloGlow` | Keep | Central breathing glow |
| `HorizonScanLine` | Keep | Ambient sweep |
| `NavigationHUD` | Adapt | Add Sign In, Request Demo CTAs |
| `Minimap` | Keep | Shows ring with active card highlighted |
| `ZoomIndicator` | Keep | Reinforces spatial metaphor |
| `CommandPalette` | Adapt | List marketing pages instead of districts |
| `ConstellationView (Z0)` | Adapt | Zoomed-out overview with 6 beacon dots |

### What to Replace

**`district.ts` types and constants.** The `DistrictId` union becomes a `CardId` union. The `DistrictMeta` interface becomes `MarketingCardMeta`. The `CapsuleTelemetry` interface gets new fields for marketing metrics instead of health/pulse/alerts. The `DISTRICTS` constant array becomes `MARKETING_CARDS`.

**Proposed type replacements:**

```typescript
// New card identity
export type CardId =
  | 'how-it-works'
  | 'who-its-for'
  | 'platform'
  | 'security'
  | 'pricing'
  | 'get-started'

// Card metadata
export interface MarketingCardMeta {
  id: CardId
  displayName: string       // "How It Works"
  shortName: string         // "HOW" (for Z0 beacons)
  subtitle: string          // "THE TRIP LIFECYCLE"
  ringIndex: 0 | 1 | 2 | 3 | 4 | 5
  href: string              // "/launch/how-it-works"
  icon: string              // Lucide icon name or custom SVG
}

// Marketing telemetry (replaces health/pulse/alerts)
export interface CardTelemetry {
  headline: string          // "4 PORTALS"
  metric: string            // "10-STEP WIZARD"
  tagline: string           // "1 SYSTEM OF RECORD"
  accentColor?: string      // Override for "Get Started" card
}
```

**`MOCK_CAPSULE_DATA` becomes `MARKETING_CARD_DATA`.** No mock data -- these are static marketing constants.

**`HealthState` and `HEALTH_STATE_MAP` are removed.** Replace with a simpler card status system: all cards are "active" (green glow). The "Get Started" card gets a distinct accent (brighter glow, amber pulse) to draw conversion attention.

### The Capsule Visual Adaptation

The existing capsule is 192x228px with this layout:
1. Display name (top)
2. Health bar
3. Telemetry data (pulse, events, freshness)
4. Sparkline chart (bottom)

The marketing capsule keeps the same dimensions and glass material but repurposes the content zones:

1. **Icon** (top) -- A domain-appropriate icon (shield for Security, layers for Platform, etc.)
2. **Display name** -- "How It Works", "Security", etc.
3. **Subtitle** -- "THE TRIP LIFECYCLE", "TRUST CENTER", etc.
4. **Metric strip** -- Rotating marketing data points in monospace, typewriter style
5. **Status indicator** (bottom) -- A thin glowing bar (green for standard cards, amber for "Get Started")

The sparkline chart is replaced with the metric strip because marketing cards do not have time-series data. The sparkline visual can be repurposed as a decorative element -- a static waveform that adds visual rhythm without implying real data.

### Interaction Model

The interaction model remains identical to the existing system:

1. **Hover**: Card scales up 1.06x, border brightens, glow intensifies, cursor becomes pointer
2. **Click**: Triggers the morph state machine (see Section 2)
3. **Keyboard**: Tab between cards, Enter/Space to select, Escape to deselect
4. **Z0 beacons**: Click a beacon at constellation zoom to fly in and open the card

The key behavioral change: clicking a capsule navigates to a content page rather than opening a Tarva app preview panel. The morph still plays, but its destination is a marketing content overlay instead of a district shell.

---

## 2. Transition Choreography

### Why the Existing Morph System is the Right Foundation

The current morph state machine (`idle -> expanding -> settled -> entering-district -> district`) maps cleanly to marketing navigation:

| Morph Phase | Current Behavior | Marketing Adaptation |
|---|---|---|
| `idle` | All capsules visible | All cards visible, ring centered |
| `expanding` (400ms) | Capsule dims, panel slides in | Ring shifts, clicked card brightens, siblings fade |
| `settled` (200ms hold) | Panel interactive, URL synced | Brief hold for visual weight |
| `entering-district` (600ms) | Full overlay fades in | Content page surface expands to viewport |
| `district` | Full-screen district view | Full marketing content page, scroll enabled |

### The Marketing Morph: Single-Click Navigation

For the Tarva product, the two-step discovery model (click capsule, see preview, click again to enter district) made sense because users were opening complex app workspaces. For marketing, this adds friction. Every click should advance the visitor toward content.

**Recommended flow: one click = full page transition.**

The `settledHold` timing should be reduced to 0ms for marketing. The morph advances directly from `expanding` to `entering-district`, creating a fluid single-click animation:

```
idle
  -> [user clicks "How It Works"]
expanding (400ms)
  - Clicked capsule scales 1.0 -> 1.08, glows brighter
  - Sibling capsules fade to opacity 0.15
  - Ring shifts away (existing RING_SHIFT logic)
  - Ambient elements blur (morph-ambient-fade)
  -> auto-advance (no hold)
entering-district (600ms)
  - Capsule surface expands toward viewport fill
  - Ring fades to opacity 0
  - Background ambient dims to 10%
  - Content begins fading in behind the expanding surface
  - URL updates: /launch -> /launch/how-it-works
  ->
district (stable)
  - Full content page visible
  - Frosted glass surface at viewport scale
  - Spatial background at 10% opacity beneath
  - Scroll enabled, breadcrumb active
```

**Total transition time: approximately 1000ms** (400ms expand + 600ms enter). This is fast enough to feel responsive but slow enough for the animation to register.

### Reverse Choreography (Back to Ring)

```
district
  -> [user clicks back / breadcrumb / Escape]
leaving-district (400ms)
  - Content fades out (opacity 1 -> 0)
  - Surface contracts back toward capsule origin
  - Background ambient brightens 10% -> 100%
  - Ring fades in, capsules restore opacity
  - URL updates: /launch/how-it-works -> /launch
  ->
idle
  - All capsules full opacity
  - Ambient effects restored
  - Ring centered
```

### Lateral Navigation (Card-to-Card)

When a user is inside a content page (e.g., "How It Works") and wants to go to "Who It's For" (the next card in the ring), they should not have to go back to the ring first.

**Proposed lateral transition:**

1. User clicks "Next" arrow or breadcrumb link to adjacent card
2. Current content fades out (200ms)
3. Brief flash of the spatial background (100ms -- shows the "travel" between cards)
4. New content fades in (200ms)
5. URL updates directly

This keeps the spatial metaphor without forcing ring re-entry for sequential browsing.

### The "Get Started" Card: Special Behavior

The "Get Started" card at ring position 5 (10 o'clock) has a differentiated morph:

- **Resting state**: Subtle amber pulse instead of green (standing out from the other 5 cards)
- **Morph**: Same mechanical behavior, but the expanding surface has an amber-tinted glass instead of the standard green
- **Content**: Instead of a scrollable marketing page, it reveals a focused form overlay (demo request) with a split layout: form on the left, "What to expect" timeline on the right

---

## 3. Content Page Architecture

### Layout Specification

Once inside a content page (morph phase = `district`), the viewport shows:

```
+------------------------------------------------------------------+
|  [Logo]           Mission Control > How It Works    [Sign In] [Demo] |  <- Fixed header (z-40)
+------------------------------------------------------------------+
|                                                                    |
|  ................................................................  |
|  :                                                              :  |
|  :  [CONTENT SURFACE - frosted glass panel]                     :  |
|  :                                                              :  |
|  :  ## How Safetrekr Works                                      :  |
|  :                                                              :  |
|  :  [Hero illustration / animation]                             :  |
|  :                                                              :  |
|  :  ### Plan                                                    :  |
|  :  10-step wizard captures every detail...                     :  |
|  :                                                              :  |
|  :  ### Review                                                  :  |
|  :  Independent safety analyst evaluates...                     :  |
|  :                                                              :  |
|  :  ### Protect                                                 :  |
|  :  Real-time intelligence and geofencing...                    :  |
|  :                                                              :  |
|  :  ### Travel                                                  :  |
|  :  Live checklists delivered to mobile...                      :  |
|  :                                                              :  |
|  :  [CTA: Request Demo]                                         :  |
|  :                                                              :  |
|  :  [ < Who It's For ]              [ Platform > ]              :  |  <- Lateral nav
|  :                                                              :  |
|  ................................................................  |
|                                                                    |
|  [Spatial background at 10% opacity: dots, glow, scan line]       |
|                                                                    |
+------------------------------------------------------------------+
|  [Footer: About | Blog | Legal | Privacy | Contact]               |  <- Inside scroll
+------------------------------------------------------------------+
```

### Content Surface Properties

The content surface is a full-viewport frosted glass panel that inherits the capsule's material language:

```css
.content-surface {
  background: rgba(var(--ambient-ink-rgb), 0.04);
  backdrop-filter: blur(16px) saturate(120%);
  border: 1px solid rgba(var(--ambient-ink-rgb), 0.08);
  border-radius: 0;  /* full viewport, no radius */
  max-width: 960px;
  margin: 0 auto;
  padding: 80px 48px 120px;
}
```

The surface scrolls within the viewport. The spatial background behind it is fixed-position and dims to 10% opacity, creating a sense of depth.

### Content Typography

Marketing content uses a blend of the spatial monospace system and readable body text:

- **Page titles**: `font-sans`, 32px, semibold, uppercase, tracking 0.04em, color `--color-ember-bright`
- **Section headings**: `font-sans`, 20px, semibold, tracking 0.02em, color `--color-text-primary`
- **Body text**: `font-sans`, 16px, regular, line-height 1.7, color `--color-text-secondary` (rgba opacity 0.7)
- **Metadata/labels**: `font-mono`, 10px, uppercase, tracking 0.08em, color at rgba opacity 0.3 (the existing "ambient-ink" pattern)
- **Code/metrics**: `font-mono`, 11px, medium, color `--color-ember-bright`

This dual-font system preserves the mission-control aesthetic for UI chrome and metadata while ensuring long-form content is readable.

### Scroll Behavior

- Standard browser scroll within the content surface
- Spatial background elements have a parallax offset: `translateY(scrollY * -0.15)` applied via rAF to the ambient layer
- Scroll progress indicator: a thin green line at the top of the viewport that fills left-to-right as the user scrolls (matching the scan-line aesthetic)

### Back Navigation

Three return paths to the ring:

1. **Breadcrumb click**: "Mission Control" link in the breadcrumb navigates back with reverse morph
2. **Browser back**: `popstate` listener triggers `reverseMorph()`
3. **Escape key**: Existing keyboard handler already wired for this
4. **Close button**: A subtle "x" icon in the top-right of the content surface (below the header bar)

All four paths trigger the same `reverseMorph()` action, ensuring consistent animation.

---

## 4. Navigation Model

### Primary Navigation: The Capsule Ring

The 6 capsules ARE the primary nav. There is no traditional horizontal nav bar listing pages. This is intentional -- the spatial ring IS the differentiator. A visitor who sees this interface immediately understands they are not on a generic SaaS site.

### Fixed Header Bar (z-40)

Present on both the ring view and content pages:

```
+------------------------------------------------------------------+
|  [Safetrekr Logo]                          [Sign In]  [Demo CTA]  |
+------------------------------------------------------------------+
```

- **Logo**: Existing `safetrekr-logo-vert-light.svg`, fixed left, opacity 0.4 at rest, 0.7 on hover. Clicking returns to ring (triggers `reverseMorph()` if in a content page, or `returnToHub()` if panned away from ring).
- **Sign In**: Text link, `font-mono`, 10px uppercase, opacity 0.3 at rest, 0.6 on hover. Links to `/login`.
- **Request Demo**: Pill button with ember glow (reuse `gateway-cta-breathe` animation). Links to `/launch/get-started` (which triggers the "Get Started" card morph).

The header intentionally has NO page links. The ring is the nav.

### Breadcrumb (Spatial Breadcrumb Component)

The existing `SpatialBreadcrumb` component already supports hierarchical navigation. Adapt it for:

- **Ring view**: `MISSION CONTROL` (static, monospace, 9px uppercase, ember color at 0.3 opacity)
- **Content page**: `MISSION CONTROL > HOW IT WORKS` (first segment is a link that triggers reverse morph)

Style: the breadcrumb uses the existing monospace metadata aesthetic. Separator is `>` (not `/`), matching the command-line feel.

### Minimap

The existing `Minimap` component shows a small representation of the spatial world with the current viewport position. For marketing, it serves as:

- A visual indicator of which card the user is viewing (highlighted dot)
- A quick-jump interface (click a dot to navigate to that card)
- An ambient decorative element reinforcing the spatial metaphor

On content pages, the minimap shows all 6 dots with the active one highlighted. Clicking another dot triggers lateral navigation.

### Command Palette (Cmd+K)

Adapt the existing `CommandPalette` to list:

1. The 6 marketing cards
2. "Sign In"
3. "Request Demo"
4. "Home" (return to ring)

This is a power-user affordance that most visitors will never use, but it adds to the perceived depth and quality of the interface.

### Footer (Inside Content Pages Only)

The ring view has no footer (it is a spatial canvas). Content pages include a footer at the bottom of the scroll area:

```
Safetrekr     About  Blog  Help Center  Status  Legal  Privacy  Terms

(c) 2026 Safetrekr. All rights reserved.       [Twitter] [LinkedIn]
```

Style: Same monospace metadata treatment. Very understated. The spatial environment is the star, not the footer.

### Mobile Navigation Override

On mobile (below 768px), the spatial nav is replaced with a fixed bottom tab bar:

```
+------------------------------------------------------------------+
|  [How]  [Who]  [Platform]  [Security]  [Pricing]  [Start]       |
+------------------------------------------------------------------+
```

This is the standard mobile pattern, but styled with the capsule glass material (frosted dark background, monospace labels, thin ember-colored active indicator).

---

## 5. Responsive Strategy

### The Core Problem

The ZUI (pan, zoom, ring layout) requires a mouse/trackpad and a viewport large enough to frame the 840px ring. On touch devices and narrow viewports, the spatial interaction model breaks down. The strategy is: **preserve the visual language, simplify the interaction model**.

### Breakpoint Architecture

#### Desktop (>= 1280px): Full Spatial ZUI

- Full pan/zoom enabled
- 6-capsule ring at 300px radius
- All ambient effects active
- Minimap, breadcrumb, zoom indicator, command palette
- Morph transitions with ring shift + panel expansion

#### Laptop (1024-1279px): Constrained Spatial

- Pan/zoom enabled but with tighter bounds (prevent over-panning)
- Ring radius reduced to 240px, capsule size reduced to 160x190px
- Ambient effects: DotGrid, HaloGlow, ScanLine only (drop gauges, readouts, edge fragments)
- Minimap hidden (viewport is already showing most of the ring)
- Morph transitions preserved

#### Tablet (768-1023px): Spatial Cards, No Pan/Zoom

- **No ZUI.** The ring is replaced with a centered 2x3 grid of capsule cards.
- Cards retain the glass material, icon, title, subtitle, and metric strip.
- Cards have the same hover/focus animations.
- Tapping a card triggers a slide-over transition (card expands rightward to fill viewport).
- Spatial background preserved (DotGrid + HaloGlow, no other ambient).
- Header bar and breadcrumb visible.
- Return via swipe-right gesture or back button.

#### Mobile (< 768px): Card Stack

- **No spatial background.** Solid `--color-void` background.
- Full-width vertical card stack with 12px gaps.
- Each card is a horizontal layout: icon left, title/subtitle right, metric strip below.
- Card height: 80px (compact).
- Tapping a card pushes to a full-screen content page with standard mobile transitions.
- Fixed header: Logo + hamburger menu (Sign In, Request Demo, all 6 cards).
- Content pages: standard mobile scroll with no parallax.
- Bottom navigation bar optional (depends on implementation cost).

### What Persists Across All Breakpoints

No matter the device, these elements maintain the "mission control" brand:

1. **Color scheme**: `--color-void` background, ember green accents, teal secondary
2. **Typography**: Monospace for labels/metadata, sans-serif for body
3. **Glass material**: Frosted surfaces with backdrop-blur (reduced to `blur(8px)` on mobile for performance)
4. **Breathing glow**: The primary CTA always has the `gateway-cta-breathe` animation
5. **Card data**: Every card shows its marketing telemetry metrics in monospace
6. **Transition quality**: Even simplified mobile transitions should be spring-based, not linear

### Performance Considerations

- On devices with `navigator.deviceMemory < 4`, disable: DotGrid, particle effects, parallax scroll
- On `prefers-reduced-motion: reduce`, disable all CSS keyframe animations and reduce morph durations to 0ms (existing pattern in `MORPH_TIMING_REDUCED`)
- Ambient effects should be CSS-only (no JavaScript paint), staying on the compositor thread
- Content pages should be statically generated (ISR) -- no client-side data fetching for marketing content

---

## 6. Recommended Page/Card Structure

### The Case for 6 Cards

The owner proposed 5: How It Works, Solutions, Pricing, About, Security.

I recommend 6, and I recommend different labels. Here is the reasoning:

1. **Geometric harmony**: 6 capsules at 60-degree spacing create a balanced hexagonal ring. 5 at 72-degree spacing leaves a visible gap that undermines the visual elegance. The existing ring geometry, positioning math, and rotation logic are all built for 6.

2. **"Solutions" is too vague**: For an audience of security directors and safety officers, "Solutions" means nothing. They need to see their industry. "Who It's For" (or "Industries") lets them self-select into their vertical (K-12, church, college, sports, business).

3. **"About" is low priority**: The visitor journey is awareness -> evaluation -> decision. "About" does not advance any of those stages. It belongs in the footer. In its place, the ring should have a conversion card ("Get Started") because the ring is the ONLY navigation -- if the CTA is not in the ring, it is relegated to a small header button.

4. **The platform deserves its own card**: Safetrekr has 16 capability areas, 4 portals, a native mobile app, real-time intelligence, geofencing, and a 46-endpoint protection API. "How It Works" cannot contain all of this. Splitting into "How It Works" (the story/process) and "Platform" (the features/capabilities) gives the product the space it deserves.

### Recommended Card Structure

| Ring Index | Position | Card ID | Display Name | Subtitle | Route |
|---|---|---|---|---|---|
| 0 | 12:00 | `how-it-works` | How It Works | THE TRIP LIFECYCLE | `/launch/how-it-works` |
| 1 | 2:00 | `who-its-for` | Who It's For | INDUSTRIES | `/launch/who-its-for` |
| 2 | 4:00 | `platform` | Platform | CAPABILITIES | `/launch/platform` |
| 3 | 6:00 | `security` | Security | TRUST CENTER | `/launch/security` |
| 4 | 8:00 | `pricing` | Pricing | PLANS & TIERS | `/launch/pricing` |
| 5 | 10:00 | `get-started` | Get Started | REQUEST A DEMO | `/launch/get-started` |

### Card Telemetry Data

Each card displays rotating metrics in the capsule's telemetry zone. These replace the Tarva health/pulse/alerts data:

**How It Works**
```
LINE 1: 4 PORTALS
LINE 2: 10-STEP WIZARD
LINE 3: 1 SYSTEM OF RECORD
```

**Who It's For**
```
LINE 1: K-12 SCHOOLS
LINE 2: CHURCHES & FAITH
LINE 3: YOUTH SPORTS
LINE 4: COLLEGES
LINE 5: BUSINESSES
```

**Platform**
```
LINE 1: 16 CAPABILITY MODULES
LINE 2: REAL-TIME INTELLIGENCE
LINE 3: NATIVE MOBILE APP
LINE 4: 46-ENDPOINT PROTECTION API
```

**Security**
```
LINE 1: ROW-LEVEL SECURITY
LINE 2: END-TO-END ENCRYPTED
LINE 3: FULL AUDIT TRAIL
LINE 4: RBAC -- 10 ROLES
```

**Pricing**
```
LINE 1: T1 DAY TRIP -- $450
LINE 2: T2 DOMESTIC -- $750
LINE 3: T3 INTERNATIONAL -- $1,250
```

**Get Started**
```
LINE 1: 14-DAY FREE TRIAL
LINE 2: NO CREDIT CARD REQUIRED
LINE 3: LIVE IN 48 HOURS
```

These metrics cycle every 4 seconds with a typewriter reveal animation, matching the gateway ChoiceReveal pattern.

### Secondary Navigation Items

These are NOT in the ring. They live in the header bar or footer:

- **Sign In**: Header, right side, text link
- **Request Demo**: Header, right side, pill CTA (also the "Get Started" card content)
- **About**: Footer link (company story, team, mission)
- **Blog**: Footer link
- **Help Center**: Footer link
- **Status Page**: Footer link
- **Legal / Privacy / Terms**: Footer links
- **Contact**: Footer, or embedded in "Get Started" content page

### Content Page Outlines

**How It Works** (`/launch/how-it-works`)
- Hero: Animated trip lifecycle diagram (Plan -> Review -> Protect -> Travel)
- Section 1: "Plan Every Detail" -- 10-step wizard walkthrough with screenshots
- Section 2: "Independent Safety Review" -- The analyst portal story, separation of duties
- Section 3: "Real-Time Protection" -- Intelligence alerts, geofencing, checklist delivery
- Section 4: "Travel With Confidence" -- Mobile app, offline-first, SMS broadcast
- CTA: "See the Platform" (links to Platform card) or "Request Demo"

**Who It's For** (`/launch/who-its-for`)
- Hero: "Every Group That Travels Deserves Protection"
- Section per vertical: K-12, College, Church, Youth Sports, Business
  - Each: 1-paragraph use case, key differentiator for that vertical, pull quote
- Social proof section: logos or testimonials (when available)
- CTA: "See Pricing" or "Request Demo"

**Platform** (`/launch/platform`)
- Hero: "One Platform. Four Portals. Complete Trip Safety."
- Section 1: Client Portal -- trip planning, roster, documents, intelligence feed
- Section 2: Analyst Portal -- 18-section review workspace, evidence tracking, approval
- Section 3: HQ Console -- organization management, queue control, finance, policies
- Section 4: Traveler App -- mobile delivery, geofencing, SMS broadcast, offline-first
- Section 5: Intelligence Engine -- TarvaRI integration, alert classification, risk scoring
- Feature grid: 16 capabilities in a 4x4 card grid, each with icon + title + 1-line description
- CTA: "Request Demo"

**Security** (`/launch/security`)
- Hero: "Built for Organizations That Cannot Afford to Fail"
- Section 1: Architecture -- Four-portal isolation, row-level security, runtime configuration
- Section 2: Data Protection -- Encryption at rest and in transit, JWT sessions, 2FA
- Section 3: Access Control -- 10 roles, portal routing, team management, invitation workflow
- Section 4: Audit Trail -- Every action logged, evidence tracking, activity statistics
- Section 5: Compliance -- GDPR data export, consent history, account deletion, analytics opt-out
- Section 6: Operational Security -- Containerized deployment, CI/CD, environment isolation
- Trust badges: (SOC2, encryption standards, compliance certifications -- as applicable)
- CTA: "Talk to Our Security Team" or "Request Demo"

**Pricing** (`/launch/pricing`)
- Hero: "Transparent Pricing. No Per-Seat Fees."
- Tier comparison: T1 / T2 / T3 cards with feature breakdowns
- Add-ons: Background checks ($35/check), travel insurance ($25/participant)
- Credit packages: Volume pricing for organizations with recurring trips
- FAQ section: Billing frequency, refund policy, what is included
- CTA: "Start Free Trial" or "Request Demo"

**Get Started** (`/launch/get-started`)
- NOT a standard scrollable content page. This is a focused conversion overlay.
- Split layout: Form on left (name, email, organization, vertical, trip volume), timeline on right ("Day 1: Account setup, Day 2: First trip planning, Day 14: Full evaluation")
- Form uses the glass material with prominent ember CTA button
- Alternative: "Schedule a Call" with Calendly embed
- Below form: FAQ about the trial, onboarding process, support

---

## 7. Animation & Microinteraction Spec

### Tier 1: rAF Physics (Camera + Morph Surface)

These animations run on `requestAnimationFrame` with direct DOM writes, bypassing React reconciliation. They are the highest-priority animations and must maintain 60fps.

**Camera pan momentum**
- Friction: 0.96 per frame (existing `MOMENTUM_FRICTION`)
- Velocity samples: 5 (existing `MOMENTUM_SAMPLES`)
- Stop threshold: 0.15 px/frame (existing)

**Camera zoom momentum**
- Sensitivity: 0.0008 per wheel delta (existing)
- Friction: 0.93 per frame (existing)
- Stop threshold: 0.0003 (existing)

**Morph surface expansion**
- The capsule surface expanding to viewport fill during `entering-district`:
  - `transform: scale()` from capsule size to viewport size
  - `translate()` from capsule position to viewport center
  - Spring physics: stiffness 100, damping 18, mass 1.0
  - Duration: ~600ms (spring-driven, not fixed)

**Scroll parallax**
- Background ambient layer: `translateY(scrollY * -0.15)` via rAF subscription
- Update rate: every frame during active scroll, throttled to 0 during idle

### Tier 2: motion/react Choreography

These use the `motion` component from `motion/react` for enter/exit transitions.

**Capsule hover**
```typescript
whileHover={{
  scale: 1.06,
  transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
}}
```
- Border opacity: 0.10 -> 0.20 (CSS transition, 200ms)
- Box-shadow: add glow layer (`0 0 24px rgba(75, 164, 103, 0.15)`)

**Capsule morph (expanding phase)**
```typescript
// Selected capsule
animate={{
  scale: 1.08,
  opacity: 1.0,
  filter: 'brightness(1.2)',
}}
transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}

// Sibling capsules
animate={{
  opacity: 0.15,
  scale: 0.95,
  filter: 'blur(2px)',
}}
transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
```

**Ring shift (morph)**
```typescript
// Existing RING_SHIFT_SPRING config
animate={{
  x: panelSide === 'right' ? -450 : 450,
  scale: 0.75,
  rotate: ringRotation,
}}
transition={{ type: 'spring', stiffness: 140, damping: 24 }}
```

**Content page entrance**
```typescript
// Content sections stagger in
initial={{ opacity: 0, y: 24 }}
animate={{ opacity: 1, y: 0 }}
transition={{
  duration: 0.5,
  delay: index * 0.08,  // 80ms stagger
  ease: [0.22, 1, 0.36, 1]
}}
```

**Content page exit (reverse morph)**
```typescript
exit={{
  opacity: 0,
  scale: 0.98,
}}
transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
```

**Lateral navigation (card-to-card)**
```typescript
// Outgoing content
exit={{ opacity: 0, x: -40 }}
transition={{ duration: 0.2 }}

// Brief spatial flash (100ms pause)

// Incoming content
initial={{ opacity: 0, x: 40 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
```

### Tier 3: CSS @keyframes Ambient

These are always-on background animations. They must be GPU-composited (transform + opacity only) and respect `prefers-reduced-motion`.

**Capsule breathing glow** (new, replaces health-based glow)
```css
@keyframes capsule-breathe {
  0%, 100% {
    box-shadow:
      0 0 16px rgba(75, 164, 103, 0.06),
      0 0 4px rgba(75, 164, 103, 0.10);
  }
  50% {
    box-shadow:
      0 0 24px rgba(75, 164, 103, 0.12),
      0 0 8px rgba(75, 164, 103, 0.18);
  }
}
.capsule-breathe {
  animation: capsule-breathe 5s ease-in-out infinite;
}
```

**"Get Started" card amber pulse** (differentiated)
```css
@keyframes capsule-amber-pulse {
  0%, 100% {
    box-shadow:
      0 0 16px rgba(245, 158, 11, 0.08),
      0 0 4px rgba(245, 158, 11, 0.14);
  }
  50% {
    box-shadow:
      0 0 28px rgba(245, 158, 11, 0.16),
      0 0 10px rgba(245, 158, 11, 0.24);
  }
}
.capsule-amber-pulse {
  animation: capsule-amber-pulse 4s ease-in-out infinite;
}
```

**Metric typewriter reveal** (reuse gateway pattern)
```css
@keyframes metric-cursor-blink {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 0; }
}
.metric-cursor {
  animation: metric-cursor-blink 800ms step-end infinite;
}
```

**Scroll progress indicator**
```css
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: var(--color-ember-bright);
  transform-origin: left;
  /* Width driven by JavaScript: scaleX(scrollPercentage) */
  transition: none; /* Updated via rAF, no CSS transition */
  z-index: 50;
  opacity: 0.6;
}
```

**Existing ambient effects to preserve as-is:**
- `gateway-shield-breathe` (5s green glow cycle)
- `gateway-cta-breathe` (5s box-shadow cycle on Request Demo CTA)
- `gateway-cursor-blink` (800ms cursor for typewriter)
- `HorizonScanLine` sweep
- `SessionTimecode` running clock
- `CalibrationMarks` corner decorations
- `TopTelemetryBar` / `BottomStatusStrip`

### Timing Constants (New `marketing-morph-types.ts`)

```typescript
export const MARKETING_MORPH_TIMING: Readonly<MorphTimingConfig> = {
  expanding: 400,       // Ring shift + capsule animations
  settledHold: 0,       // No hold -- go straight to content
  enteringDistrict: 600, // Surface expansion to viewport
  leavingDistrict: 400,  // Reverse contraction
} as const

export const MARKETING_MORPH_TIMING_REDUCED: Readonly<MorphTimingConfig> = {
  expanding: 0,
  settledHold: 0,
  enteringDistrict: 0,
  leavingDistrict: 0,
} as const
```

### Easing Functions

All spring and easing values use the existing constants where possible:

| Name | Value | Usage |
|---|---|---|
| `ease-morph` | `cubic-bezier(0.22, 1, 0.36, 1)` | Primary morph transitions |
| `ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Hover states, quick reveals |
| `ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | CTA entrance (gateway pattern) |
| Spring: morph | `stiffness: 140, damping: 24` | Ring shift (existing) |
| Spring: camera | `stiffness: 120, damping: 20, mass: 1.1` | FlyTo navigation (existing) |
| Spring: surface expand | `stiffness: 100, damping: 18, mass: 1.0` | Content surface fill |

---

## 8. Implementation Roadmap (Suggested)

### Phase 1: Data Layer Swap (1-2 days)

1. Create `src/lib/interfaces/marketing-card.ts` with new types (`CardId`, `MarketingCardMeta`, `CardTelemetry`, `MARKETING_CARDS`, `MARKETING_CARD_DATA`)
2. Update `MorphOrchestrator` to consume `MarketingCardData[]` instead of `CapsuleData[]`
3. Update `DistrictCapsule` (rename to `MarketingCapsule`) with new content layout
4. Update `ui.store.ts` to use `CardId` instead of `DistrictId`
5. Verify the ring renders with new content, morph still works

### Phase 2: Content Page System (2-3 days)

1. Create `src/app/launch/[card]/page.tsx` -- dynamic route for content pages
2. Create content components for each card (initially placeholder text)
3. Wire the morph `entering-district` phase to route push (`/launch/how-it-works`)
4. Wire the `leaving-district` phase to route back (`/launch`)
5. Implement the content surface component with frosted glass material
6. Add breadcrumb adaptation for content page context

### Phase 3: Header & Navigation (1 day)

1. Add "Sign In" and "Request Demo" to the header bar
2. Update `CommandPalette` commands for marketing pages
3. Add lateral navigation (prev/next) to content pages
4. Wire minimap dots to card navigation

### Phase 4: Content & Copy (2-3 days)

1. Write content for all 6 pages (or placeholder with structure)
2. Add illustrations, icons, and feature grids
3. Build the "Get Started" form overlay
4. Add footer to content pages

### Phase 5: Responsive (2-3 days)

1. Implement tablet breakpoint (2x3 grid)
2. Implement mobile breakpoint (card stack)
3. Add mobile header with hamburger menu
4. Test touch interactions and performance on real devices

### Phase 6: Polish (1-2 days)

1. Tune animation timings with real content
2. Add `prefers-reduced-motion` handling
3. Performance audit (Lighthouse, bundle size)
4. Accessibility audit (keyboard nav, screen reader, focus management)

**Total estimated effort: 9-14 days** for a single developer familiar with the codebase.

---

## 9. Open Questions for Product Owner

1. **Trial offering**: The "Get Started" card assumes a 14-day free trial. Is this confirmed? If no trial, the card becomes "Request Demo" with a form-only experience.

2. **Social proof**: Are there logos, testimonials, or case studies available? The "Who It's For" page is significantly stronger with real customer evidence.

3. **Pricing visibility**: Should pricing be publicly visible on the marketing site, or gated behind a "Contact Sales" flow? The card structure assumes public pricing.

4. **Content depth**: How much content exists today? The Phase 4 estimate assumes writing from scratch. If content briefs or copy decks exist, the timeline compresses.

5. **Analytics**: What is the conversion tracking setup? The morph transitions use `history.pushState`, which needs explicit handling for most analytics providers (GA4, Segment, etc.).

6. **SEO requirements**: The spatial ZUI is client-rendered. For SEO, the content pages need either SSR or static generation. The recommendation is ISR (Incremental Static Regeneration) for all content pages. The ring view itself does not need to be SEO-indexed -- only the content pages do.

7. **Gateway page**: The existing gateway (`/`) with boot sequence + "Enter Mission Control" CTA -- does this survive as the landing page, or does the launch page become the root?

---

## 10. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Mobile performance (ambient effects on low-end devices) | Medium | High | Feature-detect `deviceMemory`, disable effects below 4GB |
| SEO for client-rendered content | High | High | Use Next.js ISR for content pages, ensure `<head>` metadata is SSR |
| Cognitive overload (spatial nav unfamiliar to target audience) | Medium | Medium | Add a subtle "scroll down" hint or tooltip on first visit; the gateway boot sequence primes visitors for the spatial interface |
| Accessibility of spatial navigation | Medium | High | Ensure full keyboard nav (Tab through capsules, Enter to select); provide screen-reader-accessible card list as hidden alternative; test with NVDA/VoiceOver |
| Bundle size (spatial engine + marketing content) | Low | Medium | Content pages are separate routes with code-splitting; spatial engine is already loaded for the ring |
| Browser compatibility (backdrop-filter) | Low | Low | Safari 14+, Chrome 92+, Firefox 103+ all support it; fallback to solid background for older browsers |

---

## Conclusion

The Safetrekr marketing site has an extraordinary technical foundation. The spatial ZUI engine is a competitive moat -- no other trip safety platform (or frankly, most SaaS products in any category) presents their marketing story through a zoomable, pannable, morph-animated spatial interface. The recommendation is to lean into this differentiation, not away from it.

The 6-card ring structure tells the complete buyer's journey (awareness -> evaluation -> decision) in a single, navigable spatial metaphor. The morph system provides a transition experience that makes clicking through marketing pages feel like exploring a command center rather than reading a brochure. And the ambient effects -- the breathing glows, scan lines, telemetry strips, dot grids -- create a subliminal sense that this is a platform built by people who take precision and vigilance seriously. That is exactly the right emotional register for security directors and safety officers.

Preserve the engine. Swap the content. Ship it.
