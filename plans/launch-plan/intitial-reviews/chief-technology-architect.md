# Safetrekr Marketing Site -- Chief Technology Architect Review

*Prepared: 2026-03-02*
*Reviewer: Chief Technology Architect*
*Scope: Full-site architecture review for Safetrekr marketing website launch*
*Inputs: Verified product capabilities document (v2), existing spatial ZUI codebase, owner's initial navigation thoughts*

---

## Table of Contents

1. [Target Audience Analysis](#1-target-audience-analysis)
2. [Recommended Site Architecture](#2-recommended-site-architecture)
3. [Launch Page Vision](#3-launch-page-vision)
4. [Technical Architecture for the Marketing Site](#4-technical-architecture-for-the-marketing-site)
5. [Content Strategy per Page](#5-content-strategy-per-page)
6. [Conversion Flow](#6-conversion-flow)

---

## 1. Target Audience Analysis

### 1.1 Primary Buyers

Safetrekr's buyers are **risk-conscious decision-makers** responsible for the safety of people who travel under their organization's duty of care. They are not technical buyers. They are operational leaders who live with the consequences of inadequate safety planning.

| Persona | Title Examples | Organization Type | Primary Pain |
|---------|---------------|-------------------|--------------|
| **The School Safety Director** | Director of Student Safety, Dean of Students, Assistant Principal | K-12, Private Schools | Liability exposure on field trips; paper-based permission slips; no visibility into chaperone screening compliance |
| **The University Risk Manager** | Director of Risk Management, Study Abroad Coordinator, Dean of Global Programs | Colleges & Universities | Complex international travel compliance; insurance gap visibility; incident response protocols for students thousands of miles away |
| **The Church Missions Coordinator** | Missions Director, Youth Pastor, Church Administrator | Churches, Faith Organizations | Volunteer screening for adults traveling with minors; guardian consent collection; zero institutional safety infrastructure |
| **The Youth Sports Administrator** | Travel Director, Club Administrator, League Safety Officer | Youth Sports Organizations, Club Teams | Tournament travel logistics at scale; background check compliance for coaches; parent communication during travel |
| **The Corporate Travel Security Manager** | Global Security Director, Travel Risk Manager, Corporate Safety Officer | Businesses, NGOs | Duty-of-care compliance for international assignments; real-time intelligence for employees in volatile regions; audit trail for regulatory reporting |

### 1.2 What They Care About

These buyers share common concerns that must drive every word on the marketing site:

**Liability Reduction.** Their primary motivation is reducing organizational exposure. Every trip without a documented safety plan is a lawsuit waiting to happen. They need to demonstrate they took *reasonable precautions*. Language: "documented duty of care", "auditable safety record", "defensible compliance posture".

**Compliance Evidence.** Regulators, insurers, and boards ask: "Can you prove you screened every chaperone? Can you prove every parent signed the waiver? Can you prove you had an evacuation plan?" Safetrekr provides the evidence. Language: "chain of evidence", "compliance matrix", "audit trail".

**Separation of Duties.** Sophisticated safety programs require the person planning the trip to NOT be the same person approving it. Safetrekr's independent analyst review is a structural advantage. Language: "independent safety review", "separation of duties", "third-party verification".

**Speed Under Pressure.** When something goes wrong on a trip, these professionals need answers in seconds, not hours. Where are all travelers? Who is the nearest trauma center? What is the rally point? Language: "real-time location awareness", "emergency response in seconds", "command-level visibility".

**Ease of Adoption.** They are buying for organizations with limited technical sophistication. Teachers, youth pastors, and volunteer coaches need to use this tool without training. Language: "guided setup", "intuitive workflow", "no training required".

**Cost Justification.** Safety is an insurance-like purchase -- hard to justify until you need it. The pricing must be framed as risk reduction per trip, not SaaS subscription cost. Language: "per-trip pricing aligned to complexity", "investment in organizational protection", "fraction of the cost of a single incident".

### 1.3 Language That Resonates vs. Language to Avoid

| Use This | Not This |
|----------|----------|
| Duty of care | Safety features |
| Auditable compliance | Document management |
| Independent safety review | Approval workflow |
| Real-time intelligence | Notifications |
| Emergency preparedness | Emergency features |
| Protection system | Safety tools |
| Separation of duties | Role-based access |
| Trip safety record | Trip data |
| Incident readiness | Emergency planning |
| Chain of evidence | Audit log |
| Traveler accountability | Check-in system |
| Analyst-verified | Admin-approved |

### 1.4 Buying Process

These buyers typically follow a procurement process, not an impulse purchase. The site must support:

1. **Discovery** -- "Does this product exist? Does it solve my problem?" (solved by landing page + launch page)
2. **Evaluation** -- "How does it work? Is it credible? Is it secure?" (solved by feature deep-dives + security page)
3. **Validation** -- "Do organizations like mine use it? What do they say?" (solved by solutions verticals + social proof)
4. **Justification** -- "How do I sell this internally? What does it cost?" (solved by pricing page + ROI framing)
5. **Action** -- "How do I get started?" (solved by Request Demo CTA + contact)

The site does NOT need to support self-service signup. This is a consultative sale. The conversion goal is **Request Demo / Request Info**, not "Sign Up Free".

---

## 2. Recommended Site Architecture

### 2.1 Architectural Philosophy

The site uses a **dual-mode navigation model**:

- **Spatial Mode** -- The ZUI capsule ring on `/launch` IS the interactive product tour. It replaces a traditional "How It Works" page with an immersive, mission-control-grade experience. Clicking a capsule morphs into a rich feature deep-dive overlay.
- **Traditional Mode** -- A persistent top navigation bar provides conventional access to Solutions, Pricing, About, and Security pages. These are standard Next.js pages optimized for SEO and direct linking.

This dual-mode approach means a visitor can explore the product through the spatial interface (the differentiator) OR navigate traditionally (the familiar path). No visitor is stranded.

### 2.2 Complete Information Architecture

```
/                                   Gateway (cinematic boot sequence)
|
/launch                             Mission Control Hub (spatial ZUI)
|                                   - 6 capsule ring (interactive product tour)
|                                   - Morph overlays for feature deep-dives
|                                   - Top nav bar with site navigation
|                                   - Persistent "Request Demo" CTA
|
+-- /launch/solutions               Solutions Overview (all verticals)
|   +-- /launch/solutions/k12       K-12 Schools
|   +-- /launch/solutions/higher-ed Colleges & Universities
|   +-- /launch/solutions/faith     Churches & Faith Organizations
|   +-- /launch/solutions/youth-sports  Youth Sports Organizations
|   +-- /launch/solutions/corporate Business & Corporate Travel
|
+-- /launch/pricing                 Pricing (tiered: T1/T2/T3)
|
+-- /launch/about                   About Safetrekr
|
+-- /launch/security                Security & Compliance
|
+-- /launch/contact                 Contact / Request Demo Form
|
+-- /launch/blog                    Blog & Resources (Phase 2)
|
+-- /launch/legal
    +-- /launch/legal/terms         Terms of Service
    +-- /launch/legal/privacy       Privacy Policy
```

### 2.3 Primary Navigation (Top Bar Overlay)

The top navigation bar sits on top of the spatial ZUI as a fixed overlay (similar to how `NavigationHUD` already works). It provides:

| Position | Element |
|----------|---------|
| Left | Safetrekr logo (links to `/launch`) |
| Center | Solutions (dropdown) / Pricing / About / Security |
| Right | Sign In (text link) / **Request Demo** (primary CTA button) |

The "How It Works" entry is intentionally absent from the top nav because the entire `/launch` page IS the interactive "how it works" experience. Clicking the Safetrekr logo returns you to it.

### 2.4 Secondary Navigation (Footer)

| Column 1: Product | Column 2: Solutions | Column 3: Company | Column 4: Legal |
|-------------------|--------------------|--------------------|-----------------|
| How It Works (→ /launch) | K-12 Schools | About | Terms of Service |
| Trip Planning | Higher Education | Blog | Privacy Policy |
| Safety Intelligence | Faith Organizations | Careers | Cookie Policy |
| Analyst Review | Youth Sports | Contact | |
| Traveler App | Corporate Travel | | |
| Command Center | | | |

### 2.5 Rationale for Diverging from Owner's Initial Proposal

The owner proposed: How It Works, Solutions, Pricing, About, Security as the five primary nav cards.

I am recommending these as the five primary nav links in the TOP BAR, but NOT as capsule ring items. Here is why:

1. **"How It Works" IS the capsule ring.** The spatial ZUI with its 6 product-capability capsules is the most compelling "how it works" experience imaginable. Making it a separate page accessed via a capsule would be recursive and confusing. The entire launch page tells the "how it works" story spatially.

2. **"Pricing" as a spatial capsule adds friction.** A buyer who wants to see pricing wants a clean, scannable table. Forcing them through a morph animation to see dollar amounts is friction. Pricing should be a traditional page accessible from the top nav.

3. **"Solutions" as a capsule misuses the morph system.** Solution pages are vertical-specific content (K-12, Church, etc.) that need SEO-optimized copy, testimonials, and vertical-specific screenshots. These are traditional marketing pages, not spatial experiences.

4. **"Security" and "About" are trust pages.** They exist to answer "can I trust you?" and are typically consulted mid-funnel, not as primary exploration targets. They belong in the top nav, not the capsule ring.

The capsule ring's power is in telling the PRODUCT STORY -- what Safetrekr does at each stage of the trip safety lifecycle. That story is: Plan, Protect, Review, Deliver, Command. This is what the capsules should represent.

---

## 3. Launch Page Vision

### 3.1 The Central Metaphor

The spatial ZUI's mission-control aesthetic is not just decorative -- it IS the product metaphor. Safetrekr is a safety command center. The marketing site should feel like stepping into that command center for the first time. The ambient effects, the telemetry bars, the dot grid, the range rings -- all of these reinforce the message: *this is serious infrastructure for serious safety work*.

The launch page should make a visitor think: "If their marketing site feels like a mission control center, imagine what the actual product feels like."

### 3.2 Capsule Ring Mapping

The 6 capsules in the ring map to Safetrekr's core capability domains. Each capsule uses the existing `CapsuleData` structure but with Safetrekr-appropriate content.

#### Capsule 1: PLAN (Ring Index 0, Top Position)

- **Display Name:** Trip Planning
- **Short Name:** PLAN
- **Tagline on capsule:** "10-step guided trip creation"
- **Mock Telemetry:**
  - Health: `OPERATIONAL`
  - Pulse: "3 tiers" (T1/T2/T3)
  - Last Event: "Wizard complete"
  - Alerts: 0
  - Freshness: "LIVE"
- **Sparkline:** Ascending curve (trips created over time)
- **Morph Overlay Content:** Trip planning wizard walkthrough, complexity tiers explanation, roster management, flight/lodging/venue capture, itinerary builder

#### Capsule 2: SHIELD (Ring Index 1)

- **Display Name:** Safety Intelligence
- **Short Name:** SHIELD
- **Tagline on capsule:** "24/7 real-time threat monitoring"
- **Mock Telemetry:**
  - Health: `OPERATIONAL`
  - Pulse: "24/7 active"
  - Last Event: "Alert triaged"
  - Alerts: 3 (shows active monitoring)
  - Freshness: "LIVE"
- **Sparkline:** Fluctuating signal pattern (intelligence feed activity)
- **Morph Overlay Content:** TarvaRI intelligence engine, alert classification (weather/security/health/transport/political), risk scoring with percentile bands, acknowledgment workflow, triage pipeline

#### Capsule 3: VERIFY (Ring Index 2)

- **Display Name:** Safety Review
- **Short Name:** VERIFY
- **Tagline on capsule:** "Independent analyst verification"
- **Mock Telemetry:**
  - Health: `OPERATIONAL`
  - Pulse: "18 dimensions"
  - Last Event: "Trip approved"
  - Alerts: 0
  - Freshness: "LIVE"
- **Sparkline:** Step function (review completions)
- **Morph Overlay Content:** Separation of duties, 18-section analyst workspace, tiered analyst assignment, approval workflow, evidence and activity tracking, calibration module

#### Capsule 4: GUARD (Ring Index 3)

- **Display Name:** Emergency Preparedness
- **Short Name:** GUARD
- **Tagline on capsule:** "46-endpoint protection system"
- **Mock Telemetry:**
  - Health: `OPERATIONAL`
  - Pulse: "Zones active"
  - Last Event: "Rally point set"
  - Alerts: 0
  - Freshness: "LIVE"
- **Sparkline:** Steady high line (protection coverage)
- **Morph Overlay Content:** Rally points + safe houses with automatic geofence sync, evacuation plans (3-tier), medical facility directory with trauma levels, emergency kit profiles, emergency contacts, SMS broadcast

#### Capsule 5: DELIVER (Ring Index 4)

- **Display Name:** Traveler App
- **Short Name:** DELIVER
- **Tagline on capsule:** "Safety in every pocket"
- **Mock Telemetry:**
  - Health: `OPERATIONAL`
  - Pulse: "Offline-first"
  - Last Event: "Checklist ack'd"
  - Alerts: 0
  - Freshness: "LIVE"
- **Sparkline:** Pulse pattern (app engagement)
- **Morph Overlay Content:** Native mobile app showcase, offline-first architecture, geo-triggered checklist delivery, real-time intel alerts on device, document submission, geofence monitoring with violation alerts, SMS emergency broadcast, trip packets

#### Capsule 6: COMMAND (Ring Index 5)

- **Display Name:** Command Center
- **Short Name:** COMMAND
- **Tagline on capsule:** "Complete program oversight"
- **Mock Telemetry:**
  - Health: `OPERATIONAL`
  - Pulse: "All systems"
  - Last Event: "Status: nominal"
  - Alerts: 0
  - Freshness: "LIVE"
- **Sparkline:** Smooth operational curve
- **Morph Overlay Content:** HQ Console overview, organization management across 5 verticals, analyst roster and workload, queue management, checklist template library, policy management, finance module, system health monitoring

### 3.3 Center Hub Glyph

The existing `hub-center-glyph.tsx` should be updated to display:

- The Safetrekr shield icon (or logo mark)
- Below it: **"Mission Control for Group Travel Safety"**
- Subtle breathing glow in Safetrekr green (`#4BA467`)

### 3.4 Ambient Effect Recontextualization

The ambient effects are all reusable but should be recontextualized in copy and data:

| Existing Component | Current Content | Safetrekr Content |
|-------------------|-----------------|-------------------|
| `SystemStatusPanel` | Generic system metrics | "Platform Status: Operational", "Active Trips: 847", "Travelers Protected: 12,400" |
| `FeedPanel` | Dev tool activity feed | Simulated safety event feed: "Trip STK-2847 approved", "Intel alert: Weather advisory - Barcelona", "Checklist acknowledged: Pre-departure (Johnson group)" |
| `ActivityTicker` | Generic activity | Scrolling Safetrekr activity: trip submissions, analyst reviews, alert acknowledgments |
| `TopTelemetryBar` | System telemetry | "Organizations: 340 | Active Trips: 847 | Travelers: 12.4K | Alerts Triaged: 98.7%" |
| `BottomStatusStrip` | Status data | "Safetrekr v2.0 | All Systems Operational | Last Intel Update: 2m ago" |
| `OrbitalReadouts` | Technical readouts | Trip safety metrics in orbital positions |
| `RadialGaugeCluster` | Generic gauges | Compliance rate, coverage %, response readiness |
| `SignalPulseMonitor` | Signal data | Intelligence feed pulse visualization |

These ambient elements create the "living command center" atmosphere. They do not need functional backend connections -- static or slowly-cycling mock data is appropriate for a marketing site.

### 3.5 Constellation View (Z0)

When zoomed all the way out, the ConstellationView shows the 6 capsules as compact beacons. Update:

- Beacon codes: `PL` (Plan), `SH` (Shield), `VE` (Verify), `GU` (Guard), `DE` (Deliver), `CO` (Command)
- Global metrics: "Organizations: 340", "Active Trips: 847", "System Pulse: OPERATIONAL"

### 3.6 Navigation Overlay

A new top navigation bar overlays the spatial interface. It must:

- Be fixed-position at the top (z-index above ZUI, below command palette)
- Have a transparent/glass background that does not obscure the spatial feel
- Collapse to a hamburger on mobile
- Include the Safetrekr logo, nav links, and "Request Demo" CTA
- Remain visible during morph transitions (unlike ambient elements that fade)

### 3.7 Mobile Considerations

The spatial ZUI is designed for mouse/trackpad interaction. On mobile:

- The capsule ring should be accessible via scroll or swipe
- Consider a simplified mobile layout: vertical card stack instead of spatial ring
- The morph overlay works well on mobile (it is already a full-screen overlay)
- The top nav becomes a hamburger menu
- The gateway boot sequence should be shortened on mobile (< 5 seconds)

---

## 4. Technical Architecture for the Marketing Site

### 4.1 Codebase Restructuring Overview

The restructuring is primarily a **content replacement** exercise. The spatial engine, animation system, and component architecture are production-ready and should not change. What changes is the domain-specific content flowing through those systems.

```
KEEP AS-IS (0 changes):
  src/components/spatial/          -- Entire ZUI engine
  src/stores/camera.store.ts       -- Camera state
  src/hooks/use-pan.ts             -- Pan interaction
  src/hooks/use-zoom.ts            -- Zoom interaction
  src/hooks/use-fly-to.ts          -- Camera navigation
  src/hooks/use-morph-choreography.ts -- Morph state machine
  src/hooks/use-viewport-cull.ts   -- Viewport culling
  src/hooks/use-pan-pause.ts       -- Pan detection
  src/hooks/use-semantic-zoom.ts   -- Zoom level detection
  src/lib/spatial-math.ts          -- Coordinate transforms
  src/lib/constants.ts             -- Spatial constants
  src/lib/morph-types.ts           -- Morph geometry
  src/components/spatial/SpatialViewport.tsx
  src/components/spatial/SpatialCanvas.tsx
  src/components/spatial/CommandPalette.tsx (repurpose commands)
  src/components/spatial/Minimap.tsx
  src/components/spatial/ZoomIndicator.tsx
  src/components/spatial/NavigationHUD.tsx
  src/components/spatial/ViewportCuller.tsx
  src/styles/atrium.css
  src/styles/morph.css
  src/styles/constellation.css
  src/styles/enrichment.css
  src/styles/district-view.css
  src/styles/gateway.css

MODIFY (content changes, structure preserved):
  src/lib/interfaces/district.ts   -- Rename IDs, update types
  src/components/districts/district-capsule.tsx  -- Update labels
  src/components/districts/capsule-ring.tsx       -- No structural changes
  src/components/districts/capsule-telemetry.tsx  -- Relabel fields
  src/components/districts/constellation-view.tsx -- Update codes/metrics
  src/components/districts/hub-center-glyph.tsx   -- Safetrekr branding
  src/components/districts/morph-orchestrator.tsx  -- No structural changes
  src/components/districts/detail-panel.tsx        -- Marketing summary + CTA
  src/components/district-view/district-view-overlay.tsx  -- Update tints
  src/components/district-view/district-view-header.tsx   -- Update labels
  src/components/district-view/district-view-dock.tsx     -- Marketing CTAs
  src/components/ambient/system-status-panel.tsx   -- Safetrekr metrics
  src/components/ambient/feed-panel.tsx            -- Safety event feed
  src/components/ambient/activity-ticker.tsx       -- Safetrekr activity
  src/components/ambient/top-telemetry-bar.tsx     -- Platform stats
  src/components/ambient/bottom-status-strip.tsx   -- Safetrekr status
  src/components/ambient/orbital-readouts.tsx      -- Safety metrics
  src/components/ambient/radial-gauge-cluster.tsx  -- Compliance gauges
  src/components/ambient/signal-pulse-monitor.tsx  -- Intel feed pulse
  src/app/launch/page.tsx          -- Remove Evidence Ledger, update data
  src/app/page.tsx                 -- Update gateway copy if needed

REPLACE (new content, same component interfaces):
  src/components/district-view/scenes/  -- All 6 scene files
    plan-scene.tsx          (was agent-builder-scene.tsx)
    shield-scene.tsx        (was tarva-chat-scene.tsx)
    verify-scene.tsx        (was project-room-scene.tsx)
    guard-scene.tsx         (was tarva-core-scene.tsx)
    deliver-scene.tsx       (was tarva-erp-scene.tsx)
    command-scene.tsx       (was tarva-code-scene.tsx)

ADD (new files):
  src/components/marketing/
    MarketingNav.tsx         -- Top navigation bar overlay
    MarketingFooter.tsx      -- Footer with sitemap links
    RequestDemoModal.tsx     -- Demo request form (modal)
    SocialProofBar.tsx       -- Trust signals strip
    VerticalHero.tsx         -- Reusable vertical page hero
    FeatureGrid.tsx          -- Reusable feature grid layout
    PricingTier.tsx          -- Pricing card component
    TestimonialCard.tsx      -- Customer testimonial
  src/app/launch/layout.tsx  -- Updated with nav + footer
  src/app/launch/solutions/
    page.tsx                 -- Solutions overview
    k12/page.tsx
    higher-ed/page.tsx
    faith/page.tsx
    youth-sports/page.tsx
    corporate/page.tsx
  src/app/launch/pricing/page.tsx
  src/app/launch/about/page.tsx
  src/app/launch/security/page.tsx
  src/app/launch/contact/page.tsx
  src/app/launch/legal/
    terms/page.tsx
    privacy/page.tsx

REMOVE:
  src/components/evidence-ledger/  -- Not relevant to marketing
  src/app/api/districts/           -- Tarva district API routes
  src/app/api/ai/                  -- AI chat routes (not needed for marketing)
  src/app/api/receipts/            -- Receipt store routes
  src/app/api/snapshots/           -- Snapshot routes
  src/app/api/telemetry/           -- Telemetry routes
```

### 4.2 District Type Redefinition

The core type change in `src/lib/interfaces/district.ts`:

```typescript
// FROM:
export type DistrictId =
  | 'agent-builder'
  | 'tarva-chat'
  | 'project-room'
  | 'tarva-core'
  | 'tarva-erp'
  | 'tarva-code'

// TO:
export type DistrictId =
  | 'plan'
  | 'shield'
  | 'verify'
  | 'guard'
  | 'deliver'
  | 'command'
```

The `CapsuleTelemetry` interface keeps the same shape but the semantic meaning shifts. No interface changes needed -- just different data values in `MOCK_CAPSULE_DATA`.

The `DISTRICTS` array updates:

```typescript
export const DISTRICTS: readonly DistrictMeta[] = [
  { id: 'plan',    displayName: 'Trip Planning',        shortName: 'PLAN',    ringIndex: 0, port: null },
  { id: 'shield',  displayName: 'Safety Intelligence',  shortName: 'SHIELD',  ringIndex: 1, port: null },
  { id: 'verify',  displayName: 'Safety Review',        shortName: 'VERIFY',  ringIndex: 2, port: null },
  { id: 'guard',   displayName: 'Emergency Preparedness', shortName: 'GUARD', ringIndex: 3, port: null },
  { id: 'deliver', displayName: 'Traveler App',         shortName: 'DELIVER', ringIndex: 4, port: null },
  { id: 'command', displayName: 'Command Center',       shortName: 'COMMAND', ringIndex: 5, port: null },
] as const
```

All ports are `null` since these are not dev server endpoints.

The `DistrictCode` type for Z0 beacons updates:

```typescript
export type DistrictCode = 'PL' | 'SH' | 'VE' | 'GU' | 'DE' | 'CO'

export const DISTRICT_CODES: Record<DistrictId, DistrictCode> = {
  'plan': 'PL',
  'shield': 'SH',
  'verify': 'VE',
  'guard': 'GU',
  'deliver': 'DE',
  'command': 'CO',
} as const
```

### 4.3 Launch Layout Update

The current `/launch/layout.tsx` is a bare passthrough. It needs to wrap children with the marketing navigation and footer, but ONLY for non-ZUI pages. The ZUI page (`/launch/page.tsx`) handles its own navigation overlay.

Recommended approach: Use a route group to separate the ZUI page from traditional pages.

```
src/app/launch/
  page.tsx                    -- ZUI page (no layout wrapper)
  (marketing)/                -- Route group for traditional pages
    layout.tsx                -- Wraps with MarketingNav + MarketingFooter
    solutions/page.tsx
    pricing/page.tsx
    about/page.tsx
    security/page.tsx
    contact/page.tsx
    legal/terms/page.tsx
    legal/privacy/page.tsx
```

The ZUI page adds its own `<MarketingNav />` component as a fixed overlay, similar to how `NavigationHUD` already works. The marketing nav appears on both the ZUI page and traditional pages, but the footer only appears on traditional pages.

### 4.4 Morph Overlay Content Architecture

Each morph overlay scene (the content that appears when a capsule is clicked and the morph animation completes) should follow a consistent structure:

```
MarketingScene
  +-- SceneHero (headline + subheadline + hero visual)
  +-- SceneFeatureGrid (3-6 feature cards with icons)
  +-- SceneScreenshot (product screenshot or mockup)
  +-- SceneSocialProof (testimonial or stat callout)
  +-- SceneCTA ("Request Demo" button)
```

The `shared-scene-primitives.tsx` file already provides reusable primitives for scene construction. These should be extended with marketing-specific primitives (headline typography, feature card layouts, CTA buttons).

### 4.5 SEO Architecture

Each traditional page needs:

- `generateMetadata()` export with title, description, OpenGraph, and Twitter card metadata
- Structured data (JSON-LD) for Organization, Product, and FAQ schemas
- Proper heading hierarchy (single H1 per page)
- Alt text on all images
- Canonical URLs

The ZUI page (`/launch`) presents a unique SEO challenge: its content is client-rendered and behind interaction gates (morph overlays). Mitigations:

1. The morph overlay content should also be crawlable. Use the `?district={id}` URL pattern to deep-link into overlays, and ensure server-rendered fallback content exists.
2. Add a `<noscript>` block with a text-only summary of all 6 capability areas.
3. Create a comprehensive sitemap at `/sitemap.xml` that includes all traditional pages and all `?district=` variants.
4. The traditional pages (Solutions, Pricing, etc.) carry the primary SEO weight. The ZUI page is the experiential layer.

### 4.6 Performance Considerations

The ZUI page is already optimized with:
- `useCameraStore.subscribe()` for direct DOM writes (bypasses React reconciliation)
- `ViewportCuller` for off-screen element culling
- `ZoomGate` for semantic-zoom-based rendering
- `usePanPause` for disabling expensive effects during camera motion
- CSS `contain` properties on capsules

For the marketing site specifically:
- Traditional pages should be Server Components by default (only client components where interaction is needed)
- Images should use `next/image` with proper sizing and lazy loading
- The gateway boot sequence should support `prefers-reduced-motion` (already has `usePrefersReducedMotion`)
- Consider a "Skip to Content" link for accessibility on the gateway page
- Marketing page content should be statically generated at build time (`generateStaticParams`)

### 4.7 Analytics Integration

Add analytics tracking for:
- Gateway completion rate (how many visitors complete the boot sequence)
- Capsule click distribution (which product areas get the most interest)
- Morph overlay engagement time (how long visitors spend in each deep-dive)
- "Request Demo" CTA click-through rate by source (which page/capsule drives conversions)
- Scroll depth on traditional pages
- Solutions vertical page visits (which verticals have the most demand)

Recommended: Posthog or Plausible for privacy-respecting analytics. Avoid Google Analytics for a security-focused product (brand alignment).

---

## 5. Content Strategy per Page

### 5.1 Gateway Page (/)

**Purpose:** Cinematic first impression. Communicates "this is not a typical SaaS website."

**Content:** Already built. The boot sequence should be reviewed to ensure all copy references Safetrekr (not Tarva) and the messaging aligns with "mission control for group travel safety."

**Key Message:** "Safetrekr is initializing. Safety intelligence systems coming online."

**Duration:** Under 10 seconds. Skip button available.

**Exit Paths:** "Enter Mission Control" (to /launch) and "Read the Brief" (to /launch/about or a simplified overview page).

---

### 5.2 Launch Page (/launch) -- The Interactive Product Tour

**Purpose:** The core product story told through an immersive spatial interface.

**Content:** The capsule ring with 6 capability domains, ambient effects showing simulated platform activity, and morph overlays with feature deep-dives.

**Key Message:** "Everything your organization needs to ensure every traveler returns safely."

**User Journey:**
1. Visitor arrives, sees the capsule ring with 6 labeled cards floating in the command-center environment
2. Ambient effects (status panels, feed panels, telemetry bars) create atmosphere and communicate scale
3. Visitor clicks a capsule of interest
4. Morph transition reveals a rich feature overview for that capability domain
5. Feature overview includes a "Request Demo" CTA
6. Visitor can close the overlay (Escape or back button) and explore other capsules
7. Top nav provides access to traditional pages at any time

**Capsule Morph Overlay Content:**

#### PLAN Overlay (Trip Planning)

- **Hero:** "From day trips to international travel, plan every detail in one guided workflow."
- **Feature Grid:**
  - 10-Step Trip Wizard -- "Guided creation captures every detail a safety reviewer needs"
  - 3 Complexity Tiers -- "T1 day trips, T2 domestic overnight, T3 international -- pay only for what you need"
  - Roster Management -- "Persistent traveler registry with intelligent matching and bulk import"
  - Flight & Lodging -- "Auto-populated flight data, fire safety floor flagging, venue categorization"
  - Itinerary Builder -- "Day-by-day event scheduling with auto-populated transportation legs"
  - Document Collection -- "9 document types with role-based requirements, due dates, and automated reminders"
- **Product Proof:** "Trip detail view with 18 tabs provides a single source of truth from draft to completion"
- **CTA:** "See How Organizations Plan Safer Trips"

#### SHIELD Overlay (Safety Intelligence)

- **Hero:** "Real-time threat intelligence delivered to the people who need it, when they need it."
- **Feature Grid:**
  - TarvaRI Intelligence Engine -- "Continuous monitoring across weather, security, health, transport, and political categories"
  - Risk Scoring -- "Percentile-banded risk scores (P5/P50/P95) distinguish elevated risk from specific threats"
  - Alert Triage -- "Analysts review, approve, and route alerts with delivery audience targeting"
  - Acknowledgment Tracking -- "Know that every traveler, chaperone, and guardian received and reviewed critical alerts"
  - Live Mobile Delivery -- "Alerts pushed directly to the Traveler App with in-app acknowledgment"
  - Continuous Feed -- "Severity-coded, filterable alert stream across all portals"
- **Product Proof:** "Multi-stage pipeline: ingestion, normalization, bundling, risk scoring, triage, and acknowledged delivery"
- **CTA:** "Learn How Safetrekr Monitors Your Destinations"

#### VERIFY Overlay (Independent Safety Review)

- **Hero:** "Every trip independently reviewed by a qualified safety analyst before anyone travels."
- **Feature Grid:**
  - Separation of Duties -- "The person planning the trip is never the person approving it"
  - 18-Dimension Review -- "Analysts verify lodging, transport, emergency preparedness, background checks, documents, and 12 more dimensions"
  - Tiered Analyst Assignment -- "Junior analysts handle day trips; senior analysts handle international -- matched to complexity"
  - Evidence Tracking -- "Complete audit trail of every review action, status change, and system event"
  - Calibration Module -- "Benchmark criteria and consistency checking maintain review quality across the analyst team"
  - Approval Workflow -- "Approve, reject, or conditionally approve with documented reason codes"
- **Product Proof:** "Defensible compliance record: every trip carries a documented chain of evidence from planning through approval"
- **CTA:** "See Why Independent Review Matters"

#### GUARD Overlay (Emergency Preparedness)

- **Hero:** "When something goes wrong, your team knows exactly what to do and where to go."
- **Feature Grid:**
  - 46-Endpoint Protection API -- "Rally points, safe houses, musters, and check-ins with full lifecycle management"
  - Automatic Geofencing -- "Rally points and safe houses automatically create monitored geofence zones"
  - Evacuation Planning -- "Three-tier escalation: shelter in place, local evacuation, and full relocation"
  - Medical Facility Directory -- "Nearby hospitals catalogued by trauma level with travel time estimates"
  - Emergency Kit Profiles -- "AI-recommended medical kit based on group composition, environment, and response time"
  - SMS Emergency Broadcast -- "Chaperones send instant SMS to all trip participants from the app"
- **Product Proof:** "Protection resources automatically synchronize with the mobile geofencing system -- when a rally point is created, the Traveler App starts monitoring it immediately"
- **CTA:** "See How Safetrekr Protects Your Travelers"

#### DELIVER Overlay (Traveler App)

- **Hero:** "Every traveler carries your safety plan in their pocket -- online or offline."
- **Feature Grid:**
  - Offline-First Architecture -- "SQLite-backed queue ensures functionality without network connectivity"
  - Geo-Triggered Checklists -- "Context-appropriate safety guidance activated when travelers arrive at designated zones"
  - Background Geofencing -- "Continuous location monitoring with violation alerts and chaperone visibility"
  - Real-Time Alerts -- "Intelligence alerts pushed live to participants with acknowledgment tracking"
  - Document Submission -- "Travelers submit consents and documents directly through the app"
  - Emergency Info -- "Contacts, local services, medical facilities, and evacuation plans on-device"
- **Product Proof:** "The app works even without internet. When connectivity returns, all actions sync automatically -- no data is lost"
- **CTA:** "See the Traveler App in Action"

#### COMMAND Overlay (Command Center)

- **Hero:** "Complete visibility across every organization, every trip, and every traveler in your program."
- **Feature Grid:**
  - Organization Management -- "Manage organizations across 5 verticals with status, plan, and credit tracking"
  - Analyst Roster -- "Per-analyst workload metrics, tier management, and performance tracking"
  - Queue Management -- "Tiered review queues with assignment modes and workload balancing"
  - Checklist Library -- "Global template management across 8 safety categories with video and priority support"
  - Finance Module -- "Orders, wallets, and invoices with manual payment processing and aging metrics"
  - System Health -- "Real-time monitoring of Core API, intelligence engine, and database services"
- **Product Proof:** "One dashboard surfaces KPIs across all organizations: total trips, active reviews, open incidents, and system health"
- **CTA:** "See the Full Platform in Action"

---

### 5.3 Solutions Overview (/launch/solutions)

**Purpose:** Show that Safetrekr serves the visitor's specific type of organization.

**Content:**
- Hero: "Purpose-built for organizations that move groups of people"
- 5 vertical cards with icons, brief description, and "Learn More" link
- Common capabilities section: "Every Safetrekr deployment includes..."
- Social proof: logos or stats from organizations in each vertical

**Key Message:** "We understand YOUR specific challenges."

---

### 5.4 Vertical Solutions Pages (/launch/solutions/{vertical})

Each vertical page follows the same structure but with vertical-specific content:

**Structure:**
1. **Vertical Hero** -- Headline addressing the vertical's primary pain point
2. **The Challenge** -- 3-4 bullet points describing the specific safety challenges this vertical faces
3. **How Safetrekr Helps** -- Feature highlights most relevant to this vertical (drawn from the verified product doc, but framed for the audience)
4. **Use Case Walkthrough** -- A concrete example trip from start to finish
5. **Social Proof** -- Testimonial or case study from a similar organization
6. **CTA** -- "Request a Demo for Your [School/Church/Organization]"

**Vertical-Specific Angles:**

| Vertical | Hero Headline | Primary Challenge | Lead Feature |
|----------|--------------|-------------------|--------------|
| K-12 | "Every field trip. Every student. Accounted for." | Paper permission slips, no chaperone screening, no emergency protocol | Document collection + background checks + evacuation plans |
| Higher Ed | "Study abroad programs deserve study-grade safety." | International complexity, student independence, regulatory compliance | T3 international tier + real-time intelligence + geofencing |
| Faith | "Protect the people who serve." | Volunteer screening, mission trip complexity, limited safety infrastructure | Background checks + analyst review + trip packets |
| Youth Sports | "Tournament travel without the safety gap." | Scale of travel weekends, coach screening, parent communication | Roster management + SMS broadcast + bulk import |
| Corporate | "Duty of care for every business traveler." | Compliance reporting, real-time risk monitoring, incident documentation | Intelligence engine + audit trail + command center |

---

### 5.5 Pricing Page (/launch/pricing)

**Purpose:** Transparent, per-trip pricing that aligns cost to risk complexity.

**Content:**

**Hero:** "Safety investment scaled to trip complexity. No per-seat subscriptions."

**Pricing Cards (3 tiers):**

| | T1: Day Trips | T2: Domestic Overnight | T3: International |
|---|---|---|---|
| **Price** | $450 per trip | $750 per trip | $1,250 per trip |
| **Includes** | Guided trip planning, roster management, document collection, safety review, basic emergency preparedness, trip packets | Everything in T1 + lodging safety review, enhanced emergency preparedness, real-time intelligence alerts, traveler app access | Everything in T2 + international intelligence coverage, geo-triggered checklists, full protection system, background geofencing, SMS broadcast |

**Add-Ons:**
- Background Checks: $35 per check
- Travel Insurance: $25 per participant

**Volume Pricing:** "Organizations with high trip volume can purchase credit packages. Contact us for volume pricing."

**FAQ Section:**
- "What counts as a trip?" (one departure-to-return journey for one group)
- "Do we pay per traveler?" (no, per trip -- roster size does not change the price)
- "What if we cancel a trip?" (cancellation policy)
- "Is there a minimum commitment?" (no, pay as you go)
- "Do you offer annual contracts?" (yes, with volume discounts)

**CTA:** "Request Custom Pricing" (for enterprise) + "Start with Your First Trip" (for smaller orgs)

**Framing Note:** Position the price against the cost of NOT having Safetrekr: "The average settlement for a negligence claim involving a student trip exceeds $250,000. Safetrekr's per-trip investment is a fraction of your organization's deductible."

---

### 5.6 About Page (/launch/about)

**Purpose:** Establish credibility and human connection.

**Content:**
- Company mission: "We exist to ensure every traveler returns safely"
- Origin story: Why Safetrekr was built (the gap in group travel safety)
- Team section: Founders and key team members with safety/security backgrounds
- Technology partners: TarvaRI intelligence engine, Stripe, background check providers
- Company stats: Organizations served, trips managed, travelers protected

**Key Message:** "We are safety professionals building tools for safety professionals."

---

### 5.7 Security Page (/launch/security)

**Purpose:** Answer "can I trust Safetrekr with sensitive data about our travelers?"

**Content:**

**Hero:** "Security is not a feature. It is our foundation."

**Sections:**
1. **Data Protection**
   - Supabase-hosted PostgreSQL with Row Level Security
   - Data encryption at rest and in transit
   - Role-based access control (10 system roles)
   - Organization-level data isolation enforced at the database layer

2. **Authentication & Access**
   - JWT session management with automatic token refresh
   - Two-factor authentication support
   - Invite-based account activation (no self-registration)
   - Audit trail for all administrative actions

3. **Privacy & Compliance**
   - GDPR-compliant data export capability
   - User-controlled contact visibility and analytics opt-in
   - 30-day account deletion grace period
   - Consent history tracking with timestamps

4. **Infrastructure**
   - Containerized deployment on Kubernetes
   - Separate development, staging, and production environments
   - Runtime configuration (secrets never in code)
   - System health monitoring dashboard

5. **Operational Security**
   - Independent safety analyst review (separation of duties)
   - Feature flag system for controlled rollouts
   - Policy versioning with activation controls

**CTA:** "Download Our Security Whitepaper" (lead magnet) + "Request Demo"

---

### 5.8 Contact / Request Demo Page (/launch/contact)

**Purpose:** Convert interest into a sales conversation.

**Content:**
- Demo request form: Name, Email, Organization, Organization Type (dropdown: K-12, Higher Ed, Faith, Youth Sports, Business), Estimated Annual Trips, Message
- Alternative contact: Email address, phone number
- Response time commitment: "We respond to every inquiry within one business day"
- What to expect: "A 30-minute personalized demo with a Safetrekr safety consultant"

---

## 6. Conversion Flow

### 6.1 Primary Conversion Path

```
Gateway Boot (/)
  --> "This is serious safety infrastructure"

Launch Page (/launch)
  --> Spatial ZUI creates wow factor + communicates sophistication
  --> Capsule ring invites exploration
  --> Ambient elements reinforce "command center" positioning

Capsule Click --> Morph Overlay
  --> Rich feature content answers "what does this do?"
  --> Each overlay ends with a "Request Demo" CTA

Request Demo CTA
  --> Opens RequestDemoModal (overlay, no page navigation)
  --> OR navigates to /launch/contact for full-page form

Form Submission
  --> Confirmation with "What happens next" explanation
  --> Email notification to Safetrekr sales team
```

### 6.2 Secondary Conversion Paths

**The Researcher Path:**
```
Gateway --> Launch --> Top Nav: Solutions --> Vertical Page --> CTA
```
For visitors who want to see if Safetrekr serves their specific type of organization before engaging.

**The Validator Path:**
```
Gateway --> Launch --> Top Nav: Security --> Read security details --> CTA
```
For IT/security stakeholders who need to vet the platform before recommending it.

**The Budget Holder Path:**
```
Gateway --> Launch --> Top Nav: Pricing --> Review tiers --> CTA
```
For administrators who need cost information to build a business case.

**The Direct Path:**
```
Gateway --> Launch --> Top Nav: Request Demo --> Form
```
For visitors who already know what Safetrekr is and want to talk to sales immediately.

### 6.3 CTA Hierarchy

| Priority | CTA | Placement | Style |
|----------|-----|-----------|-------|
| Primary | **Request Demo** | Top nav (persistent), every morph overlay, every page bottom | Solid green button, high contrast |
| Secondary | **Contact Us** | Footer, about page, pricing page | Text link or outlined button |
| Tertiary | **Download Safety Checklist** | Blog posts, solutions pages | Lead magnet form, lower commitment |
| Quaternary | **Sign In** | Top nav (for existing customers returning) | Text link, subdued |

### 6.4 Trust Signals

Trust signals should appear throughout the site to reduce friction:

**Quantitative:**
- "X organizations trust Safetrekr" (when available)
- "Y trips managed safely" (when available)
- "Z travelers protected" (when available)
- "98.7% analyst approval rate on first review"

**Qualitative:**
- Customer testimonials (by vertical)
- Case studies (phase 2)
- Security certifications/badges
- Background check provider logos (Checkr, Sterling, GoodHire)
- Payment processing badge (Stripe)

**Structural:**
- The spatial interface itself communicates enterprise-grade sophistication
- The independent analyst review model communicates institutional seriousness
- The 46-endpoint protection API statistic communicates depth of engineering
- The 4-portal architecture communicates separation of concerns

### 6.5 Objection Handling Through Content

Each potential objection should be addressed proactively in the content:

| Objection | Where Addressed | How |
|-----------|----------------|-----|
| "This looks complex" | Launch page, Solutions vertical pages | Emphasize guided wizard, per-vertical use cases, "no training required" language |
| "We already use spreadsheets" | Solutions pages, PLAN overlay | "Replace scattered spreadsheets with a single auditable system" |
| "It is too expensive" | Pricing page | Frame against cost of incidents, highlight per-trip (not per-seat) pricing |
| "Is our data safe?" | Security page | Dedicated security page with RLS, encryption, compliance details |
| "Does it work for our type of org?" | Solutions vertical pages | Vertical-specific content with relevant challenges and features |
| "Our trips are simple" | Pricing page, PLAN overlay | T1 tier exists specifically for day trips at $450 |
| "We do not travel internationally" | Pricing page, PLAN overlay | T1 and T2 tiers handle domestic travel; T3 is optional |
| "We need to see it first" | Every page CTA | "Request Demo" is the primary conversion action, not self-service signup |

### 6.6 Post-Conversion Experience

After form submission:
1. Immediate: Confirmation screen with "What happens next" timeline
2. Within 1 hour: Automated email confirming receipt with Safetrekr brand elements
3. Within 1 business day: Personal email from Safetrekr sales consultant
4. Within 3 business days: 30-minute personalized demo scheduled

---

## Appendix A: Implementation Priority

### Phase 1 (Launch-Critical)

1. Update `district.ts` type definitions and mock data
2. Update capsule telemetry labels and hub glyph
3. Create 6 marketing morph overlay scenes
4. Add `MarketingNav` component with site navigation
5. Create pricing page
6. Create contact/request demo page with form
7. Update ambient effects with Safetrekr-contextual data
8. Update constellation view codes and metrics
9. SEO metadata on all pages
10. Mobile responsive check on ZUI + traditional pages

### Phase 2 (Post-Launch)

1. Create 5 vertical solutions pages with industry-specific content
2. Create about page with team section
3. Create security page with detailed trust content
4. Add analytics tracking (capsule clicks, overlay engagement, CTA clicks)
5. Add blog/resources section
6. Create legal pages (terms, privacy)
7. Implement "Download Safety Checklist" lead magnet
8. Customer testimonials and social proof integration

### Phase 3 (Growth)

1. A/B test gateway skip rate vs. completion rate
2. Optimize capsule order based on engagement data
3. Add interactive product screenshots/mockups in morph overlays
4. Video content for complex features (geofencing demo, analyst workflow)
5. SEO-optimized blog content calendar
6. Case study pages by vertical
7. Live demo environment ("Try Safetrekr" sandbox)

---

## Appendix B: Component Reuse Summary

| Component Category | Total Files | Keep | Modify | Replace | Remove |
|-------------------|------------|------|--------|---------|--------|
| Spatial Engine | 8 | 8 | 0 | 0 | 0 |
| Ambient Effects | 30 | 14 | 10 | 0 | 6 |
| District Components | 19 | 8 | 8 | 0 | 3 |
| District View | 12 | 4 | 2 | 6 | 0 |
| Hooks | 12 | 12 | 0 | 0 | 0 |
| Stores | 10 | 6 | 1 | 0 | 3 |
| Styles | 6 | 6 | 0 | 0 | 0 |
| **Total** | **97** | **58 (60%)** | **21 (22%)** | **6 (6%)** | **12 (12%)** |

**Bottom Line:** 82% of the existing codebase is directly reusable (keep or modify). Only 6% requires replacement (the 6 scene content files). 12% can be removed (Tarva-specific API routes and Evidence Ledger). The spatial engine, animation system, and ZUI infrastructure require zero changes.

---

*This review covers the full scope of the Safetrekr marketing site transformation. The recommendations are designed to preserve the significant engineering investment in the spatial ZUI while redirecting its power toward converting safety professionals into Safetrekr customers. The mission-control metaphor is not just aesthetically distinctive -- it is strategically aligned with the product's positioning as serious infrastructure for serious safety work.*
