# WS-C.2: Mobile + Accessibility Audit Report

> **Workstream:** WS-C.2
> **Phase:** C -- Integration & Polish
> **Auditor:** `world-class-ui-designer` agent
> **Date:** 2026-03-03
> **Resolves:** R-02 (dark HUD aesthetic for 40-60yr audience), R-14 (accessibility compliance risk)
> **Scope:** All pages under `src/app/(marketing)/`, shared components in `src/components/marketing/`

---

## Executive Summary

This audit examined every marketing page and component against WCAG 2.1 AA criteria, mobile responsive behavior, keyboard navigation, and semantic HTML correctness. The audit identified **8 Critical**, **14 Major**, and **11 Minor** findings across the marketing site.

The primary risk areas confirmed by this audit:

1. **Color contrast failures** -- The `--color-text-tertiary` (#5a7a88) used extensively for monospace metadata labels fails WCAG AA contrast on all dark backgrounds. The green accent (`--color-ember` #4ba467) used as text fails contrast on glass-morphism card backgrounds.
2. **Touch target sizing** -- Several interactive elements fall below the 44x44px WCAG minimum, notably the "Expand all/Collapse all" button in the wizard stepper and footer legal links.
3. **Heading hierarchy violations** -- Multiple pages skip heading levels or use duplicate h1 elements within the same content flow.
4. **Missing `<header>` and `<footer>` in marketing layout** -- The layout renders `<main>` but does not include the `MarketingHeader` and `MarketingFooter` components, meaning the running site would have no nav or footer landmarks.

**Recommendation:** All 8 Critical findings must be resolved before launch. The 14 Major findings should be addressed in the same sprint if capacity allows, as they affect the target demographic's ability to read content on institutional monitors.

---

## Table of Contents

1. [Color Contrast Assessment](#1-color-contrast-assessment)
2. [Mobile Responsive Audit](#2-mobile-responsive-audit)
3. [Keyboard Navigation Assessment](#3-keyboard-navigation-assessment)
4. [Semantic HTML Assessment](#4-semantic-html-assessment)
5. [Remediation Summary Table](#5-remediation-summary-table)

---

## 1. Color Contrast Assessment

### 1.1 Token Color Reference (Safetrekr Dark Mode)

All contrast ratios below are calculated against the safetrekr dark-mode backgrounds using the WCAG 2.1 relative luminance formula.

| Token | Hex | Approx. Luminance |
|-------|-----|--------------------|
| `--color-void` | `#061a23` | 0.009 |
| `--color-abyss` | `#08202b` | 0.011 |
| `--color-deep` | `#0a2733` | 0.012 |
| `--color-surface` | `#123646` | 0.020 |
| Glass card effective bg (bg-white/[0.06] on void) | ~`#152830` | 0.012 |
| Glass card bg-white/[0.08] on void | ~`#1a2c35` | 0.014 |
| `--color-text-primary` | `#e8f0f4` | 0.879 |
| `--color-text-secondary` | `#929899` | 0.300 |
| `--color-text-tertiary` | `#5a7a88` | 0.140 |
| `--color-text-ghost` | `#33505e` | 0.058 |
| `--color-ember` (green primary) | `#4ba467` | 0.220 |
| `--color-ember-bright` | `#6abf84` | 0.360 |
| `amber-500` | `#F59E0B` | 0.395 |

### 1.2 Contrast Ratios vs. `--color-void` (#061a23)

| Foreground | Ratio | AA Normal (4.5:1) | AA Large (3:1) | AAA Normal (7:1) |
|------------|-------|--------------------|-----------------|--------------------|
| text-primary (#e8f0f4) | **15.83:1** | PASS | PASS | PASS |
| text-secondary (#929899) | **5.96:1** | PASS | PASS | FAIL |
| text-tertiary (#5a7a88) | **3.24:1** | **FAIL** | PASS (barely) | FAIL |
| text-ghost (#33505e) | **1.84:1** | **FAIL** | **FAIL** | FAIL |
| ember (#4ba467) | **4.60:1** | PASS (barely) | PASS | FAIL |
| ember-bright (#6abf84) | **6.99:1** | PASS | PASS | FAIL |
| amber-500 (#F59E0B) | **7.58:1** | PASS | PASS | PASS |

### 1.3 Contrast Ratios vs. Glass Card Background (~bg-white/[0.08] on void)

The glass-morphism cards use `bg-white/[0.06]` or `bg-white/[0.08]` over `--color-void`, producing an effective background of approximately `#152830` to `#1a2c35` (L ~ 0.012-0.014).

| Foreground | Ratio (on glass) | AA Normal | AA Large |
|------------|-----------------|-----------|----------|
| text-primary | ~14.1:1 | PASS | PASS |
| text-secondary | ~5.47:1 | PASS | PASS |
| text-tertiary | ~2.97:1 | **FAIL** | **FAIL** |
| text-ghost | ~1.69:1 | **FAIL** | **FAIL** |
| ember (#4ba467) | ~4.22:1 | **FAIL** | PASS |
| ember-bright (#6abf84) | ~6.41:1 | PASS | PASS |

### 1.4 Critical Contrast Findings

---

#### C-01: text-tertiary used for visible metadata labels fails AA everywhere

**Severity:** Critical
**WCAG Criterion:** 1.4.3 Contrast (Minimum)
**Contrast Ratio:** 3.24:1 on void, 2.97:1 on glass cards (requires 4.5:1 for normal text)
**Impact:** The monospace metadata labels ("Solutions // By Vertical", "SYSTEM // DATA ARCHITECTURE", "Phase 01 // Plan", "PRICING // PER TRIP", etc.) appear on every single marketing page. These are informational labels that communicate content structure. At 3.24:1 contrast they are difficult to read on institutional monitors with lower brightness, matte finishes, and office lighting glare -- exactly the conditions described in R-02.

**Affected files (representative sample):**
- `src/app/(marketing)/solutions/page.tsx` line 103: `text-[var(--color-text-tertiary)]`
- `src/app/(marketing)/security/page.tsx` line 67, 108, 230, 249: `text-[var(--color-text-tertiary)]`
- `src/app/(marketing)/about/page.tsx` (via heading sections): `text-[var(--color-text-tertiary)]`
- `src/components/marketing/landing/hero-cta-group.tsx` lines 23, 47: micro-copy "20-minute briefing" at text-tertiary
- `src/components/marketing/landing/how-it-works-section.tsx` line 48: section label
- `src/components/marketing/landing/verticals-section.tsx` line 48: section label
- `src/components/marketing/landing/social-proof-section.tsx` line 40: section label
- `src/components/marketing/platform/feature-grid.tsx` line 14: section label
- `src/components/marketing/platform/portal-card.tsx` line 43: role label
- `src/components/marketing/pricing/add-ons-section.tsx` line 52: integration notes
- `src/components/marketing/pricing/value-reframe-section.tsx` line 80: per-traveler breakdown
- `src/components/marketing/how-it-works/wizard-stepper.tsx` line 106: chevron icon color
- `src/components/marketing/solutions/vertical-card.tsx` lines 90, 100: subheading labels
- `src/components/marketing/marketing-footer.tsx` lines 34, 57, 76: footer heading labels, legal links, copyright
- `src/components/marketing/legal-toc.tsx` line 28: "Contents" label
- `src/app/(marketing)/legal/terms/page.tsx` line 32: "Last updated" label
- `src/app/(marketing)/legal/privacy/page.tsx` line 32: "Last updated" label

**Recommended fix:**
Raise `--color-text-tertiary` from `#5a7a88` to `#7a9aa8` (the current `--color-teal-glow` value in safetrekr dark), which would achieve approximately 4.8:1 contrast on void and 4.4:1 on glass. Alternatively, use `--color-text-secondary` (#929899, 5.96:1) for all informational labels that carry meaning.

```css
/* In src/styles/spatial-tokens.css, line 313 */
[data-color-scheme='safetrekr'].dark {
  /* Before: --color-text-tertiary: #5a7a88; (3.24:1) */
  --color-text-tertiary: #7a9aa8; /* ~4.8:1 on void */
}
```

**Priority:** Must-fix-before-launch

---

#### C-02: Green accent text on glass card backgrounds fails AA for normal text

**Severity:** Critical
**WCAG Criterion:** 1.4.3 Contrast (Minimum)
**Contrast Ratio:** 4.22:1 on glass-card bg (requires 4.5:1)
**Impact:** The green accent (`--color-ember`, #4ba467) is used as text color for labels like "Accountability", "Control", "Intelligence" inside value-prop glass cards, vertical card taglines, and solution labels. On bg-white/[0.06-0.08] glass cards these drop below 4.5:1.

**Affected files:**
- `src/components/marketing/landing/value-props-section.tsx` line 56: prop labels in GlassCard
- `src/components/marketing/solutions/vertical-card.tsx` line 77: tagline text
- `src/components/marketing/solutions/vertical-card.tsx` line 111: "Safetrekr solution" heading
- `src/components/marketing/security/security-feature-card.tsx` line 81: icon color inside card
- `src/components/marketing/about/contact-channels.tsx` line 45: email link text

**Recommended fix:**
Use `--color-ember-bright` (#6abf84, 6.41:1 on glass) instead of `--color-ember` for text elements inside glass cards. Keep `--color-ember` for non-text decorative elements (icons, bullets, borders) where the 3:1 non-text contrast threshold applies.

```tsx
/* Before: */
'text-[var(--color-ember)]'
/* After (for text inside glass cards): */
'text-[var(--color-ember-bright)]'
```

**Priority:** Must-fix-before-launch

---

#### C-03: text-ghost used for visible placeholder text and micro-copy fails AA

**Severity:** Critical
**WCAG Criterion:** 1.4.3 Contrast (Minimum)
**Contrast Ratio:** 1.84:1 on void (requires 4.5:1)
**Impact:** `--color-text-ghost` (#33505e) is used for form placeholder text, screenshot placeholder text, and the footer dot separators. While placeholder text is exempt from WCAG contrast requirements, the footer dot separators and other visible micro-copy using this token are not.

**Affected files:**
- `src/components/marketing/marketing-footer.tsx` line 61: dot separator `text-[var(--color-text-ghost)]`
- `src/components/marketing/platform/portal-card.tsx` line 64: "Screenshot coming soon" text
- `src/components/marketing/contact-form.tsx` line 49: `placeholder:text-[var(--color-text-ghost)]`
- `src/components/marketing/pricing/pricing-tier-card.tsx` line 99, 109: ghost-colored not-included features

**Recommended fix for non-placeholder content:**
Replace `text-ghost` with `text-tertiary` (or the elevated tertiary per C-01) for any visible content that communicates information. For placeholder text, the ghost color is acceptable per WCAG since placeholders disappear on input.

For the pricing tier "not included" features (line 109), use a minimum of `text-tertiary` with `line-through` rather than `text-ghost`:
```tsx
'text-[var(--color-text-tertiary)] line-through'
```

**Priority:** Must-fix-before-launch

---

#### C-04: Marketing layout missing header and footer components

**Severity:** Critical
**WCAG Criterion:** 2.4.1 Bypass Blocks, 1.3.1 Info and Relationships (landmarks)
**Impact:** The `src/app/(marketing)/layout.tsx` does not render `<MarketingHeader>` or `<MarketingFooter>`. The layout only has a skip-to-content link and a `<main>` element. Without `<header>` and `<footer>` landmarks, screen reader users cannot navigate to or bypass navigation. Additionally, there is no `<nav>` landmark in the page at all (the header component has one, but it is not rendered).

**Affected file:** `src/app/(marketing)/layout.tsx` lines 19-36

**Recommended fix:**
```tsx
import { MarketingHeader } from '@/components/marketing/marketing-header'
import { MarketingFooter } from '@/components/marketing/marketing-footer'

export default function MarketingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <a href="#main-content" className="sr-only focus:not-sr-only ...">
        Skip to main content
      </a>
      <MarketingHeader />
      <main id="main-content">{children}</main>
      <MarketingFooter />
    </>
  )
}
```

Note: The layout comment says "Header and footer components will be added by WS-A.1 when those components are built" -- the components ARE built (`marketing-header.tsx`, `marketing-footer.tsx`), but the layout was never updated to include them.

**Priority:** Must-fix-before-launch

---

#### C-05: Focus indicators use `outline` which may be invisible on some backgrounds

**Severity:** Critical
**WCAG Criterion:** 2.4.7 Focus Visible
**Contrast Ratio:** `--color-ember-bright` (#6abf84) outline on `--color-void` (#061a23) = 6.99:1 -- PASSES
**Issue:** The focus indicators themselves pass contrast requirements. However, the `focus-visible:outline-2` utility produces a 2px outline. WCAG 2.2 Success Criterion 2.4.13 (Focus Appearance, AAA) recommends a minimum 2px solid outline, which is met. The concern is that the `outline-offset-2` creates a gap between the element and the outline, and on elements like footer legal links (`text-xs`) the focus outline may be hard to distinguish from surrounding content.

**Affected pattern:** Every interactive element uses `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]`

**Recommended fix:**
The current pattern passes WCAG 2.1 AA (2.4.7). To also satisfy 2.4.11 (Focus Not Obscured) and improve visibility for the 40-60yr demographic, add a background change on focus:

```tsx
'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)] focus-visible:bg-white/[0.06]'
```

**Priority:** Must-fix-before-launch (the current implementation technically passes AA, but the outline alone is easy to miss for the target demographic)

---

#### C-06: Contact page has no content -- unstyled bare `<h1>`

**Severity:** Critical
**WCAG Criterion:** Multiple (1.3.1, 1.4.3, 2.4.6)
**Impact:** `src/app/(marketing)/contact/page.tsx` renders a bare `<h1>Schedule a Briefing</h1>` inside a `<section>` with no styling, no form, and no surrounding structure. This page is the primary conversion endpoint for the entire site.

**Affected file:** `src/app/(marketing)/contact/page.tsx` lines 19-31

**Recommended fix:**
This page needs the ContactForm component and proper styling. The component `src/components/marketing/contact-form.tsx` is already built but not imported into the page. Structure should match other marketing pages: hero with monospace label, glass-card containing the form, particle field background.

**Priority:** Must-fix-before-launch (conversion-blocking)

---

#### C-07: Pricing tier grid uses 4-column layout that may break on medium screens

**Severity:** Critical
**WCAG Criterion:** 1.4.10 Reflow (320px CSS width without horizontal scroll)
**Impact:** `src/components/marketing/pricing/pricing-tier-grid.tsx` uses `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`. At the `sm` breakpoint (640-1023px), 4 tier cards (3 standard + 1 enterprise) are rendered in a 2-column grid. The enterprise card has different styling and takes a full column. With 4 cards in sm:grid-cols-2, the layout works. However, the pricing cards inside (`pricing-tier-card.tsx`) use `text-4xl sm:text-5xl` for prices, which at sm breakpoint on narrower screens may cause text overflow inside the card since cards have `p-8` padding.

**Affected files:**
- `src/components/marketing/pricing/pricing-tier-grid.tsx` line 18
- `src/components/marketing/pricing/pricing-tier-card.tsx` line 69

**Recommended fix:**
Add `break-words` or `overflow-hidden` to price display, and verify the `sm:text-5xl` (3rem / 48px) fits within the sm card width (approximately (640-48)/2 - 64 = 232px available). At 48px font size the "$1,250" string is about 200px wide, which barely fits but leaves no margin for the "/trip" unit label.

```tsx
<span className="text-3xl sm:text-4xl lg:text-5xl font-bold ...">
```

**Priority:** Must-fix-before-launch

---

#### C-08: Heading hierarchy issues on landing page -- multiple h2 elements inside value-props cards

**Severity:** Critical
**WCAG Criterion:** 1.3.1 Info and Relationships
**Impact:** The `ValuePropsSection` has an `sr-only` h2 ("Core Capabilities") but then each GlassCard inside contains another h2 element for the card heading. This means there are 4 h2 elements at the same level, followed by `VerticalsSection` which also has h2, then `SocialProofSection` with h2, etc. The card headings inside value-props should be h3 since they are children of the section-level h2.

**Affected file:** `src/components/marketing/landing/value-props-section.tsx` line 64-68

**Recommended fix:**
Change the card headings from `<h2>` to `<h3>`:
```tsx
<h3 className={cn('font-sans text-xl font-semibold leading-snug', 'text-[var(--color-text-primary)]')}>
  {prop.heading}
</h3>
```

**Priority:** Must-fix-before-launch

---

### 1.5 Major Contrast Findings

---

#### M-01: Footer legal links and copyright use text-tertiary at xs size

**Severity:** Major
**WCAG Criterion:** 1.4.3 Contrast (Minimum)
**Contrast Ratio:** 3.24:1 at `text-xs` (12px) -- fails 4.5:1 for small text
**Impact:** Footer legal links (Terms, Privacy, etc.) are rendered at `text-xs text-[var(--color-text-tertiary)]`. The 12px size is normal text (not "large text"), so the 4.5:1 threshold applies. The links transition to text-primary on hover, but the resting state fails.

**Affected file:** `src/components/marketing/marketing-footer.tsx` lines 57, 76

**Recommended fix:** Use `text-[var(--color-text-secondary)]` for legal links:
```tsx
'text-xs text-[var(--color-text-secondary)]'
```

**Priority:** Must-fix-before-launch

---

#### M-02: 10px phase labels on landing page how-it-works section

**Severity:** Major
**WCAG Criterion:** 1.4.4 Resize Text, 1.4.3 Contrast
**Impact:** `src/components/marketing/landing/how-it-works-section.tsx` line 114 uses `text-[10px]` for phase labels ("Phase 01 // Plan"). At 10px the text is extremely small on mobile and may be difficult to read at normal viewing distance even on desktop. Combined with `text-tertiary` color, this double-compounds the readability issue.

**Affected file:** `src/components/marketing/landing/how-it-works-section.tsx` line 114

**Recommended fix:** Use `text-xs` (12px) minimum and elevate color to text-secondary:
```tsx
'mt-4 font-mono text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-text-secondary)]'
```

**Priority:** Must-fix-before-launch

---

#### M-03: Compliance badge "in-progress" status uses text-tertiary italic

**Severity:** Major
**WCAG Criterion:** 1.4.3 Contrast (Minimum)
**Contrast Ratio:** 3.24:1 on compliance card bg
**Impact:** Compliance badges with `status !== 'verified'` render the status note in `text-[var(--color-text-tertiary)] italic`. On the card background (bg-white/[0.04] over void), this fails contrast.

**Affected file:** `src/components/marketing/security/compliance-badge.tsx` line 74

**Recommended fix:** Use `text-[var(--color-text-secondary)]`:
```tsx
: 'text-[var(--color-text-secondary)] italic',
```

**Priority:** Must-fix-before-launch

---

#### M-04: Pricing FAQ answer text may be hard to read on bg-white/[0.04]

**Severity:** Major
**WCAG Criterion:** 1.4.3 Contrast (Minimum)
**Contrast Ratio:** text-secondary (#929899) on bg-white/[0.04] over void = ~5.7:1 -- PASSES but at text-sm (14px) on a glass surface, readability is marginal for the target demographic under office lighting.
**Impact:** FAQ answers are core decision-making content for pricing. The combination of `text-sm` size, secondary color, and glass background creates borderline readability.

**Affected file:** `src/components/marketing/pricing/pricing-faq.tsx` line 91

**Recommended fix:** Use `text-base` instead of `text-sm` for FAQ answer body text:
```tsx
<div className="px-6 pb-5 text-base text-[var(--color-text-secondary)] leading-relaxed">
```

**Priority:** Should-fix-before-launch

---

#### M-05: Wizard stepper "Expand all/Collapse all" button has insufficient touch target

**Severity:** Major
**WCAG Criterion:** 2.5.8 Target Size (Minimum) -- 24x24px minimum; 2.5.5 Target Size (Enhanced) -- 44x44px
**Impact:** `src/components/marketing/how-it-works/wizard-stepper.tsx` line 44-56 renders a small `text-xs` button ("Expand all" / "Collapse all") with no minimum height or padding. At text-xs with no padding, the target is approximately 12px tall, far below the 44px WCAG enhanced target and even below the 24px minimum.

**Affected file:** `src/components/marketing/how-it-works/wizard-stepper.tsx` lines 44-56

**Recommended fix:**
```tsx
<button
  type="button"
  onClick={allOpen ? collapseAll : expandAll}
  className={cn(
    'text-xs font-medium text-[var(--color-ember-bright)]',
    'min-h-[44px] px-3 py-2',  /* Add minimum 44px touch target */
    'hover:text-[var(--color-ember-glow)]',
    ...
  )}
>
```

**Priority:** Must-fix-before-launch

---

#### M-06: Footer nav column headings are h3 but no preceding h2

**Severity:** Major
**WCAG Criterion:** 1.3.1 Info and Relationships
**Impact:** The footer uses `<h3>` elements for column headings ("Product", "Company", "Legal") but there is no `<h2>` parent heading. This creates a heading level skip from whatever the last h2 was in page content to h3 in the footer.

**Affected file:** `src/components/marketing/marketing-footer.tsx` line 34

**Recommended fix:** Either:
1. Add a visually-hidden h2 before the nav columns: `<h2 className="sr-only">Site navigation</h2>`
2. Or change h3 to `<p>` with the same styling since these are nav section labels, not document headings.

The second option is semantically cleaner:
```tsx
<p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-text-tertiary)]">
  {column.heading}
</p>
```

**Priority:** Must-fix-before-launch

---

#### M-07: Leadership cards use `role="button"` but are `<article>` elements

**Severity:** Major
**WCAG Criterion:** 4.1.2 Name, Role, Value
**Impact:** `src/components/marketing/about/leadership-card.tsx` renders an `<article>` element with `role="button"`, `tabIndex={0}`, and click/keyboard handlers. This overrides the article's implicit role, which confuses screen readers. An article announced as "button" loses its semantic meaning. The combination of article semantics + button role + click handler + keyboard handler is an anti-pattern.

**Affected file:** `src/components/marketing/about/leadership-card.tsx` lines 17-38

**Recommended fix:** Replace the outer `<article>` with a `<div>` and nest a `<button>` inside for the click action, or convert the entire card into a large click target using a `<button>` wrapper with proper ARIA:
```tsx
<div className={cn(...)}>
  <button
    type="button"
    onClick={() => onLearnMore(leader.id)}
    aria-label={`Learn more about ${leader.name}, ${leader.title}`}
    className="absolute inset-0 z-10 cursor-pointer focus-visible:outline-2 ..."
  />
  {/* Card content */}
</div>
```

**Priority:** Must-fix-before-launch

---

#### M-08: Legal TOC is hidden on mobile with no alternative navigation

**Severity:** Major
**WCAG Criterion:** 2.4.5 Multiple Ways
**Impact:** `src/components/marketing/legal-toc.tsx` uses `hidden lg:block` to hide the table of contents on screens below the `lg` breakpoint (1024px). Legal documents are long-form content where section navigation is important. Mobile users have no way to jump to specific sections.

**Affected file:** `src/components/marketing/legal-toc.tsx` line 24

**Recommended fix:** Add a collapsible mobile TOC at the top of the legal pages, or make the desktop TOC scrollable on smaller screens:
```tsx
{/* Mobile TOC (collapsible) */}
<details className="mb-6 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 lg:hidden">
  <summary className="cursor-pointer font-mono text-xs uppercase tracking-widest text-[var(--color-text-secondary)]">
    Table of Contents
  </summary>
  <ul className="mt-3 space-y-1.5">
    {entries.map((entry) => (...))}
  </ul>
</details>
```

**Priority:** Should-fix-before-launch

---

#### M-09: Architecture badge row does not wrap gracefully on narrow screens

**Severity:** Major
**WCAG Criterion:** 1.4.10 Reflow
**Impact:** `src/components/marketing/security/architecture-badge-row.tsx` line 34 uses `flex-wrap` which should handle wrapping, but the badges have `px-4 py-2` with no max-width constraint. On very narrow viewports (320px), if a badge label is long enough it could cause horizontal overflow.

**Affected file:** `src/components/marketing/security/architecture-badge-row.tsx` line 34

**Recommended fix:** Add `max-w-full` and `text-wrap` to badge items, and test at 320px:
```tsx
'max-w-full text-sm font-medium text-[var(--color-text-primary)] break-words'
```

**Priority:** Should-fix-before-launch

---

#### M-10: RBAC role table has no responsive strategy for mobile

**Severity:** Major
**WCAG Criterion:** 1.4.10 Reflow
**Impact:** `src/components/marketing/security/rbac-role-table.tsx` wraps the table in `overflow-x-auto`, which provides horizontal scroll on mobile. While this prevents content from being cut off, a 3-column table at 320px requires horizontal scrolling, which is a poor experience. The "Description" column content is particularly wide.

**Affected file:** `src/components/marketing/security/rbac-role-table.tsx` line 17

**Recommended fix:** On mobile, convert the table to a stacked card layout:
```tsx
{/* Mobile: stacked cards */}
<div className="space-y-4 md:hidden">
  {roles.map((role) => (
    <div key={role.name} className="rounded-xl border border-white/[0.06] bg-white/[0.04] p-4">
      <p className="font-medium text-[var(--color-text-primary)]">{role.name}</p>
      <span className="inline-flex rounded-full px-2.5 py-0.5 text-xs ...">
        {role.portal}
      </span>
      <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{role.description}</p>
    </div>
  ))}
</div>
{/* Desktop: table */}
<div className="hidden md:block overflow-x-auto ...">
  <table>...</table>
</div>
```

**Priority:** Should-fix-before-launch

---

#### M-11: Security page inline `<style>` for print uses `dangerouslySetInnerHTML`

**Severity:** Major
**WCAG Criterion:** N/A (code quality / CSP risk)
**Impact:** `src/app/(marketing)/security/page.tsx` lines 288-348 inject print styles via `dangerouslySetInnerHTML`. This is a Content Security Policy (CSP) violation risk. The security page of all pages should not use dangerous HTML injection.

**Affected file:** `src/app/(marketing)/security/page.tsx` lines 288-348

**Recommended fix:** Move print styles to a CSS file (e.g., `src/styles/security-print.css`) and import it:
```css
/* src/styles/security-print.css */
@media print {
  [data-security-page] * { backdrop-filter: none !important; ... }
  ...
}
```

**Priority:** Should-fix-before-launch

---

#### M-12: Contact form error messages lack `role="alert"` on individual field errors

**Severity:** Major
**WCAG Criterion:** 4.1.3 Status Messages
**Impact:** Individual field error messages in `contact-form.tsx` (e.g., "Name is required") are rendered as plain `<p>` elements. While the server error banner correctly uses `role="alert"`, field-level errors do not, so screen readers are not automatically notified when a validation error appears on blur.

**Affected file:** `src/components/marketing/contact-form.tsx` lines 374, 402, 428, 456, 509, 535

**Recommended fix:** Add `role="alert"` and `aria-live="polite"` to field error messages:
```tsx
<p className="mt-1 text-xs text-[var(--color-error-glow)]" role="alert" aria-live="polite">
  {fieldErrors.name}
</p>
```

Also add `aria-describedby` on the input pointing to the error message ID, and `aria-invalid="true"` when the field has an error.

**Priority:** Must-fix-before-launch

---

#### M-13: Contact form inputs lack `aria-invalid` and `aria-describedby`

**Severity:** Major
**WCAG Criterion:** 3.3.1 Error Identification, 4.1.2 Name, Role, Value
**Impact:** When a field has a validation error, the input element does not signal the error state to assistive technology. Only the red border color change and error message text communicate the error visually.

**Affected file:** `src/components/marketing/contact-form.tsx` (all input elements)

**Recommended fix:** Add error state ARIA attributes:
```tsx
<input
  type="text"
  id="contact-name"
  name="name"
  aria-invalid={fieldHasError('name') || undefined}
  aria-describedby={fieldHasError('name') ? 'contact-name-error' : undefined}
  ...
/>
{fieldHasError('name') && (
  <p id="contact-name-error" className="mt-1 text-xs ..." role="alert">
    {fieldErrors.name}
  </p>
)}
```

**Priority:** Must-fix-before-launch

---

#### M-14: Contact channels icon `<Icon>` components lack `aria-hidden`

**Severity:** Major
**WCAG Criterion:** 1.1.1 Non-text Content
**Impact:** `src/components/marketing/about/contact-channels.tsx` line 36 renders Lucide icons without `aria-hidden="true"`. Screen readers may announce the SVG element or its path data.

**Affected file:** `src/components/marketing/about/contact-channels.tsx` line 36

**Recommended fix:**
```tsx
<Icon size={24} className="text-[var(--color-ember)]" aria-hidden="true" />
```

**Priority:** Should-fix-before-launch

---

## 2. Mobile Responsive Audit

### 2.1 Viewport Reflow (320px CSS Pixels)

WCAG 2.1 SC 1.4.10 requires that content can be presented at 320px CSS width without horizontal scrolling (excluding elements that require 2D layout like tables and maps).

| Page | 320px Reflow | Issues |
|------|-------------|--------|
| Landing (`/landing`) | PASS with reservations | Hero CTA group stacks correctly via `flex-col`. Glass cards stack 1-col. Step numbers at 48px are fine. |
| How It Works | PASS | Phase lifecycle nav switches to vertical on mobile. Wizard stepper works at narrow widths. |
| Platform | PASS | Portal cards stack 1-col. Domain cards stack 1-col. |
| Pricing | **PARTIAL FAIL** | Tier cards stack 1-col on mobile, but `sm:grid-cols-2` at 640px creates very tight 2-col layout with large price text (see C-07). |
| Solutions | PASS | Vertical cards stack 1-col. |
| Security | **PARTIAL FAIL** | RBAC table requires horizontal scroll (see M-10). Badge row wraps but needs testing at 320px (see M-09). |
| About | PASS | Leadership cards stack 1-col. Partner grid stacks. |
| Contact | N/A | Page has no content (C-06). |
| Legal (Terms, Privacy) | PASS | Single column. TOC hidden on mobile (see M-08). |

---

### 2.2 Touch Target Assessment (Minimum 44x44px)

| Component | Element | Actual Size | WCAG 2.5.5 (44px) | WCAG 2.5.8 (24px) |
|-----------|---------|-------------|--------------------|--------------------|
| MarketingHeader | Hamburger button | 40x40px (h-10 w-10) | **FAIL** | PASS |
| MarketingHeader | Nav links (desktop) | ~32px tall (py-2 text-sm) | **FAIL** (desktop only) | PASS |
| MarketingMobileNav | Nav links | ~48px tall (py-3 text-base) | PASS | PASS |
| MarketingMobileNav | Close button | 40x40px (h-10 w-10) | **FAIL** | PASS |
| MarketingHeader | CTA button | ~36px tall (py-2 text-sm rounded-full) | **FAIL** | PASS |
| PricingFAQ | Accordion trigger | min-h-12 (48px) | PASS | PASS |
| WizardStepper | Step button | ~44px tall (py-3 + badge) | PASS (barely) | PASS |
| WizardStepper | Expand/Collapse all | ~16px tall (text-xs, no padding) | **FAIL** | **FAIL** |
| BreathingCTA (lg) | CTA button | ~52px tall (py-3.5 text-base) | PASS | PASS |
| BreathingCTA (md) | CTA button | ~36px tall (py-2 text-sm) | **FAIL** | PASS |
| HeroCTAGroup | Secondary CTA | ~44px tall (py-3 text-sm) | PASS | PASS |
| Footer | Legal links | ~28px tall (py-1.5 text-xs) | **FAIL** | PASS |
| Footer | Nav links | ~32px tall (py-1.5 text-sm) | **FAIL** | PASS |
| LegalToc | TOC links | ~24px tall (py-1 text-sm) | **FAIL** | PASS |
| PhaseLifecycleNav | Phase links (mobile) | ~56px tall (py-3 + content) | PASS | PASS |
| PhaseLifecycleNav | Phase links (desktop) | ~80px tall | PASS | PASS |
| ContactForm | Submit button | ~52px tall (py-3.5) | PASS | PASS |
| ContactForm | Form inputs | ~46px tall (py-3) | PASS | PASS |

#### Touch Target Findings

---

##### MN-01: Hamburger button is 40x40px, should be 44x44px

**Severity:** Minor
**WCAG Criterion:** 2.5.5 Target Size (Enhanced)
**Affected file:** `src/components/marketing/marketing-header.tsx` line 113: `h-10 w-10`
**Recommended fix:** Change to `h-11 w-11` (44x44px)
**Priority:** Should-fix-before-launch

---

##### MN-02: Mobile nav close button is 40x40px

**Severity:** Minor
**WCAG Criterion:** 2.5.5 Target Size (Enhanced)
**Affected file:** `src/components/marketing/marketing-mobile-nav.tsx` line 131: `h-10 w-10`
**Recommended fix:** Change to `h-11 w-11`
**Priority:** Should-fix-before-launch

---

##### MN-03: Footer nav links have insufficient touch target height

**Severity:** Minor
**WCAG Criterion:** 2.5.5 Target Size (Enhanced)
**Affected file:** `src/components/marketing/marketing-footer.tsx` line 42: `py-1.5 text-sm`
**Recommended fix:** Increase padding: `py-2.5 text-sm` to reach ~40px, or add `min-h-[44px] inline-flex items-center`
**Priority:** Post-launch

---

### 2.3 Text Size Assessment

| Usage | Current Size | Concern |
|-------|-------------|---------|
| Phase labels (landing) | `text-[10px]` (10px) | **Too small** -- below 12px minimum for readable body text (see M-02) |
| Monospace metadata labels | `text-xs` (12px) | Borderline. At 12px with letter-spacing 0.12em and uppercase, actual glyph width is adequate but vertical size is tight. |
| Body text in glass cards | `text-sm` (14px) | Acceptable. Base size per CLAUDE.md spec. |
| Hero subheadline | `text-lg md:text-xl` (18-20px) | Good. |
| Section headings | `text-2xl md:text-3xl` (24-30px) | Good. |
| Page h1 | `text-3xl md:text-5xl` (30-48px) | Good. |
| Legal prose body | `1rem` (16px) with line-height 1.75 | Excellent readability. |

---

### 2.4 Mobile Navigation Assessment

The mobile navigation system is well-implemented:
- Slide-in panel from right (`w-[80vw] max-w-[320px]`)
- Body scroll lock when open
- Focus trap implemented correctly
- Escape key closes
- Route change auto-closes
- Backdrop overlay click closes
- Close button receives initial focus

**One concern:** The `bg-[var(--color-void)]/95` class on the mobile nav panel may not work as expected in Tailwind v4. The `/95` opacity modifier is applied to a CSS variable reference, which Tailwind may not be able to parse. This could result in either full opacity or broken styling. Needs visual verification.

**Affected file:** `src/components/marketing/marketing-mobile-nav.tsx` line 111

---

## 3. Keyboard Navigation Assessment

### 3.1 Tab Order

| Page | Tab Order Assessment |
|------|---------------------|
| All pages | Skip-to-content link is present and correctly targets `#main-content`. First Tab press reveals it. PASS. |
| All pages | Once header is added (C-04), tab order will be: skip-link -> logo -> nav links -> CTA -> main content -> footer. Logical. |
| Landing | Hero CTAs -> Value props (no interactive elements in cards) -> How It Works link -> Verticals "Learn more" links -> Bottom CTA. Logical. |
| How It Works | Phase lifecycle nav links -> Phase sections (no interactive elements until wizard steppers) -> Bottom CTA. Logical. |
| Pricing | Tier card CTA links -> Add-ons (no interactive) -> FAQ accordion buttons -> Bottom CTAs. Logical. |
| Security | Badge row (no interactive) -> Feature cards (no interactive) -> RBAC table (no interactive) -> Bottom CTA. Logical. |
| About | Leadership cards (tabIndex=0, clickable) -> Contact email links -> Bottom CTA. Logical. |
| Legal | TOC links (desktop) -> Legal prose links -> Footer. Logical. |

### 3.2 Focus Trap Assessment

| Component | Focus Trap | Escape Key | Focus Return |
|-----------|-----------|------------|--------------|
| MarketingMobileNav | PASS -- Tab cycles within panel | PASS -- closes on Escape | **PARTIAL** -- focus returns to document but not to hamburger button (the hamburger state is managed by parent) |
| LeadershipDetailModal | PASS -- Tab cycles within modal | PASS -- closes on Escape | PASS -- `previouslyFocusedRef` restores focus |

**Finding:**

##### MN-04: Mobile nav does not return focus to hamburger button on close

**Severity:** Minor
**WCAG Criterion:** 2.4.3 Focus Order
**Affected file:** `src/components/marketing/marketing-mobile-nav.tsx`
**Issue:** When the mobile nav closes (via Escape, route change, or backdrop click), focus is not explicitly returned to the hamburger button. The `MarketingMobileNav` component does not track the triggering element.
**Recommended fix:** Pass a `triggerRef` from the header to the mobile nav, and focus it on close:
```tsx
// In MarketingHeader:
const hamburgerRef = useRef<HTMLButtonElement>(null)
// Pass to MarketingMobileNav:
<MarketingMobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} triggerRef={hamburgerRef} />
```
**Priority:** Should-fix-before-launch

---

### 3.3 Accordion Keyboard Interaction

| Component | Enter/Space | Arrow Keys | Home/End |
|-----------|-------------|------------|----------|
| PricingFAQ | PASS (via button click) | Not implemented | Not implemented |
| WizardStepper | PASS (via button click) | Not implemented | Not implemented |

**Finding:**

##### MN-05: Accordions lack arrow key navigation

**Severity:** Minor
**WCAG Criterion:** ARIA Authoring Practices (recommended, not required)
**Impact:** The WAI-ARIA Authoring Practices Guide recommends that accordion headers support Up/Down Arrow keys to move between headers, and Home/End to jump to first/last header. This is a recommendation, not a WCAG requirement, but improves usability.
**Affected files:** `src/components/marketing/pricing/pricing-faq.tsx`, `src/components/marketing/how-it-works/wizard-stepper.tsx`
**Priority:** Post-launch

---

## 4. Semantic HTML Assessment

### 4.1 Heading Hierarchy Audit

| Page | Heading Structure | Assessment |
|------|-------------------|------------|
| **Landing** | h1 ("Every traveler accounted for.") -> h2 (sr-only "Core Capabilities") -> h2 inside cards (x3) -> h2 ("Four phases...") -> h3 (step names x4) -> h2 ("Built for organizations...") -> h3 (vertical names x5) -> h2 ("Trusted by organizations...") | **FAIL** -- Card headings should be h3 (C-08). Also, stat numbers are styled as headings but use `<p>`. |
| **How It Works** | h1 -> h2 (phase sections x4) -> h3 (sub-elements) | PASS |
| **Platform** | h2 ("Platform capabilities") inside FeatureGrid -- but no h1 on page! The PlatformHero likely has h1. | **NEEDS VERIFICATION** -- Platform page wraps content in `flex flex-col` but PlatformHero needs to contain h1. |
| **Pricing** | h1 ("Per-trip pricing...") -> h2 (FAQ, Value comparison, Add-ons) -> h3 (tier names, FAQ questions rendered as buttons not headings) | PASS with minor issues -- tier card names use h3 which is correct. |
| **Solutions** | h1 -> (no h2 before vertical cards) -> cards use h3 | **FAIL** -- Missing h2 before the vertical card grid section. |
| **Security** | h1 -> h2 (section headers x6) -> h3 (feature card titles, RBAC heading) -> h4 (compliance badge names) | PASS -- well structured. |
| **About** | h1 -> h2 (Origin Story, Leadership, Field Expert Bench, Partners, Contact, Bottom CTA) -> h3 (leader names) -> h4 (contact channel labels) | PASS -- well structured. |
| **Contact** | h1 only (bare page) | FAIL (C-06). |
| **Legal (Terms/Privacy)** | h1 (from markdown) -> h2 (section titles) -> h3 (subsections) | PASS -- generated from markdown with proper hierarchy. |

#### Heading Hierarchy Findings

---

##### MN-06: Solutions page missing h2 between hero and vertical card grid

**Severity:** Minor
**WCAG Criterion:** 1.3.1 Info and Relationships
**Affected file:** `src/app/(marketing)/solutions/page.tsx` -- the vertical cards section (line 132-137) has no section heading.
**Recommended fix:** Add a visually-hidden h2 or visible section heading before `<VerticalCardGrid>`.
**Priority:** Should-fix-before-launch

---

### 4.2 Landmark Regions

| Landmark | Present | Notes |
|----------|---------|-------|
| `<main>` | PASS | `src/app/(marketing)/layout.tsx` line 33 |
| `<header>` | **FAIL** | Not rendered (C-04) |
| `<footer>` | **FAIL** | Not rendered (C-04) |
| `<nav aria-label="Main navigation">` | **FAIL** | Exists in component but not rendered (C-04) |
| `<nav aria-label="Footer navigation">` | **FAIL** | Exists in component but not rendered (C-04) |
| `<nav aria-label="Mobile navigation">` | PASS (when open) | Inside MarketingMobileNav |
| `<nav aria-label="Table of contents">` | PASS (desktop) | LegalToc |
| `<nav aria-label="Trip lifecycle phases">` | PASS | PhaseLifecycleNav |
| Skip-to-content link | PASS | layout.tsx line 27-31 |

### 4.3 Form Labels and Error Announcements

| Form Element | Label | Error Announcement | Assessment |
|-------------|-------|--------------------|------------|
| Full name input | PASS (htmlFor -> id) | Visual only (M-12, M-13) | **PARTIAL** |
| Email input | PASS | Visual only | **PARTIAL** |
| Phone input | PASS | Visual only | **PARTIAL** |
| Organization input | PASS | Visual only | **PARTIAL** |
| Organization type select | PASS | Visual only | **PARTIAL** |
| Message textarea | PASS | Visual only | **PARTIAL** |
| Honeypot field | PASS (aria-hidden, tabIndex=-1) | N/A | PASS |

### 4.4 Image Alt Text

| Component | Image | Alt Text | Assessment |
|-----------|-------|----------|------------|
| MarketingHeader (desktop logo) | safetrekr-logo-horiz-light.svg | "Safetrekr" | PASS |
| MarketingHeader (mobile mark) | safetrekr-mark-light.svg | "Safetrekr" | PASS |
| MarketingFooter (logo) | safetrekr-logo-horiz-light.svg | "Safetrekr" | PASS |
| LeadershipCard (photo) | leader.photo | "Portrait of {leader.name}" | PASS |
| LeadershipDetailModal (photo) | leader.photo | "Portrait of {leader.name}" | PASS |
| MarketingParticleField | canvas | aria-hidden="true" | PASS (decorative) |

### 4.5 ARIA Attributes Usage

| Component | ARIA Usage | Assessment |
|-----------|-----------|------------|
| MarketingHeader hamburger | `aria-expanded`, `aria-controls`, `aria-label` | PASS |
| MarketingMobileNav panel | `role="dialog"`, `aria-modal`, `aria-label` | PASS |
| MarketingMobileNav backdrop | `aria-hidden="true"` | PASS |
| LeadershipDetailModal | `role="dialog"`, `aria-modal`, `aria-label` | PASS |
| PricingFAQ accordion | `aria-expanded`, `aria-controls`, `id` linkage | PASS |
| PricingFAQ answer panel | `role="region"`, `aria-labelledby` | PASS |
| WizardStepper | `aria-expanded`, `aria-controls`, `id` linkage | PASS |
| WizardStepper content | `role="region"`, `aria-labelledby` | PASS |
| ArchitectureBadgeRow | `role="list"` + `role="listitem"`, sr-only summary | PASS |
| RBACRoleTable | `<caption class="sr-only">`, proper `<th scope="col">` | PASS |
| PricingTierCard features | `role="list"`, `aria-label` per item | PASS |
| Various decorative elements | `aria-hidden="true"` | PASS |

---

### 4.6 Reduced Motion Support

| Component/File | Reduced Motion Handling | Assessment |
|---------------|------------------------|------------|
| `marketing.css` | `@media (prefers-reduced-motion: reduce)` disables `mkt-cta-breathe` and `mkt-cta-breathe-amber` | PASS |
| `platform.css` | Disables `plt-card-reveal` and `plt-accent-breathe` | PASS |
| `landing.css` | Changes dashed borders to solid | PASS |
| `reduced-motion.css` | Global catch-all: `animation-duration: 0.001ms !important` | PASS |
| `MarketingParticleField` | Checks `prefers-reduced-motion`, renders static frame | PASS |
| `MarketingMobileNav` | Uses motion/react animations -- not explicitly handling reduced motion | **PARTIAL** -- motion/react respects `prefers-reduced-motion` by default, but the spring animation may still produce visible movement. |
| `LeadershipDetailModal` | Uses motion/react animations | **PARTIAL** -- same as above. |
| `PricingFAQ` | Uses motion/react `AnimatePresence` | **PARTIAL** |
| `WizardStepper` | Uses motion/react `AnimatePresence` | **PARTIAL** |

##### MN-07: motion/react components should add `reduced-motion-exempt` class or verify behavior

**Severity:** Minor
**WCAG Criterion:** 2.3.3 Animation from Interactions
**Impact:** The global `reduced-motion.css` catch-all sets `animation-duration: 0.001ms` on all elements except `.reduced-motion-exempt`. Since motion/react uses JS-driven animations (not CSS), the catch-all may not fully disable them. motion/react does respect `prefers-reduced-motion` by default (setting `duration: 0`), but this should be verified.
**Affected files:** All components using `motion/react`: `marketing-mobile-nav.tsx`, `leadership-detail-modal.tsx`, `pricing-faq.tsx`, `wizard-stepper.tsx`
**Priority:** Post-launch (motion/react handles this by default)

---

## 5. Remediation Summary Table

### Critical (Must-fix-before-launch)

| ID | Finding | WCAG | File(s) | Effort |
|----|---------|------|---------|--------|
| C-01 | text-tertiary (#5a7a88) fails 4.5:1 contrast on all backgrounds | 1.4.3 | `spatial-tokens.css` + 15+ component files | Low -- single token change |
| C-02 | Green accent text on glass cards fails 4.5:1 | 1.4.3 | 5+ component files | Low -- swap ember -> ember-bright for text |
| C-03 | text-ghost (#33505e) used for visible non-placeholder content fails | 1.4.3 | `marketing-footer.tsx`, `pricing-tier-card.tsx`, `portal-card.tsx` | Low |
| C-04 | Marketing layout missing header and footer components | 2.4.1, 1.3.1 | `layout.tsx` | Low -- import and render existing components |
| C-05 | Focus indicators could be more visible for target demographic | 2.4.7 | Global pattern across all interactive elements | Medium -- add bg change on focus |
| C-06 | Contact page has no content | Multiple | `contact/page.tsx` | Medium -- build page with existing ContactForm component |
| C-07 | Pricing tier price text may overflow at sm breakpoint | 1.4.10 | `pricing-tier-card.tsx`, `pricing-tier-grid.tsx` | Low -- reduce font size step |
| C-08 | Value-props card headings are h2 but should be h3 | 1.3.1 | `value-props-section.tsx` | Low -- change tag |

### Major (Should-fix-before-launch)

| ID | Finding | WCAG | File(s) | Effort |
|----|---------|------|---------|--------|
| M-01 | Footer legal links at text-xs + text-tertiary fail contrast | 1.4.3 | `marketing-footer.tsx` | Low |
| M-02 | 10px phase labels on landing page | 1.4.4, 1.4.3 | `how-it-works-section.tsx` | Low |
| M-03 | Compliance badge in-progress status text fails contrast | 1.4.3 | `compliance-badge.tsx` | Low |
| M-04 | FAQ answers at text-sm on glass are borderline for target demographic | 1.4.3 | `pricing-faq.tsx` | Low |
| M-05 | Wizard stepper expand/collapse button has no touch target sizing | 2.5.5 | `wizard-stepper.tsx` | Low |
| M-06 | Footer nav column headings are h3 with no parent h2 | 1.3.1 | `marketing-footer.tsx` | Low |
| M-07 | Leadership card uses `role="button"` on `<article>` | 4.1.2 | `leadership-card.tsx` | Medium |
| M-08 | Legal TOC hidden on mobile with no alternative | 2.4.5 | `legal-toc.tsx` | Medium |
| M-09 | Architecture badge row needs overflow testing at 320px | 1.4.10 | `architecture-badge-row.tsx` | Low |
| M-10 | RBAC role table has no mobile-friendly layout | 1.4.10 | `rbac-role-table.tsx` | Medium |
| M-11 | Security page print styles use `dangerouslySetInnerHTML` | CSP risk | `security/page.tsx` | Low |
| M-12 | Field error messages lack `role="alert"` | 4.1.3 | `contact-form.tsx` | Low |
| M-13 | Form inputs lack `aria-invalid` and `aria-describedby` | 3.3.1, 4.1.2 | `contact-form.tsx` | Low |
| M-14 | Contact channel icons missing `aria-hidden` | 1.1.1 | `contact-channels.tsx` | Trivial |

### Minor (Post-launch acceptable)

| ID | Finding | WCAG | File(s) | Effort |
|----|---------|------|---------|--------|
| MN-01 | Hamburger button 40x40 should be 44x44 | 2.5.5 | `marketing-header.tsx` | Trivial |
| MN-02 | Mobile nav close button 40x40 | 2.5.5 | `marketing-mobile-nav.tsx` | Trivial |
| MN-03 | Footer nav links have tight touch targets | 2.5.5 | `marketing-footer.tsx` | Low |
| MN-04 | Mobile nav does not return focus to hamburger on close | 2.4.3 | `marketing-mobile-nav.tsx`, `marketing-header.tsx` | Low |
| MN-05 | Accordions lack arrow key navigation (APG recommendation) | APG | `pricing-faq.tsx`, `wizard-stepper.tsx` | Medium |
| MN-06 | Solutions page missing h2 before vertical card grid | 1.3.1 | `solutions/page.tsx` | Trivial |
| MN-07 | Verify motion/react reduced-motion behavior in practice | 2.3.3 | 4 component files | Low |
| MN-08 | Mobile nav bg opacity class may not work in Tailwind v4 | Visual | `marketing-mobile-nav.tsx` | Low -- needs visual testing |
| MN-09 | Pricing hero section has no aria-labelledby or sr-only heading | 1.3.1 | `pricing-hero.tsx` | Trivial |
| MN-10 | BreathingCTA (md size) at 36px height is below 44px target | 2.5.5 | `breathing-cta.tsx` | Low |
| MN-11 | Desktop nav links at ~32px height are below 44px target | 2.5.5 | `marketing-header.tsx` | Trivial (desktop has pointer precision) |

---

## Appendix A: Recommended Token Remediation

The single highest-impact fix is adjusting the `--color-text-tertiary` token value. This resolves C-01 and contributes to M-01, M-02, and M-03.

```css
/* src/styles/spatial-tokens.css -- safetrekr dark mode block (line ~313) */
[data-color-scheme='safetrekr'].dark {
  /* BEFORE: --color-text-tertiary: #5a7a88;  (3.24:1 on void) */
  /* AFTER:  Raised to pass 4.5:1 on void (#061a23) */
  --color-text-tertiary: #7a9aa8;  /* ~4.8:1 on void, ~4.4:1 on glass */
}
```

The secondary fix is replacing `--color-ember` with `--color-ember-bright` wherever the green accent is used as *text* (not as background or border):

```
text-[var(--color-ember)]      ->  text-[var(--color-ember-bright)]
```

This applies only when the text sits on a glass-card or section background. When text sits directly on `--color-void`, `--color-ember` at 4.60:1 passes narrowly but `--color-ember-bright` at 6.99:1 is significantly more comfortable for the target demographic.

---

## Appendix B: R-02 Risk Assessment (Dark HUD for 40-60yr Audience)

The audit confirms that R-02 is a real concern but manageable with the token adjustments described above. The Oblivion HUD aesthetic can be preserved while meeting WCAG AA by:

1. Raising `text-tertiary` to `#7a9aa8` (still reads as a subdued teal-grey, maintaining the HUD palette)
2. Using `ember-bright` (#6abf84) instead of `ember` (#4ba467) for text elements (brighter green, still within the safetrekr palette)
3. Ensuring body text is never below `text-sm` (14px) and section labels are never below `text-xs` (12px)
4. Testing on a Dell P2419H monitor (a common institutional IPS panel) at 250 nits brightness under fluorescent office lighting

These changes do not break the aesthetic -- they slightly brighten the metadata labels and green accent text, which actually makes the HUD feel more "alive" and operational rather than dim and hard to read.

---

*End of audit. All findings are filed with file paths, line references, and recommended fixes. The 8 Critical items should be scheduled for immediate remediation in the current sprint.*
