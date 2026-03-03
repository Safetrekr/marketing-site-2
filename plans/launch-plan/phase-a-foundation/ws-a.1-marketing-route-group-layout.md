# WS-A.1: Marketing Route Group + Layout

> **Workstream ID:** WS-A.1
> **Phase:** A -- Foundation & Infrastructure
> **Assigned Agent:** `react-developer`
> **Status:** Draft
> **Created:** 2026-03-02
> **Last Updated:** 2026-03-02
> **Depends On:** None
> **Blocks:** WS-A.3, WS-A.4, WS-B.2--B.9
> **Resolves:** Gap 6 (No Mobile Navigation), AD-1 (Route Structure), AD-4 (Header/Footer)

---

## 1. Objective

Create the Next.js App Router route group, shared layout, responsive header, and footer that will wrap every traditional marketing content page on the Safetrekr marketing site. This workstream establishes the navigational shell that all Phase B content pages render inside, while leaving the Gateway (`/`), Spatial ZUI (`/launch`), and authentication (`/login`) pages completely unaffected.

The header and footer must match the site's Oblivion-HUD visual identity: dark backgrounds using the existing spatial token system, glass-morphism surfaces, green accent interactions, breathing glow on the primary CTA, and full keyboard/screen-reader accessibility. Mobile visitors receive a hamburger-triggered slide-in navigation panel with the same links and CTA.

This is the highest-priority foundation workstream because 12 downstream workstreams depend on the route group and layout being in place before they can begin page-level implementation.

---

## 2. Scope

### In Scope

| # | Item | Notes |
|---|------|-------|
| 1 | `(marketing)` route group directory structure | All marketing page routes nested under `src/app/(marketing)/` |
| 2 | `(marketing)/layout.tsx` shared layout | Server component composing header + `{children}` + footer |
| 3 | `MarketingHeader` component | Fixed glass-morphism header bar with logo, nav, CTA |
| 4 | `MarketingMobileNav` component | Hamburger-triggered slide-in panel for viewports < 768px |
| 5 | `MarketingFooter` component | 3-column footer with logo, tagline, nav links, legal links, copyright |
| 6 | `marketing.css` stylesheet | Breathing glow keyframes, header/footer-specific styles, reduced motion overrides |
| 7 | Navigation type definitions | `MarketingNavItem`, `MarketingNavConfig` interfaces |
| 8 | Placeholder pages for all marketing routes | Minimal server components returning route title in a styled shell |
| 9 | Responsive behavior | Header collapses to hamburger at mobile breakpoint; footer stacks to single column |
| 10 | Accessibility | Keyboard navigation, focus trapping in mobile nav, skip-to-content link, ARIA landmarks |

### Out of Scope

| # | Item | Rationale |
|---|------|-----------|
| 1 | Gateway page (`/`) modifications | WS-C.1 handles gateway integration |
| 2 | Spatial ZUI (`/launch`) modifications | Separate route, no layout wrapping needed |
| 3 | Page-level content for marketing routes | WS-B.2 through WS-B.9 deliver content |
| 4 | Copy/messaging decisions | WS-B.1 delivers finalized copy |
| 5 | Color scheme toggle | Marketing pages are always Safetrekr theme [CODEBASE: `data-color-scheme="safetrekr"` on `<html>` in `src/app/layout.tsx:35`] |
| 6 | SEO metadata per page | WS-A.3 handles SEO infrastructure |
| 7 | Contact form backend | WS-A.4 handles form infrastructure |
| 8 | Analytics instrumentation | WS-C.3 handles analytics |
| 9 | OG images | WS-C.4 handles social images |
| 10 | Blog route structure | WS-D.4 handles blog separately |

---

## 3. Input Dependencies

| Dependency | Source | Status | Notes |
|------------|--------|--------|-------|
| Root layout pattern | `src/app/layout.tsx` [CODEBASE] | Available | Server component with ThemeProvider + QueryProvider wrapping. Font variables `--font-geist-sans` and `--font-geist-mono` loaded via `next/font/google`. Body class: `font-sans antialiased`. `data-color-scheme="safetrekr"` set on `<html>` element. |
| Spatial token system | `src/styles/spatial-tokens.css` [CODEBASE] | Available | Safetrekr dark mode tokens: `--color-void: #061a23`, `--color-abyss: #08202b`, `--color-deep: #0a2733`, `--color-surface: #123646`, `--color-raised: #2a4a59`, `--color-overlay: #365462`. Ember accent (green): `--color-ember: #4ba467`, `--color-ember-bright: #6abf84`, `--color-ember-glow: #92d4a6`. Text: `--color-text-primary: #e8f0f4`, `--color-text-secondary: #929899`, `--color-text-tertiary: #5a7a88`. Glow: `--glow-ember-subtle`, `--glow-ember-medium`, `--glow-ember-bright`. RGB components: `--ember-rgb: 75, 164, 103`. |
| Tailwind theme bridge | `src/app/globals.css` [CODEBASE] | Available | Two `@theme inline` blocks map CSS vars to Tailwind utilities: `bg-void`, `text-ember`, `text-text-primary`, etc. Body base: `bg-void text-foreground`. |
| Glass-morphism pattern | `src/components/districts/detail-panel.tsx` [CODEBASE] | Available | Reference implementation: `bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]` + `border border-white/[0.08]`. Glow shadow: `shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_0_1px_0_rgba(var(--ember-rgb),0.3),0_0_24px_rgba(var(--ember-rgb),0.1)]`. |
| Breathing glow pattern | `src/styles/gateway.css` [CODEBASE] | Available | `@keyframes gateway-cta-breathe` -- 5s box-shadow oscillation using `rgba(75, 164, 103, ...)`. Reduced motion disables via `animation: none !important`. |
| `cn()` utility | `src/lib/utils.ts` [CODEBASE] | Available | `clsx` + `tailwind-merge` composition. Import: `import { cn } from '@/lib/utils'`. |
| Logo assets | `public/images/logos/` [CODEBASE] | Available | `safetrekr-logo-horiz-light.svg` (horizontal wordmark for dark bg header), `safetrekr-mark-light.svg` (compact mark for mobile header). Both confirmed present. |
| Lucide icons | `lucide-react` in `package.json` [CODEBASE] | Available | Used elsewhere in codebase (e.g., `SpatialBreadcrumb.tsx` uses `ChevronRight`). Provides `Menu`, `X`, `ChevronDown` icons for mobile nav. |
| motion/react | `motion` package in `package.json` [CODEBASE] | Available | Import as `import { motion, AnimatePresence } from 'motion/react'`. NEVER import from `framer-motion`. |
| Reduced motion pattern | `src/styles/reduced-motion.css` [CODEBASE] | Available | Global catch-all: `*:not(.reduced-motion-exempt)` reduces animation duration to 0.001ms. Marketing CSS must follow same `@media (prefers-reduced-motion: reduce)` pattern for explicit class-based overrides. |

