# WS-C.4: OG Images & Social Sharing

> **Workstream ID:** WS-C.4
> **Phase:** C -- Integration & Polish
> **Assigned Agent:** `world-class-ui-designer`
> **Status:** Draft
> **Created:** 2026-03-02
> **Last Updated:** 2026-03-02
> **Depends On:** Phase B complete (page titles and descriptions must be finalized), WS-A.3 (SEO Infrastructure -- metadata helpers, `SITE_CONFIG`, `generatePageMetadata`, OG image strategy defined)
> **Blocks:** None (final polish workstream; all downstream consumers already reference the `ogImage` field in `generatePageMetadata` which falls back to `public/og/default.png` until this workstream delivers per-page images)
> **Resolves:** Per-page OG image generation, Twitter card visual quality, LinkedIn share card fidelity

---

## 1. Objective

Deliver a complete social sharing image system for the Safetrekr marketing site so that every page shared on LinkedIn, Twitter/X, Slack, iMessage, or Facebook renders a high-fidelity branded card that reinforces the Oblivion HUD aesthetic, communicates the page purpose at a glance, and drives click-through from B2B decision-makers.

Social sharing is the primary organic distribution channel for B2B SaaS. When a security director shares a Safetrekr link on LinkedIn, the card must immediately communicate authority, clarity, and visual distinctiveness. A generic image or broken card erodes trust before the click. This workstream eliminates that risk by generating per-page OG images dynamically using the Next.js `ImageResponse` API, ensuring every page has a unique, on-brand card image that matches the spatial HUD design language.

WS-A.3 established the hybrid OG image strategy: a static default image (`public/og/default.png`) ships with the SEO infrastructure, and this workstream (WS-C.4) implements the per-page dynamic images that replace the default. The metadata plumbing is already in place -- `generatePageMetadata` accepts an `ogImage` field and the root layout sets `metadataBase` for absolute URL resolution. This workstream focuses entirely on visual design and image generation.

---

## 2. Scope

### In Scope

| # | Item | Notes |
|---|------|-------|
| 1 | Default OG image design specification and static asset | `public/og/default.png` -- 1200x630, Oblivion HUD aesthetic. Finalize the design spec from WS-A.3 Section 4.10 and produce the actual image file. |
| 2 | Per-page OG image visual design specifications | Exact layout, typography, color, and compositional specs for all 10 marketing page OG images. |
| 3 | Dynamic OG image component | `src/app/(marketing)/[slug]/opengraph-image.tsx` or per-route `opengraph-image.tsx` files using Next.js `ImageResponse` API. |
| 4 | Twitter card configuration verification | Confirm `summary_large_image` renders correctly across Twitter/X, LinkedIn, Slack, iMessage. |
| 5 | Per-page visual element specifications | Each page gets a unique compositional element (icon, illustration fragment, data visualization motif) that differentiates it from other page cards while maintaining system cohesion. |
| 6 | Social sharing preview testing plan | Structured QA process to verify card rendering on all target platforms. |
| 7 | Font embedding for `ImageResponse` | Load Geist Sans and Geist Mono font files into the `ImageResponse` renderer since `@next/og` uses Satori which requires explicit font data. |
| 8 | OG image alt text per page | Descriptive alt text for each OG image for accessibility compliance. |

### Out of Scope

| # | Item | Rationale |
|---|------|-----------|
| 1 | Blog post OG images | WS-D.4 (Blog) will extend this system with article-specific templates that include author, date, and category. |
| 2 | Vertical sub-page OG images | WS-D.1 (Vertical Pages) will add vertical-specific images using the base template defined here. |
| 3 | Social media profile creation or management | Marketing operations task outside codebase scope. |
| 4 | Social media post copy or campaign strategy | Content marketing deliverable, not a technical image workstream. |
| 5 | Animated or video OG previews | Not supported by current platform standards. Static PNG only. |
| 6 | OG image A/B testing infrastructure | Post-launch optimization. Deliver a consistent baseline first. |

---

## 3. Input Dependencies

| Dependency | Source | Status | Notes |
|------------|--------|--------|-------|
| OG image strategy | WS-A.3 Section 4.10 [PLAN] | Defined | Hybrid approach: static default now, dynamic per-page via `opengraph-image.tsx`. Default spec: 1200x630, `#061A23` background, logo, tagline, green accent glow. Per-page spec: logo mark top-left, page title center, description excerpt below, green accent line, domain bottom-right. |
| `SITE_CONFIG` constant | WS-A.3 Section 4.1 [PLAN] | Defined | `src/lib/config/site.ts` -- provides `name`, `url`, `defaultOgImage`, `ogImageDimensions`, `tagline`, `social` handles. |
| `generatePageMetadata` helper | WS-A.3 Section 4.4 [PLAN] | Defined | `src/lib/seo/metadata.ts` -- accepts `ogImage` field. Per-page OG images are wired by passing `ogImage: '/og/landing.png'` (for static) or by co-locating `opengraph-image.tsx` (for dynamic). |
| `metadataBase` in root layout | WS-A.3 Section 4.7 [PLAN] | Defined | `src/app/layout.tsx` sets `metadataBase: new URL(SITE_CONFIG.url)` which resolves relative OG image URLs to absolute URLs. |
| Per-page titles and descriptions | Phase B pages [PLAN] | Required | Each page must have finalized `title` and `description` strings. These are rendered into the OG images. Draft values exist in WS-A.3 Section 4.9. |
| Brand colors (Safetrekr scheme) | `src/styles/spatial-tokens.css` [CODEBASE] | Available | Primary green: `#4BA467` (`--color-ember` in safetrekr scheme). Void background: `#061A23` (`--color-void`). Text primary: `#E8F0F4` (`--color-text-primary`). Text secondary: `#929899` (`--color-text-secondary`). Deep background: `#0A2733` (`--color-deep`). Surface: `#123646` (`--color-surface`). Raised: `#2A4A59` (`--color-raised`). Border: `#365462` (`--color-border-default`). Ember bright: `#6ABF84` (`--color-ember-bright`). Ember glow: `#92D4A6` (`--color-ember-glow`). |
| Font files | `src/app/globals.css` [CODEBASE] | Available | Geist Sans (primary), Geist Mono (monospace). Font files must be loaded as `ArrayBuffer` for Satori rendering in `ImageResponse`. Geist is available via `next/font/local` or can be bundled from `node_modules`. |
| Logo assets | `public/images/logos/` [CODEBASE] | Available | `safetrekr-mark-light.svg` (shield glyph, white fill, 428x501 viewBox), `safetrekr-logo-horiz-light.svg` (horizontal lockup), `safetrekr-logo-horiz-light.png` (raster fallback), `safetrekr-wordmark-light.svg` (text only). |
| Twitter card type | WS-A.3 Decision D-5 [PLAN] | Decided | `summary_large_image` for all pages. Already configured in `generatePageMetadata` and root layout Twitter defaults. |
| Next.js 16 `ImageResponse` API | Framework [EXTERNAL] | Available | `next/og` exports `ImageResponse`. Uses Satori under the hood for JSX-to-image rendering. Supports a subset of CSS (flexbox only, no grid, no `position: absolute` in some contexts). Font loading via `fetch` + `arrayBuffer()`. Edge runtime. |

