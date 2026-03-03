# Phase B Overview: P0 Content Pages

**Project:** Safetrekr Marketing Site Launch
**Phase:** B -- P0 Content Pages
**Document Type:** Synthesis Overview (Multi-Perspective)
**Date:** 2026-03-02
**Status:** Draft for Review

**Synthesis Perspectives:**

| Role | Focus |
|------|-------|
| CTA (Chief Technology Architect) | Architectural coherence, pattern consistency, technical risk |
| SPO (Senior Product Owner) | Requirements coverage, acceptance criteria completeness, business blockers |
| STW (Senior Technical Writer) | Documentation quality, specification clarity, ambiguity identification |
| PMO (Project Management Office) | Sequencing, effort estimation, resource allocation, critical path |

**Source Documents Reviewed:**

- `PHASE-A-OVERVIEW.md` (predecessor phase context)
- `combined-recommendations.md` (project source of truth)
- `ws-b.1-content-strategy-copy-drafting.md` through `ws-b.9-about-team-page.md` (9 SOWs)

---

## 1. Executive Summary

Phase B delivers the seven P0 content pages required for Safetrekr's marketing site launch, plus supporting content strategy and copy infrastructure. It comprises 9 workstreams spanning content authoring (B.1), the primary landing page with reusable component definitions (B.2), five interior marketing pages (B.3 through B.7), legal pages (B.8), and the about/team page (B.9, promoted from Phase D).

**Scope by the numbers:**

| Metric | Count |
|--------|-------|
| Workstreams | 9 |
| New files created | ~95-110 |
| Modified files | ~10-15 |
| New routes | 10 (`/`, `/how-it-works`, `/platform`, `/pricing`, `/security`, `/solutions`, `/privacy`, `/terms`, `/about`, `/contact`) |
| Reusable marketing components | 4 (GlassCard, BreathingCTA, SectionContainer, MarketingParticleField) |
| Total estimated effort | 53-76 hours |

**Key characteristics of this phase:**

1. **Content-gated execution.** Six of eight development SOWs (B.2 through B.7) are blocked by the content/copy deck from B.1. Two SOWs (B.8, B.9) have independent content sources and can start immediately after Phase A.

2. **Extreme resource concentration.** Eight of nine SOWs are assigned to `react-developer`. This is the single largest risk to Phase B schedule.

3. **Three external business blockers.** Pricing validation (Gap 9, blocks B.5), compliance certification verification (Gap 10, blocks B.6), and legal content from attorney (blocks B.8 final delivery). All three require business owner action.

4. **Shared component foundation.** B.2 (Landing Page) defines four reusable components consumed by all subsequent pages. This makes B.2 architecturally foundational, not just another content page.

5. **Intentional design divergences.** The security page (B.6) deliberately departs from the canonical layout pattern (narrower max-width, different padding, left-aligned headers, slightly more opaque glass). These are documented as intentional but create cross-workstream inconsistency that must be explicitly ratified.

**Phase B can begin partially in parallel with Phase A.** B.1 (content strategy) has no Phase A code dependencies and should start immediately. B.8 and B.9 can begin as soon as WS-A.1 (marketing layout) is complete. The remaining SOWs require both A.1 completion and B.1 copy delivery.

---

## 2. Key Findings

### 2.1 Architecture (CTA Perspective)

**Finding A1: Component architecture is well-structured but has an unresolved data directory convention.**
B.2 establishes four reusable marketing components in `src/components/marketing/` with page-specific components in subdirectories (e.g., `src/components/marketing/landing/`). This hierarchy is clean and scalable. However, the SOWs split data file placement between `src/lib/config/` (B.4, B.5, B.7) and `src/lib/data/` (B.6, B.9) with no documented rationale for the split. See Conflict C-1.

**Finding A2: Server-component-first strategy is correctly applied.**
All marketing pages default to server components for SEO. Client components are used only where interactive state is required: FAQ accordion (B.5), expandable leadership bios (B.9), and potentially the how-it-works accordion (B.3). This is architecturally correct for a marketing site.

**Finding A3: CSS namespacing strategy is thorough.**
Each page domain gets a CSS prefix (`landing-`, `mkt-`, `plt-`, `hiw-`, `sec-`). This prevents class collision and supports long-term maintainability. However, the prefix for B.7 (Solutions) and B.9 (About) is not specified in their SOWs. See Open Question OQ-7.

**Finding A4: Glass-morphism recipe has intentional variance.**
The canonical recipe from `combined-recommendations.md` specifies `bg-white/[0.06]`. B.6 (Security) uses `bg-white/[0.08]` for "readability of dense technical content." This is a defensible design choice but must be explicitly documented as an approved deviation, not discovered later as a "bug."

**Finding A5: The breathing CTA animation has two incompatible color definitions.**
B.2 defines `mkt-cta-breathe` using green RGB values (`75, 164, 103`). B.5 defines `cta-breathe` using amber RGB values (`245, 158, 11`). Both are valid (green for standard CTAs, amber for the pricing conversion CTA), but they need a unified naming convention and must coexist without collision. See Conflict C-4.

### 2.2 Requirements (SPO Perspective)

**Finding R1: Acceptance criteria are well-defined across all SOWs.**
Every workstream includes explicit acceptance criteria with measurable outcomes. B.6 (Security) is particularly strong with its `ComplianceBadge` component that makes it architecturally impossible to display an unverified certification as verified.

**Finding R2: Three business owner decisions are launch-blocking.**
- **Gap 9 (Pricing):** All dollar amounts in B.5 carry `[UNVALIDATED]` flags. Business owner must confirm tier names, pricing, and feature allocation before the page can exit draft state.
- **Gap 10 (Compliance):** B.6 cannot mark any certification as `verified: true` without written confirmation. The SOW correctly treats this as a hard block.
- **Legal Content:** B.8 requires attorney-reviewed content for Privacy Policy and Terms of Service. Page infrastructure can be built, but content is a launch blocker.

