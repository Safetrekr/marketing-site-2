# Phase A: Foundation & Infrastructure -- Phase Overview

> **Phase:** A -- Foundation & Infrastructure
> **Project:** Safetrekr Marketing Site Launch
> **Status:** Draft
> **Created:** 2026-03-02
> **Last Updated:** 2026-03-02
> **Author:** Synthesis Team Lead (CTA + SPO + STW + PMO perspectives)
> **Source Documents:** WS-A.1, WS-A.2, WS-A.3, WS-A.4, WS-A.5, combined-recommendations.md
> **Total Workstreams:** 5
> **Phase Complexity:** Large (L)

---

## 1. Phase Objective

Phase A establishes every infrastructural prerequisite that Phase B content pages depend on. When Phase A is complete, an implementing engineer can create any marketing page by dropping a `page.tsx` into the `(marketing)` route group and immediately inheriting: a responsive header/footer shell, SEO metadata helpers, structured data injection, a branded error experience, and a form submission pipeline connected to Supabase. The spatial ZUI district system will have been remapped from Tarva product identifiers to Safetrekr marketing districts, and all dead Tarva-specific code will have been removed.

**Key reframe from discovery** (combined-recommendations.md): This is a content + infrastructure project, not a rebuild. 82% of the existing codebase is directly reusable. Phase A builds the missing scaffolding; Phase B fills it with content.

**Phase A unblocks:** All 8 content page workstreams in Phase B (WS-B.2 through WS-B.9), gateway integration in Phase C (WS-C.1), and the OG image workstream (WS-C.4).

---

## 2. Workstream Summary Table

| WS ID | Title | Assigned Agent | Size | New Files | Modified Files | Deleted Files | Depends On | Blocks | Resolves |
|-------|-------|---------------|------|-----------|---------------|--------------|-----------|--------|----------|
| A.1 | Marketing Route Group + Layout | `react-developer` | M (4-6 hrs) | 18 | 0 | 0 | None | A.3, A.4, B.2-B.9 | Gap 6, AD-1, AD-4 |
| A.2 | District System Remapping + Tarva Cleanup | `react-developer` | L (8-12 hrs) | ~5 | ~36 | ~60 | None | B.2-B.9, C.1 | Gap 4, AD-3, R-13 |
| A.3 | SEO Infrastructure | `digital-marketing-lead` (strategy) / `react-developer` (impl) | S (2-4 hrs) | 7 | 12 | 0 | A.1 | Phase B pages, C.4 | Gap 5 |
| A.4 | Form Backend + Contact Page | `backend-api-engineer` | M (4-6 hrs) | 7 | 1 | 0 | A.1 (partial -- page composition only) | None directly | Gap 3, AD-5, R-12 (partial) |
| A.5 | Error Pages | `react-developer` | S (1-2 hrs) | 2 | 0 | 0 | None | None | Gap 7 |

**Phase A totals:** ~39 new files, ~49 modified files, ~60 deleted files. Estimated effort: 19-30 hours across all workstreams.

---

## 3. Consolidated Architecture Decisions

The following table consolidates all architecture decisions from the 5 SOWs and cross-references them against the architecture decisions in combined-recommendations.md (AD-1 through AD-6). Decisions are grouped by domain.

### 3.1 Route & Layout Architecture

| ID | Decision | Source | CR Ref | Rationale |
|----|----------|--------|--------|-----------|
| PAD-01 | Use Next.js App Router route group `(marketing)` for all content pages; gateway stays at `/`, ZUI at `/launch` | A.1-D1 | AD-1 | Groups routes under shared layout without polluting URL paths. Gateway and launch routes remain independent. |
| PAD-02 | Marketing layout is a server component composing `MarketingHeader` + `{children}` + `MarketingFooter` | A.1-D2 | AD-4 | Header needs `useState`/`usePathname` (client). Footer is pure markup (server). Layout itself is server component. |
| PAD-03 | Components in `src/components/marketing/` (NOT `src/components/layout/`) | A.1-D12 | **Diverges from CR** | CR line 393 suggests `src/components/layout/`. SOW A.1 chose `marketing/` for consistency with existing directory naming (`districts/`, `spatial/`, `ambient/`). **SOW takes precedence.** See Section 5 (Conflicts). |
| PAD-04 | Navigation config in `src/lib/config/marketing-nav.ts`, types in `src/lib/interfaces/marketing-nav.ts` | A.1-D3 | -- | Follows codebase convention: types in `interfaces/`, config as separate concern. Single source of truth for header, mobile nav, and footer. |
| PAD-05 | Skip-to-content link in marketing layout only (not root layout) | A.1-D9 | -- | Only marketing pages need it. Gateway is single-screen; launch page has ZUI navigation. |
| PAD-06 | `MarketingNavItem` includes optional `children` field proactively | A.1-D8 | -- | Phase D verticals may need dropdown sub-navigation. Adding the field now prevents a type migration later. |

### 3.2 Visual Identity

| ID | Decision | Source | CR Ref | Rationale |
|----|----------|--------|--------|-----------|
| PAD-07 | Glass-morphism content surfaces: `bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]` | A.1-D6, A.4, A.5-D5 | AD-2 | Matches `detail-panel.tsx` exactly. Canonical glass surface across the entire site. |
| PAD-08 | Header chrome uses lighter glass: `bg-white/[0.04]` at rest, `bg-[var(--color-void)]/80` when scrolled | A.1-D7 | -- | Navigation chrome should be subtler than content panels. Opacity increases on scroll for readability. |
| PAD-09 | Breathing glow (`mkt-cta-breathe`) on primary CTA only -- one per page | A.1-D11 | AD-2 | Keeps the effect rare and meaningful. |
| PAD-10 | CSS class prefix `mkt-` for marketing domain | A.1-D5 | -- | Avoids collision with `ambient-*`, `gateway-*`, and existing atrium classes. |
| PAD-11 | Error page differentiation: green (`text-ember-bright`) for 404, red (`text-error-glow`) for runtime errors | A.5-D4 | -- | 404 is "lost signal" (informational). Runtime error is "system fault" (problem). |
| PAD-12 | No motion/react on error pages | A.5-D3 | -- | Error pages load fast with minimal JS. Glass-morphism provides visual identity without animation dependencies. |
| PAD-13 | `rounded-[32px]` card radius matches `detail-panel.tsx` | A.5-D6 | -- | Visual consistency across the site. |

