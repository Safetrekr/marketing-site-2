# WS-C.3: Analytics Integration

> **Workstream ID:** WS-C.3
> **Phase:** C -- Integration & Polish
> **Assigned Agent:** `world-class-digital-marketing-lead` (strategy + specification) -> `react-developer` (implementation)
> **Status:** Draft
> **Created:** 2026-03-02
> **Last Updated:** 2026-03-02
> **Depends On:** WS-A.1 (Marketing Route Group + Layout -- script placement in root layout), WS-A.4 (Form Backend -- form_submit event source)
> **Blocks:** None
> **Resolves:** AD-6 (Analytics Integration Approach), Q-9 (GA4 Property -- partially; property ID still needed)

---

## 1. Objective

Instrument the Safetrekr marketing site with Google Analytics 4 so that every meaningful visitor interaction -- from the first gateway destination choice through pricing page engagement to briefing request submission -- is captured, attributed, and reportable from day one.

This workstream delivers three things:

1. **GA4 script installation** in the Next.js root layout via `next/script` with `strategy="afterInteractive"`, ensuring analytics loads without blocking initial paint.
2. **A typed analytics helper module** (`src/lib/analytics.ts`) that provides a single `trackEvent()` function and named event constants, so every component across the site fires events through one controlled interface rather than scattering raw `gtag()` calls.
3. **A complete event taxonomy and measurement plan** that maps every tracked interaction to a business question the team needs answered at launch.

The target audience -- security directors, safety officers, and risk managers at K-12 schools, churches, youth sports organizations, higher education institutions, and businesses -- arrives through organic search, referrals, and direct visits. The analytics implementation must answer one question above all others: **which content paths produce briefing requests, and which create friction?**

This is a strategy and specification workstream. The digital marketing lead defines the event taxonomy, conversion definitions, data layer structure, and measurement plan. The react developer implements the code. Every specification below is written to be implementable without consulting external GA4 documentation.

---

## 2. Scope

### In Scope

| # | Item | Notes |
|---|------|-------|
| 1 | GA4 `gtag.js` script injection in root layout | `next/script` in `src/app/layout.tsx` with `strategy="afterInteractive"` |
| 2 | Analytics helper module | `src/lib/analytics.ts` -- typed `trackEvent()`, `trackConversion()`, consent guard, event constants |
| 3 | Analytics type definitions | `src/lib/interfaces/analytics.ts` -- `AnalyticsEvent`, `AnalyticsEventMap`, event parameter types |
| 4 | Event taxonomy | 18 custom events across 5 categories (gateway, navigation, engagement, conversion, ZUI) |
| 5 | Conversion event definitions | 3 GA4 conversion events: `form_submit`, `cta_click`, `gateway_choice` |
| 6 | Event binding on gateway components | `choice-reveal.tsx`, `district-dock.tsx` -- gateway_choice and capsule_click events |
| 7 | Event binding on marketing page CTAs | All `BreathingCTA` instances with `data-analytics-id` attributes -- cta_click events |
| 8 | Event binding on contact form | `contact-form.tsx` -- form_submit event on successful submission |
| 9 | Event binding on pricing page | Tier CTA clicks, enterprise CTA, FAQ toggles, bottom CTA |
| 10 | Scroll depth tracking | 25%, 50%, 75%, 100% thresholds via Intersection Observer |
| 11 | GA4 property configuration spec | Documented configuration for the GA4 property (data streams, conversions, audiences, custom dimensions) |
| 12 | Measurement plan | Business questions mapped to events, metrics, and reporting cadences |
| 13 | Reporting dashboard specification | 3 GA4 Explore reports + 1 custom dashboard layout |

### Out of Scope

| # | Item | Rationale |
|---|------|-----------|
| 1 | Google Tag Manager (GTM) | Adds a container layer of complexity unnecessary for a launch with 18 events. Direct gtag.js calls are simpler, faster, and fully sufficient. GTM can be introduced post-launch if marketing operations requires it. |
| 2 | Google Search Console integration | Separate tooling concern. Verified via DNS/meta tag independently of analytics code. |
| 3 | Hotjar, Microsoft Clarity, or session recording | Phase 2 tooling per enterprise-pm-pmo review. Not needed for launch. |
| 4 | Server-side analytics or Measurement Protocol | GA4 client-side gtag.js is sufficient for a marketing site. Server-side tracking is warranted for e-commerce or high-volume SaaS apps, not a pre-revenue marketing site. |
| 5 | A/B testing framework | No traffic baseline exists. A/B testing infrastructure (D-8) is deferred to post-launch. |
| 6 | Enhanced e-commerce events | No checkout flow exists on the marketing site. Purchases happen in the product application. |
| 7 | Cross-domain tracking | Single domain at launch. Cross-domain configuration deferred until product app integration. |
| 8 | Cookie consent banner implementation | GDPR/CCPA consent UX is a separate compliance workstream. The analytics module includes a consent guard that respects a future consent signal, but building the banner UI is not in scope. |
| 9 | Custom GA4 report building (execution) | This SOW specifies the reports. Building them in the GA4 UI is an operational task performed after property creation. |

---

## 3. Input Dependencies

| Dependency | Source | Status | Notes |
|------------|--------|--------|-------|
| Root layout (`src/app/layout.tsx`) | WS-A.1 / Codebase | Available | Server component. GA4 scripts are injected here as children of `<body>`. Currently has no analytics scripts. |
| Marketing layout (`src/app/(marketing)/layout.tsx`) | WS-A.1 | Pending | Marketing pages render inside this layout. No layout-level analytics changes needed -- root layout handles the script. |
| Gateway components (`src/components/gateway/choice-reveal.tsx`, `district-dock.tsx`) | Codebase | Available | `ChoiceReveal` fires `selectDestination('mission-control' | 'marketing')`. `DistrictDock` fires `handleClick(districtId)`. Both need `trackEvent()` calls added. |
| Gateway store (`src/stores/gateway.store.ts`) | Codebase | Available | `selectedDestination: 'mission-control' | 'marketing' | null`. Analytics reads this value for the `gateway_choice` event. |
| Contact form component | WS-A.4 (`src/components/marketing/contact-form.tsx`) | Pending | Form fires `form_submit` event on successful API response. Needs `trackEvent()` call in the success handler. |
| Landing page CTAs | WS-B.2 (`BreathingCTA` component) | Pending | CTAs have `data-analytics-id` attributes (e.g., `landing-hero-cta`, `landing-bottom-cta`). Analytics module reads these for event parameters. |
| Pricing page components | WS-B.5 | Pending | Tier cards, enterprise card, FAQ accordion, bottom CTAs. Event specs already defined in WS-B.5 Section 5.3. |
| GA4 property ID | Business Owner (Q-9) | **BLOCKED** | Property ID (`G-XXXXXXXXXX`) required for script injection. Use environment variable `NEXT_PUBLIC_GA4_ID` so the value is not hardcoded. |
| Domain (Q-8) | Business Owner | **BLOCKED** | Needed for GA4 data stream URL configuration. Assumed `safetrekr.com`. |
| `next/script` | Next.js 16 built-in | Available | Import: `import Script from 'next/script'`. No package installation needed. |

