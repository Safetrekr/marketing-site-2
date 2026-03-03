# WS-C.2: Mobile + Accessibility Audit

> **Workstream ID:** WS-C.2
> **Phase:** C -- Integration & Polish
> **Assigned Agent:** `world-class-ui-designer`
> **Status:** Draft
> **Created:** 2026-03-02
> **Last Updated:** 2026-03-02
> **Depends On:** Phase B complete (all pages built: WS-B.2 through WS-B.9)
> **Blocks:** None (remediation items are tracked as follow-on tickets, not gating launch unless severity is Critical)
> **Resolves:** R-02 (dark HUD may not resonate with 40-60yr audience), R-14 (accessibility compliance risk -- dark aesthetic with 40% opacity text, green-on-dark, glass-morphism)

---

## 1. Objective

Conduct a systematic cross-device responsive audit and WCAG 2.1 AA accessibility compliance assessment of every page on the Safetrekr marketing site. The audit covers all routes under the `(marketing)` route group (landing, how-it-works, platform, solutions, pricing, security, about, contact, legal/terms, legal/privacy), the Gateway (`/`), the Spatial ZUI (`/launch`), and both error pages (not-found, error).

The audit addresses two documented project risks head-on:

- **R-02:** The Oblivion HUD dark aesthetic may not resonate with 40-60 year old security directors viewing the site on institutional Dell monitors with potentially uncalibrated TN or IPS panels, variable brightness settings, and office lighting glare.
- **R-14:** The combination of dark backgrounds (`--color-void: #061a23`), a 40% minimum text opacity floor, green-on-dark accent color (`--color-ember: #4ba467`), and glass-morphism layered surfaces creates measurable WCAG 2.1 AA contrast compliance risk.

The output of this workstream is not code. It is a set of audit artifacts -- checklists, test matrices, contrast ratio assessments, and a prioritized remediation backlog -- that inform targeted code changes. Any code changes resulting from the audit are tracked as individual remediation tickets with severity levels, each referencing this audit as the source.

The standard is WCAG 2.1 AA. Not aspirational. Mandatory. The target audience includes administrators aged 40-60 who may have age-related vision changes (presbyopia, reduced contrast sensitivity, early-stage color perception shifts) and who access the site on standard institutional hardware. The audit criteria are calibrated for this audience, not for a 28-year-old designer on a calibrated Apple display.

---

## 2. Scope

### In Scope

| # | Item | Notes |
|---|------|-------|
| 1 | Contrast ratio assessment for all text/background token combinations | Computed from `src/styles/spatial-tokens.css` safetrekr dark mode values. Includes glass-morphism effective backgrounds. |
| 2 | WCAG 2.1 AA criteria checklist (all applicable success criteria) | Full criteria map, not just contrast. Covers perceivable, operable, understandable, robust. |
| 3 | Device and browser test matrix | Desktop (Windows Chrome/Edge/Firefox at 1920x1080), tablet (iPad Safari), mobile (iPhone Safari, Android Chrome). Explicitly includes Dell institutional monitor simulation. |
| 4 | Touch target sizing audit | All interactive elements measured against 48x48dp minimum (exceeds WCAG 2.5.5 44px recommendation for our 40-60yr audience). |
| 5 | Focus indicator specification and audit | Every interactive element must have visible focus indicators meeting 3:1 contrast against adjacent colors. |
| 6 | Screen reader compatibility testing plan | NVDA on Windows (primary), VoiceOver on macOS/iOS (secondary). Covers landmarks, heading hierarchy, live regions, form labels, alt text. |
| 7 | Keyboard navigation audit | Tab order, focus trapping (mobile nav, modals), skip-to-content, Escape key behavior. |
| 8 | Responsive breakpoint testing | All pages tested at 320px, 375px, 768px, 1024px, 1280px, 1920px widths. Text reflow at 200% zoom. |
| 9 | Reduced motion audit | All animations honor `prefers-reduced-motion: reduce`. Breathing glow, particle fields, morph transitions. |
| 10 | Color independence audit | No information conveyed by color alone (status indicators, form validation, links). |
| 11 | Remediation priority framework | Severity classification (Critical, High, Medium, Low) with fix-by-launch vs. post-launch categorization. |
| 12 | Glass-morphism effective contrast analysis | Computed contrast through semi-transparent layers (`bg-white/[0.06]` on dark backgrounds). |
| 13 | Font size and readability audit | Minimum body text size, line height, paragraph width for 40-60yr audience comfort. |
| 14 | Gateway and ZUI graceful degradation assessment | How `/` (cinematic boot) and `/launch` (spatial ZUI) behave on mobile and with assistive technology. |

### Out of Scope

| # | Item | Rationale |
|---|------|-----------|
| 1 | Implementing code fixes | This workstream produces the audit and remediation plan. Code changes are separate tickets. |
| 2 | WCAG AAA compliance | AA is the requirement. AAA guidance is noted where achievable with minimal effort but not mandated. |
| 3 | Automated accessibility testing tool selection or CI integration | WS-C.2 is a manual + semi-automated audit. CI integration of axe-core or similar is a follow-on operational task. |
| 4 | Usability testing with real target users | This is a standards-based compliance audit. User testing is recommended as a follow-on but is not within this scope. |
| 5 | Performance audit (Lighthouse, Core Web Vitals) | Performance is tangential. Only flagged where it directly impacts accessibility (e.g., animation jank triggering vestibular issues). |
| 6 | Content accuracy or copy review | WS-B.1 governs copy. This audit only flags content issues where they create accessibility violations (e.g., missing alt text, unclear link text). |

---

## 3. Input Dependencies

| Dependency | Source | Status | Critical? |
|------------|--------|--------|-----------|
| All Phase B pages implemented and deployable in dev | WS-B.2 through WS-B.9 | **Not started** | Yes -- cannot audit pages that do not exist |
| Marketing layout with header and footer | WS-A.1 | **Not started** | Yes -- header/footer are primary navigation audit targets |
| Contact form | WS-A.4 | **Not started** | Yes -- form accessibility is a major audit category |
| Error pages | WS-A.5 | **Not started** | Yes -- must verify error pages are accessible |
| Spatial token system (`src/styles/spatial-tokens.css`) | Codebase | Available | Yes -- all color values computed from these tokens |
| Tailwind theme bridge (`src/app/globals.css`) | Codebase | Available | Yes -- maps tokens to utility classes |
| Glass-morphism reference pattern (`detail-panel.tsx`) | Codebase | Available | Yes -- baseline for effective contrast through glass layers |
| `prefers-reduced-motion` pattern (`reduced-motion.css`) | Codebase | Available | Yes -- validates reduced motion implementation |
| Logo assets (`public/images/logos/`) | Codebase | Available | Yes -- verify alt text and sizing |
| Device access: Windows machine with Chrome/Edge/Firefox, iPad, iPhone, Android phone | Physical hardware | **Required** | Yes -- cannot simulate institutional Dell TN panel color rendering or real touch interactions |
| NVDA screen reader (Windows) | Free download | **Required** | Yes -- primary screen reader for Windows-dominant target audience |