---

## 4. Deliverables

### 4.1 Route Group Directory Structure

Create the `(marketing)` route group under `src/app/` with placeholder pages for every marketing route. The parenthesized directory name is a Next.js App Router convention that groups routes under a shared layout without adding a URL segment.

**Files to create:**

```
src/app/(marketing)/
  layout.tsx
  landing/page.tsx
  how-it-works/page.tsx
  platform/page.tsx
  solutions/page.tsx
  pricing/page.tsx
  security/page.tsx
  about/page.tsx
  contact/page.tsx
  legal/
    terms/page.tsx
    privacy/page.tsx
```

**Resulting URL structure** (the `(marketing)` segment is invisible in URLs):

| File Path | URL | Purpose |
|-----------|-----|---------|
| `src/app/(marketing)/landing/page.tsx` | `/landing` | Traditional landing page |
| `src/app/(marketing)/how-it-works/page.tsx` | `/how-it-works` | Product walkthrough |
| `src/app/(marketing)/platform/page.tsx` | `/platform` | Platform overview |
| `src/app/(marketing)/solutions/page.tsx` | `/solutions` | Use-case solutions |
| `src/app/(marketing)/pricing/page.tsx` | `/pricing` | Pricing tiers |
| `src/app/(marketing)/security/page.tsx` | `/security` | Security & compliance |
| `src/app/(marketing)/about/page.tsx` | `/about` | Company / team |
| `src/app/(marketing)/contact/page.tsx` | `/contact` | Contact / demo request |
| `src/app/(marketing)/legal/terms/page.tsx` | `/legal/terms` | Terms of service |
| `src/app/(marketing)/legal/privacy/page.tsx` | `/legal/privacy` | Privacy policy |

**Unaffected routes** (must NOT be inside the route group):

| File Path | URL | Why Excluded |
|-----------|-----|--------------|
| `src/app/page.tsx` | `/` | Gateway -- cinematic boot sequence, no header/footer |
| `src/app/launch/page.tsx` | `/launch` | Spatial ZUI -- has its own NavigationHUD overlay |
| `src/app/login/page.tsx` | `/login` | Authentication -- separate layout |
| `src/app/spike/page.tsx` | `/spike` | Development spike -- no production layout needed |

### 4.2 Marketing Layout (`src/app/(marketing)/layout.tsx`)

Server component that wraps all marketing content pages with the header and footer. Imports the marketing stylesheet.

**Component signature:**

```typescript
// src/app/(marketing)/layout.tsx

import type { Metadata } from 'next'
import { MarketingHeader } from '@/components/marketing/marketing-header'
import { MarketingFooter } from '@/components/marketing/marketing-footer'
import '@/styles/marketing.css'

export const metadata: Metadata = {
  // Base metadata for marketing pages; individual pages override via own exports
}

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <a
        href="#main-content"
        className={/* skip-to-content link styles -- see below */}
      >
        Skip to main content
      </a>
      <MarketingHeader />
      <main id="main-content">
        {children}
      </main>
      <MarketingFooter />
    </>
  )
}
```

**Key requirements:**

- **Server component** (no `'use client'` directive). The layout itself performs no client-side interactivity; that lives inside the header and mobile nav components.
- **Skip-to-content link**: Visually hidden by default, visible on focus. Targets `#main-content`. Styled with `sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded focus:bg-ember focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-void`.
- **`<main id="main-content">`**: ARIA landmark for the primary content area. Child pages render here.
- **Imports `@/styles/marketing.css`**: Marketing-specific keyframes and utility classes.
- **Does NOT duplicate providers**: The root `src/app/layout.tsx` already wraps all pages with `ThemeProvider` and `QueryProvider` [CODEBASE: `layout.tsx:40-47`]. This layout nests inside that shell.
- **Does NOT re-declare fonts**: Root layout loads Geist Sans and Geist Mono via `next/font/google` and applies them as CSS variables. These inherit down to the marketing layout automatically.

### 4.3 Marketing Header (`src/components/marketing/marketing-header.tsx`)

Client component (`'use client'`) implementing the fixed glass-morphism navigation bar.

**Component signature:**

```typescript
// src/components/marketing/marketing-header.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { NAV_ITEMS, CTA_CONFIG } from '@/lib/config/marketing-nav'
import type { MarketingNavItem } from '@/lib/interfaces/marketing-nav'
import { MarketingMobileNav } from './marketing-mobile-nav'

interface MarketingHeaderProps {
  /** Override default transparent behavior for pages that need opaque headers */
  forceOpaque?: boolean
}

export function MarketingHeader({ forceOpaque = false }: MarketingHeaderProps) {
  // ...
}
```

**Visual specification:**