**Finding R3: Phase D forward-references need stub handling.**
B.7 (Solutions Overview) links to `/solutions/{vertical}` routes that will not exist until Phase D (WS-D.1). The SOW does not specify how to handle clicks on links to non-existent pages. Should they be disabled, show "Coming Soon," or route to a generic page? See Open Question OQ-4.

**Finding R4: Contact page (B.7) mentions a form but the route is unclear.**
B.1's copy deck includes a Contact page section, but there is no dedicated SOW for `/contact` as a standalone page. WS-A.3 (Form Backend) from Phase A establishes the form infrastructure, but it is unclear whether `/contact` is a section within B.7 or a separate route. The combined-recommendations route table shows `/contact` as a distinct route. See Open Question OQ-6.

**Finding R5: Social proof is placeholder-only at launch.**
B.1 defines a "Social Proof Placeholder Strategy" acknowledging that testimonials and case studies will not be available at launch. This is realistic but means the landing page (B.2) hero section's social proof elements will be either omitted or use generic content. This should be explicitly accepted by stakeholders.

### 2.3 Documentation Quality (STW Perspective)

**Finding D1: SOW quality is consistently high with one notable exception.**
All SOWs follow a clear structure: context, scope, file manifest, implementation details, acceptance criteria, and dependencies. B.6 (Security) and B.5 (Pricing) are exemplary in their specificity. B.9 (About/Team) is the weakest, with less precise component specifications and no explicit CSS prefix assignment.

**Finding D2: File manifests are precise and non-overlapping.**
Each SOW provides an exact list of new and modified files. No two SOWs create the same file. This is excellent for preventing merge conflicts and enabling parallel execution (when resource constraints allow).

**Finding D3: Structured data (JSON-LD) specifications are inconsistent.**
B.2 specifies Organization + WebSite structured data. B.5 specifies Product + FAQPage. B.3 specifies FAQPage. Other SOWs do not mention structured data at all. A comprehensive structured data strategy should be defined -- should every page have at minimum a WebPage schema? See Open Question OQ-8.

**Finding D4: The content/copy specification in B.1 is exceptionally thorough.**
B.1 provides complete draft copy for all seven marketing pages, including headline hierarchies, body text, CTA language, meta descriptions, and SEO keywords. This level of detail significantly de-risks the content dependency. However, the copy is marked as draft and requires business owner review before finalization.

**Finding D5: Error handling and edge cases are underspecified.**
None of the SOWs address: loading states (though server components minimize this), error boundaries for marketing pages, or behavior when JavaScript is disabled. For a marketing site that is server-rendered, this is low-risk but worth documenting.

### 2.4 Sequencing & Effort (PMO Perspective)

**Finding P1: Resource concentration creates a serial bottleneck.**
Eight SOWs assigned to `react-developer` totaling 44-61 hours of estimated effort. Even accounting for some parallelization, this represents 6-8 full working days for a single developer. See Section 10 for detailed analysis.

**Finding P2: B.1 is the critical path entry point but is independently staffed.**
B.1 (Content Strategy) is assigned to `world-class-product-narrative-strategist`, not `react-developer`. This means B.1 and early development work (B.8, B.9) can genuinely run in parallel. B.1's completion unblocks six SOWs simultaneously.

**Finding P3: Two SOWs can start without B.1.**
B.8 (Legal Pages) sources content from business owner/attorney, not B.1. B.9 (About/Team) sources content from the existing reference file at `/Users/jessetarvambp1/Sites/Safetrekr/marketing-site/about.html`. Both only require WS-A.1 (marketing layout) from Phase A.

**Finding P4: B.2 has hidden critical-path weight.**
B.2 does not just build the landing page -- it defines the four reusable components (GlassCard, BreathingCTA, SectionContainer, MarketingParticleField) consumed by every subsequent page. If B.2 component APIs change during implementation, it cascades to B.3 through B.7. B.2 must be treated as a "platform sprint" within Phase B.

**Finding P5: Three external blockers have no estimated resolution timeline.**
Gap 9 (pricing), Gap 10 (compliance), and legal content have no SLA or deadline assigned. Without business owner action dates, the critical path for B.5, B.6, and B.8 (final content) is undefined.

---

## 3. Cross-Workstream Conflicts

This section documents inconsistencies discovered across the nine SOWs that must be resolved before or during implementation. Each conflict is assigned a severity and a recommended resolution.

### C-1: Data File Directory Convention (Severity: Medium)

**Conflict:** SOWs place page data files in two different directories with no documented convention for when to use which.

| Directory | Used By |
|-----------|---------|
| `src/lib/config/` | B.4 (`platform-data.ts`), B.5 (`pricing-data.ts`), B.7 (`solutions-data.ts`) |
| `src/lib/data/` | B.6 (`security-content.ts`), B.9 (`about-team.ts`) |

**Impact:** Creates confusion for developers, inconsistent import paths, and friction for future pages.

**CTA Recommendation:** Standardize on `src/lib/data/` for all page content data modules. Reserve `src/lib/config/` for application configuration (feature flags, API endpoints, environment settings). Update B.4, B.5, and B.7 SOWs to use `src/lib/data/`. Rationale: page copy and content data is not "configuration" -- it is structured content that drives rendering.

**Alternative:** Standardize on `src/lib/config/` for all. The key is consistency, not which directory.

### C-2: Max-Width Container Inconsistency (Severity: Medium)

**Conflict:** Pages use different maximum widths for their primary content containers.

| Max-Width | Used By | Context |
|-----------|---------|---------|
| `max-w-7xl` (1280px) | B.2 (Landing), B.4 (Platform) | Standard marketing pages |
| `max-w-6xl` (1152px) | B.6 (Security), B.9 (About) | Content-heavy / technical pages |
| `max-w-5xl` (1024px) | B.4 (Platform integration section only) | Narrower supplementary section |

**Impact:** Visitors navigating between pages will notice inconsistent content widths. This may be intentional (narrower for readability of dense content) or accidental.