### 3.3 District System

| ID | Decision | Source | CR Ref | Rationale |
|----|----------|--------|--------|-----------|
| PAD-14 | Remap `DistrictId` from 6 Tarva IDs to 6 marketing IDs: `how-it-works`, `who-its-for`, `platform`, `security`, `pricing`, `get-started` | A.2 | AD-3, Gap 4 | Preserves the capsule ring and morph system; only data model changes. |
| PAD-15 | Keep `HealthState` and `HEALTH_STATE_MAP` for ambient decorative use | A.2-D1 | -- | Removing would require rewriting 12+ ambient components with no user-facing benefit. |
| PAD-16 | Single `MarketingScene` replaces 6 Tarva-specific district view scenes | A.2-D2 | -- | Marketing districts do not need per-district custom scenes. Shared decorative background with color tinting suffices. |
| PAD-17 | Delete (not feature-gate) Tarva station components and Evidence Ledger | A.2-D3, D4 | -- | Deeply coupled to Tarva data models with zero reuse value. Git history preserves everything. |
| PAD-18 | Preserve AI subsystem (~29 files) without modification | A.2-D8 | -- | AI files use `DistrictId` as a type parameter, not string literals. Separate refactoring concern. |
| PAD-19 | Preserve `shared-scene-primitives.tsx` for reuse by `MarketingScene` | A.2-D9 | -- | Exports reusable animation primitives (`GhostText`, data streams) useful for ambient decoration. |
| PAD-20 | Remove `port` field from `DistrictMeta`; keep `sparklineData` as decorative | A.2-D5, D7 | -- | No localhost dev servers in marketing context. Sparkline contributes to mission-control aesthetic. |

### 3.4 SEO Infrastructure

| ID | Decision | Source | CR Ref | Rationale |
|----|----------|--------|--------|-----------|
| PAD-21 | Zero third-party SEO packages -- use Next.js 16 native conventions exclusively | A.3-D1 | Gap 5 | App Router provides `robots.ts`, `sitemap.ts`, metadata exports. Adding `next-seo` would duplicate built-in functionality. |
| PAD-22 | `SITE_CONFIG` constant with `NEXT_PUBLIC_SITE_URL` env var override (fallback: `https://www.safetrekr.com`) | A.3-D2 | -- | Domain unresolved (Q-8). Single-file change when resolved. |
| PAD-23 | `generatePageMetadata()` helper enforces consistent title format, OG, and Twitter card config | A.3-D3 | -- | One-line call per page. Prevents bugs where developer forgets OG tag or uses wrong format. |
| PAD-24 | Organization JSON-LD injected via marketing layout (not per-page) | A.3-D4 | -- | Identical across all marketing pages; layout injection avoids 10x duplication. |
| PAD-25 | Static default OG image now (`public/og/default.png`); dynamic per-page images deferred to WS-C.4 | A.3-D6 | -- | Unblocks Phase B immediately. Dynamic generation better scoped as Phase C polish. |
| PAD-26 | Disallow `/launch` in robots.txt (client-rendered, no crawlable content); exclude gateway from sitemap but allow in robots.txt | A.3-D7, D8 | -- | ZUI provides no crawlable text. Gateway exclusion from sitemap avoids misleading search engines while preserving crawl flexibility. |
| PAD-27 | Title tag separator: pipe `|` (not dash `--`) | A.3-D9 | -- | Industry standard for SaaS. More compact in SERPs. |

### 3.5 Form Backend & Contact Page

| ID | Decision | Source | CR Ref | Rationale |
|----|----------|--------|--------|-----------|
| PAD-28 | UUID v4 (`gen_random_uuid()`) for `demo_requests.id` | A.4-D1 | -- | Low-volume table. `created_at` index handles ordering. Simpler than UUIDv7. |
| PAD-29 | `status` column for basic lead-lifecycle tracking (`new`, `contacted`, `qualified`, `closed`) | A.4-D2 | R-12 | Enables operational workflow without CRM. Supabase Studio is admin UI for MVP. |
| PAD-30 | Append-only RLS: INSERT for anon, SELECT+UPDATE for authenticated, no DELETE | A.4-D3 | -- | Audit trail preservation. GDPR deletion via service role key. |
| PAD-31 | Shared Zod 4 schema in `src/lib/schemas/contact.ts` (new `schemas/` directory) | A.4-D5 | AD-5 | Client and server share identical validation. Establishes pattern for future forms. |
| PAD-32 | In-memory rate limiter (5 req/15min per IP) -- not Redis | A.4-D4 | -- | Single-instance deployment. Upgrading to Redis trivial if needed. |
| PAD-33 | Honeypot hidden field + no CSRF token (JSON API, no session cookie) | A.4-D11, D12 | -- | Zero UX friction. `Content-Type: application/json` cannot be sent via HTML form. |
| PAD-34 | Database CHECK constraints mirror Zod schema limits (defense-in-depth) | A.4-D13 | -- | Even if API route bypassed, database enforces constraints. |
| PAD-35 | Client `fetch()` to API route (not Server Action) | A.4-D10 | -- | Testable via curl. Server Actions are optional enhancement for implementing developer. |

### 3.6 Error Handling

| ID | Decision | Source | CR Ref | Rationale |
|----|----------|--------|--------|-----------|
| PAD-36 | Server component for `not-found.tsx`, client component for `error.tsx` | A.5-D1 | Gap 7 | Next.js requires `error.tsx` as client component (uses `reset()`). 404 has no interactivity beyond a link. |
| PAD-37 | No `global-error.tsx` at launch | A.5-D2 | -- | Root layout is minimal (font loading + providers). Adding later is trivial. |
| PAD-38 | `error.digest` not displayed to users | A.5-D8 | -- | Server-side hash for internal debugging only. Exposing it leaks implementation details. |

---

## 4. File Impact Matrix

### 4.1 New Files by Workstream

