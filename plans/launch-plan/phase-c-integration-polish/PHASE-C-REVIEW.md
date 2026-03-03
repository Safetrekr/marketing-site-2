# Phase C Review: Integration & Polish

> **Reviewer:** `every-time`
> **Classification:** HIGH
> **Documents Reviewed:** 6 (4 SOWs + 1 Overview + 1 Combined Recommendations)
> **Date:** 2026-03-02
> **Codebase Verified:** Yes (15 file path checks, 6 CSS token verifications, 4 gateway component verifications)
> **Prior Review Referenced:** PHASE-A-REVIEW.md

## Review Verdict: PASS WITH ISSUES

Phase C planning documents are thorough, well-structured, and deeply grounded in the actual codebase. The four SOWs cover gateway integration (C.1), mobile and accessibility audit (C.2), analytics instrumentation (C.3), and OG image social sharing (C.4). Together they deliver 78 acceptance criteria, 27 identified risks, and 16 open questions. The Phase Overview provides excellent multi-perspective synthesis, correctly identifies 4 cross-workstream conflicts with resolutions, and offers a realistic PMO sequencing analysis with parallel execution windows.

The primary concern is that WS-C.4 repeats the unverified SOC 2 certification claim in its security page OG image content -- the same class of issue flagged as MEDIUM-1 and MEDIUM-4 in the Phase A Review. The combined-recommendations.md Gap 10 explicitly states "Do NOT claim SOC 2 unless certification is confirmed by business owner." This is a single-line fix in the per-page content table and does not affect the architecture.

A secondary concern is a factual discrepancy between the Phase C Overview and WS-C.2: the overview states the `--color-ember` (green) on `--color-void` contrast ratio is 4.85:1, but WS-C.2's detailed matrix computes it as 5.77:1. Independent verification confirms the SOW's 5.77:1 is correct; the overview's 4.85:1 is wrong. This matters because the overview labels it "MARGINAL (fails 10% safety margin)" when it actually passes even with the safety margin.

WS-C.3 and WS-C.4 both lack explicit effort estimate sections in their SOW bodies. The Phase Overview supplies estimates (C.3: 4-6h, C.4: 6-10h) but these should be backfilled into the SOWs for implementer reference.

## Per-SOW Assessment

| SOW | Completeness | Codebase Grounding | Issues Found | Rating |
|-----|-------------|-------------------|--------------|--------|
| WS-C.1 | Excellent. 8 ACs, 5 decisions, 2 OQs, 3 risks. Line-level before/after code diffs for both files touched. Smallest SOW, appropriately scoped. | Very strong. Line 89 `window.open()` verified exact match. Line 67 `useRouter()` verified. Lines 73-75 prefetch useEffect verified. `selectDestination` state machine transition to `'transitioning'` verified. | Minor line number discrepancy for `handleMissionControl` (SOW says lines 81-83, actual lines 78-84). Content is correct; just the line offset. | **A** |
| WS-C.2 | Excellent. 15 ACs, 8 decisions, 6 OQs, 8 risks. Pre-computed contrast ratio matrix with 16 token combinations. Full WCAG 2.1 AA criteria checklist (4 principles, 30+ criteria). Device matrix with 19 configurations. Screen reader testing protocol. Remediation priority framework. | Very strong. All safetrekr dark token hex values verified against `spatial-tokens.css` (void, abyss, deep, surface, raised, overlay, text-primary through ghost, ember through ember-white, border-default). Glass-morphism pattern reference to `detail-panel.tsx` consistent with Phase A verification. `reduced-motion.css` existence confirmed. | No issues in SOW body. Overview misquotes one contrast ratio (4.85 vs 5.77 for ember on void). See MEDIUM-2. | **A** |
| WS-C.3 | Excellent. 21 ACs, 8 decisions, 5 OQs (2 resolved inline), 7 risks. Complete typed analytics module with full code. 18-event taxonomy with trigger conditions, parameters, and GA4 conversion designations. Full GA4 property configuration spec. Measurement plan with 15 business questions. Delegated listener architecture. | Strong. Root layout verified (no existing analytics scripts, server component). Gateway store `selectedDestination` type verified. `choice-reveal.tsx` handler structure verified. `district-dock.tsx` existence confirmed. `contact-form.tsx` referenced as pending (WS-A.4) -- correct dependency. | No explicit effort estimate section. SOW references `window.open` in gateway_choice implementation note at line 400 -- this reference will be outdated after C.1 ships. See LOW-2. | **A-** |
| WS-C.4 | Excellent. 24 ACs, 10 decisions, 6 OQs, 10 risks. Complete visual design system with layout grid, color palette, typography spec, background composition layers. Per-page content table with titles, descriptions, badges, and alt text. Font embedding specification. Social sharing testing plan with 6 platform tools and cache busting protocol. | Strong. All color hex values verified against spatial-tokens.css safetrekr dark mode. Logo assets verified (all 4 referenced files exist: mark-light.svg, logo-horiz-light.svg, logo-horiz-light.png, wordmark-light.svg). Geist font usage in root layout verified. | Security page OG content references "SOC 2" -- repeats the unverified certification claim. No explicit effort estimate section. See HIGH-1 and MEDIUM-3. | **B+** |