**CTA Recommendation:** Document as an explicit design decision with rationale. If intentional, add a comment in `SectionContainer` supporting a `width` prop (`standard | narrow | compact`) rather than having each page hardcode its own max-width. This formalizes the pattern and prevents ad-hoc drift.

### C-3: Section Padding Inconsistency (Severity: Low)

**Conflict:** Section vertical padding differs across pages.

| Padding | Used By |
|---------|---------|
| `py-24 lg:py-32` | B.2 (Landing) via SectionContainer |
| `py-20 md:py-28` | B.6 (Security) |

**Impact:** Subtle vertical rhythm inconsistency. Less noticeable than width changes but contributes to a lack of visual cohesion.

**CTA Recommendation:** Use `SectionContainer` from B.2 as the canonical wrapper for all pages. If B.6 needs tighter spacing, add a `compact` prop to `SectionContainer` rather than defining custom padding per page.

### C-4: Breathing CTA Animation Naming Collision (Severity: High)

**Conflict:** Two different breathing CTA animations are defined with overlapping concerns.

| Animation | Defined In | Color | CSS Name |
|-----------|-----------|-------|----------|
| Green breathing | B.2 | `rgb(75, 164, 103)` (Safetrekr green) | `mkt-cta-breathe` |
| Amber breathing | B.5 | `rgb(245, 158, 11)` (Amber/conversion) | `cta-breathe` |

**Impact:** The amber variant in B.5 uses an unprefixed name (`cta-breathe`) that does not follow the `mkt-` prefixing convention, and could collide with the spatial ZUI's own animations. Additionally, the `BreathingCTA` component defined in B.2 only supports green -- there is no mechanism for B.5 to request an amber variant.

**CTA Recommendation:**
1. Rename B.5's animation to `mkt-cta-breathe-amber` for namespace consistency.
2. Add a `variant` prop to `BreathingCTA`: `variant?: 'primary' | 'conversion'` where `primary` uses green and `conversion` uses amber.
3. This maintains the "one breathing CTA per page" rule from AD-2 while supporting color variation.

### C-5: Glass Card Opacity Variance (Severity: Low)

**Conflict:** B.6 (Security) uses `bg-white/[0.08]` for glass cards instead of the canonical `bg-white/[0.06]` from `combined-recommendations.md`.

**Impact:** Slight visual inconsistency. The B.6 SOW explicitly documents the rationale (readability of dense technical content), making this an intentional deviation rather than an error.

**CTA Recommendation:** Accept as a documented deviation. Add a `dense` variant to `GlassCard` that uses `bg-white/[0.08]` for pages with high text density. This codifies the pattern rather than leaving it as a one-off override.

### C-6: Header Alignment Convention (Severity: Low)

**Conflict:** Most pages center section headers. B.6 (Security) left-aligns headers, documented as intentional for "technical specification" feel.

**Impact:** Visual inconsistency across pages. Defensible as a design choice for the security page's technical authority tone.

**CTA Recommendation:** Accept as intentional. Add an `align` prop to `SectionContainer`: `align?: 'center' | 'left'` defaulting to `center`. This formalizes the pattern.

### C-7: Contact Page Ownership Gap (Severity: Medium)

**Conflict:** The route table in `combined-recommendations.md` lists `/contact` as a distinct P0 route. B.1 includes contact page copy. But no dedicated SOW exists for building the `/contact` page. WS-A.3 (Form Backend) provides the infrastructure, but no workstream creates the page component.

**Impact:** The contact page could be missed entirely, resulting in a dead route at launch.

**SPO Recommendation:** Clarify whether `/contact` is covered by an existing SOW (most likely B.2 as an additional landing page section, or as a thin page SOW appended to B.7) or requires a new workstream. Given its simplicity (likely a single form + address block), it could be added to B.7 as a scope addition with +2 hours effort.

---

## 4. Architecture Decisions

The following architecture decisions are established or refined within Phase B SOWs. Decisions prefixed with **PAD-** were established in Phase A. Decisions prefixed with **PBD-** are new to Phase B.

### PBD-01: Reusable Marketing Component Library

**Decision:** Four reusable components are defined in `src/components/marketing/` (not in page-specific subdirectories):
- `GlassCard` -- Glass-morphism card with canonical recipe
- `BreathingCTA` -- Animated call-to-action button with glow effect
- `SectionContainer` -- Consistent section wrapper (max-width, padding, centering)
- `MarketingParticleField` -- Ambient particle background for marketing pages

**Rationale:** These components are consumed by all B.2-B.9 pages. Placing them at the marketing root enables sharing without circular imports.

**Owner:** Defined by B.2, consumed by B.3-B.9.

**Status:** Proposed. API surface should be reviewed before B.2 implementation begins. See recommendations in Conflicts C-2 through C-6 for proposed prop additions.

### PBD-02: Content Data Isolation Pattern

**Decision:** All marketing page copy lives in dedicated data modules, never inline in components. Components import structured data objects and render them.

**Rationale:** Enables content updates without touching component code. Supports future CMS migration. Makes B.1 content review independent of component implementation.

**Owner:** All SOWs.

**Status:** Accepted. Directory location pending resolution of Conflict C-1.

### PBD-03: Server Component Default for Marketing Pages

**Decision:** All marketing pages are server components by default. Client components are used only for interactive elements requiring browser state:
- `PricingFAQ` (B.5) -- accordion animation
- `LeadershipBioCard` or equivalent (B.9) -- expandable bios
- How-It-Works accordion (B.3) -- step expansion

**Rationale:** Server rendering is optimal for SEO, initial load performance, and crawlability of marketing content.

**Owner:** All SOWs.

**Status:** Accepted.

### PBD-04: CSS Prefix Namespacing by Page Domain

**Decision:** Each page domain gets a CSS class prefix to prevent collisions:

| Prefix | Domain | SOW |
|--------|--------|-----|
| `landing-` | Landing page | B.2 |
| `mkt-` | Shared marketing | B.2 |
| `hiw-` | How It Works | B.3 |
| `plt-` | Platform | B.4 |
| `pricing-` | Pricing | B.5 |
| `sec-` | Security | B.6 |
| TBD | Solutions | B.7 |
| TBD | Legal | B.8 |
| TBD | About/Team | B.9 |

