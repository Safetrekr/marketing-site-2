# Phase C Overview: Integration & Polish

**Project:** Safetrekr Marketing Site Launch
**Phase:** C -- Integration & Polish
**Document Type:** Synthesis Overview (Multi-Perspective)
**Date:** 2026-03-02
**Status:** Draft for Review

**Synthesis Perspectives:**

| Role | Focus |
|------|-------|
| CTA (Chief Technology Architect) | Architectural coherence, production readiness criteria, technical risk |
| SPO (Senior Product Owner) | Launch-blocking vs. deferrable scope, minimum viable launch gate |
| STW (Senior Technical Writer) | Specification completeness, ambiguity in acceptance criteria |
| PMO (Project Management Office) | Sequencing, critical path, effort aggregation, parallel execution windows |

**Source Documents Reviewed:**

- `PHASE-A-OVERVIEW.md` (foundation phase context)
- `PHASE-B-OVERVIEW.md` (content phase context)
- `combined-recommendations.md` (project source of truth)
- `ws-c.1-gateway-integration.md` through `ws-c.4-og-images-social-sharing.md` (4 SOWs)

---

## 1. Executive Summary

Phase C is the production readiness gate. It answers: "Can this site be shown to real visitors, shared on LinkedIn, and generate measurable business intelligence from day one?" The phase comprises four workstreams that span three distinct concerns: user flow integrity (C.1), quality assurance (C.2), measurement infrastructure (C.3), and distribution polish (C.4).

**Scope by the numbers:**

| Metric | Count |
|--------|-------|
| Workstreams | 4 |
| New files created | ~25-30 |
| Modified files | ~12-15 |
| Acceptance criteria (total across all SOWs) | 71 |
| Open questions requiring resolution | 16 |
| Risks identified | 27 |
| Estimated effort | 16-24 hours |

**Phase C is fundamentally different from Phases A and B.** Where those phases create infrastructure and content, Phase C validates, connects, and instruments what already exists. Three of the four workstreams produce no user-visible features -- they ensure the features built in Phases A and B work correctly across devices (C.2), are measurable (C.3), and are shareable (C.4). Only C.1 delivers a user-visible change, and it is a 7-line code modification.

**Critical reframe:** WS-C.2 (Mobile + Accessibility Audit) is an audit, not remediation. It produces a remediation register that will generate follow-on tickets. The distinction matters for launch planning: the audit itself must complete before launch, but not every remediation item must be resolved before a soft launch. Only Critical-severity findings are launch-blocking.

**Minimum viable Phase C for soft launch:**

| Workstream | Soft Launch Status | Rationale |
|------------|-------------------|-----------|
| C.1 Gateway Integration | REQUIRED | Without this, "Read the Brief" CTA opens external URL in new tab -- broken UX |
| C.2 Mobile + Accessibility Audit | REQUIRED (audit only) | Audit must execute. Critical remediations must ship. High-severity items need documented workarounds. Medium/Low items can follow. |
| C.3 Analytics Integration | STRONGLY RECOMMENDED | Every day without analytics is a day of lost visitor intelligence. Deploy with GA4 ID or deploy code and enable later via env var. |
| C.4 OG Images & Social Sharing | DEFERRABLE | WS-A.3 provides a static default OG image fallback (`public/og/default.png`). Per-page dynamic images are a significant quality improvement but not launch-blocking. |

---

## 2. Key Findings by Theme

### 2.1 User Flow Integrity

WS-C.1 closes the last broken user flow in the gateway. Today, clicking "Read the Brief" calls `window.open('https://safetrekr.com', '_blank')`, which opens an external URL in a new browser tab. After C.1, both gateway CTAs use identical `router.push()` patterns with matching exit animations (600ms delay before push, 0.8s opacity fade). The fix is surgical: 6 lines modified, 1 line added, zero new files. It depends only on WS-B.2 (landing page exists at `/landing`), but degrades gracefully to the WS-A.1 placeholder page if B.2 is incomplete.

**STW observation:** The SOW explicitly documents that if WS-B.2 is not ready, `router.push('/landing')` routes to the placeholder -- this is the correct degradation path. No 404 risk exists because WS-A.1 creates the route structure.

### 2.2 Quality Assurance & Accessibility

WS-C.2 is the most complex workstream in Phase C despite producing no code changes. It delivers a systematic WCAG 2.1 AA compliance audit and cross-device responsive audit covering all 14 routes (10 marketing + gateway + spatial ZUI + 2 error pages). The audit addresses two documented project risks directly:

- **R-02:** Dark HUD aesthetic may not resonate with 40-60yr security directors on institutional Dell monitors with TN panels.
- **R-14:** Combination of dark backgrounds, 40% opacity text floor, green-on-dark accents, and glass-morphism creates measurable WCAG AA contrast compliance risk.