## Phase Overview Assessment

| Criterion | Rating | Notes |
|-----------|--------|-------|
| All SOW decisions consolidated | Excellent | 8 Architecture Decisions (AD-C.1 through AD-C.8) with source SOW cross-references |
| Conflicts identified and resolved | Excellent | 4 cross-workstream conflicts identified (token cascade C.2/C.4, instrumentation timing C.3/B, accessibility vs analytics C.2/C.3, audit scope vs delivery C.2/B). All have resolutions. |
| Open questions deduplicated | Excellent | 16 OQs consolidated, grouped by priority tier (Blocking, Required Before Implementation, Required Before Launch, Post-Launch) with owners |
| PMO sequencing realistic | Excellent | Dependency map, critical path analysis, 3 parallel execution groups, soft launch acceleration path (5-7h minimum). Resource allocation across 3 agents. |
| Exit criteria defined | Excellent | 4 gates with 30+ measurable criteria. Soft launch gate with minimum viable subset defined. |
| Gaps and recommendations | Excellent | 6 gaps identified with actionable recommendations. Effort estimates for C.3/C.4 filled by overview. |
| Phase D handoff documented | Excellent | Artifacts, decisions, and formats Phase D needs are explicitly listed (Section 8). |
| Contrast ratio for ember on void | ERROR | Overview states 4.85:1 (MARGINAL); SOW computes 5.77:1 (PASS). Independent verification: 5.77:1 is correct. See MEDIUM-2. |

## Issues Found

### HIGH Severity

**HIGH-1: WS-C.4 security page OG image claims unverified SOC 2 certification**

- **SOW:** WS-C.4, Section 4.3, Per-Page Content Table (Security row)
- **Issue:** The security page OG image description reads "SOC 2, encryption at rest and in transit, role-based access, and audit logging." The alt text reads "Safetrekr security -- SOC 2 compliant platform with encryption, access controls, and audit logging." Combined-recommendations.md Gap 10 explicitly states: "Do NOT claim SOC 2 unless certification is confirmed by business owner." This is the same class of issue flagged as MEDIUM-1 in the Phase A Review (WS-A.2 security district stat line) and MEDIUM-4 (WS-A.3 security metadata).
- **Impact:** OG images are shared externally on social platforms. An unverified SOC 2 claim in the OG card for the security page is more visible than metadata in the codebase -- it appears directly in LinkedIn and Twitter cards shared by sales prospects. If SOC 2 certification is not held, this constitutes a misleading marketing claim on a public social card.
- **Fix recommendation:** Change the security page OG image description to: "End-to-end encryption, 10-level role-based access control, and comprehensive audit logging." Change the alt text to: "Safetrekr security -- Encrypted platform with role-based access controls and audit logging." Remove "SOC 2" from both fields. Add a code comment in the security `opengraph-image.tsx` per-page content: `// TODO: Add SOC 2 claim when Q-3 (certification status) is resolved`.

### MEDIUM Severity

**MEDIUM-1: WS-C.3 and WS-C.4 lack explicit effort estimate sections**

- **SOWs:** WS-C.3, WS-C.4
- **Issue:** WS-C.1 has an "Estimated Effort" section (XS, 15-30 minutes). WS-C.2 has an "Estimated Effort" section (M, 10-14 hours with activity breakdown). WS-C.3 and WS-C.4 have no equivalent sections. The Phase C Overview (Section 9.1) fills this gap with estimates (C.3: S-M/4-6h, C.4: S-M/6-10h) and the combined-recommendations.md classifies both as "S" (Small).
- **Impact:** An implementer reading the SOW in isolation has no effort benchmark. The overview's estimates are reasonable given scope (C.3: 4 new files, 7 modified, 21 ACs; C.4: 17 new files, 0-10 modified, 24 ACs), but should be in the SOWs themselves.
- **Fix recommendation:** Add an "Estimated Effort" sections to both WS-C.3 and WS-C.4, consistent with the format used in WS-C.1 and WS-C.2. Use the overview's estimates as a starting point.