| Property | Value | Token / Class |
|----------|-------|---------------|
| Position | Fixed, full-width, top | `fixed top-0 left-0 right-0 z-50` |
| Height | 56px mobile, 64px desktop | `h-14 md:h-16` |
| Background | Glass-morphism | `bg-white/[0.04] backdrop-blur-[16px] backdrop-saturate-[130%]` |
| Bottom border | 1px at low opacity | `border-b border-white/[0.06]` |
| Max content width | 1280px centered | Inner `<nav>` uses `mx-auto max-w-7xl px-6 lg:px-8` |
| Scroll behavior | Background opacity increases on scroll | JS: listen to `scroll` event, toggle class when `scrollY > 20` |
| Transition | Smooth background change | `transition-colors duration-[var(--duration-transition)]` (300ms) |

**Desktop layout (>= 768px):**

| Zone | Content | Alignment |
|------|---------|-----------|
| Left | Safetrekr logo (horizontal, `safetrekr-logo-horiz-light.svg`, ~120px wide, height capped at 28px) linking to `/` | `flex-shrink-0` |
| Center | Nav links: How It Works, Platform, Solutions, Pricing, Security | `flex gap-1` centered |
| Right | "Schedule a Briefing" CTA button | `flex-shrink-0` |

**Nav link styling:**

```
// Individual nav link classes
cn(
  'px-3 py-2 rounded-md text-sm font-medium',
  'text-[var(--color-text-secondary)]',
  'hover:text-[var(--color-text-primary)]',
  'hover:bg-white/[0.04]',
  'transition-colors duration-[var(--duration-hover)]',
  // Active state (current route match)
  isActive && 'text-[var(--color-ember-bright)] bg-white/[0.04]',
  // Focus-visible
  'focus-visible:outline-2 focus-visible:outline-offset-2',
  'focus-visible:outline-[var(--color-ember-bright)]',
)
```

Active route detection: Compare `usePathname()` return value against `item.href`. A nav item is active when the pathname starts with the item's href (e.g., `/solutions` matches `/solutions` and `/solutions/education`).

**CTA button styling (header):**

```
cn(
  'mkt-cta-breathe',                      // breathing glow animation class
  'rounded-full px-5 py-2',
  'text-sm font-medium',
  'bg-[var(--color-ember)] text-[var(--color-void)]',
  'hover:bg-[var(--color-ember-bright)]',
  'active:scale-[0.97]',
  'transition-all duration-[var(--duration-hover)]',
  'focus-visible:outline-2 focus-visible:outline-offset-2',
  'focus-visible:outline-[var(--color-ember-bright)]',
)
```

The CTA links to `/contact` (the "Schedule a Briefing" page).

**Scroll-aware opacity:**

On scroll, the header transitions from `bg-white/[0.04]` to `bg-[var(--color-void)]/80` when `window.scrollY > 20`. Implementation uses a `useEffect` with a passive scroll listener and a `useState<boolean>` for `isScrolled`. The transition uses `transition-colors duration-[var(--duration-transition)]`.

```typescript
useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 20)
  }
  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```

The scroll listener uses `{ passive: true }` for performance. No `requestAnimationFrame` throttling is needed because the handler only sets a boolean state -- React batches the update naturally.

**Mobile layout (< 768px):**

| Zone | Content |
|------|---------|
| Left | Safetrekr mark (`safetrekr-mark-light.svg`, 32px height) linking to `/` |
| Right | Hamburger button (Lucide `Menu` icon, 24x24) opening `MarketingMobileNav` |

The full nav links and CTA are hidden at `< md` breakpoint via `hidden md:flex`. The hamburger button is shown at `< md` via `md:hidden`.

**Hamburger button styling:**

```
cn(
  'flex h-10 w-10 items-center justify-center rounded-full md:hidden',
  'bg-white/[0.04] hover:bg-white/[0.08]',
  'border border-white/[0.06] hover:border-white/[0.12]',
  'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
  'transition-all duration-200',
  'focus-visible:outline-2 focus-visible:outline-offset-2',
  'focus-visible:outline-[var(--color-ember-bright)]',
)
```

### 4.4 Marketing Mobile Nav (`src/components/marketing/marketing-mobile-nav.tsx`)

Client component implementing the slide-in mobile navigation panel.

**Component signature:**

```typescript
// src/components/marketing/marketing-mobile-nav.tsx
'use client'

import { useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_ITEMS, CTA_CONFIG } from '@/lib/config/marketing-nav'

interface MarketingMobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MarketingMobileNav({ isOpen, onClose }: MarketingMobileNavProps) {
  // ...
}
```

**Visual specification:**

| Property | Value | Token / Class |
|----------|-------|---------------|
| Overlay | Full-screen dark scrim | `fixed inset-0 z-50 bg-black/60` |
| Panel | Slide from right, 80% width max 320px | `fixed top-0 right-0 bottom-0 z-50 w-[80vw] max-w-[320px]` |
| Panel background | Solid dark with blur | `bg-[var(--color-void)]/95 backdrop-blur-[var(--blur-heavy)]` |
| Panel border | Left edge accent | `border-l border-white/[0.08]` |
| Entry animation | Slide from right 100% to 0 | `motion/react`: `initial={{ x: '100%' }}` `animate={{ x: 0 }}` with spring `stiffness: 300, damping: 30` |
| Exit animation | Slide to right | `exit={{ x: '100%' }}` with `duration: 0.2, ease: [0.4, 0, 1, 1]` |
| Panel padding | Comfortable touch targets | `p-6 pt-4` |

**Panel content (top to bottom):**

1. **Close button** (top-right): Lucide `X` icon, same styling as detail-panel close button [CODEBASE: `detail-panel.tsx:125-133`] -- `h-10 w-10 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06]`
2. **Nav links**: Full-width buttons, stacked vertically with `gap-1`. Each link uses:
   ```
   cn(
     'w-full px-4 py-3 text-left rounded-lg text-base font-medium',
     'text-[var(--color-text-secondary)]',
     'hover:text-[var(--color-text-primary)] hover:bg-white/[0.04]',
     'transition-colors duration-[var(--duration-hover)]',
     isActive && 'text-[var(--color-ember-bright)] bg-white/[0.04]',
     'focus-visible:outline-2 focus-visible:outline-offset-2',
     'focus-visible:outline-[var(--color-ember-bright)]',
   )
   ```