---

## 4. Deliverables

### 4.1 GA4 Script Injection (`src/app/layout.tsx`)

Add two `<Script>` elements to the root layout's `<body>`, after the closing `</ThemeProvider>` tag. The GA4 measurement ID is read from an environment variable so the value never appears in source code and can differ between preview and production deployments.

```typescript
// Add to src/app/layout.tsx

import Script from 'next/script'

// Inside RootLayout, after </ThemeProvider> closing tag, before </body>:

{process.env.NEXT_PUBLIC_GA4_ID && (
  <>
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
      strategy="afterInteractive"
    />
    <Script
      id="ga4-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}', {
            page_path: window.location.pathname,
            send_page_view: true,
          });
        `,
      }}
    />
  </>
)}
```

**Environment variable:**

```env
# .env.local (not committed)
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
```

**Why `strategy="afterInteractive"`:** The script loads after the page becomes interactive, which means it does not block hydration or first paint. This is the correct strategy for analytics -- there is no user-facing functionality that depends on GA4 being loaded synchronously.

**Why conditional rendering:** If `NEXT_PUBLIC_GA4_ID` is not set (e.g., in local development), no analytics scripts load at all. This prevents polluting GA4 data with localhost traffic and avoids console errors during development.

**App Router page view tracking:** GA4 with `send_page_view: true` handles initial page loads automatically. For client-side navigations within the Next.js App Router (which uses the History API), GA4's enhanced measurement "Page changes based on browser history events" setting must be enabled in the GA4 property. This is documented in Section 4.8 (GA4 Property Configuration).

---

### 4.2 Analytics Type Definitions (`src/lib/interfaces/analytics.ts`)

```typescript
// src/lib/interfaces/analytics.ts

/**
 * All custom event names used in the Safetrekr marketing site.
 *
 * Naming convention: snake_case, prefixed by category.
 * - gateway_*   : Cinematic landing page interactions
 * - nav_*       : Navigation interactions
 * - engage_*    : Content engagement signals
 * - convert_*   : Conversion-intent actions
 * - zui_*       : Spatial ZUI interactions
 *
 * GA4 reserves certain event names (e.g., `page_view`, `first_visit`).
 * Custom events must not collide with reserved names.
 * See: https://support.google.com/analytics/answer/9267735
 */
export type AnalyticsEventName =
  // Gateway events
  | 'gateway_choice'
  | 'gateway_boot_skip'
  | 'gateway_boot_complete'
  // Navigation events
  | 'nav_header_click'
  | 'nav_footer_click'
  | 'nav_mobile_menu_open'
  // Engagement events
  | 'engage_scroll_depth'
  | 'engage_faq_toggle'
  | 'engage_section_view'
  | 'engage_video_play'
  // Conversion events
  | 'convert_cta_click'
  | 'convert_form_submit'
  | 'convert_form_start'
  | 'convert_pricing_tier_click'
  | 'convert_pricing_enterprise_click'
  // ZUI events
  | 'zui_capsule_click'
  | 'zui_district_dock_click'
  | 'zui_zoom_level_change'

/**
 * Parameter types for each event.
 * Every event must have a defined parameter shape.
 */
export interface AnalyticsEventParams {
  // Gateway
  gateway_choice: {
    destination: 'mission-control' | 'marketing'
  }
  gateway_boot_skip: {
    phase_at_skip: string
    time_elapsed_ms: number
  }
  gateway_boot_complete: {
    duration_ms: number
  }

  // Navigation
  nav_header_click: {
    link_text: string
    link_url: string
  }
  nav_footer_click: {
    link_text: string
    link_url: string
  }
  nav_mobile_menu_open: Record<string, never>

  // Engagement
  engage_scroll_depth: {
    percent: 25 | 50 | 75 | 100
    page_path: string
  }
  engage_faq_toggle: {
    question: string
    index: number
    page_path: string
  }
  engage_section_view: {
    section_id: string
    page_path: string
  }
  engage_video_play: {
    video_title: string
    page_path: string
  }

  // Conversion
  convert_cta_click: {
    cta_id: string
    cta_text: string
    page_path: string
    destination_url: string
  }
  convert_form_submit: {
    form_id: string
    organization_type: string
    source_page: string
  }
  convert_form_start: {
    form_id: string
    source_page: string
  }
  convert_pricing_tier_click: {
    tier_id: string
    tier_name: string
    price_usd: number | null
  }
  convert_pricing_enterprise_click: {
    source: string
  }

  // ZUI
  zui_capsule_click: {
    district_id: string
    source: 'capsule_ring' | 'constellation' | 'beacon'
  }
  zui_district_dock_click: {
    district_id: string
  }
  zui_zoom_level_change: {
    from_level: string
    to_level: string
  }
}
```

---

### 4.3 Analytics Helper Module (`src/lib/analytics.ts`)

This module is the single interface for all analytics instrumentation across the site. No component should call `window.gtag()` directly -- all events flow through `trackEvent()`.

```typescript
// src/lib/analytics.ts

import type {
  AnalyticsEventName,
  AnalyticsEventParams,
} from '@/lib/interfaces/analytics'

// ─── Type augmentation for window.gtag ──────────────────────────────
declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'set' | 'consent',
      targetOrAction: string,
      params?: Record<string, unknown>,
    ) => void
    dataLayer?: unknown[]
  }
}

// ─── Consent guard ──────────────────────────────────────────────────
// Returns true if analytics consent has been granted.
// Default: true (opt-out model for US-only, English-only launch).
// When a cookie consent banner is implemented (post-launch), this
// function should read the consent state from the banner's cookie
// or localStorage flag.
//
// If the site later serves EU visitors (GDPR), switch to opt-in
// model by defaulting to false and flipping on consent grant.
function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false
  // Future: read from consent cookie/localStorage
  // Example: return localStorage.getItem('analytics_consent') === 'granted'
  return true
}

// ─── Guard: is gtag available? ──────────────────────────────────────
function isGtagReady(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.gtag === 'function' &&
    hasAnalyticsConsent()
  )
}

// ─── Core tracking function ─────────────────────────────────────────

/**
 * Track a custom event in GA4.
 *
 * Usage:
 * ```ts
 * import { trackEvent } from '@/lib/analytics'
 *
 * trackEvent('convert_cta_click', {
 *   cta_id: 'landing-hero-cta',
 *   cta_text: 'Schedule a Briefing',
 *   page_path: '/landing',
 *   destination_url: '/contact',
 * })
 * ```
 *
 * The function is safe to call during SSR (no-ops silently) and
 * when GA4 has not loaded yet (e.g., in development without
 * NEXT_PUBLIC_GA4_ID set).
 */
