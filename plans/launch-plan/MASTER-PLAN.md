# MASTER PLAN -- Safetrekr Marketing Site Launch

> **Document Type:** Definitive Implementation Blueprint
> **Project:** Safetrekr Marketing Site Launch
> **Codebase:** `/Users/jessetarvambp1/Sites/Safetrekr/marketing-site-2`
> **Date:** 2026-03-02
> **Status:** Approved for Implementation
> **Synthesized By:** CTA + SPO + STW + PMO (Synthesis Team)
> **Source Documents:** 11 (combined-recommendations.md, agent-roster.md, 4 Phase Overviews, 4 Phase Reviews, PLANNING-PROMPT.md)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture Summary](#2-architecture-summary)
3. [Phase Execution Plan](#3-phase-execution-plan)
4. [Master Dependency Graph](#4-master-dependency-graph)
5. [Resource Allocation](#5-resource-allocation)
6. [Risk Register (Consolidated)](#6-risk-register-consolidated)
7. [Open Questions (Consolidated)](#7-open-questions-consolidated)
8. [Issues Log](#8-issues-log)
9. [Acceptance Criteria Summary](#9-acceptance-criteria-summary)
10. [Implementation Sequencing](#10-implementation-sequencing)
11. [Launch Checklist](#11-launch-checklist)
12. [Post-Launch Roadmap](#12-post-launch-roadmap)

---

## 1. Project Overview

### 1.1 Mission

Transform the existing Tarva-branded spatial ZUI (Zoomable User Interface) engine into a production-ready Safetrekr marketing site by layering traditional marketing pages, SEO infrastructure, form backend, and analytics onto the existing spatial foundation. **This is a content + infrastructure project, not a rebuild.**

### 1.2 Current State

The codebase contains a fully functional spatial ZUI engine with:
- Cinematic gateway boot sequence at `/`
- 6-capsule district ring with morph transitions at `/launch`
- 30+ ambient effects (particle fields, scanlines, breathing glows)
- Complete CSS token system themed for Safetrekr green/dark aesthetic
- Camera store, spatial math, and morph orchestrator -- all working

**82% of the existing codebase is directly reusable.** The critical gap is not code -- it is content. Zero marketing copy, zero content pages, zero social proof, and zero SEO infrastructure exist today.

### 1.3 Target State

A launch-ready marketing site with:
- 10 marketing content pages (landing, how-it-works, platform, pricing, security, solutions, about, contact, terms, privacy)
- Responsive header/footer with Oblivion HUD aesthetic
- District system remapped from Tarva to Safetrekr marketing districts
- SEO infrastructure (robots.txt, sitemap, metadata, structured data, OG images)
- Form backend for demo requests (Supabase + Zod validation)
- GA4 analytics with 18-event taxonomy
- Error pages (404, 500) matching the design system
- Mobile + accessibility audit with remediations
- Post-launch: 5 vertical solution pages, social proof system, blog infrastructure

### 1.4 Non-Negotiable Constraints

| # | Constraint | Source |
|---|-----------|--------|
| 1 | Oblivion HUD / Mission-Control aesthetic -- dark backgrounds, glass-morphism, green accents on all pages | CLAUDE.md, CR |
| 2 | "Safetrekr" naming (never "SafeTrekr") | CR |
| 3 | "Calm Authority" brand voice -- precise, factual, confident, operational | CR |
| 4 | Independent analyst review featured on every page (THE differentiator) | CR |
| 5 | `pnpm` only (never npm) | CLAUDE.md |
| 6 | `motion/react` (never `framer-motion`) | CLAUDE.md |
| 7 | Next.js 16 App Router -- server components for all marketing pages (SEO) | CLAUDE.md |
| 8 | Existing ZUI untouched -- camera store, spatial math, morph system preserved | CR |
| 9 | District system preserved -- capsule ring, morph transitions, URL-encoded camera state | CR |
| 10 | Node >= 22 required | CLAUDE.md |
| 11 | `@tarva/ui` component library for buttons, badges | CLAUDE.md |
| 12 | Zod 4 for validation | CLAUDE.md |
| 13 | Supabase for form backend | CLAUDE.md |

### 1.5 Key Metrics

| Metric | Target |
|--------|--------|
| Total Workstreams | 21 (A:5, B:9, C:4, D:3) |
| Total Effort Estimate | 123-184 hours |
| New Files Created | ~210-240 |
| Files Deleted | ~60 (Tarva cleanup) |
| New Routes | ~19 |
| Primary Agents | 5 |
| Phase Reviews | 4/4 PASS WITH ISSUES (all non-blocking) |

---

## 2. Architecture Summary

### 2.1 Route Structure (AD-1)

```
src/app/
+-- page.tsx                          -- Gateway (cinematic boot -> choice reveal)
+-- launch/page.tsx                   -- Spatial ZUI (existing, untouched)
+-- (marketing)/
|   +-- layout.tsx                    -- Marketing layout (header + footer)
|   +-- landing/page.tsx              -- Traditional landing (hero + value props)
|   +-- how-it-works/page.tsx         -- 4-phase lifecycle
|   +-- platform/page.tsx             -- Feature grid
|   +-- solutions/page.tsx            -- Vertical overview
|   |   +-- [vertical]/page.tsx       -- Phase D: per-vertical pages
|   +-- pricing/page.tsx              -- Pricing tiers + FAQ
|   +-- security/page.tsx             -- Security & compliance
|   +-- about/page.tsx                -- Team, credentials, field experts
|   +-- contact/page.tsx              -- Request demo / schedule briefing
|   +-- blog/page.tsx                 -- Phase D: blog listing
|   |   +-- [slug]/page.tsx           -- Phase D: blog post
|   +-- case-studies/page.tsx         -- Phase D: case study listing
|   +-- legal/
|       +-- terms/page.tsx            -- Terms of Service
|       +-- privacy/page.tsx          -- Privacy Policy
+-- not-found.tsx                     -- 404 "Signal Lost"
+-- error.tsx                         -- 500 "System Fault"
+-- robots.ts                         -- Robots.txt
+-- sitemap.ts                        -- Dynamic sitemap
+-- api/
    +-- contact/route.ts              -- Form submission (NEW)
    +-- ... (existing AI/telemetry routes)
```

### 2.2 Visual Pattern (AD-2)

All marketing pages use the Oblivion HUD aesthetic with traditional page layout:

- **Background**: Dark gradient (`--color-void: #061a23` to `--color-deep: #0a2733`)
- **Content surfaces**: Glass-morphism cards (`bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]`)
- **Primary accent**: Green (`--color-ember: #4ba467`) on interactive elements
- **Typography**: Geist Sans for body, monospace for metadata labels
- **Borders**: 1px at low opacity, no drop shadows, no rounded-corner excess
- **Breathing glow**: On primary CTA only ("Schedule a Briefing"), one per page
- **Section dividers**: Thin 1px gradient fades
- **Text opacity floor**: 40% minimum for readable content

### 2.3 Component Architecture

```
src/components/
+-- marketing/                        -- NEW: all marketing components (PAD-03)
|   +-- marketing-header.tsx          -- Glass-morphism responsive header
|   +-- marketing-mobile-nav.tsx      -- Slide-in hamburger menu
|   +-- marketing-footer.tsx          -- 3-column footer
|   +-- glass-card.tsx                -- Reusable glass surface (B.2)
|   +-- breathing-cta.tsx             -- Animated CTA button (B.2)
|   +-- section-container.tsx         -- Consistent section wrapper (B.2)
|   +-- marketing-particle-field.tsx  -- Ambient background (B.2)
|   +-- contact-form.tsx              -- Form with Zod validation (A.4)
|   +-- landing/                      -- Landing page sections
|   +-- how-it-works/                 -- How It Works sections
|   +-- ... (per-page subdirectories)
+-- spatial/                          -- EXISTING: ZUI engine (untouched)
+-- districts/                        -- EXISTING: capsule ring (data swap only)
+-- ambient/                          -- EXISTING: decorative overlays (preserved)
+-- gateway/                          -- EXISTING: cinematic entry (minor C.1 update)
```

### 2.4 Data Architecture

```
src/lib/
+-- data/                             -- ALL page content data modules
|   +-- landing.ts                    -- Landing page content (B.2)
|   +-- how-it-works.ts               -- How It Works content (B.3)
|   +-- platform-data.ts              -- Platform features (B.4, standardized to data/)
|   +-- pricing.ts                    -- Pricing tiers [UNVALIDATED] (B.5)
|   +-- security-content.ts           -- Security architecture (B.6)
|   +-- solutions-verticals.ts        -- Solutions overview (B.7)
|   +-- about-team.ts                 -- Team data (B.9)
|   +-- verticals/                    -- Phase D: per-vertical detail data
|   |   +-- index.ts                  -- Barrel export
|   |   +-- k12.ts, higher-ed.ts, ... -- Per-vertical modules
|   +-- vertical-meta.ts              -- Phase D: display metadata (D.2, renamed to avoid collision)
|   +-- testimonials.ts               -- Phase D: social proof data
+-- schemas/                          -- Zod validation schemas
|   +-- contact.ts                    -- Contact form schema (shared client/server)
+-- config/                           -- Application configuration only
|   +-- site.ts                       -- SITE_CONFIG (domain, metadata defaults)
|   +-- marketing-nav.ts              -- Navigation structure
+-- interfaces/                       -- TypeScript type definitions
|   +-- district.ts                   -- Remapped DistrictId (A.2)
|   +-- marketing-nav.ts              -- Nav types
|   +-- solutions.ts                  -- Canonical VerticalId type
+-- seo/                              -- SEO utilities (A.3)
|   +-- metadata.ts                   -- generatePageMetadata helper
|   +-- structured-data.ts            -- JSON-LD generators
+-- analytics.ts                      -- GA4 event helper module (C.3)
+-- blog.ts                           -- Phase D: MDX content loader
```

### 2.5 Key Architecture Decisions

| ID | Decision | Rationale |
|----|----------|-----------|
| AD-1 | Marketing pages in `(marketing)` route group; gateway at `/`, ZUI at `/launch` | Shared layout without URL pollution |
| AD-2 | Oblivion HUD aesthetic on all pages -- dark backgrounds, glass-morphism, green accents | Visual DNA from spatial engine, reinforces "we take safety seriously" |
| AD-3 | District capsules show marketing preview cards with "Read More" CTAs to marketing pages | Preserves morph interaction, adds SEO-crawlable pages |
| AD-4 | Glass-morphism header (fixed, blurred), 3-column footer, hamburger mobile nav | HUD aesthetic in traditional nav pattern |
| AD-5 | Zod 4 shared schema for client/server form validation | Single source of truth, type-safe end-to-end |
| AD-6 | GA4 via `next/script` with delegated click listener on `data-analytics-id` | Zero modifications to existing CTA components |
| PAD-03 | Components in `src/components/marketing/` (not `layout/`) | Matches existing naming convention (`districts/`, `spatial/`, `ambient/`) |
| PAD-07 | Canonical glass recipe: `bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]` | Exact match to `detail-panel.tsx` line 93 |
| PAD-14 | Remap DistrictId to: `how-it-works`, `who-its-for`, `platform`, `security`, `pricing`, `get-started` | Data model change only; capsule ring and morph system preserved |
| PAD-22 | `SITE_CONFIG` with `NEXT_PUBLIC_SITE_URL` env var override (default: `https://www.safetrekr.com`) | Single-file domain change when Q-8 resolved |

---

## 3. Phase Execution Plan

### 3.1 Phase A: Foundation & Infrastructure

**Objective:** Create every infrastructural prerequisite that Phase B content pages depend on.

**Verdict:** PASS WITH ISSUES (1 HIGH, 4 MEDIUM -- all non-blocking)

**Effort:** 19-30 hours

| WS | Title | Agent | Size | Effort | Depends On | Blocks |
|----|-------|-------|------|--------|-----------|--------|
| A.1 | Marketing Route Group + Layout | react-developer | M | 4-6h | None | A.3, A.4, B.2-B.9 |
| A.2 | District System Remapping + Tarva Cleanup | react-developer | L | 8-12h | None | B.2-B.9, C.1 |
| A.3 | SEO Infrastructure | digital-marketing-lead + react-developer | S | 2-4h | A.1 | Phase B pages, C.4 |
| A.4 | Form Backend + Contact Page | backend-api-engineer | M | 4-6h | A.1 (partial) | None |
| A.5 | Error Pages | react-developer | S | 1-2h | None | None |

**Deliverables:**
- `(marketing)` route group with responsive header/footer
- 10 placeholder page shells
- District system remapped from 6 Tarva IDs to 6 Safetrekr marketing IDs
- ~60 Tarva-specific files deleted
- `robots.ts`, `sitemap.ts`, metadata helpers, structured data
- Supabase `demo_requests` table, API route, contact page with form
- 404 and 500 error pages

**Critical Path:** A.1 (4-6h) -> A.3 (2-4h) = 6-10h sequential
**Parallel Track:** A.2 (8-12h) and A.5 (1-2h) run independently
**External Track:** A.4 (4-6h) runs after A.1, in parallel with A.3

**Phase A Decisions:** 38 decisions (PAD-01 through PAD-38) documented in PHASE-A-OVERVIEW.md
**Acceptance Criteria:** 126 across 5 SOWs

### 3.2 Phase B: P0 Content Pages

**Objective:** Implement all P0 marketing pages with real copy. Phase B completion = MVP marketing site ready for launch.

**Verdict:** PASS WITH ISSUES (3 HIGH, 5 MEDIUM -- all in Overview document, not SOWs; all non-blocking)

**Effort:** 51-75 hours

| WS | Title | Agent | Size | Effort | Depends On | Blocks |
|----|-------|-------|------|--------|-----------|--------|
| B.1 | Content Strategy + Copy Drafting | product-narrative-strategist | XL | 12-18h | None | B.2-B.7 |
| B.2 | Landing Page | react-developer | L | 8-12h | A.1, B.1 | B.3-B.9 (reusable components) |
| B.3 | How It Works Page | react-developer | L | 8-12h | A.1, B.1, B.2 | None |
| B.4 | Platform Page | react-developer | M | 4-6h | A.1, B.1, B.2 | None |
| B.5 | Pricing Page | react-developer | M | 4-6h | A.1, B.1, B.2, Gap 9 | None |
| B.6 | Security Page | react-developer | M | 4-6h | A.1, B.1, B.2, Gap 10 | None |
| B.7 | Solutions Overview Page | react-developer | M | 4-6h | A.1, B.1, B.2 | D.1 |
| B.8 | Legal Pages | react-developer | S | 2-3h | A.1, legal content | None |
| B.9 | About / Team Page | react-developer | M | 4-6h | A.1, B.2 | None |

**Key Characteristics:**
1. **Content-gated execution.** B.2-B.7 blocked by B.1 copy deck.
2. **Extreme resource concentration.** 8 of 9 SOWs assigned to `react-developer`.
3. **Three external business blockers.** Pricing (Gap 9), compliance verification (Gap 10), legal content.
4. **Shared component foundation.** B.2 defines 4 reusable components consumed by all subsequent pages: `GlassCard`, `BreathingCTA`, `SectionContainer`, `MarketingParticleField`.
5. **Two SOWs can start without B.1.** B.8 (legal content from attorney) and B.9 (reference content from existing about.html) have independent content sources.

**Phase B Decisions:** 8 decisions (PBD-01 through PBD-08) documented in PHASE-B-OVERVIEW.md
**Acceptance Criteria:** ~200 across 9 SOWs

### 3.3 Phase C: Integration & Polish

**Objective:** Connect the gateway to marketing pages, audit quality, add analytics, complete social sharing. Phase C = production-ready.

**Verdict:** PASS WITH ISSUES (1 HIGH, 3 MEDIUM -- all non-blocking)

**Effort:** 20.5-30.5 hours (+ 8-16h remediation from audit findings)

| WS | Title | Agent | Size | Effort | Depends On | Blocks |
|----|-------|-------|------|--------|-----------|--------|
| C.1 | Gateway Integration | react-developer | XS | 0.5h | B.2 (soft) | None |
| C.2 | Mobile + Accessibility Audit | ui-designer | M | 10-14h | Phase B complete | Remediation work |
| C.3 | Analytics Integration | digital-marketing-lead | S-M | 4-6h | A.1, A.4, Q-9 | None |
| C.4 | OG Images & Social Sharing | ui-designer | M | 6-10h | A.3, Phase B (soft) | None |

**Key Characteristics:**
1. **Fundamentally different from A/B.** Three of four workstreams produce no user-visible features -- they validate, connect, and instrument.
2. **C.2 is audit-only, not remediation.** Produces a remediation register. Only Critical-severity findings are launch-blocking.
3. **Soft launch gate defined:** C.1 (required), C.2 audit (required), C.3 (strongly recommended), C.4 (deferrable -- A.3 provides static default OG fallback).

**Phase C Decisions:** 8 decisions (AD-C.1 through AD-C.8) documented in PHASE-C-OVERVIEW.md
**Acceptance Criteria:** 71 across 4 SOWs

### 3.4 Phase D: Content Depth (Post-Launch)

**Objective:** Deepen vertical market penetration, build social proof, establish SEO authority. Phase D is post-MVP.

**Verdict:** PASS WITH ISSUES (1 HIGH, 5 MEDIUM -- all non-blocking)

**Effort:** 32-48 hours

| WS | Title | Agent | Size | Effort | Depends On | Blocks |
|----|-------|-------|------|--------|-----------|--------|
| D.1 | Vertical Solution Pages | product-narrative-strategist + react-developer | L | 16-24h | B.7, B.1 | None |
| D.2 | Social Proof System | react-developer | M | 8-12h | B.2, A.1 | None |
| D.4 | Blog Infrastructure | react-developer | M | 8-12h | A.1, B.8 patterns | None |

**Key Characteristics:**
1. **Content-gated, not code-gated.** Infrastructure ships first; content arrives over months.
2. **Post-launch execution.** Each workstream deploys incrementally to a live site.
3. **Revenue-building, not launch-enabling.** Conversion depth investments.
4. **No D.3.** Original D-3 (About page) was promoted to Phase B as WS-B.9.

**Phase D Decisions:** 32 decisions (PAD-D.01 through PAD-D.32) documented in PHASE-D-OVERVIEW.md
**Acceptance Criteria:** ~88 across 3 SOWs

### 3.5 Cross-Phase Dependencies

| Source | Target | Type | Description |
|--------|--------|------|-------------|
| A.1 | B.2-B.9 | Hard | Marketing layout required for all content pages |
| A.1 | A.3 | Hard | Route structure needed for sitemap/metadata |
| A.1 | A.4 | Partial | Page composition needs layout; API route is independent |
| A.2 | C.1 | Soft | District remap should complete before gateway fix |
| A.3 | C.4 | Hard | `SITE_CONFIG` and `metadataBase` required for OG images |
| B.1 | B.2-B.7 | Hard | Copy deck blocks 6 content page implementations |
| B.2 | B.3-B.9 | Hard | Reusable components (`GlassCard`, etc.) defined in B.2 |
| B.2 | C.1 | Soft | Landing page at `/landing` for gateway CTA target |
| Phase B | C.2 | Hard | All pages must exist for full audit |
| Phase B | C.4 | Soft | Page content needed for per-page OG image content |
| B.7 | D.1 | Hard | Solutions overview provides slugs and card links |
| B.2 | D.2 | Hard | Landing page social proof section for hybrid mode |
| B.8 | D.4 | Soft | Legal prose patterns reused by blog |
| A.3 | D.4 | Hard | Sitemap modification for blog URLs |

### 3.6 Parallel Execution Opportunities

| Parallel Pair | Rationale |
|---------------|-----------|
| A.2 + A.1 | Independent -- no shared files |
| A.5 + A.1 | Independent -- no shared files |
| A.4 + A.3 | Both depend on A.1 but touch different files |
| B.1 + Phase A | B.1 (content) has zero code dependencies |
| B.8 + B.2 | B.8 content comes from attorney, not B.1 |
| B.9 + B.2 | B.9 content from reference file, not B.1 |
| C.3 + C.4 | Different agents, different file sets |
| D.1 + D.4 | Independent content sources and routes |

---

## 4. Master Dependency Graph

```
PHASE A (Foundation)              PHASE B (Content)                    PHASE C (Polish)         PHASE D (Depth)
=====================             ====================                 ==================       ==============

A.1 (Layout) --------+---------> B.2 (Landing + Components) --------> C.1 (Gateway Fix)
     |                |               |
     |                |               +-> B.3 (How It Works)
     |                |               +-> B.4 (Platform)
     +-> A.3 (SEO) ---+               +-> B.5 (Pricing) -------[Gap 9]
     |                |               +-> B.6 (Security) ------[Gap 10]
     +-> A.4 (Form) --+               +-> B.7 (Solutions) ---------> D.1 (Verticals)
                                      +-> B.8 (Legal) -----[legal]-> D.4 (Blog)
                                      +-> B.9 (About)
A.2 (Districts) ----[independent]     |
                                      +-> D.2 (Social Proof)
A.5 (Errors) -------[independent]
                                  B.1 (Copy) ---> B.2-B.7

                                  Phase B (all) ---------> C.2 (Audit)
                                  A.3 ---------> C.4 (OG Images)
                                  A.1 ---------> C.3 (Analytics)

Legend:
  ---->  Hard dependency (must complete before target starts)
  --->   Soft dependency (target can start with placeholder)
  [Gap]  External blocker (business owner decision required)
```

---

## 5. Resource Allocation

### 5.1 Agent Assignments

| Agent | Workstreams | Total Effort | Load |
|-------|-----------|-------------|------|
| react-developer | A.1, A.2, A.5, B.2-B.9, C.1, D.2, D.4 | 56-89h | **BOTTLENECK** |
| product-narrative-strategist | B.1, D.1 | 28-42h | Moderate |
| digital-marketing-lead | A.3 (strategy), C.3 | 6-10h | Light |
| backend-api-engineer | A.4 | 4-6h | Light |
| ui-designer | C.2, C.4 | 16-24h | Moderate |

### 5.2 Bottleneck Analysis

**react-developer is the critical bottleneck.** This agent owns 14 of 21 workstreams with an estimated 56-89 hours of work. Even with perfect scheduling:

- **Phase A (react-developer work):** A.1 (4-6h) + A.2 (8-12h) + A.5 (1-2h) = 13-20h, ~2 working days
- **Phase B (react-developer work):** B.2-B.9 = 39-57h, ~5-7 working days
- **Phase C (react-developer work):** C.1 = 0.5h
- **Phase D (react-developer work):** D.2 (8-12h) + D.4 (8-12h) = 16-24h, ~2-3 working days

**Minimum calendar time for react-developer:** ~10-12 working days for Phases A-C (pre-launch).

### 5.3 Load Balancing Recommendations

1. **B.1 starts Day 1** in parallel with Phase A. product-narrative-strategist works independently.
2. **A.2, A.5 run in parallel with A.1** (react-developer can interleave these since they touch different files).
3. **B.8 and B.9 start immediately after A.1** -- they do not depend on B.1 (copy).
4. **B.3-B.7 serialize after B.2** due to single-developer constraint but can be done in any order.
5. **C.2 and C.4 (ui-designer)** run in parallel with react-developer's Phase B work.
6. **C.3 (digital-marketing-lead)** can start after A.1 and run in parallel with Phase B.

### 5.4 Standing Pipeline Roles

| Role | Touchpoints |
|------|------------|
| software-product-owner | Discovery Phase 4, each phase planning, each phase gate, deviations affecting user-facing behavior |
| enterprise-PM-PMO | Discovery Phase 4, each phase planning, leads MASTER-PLAN sections 3-5/9, escalation for 3+ deviations |
| every-time | Discovery quality gates, phase reviewer (SOW completeness), final validation, pre/post-flight per WS |

### 5.5 Optional Supporting Agents

| Agent | Invoke When |
|-------|-------------|
| ux-designer | Complex mobile UX issues in C.2; conversion optimization post-launch |
| appsec-security-architect | Security page claims need verification beyond product review |
| database-architect | Supabase schema optimization or RLS policy review |
| devops-platform-engineer | @tarva/ui deployment issue (R-11) requires infrastructure solution |
| chief-technology-architect | Cross-cutting architecture decisions if Phase A reveals structural issues |
| product-strategy-analyst-market | Phase D vertical positioning needs competitive intelligence |

---

## 6. Risk Register (Consolidated)

### 6.1 Critical Risks

| ID | Risk | Phase | Likelihood | Impact | Mitigation | Owner |
|----|------|-------|-----------|--------|------------|-------|
| R-01 | No marketing copy exists -- content is the critical path | B | HIGH | HIGH | B.1 starts Day 1 in parallel with Phase A; messaging framework from holistic-overview.md provides starting drafts | product-narrative-strategist |
| R-04 | Legal pages missing at launch | B | HIGH | HIGH | Flag to business owner immediately; use template service (Termly) if custom review not ready | Business Owner |
| R-11 | @tarva/ui workspace dependency -- `../../tarva-org/tarva-ui-library` will fail in production deployment | Deploy | HIGH | HIGH | Verify deployment strategy before build: (a) publish to npm, (b) vendor into project, or (c) configure Vercel monorepo root | devops-platform-engineer |

### 6.2 High Risks

| ID | Risk | Phase | Likelihood | Impact | Mitigation | Owner |
|----|------|-------|-----------|--------|------------|-------|
| R-02 | Dark HUD aesthetic may not resonate with 40-60yr security directors | B | MEDIUM | HIGH | C.2 audit validates readability; text opacity floor at 40%; test on institutional Dell monitors | ui-designer |
| R-03 | Scaffolded features (21 HQ Console stubs) could create liability if marketed | B | MEDIUM | HIGH | Marketing pages only describe verified-implemented features from product review | product-narrative-strategist |
| R-05 | Compliance certifications unverified (SOC 2, FERPA) | B | MEDIUM | HIGH | Security page separates "Security Architecture" (publish now) from "Certifications" (needs verification) | Business Owner |
| R-06 | No social proof reduces conversion 40-60% | D | HIGH | MEDIUM | D.2 builds progressive social proof system; placeholder structure at launch; begin pilot customer outreach immediately | Business Owner |
| R-14 | Accessibility compliance risk -- dark backgrounds, 40% opacity, green-on-dark, glass-morphism | C | MEDIUM | HIGH | C.2 audit with WCAG 2.1 AA criteria; pre-computed contrast ratios identify 6 failures; remediation framework | ui-designer |

### 6.3 Medium Risks

| ID | Risk | Phase | Likelihood | Impact | Mitigation | Owner |
|----|------|-------|-----------|--------|------------|-------|
| R-07 | Pricing not confirmed by business owner | B | MEDIUM | MEDIUM | Use product review pricing ($450/$750/$1,250) as working values; [UNVALIDATED] flags throughout | Business Owner |
| R-08 | Mobile ZUI usability | C | MEDIUM | MEDIUM | Marketing pages are traditional responsive; ZUI shows "best on desktop" notice on mobile | react-developer |
| R-09 | Gateway cinematic entry may increase bounce rate | C | LOW | MEDIUM | Skip affordance exists; "Read the Brief" provides immediate escape; consider direct URL access to landing | SPO |
| R-12 | Contact form operational workflow undefined | A | MEDIUM | MEDIUM | MVP: Supabase webhook + email notification; no CRM; define human follow-up process | Business Owner |
| R-13 | Tarva-specific code artifacts beyond districts (~30+ files) | A | MEDIUM | LOW | Remove/gate during Phase A; TypeScript compiler catches missed references | react-developer |

### 6.4 Recurring Issue: Unverified SOC 2 Claims

This issue appeared across multiple phases and warrants a project-level tracking item:

| Phase | Location | Severity | Status |
|-------|----------|----------|--------|
| A | WS-A.2 placeholder stat lines, WS-A.3 security metadata | MEDIUM | Fix recommended |
| B | Security page metadata (via B.1/B.6) | -- | Handled via ComplianceBadge architecture |
| C | WS-C.4 security page OG image content | HIGH | Fix recommended -- OG images are externally visible |
| D | Not present | -- | Resolved -- no SOC 2 references in Phase D |

**Project-level action:** Add "No unverified SOC 2 claims" to a pre-implementation content checklist. Every file referencing SOC 2 must include a `// TODO: SOC 2 claim pending Q-3 resolution` comment until Q-3 is resolved.

---

## 7. Open Questions (Consolidated)

### 7.1 Blocking Questions (Must Resolve Before Implementation Begins)

| ID | Question | Context | Needed By | Owner |
|----|----------|---------|-----------|-------|
| Q-6 | Who writes marketing copy? In-house, external, or AI-assisted? | Critical path bottleneck -- WS-B.1 cannot start without this decision | Phase B start | Business Owner |
| Q-11 | Gateway fate: Keep at `/` (user preference) or move landing page to `/` (PO recommendation)? | Landing at `/` improves SEO and conversion. Gateway as opt-in at `/experience`. Both valid -- product decision. | Phase B | Business Owner |
| Q-12 | @tarva/ui deployment strategy? npm publish, vendor, or monorepo config? | `package.json` workspace link to `../../tarva-org/tarva-ui-library` -- production deployment blocker | Before any deployment | devops-platform-engineer |

### 7.2 Required Before Specific Workstreams

| ID | Question | Blocks | Priority | Owner |
|----|----------|--------|----------|-------|
| Q-1 | Are per-trip prices confirmed? T1: $450, T2: $750, T3: $1,250? | B.5 (Pricing) | HIGH | Business Owner |
| Q-2 | Is there a free trial or freemium offer? | B.5 (Pricing) | HIGH | Business Owner |
| Q-3 | What is the SOC 2 certification status? | B.6 (Security), C.4 (OG images) | HIGH | Business Owner |
| Q-4 | Is FERPA compliance verified by legal? | B.6 (Security), D.1 (Verticals) | HIGH | Business Owner |
| Q-5 | Legal pages: use template service or custom attorney? | B.8 (Legal) | MEDIUM | Business Owner |
| Q-8 | What is the primary domain? safetrekr.com? | A.3 (SEO), all OG metadata | MEDIUM | Business Owner |
| Q-9 | GA4 property ID? Or create new? | C.3 (Analytics) | MEDIUM | Business Owner |
| Q-10 | Should visitors bypass gateway via direct marketing page URLs? | C.1 (Gateway) | LOW | Business Owner |
| Q-13 | Contact form notification: who receives emails? Response SLA? | A.4 (Form) | MEDIUM | Business Owner |

### 7.3 Post-Launch Questions

| ID | Question | Context | Owner |
|----|----------|---------|-------|
| Q-7 | Any pilot customers available for testimonials? | D.2 (Social Proof) | Business Owner |

---

## 8. Issues Log

All issues identified across the four phase reviews, consolidated and deduplicated.

### 8.1 HIGH Severity Issues

| ID | Phase | Issue | Fix | Status |
|----|-------|-------|-----|--------|
| A-HIGH-1 | A | WS-A.2 placeholder copy describes wrong product domain (mining/construction instead of K-12/churches) | Replace all placeholder bullets with domain-accurate content | Open -- fix during A.2 implementation |
| B-HIGH-1 | B | Phase B Overview exit criteria reference wrong URLs (`/` instead of `/landing`, `/privacy` instead of `/legal/privacy`) | Correct URLs in overview document | Open -- documentation fix |
| B-HIGH-2 | B | Phase B Overview incorrectly claims no SOW creates the contact page | Remove Gap G-1; contact page is WS-A.4 (Phase A) | Open -- documentation fix |
| B-HIGH-3 | B | Phase B Overview misattributes data directories for B.5 and B.7 | Correct attribution; B.4 is the only outlier using `config/` | Open -- documentation fix |
| C-HIGH-1 | C | WS-C.4 security page OG image claims unverified SOC 2 certification | Remove "SOC 2" from description and alt text; add TODO comment | Open -- fix during C.4 implementation |
| D-HIGH-1 | D | WS-D.2 missing 4 standard SOW sections (AC, Decisions, OQs, Risk Register) | Add formal sections to bring D.2 in line with project standard | Open -- documentation fix |

### 8.2 MEDIUM Severity Issues

| ID | Phase | Issue | Fix |
|----|-------|-------|-----|
| A-MED-1 | A | WS-A.2 placeholder claims unverified SOC 2 certification | Change stat line to verifiable claim (`256-bit AES` or `10-level RBAC`) |
| A-MED-2 | A | WS-A.2 placeholder pricing contradicts per-trip model (`$0/month`) | Change to `Per-trip pricing` |
| A-MED-3 | A | WS-A.2 placeholder claims free trial without basis | Remove until Q-2 resolved |
| A-MED-4 | A | WS-A.3 security metadata pre-drafts SOC 2 claim | Add TODO code comment referencing Q-3 |
| B-MED-1 | B | B.4 data module in `src/lib/config/` while 5 other SOWs use `src/lib/data/` | Move to `src/lib/data/platform-data.ts` |
| B-MED-2 | B | Hardcoded `safetrekr.com` URLs in B.6, B.7, B.9 OG metadata | Use relative paths; domain resolved by `metadataBase` |
| B-MED-3 | B | GlassCard variant API insufficient (needs `dense` and `subtle` variants) | Add variants or document `className` override pattern |
| B-MED-4 | B | PBD-08 incorrectly states markdown library not specified | Correct: B.8 specifies `react-markdown` v9+ and `remark-gfm` v4+ |
| B-MED-5 | B | Missing CSS prefixes for B.7, B.8, B.9 | Assign: `sol-`, `legal-`, `about-` |
| C-MED-1 | C | WS-C.3 and WS-C.4 lack explicit effort estimate sections | Add estimates (C.3: 4-6h, C.4: 6-10h) to SOWs |
| C-MED-2 | C | Phase C Overview misquotes ember-on-void contrast ratio (4.85 vs correct 5.77:1) | Correct to 5.77:1; verdict changes from MARGINAL to PASS |
| C-MED-3 | C | WS-C.4 classified as "S" but scope suggests "M" | Update combined-recommendations.md to "M" |
| D-MED-1 | D | Hardcoded `safetrekr.com` URLs in D.1 (3) and D.4 (5) | Use relative paths or `SITE_CONFIG.baseUrl` |
| D-MED-2 | D | D.4 blog callout uses `i-lucide-*` CSS classes (UnoCSS pattern) instead of `lucide-react` | Replace with Lucide React component lookup pattern |
| D-MED-3 | D | WS-D.2 missing effort estimate section | Add: M, 8-12 hours |
| D-MED-4 | D | D.1 and D.2 `verticals` data module path conflict | Rename D.2's file to `vertical-meta.ts`; merge `VERTICAL_META` into D.1's barrel export |
| D-MED-5 | D | D.4 references non-existent `--warning-glow-rgb` CSS token | Add token to `spatial-tokens.css` or use literal value |

### 8.3 Issue Resolution Strategy

**Before implementation begins:**
1. Fix all documentation-only issues in overview documents (B-HIGH-1, B-HIGH-2, B-HIGH-3, B-MED-4, B-MED-5, C-MED-1, C-MED-2, C-MED-3, D-HIGH-1, D-MED-3)
2. Resolve the data directory convention -- standardize on `src/lib/data/` for all content data (B-MED-1)
3. Resolve the verticals module path conflict (D-MED-4)

**During implementation:**
1. Implementers apply fixes as they build each workstream (placeholder content, SOC 2 references, hardcoded URLs, icon classes, CSS tokens)
2. Pre-implementation content checklist catches recurring issues

---

## 9. Acceptance Criteria Summary

### 9.1 Totals by Phase

| Phase | Workstreams | Total ACs | Measurable | Notes |
|-------|------------|-----------|------------|-------|
| A | 5 | 126 | 126 (100%) | 4 ACs flagged with testability concerns (A.3-AC22 deploy-dependent) |
| B | 9 | ~200 | ~200 (100%) | All measurable via visual inspection, typecheck, or code review |
| C | 4 | 71 | 71 (100%) | C.3 ACs requiring GA4 DebugView depend on Q-9 resolution |
| D | 3 | ~88 | ~88 (100%) | D.2 ACs are informal (testing checklists, not numbered AC format) |
| **Total** | **21** | **~485** | **~485** | |

### 9.2 Exit Criteria by Phase

**Phase A Exit:**
- `pnpm build` succeeds with zero errors
- All 10 marketing route placeholders render at correct URLs
- Marketing header/footer visible on all `(marketing)` pages, absent on `/` and `/launch`
- District system shows 6 Safetrekr marketing districts (no Tarva references)
- `pnpm typecheck` passes with zero errors
- `robots.txt` and `sitemap.xml` return valid responses
- Contact form submits to Supabase and returns success state
- 404 and 500 error pages render correctly
- Zero Tarva district API routes remain
- APP_NAME reads "Safetrekr"
- All deleted Tarva files confirmed removed

**Phase B Exit:**
- All 10 content pages render at correct URLs: `/landing`, `/how-it-works`, `/platform`, `/pricing`, `/security`, `/solutions`, `/about`, `/contact`, `/legal/terms`, `/legal/privacy`
- Every page has unique `<title>`, `<meta description>`, and OG tags
- Glass-morphism pattern consistent across all pages
- Breathing CTA visible and animated on each page
- Server components verified (no unnecessary `'use client'`)
- All [UNVALIDATED] flags documented for pricing and compliance content
- `pnpm build` and `pnpm typecheck` pass
- Responsive layout verified at 375px, 768px, 1024px, 1440px

**Phase C Exit:**
- "Read the Brief" gateway CTA navigates to `/landing` (not external URL)
- C.2 audit complete with all Critical findings resolved
- GA4 script loads and fires page_view events (requires Q-9)
- Per-page OG images generate correctly (or static default fallback active)
- All marketing pages pass Lighthouse mobile performance >= 80
- Social sharing cards verified on LinkedIn, Twitter, Facebook

**Phase D Exit (per workstream, post-launch):**
- D.1: 5 vertical pages render at `/solutions/{vertical}` with SEO metadata and JSON-LD
- D.2: Social proof section on landing page displays in capability-proof or hybrid mode
- D.4: Blog listing at `/blog`, sample post renders, RSS feed validates

---

## 10. Implementation Sequencing

### 10.1 Timeline Overview

The following represents the optimized schedule accounting for the single react-developer bottleneck and parallel execution opportunities.

```
Week 1 (Days 1-5)
===================================================================================
Day 1:  [B.1 starts (content)] [A.1 starts (layout)] [A.2 starts (districts)] [A.5 (errors)]
Day 2:  [B.1 continues       ] [A.1 continues       ] [A.2 continues          ]
Day 3:  [B.1 continues       ] [A.1 finishes -> A.3  ] [A.2 continues          ] [A.4 starts (form)]
Day 4:  [B.1 continues       ] [A.3 finishes         ] [A.2 finishes           ] [A.4 continues    ]
Day 5:  [B.1 continues       ] Phase A complete       [                        ] [A.4 finishes     ]

Week 2 (Days 6-10)
===================================================================================
Day 6:  [B.1 continues] [B.8 starts (legal, no B.1 dep)] [B.9 starts (about, no B.1 dep)]
Day 7:  [B.1 finishes ] [B.8 finishes                  ] [B.9 continues                  ]
Day 8:  [B.2 starts (landing + components)]              [B.9 finishes                   ]
Day 9:  [B.2 continues                    ]              [C.3 starts (analytics, bg)]
Day 10: [B.2 finishes                     ]

Week 3 (Days 11-15)
===================================================================================
Day 11: [B.3 (How It Works)  ] [C.3 continues / finishes]
Day 12: [B.3 finishes        ]
Day 13: [B.4 (Platform)      ]
Day 14: [B.5 (Pricing)       ] -- requires Gap 9 resolution
Day 15: [B.6 (Security)      ] -- requires Gap 10 resolution

Week 4 (Days 16-19)
===================================================================================
Day 16: [B.6 finishes] [B.7 (Solutions)]
Day 17: [B.7 finishes] Phase B complete
Day 18: [C.1 (0.5h)] [C.2 starts (audit, ui-designer)] [C.4 starts (OG, ui-designer)]
Day 19: [C.2 continues] [C.4 continues]

Week 5 (Days 20-22)
===================================================================================
Day 20: [C.2 continues] [C.4 finishes]
Day 21: [C.2 finishes ] Remediation sprint begins
Day 22: Remediation + launch preparation
        Phase C complete -> SOFT LAUNCH GATE

Post-Launch (Weeks 6+)
===================================================================================
[D.1 (Verticals)] [D.2 (Social Proof)] [D.4 (Blog)]
-- Content-gated, deployed incrementally
```

### 10.2 Critical Path

```
B.1 (12-18h) -> B.2 (8-12h) -> B.3-B.7 serial (24-36h) -> C.2 (10-14h) -> Remediation
Total critical path: ~54-80 hours of sequential work = ~7-10 working days
```

The actual calendar time extends to 4-5 weeks due to the react-developer bottleneck and B.1 content dependency.

### 10.3 Acceleration Options

| Option | Saves | Trade-off |
|--------|-------|-----------|
| Add a second react-developer | ~5-7 days | B.3-B.7 can run in parallel; coordination overhead |
| Accept static OG images (skip C.4) | ~1-2 days | A.3 provides static default; dynamic OG is polish, not launch requirement |
| Soft launch without C.2 remediation | ~2-3 days | Audit still completes; only Critical findings block launch |
| Skip Phase D entirely at launch | 0 days (already post-launch) | No impact on launch timeline |
| Pre-compute B.1 copy before project starts | ~3-5 days | Business owner provides copy externally; B.2 unblocks sooner |

---

## 11. Launch Checklist

### 11.1 Pre-Implementation Gate

- [ ] Q-6 resolved: copy authorship decided
- [ ] Q-11 resolved: gateway vs landing page at `/`
- [ ] Q-12 resolved: @tarva/ui deployment strategy confirmed
- [ ] Q-8 resolved: production domain confirmed
- [ ] Documentation fixes applied to Phase B Overview (exit criteria URLs, Gap G-1, Conflict C-1)
- [ ] Data directory convention standardized to `src/lib/data/`
- [ ] SOC 2 content checklist created as project-level tracking item
- [ ] D.2 SOW updated with missing standard sections

### 11.2 Phase A Gate

- [ ] `pnpm build` succeeds with zero errors
- [ ] `pnpm typecheck` passes
- [ ] Marketing layout renders header/footer on `(marketing)` pages
- [ ] Header responsive -- hamburger menu on mobile
- [ ] District system shows 6 Safetrekr marketing districts
- [ ] Zero Tarva district API routes remain
- [ ] APP_NAME = "Safetrekr"
- [ ] `robots.txt` returns valid response
- [ ] `sitemap.xml` returns valid response with all marketing routes
- [ ] Contact form submits to Supabase and shows success state
- [ ] 404 page renders at non-existent route
- [ ] 500 error boundary functions

### 11.3 Phase B Gate

- [ ] All 10 content pages render correctly
- [ ] Each page has unique title, description, and OG metadata
- [ ] Glass-morphism pattern visually consistent
- [ ] Breathing CTA animated on each page
- [ ] All [UNVALIDATED] pricing flags confirmed or removed by business owner
- [ ] All [UNVERIFIED] compliance claims confirmed or removed
- [ ] Legal page content reviewed by attorney and inserted
- [ ] About page photos and team data verified accurate
- [ ] Server components verified (minimal client JS)
- [ ] Responsive at 375px, 768px, 1024px, 1440px breakpoints

### 11.4 Phase C Gate (Launch Gate)

- [ ] "Read the Brief" CTA navigates to `/landing`
- [ ] Mobile + accessibility audit complete
- [ ] Zero Critical-severity accessibility findings remain
- [ ] All High-severity findings have documented workarounds
- [ ] GA4 fires page_view events (Q-9 must be resolved)
- [ ] Conversion events configured: form_submit, cta_click, gateway_choice
- [ ] OG images generate per-page (or static default active)
- [ ] Social cards verified on LinkedIn, Twitter, Facebook
- [ ] Lighthouse mobile performance >= 80 on all pages
- [ ] @tarva/ui deployment verified (R-11 resolved)
- [ ] Production domain configured and DNS propagated
- [ ] SSL certificate active
- [ ] `pnpm build` succeeds in production environment

### 11.5 Soft Launch Criteria (Minimum Viable)

If timeline pressure requires early launch:

| Component | Required | Deferrable |
|-----------|----------|-----------|
| Phase A complete | Yes | -- |
| Phase B content pages (B.2-B.7, B.9) | Yes | -- |
| B.8 legal pages (infrastructure) | Yes | Final content |
| C.1 gateway fix | Yes | -- |
| C.2 audit (execution) | Yes | Medium/Low remediations |
| C.3 analytics | Strongly recommended | Can enable later via env var |
| C.4 OG images | No | A.3 static fallback sufficient |
| Phase D | No | All post-launch |

---

## 12. Post-Launch Roadmap

### 12.1 Immediate Post-Launch (Weeks 1-2)

| Priority | Action | Owner |
|----------|--------|-------|
| P0 | Monitor GA4 for bounce rate, conversion, and engagement baseline | digital-marketing-lead |
| P0 | Resolve any Critical accessibility remediations identified in C.2 audit | react-developer + ui-designer |
| P0 | Begin pilot customer outreach for testimonials (R-06) | Business Owner |
| P1 | Complete Medium-severity accessibility remediations | react-developer |
| P1 | Dynamic OG images (C.4) if deferred from launch | ui-designer |

### 12.2 Short-Term (Weeks 3-8)

| Priority | Action | Owner |
|----------|--------|-------|
| P1 | D.1: Vertical solution pages (5 pages) -- content from narrative strategist | product-narrative-strategist + react-developer |
| P1 | D.4: Blog infrastructure -- MDX pipeline, sample post | react-developer |
| P2 | D.2: Social proof system -- ship infrastructure with capability-proof cards | react-developer |
| P2 | Begin SEO monitoring (Search Console) and adjust meta descriptions | digital-marketing-lead |

### 12.3 Medium-Term (Months 2-4)

| Priority | Action | Owner |
|----------|--------|-------|
| P1 | First pilot customer testimonial integrated into D.2 | Business Owner + react-developer |
| P1 | First 3-5 blog posts published | product-narrative-strategist |
| P2 | Customer logo bar (D.2) -- requires logo permissions from 3+ customers | Business Owner |
| P2 | ROI calculator (deferred D-5) -- data-dependent | react-developer |
| P3 | Competitor comparison pages (deferred D-6) | product-narrative-strategist |

### 12.4 Long-Term (Months 4-12)

| Priority | Action | Owner |
|----------|--------|-------|
| P2 | First case study published (D.2) | product-narrative-strategist |
| P2 | CRM integration (deferred D-7) | backend-api-engineer |
| P3 | A/B testing infrastructure (deferred D-8) -- requires 30 days traffic baseline | react-developer |
| P3 | Knowledge base / help center (deferred D-9) | product-narrative-strategist |
| P3 | Cookie consent / GDPR banner (deferred D-10) -- before EU marketing | react-developer |
| P3 | Advanced ZUI animation polish (deferred D-12) | react-developer |

### 12.5 Deferred Items Register

| ID | Item | Why Deferred | Revisit Trigger |
|----|------|-------------|-----------------|
| D-5 | ROI calculator | Interactive tool, high effort, data-dependent | After pricing validated + first 10 customers |
| D-6 | Competitor comparison pages | Requires competitive intelligence | When competitive positioning is formalized |
| D-7 | CRM integration | Form data goes to Supabase; CRM premature | When CRM is selected and configured |
| D-8 | A/B testing infrastructure | Premature without traffic baseline | After 30 days of traffic data |
| D-9 | Knowledge base / help center | Post-sales content, not marketing | When customer onboarding begins |
| D-10 | Cookie consent / GDPR banner | May be needed for EU visitors | Before EU marketing launch |
| D-11 | Internationalization (i18n) | Single-language launch | If international markets are targeted |
| D-12 | Advanced ZUI animation polish | Current animations work well | When conversion is being optimized |

---

## Appendix A: Validated Assumptions

| ID | Assumption | Status | Source |
|----|-----------|--------|--------|
| A-1 | Gateway boot sequence stays at `/` as site entry point | VALIDATED | User confirmed during discovery |
| A-2 | Capsule -> morph -> detail panel pattern is preserved | VALIDATED | User confirmed |
| A-3 | Districts keep the term "district" in code | VALIDATED | User confirmed |
| A-4 | URL-encoded camera state pattern preserved | VALIDATED | User provided example URL |
| A-8 | 82% of existing code is reusable | VALIDATED | Phase 2 codebase exploration confirmed |
| A-13 | Only verified-implemented features are marketed | VALIDATED | Discovery decision |
| A-14 | Dark HUD aesthetic is appropriate for target audience | VALIDATED | User confirmed |

## Appendix B: Unvalidated Assumptions

| ID | Assumption | Required By | Owner |
|----|-----------|------------|-------|
| A-5 | Per-trip pricing is $450/$750/$1,250 | B.5 | Business Owner |
| A-6 | SOC 2 certification status is unknown | B.6, C.4 | Business Owner |
| A-7 | FERPA compliance status is unknown | B.6, D.1 | Business Owner |
| A-9 | No free trial or freemium tier exists | B.5 | Business Owner |
| A-10 | Legal pages will use template content | B.8 | Business Owner |
| A-11 | GA4 is the analytics platform | C.3 | Business Owner |
| A-12 | safetrekr.com is the production domain | A.3, all OG metadata | Business Owner |
| A-15 | Marketing copy will be drafted as part of this project | B.1 | Business Owner |

## Appendix C: Decision Count by Phase

| Phase | Decision IDs | Count |
|-------|-------------|-------|
| Project-level | AD-1 through AD-6 | 6 |
| Phase A | PAD-01 through PAD-38 | 38 |
| Phase B | PBD-01 through PBD-08 | 8 |
| Phase C | AD-C.1 through AD-C.8 | 8 |
| Phase D | PAD-D.01 through PAD-D.32 | 32 |
| **Total** | | **92** |

## Appendix D: File Impact Summary

| Phase | New Files | Modified Files | Deleted Files | New Routes |
|-------|-----------|---------------|--------------|------------|
| A | ~39 | ~49 | ~60 | 10 (placeholders) |
| B | ~95-110 | ~10-15 | 0 | 10 (content) |
| C | ~25-30 | ~12-15 | 0 | 0 |
| D | ~48-50 | ~6-8 | 0 | ~9 |
| **Total** | **~207-229** | **~77-87** | **~60** | **~19** (unique) |

---

> **Document Version:** 1.0.0
> **Next Review:** After Q-6, Q-11, and Q-12 are resolved by Business Owner
> **Distribution:** Implementation team, Business Owner, all standing pipeline roles