| WS | Directory | Key New Files | Count |
|----|-----------|--------------|-------|
| A.1 | `src/app/(marketing)/` | `layout.tsx`, 10 placeholder `page.tsx` files | 11 |
| A.1 | `src/components/marketing/` | `marketing-header.tsx`, `marketing-mobile-nav.tsx`, `marketing-footer.tsx` | 3 |
| A.1 | `src/lib/config/`, `src/lib/interfaces/`, `src/styles/` | `marketing-nav.ts`, `marketing-nav.ts` (types), `marketing.css` | 3 |
| A.1 | `public/images/logos/` | Logo SVGs (if not already present) | 1 |
| A.2 | `src/components/district-view/scenes/` | `marketing-scene.tsx` | 1 |
| A.2 | Multiple locations | Updated content files (counted as modified) | ~4 |
| A.3 | `src/app/` | `robots.ts`, `sitemap.ts` | 2 |
| A.3 | `src/lib/config/`, `src/lib/seo/`, `src/components/seo/` | `site.ts`, `metadata.ts`, `structured-data.ts`, `json-ld.tsx` | 4 |
| A.3 | `public/og/` | `default.png` | 1 |
| A.4 | `supabase/migrations/` | `003_demo_requests.sql` | 1 |
| A.4 | `src/lib/schemas/` | `contact.ts` | 1 |
| A.4 | `src/app/api/contact/` | `route.ts` | 1 |
| A.4 | `src/app/(marketing)/contact/` | `page.tsx` (replaces A.1 placeholder) | 0 (mod) |
| A.4 | `src/components/marketing/` | `contact-form.tsx` | 1 |
| A.4 | `supabase/functions/notify-demo-request/` | `index.ts` (partial, blocked on Q-13) | 1 |
| A.4 | `src/lib/supabase/` | `types.ts` (modify) | 0 (mod) |
| A.5 | `src/app/` | `not-found.tsx`, `error.tsx` | 2 |

### 4.2 Deleted Files (WS-A.2 Only)

| Category | Count | Examples |
|----------|-------|---------|
| Tarva type libraries | 6 | `agent-builder-types.ts`, `tarva-chat-types.ts`, etc. |
| Evidence Ledger components + CSS + types | 11 | `src/components/evidence-ledger/` directory |
| Tarva API routes | 3 | `src/app/api/districts/{agent-builder,tarva-chat,project-room}/route.ts` |
| Tarva district hooks | 3 | `use-agent-builder-district.ts`, etc. |
| District view scenes | 6 | `agent-builder-scene.tsx` through `tarva-code-scene.tsx` |
| Station components | ~27 | 6 subdirectories in `src/components/stations/` |
| Evidence Ledger support hooks | 2 | `use-faceted-filter.ts`, `use-receipt-timeline.ts` |
| Evidence Ledger type file | 1 | `src/lib/evidence-ledger-types.ts` |
| **Total deletions** | **~59** | |

### 4.3 Modified Files

| WS | File | Change |
|----|------|--------|
| A.2 | `src/lib/interfaces/district.ts` | `DistrictId` union type, `DistrictMeta`, `CapsuleTelemetry` |
| A.2 | `src/stores/districts.store.ts` | `MARKETING_CAPSULE_DATA`, seed values, enrichment keys |
| A.2 | `src/components/districts/district-content.tsx` | Marketing preview cards, `DISTRICT_CONFIG` |
| A.2 | `src/lib/spatial-actions.ts` | District ID references |
| A.2 | `src/lib/constants.ts` | `APP_NAME` to `'Safetrekr'`, `DISTRICT_CODES` |
| A.2 | `src/app/launch/page.tsx` | Remove Evidence Ledger, update imports |
| A.2 | `src/lib/command-registry.ts` | Remove evidence-ledger command |
| A.2 | `src/components/spatial/CommandPalette.tsx` | Remove evidence-ledger icon mapping |
| A.2 | 6 ambient component files | Hardcoded district ID references |
| A.2 | `src/components/auth/attractor-glyph.tsx` | Rename `TarvaStarIcon` import |
| A.2 | `src/components/districts/hub-center-glyph.tsx` | Rename `TarvaStarIcon` export |
| A.2 | `src/lib/template-selection/conditional-templates.ts` | Remove evidence-ledger reference |
| A.2 | `src/lib/ai/exception-rules.ts`, `recovery-templates.ts` | Remove evidence-ledger references |
| A.2 | `src/stores/enrichment.store.ts` | Update `SEED_VALUES` keys |
| A.2 | ~15 additional files (ambient, connection paths, ticker, etc.) | District ID string literal updates |
| A.3 | `src/app/layout.tsx` | `title.template`, `metadataBase`, OG/Twitter defaults |
| A.3 | `src/app/(marketing)/layout.tsx` | Organization JSON-LD injection |
| A.3 | 10 marketing `page.tsx` files | `generatePageMetadata()` calls, BreadcrumbList JSON-LD |
| A.4 | `src/lib/supabase/types.ts` | `DemoRequestRow`, `DemoRequestInsert`, `DemoRequestUpdate` |
| A.4 | `src/app/(marketing)/contact/page.tsx` | Replace A.1 placeholder with full contact page |

---

## 5. Cross-Workstream Conflicts & Divergences

### Conflict 1: Component Directory Path (ACTIVE DIVERGENCE)

| Aspect | combined-recommendations.md | WS-A.1 SOW |
|--------|---------------------------|------------|
| Location | `src/components/layout/marketing-header.tsx` (CR line 393) | `src/components/marketing/marketing-header.tsx` (A.1-D12) |
| Rationale | Not provided in CR | "The `layout/` directory does not exist and 'marketing' is more descriptive of the component domain. Consistent with `src/components/districts/`, `src/components/spatial/`, `src/components/ambient/` naming convention." |

**Resolution:** WS-A.1 SOW takes precedence. The rationale is sound -- the existing codebase uses domain-specific directory names, not generic ones. The combined-recommendations.md was written before SOW-level analysis. All 5 SOWs and all downstream references must use `src/components/marketing/`.

### Conflict 2: Security Page Metadata vs. Unverified Certifications (LATENT RISK)

WS-A.3 pre-drafts the security page metadata description as: _"SOC 2, encryption at rest and in transit, role-based access, and audit logging."_ [A.3, Section 4.9, Security metadata]

Combined-recommendations.md Gap 10 states: _"Do NOT claim SOC 2 unless certification is confirmed by business owner."_ [CR, Gap 10]

**Resolution:** The A.3 metadata description is a draft that must be updated when Q-3 (SOC 2 status) is resolved. If SOC 2 is unverified, the description must be revised to remove the claim before the security page ships in Phase B. Flag for Phase B implementer.

### Non-Conflict: Placeholder Contact Page Lifecycle (SEQUENTIAL DEPENDENCY)