---

## 4. Deliverables

### 4.1 Contrast Ratio Assessment

A complete matrix of every text color / background color combination used in the Safetrekr marketing site, with computed WCAG contrast ratios and pass/fail verdicts at AA level.

**Pre-computed baseline from `src/styles/spatial-tokens.css` safetrekr dark mode:**

The following ratios are computed against `--color-void: #061a23` (L = 0.0089), which is the `<body>` background and the most common surface behind text on marketing pages.

| Token | Hex | RGB | Luminance | Contrast vs Void | AA Normal (4.5:1) | AA Large (3:1) |
|-------|-----|-----|-----------|-------------------|--------------------|----------------|
| `--color-text-primary` | `#e8f0f4` | 232, 240, 244 | 0.857 | **15.4:1** | PASS | PASS |
| `--color-text-secondary` | `#929899` | 146, 152, 153 | 0.309 | **6.1:1** | PASS | PASS |
| `--color-text-tertiary` | `#5a7a88` | 90, 122, 136 | 0.178 | **3.87:1** | **FAIL** | PASS |
| `--color-text-ghost` | `#33505e` | 51, 80, 94 | 0.072 | **2.07:1** | **FAIL** | **FAIL** |
| `--color-ember` (green primary) | `#4ba467` | 75, 164, 103 | 0.290 | **5.77:1** | PASS | PASS |
| `--color-ember-bright` | `#6abf84` | 106, 191, 132 | 0.420 | **7.99:1** | PASS | PASS |
| `--color-ember-glow` | `#92d4a6` | 146, 212, 166 | 0.583 | **10.75:1** | PASS | PASS |
| `--color-ember-white` | `#c1e8ce` | 193, 232, 206 | 0.764 | **13.83:1** | PASS | PASS |
| `--color-teal` (secondary) | `#365462` | 54, 84, 98 | 0.076 | **2.14:1** | **FAIL** | **FAIL** |
| `--color-teal-bright` | `#59727e` | 89, 114, 126 | 0.148 | **3.36:1** | **FAIL** | PASS |
| `--color-warning` | `#eab308` | 234, 179, 8 | 0.446 | **8.42:1** | PASS | PASS |
| `--color-error` | `#ef4444` | 239, 68, 68 | 0.151 | **3.41:1** | **FAIL** | PASS |
| `--color-healthy` | `#10b981` | 16, 185, 129 | 0.295 | **5.86:1** | PASS | PASS |
| `--color-offline` | `#6b7280` | 107, 114, 128 | 0.148 | **3.36:1** | **FAIL** | PASS |
| `rgba(255,255,255,0.40)` on void | effective `#6a767b` | 106, 118, 123 | 0.174 | **3.80:1** | **FAIL** | PASS |
| `rgba(255,255,255,0.50)` on void | effective `#838d90` | 131, 141, 144 | 0.253 | **5.14:1** | PASS | PASS |
| `rgba(255,255,255,0.57)` on void | effective `#949c9f` | 148, 156, 159 | 0.314 | **6.18:1** | PASS | PASS |

**Critical findings from pre-computation:**

