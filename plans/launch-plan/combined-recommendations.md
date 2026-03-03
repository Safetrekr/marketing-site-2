# Combined Recommendations — Safetrekr Marketing Site Launch

> **Discovery Date:** 2026-03-02
> **Discovery Depth:** DEEP
> **Input Signals:** holistic-overview.md (synthesized from 10 specialist reviews), product-review-safetrekr-app-v2-verified.md (code-verified capabilities), user feedback during discovery
> **Codebase:** `/Users/jessetarvambp1/Sites/Safetrekr/marketing-site-2`

---

## Context

The Safetrekr marketing site is being built on top of an existing spatial ZUI (Zoomable User Interface) engine originally created for the Tarva product ecosystem. The ZUI features a cinematic gateway boot sequence, 6-capsule ring with morph transitions, 30+ ambient effects, and a complete CSS token system — all already themed for Safetrekr's green/dark command-center aesthetic.

Discovery found that **82% of the existing codebase is directly reusable.** The spatial engine, camera store, morph orchestrator, ambient components, animation system, and CSS tokens all work as-is. The critical gap is not code — it's **content**. Zero marketing copy, zero content pages, zero social proof, and zero SEO infrastructure exist today. The codebase has a working spatial experience with Tarva district labels that needs to be remapped to Safetrekr marketing districts, and a set of traditional marketing pages that need to be created from scratch.

The user explicitly confirmed during discovery that the existing layouts, card animations, and capsule → morph → detail panel navigation pattern should be preserved and augmented — not torn down. The district system (including URL-encoded camera state at `/launch?cx=951&cy=606&cz=0.7&district=project-room`) is a pattern to keep.

Key reframe from discovery: **This is a content + infrastructure project, not a rebuild.** The ZUI engine is done. The marketing site needs traditional pages, copy, SEO, forms, and legal pages layered onto the existing spatial foundation.

---

## Critical Gap Resolutions

### Gap 1: No Marketing Copy Exists

**Decision**: Marketing copy is the critical path blocker. All P0 page implementations depend on having approved copy. Use a structured content-first approach: draft copy per page using the messaging framework in holistic-overview.md (Section 9), then implement pages around the approved copy.

- Copy must follow "Calm Authority" voice: precise, factual, confident, operational vocabulary
- Core message on every page: "When someone asks 'Did you do everything you could?' — Safetrekr is the documented answer."
- Headlines per page are pre-drafted in holistic-overview.md Section 9 — use as starting points
- Objection handling copy pre-drafted in holistic-overview.md Section 9
- Words to use: verified, documented, auditable, deployed, monitoring, standing by, independent, reviewed, protected, accountable
- Words to avoid: seamless, revolutionary, AI-powered (without context), peace of mind (as opener)
- The product-narrative-strategist agent should draft all copy; react-developer implements

### Gap 2: "Read the Brief" CTA Routes to External URL

**Decision**: Update `src/components/gateway/choice-reveal.tsx` line 89 to route to the traditional marketing landing page instead of `window.open('https://safetrekr.com', '_blank')`. The landing page content will live at a new route under the `(marketing)` route group.

- Primary CTA "Enter Mission Control" → `/launch` (no change)
- Secondary CTA "Read the Brief" → scroll to hero section on same page, OR route to `/(marketing)` landing — decision depends on whether we keep gateway at `/` or move it
- See AD-2 (Architecture Decision 2) below for route structure decision

### Gap 3: No Form Backend for Demo Requests

**Decision**: Build a form submission system using Supabase (already in the tech stack).

- Create a `demo_requests` table in Supabase with fields: name, email, phone (optional), organization, organization_type (K-12, Higher Ed, Church, Youth Sports, Business, Other), message (optional), created_at, source_page
- Create an API route at `src/app/api/contact/route.ts` that validates with Zod 4 and inserts into Supabase
- Form component validates client-side (Zod 4) with server-side revalidation
- Success state: "Thank you" message with expected response timeline
- Error state: Inline field errors + toast for server errors
- RLS policy: insert-only for anonymous, read/update for authenticated admin

### Gap 4: District System Contains Tarva Branding

**Decision**: Remap the 6 district IDs from Tarva products to Safetrekr marketing districts. Keep the `DistrictId` type union pattern, the `DistrictMeta` interface, and the capsule ring system — just swap the values.