3. **Divider**: `<hr className="border-white/[0.06] my-4" />`
4. **CTA button**: Full-width version of the header CTA, same breathing glow class `mkt-cta-breathe`, with `w-full text-center` added

**Behavioral requirements:**

- **Focus trap**: When open, Tab/Shift+Tab cycles through close button, nav links, and CTA only. Focus does not escape to content behind the panel. Implementation approach: on open, query all focusable elements within the panel container (`button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])`), track first and last elements, and on Tab at last element wrap to first (and vice versa for Shift+Tab).
- **Initial focus**: When panel opens, focus moves to the close button.
- **Escape key**: Closes the panel. Implemented via `useEffect` with a `keydown` listener.
- **Backdrop click**: Clicking the scrim overlay closes the panel. The overlay `<div>` has `onClick={onClose}`. The panel itself has `onClick={(e) => e.stopPropagation()}` to prevent close when clicking inside the panel.
- **Route change close**: Panel auto-closes when `usePathname()` changes (user navigated via a link). Implemented via `useEffect` with pathname as a dependency.
- **Scroll lock**: When open, `document.body.style.overflow = 'hidden'`. Restored on close/unmount via `useEffect` cleanup.
- **`aria-modal="true"`** on the panel container.
- **`role="dialog"`** with `aria-label="Navigation menu"`.
- **`aria-expanded`** on the hamburger button in the header, reflecting the open state.

### 4.5 Marketing Footer (`src/components/marketing/marketing-footer.tsx`)

Server component (no `'use client'`) rendering the site footer.

**Component signature:**

```typescript
// src/components/marketing/marketing-footer.tsx

import Link from 'next/link'
import { FOOTER_NAV_COLUMNS, FOOTER_LEGAL_LINKS } from '@/lib/config/marketing-nav'

export function MarketingFooter() {
  // ...
}
```

**Visual specification:**

| Property | Value | Token / Class |
|----------|-------|---------------|
| Background | Gradient from void to abyss | `bg-gradient-to-b from-[var(--color-void)] to-[var(--color-abyss)]` |
| Top border | Subtle separator | `border-t border-white/[0.06]` |
| Padding | `py-16 px-6 lg:px-8` | Generous vertical spacing |
| Max content width | 1280px centered | `mx-auto max-w-7xl` |
| Text color | Secondary for body, tertiary for less important | `text-[var(--color-text-secondary)]`, `text-[var(--color-text-tertiary)]` |
| Semantic element | `<footer>` with ARIA label | `<footer aria-label="Site footer">` |

**Desktop layout (3-zone grid):**

| Zone | Content | Grid Area |
|------|---------|-----------|
| Top-left | Logo (`safetrekr-logo-horiz-light.svg`, 120px wide) + tagline ("Every traveler accounted for.") | `col-span-1` |
| Top-center/right | 3 nav columns | `col-span-2 grid grid-cols-3 gap-8` |
| Bottom | Legal links (Terms, Privacy) + copyright | Full width, `border-t border-white/[0.06] pt-8 mt-12` |

**Overall grid:** `grid grid-cols-1 md:grid-cols-3 gap-12`

**Footer nav columns:**

| Column | Heading | Links |
|--------|---------|-------|
| Product | | How It Works (`/how-it-works`), Platform (`/platform`), Pricing (`/pricing`), Security (`/security`) |
| Solutions | | Solutions (`/solutions`), About (`/about`), Contact (`/contact`) |
| Resources | | Mission Control (`/launch`) |

Column heading: `font-mono text-xs font-medium uppercase tracking-[var(--tracking-widest)] text-[var(--color-text-tertiary)] mb-4`

Column link:
```
cn(
  'block py-1.5 text-sm',
  'text-[var(--color-text-secondary)]',
  'hover:text-[var(--color-text-primary)]',
  'transition-colors duration-[var(--duration-hover)]',
  'focus-visible:outline-2 focus-visible:outline-offset-2',
  'focus-visible:outline-[var(--color-ember-bright)]',
)
```

**Footer inner `<nav>`:** `<nav aria-label="Footer navigation">` wrapping the 3-column grid.

**Bottom bar:**

- Left: Legal links (Terms of Service `/legal/terms`, Privacy Policy `/legal/privacy`) separated by `<span aria-hidden="true" class="text-[var(--color-text-ghost)]">&middot;</span>`
- Right: Copyright `(c) 2026 Safetrekr. All rights reserved.`
- Text style: `text-xs text-[var(--color-text-tertiary)]`
- Layout: `flex flex-col md:flex-row items-center md:justify-between gap-4`

**Mobile layout (< 768px):**

- Logo + tagline stack centered
- Nav columns stack to single column with column headings as section headers
- Bottom bar stacks centered (legal links above copyright)

### 4.6 Navigation Configuration (`src/lib/config/marketing-nav.ts`)

Centralized navigation data consumed by both header and footer. Single source of truth for all marketing nav links.

**Type definitions (`src/lib/interfaces/marketing-nav.ts`):**

```typescript
// src/lib/interfaces/marketing-nav.ts

export interface MarketingNavItem {
  /** Display label in navigation */
  label: string
  /** Route path (relative, starting with /) */
  href: string
  /** Optional: external link opens in new tab */
  external?: boolean
  /** Optional: nested sub-items for future vertical pages (WS-D.1) */
  children?: MarketingNavItem[]
}

export interface MarketingFooterColumn {
  /** Column heading */
  heading: string
  /** Links in this column */
  items: MarketingNavItem[]
}

export interface MarketingCTAConfig {
  /** Button label text */
  label: string
  /** Target route */
  href: string
}
```