| # | Finding | Severity | Remediation |
|---|---------|----------|-------------|
| CF-1 | `--color-text-tertiary` (#5a7a88) fails AA for normal text at 3.87:1. Used for metadata labels, timestamps, and supplementary information. | **High** | Lighten to at least #6e8d9a (approx 4.5:1) or restrict usage to large text only (>=18px or >=14px bold). |
| CF-2 | `--color-text-ghost` (#33505e) fails all WCAG thresholds at 2.07:1. | **Medium** | Acceptable ONLY for purely decorative text that conveys no information. Must not be used for any content a user needs to read. Audit all usages. |
| CF-3 | The stated "40% opacity text floor" produces an effective contrast of 3.80:1 on void backgrounds, which **fails AA for normal text**. | **Critical** | Raise the minimum opacity floor to 50% (5.14:1) or 57% (6.18:1) for any text that conveys information. The 40% floor may remain for purely decorative ambient text only. |
| CF-4 | `--color-error` (#ef4444) at 3.41:1 fails AA for normal-sized error text on void. | **High** | Use `--color-error-glow` (#f87171) for error messages (compute contrast: approximately 4.8:1), or pair error color with a lighter background surface. |
| CF-5 | `--color-teal` (#365462) at 2.14:1 and `--color-teal-bright` (#59727e) at 3.36:1 both fail for text on void. | **Medium** | Restrict teal tokens to non-text decorative uses (borders, backgrounds) or pair with lighter text on top. Do not use as text color on dark backgrounds. |
| CF-6 | `--color-offline` (#6b7280) at 3.36:1 fails AA for normal text. | **Medium** | If used for status text (e.g., "Offline" labels), lighten to `--color-offline-glow` (#9ca3af) or increase font size to qualify as large text. |

**Glass-morphism effective contrast analysis:**

Glass-morphism surfaces use `bg-white/[0.06]` with `backdrop-blur-[16px]`. On a `--color-void` background, the effective surface color is approximately `#111e27` (L ~ 0.013). This marginally improves contrast for text on the glass surface but does not change any pass/fail verdicts from the table above.

However, when glass surfaces overlap varied backgrounds (e.g., particle fields, ambient grid effects), the effective background becomes unpredictable. The audit must test contrast at the worst-case effective background, not the theoretical token value.

**Deliverable format:** Markdown table (as above) committed to `plans/launch-plan/phase-c-integration-polish/audit-artifacts/contrast-ratio-matrix.md`. Each combination includes the computed ratio, pass/fail status, and the specific WCAG criterion (1.4.3 or 1.4.11) it applies to.

---

### 4.2 WCAG 2.1 AA Criteria Checklist

A comprehensive checklist of all WCAG 2.1 AA success criteria applicable to the Safetrekr marketing site, with per-page test status. Organized by WCAG principle.

**Perceivable (Principle 1)**

| Criterion | ID | Requirement | Test Method | At-Risk Areas |
|-----------|-----|-------------|-------------|---------------|
| Non-text Content | 1.1.1 | All images, icons, and SVGs have appropriate alt text or are marked decorative | Manual inspection of all `<img>`, `<svg>`, and icon components | Logo images, team photos (about page), agency badges, Lucide icons |
| Captions (Prerecorded) | 1.2.2 | Video content has captions | N/A (no video on marketing pages at launch) | -- |
| Info and Relationships | 1.3.1 | Semantic HTML conveys structure: headings, lists, landmarks, tables, form labels | Screen reader + DOM inspection | Pricing tier comparison, FAQ accordion, form fields, heading hierarchy per page |
| Meaningful Sequence | 1.3.2 | DOM order matches visual presentation | Tab order vs visual flow comparison | Glass card grids (may reorder visually via CSS order/flex), two-column layouts on about page |
| Sensory Characteristics | 1.3.4 | Instructions do not rely solely on shape, color, size, visual location, or sound | Content review | CTA buttons (must not rely only on green color to be identifiable), form validation (must not use color alone) |
| Use of Color | 1.4.1 | Color is not the sole means of conveying information | Visual inspection + forced grayscale test | Form validation errors (must have icon + text, not just red border), active nav link (must have underline or weight, not just color change), status indicators |
| Contrast (Minimum) | 1.4.3 | Text contrast >= 4.5:1 (normal), >= 3:1 (large: >=18px or >=14px bold) | Computed from token values + spot-check with browser extension | See Section 4.1 -- multiple failures identified in pre-computation |
| Resize Text | 1.4.4 | Content usable and readable at 200% browser zoom without loss of content or functionality | Manual test at 200% zoom on all pages | Fixed header height, glass card layouts, pricing tier cards, ZUI controls |
| Images of Text | 1.4.5 | Text is rendered as text, not as images (except logos) | DOM inspection | OG images are exempt. Verify no decorative text rendered as `<canvas>` or `<img>` |
| Reflow | 1.4.10 | Content reflows to a single column at 320px viewport width without horizontal scrolling | Manual test at 320px | Pricing comparison table, feature grid (platform page), agency badge grid (about page), footer 3-column layout |
| Non-text Contrast | 1.4.11 | UI component boundaries and states have >= 3:1 contrast against adjacent colors | Manual measurement | Form input borders (`--color-border-default: #365462` on `--color-void: #061a23` = approx 2.4:1 -- **PREDICTED FAIL**), button outlines, card borders, focus indicators |
| Text Spacing | 1.4.12 | Content remains readable when user overrides line-height to 1.5x, letter spacing to 0.12em, word spacing to 0.16em, paragraph spacing to 2x | Bookmarklet test (text spacing override) | Dense glass card text, pricing feature lists, legal page body text |
| Content on Hover or Focus | 1.4.13 | Tooltip/hover content is dismissible (Escape), hoverable (can move pointer over it), persistent (stays until dismissed) | Manual interaction test | Navigation dropdowns (if implemented), tooltip-style UI on pricing or platform pages |

**Operable (Principle 2)**

| Criterion | ID | Requirement | Test Method | At-Risk Areas |
|-----------|-----|-------------|-------------|---------------|
| Keyboard | 2.1.1 | All functionality available via keyboard | Tab through every interactive element on every page | Mobile nav toggle, FAQ accordions, form submission, CTA buttons, ZUI controls, gateway choice buttons |
| No Keyboard Trap | 2.1.2 | Focus can be moved away from every component using keyboard | Tab through all components; verify no traps | Mobile nav focus trap (must release on close), modal dialogs (if any), ZUI canvas |
| Timing Adjustable | 2.2.1 | If time limits exist, user can turn off, adjust, or extend | Review for timed interactions | Gateway boot sequence (auto-advancing), any session timeouts |
| Pause, Stop, Hide | 2.2.2 | Moving, blinking, scrolling, or auto-updating content can be paused, stopped, or hidden | Test with `prefers-reduced-motion` and manual controls | Particle field animations, breathing glow CTAs, ZUI ambient effects (scanlines, grid pulse), gateway boot sequence |
| Three Flashes | 2.3.1 | No content flashes more than 3 times per second | Visual inspection | Gateway scanline effects, ambient grid pulse, morph transitions |
| Bypass Blocks | 2.4.1 | Skip-to-content link allows bypassing repeated content blocks | Keyboard: Tab on page load, verify skip link appears and targets `#main-content` | Marketing layout (header appears on every page) |
| Page Titled | 2.4.2 | Pages have descriptive, unique titles | Inspect `<title>` element on every page | All marketing pages (verify unique titles from WS-A.3 metadata) |
| Focus Order | 2.4.3 | Focus order is logical and meaningful | Tab through every page; verify order matches visual flow | Two-column layouts, glass card grids, form fields |
| Link Purpose (In Context) | 2.4.4 | Link text (or link + context) conveys destination | Review all link text | "Learn more" links (must have accessible name distinguishing them, e.g., `aria-label` or visible context), footer links, nav links |
| Multiple Ways | 2.4.5 | More than one way to locate a page (nav, sitemap, search) | Verify navigation + sitemap.xml | Sitemap (WS-A.3), header navigation, footer navigation |
| Headings and Labels | 2.4.6 | Headings and labels describe topic or purpose | Screen reader heading navigation | All pages (verify no missing or misleading headings) |
| Focus Visible | 2.4.7 | Keyboard focus indicator is visible on every interactive element | Tab through all elements | Custom-styled buttons (verify focus ring not suppressed), glass card links, form inputs, hamburger menu |
| Target Size | 2.5.5 | Touch targets are at least 44x44 CSS pixels | Measure all interactive elements on mobile viewport | Nav links in mobile panel, footer links, form controls, pricing CTA buttons, close buttons |

**Understandable (Principle 3)**

| Criterion | ID | Requirement | Test Method | At-Risk Areas |
|-----------|-----|-------------|-------------|---------------|
| Language of Page | 3.1.1 | `<html>` element has `lang` attribute | DOM inspection | Root layout `src/app/layout.tsx` |
| On Focus | 3.2.1 | No unexpected context changes on focus | Tab through all elements | Dropdowns, accordions, any auto-expanding content |
| On Input | 3.2.2 | No unexpected context changes on input | Fill forms, toggle controls | Contact form submission, organization type dropdown |
| Consistent Navigation | 3.2.3 | Navigation is consistent across pages | Visual comparison of header/footer across all marketing pages | Marketing header (same links, same order on every page) |
| Consistent Identification | 3.2.4 | Components with same function have same name | Review CTA labels across pages | "Schedule a Briefing" CTA (verify same label everywhere), "Learn more" links |
| Error Identification | 3.3.1 | Errors are identified and described in text | Submit form with invalid data | Contact form: each invalid field must have a text error message, not just a colored border |
| Labels or Instructions | 3.3.2 | Form fields have labels or instructions | Inspect form markup | Contact form: every `<input>` and `<select>` must have an associated `<label>` |
| Error Suggestion | 3.3.3 | When an error is detected and suggestions are known, provide suggestions | Submit form with common errors | Email field: "Please enter a valid email address"; required fields: "This field is required" |
| Error Prevention (Legal, Financial, Data) | 3.3.4 | Form submissions are reversible, verified, or confirmed | Review form submission flow | Contact form: either confirm before submission or allow editing after |

**Robust (Principle 4)**

| Criterion | ID | Requirement | Test Method | At-Risk Areas |
|-----------|-----|-------------|-------------|---------------|
| Parsing | 4.1.1 | Markup is valid (deprecated in WCAG 2.2 but still relevant for 2.1 AA) | HTML validator | All pages |
| Name, Role, Value | 4.1.2 | All UI components have accessible name, role, and value exposed to assistive technology | Screen reader + DOM inspection | Custom components: glass cards (are they `role="region"`?), FAQ accordion (proper `aria-expanded`?), mobile nav (`role="dialog"`), pricing toggle (if any) |
| Status Messages | 4.1.3 | Status messages are communicated to assistive technology via `role="status"` or `aria-live` | Screen reader test | Form submission success/error messages, any dynamic content updates |

**Deliverable format:** Per-page spreadsheet or markdown table with test status (Pass / Fail / N/A / Needs Verification) for each criterion. Committed to `plans/launch-plan/phase-c-integration-polish/audit-artifacts/wcag-checklist.md`.

---

### 4.3 Device and Browser Test Matrix

Testing is structured around the primary use case: a 45-55 year old school safety director viewing the site on their office workstation, with secondary coverage for tablet demos and mobile reference.

**Primary tier (must pass all criteria):**

| # | Device Category | OS | Browser | Resolution | Scaling | Rationale |
|---|----------------|-----|---------|------------|---------|-----------|
| 1 | Desktop workstation | Windows 11 | Chrome (latest) | 1920x1080 | 100% | Most common enterprise desktop configuration |
| 2 | Desktop workstation | Windows 11 | Edge (latest) | 1920x1080 | 100% | Default Windows browser; many institutional IT policies enforce Edge |
| 3 | Desktop workstation | Windows 11 | Chrome (latest) | 1920x1080 | 125% | Common Windows default scaling on 1080p displays; text and UI elements scaled up |
| 4 | Desktop workstation | Windows 11 | Chrome (latest) | 1920x1080 | 150% | Accessibility-focused scaling for users with vision concerns |
| 5 | Desktop workstation | Windows 11 | Firefox (latest) | 1920x1080 | 100% | Third browser coverage |
| 6 | Desktop workstation | macOS | Safari (latest) | 1440x900 | Retina 2x | Stakeholder demo environment (likely MacBook) |
| 7 | Desktop workstation | macOS | Chrome (latest) | 1440x900 | Retina 2x | Cross-platform verification |

**Secondary tier (should pass; issues documented but do not block):**

| # | Device Category | OS | Browser | Resolution | Rationale |
|---|----------------|-----|---------|------------|-----------|
| 8 | Tablet | iPadOS | Safari | 1024x768 (portrait), 1366x1024 (landscape) | Demo device for in-person stakeholder meetings |
| 9 | Mobile | iOS 17+ | Safari | 390x844 (iPhone 14/15) | Quick-reference mobile access |
| 10 | Mobile | Android 14+ | Chrome | 360x800 (common Android) | Quick-reference mobile access |

**Accessibility tier (must pass for compliance):**

| # | Configuration | Tool | Rationale |
|---|--------------|------|-----------|
| 11 | Windows High Contrast Mode | Edge on Windows 11 | Tests forced color overrides; critical for low-vision users on institutional machines |
| 12 | Browser zoom at 200% | Chrome on 1920x1080 | WCAG 1.4.4 Resize Text compliance |
| 13 | Browser zoom at 400% | Chrome on 1920x1080 | WCAG 1.4.10 Reflow -- content must not require horizontal scrolling at 320px equivalent |
| 14 | NVDA screen reader | Firefox on Windows 11 | Primary assistive technology for the Windows-dominant target audience |
| 15 | VoiceOver | Safari on macOS | Secondary screen reader verification |
| 16 | VoiceOver | Safari on iOS | Mobile screen reader verification |
| 17 | `prefers-reduced-motion: reduce` | Chrome (emulated via DevTools) | All animations must be disabled or reduced |
| 18 | `prefers-color-scheme: light` (if supported) | Chrome | Verify safetrekr light mode token application (if light mode is exposed to users) |
| 19 | Forced 1366x768 viewport | Chrome DevTools | Common lower-resolution institutional monitor |

**Dell institutional monitor considerations:**

Institutional Dell monitors (e.g., Dell P2419H, E2420H, P2422H series) are typically:

- 1920x1080 IPS or 1920x1080 TN panels
- Factory-calibrated to sRGB but often drifted over time with no recalibration
- Brightness range 250-300 cd/m2, often set to default (around 75% brightness)
- Viewing angle on TN panels: 170/160 degrees (color shift at off-axis angles)
- Matte anti-glare coating (reduces perceived contrast by approximately 10-15% vs glossy displays)

The audit cannot simulate these conditions precisely, but the following mitigations are applied:

1. Test with monitor brightness at 50% (simulates office ambient light washing out display).
2. Test with an sRGB emulation profile that reduces gamut and contrast (Chrome DevTools "Emulate vision deficiencies" > "Blurred vision" as a rough proxy for presbyopia).
3. Add a 10% safety margin to all contrast ratio verdicts: any combination below 5.0:1 effective contrast is flagged for review, even if technically passing the 4.5:1 threshold.

**Deliverable format:** Markdown table committed to `plans/launch-plan/phase-c-integration-polish/audit-artifacts/device-browser-matrix.md`. Results column added per cell during execution. Screenshots captured for each configuration and stored in `audit-artifacts/screenshots/`.

---

### 4.4 Touch Target Requirements

All interactive elements must meet a minimum touch target size of **48x48 CSS pixels** on touch devices. This exceeds the WCAG 2.5.5 Level AAA target of 44x44px and accounts for the reduced fine motor precision typical of the 40-60yr target audience.

**Measurement methodology:**

1. Set viewport to 390x844 (iPhone 14).
2. For each interactive element, measure the rendered bounding box in CSS pixels using DevTools.
3. If the visible element is smaller than 48x48, measure the effective tap area including any padding applied to the hit-test region.
4. Elements with tap areas smaller than 48x48 (including padding) are flagged.

**Elements to audit:**

| Category | Elements | Expected Risk |
|----------|----------|---------------|
| Navigation | Header nav links, hamburger button, mobile nav panel links, footer links | Footer links in dense 3-column layout may be under-sized |
| CTAs | "Schedule a Briefing" buttons, "Learn more" links, secondary CTAs | Likely sufficient (buttons are typically well-sized) |
| Forms | Input fields, select dropdown, submit button, label tap areas | Input fields should be at least 48px tall; labels must extend tap area to the associated input |
| Cards | Glass card click/tap areas, pricing tier selection | Cards are typically large; verify child link elements within cards |
| Accordions | FAQ expand/collapse triggers on pricing page | Trigger area must be the full row, not just the chevron icon |
| ZUI | Capsule ring targets at `/launch` (informational, not a primary audit target) | Capsules are 192x228px, well above threshold. But minimap, zoom controls, command palette trigger may be under-sized. |
| Legal | Terms/privacy "back to top" links, any anchor links | Inline text links in legal content must have sufficient line-height spacing (>= 48px between baselines) to prevent adjacent-tap errors |

**Spacing requirement for inline links:** When links appear within body text, line-height must provide at least 48px between the baseline of one line and the baseline of the next to prevent accidental activation of adjacent links. At 16px font size, this requires `line-height >= 3.0` for text with links on every line, or sufficient paragraph spacing.

**Deliverable format:** Per-element measurement table committed to `plans/launch-plan/phase-c-integration-polish/audit-artifacts/touch-target-audit.md`.

---

### 4.5 Focus Indicator Specification

Every interactive element on the site must have a clearly visible focus indicator when navigated to via keyboard (Tab / Shift+Tab).

**Specification:**

| Property | Value | Token Reference |
|----------|-------|----------------|
| Outline style | 2px solid | -- |
| Outline color | `var(--color-ember-bright)` (#6abf84) | Contrast vs void: 7.99:1 (passes 3:1 non-text contrast) |
| Outline offset | 2px | Prevents outline from overlapping element content |
| Trigger | `:focus-visible` only (not `:focus`) | Prevents focus ring on mouse click |
| CSS pattern | `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]` | Matches pattern established in WS-A.1 |

**Focus indicator contrast requirements:**

The focus indicator must have at least 3:1 contrast ratio against:
1. The element's own background (e.g., button surface)
2. The adjacent background behind the element
3. Both the focused and unfocused states of the element

| Element Context | Element Background | Adjacent Background | Focus Color | Contrast vs Element BG | Contrast vs Adjacent BG | Verdict |
|----------------|--------------------|--------------------|-------------|----------------------|------------------------|---------|
| CTA button on void | `--color-ember` #4ba467 (approx) | `--color-void` #061a23 | #6abf84 | ~1.45:1 | 7.99:1 | **FAIL vs element BG** -- focus ring on green button is too similar to button color |
| Nav link on header glass | `bg-white/[0.04]` on void | `--color-void` #061a23 | #6abf84 | ~7.5:1 | 7.99:1 | PASS |
| Form input on void | `--color-surface` #123646 | `--color-void` #061a23 | #6abf84 | ~4.2:1 | 7.99:1 | PASS |
| Glass card on void | `bg-white/[0.06]` on void | `--color-void` #061a23 | #6abf84 | ~7.3:1 | 7.99:1 | PASS |

**Remediation for green-button focus ring:** When the focused element itself is green (e.g., the "Schedule a Briefing" CTA button), the green focus ring is insufficiently distinct. Options:

- Use a white (`#e8f0f4`) focus ring on green buttons specifically: `focus-visible:outline-[var(--color-text-primary)]`.
- Increase outline width to 3px for green-on-green contexts to increase visual distinction through size rather than color.
- Add a 2px gap (outline-offset: 4px) so the indicator is separated from the button edge.

**Audit method:** Tab through every interactive element on every page. For each element, verify:
1. Focus ring is visible.
2. Focus ring color meets 3:1 contrast against both the element and its surroundings.
3. Focus ring does not clip or overflow in a way that obscures it.
4. `:focus-visible` is used (not `:focus`), so mouse users do not see focus rings.

**Deliverable format:** Per-element pass/fail table committed to `plans/launch-plan/phase-c-integration-polish/audit-artifacts/focus-indicator-audit.md`.

---

### 4.6 Screen Reader Testing Plan

Screen reader testing validates that the full content and functionality of every page is accessible to users who cannot see the visual interface. The testing plan covers landmarks, heading structure, form interactions, dynamic content, and reading order.

**Primary tool:** NVDA (NonVisual Desktop Access) on Windows 11 with Firefox. This combination is the most representative of the target audience's institutional Windows environment.

**Secondary tool:** VoiceOver on macOS Safari and iOS Safari.

**Testing protocol per page:**

| Step | Action | Expected Outcome | What to Record |
|------|--------|------------------|----------------|
| 1 | Navigate to page. Press Insert+F7 (NVDA) to list all landmarks | Page has: banner (header), navigation (main nav), main, contentinfo (footer). Each landmark has an accessible label. | Missing landmarks, unlabeled landmarks |
| 2 | Press H (NVDA) to navigate by headings | Heading hierarchy is logical: single H1 per page, H2 for major sections, H3 for subsections. No skipped levels. | Skipped heading levels, duplicate H1, headings that do not match visible text |
| 3 | Press K (NVDA) to navigate by links | All links have descriptive accessible names. No "click here" or bare "Learn more" without context. | Ambiguous link text, missing `aria-label` on icon-only links |
| 4 | Press F (NVDA) to navigate by form controls (contact page) | All form fields are labeled. Required fields are announced. Select dropdown options are readable. | Unlabeled fields, missing required indication, inaccessible custom controls |
| 5 | Tab through all interactive elements | Focus order matches visual order. All interactive elements are reachable. No focus traps (except intentional: mobile nav). | Unexpected focus order, unreachable elements, unintentional traps |
| 6 | Submit the contact form with invalid data | Each error message is announced when it appears (via `aria-live` or `role="alert"`). Error messages identify the specific field and the nature of the error. | Silent errors, generic error messages, errors not associated with fields |
| 7 | Submit the contact form with valid data | Success message is announced. | Silent success state |
| 8 | Open and close the mobile nav panel (at mobile viewport) | Panel opening is announced. Focus moves into panel. Panel closing returns focus to hamburger button. | No announcement, focus lost on close |
| 9 | Read through all body content using arrow keys | Content reads in a logical order. Decorative elements (particle field, ambient overlays) are not announced. Images have appropriate alt text or are hidden from AT (`aria-hidden="true"` or `role="presentation"`). | Decorative elements announced, missing alt text, illogical reading order |
| 10 | Navigate the FAQ accordion on the pricing page | Each question announces its expanded/collapsed state. Content is revealed and readable when expanded. | Missing `aria-expanded`, content not accessible when collapsed |

**Pages to test:**

| Page | Priority | Key Screen Reader Concerns |
|------|----------|---------------------------|
| Landing (`/landing`) | P1 | Heading hierarchy across 6 sections, particle field not announced, CTA buttons labeled |
| Contact (`/contact`) | P1 | Form field labels, error announcements, success message, required field indication |
| Pricing (`/pricing`) | P1 | Tier comparison (ensure not just a visual grid -- needs semantic structure), FAQ accordion `aria-expanded` |
| How It Works (`/how-it-works`) | P2 | Step sequence (ordered list or proper heading structure), collapsible sections |
| Security (`/security`) | P2 | Section structure, compliance status indicators not color-only |
| Platform (`/platform`) | P2 | Feature grid semantic structure (list or definition list, not just visual cards) |
| Solutions (`/solutions`) | P2 | Vertical cards with links -- each card's link must be distinguishable |
| About (`/about`) | P2 | Team photos alt text, expandable bios (`aria-expanded`), agency badge grid |
| Legal (terms, privacy) | P3 | Long-form text reading, heading structure for navigation |
| Error pages (not-found, error) | P3 | Error message announced, recovery links accessible |
| Gateway (`/`) | P3 | Boot sequence accessible (or skippable), choice reveal buttons labeled |
| ZUI (`/launch`) | P3 | Informational audit only -- ZUI is acknowledged as primarily a visual experience. Document what works, what does not, and recommended fallback messaging. |

**Deliverable format:** Testing log with per-step pass/fail/notes committed to `plans/launch-plan/phase-c-integration-polish/audit-artifacts/screen-reader-testing-log.md`.

---

### 4.7 Remediation Priority Framework

Every issue discovered during the audit is classified using the following severity framework. The framework determines whether an issue blocks launch or is tracked for post-launch remediation.

**Severity levels:**

| Severity | Definition | Fix Deadline | Example |
|----------|-----------|--------------|---------|
| **Critical** | WCAG 2.1 AA Level A failure that makes content or functionality inaccessible to a class of users. Legal liability risk. | **Must fix before launch.** No exceptions. | Missing form field labels (1.3.1), keyboard trap (2.1.2), content inaccessible without JavaScript where a server component would work |
| **High** | WCAG 2.1 AA Level AA failure that significantly degrades the experience for users with disabilities or the target audience's viewing conditions. | **Must fix before launch unless a documented workaround exists.** If a workaround is provided (e.g., text is also available via screen reader even though visual contrast fails), the fix may be deferred to sprint 1 post-launch. | Text contrast below 4.5:1 on readable content (1.4.3), focus indicators not visible (2.4.7), touch targets below 44px (2.5.5) |
| **Medium** | WCAG 2.1 AA Level AA failure on non-critical content, or a best-practice violation that impacts usability but not legal compliance. | **Fix within 2 sprints post-launch.** | Decorative image not hidden from screen reader, heading level skipped in one section, inconsistent link text |
| **Low** | Best-practice recommendation or AAA criterion that would improve the experience. Not a compliance failure. | **Backlog.** Address when the related component is next modified. | AAA contrast ratio (7:1) not met on secondary text, animation timing slightly above threshold |

**Launch gate:**

- **Zero Critical issues** remaining at launch.
- **Zero High issues** remaining at launch, unless each has a documented workaround AND a remediation ticket assigned with a sprint-1 deadline.
- **Medium and Low** issues are tracked in the backlog and do not block launch.

**Issue tracking format:**

Each issue is documented with the following fields:

| Field | Description |
|-------|-------------|
| Issue ID | `ACC-{sequential number}` (e.g., ACC-001) |
| Page(s) | Which pages are affected |
| WCAG Criterion | Specific success criterion (e.g., 1.4.3) |
| Severity | Critical / High / Medium / Low |
| Description | What the issue is, with screenshot or measurement |
| Current Value | The measured value (e.g., contrast ratio 3.87:1) |
| Required Value | The WCAG threshold (e.g., 4.5:1) |
| Affected Users | Who is impacted (e.g., low-vision users, screen reader users, keyboard users) |
| Remediation | Specific fix recommendation with CSS/HTML changes |
| Estimated Effort | S (< 1h), M (1-4h), L (4-8h) |
| Assigned To | Developer or designer responsible |
| Status | Open / In Progress / Resolved / Deferred |

**Deliverable format:** Issue register as a markdown table committed to `plans/launch-plan/phase-c-integration-polish/audit-artifacts/remediation-register.md`. Each row is a discrete issue. The register is the single source of truth for all accessibility remediation work.

---

### 4.8 Audit Execution Checklist

The master checklist used during audit execution. The auditor works through this sequentially for each page.

**Per-page checklist:**

```markdown
## Page: [Page Name] ([URL])

### Visual Inspection
- [ ] Page loads correctly at 1920x1080
- [ ] Page loads correctly at 1366x768
- [ ] Page loads correctly at 768x1024 (tablet portrait)
- [ ] Page loads correctly at 375x812 (mobile)
- [ ] Page loads correctly at 320px width (minimum reflow)
- [ ] No horizontal scrollbar at any tested width
- [ ] Text is readable at 200% browser zoom
- [ ] Text is readable at 400% browser zoom (single column reflow)
- [ ] All images/icons render at all breakpoints
- [ ] Glass-morphism surfaces are visually distinct from the background

### Contrast
- [ ] All body text meets 4.5:1 against its effective background
- [ ] All large text (>=18px or >=14px bold) meets 3:1
- [ ] All UI component boundaries (borders, outlines) meet 3:1
- [ ] Form input borders meet 3:1 against the adjacent background
- [ ] Links are distinguishable from surrounding text (underline or 3:1 contrast)
- [ ] No text relies on opacity below 50% for informational content

### Keyboard
- [ ] Skip-to-content link works on first Tab press
- [ ] All interactive elements reachable via Tab
- [ ] Focus order matches visual reading order
- [ ] Focus ring visible on every interactive element
- [ ] No focus traps (except intentional: mobile nav)
- [ ] Escape closes any open overlay (mobile nav, modals)

### Screen Reader (NVDA)
- [ ] Landmarks present and labeled (banner, nav, main, contentinfo)
- [ ] Heading hierarchy logical (H1 -> H2 -> H3, no skips)
- [ ] All images have alt text or are decorative-hidden
- [ ] All links have descriptive accessible names
- [ ] Form fields labeled (if applicable)
- [ ] Dynamic content changes announced (if applicable)
- [ ] Decorative elements (particles, scanlines, ambient) not announced

### Touch Targets (mobile viewport)
- [ ] All buttons >= 48x48 CSS pixels
- [ ] All links >= 48x48 CSS pixels (including padding)
- [ ] Adequate spacing between adjacent targets (>= 8px)
- [ ] No overlapping tap areas

### Motion and Animation
- [ ] `prefers-reduced-motion: reduce` disables all non-essential animation
- [ ] Breathing glow stops (static shadow remains)
- [ ] Particle field stops (or is hidden)
- [ ] No content flashes more than 3 times per second

### Color Independence
- [ ] Forced grayscale: all information still conveyed
- [ ] Error states: icon + text, not just red color
- [ ] Active nav state: underline or weight, not just color
- [ ] Status indicators: label text accompanies color

### Windows High Contrast Mode
- [ ] All text visible
- [ ] All interactive elements visible and distinguishable
- [ ] Focus indicators visible
- [ ] No content disappears (custom backgrounds, borders)
```

**Deliverable format:** Completed checklists per page committed to `plans/launch-plan/phase-c-integration-polish/audit-artifacts/per-page-checklists/[page-name].md`.

---

## 5. Acceptance Criteria

| ID | Criterion | Verification Method |
|----|-----------|---------------------|
| AC-1 | Contrast ratio matrix covering all text/background token combinations is complete, with computed ratios and pass/fail verdicts | Review: matrix file exists, all tokens from `spatial-tokens.css` safetrekr dark mode are covered, math is verifiable |
| AC-2 | WCAG 2.1 AA checklist has per-page status for every applicable criterion across all 14 pages (10 marketing + gateway + launch + 2 error pages) | Review: checklist file exists, every criterion has a status per page, no blanks |
| AC-3 | Device/browser test matrix has results for all primary tier configurations (7 configurations) | Review: matrix file has pass/fail/notes for every primary tier row |
| AC-4 | Device/browser test matrix has results for all accessibility tier configurations (9 configurations) | Review: matrix file has pass/fail/notes for every accessibility tier row |
| AC-5 | Touch target audit covers every interactive element on all marketing pages at mobile viewport, with measured pixel dimensions | Review: audit file lists every button, link, and form control with dimensions |
| AC-6 | Focus indicator audit confirms every interactive element has a visible focus ring when navigated via keyboard, or documents the failure | Review: audit file has per-element pass/fail for Tab navigation on every page |
| AC-7 | Screen reader testing log covers all P1 pages (landing, contact, pricing) with NVDA, including all 10 protocol steps | Review: log file exists with step-by-step findings for all P1 pages |
| AC-8 | Screen reader testing log covers all P2 pages (how-it-works, security, platform, solutions, about) with at least heading and landmark checks | Review: log file exists with findings for all P2 pages |
| AC-9 | Remediation register contains every issue found, classified by severity (Critical/High/Medium/Low) with remediation recommendations | Review: register file exists, every issue has all required fields (ID, WCAG criterion, severity, description, remediation, effort) |
| AC-10 | Zero Critical issues remain open in the remediation register (all resolved or no Critical issues found) | Review: filter register for Critical severity; all must have Status = Resolved |
| AC-11 | All High issues either have Status = Resolved OR have a documented workaround AND an assigned remediation ticket with a sprint-1 deadline | Review: filter register for High severity; verify resolution or workaround |
| AC-12 | The 40% text opacity floor risk (R-14) has a specific, measured finding with a concrete remediation recommendation | Review: find the specific entry in the remediation register addressing opacity floor, with measured contrast ratio and proposed new minimum |
| AC-13 | Glass-morphism effective contrast has been tested on at least 3 page sections where glass surfaces overlay varied backgrounds | Review: contrast matrix includes glass-morphism-specific entries with worst-case effective backgrounds |
| AC-14 | Screenshots exist for at least: 1920x1080 Windows Chrome, 375px mobile, Windows High Contrast Mode, and 200% zoom -- for the landing page and contact page at minimum | Review: screenshot files exist in `audit-artifacts/screenshots/` |
| AC-15 | All audit artifacts are committed to `plans/launch-plan/phase-c-integration-polish/audit-artifacts/` and cross-referenced from this SOW | Review: directory exists with the expected files |

---

## 6. Decisions Made

| # | Decision | Rationale | Alternatives Considered |
|---|----------|-----------|------------------------|
| D-1 | Touch target minimum is 48x48px, exceeding WCAG 2.5.5 AAA (44x44px) | Target audience is 40-60yr security directors who may have reduced fine motor precision. The 4px increase costs nothing in layout but meaningfully reduces mis-tap risk. | 44x44px (WCAG 2.5.5 AAA minimum -- sufficient for compliance but not optimized for audience); 64x64px (unnecessarily large, wastes screen real estate) |
| D-2 | NVDA on Windows is the primary screen reader, not VoiceOver on macOS | The target audience uses institutional Windows machines. VoiceOver is secondary coverage for stakeholder demo scenarios (presenters may use MacBooks). NVDA+Firefox is the most common free screen reader combination on Windows. | JAWS (commercial, higher market share in enterprise but expensive and unnecessary for audit purposes); VoiceOver only (insufficient for actual user base); Narrator (lower adoption, fewer features) |
| D-3 | A 10% safety margin is applied to contrast ratio verdicts (flag at 5.0:1 instead of 4.5:1) | Institutional Dell monitors with TN panels, matte anti-glare coatings, and ambient office lighting reduce effective perceived contrast by 10-15% compared to lab conditions. The WCAG formula does not account for display quality or environmental factors. | Strict 4.5:1 threshold only (ignores real-world viewing conditions); 20% margin (overly conservative, would flag too many passing combinations) |
| D-4 | The audit produces a remediation register, not direct code changes | Separating audit from remediation ensures: (a) all issues are documented before any fixes begin, (b) fixes can be prioritized holistically rather than addressed ad-hoc, (c) the audit artifact serves as a compliance record. | Audit-and-fix in a single pass (risk of incomplete documentation, fixes without context); automated tooling only (misses manual-only criteria like keyboard navigation, screen reader behavior) |
| D-5 | The Spatial ZUI (`/launch`) receives an informational audit only, not full compliance remediation | The ZUI is a spatial canvas-based interface that is fundamentally not designed for screen reader or keyboard-only use. Full compliance would require a parallel non-spatial interface, which is out of scope. The audit documents what works, what does not, and recommends a text-based fallback message for assistive technology users. | Full ZUI accessibility (prohibitive effort, would compromise the spatial experience design); ignore ZUI entirely (leaves a gap in the audit record) |
| D-6 | Font size minimum for body text is 16px (not the browser default of 16px for `1rem`, but explicitly enforced) | Presbyopia makes text below 16px difficult to read without correction. The Geist Sans font has a relatively small x-height, which means 14px Geist renders perceptually smaller than 14px of a larger x-height font like Inter. 16px is the minimum for comfortable reading by the target audience. | 14px (common in tech-oriented sites, but undersized for this audience); 18px (comfortable but may require significant layout adjustments for dense information pages like pricing) |
| D-7 | Windows High Contrast Mode testing is mandatory (primary tier), not optional | Institutional Windows machines may have High Contrast Mode enabled by IT policy or user preference. Glass-morphism effects (semi-transparent backgrounds, subtle borders) are at high risk of disappearing in High Contrast Mode, which overrides all author-defined colors. | Optional/secondary testing (misses a real scenario for institutional users); test only if issues reported (reactive rather than proactive) |
| D-8 | The audit checklist is executed manually with semi-automated tooling, not fully automated | Automated tools (axe-core, Lighthouse) catch approximately 30-40% of WCAG criteria. The remaining 60-70% require manual assessment (keyboard navigation, screen reader behavior, meaningful sequence, focus management). A manual-first approach with automated spot-checks is more thorough. | Automated only (misses majority of criteria); fully manual without tooling (slower, misses some programmatic checks that tools catch reliably) |

---

## 7. Open Questions

| # | Question | Impact | Owner | Resolution Deadline |
|---|----------|--------|-------|---------------------|
| OQ-1 | Should the `--color-text-tertiary` token be lightened globally (affecting all pages including ZUI), or should marketing pages use a separate overridden token? | Lightening globally changes the visual aesthetic across the entire site. A marketing-only override preserves the ZUI's current look but creates token divergence. | Design + Engineering | Before remediation begins |
| OQ-2 | Is the 40% opacity floor an explicit product requirement, or can it be raised to 50-57% based on the WCAG failure finding (CF-3)? | The 40% floor is stated in combined-recommendations.md AD-2 as a "UI Designer calibration note." Raising it to 50% would resolve the contrast failure for all informational text while maintaining the dark ambient aesthetic. 57% provides additional margin for institutional displays. | Design (world-class-ui-designer) | Before remediation begins |
| OQ-3 | Does the target audience actually use Windows High Contrast Mode at a rate that justifies mandatory testing? | If institutional IT policies do not enable High Contrast Mode and users do not self-select it, mandatory testing may be over-cautious. However, WCAG 2.1 AA does not explicitly require High Contrast Mode support -- it is a best practice. | Product + Business Owner | Before audit execution |
| OQ-4 | Should the Spatial ZUI at `/launch` include a fallback message for screen reader users (e.g., "This page contains an interactive spatial experience best viewed on a desktop with a mouse. Visit /landing for the full-text version.")? | Without a fallback, screen reader users encounter an opaque canvas with no meaningful content. A fallback provides a graceful degradation path. | Engineering + Design | Before audit completion |
| OQ-5 | Are there any known accommodations or accessibility policies at target customer organizations (e.g., K-12 school districts with Section 508 requirements) that would raise the bar above WCAG 2.1 AA? | K-12 school districts in the US are subject to Section 508 and ADA requirements, which align with WCAG 2.0 AA at minimum. Some states (e.g., California, New York) have stricter web accessibility mandates. If Safetrekr markets to school districts, the site may need to meet these standards to pass vendor procurement reviews. | Business Owner | Before launch |
| OQ-6 | Should the form input border color (`--color-border-default: #365462`) be lightened for marketing pages to meet the 3:1 non-text contrast requirement against void backgrounds? | Pre-computation suggests the current border on void is approximately 2.4:1, which fails WCAG 1.4.11. Lightening the border globally would affect the ZUI as well. | Design + Engineering | Before remediation begins |

---

## 8. Risk Register

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|------------|--------|------------|
| R-1 | Contrast ratio failures are more widespread than pre-computed, due to glass-morphism layers and ambient effects creating variable effective backgrounds | High | High | Pre-computation in Section 4.1 identifies 6 known failures. The audit execution may surface additional failures where glass surfaces overlap particle fields or gradient backgrounds. Mitigation: test contrast at worst-case effective background (darkest point behind glass), not theoretical token value. Budget remediation time for 8-12 total contrast issues. |
| R-2 | Remediation of contrast failures requires global token changes that alter the established Oblivion HUD aesthetic | Medium | High | Propose a marketing-specific token override layer (e.g., `[data-page-context="marketing"]` selector) that lightens text tokens for content pages only, preserving the ZUI's current aesthetic. Alternatively, propose selective token changes (lighten `--color-text-tertiary` from #5a7a88 to #6e8d9a) that minimally impact the visual design. All changes require design approval before implementation. |
| R-3 | Windows High Contrast Mode causes glass-morphism surfaces to disappear entirely, rendering pages unreadable | Medium | High | Glass-morphism relies on `background-color: rgba(255,255,255,0.06)` and `backdrop-filter: blur()`. High Contrast Mode overrides background colors and may eliminate the subtle surface differentiation. Mitigation: use `@media (forced-colors: active)` CSS media query to provide fallback solid backgrounds and visible borders for High Contrast Mode. Add this as a standard remediation pattern. |
| R-4 | Screen reader testing reveals that the FAQ accordion, mobile nav, and form validation patterns are not properly ARIA-annotated | Medium | Medium | These are the three most common ARIA implementation failures in Next.js apps. Pre-audit, verify that WS-A.1 (mobile nav) specifies `role="dialog"`, `aria-modal`, and focus trapping. Verify WS-B.5 (pricing FAQ) specifies `aria-expanded`. Verify WS-A.4 (contact form) specifies `aria-live` for error/success messages. If these are missing from the SOWs, flag during audit and add to remediation register. |
| R-5 | Phase B pages are delivered without accessibility considerations, creating a high volume of remediation items | Medium | Medium | Many issues are cheaper to prevent than to fix. Share a "Top 10 Accessibility Checklist for Developers" document with the Phase B implementer before page development begins. Items: semantic headings, alt text on images, form labels, button accessible names, no color-only information, focus management, reduced motion, ARIA landmarks, skip-to-content (already in layout), lang attribute. |
| R-6 | The audit reveals that the `prefers-reduced-motion` implementation in `reduced-motion.css` is incomplete -- some animations bypass the catch-all selector | Low | Medium | The existing `reduced-motion.css` uses `*:not(.reduced-motion-exempt)` to zero out animation durations. If any component uses inline styles or animation libraries that bypass CSS (e.g., `motion/react` spring animations driven by JavaScript), those animations will not be caught. Mitigation: during the motion audit, test each animation individually with reduced motion enabled. Document any bypass as a High severity issue. |
| R-7 | The audit timeline is compressed because Phase B delivery is late | Medium | Medium | If Phase B pages are not complete when the audit is scheduled to begin, conduct a partial audit on the pages that are available, then perform a delta audit when remaining pages are delivered. This prevents the audit from becoming a launch bottleneck. |
| R-8 | Form input border contrast failure (predicted ~2.4:1 for `--color-border-default` on void) requires a global border token change | Medium | Low | The `--color-border-default: #365462` is used across the entire site (spatial engine, ZUI, marketing pages). Changing it globally may affect the ZUI aesthetic. Mitigation: propose a marketing-specific border override or use a slightly lighter border for form elements only (e.g., `--color-border-strong: rgba(255,255,255,0.12)` blended on void gives approximately #1f2e38, still likely below 3:1). May need a dedicated `--color-border-input` token. |

---

## Estimated Effort

**Size:** M (Medium)
**Estimated time:** 10-14 hours total

| Activity | Hours | Notes |
|----------|-------|-------|
| Contrast ratio matrix (computed + glass-morphism spot checks) | 2-3h | Pre-computation done in this SOW; execution requires per-page spot checks and glass-morphism overlay measurements |
| WCAG 2.1 AA checklist execution (all pages) | 3-4h | Systematic walk-through of each criterion on each page |
| Device/browser matrix testing | 2-3h | 19 configurations across primary, secondary, and accessibility tiers |
| Screen reader testing (NVDA + VoiceOver) | 2-3h | P1 pages: full 10-step protocol. P2 pages: landmarks + headings. P3: informational only. |
| Touch target and focus indicator audits | 1h | Overlaps with device testing |
| Remediation register compilation and prioritization | 1-2h | Synthesize all findings into prioritized backlog |

**Artifact output:** 7+ files in `plans/launch-plan/phase-c-integration-polish/audit-artifacts/`:
1. `contrast-ratio-matrix.md`
2. `wcag-checklist.md`
3. `device-browser-matrix.md`
4. `touch-target-audit.md`
5. `focus-indicator-audit.md`
6. `screen-reader-testing-log.md`
7. `remediation-register.md`
8. `per-page-checklists/` (directory with 14 files)
9. `screenshots/` (directory)