WS-A.1 creates a placeholder `page.tsx` at `src/app/(marketing)/contact/page.tsx`. WS-A.4 explicitly replaces this file with the full contact page implementation. This is by design -- A.1 creates the route structure with minimal content; A.4 provides the real implementation. No conflict, but the build order must respect this: A.1 ships first, A.4 overwrites the placeholder.

### Non-Conflict: A.3 Modifies A.1 Placeholder Pages (SEQUENTIAL DEPENDENCY)

WS-A.3 modifies all 10 placeholder pages created by A.1 to add `generatePageMetadata()` calls and BreadcrumbList JSON-LD. This is sequential: A.1 creates the pages, A.3 enhances them. If A.1 and A.3 are developed in parallel, A.3 must rebase onto A.1's output before merging.

---

## 6. Consolidated Open Questions

Open questions from all 5 SOWs and combined-recommendations.md are deduplicated and grouped below. Where multiple SOWs reference the same underlying question, the canonical reference is listed with aliases.

### 6.1 Business Owner Decisions (Blocking)

| ID | Question | Impact | SOW Sources | Needed By |
|----|----------|--------|------------|-----------|
| OQ-01 | What is the production domain? `safetrekr.com`, `www.safetrekr.com`, or other? | Every canonical URL, OG image URL, sitemap, Organization schema | CR-Q8, A.3-OQ1 | Before production deployment |
| OQ-02 | Are the per-trip prices confirmed? T1: $450, T2: $750, T3: $1,250? | Pricing page content, structured data Product schema | CR-Q1 | Before WS-B.5 |
| OQ-03 | What is the SOC 2 certification status? | Security page claims, A.3 metadata description | CR-Q3 | Before WS-B.6 |
| OQ-04 | Is FERPA compliance verified by legal? | Security page claims | CR-Q4 | Before WS-B.6 |
| OQ-05 | Legal pages: template service or custom attorney? | Timeline and cost for WS-B.8 | CR-Q5 | Before WS-B.8 |
| OQ-06 | Who writes marketing copy? In-house, external, or AI-assisted? | Critical path bottleneck for all of Phase B | CR-Q6 | Before Phase B |
| OQ-07 | Who receives demo request notification emails? What is the response SLA? | Notification function, success message copy, "What to Expect" panel | CR-Q13, A.4-Q13 | Before A.4 notification deployment |
| OQ-08 | @tarva/ui deployment strategy? npm package or monorepo config? | Production deployment blocker for ALL phases | CR-Q12 | Before any deployment |
| OQ-09 | Is `team@safetrekr.com` the correct contact email? | Contact page fallback, Organization schema `contactPoint` | A.4-QA4.2, A.3-OQ4 | Before A.4 ships |
| OQ-10 | GA4 property ID: existing or create new? | Analytics setup in WS-C.3 | CR-Q9 | Before WS-C.3 |

### 6.2 Product Decisions (Non-Blocking for Phase A, Required for Phase B/C)

| ID | Question | Impact | SOW Sources | Needed By |
|----|----------|--------|------------|-----------|
| OQ-11 | Gateway fate: keep at `/` or move landing page to `/`? | Sitemap, canonical URLs, breadcrumb schemas, CTA routing | CR-Q11, A.3-OQ2, A.1-OQ3 | Before Phase B finalization |
| OQ-12 | Should "Schedule a Briefing" CTA link to `/contact` or open external scheduling tool (Calendly)? | CTA `href` value, external link handling | A.1-OQ1 | Before A.4 implementation |
| OQ-13 | Should visitors skip the gateway and access marketing pages via direct URL? | UX flow, SEO implications | CR-Q10 | Before WS-C.1 |
| OQ-14 | Is there a free trial or freemium offer? | Pricing page content | CR-Q2 | Before WS-B.5 |
| OQ-15 | Any pilot customers available for testimonials? | Social proof (landing page, about page) | CR-Q7 | Before Phase D |

### 6.3 Engineering Decisions (Resolve During Implementation)

| ID | Question | Impact | SOW Sources | Default If Unresolved |
|----|----------|--------|------------|----------------------|
| OQ-16 | Should station framework files in root `stations/` be preserved? | Determines delete scope in A.2 | A.2-Q1 | Preserve root framework files; delete only 6 Tarva subdirectories |
| OQ-17 | Rename `TarvaStarIcon` to `SafetrekrStarIcon` or generic `HubStarIcon`? | Brand naming consistency | A.2-Q2 | `HubStarIcon` (brand-neutral) |
| OQ-18 | Are ambient connection path labels decorative or semantic? | Content team input needed if semantic | A.2-Q3 | Treat as decorative; use generic labels |
| OQ-19 | Should districts store accept live telemetry or simplify to static data? | Risk of breaking ambient components | A.2-Q4 | Defer simplification; enrichment cycle populates decorative seed data |
| OQ-20 | "Get Started" amber accent scope: capsule only, or also health bar + CTA? | Visual design | A.2-Q5 | Apply to capsule glow, health bar, and CTA button; keep sparkline consistent |
| OQ-21 | Update `Tarva Launch` strings in AI prompt files during A.2 or defer? | ~8 AI files with backend-only strings | A.2-Q6 | Defer to separate AI subsystem cleanup |
| OQ-22 | Should header be transparent at page top, gaining glass only on scroll? | Visual refinement | A.1-OQ4 | Glass always present; opacity increases on scroll |
| OQ-23 | Social media profiles created with `safetrekr` handles? | Organization schema `sameAs` | A.3-OQ3 | Omit non-existent profile URLs from schema |
| OQ-24 | Should pricing FAQ content be drafted in A.3 or deferred to WS-B.5? | FAQPage schema needs content | A.3-OQ6 | A.3 provides the `faqPageSchema` helper; WS-B.5 provides FAQ content |
| OQ-25 | Should the form include "How did you hear about us?" field? | Marketing attribution | A.4-QA4.1 | Omit at launch; add when marketing channels are established |
| OQ-26 | Email provider for notification: Resend, SendGrid, or other? | Edge Function implementation | A.4-QA4.3 | Recommend Resend (simple API, generous free tier) |
| OQ-27 | Should duplicate email submissions be detected/warned? | UX and data quality | A.4-QA4.4 | Allow duplicates; email index supports future detection query |
| OQ-28 | Should submit button CTA text vary by `sourcePage`? | UX refinement for embedded forms | A.4-QA4.5 | No variation at launch; `ctaLabel` prop available for future use |
| OQ-29 | 404 page decorative element (radar sweep SVG)? | Visual polish only | A.5-OQ1 | Ship without; add in polish pass |
| OQ-30 | Log `error.digest` to browser console for developer debugging? | Dev experience | A.5-OQ2 | No logging; defer to observability instrumentation |
| OQ-31 | "Report this issue" link on error page? | User trust | A.5-OQ3 | Omit; add when feedback mechanism exists |
| OQ-32 | Should pricing Product schema include `priceValidUntil` dates? | Rich pricing snippets in SERPs | A.3-OQ5 | Omit; safer if pricing is stable |
| OQ-33 | Mobile hamburger sub-navigation for future verticals? | Component architecture | A.1-OQ5 | `children` type exists (PAD-06); component behavior deferred to WS-D.1 |
| OQ-34 | Footer "Resources" column: include "Documentation" link? | Footer config | A.1-OQ2 | "Mission Control" sufficient for launch |