Note: The `children` field on `MarketingNavItem` is included proactively for WS-D.1 (Vertical Pages) which may need dropdown sub-navigation. It is optional and unused in this workstream. See D-8 in Section 6.

**Configuration (`src/lib/config/marketing-nav.ts`):**

```typescript
// src/lib/config/marketing-nav.ts

import type {
  MarketingNavItem,
  MarketingFooterColumn,
  MarketingCTAConfig,
} from '@/lib/interfaces/marketing-nav'

/** Primary header nav links (center zone) */
export const NAV_ITEMS: MarketingNavItem[] = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Platform', href: '/platform' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Security', href: '/security' },
] as const satisfies readonly MarketingNavItem[]

/** Header + mobile nav CTA button configuration */
export const CTA_CONFIG: MarketingCTAConfig = {
  label: 'Schedule a Briefing',
  href: '/contact',
}

/** Footer navigation columns */
export const FOOTER_NAV_COLUMNS: MarketingFooterColumn[] = [
  {
    heading: 'Product',
    items: [
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Platform', href: '/platform' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Security', href: '/security' },
    ],
  },
  {
    heading: 'Solutions',
    items: [
      { label: 'Solutions', href: '/solutions' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Resources',
    items: [
      { label: 'Mission Control', href: '/launch' },
    ],
  },
]

/** Footer legal links (bottom bar) */
export const FOOTER_LEGAL_LINKS: MarketingNavItem[] = [
  { label: 'Terms of Service', href: '/legal/terms' },
  { label: 'Privacy Policy', href: '/legal/privacy' },
]
```

### 4.7 Marketing Stylesheet (`src/styles/marketing.css`)

Dedicated CSS file for marketing layout animations and utility classes. Imported by the marketing layout. Follows the same pattern as existing stylesheets (`src/styles/gateway.css`, `src/styles/atrium.css`) [CODEBASE].

**Contents:**

```css
/* =================================================================
   Safetrekr Marketing -- Layout Styles
   =================================================================
   Breathing glow animations for the marketing CTA, header
   scroll-state transitions, and reduced motion overrides.

   Imported by: src/app/(marketing)/layout.tsx
   ================================================================= */

/* -----------------------------------------------------------------
   CTA breathing glow -- 5s box-shadow oscillation
   Adapted from gateway-cta-breathe in src/styles/gateway.css
   Uses safetrekr green: rgba(75, 164, 103, ...)
   ----------------------------------------------------------------- */
@keyframes mkt-cta-breathe {
  0%, 100% {
    box-shadow:
      0 0 20px rgba(75, 164, 103, 0.08),
      0 0 8px rgba(75, 164, 103, 0.14),
      0 0 2px rgba(146, 212, 166, 0.25);
  }
  50% {
    box-shadow:
      0 0 20px rgba(75, 164, 103, 0.18),
      0 0 8px rgba(75, 164, 103, 0.28),
      0 0 2px rgba(146, 212, 166, 0.45);
  }
}

.mkt-cta-breathe {
  animation: mkt-cta-breathe 5s ease-in-out infinite;
}

/* -----------------------------------------------------------------
   Header scroll state
   Applied via JS when scrollY > 20.
   ----------------------------------------------------------------- */
.mkt-header-scrolled {
  background: rgba(6, 26, 35, 0.80);   /* --color-void at 80% */
  border-bottom-color: rgba(255, 255, 255, 0.08);
}

/* -----------------------------------------------------------------
   Reduced motion: disable all marketing animations
   Pattern: src/styles/reduced-motion.css [CODEBASE]
   ----------------------------------------------------------------- */
@media (prefers-reduced-motion: reduce) {
  .mkt-cta-breathe {
    animation: none !important;
    box-shadow:
      0 0 20px rgba(75, 164, 103, 0.12),
      0 0 8px rgba(75, 164, 103, 0.20),
      0 0 2px rgba(146, 212, 166, 0.35);
  }
}
```

**Naming convention:** All marketing CSS classes are prefixed with `mkt-` to avoid collision with existing spatial/gateway classes. This mirrors the `gateway-` prefix used in `src/styles/gateway.css` and `ambient-` prefix used in spatial components.

### 4.8 Placeholder Pages

Each marketing route gets a minimal server component that renders a styled placeholder. This allows route verification, layout testing, and provides a skeleton for Phase B content teams to build upon.

**Placeholder template (example for `src/app/(marketing)/how-it-works/page.tsx`):**

```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How It Works | Safetrekr',
  description: 'Learn how Safetrekr keeps every traveler accounted for.',
}

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-6">
      <div
        className="rounded-2xl border border-white/[0.08] bg-white/[0.04] px-12 py-16 text-center backdrop-blur-[8px]"
      >
        <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-text-tertiary)]">
          WS-B.3
        </p>
        <h1 className="mt-4 font-sans text-3xl font-bold text-[var(--color-text-primary)]">
          How It Works
        </h1>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          Content pending -- Phase B
        </p>
      </div>
    </div>
  )
}
```

**Placeholder page manifest:**

| File | Route | Metadata Title | Downstream WS |
|------|-------|----------------|----------------|
| `(marketing)/landing/page.tsx` | `/landing` | `Safetrekr -- Trip Safety Intelligence` | WS-B.2 |
| `(marketing)/how-it-works/page.tsx` | `/how-it-works` | `How It Works \| Safetrekr` | WS-B.3 |
| `(marketing)/platform/page.tsx` | `/platform` | `Platform \| Safetrekr` | WS-B.4 |
| `(marketing)/solutions/page.tsx` | `/solutions` | `Solutions \| Safetrekr` | WS-B.7 |
| `(marketing)/pricing/page.tsx` | `/pricing` | `Pricing \| Safetrekr` | WS-B.5 |
| `(marketing)/security/page.tsx` | `/security` | `Security \| Safetrekr` | WS-B.6 |
| `(marketing)/about/page.tsx` | `/about` | `About \| Safetrekr` | WS-B.9 |
| `(marketing)/contact/page.tsx` | `/contact` | `Contact \| Safetrekr` | WS-A.4 |
| `(marketing)/legal/terms/page.tsx` | `/legal/terms` | `Terms of Service \| Safetrekr` | WS-B.8 |
| `(marketing)/legal/privacy/page.tsx` | `/legal/privacy` | `Privacy Policy \| Safetrekr` | WS-B.8 |