---

## 4. Deliverables

### 4.1 Visual Design System for OG Images

All OG images share a unified design system derived from the Safetrekr spatial HUD aesthetic. This section defines the constants that every image -- default and per-page -- must adhere to.

#### 4.1.1 Canvas

| Property | Value | Rationale |
|----------|-------|-----------|
| Width | 1200 px | OG standard. LinkedIn, Twitter, Facebook, Slack all resolve to this width for `summary_large_image`. |
| Height | 630 px | OG standard. 1.91:1 aspect ratio. |
| Format | PNG | Best fidelity for text-heavy cards. JPEG introduces artifacts on sharp type. |
| File size target | Under 200 KB per image | Larger images slow unfurl on LinkedIn and may be rejected by some platforms. Satori/`ImageResponse` produces compact PNGs by default. |

#### 4.1.2 Color Palette

All colors are sourced from the Safetrekr dark scheme tokens in `src/styles/spatial-tokens.css` under `[data-color-scheme='safetrekr'].dark`.

| Token | Hex | Usage in OG Images |
|-------|-----|--------------------|
| `--color-void` | `#061A23` | Primary background fill. The deepest spatial depth stop. |
| `--color-deep` | `#0A2733` | Secondary background. Used for subtle panel fills and grid overlay base. |
| `--color-surface` | `#123646` | Tertiary fill. Used for card/panel elements within the image. |
| `--color-raised` | `#2A4A59` | Elevated panel fill. Used for highlight containers. |
| `--color-border-default` | `#365462` | Grid lines, dividers, panel strokes. |
| `--color-ember` (safetrekr) | `#4BA467` | Primary accent. Accent lines, glow source, logo tint. |
| `--color-ember-bright` | `#6ABF84` | Bright accent. Glow halo, highlighted text. |
| `--color-ember-glow` | `#92D4A6` | Glow diffusion. Soft radial gradient source. |
| `--color-text-primary` | `#E8F0F4` | Primary text (page title, brand name). |
| `--color-text-secondary` | `#929899` | Secondary text (description, domain URL). |
| `--color-text-tertiary` | `#5A7A88` | Tertiary text (decorative labels, grid coordinates). |

#### 4.1.3 Typography

Satori (the engine behind `ImageResponse`) requires font files to be loaded explicitly. The following fonts and weights must be embedded.

| Font | Weight | Usage | Tracking |
|------|--------|-------|----------|
| Geist Sans | 700 (Bold) | Page title (primary heading) | `0.02em` (normal) |
| Geist Sans | 400 (Regular) | Description text, tagline | `0.02em` (normal) |
| Geist Mono | 400 (Regular) | Domain URL, decorative labels, version tags | `0.08em` (wider) |

**Font loading pattern for `ImageResponse`:**

```typescript
// src/lib/og/fonts.ts

export async function loadOgFonts() {
  const [geistSansBold, geistSansRegular, geistMono] = await Promise.all([
    fetch(new URL('../../assets/fonts/GeistSans-Bold.woff', import.meta.url)).then(
      (res) => res.arrayBuffer()
    ),
    fetch(new URL('../../assets/fonts/GeistSans-Regular.woff', import.meta.url)).then(
      (res) => res.arrayBuffer()
    ),
    fetch(new URL('../../assets/fonts/GeistMono-Regular.woff', import.meta.url)).then(
      (res) => res.arrayBuffer()
    ),
  ])

  return [
    { name: 'Geist Sans', data: geistSansBold, weight: 700 as const, style: 'normal' as const },
    { name: 'Geist Sans', data: geistSansRegular, weight: 400 as const, style: 'normal' as const },
    { name: 'Geist Mono', data: geistMono, weight: 400 as const, style: 'normal' as const },
  ]
}
```

**Font file source:** Geist font `.woff` files should be copied from the Next.js font package or downloaded from the Vercel Geist repository and placed at `src/assets/fonts/`. These files are bundled at build time by the edge runtime and are not served to the client.

#### 4.1.4 Layout Grid

All OG images use a consistent spatial layout grid.

```
+-----------------------------------------------------------+
|  40px padding (all sides)                                 |
|                                                           |
|  [Logo Mark]  40px height                    [Page Badge] |
|  top-left                                    top-right    |
|                                                           |
|  --- 48px vertical gap ---                                |
|                                                           |
|  [Page Title]                                             |
|  Geist Sans Bold, 52px, #E8F0F4                          |
|  Max 2 lines, 1080px max-width                            |
|                                                           |
|  --- 20px vertical gap ---                                |
|                                                           |
|  [Description Excerpt]                                    |
|  Geist Sans Regular, 26px, #929899                        |
|  Max 2 lines, 900px max-width                             |
|                                                           |
|  --- flexible space ---                                   |
|                                                           |
|  [Green Accent Line] 2px, #4BA467, 720px wide, centered  |
|                                                           |
|  --- 24px vertical gap ---                                |
|                                                           |
|  [Wordmark: "Safetrekr"]  |  [www.safetrekr.com]         |
|  Geist Sans 400, 20px     |  Geist Mono, 16px, #5A7A88  |
|  #929899, left-aligned     |  right-aligned              |
|                                                           |
+-----------------------------------------------------------+
```

#### 4.1.5 Background Composition

The background is not a flat fill. It uses a layered composition to evoke the spatial HUD without distracting from the text content.

| Layer | Description |
|-------|-------------|
| 1. Base fill | Solid `#061A23` (void) |
| 2. Radial gradient | Centered at 50% 40%, from `rgba(75, 164, 103, 0.06)` to `transparent`, radius 600px. Creates a subtle green ambient glow behind the title area. |
| 3. Grid overlay | Horizontal and vertical lines at 60px intervals, `#365462` at 3% opacity. Evokes the spatial ZUI grid without overwhelming the composition. Rendered as SVG-style border elements within the JSX. |
| 4. Corner accents | Top-left and bottom-right corners have 1px `#365462` L-shaped bracket marks (40px arm length). HUD targeting aesthetic. |
| 5. Scanline texture (optional) | Horizontal lines at 2px intervals, `#FFFFFF` at 1% opacity, across the full canvas. Adds a CRT-monitor depth to the HUD feel. Only include if file size remains under 200 KB. |

