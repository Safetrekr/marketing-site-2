# WS-D.1: Vertical Solution Pages

> **Workstream ID:** WS-D.1
> **Phase:** D -- Content Depth (Post-Launch)
> **Assigned Agents:** `world-class-product-narrative-strategist` (copy), `react-developer` (implementation)
> **Status:** Draft
> **Created:** 2026-03-02
> **Last Updated:** 2026-03-02
> **Depends On:** WS-B.7 (Solutions Overview Page -- provides parent navigation, vertical data module, `SolutionVertical` interface, and `VerticalCard` component), WS-B.1 (Content Strategy + Copy Drafting -- provides voice guide, messaging hierarchy, objection handling bank)
> **Blocks:** None
> **Resolves:** D-1 (Individual vertical pages deferred from Phase B)

---

## 1. Objective

Build five vertical-specific solution pages at `/solutions/k12`, `/solutions/higher-ed`, `/solutions/churches`, `/solutions/youth-sports`, and `/solutions/business`. Each page replaces the placeholder stub created in WS-B.7 (Section 4.14) with a full-depth, SEO-optimized content page that speaks directly to the security director, risk manager, or operations lead responsible for travel safety within that vertical.

The Solutions overview page (WS-B.7) helps the buyer self-identify by vertical. These vertical detail pages close the evaluation loop -- they demonstrate that Safetrekr understands the specific regulatory environment, operational pain, compliance burden, and accountability demands of the buyer's organization type. Every page must answer the buyer's implicit question: "Is this platform actually built for someone like me, or is the vertical label just marketing?"

Each page follows a shared template structure but contains entirely distinct content: vertical-specific pain narratives, regulatory and compliance requirements unique to that sector, Safetrekr feature spotlights mapped to the vertical's workflows, and a case study placeholder designed for future activation when pilot customer data is available.

The independent safety analyst review is the killer differentiator. Every vertical page must position the analyst review as the answer to that vertical's most specific accountability question -- the question that a superintendent, a university risk counsel, a church board, a league director, or a corporate legal team would ask after an incident.

**Tone per WS-B.1 Section 4.1:** "Empathetic peer." These pages acknowledge vertical-specific pain before presenting Safetrekr's response. The buyer should feel understood -- not marketed to.

---

## 2. Scope

### In Scope

| # | Item | Notes |
|---|------|-------|
| 1 | `src/app/(marketing)/solutions/[vertical]/page.tsx` -- upgraded from stub to full template | Replaces the placeholder page from WS-B.7 Section 4.14. Dynamic route with `generateStaticParams` for all 5 verticals. Server component. |
| 2 | `VerticalDetailTemplate` server component | Shared page template that all 5 verticals render through. Accepts a `VerticalDetailData` object and composes all sections. |
| 3 | `VerticalDetailData` interface (`src/lib/interfaces/solutions.ts`) | Extended interface for deep vertical content: challenges, responses, regulations, feature spotlights, case study placeholder, SEO metadata. Extends the existing `SolutionVertical` from WS-B.7. |
| 4 | Per-vertical data modules (`src/lib/data/verticals/`) | Five TypeScript data files, one per vertical, each exporting a `VerticalDetailData` object with complete copy. |
| 5 | Vertical-specific copy for all 5 pages | Full-depth content drafted by the narrative strategist: hero, challenge narrative, Safetrekr response, regulatory/compliance section, feature spotlights, objection hooks, CTA micro-copy. |
| 6 | Regulatory and compliance content per vertical | K-12: FERPA, COPPA, state field trip mandates. Higher Ed: Clery Act, Title IX, FERPA. Churches: Safe Sanctuaries, child protection policies. Youth Sports: SafeSport, state screening mandates. Business: OSHA, ISO 31030, duty of care. |
| 7 | `CaseStudyPlaceholder` server component | Reusable glass-morphism card with vertical-aware placeholder content. Designed for easy swap when pilot customer data becomes available (WS-D.2). |
| 8 | `RegulationCard` server component | Renders a single regulatory requirement with name, description, Safetrekr alignment statement, and verification status badge. |
| 9 | `FeatureSpotlight` server component | Renders a platform feature highlight relevant to the vertical, with title, description, and optional metric. |
| 10 | `VerticalBreadcrumb` server component | Breadcrumb trail: Solutions > [Vertical Name]. Uses `<nav aria-label="Breadcrumb">`. |
| 11 | Cross-link navigation between vertical pages | "Other solutions" section at page bottom linking to sibling vertical pages. Reuses `VerticalCard` from WS-B.7. |
| 12 | Per-page SEO metadata via `generateMetadata` | Dynamic title, description, OpenGraph tags, and JSON-LD structured data per vertical. |
| 13 | JSON-LD structured data per vertical | `SoftwareApplication` schema with vertical-specific audience targeting. |
| 14 | Responsive layout | All sections responsive across mobile, tablet, and desktop breakpoints. |
| 15 | Accessibility | Semantic HTML, ARIA landmarks, keyboard-navigable links, focus indicators, image alt text where applicable. |

### Out of Scope

| # | Item | Rationale |
|---|------|-----------|
| 1 | Real case study content | WS-D.2 (Social Proof System) handles testimonial and case study content when pilot customer data is available. This workstream creates the placeholder structure. |
| 2 | Vertical-specific imagery or illustrations | No vertical-specific visual assets exist. Lucide icons (already in WS-B.7) serve as visual anchors. Illustrations are a design task for a future sprint. |
| 3 | Interactive ROI calculators per vertical | Deferred item D-5. These pages use static value-reframe copy instead. |
| 4 | Competitor comparison per vertical | Deferred item D-6. Competitive positioning per vertical requires intelligence gathering not yet completed. |
| 5 | Analytics instrumentation | WS-C.3 handles event tracking. Vertical pages inherit the same tracking pattern as all marketing pages. |
| 6 | OG image generation per vertical | WS-C.4 handles social images. Vertical pages use `generateMetadata` for text-based OG tags; images deferred. |
| 7 | Gated content (PDF downloads, whitepapers) | Post-launch content marketing deliverable. Not in scope for initial vertical pages. |
| 8 | Blog or resource links per vertical | Depends on WS-D.4 (Blog Infrastructure). Not available at vertical page launch. |

---

## 3. Input Dependencies

### Codebase Files to Reference

| File | What to Use From It |
|------|---------------------|
| `src/app/(marketing)/solutions/page.tsx` | Parent Solutions overview page (WS-B.7). Vertical detail pages are children of this route. |
| `src/app/(marketing)/solutions/[vertical]/page.tsx` | Existing stub placeholder from WS-B.7 Section 4.14. This file is replaced entirely by this workstream. |
| `src/lib/interfaces/solutions.ts` | `SolutionVertical` interface. Extended by this workstream with `VerticalDetailData`. |
| `src/lib/data/solutions-verticals.ts` | `VERTICALS` array with overview-level data for all 5 verticals (pain points, solutions, CTAs). Deep content in this workstream expands on these foundations. |
| `src/components/marketing/solutions/vertical-card.tsx` | `VerticalCard` component from WS-B.7. Reused in the cross-link navigation section at the bottom of each vertical page. |
| `src/components/marketing/solutions/vertical-card-grid.tsx` | `VerticalCardGrid` from WS-B.7. Reused for the sibling vertical cross-links. |
| `src/styles/spatial-tokens.css` | Safetrekr dark-mode tokens. Same token set as WS-B.7: `--color-void`, `--color-ember`, `--color-ember-bright`, `--color-text-primary`, `--color-text-secondary`, `--color-text-tertiary`, `--ember-rgb`. |
| `src/components/districts/detail-panel.tsx` | Glass-morphism canonical pattern: `bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]` + `border border-white/[0.08]`. |
| `src/lib/utils.ts` | `cn()` utility. `import { cn } from '@/lib/utils'` |
| `plans/launch-plan/phase-b-p0-content-pages/ws-b.1-content-strategy-copy-drafting.md` | Voice guide (Section 4.1), messaging hierarchy (Section 4.2), value proposition framework (Section 4.3), objection handling bank (Section 4.5), SEO keyword targets (Section 4.6). |
| `plans/launch-plan/phase-b-p0-content-pages/ws-b.7-solutions-overview-page.md` | Parent page structure, data module format, component patterns, slug definitions. |

### External Dependencies

| Dependency | Owner | Status | Impact |
|------------|-------|--------|--------|
| Solutions overview page (WS-B.7) live and functional | React Developer | **Required** | Vertical pages are children of `/solutions`. The parent page must exist with working links to vertical slugs. |
| Approved overview-level copy from WS-B.1 Section 4.4.4 | Content Strategist | **Required** | The overview copy establishes the pain/solution framing that deep vertical copy expands upon. |
| FERPA compliance verification (Q-4 from combined-recommendations.md) | Business Owner / Legal | **Open** | Affects K-12 and Higher Education regulatory sections. If unverified, regulatory copy uses "designed with student data privacy in mind" framing instead of compliance claims. |
| COPPA applicability confirmation | Business Owner / Legal | **Open** | Affects K-12 regulatory section. Same mitigation as FERPA. |
| SafeSport compliance details | Business Owner | **Open** | Affects Youth Sports regulatory section. Need to confirm whether Safetrekr's certification tracking covers specific SafeSport compliance requirements. |
| Pilot customer data for case studies (Q-7) | Business Owner | **Not started** | Case study placeholders are designed for future activation. Real data replaces placeholders when available. Not blocking for initial launch. |
| ISO 31030 applicability | Business Owner / Legal | **Open** | Business vertical references ISO 31030 (Travel Risk Management). Need confirmation on whether Safetrekr explicitly aligns with this standard or uses general duty-of-care framing. |

### Package Dependencies

No new package dependencies. This workstream uses only:
- `lucide-react` (already installed) -- for vertical icons and decorative elements
- `next/link` (framework) -- for internal navigation links
- `next` (framework) -- for `Metadata` type and `generateMetadata`/`generateStaticParams`

---

## 4. Deliverables

### 4.1 Extended Type Definitions (`src/lib/interfaces/solutions.ts`)

Extend the existing `solutions.ts` file (created by WS-B.7) with the `VerticalDetailData` interface.