**Rationale:** Prevents class-name collisions across pages, especially for `@keyframes` animations defined in `globals.css`.

**Owner:** All SOWs.

**Status:** Partially defined. B.7, B.8, and B.9 need prefix assignments. See Open Question OQ-7.

### PBD-05: ComplianceBadge Architectural Enforcement

**Decision:** The `ComplianceBadge` component in B.6 enforces that unverified certifications cannot be rendered as verified. The `verified` field in the data model controls rendering: unverified certifications show a distinct visual treatment (muted, "Verification Pending" label).

**Rationale:** Prevents accidental misrepresentation of compliance status, which carries legal risk.

**Owner:** B.6.

**Status:** Accepted. This is a non-negotiable safety constraint.

### PBD-06: One Breathing CTA Per Page

**Decision:** Each marketing page may contain at most one `BreathingCTA` instance. This rule, inherited from AD-2 in `combined-recommendations.md`, prevents animation overload and maintains visual hierarchy.

**Rationale:** Multiple breathing animations compete for attention and degrade the "calm authority" brand voice.

**Owner:** All SOWs.

**Status:** Accepted.

### PBD-07: Structured Data (JSON-LD) Per Page

**Decision:** Each marketing page includes appropriate JSON-LD structured data for SEO:

| Page | Schema Types |
|------|-------------|
| Landing (B.2) | Organization, WebSite |
| How It Works (B.3) | FAQPage (for accordion) |
| Platform (B.4) | Not specified |
| Pricing (B.5) | Product, FAQPage |
| Security (B.6) | Not specified |
| Solutions (B.7) | Not specified |
| Legal (B.8) | Not specified |
| About (B.9) | Not specified |

**Status:** Incomplete. See Open Question OQ-8 for recommendation to define structured data for all pages.

### PBD-08: Markdown Rendering Pipeline for Legal Content

**Decision:** B.8 uses a markdown rendering pipeline (likely `next-mdx-remote` or raw markdown with a custom renderer) for legal pages. This allows business owner / attorney to provide content in markdown format without touching React components.

**Rationale:** Legal content changes frequently and should be editable by non-developers.

**Owner:** B.8.

**Status:** Proposed. Specific markdown library choice is not yet specified in the SOW.

---

## 5. Cross-Workstream Dependencies

### 5.1 Dependency Graph

```
Phase A (Foundation)
  |
  +-- WS-A.1 (Marketing Layout) ----+----+----+----+----+----+----+----+
  |                                  |    |    |    |    |    |    |    |
  |   WS-B.1 (Content/Copy) --------+----+----+----+----+----+    |    |
  |     |                            |    |    |    |    |    |    |    |
  |     |                            v    v    v    v    v    v    |    |
  |     |                           B.2  B.3  B.4  B.5  B.6  B.7 |    |
  |     |                            |                            |    |
  |     |                            | (reusable components)      |    |
  |     |                            +---->  B.3, B.4, B.5,       |    |
  |     |                                    B.6, B.7, B.8, B.9  |    |
  |     |                                                         |    |
  |     +--- (NO dependency) ---------------------------------> B.8  B.9
  |                                                               |    |
  +-- WS-A.3 (Form Backend) --> B.7/Contact form                 |    |
  |                                                               |    |
  +-- Business Owner: Legal Content -----------------------> B.8 final |
  +-- Business Owner: Pricing (Gap 9) ---------> B.5 final       |    |
  +-- Business Owner: Compliance (Gap 10) -----> B.6 final       |    |
  |                                                               |    |
  +-- Reference file (about.html) -----------------------------> B.9  |
                                                                       |
Phase C (Integration & Polish)                                         |
  |                                                                    |
  +-- WS-C.1 (Gateway Integration) <---- B.2 (Landing Page)           |
  +-- WS-D.1 (Vertical Pages) <--------- B.7 (Solutions Overview)     |
```

### 5.2 Dependency Matrix

| SOW | Depends On (Phase A) | Depends On (Phase B) | Depends On (External) | Blocks |
|-----|---------------------|---------------------|----------------------|--------|
| B.1 | None | None | Business owner copy review | B.2, B.3, B.4, B.5, B.6, B.7 |
| B.2 | A.1 (Layout) | B.1 (Copy) | None | B.3-B.9 (reusable components), C.1 |
| B.3 | A.1 | B.1, B.2 (components) | None | None |
| B.4 | A.1 | B.1, B.2 (components) | None | None |
| B.5 | A.1 | B.1, B.2 (components) | Gap 9 (Pricing) | None |
| B.6 | A.1 | B.1, B.2 (components) | Gap 10 (Compliance) | None |
| B.7 | A.1, A.3 (Form) | B.1, B.2 (components) | None | D.1 |
| B.8 | A.1 | B.2 (components) | Legal content from attorney | None |
| B.9 | A.1 | B.2 (components) | Reference file (about.html) | None |

### 5.3 Key Dependency Insights

1. **B.1 is the single largest unblock.** Its completion releases six workstreams simultaneously. Accelerating B.1 has the highest schedule impact of any single action.

2. **B.2 has dual critical-path roles.** It is both a content page (blocked by B.1) and a component platform (blocking B.3-B.9). The reusable components should be extracted and reviewed first, before the landing page content sections are built.

3. **B.8 and B.9 are dependency-light.** They can start as soon as A.1 is complete, with no B.1 dependency. They do consume B.2's reusable components, but can use early/stub versions of GlassCard and SectionContainer.

4. **Three external blockers are un-scheduled.** Gap 9, Gap 10, and legal content have no committed delivery dates. These must be tracked as risks with escalation triggers.

---

## 6. Consolidated Open Questions

Questions are collected from all SOWs and the synthesis analysis. Each is tagged with the SOW of origin and the perspective that surfaced it.

### From Source Documents