Each placeholder follows the template pattern above, with the WS label, page title, and "Content pending" message adjusted per row.

### 4.9 Component File Manifest

Complete list of all new files to be created:

| # | File Path | Type | Directive | Dependencies |
|---|-----------|------|-----------|--------------|
| 1 | `src/app/(marketing)/layout.tsx` | Server component | -- | MarketingHeader, MarketingFooter, marketing.css |
| 2 | `src/components/marketing/marketing-header.tsx` | Client component | `'use client'` | next/link, next/navigation, cn, marketing-nav config, MarketingMobileNav, lucide-react (Menu) |
| 3 | `src/components/marketing/marketing-mobile-nav.tsx` | Client component | `'use client'` | next/link, next/navigation, motion/react, cn, marketing-nav config, lucide-react (X) |
| 4 | `src/components/marketing/marketing-footer.tsx` | Server component | -- | next/link, marketing-nav config |
| 5 | `src/components/marketing/index.ts` | Barrel export | -- | Re-exports MarketingHeader, MarketingFooter |
| 6 | `src/lib/interfaces/marketing-nav.ts` | Type definitions | -- | None |
| 7 | `src/lib/config/marketing-nav.ts` | Configuration | -- | marketing-nav types |
| 8 | `src/styles/marketing.css` | Stylesheet | -- | None (references spatial token values directly) |
| 9-18 | `src/app/(marketing)/*/page.tsx` (10 files) | Server components | -- | next Metadata type |

**Total new files: 18**

**New directories:**

| Directory | Purpose |
|-----------|---------|
| `src/app/(marketing)/` | Route group root |
| `src/app/(marketing)/landing/` | Landing page route |
| `src/app/(marketing)/how-it-works/` | How It Works page route |
| `src/app/(marketing)/platform/` | Platform page route |
| `src/app/(marketing)/solutions/` | Solutions page route |
| `src/app/(marketing)/pricing/` | Pricing page route |
| `src/app/(marketing)/security/` | Security page route |
| `src/app/(marketing)/about/` | About page route |
| `src/app/(marketing)/contact/` | Contact page route |
| `src/app/(marketing)/legal/` | Legal pages parent |
| `src/app/(marketing)/legal/terms/` | Terms of Service page route |
| `src/app/(marketing)/legal/privacy/` | Privacy Policy page route |
| `src/components/marketing/` | Marketing layout components |
| `src/lib/config/` | Configuration files (new directory if not existing) |

---

## 5. Acceptance Criteria

| ID | Criterion | Verification Method |
|----|-----------|---------------------|
| AC-1 | All 10 marketing routes resolve to their expected URLs and render inside the marketing layout (header visible above, footer visible below) | Manual: navigate to each route in dev server; verify header and footer presence |
| AC-2 | Gateway (`/`) and Launch (`/launch`) pages render WITHOUT the marketing header or footer | Manual: navigate to `/` and `/launch`; confirm no header/footer elements in DOM |
| AC-3 | Header is fixed at viewport top and remains visible during page scroll | Manual: scroll a long placeholder page; header stays pinned |
| AC-4 | Header glass-morphism matches the specified visual treatment: `bg-white/[0.04]` at rest, `bg-[var(--color-void)]/80` when scrolled past 20px | Manual + DevTools: inspect computed styles at rest and after scroll |
| AC-5 | Header nav links highlight the active route using `text-[var(--color-ember-bright)]` when the current pathname matches the link's href | Manual: visit each nav route; confirm active link is visually distinct |
| AC-6 | "Schedule a Briefing" CTA button renders with the breathing glow animation (class `mkt-cta-breathe`) and links to `/contact` | Manual: visually confirm glow pulsing; click CTA and verify navigation |
| AC-7 | At viewport widths < 768px, header nav links are hidden and replaced by a hamburger menu button | Manual: resize browser below 768px; confirm hamburger appears and links disappear |
| AC-8 | Tapping the hamburger opens a slide-in panel from the right with all nav links and the CTA; tapping X or the backdrop closes it | Manual: test on mobile viewport |
| AC-9 | Mobile nav panel traps focus: Tab/Shift+Tab cycles through interactive elements within the panel only | Manual: open mobile nav, press Tab repeatedly; focus must not escape panel |
| AC-10 | Pressing Escape closes the mobile nav panel | Manual: open panel, press Escape |
| AC-11 | When mobile nav is open, body scroll is locked (`overflow: hidden`); scroll is restored when closed or on unmount | Manual: open panel on a long page; attempt to scroll body content |
| AC-12 | Mobile nav closes automatically when a link is clicked (route change detected via `usePathname()`) | Manual: open mobile nav, click a link; panel should close after navigation |
| AC-13 | Footer renders 3 nav columns with correct headings and links per Deliverable 4.5 | Manual: scroll to footer; verify columns and link targets |
| AC-14 | Footer legal links (Terms, Privacy) and copyright text render in the bottom bar | Manual: inspect footer bottom bar |
| AC-15 | All interactive elements (nav links, CTA, hamburger, close button, footer links) have visible focus indicators matching the codebase pattern: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]` | Manual: Tab through all interactive elements; verify focus rings |
| AC-16 | Skip-to-content link is present, visually hidden by default, visible on focus, and jumps to `#main-content` | Manual: load any marketing page, press Tab once; skip link appears; press Enter; focus moves to main content |
| AC-17 | Mobile nav panel has `role="dialog"`, `aria-modal="true"`, and `aria-label="Navigation menu"` | DevTools: inspect panel element attributes when open |
| AC-18 | Header `<nav>` element has `aria-label="Main navigation"` | DevTools: inspect header nav element |
| AC-19 | Footer `<footer>` element has `aria-label="Site footer"` with internal `<nav aria-label="Footer navigation">` | DevTools: inspect footer element |
| AC-20 | All breathing glow animations respect `prefers-reduced-motion: reduce` -- animation stops, static glow remains | Manual: enable reduced motion in OS settings; confirm static shadow on CTA |
| AC-21 | `pnpm typecheck` passes with zero errors after all files are created | CLI: run `pnpm typecheck` |
| AC-22 | `pnpm lint` passes with zero errors after all files are created | CLI: run `pnpm lint` |
| AC-23 | `pnpm build` completes successfully | CLI: run `pnpm build` |
| AC-24 | Logo in header uses `safetrekr-logo-horiz-light.svg` on desktop and `safetrekr-mark-light.svg` on mobile, both with `alt="Safetrekr"` | DevTools: inspect img elements at both breakpoints |
| AC-25 | Header, mobile nav, and footer use ONLY the existing spatial token CSS variables -- no hardcoded colors outside of the `marketing.css` keyframe definitions (which must use the safetrekr green values directly for animation) | Code review: grep for hex colors in component files |
| AC-26 | No `import` from `'framer-motion'` anywhere -- only `'motion/react'` | Code review: `grep -r "framer-motion" src/components/marketing/` returns 0 results |
| AC-27 | Hamburger button has `aria-expanded` attribute that reflects the mobile nav open state, and `aria-controls` pointing to the mobile nav panel's `id` | DevTools: inspect hamburger button attributes in both open and closed states |