```typescript
// Added to src/lib/interfaces/solutions.ts (below existing SolutionVertical)

/** A single regulatory or compliance requirement relevant to a vertical. */
export interface VerticalRegulation {
  /** Short regulatory name (e.g., "FERPA", "SafeSport") */
  name: string
  /** Full name of the regulation or standard */
  fullName: string
  /** One-sentence description of what the regulation requires */
  description: string
  /** How Safetrekr addresses or aligns with this requirement */
  safetrekrAlignment: string
  /** Whether this compliance claim has been verified by legal/business owner */
  verified: boolean
}

/** An expanded challenge faced by the vertical (deeper than overview pain points). */
export interface VerticalChallenge {
  /** Short challenge title (e.g., "Consent Tracking at Scale") */
  title: string
  /** 2-3 sentence narrative describing the challenge in the buyer's language */
  description: string
}

/** Safetrekr's response to a vertical challenge, mapped to platform capabilities. */
export interface VerticalResponse {
  /** Short response title (e.g., "Structured Document Collection") */
  title: string
  /** 2-3 sentence description of the Safetrekr capability */
  description: string
  /** Optional reference to a verified platform feature from the product review */
  featureRef?: string
}

/** A platform feature highlighted for its relevance to the vertical. */
export interface VerticalFeatureSpotlight {
  /** Feature title */
  title: string
  /** 1-2 sentence description of the feature in vertical context */
  description: string
  /** Optional quantitative metric (e.g., "18 review dimensions") */
  metric?: string
  /** Lucide icon name for visual anchor */
  iconName?: string
}

/** Case study placeholder structure for future activation. */
export interface CaseStudyPlaceholderData {
  /** Vertical type label (e.g., "K-12 School District") */
  verticalType: string
  /** Suggested case study title for when real data is available */
  suggestedTitle: string
  /** Suggested metrics to capture from the pilot (e.g., "Time to complete trip planning") */
  suggestedMetrics: string[]
  /** Placeholder body copy */
  placeholderCopy: string
}

/** Full-depth vertical detail page data. */
export interface VerticalDetailData {
  /** Vertical identifier (matches SolutionVertical.id and URL slug) */
  id: string
  /** Display name */
  name: string
  /** Lucide icon name (matches SolutionVertical.iconName) */
  iconName: string

  // Hero
  /** H1 headline for the vertical page */
  heroHeadline: string
  /** H2 subheadline (1-2 sentences) */
  heroSubheadline: string

  // The Challenge (expanded from SolutionVertical.painPoints)
  /** Section intro copy for "The Challenge" */
  challengeIntro: string
  /** 4-6 expanded challenges */
  challenges: VerticalChallenge[]

  // The Safetrekr Response (expanded from SolutionVertical.solutions)
  /** Section intro copy for "The Safetrekr Response" */
  responseIntro: string
  /** 4-6 responses mapped to challenges */
  responses: VerticalResponse[]

  // Regulatory and Compliance
  /** Section intro copy for regulatory section */
  regulatoryIntro: string
  /** 3-5 regulations relevant to this vertical */
  regulations: VerticalRegulation[]

  // Feature Spotlight
  /** 3-4 platform features most relevant to this vertical */
  featureSpotlights: VerticalFeatureSpotlight[]

  // Differentiator Callout
  /** The vertical-specific "accountability question" that the analyst review answers */
  accountabilityQuestion: string
  /** The answer framing Safetrekr's independent analyst review */
  accountabilityAnswer: string

  // Case Study Placeholder
  caseStudy: CaseStudyPlaceholderData

  // Objection Hook (vertical-specific)
  /** The most common objection from this vertical's buyers */
  objectionQuestion: string
  /** The reframe + proof response */
  objectionAnswer: string

  // CTA
  /** Vertical-aware micro-copy for the bottom CTA */
  ctaMicrocopy: string

  // SEO
  seoTitle: string
  seoDescription: string
  /** Primary SEO keywords for this vertical page */
  seoKeywords: string[]
}
```

### 4.2 Vertical Data Directory Structure

Each vertical gets its own data file under a `verticals/` subdirectory. This keeps the data modules manageable (each is approximately 150-200 lines) and enables independent editing per vertical.

```
src/lib/data/verticals/
  k12.ts
  higher-ed.ts
  churches.ts
  youth-sports.ts
  business.ts
  index.ts          -- barrel export + slug-to-data lookup map
```

**Barrel export and lookup map:**

```typescript
// src/lib/data/verticals/index.ts

import type { VerticalDetailData } from '@/lib/interfaces/solutions'
import { K12_VERTICAL } from './k12'
import { HIGHER_ED_VERTICAL } from './higher-ed'
import { CHURCHES_VERTICAL } from './churches'
import { YOUTH_SPORTS_VERTICAL } from './youth-sports'
import { BUSINESS_VERTICAL } from './business'

export const VERTICAL_DETAIL_MAP: Record<string, VerticalDetailData> = {
  k12: K12_VERTICAL,
  'higher-ed': HIGHER_ED_VERTICAL,
  churches: CHURCHES_VERTICAL,
  'youth-sports': YOUTH_SPORTS_VERTICAL,
  business: BUSINESS_VERTICAL,
}

export const VALID_VERTICAL_SLUGS = Object.keys(VERTICAL_DETAIL_MAP)
```

### 4.3 Per-Vertical Content Specifications

The narrative strategist produces all copy below. The implementing developer uses it verbatim. All copy follows the "Calm Authority" voice guide from WS-B.1 Section 4.1 with the "Empathetic peer" tone adjustment for Solutions pages.

All regulatory claims marked `verified: false` must use hedged language ("designed with [X] in mind" rather than "compliant with [X]") until the business owner or legal team confirms the claim.

---

#### 4.3.1 K-12 Schools (`/solutions/k12`)

**SEO Title:** `Safetrekr for K-12 Schools -- Field Trip Safety Management with Independent Review`
**SEO Description:** `Every field trip. Every student. Every safeguard documented. Safetrekr replaces paper checklists and scattered spreadsheets with a verified, auditable trip safety platform for school districts.`
**SEO Keywords:** `school field trip safety management`, `K-12 trip safety platform`, `field trip compliance software`, `school trip safety documentation`

**Hero:**

H1:
> Every field trip. Every student. Every safeguard documented.

H2:
> School administrators plan field trips knowing the stakes. Safetrekr gives them a system that documents every safeguard, verifies every background check, and produces the audit trail that school boards, superintendents, and parents expect.

**The Challenge -- section intro:**
> Field trips are where learning comes alive -- and where liability exposure is highest. Most districts manage trip safety with paper forms, spreadsheet trackers, and email chains. The process works until it does not.

**Challenges:**

| # | Title | Description |
|---|-------|-------------|
| 1 | Consent Collection at Scale | Parental consent forms are sent home in backpacks, returned to teachers, and filed in folders. Tracking who has returned what -- and following up with who has not -- falls to administrators already managing a dozen other priorities. Missing forms are discovered on departure day. |
| 2 | Chaperone Screening Gaps | Background checks for volunteer chaperones are managed through separate systems or not managed at all. State requirements vary. Screening status is tracked in spreadsheets that do not alert anyone when a check expires or a new requirement takes effect. |
| 3 | No Independent Safety Review | The person who plans the trip is the same person who approves it. There is no separation of duties, no second pair of eyes, and no documented evidence that someone independent verified the safety plan before students boarded the bus. |
| 4 | Regulatory Complexity | FERPA governs student records. COPPA restricts data collection for children under 13. State-level field trip safety mandates vary by jurisdiction. Administrators bear the compliance burden without a system designed to enforce it. |
| 5 | Accountability After the Fact | When a school board member, a superintendent, or a parent asks what safeguards were in place for a trip, the answer depends on which teacher kept the best records. There is no centralized, timestamped audit trail. |
| 6 | Emergency Preparedness as Afterthought | Emergency plans exist as a paragraph in a permission slip, not as an operational system. Rally points, medical facilities, and evacuation routes are not mapped, not communicated to chaperones, and not accessible on a phone at 2 AM. |

**The Safetrekr Response -- section intro:**
> Safetrekr replaces scattered tools with one platform that enforces the process, documents every step, and produces the proof that your district acted with diligence.

**Responses:**

| # | Title | Description | Feature Ref |
|---|-------|-------------|-------------|
| 1 | Structured Consent and Document Collection | 9 document requirement templates with role-based targeting. Automated reminders at 7, 3, and 1 day before deadline. Administrators see a real-time compliance dashboard -- not a folder of returned slips. | Document collection system |
| 2 | Background Check Compliance Matrix | 5 background check types across 3 integrated providers (Checkr, Sterling, GoodHire). A participant-by-check matrix shows every chaperone's screening status at a glance -- with six-status tracking from not started through cleared. | Background check system |
| 3 | Independent Analyst Review | Every trip passes through an independent safety analyst who reviews the plan across 18 dimensions before departure. The analyst is not part of the school. Separation of duties is enforced by the platform, not by policy. | Analyst review workflow |
| 4 | Student Data Privacy by Design | Row Level Security isolates organization data at the database layer. Two-factor authentication. Consent audit trails with timestamped records. Safetrekr is designed with student data privacy requirements in mind from the architecture level. | Data architecture |
| 5 | Complete Audit Trail | Every action is logged: trip creation, roster additions, document submissions, analyst reviews, approval decisions, checklist acknowledgments. When stakeholders ask questions, you have timestamped, attributed, complete answers. | Audit trail system |
| 6 | Active Emergency Preparedness | Rally points with GPS coordinates and automatic geofencing. Medical facility directories with trauma capability levels. Three-tier evacuation planning. SMS emergency broadcast to all trip participants. Emergency preparedness is an active system, not a paragraph in a permission slip. | Protection system |

**Regulatory and Compliance -- section intro:**
> K-12 field trips operate within a web of federal and state regulations. Safetrekr is architected to support compliance with these requirements -- not to add complexity to them.

**Regulations:**

| # | Name | Full Name | Description | Safetrekr Alignment | Verified |
|---|------|-----------|-------------|---------------------|----------|
| 1 | FERPA | Family Educational Rights and Privacy Act | Governs access to and disclosure of student education records. Any system handling student data must protect record confidentiality. | Database-layer data isolation with Row Level Security. Organization-scoped access. Consent audit trails. No cross-organization data leakage. | false |
| 2 | COPPA | Children's Online Privacy Protection Act | Restricts collection and use of personal information from children under 13. Applies to school-directed technology use. | Safetrekr's data collection is organization-directed, not child-directed. Parental consent workflows are built into the document collection system. Data minimization principles applied to traveler profiles. | false |
| 3 | State Field Trip Mandates | Varies by jurisdiction | State-level requirements for field trip approval processes, chaperone ratios, background check types, transportation safety, and emergency preparedness documentation. | Configurable trip defaults allow districts to set chaperone ratios, required data fields, and document requirements per their state's mandates. The 10-step wizard enforces completeness at each stage. | false |
| 4 | Volunteer Screening Laws | Varies by state | Background check requirements for adults who interact with students in a supervisory capacity. Some states mandate specific check types (criminal, sex offender registry). | 5 background check types available. Compliance matrix tracks status per participant per check type. Expiration monitoring prevents lapsed screenings from going unnoticed. | true |

**Feature Spotlights:**

| # | Title | Description | Metric | Icon |
|---|-------|-------------|--------|------|
| 1 | 10-Step Trip Planning Wizard | Walks administrators through every detail a safety reviewer needs -- from basic logistics to emergency preparedness. Enforces completeness at each stage. | 10 structured steps | `ClipboardCheck` |
| 2 | 18-Dimension Analyst Review | Independent analyst reviews every trip across 18 safety dimensions. Overview, participants, air travel, lodging, venues, itinerary, transportation, safety review, emergency preparedness, documents, background checks, intel alerts, issues, evidence, checklists, packet builder, communications, and approval. | 18 review dimensions | `Shield` |
| 3 | Geo-Triggered Safety Checklists | Context-appropriate safety guidance delivered to students' and chaperones' devices when they enter designated zones. Pre-departure checklists triggered by date. Acknowledgment recorded. | Delivered to every device | `MapPin` |
| 4 | Fire Safety Assessment | Lodging review automatically flags rooms above the sixth floor. Accommodation check-in/check-out dates, floor assignments, and contact information documented. | Automatic floor flagging | `Flame` |

**Differentiator Callout:**

Accountability question:
> "When a school board member asks: 'Who reviewed the safety plan before we sent 40 students on that trip?' -- what is your answer?"

Accountability answer:
> With Safetrekr, the answer is specific: "An independent safety analyst -- not part of our staff -- reviewed the trip across 18 dimensions and approved it on [date] at [time]. Here is the full review record." Separation of duties is not a policy. It is built into the platform.

**Case Study Placeholder:**