- Current: `agent-builder | tarva-chat | project-room | tarva-core | tarva-erp | tarva-code`
- New: `how-it-works | who-its-for | platform | security | pricing | get-started`
- Update files: `src/lib/interfaces/district.ts`, `src/stores/districts.store.ts`, `src/components/districts/district-content.tsx`, `src/lib/spatial-actions.ts` (if it references district IDs)
- `CapsuleTelemetry` interface: Replace health/pulse/lastEvent/alerts/freshness with marketing-relevant fields (tagline, stat_line, target_page)
- `MOCK_CAPSULE_DATA` → `MARKETING_CAPSULE_DATA` with real content
- `DISTRICT_CODES` (Z0 beacons): Update 2-letter codes for new districts (HW, WF, PL, SE, PR, GS)
- `DISTRICT_CONFIG` in district-content.tsx: Replace Tarva URLs and descriptions with marketing content and `/how-it-works`, `/platform`, etc. target pages
- The "Get Started" district at ring position 6 uses amber (#F59E0B) instead of green for conversion emphasis (per holistic-overview.md Section 6)
- District API routes (`src/app/api/districts/`) can be removed (they proxy to Tarva localhost apps)

### Gap 5: No SEO Infrastructure

**Decision**: Implement Next.js 16 App Router SEO infrastructure.

- `src/app/robots.ts` — Allow all crawlers, disallow /launch (SPA), /api, /login
- `src/app/sitemap.ts` — Generate sitemap with all marketing pages, priority weights
- Per-page metadata: Each page exports `metadata` or `generateMetadata` with unique title, description, OG image
- OG images: Create `src/app/opengraph-image.tsx` (dynamic OG) or static images in `/public/og/`
- Structured data: Organization schema on all pages, Product schema on pricing, FAQ schema on pricing FAQ
- Canonical URLs on all pages
- No SEO packages needed — Next.js 16 App Router handles all of this natively

### Gap 6: No Mobile Navigation

**Decision**: Create a marketing header with responsive navigation.

- Desktop: Horizontal nav links matching the 6 marketing districts + "Schedule a Briefing" CTA button
- Mobile: Hamburger menu with slide-in panel (same links + CTA)
- Both persist the Oblivion HUD aesthetic (dark, glass-morphism, green accents)
- The ZUI at `/launch` keeps its own nav instruments (minimap, breadcrumb, zoom indicator, command palette)
- Marketing layout wraps content pages only — NOT the gateway or launch pages

### Gap 7: No Error Pages

**Decision**: Create error pages matching the Oblivion HUD aesthetic.

- `src/app/not-found.tsx` — 404 with "Signal Lost" theme, link back to home
- `src/app/error.tsx` — Generic error boundary with "System Fault" theme, retry button
- Both use dark background, glass-morphism card, green accents — same visual DNA

### Gap 8: Legal Pages Content Source Unknown

**Decision**: Legal pages are a business owner decision — template vs. custom.

- Create page shells at `src/app/(marketing)/legal/terms/page.tsx` and `privacy/page.tsx`
- Implement with markdown content rendering (server component)
- Content source: Business owner provides legal text (recommend legal template service like Termly or custom attorney review)
- Flag: Cannot launch without these. Mark as blocking dependency for Phase B.

### Gap 9: Pricing Not Confirmed

**Decision**: Use the per-trip pricing from the product review as working values. Flag for business owner confirmation.

- T1: $450/trip (day trips, local travel)
- T2: $750/trip (multi-day domestic)
- T3: $1,250/trip (international)
- Enterprise: "Contact Sales" (no public price)
- Include contextual framing: cost per traveler, percentage of trip cost, incident cost comparison
- Flag: UNVALIDATED assumption. Pricing page must not go live without business owner sign-off.

### Gap 10: Compliance Certifications Unverified

**Decision**: Security page must only claim certifications that are verified.

- Do NOT claim SOC 2 unless certification is confirmed by business owner
- Do NOT claim FERPA compliance unless verified by legal
- Safe claims based on code-verified product review: RLS, JWT auth, 2FA, encryption at rest/transit, 10 role-based access levels, audit logging
- Structure security page as "Security Architecture" (what we build) vs. "Compliance" (what we certify) — only list verified certifications in the latter
- Flag: BLOCKING for security page content. Business owner must confirm certification status.

---

## Architecture Decisions

### AD-1: Route Structure — Marketing Route Group

**Decision**: Use Next.js App Router route group `(marketing)` for all traditional content pages. Keep gateway at `/` and ZUI at `/launch`.

```
src/app/
├── page.tsx                          — Gateway (cinematic boot → choice reveal)
├── launch/page.tsx                   — Spatial ZUI (existing)
├── (marketing)/
│   ├── layout.tsx                    — Marketing layout (header + footer)
│   ├── landing/page.tsx              — Traditional landing (hero + value props)
│   ├── how-it-works/page.tsx         — 4-phase lifecycle
│   ├── platform/page.tsx             — Feature grid
│   ├── solutions/page.tsx            — Vertical overview
│   ├── pricing/page.tsx              — Pricing tiers + FAQ
│   ├── security/page.tsx             — Security & compliance
│   ├── about/page.tsx                — Team, credentials, field experts
│   ├── contact/page.tsx              — Request demo / schedule briefing
│   └── legal/
│       ├── terms/page.tsx            — Terms of Service
│       └── privacy/page.tsx          — Privacy Policy
├── not-found.tsx                     — 404 page
├── error.tsx                         — Error boundary
├── robots.ts                         — Robots.txt
├── sitemap.ts                        — Sitemap
└── api/
    ├── contact/route.ts              — Form submission endpoint (NEW)
    └── ... (existing AI/telemetry routes)
```

- Gateway at `/` is preserved per user preference — it's the cinematic entry
- "Read the Brief" CTA routes to `/(marketing)/landing` (the traditional hero page)
- All marketing pages are server components for SEO (no 'use client' at page level)
- Marketing layout includes header nav + footer but NOT the ZUI chrome
- Implementation: React components importing from the existing CSS token system
- Preserve: `data-color-scheme="safetrekr"` on `<html>` element (already set in root layout.tsx)

### AD-2: Marketing Page Visual Pattern — Oblivion HUD Content Pages

**Decision**: Content pages use the Oblivion HUD aesthetic but with a traditional page layout. NOT a spatial layout. NOT white/light mode.

- Dark background persists (`--void` → `--deep` gradient)
- Glass-morphism section cards (`bg-white/[0.06] backdrop-blur-[16px]` — same pattern as DetailPanel)
- Subtle ambient effects behind content (faint particle field or horizon scan, low opacity, pointer-events: none)
- Green accent on interactive elements (buttons, links, hover states use `--color-ember-*` tokens)
- Monospace for metadata labels, sans-serif (Geist Sans) for body copy
- 1px borders at low opacity, no drop shadows, no rounded-corner excess
- Breathing glow on primary CTA ("Schedule a Briefing") only — one per page
- Section dividers: thin 1px gradient fades
- Text opacity floor: 40% minimum for readable content (per UI Designer calibration note)
- Use existing Tailwind utilities: `bg-void`, `text-ember`, `bg-abyss`, etc.

### AD-3: District Content Morphing — Pages vs. Inline Detail

**Decision**: When a user clicks a district capsule in the ZUI, the detail panel shows a preview card with a "View Page" CTA that navigates to the corresponding marketing page.

- Keep the existing morph transition (capsule dims, detail panel slides in with spring animation)
- Replace current `DistrictContent` (which shows StationCard with "Open {app}" buttons) with marketing preview cards
- Marketing preview card shows: district headline, 2-3 bullet points, "Read More →" link to target page
- "Get Started" district card shows "Schedule a Briefing" CTA directly (no intermediate page needed)
- This preserves the capsule → morph → detail panel interaction the user loves
- Navigation to full page: `router.push('/how-it-works')` etc. from the detail panel CTA
- Alternative considered: Rendering full page content inside the detail panel — rejected because it would make pages too complex to maintain and breaks SEO (content in client component behind morph state)

### AD-4: Marketing Header/Footer — Shared Layout Component

**Decision**: Create a new `(marketing)/layout.tsx` that wraps all content pages with header and footer. The header and footer are NOT used on gateway (`/`) or ZUI (`/launch`) pages.

- Header: Logo (left) + nav links (center) + "Schedule a Briefing" CTA button (right)
- Nav links: How It Works, Platform, Solutions, Pricing, Security
- Mobile: Hamburger → slide-in panel with same links + CTA
- Footer: Logo + tagline, nav links (3 columns), legal links, copyright
- Aesthetic: Glass-morphism header bar (`backdrop-blur`, low-opacity background), fixed position on scroll
- Both components use the same CSS tokens as the rest of the site
- No color scheme toggle needed — marketing pages are always Safetrekr theme

### AD-5: Form Validation Pattern

**Decision**: Use Zod 4 for both client and server validation (already in the tech stack).

- Define form schema with Zod 4 in a shared file (`src/lib/schemas/contact.ts`)
- Client-side: Validate on blur + submit using the same schema
- Server-side: Re-validate in the API route before database insert
- Form state: React 19 `useActionState` + `useFormStatus` for pending/error states
- Success: Show inline success message (not a redirect — keeps the mission-control feel)
- Error: Inline field errors with green accent error borders

### AD-6: Analytics Integration Approach

**Decision**: Google Analytics 4 via next/script with custom events.

- Install GA4 via `next/script` in root layout with `strategy="afterInteractive"`
- Track: page views (automatic), form submissions (custom event), CTA clicks (custom event), ZUI capsule clicks (custom event), gateway destination choice (custom event)
- Conversion events: form_submit, cta_click (Schedule a Briefing), gateway_choice
- No additional analytics packages needed — GA4 + gtag.js is sufficient for launch

---

## Detailed Requirements

### Landing Page (`/(marketing)/landing`)

- **Hero section**: Full-viewport-height dark glass panel
  - Headline: "Every traveler accounted for." (from holistic-overview.md Section 9)
  - Subheadline: 1-2 sentences on documented accountability
  - Primary CTA: "Schedule a Briefing" (breathing glow animation — `gateway-cta-breathe`)
  - Secondary CTA: "Explore the Platform" (links to `/launch`)
  - Background: Subtle ambient particle field (reuse existing `ParticleField` component at low opacity)
- **Three value propositions**: Glass cards in a row
  - Documented Accountability / Operational Control / Real-Time Intelligence
  - Each card: icon (thin-stroke SVG), title, 2-sentence description
- **How It Works summary**: 4-step visual (Plan → Review → Protect → Monitor)
  - Horizontal timeline with icons and brief descriptions
  - "Learn more →" link to /how-it-works
- **Vertical callouts**: 5 cards (K-12, Higher Ed, Churches, Youth Sports, Business)
  - Each: icon, vertical name, 1-line pain point, link to /solutions
- **Social proof section**: Placeholder structure for when testimonials are available
  - "Trusted by organizations who take safety seriously" header
  - 3-slot testimonial carousel (initially shows value stats or placeholder)
- **Bottom CTA**: Full-width glass bar with "Schedule a Briefing" + "See Pricing"

### How It Works (`/(marketing)/how-it-works`)

- Four-phase lifecycle: Plan → Review → Protect → Monitor
  - Each phase: glass section card with icon, title, 3-5 bullet points, illustration placeholder
  - Independent analyst review section (phase 2) is the centerpiece — most prominent, most detailed
  - Include the 18 review dimensions from product-review-safetrekr-app-v2-verified.md Section 8
- 10-step wizard walkthrough (collapsible or tabbed)
  - Each step: step number, name, 1-sentence description (from product review Section 1)
- Protection system overview (phase 3)
  - Rally points, safe houses, evacuation tiers, geofencing
  - 46 endpoints mentioned (from product review Section 6)
- CTA at bottom: "Schedule a Briefing"

### Platform (`/(marketing)/platform`)

- Feature grid organized by domain (from holistic-overview.md Section 7):
  - Planning & Analysis, Intelligence & Risk, Protection System, Traveler Delivery, Compliance & Audit, HQ Command
  - Each domain: glass card with icon, domain name, 3-5 feature bullet points
  - Features sourced from product-review-safetrekr-app-v2-verified.md (verified capabilities only)
- Four portal overview: Client, Analyst, HQ Console, Traveler App
  - Brief description of each portal's role
  - Screenshot placeholder for each
- Integration architecture section (optional, simplified)
- CTA at bottom: "Schedule a Briefing"

### Solutions (`/(marketing)/solutions`)

- Five vertical cards with vertical-specific messaging (from holistic-overview.md Section 7):
  - **K-12**: FERPA/COPPA compliance, field trip safety, parental consent workflows
  - **Higher Education**: Study abroad, international compliance, student safety
  - **Churches**: Mission trips, international risk assessment, volunteer screening
  - **Youth Sports**: Tournament travel, SafeSport compliance, multi-team coordination
  - **Business**: Corporate travel, duty of care obligations, employee safety
- Each card: icon, vertical name, 3 pain points, 3 Safetrekr solutions, link to future detail page
- Cross-cutting value prop at top: "One platform for every type of organizational travel"
- CTA at bottom: "Schedule a Briefing"

### Pricing (`/(marketing)/pricing`)

- Three tier cards (from holistic-overview.md Section 7):
  - T1 ($450/trip): Day trips, local travel — list included features
  - T2 ($750/trip): Multi-day domestic — list included features
  - T3 ($1,250/trip): International — list included features (highlight analyst review)
  - Enterprise: "Contact Sales" card
- Value reframe section:
  - "Less than 1% of your trip budget"
  - "Compare: one unmanaged incident costs $X"
  - Cost-per-traveler calculation
- Add-ons section: Background checks, insurance integration
- FAQ section (collapsible): 6-8 common pricing questions
  - Suggested: minimum trip requirement? Volume discounts? What's included? Cancellation policy?
- CTA: "Schedule a Briefing" + "Calculate Your Cost" (future)

### Security (`/(marketing)/security`)

- Data architecture section:
  - Supabase RLS (row-level security)
  - Encryption at rest and in transit
  - Data isolation between organizations
- Authentication section:
  - JWT-based auth with 2FA
  - 10 role-based access levels (from product review Section 13)
  - Session management
- Privacy compliance section:
  - GDPR considerations
  - FERPA (if verified — see Gap 10)
  - COPPA (if verified)
  - Data retention policies
- Mobile security section:
  - Offline-first SQLite on device
  - On-device geofencing (no server-side location tracking)
  - Secure data sync
- Operational security section:
  - Employee screening
  - Incident response procedures
- Compliance badges: Only display verified certifications
- CTA: "Schedule a Security Briefing"

### Contact (`/(marketing)/contact`)

- Form fields:
  - Full name (required)
  - Work email (required, validated)
  - Phone (optional)
  - Organization name (required)
  - Organization type (select: K-12, Higher Ed, Church, Youth Sports, Business, Other) (required)
  - Message (optional textarea)
  - Hidden: source_page (which page they came from)
- CTA button: "Schedule a Briefing" (not "Submit")
- Side panel: "What to expect" — brief bullets on what happens next
- Below form: "Or email us at [email]" fallback
- Validation: Zod 4 schema, inline errors, server revalidation
- Success state: Glass card "Thank you" message, no redirect

### About / Team (`/(marketing)/about`)

- **Reference**: `/Users/jessetarvambp1/Sites/Safetrekr/marketing-site/about.html` — existing content with real team data, bios, and agency badges
- **Hero section**: "The people behind Safetrekr" headline, subtitle about ex-advance (USSS) + product & ops leads
- **Why We Started section**: Origin story — decades protecting people in high-risk environments, saw trip leaders struggling with binders and group texts, built Safetrekr to bring field-grade safety intelligence to organizations
- **Leadership section**: 3 glass-morphism cards with:
  - Photo (images available in reference site `/assets/images/people/`)
  - Name, title, 1-sentence summary
  - "Learn more" expandable detail (modal or inline expand) with:
    - What they own (responsibilities)
    - Background (career highlights)
  - People: Mike Dawson (Co-founder & Chief of Safety Operations, 23yr USSS), Alan D. (Chief of Protective Intelligence, 25yr USSS), Bobby Brasher (Co-founder & Chief of School Security, former Director of School Security at Brook Hill)
- **Field Experts section**: ~20 former federal agents and special operators
  - Agency badge grid (6 columns): U.S. Secret Service, DHS Homeland Security, U.S. Marshals Service, Naval Special Warfare, Joint Special Operations, U.S. Army Special Forces
  - Badge images available in reference site `/assets/images/squads/`
  - Summary note: "Combined expertise" callout about protective operations across domestic and international venues
- **Technology & Delivery Partners section**: Top 3 (photo + name + domain) + additional partners in smaller grid
  - Jesse Orrico (Business & Product), Chris Heerdegen (Ops & Monetization), Justin Tabb (AI & Emerging-Tech), Mike Miller (Dev/Sec/Ops), Joe Yin (PMO Director), David Lindahl (AIO/DM Architecture)
- **Contact section**: 3 cards — Partnerships (alan@safetrekr.com), Pilots & Customer Delivery (team@safetrekr.com), Media & Investors (founders@safetrekr.com)
- **Deferred sections** (enable post-launch): Advisors, Operating Principles, Open Roles — all pre-drafted in reference file HTML comments
- CTA at bottom: "Schedule a Briefing"
- Note: Copy team photos from reference site's `/assets/images/people/` and `/assets/images/squads/` to this project's `/public/images/`

### Legal Pages

- Terms of Service and Privacy Policy: Server-rendered markdown content
- Layout: Same marketing layout (header + footer)
- Style: Readable body text at comfortable line length (max-w-prose)
- Last updated date visible
- Content: Provided by business owner (template or custom)

---

## Phase Decomposition

### Phase A: Foundation & Infrastructure

**Objective**: Create the marketing route group, header/footer layout, district system remapping, SEO infrastructure, and form backend — everything needed before content pages can be built.

**Unblocks**: All content page work in Phase B depends on the marketing layout and district remapping.

**Estimated Complexity**: Large (L) — multiple systems, cross-cutting changes

Work Areas:
1. **WS-A.1: Marketing Route Group + Layout** — Frontend — M — Create `(marketing)/layout.tsx` with responsive header (glass-morphism nav, hamburger mobile) and footer. Set up shared marketing page structure with Oblivion HUD aesthetic.
   - Files: `src/app/(marketing)/layout.tsx`, `src/components/layout/marketing-header.tsx`, `src/components/layout/marketing-footer.tsx`
   - Dependencies: None
2. **WS-A.2: District System Remapping + Tarva Cleanup** — Frontend — L — Replace 6 Tarva district IDs with Safetrekr marketing districts in types, stores, content, and spatial actions. Update capsule telemetry to show marketing data. Update Z0 constellation beacon codes. Remove Tarva district API routes. Also: remove/gate 6 Tarva-specific type libraries, Evidence Ledger (7 components), District View overlay (5 components), Tarva-specific hooks, update `constants.ts` APP_NAME. AI subsystem (~20 files) can be preserved or deferred — it doesn't affect marketing pages.
   - Core files: `src/lib/interfaces/district.ts`, `src/stores/districts.store.ts`, `src/components/districts/district-content.tsx`, `src/lib/spatial-actions.ts`, `src/app/api/districts/` (remove)
   - Cleanup files: `src/lib/{agent-builder,tarva-chat,project-room,tarva-core,tarva-erp,tarva-code}-types.ts` (remove), `src/components/evidence-ledger/` (remove/gate), `src/components/district-view/` (update), `src/lib/constants.ts` (rename APP_NAME), `src/hooks/use-{agent-builder,tarva-chat,project-room}-district.ts` (remove)
   - Dependencies: None
3. **WS-A.3: SEO Infrastructure** — Frontend — S — Create robots.ts, sitemap.ts, per-page metadata pattern, OG image generation, structured data helpers.
   - Files: `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/opengraph-image.tsx` or static `/public/og/`
   - Dependencies: WS-A.1 (needs route structure to know page URLs)
4. **WS-A.4: Form Backend + Contact Page** — Full-stack — M — Supabase `demo_requests` table, API route with Zod 4 validation, reusable form component, contact page implementation.
   - Files: `src/app/api/contact/route.ts`, `src/lib/schemas/contact.ts`, `src/app/(marketing)/contact/page.tsx`
   - Dependencies: WS-A.1 (marketing layout)
5. **WS-A.5: Error Pages** — Frontend — S — Create not-found.tsx and error.tsx with Oblivion HUD aesthetic.
   - Files: `src/app/not-found.tsx`, `src/app/error.tsx`
   - Dependencies: None

### Phase B: P0 Content Pages

**Objective**: Implement all P0 marketing pages with real copy, following the Oblivion HUD aesthetic. Each page is a server component for SEO, using glass-morphism section cards and the established token system.

**Unblocks**: Launch. Phase B completion = MVP marketing site ready for launch.

**Estimated Complexity**: Extra Large (XL) — 8 pages, each requiring copy + design + implementation

Work Areas:
1. **WS-B.1: Content Strategy + Copy Drafting** — Content — XL — Draft all marketing copy for P0 pages using the messaging framework, value proposition hierarchy, headline drafts, and objection handling from holistic-overview.md. Must be approved before page implementation begins.
   - Output: Copy deck (markdown) with headlines, body text, CTAs, feature bullets for all 7 P0 pages
   - Dependencies: None (can start immediately, in parallel with Phase A)
2. **WS-B.2: Landing Page** — Frontend — L — Hero section with breathing CTA, three value prop cards, how-it-works summary, vertical callouts, social proof placeholder, bottom CTA bar.
   - Files: `src/app/(marketing)/landing/page.tsx`, section components
   - Dependencies: WS-A.1 (layout), WS-B.1 (copy)
3. **WS-B.3: How It Works Page** — Frontend — L — Four-phase lifecycle, analyst review centerpiece, 10-step wizard, protection system overview.
   - Files: `src/app/(marketing)/how-it-works/page.tsx`
   - Dependencies: WS-A.1, WS-B.1
4. **WS-B.4: Platform Page** — Frontend — M — Feature grid by domain, four portal overview, integration overview.
   - Files: `src/app/(marketing)/platform/page.tsx`
   - Dependencies: WS-A.1, WS-B.1
5. **WS-B.5: Pricing Page** — Frontend — M — Three tier cards, value reframe section, add-ons, FAQ (collapsible).
   - Files: `src/app/(marketing)/pricing/page.tsx`
   - Dependencies: WS-A.1, WS-B.1, Gap 9 resolution (pricing confirmation)
6. **WS-B.6: Security Page** — Frontend — M — Data architecture, auth, privacy compliance, mobile security, operational security, compliance badges.
   - Files: `src/app/(marketing)/security/page.tsx`
   - Dependencies: WS-A.1, WS-B.1, Gap 10 resolution (compliance verification)
7. **WS-B.7: Solutions Overview Page** — Frontend — M — Five vertical cards with pain points and Safetrekr solutions.
   - Files: `src/app/(marketing)/solutions/page.tsx`
   - Dependencies: WS-A.1, WS-B.1
8. **WS-B.8: Legal Pages** — Frontend — S — Terms of service and privacy policy pages with markdown rendering.
   - Files: `src/app/(marketing)/legal/terms/page.tsx`, `src/app/(marketing)/legal/privacy/page.tsx`
   - Dependencies: WS-A.1, legal content from business owner
9. **WS-B.9: About / Team Page** — Frontend + Content — M — Leadership team with photo cards and expandable bios, field experts section with agency badges (~20 former federal agents), technology partners grid, contact channels. Reference content: `/Users/jessetarvambp1/Sites/Safetrekr/marketing-site/about.html`
   - Files: `src/app/(marketing)/about/page.tsx`, leadership data module
   - Dependencies: WS-A.1 (layout)
   - Content: Real team data available in reference file — Mike Dawson (23yr USSS), Alan D. (25yr USSS), Bobby Brasher (school security), field experts (~20 former agents from USSS, DHS, Marshals, Navy SEALs, JSOC, Army SF), tech partners (Jesse Orrico, Chris Heerdegen, Justin Tabb, Mike Miller, Joe Yin, David Lindahl)
   - Note: Reference file also has commented-out sections (Advisors, Operating Principles, Open Roles) that can be enabled post-launch

### Phase C: Integration & Polish

**Objective**: Connect the gateway to marketing pages, ensure mobile responsiveness, add analytics, and complete OG/social sharing metadata.

**Unblocks**: Public launch readiness. Phase C completion = site is production-ready.

**Estimated Complexity**: Medium (M) — integration and polish work

Work Areas:
1. **WS-C.1: Gateway Integration** — Frontend — S — Update `choice-reveal.tsx` to route "Read the Brief" to the marketing landing page. Ensure smooth transition from gateway → marketing pages.
   - Files: `src/components/gateway/choice-reveal.tsx`
   - Dependencies: WS-B.2 (landing page exists)
2. **WS-C.2: Mobile Responsive Audit** — Frontend — M — Ensure all marketing pages render correctly on mobile. Test header/footer responsive behavior. Verify ZUI graceful degradation on touch devices.
   - Files: All Phase B page files + header/footer
   - Dependencies: Phase B complete
3. **WS-C.3: Analytics Integration** — Frontend — S — GA4 setup via next/script, custom event tracking for form submissions, CTA clicks, gateway choices, capsule clicks.
   - Files: `src/app/layout.tsx` (script tag), `src/lib/analytics.ts` (event helpers)
   - Dependencies: WS-A.1
4. **WS-C.4: OG Images & Social Sharing** — Frontend — S — Per-page OG images, Twitter cards, social sharing metadata.
   - Files: Per-page metadata exports or `src/app/opengraph-image.tsx`
   - Dependencies: Phase B complete (need page titles/descriptions)

### Phase D: Content Depth (Post-Launch)

**Objective**: Add vertical-specific pages, social proof, about page, and blog infrastructure.

**Unblocks**: Growth and SEO authority. Phase D is post-MVP.

**Estimated Complexity**: Large (L) — significant content creation

Work Areas:
1. **WS-D.1: Vertical Solution Pages** — Frontend + Content — L — Individual pages for `/solutions/k12`, `/solutions/higher-education`, `/solutions/churches`, `/solutions/youth-sports`, `/solutions/business`. Each with vertical-specific copy, pain points, compliance requirements, and case study placeholders.
2. **WS-D.2: Social Proof System** — Frontend — M — Testimonial component, customer logo bar, case study page template. Initially populated with pilot customer content when available.
3. **WS-D.3: About Page** — Frontend + Content — S — Team, credentials, mission, safety/security credentials emphasis.
4. **WS-D.4: Blog Infrastructure** — Frontend — M — Blog listing page, blog post template, MDX or CMS integration for content management.

---

## Risk Register

| # | Risk | Likelihood | Impact | Severity | Blocking? | Mitigation |
|---|------|-----------|--------|----------|-----------|------------|
| R-01 | No marketing copy exists — content is the critical path | HIGH | HIGH | **Critical** | Yes (Phase B) | WS-B.1 starts immediately, in parallel with Phase A infra work. Use holistic-overview.md messaging framework as starting drafts. |
| R-02 | Dark HUD aesthetic may not resonate with 40-60yr security directors | MEDIUM | HIGH | **High** | No | Holistic overview addresses this: the aesthetic says "we take safety as seriously as you do." Validate with target user testing post-launch. Text readability floor at 40% opacity mitigates usability concern. |
| R-03 | Scaffolded features in product (21 HQ Console stubs) could create liability if marketed | MEDIUM | HIGH | **High** | No | Marketing pages only describe verified-implemented features from product review. Scaffolded features are not mentioned. |
| R-04 | Legal pages missing at launch | HIGH | HIGH | **High** | Yes (launch) | Flag to business owner immediately. Use template service if custom legal review not ready. |
| R-05 | Compliance certifications unverified (SOC 2, FERPA) | MEDIUM | HIGH | **High** | Yes (security page) | Security page structured to separate "Security Architecture" (can publish) from "Certifications" (needs verification). Ship architecture section first, add certs when confirmed. |
| R-06 | No social proof reduces conversion 40-60% | HIGH | MEDIUM | **High** | No | Phase D work. Placeholder structure in landing page. Begin pilot customer outreach immediately (business owner action). |
| R-07 | Pricing not confirmed by business owner | MEDIUM | MEDIUM | **Medium** | Yes (pricing page) | Use product review pricing as working values. Flag for explicit business owner confirmation before pricing page goes live. |
| R-08 | Mobile ZUI usability | MEDIUM | MEDIUM | **Medium** | No | Hybrid approach: marketing pages are traditional responsive. ZUI at /launch shows "best on desktop" notice on mobile. Marketing header provides full navigation on mobile. |
| R-09 | Gateway cinematic entry may increase bounce rate | LOW | MEDIUM | **Medium** | No | Skip affordance already exists. "Read the Brief" CTA provides immediate escape to traditional content. Consider adding direct URL access to landing page (bypass gateway). |
| R-10 | Content staleness post-launch | LOW | LOW | **Low** | No | Phase D includes blog infrastructure. Content pages are Next.js server components — easy to update via code deploy. |
| R-11 | @tarva/ui workspace dependency — `package.json` links to `../../tarva-org/tarva-ui-library` via workspace protocol. Will fail in production deployment (Vercel, Netlify) unless monorepo support is configured or package is published to npm | HIGH | HIGH | **Critical** | Yes (deployment) | Verify deployment strategy before build. Options: (a) publish @tarva/ui to npm, (b) vendor the library into the project, (c) configure Vercel monorepo root to include the UI library. Discovered by Product Owner consultation — not addressed in any of the 10 specialist reviews. |
| R-12 | Contact form operational workflow undefined — form writes to Supabase but who gets notified? Response SLA? Auto-response email? | MEDIUM | MEDIUM | **Medium** | No | MVP: Supabase webhook + email notification to defined address. No CRM, no automation. Define human follow-up process. |
| R-13 | Tarva-specific code artifacts beyond districts — 6 type libraries (`agent-builder-types.ts`, `tarva-chat-types.ts`, etc.), Evidence Ledger (7 components), District View overlay (5 components), AI subsystem (~20 files), Tarva-specific hooks (3+), `constants.ts` says "Tarva Launch". Phase 3 validation found more cleanup than initially estimated. | MEDIUM | LOW | **Medium** | No | Remove or gate during Phase A. TypeScript compiler will catch missed references after district type rename. |
| R-14 | Accessibility compliance risk — dark HUD aesthetic with 40% opacity text floor, green-on-dark color scheme, glass-morphism effects creates WCAG 2.1 AA compliance risk. Target audience includes 50+ yr administrators on institutional Dell monitors. | MEDIUM | HIGH | **High** | No | Include accessibility audit in WS-C.2 (Mobile Responsive Audit → expand to Mobile + Accessibility Audit). Test contrast ratios, focus indicators, screen reader compatibility. |

---

## Open Questions for Stakeholder

| # | Question | Context | Needed By |
|---|----------|---------|-----------|
| Q-1 | Are the per-trip prices confirmed? T1: $450, T2: $750, T3: $1,250? | Product review uses these values but they haven't been explicitly confirmed for marketing | Before WS-B.5 (Pricing page) |
| Q-2 | Is there a free trial or freemium offer? | Some reviews mentioned 14-day trial but it's not in the product codebase | Before WS-B.5 |
| Q-3 | What is the SOC 2 certification status? | Cannot claim on security page without verification | Before WS-B.6 (Security page) |
| Q-4 | Is FERPA compliance verified by legal? | Cannot claim on security page without verification | Before WS-B.6 |
| Q-5 | Legal pages: Use template service or custom attorney? | Affects timeline and cost | Before WS-B.8 (Legal pages) |
| Q-6 | Who writes marketing copy? In-house, external, or AI-assisted? | Critical path bottleneck — WS-B.1 | Before Phase B |
| Q-7 | Any pilot customers available for testimonials? | Social proof urgently needed for conversion | Before Phase D |
| Q-8 | What is the primary domain? safetrekr.com? | Affects canonical URLs, OG metadata, sitemap | Before WS-A.3 (SEO) |
| Q-9 | GA4 property ID? Or create new? | Analytics setup | Before WS-C.3 |
| Q-10 | Should visitors be able to skip the gateway and go directly to marketing pages via URL? | Currently gateway is at `/`, all marketing pages require navigating through it or knowing the URL | Before WS-C.1 |
| Q-11 | Gateway fate: Keep at `/` (user preference) or move landing page to `/` (PO recommendation for conversion)? | PO recommends: landing page at `/`, gateway as opt-in at `/experience`. User has expressed desire to keep gateway. Both valid — product decision. See AD-1 note below. | Before Phase B |
| Q-12 | @tarva/ui deployment strategy? Is the tarva-ui-library available as npm package, or does deployment need monorepo configuration? | `package.json` workspace link to `../../tarva-org/tarva-ui-library` — production deployment blocker | Before any deployment |
| Q-13 | Contact form notification: Who receives demo request emails? What is the response SLA? | Needed to configure Supabase webhook/edge function for notifications | Before WS-A.4 |

---

## Constraints and Non-Negotiables

1. **Oblivion HUD / Mission-Control Aesthetic** — All pages dark backgrounds, glass-morphism, green accents, ambient effects. No white pages, no generic B2B SaaS templates. See CLAUDE.md "Visual Identity" and holistic-overview.md Section 1.
2. **"Safetrekr" naming** — Never "SafeTrekr" (camelCase). Always "Safetrekr."
3. **"Calm Authority" brand voice** — Precise, factual, confident, operational. Never fear-mongering. "Peace of mind" as emotional close only, never headline.
4. **Independent analyst review** featured on every page — This is THE differentiator.
5. **pnpm only** — Never npm.
6. **motion/react** — Never framer-motion.
7. **Next.js 16 App Router** — Server components for all marketing pages (SEO).
8. **Existing ZUI untouched** — Camera store, spatial math, morph system, ambient components preserved. Augment, don't rebuild.
9. **District system preserved** — Keep the capsule ring, morph transitions, URL-encoded camera state. Just rename district IDs and swap content.
10. **Node >= 22** required.
11. **@tarva/ui** — Use existing component library for buttons, badges, etc.
12. **Zod 4** for validation (already in stack).
13. **Supabase** for form backend (already in stack).

---

## Deferred Items (Out of Scope)

| # | Item | Why Deferred | Revisit Trigger |
|---|------|-------------|-----------------|
| D-1 | Individual vertical pages (/solutions/k12, etc.) | Phase D — need vertical-specific copy and use cases | After Phase B launch, when copy is ready |
| D-2 | Social proof content (testimonials, case studies) | No pilot customers yet | When first pilot customer testimonial is available |
| D-3 | ~~About page~~ | **PROMOTED to Phase B (WS-B.9)** — reference content exists at `/marketing-site/about.html` with real team bios, field expert credentials, agency badges. Critical trust signal for target audience. | N/A |
| D-4 | Blog / Resources | Content creation infrastructure, not launch-critical | When content marketing strategy is defined |
| D-5 | ROI calculator | Interactive tool, high effort | Phase D or later, data-dependent |
| D-6 | Competitor comparison pages | Requires competitive intelligence gathering | When competitive positioning is formalized |
| D-7 | CRM integration | Form data currently goes to Supabase | When CRM is selected and configured |
| D-8 | A/B testing infrastructure | Premature without traffic baseline | After 30 days of traffic data |
| D-9 | Knowledge base / Help center | Post-sales content, not marketing | When customer onboarding begins |
| D-10 | Cookie consent / GDPR banner | May be needed for EU visitors | Before EU marketing launch |
| D-11 | Internationalization (i18n) | Single-language launch | If international markets are targeted |
| D-12 | Advanced ZUI animation polish | Current animations work well | When core content is stable and conversion is being optimized |

---

## Assumptions Register

| # | Assumption | Status | Source |
|---|-----------|--------|--------|
| A-1 | Gateway boot sequence stays at `/` as the site entry point | VALIDATED | User confirmed during discovery |
| A-2 | Capsule → morph → detail panel pattern is preserved and augmented | VALIDATED | User explicitly confirmed "the way the main cards are clickable and resolve to another page is really cool" |
| A-3 | Districts keep the term "district" in code (not renamed to "capsule" or "card") | VALIDATED | User confirmed "I think we call them districts" |
| A-4 | URL-encoded camera state pattern (`/launch?cx=...&cy=...&cz=...&district=...`) is preserved | VALIDATED | User provided example URL during discovery |
| A-5 | Per-trip pricing is $450/$750/$1,250 | UNVALIDATED | From product review — needs business owner confirmation |
| A-6 | SOC 2 certification status is unknown | UNVALIDATED | Not confirmed by business owner |
| A-7 | FERPA compliance status is unknown | UNVALIDATED | Not confirmed by legal |
| A-8 | 82% of existing code is reusable for marketing site | VALIDATED | Confirmed by Phase 2 codebase exploration — ZUI engine, tokens, ambient components all usable |
| A-9 | No free trial or freemium tier exists | UNVALIDATED | Not found in product codebase, not confirmed |
| A-10 | Legal pages will use template content (not custom attorney) | UNVALIDATED | Business owner decision |
| A-11 | GA4 is the analytics platform | UNVALIDATED | Recommended, needs confirmation |
| A-12 | safetrekr.com is the production domain | UNVALIDATED | Used in current choice-reveal.tsx but not confirmed |
| A-13 | Only verified-implemented features are marketed (not scaffolded features) | VALIDATED | Discovery decision — prevents liability from marketing unfinished features |
| A-14 | The dark HUD aesthetic is appropriate for the target audience | VALIDATED | User confirmed "it looks beautiful and I want to keep going that direction." Holistic overview provides rationale. |
| A-15 | Marketing copy will be drafted as part of this project (not provided externally) | UNVALIDATED | Depends on Q-6 (who writes copy) |