**Implementation note:** Satori supports only flexbox layout. The grid overlay and corner accents must be rendered as absolutely-positioned `div` elements with border styling, or as inline SVG within the JSX. Background gradients are supported via `background: radial-gradient(...)` inline styles.

#### 4.1.6 Page Badge (Per-Page Visual Differentiator)

Each page card includes a small badge in the top-right corner that communicates the page category at a glance. This is the primary visual element that distinguishes one page card from another beyond the title text.

| Page | Badge Label | Badge Icon Concept |
|------|-------------|-------------------|
| Landing | `OVERVIEW` | Shield glyph (Safetrekr mark, simplified) |
| How It Works | `PROCESS` | 4-dot sequence (representing 4 phases) |
| Platform | `PLATFORM` | Grid/dashboard icon (3x2 rectangles) |
| Solutions | `INDUSTRIES` | Building icon (vertical rectangles) |
| Pricing | `PRICING` | Dollar/tier icon (3 ascending bars) |
| Security | `SECURITY` | Lock icon (padlock outline) |
| About | `TEAM` | People icon (2 figure outlines) |
| Contact | `CONNECT` | Arrow/send icon (diagonal arrow) |
| Terms | `LEGAL` | Document icon (page with lines) |
| Privacy | `LEGAL` | Shield-check icon (shield with checkmark) |

Badge rendering specification:

| Property | Value |
|----------|-------|
| Container | 120px wide, 32px tall, border-radius 4px |
| Background | `#123646` (surface) with 1px `#365462` border |
| Label text | Geist Mono 400, 11px, `#5A7A88`, letter-spacing `0.12em`, uppercase |
| Position | Top-right, 40px from top edge, 40px from right edge |

Icons within badges are rendered as simple geometric shapes using Satori-compatible JSX (divs with borders, not SVG paths) to avoid font/image embedding complexity. Each icon is a 16x16 area to the left of the label text within the badge container.

### 4.2 Default OG Image (`public/og/default.png`)

The default image serves as the fallback for any page that does not yet have a dynamic `opengraph-image.tsx` file. It is also used by the gateway page (`/`) and any non-marketing pages.

**Design specification:**

| Property | Value |
|----------|-------|
| Dimensions | 1200 x 630 px |
| Background | Layered composition per Section 4.1.5 |
| Center element | Safetrekr horizontal logo (light variant, `safetrekr-logo-horiz-light.png`), scaled to 360px width, vertically centered at ~40% from top |
| Below logo (24px gap) | Tagline: "Trip Safety Intelligence" in Geist Sans 400, 32px, `#929899`, centered |
| Green accent line | 2px height, `#4BA467`, 480px wide, centered, 32px below tagline |
| Bottom bar (40px from bottom) | `www.safetrekr.com` in Geist Mono 400, 18px, `#5A7A88`, centered |
| Corner accents | Per Section 4.1.5 Layer 4 |
| Radial glow | Centered behind logo, green at 8% opacity, 500px radius |

**Production method:** This image is created manually (Figma, Sketch, or equivalent) and exported as an optimized PNG. It is a static asset committed to `public/og/default.png`. It is NOT generated by `ImageResponse` because it must exist before the dynamic generation system is built.

**File size:** Must be under 200 KB. Run through `pnpm exec sharp-cli` or TinyPNG after export.

**Verification:** Open the image at actual size (1200x630) and confirm text is legible, the logo is crisp, and the green glow is visible but not overpowering.

### 4.3 Per-Page OG Image Specifications

Each marketing page gets a dynamic OG image generated at request time by an `opengraph-image.tsx` file. The images follow the layout grid from Section 4.1.4 with page-specific content.

#### Implementation Architecture

**Option A -- Per-route `opengraph-image.tsx` files (recommended):**

Place an `opengraph-image.tsx` file in each route directory. Next.js automatically associates it with the page and generates the correct `og:image` meta tag pointing to `/{route}/opengraph-image`.

```
src/app/(marketing)/landing/opengraph-image.tsx
src/app/(marketing)/how-it-works/opengraph-image.tsx
src/app/(marketing)/platform/opengraph-image.tsx
src/app/(marketing)/solutions/opengraph-image.tsx
src/app/(marketing)/pricing/opengraph-image.tsx
src/app/(marketing)/security/opengraph-image.tsx
src/app/(marketing)/about/opengraph-image.tsx
src/app/(marketing)/contact/opengraph-image.tsx
src/app/(marketing)/legal/terms/opengraph-image.tsx
src/app/(marketing)/legal/privacy/opengraph-image.tsx
```

**Advantages:** Each file is self-contained and co-located with the page. Next.js handles the routing and meta tag injection automatically. No `ogImage` field override needed in `generatePageMetadata` -- the framework discovers the co-located file.

**Option B -- Shared component with per-page data:**

Create a single reusable OG image component and import it from each route file, passing page-specific props.

```typescript
// src/lib/og/og-image-template.tsx (shared template)
// src/app/(marketing)/landing/opengraph-image.tsx (thin wrapper)
```

**Recommendation:** Use Option B's architecture (shared template) with Option A's file placement (per-route files). Each route has its own `opengraph-image.tsx` that imports and configures the shared template. This maximizes code reuse while preserving Next.js's automatic OG image discovery.

#### Shared OG Image Template

```typescript
// src/lib/og/og-image-template.tsx

import { ImageResponse } from 'next/og'
import { loadOgFonts } from './fonts'

export interface OgImageConfig {
  /** Page title. Rendered at 52px Bold. Max ~60 characters (2 lines). */
  title: string
  /** Short description. Rendered at 26px Regular. Max ~120 characters (2 lines). */
  description: string
  /** Badge label (uppercase). Example: "PRICING", "PLATFORM". */
  badgeLabel: string
  /** Badge icon variant. Determines which geometric icon renders in the badge. */
  badgeIcon: 'shield' | 'process' | 'grid' | 'building' | 'bars' | 'lock' | 'people' | 'arrow' | 'document' | 'shield-check'
}

export async function generateOgImage(config: OgImageConfig): Promise<ImageResponse> {
  const fonts = await loadOgFonts()

  return new ImageResponse(
    (
      // JSX template per Section 4.1.4 layout grid
      // ... implementation details below
    ),
    {
      width: 1200,
      height: 630,
      fonts,
    }
  )
}
```

#### Per-Route File Pattern

Each route's `opengraph-image.tsx` is minimal:

```typescript
// src/app/(marketing)/pricing/opengraph-image.tsx

import { generateOgImage } from '@/lib/og/og-image-template'

export const runtime = 'edge'
export const alt = 'Safetrekr Pricing -- Per-Trip Safety Management starting at $450'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return generateOgImage({
    title: 'Pricing -- Per-Trip\nSafety Management',
    description: 'Independent analyst review included in every tier. Day trips, overnight, and international plans.',
    badgeLabel: 'PRICING',
    badgeIcon: 'bars',
  })
}
```