| Field | Value |
|-------|-------|
| verticalType | K-12 School District |
| suggestedTitle | How [District Name] Documented Safety for 200+ Field Trips in One Year |
| suggestedMetrics | Time to complete trip planning (before/after), Consent form completion rate, Background check compliance rate at departure, Number of trips reviewed by independent analyst |
| placeholderCopy | We are currently partnering with school districts in pilot programs to measure the impact of structured trip safety management. If your district is interested in participating, schedule a briefing to learn how Safetrekr can document every safeguard for every field trip. |

**Objection Hook:**

Question:
> "Our district has managed field trips safely for years without a platform."

Answer:
> Managing safely and documenting safely are different things. Your teachers and administrators do excellent work. Safetrekr does not replace their judgment -- it documents their diligence. When a parent, a board member, or an attorney asks what safeguards were in place, the difference between "we followed our process" and "here is the timestamped record of every safeguard, reviewed by an independent analyst" is the difference between a verbal assurance and documented proof.

**CTA micro-copy:**
> Tell us about your district. We will show you how Safetrekr documents every field trip from planning through completion.

---

#### 4.3.2 Higher Education (`/solutions/higher-ed`)

**SEO Title:** `Safetrekr for Higher Education -- Study Abroad and Institutional Travel Safety`
**SEO Description:** `Study abroad. Exchange programs. Research expeditions. Faculty travel. Safetrekr gives universities a verified safety platform with independent analyst review and institutional audit documentation.`
**SEO Keywords:** `study abroad risk management`, `university travel safety platform`, `higher education trip safety`, `institutional travel risk management`

**Hero:**

H1:
> Study abroad. Exchange programs. Research expeditions. All verified.

H2:
> Universities send students, faculty, and researchers across borders and time zones. Safetrekr gives institutional risk management a single system of record -- with independent safety review that creates the separation of duties your compliance framework requires.

**The Challenge -- section intro:**
> Higher education travel is high-stakes, high-complexity, and high-visibility. Study abroad programs, faculty research trips, athletic travel, and conference attendance create a web of institutional liability that most risk management offices navigate with spreadsheets and institutional memory.

**Challenges:**

| # | Title | Description |
|---|-------|-------------|
| 1 | International Risk at Scale | A mid-sized university may operate programs in 20+ countries simultaneously. Each destination carries distinct security, health, political, and infrastructure risks. Risk assessment is often performed once at program inception and rarely updated. |
| 2 | Institutional Liability Exposure | When a student is harmed abroad, the institution's legal exposure depends on what safeguards were documented -- not what safeguards were intended. Risk management offices need proof that due diligence was performed for every trip, not just the high-profile ones. |
| 3 | Compliance Across Departments | Study abroad, athletics, research, and faculty travel are managed by different offices with different processes. Compliance documentation is siloed. No single system tracks safety measures across all institutional travel programs. |
| 4 | Clery Act Reporting Obligations | The Clery Act requires reporting of certain crimes at locations associated with the institution, including study abroad sites. Institutions need documented awareness of safety conditions at program locations. |
| 5 | Duty of Care Documentation | Institutional duty of care for student safety abroad is well-established in case law. What is less established is how institutions document that duty in practice. The gap between policy and documentation is where liability lives. |

**The Safetrekr Response -- section intro:**
> Safetrekr gives the risk management office, the study abroad team, and the provost's office a shared platform that documents institutional due diligence for every trip -- with independent verification that no internal team can provide alone.

**Responses:**

| # | Title | Description | Feature Ref |
|---|-------|-------------|-------------|
| 1 | International Destination Intelligence | TarvaRI intelligence engine monitors destinations for security, weather, health, transport, and political risks. Alerts are risk-scored with confidence bands and analyst-triaged before delivery. Risk assessment is continuous, not annual. | Intelligence engine |
| 2 | Tiered Analyst Review | Senior analysts are assigned to international trips. Mid-level analysts handle domestic travel. Every trip is reviewed across 18 dimensions by someone independent of the program office. The review is documented with timestamps and attribution. | Analyst review workflow |
| 3 | Institutional Audit Documentation | Every trip generates a complete audit trail: planning decisions, roster verification, document collection, analyst review, approval decisions, alert deliveries, and checklist acknowledgments. Downloadable for risk management, legal, and insurance review. | Audit trail system |
| 4 | Visa and Passport Tracking | International trip planning includes visa and passport documentation tracking per participant. Compliance status is visible at a glance. | Trip planning wizard |
| 5 | Cross-Program Visibility | All institutional travel -- study abroad, athletics, research, conferences -- managed in one platform. Risk management sees every active trip, every pending review, and every flagged issue from a single dashboard. | Client dashboard |

**Regulatory and Compliance -- section intro:**
> Universities operate within a regulatory framework that extends institutional obligations beyond the campus. Safetrekr is designed to support compliance with these requirements for all institutional travel.

**Regulations:**

| # | Name | Full Name | Description | Safetrekr Alignment | Verified |
|---|------|-----------|-------------|---------------------|----------|
| 1 | Clery Act | Jeanne Clery Disclosure of Campus Security Policy and Campus Crime Statistics Act | Requires institutions to report campus security policies and crime statistics, including at non-campus locations such as study abroad sites. | Real-time intelligence monitoring for program locations. Documented awareness of safety conditions. Alert acknowledgment tracking provides evidence of institutional awareness. | false |
| 2 | FERPA | Family Educational Rights and Privacy Act | Protects student education records. Applies to institutional systems that collect or store student data. | Database-layer data isolation with Row Level Security. Organization-scoped access. No cross-institution data leakage. Consent audit trails. | false |
| 3 | Title IX | Title IX of the Education Amendments of 1972 | Prohibits sex-based discrimination, including in travel and study abroad contexts. Institutions must address safety and reporting mechanisms for students traveling under institutional programs. | Documented safety review process with independent verification. Issue flagging and tracking within the analyst review workflow. Evidence management for institutional review. | false |
| 4 | Institutional Duty of Care | Common law / case law precedents | Courts have established that universities owe a duty of care to students participating in institutional travel programs. The standard requires reasonable steps to protect students from foreseeable harm. | End-to-end documentation of safety measures: planning, independent review, protection systems, traveler delivery, and monitoring. The audit trail is the documentation of reasonable steps. | true |

**Feature Spotlights:**

| # | Title | Description | Metric | Icon |
|---|-------|-------------|--------|------|
| 1 | Real-Time Intelligence Engine | Multi-source aggregation of security, weather, health, transport, and political risk data for every destination. Alerts scored by confidence with percentile bands. Analyst-triaged before delivery. | Continuous monitoring | `Globe` |
| 2 | Senior Analyst Assignment | International trips are assigned to senior analysts with expertise matching the trip's complexity. Every review decision is timestamped and attributed. | Tiered analyst matching | `UserCheck` |
| 3 | Emergency Evacuation Planning | Three-tier evacuation protocols: shelter in place, local evacuation, and full relocation. Medical facility directories with trauma capability levels and estimated travel times. | 3 evacuation tiers | `LifeBuoy` |
| 4 | Offline-First Traveler App | Students access safety information, checklists, and emergency contacts on their devices -- even without network connectivity. All critical trip data cached locally. | Works offline | `Smartphone` |

**Differentiator Callout:**

Accountability question:
> "When the university's risk counsel asks: 'Can you demonstrate that an independent party reviewed the safety plan for every study abroad program this year?' -- what is your answer?"

Accountability answer:
> With Safetrekr, every program trip is reviewed by an independent analyst across 18 dimensions before departure. The review is documented -- not self-reported. When risk counsel or insurance needs proof, the audit trail shows who reviewed what, when, and what they found.

**Case Study Placeholder:**

| Field | Value |
|-------|-------|
| verticalType | University Study Abroad Program |
| suggestedTitle | How [University Name] Standardized Safety Review for 50+ Study Abroad Programs |
| suggestedMetrics | Number of international programs reviewed, Time from trip submission to analyst review completion, Compliance documentation coverage rate, Alert response time for international destinations |
| placeholderCopy | We are partnering with universities to measure the impact of independent safety review on institutional travel programs. If your institution manages study abroad, faculty research, or athletic travel, schedule a briefing to see how Safetrekr documents safety for every trip. |

**Objection Hook:**

Question:
> "Our study abroad office already has a risk assessment process."

Answer:
> Safetrekr does not replace your risk assessment -- it verifies and documents it independently. Your study abroad team knows the programs. An independent analyst verifies that the safety measures are complete, current, and documented. The difference is not in the quality of your team's work. The difference is in the institutional record that proves someone independent checked.

**CTA micro-copy:**
> Tell us about your institution's travel programs. We will show you how Safetrekr creates institutional audit documentation for every trip.

---

#### 4.3.3 Churches and Faith-Based Organizations (`/solutions/churches`)

**SEO Title:** `Safetrekr for Churches -- Mission Trip Safety with Independent Review`
**SEO Description:** `Mission trips deserve mission-grade safety planning. Safetrekr provides volunteer screening, international risk assessment, evacuation planning, and documented accountability for church travel.`
**SEO Keywords:** `church mission trip safety`, `mission trip risk management`, `church volunteer screening`, `faith-based travel safety platform`

**Hero:**

H1:
> Mission trips deserve mission-grade safety planning.

H2:
> Churches send volunteers to serve in communities worldwide -- often in places where infrastructure is limited and risk is real. Safetrekr gives mission teams the planning, screening, intelligence, and emergency preparedness that the mission deserves.

**The Challenge -- section intro:**
> Faith-based organizations send more people on international travel than most corporations. Mission trips, service projects, youth retreats, and conferences involve volunteers of every age -- many traveling internationally for the first time. The safety planning rarely matches the ambition of the mission.

**Challenges:**

| # | Title | Description |
|---|-------|-------------|
| 1 | Volunteer Screening Inconsistency | Churches rely on volunteers for everything -- including supervising children during travel. Background check requirements vary by denomination and state. Screening is often handled through manual forms with no central tracking of who has been checked, when the check expires, or whether new requirements have taken effect. |
| 2 | International Travel to Complex Environments | Mission trips often go to regions with limited infrastructure, political instability, or active security concerns. Risk assessment is informal -- based on past experience or denominational familiarity with a region -- rather than on current intelligence data. |
| 3 | Emergency Plans That Live in a Binder | Emergency preparedness for mission trips is typically a phone tree and a contact sheet. Rally points, medical facilities, and evacuation routes are not mapped. When a crisis occurs at 2 AM in a foreign country, the mission team leader is making decisions from memory, not from a system. |
| 4 | No Documentation Trail | When a church board, a parent, or a denomination asks what safeguards were in place for a trip, the answer depends on which mission team leader kept notes. There is no centralized record of planning decisions, volunteer screenings, or safety measures. |
| 5 | Well-Intentioned But Untrained Teams | Mission team volunteers are motivated by service, not by safety operations. They receive minimal training on emergency response, risk mitigation, or crisis communication. The safety planning burden falls on the trip leader, who is also coordinating logistics, fundraising, and ministry activities. |

**The Safetrekr Response -- section intro:**
> Safetrekr provides the operational backbone for mission trip safety -- so trip leaders can focus on the mission while the platform handles the screening, documentation, intelligence, and emergency preparedness.

**Responses:**