| ID | Question | Origin | Perspective | Priority | Blocks |
|----|----------|--------|-------------|----------|--------|
| OQ-1 | What are the finalized pricing tiers, amounts, and feature allocations? | B.5, Gap 9 | SPO | Critical | B.5 final |
| OQ-2 | Which compliance certifications does Safetrekr currently hold vs. pursuing? | B.6, Gap 10 | SPO | Critical | B.6 final |
| OQ-3 | When will attorney-reviewed Privacy Policy and Terms of Service content be available? | B.8 | SPO | Critical | B.8 final, Launch |
| OQ-4 | How should B.7 (Solutions) handle links to Phase D vertical pages that do not yet exist? | B.7 | SPO | High | B.7 |
| OQ-5 | Are real team member photos available, or should the about page use placeholders? | B.9 | SPO | Medium | B.9 |

### From Synthesis Analysis

| ID | Question | Origin | Perspective | Priority | Blocks |
|----|----------|--------|-------------|----------|--------|
| OQ-6 | Is `/contact` a standalone page, a section within Solutions (B.7), or merged with another page? Which SOW owns it? | Synthesis | SPO | High | Contact page delivery |
| OQ-7 | What CSS prefixes should B.7 (Solutions), B.8 (Legal), and B.9 (About) use? Suggested: `sol-`, `legal-`, `about-`. | Synthesis | CTA | Medium | B.7, B.8, B.9 |
| OQ-8 | Should every marketing page include a baseline `WebPage` JSON-LD schema, or only the pages specified in individual SOWs? | Synthesis | CTA | Medium | None (can be added post-launch) |
| OQ-9 | Should the `SectionContainer` component support `width`, `padding`, and `align` props to formalize the intentional variations across pages (C-2, C-3, C-6)? | Synthesis | CTA | Medium | B.2 API design |
| OQ-10 | Should the `GlassCard` component support a `dense` variant for higher-opacity backgrounds (C-5)? | Synthesis | CTA | Low | B.2 API design |
| OQ-11 | What is the target date for business owner decisions on OQ-1, OQ-2, and OQ-3? Without dates, the critical path for B.5, B.6, and B.8 is undefined. | Synthesis | PMO | Critical | Schedule planning |
| OQ-12 | Can a second `react-developer` resource be allocated to Phase B to reduce the serial bottleneck? | Synthesis | PMO | High | Schedule compression |
| OQ-13 | What markdown library should B.8 use for legal content rendering? Options: `next-mdx-remote`, `react-markdown`, raw `remark/rehype` pipeline. | Synthesis | CTA | Medium | B.8 |

---

## 7. Phase Exit Criteria

Phase B is complete when all of the following are satisfied. Criteria are grouped by category.

### 7.1 Page Delivery

| ID | Criterion | Verification Method | SOW |
|----|-----------|-------------------|-----|
| PB-EXIT-01 | Landing page renders at `/` with all sections, CTAs, and structured data | Visual inspection + Lighthouse audit | B.2 |
| PB-EXIT-02 | How It Works page renders at `/how-it-works` with working accordion | Visual inspection + interaction test | B.3 |
| PB-EXIT-03 | Platform page renders at `/platform` with all portal and domain cards | Visual inspection | B.4 |
| PB-EXIT-04 | Pricing page renders at `/pricing` with validated tier data and working FAQ | Visual inspection + business owner sign-off | B.5 |
| PB-EXIT-05 | Security page renders at `/security` with correct `ComplianceBadge` states | Visual inspection + compliance data audit | B.6 |
| PB-EXIT-06 | Solutions overview renders at `/solutions` with all 5 vertical cards | Visual inspection | B.7 |
| PB-EXIT-07 | Privacy Policy renders at `/privacy` with attorney-approved content | Content review sign-off | B.8 |
| PB-EXIT-08 | Terms of Service renders at `/terms` with attorney-approved content | Content review sign-off | B.8 |
| PB-EXIT-09 | About page renders at `/about` with team data and expandable bios | Visual inspection + interaction test | B.9 |
| PB-EXIT-10 | Contact page renders at `/contact` with working form | Visual inspection + form submission test | TBD |

### 7.2 Quality Gates

| ID | Criterion | Verification Method |
|----|-----------|-------------------|
| PB-EXIT-11 | `pnpm typecheck` passes with zero errors | CI pipeline |
| PB-EXIT-12 | `pnpm lint` passes with zero errors | CI pipeline |
| PB-EXIT-13 | All pages achieve Lighthouse Performance score >= 90 | Lighthouse CI |
| PB-EXIT-14 | All pages achieve Lighthouse Accessibility score >= 95 | Lighthouse CI |
| PB-EXIT-15 | All pages render correctly on mobile (375px), tablet (768px), and desktop (1440px) | Responsive testing |
| PB-EXIT-16 | No console errors or warnings on any marketing page | Browser dev tools |
| PB-EXIT-17 | All `[UNVALIDATED]` and `[PLACEHOLDER]` flags removed from production content | Content audit |

### 7.3 Architecture Gates

| ID | Criterion | Verification Method |
|----|-----------|-------------------|
| PB-EXIT-18 | All reusable marketing components (`GlassCard`, `BreathingCTA`, `SectionContainer`, `MarketingParticleField`) have stable APIs | Code review |
| PB-EXIT-19 | All page data files use consistent directory convention (Conflict C-1 resolved) | File structure audit |
| PB-EXIT-20 | No hardcoded copy in any component (all text sourced from data modules) | Code review |
| PB-EXIT-21 | CSS prefix convention applied to all pages (OQ-7 resolved) | CSS audit |
| PB-EXIT-22 | Color scheme toggle works on all marketing pages (`safetrekr` <-> `tarva-core`) | Visual testing |

### 7.4 Content Gates

| ID | Criterion | Verification Method |
|----|-----------|-------------------|
| PB-EXIT-23 | Voice and Tone Guide approved by business owner | Written sign-off |
| PB-EXIT-24 | All page copy reviewed and approved by business owner | Written sign-off |
| PB-EXIT-25 | SEO meta titles, descriptions, and OG tags set for all pages | SEO audit |
| PB-EXIT-26 | All structured data (JSON-LD) validates via Google Rich Results Test | Tool verification |