#### Per-Page Content Table

| Page | Route | Title (in OG image) | Description (in OG image) | Badge | Alt Text |
|------|-------|---------------------|---------------------------|-------|----------|
| Landing | `/landing` | Trip Safety Intelligence\nfor Organizations | Every trip independently reviewed by a certified safety analyst. | `OVERVIEW` / shield | Safetrekr -- Trip safety intelligence platform for schools, churches, and organizations |
| How It Works | `/how-it-works` | How Safetrekr Works:\n4-Phase Trip Safety | Plan, review, prepare, and travel with confidence. Independent analyst review at every phase. | `PROCESS` / process | Safetrekr process -- Four phases of trip safety management from planning to post-trip review |
| Platform | `/platform` | The Safetrekr Platform:\nDuty of Care Management | Real-time intelligence, geo-triggered checklists, analyst review, and mobile traveler app. | `PLATFORM` / grid | Safetrekr platform features -- Real-time intelligence and duty of care management dashboard |
| Solutions | `/solutions` | Solutions for Every\nOrganization Type | Trip safety management for K-12 schools, churches, youth sports, higher ed, and businesses. | `INDUSTRIES` / building | Safetrekr solutions -- Trip safety management across schools, churches, youth sports, and businesses |
| Pricing | `/pricing` | Pricing -- Per-Trip\nSafety Management | Independent analyst review included in every tier. Day trips, overnight, and international plans. | `PRICING` / bars | Safetrekr pricing -- Per-trip safety management starting at $450 with analyst review included |
| Security | `/security` | Security and Compliance | SOC 2, encryption at rest and in transit, role-based access, and audit logging. | `SECURITY` / lock | Safetrekr security -- SOC 2 compliant platform with encryption, access controls, and audit logging |
| About | `/about` | Built by Safety\nProfessionals | Meet the team behind the platform that keeps every traveler accounted for. | `TEAM` / people | About Safetrekr -- Team of safety professionals, security experts, and technologists |
| Contact | `/contact` | Schedule a Briefing | Request a personalized demo of Safetrekr for your organization. | `CONNECT` / arrow | Contact Safetrekr -- Schedule a personalized safety briefing and platform demo |
| Terms | `/legal/terms` | Terms of Service | Legal terms governing the use of the Safetrekr trip safety management platform. | `LEGAL` / document | Safetrekr Terms of Service |
| Privacy | `/legal/privacy` | Privacy Policy | How Safetrekr collects, uses, and protects your data. | `LEGAL` / shield-check | Safetrekr Privacy Policy |

### 4.4 Twitter Card Configuration

Twitter/X card configuration is already defined in the WS-A.3 metadata infrastructure. This workstream verifies it renders correctly with the new per-page images.

**Configuration (already set in `generatePageMetadata` and root layout):**

```typescript
twitter: {
  card: 'summary_large_image',  // Large image format -- critical for B2B engagement
  title: ogTitle || fullTitle,
  description: ogDescription || description,
  images: [imageUrl],
  creator: '@safetrekr',
  site: '@safetrekr',
}
```

**Verification requirements:**