| # | Title | Description | Feature Ref |
|---|-------|-------------|-------------|
| 1 | Comprehensive Volunteer Screening | 5 background check types (criminal, sex offender, driving, employment, education) across 3 integrated providers. A compliance matrix shows every volunteer's screening status at a glance. Expiration monitoring ensures checks stay current. | Background check system |
| 2 | International Risk Intelligence | Real-time monitoring of destination countries for security, weather, health, transport, and political risks. Alerts are risk-scored and analyst-triaged. Mission teams receive only what is relevant, delivered on schedule. | Intelligence engine |
| 3 | Three-Tier Evacuation Planning | Shelter in place, local evacuation, and full relocation protocols. Rally points with GPS coordinates. Safe houses with approval workflows. Medical facility directories with trauma capability levels. Emergency kit profile recommendations based on trip characteristics. | Protection system |
| 4 | SMS Emergency Broadcast | Mission team leaders can send SMS broadcast messages to all trip participants directly from the app. Chaperones receive alerts. Participants acknowledge receipt. Every communication documented. | Emergency broadcast |
| 5 | Complete Audit Trail | From volunteer screening through trip completion, every action is logged. When a church board or denomination asks what safeguards were in place, the answer is specific, timestamped, and attributed. | Audit trail system |

**Regulatory and Compliance -- section intro:**
> Church travel safety operates within denominational policies, state volunteer screening laws, and international travel advisories. Safetrekr supports compliance with these overlapping frameworks.

**Regulations:**

| # | Name | Full Name | Description | Safetrekr Alignment | Verified |
|---|------|-----------|-------------|---------------------|----------|
| 1 | Safe Sanctuaries | Safe Sanctuaries / Similar Denominational Policies | Many denominations (United Methodist, Southern Baptist, others) have adopted policies requiring background screening, training, and supervision standards for adults working with children and youth. | Background check compliance matrix with 5 check types. Certification tracking with expiration monitoring. Document collection for training completion records. | true |
| 2 | State Screening Laws | State-Level Volunteer Screening Requirements | Most states require background checks for adults in supervisory roles over minors. Requirements vary by state (check types, frequency, registry searches). | 5 background check types available through 3 providers. Compliance matrix tracks per-participant, per-check-type status. Automated reminders for expiring screenings. | true |
| 3 | State Department Advisories | U.S. State Department Travel Advisories | Travel advisories provide risk levels (1-4) for international destinations. Organizations have a duty to be aware of advisory levels for mission trip destinations. | TarvaRI intelligence engine monitors international destinations. Real-time alert delivery includes government advisory data. Documented awareness of destination conditions. | true |
| 4 | Child Protection Policies | Organizational Child Protection Policies | Churches that serve children are expected to maintain child protection policies including screening, training, supervision ratios, and incident response. | Configurable requirements per trip: chaperone ratios, required screenings, training certifications, document collection. The system enforces policy compliance -- it does not rely on memory. | true |

**Feature Spotlights:**

| # | Title | Description | Metric | Icon |
|---|-------|-------------|--------|------|
| 1 | 5 Background Check Types | Criminal history, sex offender registry, driving record, employment verification, education verification -- integrated with Checkr, Sterling, and GoodHire. One compliance matrix for every volunteer. | 5 check types, 3 providers | `ShieldCheck` |
| 2 | Rally Points and Safe Houses | Designated assembly locations and vetted safe locations with GPS coordinates, approval workflows, and automatic geofence creation. Geofences alert on entry (rally points) and exit (safe houses). | GPS-linked geofencing | `MapPin` |
| 3 | Offline-First Mobile App | Mission teams in areas with limited connectivity access safety information, emergency contacts, and checklists offline. All critical trip data cached locally on device. | Works without connectivity | `WifiOff` |
| 4 | Real-Time Alert Delivery | Intelligence alerts delivered to trip leaders and participants with severity classification and acknowledgment tracking. Every alert receipt is documented. | Proof of delivery | `Bell` |

**Differentiator Callout:**

Accountability question:
> "When a parent asks: 'Who reviewed the safety plan before my child went on that mission trip?' -- what is your answer?"

Accountability answer:
> With Safetrekr, the answer is: "An independent safety analyst reviewed the trip across 18 dimensions and approved it before departure. Every volunteer was screened. Every emergency plan was documented. Here is the complete record." The mission team focused on serving. The analyst focused on safety. Both are documented.

**Case Study Placeholder:**

| Field | Value |
|-------|-------|
| verticalType | Church / Faith-Based Organization |
| suggestedTitle | How [Church Name] Protected 150 Volunteers Across 8 International Mission Trips |
| suggestedMetrics | Volunteer screening completion rate, Time from trip planning to analyst approval, Number of international destinations monitored, Emergency preparedness documentation coverage |
| placeholderCopy | We are partnering with churches and faith-based organizations to measure the impact of structured mission trip safety. If your organization sends teams domestically or internationally, schedule a briefing to see how Safetrekr documents every safeguard from volunteer screening through trip completion. |

**Objection Hook:**

Question:
> "Our mission teams have traveled safely for decades."

Answer:
> We do not doubt that. Your mission leaders are dedicated, experienced, and careful. Safetrekr does not replace their dedication -- it documents it. When your church board, your denomination, or a parent asks what safeguards were in place, the answer moves from "we trust our team leaders" to "here is the documented record of every screening, every safety review, and every emergency plan -- verified by an independent analyst."

**CTA micro-copy:**
> Tell us about your mission program. We will show you how Safetrekr documents safety for every trip your church sends.

---

#### 4.3.4 Youth Sports (`/solutions/youth-sports`)

**SEO Title:** `Safetrekr for Youth Sports -- Tournament Travel Safety and SafeSport Compliance`
**SEO Description:** `Tournament travel is complex. Protecting your athletes is not optional. Safetrekr provides coach screening, medical consent, certification tracking, and real-time alerts for youth sports travel.`
**SEO Keywords:** `youth sports travel safety`, `SafeSport compliance tracking`, `tournament travel management`, `youth athlete travel safety platform`

**Hero:**

H1:
> Tournament travel is complex. Protecting your athletes is not optional.

H2:
> Youth sports organizations send athletes, coaches, and volunteers across state lines for tournaments, camps, and competitions. Safetrekr documents the screening, safety planning, and emergency preparedness that athletes' parents and governing bodies expect.

**The Challenge -- section intro:**
> Youth sports travel is uniquely complex: minors under the supervision of non-parental adults, multi-jurisdictional travel, rapid roster changes, and a web of compliance requirements that most organizations track in spreadsheets -- if they track them at all.

**Challenges:**

| # | Title | Description |
|---|-------|-------------|
| 1 | Coach and Volunteer Screening Across Jurisdictions | Tournaments cross state lines. Background check requirements vary by state and by governing body. Tracking who has been screened, what type of check was performed, and when it expires is a manual process that breaks down with roster changes and multi-team travel. |
| 2 | SafeSport Compliance Tracking | The U.S. Center for SafeSport requires trained and certified adults in supervisory roles. Certification expires. Tracking completion, expiration, and renewal for every coach, assistant, and volunteer across every team is an administrative burden that falls on volunteer coordinators. |
| 3 | Medical Consent and Emergency Contacts for Minors | Every traveling minor needs medical consent forms and emergency contact information on file. Forms are collected on paper, stored in a binder, and carried by a team manager. If the binder is in the hotel and the emergency is at the venue, the forms are inaccessible. |
| 4 | Multi-Team Travel Coordination | Tournaments involve multiple teams traveling to the same location with different schedules, different lodging, and different adult supervisors. There is no centralized view of who is where, who is responsible, and who has been screened. |
| 5 | Real-Time Communication During Events | When weather, security, or venue issues arise during a tournament, team managers rely on group texts and phone trees. There is no broadcast system, no acknowledgment tracking, and no documentation that critical safety information reached every adult responsible for athletes. |

**The Safetrekr Response -- section intro:**
> Safetrekr gives youth sports organizations the same level of documented safety management that schools and corporations use -- adapted for the realities of tournament travel, multi-team coordination, and governing body compliance.

**Responses:**

| # | Title | Description | Feature Ref |
|---|-------|-------------|-------------|
| 1 | Background Check Compliance Matrix | Every adult with supervisory responsibility -- coaches, assistants, volunteers, team managers -- tracked in a participant-by-check matrix. 5 check types. 3 providers. Six-status tracking from not started through cleared. | Background check system |
| 2 | Certification Tracking with Expiration Monitoring | 12 predefined certification types including SafeSport, CPR, First Aid, AED, and coaching certifications. Expiration monitoring flags certifications that are expiring or expired. Automated reminders before deadlines. | Certification tracking |
| 3 | Structured Medical Consent Collection | Digital medical consent and emergency contact collection with role-based targeting. Automated reminders at 7, 3, and 1 day before deadline. Accessible on every authorized device -- not locked in a binder at the hotel. | Document collection |
| 4 | SMS Emergency Broadcast | Coaches and team managers can send SMS broadcasts to all trip participants. Alerts are delivered immediately. Acknowledgment is tracked and documented. When the tournament venue issues a weather delay, every parent and coach receives the message -- with proof. | Emergency broadcast |
| 5 | Independent Analyst Review | Every tournament trip is reviewed by an independent safety analyst before departure. The analyst verifies screening compliance, emergency preparedness, and trip logistics. The review is documented for governing body audits. | Analyst review workflow |

**Regulatory and Compliance -- section intro:**
> Youth sports travel operates under a patchwork of federal, state, and governing body requirements. Safetrekr helps organizations maintain compliance across all of them.

**Regulations:**

| # | Name | Full Name | Description | Safetrekr Alignment | Verified |
|---|------|-----------|-------------|---------------------|----------|
| 1 | SafeSport | U.S. Center for SafeSport / SafeSport Trained | Requires trained and certified adults in supervisory roles within amateur sports organizations. Certification must be current and renewed per governing body timelines. | Certification tracking with 12 predefined types including SafeSport. Expiration monitoring flags lapsed certifications. Compliance status visible at a glance per participant. | true |
| 2 | State Background Check Mandates | Varies by state | Many states require background checks for adults who supervise minors in organized activities, including youth sports. Check types and frequencies vary. | 5 background check types across 3 providers. Compliance matrix tracks per-participant, per-check-type status. Organizations can configure which check types are required per trip. | true |
| 3 | Minor Medical Consent | State-level parental consent laws | Parental or guardian medical consent is required for minors participating in travel activities. Organizations must have current consent forms accessible during travel. | Document collection system with role-based targeting (parents/guardians). Configurable due dates with automated reminders. Forms accessible on authorized devices during travel. | true |
| 4 | AED/EAP Requirements | Varies by state and governing body | Some states and governing bodies require Automated External Defibrillator availability and Emergency Action Plans for organized athletic events. | Emergency preparedness configuration includes medical facility directories and emergency kit profiles. Certification tracking covers AED and First Aid certifications for supervisory adults. | true |

**Feature Spotlights:**

| # | Title | Description | Metric | Icon |
|---|-------|-------------|--------|------|
| 1 | Certification Tracking | SafeSport, CPR, First Aid, AED, coaching certifications, and more. 12 predefined types with expiration monitoring. Automated reminders before deadlines. Valid, expiring, and expired statuses at a glance. | 12 certification types | `Award` |
| 2 | Background Check Matrix | One view showing every adult's screening status across every required check type. Criminal, sex offender, driving, employment, education. Six statuses per check. No spreadsheet required. | 5 check types, 6 statuses | `ShieldCheck` |
| 3 | Geo-Triggered Checklists | Context-appropriate safety checklists delivered to coaches' and team managers' devices when they arrive at tournament venues. Venue-specific information, emergency contacts, and safety protocols -- on the device, not in a binder. | Delivered at venue arrival | `MapPin` |
| 4 | Real-Time Alerts with Acknowledgment | Weather, security, or venue alerts delivered to every authorized adult. Acknowledgment tracked per recipient. Proof that the coach at Field 3 received the lightning delay notice at 2:47 PM. | Proof of receipt | `Bell` |