---

## 7. Consolidated Risk Register

Risks from all 5 SOWs and combined-recommendations.md are consolidated, deduplicated, and re-scored.

### 7.1 Critical Risks (Likelihood x Impact = Critical)

| ID | Risk | L | I | Source | Mitigation |
|----|------|---|---|--------|------------|
| PR-01 | **@tarva/ui workspace dependency** -- `package.json` links to `../../tarva-org/tarva-ui-library` via workspace protocol. Fails in production deployment. | HIGH | HIGH | CR-R11 | Verify deployment strategy before build. Options: publish to npm, vendor into project, or configure Vercel monorepo root. **Blocking for ALL phases.** |
| PR-02 | **No marketing copy exists** -- content is the critical path blocker for all Phase B pages | HIGH | HIGH | CR-R01 | WS-B.1 starts immediately in parallel with Phase A. Use holistic-overview.md messaging framework as starting drafts. |
| PR-03 | **Legal pages missing at launch** -- cannot launch without Terms of Service and Privacy Policy | HIGH | HIGH | CR-R04 | Flag to business owner immediately. Use template service if custom legal review not ready. |

### 7.2 High Risks

| ID | Risk | L | I | Source | Mitigation |
|----|------|---|---|--------|------------|
| PR-04 | **TypeScript cascade errors** -- changing `DistrictId` triggers type errors in 36+ files simultaneously | HIGH | MED | A.2-R1 | Atomic commit. TypeScript "find all references" first. Fix incrementally by file group (types > stores > components > ambient). `pnpm typecheck` after each group. |
| PR-05 | **Enrichment cycle crash** -- if `SEED_VALUES` keys don't match new `DistrictId` union, store crashes on init | HIGH | HIGH | A.2-R3 | Update `SEED_VALUES` in same commit as `DistrictId` type change. Add `satisfies Record<DistrictId, ...>` assertion. |
| PR-06 | **Downstream blocker cascade** -- A.2 blocks WS-B.2 through B.9 and WS-C.1; any delay cascades to majority of Phase B and C | MED | HIGH | A.2-R6 | Prioritize as first workstream in Phase A. Keep scope tight: placeholder copy acceptable. |
| PR-07 | **Compliance certifications unverified** -- SOC 2, FERPA status unknown | MED | HIGH | CR-R05 | Security page structured to separate "Architecture" (publishable) from "Certifications" (needs verification). Ship architecture first. |
| PR-08 | **Accessibility compliance risk** -- dark HUD at 40% opacity text floor, green-on-dark scheme, glass-morphism | MED | HIGH | CR-R14 | A.1-R8 documents contrast ratios: `ember-bright` on `void` = 6.8:1 (passes AA). `text-tertiary` = 3.5:1 (fails). Avoid tertiary text for navigation. Full audit in WS-C.2. |
| PR-09 | **Dark HUD aesthetic resonance** -- target audience (40-60yr security directors) may not respond to dark UI | MED | HIGH | CR-R02 | User validated aesthetic ("it looks beautiful"). Holistic overview provides rationale. Validate with user testing post-launch. 40% opacity floor mitigates usability. |
| PR-10 | **Pricing not confirmed** -- working values from product review, not business owner | MED | MED | CR-R07 | Use product review pricing as working values. Explicit business owner confirmation required before pricing page goes live. |

### 7.3 Medium Risks

| ID | Risk | L | I | Source | Mitigation |
|----|------|---|---|--------|------------|
| PR-11 | **Glass-morphism performance on low-end mobile** | MED | MED | A.1-R1, A.4-RA4.6 | `@supports (backdrop-filter: blur(16px))` conditional in CSS. Fallback to `bg-[var(--color-void)]/90` solid dark. |
| PR-12 | **Ambient component visual regression** during A.2 district ID update | MED | LOW | A.2-R2 | Visual inspection at Z0, Z1, Z2 zoom levels. Screenshot before/after comparison. |
| PR-13 | **Dead import references** after A.2 file deletions (~60 files) | MED | LOW | A.2-R4 | Run `pnpm build` after all deletions. Unresolved imports surface as build errors. Consumer list documented in A.2 SOW Section 4.13. |
| PR-14 | **OG image 404** if `public/og/default.png` not created before metadata changes merge | MED | HIGH | A.3-R3 | A.3-AC9 and AC10 verify availability. Static image must be committed before metadata changes. |
| PR-15 | **Notification not configured at deploy** (Q-13 unresolved) | MED | MED | A.4-RA4.1 | Form submissions persist to Supabase regardless. Team polls Supabase Studio manually until notification is configured. |
| PR-16 | **No social proof reduces conversion 40-60%** | HIGH | MED | CR-R06 | Placeholder structure in landing page. Begin pilot customer outreach immediately (business owner action). |
| PR-17 | **`metadataBase` breaks OG image URLs in development** -- `NEXT_PUBLIC_SITE_URL` not set locally | MED | LOW | A.3-R5 | Fallback to `https://www.safetrekr.com`. Social card testing via Vercel preview deployment. |
| PR-18 | **Contact form operational workflow undefined** | HIGH | MED | CR-R12, A.4-R12 | `status` column added. Supabase Studio is MVP admin. Notification specced but blocked on Q-13. |

### 7.4 Low Risks