---

## 8. Inputs Required by Phase C

Phase C (Integration and Polish) depends on the following outputs from Phase B.

| Input | Source SOW | Required By | Description |
|-------|-----------|-------------|-------------|
| Landing page route (`/`) | B.2 | C.1 (Gateway Integration) | The landing page must be the entry point for the marketing site. C.1 integrates it with the spatial ZUI gateway. |
| Reusable component APIs | B.2 | C.* (all polish work) | `GlassCard`, `BreathingCTA`, `SectionContainer`, `MarketingParticleField` APIs must be stable. Phase C should not require API changes to these components. |
| Solutions overview route | B.7 | D.1 (Vertical Pages) | B.7 establishes the `/solutions` parent route and card navigation. D.1 builds the individual vertical pages linked from B.7. |
| Content data module pattern | B.2-B.9 | C.* | The established pattern for data modules (directory, export conventions, type definitions) must be consistent for Phase C to extend. |
| Navigation route list | B.2-B.9 | C.2 (Navigation Polish) | Phase C navigation work needs the complete list of live routes and their display labels. |
| SEO infrastructure usage patterns | B.2-B.9 | C.3 (SEO Audit) | How each page uses metadata, structured data, and OG tags establishes the pattern for Phase C SEO audit. |
| Legal page routes | B.8 | C.4 (Footer Links) | Footer must link to `/privacy` and `/terms`. These routes must exist. |
| Form backend integration | B.7 / Contact | C.5 (Form Polish) | Contact form must be functionally connected to the form backend from A.3. |
| Compliance data model | B.6 | C.6 (Security Polish) | The `ComplianceBadge` data model and verified/unverified states must be final. |
| Content copy (finalized) | B.1 | C.* | All `[UNVALIDATED]` and `[PLACEHOLDER]` markers must be resolved. Phase C cannot polish content that is not finalized. |

---

## 9. Gaps and Recommendations

### Gap G-1: Contact Page Ownership (Severity: High)

**Gap:** No SOW explicitly creates the `/contact` page, despite it appearing in the route table as a P0 route.

**Recommendation:** Add `/contact` page to B.7 (Solutions) scope or create a minimal WS-B.10. Estimated additional effort: 2-3 hours. The contact page likely consists of: heading, contact form (using A.3 backend), address/email block, map embed (optional).

### Gap G-2: Business Owner Decision SLAs (Severity: Critical)

**Gap:** Three business owner decisions (pricing, compliance, legal content) block three SOWs with no committed delivery dates.

**Recommendation:** Establish a decision deadline matrix:

| Decision | Blocks | Recommended Deadline | Escalation Trigger |
|----------|--------|---------------------|-------------------|
| Pricing validation (Gap 9) | B.5 final | Phase B Day 5 | If not received, ship with placeholder and add Phase C ticket |
| Compliance verification (Gap 10) | B.6 final | Phase B Day 5 | If not received, all badges render as "Verification Pending" |
| Legal content | B.8 final, Launch | Phase B Day 10 | If not received, launch is blocked -- escalate to executive |

### Gap G-3: Missing CSS Prefix Assignments (Severity: Low)

**Gap:** B.7, B.8, and B.9 do not specify CSS prefixes.

**Recommendation:** Assign immediately: `sol-` (Solutions), `legal-` (Legal), `about-` (About/Team). Document in PBD-04.

### Gap G-4: Phase D Stub Route Strategy (Severity: Medium)

**Gap:** B.7 links to `/solutions/{vertical}` routes that will not exist until Phase D. No strategy for handling these dead links.

**Recommendation:** Implement one of:
- **(A) Disabled links:** Render cards without `<Link>` wrapper. Add "Coming Soon" badge. Lowest effort.
- **(B) Stub pages:** Create minimal `/solutions/[vertical]/page.tsx` that renders "Detailed page coming soon" with a back link. More effort but better UX.
- **(C) Soft links:** Cards link to `/solutions#k-12` (anchor on the overview page). Avoids 404s but loses the intent of separate pages.

**CTA Recommendation:** Option A for launch. Phase D replaces disabled cards with live links.

### Gap G-5: Structured Data Completeness (Severity: Low)

**Gap:** Only 3 of 9 pages specify structured data schemas.

**Recommendation:** Add baseline `WebPage` schema to all pages. Add `AboutPage` to B.9. Add `FAQPage` to B.5 (already specified) and B.3. This can be done in Phase C if not addressed in Phase B.

### Gap G-6: SectionContainer API Formalization (Severity: Medium)

**Gap:** Cross-workstream conflicts C-2, C-3, C-5, and C-6 all stem from the same root cause: `SectionContainer` and `GlassCard` lack sufficient props to express the documented variations.

**Recommendation:** Before B.2 implementation, finalize the following component APIs:

```
SectionContainer Props:
  - width: 'standard' | 'narrow' | 'compact'  (maps to max-w-7xl | 6xl | 5xl)
  - padding: 'standard' | 'compact'            (maps to py-24 lg:py-32 | py-20 md:py-28)
  - align: 'center' | 'left'                   (header alignment)

GlassCard Props:
  - variant: 'standard' | 'dense'              (maps to bg-white/[0.06] | bg-white/[0.08])

BreathingCTA Props:
  - variant: 'primary' | 'conversion'          (green | amber glow)
```

This resolves conflicts C-2 through C-6 systematically. See Conflict section for details.

### Gap G-7: Shared Metadata Configuration (Severity: Low)

**Gap:** Each page independently defines its metadata (title, description, OG tags). There is no shared configuration for site-wide defaults (OG image, site name, Twitter card type).

**Recommendation:** Create a shared metadata utility in `src/lib/config/site-metadata.ts` that provides defaults. Individual pages override with page-specific values. This is likely covered by Phase A's SEO infrastructure (WS-A.2) but should be confirmed.

---

## 10. Effort and Sequencing Assessment

### 10.1 Effort Summary by SOW