**Differentiator Callout:**

Accountability question:
> "When a parent asks: 'How do you verify that every adult traveling with my child has been screened and certified?' -- what is your answer?"

Accountability answer:
> With Safetrekr, the answer is a compliance matrix: every adult, every check type, every certification -- with status, date, and expiration. An independent analyst verifies the complete picture before departure. The documentation is not a spreadsheet you maintain. It is a verified record the platform enforces.

**Case Study Placeholder:**

| Field | Value |
|-------|-------|
| verticalType | Youth Sports Organization |
| suggestedTitle | How [Organization Name] Managed SafeSport Compliance for 30 Teams Across 12 Tournaments |
| suggestedMetrics | SafeSport certification compliance rate, Background check completion rate at departure, Time from trip creation to analyst approval, Number of emergency broadcasts sent with acknowledgment tracking |
| placeholderCopy | We are partnering with youth sports organizations to measure the impact of structured travel safety on compliance and parent confidence. If your organization coordinates tournament travel, schedule a briefing to see how Safetrekr tracks every screening, certification, and safety measure for every trip. |

**Objection Hook:**

Question:
> "We are a volunteer-run organization. We do not have bandwidth for another platform."

Answer:
> The 10-step wizard asks questions your team managers already know: destination, dates, roster, lodging. Safetrekr does not create new work -- it structures the work you are already doing and adds the screening verification and independent review that your volunteers cannot do alone. The platform carries the compliance burden. Your volunteers carry the mission.

**CTA micro-copy:**
> Tell us about your travel program. We will show you how Safetrekr tracks screening, certifications, and safety for every tournament trip.

---

#### 4.3.5 Business (`/solutions/business`)

**SEO Title:** `Safetrekr for Business -- Corporate Travel Safety and Duty of Care Documentation`
**SEO Description:** `Corporate duty of care -- documented, not assumed. Safetrekr provides per-trip safety management with independent analyst review, real-time intelligence, and downloadable audit trails for legal and insurance review.`
**SEO Keywords:** `corporate travel safety management`, `duty of care documentation`, `business travel risk management`, `corporate travel safety platform`

**Hero:**

H1:
> Corporate duty of care -- documented, not assumed.

H2:
> Every company acknowledges a duty of care for employee travel. Few can prove they act on it. Safetrekr creates the documented, auditable record that legal, insurance, and procurement teams need -- with per-trip pricing that aligns cost to actual travel volume.

**The Challenge -- section intro:**
> Corporate travel safety is a recognized obligation that is rarely a documented practice. Duty of care policies exist in employee handbooks. What does not exist is a system that converts that policy into verifiable, auditable action for every trip.

**Challenges:**

| # | Title | Description |
|---|-------|-------------|
| 1 | Duty of Care Is Policy, Not Practice | Most companies have a duty of care statement in their travel policy. Few have a system that documents what specific safety measures were taken for each trip. The gap between policy and practice is where legal liability concentrates. |
| 2 | Variable Risk, Uniform Response | An employee traveling to London and an employee traveling to Lagos face different risk profiles. Most corporate travel programs manage both the same way -- with the same approval process, the same (minimal) safety briefing, and the same lack of documentation. |
| 3 | No Centralized Proof | When legal counsel, insurance providers, or auditors ask what safety measures were in place for a specific trip, the answer requires assembling information from email threads, approval chains, and travel booking systems. There is no single record that proves due diligence. |
| 4 | Annual Contracts and Per-Seat Licensing | Traditional travel risk management platforms charge annual subscriptions and per-seat licensing. Companies with variable travel volumes pay for capacity they do not use. Small and mid-size companies are priced out entirely. |
| 5 | Compliance Separation of Duties | Many corporate compliance frameworks require separation of duties -- the person who approves a trip should not be the same person who assesses its safety. Without a dedicated safety review function, this separation exists in policy but not in practice. |

**The Safetrekr Response -- section intro:**
> Safetrekr gives corporate travel programs the same level of documented safety management that regulated industries require -- without the annual contracts, seat licenses, or implementation projects that make traditional solutions impractical.

**Responses:**

| # | Title | Description | Feature Ref |
|---|-------|-------------|-------------|
| 1 | Per-Trip Pricing | No annual contracts. No seat licenses. Pay only when employees travel. Trip pricing is tiered by complexity: T1 (day trip), T2 (domestic overnight), T3 (international). Cost scales with actual travel volume. | Pricing model |
| 2 | Tiered Risk Matching | Trip complexity determines the safety requirements and analyst assignment level. A domestic day trip receives a different level of review than an international trip to a high-risk destination. The system matches safety rigor to actual risk. | Trip tier system |
| 3 | Independent Analyst Review | Every trip is reviewed by an independent safety analyst. This is not a checkbox. The analyst reviews 18 dimensions of the trip plan and documents a timestamped approval or rejection with reason codes. Separation of duties is enforced by the platform. | Analyst review workflow |
| 4 | Downloadable Audit Trail | Every action is logged. The complete trip record -- planning, review, approval, alert delivery, acknowledgments -- is downloadable as documentation for legal, insurance, and procurement review. | Audit trail system |
| 5 | Real-Time Destination Intelligence | TarvaRI intelligence engine monitors destinations for security, weather, health, transport, and political risks. Alerts are risk-scored, analyst-triaged, and delivered to travelers and travel managers. | Intelligence engine |

**Regulatory and Compliance -- section intro:**
> Corporate travel safety obligations derive from general duty of care standards, occupational safety regulations, and industry-specific compliance frameworks. Safetrekr is designed to document compliance with these obligations.

**Regulations:**

| # | Name | Full Name | Description | Safetrekr Alignment | Verified |
|---|------|-----------|-------------|---------------------|----------|
| 1 | Duty of Care | Common Law / Corporate Duty of Care | Employers have a recognized legal duty to take reasonable steps to protect employees from foreseeable harm during business travel. The standard is measured by what was documented, not what was intended. | End-to-end documentation: planning, independent review, protection systems, alert delivery, acknowledgment tracking. The audit trail is the documentation of reasonable steps. | true |
| 2 | OSHA General Duty Clause | Occupational Safety and Health Act Section 5(a)(1) | Employers must provide a workplace "free from recognized hazards." Courts have extended this obligation to travel required as a condition of employment in certain circumstances. | Trip-specific risk assessment documented through the analyst review process. Hazard identification documented across 18 review dimensions. Evidence of mitigation measures recorded. | true |
| 3 | ISO 31030 | ISO 31030:2021 Travel Risk Management | International standard providing guidance on travel risk management for organizations. Covers risk assessment, duty of care, traveler preparedness, monitoring, and incident response. | Safetrekr's lifecycle (Plan, Review, Protect, Monitor) maps to ISO 31030's framework. Independent analyst review addresses the risk assessment component. Real-time intelligence addresses monitoring. Emergency preparedness addresses incident response planning. | false |
| 4 | GDPR | General Data Protection Regulation | For companies with EU employees or travel to EU destinations, GDPR governs the collection and processing of employee personal data. | GDPR-compliant data governance: user-initiated data export, account deletion, consent history, analytics opt-in/out. Database-layer data isolation. | true |

**Feature Spotlights:**

| # | Title | Description | Metric | Icon |
|---|-------|-------------|--------|------|
| 1 | Per-Trip Pricing | Pay when employees travel. No annual minimums. No seat licenses. Cost aligns with actual travel volume -- not projected headcount. | No annual contract | `Receipt` |
| 2 | 18-Dimension Safety Review | Every trip reviewed across 18 safety dimensions by an independent analyst. Separation of duties is not a policy checkbox -- it is enforced by the platform architecture. | 18 dimensions, independent | `Shield` |
| 3 | Downloadable Audit Trail | Complete trip record -- from planning through completion -- downloadable as documentation. Formatted for legal, insurance, procurement, and compliance review. | Full lifecycle documentation | `FileDown` |
| 4 | Risk-Scored Intelligence | Destination monitoring with severity classification and confidence bands. Analyst-triaged before delivery. Travel managers receive only relevant, verified intelligence. | Risk-scored, analyst-triaged | `AlertTriangle` |

**Differentiator Callout:**

Accountability question:
> "When your legal team asks: 'Can you prove we performed due diligence on employee safety for this trip?' -- what is your answer?"

Accountability answer:
> With Safetrekr, the answer is a downloadable audit trail: every planning decision, every independent review finding, every alert delivery, and every acknowledgment. An independent analyst -- not your internal team -- reviewed the trip and documented the approval. Due diligence is not an assertion. It is a record.

**Case Study Placeholder:**

| Field | Value |
|-------|-------|
| verticalType | Corporate / Business |
| suggestedTitle | How [Company Name] Documented Duty of Care for 500 Employee Trips with Per-Trip Pricing |
| suggestedMetrics | Cost per traveler vs. previous solution, Time from trip submission to analyst approval, Audit documentation completeness rate, Travel manager satisfaction score |
| placeholderCopy | We are partnering with businesses to measure the impact of documented duty of care on legal readiness and travel program cost. If your company sends employees on domestic or international travel, schedule a briefing to see how Safetrekr documents every safeguard -- with per-trip pricing that scales with your actual travel volume. |

**Objection Hook:**

Question:
> "We already use a travel management company."

Answer:
> Travel management companies book flights and hotels. They do not review your safety plan across 18 dimensions, assign an independent analyst, document every safeguard, or generate an audit trail for legal review. Safetrekr does not replace your TMC. It adds the documented safety layer that your TMC does not provide -- and that your legal team will ask about after an incident.

**CTA micro-copy:**
> Tell us about your travel program. We will show you how Safetrekr documents duty of care for every business trip.

---

### 4.4 Dynamic Route Page Component (`src/app/(marketing)/solutions/[vertical]/page.tsx`)

This file replaces the WS-B.7 placeholder stub entirely.

```typescript
// src/app/(marketing)/solutions/[vertical]/page.tsx

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { VERTICAL_DETAIL_MAP, VALID_VERTICAL_SLUGS } from '@/lib/data/verticals'
import { VERTICALS } from '@/lib/data/solutions-verticals'
import { VerticalDetailTemplate } from '@/components/marketing/solutions/vertical-detail-template'

interface VerticalPageProps {
  params: Promise<{ vertical: string }>
}

export async function generateStaticParams() {
  return VALID_VERTICAL_SLUGS.map((slug) => ({ vertical: slug }))
}

export async function generateMetadata({
  params,
}: VerticalPageProps): Promise<Metadata> {
  const { vertical } = await params
  const data = VERTICAL_DETAIL_MAP[vertical]
  if (!data) return {}

  return {
    title: data.seoTitle,
    description: data.seoDescription,
    openGraph: {
      title: data.seoTitle,
      description: data.seoDescription,
      type: 'website',
      url: `https://safetrekr.com/solutions/${vertical}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: data.name,
      description: data.seoDescription,
    },
  }
}