export function trackEvent<T extends AnalyticsEventName>(
  eventName: T,
  params: AnalyticsEventParams[T],
): void {
  if (!isGtagReady()) return
  window.gtag!('event', eventName, params as Record<string, unknown>)
}

/**
 * Track a conversion event. Identical to trackEvent but semantically
 * distinct -- conversion events are marked in GA4 property settings
 * and appear in the Conversions report.
 *
 * This is a convenience wrapper. The actual "conversion" designation
 * happens in GA4 property configuration (Section 4.8), not in code.
 */
export function trackConversion<T extends AnalyticsEventName>(
  eventName: T,
  params: AnalyticsEventParams[T],
): void {
  trackEvent(eventName, params)
}

// ─── Page path helper ───────────────────────────────────────────────

/**
 * Returns the current page path. Safe to call in client components.
 * Falls back to '/' during SSR.
 */
export function getPagePath(): string {
  if (typeof window === 'undefined') return '/'
  return window.location.pathname
}
```

**Design decisions:**

- **No PII in events.** The `convert_form_submit` event captures `organization_type` and `source_page` but never name, email, or phone. PII in analytics events violates GA4 terms of service.
- **Consent guard.** The `hasAnalyticsConsent()` function defaults to `true` for the US-only launch (opt-out model). When a GDPR consent banner is added, the function reads from the banner's consent state. The guard is checked on every `trackEvent()` call, not once at load time, because consent can be granted or revoked mid-session.
- **Type safety.** The `trackEvent` generic constrains the `params` argument to match the event name. Calling `trackEvent('gateway_choice', { cta_id: '...' })` produces a TypeScript error at compile time.
- **SSR safety.** All functions check `typeof window !== 'undefined'` before accessing browser APIs. No `useEffect` wrapper needed at the call site.

---

### 4.4 Event Taxonomy

The complete event taxonomy is organized into five categories. Each event has a defined name, trigger condition, parameter set, and business question it answers.

#### 4.4.1 Gateway Events

These events fire on the cinematic landing page (`/` or wherever the gateway renders). They answer: **How do visitors interact with the gateway, and where do they go?**

| Event Name | Trigger | Parameters | GA4 Conversion? |
|------------|---------|------------|-----------------|
| `gateway_choice` | Visitor clicks "Enter Mission Control" or "Read the Brief" in `ChoiceReveal` | `destination: 'mission-control' \| 'marketing'` | Yes |
| `gateway_boot_skip` | Visitor presses a key or clicks to skip the boot sequence | `phase_at_skip: string, time_elapsed_ms: number` | No |
| `gateway_boot_complete` | Boot sequence reaches the `revealing` phase without being skipped | `duration_ms: number` | No |

**Implementation locations:**

- `gateway_choice`: Add `trackConversion()` call inside `handleMissionControl` and `handleMarketing` in `src/components/gateway/choice-reveal.tsx`, before the `setTimeout` or `window.open`.
- `gateway_boot_skip`: Add `trackEvent()` call inside the `skipToReveal` action in `src/stores/gateway.store.ts`, or in the `handleSkipKey` / `handleClick` callbacks in `gateway-scene.tsx`.
- `gateway_boot_complete`: Add `trackEvent()` call in the `useGatewayChoreography` hook when phase transitions to `revealing` without having been skipped.

#### 4.4.2 Navigation Events

These events fire when visitors use the site's navigation elements. They answer: **How do visitors navigate, and which nav paths lead to conversions?**

| Event Name | Trigger | Parameters | GA4 Conversion? |
|------------|---------|------------|-----------------|
| `nav_header_click` | Visitor clicks a link in `MarketingHeader` | `link_text: string, link_url: string` | No |
| `nav_footer_click` | Visitor clicks a link in `MarketingFooter` | `link_text: string, link_url: string` | No |
| `nav_mobile_menu_open` | Visitor opens the mobile hamburger menu | (none) | No |

**Implementation locations:**

- `nav_header_click` / `nav_footer_click`: Add `trackEvent()` in the `onClick` handler of nav links in `MarketingHeader` and `MarketingFooter` (WS-A.1 components).
- `nav_mobile_menu_open`: Add `trackEvent()` when the mobile menu state transitions from closed to open.

#### 4.4.3 Engagement Events

These events measure content engagement depth. They answer: **Are visitors reading the content, and which sections hold attention?**

| Event Name | Trigger | Parameters | GA4 Conversion? |
|------------|---------|------------|-----------------|
| `engage_scroll_depth` | Visitor scrolls past a depth threshold (25%, 50%, 75%, 100%) | `percent: number, page_path: string` | No |
| `engage_faq_toggle` | Visitor expands an FAQ accordion item | `question: string, index: number, page_path: string` | No |
| `engage_section_view` | A major page section enters the viewport (Intersection Observer, 50% threshold) | `section_id: string, page_path: string` | No |
| `engage_video_play` | Visitor plays an embedded video (future -- no videos at launch) | `video_title: string, page_path: string` | No |

**Implementation approach for scroll depth:**

Create a reusable hook `src/hooks/use-scroll-tracking.ts` that registers Intersection Observer sentinels at 25%, 50%, 75%, and 100% of document height. Each sentinel fires `trackEvent('engage_scroll_depth', ...)` exactly once per page load.

```typescript
// src/hooks/use-scroll-tracking.ts

'use client'

import { useEffect, useRef } from 'react'
import { trackEvent, getPagePath } from '@/lib/analytics'

const THRESHOLDS = [25, 50, 75, 100] as const

/**
 * Tracks scroll depth at 25%, 50%, 75%, and 100% thresholds.
 * Each threshold fires exactly once per page load.
 *
 * Usage: Call `useScrollTracking()` in the marketing layout
 * client wrapper or in each page's client boundary.
 */
