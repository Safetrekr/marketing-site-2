# Agent Roster — Safetrekr Marketing Site Launch

> **Discovery Date:** 2026-03-02
> **Discovery Depth:** DEEP
> **Source:** combined-recommendations.md

---

## Phase A: Foundation & Infrastructure

| WS | Title | Agent | Rationale |
|----|-------|-------|-----------|
| WS-A.1 | Marketing Route Group + Layout | react-developer | Next.js App Router route groups, responsive header/footer, glass-morphism design system implementation |
| WS-A.2 | District System Remapping + Tarva Cleanup | react-developer | TypeScript type system refactoring, Zustand store updates, component content swap, Tarva artifact removal (30+ files) — all React/TS work |
| WS-A.3 | SEO Infrastructure | world-class-digital-marketing-lead → react-developer | Strategy (marketing-lead): robots.txt policy, sitemap priorities, structured data schemas. Implementation (react-developer): robots.ts, sitemap.ts, metadata helpers |
| WS-A.4 | Form Backend + Contact Page | world-class-backend-api-engineer | Supabase table design, API route with Zod validation, RLS policies, webhook notification setup |
| WS-A.5 | Error Pages | react-developer | Simple page components with Oblivion HUD aesthetic — quick frontend work |

---

## Phase B: P0 Content Pages

| WS | Title | Agent | Rationale |
|----|-------|-------|-----------|
| WS-B.1 | Content Strategy + Copy Drafting | world-class-product-narrative-strategist | Marketing copy in "Calm Authority" voice, value proposition hierarchy, objection handling, headline framework from holistic-overview.md |
| WS-B.2 | Landing Page | react-developer | Hero section, glass-morphism cards, breathing CTA, ambient effects integration, responsive layout |
| WS-B.3 | How It Works Page | react-developer | 4-phase lifecycle visual, analyst review centerpiece, 10-step wizard, protection system overview |
| WS-B.4 | Platform Page | react-developer | Feature grid by domain, four portal overview, capability modules |
| WS-B.5 | Pricing Page | react-developer | Tier cards, value reframe section, FAQ collapsible, pricing data structure |
| WS-B.6 | Security Page | react-developer | Technical security details, compliance display, data architecture section — with content from WS-B.1 |
| WS-B.7 | Solutions Overview Page | react-developer | Five vertical cards, pain points, Safetrekr solutions per vertical |
| WS-B.8 | Legal Pages | react-developer | Markdown rendering, minimal layout — blocked on legal content from business owner |
| WS-B.9 | About / Team Page | react-developer | Glass-morphism leadership cards with expandable bios, agency badge grid, partner grid — reference content exists at `/marketing-site/about.html` with real team data, photos, and credentials |

---

## Phase C: Integration & Polish

| WS | Title | Agent | Rationale |
|----|-------|-------|-----------|
| WS-C.1 | Gateway Integration | react-developer | Update choice-reveal.tsx routing, gateway → marketing page transition |
| WS-C.2 | Mobile + Accessibility Audit | world-class-ui-designer | Cross-device testing, responsive breakpoints, touch target sizing, WCAG 2.1 AA contrast ratios, focus indicators, screen reader compatibility |
| WS-C.3 | Analytics Integration | world-class-digital-marketing-lead | GA4 setup, conversion event definitions, custom event taxonomy, measurement plan |
| WS-C.4 | OG Images & Social Sharing | world-class-ui-designer | Social card design, per-page OG images, Twitter card configuration |

---

## Phase D: Content Depth (Post-Launch)

| WS | Title | Agent | Rationale |
|----|-------|-------|-----------|
| WS-D.1 | Vertical Solution Pages | world-class-product-narrative-strategist + react-developer | Vertical-specific copy (regulatory language, industry pain points) + page implementation |
| WS-D.2 | Social Proof System | react-developer | Testimonial component, logo bar, case study template — frontend components |
| WS-D.3 | ~~About Page~~ | — | **PROMOTED to Phase B (WS-B.9)** — reference content exists with real team data |
| WS-D.4 | Blog Infrastructure | react-developer | Blog listing, post template, MDX or CMS integration |