export default async function VerticalDetailPage({
  params,
}: VerticalPageProps) {
  const { vertical } = await params
  const data = VERTICAL_DETAIL_MAP[vertical]
  if (!data) notFound()

  // Get sibling verticals for cross-links (exclude current)
  const siblingVerticals = VERTICALS.filter((v) => v.id !== data.id)

  return (
    <VerticalDetailTemplate
      data={data}
      siblingVerticals={siblingVerticals}
    />
  )
}
```

**Key implementation notes:**

1. `generateStaticParams` pre-renders all 5 vertical pages at build time. No server-side rendering at request time.
2. `generateMetadata` produces per-vertical SEO tags dynamically from the data module.
3. The `notFound()` call handles invalid slugs -- any slug not in `VERTICAL_DETAIL_MAP` returns a 404.
4. Sibling verticals are filtered from the overview `VERTICALS` array (from WS-B.7) to populate cross-links.
5. No `'use client'` directive. The page is entirely server-rendered.

### 4.5 Shared Template Component (`src/components/marketing/solutions/vertical-detail-template.tsx`)

Server component that composes all page sections from a `VerticalDetailData` object. This is the single template that all 5 verticals render through.

**Section order:**

```
1. Breadcrumb (Solutions > [Vertical Name])
2. Hero (H1 + H2)
3. The Challenge (intro + challenge cards)
4. The Safetrekr Response (intro + response cards)
5. Differentiator Callout (accountability question + answer)
6. Regulatory and Compliance (intro + regulation cards)
7. Feature Spotlights (3-4 feature cards)
8. Case Study Placeholder
9. Objection Hook (question + answer)
10. Sibling Vertical Cross-Links (other solutions)
11. Bottom CTA (Schedule a Briefing + vertical micro-copy)
12. JSON-LD Structured Data
```

**Section styling follows the alternating background pattern from WS-B.7:**
- Odd sections: `bg-transparent` (inherits void from body)
- Even sections: `bg-white/[0.02]` for subtle visual separation

**Component signature:**

```typescript
// src/components/marketing/solutions/vertical-detail-template.tsx

import Link from 'next/link'
import type { VerticalDetailData } from '@/lib/interfaces/solutions'
import type { SolutionVertical } from '@/lib/interfaces/solutions'
import { VerticalCardGrid } from './vertical-card-grid'
import { CaseStudyPlaceholder } from './case-study-placeholder'
import { RegulationCard } from './regulation-card'
import { FeatureSpotlight } from './feature-spotlight'
import { VerticalBreadcrumb } from './vertical-breadcrumb'
import { cn } from '@/lib/utils'

interface VerticalDetailTemplateProps {
  data: VerticalDetailData
  siblingVerticals: SolutionVertical[]
}

export function VerticalDetailTemplate({
  data,
  siblingVerticals,
}: VerticalDetailTemplateProps) {
  // Compose all sections from data
  // See Section 4.6 through 4.14 for individual section specs
}
```

### 4.6 Breadcrumb Component (`src/components/marketing/solutions/vertical-breadcrumb.tsx`)

```typescript
// src/components/marketing/solutions/vertical-breadcrumb.tsx

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VerticalBreadcrumbProps {
  verticalName: string
}

export function VerticalBreadcrumb({ verticalName }: VerticalBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto max-w-6xl px-6 pt-8 md:pt-12"
    >
      <ol className="flex items-center gap-1.5 text-sm">
        <li>
          <Link
            href="/solutions"
            className={cn(
              'text-[var(--color-text-tertiary)]',
              'transition-colors duration-200',
              'hover:text-[var(--color-ember)]',
              'focus-visible:outline-2 focus-visible:outline-offset-2',
              'focus-visible:outline-[var(--color-ember-bright)]',
              'rounded-sm',
            )}
          >
            Solutions
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight
            size={14}
            className="text-[var(--color-text-tertiary)]"
          />
        </li>
        <li>
          <span
            className="font-medium text-[var(--color-text-primary)]"
            aria-current="page"
          >
            {verticalName}
          </span>
        </li>
      </ol>
    </nav>
  )
}
```

### 4.7 Hero Section

```tsx
{/* Hero */}
<section className="relative py-20 md:py-28">
  <div className="mx-auto max-w-3xl px-6 text-center">
    <h1 className="font-sans text-3xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-5xl">
      {data.heroHeadline}
    </h1>
    <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)] md:text-xl">
      {data.heroSubheadline}
    </p>
  </div>
</section>
```

### 4.8 Challenge Section

```tsx
{/* The Challenge */}
<section className="relative bg-white/[0.02] py-16 md:py-20">
  <div className="mx-auto max-w-6xl px-6">
    <div className="mb-12 text-center md:mb-16">
      <h2 className="font-sans text-2xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-3xl">
        The challenge
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)]">
        {data.challengeIntro}
      </p>
    </div>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.challenges.map((challenge, i) => (
        <div
          key={i}
          className={cn(
            'rounded-xl p-6',
            'bg-white/[0.04] border border-white/[0.06]',
          )}
        >
          <h3 className="font-sans text-base font-semibold text-[var(--color-text-primary)]">
            {challenge.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {challenge.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
```

### 4.9 Response Section

Same grid layout as challenges, but with ember-tinted accents to signal "solution."

```tsx
{/* The Safetrekr Response */}
<section className="relative py-16 md:py-20">
  <div className="mx-auto max-w-6xl px-6">
    <div className="mb-12 text-center md:mb-16">
      <h2 className="font-sans text-2xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-3xl">
        The Safetrekr response
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)]">
        {data.responseIntro}
      </p>
    </div>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.responses.map((response, i) => (
        <div
          key={i}
          className={cn(
            'rounded-xl p-6',
            'bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]',
            'border border-[rgba(var(--ember-rgb),0.12)]',
          )}
        >
          <h3 className="font-sans text-base font-semibold text-[var(--color-ember)]">
            {response.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {response.description}
          </p>
          {response.featureRef && (
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-text-tertiary)]">
              {response.featureRef}
            </p>
          )}
        </div>
      ))}
    </div>
  </div>
</section>
```

### 4.10 Differentiator Callout

A full-width callout box that frames the independent analyst review as the answer to the vertical's specific accountability question. This is the emotional and strategic centerpiece of each page.

```tsx
{/* Differentiator Callout */}
<section className="relative bg-white/[0.02] py-16 md:py-20">
  <div className="mx-auto max-w-4xl px-6">
    <div
      className={cn(
        'rounded-xl p-8 md:p-10',
        'border border-[rgba(var(--ember-rgb),0.15)]',
        'bg-[rgba(var(--ember-rgb),0.04)]',
      )}
    >
      <p className="text-center text-lg font-semibold italic text-[var(--color-text-primary)] md:text-xl">
        {data.accountabilityQuestion}
      </p>
      <p className="mt-6 text-center text-base leading-[1.8] text-[var(--color-text-secondary)]">
        {data.accountabilityAnswer}
      </p>
    </div>
  </div>
</section>
```

### 4.11 Regulation Card Component (`src/components/marketing/solutions/regulation-card.tsx`)

```typescript
// src/components/marketing/solutions/regulation-card.tsx

import type { VerticalRegulation } from '@/lib/interfaces/solutions'
import { cn } from '@/lib/utils'

interface RegulationCardProps {
  regulation: VerticalRegulation
}

export function RegulationCard({ regulation }: RegulationCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl p-6',
        'bg-white/[0.04] border border-white/[0.06]',
      )}
    >
      {/* Regulation name + verification badge */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-sans text-base font-semibold text-[var(--color-text-primary)]">
            {regulation.name}
          </h3>
          <p className="mt-1 text-xs text-[var(--color-text-tertiary)]">
            {regulation.fullName}
          </p>
        </div>
        <span
          className={cn(
            'flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium',
            regulation.verified
              ? 'bg-[rgba(var(--ember-rgb),0.12)] text-[var(--color-ember)]'
              : 'bg-white/[0.06] text-[var(--color-text-tertiary)]',
          )}
        >
          {regulation.verified ? 'Verified' : 'Under review'}
        </span>
      </div>

      {/* Description */}
      <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
        {regulation.description}
      </p>

      {/* Safetrekr alignment */}
      <div className="mt-4 border-t border-white/[0.06] pt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-text-tertiary)]">
          Safetrekr alignment
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
          {regulation.safetrekrAlignment}
        </p>
      </div>
    </div>
  )
}
```

**Key design decisions:**

1. Verification badge uses ember green for verified claims and neutral gray for unverified. This provides visual differentiation without implying non-compliance -- "Under review" is factual, not negative.
2. The "Safetrekr alignment" section is separated by a thin divider and labeled in the HUD uppercase style, creating a visual distinction between "what the regulation requires" and "how Safetrekr addresses it."
3. If a regulation is `verified: false`, the alignment text must use hedged language per the copy specifications (e.g., "designed with [X] in mind" rather than "compliant with [X]").

### 4.12 Feature Spotlight Component (`src/components/marketing/solutions/feature-spotlight.tsx`)

```typescript
// src/components/marketing/solutions/feature-spotlight.tsx

import {
  ClipboardCheck, Shield, MapPin, Flame, Globe, UserCheck,
  LifeBuoy, Smartphone, ShieldCheck, WifiOff, Bell, Award,
  Receipt, FileDown, AlertTriangle,
} from 'lucide-react'
import type { VerticalFeatureSpotlight } from '@/lib/interfaces/solutions'
import { cn } from '@/lib/utils'

const SPOTLIGHT_ICON_MAP: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  ClipboardCheck, Shield, MapPin, Flame, Globe, UserCheck,
  LifeBuoy, Smartphone, ShieldCheck, WifiOff, Bell, Award,
  Receipt, FileDown, AlertTriangle,
}

interface FeatureSpotlightProps {
  spotlight: VerticalFeatureSpotlight
}

export function FeatureSpotlight({ spotlight }: FeatureSpotlightProps) {
  const Icon = spotlight.iconName
    ? SPOTLIGHT_ICON_MAP[spotlight.iconName]
    : null

  return (
    <div
      className={cn(
        'rounded-xl p-6',
        'bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]',
        'border border-white/[0.08]',
      )}
    >
      {Icon && (
        <div
          className={cn(
            'mb-4 flex h-10 w-10 items-center justify-center rounded-lg',
            'bg-[rgba(var(--ember-rgb),0.08)]',
            'border border-[rgba(var(--ember-rgb),0.12)]',
          )}
        >
          <Icon
            size={20}
            className="text-[var(--color-ember)]"
            aria-hidden="true"
          />
        </div>
      )}
      <h3 className="font-sans text-base font-semibold text-[var(--color-text-primary)]">
        {spotlight.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
        {spotlight.description}
      </p>
      {spotlight.metric && (
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-ember)]">
          {spotlight.metric}
        </p>
      )}
    </div>
  )
}
```

### 4.13 Case Study Placeholder Component (`src/components/marketing/solutions/case-study-placeholder.tsx`)

Designed for future activation when pilot customer data is available (WS-D.2). The component renders a glass card with vertical-aware placeholder content and a CTA to participate in the pilot program.

```typescript
// src/components/marketing/solutions/case-study-placeholder.tsx

import Link from 'next/link'
import { FileText } from 'lucide-react'
import type { CaseStudyPlaceholderData } from '@/lib/interfaces/solutions'
import { cn } from '@/lib/utils'

interface CaseStudyPlaceholderProps {
  caseStudy: CaseStudyPlaceholderData
}