---

## 6. Decisions Made

| # | Decision | Rationale | Alternatives Considered |
|---|----------|-----------|------------------------|
| D-1 | Use Next.js App Router route group `(marketing)` for all content pages | Groups routes under a shared layout without polluting URL paths. Keeps gateway and launch routes independent. [AD-1] | Nested `marketing/` directory (would add `/marketing/` prefix to all URLs) |
| D-2 | Header is a client component; footer is a server component | Header needs `useState` for mobile nav toggle, `useState` for scroll state, and `usePathname` for active link detection. Footer is pure markup with no interactivity. | Both as client components (unnecessary JS bundle for footer) |
| D-3 | Navigation data lives in `src/lib/config/marketing-nav.ts`, types in `src/lib/interfaces/marketing-nav.ts` | Follows codebase convention: types in `src/lib/interfaces/`, config as a separate concern [CODEBASE: CLAUDE.md]. Single source of truth for nav items used by header, mobile nav, and footer. | Inline arrays in each component (duplication risk); CMS-driven nav (over-engineering for launch) |
| D-4 | Mobile nav uses `motion/react` `AnimatePresence` for slide animation | Consistent with codebase animation patterns (e.g., `detail-panel.tsx` uses `motion` for enter/exit) [CODEBASE]. Package already in dependencies. | CSS-only transitions (harder to coordinate with focus trap timing); headless dialog library (adds dependency) |
| D-5 | Prefix marketing CSS classes with `mkt-` | Avoids collision with existing spatial engine classes (`ambient-*`), gateway classes (`gateway-*`), and atrium classes [CODEBASE: `src/styles/`]. | No prefix (collision risk with `breathe`, `cta`); BEM naming (inconsistent with codebase's utility-first approach) |
| D-6 | Glass-morphism values match `detail-panel.tsx` exactly for content surfaces: `bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]` | Ensures visual consistency across the site. `detail-panel.tsx` is the canonical glass surface implementation. [CODEBASE] | Lighter blur (less cohesive); custom values (diverges from established pattern) |
| D-7 | Header uses `bg-white/[0.04]` (lighter than detail-panel's 0.06) for the default rest state | Navigation chrome should be subtler than content panels. The detail-panel's 0.06 is appropriate for content surfaces but too prominent for an always-visible header. On scroll, opacity increases to maintain readability over scrolled content. | Same as detail-panel (too heavy for persistent chrome); fully transparent (illegible over busy backgrounds) |
| D-8 | `MarketingNavItem` includes an optional `children` field proactively | WS-D.1 (Vertical Pages) may require dropdown sub-navigation. Adding the field now costs nothing but prevents a type migration later. The field is optional and unused in this workstream's components. | Add later when needed (requires touching types, config, and all consuming components simultaneously) |
| D-9 | Skip-to-content link placed in the marketing layout, not the root layout | Only marketing pages need it -- the gateway is a single-screen experience, and the launch page has its own ZUI navigation. Adding it to root layout would create a confusing Tab stop on non-applicable pages. | Root layout (unnecessary on gateway/launch); each page individually (duplication) |
| D-10 | Footer has a "Resources" column with a "Mission Control" link pointing to `/launch` | Creates a discovery path from traditional marketing pages to the spatial ZUI experience. | No cross-link (users may never discover the ZUI); prominent hero CTA (scope of WS-B.2, not this workstream) |
| D-11 | Breathing glow only on the primary CTA ("Schedule a Briefing"), not on nav links or other interactive elements | Per AD-2 specification: "Breathing glow on primary CTA only -- one per page." Keeps the effect rare and meaningful. | Glow on all hover states (dilutes the effect, distracts); no glow (misses brand identity opportunity) |
| D-12 | Components placed in `src/components/marketing/` (not `src/components/layout/`) | The `layout/` directory does not exist and "marketing" is more descriptive of the component domain. Consistent with `src/components/districts/`, `src/components/spatial/`, `src/components/ambient/` naming convention in the codebase. | `src/components/layout/` (generic, less discoverable); inline in the route group directory (Next.js convention discourages this for shared components) |
| D-13 | Focus trap in mobile nav is implemented manually, not via a library | Avoids adding a dependency for a single use case. The focus trap logic is straightforward: query focusable elements, handle Tab/Shift+Tab wrapping. If complexity grows or bugs emerge, `focus-trap-react` can be added as a targeted improvement. | `focus-trap-react` library (adds ~3KB, but is an unnecessary dependency for a single panel); `@radix-ui/react-dialog` (would bring in Radix as a dependency for one component) |

---

## 7. Open Questions

| # | Question | Impact | Owner | Resolution Deadline |
|---|----------|--------|-------|---------------------|
| OQ-1 | Should the "Schedule a Briefing" CTA link to `/contact` with a specific anchor (e.g., `/contact#booking`) or open an external scheduling tool (Calendly, etc.)? | Affects CTA `href` value and whether external link handling is needed | Product | Before WS-A.4 implementation |
| OQ-2 | Should the footer "Resources" column include a "Documentation" link pointing to an external docs site, or is "Mission Control" sufficient for launch? | Affects `FOOTER_NAV_COLUMNS` config and whether `external: true` handling is needed in footer | Product | Before this workstream ships |
| OQ-3 | Is `/landing` the correct slug for the traditional landing page, or should it resolve at `/` after the gateway is removed/modified in WS-C.1? | May require a redirect or route restructuring in WS-C.1. For now, `/landing` is a safe standalone route that avoids conflicting with the gateway at `/`. | Engineering (WS-C.1) | Before WS-C.1 implementation |
| OQ-4 | Should the header be fully transparent at the top of a page and only gain the glass effect on scroll, or always have the glass background? | Minor visual refinement. Current spec says glass always present, opacity increases on scroll. Confirm with design. If transparent at top is preferred, the `forceOpaque` prop on MarketingHeader provides an escape hatch for pages with busy hero sections. | Design | Before implementation |
| OQ-5 | Does the mobile hamburger menu need to support sub-navigation (dropdowns within the slide panel) for future verticals (WS-D.1)? | If yes, the `MarketingNavItem` type already has `children?: MarketingNavItem[]` (D-8), but the mobile nav component would need accordion/expand behavior. Currently unused. | Engineering (WS-D.1) | Before WS-D.1 implementation |

---

## 8. Risk Register

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|------------|--------|------------|
| R-1 | Glass-morphism `backdrop-blur` causes performance issues on low-end mobile devices | Medium | Medium | Test on real devices. Provide a CSS fallback: if `backdrop-filter` is not supported, fall back to `bg-[var(--color-void)]/90` (solid dark with high opacity). Use `@supports (backdrop-filter: blur(16px))` in marketing.css to conditionally apply blur. Modern Safari, Chrome, and Firefox all support backdrop-filter, so this is primarily for graceful degradation. |
| R-2 | Route group `(marketing)` conflicts with existing `src/app/page.tsx` for the `/` path | Low | High | The gateway `page.tsx` is at `src/app/page.tsx` (root), not inside `(marketing)/`. Next.js resolves root `page.tsx` over route group pages. This is well-defined App Router behavior [verified: no `page.tsx` directly in `(marketing)/`, only in subdirectories], but verify during AC-2 testing. |
| R-3 | Focus trap implementation in mobile nav has edge cases (e.g., browser extensions injecting focusable elements, dynamic content) | Medium | Low | Use a battle-tested focus trap approach: query all focusable elements within the panel container on open, manage first/last element wrap-around manually. If edge cases emerge during testing, `focus-trap-react` (~3KB) can be added as a targeted replacement without changing the component API. |
| R-4 | Scroll-based header opacity change causes layout shift or jank on fast scroll | Low | Low | The scroll listener uses `{ passive: true }` and only toggles a boolean CSS class (no layout/paint-heavy changes). The `mkt-header-scrolled` class changes `background` and `border-bottom-color` only, which are composited properties when used with `backdrop-filter`. Performance impact is negligible. |
| R-5 | Marketing stylesheet `@keyframes mkt-cta-breathe` names collide with future animation additions | Low | Low | Mitigated by `mkt-` prefix convention (D-5). Document the convention in the stylesheet header for future contributors. |
| R-6 | Downstream workstreams (WS-B.2--B.9) require layout modifications not anticipated (e.g., per-page banner slots, sidebar navigation for sub-pages) | Medium | Medium | Design the layout with a single `{children}` slot and no assumptions about page structure. If a banner or sidebar is needed, it can be added as an optional prop or a nested layout within a specific route. Do not over-engineer now. The Next.js App Router supports nested layouts natively, so any route can add its own layout.tsx without modifying the shared marketing layout. |
| R-7 | `safetrekr-logo-horiz-light.svg` and `safetrekr-mark-light.svg` may not be optimized for small header display (e.g., too much detail, incorrect aspect ratio) | Low | Medium | Both SVGs are confirmed to exist in `public/images/logos/` [CODEBASE]. Verify rendering at header height (28px). If SVG has issues at small sizes, create an optimized header-specific variant. The `safetrekr-logo-vert-light.svg` is already used at 22px height in the Launch page NavigationHUD [CODEBASE: `launch/page.tsx:337`], confirming small-size SVG rendering works. |
| R-8 | WCAG contrast ratios for green text on dark backgrounds may fail AA requirements | Medium | High | The `--color-ember-bright: #6abf84` on `--color-void: #061a23` has a contrast ratio of approximately 6.8:1 (passes AA for normal text, which requires 4.5:1). The `--color-text-secondary: #929899` on void background is approximately 6.3:1 (also passes). However, `--color-text-tertiary: #5a7a88` at 3.5:1 fails AA for body text -- this is only used for column headings and metadata labels (font-mono uppercase), which at 12px or smaller may be considered "large text" by WCAG only if bold. Verify all combinations during WS-C.2 (Mobile + Accessibility). For this workstream, avoid using tertiary text for anything a user must read to navigate. |

---

## Estimated Effort

**Size:** M (Medium)
**Estimated time:** 4-6 hours implementation + verification
**Files touched:** 18 new files, 0 modified files