| ID | Risk | L | I | Source | Mitigation |
|----|------|---|---|--------|------------|
| PR-19 | In-memory rate limiter resets on server restart | LOW | LOW | A.4-RA4.2 | Acceptable for low-volume contact form. Upgrade to Redis if needed. |
| PR-20 | Focus trap edge cases in mobile nav | MED | LOW | A.1-R3 | Battle-tested approach; `focus-trap-react` available as targeted replacement. |
| PR-21 | `title.template` conflicts with non-marketing pages | LOW | MED | A.3-R2 | Non-marketing pages use `title: { absolute: '...' }` to bypass template. |
| PR-22 | AI subsystem latent dependency on old district IDs in prompt strings | LOW | MED | A.2-R7 | Grep `src/lib/ai/` for old literals after rename. Fix found occurrences. Full refactor deferred. |
| PR-23 | District view morph regression during A.2 | LOW | HIGH | A.2-R5 | Morph system treats `DistrictId` as opaque string. Test all 6 districts through full morph cycle. |
| PR-24 | Form spam bypasses honeypot + rate limiting | MED | LOW | A.4-RA4.3 | Layered defense. Add Cloudflare Turnstile if sophisticated spam observed post-launch. |
| PR-25 | Scroll-based header opacity jank | LOW | LOW | A.1-R4 | Passive scroll listener, composited CSS properties only. |
| PR-26 | `error.tsx` not catching server component errors | N/A | LOW | A.5-R3 | Expected Next.js behavior; documented. Server-side data fetching errors surface differently. |
| PR-27 | `backdrop-blur` on older browsers | LOW | LOW | A.5-R1 | `bg-white/[0.06]` provides fallback. Target audience uses modern browsers. |
| PR-28 | Sitemap `lastModified` uses `new Date()` (changes every build) | LOW | LOW | A.3-R7 | Acceptable for launch. Search engines treat as hint. Git-based dates can be added post-launch. |

---

## 8. Acceptance Criteria Cross-Reference

### 8.1 Criteria Count by Workstream

| WS | AC Count | Categories |
|----|----------|-----------|
| A.1 | 27 | Route structure (2), Header visual (5), Mobile nav (6), Footer (3), Accessibility (6), Build integrity (3), Assets (2) |
| A.2 | 19 | Build integrity (3), String cleanup (2), Type system (2), Visual (6), File deletion (2), Ambient (2), Command palette (1), Code quality (1) |
| A.3 | 24 | Robots/Sitemap (3), Metadata (5), Canonical (1), OG/Social (4), Structured data (5), OG image (1), Build integrity (3), External validation (1), Metadata helper (1) |
| A.4 | 46 | Database (6), Types (3), Zod schema (6), API route (8), Contact page (7), Form component (13), Build integrity (3) |
| A.5 | 10 | Functional (5), Build integrity (1), Accessibility (2), Responsive (1), Visual (1) |
| **Total** | **126** | |

### 8.2 Flagged Acceptance Criteria

The following ACs have testability concerns or require external dependencies:

| AC | WS | Issue | Recommendation |
|----|----|-------|----------------|
| AC-22 | A.3 | "Google Rich Results Test validates..." -- requires deployed preview URL, not testable in local dev | Gate on Vercel preview deployment. Cannot be verified during local development. Add as a pre-merge check on the PR, not a local development gate. |
| AC-10 | A.3 | "Default OG image under 200 KB" -- requires design asset creation | Depends on the OG image being created (design work). Flag as blocked until image asset is provided. Implementer can create a placeholder and verify size constraint. |
| AC-18 | A.4 | "Returns 429 after 5 submissions from same IP in 15 minutes" -- timing-sensitive | Use the curl test script in A.4 Appendix B. The 6-request loop should produce five 201s and one 429. If test environment uses load balancer or proxy, IP detection may behave differently. Test against direct dev server. |
| AC-22 | A.3 | Duplicate ID with A.3's own AC-22 numbering | No action needed -- IDs are scoped per-SOW. The phase overview uses workstream prefix for disambiguation. |

### 8.3 Requirements Coverage Verification

Cross-reference of combined-recommendations.md requirements against Phase A SOW coverage:

| CR Requirement | Type | Covered By | Status |
|---------------|------|-----------|--------|
| Gap 3: No Form Backend for Demo Requests | Gap | WS-A.4 | Fully addressed |
| Gap 4: District System Contains Tarva Branding | Gap | WS-A.2 | Fully addressed |
| Gap 5: No SEO Infrastructure | Gap | WS-A.3 | Fully addressed |
| Gap 6: No Mobile Navigation | Gap | WS-A.1 | Fully addressed |
| Gap 7: No Error Pages | Gap | WS-A.5 | Fully addressed |
| AD-1: Route Structure (Marketing Route Group) | Arch Decision | WS-A.1 (PAD-01) | Fully addressed |
| AD-2: Visual Pattern (Oblivion HUD Content Pages) | Arch Decision | A.1 (PAD-07-10), A.4, A.5 | Fully addressed across all SOWs |
| AD-3: District Content Morphing | Arch Decision | WS-A.2 (PAD-14) | Fully addressed |
| AD-4: Marketing Header/Footer | Arch Decision | WS-A.1 (PAD-02, PAD-03) | Fully addressed |
| AD-5: Form Validation Pattern (Zod 4) | Arch Decision | WS-A.4 (PAD-31) | Fully addressed |
| AD-6: Analytics Integration (GA4) | Arch Decision | -- | **Not in Phase A scope.** Addressed by WS-C.3 (Phase C). Correct -- analytics is integration/polish work. |
| R-12: Contact form operational workflow | Risk | WS-A.4 (PAD-29) | Partially addressed (status column added, notification blocked on Q-13) |
| R-13: Tarva-specific code artifacts | Risk | WS-A.2 | Fully addressed |
| R-14: Accessibility compliance risk | Risk | A.1-R8 documents contrast ratios | Partially addressed; full audit in WS-C.2 |

**Gaps 1, 2, 8, 9, 10 are Phase B/C concerns** and are correctly not addressed in Phase A SOWs.

---

## 9. PMO Sequencing & Critical Path Analysis

### 9.1 Dependency Graph