**Pre-computed findings from the SOW already identify 6 contrast failures** before the audit even executes:

| Token Combination | Computed Ratio | Required | Verdict |
|-------------------|---------------|----------|---------|
| `--color-text-tertiary` on `--color-void` | 3.87:1 | 4.5:1 | FAIL |
| `--color-text-tertiary` on `--color-abyss` | 3.45:1 | 4.5:1 | FAIL |
| `--color-ember` (green) on `--color-void` | 4.85:1 | 4.5:1 | MARGINAL (fails 10% safety margin) |
| `--color-border-default` on `--color-void` | ~2.4:1 | 3:1 | FAIL (non-text contrast) |

The SOW wisely separates audit from remediation. Fixing these issues requires design decisions about whether to change tokens globally (affecting the ZUI) or create marketing-specific overrides.

**SPO observation:** The 40% opacity floor is stated in combined-recommendations.md AD-2 as a "UI Designer calibration note." WS-C.2 OQ-2 asks whether this can be raised to 50-57% to resolve contrast failures. This question must be resolved before remediation begins -- it is a product design decision, not a technical one.

**CTA observation:** K-12 school districts are subject to Section 508 and ADA requirements. If Safetrekr markets to school districts (it does -- K-12 is a primary vertical), the marketing site may need to pass vendor procurement accessibility reviews. WS-C.2 OQ-5 correctly flags this. The business owner should confirm whether any target customers have specific accessibility requirements beyond WCAG 2.1 AA.

### 2.3 Measurement & Analytics

WS-C.3 delivers a complete GA4 instrumentation layer with a typed analytics helper module, delegated event listener, and 18-event taxonomy covering five categories:

| Category | Prefix | Events | Purpose |
|----------|--------|--------|---------|
| Gateway | `gateway_` | 4 | Track boot sequence behavior and destination choice |
| Navigation | `navigate_` | 1 | Track header nav clicks |
| Engagement | `engage_` | 3 | Scroll depth, FAQ toggle, ZUI interactions |
| Conversion | `convert_` | 5 | CTA clicks, form starts, form submissions, pricing tier clicks |
| ZUI | `zui_` | 5 | District dock clicks, capsule clicks, zoom level changes, detail panel opens, morph transitions |

**Key architectural decision:** The SOW recommends a delegated click listener (`AnalyticsListener`) mounted at the root layout level that automatically tracks any element with a `data-analytics-id` attribute. This is superior to per-component inline tracking because it requires zero modifications to existing CTA components and makes any new CTA automatically trackable. The WS-B.2 landing page SOW explicitly designed its CTA components with `data-analytics-id` props for this integration (WS-B.2 Decision D-10).

**BLOCKING dependency:** GA4 property ID (Q-9) must be resolved before any data flows. The code deploys without error when the ID is missing (conditional rendering), but no analytics data is collected. Creating a GA4 property is a 5-minute task at analytics.google.com.

### 2.4 Distribution & Social Sharing

WS-C.4 builds a dynamic OG image generation system using the Next.js `ImageResponse` API (Satori renderer). Each marketing page gets a co-located `opengraph-image.tsx` file that generates a branded social card matching the Oblivion HUD aesthetic -- dark background, green accent line, Geist typography, page-specific badge, and shield mark.

**Why this matters for B2B:** When a security director shares a Safetrekr link on LinkedIn, the card is the first impression. A generic or broken card erodes trust before the click. Per-page branded cards with the HUD aesthetic reinforce the "we take safety as seriously as you do" positioning.

**CTA observation:** The OG image system must hardcode all color values as hex/rgba strings because Satori does not support CSS custom properties. The SOW addresses this correctly with an `og-constants.ts` bridge file. However, if WS-C.2 audit recommends changing color tokens for contrast compliance, the OG constants file must be updated separately. This is a maintenance concern, not a blocker.

---

## 3. Cross-Workstream Conflicts

### Conflict 1: Token Change Cascade (C.2 vs C.4)

**Nature:** WS-C.2 is likely to recommend lightening text tokens (e.g., `--color-text-tertiary` from `#5a7a88` to `#6e8d9a`) or raising the opacity floor from 40% to 50-57% to resolve WCAG contrast failures. WS-C.4 hardcodes the current token values in `og-constants.ts`. If C.4 ships before C.2 recommends changes, the OG images will use the old (non-compliant) values.

**Resolution:** Execute C.2 audit before C.4 implementation begins, or accept that C.4 `og-constants.ts` values may need a one-line update per changed token after C.2 remediation.