export function CaseStudyPlaceholder({
  caseStudy,
}: CaseStudyPlaceholderProps) {
  return (
    <div
      className={cn(
        'rounded-xl p-8 md:p-10',
        'bg-white/[0.04] border border-white/[0.06]',
        'border-dashed',
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg',
            'bg-white/[0.06] border border-white/[0.08]',
          )}
        >
          <FileText
            size={20}
            className="text-[var(--color-text-tertiary)]"
            aria-hidden="true"
          />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-text-tertiary)]">
            Case study -- {caseStudy.verticalType}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {caseStudy.placeholderCopy}
          </p>
          <Link
            href="/contact"
            className={cn(
              'mt-4 inline-flex items-center text-sm font-semibold',
              'text-[var(--color-ember)]',
              'transition-colors duration-200',
              'hover:text-[var(--color-ember-bright)]',
              'rounded-sm',
              'focus-visible:outline-2 focus-visible:outline-offset-2',
              'focus-visible:outline-[var(--color-ember-bright)]',
            )}
          >
            Schedule a Briefing
          </Link>
        </div>
      </div>
    </div>
  )
}
```

**Key design decisions:**

1. `border-dashed` signals that this is a placeholder -- visually distinct from solid-border content cards. When real case study content replaces this, the border becomes solid and the dashed style is removed.
2. The icon uses tertiary color (not ember) to avoid the placeholder appearing as a primary content element.
3. The CTA links to `/contact` rather than a dedicated case study page, since case study pages do not yet exist.
4. The `suggestedTitle` and `suggestedMetrics` from the data module are not rendered in the placeholder -- they exist as implementation guidance for WS-D.2 when real data is available.

### 4.14 Cross-Link Navigation Section

Reuses the `VerticalCard` component from WS-B.7 (not `VerticalCardGrid`, since we want to show only 4 sibling cards, not all 5).

```tsx
{/* Other Solutions */}
<section className="relative py-16 md:py-20">
  <div className="mx-auto max-w-6xl px-6">
    <div className="mb-12 text-center">
      <h2 className="font-sans text-2xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-3xl">
        Solutions for other verticals
      </h2>
    </div>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {siblingVerticals.map((v) => (
        <VerticalCard key={v.id} vertical={v} />
      ))}
    </div>
  </div>
</section>
```

**Grid note:** 4 sibling cards display in a `lg:grid-cols-4` layout on desktop (one row), `md:grid-cols-2` on tablet, and single column on mobile. This differs from the Solutions overview page (which uses `lg:grid-cols-3` for 5 cards) because 4 cards fit evenly in 4 columns with no orphan row.

### 4.15 Bottom CTA Section

Same pattern as WS-B.7 Section 4.9, with vertical-specific micro-copy.

```tsx
{/* Bottom CTA */}
<section className="relative bg-white/[0.02] py-20 md:py-28">
  <div className="mx-auto max-w-2xl px-6 text-center">
    <h2 className="font-sans text-2xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-3xl">
      See Safetrekr in action.
    </h2>
    <div className="mt-8">
      <Link
        href="/contact"
        className={cn(
          'inline-flex items-center rounded-lg px-8 py-3',
          'bg-[var(--color-ember)] text-base font-semibold text-[var(--color-void)]',
          'transition-all duration-200',
          'hover:bg-[var(--color-ember-bright)]',
          'focus-visible:outline-2 focus-visible:outline-offset-2',
          'focus-visible:outline-[var(--color-ember-bright)]',
          'mkt-cta-breathe',
        )}
      >
        Schedule a Briefing
      </Link>
    </div>
    <p className="mt-4 text-sm text-[var(--color-text-tertiary)]">
      {data.ctaMicrocopy}
    </p>
  </div>
</section>
```

### 4.16 JSON-LD Structured Data Per Vertical

Each page includes a `<script type="application/ld+json">` block with vertical-specific structured data.

```typescript
const verticalSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Safetrekr',
  url: 'https://safetrekr.com',
  applicationCategory: 'BusinessApplication',
  description: data.seoDescription,
  operatingSystem: 'Web',
  audience: {
    '@type': 'Audience',
    audienceType: data.name,
  },
  offers: {
    '@type': 'Offer',
    description: 'Per-trip pricing with no annual contracts',
    url: 'https://safetrekr.com/pricing',
  },
}
```

### 4.17 Component File Manifest

Complete list of all new and modified files:

| # | File Path | Type | Status | Dependencies |
|---|-----------|------|--------|--------------|
| 1 | `src/app/(marketing)/solutions/[vertical]/page.tsx` | Server component | **Modified** (replaces stub) | `VerticalDetailTemplate`, `VERTICAL_DETAIL_MAP`, `VERTICALS` |
| 2 | `src/lib/interfaces/solutions.ts` | Type definitions | **Modified** (extended) | None |
| 3 | `src/lib/data/verticals/k12.ts` | Data module | **New** | `VerticalDetailData` interface |
| 4 | `src/lib/data/verticals/higher-ed.ts` | Data module | **New** | `VerticalDetailData` interface |
| 5 | `src/lib/data/verticals/churches.ts` | Data module | **New** | `VerticalDetailData` interface |
| 6 | `src/lib/data/verticals/youth-sports.ts` | Data module | **New** | `VerticalDetailData` interface |
| 7 | `src/lib/data/verticals/business.ts` | Data module | **New** | `VerticalDetailData` interface |
| 8 | `src/lib/data/verticals/index.ts` | Barrel export + lookup map | **New** | All 5 vertical data modules |
| 9 | `src/components/marketing/solutions/vertical-detail-template.tsx` | Server component | **New** | All section components, `VerticalDetailData`, `SolutionVertical` |
| 10 | `src/components/marketing/solutions/vertical-breadcrumb.tsx` | Server component | **New** | `Link`, `ChevronRight`, `cn` |
| 11 | `src/components/marketing/solutions/regulation-card.tsx` | Server component | **New** | `VerticalRegulation`, `cn` |
| 12 | `src/components/marketing/solutions/feature-spotlight.tsx` | Server component | **New** | `VerticalFeatureSpotlight`, Lucide icons, `cn` |
| 13 | `src/components/marketing/solutions/case-study-placeholder.tsx` | Server component | **New** | `CaseStudyPlaceholderData`, `Link`, `cn` |
| 14 | `src/components/marketing/solutions/index.ts` | Barrel export | **Modified** (add new exports) | New components |

**New directories:**

| Directory | Purpose |
|-----------|---------|
| `src/lib/data/verticals/` | Per-vertical data modules |

**File counts:**
- New TypeScript/TSX files: 11
- Modified TypeScript/TSX files: 3
- New image files: 0
- Total: 14 files

---

## 5. Acceptance Criteria

| ID | Criterion | Verification Method |
|----|-----------|---------------------|
| AC-1 | All 5 vertical routes resolve: `/solutions/k12`, `/solutions/higher-ed`, `/solutions/churches`, `/solutions/youth-sports`, `/solutions/business` | Manual: navigate to each route in dev server |
| AC-2 | Each vertical page renders inside the marketing layout (header visible above, footer visible below) | Manual: visual inspection on all 5 pages |
| AC-3 | Breadcrumb displays "Solutions > [Vertical Name]" with a working link back to `/solutions` | Manual: click breadcrumb link on each page; verify navigation |
| AC-4 | Each page displays the correct H1 and H2 per the content specifications in Section 4.3 | Manual: compare against per-vertical content spec |
| AC-5 | "The Challenge" section renders 4-6 challenge cards in a responsive grid: 3 columns desktop, 2 tablet, 1 mobile | Manual: resize browser at each breakpoint |
| AC-6 | "The Safetrekr Response" section renders 4-6 response cards with ember-tinted borders | Manual: visual inspection; verify ember border color |
| AC-7 | Differentiator callout renders the accountability question in italic/semibold and the answer in regular weight | Manual: visual inspection |
| AC-8 | Regulatory section renders 3-5 regulation cards with correct verification badges ("Verified" in green, "Under review" in gray) | Manual: inspect each regulation card badge |
| AC-9 | All regulations marked `verified: false` in the data module display "Under review" badge and use hedged alignment language | Manual + code review: cross-reference data module `verified` field with rendered badge |
| AC-10 | Feature spotlight cards render with correct Lucide icons, descriptions, and metric labels | Manual: inspect all spotlight cards across all 5 pages |
| AC-11 | Case study placeholder renders with dashed border, tertiary icon, placeholder copy, and "Schedule a Briefing" link to `/contact` | Manual: visual inspection on all 5 pages |
| AC-12 | "Other solutions" section renders 4 sibling vertical cards (excludes current vertical) with working links | Manual: verify 4 cards on each page; click each link |
| AC-13 | Bottom CTA renders "Schedule a Briefing" button with breathing glow animation and vertical-specific micro-copy | Manual: verify button, animation class, and micro-copy text |
| AC-14 | Per-page SEO metadata renders correct `<title>`, `<meta name="description">`, and OpenGraph tags for each vertical | DevTools: inspect `<head>` elements on each page |
| AC-15 | JSON-LD structured data (`application/ld+json`) renders with vertical-specific audience type | DevTools: inspect JSON-LD on each page |
| AC-16 | No `'use client'` directive in any component file -- entire page tree is server-rendered | Code review: grep for `'use client'` in all new files |
| AC-17 | No `import` from `'framer-motion'` -- only `'motion/react'` if needed (these pages should not need it) | Code review: grep for `framer-motion` |
| AC-18 | No hardcoded hex colors in component files -- only spatial token CSS variables | Code review: grep for `#[0-9a-fA-F]` in new component files |
| AC-19 | Glass-morphism surfaces use the canonical pattern: `bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]` + `border border-white/[0.08]` | Code review: verify CSS classes on response cards and feature spotlights |
| AC-20 | `pnpm typecheck` passes with zero errors | CLI: `pnpm typecheck` |
| AC-21 | `pnpm lint` passes with zero errors | CLI: `pnpm lint` |
| AC-22 | `pnpm build` completes successfully with all 5 vertical pages pre-rendered via `generateStaticParams` | CLI: `pnpm build`; verify 5 static pages in build output |
| AC-23 | All interactive elements have visible focus indicators: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]` | Manual: Tab through all interactive elements on each page |
| AC-24 | Pages are fully keyboard-navigable: breadcrumb, cross-link cards, CTA button receive focus in logical order | Manual: Tab through each page |
| AC-25 | Invalid vertical slugs (e.g., `/solutions/invalid`) return a 404 page | Manual: navigate to an invalid slug; verify 404 renders |
| AC-26 | Vertical pages inherit the same URL pattern as WS-B.7 card links -- no broken links from Solutions overview to vertical detail | Manual: click each "Learn more" link on the Solutions overview page; verify navigation to correct vertical page |
| AC-27 | Regulation card verification badges correctly reflect the `verified` boolean in the data module for all regulations across all 5 pages | Manual: cross-reference every regulation card badge against its data module value |
| AC-28 | Adding or removing a vertical requires only a data module change and an `index.ts` update -- no template or component modifications | Code review: verify template renders from data, no vertical-specific branches in component logic |
| AC-29 | Page renders correctly with `prefers-reduced-motion: reduce` -- no animations that would be problematic | Manual: enable reduced motion in OS settings |
| AC-30 | Objection hook section renders on every vertical page with the correct vertical-specific question and answer | Manual: inspect objection hooks on all 5 pages |

---

## 6. Decisions Made

| # | Decision | Rationale | Alternatives Considered |
|---|----------|-----------|------------------------|
| D-1 | All vertical pages render through a single shared template component (`VerticalDetailTemplate`) with vertical-specific data | One template ensures visual consistency across verticals. Adding a new vertical requires only a data module -- no new components. Maintenance is centralized. | Individual page components per vertical (duplication; divergence over time); MDX pages per vertical (loses type safety; harder to maintain visual consistency) |
| D-2 | Per-vertical data lives in separate TypeScript files under `src/lib/data/verticals/` | Each vertical data file is approximately 150-200 lines. Separate files enable independent editing, clear ownership, and manageable PR diffs. | Single file with all verticals (too large; merge conflicts); database-backed content (over-engineering for 5 static pages) |
| D-3 | Regulatory compliance sections include a `verified` boolean per regulation with distinct visual treatment | Prevents the legal risk of claiming unverified compliance. The "Under review" badge is honest and professional. Legal/business owner can flip the boolean to `true` when verification is complete -- data-only change, no component edit. | Omit unverified regulations (loses valuable content); claim all as verified (legal risk); hide verification status (opacity without accountability) |
| D-4 | Case study placeholders use `border-dashed` styling to visually signal placeholder status | Dashed borders are a widely understood visual convention for "placeholder" or "drop zone." This prevents visitors from perceiving the placeholder as broken content. When real case studies replace placeholders, the border becomes solid. | Hide case study section entirely (loses the structural slot; harder to activate later); show a "coming soon" badge (adequate but less visually distinct); render nothing (page feels incomplete without social proof anchor) |
| D-5 | Slugs match WS-B.7 card `ctaHref` values: `k12`, `higher-ed`, `churches`, `youth-sports`, `business` | WS-B.7 already ships with card links pointing to these slugs. Changing slugs would require updating the parent page data module. Consistency prevents broken links. | Longer slugs (`higher-education` instead of `higher-ed`) -- would require WS-B.7 data module update; numbered slugs -- non-descriptive for SEO |
| D-6 | The differentiator callout (accountability question/answer) is a distinct section, not embedded in the response section | The independent analyst review is THE differentiator. Giving it a dedicated, visually prominent callout section ensures it is not lost in a list of features. The ember-tinted border and italic question styling create visual weight. | Inline within responses section (buried among other features); sidebar callout (breaks responsive layout); top of page (too early -- challenge must be established first) |
| D-7 | Cross-link navigation shows 4 sibling verticals, not all 5 | Showing the current vertical's card in the cross-link section is redundant and confusing. 4 cards fit cleanly in `lg:grid-cols-4` with no orphan row. | Show all 5 with current highlighted (confusing UX); show 2-3 "related" verticals (arbitrary; all verticals are equally relevant); omit cross-links (loses internal linking value for SEO and navigation) |
| D-8 | Entire page tree is server-rendered with zero `'use client'` components | These are content-heavy evaluation pages. There are no interactive elements requiring client state (no modals, no toggles, no forms). Server rendering maximizes SEO value and eliminates JavaScript bundle cost. | Client component for hover effects (CSS handles this); client component for future A/B testing (use middleware or feature flags) |
| D-9 | Feature spotlight icons use an extended `SPOTLIGHT_ICON_MAP` rather than dynamic imports | Static icon map is type-safe, tree-shakeable, and does not require dynamic `import()` syntax. The icon set is small (15 icons) and known at build time. | Dynamic Lucide icon imports (larger bundle; complexity); no icons (cards feel text-heavy); custom SVGs (design effort with no current asset) |
| D-10 | Regulatory content uses hedged language ("designed with [X] in mind") for all `verified: false` items | Legal risk mitigation. Claiming compliance that has not been verified by legal or the business owner creates liability. Hedged language is honest, professional, and upgradeable -- when verification is confirmed, the data module field flips to `true` and the copy strengthens. | Omit unverified regulations (loses valuable context for the buyer); include without hedging (legal risk); add a blanket disclaimer (undermines trust in verified claims too) |

---

## 7. Open Questions

| # | Question | Impact | Owner | Resolution Deadline |
|---|----------|--------|-------|---------------------|
| OQ-1 | Should the vertical URL slugs match WS-B.7 exactly (`higher-ed`) or be expanded (`higher-education`) for SEO? The task requirements reference `/solutions/higher-education` but WS-B.7 card links point to `/solutions/higher-ed`. | If slugs change, WS-B.7 data module (`solutions-verticals.ts`) must be updated to match. Broken links between parent and child pages if not synchronized. | Product / SEO | Before implementation begins |
| OQ-2 | Should regulatory claims marked `verified: false` be included on the page at all, or held until verification? | Including them with "Under review" badges provides valuable context and signals thoroughness. Omitting them removes potentially misleading content but also removes buyer-relevant regulatory information. Current decision: include with hedged language. | Legal / Product | Before production launch |
| OQ-3 | Are there additional regulations per vertical that should be included beyond those specified in Section 4.3? For example: ADA accessibility requirements for field trips, Title IX implications for athletic travel, state-specific child labor laws for youth sports. | Would add 1-2 regulation cards per vertical. Data-only change -- no component modifications. | Legal / Product | Before implementation begins |
| OQ-4 | Should the "Schedule a Briefing" CTA on vertical pages link to `/contact` with a pre-selected organization type matching the vertical? For example, `/contact?type=k12`. | Would improve conversion by reducing form friction. Requires the contact form (WS-A.4) to accept URL query parameters for pre-filling. | Product / React Developer | Before WS-A.4 implementation |
| OQ-5 | Should vertical pages include a "Pricing for [Vertical]" mini-section with a contextual value reframe? For example, "A 30-student field trip with Safetrekr costs $15 per student" for K-12. | Would address pricing objections without requiring visitors to leave the vertical page. Pricing values are still UNVALIDATED (Q-1 from combined-recommendations.md). | Product / Business Owner | After Q-1 resolves |
| OQ-6 | Is ISO 31030 alignment verified for the Business vertical? The standard is referenced in the regulatory section but marked `verified: false`. | If verified, strengthens the business vertical's enterprise credibility. If not applicable, remove from the regulation list. Data-only change. | Business Owner / Legal | Before production launch |
| OQ-7 | Should vertical pages include internal links to specific sections of the How It Works page (e.g., `/how-it-works#analyst-review`) for feature deep-dives? | Would improve cross-page navigation and reduce bounce. Requires anchor IDs on How It Works page sections (WS-B.3). | Product | During implementation |