```
                    +---------+
                    |  A.5    |  (no deps, blocks nothing)
                    | Error   |  S: 1-2 hrs
                    | Pages   |
                    +---------+

+---------+         +---------+         +------------------+
|  A.1    | ------> |  A.3    | ------> | Phase B pages    |
| Route   |         |  SEO    |         | (metadata ready) |
| Group + |         | Infra   |         +------------------+
| Layout  |         | S: 2-4h |
| M: 4-6h | ------> +---------+
+---------+    |
               |    +---------+
               +--> |  A.4    |
                    | Form +  |
                    | Contact |
                    | M: 4-6h |
                    +---------+
                    (steps 1-4 can
                     start without A.1)

+---------+         +------------------+
|  A.2    | ------> | Phase B pages    |
| District|         | (district system |
| Remap + |         |  remapped)       |
| Cleanup |         +------------------+
| L: 8-12h|
+---------+
```

### 9.2 Critical Path

The critical path through Phase A to Phase B is:

**Path 1 (longest):** A.1 (4-6h) --> A.3 (2-4h) --> Phase B pages (metadata + route group ready)

**Total critical path duration:** 6-10 hours of sequential work.

**Path 2 (parallel, potentially longer):** A.2 (8-12h) --> Phase B pages (district system remapped)

A.2 is the largest single workstream, but it runs in parallel with A.1. If a single developer handles both sequentially, A.2 becomes the bottleneck.

### 9.3 Recommended Execution Order

**Sprint 1 (Parallel Track A + B):**

| Track | Day 1 | Day 2 | Day 3 |
|-------|-------|-------|-------|
| Track A (Developer 1) | A.1: Route group + layout (4-6h) | A.3: SEO infrastructure (2-4h) | A.4: Form backend steps 1-4 (3h) |
| Track B (Developer 2) | A.2: District remapping (4h -- types + stores) | A.2: Cleanup + deletions (4-6h) | A.2: Visual verification + A.5 (2-4h) |

**Key sequencing rules:**

1. **A.1 must complete before A.3 starts** -- A.3 needs the route structure and placeholder pages to exist.
2. **A.1 must complete before A.4 step 6** (page composition) -- but A.4 steps 1-4 (database, types, schema, API route) can start immediately in parallel with A.1.
3. **A.2 and A.1 are fully independent** -- they can run in parallel with zero coordination.
4. **A.5 has no dependencies** -- can be done at any time, even by a third developer. At 1-2 hours, it is a good end-of-day task.
5. **A.3 and A.4 share a dependency on A.1** but are independent of each other -- they can run in parallel after A.1 completes.

**Optimal single-developer ordering (if only one developer available):**

```
A.5 (1-2h) --> A.1 (4-6h) --> A.2 (8-12h) --> A.3 (2-4h) --> A.4 (4-6h)
```

Start with A.5 (smallest, no deps, quick win). Then A.1 (unblocks most downstream work). Then A.2 (largest, independent). Then A.3 and A.4 (both depend on A.1).

**Alternative single-developer fast-track (prioritize Phase B unblocking):**

```
A.1 (4-6h) --> A.3 (2-4h) --> A.4 steps 1-5 (4h) --> A.2 (8-12h) --> A.5 (1-2h) --> A.4 step 6 (1h)
```

This variant ships the marketing layout + SEO infrastructure + form backend first, enabling Phase B content work to begin on pages other than those that reference districts. A.2 then runs, and A.5 fills a gap.

### 9.4 Phase A Exit Criteria

Phase A is complete when ALL of the following are true:

| # | Exit Criterion | Verification |
|---|---------------|-------------|
| 1 | All 10 marketing routes render inside the `(marketing)` layout with header + footer visible | Manual navigation test |
| 2 | Gateway (`/`) and Launch (`/launch`) render WITHOUT marketing header/footer | Manual navigation test |
| 3 | `DistrictId` type resolves to 6 Safetrekr marketing IDs; no Tarva string literals in `src/` | `grep -rn` scan + `pnpm typecheck` |
| 4 | All 6 capsules render with marketing content; morph transitions work for all 6 | Manual interaction test |
| 5 | ~60 Tarva-specific files deleted; no dead imports remain | `pnpm build` succeeds |
| 6 | `robots.txt` and `sitemap.xml` serve correctly | `curl` verification |
| 7 | Every marketing page has valid `<title>`, `<meta description>`, canonical URL, OG tags, and JSON-LD | DevTools inspection of each page |
| 8 | `POST /api/contact` accepts valid submissions and returns 201 with row in Supabase | `curl` test |
| 9 | Contact page renders form with client-side validation and success state | Manual form submission test |
| 10 | 404 and error pages render with Safetrekr branding | Navigate to `/does-not-exist`; throw in a component |
| 11 | `pnpm typecheck && pnpm lint && pnpm build` all pass with zero errors | CLI verification |

### 9.5 Handoff to Phase B

When Phase A exits, Phase B implementers receive:

1. **A working marketing shell** -- any `page.tsx` dropped into `src/app/(marketing)/` automatically gets header, footer, SEO metadata helpers, and Oblivion HUD styling.
2. **SEO patterns** -- `generatePageMetadata()` for metadata, `JsonLd` component for structured data, `SITE_CONFIG` for domain references.
3. **A form pattern** -- `ContactForm` component and Zod schema as a reference for any future forms.
4. **A remapped district system** -- capsule ring shows Safetrekr marketing districts; detail panels show marketing preview cards with links to marketing pages.
5. **Branded error handling** -- users hitting bad URLs or runtime errors stay within the Safetrekr visual world.

**Phase B blocking dependencies from Phase A:**

| Phase B WS | Requires from Phase A |
|-----------|----------------------|
| WS-B.2 (Landing Page) | A.1 (layout), A.2 (district links) |
| WS-B.3-B.7 (Content Pages) | A.1 (layout), A.3 (metadata helpers) |
| WS-B.8 (Legal Pages) | A.1 (layout) |
| WS-B.9 (About Page) | A.1 (layout) |

---

## 10. Assumptions & Constraints

### 10.1 Validated Assumptions (from combined-recommendations.md)

| ID | Assumption | Status | Source |
|----|-----------|--------|--------|
| A-1 | Gateway boot sequence stays at `/` as site entry point | VALIDATED | User confirmed |
| A-2 | Capsule -> morph -> detail panel pattern preserved | VALIDATED | User confirmed |
| A-3 | Districts keep the term "district" in code | VALIDATED | User confirmed |
| A-4 | URL-encoded camera state pattern preserved | VALIDATED | User provided example URL |
| A-8 | 82% of existing code is reusable | VALIDATED | Phase 2 codebase exploration |
| A-13 | Only verified-implemented features are marketed | VALIDATED | Discovery decision |
| A-14 | Dark HUD aesthetic appropriate for target audience | VALIDATED | User confirmed |