**Recommended approach:** Let C.2 audit complete and identify required token changes. Then implement C.4 with the post-remediation values. This avoids double-work.

### Conflict 2: Component Instrumentation Timing (C.3 vs Phase B)

**Nature:** WS-C.3 needs to add `trackConversion()` calls to the contact form component (`src/components/marketing/contact-form.tsx`) and `trackEvent()` calls to the gateway components. If Phase B components are still being built or modified when C.3 instruments them, merge conflicts or overwritten instrumentation can occur.

**Resolution:** C.3's delegated click listener approach (`AnalyticsListener`) eliminates most component modifications. Only the contact form, gateway choice, and gateway boot sequence require direct code changes. These files should be stable before C.3 touches them.

### Conflict 3: Accessibility vs Analytics (C.2 vs C.3)

**Nature:** WS-C.2 may recommend changing CTA button semantics (e.g., converting `<button>` + `onClick` to `<Link>` for better accessibility semantics -- raised as WS-C.1 OQ-1). WS-C.3's delegated listener matches on `data-analytics-id` attributes regardless of element type, so semantic changes do not break tracking. However, if C.2 recommends adding `aria-label` attributes to CTAs, those labels should be considered as `cta_text` values in analytics to maintain consistency between what screen readers announce and what analytics reports.

**Resolution:** Non-blocking. The delegated listener is element-agnostic. Coordinate label text between accessibility and analytics after C.2 audit completes.

### Conflict 4: Audit Scope vs Phase B Delivery Timing

**Nature:** WS-C.2 requires ALL Phase B pages to be complete before the full audit can execute. If any Phase B workstream is delayed, the audit is delayed, which delays the launch gate.

**Resolution:** WS-C.2 Risk R-7 addresses this: conduct a partial audit on available pages, then perform a delta audit when remaining pages are delivered. This prevents the audit from becoming a launch bottleneck.

---

## 4. Architecture Decisions (Consolidated)

### AD-C.1: Client-Side Navigation for All Gateway CTAs

**Decision:** Both gateway CTAs ("Enter Mission Control" and "Read the Brief") use `router.push()` with identical 600ms exit-animation delays. No `window.open()` calls remain in the gateway.

**Rationale:** Keeps users within the site. Enables route prefetching for instant navigation. Produces consistent exit transitions regardless of CTA selected.

**Source:** WS-C.1 Decisions D-1 through D-5.

### AD-C.2: Audit-Then-Remediate Model for Accessibility

**Decision:** WS-C.2 produces a complete audit with a prioritized remediation register. No code changes are made during the audit. Remediation is tracked as follow-on tickets.

**Rationale:** (a) All issues are documented before any fixes begin, enabling holistic prioritization. (b) Fixes can be batched by type (e.g., all contrast changes in one PR, all ARIA changes in another). (c) The audit artifact serves as a compliance record.

**Source:** WS-C.2 Decision D-4.

### AD-C.3: Delegated Analytics Listener over Per-Component Tracking

**Decision:** A single `AnalyticsListener` component mounted at the root layout captures clicks on any element with a `data-analytics-id` attribute. Direct `trackEvent()` calls are used only for non-click events (form submission, scroll depth, FAQ toggle, gateway choice).

**Rationale:** Zero modifications to existing CTA components. Any new element with the attribute is automatically tracked. Landing page SOW (WS-B.2) explicitly designed for this pattern (D-10).

**Source:** WS-C.3 Decisions D-3, D-2.

### AD-C.4: Direct gtag.js over Google Tag Manager

**Decision:** GA4 is loaded via direct `gtag.js` script tags using `next/script strategy="afterInteractive"`. GTM is deferred to post-launch if marketing operations grows.

**Rationale:** One analytics tool, one developer at launch. Direct gtag.js is simpler, loads faster (one fewer network request), and keeps all tracking logic in version-controlled TypeScript.

**Source:** WS-C.3 Decision D-1.

### AD-C.5: Dynamic OG Images via Co-Located `opengraph-image.tsx`

**Decision:** Each marketing page route contains a co-located `opengraph-image.tsx` file that uses `ImageResponse` (Satori) to generate a dynamic branded social card. A shared template component (`og-image-template.tsx`) eliminates code duplication across 10 per-route files.

**Rationale:** Next.js automatically discovers co-located `opengraph-image.tsx` and injects `og:image` meta tags. Per-page images are self-contained and independently deployable. Changes to the shared template propagate to all pages.

**Source:** WS-C.4 Decisions D-1 through D-3.

### AD-C.6: Consent Guard Defaults to Opt-Out

**Decision:** The analytics consent guard defaults to `true` (analytics allowed). Switching to opt-in requires changing one return value in `hasAnalyticsConsent()`.

