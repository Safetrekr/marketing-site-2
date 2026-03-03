# Phase D Overview: Content Depth (Post-Launch)

**Project:** Safetrekr Marketing Site Launch
**Phase:** D -- Content Depth (Post-Launch)
**Document Type:** Synthesis Overview (Multi-Perspective)
**Date:** 2026-03-02
**Status:** Draft for Review

**Synthesis Perspectives:**

| Role | Focus |
|------|-------|
| CTA (Chief Technology Architect) | Architectural coherence with Phases A-C, data model conflicts, component reuse validation |
| SPO (Senior Product Owner) | Content dependency gating, business blocker identification, launch vs. post-launch scoping |
| STW (Senior Technical Writer) | Specification completeness, cross-SOW consistency, ambiguity identification |
| PMO (Project Management Office) | Sequencing, effort aggregation, critical path through content dependencies, resource allocation |

**Source Documents Reviewed:**

- `PHASE-A-OVERVIEW.md` (foundation phase context)
- `PHASE-B-OVERVIEW.md` (content page phase context)
- `PHASE-C-OVERVIEW.md` (integration/polish phase context)
- `combined-recommendations.md` (project source of truth)
- `ws-d.1-vertical-solution-pages.md` (Vertical Solution Pages)
- `ws-d.2-social-proof-system.md` (Social Proof System)
- `ws-d.4-blog-infrastructure.md` (Blog Infrastructure)

---

## 1. Executive Summary

Phase D is the post-launch content depth layer. Where Phases A-C deliver a launch-ready marketing site -- infrastructure (A), content pages (B), and production polish (C) -- Phase D expands the site's content surface area to deepen vertical market penetration, build social proof credibility, and establish long-term SEO authority. Phase D workstreams can begin any time after their Phase B/C dependencies are satisfied, but none are launch-blocking.

The phase comprises three workstreams spanning vertical market specialization (D.1), customer evidence infrastructure (D.2), and content marketing publishing (D.4). There is no WS-D.3 -- the numbering gap reflects the original deferred items register from `combined-recommendations.md` where D-3 (Advanced Analytics) was de-prioritized during planning.

**Scope by the numbers:**

| Metric | Count |
|--------|-------|
| Workstreams | 3 |
| New files created | ~48-50 |
| Modified files | ~6-8 |
| New routes | ~9 (`/solutions/[vertical]` x5, `/case-studies`, `/case-studies/[slug]`, `/blog`, `/blog/[slug]`, `/blog/tag/[tag]`, `/blog/feed.xml`) |
| New package dependencies | 5 (all from D.4: `next-mdx-remote`, `gray-matter`, `rehype-pretty-code`, `rehype-slug`, `reading-time`) |
| Acceptance criteria (total) | ~88 (30 from D.1, 30 from D.2, 28 from D.4) |
| Open questions requiring resolution | 21 (7 from D.1, 7 from D.2, 7 from D.4) |
| Risks identified | ~28 (10 from D.1, 10 from D.2, 8 from D.4) |
| Estimated effort | 32-48 hours |

**Phase D is fundamentally different from Phases A-C in three ways:**

1. **Content-gated, not code-gated.** The primary blocker for D.1 and D.2 is content -- vertical-specific copy from the narrative strategist, pilot customer testimonials, customer logo permissions, and case study narratives. The code infrastructure for all three workstreams can be built independently of content, but the pages cannot ship with empty shells. D.4 (Blog) separates infrastructure from content entirely: the infrastructure ships first, blog posts are published incrementally over months.

2. **Post-launch execution.** Unlike Phases A-C, which must complete before launch, Phase D workstreams deploy incrementally to a live site. This changes the deployment model: each workstream must ship without breaking existing pages, must handle progressive content population gracefully, and must maintain SEO integrity of already-indexed routes.

3. **Revenue-building, not launch-enabling.** Phase D is about conversion depth: vertical pages help buyers self-qualify ("this is built for my industry"), social proof reduces evaluation friction ("peers in my sector trust this"), and blog content drives organic discovery ("found via search for 'school field trip safety checklist'"). These are growth investments, not minimum-viable-product requirements.

**Key architectural reframe:** Phase D is not three independent projects. The three workstreams share data models (vertical identifiers), content patterns (glass-morphism cards, structured data, SEO metadata), and infrastructure assumptions (marketing layout, analytics instrumentation, OG image system). Cross-workstream coordination is required to prevent type conflicts, duplicated data, and inconsistent UX patterns. This overview identifies three active conflicts that must be resolved before implementation begins.

---

## 2. Key Findings by Theme

### 2.1 Vertical Market Specialization (D.1)

WS-D.1 builds five vertical-specific solution pages at `/solutions/k12`, `/solutions/higher-ed`, `/solutions/churches`, `/solutions/youth-sports`, and `/solutions/business`. Each page replaces the placeholder stub created in WS-B.7 (Section 4.14) with a full-depth, SEO-optimized page that speaks directly to the security director, risk manager, or operations lead responsible for travel safety within that vertical.

**CTA observation:** The architectural approach is sound -- a shared `VerticalDetailTemplate` component consumes per-vertical `VerticalDetailData` objects, using `generateStaticParams` for build-time rendering of all five routes. This mirrors the pattern established in WS-B.7 for the overview page. The `[vertical]` dynamic route segment with static params is the correct Next.js App Router pattern for a known, finite set of pages.

**SPO observation:** The SOW includes complete draft copy for all five verticals -- hero statements, challenge narratives, Safetrekr responses, regulatory requirements, feature spotlights, and objection hooks. This is unusually thorough for a content-gated workstream and significantly de-risks the content dependency. However, multiple regulatory claims (FERPA, COPPA, SafeSport, ISO 31030) carry unverified status. The SOW correctly handles this with a `verified: boolean` badge system that visually distinguishes confirmed from unconfirmed compliance alignment. This mirrors the `ComplianceBadge` pattern from WS-B.6 (Security Page).

**STW observation:** The independent safety analyst review is positioned as the killer differentiator across all five verticals. Each vertical page maps the analyst review to that sector's most specific accountability question. This is strong copy strategy. However, the analyst review is referenced in WS-B.1 copy as an existing capability -- if the analyst review is not yet operational at the time D.1 ships, these claims must be qualified.

### 2.2 Customer Evidence Infrastructure (D.2)

WS-D.2 builds a three-tier social proof system: customer logo bar, testimonial cards, and case study pages. The system is designed for progressive population -- the landing page social proof section supports a hybrid mode where capability-proof stat cards (from WS-B.2) and real testimonial cards coexist in the same grid. As testimonials accumulate, stat cards are displaced one at a time.

**CTA observation:** The hybrid social proof approach with `getLandingPageSocialProof()` determining display mode based on testimonial count is well-designed. The `LOGO_BAR_MINIMUM = 3` threshold prevents a sparse logo bar from looking worse than no logo bar at all. The progressive displacement strategy means the landing page is never in an awkward "mostly empty" state.

**SPO observation:** This workstream resolves R-06 (no social proof reduces conversion 40-60%), the single highest-leverage conversion lever missing from the launch site. However, all three content tiers depend on pilot customer cooperation -- testimonials, logo permissions, and case study participation are all externally gated. The SOW wisely includes a three-stage content collection process and a content contribution guide, but the timeline for real content is "3-6 months post-pilot," meaning D.2 infrastructure will ship with placeholder/capability-proof content initially. Stakeholders must accept that the social proof section will look identical to the B.2 launch version until real content is collected.

**CTA observation on type conflict:** WS-D.2 defines a `VerticalId` type (`'k12' | 'higher-ed' | 'churches' | 'youth-sports' | 'business'`) and a `VERTICAL_META` mapping in `src/lib/data/verticals.ts`. WS-D.1 creates a `src/lib/data/verticals/` directory with per-vertical data modules and a barrel export. These overlap and must be reconciled. See Conflict 1 in Section 3.

### 2.3 Content Marketing Publishing (D.4)