---

## Standing Pipeline Roles

These agents are present on every project roster. They do not own workstreams but have mandatory touchpoints throughout the pipeline lifecycle.

### software-product-owner

| Phase | Touchpoint | Responsibility |
|-------|-----------|----------------|
| Discovery Phase 4 | Mandatory consultation | Validate priorities, scope boundaries, acceptance criteria quality, user value map |
| Planning (each phase) | Synthesis team member | Requirements coverage, product logic completeness, acceptance criteria review |
| Execution (each phase gate) | Phase gate reviewer | Verify deliverables meet product intent, flag user-facing gaps |
| Execution (deviations) | On-demand | Consulted when deviations affect user-facing behavior or acceptance criteria |

### enterprise-software-project-manager-controller-pmo

| Phase | Touchpoint | Responsibility |
|-------|-----------|----------------|
| Discovery Phase 4 | Recommended consultation | Sequencing realism, resource loading, effort estimates, cross-scope dependencies |
| Planning (each phase) | Synthesis team member | Effort & sequencing assessment, resource conflicts, parallel opportunities, bottleneck analysis |
| Planning (MASTER-PLAN.md) | Leads sections 3-5, 9 | Cross-phase dependency chain, implementation sequence, effort summary, pre-implementation checklist |
| Execution | Escalation path | Invoked when: 3+ moderate deviations accumulate, resource conflicts arise, phase delays, cross-phase renegotiation needed |

### every-time

| Phase | Touchpoint | Responsibility |
|-------|-----------|----------------|
| Discovery Phases 1, 3, 4, 7 | Quality gates | Intent analysis, state assessment validation, decision validation, final validation |
| Planning (each phase) | Phase reviewer | SOW completeness, codebase grounding, cross-phase consistency |
| Planning (final) | Final validation | FINAL-VALIDATION-REPORT.md |
| Execution (each WS) | Pre-flight / post-flight | Verify dependencies met, acceptance criteria passed |
| Execution (each phase gate) | Phase validation | Cross-workstream integration, exit criteria |

---

## Optional Supporting Agents

| Agent | When to Invoke |
|-------|---------------|
| world-class-ux-designer | During WS-C.2 if mobile UX issues are complex; user journey mapping if conversion is below targets post-launch |
| world-class-appsec-security-architect | During WS-B.6 if security page claims need technical verification beyond product review |
| database-architect | During WS-A.4 if Supabase schema design needs optimization or RLS policy review |
| devops-platform-engineer | If @tarva/ui deployment issue (R-11) requires infrastructure solution (Vercel monorepo config, npm publish pipeline) |
| chief-technology-architect | Cross-cutting architecture decisions if Phase A reveals structural issues beyond the district rename |
| world-class-product-strategy-analyst-market | During Phase D if vertical-specific positioning needs competitive intelligence |

---

## Workstream Summary

| Agent | Work Areas | Primary Domain |
|-------|-----------|----------------|
| react-developer | WS-A.1, WS-A.2, WS-A.5, WS-B.2–B.9, WS-C.1, WS-D.2, WS-D.4 | Frontend (React/Next.js) |
| world-class-product-narrative-strategist | WS-B.1, WS-D.1, WS-D.3 | Content / Copy |
| world-class-digital-marketing-lead | WS-A.3, WS-C.3 | SEO / Analytics |
| world-class-backend-api-engineer | WS-A.4 | Backend (Supabase/API) |
| world-class-ui-designer | WS-C.2, WS-C.4 | Visual Design / Responsive |

**Total Workstreams:** 21 (5 Phase A + 9 Phase B + 4 Phase C + 3 Phase D)
**Primary Agents:** 5 specialists
**Standing Roles:** 3 (software-product-owner, enterprise-PM-PMO, every-time)
**Optional Support:** 6 specialists on-demand