**Rationale:** US-only launch, English-only. US privacy law generally permits opt-out analytics. The guard is designed for easy transition to opt-in when a consent banner is implemented or EU visitors are served.

**Source:** WS-C.3 Decision D-6.

### AD-C.7: 48px Minimum Touch Target (Exceeding WCAG AAA)

**Decision:** Touch targets must be at least 48x48 CSS pixels, exceeding the WCAG 2.5.5 AAA threshold of 44x44px.

**Rationale:** Target audience is 40-60yr security directors who may have reduced fine motor precision. The 4px increase costs nothing in layout but meaningfully reduces mis-tap risk.

**Source:** WS-C.2 Decision D-1.

### AD-C.8: NVDA on Windows as Primary Screen Reader

**Decision:** NVDA + Firefox on Windows is the primary screen reader testing combination. VoiceOver on macOS is secondary (for stakeholder demos).

**Rationale:** Target audience uses institutional Windows machines. NVDA + Firefox is the most common free screen reader combination on Windows.

**Source:** WS-C.2 Decision D-2.

---

## 5. Cross-Workstream Dependencies

### 5.1 Dependency Map

```
Phase A                Phase B                    Phase C
--------               --------                   --------
WS-A.1 (Layout) -----> WS-B.2 (Landing) --------> WS-C.1 (Gateway Integration)
                  |                                    |
                  +---> WS-B.3 through WS-B.9 ------> WS-C.2 (Mobile + A11y Audit)
                  |                                    |
                  +-----------------------------------> WS-C.3 (Analytics)
                                                       |
WS-A.3 (SEO) -------> WS-B.* (all pages) -----------> WS-C.4 (OG Images)
WS-A.4 (Forms) -----> WS-C.3 (form_submit event source)
```

### 5.2 Dependency Detail

| Workstream | Depends On | Hard/Soft | What Must Be True |
|------------|-----------|-----------|-------------------|
| WS-C.1 | WS-B.2 (Landing Page) | Soft | `/landing` must exist and render content. Degrades gracefully to WS-A.1 placeholder if B.2 is incomplete. |
| WS-C.2 | Phase B complete (all pages B.2-B.9) | Hard | All pages must be built to execute a full audit. Partial audit is possible as a mitigation. |
| WS-C.3 | WS-A.1 (root layout for script placement) | Hard | `src/app/layout.tsx` must exist for GA4 `<Script>` tags. |
| WS-C.3 | WS-A.4 (form backend) | Soft | Contact form must exist for `form_submit` event binding. Analytics code deploys without it; the event simply never fires. |
| WS-C.4 | Phase B complete (page titles/descriptions finalized) | Soft | Per-page OG images need final titles/descriptions. Can start with draft values from WS-A.3 and update. |
| WS-C.4 | WS-A.3 (SEO infrastructure) | Hard | `SITE_CONFIG`, `generatePageMetadata`, and the `(marketing)` route group must exist for `opengraph-image.tsx` file co-location. |

### 5.3 External Dependencies

| Dependency | Workstream | Type | Resolution Path |
|------------|-----------|------|-----------------|
| GA4 property ID (Q-9) | C.3 | BLOCKING | Business owner creates GA4 property at analytics.google.com (5-minute task). Provide `G-XXXXXXXXXX` measurement ID. |
| Production domain confirmation (Q-8) | C.4 | Required before ship | Domain is hardcoded in OG image bottom-right text (`www.safetrekr.com`). Must be confirmed to avoid re-caching on all social platforms post-launch. |
| 40% opacity floor design decision (C.2 OQ-2) | C.2 | Required before remediation | Design owner must decide whether to raise floor to 50-57%. Affects token values across entire site and in C.4 OG images. |
| Section 508 / state accessibility mandates (C.2 OQ-5) | C.2 | Required before launch | Business owner must confirm whether K-12 customer procurement reviews require standards beyond WCAG 2.1 AA. |

---

## 6. Consolidated Open Questions

Questions are ordered by priority: BLOCKING > Required Before Implementation > Required Before Launch > Post-Launch.

### BLOCKING

| # | Question | Source | Impact | Owner |
|---|----------|--------|--------|-------|
| Q-9 | GA4 property ID: create new or use existing? Provide `G-XXXXXXXXXX` measurement ID. | WS-C.3 | No analytics data flows until resolved. Code deploys without error but collects nothing. | Business Owner |

### Required Before Implementation