WS-D.4 builds an MDX-based blog with listing page, post template, tag filtering, RSS feed, and custom MDX components (Callout, CTA, Figure). The blog renders inside the marketing layout and extends the typography/prose patterns from WS-B.8 (Legal Pages).

**CTA observation:** The architecture is well-scoped. Using `next-mdx-remote/rsc` for server-side MDX rendering is the correct choice for SEO. The content loader (`src/lib/blog.ts`) reads from a `content/blog/` directory, parses frontmatter with `gray-matter`, validates with a Zod 4 schema, and returns typed post data. This is a clean separation: authors add `.mdx` files, no code changes required per post.

**STW observation:** The SOW explicitly separates infrastructure from content, which is appropriate. However, the blog introduces 5 new package dependencies -- the only workstream in any phase to add external packages. These dependencies (particularly `next-mdx-remote` and `rehype-pretty-code`) must be vetted for maintenance health and compatibility with Next.js 16 before implementation begins.

**CTA observation on utility generalization:** WS-D.4 notes that `extractHeadings`, `formatDate`, and `slugify` from WS-B.8's `src/lib/legal-utils.ts` should be generalized into a shared `src/lib/content-utils.ts`. This is correct -- both legal pages and blog pages need the same heading extraction and formatting utilities. The refactoring should happen as part of D.4 implementation, with B.8 updated to import from the shared module.

**SPO observation on sitemap integration:** WS-D.4 correctly identifies that `src/app/sitemap.ts` (from WS-A.3) must be updated to include blog post URLs dynamically. This is a modification to a Phase A artifact and must be coordinated to avoid breaking the existing sitemap.

---

## 3. Cross-Workstream Conflicts

### Conflict 1: Vertical Data Model Collision (D.1 vs D.2) -- Severity: HIGH

**Nature:** Both WS-D.1 and WS-D.2 define vertical market data structures, but in conflicting locations with overlapping types.