### 10.2 Unvalidated Assumptions (require business owner input)

| ID | Assumption | Status | Blocking? |
|----|-----------|--------|-----------|
| A-5 | Per-trip pricing is $450/$750/$1,250 | UNVALIDATED | Yes (WS-B.5) |
| A-6 | SOC 2 certification status is unknown | UNVALIDATED | Yes (WS-B.6) |
| A-7 | FERPA compliance status is unknown | UNVALIDATED | Yes (WS-B.6) |
| A-9 | No free trial or freemium tier exists | UNVALIDATED | Yes (WS-B.5) |
| A-10 | Legal pages will use template content | UNVALIDATED | Yes (WS-B.8) |
| A-11 | GA4 is the analytics platform | UNVALIDATED | Yes (WS-C.3) |
| A-12 | safetrekr.com is the production domain | UNVALIDATED | Yes (deployment) |
| A-15 | Marketing copy drafted as part of this project | UNVALIDATED | Yes (Phase B) |

### 10.3 Non-Negotiable Constraints

The following constraints apply to ALL Phase A workstreams. Sourced from combined-recommendations.md Constraints section and CLAUDE.md:

1. **Oblivion HUD aesthetic** -- dark backgrounds, glass-morphism, green accents, ambient effects. No white pages.
2. **"Safetrekr" naming** -- never "SafeTrekr" (camelCase). Always "Safetrekr."
3. **"Calm Authority" brand voice** -- precise, factual, confident, operational.
4. **pnpm only** -- never npm.
5. **motion/react** -- never framer-motion.
6. **Next.js 16 App Router** -- server components for marketing pages (SEO).
7. **Existing ZUI untouched** -- camera store, spatial math, morph system, ambient components preserved.
8. **District system preserved** -- capsule ring, morph transitions, URL-encoded camera state kept.
9. **Node >= 22** required.
10. **@tarva/ui** component library for shared primitives.
11. **Zod 4** for validation.
12. **Supabase** for backend.
13. **Types in `src/lib/interfaces/`** or feature-local, never `src/types/`.
14. **Color scheme default: `safetrekr`** -- green primary + amber accent.
15. **Path alias: `@/*`** maps to `./src/*`.

### 10.4 Phase A-Specific Constraints

1. **A.1 placeholder pages use minimal content** -- a heading and "Coming soon" text only. Real content is Phase B scope. [A.1, Section 4.4]
2. **A.2 uses placeholder marketing copy** -- content team provides final copy in WS-B.x workstreams. [A.2-D6]
3. **A.4 notification function is partially blocked** -- recipient email and email provider depend on OQ-07 and OQ-26. Form submissions persist to Supabase regardless. [A.4, Section 4.7]
4. **A.3 OG image is static default** -- dynamic per-page images deferred to WS-C.4. [A.3-D6 / PAD-25]
5. **A.5 error pages have no animations** -- dependency-light for fast loading. [A.5-D3 / PAD-12]

---

## Appendix A: Glossary of Phase A Terms

| Term | Definition | Source |
|------|-----------|--------|
| `(marketing)` route group | Next.js App Router pattern that groups routes under a shared layout without adding a URL path segment | A.1 |
| Glass-morphism | Visual pattern: `bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]` with `border-white/[0.08]` | detail-panel.tsx, used across all SOWs |
| `mkt-cta-breathe` | CSS keyframe animation for the primary CTA breathing glow effect | A.1, `marketing.css` |
| `DistrictId` | TypeScript union type defining the 6 district identifiers used throughout the ZUI system | A.2, `district.ts` |
| `SITE_CONFIG` | Centralized site configuration constant (domain, name, social handles, OG defaults) | A.3, `site.ts` |
| `generatePageMetadata()` | Helper function producing consistent Next.js `Metadata` objects for all marketing pages | A.3, `metadata.ts` |
| `JsonLd` | Server component rendering `<script type="application/ld+json">` tags for structured data | A.3, `json-ld.tsx` |
| `contactFormSchema` | Shared Zod 4 schema for contact form validation (client + server) | A.4, `contact.ts` |
| Honeypot field | Hidden `website` field for anti-spam detection; bots fill it, humans do not | A.4, Section 4.8 |
| Semantic zoom levels | Z0 (constellation), Z1 (atrium), Z2 (station), Z3 (deep zoom) with hysteresis | CLAUDE.md |
| Morph system | Animation system for capsule -> detail panel transitions | CLAUDE.md |
| Oblivion HUD | The dark mission-control visual aesthetic: void backgrounds, green accents, monospace metadata | combined-recommendations.md AD-2 |

---

## Appendix B: Document Cross-Reference Index

| Document | Location | Used In Sections |
|----------|----------|-----------------|
| WS-A.1: Marketing Route Group + Layout | `plans/launch-plan/phase-a-foundation/ws-a.1-marketing-route-group-layout.md` | 2, 3.1, 3.2, 4, 5, 6, 7, 8, 9 |
| WS-A.2: District System Remapping + Tarva Cleanup | `plans/launch-plan/phase-a-foundation/ws-a.2-district-system-remapping-tarva-cleanup.md` | 2, 3.3, 4, 6, 7, 8, 9 |
| WS-A.3: SEO Infrastructure | `plans/launch-plan/phase-a-foundation/ws-a.3-seo-infrastructure.md` | 2, 3.4, 4, 5, 6, 7, 8, 9 |
| WS-A.4: Form Backend + Contact Page | `plans/launch-plan/phase-a-foundation/ws-a.4-form-backend-contact-page.md` | 2, 3.5, 4, 5, 6, 7, 8, 9 |
| WS-A.5: Error Pages | `plans/launch-plan/phase-a-foundation/ws-a.5-error-pages.md` | 2, 3.2, 3.6, 4, 6, 7, 8 |
| Combined Recommendations | `plans/launch-plan/combined-recommendations.md` | 1, 2, 3, 5, 6, 7, 8, 9, 10 |
| CLAUDE.md | `CLAUDE.md` (project root) | 10.3, Appendix A |