| # | Question | Source | Impact | Owner |
|---|----------|--------|--------|-------|
| C2-OQ-1 | Should `--color-text-tertiary` be lightened globally (affecting ZUI) or via marketing-only override? | WS-C.2 | Determines remediation scope for contrast failures. Global change is simpler but alters ZUI aesthetic. | Design + Engineering |
| C2-OQ-2 | Can the 40% opacity floor be raised to 50-57% to resolve WCAG contrast failures? | WS-C.2 | Resolves all informational text contrast failures while maintaining dark aesthetic. Affects every page and OG image color constants. | Design (world-class-ui-designer) |
| C2-OQ-6 | Should form input border color (`--color-border-default: #365462`) be lightened for marketing pages? | WS-C.2 | Pre-computed ~2.4:1 ratio fails WCAG 1.4.11 (non-text contrast). Lightening globally affects ZUI. | Design + Engineering |
| C4-OQ-1 | Are Geist font `.woff` files available in `node_modules` or must they be downloaded? License permits bundling? | WS-C.4 | Determines font embedding approach for OG image generation. | Engineering Lead |
| C4-OQ-4 | Will Phase B finalize page titles/descriptions before C.4 begins, or start with draft values? | WS-C.4 | Starting with drafts allows parallel execution but risks rework. | Product / Content Lead |

### Required Before Launch

| # | Question | Source | Impact | Owner |
|---|----------|--------|--------|-------|
| C2-OQ-3 | Does target audience actually use Windows High Contrast Mode? | WS-C.2 | Determines whether glass-morphism fallbacks are mandatory or best-practice. | Product + Business Owner |
| C2-OQ-4 | Should the Spatial ZUI include a screen reader fallback message? | WS-C.2 | Without fallback, screen reader users encounter opaque canvas with no content. | Engineering + Design |
| C2-OQ-5 | Do target customer organizations (K-12 districts) have accessibility requirements beyond WCAG 2.1 AA (Section 508, state mandates)? | WS-C.2 | May require raising compliance bar to pass vendor procurement reviews. | Business Owner |
| C4-OQ-5 | Is domain `www.safetrekr.com` confirmed for OG image rendering? Relates to Q-8. | WS-C.4 | Changing post-launch requires re-caching on all social platforms. | Business Owner |

### Post-Launch / Non-Blocking

| # | Question | Source | Impact | Owner |
|---|----------|--------|--------|-------|
| Q-16 | Should Google Search Console be linked to the GA4 property? | WS-C.3 | Enables organic search query data in GA4. Highly recommended. | Engineering |
| Q-17 | Are there existing Google Ads accounts to link? | WS-C.3 | Enables conversion import for future paid campaigns. | Business Owner |
| C4-OQ-2 | Does Next.js 16.1.6 support `position: absolute` in ImageResponse JSX? | WS-C.4 | Affects corner accent implementation. Fall back to border-only styling if unsupported. | Engineering (test during impl) |
| C4-OQ-3 | Should shield mark be rendered as inline SVG or embedded PNG in OG images? | WS-C.4 | SVG is resolution-independent but Satori support may be limited. PNG fallback guaranteed. | Engineering (test during impl) |
| C4-OQ-6 | Should scanline texture be included in dynamic OG images? | WS-C.4 | May cause visual artifacts in Satori. Omit if problematic. | Engineering (test during impl) |

---

## 7. Phase Exit Criteria

Phase C is complete when all of the following are true.

### Gate 1: User Flow Integrity (C.1)

- [ ] "Read the Brief" CTA navigates to `/landing` within the same tab (no new tab, no external URL)
- [ ] Gateway exit animation plays identically for both CTAs (600ms delay, 0.8s opacity fade)
- [ ] `/landing` is prefetched when the gateway scene mounts
- [ ] `window.open` is no longer called anywhere in `choice-reveal.tsx`
- [ ] "Enter Mission Control" CTA still navigates to `/launch` (no regression)
- [ ] `pnpm typecheck` and `pnpm lint` pass

### Gate 2: Quality Assurance (C.2)

- [ ] Contrast ratio matrix covering all text/background token combinations is complete with pass/fail verdicts
- [ ] WCAG 2.1 AA checklist has per-page status for all 14 routes
- [ ] Device/browser test matrix has results for all 7 primary tier configurations
- [ ] Screen reader testing log covers all P1 pages (landing, contact, pricing) with full protocol
- [ ] Touch target audit covers every interactive element at mobile viewport
- [ ] Remediation register is populated with every issue, classified by severity
- [ ] Zero Critical-severity issues remain open
- [ ] All High-severity issues are either resolved or have documented workarounds with sprint-1 remediation tickets
- [ ] The 40% opacity floor risk (R-14) has a specific, measured finding with a concrete remediation recommendation

### Gate 3: Measurement (C.3)