export function useScrollTracking(): void {
  const firedRef = useRef<Set<number>>(new Set())

  useEffect(() => {
    const fired = firedRef.current
    fired.clear()

    function handleScroll() {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) return

      const percent = Math.round((window.scrollY / scrollHeight) * 100)

      for (const threshold of THRESHOLDS) {
        if (percent >= threshold && !fired.has(threshold)) {
          fired.add(threshold)
          trackEvent('engage_scroll_depth', {
            percent: threshold,
            page_path: getPagePath(),
          })
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
}
```

**Implementation location for FAQ toggle:**

- Pricing page: Add `trackEvent('engage_faq_toggle', ...)` in the `PricingFAQ` client component's toggle handler.
- How It Works page: Add in the `WizardStepper` accordion toggle handler if the accordion items are tracked.

**Implementation approach for section views:**

Create a reusable `<TrackedSection>` wrapper component or use a hook that attaches Intersection Observer to elements with `id` attributes. When a section with an `id` becomes 50% visible, fire `engage_section_view`. Each section fires once per page load.

#### 4.4.4 Conversion Events

These events represent high-value visitor actions that directly indicate purchase intent. They answer: **How many visitors are requesting briefings, and from which pages?**

| Event Name | Trigger | Parameters | GA4 Conversion? |
|------------|---------|------------|-----------------|
| `convert_cta_click` | Visitor clicks any "Schedule a Briefing" or primary conversion CTA | `cta_id: string, cta_text: string, page_path: string, destination_url: string` | Yes |
| `convert_form_submit` | Contact form submits successfully (API returns 200) | `form_id: string, organization_type: string, source_page: string` | Yes |
| `convert_form_start` | Visitor focuses the first field in the contact form | `form_id: string, source_page: string` | No |
| `convert_pricing_tier_click` | Visitor clicks a tier card CTA on the pricing page | `tier_id: string, tier_name: string, price_usd: number \| null` | No |
| `convert_pricing_enterprise_click` | Visitor clicks the enterprise "Contact Sales" CTA | `source: string` | No |

**Implementation locations:**

- `convert_cta_click`: Add `trackConversion()` in the `BreathingCTA` component's `onClick` handler. Read `cta_id` from the `data-analytics-id` attribute. Read `cta_text` from the button's `children` text content.
- `convert_form_submit`: Add `trackConversion()` in `contact-form.tsx` after the API call returns success. The `organization_type` comes from the form field value. The `source_page` comes from `getPagePath()` or the form's hidden `source_page` field.
- `convert_form_start`: Add `trackEvent()` on the `onFocus` handler of the contact form's first field (`name`), guarded by a ref to fire only once.
- `convert_pricing_tier_click`: Add `trackEvent()` in the pricing tier card CTA click handler. Parameters come from the tier data object.
- `convert_pricing_enterprise_click`: Add `trackEvent()` in the enterprise tier card CTA click handler.

**Mapping to WS-B.5 event names:**

WS-B.5 defined five pricing-specific event names (`pricing_page_view`, `pricing_tier_cta_click`, etc.). This workstream consolidates them into the unified taxonomy:

| WS-B.5 Event | WS-C.3 Equivalent | Rationale |
|---------------|-------------------|-----------|
| `pricing_page_view` | Automatic GA4 `page_view` | GA4 tracks page views natively. A custom `pricing_page_view` event is redundant. Filter by `page_path = '/pricing'` in reports. |
| `pricing_tier_cta_click` | `convert_pricing_tier_click` | Renamed to follow the `convert_` prefix convention. Same parameters. |
| `pricing_enterprise_cta_click` | `convert_pricing_enterprise_click` | Renamed to follow convention. Same parameters. |
| `pricing_faq_toggle` | `engage_faq_toggle` | Unified with the cross-site FAQ toggle event. `page_path` parameter distinguishes pricing FAQ from other FAQ instances. |
| `pricing_bottom_cta_click` | `convert_cta_click` | Consolidated into the universal CTA click event. `cta_id = 'pricing-bottom-primary'` or `'pricing-bottom-secondary'` distinguishes the button. |

#### 4.4.5 ZUI Events

These events fire within the spatial ZUI at `/launch`. They answer: **Do visitors engage with the spatial interface, and which districts draw attention?**

| Event Name | Trigger | Parameters | GA4 Conversion? |
|------------|---------|------------|-----------------|
| `zui_capsule_click` | Visitor clicks a capsule in the ring at Z1 or a beacon at Z0 | `district_id: string, source: 'capsule_ring' \| 'constellation' \| 'beacon'` | No |
| `zui_district_dock_click` | Visitor clicks a district icon in the gateway dock | `district_id: string` | No |
| `zui_zoom_level_change` | Semantic zoom level transitions (e.g., Z1 -> Z2) | `from_level: string, to_level: string` | No |

**Implementation locations:**

- `zui_capsule_click`: Add `trackEvent()` in the `onSelect` callback of `DistrictCapsule` and `DistrictBeacon` components.
- `zui_district_dock_click`: Add `trackEvent()` in the `handleClick` callback of `DistrictDock` component, before the `setTimeout`.
- `zui_zoom_level_change`: Add `trackEvent()` in the semantic zoom subscription within `SpatialCanvas` or the `useSemanticZoom` hook, debounced to prevent rapid-fire events during smooth zoom.

---

### 4.5 Conversion Event Configuration

Three events are designated as GA4 conversions. This designation happens in the GA4 property settings (Admin > Events > mark as conversion), not in code. The code uses `trackConversion()` as a semantic signal but the function is identical to `trackEvent()`.

| Conversion Event | Business Meaning | Expected Volume (Month 1) |
|-----------------|------------------|--------------------------|
| `convert_form_submit` | A visitor has submitted a briefing/demo request. This is the primary revenue-generating action on the site. | 10--50 submissions |
| `convert_cta_click` | A visitor has clicked a "Schedule a Briefing" CTA. This is the step before form submission and indicates high commercial intent. | 50--200 clicks |
| `gateway_choice` | A visitor has made their first directional decision on the site. This validates the gateway experience. | 100--500 choices |

**Conversion attribution model:**

GA4 defaults to data-driven attribution. For a pre-revenue site with low traffic volume, the "Last click" model is more interpretable. Switch to data-driven after 90 days of traffic data accumulates.

**Conversion counting:**

- `convert_form_submit`: Count as "Once per session" (a visitor submitting the form twice in one session is a duplicate, not a new conversion).
- `convert_cta_click`: Count as "Once per event" (each CTA click is a separate intent signal).
- `gateway_choice`: Count as "Once per session."

---

### 4.6 Custom Dimensions and Metrics

GA4 custom dimensions allow filtering and segmenting reports by parameters sent with events. Register these custom dimensions in the GA4 property settings.

#### Event-Scoped Custom Dimensions

| Parameter Name | Dimension Name (GA4 UI) | Scope | Events That Send It |
|---------------|------------------------|-------|-------------------|
| `destination` | Gateway Destination | Event | `gateway_choice` |
| `cta_id` | CTA Identifier | Event | `convert_cta_click` |
| `cta_text` | CTA Text | Event | `convert_cta_click` |
| `page_path` | Page Path | Event | `engage_scroll_depth`, `engage_faq_toggle`, `engage_section_view`, `convert_cta_click`, `convert_form_submit` |
| `destination_url` | CTA Destination URL | Event | `convert_cta_click` |
| `tier_id` | Pricing Tier ID | Event | `convert_pricing_tier_click` |
| `tier_name` | Pricing Tier Name | Event | `convert_pricing_tier_click` |
| `organization_type` | Organization Type | Event | `convert_form_submit` |
| `source_page` | Form Source Page | Event | `convert_form_submit`, `convert_form_start` |
| `district_id` | District ID | Event | `zui_capsule_click`, `zui_district_dock_click` |
| `section_id` | Section ID | Event | `engage_section_view` |
| `question` | FAQ Question | Event | `engage_faq_toggle` |
| `link_text` | Nav Link Text | Event | `nav_header_click`, `nav_footer_click` |

#### Event-Scoped Custom Metrics

| Parameter Name | Metric Name (GA4 UI) | Unit | Events That Send It |
|---------------|---------------------|------|-------------------|
| `time_elapsed_ms` | Time Elapsed (ms) | Milliseconds | `gateway_boot_skip` |
| `duration_ms` | Boot Duration (ms) | Milliseconds | `gateway_boot_complete` |
| `price_usd` | Tier Price (USD) | Currency | `convert_pricing_tier_click` |
| `percent` | Scroll Depth (%) | Standard | `engage_scroll_depth` |
| `index` | FAQ Item Index | Standard | `engage_faq_toggle` |

**Registration limit:** GA4 allows 50 event-scoped custom dimensions and 50 custom metrics per property. This implementation uses 14 dimensions and 5 metrics -- well within limits, leaving room for post-launch additions.

---

### 4.7 Data Layer Structure

The term "data layer" here refers to the `window.dataLayer` array that GA4's gtag.js uses internally. This workstream does not build a custom data layer abstraction (which would be warranted with GTM but is unnecessary with direct gtag.js).

The `trackEvent()` function in `src/lib/analytics.ts` pushes events to `window.gtag()`, which internally pushes to `window.dataLayer`. The events end up in the data layer in this shape:

```javascript
// Example: what window.dataLayer contains after a CTA click
[
  // ... gtag initialization entries ...
  {
    event: 'convert_cta_click',
    cta_id: 'landing-hero-cta',
    cta_text: 'Schedule a Briefing',
    page_path: '/landing',
    destination_url: '/contact',
  },
]
```

**Debug mode verification:**

To verify events during development, add `?debug_mode=true` to any page URL, or configure the GA4 DebugView in the property settings. The gtag.js script sends events to DebugView when the GA4 debug mode is active.

Alternatively, add a debug configuration to the init script:

```typescript
// Development only -- add to GA4 init script when debugging
gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}', {
  debug_mode: process.env.NODE_ENV === 'development',
});
```

**Recommendation:** Do NOT enable `debug_mode` in production builds. Use GA4 DebugView browser extension for production debugging.

---

### 4.8 GA4 Property Configuration Specification

This section documents the GA4 property settings that must be configured in the GA4 Admin UI after the property is created. These are not code changes -- they are UI configuration steps.

#### 4.8.1 Property Creation

| Setting | Value |
|---------|-------|
| Property name | `Safetrekr Marketing Site` |
| Reporting time zone | US Eastern (ET) |
| Currency | USD |
| Industry category | Business & Industrial > Business Services |

#### 4.8.2 Data Stream

| Setting | Value |
|---------|-------|
| Stream type | Web |
| Website URL | `https://safetrekr.com` (pending Q-8) |
| Stream name | `Safetrekr Web` |
| Enhanced measurement: Page views | Enabled |
| Enhanced measurement: Scrolls | Disabled (custom scroll tracking in code) |
| Enhanced measurement: Outbound clicks | Enabled |
| Enhanced measurement: Site search | Disabled (no site search at launch) |
| Enhanced measurement: Video engagement | Disabled (no videos at launch) |
| Enhanced measurement: File downloads | Disabled (no downloads at launch) |
| Enhanced measurement: Form interactions | Disabled (custom form tracking in code) |
| Enhanced measurement: Page changes based on browser history events | **Enabled** (required for SPA-style navigations in Next.js App Router) |

**Critical:** "Page changes based on browser history events" must be enabled. Without it, client-side route transitions within the marketing site (e.g., clicking a nav link from `/landing` to `/pricing`) are not tracked as page views.

#### 4.8.3 Conversions

Mark these three events as conversions in GA4 Admin > Events:

1. `convert_form_submit` -- counting method: Once per session
2. `convert_cta_click` -- counting method: Once per event
3. `gateway_choice` -- counting method: Once per session

#### 4.8.4 Audiences

Create these audience segments for reporting and future remarketing:

| Audience Name | Definition | Purpose |
|--------------|-----------|---------|
| Briefing Requesters | Users who triggered `convert_form_submit` | Conversion cohort for LTV analysis |
| High-Intent Visitors | Users who triggered `convert_cta_click` AND `engage_scroll_depth` with `percent >= 75` | Retargeting pool for paid campaigns |
| Gateway > Mission Control | Users who triggered `gateway_choice` with `destination = 'mission-control'` | Spatial experience engagement cohort |
| Gateway > Marketing | Users who triggered `gateway_choice` with `destination = 'marketing'` | Traditional marketing content cohort |
| Pricing Explorers | Users who viewed `/pricing` AND triggered any `convert_pricing_*` event | Price-qualified leads |

#### 4.8.5 Data Retention

| Setting | Value |
|---------|-------|
| Event data retention | 14 months (maximum) |
| Reset user data on new activity | Enabled |

#### 4.8.6 Google Signals

| Setting | Value |
|---------|-------|
| Google Signals data collection | Enabled (provides demographics, cross-device data) |
| Ads personalization | Disabled at launch (enable when paid campaigns begin) |

---

### 4.9 Measurement Plan

The measurement plan maps business questions to the events and reports that answer them. This is the "why" behind every tracked event.

#### 4.9.1 Launch Questions (Month 1)

| # | Business Question | Events Used | Metric | Report |
|---|-------------------|-------------|--------|--------|
| Q1 | How many visitors request a briefing? | `convert_form_submit` | Event count | Conversions > Overview |
| Q2 | Which pages produce the most briefing requests? | `convert_form_submit.source_page` | Event count by source_page | Custom Explore (4.10.1) |
| Q3 | What percentage of CTA clicks convert to form submissions? | `convert_cta_click` -> `convert_form_submit` | Funnel conversion rate | Custom Explore (4.10.2) |
| Q4 | Do visitors choose Mission Control or Marketing from the gateway? | `gateway_choice.destination` | Event count by destination | Custom Explore (4.10.3) |
| Q5 | Which organization types request briefings most? | `convert_form_submit.organization_type` | Event count by org type | Custom Explore (4.10.1) |
| Q6 | How deeply do visitors read content pages? | `engage_scroll_depth.percent` | Avg scroll depth by page | Engagement > Pages |
| Q7 | Which pricing tier gets the most clicks? | `convert_pricing_tier_click.tier_id` | Event count by tier | Custom Explore |
| Q8 | Do visitors engage with the ZUI, and which districts? | `zui_capsule_click.district_id` | Event count by district | Custom Explore |
| Q9 | What is the bounce rate on the landing page? | GA4 bounce rate metric | Bounce rate | Engagement > Pages |
| Q10 | How many visitors skip the gateway boot sequence? | `gateway_boot_skip` vs `gateway_boot_complete` | Skip rate (%) | Custom Explore (4.10.3) |

#### 4.9.2 Growth Questions (Months 2--6)

| # | Business Question | Events Used | When |
|---|-------------------|-------------|------|
| Q11 | Which content paths lead to the highest conversion rate? | Path analysis: `page_view` -> `convert_cta_click` -> `convert_form_submit` | Month 3 (need traffic volume) |
| Q12 | Does the gateway experience increase or decrease conversion rate compared to direct landing page entry? | Compare conversion rates: gateway entrants vs. direct `/landing` entrants | Month 3 |
| Q13 | Which FAQ questions are asked most on the pricing page? | `engage_faq_toggle.question` on pricing page | Month 2 |
| Q14 | Is there a correlation between scroll depth and conversion? | `engage_scroll_depth` + `convert_cta_click` | Month 4 |
| Q15 | What is the average time from first visit to briefing request? | GA4 user lifetime > days to conversion | Month 6 |

---

### 4.10 Reporting Dashboard Specification

#### 4.10.1 Explore Report: Conversion Source Analysis

**Purpose:** Answer Q2 and Q5 -- which pages and organization types produce briefing requests.

| Setting | Value |
|---------|-------|
| Technique | Free-form |
| Rows | `source_page`, `organization_type` |
| Values | Event count (for `convert_form_submit`), Event count (for `convert_cta_click`) |
| Filters | Event name = `convert_form_submit` OR `convert_cta_click` |
| Date range | Last 30 days |

#### 4.10.2 Explore Report: CTA-to-Form Funnel

**Purpose:** Answer Q3 -- what percentage of CTA clicks convert to form submissions.

| Setting | Value |
|---------|-------|
| Technique | Funnel |
| Step 1 | `convert_cta_click` |
| Step 2 | `convert_form_start` |
| Step 3 | `convert_form_submit` |
| Breakdown | `page_path` (from CTA click) |
| Date range | Last 30 days |
| Open/closed funnel | Open (visitors can enter at any step) |

#### 4.10.3 Explore Report: Gateway Behavior

**Purpose:** Answer Q4 and Q10 -- gateway destination split and boot skip rate.

| Setting | Value |
|---------|-------|
| Technique | Free-form |
| Rows | `destination` (from `gateway_choice`) |
| Values | Event count, User count |
| Secondary table: Rows | Event name (`gateway_boot_skip` vs. `gateway_boot_complete`) |
| Secondary table: Values | Event count, Average `time_elapsed_ms` |
| Date range | Last 30 days |

#### 4.10.4 Weekly Monitoring Dashboard (GA4 Overview Customization)

Configure the GA4 Reports > Overview with these cards:

| Card | Metric | Dimension | Period |
|------|--------|-----------|--------|
| 1 | Total users | -- | Last 7 days vs. prior 7 |
| 2 | Conversions (convert_form_submit) | -- | Last 7 days vs. prior 7 |
| 3 | Event count (convert_cta_click) | cta_id | Last 7 days |
| 4 | Sessions by page path | page_path | Last 7 days |
| 5 | Event count (gateway_choice) | destination | Last 7 days |
| 6 | Avg. engagement time per session | -- | Last 7 days vs. prior 7 |

---

### 4.11 `data-analytics-id` Attribute Convention

Phase B content page SOWs (WS-B.2 through WS-B.9) place `data-analytics-id` attributes on interactive elements. This workstream defines the naming convention and consumes those attributes.

**Naming convention:** `{page}-{section}-{element}`

| Attribute Value | Page | Element | Event Triggered |
|----------------|------|---------|-----------------|
| `landing-hero-cta` | Landing | Hero "Schedule a Briefing" button | `convert_cta_click` |
| `landing-bottom-cta` | Landing | Bottom bar "Schedule a Briefing" button | `convert_cta_click` |
| `landing-bottom-pricing` | Landing | Bottom bar "See Pricing" link | `convert_cta_click` |
| `landing-vertical-{id}` | Landing | Vertical callout card | `convert_cta_click` |
| `hiw-bottom-cta` | How It Works | Bottom "Schedule a Briefing" button | `convert_cta_click` |
| `platform-bottom-cta` | Platform | Bottom CTA | `convert_cta_click` |
| `pricing-tier-{id}` | Pricing | Tier card CTA | `convert_pricing_tier_click` |
| `pricing-enterprise` | Pricing | Enterprise card CTA | `convert_pricing_enterprise_click` |
| `pricing-bottom-primary` | Pricing | Bottom "Schedule a Briefing" | `convert_cta_click` |
| `pricing-bottom-secondary` | Pricing | Bottom "Contact Sales" | `convert_cta_click` |
| `security-bottom-cta` | Security | Bottom CTA | `convert_cta_click` |
| `solutions-bottom-cta` | Solutions | Bottom CTA | `convert_cta_click` |
| `about-bottom-cta` | About | Bottom CTA | `convert_cta_click` |
| `contact-form` | Contact | Form element | `convert_form_start`, `convert_form_submit` |
| `header-cta` | All (header) | Header "Schedule a Briefing" button | `convert_cta_click` |

**Binding approach:**

The `BreathingCTA` component (WS-B.2) accepts `data-analytics-id` as a prop. The analytics integration adds a `trackConversion()` call inside the component's `onClick` that reads the `data-analytics-id` value:

```typescript
// Inside BreathingCTA onClick handler (implementation reference)
onClick={() => {
  const analyticsId = props['data-analytics-id']
  if (analyticsId) {
    trackConversion('convert_cta_click', {
      cta_id: analyticsId,
      cta_text: typeof children === 'string' ? children : analyticsId,
      page_path: getPagePath(),
      destination_url: href,
    })
  }
  // ... existing navigation logic
}
```

**Alternative: global delegated listener.**

If modifying every CTA component is undesirable, a single delegated event listener can be attached to `document.body` that listens for clicks on any element with `data-analytics-id`:

```typescript
// src/components/analytics/analytics-listener.tsx
'use client'

import { useEffect } from 'react'
import { trackConversion, getPagePath } from '@/lib/analytics'

export function AnalyticsListener() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest('[data-analytics-id]')
      if (!target) return

      const analyticsId = target.getAttribute('data-analytics-id')!
      const linkUrl =
        target.getAttribute('href') ||
        target.closest('a')?.getAttribute('href') ||
        ''

      trackConversion('convert_cta_click', {
        cta_id: analyticsId,
        cta_text: target.textContent?.trim().slice(0, 100) || analyticsId,
        page_path: getPagePath(),
        destination_url: linkUrl,
      })
    }

    document.addEventListener('click', handleClick, { capture: true })
    return () => document.removeEventListener('click', handleClick, { capture: true })
  }, [])

  return null
}
```

Place `<AnalyticsListener />` in the root layout alongside the GA4 scripts. This approach has two advantages: (1) zero modifications to existing CTA components, and (2) any new element with `data-analytics-id` is automatically tracked. The tradeoff is less explicit control over which events fire as conversions vs. engagement events.

**Recommended approach:** Use the delegated listener (`AnalyticsListener`) for all CTA click tracking, and add direct `trackEvent()` / `trackConversion()` calls only for events that require non-click triggers (form submission, FAQ toggle, scroll depth, gateway choice, ZUI interactions).

---

### 4.12 File Inventory

| # | File | Type | Notes |
|---|------|------|-------|
| 1 | `src/lib/interfaces/analytics.ts` | New | Event name union type, event parameter interfaces |
| 2 | `src/lib/analytics.ts` | New | `trackEvent()`, `trackConversion()`, `getPagePath()`, consent guard |
| 3 | `src/hooks/use-scroll-tracking.ts` | New | Scroll depth tracking hook with Intersection Observer |
| 4 | `src/components/analytics/analytics-listener.tsx` | New | Delegated click listener for `data-analytics-id` elements |
| 5 | `src/app/layout.tsx` | Modify | Add two `<Script>` elements for GA4 gtag.js |
| 6 | `src/components/gateway/choice-reveal.tsx` | Modify | Add `trackConversion('gateway_choice', ...)` calls |
| 7 | `src/components/gateway/gateway-scene.tsx` | Modify | Add `trackEvent('gateway_boot_skip', ...)` and `gateway_boot_complete` |
| 8 | `src/components/gateway/district-dock.tsx` | Modify | Add `trackEvent('zui_district_dock_click', ...)` |
| 9 | `src/components/marketing/contact-form.tsx` | Modify | Add `trackConversion('convert_form_submit', ...)` and `trackEvent('convert_form_start', ...)` |
| 10 | `.env.local` | Modify | Add `NEXT_PUBLIC_GA4_ID` |
| 11 | `.env.example` | Modify | Add `NEXT_PUBLIC_GA4_ID=` placeholder |

---

## 5. Acceptance Criteria

| # | Criterion | Verification Method |
|---|-----------|-------------------|
| AC-1 | GA4 scripts load only when `NEXT_PUBLIC_GA4_ID` is set | Start dev server without the env var; confirm no `gtag` scripts in DOM. Set the var; confirm scripts appear. |
| AC-2 | GA4 scripts use `strategy="afterInteractive"` | DevTools > Elements: verify `<script>` elements have the `data-nscript="afterInteractive"` attribute (Next.js internal marker). |
| AC-3 | Page views are tracked automatically on initial load and client-side navigation | GA4 DebugView: navigate between marketing pages; confirm `page_view` events fire with correct `page_path`. |
| AC-4 | `trackEvent()` is type-safe: calling with mismatched event name and params produces a TypeScript error | `pnpm typecheck` passes. Manually introduce a type error (e.g., wrong param for event name); confirm tsc reports the error. |
| AC-5 | `trackEvent()` no-ops during SSR without throwing | Build succeeds (`pnpm build`). No "window is not defined" errors in server component output. |
| AC-6 | `trackEvent()` no-ops when GA4 is not loaded (dev mode without env var) | Console: no errors when clicking tracked elements without GA4 configured. |
| AC-7 | `gateway_choice` fires when "Enter Mission Control" is clicked | GA4 DebugView: click "Enter Mission Control"; confirm `gateway_choice` event with `destination: 'mission-control'`. |
| AC-8 | `gateway_choice` fires when "Read the Brief" is clicked | GA4 DebugView: click "Read the Brief"; confirm `gateway_choice` event with `destination: 'marketing'`. |
| AC-9 | `convert_cta_click` fires for every element with `data-analytics-id` | Click each CTA with a `data-analytics-id` attribute; confirm `convert_cta_click` in DebugView with correct `cta_id`. |
| AC-10 | `convert_form_submit` fires on successful contact form submission | Submit the contact form; confirm event in DebugView with `organization_type` and `source_page`. |
| AC-11 | `convert_form_submit` does NOT fire on failed submissions | Submit form with invalid data (server returns error); confirm no `convert_form_submit` event. |
| AC-12 | `convert_form_submit` does NOT include PII (name, email, phone) | Inspect event parameters in DebugView; confirm only `form_id`, `organization_type`, and `source_page` are sent. |
| AC-13 | `engage_scroll_depth` fires at 25%, 50%, 75%, 100% thresholds | Slowly scroll a long page; confirm four events in DebugView with correct `percent` values. |
| AC-14 | Each scroll threshold fires only once per page load | Scroll up and down repeatedly past 50%; confirm only one `engage_scroll_depth` event with `percent: 50`. |
| AC-15 | `engage_faq_toggle` fires when a pricing FAQ is expanded | Expand a FAQ item on `/pricing`; confirm event with `question` and `index` in DebugView. |
| AC-16 | `zui_district_dock_click` fires when a dock icon is clicked | Click a dock icon on the gateway; confirm event with `district_id` in DebugView. |
| AC-17 | No analytics scripts load in local development by default | Confirm `NEXT_PUBLIC_GA4_ID` is not set in committed `.env` files; only in `.env.local` (gitignored). |
| AC-18 | `pnpm typecheck` passes with zero errors after all changes | CLI: `pnpm typecheck` |
| AC-19 | `pnpm lint` passes with zero errors after all changes | CLI: `pnpm lint` |
| AC-20 | `pnpm build` completes successfully | CLI: `pnpm build` |
| AC-21 | No measurable LCP regression from analytics scripts | Lighthouse: compare LCP before and after; confirm delta < 100ms. `afterInteractive` strategy should have near-zero impact. |

---

## 6. Decision Log

| # | Decision | Rationale | Alternatives Rejected |
|---|----------|-----------|----------------------|
| D-1 | Use direct `gtag.js` via `next/script`, not Google Tag Manager (GTM) | GTM adds a container abstraction layer that provides value when multiple marketing tools and non-developer stakeholders need to manage tags. At launch, there is one analytics tool (GA4) and one developer. Direct gtag.js is simpler, loads faster (one fewer network request), and keeps all tracking logic in version-controlled TypeScript. GTM can be introduced post-launch if marketing operations grows. | GTM (over-engineering for launch); Segment/RudderStack (unnecessary abstraction for single destination); Plausible/Fathom (good alternatives but client prefers GA4 ecosystem) |
| D-2 | Single `trackEvent()` function instead of per-event functions | A single generic function with TypeScript generics provides type safety through the `AnalyticsEventParams` map while keeping the module small. Per-event functions (e.g., `trackGatewayChoice()`, `trackCtaClick()`) would produce 18 functions that are harder to maintain and provide no additional type safety. | 18 individual tracking functions (maintenance burden); raw `window.gtag()` calls scattered in components (no type safety, no consent guard) |
| D-3 | Delegated click listener for `data-analytics-id` elements | Avoids modifying every CTA component. Any new element with the attribute is automatically tracked. The landing page SOW (WS-B.2) explicitly designed the `data-analytics-id` pattern for this approach (D-10 in WS-B.2). | Inline `onClick` handlers in every CTA (requires modifying every component); mutation observer (over-engineering); custom React context (too coupled) |
| D-4 | Scroll depth via window scroll listener, not GA4 Enhanced Measurement | GA4 Enhanced Measurement "Scrolls" only fires at 90% depth -- a single data point that provides no insight into where visitors disengage. Custom tracking at 25/50/75/100% gives four data points per page. The built-in scroll tracking is disabled to avoid duplicate events. | GA4 Enhanced Measurement scrolls (too coarse, single threshold); Intersection Observer on every paragraph (too granular, event volume) |
| D-5 | Disable GA4 Enhanced Measurement for forms | GA4's built-in form interaction tracking fires `form_start` and `form_submit` events based on DOM heuristics that can misfire on custom glass-morphism form elements. The custom `convert_form_start` and `convert_form_submit` events provide explicit control over when and what is tracked. | Enhanced Measurement forms (unreliable with custom UI); both enhanced + custom (duplicate events) |
| D-6 | Consent guard defaults to `true` (opt-out model) | The site launches in the US only, in English only. US privacy law (except California CCPA) generally permits opt-out analytics. The consent guard function is designed to be easily switched to opt-in when a consent banner is implemented or when EU visitors are served. | Default to false / opt-in (blocks all analytics until consent banner exists); no consent guard (not future-proof for GDPR) |
| D-7 | Consolidate WS-B.5 pricing events into unified taxonomy | Five pricing-specific event names (`pricing_page_view`, `pricing_tier_cta_click`, etc.) would create a fragmented taxonomy where pricing events follow different naming conventions than the rest of the site. Consolidating into the `convert_` and `engage_` prefix system makes cross-page analysis possible (e.g., comparing CTA clicks on `/pricing` vs. `/landing` using the same event name filtered by `page_path`). | Keep WS-B.5 event names as-is (inconsistent naming, harder cross-page analysis) |
| D-8 | Environment variable for GA4 ID, not hardcoded | Allows different GA4 properties for preview deployments vs. production. Prevents dev/staging traffic from polluting production data. Standard Next.js pattern for third-party service IDs. | Hardcoded in layout (no environment separation); runtime config file (unnecessary for a public, non-secret value) |

---

## 7. Risk and Mitigation

| # | Risk | Severity | Mitigation |
|---|------|----------|------------|
| 1 | **[BLOCKING] GA4 property ID not available (Q-9)** | High | The GA4 script injection uses `NEXT_PUBLIC_GA4_ID`. Without this value, no analytics data is collected. The code deploys without error (conditional rendering), but no data flows until the property is created and the ID is set. Mitigation: Create the GA4 property as early as possible. The property can be created in minutes and the ID added to the deployment environment. |
| 2 | Ad blockers prevent GA4 script loading | Medium | A percentage of visitors (estimated 25--35% of technical audiences) block Google Analytics. This is an accepted limitation of client-side analytics. Mitigation: Use GA4's modeled data features (which estimate blocked sessions). For critical conversion counting, the Supabase `demo_requests` table serves as the authoritative source -- it is not affected by ad blockers. |
| 3 | SPA navigation events not tracked | Medium | If "Page changes based on browser history events" is not enabled in GA4 Enhanced Measurement, client-side navigations within Next.js App Router are missed. Mitigation: Documented explicitly in Section 4.8.2 as a required configuration step. Acceptance criterion AC-3 validates this. |
| 4 | Event parameter cardinality too high | Low | GA4 limits unique values per custom dimension. If `cta_text` or `question` parameters produce thousands of unique values, reports degrade. Mitigation: CTA text is a controlled set (fewer than 20 unique values at launch). FAQ questions are a controlled set (fewer than 30). Monitor cardinality monthly. |
| 5 | Scroll depth events fire too rapidly during fast scrolling | Low | A visitor scrolling quickly through a short page may trigger all four thresholds in rapid succession. Mitigation: Each threshold fires only once (ref guard). No debounce needed -- the guard prevents duplicate events. |
| 6 | `trackEvent()` called before gtag.js loads | Low | The `afterInteractive` strategy means gtag.js may not be available during the first milliseconds of page interaction. Mitigation: `isGtagReady()` checks for `window.gtag` existence and silently no-ops if unavailable. Extremely fast interactions (e.g., a visitor clicking a CTA within 100ms of page load) may be missed. This is an acceptable tradeoff vs. synchronous script loading. |
| 7 | Future GDPR consent requirement | Low | If the site is accessed by EU visitors, GDPR requires opt-in consent before analytics. Mitigation: The consent guard in `analytics.ts` is designed for this. Switching from opt-out to opt-in requires changing the default return value in `hasAnalyticsConsent()` and integrating a consent banner's state. No analytics module refactoring needed. |

---

## 8. Open Questions

| # | Question | Impact | Needed Before |
|---|----------|--------|---------------|
| Q-9 | **GA4 property ID: Create a new GA4 property or use an existing one?** | Blocks all data collection. Without the property ID, the script has no destination. If a property exists for safetrekr.com, provide the `G-XXXXXXXXXX` measurement ID. If not, create a new GA4 property (free) at analytics.google.com. | Implementation start |
| Q-16 | **Should Google Search Console be linked to this GA4 property?** | Linking GSC to GA4 enables organic search query data in GA4 reports. Highly recommended but requires domain verification. | Post-launch (non-blocking) |
| Q-17 | **Are there any existing Google Ads accounts that should be linked?** | Linking Google Ads enables conversion import for future paid campaigns. Not needed for launch but useful to configure early. | Post-launch (non-blocking) |
| Q-18 | **Should analytics be loaded on the gateway page (`/`) or only on marketing pages?** | The current specification tracks gateway events. If the gateway is considered a "product experience" rather than marketing, it could be excluded from GA4. Decision: track it -- the gateway is the first visitor touchpoint and its behavior directly informs marketing decisions. | Resolved: track the gateway |
| Q-19 | **Should the spatial ZUI at `/launch` be fully instrumented?** | The current specification tracks capsule clicks and zoom level changes. Full ZUI instrumentation (pan distance, time per district, detail panel opens) would add 10+ events. Decision for launch: track the three ZUI events defined in Section 4.4.5. Expand post-launch if the spatial experience is promoted as a conversion pathway. | Resolved: minimal ZUI tracking at launch |