| Aspect | WS-D.1 | WS-D.2 |
|--------|--------|--------|
| Vertical ID type | Implicit in `VerticalDetailData` interface, vertical slugs defined in `generateStaticParams` | Explicit `VerticalId` type union: `'k12' \| 'higher-ed' \| 'churches' \| 'youth-sports' \| 'business'` |
| Data location | `src/lib/data/verticals/` directory with 5 per-vertical modules + barrel export | `src/lib/data/verticals.ts` single file with `VERTICAL_META` map |
| Interface location | `src/lib/interfaces/solutions.ts` (extends B.7's `SolutionVertical`) | `src/lib/interfaces/social-proof.ts` (defines `VerticalId` and `VerticalMeta`) |

**Impact:** If both workstreams ship independently, the codebase will have two different `VerticalId` definitions in two different files, and `src/lib/data/verticals.ts` (D.2) will collide with the `src/lib/data/verticals/` directory (D.1) at the filesystem level. TypeScript will not error because the types happen to have the same values, but this is a maintenance trap.

**Resolution (CTA recommendation):**

1. Create a single canonical `VerticalId` type in `src/lib/interfaces/solutions.ts` (where B.7 already defines vertical-related types). Both D.1 and D.2 import from this single source.
2. Rename D.2's `src/lib/data/verticals.ts` to `src/lib/data/vertical-meta.ts` to avoid filesystem collision with D.1's `src/lib/data/verticals/` directory.
3. D.2's `VERTICAL_META` map and D.1's per-vertical detail data are complementary, not duplicative. `VERTICAL_META` provides display metadata (label, icon, color) consumed by social proof components. Per-vertical detail modules provide deep page content. Both are valid.
4. Whichever workstream ships first defines the canonical type. The second workstream imports it.

**Owner:** CTA / Engineering Lead. Must be resolved before either workstream begins implementation.

### Conflict 2: Data File Directory Convention (D.1/D.2 vs Phase B Precedent) -- Severity: MEDIUM

**Nature:** Phase B Overview (Conflict C-1) identified that SOWs inconsistently place data files in `src/lib/config/` vs `src/lib/data/`. The resolution recommended standardizing on `src/lib/data/` for page content data. D.1 and D.2 both use `src/lib/data/`, which is consistent with the Phase B resolution. However, if Phase B implementation chose `src/lib/config/` for some workstreams (B.4, B.5, B.7), Phase D must match whatever convention was actually implemented, not the recommended convention.

**Impact:** If B.7's `solutions-verticals.ts` ended up in `src/lib/config/solutions-verticals.ts`, then D.1's reference to extending that data at `src/lib/data/verticals/` creates a split where the overview data is in `config/` and the detail data is in `data/`.

**Resolution:** At implementation time, check where B.7 actually placed `solutions-verticals.ts`. If it is in `src/lib/config/`, either move it to `src/lib/data/` (preferred) or place D.1's verticals directory in `src/lib/config/verticals/` to match. Consistency is more important than which directory is chosen.

**Owner:** Implementing developer. Resolve at D.1 kickoff.

### Conflict 3: Case Study Placeholder Overlap (D.1 vs D.2) -- Severity: LOW

**Nature:** WS-D.1 creates a `CaseStudyPlaceholder` component for vertical pages that shows a dashed-border placeholder designed for future case study content. WS-D.2 builds the actual `CaseStudyCard` component for the case study listing page. When real case studies become available, the D.1 placeholder should be replaced with a D.2 `CaseStudyCard` -- but neither SOW documents this replacement path.

**Impact:** Without coordination, the vertical pages could end up with stale placeholders even after case studies exist for that vertical.

**Resolution:** D.1's `CaseStudyPlaceholder` component should accept a `caseStudy?: CaseStudy` prop (type from D.2). When a case study exists for the vertical, the component renders a `CaseStudyCard` instead of the placeholder. When no case study exists, it renders the dashed placeholder. This requires D.1 to import the `CaseStudy` type from D.2's interfaces, creating a deliberate coupling point.

**Owner:** CTA / Implementing developer. Document in D.1's component spec.

### Conflict 4: Content Utility Duplication (D.4 vs B.8) -- Severity: LOW

**Nature:** WS-D.4 identifies that `extractHeadings`, `formatDate`, and `slugify` in `src/lib/legal-utils.ts` (WS-B.8) should be generalized into a shared `src/lib/content-utils.ts`. This is a refactoring of a Phase B artifact.

**Impact:** If D.4 implements without refactoring, the same utilities will be duplicated in `legal-utils.ts` and a new `blog-utils.ts`. If D.4 refactors, it must also update B.8's import paths, meaning D.4 modifies files outside its stated scope.

**Resolution:** Include the utility generalization in D.4's scope. The modified file list should include `src/lib/legal-utils.ts` (deprecated, re-exports from `content-utils.ts`) and the legal page files that import it. This is a low-risk refactoring that improves long-term maintainability.

**Owner:** Implementing developer during D.4 execution.

---

## 4. Architecture Decisions (Consolidated)

The following decisions consolidate findings across all three Phase D SOWs, numbered with the `PAD-D.xx` prefix to continue the project-wide decision register.

### 4.1 Route & Content Architecture

| ID | Decision | Source | CR Ref | Rationale |
|----|----------|--------|--------|-----------|
| PAD-D.01 | Dynamic route `[vertical]` with `generateStaticParams` for all 5 vertical slugs. Server component. | D.1-D1 | D-1 | Known finite set of pages. Static pre-rendering for SEO. Same pattern as B.7's overview page. |
| PAD-D.02 | Shared `VerticalDetailTemplate` component accepting `VerticalDetailData` props. All 5 verticals render through the same template. | D.1-D2 | -- | Enforces layout consistency across verticals. Content variation is data-driven, not template-driven. |
| PAD-D.03 | Per-vertical data modules in `src/lib/data/verticals/` with barrel export. | D.1-D3 | -- | Each vertical's deep content (challenges, regulations, feature spotlights) is substantial enough to warrant its own file (~200-300 lines each). Barrel export keeps imports clean. |
| PAD-D.04 | Case study listing at `/case-studies` and detail at `/case-studies/[slug]` with `generateStaticParams`. | D.2-D4 | -- | Standard listing/detail pattern. Static params for build-time rendering. Separate route group from `/solutions` to avoid URL confusion. |
| PAD-D.05 | MDX-based blog with file-based content in `content/blog/*.mdx`. No CMS at launch. | D.4-D1 | D-4 | File-based MDX is sufficient for launch-phase content velocity (1-4 posts/month). Clean CMS migration path documented. |
| PAD-D.06 | Blog routes: `/blog` (listing), `/blog/[slug]` (post), `/blog/tag/[tag]` (filtered), `/blog/feed.xml` (RSS). | D.4-D2, D4-D3 | -- | Standard blog URL structure. Tag pages provide browsable categorization without over-engineering search. RSS enables syndication and reader apps. |
| PAD-D.07 | RSS 2.0 feed via Next.js route handler (`route.ts`), not Atom. | D.4-D9 | -- | Broader reader app support. Simpler specification. No Atom-specific features needed. |
| PAD-D.08 | Blog sub-layout (`blog/layout.tsx`) with breadcrumb and back-to-blog link. | D.4-D6 | -- | Blog pages need persistent navigation context within the marketing layout. Sub-layout avoids repeating breadcrumb in every blog page. |

### 4.2 Data Model & Type Architecture

| ID | Decision | Source | CR Ref | Rationale |
|----|----------|--------|--------|-----------|
| PAD-D.09 | `VerticalDetailData` extends `SolutionVertical` (from B.7) with `challenges`, `responses`, `regulations`, `featureSpotlights`, `caseStudyPlaceholder`, and `seoMeta` fields. | D.1-D4 | -- | Type extension preserves backward compatibility. B.7's overview data is a subset of D.1's detail data. |
| PAD-D.10 | `VerticalRegulation` type with `verified: boolean` badge for compliance claims. | D.1-D5 | Gap 10 | Architecturally prevents displaying unverified compliance claims as confirmed. Mirrors B.6's `ComplianceBadge` pattern. |
| PAD-D.11 | Canonical `VerticalId` type union defined once and imported by both D.1 and D.2. | **Synthesis** | -- | Resolves Conflict 1. Single source of truth for vertical identifiers. See Section 3. |
| PAD-D.12 | Social proof interfaces (`Testimonial`, `CustomerLogo`, `CaseStudy`) in `src/lib/interfaces/social-proof.ts`. | D.2-D1 | -- | Clean separation from solutions interfaces. Social proof is a distinct domain. |
| PAD-D.13 | `getLandingPageSocialProof()` function determines display mode: `capability` (0 testimonials), `hybrid` (1-2), `testimonials` (3+). | D.2-D5 | -- | Progressive population without manual mode switching. Business logic encapsulated in one function. |
| PAD-D.14 | `LOGO_BAR_MINIMUM = 3`. Logo bar hidden below threshold. | D.2-D6 | -- | Prevents sparse logo bar from looking worse than no logo bar. |
| PAD-D.15 | Zod 4 frontmatter schema for blog posts with 12+ fields including `category` enum. | D.4-D4 | AD-5 | Build-time validation catches frontmatter errors before they reach production. Consistent with A.4's Zod validation pattern. |
| PAD-D.16 | Blog author registry in `src/lib/blog-authors.ts` with 4 initial authors. | D.4-D7 | -- | Decouples author data from post content. Consistent author display across all posts. |

### 4.3 Component Architecture

| ID | Decision | Source | CR Ref | Rationale |
|----|----------|--------|--------|-----------|
| PAD-D.17 | Server components by default for all Phase D pages. Client components only where interactive state is required (`CustomerLogoBar` auto-scroll). | D.1, D.2, D.4 | -- | Consistent with Phase B's server-component-first strategy. Marketing pages are read-only; client JS should be minimal. |
| PAD-D.18 | `CustomerLogoBar` is the only client component in Phase D. Uses `motion/react` for auto-scroll animation. | D.2-D7 | -- | Logo bar requires client-side scroll state. All other social proof components are server-rendered. |
| PAD-D.19 | Custom MDX components: `Callout`, `CTA`, `Figure`. Mapped via `next-mdx-remote` component registry. | D.4-D5 | -- | Enables rich blog content without exposing raw HTML to authors. Components enforce HUD aesthetic within MDX content. |
| PAD-D.20 | Blog TOC extends WS-B.8 `LegalTOC` pattern. Reuses heading extraction logic. | D.4-D8 | -- | Consistent sidebar TOC behavior across legal pages and blog posts. Shared utility extraction (see Conflict 4). |
| PAD-D.21 | Greyscale-to-color hover treatment on customer logos. CSS `filter: grayscale(100%)` transitioning to `grayscale(0%)`. | D.2-D8 | -- | Industry-standard logo bar pattern. Keeps the dark aesthetic while providing interaction feedback. |
| PAD-D.22 | `RegulationCard` with verified/unverified badge: green check for verified, amber dot with "Alignment in progress" for unverified. | D.1-D6 | Gap 10 | Visual honesty about compliance status. Unverified claims are not hidden -- they are contextualized. |
| PAD-D.23 | `rehype-pretty-code` with `oneDark` theme for server-side syntax highlighting in blog posts. | D.4-D10 | -- | Server-rendered code blocks (no client JS). One Dark theme matches HUD aesthetic. |

### 4.4 SEO & Structured Data

| ID | Decision | Source | CR Ref | Rationale |
|----|----------|--------|--------|-----------|
| PAD-D.24 | Per-vertical JSON-LD `SoftwareApplication` structured data with `audience` targeting. | D.1-D7 | -- | Helps search engines understand that each vertical page targets a specific audience segment. |
| PAD-D.25 | Per-case-study `Article` JSON-LD structured data. | D.2-D9 | -- | Case studies are editorial content; `Article` schema is appropriate. |
| PAD-D.26 | Per-blog-post `Article` JSON-LD with `author`, `datePublished`, `dateModified`, `image`. | D.4-D11 | -- | Blog posts are canonical articles. Rich structured data improves SERP appearance. |
| PAD-D.27 | Sitemap updated dynamically to include blog post URLs and case study URLs. | D.4-D12, D.2-D10 | -- | WS-A.3's `src/app/sitemap.ts` must be modified by both D.2 and D.4 to include their new routes. This is a shared modification point. |
| PAD-D.28 | Blog canonical URLs use `https://www.safetrekr.com/blog/[slug]` pattern. | D.4-D12 | -- | Consistent with `SITE_CONFIG.url` from WS-A.3. Prevents duplicate content issues. |

### 4.5 Content Strategy

| ID | Decision | Source | CR Ref | Rationale |
|----|----------|--------|--------|-----------|
| PAD-D.29 | Blog separates infrastructure (D.4) from content (narrative strategist). Authors add `.mdx` files with no code changes required. | D.4-D1 | -- | Clean separation of concerns. Developers build the publishing system; writers use it. |
| PAD-D.30 | Social proof system supports hybrid display mode: capability proofs and testimonials coexist. | D.2-D5 | -- | Avoids empty-state problem. Landing page always shows value evidence, transitioning from self-reported stats to customer evidence as content accumulates. |
| PAD-D.31 | All regulatory/compliance claims must carry `verified: boolean` status. Unverified claims display with amber "alignment in progress" badge, not green checkmark. | D.1-D5, D.1-D10 | Gap 10 | Prevents false compliance claims. Business owner can flip individual claims to `verified: true` as certifications are confirmed. |
| PAD-D.32 | Case study placeholders on vertical pages use dashed borders and contextual placeholder text that varies by vertical. | D.1-D8 | -- | Placeholders should look intentional ("coming soon") not broken ("content missing"). Vertical-specific placeholder text demonstrates product understanding even before case study content exists. |

---

## 5. Consolidated Risk Register

Risks are merged from all three SOWs, deduplicated, and re-prioritized in the context of Phase D as a whole. Severity uses the project-wide scale: Critical (launch-blocking -- N/A for Phase D since it is post-launch), High (conversion impact or credibility damage), Medium (quality or maintenance concern), Low (minor or cosmetic).

| ID | Risk | Source | Severity | Likelihood | Impact | Mitigation |
|----|------|--------|----------|------------|--------|------------|
| RD-01 | **Unverified compliance claims published as verified.** Regulatory sections in D.1 verticals display claims (FERPA, COPPA, SafeSport, ISO 31030) before business owner confirms compliance status. | D.1-R1, Gap 10 | High | Medium | Credibility damage with institutional buyers who verify vendor compliance claims. Legal exposure. | `verified: boolean` badge system (PAD-D.10, PAD-D.22). All claims default to `verified: false`. Business owner explicitly sets each to `true` with documentation. Build-time assertion that no unverified claim renders a green checkmark. |
| RD-02 | **No social proof content available for months.** Pilot customer testimonials, logo permissions, and case study content require customer cooperation. Expected 3-6 months post-pilot. | D.2-R1 | High | High | Social proof section remains in capability-proof mode (identical to B.2 launch). R-06 (40-60% conversion reduction) persists. | Progressive population design (PAD-D.13). Landing page is never empty. Capability proof stats provide value evidence in the interim. Content collection process documented in D.2 Section 8. Consider engaging a "design partner" program with earliest pilot customers to accelerate content. |
| RD-03 | **Vertical page copy not reviewed by vertical-specific SME.** Draft copy covers 5 different regulatory environments, each with nuanced compliance terminology. | D.1-R2 | High | Medium | Incorrect regulatory characterization damages credibility with the exact audience being targeted. | Assign one SME per vertical for copy review. K-12 and Higher Ed: consult FERPA/Clery Act specialist. Churches: review with denomination-specific policy advisor. Youth Sports: validate SafeSport requirements. Business: confirm OSHA/ISO alignment. |
| RD-04 | **Blog MDX dependencies incompatible with Next.js 16.** `next-mdx-remote`, `rehype-pretty-code`, and `gray-matter` have not been tested against Next.js 16 App Router RSC. | D.4-R1 | High | Low | Blog infrastructure cannot ship until compatibility is verified. Potential fallback to `react-markdown` (simpler but less capable). | Spike: install dependencies and render a test MDX file in a Next.js 16 dev server before committing to the approach. Fallback documented in D.4 OQ-2. |
| RD-05 | **Pricing references on vertical pages become stale.** D.1 vertical pages reference pricing tiers (T1: $450, T2: $750, T3: $1,250) from B.5 data. These are marked `[UNVALIDATED]` in B.1. | D.1-R3 | Medium | High | Inconsistency between pricing page and vertical page pricing references confuses buyers. | Vertical pages should not hardcode dollar amounts. Reference pricing by tier name ("Explorer," "Guardian," "Command") and link to `/pricing` for specifics. Dollar amounts live only on the pricing page. |
| RD-06 | **Cross-link navigation shows broken links during phased vertical rollout.** If verticals ship one at a time, "Other solutions" cross-links point to non-existent sibling pages. | D.1-R4 | Medium | Medium | 404 errors from cross-link clicks degrade trust. | Render cross-link cards only for verticals whose detail page is live. Use `generateStaticParams` output to determine which slugs are active. Alternatively, ship all 5 simultaneously. |
| RD-07 | **Customer logo permissions revoked after launch.** A customer withdraws permission to display their logo. | D.2-R2 | Medium | Low | Logo bar shows a logo without permission. Legal exposure. | Logo data module includes `permissionDate` and `permissionContact` fields. Review permissions quarterly. `hidden: boolean` field allows instant removal without deleting the data entry. |
| RD-08 | **Blog content quality inconsistency.** Multiple authors with different writing abilities produce posts of varying quality. | D.4-R3 | Medium | Medium | Uneven content quality undermines thought leadership positioning. | Style guide enforced via the blog frontmatter schema (required fields for summary, category, tags). Editorial review gate: `status: 'draft' | 'review' | 'published'` field in frontmatter. Only `published` posts are rendered. |
| RD-09 | **Sitemap update conflicts.** Both D.2 (case studies) and D.4 (blog) must modify `src/app/sitemap.ts`. If implemented independently, merge conflicts are likely. | D.4-R5, D.2-R5 | Medium | High | Broken sitemap degrades SEO. | Coordinate sitemap modifications. The content loader pattern (`getAllBlogPosts()`, `getAllCaseStudies()`) allows the sitemap to import from both modules cleanly. One PR should handle both additions, or at minimum the second workstream should rebase against the first. |
| RD-10 | **Testimonial attribution accuracy.** Quotes, titles, and organization names change over time (promotions, acquisitions, rebranding). | D.2-R3 | Low | Medium | Stale attributions look unprofessional. | Review cycle: quarterly check of testimonial attributions. `updatedAt` field in testimonial data module triggers review reminders. |
| RD-11 | **Blog RSS feed includes draft or unpublished posts.** Content loader must filter by `status === 'published'` consistently. | D.4-R6 | Low | Low | Draft content exposed to RSS subscribers. | Single `getPublishedPosts()` function used by both listing page and RSS route handler. Filter is centralized, not duplicated. |
| RD-12 | **Case study content too promotional.** Customers review and soften claims during approval, resulting in case studies that lack compelling data. | D.2-R4 | Medium | High | Weak case studies are worse than no case studies -- they suggest the product lacks real impact. | Draft case studies with quantitative outcomes first ("50% reduction in incident reporting time"), then negotiate with customers on exact numbers. Provide a range option ("40-60% reduction") if specifics are sensitive. |
| RD-13 | **Vertical page template too rigid for diverse verticals.** K-12 has 5 regulatory requirements; business has 3. Churches have denominational sub-verticals; business does not. A single template may not accommodate this variance. | D.1-R6 | Medium | Medium | Either some verticals have sparse sections (looks empty) or the template includes conditional rendering that increases complexity. | Template already uses optional fields (`featureSpotlights` can have 3-4 items). Add CSS grid rules that adapt to item count. If a section has zero items, hide the section header too. |
| RD-14 | **Blog code block rendering on mobile.** `rehype-pretty-code` produces wide code blocks that may overflow on mobile viewports. | D.4-R7 | Low | Medium | Horizontal scrolling or clipped code on mobile devices. | Blog prose CSS includes `overflow-x: auto` on code blocks with `max-width: 100%`. The SOW specifies this explicitly. |

---

## 6. Dependency Map

### 6.1 Visual Dependency Graph

```
Phase A                Phase B                     Phase C               Phase D
--------               --------                    --------              --------
WS-A.1 (Layout) -----> WS-B.2 (Landing) ---------> WS-C.3 (Analytics) -> WS-D.1 (Verticals)
                   |                                                  |
                   +-> WS-B.7 (Solutions) ---------------------------> WS-D.1 (Verticals)
                   |                                                  |
                   +-> WS-B.2 (Social Proof Section) ----------------> WS-D.2 (Social Proof)
                   |                                                  |
                   +-> WS-B.1 (Content/Copy) -----------------------> WS-D.1 (Copy Guide)
                   |                                                  |
                   +-> WS-B.8 (Legal Pages) ------------------------> WS-D.4 (Blog, prose pattern)
                   |
                   +-------------------------------------------------> WS-D.4 (Blog, layout)

WS-A.3 (SEO) -------> WS-B.* (metadata) ---------> WS-C.4 (OG) ----> WS-D.1, D.2, D.4 (metadata, sitemap)

                                                     WS-C.2 (Audit) -> WS-D.* (token values must be post-remediation)
                                                     WS-C.3 (Analytics) -> WS-D.* (analytics patterns, event naming)

                       WITHIN PHASE D:
                       WS-D.1 <------- VerticalId type -------> WS-D.2
                       WS-D.1 <-- CaseStudy placeholder/card --> WS-D.2
                       WS-D.4 <-- content-utils refactor ------> WS-B.8 (modified)
```

### 6.2 Inter-Phase Dependency Detail

| Phase D Workstream | Depends On | Phase | Hard/Soft | What Must Be True |
|--------------------|-----------|-------|-----------|-------------------|
| WS-D.1 | WS-B.7 (Solutions Overview) | B | Hard | `/solutions` page must exist with working vertical card links and `SolutionVertical` interface. The `[vertical]/page.tsx` stub must exist for D.1 to replace. |
| WS-D.1 | WS-B.1 (Content Strategy) | B | Soft | Voice guide and messaging hierarchy inform D.1 copy. D.1 includes its own complete copy, but it should align with B.1 patterns. |
| WS-D.1 | WS-C.3 (Analytics) | C | Soft | D.1 pages inherit `data-analytics-id` convention. No direct code dependency. |
| WS-D.1 | WS-C.2 (Audit Remediation) | C | Soft | D.1 pages should use post-remediation token values for WCAG compliance. If C.2 remediation changes `--color-text-tertiary`, D.1 inherits the fix via tokens. |
| WS-D.2 | WS-B.2 (Landing Page) | B | Hard | Social proof placeholder section in landing page must exist. D.2 replaces/upgrades it with the hybrid grid. |
| WS-D.2 | WS-A.1 (Marketing Layout) | A | Hard | Case study pages render inside the marketing layout. |
| WS-D.2 | WS-A.3 (SEO Infrastructure) | A | Hard | Case study pages use `generatePageMetadata()` and structured data helpers. |
| WS-D.2 | WS-C.3 (Analytics) | C | Soft | Social proof components include `data-analytics-id` attributes for auto-tracking. |
| WS-D.4 | WS-A.1 (Marketing Layout) | A | Hard | Blog pages render inside the marketing layout. |
| WS-D.4 | WS-B.8 (Legal Pages) | B | Soft | Blog prose extends legal prose typography patterns. `legal-utils.ts` utilities are generalized. D.4 can proceed without B.8 but would duplicate utility code. |
| WS-D.4 | WS-A.3 (SEO Infrastructure) | A | Hard | Blog posts use `generatePageMetadata()`, sitemap integration, and structured data helpers. |
| WS-D.4 | WS-C.3 (Analytics) | C | Soft | Blog posts inherit `data-analytics-id` convention for CTA tracking. |

### 6.3 Intra-Phase D Dependencies

| From | To | Type | What Must Be True |
|------|----|------|-------------------|
| WS-D.1 | WS-D.2 | Type dependency (VerticalId) | Canonical `VerticalId` type must be defined before either ships. See Conflict 1. |
| WS-D.1 | WS-D.2 | Component dependency (CaseStudyPlaceholder) | D.1's placeholder should accept D.2's `CaseStudy` type as optional prop. See Conflict 3. |
| WS-D.2 | WS-D.1 | Data dependency (VERTICAL_META) | D.2's logo bar and testimonial cards display vertical badges using metadata that must align with D.1's vertical definitions. |
| WS-D.4 | WS-B.8 | Refactoring dependency | D.4 generalizes B.8's utility functions. B.8 must not be actively modified when D.4 refactors. |

### 6.4 External Dependencies

| Dependency | Workstream | Type | Owner | Resolution Path |
|------------|-----------|------|-------|-----------------|
| Pilot customer testimonials | D.2 | Content (NOT AVAILABLE) | Business Owner / Customer Success | Content collection process documented in D.2 Section 8. 3-stage pipeline: identify candidates, conduct interviews, get approval. |
| Customer logo permissions | D.2 | Legal (NOT AVAILABLE) | Business Owner / Legal | Written permission required per logo. Template permission request in D.2 content contribution guide. |
| Case study customer participation | D.2 | Content (NOT AVAILABLE) | Business Owner / Customer Success | Expected 3-6 months post-pilot. Earliest adopters targeted first. |
| FERPA compliance verification (Q-4) | D.1 | Legal (OPEN) | Business Owner / Legal | Affects K-12 and Higher Ed regulatory sections. Default to unverified badge if unresolved. |
| COPPA applicability confirmation | D.1 | Legal (OPEN) | Business Owner / Legal | Affects K-12 regulatory section. Same mitigation as FERPA. |
| SafeSport compliance details | D.1 | Business (OPEN) | Business Owner | Affects Youth Sports regulatory section. Confirm whether Safetrekr's certification tracking covers SafeSport requirements. |
| ISO 31030 applicability | D.1 | Legal (OPEN) | Business Owner / Legal | Business vertical references ISO 31030. Confirm alignment or use general duty-of-care framing. |
| Next.js 16 MDX compatibility | D.4 | Technical (UNVERIFIED) | Engineering Lead | Test `next-mdx-remote` + `rehype-pretty-code` against Next.js 16 RSC. Spike before D.4 begins. |
| Blog post content | D.4 | Content (SEPARATE WORKSTREAM) | Narrative Strategist | Infrastructure ships first. Content is a separate, ongoing effort. |
| C.2 remediation token values | D.1, D.2, D.4 | Design (PENDING C.2) | Design + Engineering | Phase D pages must use post-remediation color token values. If C.2 has not completed remediation, D.* pages inherit the same contrast issues. |

---

## 7. Open Questions (Consolidated)

Questions are consolidated across all three SOWs, deduplicated, assigned priority tiers, and tagged with owners.

### Tier 1: Required Before Implementation Begins

| # | Question | Source | Impact | Owner |
|---|----------|--------|--------|-------|
| OQ-D.01 | Where should the canonical `VerticalId` type live? `src/lib/interfaces/solutions.ts` (extending B.7) or a new shared types file? | Conflict 1 (synthesis) | Both D.1 and D.2 need this resolved before coding begins. Type collision risk. | CTA / Engineering Lead |
| OQ-D.02 | Is `next-mdx-remote` compatible with Next.js 16 App Router RSC? | D.4-OQ1 | Determines whether the MDX-based blog architecture is feasible. Must be spiked before D.4 begins. | Engineering Lead |
| OQ-D.03 | Should blog posts use `next-mdx-remote/rsc` (server) or `next-mdx-remote` (client)? | D.4-OQ2 | Server rendering is preferred for SEO, but requires RSC compatibility. Client rendering is a fallback. | Engineering Lead |
| OQ-D.04 | Has WS-C.2 remediation changed any color tokens? If so, which values must Phase D pages use? | Synthesis | All Phase D pages must use post-remediation token values for WCAG compliance. If C.2 has not run, D.* inherits known contrast failures. | Design + Engineering |

### Tier 2: Required Before Content Ships (Can Build Infrastructure Without)

| # | Question | Source | Impact | Owner |
|---|----------|--------|--------|-------|
| OQ-D.05 | Is FERPA compliance verified for Safetrekr? | D.1-OQ1, Q-4 | Determines K-12 and Higher Ed regulatory badge status (verified vs. unverified). | Business Owner / Legal |
| OQ-D.06 | Is COPPA applicable to Safetrekr's data handling? | D.1-OQ2 | Determines K-12 regulatory badge status. | Business Owner / Legal |
| OQ-D.07 | Does Safetrekr's certification tracking cover specific SafeSport compliance requirements? | D.1-OQ3 | Determines Youth Sports regulatory badge status. | Business Owner |
| OQ-D.08 | Does Safetrekr explicitly align with ISO 31030? | D.1-OQ4 | Determines Business vertical regulatory badge status. | Business Owner / Legal |
| OQ-D.09 | Is the independent safety analyst review operational at D.1 ship time? | D.1-OQ5 | If not operational, analyst review claims across all 5 verticals must be qualified ("coming soon" or similar). | Business Owner / Product |
| OQ-D.10 | Are any pilot customers willing to provide testimonials, logo permission, or case study participation? | D.2-OQ1 | Determines whether D.2 ships with real content or remains in capability-proof mode. | Business Owner / Customer Success |
| OQ-D.11 | What is the editorial review process for blog posts? Who approves `status: 'published'`? | D.4-OQ3 | Determines whether posts require business owner sign-off or can be published by the narrative strategist directly. | Business Owner |

### Tier 3: Post-Launch / Non-Blocking

| # | Question | Source | Impact | Owner |
|---|----------|--------|--------|-------|
| OQ-D.12 | Should vertical pages include pricing references or link to `/pricing` without dollar amounts? | D.1-OQ6 | Pricing data is `[UNVALIDATED]`. Referencing specific amounts creates a maintenance burden. | SPO / Business Owner |
| OQ-D.13 | Should the Solutions overview page navigation be updated to a dropdown sub-nav when vertical detail pages ship? | D.1-OQ7, PAD-06 | PAD-06 proactively added `children` field to `MarketingNavItem` for this purpose. | CTA / Design |
| OQ-D.14 | When should `CaseStudyPlaceholder` (D.1) be replaced with `CaseStudyCard` (D.2) for verticals that have real case studies? | Conflict 3 (synthesis) | Requires D.1 component to accept D.2 types. Coordination needed. | Implementing Developer |
| OQ-D.15 | Should blog post OG images be generated dynamically (extending C.4 pattern) or use static default? | D.4-OQ4 | Dynamic OG images for blog posts would improve social sharing but require extending C.4's `og-image-template.tsx`. | Engineering Lead |
| OQ-D.16 | Is a newsletter subscription form desired in the blog layout? | D.4-OQ5 | Out of scope for D.4 but flagged as a future enhancement. Requires form backend (A.4 pattern). | Business Owner |
| OQ-D.17 | Should case study pages include video embed support? | D.2-OQ5 | Video testimonials require hosting infrastructure. Defer unless customer provides video content. | Business Owner / Engineering |
| OQ-D.18 | At what content volume should blog search be implemented? | D.4-OQ6 | SOW suggests "20+ posts." Confirm threshold for triggering a search implementation workstream. | SPO |
| OQ-D.19 | Should the blog support co-authors? | D.4-OQ7 | Current schema supports single author per post. Co-authors require array type change. | Engineering Lead |
| OQ-D.20 | When should CMS migration be evaluated? | D.2-OQ6, D.4-OQ7 | Both D.2 and D.4 use static TypeScript data modules designed for CMS migration. Evaluate when content volume exceeds ~20 items in either system. | CTA / SPO |
| OQ-D.21 | Should D.2 case study pages support structured `CaseStudySection` types (problem/solution/results) or free-form MDX? | D.2-OQ4 | Structured sections enforce consistency but limit creative flexibility. MDX is more flexible but harder to ensure quality. | STW / Engineering |

---

## 8. PMO Sequencing

### 8.1 Effort Summary

| WS ID | Title | Assigned Agent(s) | Size | Effort Est. | New Files | Modified Files | Primary Blocker |
|-------|-------|-------------------|------|-------------|-----------|---------------|-----------------|
| D.1 | Vertical Solution Pages | `narrative-strategist` (copy) + `react-developer` (impl) | L | 16-24h | 11 | 3 | B.7 complete + copy review |
| D.2 | Social Proof System | `react-developer` | M | 8-12h | 15 | 2 | B.2 complete + customer content (ongoing) |
| D.4 | Blog Infrastructure | `react-developer` | M | 8-12h | 19 | 1 | A.1 complete + MDX compatibility spike |
| -- | **Phase D Total** | -- | **L** | **32-48h** | **~45-48** | **~6-8** | -- |

**Effort breakdown by role:**

| Agent | Workstreams | Hours | Notes |
|-------|------------|-------|-------|
| `react-developer` | D.1 impl (8-10h), D.2 (8-12h), D.4 (8-12h) | 24-34h | Same resource bottleneck identified in Phase B. Three workstreams serial. |
| `narrative-strategist` | D.1 copy review + vertical-specific drafts | 8-14h | Can execute in parallel with engineering work if copy is delivered first. |
| Business Owner | Compliance verification, testimonial sourcing, editorial approval | Variable | External dependency. Not engineering effort. |

### 8.2 Critical Path Analysis

The critical path through Phase D is not code complexity -- it is content readiness and inter-phase dependency resolution.

```
Phase B Completion              Phase D Execution
------------------              ------------------

WS-B.7 (Solutions) ----[HARD]----> WS-D.1 (Verticals)
                                    |
                                    +-- Copy review (narrative-strategist): 8-14h
                                    +-- Implementation (react-developer): 8-10h
                                    +-- SME review per vertical: variable

WS-B.2 (Landing) ------[HARD]----> WS-D.2 (Social Proof)
                                    |
                                    +-- Infrastructure (react-developer): 8-12h
                                    +-- Content population: ONGOING (3-6 months)

WS-A.1 (Layout) -------[HARD]----> WS-D.4 (Blog)
WS-B.8 (Legal) --------[SOFT]--/   |
                                    +-- MDX spike: 1-2h
                                    +-- Infrastructure (react-developer): 8-12h
                                    +-- Content creation: SEPARATE WORKSTREAM
```

**Observation (PMO):** WS-D.4 (Blog) has the shortest dependency chain -- it only requires WS-A.1 (marketing layout) which ships in Phase A. D.4 can technically begin as soon as Phase A is complete, even before Phases B and C finish. This makes D.4 the optimal "start early" workstream for Phase D.

### 8.3 Parallel Execution Windows

**Parallel Group 1 (Can start during Phase B/C):**
- WS-D.4 MDX compatibility spike (1-2h) -- Requires only WS-A.1 layout. Test `next-mdx-remote` against Next.js 16.

**Parallel Group 2 (Start after relevant Phase B workstreams complete):**
- WS-D.4 infrastructure (8-12h) -- After A.1 + MDX spike confirms compatibility. Fully independent of D.1 and D.2.
- WS-D.1 copy drafting by narrative strategist (8-14h) -- After B.1 + B.7 copy guide is available. Does not require react-developer.

**Parallel Group 3 (Start after Phase B complete + D.1 copy delivered):**
- WS-D.1 implementation (8-10h) -- After B.7 is live and copy is reviewed.
- WS-D.2 infrastructure (8-12h) -- After B.2 is live. Can run in parallel with D.1 implementation if `VerticalId` type conflict is resolved first (OQ-D.01).

**Sequential constraint:** `react-developer` is assigned to D.1 implementation, D.2, and D.4. Even with parallelization opportunities, a single developer can execute only one at a time. With three workstreams totaling 24-34 hours of implementation, this represents 3-4.5 full working days of serial developer work.

### 8.4 Recommended Sequencing

| Step | What | Who | Prereq | Duration | Notes |
|------|------|-----|--------|----------|-------|
| 0 | Resolve OQ-D.01 (VerticalId type location) | CTA | None | 30min | Decision meeting. Unblocks D.1 and D.2. |
| 1 | D.4 MDX compatibility spike | `react-developer` | A.1 complete | 1-2h | De-risks D.4 architecture. Can happen during Phase B/C. |
| 2 | D.1 copy drafting + SME review | `narrative-strategist` | B.1 + B.7 complete | 8-14h | Parallel with step 3. Delivers copy before developer starts D.1. |
| 3 | D.4 blog infrastructure | `react-developer` | Step 1 passes | 8-12h | First developer workstream. Fewest dependencies. |
| 4 | D.2 social proof infrastructure | `react-developer` | B.2 complete, Step 0 | 8-12h | Second developer workstream. Infrastructure ships with placeholder content. |
| 5 | D.1 vertical pages implementation | `react-developer` | B.7 complete, Step 2 (copy), Step 0 | 8-10h | Third developer workstream. Ships all 5 verticals simultaneously to avoid cross-link 404s (RD-06). |
| 6 | D.2 content population | Business Owner + Customer Success | Pilot customer cooperation | Ongoing | Progressive: logos first, testimonials second, case studies months later. |

**Total developer elapsed time (serial):** 25-36 hours (Steps 1, 3, 4, 5)
**Calendar time (accounting for copy dependency):** Step 2 must deliver copy before Step 5 begins. If narrative strategist delivers copy during Steps 3-4, no calendar delay. If copy is late, Step 5 is delayed.

### 8.5 Resource Allocation

| Agent | Phase D Workstreams | Hours | Availability Constraint |
|-------|-------------------|-------|------------------------|
| `react-developer` | D.4 (8-12h), D.2 (8-12h), D.1 impl (8-10h), MDX spike (1-2h) | 25-36h | Single-threaded bottleneck. Cannot parallelize engineering work across D.1/D.2/D.4. Must complete Phase B and C implementation work first. |
| `narrative-strategist` | D.1 copy (8-14h) | 8-14h | Independent of developer. Can execute during Phase B/C or early Phase D. |
| `world-class-ui-designer` | Not assigned to Phase D | 0h | Available for C.2 remediation or design consultation on D.1/D.2 visual patterns. |
| Business Owner | Compliance verification, testimonial sourcing | Variable | External dependency for D.1 regulatory verification and D.2 content collection. |

---

## 9. Phase Exit Criteria

Phase D is complete when all of the following gates are satisfied. Since Phase D is post-launch, gates can be satisfied incrementally -- there is no single "Phase D launch" moment.

### Gate 1: Vertical Solution Pages (D.1)

- [ ] Dynamic route `src/app/(marketing)/solutions/[vertical]/page.tsx` renders all 5 verticals (k12, higher-ed, churches, youth-sports, business)
- [ ] `generateStaticParams` returns all 5 slugs; `pnpm build` generates static pages for each
- [ ] Each vertical page contains: hero, challenges, responses, regulatory section, feature spotlights, case study placeholder, cross-link navigation, CTA
- [ ] All regulatory claims display correct `verified` / `unverified` badge status
- [ ] No unverified regulatory claim renders a green checkmark (build assertion or visual test)
- [ ] Copy has been reviewed by vertical-specific SME (or business owner has accepted unreviewed copy)
- [ ] Breadcrumb renders: Solutions > [Vertical Name]
- [ ] Cross-link navigation shows only verticals whose detail page is live (no 404 links)
- [ ] Per-page SEO metadata: title, description, OG tags, `SoftwareApplication` JSON-LD
- [ ] Responsive layout tested at mobile (375px), tablet (768px), and desktop (1280px+) breakpoints
- [ ] `pnpm typecheck`, `pnpm lint`, and `pnpm build` pass

### Gate 2: Social Proof System (D.2)

- [ ] `TestimonialCard` renders with quote, attribution, vertical badge, and optional headshot
- [ ] `TestimonialGrid` adapts layout for 1, 2, or 3 cards responsively
- [ ] `CustomerLogoBar` renders with greyscale-to-color hover and optional auto-scroll
- [ ] `CustomerLogoBar` hidden when fewer than `LOGO_BAR_MINIMUM` (3) logos are available
- [ ] `getLandingPageSocialProof()` returns correct mode: `capability` (0 testimonials), `hybrid` (1-2), `testimonials` (3+)
- [ ] Landing page social proof section renders correctly in all three modes
- [ ] Case study listing page at `/case-studies` renders with vertical filtering
- [ ] Case study detail page at `/case-studies/[slug]` renders structured sections
- [ ] Per-case-study SEO metadata: title, description, OG tags, `Article` JSON-LD
- [ ] Content contribution guide is complete and committed to repository
- [ ] Placeholder/capability-proof content displays correctly when no real customer content exists
- [ ] `pnpm typecheck`, `pnpm lint`, and `pnpm build` pass

### Gate 3: Blog Infrastructure (D.4)

- [ ] Blog listing page at `/blog` renders paginated post cards
- [ ] Blog post template at `/blog/[slug]` renders MDX content with custom components (Callout, CTA, Figure)
- [ ] Tag listing page at `/blog/tag/[tag]` filters posts correctly
- [ ] RSS feed at `/blog/feed.xml` generates valid RSS 2.0 XML
- [ ] Frontmatter validation catches malformed metadata at build time (Zod 4 schema)
- [ ] Sample post (`_sample-post.mdx`) demonstrates all supported MDX features
- [ ] Blog TOC renders correctly with heading hierarchy navigation
- [ ] Author byline displays with avatar, name, and role
- [ ] Code blocks render with syntax highlighting (`rehype-pretty-code`) and do not overflow on mobile
- [ ] Blog prose typography is readable: sufficient contrast, comfortable line-height, proper heading hierarchy
- [ ] Print stylesheet produces clean output
- [ ] Sitemap updated to include blog post URLs dynamically
- [ ] Only posts with `status: 'published'` appear in listing, RSS, and sitemap
- [ ] `pnpm typecheck`, `pnpm lint`, and `pnpm build` pass

### Phase D Complete (All Gates)

- [ ] All three gates above are satisfied
- [ ] No `VerticalId` type duplication exists -- single canonical source used by D.1 and D.2
- [ ] `src/lib/content-utils.ts` exists and is imported by both blog and legal pages (utility refactoring complete)
- [ ] All new routes appear in sitemap
- [ ] Analytics `data-analytics-id` attributes present on all interactive elements in new pages
- [ ] Accessibility: all new pages pass the same WCAG checks applied in C.2 audit (new page checklist from C.2 artifacts)

---

## 10. Gaps & Recommendations

### Gap 1: No WS-D.3 (Missing Workstream)

**Finding (STW):** Phase D has workstreams D.1, D.2, and D.4 -- there is no D.3. The deferred items register (combined-recommendations.md) lists D-3 as "Advanced Analytics" but no SOW was produced. The numbering gap creates confusion about whether D.3 was intentionally skipped or accidentally omitted.

**Recommendation:** Add a brief note to the Phase D directory explaining that D-3 (Advanced Analytics) was de-prioritized during planning and may be elevated to a future phase if advanced analytics requirements emerge (e.g., conversion funnel visualization, cohort analysis, custom event dashboards). Do not renumber D.4 to D.3 -- the deferred items register uses D-4 for "Blog / Resources" and changing the ID would break cross-references.

### Gap 2: No Effort Estimate for D.2

**Finding (PMO):** WS-D.2 (Social Proof System) does not include an explicit effort estimate section. D.1 provides "16-24 hours (L)" and D.4 provides "8-12 hours (M)," but D.2 only includes a "Size: M (Medium)" classification without hour ranges.

**Recommendation:** Based on scope analysis (15 new files, 2 modified files, 30 acceptance criteria, 7 components + 2 page templates), D.2 is estimated at 8-12 hours of developer implementation time. The content collection effort (testimonials, logos, case studies) is ongoing and not bounded by engineering hours. Add this estimate to the SOW.

### Gap 3: No Blog Content Calendar or Initial Post Plan

**Finding (SPO):** WS-D.4 builds the blog infrastructure but explicitly excludes content creation. There is no companion workstream, content calendar, or initial post plan for the blog. The infrastructure will ship empty (aside from the `_sample-post.mdx` which is excluded from the listing).

**Recommendation:** Commission a "WS-D.5: Blog Content Plan" from the narrative strategist. This should include: initial 5-post slate targeting high-value keywords identified in B.1 Section 4.6 ("school field trip safety," "duty of care travel," "church mission trip safety checklist"), a publishing cadence (recommended: 2 posts/month for first quarter), and keyword-to-vertical alignment that cross-links blog posts to D.1 vertical pages. Without content, the blog infrastructure is inert.

### Gap 4: No OG Image Strategy for Phase D Pages

**Finding (CTA):** WS-C.4 builds a dynamic OG image system with a shared template (`og-image-template.tsx`) for Phase B pages. Phase D adds approximately 9 new routes (5 verticals, 2 case study, blog listing, blog posts). None of the three D workstreams include `opengraph-image.tsx` file creation or specify whether they should extend C.4's pattern.

**Recommendation:** Each Phase D route should include an `opengraph-image.tsx` file extending C.4's shared template. For blog posts, this could be a single dynamic file that generates OG images from post title and author. For vertical pages, the vertical name and icon should appear on the card. For case studies, the customer name and headline stat should appear. Estimate: 2-4 additional hours of C.4-style work. Can be deferred but should be planned.

### Gap 5: No Accessibility Verification Process for Post-Launch Pages

**Finding (CTA):** WS-C.2 produces an audit and remediation register for Phase B pages. Phase D adds new pages post-launch that will not be covered by the C.2 audit. There is no documented process for ensuring Phase D pages meet the same WCAG 2.1 AA standard.

**Recommendation:** C.2 should produce a "New Page Accessibility Checklist" artifact that Phase D implementers follow for every new page. The checklist should include: contrast verification against the remediated token values, touch target minimum (48px per AD-C.7), semantic heading hierarchy, ARIA landmark regions, keyboard navigation test, and screen reader verification for critical content. Add this as an exit criterion for Phase D.

### Gap 6: CMS Migration Path Documented But Not Coordinated

**Finding (CTA):** Both D.2 and D.4 document CMS migration paths -- D.2 for testimonials/case studies and D.4 for blog posts. Both suggest migration when content volume exceeds ~20 items. However, the migration paths are documented independently without considering that a single CMS decision should cover both content types.

**Recommendation:** When CMS evaluation is triggered (OQ-D.20), evaluate for all content types simultaneously: blog posts, case studies, testimonials, and potentially vertical page content. A single CMS integration is preferable to two separate systems. Candidates should be evaluated against: MDX support (for blog), structured content (for case studies), media handling (for logos/headshots), and preview capabilities.

### Gap 7: No Performance Budget for Phase D Pages

**Finding (CTA):** Phase D adds ~9 new routes with potentially heavy content (long-form vertical pages, case study narratives, MDX-rendered blog posts with code blocks). No workstream defines a performance budget (LCP, FID, CLS targets) for the new pages.

**Recommendation:** Apply the same performance targets used implicitly across Phases A-C: LCP < 2.5s, FID < 100ms, CLS < 0.1. Server-rendered pages with static content should easily meet these targets. The primary risk is blog posts with large images or numerous code blocks. The blog prose CSS should include `width` and `height` attributes on images (via the `Figure` component) to prevent CLS, and code blocks should be server-rendered (which `rehype-pretty-code` handles). Document these targets in D.4's acceptance criteria.

---

## 11. Phase A/B/C Handoff Requirements

This section documents what Phases A, B, and C must deliver for Phase D to execute successfully. These are the "handoff contracts" -- if any item is missing or incomplete, the corresponding Phase D workstream is blocked.

### 11.1 From Phase A

| Artifact | Source WS | Consumed By | Status Requirement |
|----------|----------|------------|-------------------|
| Marketing route group + layout (`(marketing)/layout.tsx`) | A.1 | D.1, D.2, D.4 | Must be complete and stable. All Phase D pages render inside this layout. |
| SEO metadata helper (`generatePageMetadata()`) | A.3 | D.1, D.2, D.4 | Must be exported and documented. Phase D pages call this for per-page metadata. |
| Structured data helpers (`articleSchema()`, `breadcrumbSchema()`) | A.3 | D.2, D.4 | Must support `Article` type for blog posts and case studies. |
| JSON-LD server component | A.3 | D.1, D.2, D.4 | Must be importable from `src/components/seo/json-ld.tsx`. |
| Sitemap generator (`src/app/sitemap.ts`) | A.3 | D.2, D.4 | Must be structured to accept dynamic URL arrays (blog posts, case studies). D.2 and D.4 modify this file. |
| `SITE_CONFIG` with canonical URL | A.3 | D.4 (RSS, canonical URLs) | Must export `url` field. Used for RSS feed `<link>` and blog canonical URLs. |
| `cn()` utility | Existing | D.1, D.2, D.4 | Already in codebase. No action needed. |

### 11.2 From Phase B

| Artifact | Source WS | Consumed By | Status Requirement |
|----------|----------|------------|-------------------|
| Solutions overview page (`/solutions/page.tsx`) | B.7 | D.1 | **HARD DEPENDENCY.** Must be live with working vertical card links. `SolutionVertical` interface must be stable. |
| Vertical stub pages (`/solutions/[vertical]/page.tsx`) | B.7 | D.1 | Must exist. D.1 replaces these stubs entirely. |
| `SolutionVertical` interface | B.7 | D.1 | Must be in `src/lib/interfaces/solutions.ts`. D.1 extends it with `VerticalDetailData`. |
| `solutions-verticals.ts` data module | B.7 | D.1 | Must contain the VERTICALS array with all 5 verticals. D.1 creates per-vertical detail modules that reference this data. |
| `VerticalCard` component | B.7 | D.1 | Reused in cross-link navigation at bottom of each vertical page. |
| `VerticalCardGrid` component | B.7 | D.1 | Reused for sibling vertical cross-links layout. |
| Landing page social proof section | B.2 | D.2 | **HARD DEPENDENCY.** D.2 upgrades/replaces this section with hybrid social proof grid. Component must exist and be replaceable. |
| `GlassCard` component | B.2 | D.1, D.2 | Reused across all Phase D pages for glass-morphism content surfaces. |
| `SectionContainer` component | B.2 | D.1, D.2, D.4 | Reused for consistent section padding and max-width. |
| `BreathingCTA` component | B.2 | D.2 | Used on case study pages for bottom CTA. |
| `MarketingParticleField` component | B.2 | D.1 (optional) | Can be used on vertical pages for ambient decoration if desired. |
| Legal prose CSS and rendering pattern | B.8 | D.4 | D.4 extends `legal-prose.css` typography patterns for blog prose. `legal-utils.ts` utilities are generalized. |
| `LegalTOC` component | B.8 | D.4 | Blog TOC extends this pattern with scroll-to-top enhancement. |
| Content strategy voice guide | B.1 | D.1 | D.1 copy should align with B.1's voice guide (empathetic peer tone). |
| `ComplianceBadge` pattern | B.6 | D.1 | D.1's `RegulationCard` verified/unverified badge mirrors this pattern for consistency. |

### 11.3 From Phase C

| Artifact | Source WS | Consumed By | Status Requirement |
|----------|----------|------------|-------------------|
| Analytics event taxonomy and `trackEvent()` function | C.3 | D.1, D.2, D.4 | Phase D CTAs should use `data-analytics-id` attributes. No direct `trackEvent()` calls needed (delegated listener handles it). |
| `data-analytics-id` convention | C.3 | D.1, D.2, D.4 | All Phase D interactive elements (CTAs, links, form buttons) should include this attribute for automatic tracking. |
| WCAG remediation outcomes (token values) | C.2 | D.1, D.2, D.4 | If C.2 remediation changed color tokens (e.g., `--color-text-tertiary`, opacity floor), Phase D pages inherit the updated values via the token system. No explicit action needed unless tokens were not updated globally. |
| New page accessibility checklist | C.2 | D.1, D.2, D.4 | **GAP (see Gap 5).** C.2 should produce a reusable checklist for post-launch pages. Without it, Phase D pages have no formal accessibility verification process. |
| OG image template (`og-image-template.tsx`) | C.4 | D.1, D.2, D.4 (optional) | **GAP (see Gap 4).** If Phase D pages need dynamic OG images, they import the shared template. Currently no D workstream specifies this. |
| OG constants file (`og-constants.ts`) | C.4 | D.1, D.2, D.4 (optional) | Same gap as above. Contains hardcoded color values for OG image rendering. |

### 11.4 Decisions That Must Be Resolved Before Phase D Begins

| Decision | Phase | Owner | Why Phase D Needs It |
|----------|-------|-------|---------------------|
| Data directory convention (`src/lib/data/` vs `src/lib/config/`) | B (Conflict C-1) | CTA | Phase D must place data files in the same directory as Phase B chose. |
| `VerticalId` canonical type location | D (OQ-D.01) | CTA | Both D.1 and D.2 need this before coding begins. |
| C.2 token remediation values | C | Design + Engineering | Phase D pages must use post-remediation tokens. |
| Pricing validation (Gap 9) | B | Business Owner | If pricing is still `[UNVALIDATED]`, D.1 vertical pages should avoid dollar amounts (RD-05). |
| Compliance certification verification (Gap 10) | B | Business Owner | D.1 `verified: boolean` badges require confirmed compliance status. |

---

*This overview synthesizes findings from 3 Phase D workstream SOWs, 3 prior phase overviews, and the project's combined recommendations document. This is the final phase overview before the synthesis documents. All workstream details, acceptance criteria, risk registers, and open questions should be reviewed at their source documents for implementation-level specificity.*