- [ ] GA4 scripts load only when `NEXT_PUBLIC_GA4_ID` is set
- [ ] GA4 scripts use `strategy="afterInteractive"` (no LCP impact)
- [ ] Page views tracked on initial load and client-side navigation
- [ ] `trackEvent()` is type-safe (TypeScript generics with `AnalyticsEventParams` map)
- [ ] `trackEvent()` no-ops during SSR and when GA4 is not loaded (no errors)
- [ ] Gateway choice events fire for both CTAs
- [ ] CTA click events fire for all elements with `data-analytics-id`
- [ ] Form submission event fires on success (not on failure, and excludes PII)
- [ ] Scroll depth events fire at 25/50/75/100% thresholds (once each per page load)
- [ ] No measurable LCP regression from analytics scripts (delta < 100ms)
- [ ] `pnpm typecheck`, `pnpm lint`, and `pnpm build` pass

### Gate 4: Distribution (C.4)

- [ ] Static default OG image exists at `public/og/default.png` (1200x630px, under 200KB)
- [ ] Every marketing page route directory contains an `opengraph-image.tsx` file (10 files)
- [ ] Each generated OG image contains correct page-specific title, description, badge, and brand elements
- [ ] Text is legible when images are scaled to LinkedIn (552x289) and Twitter (506x265) card sizes
- [ ] Social sharing testing matrix passes for LinkedIn and Twitter/X (minimum required platforms)
- [ ] `pnpm typecheck` and `pnpm build` pass

### Soft Launch Gate (Minimum Viable)

If time-constrained, the following subset constitutes the minimum viable Phase C:

- [ ] Gate 1 (C.1) -- ALL criteria (7-line fix, no excuse to skip)
- [ ] Gate 2 (C.2) -- Audit complete, zero Critical issues, High issues documented (remediation in progress)
- [ ] Gate 3 (C.3) -- Code deployed, GA4 ID can be added post-deploy via env var
- [ ] Gate 4 (C.4) -- Static default OG image only (per-page dynamic images deferred)

---

## 8. Inputs Required by Phase D

Phase C produces artifacts and establishes infrastructure that Phase D workstreams depend on.

### Artifacts Phase D Consumes

| Artifact | Produced By | Consumed By | Format |
|----------|------------|------------|--------|
| Remediation register | WS-C.2 | Phase D remediation sprint | Markdown table in `audit-artifacts/remediation-register.md` |
| Analytics event taxonomy | WS-C.3 | Phase D blog, vertical pages, social proof (need consistent event naming) | TypeScript types in `src/lib/interfaces/analytics.ts` |
| `trackEvent()` / `trackConversion()` functions | WS-C.3 | Any new interactive component in Phase D | Importable from `src/lib/analytics.ts` |
| `data-analytics-id` convention | WS-C.3 | Phase D CTA components (auto-tracked via delegated listener) | HTML attribute on interactive elements |
| OG image template | WS-C.4 | Phase D new pages (vertical solutions, blog posts) | Importable `generateOgImage()` from `src/lib/og/og-image-template.tsx` |
| OG constants file | WS-C.4 | Phase D new `opengraph-image.tsx` files | Importable from `src/lib/og/og-constants.ts` |
| WCAG checklist template | WS-C.2 | Phase D new page accessibility verification | Markdown template in `audit-artifacts/` |
| Device/browser test matrix | WS-C.2 | Phase D regression testing | Markdown table with testing tiers |

### Decisions Phase D Needs Resolved

| Decision | Owner | Why Phase D Needs It |
|----------|-------|---------------------|
| Token changes from C.2 remediation | Design + Engineering | Phase D pages must use the post-remediation token values |
| OG image constants updates (if tokens change) | Engineering | Phase D `opengraph-image.tsx` files must use updated color values |
| Analytics expansion scope (full ZUI instrumentation?) | Product | Phase D may promote the spatial experience as a conversion pathway, requiring deeper ZUI tracking |
| Consent banner implementation | Legal + Engineering | Phase D targets may include EU visitors, requiring opt-in consent |
| Google Search Console linking | Engineering | Phase D SEO-focused content (blog) benefits from GSC data in GA4 reports |

---

## 9. Gaps and Recommendations

### Gap 1: No Effort Estimate for WS-C.3 and WS-C.4

**Finding (STW):** WS-C.3 (Analytics Integration) and WS-C.4 (OG Images & Social Sharing) do not include explicit effort estimate sections in their SOWs. The combined-recommendations.md classifies both as "S" (Small), but given the scope (C.3: 4 new files, 7 modified, 21 acceptance criteria; C.4: 17 new files, 10 modified, 24 acceptance criteria), both are arguably closer to M (Medium).