---

## 8. Risk Register

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|------------|--------|------------|
| R-1 | Deep vertical copy is not ready when implementation begins | Medium | High | Per-vertical data modules are independent files. Implementation can proceed with 1-2 verticals while copy for remaining verticals is finalized. The shared template does not change -- only data modules are added. |
| R-2 | Unverified regulatory claims (FERPA, COPPA, Clery Act, ISO 31030) create legal liability | Medium | High | All unverified regulations are marked `verified: false` in the data module. The `RegulationCard` component renders "Under review" badges and hedged alignment language for these items. Copy review by legal is required before production launch. Data-only change to upgrade. |
| R-3 | Vertical URL slugs mismatch between WS-B.7 parent page and WS-D.1 detail pages | Low | High | OQ-1 tracks the slug alignment question. Default decision: match WS-B.7 slugs exactly. The `VALID_VERTICAL_SLUGS` array is derived from the data module keys, ensuring a single source of truth. |
| R-4 | Five glass-morphism card grids per page (challenges, responses, regulations, features, cross-links) cause performance issues on low-end devices | Medium | Medium | Challenge and regulation cards use `bg-white/[0.04]` without `backdrop-blur` (lighter rendering). Only response cards and feature spotlights use the full glass-morphism pattern. On mobile, cards stack vertically with only 1-2 in viewport at any time. Follow WS-B.7 R-2 mitigation: `@supports (backdrop-filter: blur(16px))` fallback. |
| R-5 | Case study placeholders look "empty" and reduce page credibility | Medium | Medium | Dashed border styling signals "upcoming" rather than "missing." Placeholder copy frames the absence positively ("we are partnering with [vertical] organizations in pilot programs"). CTA links to `/contact` to convert the placeholder into a lead-capture opportunity. When real case studies are available (WS-D.2), the placeholder swap is a data-only change. |
| R-6 | Content length varies significantly across verticals, creating inconsistent page lengths | Low | Low | The shared template renders all sections in the same order regardless of content length. Some verticals have 5 challenges, others have 6. Some have 4 regulations, others have 3. The grid layout handles variable item counts naturally. Visual consistency comes from the template structure, not content volume. |
| R-7 | Regulatory content becomes outdated as laws change | Medium | Medium | Regulatory data lives in per-vertical data modules with clear structure. Updates require editing a single string in a single file. The `verified` boolean provides a built-in review mechanism. Recommend a quarterly audit of regulatory content as part of the Narrative Health Check (combined-recommendations.md Phase D). |
| R-8 | SEO value is diluted across 5 pages with similar content patterns | Low | Medium | Each vertical page has unique SEO title, description, keywords, and JSON-LD audience type. Content is genuinely distinct -- different challenges, different regulations, different feature emphasis. Cross-linking between vertical pages and back to the Solutions overview strengthens internal linking. |
| R-9 | Accessibility compliance risk from dark HUD aesthetic with multiple card density levels | Medium | High | Follow R-14 from combined-recommendations.md. Regulation cards use high-contrast text for critical compliance information. Verification badges use color + text (not color alone) for accessibility. Focus indicators on all interactive elements. Test with screen readers. |
| R-10 | WS-B.7 `VerticalCard` component does not render well in the 4-column cross-link grid (designed for 3-column grid) | Low | Low | The `VerticalCard` is a flex column with `mt-auto` CTA alignment. It handles narrower column widths gracefully -- text wraps, spacing adjusts. If cards feel too narrow at `lg:grid-cols-4`, fall back to `lg:grid-cols-2` with 2 rows of 2. |

---

## Estimated Effort

**Size:** L (Large)
**Estimated time:** 16-24 hours total

| Agent | Task | Estimate |
|-------|------|----------|
| Narrative Strategist | Draft K-12 vertical copy | 2 hr |
| Narrative Strategist | Draft Higher Education vertical copy | 2 hr |
| Narrative Strategist | Draft Churches vertical copy | 2 hr |
| Narrative Strategist | Draft Youth Sports vertical copy | 2 hr |
| Narrative Strategist | Draft Business vertical copy | 2 hr |
| Narrative Strategist | Review regulatory accuracy, voice compliance | 1 hr |
| React Developer | Type definitions + barrel exports | 30 min |
| React Developer | Per-vertical data modules (5 files) | 2 hr |
| React Developer | VerticalDetailTemplate component | 1.5 hr |
| React Developer | RegulationCard, FeatureSpotlight, CaseStudyPlaceholder, VerticalBreadcrumb | 1.5 hr |
| React Developer | Dynamic route page component + generateStaticParams | 30 min |
| React Developer | SEO metadata + JSON-LD per vertical | 30 min |
| React Developer | Responsive testing (3 breakpoints x 5 pages) | 1 hr |
| React Developer | Keyboard + accessibility verification | 30 min |
| React Developer | TypeCheck + Lint + Build verification | 30 min |

**Effort split:** ~11 hr narrative strategy, ~8.5 hr implementation

**Why this is larger than WS-B.7 (Solutions overview):**
- 5 pages of deep, distinct content vs. 1 page with 5 cards
- Regulatory and compliance research per vertical
- Extended data interfaces with more fields
- 4 new component types (RegulationCard, FeatureSpotlight, CaseStudyPlaceholder, VerticalBreadcrumb)
- SEO metadata per page (5 unique metadata sets vs. 1)
- Cross-link navigation logic
- Significantly more copy volume -- approximately 10x the word count of the Solutions overview

**Parallelization opportunity:** The narrative strategist can draft vertical copy in parallel with the react developer building the template component and shared components. Copy populates the data modules; the template renders whatever data is available. Verticals can ship incrementally -- the first vertical can go live while remaining verticals are still in copy review.