**MEDIUM-2: Phase C Overview misquotes ember-on-void contrast ratio**

- **Document:** PHASE-C-OVERVIEW.md, Section 2.2, line 79
- **Issue:** The overview's pre-computed findings table states: "`--color-ember` (green) on `--color-void` | 4.85:1 | 4.5:1 | MARGINAL (fails 10% safety margin)." WS-C.2's detailed contrast matrix (Section 4.1) computes the same combination as 5.77:1 (PASS). Independent verification using the WCAG luminance formula confirms 5.77:1 is correct: `--color-ember` (#4ba467) has relative luminance ~0.290, `--color-void` (#061a23) has relative luminance ~0.0089, ratio = (0.290 + 0.05) / (0.0089 + 0.05) = 0.340 / 0.0589 = 5.77:1.
- **Impact:** The overview incorrectly classifies the green primary accent as a marginal contrast case. An implementer relying only on the overview might believe the primary CTA text color needs to be changed, when it actually passes WCAG AA with margin. The 10% safety threshold (5.0:1) is also cleared at 5.77:1.
- **Fix recommendation:** Correct the overview table row to: "`--color-ember` (green) on `--color-void` | 5.77:1 | 4.5:1 | PASS (passes 10% safety margin)." The SOW (WS-C.2) is correct and does not need changes.

**MEDIUM-3: WS-C.4 sizes classified as "S" in combined-recommendations.md but scope suggests M**

- **SOW:** WS-C.4, combined-recommendations.md Phase C section
- **Issue:** Combined-recommendations.md classifies WS-C.4 as "S" (Small). The SOW defines 17 new files, 10 potentially modified files, 24 acceptance criteria, 10 decisions, 6 open questions, and 10 risks. This scope is more consistent with a Medium workstream. The Phase C Overview correctly notes this in Gap 1 (Section 9) and estimates 6-10 hours.
- **Impact:** A project manager planning sprint capacity based on the "S" classification would underestimate C.4. The overview corrects this to "S-M" but the source document still says "S."
- **Fix recommendation:** Update combined-recommendations.md WS-C.4 classification from "S" to "M" or "S-M" to match the overview's assessment.

### LOW Severity

- **LOW-1:** WS-C.1 states `handleMissionControl` is at "lines 81-83" of `choice-reveal.tsx`. The actual code is at lines 78-84 (off by 3 lines). Content is correct; just the line offset. No impact on implementation.

- **LOW-2:** WS-C.3 Section 4.4.1 (gateway event implementation locations) references `window.open` as the current code in `handleMarketing`. After WS-C.1 ships, `handleMarketing` will use `router.push('/landing')` instead. Since C.3 depends on C.1 completing first (or at least shipping concurrently), the implementation note should reference the post-C.1 code pattern. The `trackConversion()` call placement is correct regardless -- it goes before the `setTimeout`, not after.

- **LOW-3:** WS-C.2 references `reduced-motion.css` as an available codebase input. The file exists at `src/styles/reduced-motion.css` and uses class-based selectors within `@media (prefers-reduced-motion: reduce)`. However, this CSS file is not imported in `globals.css` (which only imports `@tarva/ui/styles.css` and `spatial-tokens.css`). The SOW's Risk R-6 correctly flags that `motion/react` spring animations may bypass CSS-based reduced motion. The import chain for `reduced-motion.css` should be verified during audit execution.

- **LOW-4:** WS-C.4 Risk R-7 flags that the `(marketing)` route group "does not exist yet in the codebase." This is accurate for the current codebase state but will be resolved by WS-A.1. The dependency is correctly documented. No action needed.

## Codebase Verification

| # | File/Token Referenced | SOW | Exists? | Accurate? |
|---|----------------------|-----|---------|-----------|
| 1 | `src/components/gateway/choice-reveal.tsx` -- `window.open('https://safetrekr.com', '_blank')` at line 89 | C.1 | Yes | Yes -- exact match at line 89 |
| 2 | `src/components/gateway/choice-reveal.tsx` -- `useRouter()` at line 67 | C.1 | Yes | Yes -- `const router = useRouter()` at line 67 |
| 3 | `src/components/gateway/choice-reveal.tsx` -- `handleMissionControl` with 600ms setTimeout | C.1 | Yes | Yes -- lines 78-84 (not 81-83 as claimed, but content correct) |
| 4 | `src/components/gateway/gateway-scene.tsx` -- `router.prefetch('/launch')` at lines 73-75 | C.1 | Yes | Yes -- exact match at lines 73-75 |
| 5 | `src/components/gateway/gateway-scene.tsx` -- `isTransitioning` flag at line 115, opacity animation at lines 125-128 | C.1 | Yes | Yes -- `const isTransitioning = phase === 'transitioning' \|\| phase === 'exited'` at line 115, `animate={{ opacity: isTransitioning ? 0 : 1 }}` at lines 125-126, `transition={{ duration: 0.8 }}` at line 128 |
| 6 | `src/stores/gateway.store.ts` -- `selectDestination` sets phase to `'transitioning'` | C.1 | Yes | Yes -- lines 128-132: `state.selectedDestination = dest; state.phase = 'transitioning'` |
| 7 | `src/stores/gateway.store.ts` -- `selectedDestination: 'mission-control' \| 'marketing' \| null` | C.3 | Yes | Yes -- line 51 |
| 8 | `src/styles/spatial-tokens.css` -- safetrekr dark `--color-void: #061a23` | C.2, C.4 | Yes | Yes -- line 304 |
| 9 | `src/styles/spatial-tokens.css` -- safetrekr dark `--color-text-tertiary: #5a7a88` | C.2 | Yes | Yes -- line 313 |
| 10 | `src/styles/spatial-tokens.css` -- safetrekr `--color-ember: #4ba467` | C.2, C.4 | Yes | Yes -- line 241 |
| 11 | `src/styles/spatial-tokens.css` -- safetrekr dark `--color-text-primary: #e8f0f4` | C.2, C.4 | Yes | Yes -- line 311 |
| 12 | `src/styles/spatial-tokens.css` -- safetrekr dark `--color-border-default: #365462` | C.2 | Yes | Yes -- line 316 |
| 13 | `src/styles/spatial-tokens.css` -- safetrekr dark `--color-text-secondary: #929899` | C.2, C.4 | Yes | Yes -- line 312 |
| 14 | `src/styles/spatial-tokens.css` -- safetrekr `--color-ember-bright: #6abf84` | C.2 | Yes | Yes -- line 242 |
| 15 | `src/app/layout.tsx` -- `lang="en"` and `data-color-scheme="safetrekr"` on html element | C.2, C.3 | Yes | Yes -- line 35 |
| 16 | `src/app/layout.tsx` -- No existing analytics `<Script>` imports | C.3 | Yes | Yes -- no `next/script` import in file |
| 17 | `src/app/layout.tsx` -- Server component (no `'use client'` directive) | C.3 | Yes | Yes -- file begins with `import type { Metadata }` |
| 18 | `src/components/gateway/gateway-cta.tsx` -- Pure presentation `<button>` component | C.1 | Yes | Yes -- button with `onClick` prop, no routing logic |
| 19 | `src/components/gateway/district-dock.tsx` -- Exists with `handleClick` pattern | C.3 | Yes | Yes -- imports `useRouter`, has click handler |
| 20 | `public/images/logos/safetrekr-mark-light.svg` | C.4 | Yes | Yes |
| 21 | `public/images/logos/safetrekr-logo-horiz-light.svg` | C.4 | Yes | Yes |
| 22 | `public/images/logos/safetrekr-logo-horiz-light.png` | C.4 | Yes | Yes |
| 23 | `public/images/logos/safetrekr-wordmark-light.svg` | C.4 | Yes | Yes |
| 24 | `src/styles/reduced-motion.css` -- Exists with `@media (prefers-reduced-motion: reduce)` | C.2 | Yes | Yes -- class-based selectors within prefers-reduced-motion media query |
| 25 | `src/app/globals.css` -- `@theme inline` bridges for spatial tokens | C.2, C.4 | Yes | Yes -- `--color-void`, `--color-ember`, `--color-text-primary` all bridged at lines 74-124 |

## Cross-Phase Consistency Check

| Check | Status | Notes |
|-------|--------|-------|
| SOW decisions align with Combined Recommendations | OK (with exception) | AD-6 (Analytics) fully addressed by C.3. Gap 2 ("Read the Brief" CTA) addressed by C.1. Gap 3 (Read the Brief routes to external URL) resolved. R-02 and R-14 addressed by C.2. **Exception:** C.4 security OG content references SOC 2, contradicting Gap 10. See HIGH-1. |
| SOW scopes do not overlap | OK | C.1 modifies gateway components (choice-reveal, gateway-scene). C.2 produces audit artifacts only (no code changes). C.3 modifies root layout + gateway components + creates analytics module. C.4 creates OG image files. C.1 and C.3 both modify `choice-reveal.tsx` but different sections (C.1: routing logic, C.3: analytics event calls). No conflict. |
| SOW scopes have no gaps (every Phase C requirement traced) | OK | AD-6 analytics -> C.3. R-02/R-14 accessibility -> C.2. Social sharing/OG -> C.4. Gateway CTA fix -> C.1. All Phase C work areas from combined-recommendations.md are covered. |
| Dependencies are bidirectionally consistent | OK | C.1 depends on B.2 (soft). C.2 depends on all Phase B (hard). C.3 depends on A.1 (hard) and A.4 (soft). C.4 depends on Phase B (soft) and A.3 (hard). Overview Section 5.2 documents all dependencies with hard/soft classification. |
| Acceptance criteria are measurable | OK | 78 ACs across 4 SOWs. All have explicit verification methods. C.3 ACs requiring GA4 DebugView depend on a live GA4 property (Q-9 resolution). |
| Open questions have owners and target phases | OK | 16 OQs in overview, grouped by priority with owners assigned. Q-9 (GA4 ID) is correctly flagged as BLOCKING. |
| Effort estimates are internally consistent | ISSUE | C.1: XS/0.5h (in SOW). C.2: M/10-14h (in SOW). C.3: no estimate in SOW (overview says 4-6h). C.4: no estimate in SOW (overview says 6-10h). Total in overview: 20.5-30.5h. See MEDIUM-1. |
| File modifications across SOWs do not conflict | OK | `choice-reveal.tsx` modified by C.1 (routing) and C.3 (analytics calls). These touch different lines. `gateway-scene.tsx` modified by C.1 (prefetch) and C.3 (boot analytics). These add to different sections. `src/app/layout.tsx` modified by C.3 only (Script tags). No conflicts. |
| All codebase references (paths, types, hex values) are verified | OK | 25 checks performed. All file paths exist. All hex values match spatial-tokens.css. Line-level references verified for gateway components. |
| Consistency with Phase A Review findings | ISSUE | Phase A Review flagged SOC 2 claims in WS-A.2 (MEDIUM-1) and WS-A.3 (MEDIUM-4). C.4 introduces the same issue in a new location (OG image content). The pattern of unverified SOC 2 claims appearing in each phase suggests a systemic gap: there is no cross-cutting "unverified claims" linter in the planning process. See HIGH-1. |

## Requirements Coverage

### AD-6: Analytics Integration Approach

| Requirement (from combined-recommendations.md) | Addressed By | Status |
|------------------------------------------------|-------------|--------|
| GA4 via `next/script` with `strategy="afterInteractive"` | C.3 Section 4.1 | Fully addressed -- exact code provided with conditional rendering |
| Track page views (automatic) | C.3 Section 4.8.2 | Fully addressed -- GA4 Enhanced Measurement "Page changes based on browser history events" enabled |
| Track form submissions (custom event) | C.3 Section 4.4.4 (`convert_form_submit`) | Fully addressed -- fires on API success, excludes PII |
| Track CTA clicks (custom event) | C.3 Section 4.4.4 (`convert_cta_click`) | Fully addressed -- delegated listener on `data-analytics-id` |
| Track ZUI capsule clicks (custom event) | C.3 Section 4.4.5 (`zui_capsule_click`) | Fully addressed -- fires in capsule/beacon click handlers |
| Track gateway destination choice (custom event) | C.3 Section 4.4.1 (`gateway_choice`) | Fully addressed -- fires in both CTA handlers |
| Conversion events: form_submit, cta_click, gateway_choice | C.3 Section 4.5 | Fully addressed -- all three designated as GA4 conversions with counting methods |

**Assessment:** AD-6 is comprehensively addressed. C.3 expands significantly beyond the source requirement, adding 15 additional events across 5 categories, a typed analytics module, consent guard, delegated listener, scroll tracking, measurement plan, and GA4 property configuration spec. The expansion is appropriate for a launch analytics foundation.

### R-02: Dark HUD Aesthetic May Not Resonate with 40-60yr Audience

| Requirement | Addressed By | Status |
|------------|-------------|--------|
| Validate readability for target audience on institutional hardware | C.2 Sections 4.1, 4.3 | Fully addressed -- pre-computed contrast ratios, Dell monitor simulation, 10% safety margin |
| Test across representative device configurations | C.2 Section 4.3 | Fully addressed -- 19 configurations including Windows at 100/125/150% scaling, forced 1366x768 |
| Document findings with remediation recommendations | C.2 Sections 4.7, 4.8 | Fully addressed -- severity framework, remediation register, per-page checklists |

### R-14: Accessibility Compliance Risk

| Requirement | Addressed By | Status |
|------------|-------------|--------|
| WCAG 2.1 AA compliance assessment | C.2 Section 4.2 | Fully addressed -- 30+ criteria across 4 WCAG principles, per-page status |
| Contrast ratio analysis for dark backgrounds + green-on-dark + 40% opacity | C.2 Section 4.1 | Fully addressed -- 16 token combinations pre-computed, 6 failures identified, glass-morphism effective contrast analyzed |
| Touch target audit for 40-60yr audience | C.2 Section 4.4 | Fully addressed -- 48px minimum (exceeds WCAG AAA 44px), per-element measurement |
| Screen reader compatibility | C.2 Section 4.6 | Fully addressed -- NVDA on Windows primary, VoiceOver secondary, 10-step per-page protocol |
| Remediation prioritization | C.2 Section 4.7 | Fully addressed -- 4 severity tiers, launch gate criteria (zero Critical, zero unmitigated High) |

### Social Sharing

| Requirement | Addressed By | Status |
|------------|-------------|--------|
| Per-page OG images | C.4 Section 4.3 | Fully addressed -- 10 per-route `opengraph-image.tsx` files with shared template |
| Twitter card configuration | C.4 Section 4.4 | Fully addressed -- `summary_large_image` verified |
| Social sharing metadata | C.4 Sections 4.1-4.5 | Fully addressed -- OG tags, Twitter cards, LinkedIn optimization, alt text |
| Static default fallback | C.4 Section 4.2 | Fully addressed -- `public/og/default.png` spec (1200x630, under 200KB) |
| Testing across platforms | C.4 Section 4.7 | Fully addressed -- 6 platform tools, per-page testing matrix, cache busting protocol |

## Blocking Assessment

**Blocking for launch?** No

**Required fixes before proceeding:** None. All issues identified are correctable without structural changes. The SOC 2 claim in C.4 is a content-level fix (two string changes in the per-page content table). The contrast ratio discrepancy in the overview is a documentation correction. The missing effort estimates are additive, not corrective.

**Recommended fixes (non-blocking):**

1. **WS-C.4 (HIGH-1):** Remove "SOC 2" from the security page OG image description and alt text. Replace with verifiable claims: "End-to-end encryption, 10-level role-based access control, and comprehensive audit logging." Add inline TODO comment referencing Q-3. This is the third occurrence of this issue across three phases -- consider adding "SOC 2 claim pending" to a project-level checklist to prevent recurrence.

2. **WS-C.3 and WS-C.4 (MEDIUM-1):** Add "Estimated Effort" sections to both SOWs matching the format used in WS-C.1 and WS-C.2. Use the overview's estimates: C.3 at 4-6 hours (implementation 2-3h, GA4 config 30m, event validation 1-2h, Lighthouse 30m), C.4 at 6-10 hours (template 2-3h, fonts 1h, 10 per-route files 2-3h, social testing 1-2h, static default 1h).

3. **PHASE-C-OVERVIEW.md (MEDIUM-2):** Correct the `--color-ember` on `--color-void` contrast ratio from 4.85:1 to 5.77:1 and change the verdict from "MARGINAL (fails 10% safety margin)" to "PASS (passes 10% safety margin)" in the Section 2.2 pre-computed findings table.

4. **Combined-recommendations.md (MEDIUM-3):** Update WS-C.4 size classification from "S" to "M" to match the actual scope (17 new files, 24 ACs).

5. **WS-C.3 (LOW-2):** Update Section 4.4.1 gateway_choice implementation note to reference the post-C.1 code pattern (`router.push('/landing')` instead of `window.open()`). This prevents implementer confusion if C.3 is read after C.1 has shipped.

6. **WS-C.2 (LOW-3):** During audit execution, verify whether `reduced-motion.css` is actually imported in the CSS pipeline. The file exists but is not imported in `globals.css`. If it is loaded via `@tarva/ui/styles.css` or another mechanism, document the import chain. If not, flag its non-inclusion as a remediation item.