**Recommendation:** Add effort estimates. Based on scope analysis:
- WS-C.3: 4-6 hours (implementation: 2-3h, GA4 configuration: 30m, event validation: 1-2h, Lighthouse verification: 30m)
- WS-C.4: 6-10 hours (template implementation: 2-3h, font bundling: 1h, 10 per-route files: 2-3h, social platform testing: 1-2h, static default image: 1h)

### Gap 2: No Remediation Effort Budget for C.2 Findings

**Finding (PMO):** WS-C.2 produces a remediation register but does not include an effort budget for fixing the issues it discovers. The pre-computed findings already identify 6 contrast failures plus potential glass-morphism, ARIA, and motion issues. A remediation sprint of 8-16 hours should be budgeted as a Phase C extension or Phase D priority.

**Recommendation:** Reserve 8-16 hours of remediation capacity immediately following the C.2 audit. Scope will depend on findings. Critical and High issues are addressed within this budget; Medium and Low are deferred to Phase D.

### Gap 3: OG Image Content Duplication Risk

**Finding (CTA):** WS-C.4 per-route `opengraph-image.tsx` files hardcode title and description strings that must match the page's `generatePageMetadata` output. The SOW acknowledges this (Risk R-4) and suggests importing page metadata. However, this is listed as a mitigation, not a requirement.

**Recommendation:** Mandate that OG image content is derived from a shared constant or imported from page metadata. Each page should define title, description, and OG-specific fields in a single location (e.g., a page config constant exported from each `page.tsx`). This eliminates the "update two places" maintenance burden.

### Gap 4: No Cookie Consent Implementation for Analytics

**Finding (SPO):** WS-C.3 deploys GA4 with an opt-out consent model (analytics allowed by default). The deferred items register (D-10) lists "Cookie consent / GDPR banner" as a future task. If any early visitors are EU-based or if the site is shared internationally before a consent banner is implemented, there is a GDPR compliance gap.

**Recommendation:** Acceptable for US-only soft launch. However, if the site is publicly accessible (which it will be), EU visitors can reach it. Two mitigations: (a) add `export const revalidate` to the consent guard function so it can be flipped to opt-in quickly, and (b) create a Phase D ticket for consent banner implementation before any EU-targeted marketing begins.

### Gap 5: ZUI Accessibility Posture Undefined

**Finding (SPO):** WS-C.2 Decision D-5 states the Spatial ZUI receives an "informational audit only" because full compliance would require a parallel non-spatial interface. This is pragmatic, but the SOW does not define what the ZUI should present to screen reader users. OQ-4 asks about a fallback message but leaves it unresolved.

**Recommendation:** Resolve OQ-4 before launch. A minimal implementation: add an `aria-label` to the SpatialViewport component and a visually-hidden `<p>` explaining that this is an interactive spatial experience with a link to `/landing` for the full-text version. Effort: 30 minutes.

### Gap 6: Social Platform Cache Invalidation Process Undocumented for Marketing Team

**Finding (STW):** WS-C.4 documents a cache busting protocol in Section 4.7 but only in the engineering SOW. The marketing team (or whoever shares links on LinkedIn/Twitter) needs a runbook for how to force social platforms to re-crawl pages after content updates.

**Recommendation:** Extract the cache busting protocol from WS-C.4 Section 4.7 into a separate operational runbook committed to `docs/` or the project wiki. Include step-by-step instructions for LinkedIn Post Inspector, Facebook Sharing Debugger, and Twitter cache bypass.

---

## 10. Effort & Sequencing Assessment (PMO)

### 10.1 Effort Summary

| WS ID | Title | Assigned Agent | Size | Effort Est. | New Files | Modified Files | Dependencies |
|-------|-------|---------------|------|-------------|-----------|---------------|-------------|
| C.1 | Gateway Integration | `react-developer` | XS | 0.5h | 0 | 2 | WS-B.2 (soft) |
| C.2 | Mobile + Accessibility Audit | `world-class-ui-designer` | M | 10-14h | 7+ audit artifacts | 0 | Phase B complete |
| C.3 | Analytics Integration | `digital-marketing-lead` + `react-developer` | S-M | 4-6h | 4 | 7 | WS-A.1, WS-A.4 |
| C.4 | OG Images & Social Sharing | `world-class-ui-designer` | S-M | 6-10h | 17 | 0-10 | Phase B complete, WS-A.3 |
| -- | **Phase C Total** | -- | **M** | **20.5-30.5h** | **~28-30** | **~9-19** | -- |
| -- | C.2 Remediation (recommended) | `react-developer` | S-M | 8-16h | 0 | TBD | C.2 audit complete |

### 10.2 Critical Path Analysis