| SOW | Title | Assignee | Size | Hours (Est.) | External Blocker |
|-----|-------|----------|------|-------------|-----------------|
| B.1 | Content Strategy & Copy | narrative-strategist | XL | 12-18 | Business owner copy review |
| B.2 | Landing Page | react-developer | L | 8-12 | B.1 completion |
| B.3 | How It Works Page | react-developer | L | 8-12 | B.1 completion |
| B.4 | Platform Page | react-developer | M | 4-6 | B.1 completion |
| B.5 | Pricing Page | react-developer | M | 4-6 | B.1 + Gap 9 (Pricing) |
| B.6 | Security Page | react-developer | M | 4-6 | B.1 + Gap 10 (Compliance) |
| B.7 | Solutions Overview | react-developer | M | 4-6 | B.1 completion |
| B.8 | Legal Pages | react-developer | S | 2-3 | Legal content from attorney |
| B.9 | About / Team Page | react-developer | M | 4-6 | Reference file (available) |
| | **Total** | | | **51-75** | |

### 10.2 Resource Concentration Analysis

**The core problem:** 8 of 9 SOWs are assigned to `react-developer`, totaling 38-57 hours of development work. With B.1 (12-18 hours) on a separate resource, the total phase effort is 51-75 hours.

**Can the react-developer SOWs be parallelized?**

**No, not meaningfully.** Here is why:

1. **B.2 is a hard prerequisite for B.3-B.9.** The four reusable components defined in B.2 are consumed by every subsequent page. You cannot start B.3-B.7 until B.2's component APIs are stable.

2. **B.2 itself is blocked by B.1.** The landing page needs copy. B.2 cannot begin (content sections) until B.1 delivers.

3. **Only B.8 and B.9 can start independently.** These two SOWs have no B.1 dependency and can use provisional versions of shared components.

**True parallelization is limited to:**
- B.1 (separate resource) in parallel with B.8 + B.9 (react-developer)
- After B.1 + B.2 complete: B.3-B.7 are independent of each other and could theoretically parallelize -- but they share a single developer

### 10.3 Critical Path

```
Day 0   Day 3        Day 7-8       Day 11-12    Day 14-15    Day 17-18
  |        |             |              |             |            |
  |-- B.1 (narrative-strategist, 12-18 hrs) -----------|            |
  |        |             |              |             |            |
  |-- B.9 (4-6 hrs) ----|             |              |             |
  |-- B.8 infra (2 hrs)-|             |              |             |
  |        |             |              |             |            |
  |        B.1 complete  |              |             |            |
  |        |             |              |             |            |
  |        |-- B.2 (8-12 hrs) ---------|             |            |
  |        |             |              |             |            |
  |        |             |    B.2 complete            |            |
  |        |             |              |             |            |
  |        |             |   |-- B.3 (8-12 hrs) -----|            |
  |        |             |              |             |            |
  |        |             |              |    |-- B.4 (4-6 hrs) ---|
  |        |             |              |    |-- B.5* (4-6 hrs) --|
  |        |             |              |    |-- B.6* (4-6 hrs) --|
  |        |             |              |    |-- B.7 (4-6 hrs) ---|
  |        |             |              |             |            |
  |        |             |              |             |     B.8 legal content**

  * B.5 and B.6 require external business owner decisions (Gap 9, Gap 10)
  ** B.8 final content requires attorney-reviewed legal text (date unknown)
```

**Single-developer critical path (react-developer only):**

| Sequence | SOW | Hours | Running Total | Notes |
|----------|-----|-------|---------------|-------|
| 1 | B.9 | 4-6 | 4-6 | Can start Day 0 (no B.1 dependency) |
| 2 | B.8 (infra) | 2 | 6-8 | Can start Day 0 (no B.1 dependency) |
| -- | *Wait for B.1* | -- | -- | B.1 on separate resource |
| 3 | B.2 | 8-12 | 14-20 | Blocked until B.1 complete |
| 4 | B.3 | 8-12 | 22-32 | Blocked until B.2 complete |
| 5 | B.4 | 4-6 | 26-38 | Independent of B.3 |
| 6 | B.7 | 4-6 | 30-44 | Independent of B.3-B.4 |
| 7 | B.5 | 4-6 | 34-50 | Also needs Gap 9 resolved |
| 8 | B.6 | 4-6 | 38-56 | Also needs Gap 10 resolved |
| 9 | B.8 (content) | 1 | 39-57 | Needs attorney content |

**Total react-developer time: 38-57 hours (5-7 working days)**

**Total calendar time (best case):** If B.1 takes 3 days and overlaps with B.8/B.9 development, and the react-developer works sequentially afterward:

- Days 1-3: B.8 (infra) + B.9 in parallel with B.1
- Days 4-5: B.2 (landing page + shared components)
- Days 6-7: B.3 (how it works)
- Day 8: B.4 (platform)
- Day 9: B.7 (solutions)
- Day 10: B.5 (pricing, if Gap 9 resolved)
- Day 11: B.6 (security, if Gap 10 resolved)
- Day 11+: B.8 (final legal content, whenever available)

**Best case: 11 working days. Realistic with interruptions, reviews, and iteration: 13-16 working days.**

### 10.4 Schedule Compression Options

| Option | Impact | Risk | Recommendation |
|--------|--------|------|----------------|
| Add second react-developer | Could run B.3-B.4 parallel with B.5-B.7 after B.2 completes. Saves 3-4 days. | Onboarding overhead, merge conflicts, component API coordination. | **Recommended if B.2 component APIs are locked first.** Second developer picks up B.4 + B.7 + B.5 while primary does B.3 + B.6. |
| Start B.2 component extraction before B.1 completes | Build GlassCard, SectionContainer, BreathingCTA, MarketingParticleField with placeholder content. | Component APIs may need revision when real content arrives. | **Recommended.** Components are layout-structural and content-agnostic. Placeholder content is sufficient for API design. |
| Descope B.3 accordion to server-only | Remove interactive accordion, render all steps expanded. Saves ~3 hours. | Weaker UX on the heaviest persuasion page. | **Not recommended.** B.3 is the highest-persuasion page and benefits from progressive disclosure. |
| Move B.5 and B.6 to Phase C | They are blocked by external decisions anyway. | Phase C scope creep; delayed page completeness. | **Conditionally recommended.** If Gap 9 and Gap 10 are not resolved by Day 8, move to Phase C rather than blocking the phase. |
| Parallelize B.1 content delivery | Deliver copy per-page rather than as a monolithic deck. | Incomplete voice/tone consistency if pages are written independently. | **Recommended.** Deliver landing page copy first (unblocks B.2), then remaining pages in priority order. |