| Property | Expected Value | Verification |
|----------|----------------|-------------|
| `twitter:card` | `summary_large_image` | Meta tag inspection in DevTools |
| `twitter:image` | Absolute URL to the per-page OG image (e.g., `https://www.safetrekr.com/landing/opengraph-image`) | Meta tag resolves to HTTP 200 with `Content-Type: image/png` |
| Image dimensions | 1200x630 | Image loads at correct dimensions |
| Text legibility | Title readable at Twitter's rendered card size (~506x265 on desktop feed) | Visual inspection at reduced size |
| Color contrast | Title text (#E8F0F4) on background (#061A23) exceeds 4.5:1 | Automated contrast check: ratio is 14.2:1 (passes AAA) |

**LinkedIn-specific considerations:**

LinkedIn is the primary sharing platform for Safetrekr's B2B audience. LinkedIn link previews use standard OG tags (`og:title`, `og:description`, `og:image`). Key requirements:

| Requirement | Specification |
|-------------|---------------|
| Image minimum dimensions | 1200x627 px (LinkedIn recommends 1.91:1). Our 1200x630 satisfies this. |
| Image file size | Under 5 MB (LinkedIn limit). Our 200 KB target is well within bounds. |
| Title truncation | LinkedIn truncates OG titles around 70 characters. All page titles are under 60 characters. |
| Description truncation | LinkedIn shows approximately 2 lines (~100 characters) of OG description. Descriptions are written to front-load the key message. |
| Post Inspector cache | LinkedIn caches OG data aggressively. After deploying image changes, use the LinkedIn Post Inspector (`https://www.linkedin.com/post-inspector/`) to force a recrawl. |

### 4.5 Dynamic OG Image Component Implementation

This section specifies the complete implementation of the shared OG image template.

#### Edge Runtime Requirement

All `opengraph-image.tsx` files must declare `export const runtime = 'edge'`. The `ImageResponse` API from `next/og` runs on the Edge runtime. Attempting to use it in the Node.js runtime will fail.

#### JSX Template (Satori-Compatible)

The JSX passed to `ImageResponse` must use only Satori-compatible CSS properties. Key constraints:

| Supported | Not Supported |
|-----------|--------------|
| `display: flex` | `display: grid` |
| `flexDirection`, `alignItems`, `justifyContent` | `position: absolute` (limited support) |
| `background`, `backgroundImage` (gradients) | `backdrop-filter` |
| `border`, `borderRadius` | `box-shadow` (limited) |
| `fontSize`, `fontWeight`, `fontFamily` | `text-shadow` |
| `color`, `opacity` | CSS variables (`var(--token)`) |
| `padding`, `margin`, `gap` | `transform` (not supported) |
| `width`, `height`, `maxWidth` | Media queries |
| `overflow: hidden` | `@keyframes`, animations |
| `letterSpacing`, `lineHeight` | `text-decoration` (limited) |

**Critical constraint:** All color values must be hardcoded hex or rgba strings. CSS custom properties (`var(--color-void)`) are NOT available in Satori. The token values are documented in Section 4.1.2 and must be used as literal strings in the JSX.

#### Template JSX Structure

```typescript
// Conceptual structure -- final implementation will be in src/lib/og/og-image-template.tsx

<div style={{
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  padding: '40px',
  backgroundColor: '#061A23',
  backgroundImage: 'radial-gradient(circle at 50% 40%, rgba(75, 164, 103, 0.06) 0%, transparent 600px)',
  fontFamily: '"Geist Sans"',
  color: '#E8F0F4',
}}>
  {/* Top row: Logo mark + Badge */}
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
    {/* Safetrekr shield mark -- rendered as inline SVG path or embedded image */}
    <div style={{ height: '40px', opacity: 0.8 }}>
      {/* Logo mark */}
    </div>
    {/* Page badge */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '6px 16px',
      backgroundColor: '#123646',
      border: '1px solid #365462',
      borderRadius: '4px',
      fontSize: '11px',
      fontFamily: '"Geist Mono"',
      color: '#5A7A88',
      letterSpacing: '0.12em',
    }}>
      {/* Icon placeholder */}
      {badgeLabel}
    </div>
  </div>

  {/* Title */}
  <div style={{
    marginTop: '48px',
    fontSize: '52px',
    fontWeight: 700,
    lineHeight: 1.15,
    maxWidth: '1080px',
    letterSpacing: '0.02em',
  }}>
    {title}
  </div>

  {/* Description */}
  <div style={{
    marginTop: '20px',
    fontSize: '26px',
    fontWeight: 400,
    lineHeight: 1.4,
    color: '#929899',
    maxWidth: '900px',
    letterSpacing: '0.02em',
  }}>
    {description}
  </div>

  {/* Spacer */}
  <div style={{ flex: 1 }} />

  {/* Green accent line */}
  <div style={{
    width: '720px',
    height: '2px',
    backgroundColor: '#4BA467',
    alignSelf: 'center',
  }} />

  {/* Bottom row: Wordmark + Domain */}
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '24px',
  }}>
    <div style={{ fontSize: '20px', color: '#929899', fontWeight: 400 }}>
      Safetrekr
    </div>
    <div style={{
      fontSize: '16px',
      fontFamily: '"Geist Mono"',
      color: '#5A7A88',
      letterSpacing: '0.08em',
    }}>
      www.safetrekr.com
    </div>
  </div>
</div>
```

#### Grid Overlay Implementation

The grid overlay (Section 4.1.5 Layer 3) is rendered as a series of div elements with absolute positioning. Since Satori has limited `position: absolute` support, an alternative approach uses border styling on nested containers:

```typescript
// Grid lines rendered as a background container behind the content
// Each line is a thin div with opacity 0.03
// Horizontal lines: placed at y = 60, 120, 180, 240, 300, 360, 420, 480, 540
// Vertical lines: placed at x = 60, 120, 180, ..., 1140

// Due to Satori constraints, the grid is simplified to a subtle border pattern
// on the main container and one horizontal divider line.
```

**Pragmatic note:** If the full grid overlay proves too complex for Satori's layout model or pushes the image over 200 KB, reduce to: (a) a single horizontal rule at 50% height, and (b) corner bracket accents only. The radial gradient glow provides sufficient HUD atmosphere on its own.

#### Corner Accent Implementation

The L-shaped corner brackets are rendered as div elements with selective borders:

```typescript
// Top-left corner accent
<div style={{
  position: 'absolute',
  top: '20px',
  left: '20px',
  width: '40px',
  height: '40px',
  borderTop: '1px solid #365462',
  borderLeft: '1px solid #365462',
}} />

// Bottom-right corner accent
<div style={{
  position: 'absolute',
  bottom: '20px',
  right: '20px',
  width: '40px',
  height: '40px',
  borderBottom: '1px solid #365462',
  borderRight: '1px solid #365462',
}} />
```

**Fallback:** If `position: absolute` is not supported in the Satori version used by Next.js 16, omit the corner accents. They are aesthetic enhancements, not functional requirements.

### 4.6 Font Embedding Deliverable

Fonts must be bundled as static assets accessible to the Edge runtime at build time.

**Files to create:**

| # | File Path | Purpose |
|---|-----------|---------|
| 1 | `src/assets/fonts/GeistSans-Bold.woff` | Geist Sans Bold for OG image titles |
| 2 | `src/assets/fonts/GeistSans-Regular.woff` | Geist Sans Regular for OG image descriptions |
| 3 | `src/assets/fonts/GeistMono-Regular.woff` | Geist Mono Regular for OG image domain/badge text |
| 4 | `src/lib/og/fonts.ts` | Font loading utility (see Section 4.1.3) |

**Source:** Geist font files are available from the `geist` npm package (already a transitive dependency via Next.js) or from `https://github.com/vercel/geist-font`. Copy the `.woff` files into the project assets directory.

**Alternative approach:** If font files are available at a public URL within the deployment (e.g., via `next/font` output), they can be fetched at runtime using `fetch(new URL(...))`. The static bundling approach is preferred because it eliminates a network request during OG image generation and guarantees availability.

### 4.7 Social Sharing Preview Testing Plan

Every OG image must be verified on all target social platforms before the workstream is considered complete.

#### Testing Tools

| Tool | URL | Purpose |
|------|-----|---------|
| Facebook Sharing Debugger | `https://developers.facebook.com/tools/debug/` | Validates OG tags and previews Facebook link card. Forces cache refresh. |
| Twitter Card Validator | `https://cards-dev.twitter.com/validator` | Validates Twitter card tags and previews card rendering. (Note: Twitter has intermittently disabled this tool; use manual tweet as fallback.) |
| LinkedIn Post Inspector | `https://www.linkedin.com/post-inspector/` | Validates OG tags for LinkedIn and forces cache refresh. Critical for B2B testing. |
| OpenGraph.xyz | `https://www.opengraph.xyz/` | Real-time OG tag preview across multiple platforms simultaneously. |
| Slack Unfurl | Paste URL into a Slack DM to yourself | Tests Slack's link unfurl rendering. |
| iMessage Preview | Send URL to yourself in iMessage | Tests Apple's link preview rendering on iOS/macOS. |

#### Testing Matrix

Each cell must be marked PASS or FAIL. All cells must be PASS before the workstream ships.

| Page | Image Renders | Title Correct | Description Correct | Image Crisp | Text Legible | LinkedIn | Twitter/X | Facebook | Slack | iMessage |
|------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Landing | | | | | | | | | | |
| How It Works | | | | | | | | | | |
| Platform | | | | | | | | | | |
| Solutions | | | | | | | | | | |
| Pricing | | | | | | | | | | |
| Security | | | | | | | | | | |
| About | | | | | | | | | | |
| Contact | | | | | | | | | | |
| Terms | | | | | | | | | | |
| Privacy | | | | | | | | | | |
| Default (fallback) | | | | | | | | | | |

**Testing procedure per page:**

1. Deploy to Vercel preview URL (OG images require a publicly accessible URL for platform validators).
2. Open each testing tool and paste the page URL.
3. Verify image renders without error (HTTP 200, correct dimensions, PNG format).
4. Verify title text matches the page-specific OG title.
5. Verify description text matches the page-specific OG description.
6. Verify image is crisp (no blurring, no JPEG artifacts, text is sharp at rendered size).
7. Verify text is legible at the platform's rendered card size (LinkedIn desktop: ~552x289, Twitter desktop: ~506x265, mobile: smaller).
8. Screenshot each platform's rendered card and commit to `plans/launch-plan/phase-c-integration-polish/og-test-screenshots/` for audit trail.

#### Cache Busting Protocol

Social platforms aggressively cache OG images. When updating an image:

1. Deploy the updated image to the preview/production URL.
2. Use the LinkedIn Post Inspector to force a recrawl of the page URL.
3. Use the Facebook Sharing Debugger "Scrape Again" button.
4. For Twitter/X, append a dummy query parameter (e.g., `?v=2`) to the URL to bypass cache, then test the clean URL after cache expires (~24 hours).
5. For Slack, edit the message containing the old link and re-paste. Slack unfurls are cached per-workspace for approximately 30 minutes.

### 4.8 File Manifest

**New files created by this workstream:**

| # | File Path | Type | Purpose |
|---|-----------|------|---------|
| 1 | `public/og/default.png` | Static image | Default OG image (1200x630). Fallback for all pages until dynamic images are deployed. |
| 2 | `src/lib/og/fonts.ts` | Utility | Font loading function for `ImageResponse` Satori renderer. |
| 3 | `src/lib/og/og-image-template.tsx` | Component | Shared OG image template using `ImageResponse`. Exports `generateOgImage(config)`. |
| 4 | `src/lib/og/og-constants.ts` | Constants | Hardcoded color values, dimensions, and layout measurements for OG images (mirrors spatial tokens but as literal strings for Satori compatibility). |
| 5 | `src/app/(marketing)/landing/opengraph-image.tsx` | Next.js convention | Dynamic OG image for Landing page. |
| 6 | `src/app/(marketing)/how-it-works/opengraph-image.tsx` | Next.js convention | Dynamic OG image for How It Works page. |
| 7 | `src/app/(marketing)/platform/opengraph-image.tsx` | Next.js convention | Dynamic OG image for Platform page. |
| 8 | `src/app/(marketing)/solutions/opengraph-image.tsx` | Next.js convention | Dynamic OG image for Solutions page. |
| 9 | `src/app/(marketing)/pricing/opengraph-image.tsx` | Next.js convention | Dynamic OG image for Pricing page. |
| 10 | `src/app/(marketing)/security/opengraph-image.tsx` | Next.js convention | Dynamic OG image for Security page. |
| 11 | `src/app/(marketing)/about/opengraph-image.tsx` | Next.js convention | Dynamic OG image for About page. |
| 12 | `src/app/(marketing)/contact/opengraph-image.tsx` | Next.js convention | Dynamic OG image for Contact page. |
| 13 | `src/app/(marketing)/legal/terms/opengraph-image.tsx` | Next.js convention | Dynamic OG image for Terms of Service page. |
| 14 | `src/app/(marketing)/legal/privacy/opengraph-image.tsx` | Next.js convention | Dynamic OG image for Privacy Policy page. |
| 15 | `src/assets/fonts/GeistSans-Bold.woff` | Font asset | Geist Sans Bold for OG image rendering. |
| 16 | `src/assets/fonts/GeistSans-Regular.woff` | Font asset | Geist Sans Regular for OG image rendering. |
| 17 | `src/assets/fonts/GeistMono-Regular.woff` | Font asset | Geist Mono Regular for OG image rendering. |

**Files modified by this workstream:**

| # | File Path | Change |
|---|-----------|--------|
| 1 | Each `src/app/(marketing)/*/page.tsx` (10 files) | Remove `ogImage` field from `generatePageMetadata` call if present, since co-located `opengraph-image.tsx` files take precedence automatically. |

**Total new files: 17**
**Total modified files: 10** (only if `ogImage` overrides were added during Phase B; otherwise 0)

---

## 5. Acceptance Criteria

| ID | Criterion | Verification Method |
|----|-----------|---------------------|
| AC-1 | A static default OG image exists at `public/og/default.png` with dimensions exactly 1200x630 px and file size under 200 KB. | `file public/og/default.png` to verify PNG format. Image editor or `identify` command to verify dimensions. `ls -la` to verify file size. |
| AC-2 | The default OG image uses the Safetrekr void background (`#061A23`), displays the Safetrekr horizontal logo (light variant), the tagline "Trip Safety Intelligence," and `www.safetrekr.com`. | Visual inspection of the image file at 100% zoom. |
| AC-3 | Every marketing page route directory contains an `opengraph-image.tsx` file (10 files total). | `find src/app/\(marketing\) -name "opengraph-image.tsx"` returns exactly 10 results. |
| AC-4 | Every `opengraph-image.tsx` file exports `runtime = 'edge'`, `alt` (descriptive string), `size = { width: 1200, height: 630 }`, and `contentType = 'image/png'`. | Code review of all 10 files. |
| AC-5 | Navigating to `/{page-route}/opengraph-image` on the dev server returns a valid PNG image (HTTP 200, `Content-Type: image/png`, 1200x630 dimensions). | `curl -I http://localhost:3000/landing/opengraph-image` for each route. Download and verify dimensions. |
| AC-6 | Each generated OG image contains the correct page-specific title, description excerpt, badge label, and badge icon matching the per-page content table in Section 4.3. | Visual inspection of all 10 generated images. |
| AC-7 | Each generated OG image uses the exact color values from Section 4.1.2: void background `#061A23`, green accent `#4BA467`, primary text `#E8F0F4`, secondary text `#929899`. | Color picker tool on the generated image. Tolerate minor anti-aliasing variation (within 2 hex values). |
| AC-8 | Each generated OG image renders text in Geist Sans (Bold for title, Regular for description) and Geist Mono (for domain URL and badge label). | Visual comparison against known Geist font specimens. Font loading utility at `src/lib/og/fonts.ts` exists and loads three font variants. |
| AC-9 | The green accent line (2px, `#4BA467`, 720px wide) appears horizontally centered in each generated image. | Visual inspection. |
| AC-10 | The "Safetrekr" wordmark appears at bottom-left and "www.safetrekr.com" at bottom-right of each generated image. | Visual inspection. |
| AC-11 | The Safetrekr shield mark (logo mark, light variant) appears at top-left of each generated image at approximately 40px height. | Visual inspection. |
| AC-12 | Title text in each OG image is legible when the image is scaled down to 506x265 px (Twitter card size) and 552x289 px (LinkedIn card size). | Scale each image to target sizes and verify readability. |
| AC-13 | Text contrast between title (#E8F0F4) and background (#061A23) meets WCAG AA standard (ratio >= 4.5:1). Computed ratio: 14.2:1. | Automated contrast check using any WCAG contrast calculator. |
| AC-14 | Each marketing page's rendered HTML contains `<meta property="og:image" content="...">` with the URL pointing to the co-located `opengraph-image` endpoint (not the default static image). | DevTools inspection on all 10 pages. |
| AC-15 | Each marketing page's rendered HTML contains `<meta name="twitter:card" content="summary_large_image">`. | DevTools inspection on all 10 pages. |
| AC-16 | Each marketing page's rendered HTML contains `<meta name="twitter:image" content="...">` with a resolvable absolute URL. | DevTools inspection. Curl the URL to verify HTTP 200. |
| AC-17 | The `alt` export in each `opengraph-image.tsx` file contains a descriptive, page-specific string (not generic). | Code review of all 10 files against the alt text column in Section 4.3. |
| AC-18 | `pnpm typecheck` passes with zero errors after all files are created. | CLI: `pnpm typecheck`. |
| AC-19 | `pnpm build` completes successfully with no errors referencing OG images, font loading, or `ImageResponse`. | CLI: `pnpm build`. |
| AC-20 | The shared OG image template (`src/lib/og/og-image-template.tsx`) is used by all 10 per-route files. No per-route file duplicates the template JSX. | Code review: each `opengraph-image.tsx` imports and calls `generateOgImage()`. |
| AC-21 | The font loading utility (`src/lib/og/fonts.ts`) successfully loads all three font files without runtime errors. | Start dev server, navigate to any `opengraph-image` URL, verify no font-related errors in server logs. |
| AC-22 | OG image constants file (`src/lib/og/og-constants.ts`) contains all color, dimension, and typography values as literal strings (no CSS variable references). | Code review. |
| AC-23 | Social sharing preview testing matrix (Section 4.7) is completed with PASS for all cells across LinkedIn and Twitter/X (minimum required platforms). Facebook, Slack, and iMessage are recommended but not blocking. | Testing matrix filled out and committed. LinkedIn and Twitter columns are all PASS. |
| AC-24 | After deploying to Vercel preview, the LinkedIn Post Inspector (`https://www.linkedin.com/post-inspector/`) renders a correct card preview for at least the Landing, Pricing, and Contact pages. | Screenshot evidence of LinkedIn Post Inspector results. |

---

## 6. Decisions Made

| # | Decision | Rationale | Alternatives Considered |
|---|----------|-----------|------------------------|
| D-1 | Use Next.js `ImageResponse` API (Satori) for dynamic OG image generation rather than pre-rendering static images per page. | Dynamic generation ensures OG images always match current page content without manual re-export. Scales to future pages (verticals, blog) without designer intervention. Next.js 16 has first-class support via co-located `opengraph-image.tsx` files. | Manually designed static PNGs per page (does not scale, requires designer for every content change), External service like Cloudinary or Vercel OG (unnecessary dependency, adds latency), Puppeteer-based screenshot service (heavy, slow, complex to deploy). |
| D-2 | Co-locate `opengraph-image.tsx` per route rather than using a single dynamic route with query parameters. | Next.js automatically discovers co-located `opengraph-image.tsx` and injects the correct `og:image` meta tag. No manual `ogImage` field needed in `generatePageMetadata`. Each page's OG image is self-contained and independently deployable. | Single `src/app/api/og/route.tsx` with query params (requires manual meta tag wiring, loses automatic discovery), `opengraph-image.tsx` in `(marketing)/layout` only (would produce one image for all pages). |
| D-3 | Use a shared template component (`src/lib/og/og-image-template.tsx`) imported by each per-route file. | Eliminates code duplication. Layout, fonts, colors, and structure are defined once. Per-route files only provide page-specific content (title, description, badge). Changes to the template propagate to all pages. | Inline template in each file (10x duplication), Abstract base class pattern (over-engineering for JSX templates). |
| D-4 | Hardcode all color values as hex/rgba strings in OG image JSX instead of referencing CSS custom properties. | Satori (the rendering engine behind `ImageResponse`) does not support CSS custom properties. It renders JSX to SVG, not to a browser DOM. All values must be static at render time. The constants file (`og-constants.ts`) serves as the bridge between the token system and the OG renderer. | Attempt to use CSS variables (would fail silently, producing default colors), Build-time token extraction script (over-engineering). |
| D-5 | Bundle font files as static assets in `src/assets/fonts/` rather than fetching from a CDN at render time. | Eliminates network dependency during OG image generation. Fonts are available instantly. Edge runtime has limited fetch capabilities and CDN fetches add latency to image generation. | Fetch from Google Fonts CDN (blocked by some edge environments, adds 50-100ms latency), Use system fonts only (loses brand identity, Geist is the site's primary typeface). |
| D-6 | Use `summary_large_image` Twitter card type for all pages without exception. | Consistent visual treatment across all social platforms. The large image format maximizes visual real estate on LinkedIn (primary B2B platform). The Oblivion HUD aesthetic benefits from the larger canvas. No page has a reason to use the smaller `summary` card. | Per-page card type selection (unnecessary complexity), `summary` card for legal pages (inconsistent, looks broken alongside `summary_large_image` pages). |
| D-7 | Design the OG image system with the Oblivion HUD aesthetic (dark background, green accents, grid overlay, corner brackets) rather than a bright/corporate style. | Reinforces brand identity at every touchpoint. Differentiates Safetrekr in LinkedIn feeds where most SaaS companies use white/blue corporate cards. The dark HUD aesthetic signals technical sophistication to the target audience (security directors, safety officers). | White background with green accent (generic, forgettable), Photographic backgrounds (requires asset management, inconsistent), Gradient-only backgrounds (lacks the spatial HUD identity). |
| D-8 | Include page-specific badge labels and geometric icons in each OG image. | When multiple Safetrekr pages are shared on the same LinkedIn timeline or Slack channel, the badges allow instant visual differentiation. Without them, cards would look nearly identical at a glance (same dark background, similar text layout). | No per-page differentiation (cards look identical), Full-bleed page-specific illustrations (too complex for Satori, too expensive to maintain). |
| D-9 | Produce the default static OG image manually (Figma/Sketch) rather than generating it with `ImageResponse`. | The default image must exist in `public/og/` before the dynamic generation system is built. It is a one-time asset. Manual production allows pixel-perfect control over the logo placement, glow effects, and grid overlay that may be difficult to reproduce exactly in Satori. | Generate with ImageResponse and save as static file (adds a build step dependency, Satori cannot reproduce all desired effects), Skip the default image (broken social cards until dynamic generation ships). |
| D-10 | Require testing on LinkedIn and Twitter/X as mandatory, with Facebook/Slack/iMessage as recommended. | LinkedIn is the primary B2B sharing platform. Twitter/X is the secondary platform for tech industry visibility. Facebook, Slack, and iMessage all use standard OG tags that will work if LinkedIn and Twitter are correct. Testing on all five is ideal but should not block shipment if edge cases arise on lower-priority platforms. | Require all five platforms (may delay shipment for platform-specific bugs outside our control), Test only LinkedIn (insufficient coverage for a launch). |

---

## 7. Open Questions

| # | Question | Impact | Owner | Resolution Deadline |
|---|----------|--------|-------|---------------------|
| OQ-1 | Are the Geist font `.woff` files available in the project's `node_modules` (via the `geist` npm package or Next.js internals), or must they be downloaded separately? | Determines whether we copy from `node_modules` or download from the Vercel Geist repository. Either path works, but we must confirm the license permits bundling font files as static assets for edge-runtime image generation. | Engineering Lead | Before implementation begins |
| OQ-2 | Does the current Next.js 16 version (16.1.6) support `position: absolute` within `ImageResponse` JSX? Satori support for absolute positioning has varied across versions. | Affects corner accent implementation (Section 4.1.5 Layer 4) and grid overlay approach. If unsupported, fall back to border-only styling on the main container. | Engineering (test during implementation) | During implementation sprint |
| OQ-3 | Should the Safetrekr shield mark in OG images be rendered as an inline SVG path (from `safetrekr-mark-light.svg`, which is a single `<path>` element) or as an embedded PNG image? | Inline SVG is resolution-independent and avoids a fetch. However, Satori's SVG-within-JSX support may be limited. The PNG fallback (`safetrekr-logo-horiz-light.png`) is guaranteed to work but requires bundling a raster asset. | Engineering (test during implementation) | During implementation sprint |
| OQ-4 | Will Phase B finalize page titles and descriptions before this workstream begins, or should we start with the draft values from WS-A.3 Section 4.9 and update later? | Starting with drafts allows parallel execution but risks rework if titles change significantly. Waiting for final copy delays the workstream. | Product / Content Lead | Before Phase C kickoff |
| OQ-5 | Is the domain `www.safetrekr.com` confirmed for the bottom-right URL in OG images, or should we use a shorter form like `safetrekr.com`? (Relates to WS-A.3 OQ-1 / Q-8.) | Affects the text rendered in every OG image. The shared template hardcodes the domain string. Changing it later requires regenerating all cached OG images on social platforms. | Business Owner | Before this workstream ships |
| OQ-6 | Should the scanline texture (Section 4.1.5 Layer 5) be included in the dynamic OG images, or only in the static default? Satori's rendering of repeated thin lines may introduce visual artifacts or increase generation time. | If scanlines cause artifacts, omit them from dynamic images and keep them only in the manually-produced default. The HUD aesthetic is sufficient without scanlines. | Engineering (test during implementation) | During implementation sprint |

---

## 8. Risk Register

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|------------|--------|------------|
| R-1 | Satori rendering limitations prevent the full Oblivion HUD aesthetic (grid overlay, corner brackets, radial glow) from rendering in dynamic OG images. | Medium | Medium | The design is layered by priority. Layer 1 (solid background) and the text content are guaranteed to work. Layer 2 (radial gradient) is supported by Satori. Layers 3-5 (grid, corners, scanlines) are progressive enhancements. If any layer fails, remove it and the image remains professional and on-brand. Test each layer incrementally during implementation. |
| R-2 | Font loading fails in the Edge runtime, causing `ImageResponse` to fall back to a system font, breaking brand consistency. | Medium | High | Bundle font files as static assets (not CDN fetches) per Decision D-5. Test font loading on the Vercel Edge runtime during preview deployment. If font loading fails, investigate the `import.meta.url` resolution path and provide an absolute URL fallback. The `loadOgFonts` function isolates all font logic for easy debugging. |
| R-3 | LinkedIn and Twitter cache stale OG images after updates, showing old cards to users who share links. | High | Medium | Document the cache busting protocol (Section 4.7). Use LinkedIn Post Inspector and Facebook Sharing Debugger to force recrawls after deployment. For Twitter, appending a version query parameter (`?v=2`) can bypass cache. Educate the marketing team on cache behavior so they can proactively recrawl after content changes. |
| R-4 | Phase B page titles and descriptions change after OG images are implemented, requiring rework. | Medium | Low | Dynamic generation means no rework is needed for the dynamic images -- they render current content at request time. The per-route `opengraph-image.tsx` files hardcode title and description strings, so any content change requires updating two places (page metadata and OG image config). Mitigate by deriving OG image content from a shared constant or by importing page metadata. |
| R-5 | The shield mark SVG path is too complex for Satori to render inline, causing the logo to not appear in dynamic images. | Medium | Medium | Test inline SVG rendering early in implementation. If it fails, fall back to embedding `safetrekr-logo-horiz-light.png` as a base64 data URL or fetching it from the public directory. The PNG fallback is guaranteed to work. |
| R-6 | Generated OG images exceed 200 KB due to complex layered composition, causing slow unfurling on social platforms. | Low | Medium | Satori produces compact PNGs by default (typically 30-80 KB for text-heavy images). If file size exceeds 200 KB, remove the grid overlay and scanline layers first (they contribute the most pixels). Monitor generated image sizes during implementation and optimize before deployment. |
| R-7 | The `(marketing)` route group does not exist yet in the codebase (current routes use `(launch)` group), causing the `opengraph-image.tsx` files to have no parent route. | High | High | WS-A.1 (Route Structure) must create the `src/app/(marketing)/` route group and all page routes before this workstream can place `opengraph-image.tsx` files. If the route group is not ready, OG image files cannot be co-located. Fallback: place a single `opengraph-image.tsx` in the root app directory as a catch-all default, or use the API route approach (Decision D-2 alternative). Confirm route structure status before implementation begins. |
| R-8 | Vercel Edge function cold start adds 1-2 seconds to OG image generation on first request, causing social platform crawlers to time out. | Low | Medium | Most social platform crawlers allow 5-10 seconds for image fetch. Satori rendering is fast (typically under 500ms). Cold start is only an issue on first request after deployment. Subsequent requests are warm. If cold start is a concern, add `export const revalidate = 3600` to cache generated images for 1 hour, or use ISR to pre-generate images at build time with `generateStaticParams`. |
| R-9 | The `opengraph-image.tsx` convention is not fully supported in Next.js 16.1.6 or has breaking changes from prior versions. | Low | High | The `opengraph-image.tsx` convention was introduced in Next.js 13.3 and is stable as of Next.js 14+. Next.js 16.1.6 should have full support. Verify by creating a minimal `opengraph-image.tsx` in one route and confirming the `og:image` meta tag is auto-injected. If the convention is broken, fall back to the `generateMetadata` approach with explicit `ogImage` paths pointing to an API route. |
| R-10 | Different social platforms render the 1200x630 image at different sizes, causing text to be illegible on smaller renderings (e.g., mobile Twitter cards). | Medium | Medium | AC-12 requires legibility testing at 506x265 (Twitter) and 552x289 (LinkedIn). The 52px title and 26px description are sized for this downscaling. If text is too small, increase title to 56px and description to 28px, and reduce the maximum character count per line. Test early with a single page before scaling to all 10. |