```
Timeline    WS-C.1      WS-C.3         WS-C.2            WS-C.4
            (0.5h)      (4-6h)         (10-14h)           (6-10h)

Phase B.2   |===|
complete    C.1 done

Phase A.1   |           |==========|
complete                C.3 impl

Phase B     |           |              |================|
all done                               C.2 audit
                                                         |==========|
                                                         C.4 impl

                                       |=========|
                                       Remediation (8-16h, follows C.2)
```

### 10.3 Parallel Execution Windows

**Parallel Group 1 (start after Phase B.2):**
- WS-C.1 (Gateway Integration) -- 0.5 hours, independent

**Parallel Group 2 (start after Phase A.1, A.4 -- can begin during Phase B):**
- WS-C.3 (Analytics Integration) -- does NOT require Phase B complete. Needs only root layout (A.1) and form backend (A.4). Can instrument gateway components and deploy the listener framework while Phase B pages are being built. Phase B CTAs will be auto-tracked via `data-analytics-id` once pages ship.

**Parallel Group 3 (start after Phase B complete):**
- WS-C.2 (Mobile + Accessibility Audit) -- 10-14 hours
- WS-C.4 (OG Images & Social Sharing) -- 6-10 hours
- These CAN run in parallel since C.2 is audit-only (no code changes) and C.4 creates new files that do not conflict.

**However:** Per Conflict 1, it is preferable to let C.2 audit complete before C.4 to avoid token value rework in OG constants. If parallelizing, accept the risk of a one-time update to `og-constants.ts` after remediation.

**Sequential dependency: C.2 Remediation** follows C.2 audit. This is the longest potential tail -- remediation effort depends on audit findings. Budget 8-16 hours.

### 10.4 Sequencing Recommendation

**Optimal execution order:**

| Step | Workstream | Prereq | Duration | Notes |
|------|-----------|--------|----------|-------|
| 1 | C.1 Gateway Integration | B.2 landing page exists | 0.5h | Can ship as soon as landing page route exists, even with placeholder content |
| 2 | C.3 Analytics Integration | A.1 root layout + A.4 form backend | 4-6h | Start during Phase B. Framework + listener deploy first; event binding to Phase B components happens as pages ship. |
| 3 | C.2 Mobile + Accessibility Audit | All Phase B pages complete | 10-14h | Full audit execution. Produces remediation register. |
| 4 | C.2 Remediation (Critical + High) | C.2 audit complete | 8-16h | Fix Critical immediately. High items get workarounds + sprint-1 tickets. |
| 5 | C.4 OG Images & Social Sharing | C.2 remediation of token values (if any) | 6-10h | Use post-remediation color values in `og-constants.ts`. Avoids rework. |

**Total elapsed time (sequential):** 29-47 hours
**Total elapsed time (with parallelization):** 19-30 hours (C.1 done first, C.3 overlaps Phase B, C.2 and C.4 partially parallel)

### 10.5 Resource Allocation

| Agent | Workstreams | Total Hours | Utilization Notes |
|-------|------------|-------------|-------------------|
| `react-developer` | C.1 (0.5h), C.3 impl (3-4h), C.2 remediation (8-16h) | 11.5-20.5h | Primary implementer. C.3 strategy comes from digital-marketing-lead but implementation is react-developer. Remediation effort is variable. |
| `world-class-ui-designer` | C.2 (10-14h), C.4 (6-10h) | 16-24h | Audit execution + OG image template design. No overlap possible within a single person. |
| `digital-marketing-lead` | C.3 strategy (1-2h) | 1-2h | Event taxonomy and measurement plan. GA4 property setup guidance. Light touch. |

### 10.6 Soft Launch Acceleration Path

If the goal is to reach a soft launch as quickly as possible, the following minimal Phase C can ship in approximately 5-7 hours:

| Step | What Ships | What Defers | Hours |
|------|-----------|------------|-------|
| 1 | C.1 Gateway Integration (full) | Nothing deferred | 0.5h |
| 2 | C.3 Analytics (code + env var) | GA4 data collection (needs property ID, can add later) | 4-6h |
| 3 | C.2 Partial Audit (landing + contact + pricing only) | Full 14-page audit, full remediation register | 3-4h |
| 4 | Static default OG image only (from WS-A.3 fallback) | Per-page dynamic OG images (C.4) | 0h (already exists from Phase A) |

This acceleration path accepts the following risks:
- Analytics may not collect data on day one if GA4 property ID is not ready
- Non-P1 pages may have undetected accessibility issues at soft launch
- Social sharing cards show the generic Safetrekr brand image rather than page-specific content
- Medium/Low accessibility issues are not documented until the full audit completes

---

*This overview synthesizes findings from 4 Phase C workstream SOWs, 2 prior phase overviews, and the project's combined recommendations document. All workstream details, acceptance criteria, risk registers, and open questions should be reviewed at their source documents for implementation-level specificity.*