### 10.5 Recommended Execution Plan

**Phase B Sprint 1 (Days 1-5):**
- `narrative-strategist`: B.1 -- Deliver landing page copy first, then remaining pages
- `react-developer`: B.9 (About/Team, 4-6 hrs) then B.8 infrastructure (2 hrs)
- `react-developer`: Begin B.2 component extraction (GlassCard, SectionContainer, BreathingCTA, MarketingParticleField) using placeholder content -- no B.1 dependency for structural components
- `business owner`: Resolve Gap 9 (pricing), Gap 10 (compliance), commission legal content

**Phase B Sprint 2 (Days 6-10):**
- `react-developer`: B.2 Landing Page (integrate B.1 copy when ready, 8-12 hrs)
- `react-developer`: B.3 How It Works (8-12 hrs)
- `narrative-strategist`: Review/finalize remaining page copy

**Phase B Sprint 3 (Days 11-15):**
- `react-developer`: B.4 (4-6 hrs), B.7 (4-6 hrs)
- `react-developer`: B.5 (4-6 hrs, if Gap 9 resolved) and B.6 (4-6 hrs, if Gap 10 resolved)
- `react-developer`: B.8 final content integration (when attorney content received)

**If second react-developer available:**
- Sprint 2 becomes: Primary does B.2 + B.3, Secondary does B.4 + B.7
- Sprint 3 becomes: Primary does B.5 + B.6, Secondary does polish/QA
- **This compresses Phase B from ~15 days to ~11 days**

### 10.6 Risk Register (Phase B Specific)

| ID | Risk | Probability | Impact | Mitigation |
|----|------|-------------|--------|------------|
| PB-R1 | B.1 copy delivery delays block B.2-B.7 | Medium | High | Start B.2 component extraction with placeholder content. Request incremental copy delivery (landing first). |
| PB-R2 | Gap 9 (pricing) not resolved, blocking B.5 | Medium | Medium | Ship with placeholder pricing and `[DRAFT]` watermark. Resolve in Phase C. |
| PB-R3 | Gap 10 (compliance) not resolved, blocking B.6 | Medium | Medium | All `ComplianceBadge` components render as "Verification Pending." Correct when data arrives. |
| PB-R4 | Legal content not received, blocking launch | Medium | Critical | Escalate to executive sponsor. Legal pages are launch blockers per compliance requirements. |
| PB-R5 | B.2 component APIs change mid-phase, cascading rework | Low | High | Lock component APIs after Sprint 1 review. Any changes require explicit approval and impact assessment. |
| PB-R6 | Single react-developer burnout or unavailability | Low | Critical | Document component patterns for onboarding. Maintain at least 1-day buffer between sprints. |
| PB-R7 | Content/copy quality requires multiple revision cycles | Medium | Medium | Limit revisions to 2 rounds. Business owner sign-off required before integration. |
| PB-R8 | Dead links to Phase D pages cause user confusion at launch | Low | Low | Implement disabled card strategy (Gap G-4, Option A). |

---

## Appendix A: File Manifest Summary

Total new files across all Phase B SOWs (approximate):

| SOW | New Files | Modified Files |
|-----|-----------|---------------|
| B.1 | 0 (content artifacts, not code files) | 0 |
| B.2 | 15 | 2 |
| B.3 | ~12-14 | 1-2 |
| B.4 | 11 | 0 |
| B.5 | 10 | 1-2 |
| B.6 | 11 | 0 |
| B.7 | ~8-10 | 1 |
| B.8 | ~6-8 | 1 |
| B.9 | ~8-10 | 1 |
| **Total** | **~81-98** | **~7-9** |

## Appendix B: Reusable Component Registry

Components defined in B.2 and consumed across Phase B:

| Component | File | Consumers | Props (Proposed) |
|-----------|------|-----------|-----------------|
| `GlassCard` | `src/components/marketing/glass-card.tsx` | B.2-B.9 | `variant?: 'standard' \| 'dense'`, `className?` |
| `BreathingCTA` | `src/components/marketing/breathing-cta.tsx` | B.2-B.9 (one per page max) | `variant?: 'primary' \| 'conversion'`, `href`, `children` |
| `SectionContainer` | `src/components/marketing/section-container.tsx` | B.2-B.9 | `width?: 'standard' \| 'narrow' \| 'compact'`, `padding?: 'standard' \| 'compact'`, `align?: 'center' \| 'left'`, `className?` |
| `MarketingParticleField` | `src/components/marketing/marketing-particle-field.tsx` | B.2-B.9 (selective) | `density?`, `className?` |

## Appendix C: Phase A Prerequisites Checklist

Before Phase B development can begin, confirm these Phase A outputs:

| Phase A Output | Required By | Status |
|---------------|-------------|--------|
| Marketing layout (`(marketing)/layout.tsx`) | All B.* SOWs | Pending (WS-A.1) |
| SEO infrastructure (metadata utils, sitemap) | B.2-B.9 | Pending (WS-A.2) |
| Form backend (API route, validation) | B.7 (Contact) | Pending (WS-A.3) |
| District system remapping | Spatial ZUI (not directly Phase B) | Pending (WS-A.4) |
| Error pages (404, 500) | All routes | Pending (WS-A.5) |

---

*Document generated by synthesis team lead. All four perspectives (CTA, SPO, STW, PMO) contributed to each section. Conflicts and gaps require resolution before Phase B execution begins.*
