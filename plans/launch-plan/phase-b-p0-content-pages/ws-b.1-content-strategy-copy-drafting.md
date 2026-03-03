# WS-B.1: Content Strategy + Copy Drafting

> **Workstream ID:** WS-B.1
> **Phase:** B -- P0 Content Pages
> **Assigned Agent:** `world-class-product-narrative-strategist`
> **Status:** Draft
> **Created:** 2026-03-02
> **Last Updated:** 2026-03-02
> **Depends On:** None (starts in parallel with Phase A infrastructure)
> **Blocks:** WS-B.2 (Landing Page), WS-B.3 (How It Works), WS-B.4 (Platform), WS-B.5 (Pricing), WS-B.6 (Security), WS-B.7 (Solutions)
> **Resolves:** Gap 1 (No Marketing Copy Exists), R-01 (Critical path blocker)

---

## 1. Objective

Produce a complete, draft-ready marketing copy deck for all seven P0 content pages of the Safetrekr marketing site. Every headline, body block, feature bullet, and CTA must be grounded in verified product capabilities, aligned to the "Calm Authority" brand voice, and structured for the Oblivion HUD dark glass-morphism visual system. This workstream resolves the single highest-risk item in the launch plan: the total absence of marketing copy.

The copy deck becomes the authoritative input for WS-B.2 through WS-B.7. No page implementation begins until the corresponding copy section is approved.

---

## 2. Scope

### In Scope

1. **Voice and Tone Guide** -- Codified reference document derived from the narrative strategist review and holistic overview, including vocabulary lists, tone-by-context matrix, sentence structure rules, and examples.
2. **Messaging Hierarchy** -- Primary, secondary, and tertiary messages ranked by buyer resonance, with placement guidance per funnel stage.
3. **Value Proposition Framework** -- Six-tier value prop stack with benefit statements, proof points, and page-placement map.
4. **Per-Page Copy Specifications** for all 7 P0 pages:
   - Landing Page
   - How It Works
   - Platform
   - Solutions (overview with 5 vertical cards)
   - Pricing
   - Security
   - Contact
5. **Objection Handling Copy Bank** -- Eight objection-rebuttal pairs mapped to the specific pages and sections where each is deployed.
6. **SEO Keyword Targets** -- Primary and secondary keywords per page for metadata and on-page optimization.
7. **Social Proof Placeholder Strategy** -- What to display before testimonials exist, including placeholder structures and activation triggers.
8. **Copy Approval Workflow Recommendation** -- Review gates and sign-off process before copy enters implementation.

### Out of Scope

- **Visual design or layout decisions** -- This workstream produces copy, not wireframes. Layout is governed by the visual pattern in AD-2 (Oblivion HUD Content Pages) and implemented by WS-B.2 through WS-B.7.
- **Individual vertical sub-pages** (`/solutions/k12`, `/solutions/churches`, etc.) -- Phase D scope (WS-D.1). The Solutions overview page in this workstream includes vertical card copy but not full sub-page copy.
- **Blog or resource content** -- Phase D scope (WS-D.4).
- **Legal page copy** (Terms of Service, Privacy Policy) -- Business owner responsibility (WS-B.8).
- **About / Team page copy** -- WS-B.9 scope; uses existing reference content from the marketing-site reference files.
- **Gateway boot sequence copy** -- Already implemented; refinements are out of scope unless explicitly requested.
- **Paid advertising copy, email sequences, or sales deck content** -- Post-launch marketing deliverables.

---

## 3. Input Dependencies

| Input | Source | Status | Critical? |
|-------|--------|--------|-----------|
| Messaging framework, headlines, objection handling | `holistic-overview.md` Section 9 | Available | Yes |
| Value proposition hierarchy | `holistic-overview.md` Section 8 | Available | Yes |
| Brand voice definition, narrative arc, CTA copy | `product-narrative-strategist.md` | Available | Yes |
| Code-verified product capabilities | `product-review-safetrekr-app-v2-verified.md` | Available | Yes |
| Page requirements and section structure | `combined-recommendations.md` Detailed Requirements | Available | Yes |
| Market positioning, TAM, competitive context | `product-strategy-analyst.md` | Available | Yes |
| Target audience profile | `holistic-overview.md` Section 2 | Available | Yes |
| Pricing confirmation (T1/T2/T3) | Business owner | **Unvalidated** (Q-1) | Yes -- pricing page |
| SOC 2 certification status | Business owner | **Unvalidated** (Q-3) | Yes -- security page |
| FERPA compliance verification | Legal review | **Unvalidated** (Q-4) | Yes -- security page |
| Free trial / freemium offer decision | Business owner | **Unvalidated** (Q-2) | Yes -- pricing page |
| Pilot customer testimonials | Business owner outreach | **Not started** (Q-7) | No -- placeholder strategy covers this |

---

## 4. Deliverables

### 4.1 Voice and Tone Guide

A codified reference for anyone writing or editing Safetrekr copy.

**Brand Voice: Calm Authority**

The most prepared person in the room. Not the loudest. Not the most dramatic. The person who has briefed a thousand teams, who knows every contingency, and who speaks with the quiet confidence of someone who has done the work.

**Voice Spectrum Position**

```
COLD/MILITARY -------- CALM AUTHORITY -------- WARM/CASUAL
     |                       |                       |
 "System nominal"    "Every safeguard          "We've got your
  "Deploy protocol"   verified before            back on every
  "Risk vector         departure."                trip!"
   contained"
```

Safetrekr sits at Calm Authority -- left of center but not at the extreme. The mission-control aesthetic signals seriousness, not coolness.

**Sentence Rules**

- Maximum 20 words per sentence in body copy. Headlines can be shorter (target 3-8 words).
- Parallel construction in lists and feature bullets.
- Active voice. Subject-verb-object.
- One idea per sentence. One theme per paragraph.
- No exclamation points. No emoji. No "Hey there!" openers.
- Measured cadence. Let the facts carry weight.

**Vocabulary to Use**

| Category | Words |
|----------|-------|
| Accountability | verified, documented, auditable, traceable, recorded, signed off |
| Completeness | every, all, nothing missed, end-to-end, full-spectrum |
| Control | system of record, single source of truth, dashboard, real-time, centralized |
| Safety | safeguard, protect, preparedness, response, intelligence, alert |
| Trust | independent, reviewed, approved, compliant, transparent, proven |
| Operations | deployed, active, monitoring, standing by, operational, in service |

**Vocabulary to Avoid**

| Category | Words |
|----------|-------|
| Hype | revolutionary, game-changing, disruptive, next-gen, cutting-edge |
| Fear | disaster, catastrophe, nightmare, devastating, unthinkable |
| Casual | awesome, amazing, super easy, no-brainer, check it out |
| Vague | world-class, best-in-class, industry-leading, robust, seamless |
| Tech jargon | leverage, synergy, ecosystem, scalable (without specifics) |

**Tone by Page Context**

| Page | Tone Adjustment |
|------|----------------|
| Landing | Maximum confidence. Clear, declarative, outcome-focused. |
| How It Works | Confident tour guide. Structured, unhurried, specific. |
| Platform | Technical precision with benefit framing. Feature-rich but scannable. |
| Solutions | Empathetic peer. "We understand what you face." Vertical-specific pain. |
| Pricing | Transparent and direct. No hedging. No asterisks. Value-forward. |
| Security | Technical specification. Zero marketing language. Fact-only. |
| Contact | Warm but professional. Reassurance-forward. Low-commitment framing. |

**The "Peace of Mind" Rule**

"Peace of mind" is the emotional close -- never the opener, never the headline. Lead with accountability and operational control. Close with reassurance.

---

### 4.2 Messaging Hierarchy

Messages ranked by buyer resonance, from highest to lowest conversion impact.

**Primary Message (Lead with this everywhere)**

> "When someone asks 'Did you do everything you could?' -- Safetrekr is the documented answer."

This is the core conversion message. It connects to the buyer's deepest professional anxiety: not that something will go wrong, but that they cannot prove they did everything right. Every page's final CTA section should echo this theme.

**Secondary Messages (Supporting pillars, used on every page)**

1. **Documented Accountability** -- "Every decision documented. Every safeguard verified. Every traveler accounted for."
2. **Independent Analyst Review** -- "A separate pair of eyes reviews every trip before departure. No competitor offers this."
3. **Operational Control** -- "Replace spreadsheets, email chains, and paper checklists with one system of record."

**Tertiary Messages (Page-specific, used where relevant)**

4. **Real-Time Intelligence** -- "Know about threats before they reach your travelers."
5. **Compliance Automation** -- "Background checks, documents, certifications -- tracked and enforced automatically."
6. **Traveler Protection** -- "Safety information reaches every traveler, with proof it was received."
7. **Per-Trip Transparency** -- "Pay for what you use. No annual contracts. No hidden fees."

**Placement Guide**

| Funnel Stage | Messages to Emphasize |
|-------------|----------------------|
| Awareness (Landing hero, ads) | Primary + Secondary #1, #2 |
| Consideration (How It Works, Platform) | Secondary #1, #2, #3 + Tertiary #4, #5 |
| Evaluation (Solutions, Pricing, Security) | Secondary #2, #3 + Tertiary #5, #6, #7 |
| Decision (Contact, CTAs) | Primary message + "Peace of mind" close |

---

### 4.3 Value Proposition Framework

Six-tier value prop stack, ranked by buyer resonance.

| Rank | Value Proposition | Lead Statement | Proof Points (Verified) | Primary Pages |
|------|------------------|----------------|------------------------|---------------|
| 1 | Documented Accountability | "Every decision documented. Every safeguard verified." | 18 review dimensions per trip; evidence and activity tracking with 3 source types; timestamped approval decisions with reason codes; full audit trail from creation through completion | Landing, How It Works, Solutions |
| 2 | Operational Control | "Replace scattered tools with a single system of record." | 4 integrated portals (Client, Analyst, HQ, Traveler); 10-step trip creation wizard; centralized document collection, background checks, certification tracking; real-time dashboard | Landing, How It Works, Platform |
| 3 | Real-Time Intelligence | "Know about threats before they reach your travelers." | TarvaRI intelligence engine with multi-source aggregation; risk scoring with percentile bands (P5, P50, P95); alert classification by severity and category; analyst triage with delivery routing | How It Works, Platform |
| 4 | Compliance Automation | "Background checks, consents, certifications -- tracked and enforced." | 5 background check types across 3 providers; 9 document requirement templates; 12 predefined certification types with expiration monitoring; automated reminders at 7, 3, 1 day before deadline | Platform, Solutions |
| 5 | Traveler Protection | "Safety information reaches every traveler, with proof." | Native mobile app with offline-first architecture; geo-triggered checklist delivery; background geofence monitoring; SMS emergency broadcast; alert acknowledgment tracking | How It Works, Platform |
| 6 | Peace of Mind | "Sleep the night before departure." | Emotional close only. Supported by all proof points above. | Bottom of How It Works, Solutions, Contact success state |

---

### 4.4 Per-Page Copy Specifications

---

#### 4.4.1 Landing Page

**Route:** `/(marketing)/landing`
**Purpose:** Convert first-time visitors into briefing requests. Establish category authority in under 10 seconds of reading.
**SEO Title:** `Safetrekr -- Trip Safety Management for Organizations That Move People`
**SEO Description:** `Every traveler accounted for. Safetrekr replaces spreadsheets and email chains with a documented, auditable safety platform. Independent analyst review. Real-time intelligence. Per-trip pricing.`

---

**HERO SECTION**

H1:
> Every traveler accounted for.

Subheadline:
> Safetrekr replaces scattered spreadsheets, email chains, and paper checklists with a single, auditable trip safety platform -- backed by independent analyst review that no competitor offers.

Primary CTA: `Schedule a Briefing`
CTA micro-copy: `20-minute briefing. No obligation.`

Secondary CTA: `Explore the Platform`
(Links to `/launch` spatial ZUI experience)

---

**THREE VALUE PROPOSITION CARDS**

Card 1 -- Documented Accountability
> Every decision documented. Every safeguard verified.

Body:
> Independent safety analysts review every trip across 18 dimensions before departure. Every checklist acknowledgment, every background check, every approval decision -- timestamped, attributed, and audit-ready.

Card 2 -- Operational Control
> One platform. Four portals. Complete lifecycle coverage.

Body:
> Organization administrators plan trips. Independent analysts verify safety. Travelers receive live safety information on their phones. HQ monitors the entire operation. One system of record replaces dozens of disconnected tools.

Card 3 -- Real-Time Intelligence
> Know about threats before they reach your travelers.

Body:
> Safetrekr's intelligence engine monitors destinations for security, weather, health, transport, and political risks. Alerts are risk-scored, analyst-triaged, and delivered to the people who need them -- with proof of receipt.

---

**HOW IT WORKS SUMMARY (4-phase visual)**

Section header:
> Four phases. One system of record.

Phase 1 -- Plan
> Guided 10-step wizard captures every detail: logistics, rosters, lodging, venues, transportation, and emergency preparedness.

Phase 2 -- Review
> An independent safety analyst reviews every trip across 18 dimensions. Separation of duties is enforced by the platform, not by policy.

Phase 3 -- Protect
> 46-endpoint protection system activates rally points, safe houses, geofencing, and SMS emergency broadcast. Intelligence alerts are delivered in real time.

Phase 4 -- Monitor
> Live traveler delivery through the mobile app. Geo-triggered checklists. Alert acknowledgment tracking. Every interaction documented.

Link: `See how it works ->` (routes to `/how-it-works`)

---

**VERTICAL CALLOUTS (5 cards)**

Section header:
> Built for organizations that move people.

K-12 Schools:
> Field trip safety, parental consent, background screening, and regulatory compliance -- documented for every trip.

Higher Education:
> Study abroad risk management, international safety review, and institutional audit documentation.

Churches:
> Mission trip safety planning, volunteer screening, international risk assessment, and emergency preparedness.

Youth Sports:
> Tournament travel coordination, coach screening, medical consent, and real-time alerts for traveling teams.

Business:
> Corporate duty of care documented, not assumed. Travel risk management with per-trip pricing.

Link on each card: `Learn more ->` (routes to `/solutions`)

---

**SOCIAL PROOF SECTION (placeholder structure)**

Section header:
> Trusted by organizations that take safety seriously.

Placeholder strategy (before testimonials exist):
> Display three "capability proof" cards instead of testimonials:

Card A: `18 review dimensions per trip` -- "Every trip reviewed by an independent safety analyst across 18 safety dimensions before departure."

Card B: `46 protection endpoints` -- "Rally points, safe houses, geofencing, SMS broadcast, and evacuation plans -- active and connected."

Card C: `4 integrated portals` -- "Client, Analyst, HQ, and Traveler portals working from one system of record."

*Activation trigger: Replace with real testimonials when pilot customer quotes are available (Q-7). Target format: "[Quote]" -- [Name], [Title], [Organization Type]*

---

**BOTTOM CTA BAR**

> Your travelers trust you to bring them home safely.
> Safetrekr makes sure that trust is backed by a system -- not just good intentions.

Primary CTA: `Schedule a Briefing`
Secondary CTA: `See Pricing`

---

#### 4.4.2 How It Works

**Route:** `/(marketing)/how-it-works`
**Purpose:** Convert curiosity into confidence. Tell the complete system story in under 3 minutes of reading time.
**SEO Title:** `How Safetrekr Works -- Plan, Review, Protect, Monitor`
**SEO Description:** `Four phases cover the full trip lifecycle. Independent analyst review across 18 dimensions. 46-endpoint protection system. Geo-triggered traveler delivery. See how Safetrekr documents every safeguard.`

---

**HERO**

H1:
> From trip planning to traveler protection. One system of record.

H2 (subheadline):
> Safetrekr replaces scattered spreadsheets, email chains, and paper checklists with a verified, auditable safety platform that covers every stage of the trip lifecycle.

---

**OPENING PROBLEM STATEMENT**

> Spreadsheets. Email chains. Paper checklists. Hope.
>
> That is how most organizations manage trip safety today. It works -- until it does not. Until a background check expires and nobody notices. Until an emergency contact form is missing and nobody follows up. Until someone asks: "Did you do everything you could?"
>
> Safetrekr replaces hope with a system.

---

**PHASE 1: PLAN**

H2:
> Plan with structure, not spreadsheets.

Body:
> Safetrekr's 10-step trip creation wizard walks administrators through every detail a safety reviewer needs -- from basic logistics to emergency preparedness. The wizard enforces completeness at each stage, reducing back-and-forth between trip organizers and safety teams.

**10-Step Wizard (expandable/tabbed list):**

1. **Trip Type Selection** -- Choose the complexity tier: T1 (day trip), T2 (domestic overnight), or T3 (international). The selected tier determines which safety requirements apply.
2. **Basic Information** -- Trip name, destination, travel dates, departure city, purpose, rally point, and point of contact.
3. **Participants** -- Add travelers, chaperones, and guardians individually or in bulk. CSV and Excel import with intelligent field matching and automatic deduplication.
4. **Air Travel** -- Flight details with built-in flight lookup that auto-populates airline, airport, terminal, and gate from a flight number.
5. **Lodging** -- Accommodations with check-in/check-out dates, floor assignments, and contact information. Automatic fire safety flagging for rooms above the sixth floor.
6. **Venues** -- Every venue catalogued by category: museum, historical site, educational facility, sports venue, entertainment venue, restaurant, park, or other.
7. **Itinerary** -- Day-by-day event schedule with times and locations. Events from flights, lodging, and venues are auto-populated.
8. **Transportation** -- Ground transportation modes between events: walking, public transit, rideshare, charter bus, or private vehicles.
9. **Add-Ons** -- Optional services including background check packages, travel insurance, and accessibility or dietary tracking. Pricing calculated in real time.
10. **Review** -- Final summary of every detail for confirmation before submission to safety review.

Supporting statement:
> Every trip starts as a draft and moves through a clear lifecycle: draft, in review, active, in progress, completed. Nothing falls through the cracks because the system enforces the process.

---

**PHASE 2: REVIEW (Centerpiece section -- most prominent)**

H2:
> Verify with independence, not assumption.

Body:
> This is what makes Safetrekr fundamentally different. Every trip submitted by an organization passes through an independent analyst review before it can be approved for travel. The analyst is not part of the trip planning team. They are a separate pair of eyes -- enforced by the platform, not by policy.

Sub-header:
> 18 review dimensions. One independent analyst.

**18 Review Dimensions (list):**

1. Overview -- Trip summary and key metrics
2. Participants -- Roster verification
3. Air Travel -- Flight details review
4. Lodging -- Accommodation review with interactive map and fire safety assessment
5. Venues -- Venue review with map overlay
6. Itinerary -- Day-by-day timeline review
7. Transportation -- Ground transport review
8. Safety Review -- Safety checklist verification with participant compliance tracking
9. Emergency Preparedness -- Contacts, services, facilities, evacuation plans, and kit profiles
10. Documents -- Document requirement and submission status verification
11. Background Checks -- Screening status verification across all participants and check types
12. Intel Alerts -- Real-time alert review and acknowledgment workflow
13. Issues -- Issue flagging, categorization, and resolution tracking
14. Evidence and Activity -- Evidence management and documented audit trail
15. Checklists -- Assignment, release timing, audience targeting, and acknowledgment tracking
16. Packet Builder -- Trip packet assembly for role-based distribution
17. Communications -- Activity tracking (planned)
18. Approval -- Final approve, reject, or conditional approval with documented reason codes

Supporting statement:
> Analysts are assigned by tier: junior analysts review day trips, mid-level analysts handle domestic overnight travel, senior analysts cover international trips. Each analyst's workload is tracked, and every review decision is timestamped and attributed.

Objection hook (inline):
> "We already have a safety review process." -- Safetrekr does not replace your process. It documents and standardizes it, adds independent verification, and creates the audit trail that proves it happened.

---

**PHASE 3: PROTECT**

H2:
> Protect with systems, not checklists on a shelf.

Body:
> Safetrekr's protection system goes beyond static emergency preparedness data. A 46-endpoint API manages rally points, safe houses, musters, check-ins, and evacuation plans -- all connected to active geofencing on travelers' devices.

**Feature bullets:**

- **Rally Points** -- Designated assembly locations with GPS coordinates, contact information, and automatic geofence creation. Geofences alert on entry.
- **Safe Houses** -- Vetted safe locations with approval workflows and automatic geofence creation. Geofences alert on exit -- tracking when travelers leave safe zones.
- **Evacuation Plans** -- Three escalation tiers: shelter in place, local evacuation, and full relocation. Each with designated decision-makers and transport protocols.
- **Medical Facility Directory** -- Nearby facilities catalogued with trauma capability levels (Level I through Level V), estimated travel times, and primary/backup designation.
- **Emergency Kit Profiles** -- Recommended medical kit configurations based on group composition, environment type, and expected emergency response times.
- **Real-Time Intelligence** -- TarvaRI intelligence engine monitors destinations for security, weather, health, transport, and political risks. Alerts are risk-scored with percentile confidence bands and analyst-triaged before delivery.

Supporting statement:
> Emergency preparedness is not a binder on a shelf. It is an active, connected system that knows where your travelers are and what threats are nearby.

---

**PHASE 4: MONITOR**

H2:
> Deliver to every traveler. Document every interaction.

Body:
> The Safetrekr Traveler App puts safety information directly in participants' hands -- with proof that it was received.

**Feature bullets:**

- **Live Trip Delivery** -- Itineraries, safety checklists, intelligence alerts, and emergency preparedness information delivered to a native mobile app.
- **Offline-First Architecture** -- All critical trip data cached locally in SQLite. Travelers can access safety information even without network connectivity.
- **Geo-Triggered Checklists** -- Context-appropriate safety guidance activated when participants enter designated zones. Pre-departure checklists triggered by date.
- **Alert Acknowledgment** -- Two-way confirmation that safety-critical information has been received and reviewed. Every acknowledgment recorded.
- **Geofence Monitoring** -- Background location monitoring against trip-defined zones. Violation alerts surface to chaperones and guardians when travelers leave safe zones.
- **SMS Emergency Broadcast** -- Chaperones can send SMS broadcast messages to all trip participants directly from the app.

Supporting statement:
> When a parent asks whether their child received the safety briefing, the answer is not "we sent an email." The answer is: "They acknowledged it on their phone at 3:47 PM on Tuesday. Here is the record."

---

**DOCUMENTATION CLOSING SECTION**

H2:
> Document everything. Prove everything.

Body:
> Every action in Safetrekr is logged: trip creation, participant additions, document submissions, analyst reviews, approval decisions, alert deliveries, checklist acknowledgments. The audit trail captures who did what, when, and why.
>
> When stakeholders ask questions -- when a superintendent, a board member, an insurance provider, or a parent asks what safeguards were in place -- you have answers. Timestamped, attributed, and complete.

---

**BOTTOM CTA**

> Your travelers trust you to bring them home safely.
> Safetrekr makes sure that trust is backed by a system -- not just good intentions.

Primary CTA: `Schedule a Briefing`
Micro-copy: `20 minutes. No obligation.`

Secondary CTA: `Download the Platform Overview`
Micro-copy: `4-page overview. PDF.`

---

#### 4.4.3 Platform

**Route:** `/(marketing)/platform`
**Purpose:** Demonstrate breadth and depth of the platform for evaluators doing feature comparison.
**SEO Title:** `Safetrekr Platform -- Trip Safety Management Features`
**SEO Description:** `Four portals. 10-step trip wizard. Independent analyst review. Real-time intelligence. 46-endpoint protection system. Offline-first traveler app. See the full Safetrekr platform.`

---

**HERO**

H1:
> Built for the people who plan the trip -- and the people who go.

H2:
> Safetrekr operates through four integrated portals, each designed for a specific role in the trip safety lifecycle. Organization administrators plan. Independent analysts verify. HQ operations monitor. Travelers receive safety information on their devices.

---

**FOUR PORTAL OVERVIEW**

Sub-header:
> Four portals. One platform. Complete separation of duties.

Portal Card 1 -- Client Portal
> **For organization administrators.**
> Plan trips with the 10-step wizard. Manage rosters, collect documents, track background checks, and monitor real-time intelligence alerts. Your operational command center for every trip.

Portal Card 2 -- Analyst Portal
> **For independent safety analysts.**
> Review every trip across 18 safety dimensions. Triage intelligence alerts. Flag issues, assign checklists, and make approval decisions -- all documented with full audit trail.

Portal Card 3 -- HQ Console
> **For Safetrekr operations.**
> Manage organizations, analysts, policies, and platform configuration. Monitor system health, manage review queues, and oversee the analyst workforce.

Portal Card 4 -- Traveler App
> **For travelers, chaperones, and guardians.**
> Native mobile app with offline-first architecture. Receive live itineraries, safety checklists, intelligence alerts, and emergency preparedness information. Acknowledge alerts. Access emergency contacts. All on-device, even without connectivity.

*Screenshot placeholder for each portal*

---

**FEATURE GRID BY DOMAIN**

Sub-header:
> Platform capabilities -- verified and operational.

*Note: All features listed below are code-verified as Implemented per the product review. No scaffolded or planned features are included.*

**Domain 1: Planning and Analysis**

H3: `Structured trip planning from day trips to international travel.`

- 10-step trip creation wizard with tier-based complexity (T1 / T2 / T3)
- Traveler registry with intelligent matching, bulk CSV/Excel import, and automatic deduplication
- Flight lookup via AviationStack API with auto-populated airline and terminal data
- Day-by-day itinerary builder with auto-populated events from flights, lodging, and venues
- Ground transportation documentation between itinerary events
- Real-time add-on pricing calculated per participant count
- Client dashboard with KPI cards, activity feed, and sortable trip directory

**Domain 2: Intelligence and Risk**

H3: `Real-time threat monitoring with analyst triage.`

- TarvaRI intelligence engine with multi-source data aggregation
- Alert classification by severity (critical, high, medium, low) and category (weather, security, health, transport, political)
- Risk scoring with percentile confidence bands (P5, P50, P95)
- Analyst triage workflow: pending, approved, rejected, snoozed
- Delivery routing by urgency: urgent, AM digest, PM digest, scheduled
- Continuous feed with infinite scroll, severity color coding, and status indicators
- Traveler acknowledgment tracking with proof of receipt

**Domain 3: Protection System**

H3: `Active emergency preparedness, not a binder on a shelf.`

- 46-endpoint protection API covering rally points, safe houses, musters, and check-ins
- Rally point management with GPS coordinates, approval workflows, and automatic geofence creation
- Safe house management with type categorization and exit-alert geofencing
- Three-tier evacuation planning: shelter in place, local evacuation, relocation
- Medical facility directory with trauma capability levels and estimated travel times
- Emergency kit profile recommendations based on trip characteristics
- Automatic geofence synchronization when protection resources change

**Domain 4: Traveler Delivery**

H3: `Safety information on every traveler's device, with proof.`

- Native mobile app (iOS and Android) with offline-first SQLite architecture
- Geo-triggered checklist delivery activated by zone entry
- Time-relative checklist delivery (configurable days before departure)
- Background geofence monitoring with violation alerts for chaperones and guardians
- SMS emergency broadcast to all trip participants
- Alert acknowledgment with audit trail
- Role-based trip packet generation for offline reference

**Domain 5: Compliance and Audit**

H3: `Background checks, documents, certifications -- tracked automatically.`

- 5 background check types (criminal, sex offender, driving, employment, education)
- 3 integrated screening providers (Checkr, Sterling, GoodHire)
- Participant-by-check compliance matrix with six-status tracking
- 9 document requirement templates (4 consent types + 5 document types) with role-based targeting
- Configurable due dates with automated reminders (7, 3, 1 day before deadline)
- 12 predefined certification types with expiration monitoring (valid, expiring, expired)
- Full evidence and activity audit trail with three source types (client, analyst, system)

**Domain 6: Organization Management**

H3: `Team roles, branding, and platform configuration.`

- 10 system-level roles with ascending privilege and automatic portal routing
- Team invitation and role assignment (Org Admin, Billing Admin, Security Officer)
- Organization branding: logo, brand colors, trip packet watermarks, security hotline
- Trip defaults: chaperone ratios, floor policies, required data fields, packet templates
- Two-factor authentication and security device management
- GDPR-compliant privacy controls: contact visibility, analytics opt-in/out, data export, account deletion
- Consent history with timestamped audit trail

---

**BOTTOM CTA**

> See Safetrekr in action.

Primary CTA: `Schedule a Briefing`
Micro-copy: `20 minutes. We walk you through every portal.`

---

#### 4.4.4 Solutions

**Route:** `/(marketing)/solutions`
**Purpose:** Help the buyer self-identify by vertical. Establish that Safetrekr is built for their specific context.
**SEO Title:** `Safetrekr Solutions -- Trip Safety for Schools, Churches, Sports, Universities, Business`
**SEO Description:** `K-12 field trips. Church mission trips. Youth sports tournaments. Study abroad programs. Corporate travel. One platform built for every type of organizational travel.`

---

**HERO**

H1:
> Your travelers. Your responsibility. Your system.

H2:
> Schools, churches, sports teams, universities, and businesses each face unique trip safety challenges. Safetrekr is built to handle all of them -- with independent safety review, real-time intelligence, and documented accountability for every trip.

---

**CROSS-CUTTING VALUE PROP**

> Every organization on this page shares one thing: the people they send to travel depend on them to come home safely. Safetrekr gives every organization the same operational rigor -- a 10-step planning wizard, independent analyst review, real-time intelligence, and a complete audit trail -- adapted to the compliance requirements and travel patterns of each vertical.

---

**FIVE VERTICAL CARDS**

**Card 1: K-12 Schools**

H3: `Every field trip. Every student. Every safeguard documented.`

Pain points:
- Parental consent forms tracked in folders, not systems
- Background checks for chaperones managed manually
- No independent review of trip safety plans
- Regulatory compliance (FERPA, COPPA) adds complexity to data handling

Safetrekr solutions:
- Structured document collection with role-based targeting and automated reminders
- Background check compliance matrix showing every chaperone's screening status at a glance
- Independent analyst review of every trip before departure
- Audit trail that answers questions from parents, superintendents, and school boards

CTA: `Learn more about Safetrekr for K-12 ->` *(links to future /solutions/k12)*

---

**Card 2: Higher Education**

H3: `Study abroad. Exchange programs. Research expeditions. All verified.`

Pain points:
- International travel risk assessment across multiple countries and programs
- Institutional liability exposure for student safety abroad
- Compliance documentation spread across departments
- No centralized system for tracking student safety across all travel programs

Safetrekr solutions:
- International trip planning with visa/passport tracking and destination intelligence
- Independent analyst review with tiered assignment matched to trip complexity
- Real-time intelligence alerts for international destinations
- Institutional audit documentation for risk management and legal review

CTA: `Learn more about Safetrekr for Higher Education ->`

---

**Card 3: Churches and Faith-Based Organizations**

H3: `Mission trips deserve mission-grade safety planning.`

Pain points:
- Volunteer screening is manual and inconsistent
- International mission trips to complex security environments
- Emergency preparedness relies on contact lists, not connected systems
- No documentation trail if something goes wrong

Safetrekr solutions:
- 5 background check types across 3 integrated providers for volunteer screening
- International risk assessment with real-time intelligence from multiple sources
- Three-tier evacuation planning with rally points, safe houses, and medical facility directories
- Complete audit trail from volunteer screening through trip completion

CTA: `Learn more about Safetrekr for Churches ->`

---

**Card 4: Youth Sports**

H3: `Tournament travel is complex. Protecting your athletes is not optional.`

Pain points:
- Coach and volunteer screening requirements across multiple jurisdictions
- Medical consent and emergency contact collection for minor athletes
- Multi-team travel coordination for tournaments and competitions
- SafeSport compliance tracking

Safetrekr solutions:
- Background check compliance matrix covering every adult with supervisory responsibility
- Structured medical consent and document collection with automated reminders
- Certification tracking with expiration monitoring (SafeSport, CPR, First Aid)
- Real-time alerts and SMS emergency broadcast during travel

CTA: `Learn more about Safetrekr for Youth Sports ->`

---

**Card 5: Business**

H3: `Corporate duty of care -- documented, not assumed.`

Pain points:
- Duty of care obligations that are acknowledged but not systematically documented
- Employee travel risk varies by destination but is managed the same way
- No centralized proof of safety measures for legal or insurance review
- Annual contracts and per-seat licensing create cost overhead for variable travel volumes

Safetrekr solutions:
- Per-trip pricing with no annual contracts -- pay only when employees travel
- Tiered trip complexity matching safety requirements to travel risk level
- Independent analyst review provides separation of duties for compliance
- Downloadable audit trail for legal, insurance, and procurement review

CTA: `Learn more about Safetrekr for Business ->`

---

**OBJECTION HOOK (inline, below cards)**

> Already managing trip safety with spreadsheets and email?
>
> A spreadsheet tracks what you enter. It cannot track what you miss. It cannot verify that a background check is current. It cannot deliver a safety alert to a chaperone's phone at 2 AM. And when someone asks "Did we do everything we could?" -- a spreadsheet is not proof.

---

**BOTTOM CTA**

> One platform for every type of organizational travel.

Primary CTA: `Schedule a Briefing`
Micro-copy: `Tell us your vertical. We will tailor the conversation.`

---

#### 4.4.5 Pricing

**Route:** `/(marketing)/pricing`
**Purpose:** Eliminate pricing ambiguity. Reframe per-trip cost as an obvious investment. Address budget objections directly.
**SEO Title:** `Safetrekr Pricing -- Per-Trip Safety Management from $450`
**SEO Description:** `Per-trip pricing. No annual contracts. Day trips from $450. Domestic overnight from $750. International from $1,250. Every trip includes independent safety review, intelligence monitoring, and full audit trail.`

*FLAG: All pricing values are UNVALIDATED (Q-1). This copy uses working values from the product codebase. Business owner must confirm before the pricing page goes live.*

---

**HERO**

H1:
> Per-trip pricing. No annual contracts.

H2:
> Every trip includes independent safety review, real-time intelligence, traveler delivery, and full audit documentation. You pay for what you use.

---

**THREE TIER CARDS**

**Tier 1: Day Trip -- $450/trip** *[UNVALIDATED]*

> Local and day travel with structured safety management.

Included:
- 10-step trip planning wizard
- Independent safety analyst review
- Document and consent collection
- Background check tracking
- Emergency preparedness configuration
- Safety checklist delivery
- Full audit trail

---

**Tier 2: Domestic Overnight -- $750/trip** *[UNVALIDATED]*

> Multi-day domestic travel with extended monitoring.

Everything in Tier 1, plus:
- Lodging review with fire safety assessment
- Extended intelligence monitoring for travel dates
- Day-by-day itinerary management
- Transportation documentation between events
- Lodging geofence with automatic safe zone creation

---

**Tier 3: International -- $1,250/trip** *[UNVALIDATED]*

> International travel with full-spectrum safety intelligence.

Everything in Tier 2, plus:
- International destination intelligence (security, health, political, transport)
- Visa and passport documentation tracking
- Enhanced emergency planning with three-tier evacuation protocols
- Medical facility directory with trauma capability levels
- Senior analyst assignment matched to international trip complexity

---

**Enterprise Card**

> High-volume organizations and custom requirements.

Body:
> Volume pricing, dedicated analyst teams, custom integrations, and priority support. Contact our team to build a plan that fits your travel program.

CTA: `Contact Sales`

---

**ADD-ONS**

> Optional services, priced per unit.

- Background checks: $35 per check *(Checkr, Sterling, or GoodHire integration)*
- Travel insurance: $25 per participant

---

**VALUE REFRAME SECTION (critical for conversion)**

H2:
> Less than 1% of most trip budgets.

Body:
> The average school field trip costs $200-500 per student. A domestic overnight runs $500-1,500 per traveler. An international trip costs $2,000-5,000+ per participant.
>
> A 30-person domestic overnight trip with Safetrekr costs $25 per traveler. A 20-person international trip costs $62.50 per traveler.
>
> Compare that to the cost of one unmanaged incident: legal fees, insurance claims, regulatory fines, and institutional reputation damage.
>
> Safetrekr is not an expense line. It is the cost of documented accountability.

---

**FAQ SECTION (collapsible)**

**Q: Is there an annual fee?**
> No. You pay per trip. No minimum commitment. No seat licenses.

**Q: What if we only run 2-3 trips a year?**
> Safetrekr is built for organizations of every size. Per-trip pricing means you pay only when you travel. Organizations with infrequent travel often have the least established safety processes -- which means they have the most to gain.

**Q: Can we purchase credits in advance?**
> Yes. Credit packages are available for organizations that want volume pricing. Contact sales for details.

**Q: What payment methods do you accept?**
> Credit card, check, and wire transfer. Stripe-powered payment processing with receipt generation.

**Q: What exactly is included in each tier?**
> Every tier includes the full Safetrekr platform: 10-step trip wizard, independent analyst review, document collection, background check tracking, safety checklists, emergency preparedness, traveler delivery via mobile app, and complete audit trail. Higher tiers add capabilities matched to trip complexity -- lodging review, extended intelligence, international documentation tracking.

**Q: Is there a free trial?** *[FLAGGED -- Q-2 unresolved]*
> *Copy TBD pending business owner decision on free trial or freemium offer.*

**Q: What happens if I need to cancel a trip?**
> *Copy TBD pending business owner clarification on cancellation policy.*

---

**OBJECTION HOOK (inline)**

> "We cannot afford another line item."
>
> What does one unmanaged incident cost your organization? Legal consultation starts at $300/hour. A single liability claim can exceed six figures. Insurance premium increases after an incident are permanent. Safetrekr costs less per traveler than a meal at the hotel.

---

**BOTTOM CTA**

Primary CTA: `Schedule a Briefing`
Micro-copy: `We will walk you through a live pricing scenario for your organization.`

Secondary CTA: `Contact Sales for Volume Pricing`

---

#### 4.4.6 Security

**Route:** `/(marketing)/security`
**Purpose:** Provide a technical specification that can be forwarded to IT directors, legal counsel, and insurance providers. Zero marketing language.
**SEO Title:** `Safetrekr Security -- Data Architecture, Authentication, Privacy Compliance`
**SEO Description:** `Row Level Security. Two-factor authentication. 10 role-based access levels. Encryption at rest and in transit. GDPR-compliant data governance. See exactly how Safetrekr protects your data.`

**Tone note:** This page reads like a technical specification. No adjectives. No superlatives. Facts, architecture decisions, and compliance references. This is the page that gets forwarded to IT, legal, and insurance.

---

**HERO**

H1:
> Your travelers' data is as protected as they are.

H2:
> Safetrekr handles sensitive personal information -- student records, medical data, emergency contacts, minor children's safety records. Here is exactly how we protect it.

---

**SECTION 1: DATA ARCHITECTURE**

H2:
> Data architecture.

- **Database:** Supabase PostgreSQL with Row Level Security (RLS). Organization data isolation is enforced at the database layer, not the application layer. Your organization's data cannot be accessed by any other organization.
- **Encryption at rest:** PostgreSQL database encryption managed by Supabase.
- **Encryption in transit:** TLS for all API communication and data transfer.
- **Data isolation:** RLS policies enforce organization-scoped access on every table. Queries are filtered by organization context before results are returned.
- **Runtime configuration:** Environment variables injected at runtime, not build time. The same build artifact serves development, staging, and production environments.
- **Deployment:** Containerized Docker builds deployed to Kubernetes via CI/CD with separate development and production environments.

---

**SECTION 2: AUTHENTICATION AND ACCESS CONTROL**

H2:
> Authentication and access control.

- **Authentication method:** Email/password with JWT session tokens and automatic token refresh.
- **Two-factor authentication:** Supported for all user accounts.
- **Account activation:** Invite-based. No self-registration. Every account is initiated by an organization administrator or Safetrekr HQ.
- **Password reset:** Secure email-based password reset flow.
- **Role-based access:** 10 system-level roles with ascending privilege levels.

| Role | Portal | Access Level |
|------|--------|-------------|
| Traveler | Client | Trip participant access |
| Chaperone | Client | Supervisor access |
| Org Admin | Client | Full organization management |
| Billing Admin | Client | Financial management |
| Security Officer | Client | Safety and compliance |
| Analyst | Analyst | Independent safety review |
| HQ Admin | HQ | Platform administration |
| HQ Supervisor | HQ | Operations management |
| HQ Security | HQ | Platform security |
| HQ Ops | HQ | Day-to-day operations |

- **Portal routing:** Users are directed to the appropriate portal based on their assigned role upon login. Role determines feature access, data visibility, and administrative capabilities.

---

**SECTION 3: PRIVACY AND DATA GOVERNANCE**

H2:
> Privacy and data governance.

- **GDPR compliance features:** User-initiated data export, account deletion with 30-day grace period, consent history with full audit trail, analytics opt-in/out, marketing preference controls.
- **Contact visibility controls:** Users control whether their phone number and email address are visible to teammates.
- **Consent history:** Timestamped record of all consent actions (granted, revoked, updated) providing a transparent audit trail.
- **Data retention:** Account deletion is user-initiated with a 30-day grace period for recovery before permanent removal.

*[FLAGGED SECTION -- Certifications]*

> **Compliance certifications.**
>
> Safetrekr's security architecture is designed to meet institutional compliance requirements. The following certifications are under review:
>
> - SOC 2 Type II -- *Status: Under evaluation.* *[Q-3 -- requires business owner confirmation]*
> - FERPA -- *Status: Under evaluation.* *[Q-4 -- requires legal verification]*
> - COPPA -- *Status: Under evaluation.*
>
> Contact us for the current status of any compliance certification.

*Note to reviewers: This section MUST be updated before the security page goes live. Do not claim any certification that has not been verified. The architecture section above describes what we build. This section describes what we certify. Only verified certifications should appear without the "under evaluation" qualifier.*

---

**SECTION 4: MOBILE SECURITY (TRAVELER APP)**

H2:
> Traveler app security.

- **Offline-first architecture:** Local SQLite database (`safetrekr_offline.db`) stores trip data on-device for access without network connectivity.
- **Idempotency keys:** All queued requests include idempotency keys to prevent duplicate server-side effects during sync.
- **Geofence data processing:** Geofence boundary checks performed on-device. The app uses expo-location for native circle geofences and a JavaScript ray-casting algorithm for polygon geofences.
- **Background monitoring:** Geofence monitoring registered as an expo-task-manager background task with process isolation.
- **Permission-gated access:** Location and SMS capabilities require explicit user permission grants.
- **iOS optimization:** Priority-based region selection respects the iOS 20-region hardware limit.

---

**SECTION 5: OPERATIONAL SECURITY**

H2:
> Operational security.

- **Independent analyst model:** Safety review is performed by dedicated analysts who are separate from the trip planning team. Separation of duties is enforced by the platform architecture (separate portal, separate role, separate access scope).
- **Audit trail:** All review actions, status changes, and administrative operations are logged with timestamps, user attribution, and contextual metadata.
- **Evidence management:** Activity entries sourced from three origins (client actions, analyst actions, system events) with search, filtering, and aggregate statistics.
- **Issue tracking:** Analysts can flag, categorize, and track resolution of safety issues within the review workflow.

---

**BOTTOM CTA**

Primary CTA: `Download the Security Overview`
Micro-copy: `PDF. Designed for IT, legal, and insurance review.`

Secondary CTA: `Schedule a Technical Review`
Micro-copy: `30-minute technical deep-dive with our engineering team.`

---

#### 4.4.7 Contact

**Route:** `/(marketing)/contact`
**Purpose:** Capture briefing requests with minimal friction. Reassure the buyer that scheduling is low-commitment and high-value.
**SEO Title:** `Contact Safetrekr -- Schedule a Safety Briefing`
**SEO Description:** `Schedule a 20-minute briefing with a Safetrekr safety analyst. See the platform in action with real trip data. No obligation. We respond within one business day.`

---

**HERO**

H1:
> Schedule a briefing.

H2:
> 20 minutes. A live platform walkthrough with real trip data. We show you the analyst review workflow, the traveler app, and the audit trail. No obligation.

---

**FORM FIELDS**

| Field | Label | Type | Required |
|-------|-------|------|----------|
| name | Your name | Text input | Yes |
| email | Work email | Email input (validated) | Yes |
| phone | Phone number | Phone input | No |
| organization | Organization | Text input | Yes |
| organization_type | Organization type | Select: K-12 School, Higher Education, Church / Faith-Based, Youth Sports, Business, Other | Yes |
| trips_per_year | How many trips does your organization run per year? | Select: 1-5, 6-15, 16-50, 50+ | No |
| message | Anything specific you want to see? | Textarea | No |
| source_page | *(hidden)* | Hidden input -- captures referring page | Auto |

CTA button text: `Schedule a Briefing`

---

**"WHAT TO EXPECT" SIDE PANEL**

H3: `What happens next.`

1. **We respond within one business day** with a calendar link for your briefing.
2. **Your briefing is 20 minutes.** We walk you through a live platform tour with real trip data -- the wizard, the analyst review, the traveler app, and the audit trail.
3. **No obligation.** No credit card. No contract. If Safetrekr is right for your organization, we will set up a pilot trip so your team can experience the full lifecycle.

---

**REASSURANCE MICRO-COPY (near form)**

- "No credit card required."
- "Your information is never shared."
- "We respond within one business day."

---

**SUCCESS STATE (replaces form after submission)**

> Briefing request received.
>
> Your assigned analyst will be in touch within one business day with a calendar link and preparation details.
>
> While you wait:
> - [See how Safetrekr works ->](/how-it-works)
> - [Review our security architecture ->](/security)

---

**ERROR STATE**

> We could not submit your request. Please check the highlighted fields and try again. If the issue persists, email us directly at team@safetrekr.com.

---

**BELOW-FORM FALLBACK**

> Prefer email? Reach us at **team@safetrekr.com**. Include your organization name and we will get back to you within one business day.

---

### 4.5 Objection Handling Copy Bank

Eight pre-crafted objection rebuttals, each mapped to specific page locations.

| # | Objection | Buyer's Thought | Reframe | Page Placement |
|---|-----------|----------------|---------|----------------|
| O-1 | "We already handle this with spreadsheets." | "We have been doing fine." | "A spreadsheet tracks what you enter. It cannot track what you miss. It cannot verify that a background check is current. It cannot deliver a safety alert at 2 AM. And when someone asks 'Did we do everything we could?' -- a spreadsheet is not proof." | How It Works (opening), Solutions (below cards), Pricing FAQ |
| O-2 | "This looks expensive." | "Our budget is stretched." | "$450 per day trip. Less than $25/traveler on a 30-person domestic trip. Less than 1% of most trip budgets. Compare that to one incident: legal fees start at $300/hour, liability claims exceed six figures, and insurance premiums increase permanently." | Pricing (value reframe), Solutions (inline), How It Works (closing) |
| O-3 | "My team will not adopt it." | "We tried software before." | "The 10-step wizard asks questions your team already knows: destination, dates, participants, lodging. Your trip organizers fill in what they know. Independent analysts verify the rest. Travelers download one app. No training manual required." | How It Works (Phase 1), Solutions, Pricing FAQ |
| O-4 | "We do not travel enough." | "3-4 trips a year is not enough." | "Per-trip pricing, not per-year. No annual contracts. No seat licenses. Organizations that travel infrequently often have the least established processes -- and the most to gain from structure." | Pricing (FAQ), Solutions (small org messaging) |
| O-5 | "How do I know the intelligence alerts are reliable?" | "I do not want false alarms." | "Alerts pass through multi-source aggregation, risk scoring with confidence bands, and analyst triage before they reach your team. You receive only what is relevant, scored by confidence, delivered on your schedule: urgent, digest, or scheduled." | How It Works (Phase 3), Platform (Intelligence domain) |
| O-6 | "What about student data privacy?" | "Any vendor touching student data goes through review." | "Data isolation at the database layer with Row Level Security. Two-factor authentication. GDPR-compliant governance. Consent audit trail. We built Safetrekr knowing it would handle children's safety records." | Security (primary), Solutions K-12 card, Solutions Youth Sports card |
| O-7 | "Our board/insurance needs to approve this." | "This needs procurement and legal review." | "Safetrekr generates the documentation procurement, legal, and insurance need: complete audit trails, independent review demonstrating separation of duties, and a security architecture designed for institutional review." | Security, Pricing (procurement FAQ), How It Works (Phase 2) |
| O-8 | "Can we try it first?" | "I need to see it before committing." | "Schedule a briefing. We walk you through a live platform tour with real trip data and can set up a pilot trip so your team experiences the full lifecycle before committing." | Every CTA touchpoint, Contact page |

---

### 4.6 SEO Keyword Targets

| Page | Primary Keywords | Secondary Keywords | Intent |
|------|-----------------|-------------------|--------|
| Landing | trip safety management, group travel safety platform | organizational travel safety, trip safety software | Awareness |
| How It Works | trip safety review process, independent safety review | trip planning wizard, safety analyst review, trip audit trail | Consideration |
| Platform | trip safety management features, travel safety platform features | traveler app, protection system, safety checklist delivery | Evaluation |
| Solutions | school trip safety, church mission trip safety, youth sports travel safety | K-12 field trip compliance, study abroad risk management, corporate duty of care | Vertical awareness |
| Pricing | trip safety management pricing, per-trip safety pricing | group travel safety cost, trip safety management cost comparison | Purchase intent |
| Security | trip safety data security, student data protection, travel platform security | row level security, GDPR travel platform, education data privacy | Trust verification |
| Contact | schedule safety briefing, trip safety demo | group travel safety consultation | Conversion |

**Keyword Placement Rules:**

- Primary keyword in URL slug, H1, meta title, meta description, and first 100 words of body copy.
- Secondary keywords in H2 headers and body copy where natural.
- No keyword stuffing. The Calm Authority voice takes precedence over SEO density targets.

---

### 4.7 Social Proof Placeholder Strategy

Until pilot customer testimonials are available (Q-7), use the following hierarchy:

**Tier 1: Capability Proof (use immediately)**

Three "capability cards" replace testimonials on the landing page:
- "18 review dimensions per trip" with supporting sentence
- "46 protection endpoints" with supporting sentence
- "4 integrated portals" with supporting sentence

These are factual, verifiable, and do not require customer participation.

**Tier 2: Integration Partner Logos (use immediately)**

Display logos of integration partners in a footer-level strip:
- Stripe (payment processing)
- Checkr (background checks)
- Sterling (background checks)
- GoodHire (background checks)
- AviationStack (flight data)
- MapLibre (mapping)

Label: "Integrated with" (not "Trusted by" -- these are technology partners, not customers).

**Tier 3: Architecture Credibility (use on Security page)**

Compliance-adjacent badges and architecture callouts:
- "Row Level Security" (database-layer data isolation)
- "Two-Factor Authentication"
- "Encrypted at Rest and In Transit"
- "GDPR-Compliant Data Governance"

These are architectural facts, not certification claims.

**Tier 4: Testimonial Placeholder Structure**

Reserve space on the landing page and solutions page for testimonials. Use the structure:

```
"[Quote about documented accountability]"
-- [Name], [Title], [Organization Type]
```

When the first testimonial is available, prioritize placement:
1. Landing page social proof section
2. Solutions page (matched to vertical)
3. Pricing page (value validation)

**Activation Trigger:** When Q-7 resolves (pilot customer outreach produces at least one named quote), replace capability proof cards with real testimonials. Maintain capability proof cards on How It Works and Platform pages regardless.

---

### 4.8 Copy Approval Workflow Recommendation

**Stage 1: Draft Review (Internal)**

- Copy author (this workstream) produces per-page copy specifications
- Product owner reviews for factual accuracy against the verified product review
- Any claim referencing a product capability must be traceable to an "Implemented" feature in `product-review-safetrekr-app-v2-verified.md`

**Stage 2: Voice and Tone Check**

- Review every headline against the Voice and Tone Guide (Section 4.1)
- Verify vocabulary compliance: no banned words, operational vocabulary present
- Confirm "Peace of Mind" rule: used only as emotional close, never as opener or headline

**Stage 3: Stakeholder Sign-Off**

- Business owner approves pricing copy (blocked until Q-1 resolves)
- Business owner or legal approves security/compliance claims (blocked until Q-3 and Q-4 resolve)
- Business owner approves trial/freemium language if applicable (blocked until Q-2 resolves)

**Stage 4: Implementation Hand-Off**

- Approved copy is delivered as markdown files, one per page
- Each file includes: H1, H2s, body blocks, feature bullets, CTA text, micro-copy, objection hooks, and section ordering
- The implementing developer (WS-B.2 through WS-B.7) uses copy verbatim -- no ad-hoc editing during implementation
- Any implementation-driven copy changes (e.g., text too long for card layout) are routed back through this workstream for revision

---

## 5. Acceptance Criteria

| # | Criterion | Verification Method |
|---|-----------|-------------------|
| AC-1 | Every headline (H1, H2) across all 7 pages uses only approved vocabulary from the Voice and Tone Guide. No banned words appear. | Manual review against vocabulary lists |
| AC-2 | Every product capability referenced in copy is verified as "Implemented" in `product-review-safetrekr-app-v2-verified.md`. No scaffolded or planned features are described. | Line-by-line cross-reference against product review |
| AC-3 | Every quantitative claim (18 review dimensions, 46 endpoints, 10 roles, etc.) matches the exact number in the verified product review. | Numerical cross-reference |
| AC-4 | "Peace of mind" or equivalent emotional language appears ONLY in page-closing sections, never as H1, H2, or opening paragraph. | Positional audit |
| AC-5 | Independent analyst review is referenced or connected to on every page. | Per-page mention check |
| AC-6 | Each page includes at least one primary CTA ("Schedule a Briefing") with micro-copy stating time commitment and no-obligation framing. | Per-page CTA audit |
| AC-7 | Pricing copy is clearly flagged as UNVALIDATED where business owner confirmation is pending (Q-1). | Visual flag check |
| AC-8 | Security page separates "Security Architecture" (verifiable) from "Compliance Certifications" (requires verification). No unverified certifications are claimed. | Section structure review |
| AC-9 | All 8 objection handling rebuttals are placed on their designated pages per the Objection Handling Copy Bank mapping. | Cross-reference against Section 4.5 |
| AC-10 | SEO primary keyword appears in H1, meta title, and first 100 words of body copy on every page. | Per-page keyword presence check |
| AC-11 | Copy is structured for the Oblivion HUD glass-morphism card layout: scannable sections, short paragraphs, bulleted feature lists, clear section headers. | Layout compatibility review |
| AC-12 | Contact page form field labels use conversational-but-professional language per the CTA copy guide. | Label text review |

---

## 6. Decisions Made

| # | Decision | Rationale | Source |
|---|----------|-----------|--------|
| D-1 | Brand voice is "Calm Authority" -- operational, precise, confident, empathetic but not casual | Consensus across 10 specialist reviews. Target audience (40-60, risk-averse, process-oriented) responds to operational competence, not marketing energy. | holistic-overview.md Section 2.9, product-narrative-strategist.md Section 1 |
| D-2 | Primary CTA text is "Schedule a Briefing" (not "Request Demo") | Matches operational vocabulary. Signals value delivery. Lower perceived commitment. Differentiated from generic SaaS. | holistic-overview.md Section 4.2, product-narrative-strategist.md Section 7 |
| D-3 | Core conversion message is "When someone asks 'Did you do everything you could?' -- Safetrekr is the documented answer." | The buyer's deepest anxiety is not incident occurrence but inability to prove due diligence. This message converts anxiety into action. | holistic-overview.md Section 2.10, product-narrative-strategist.md Section 4 |
| D-4 | Independent analyst review is THE differentiator and must be referenced on every page | No competitor offers independent safety review with separation of duties. This is the unique mechanism. Consensus from all 10 reviews. | holistic-overview.md Section 3.1 |
| D-5 | Only code-verified "Implemented" features appear in marketing copy | 21 HQ Console modules are scaffolded (route exists, no functionality). Marketing scaffolded features creates liability risk. | combined-recommendations.md R-03, product-review-safetrekr-app-v2-verified.md |
| D-6 | Security page separates "what we build" from "what we certify" | SOC 2 and FERPA status unverified. Claiming unverified certifications is worse than silence. Architecture facts are provable; certification claims require documentation. | combined-recommendations.md Gap 10 |
| D-7 | "Peace of mind" is the emotional close only, never the opener | Security professionals want operational control, not emotional comfort. Emotional close at page bottom works after rational case is made. | holistic-overview.md Section 4.6, product-narrative-strategist.md Section 2 |
| D-8 | Per-trip pricing is displayed transparently (not behind "Contact Sales") | Transparent pricing builds trust with procurement-oriented buyers. Per-trip model is unusual and must be contextualized, not hidden. | holistic-overview.md Section 2.3 |
| D-9 | Social proof uses "capability proof" cards until testimonials are available | No testimonials exist (Q-7). Low platform metrics hurt more than no numbers. Capability proof (18 dimensions, 46 endpoints, 4 portals) is factual and impressive. | product-narrative-strategist.md Section 6 |
| D-10 | Copy is written for dark glass-morphism cards, not traditional white-page layouts | Oblivion HUD aesthetic is non-negotiable. Copy must be structured for scannable glass-panel sections: short paragraphs, bullet lists, clear headers. | holistic-overview.md Section 1 |

---

## 7. Open Questions

| # | Question | Impact on Copy | Needed By | Status |
|---|----------|---------------|-----------|--------|
| Q-1 | Are per-trip prices confirmed? T1: $450, T2: $750, T3: $1,250? | Pricing page cannot be finalized. All pricing references flagged as UNVALIDATED. | Before WS-B.5 implementation | Open |
| Q-2 | Is there a free trial or freemium offer? | Pricing FAQ has a placeholder answer. Landing page and contact page CTAs may change if trial is offered. | Before WS-B.5 implementation | Open |
| Q-3 | What is the SOC 2 certification status? | Security page compliance section uses "under evaluation" qualifier. Cannot claim certification until verified. | Before WS-B.6 implementation | Open |
| Q-4 | Is FERPA compliance verified by legal? | Same as Q-3. Affects security page and K-12 solutions card messaging. | Before WS-B.6 implementation | Open |
| Q-7 | Are pilot customers available for testimonials? | Social proof placeholder strategy is in place. Real testimonials transform conversion but are not blocking. | Before Phase D (WS-D.2) | Open |
| Q-14 | What is the cancellation/refund policy for trips? | Pricing FAQ has a placeholder for this question. | Before WS-B.5 implementation | New |
| Q-15 | Is "background checks: $35/check" and "travel insurance: $25/participant" confirmed pricing? | Add-on pricing appears on pricing page. Flagged as unvalidated alongside tier pricing. | Before WS-B.5 implementation | New |
| Q-16 | What email address should appear on the Contact page as fallback? team@safetrekr.com? | Contact page includes email fallback. Need confirmed address. | Before WS-B.7 implementation | New |

---

## 8. Risk Register

| # | Risk | Likelihood | Impact | Severity | Mitigation |
|---|------|-----------|--------|----------|------------|
| R-01 | No marketing copy exists -- content is the critical path blocker | HIGH | HIGH | **Critical** | This workstream resolves R-01 directly. Copy deck produced here unblocks all WS-B.2 through WS-B.7 implementations. |
| R-03 | Scaffolded features marketed as real capabilities | MEDIUM | HIGH | **High** | Acceptance Criterion AC-2 requires line-by-line verification against product review. Every capability claim must trace to an "Implemented" feature. |
| R-05 | Compliance certifications claimed without verification | MEDIUM | HIGH | **High** | Security page uses "Security Architecture" vs. "Compliance Certifications" structure. Unverified certs marked "under evaluation." Blocked until Q-3 and Q-4 resolve. |
| R-07 | Pricing published without business owner confirmation | MEDIUM | MEDIUM | **Medium** | All pricing values flagged as UNVALIDATED in copy. Pricing page implementation (WS-B.5) blocked until business owner confirms. |
| R-15 | Copy tone drifts during implementation | LOW | MEDIUM | **Medium** | Voice and Tone Guide (Section 4.1) codified as reference. Copy Approval Workflow (Section 4.8) requires implementation to use copy verbatim. Any changes routed back to this workstream. |
| R-16 | Copy length incompatible with glass-morphism card layouts | MEDIUM | LOW | **Low** | Copy structured for scannable cards: short paragraphs, bullet lists, clear headers. Implementation feedback loop in Copy Approval Workflow Stage 4 handles length issues. |
| R-17 | Objection handling copy perceived as defensive | LOW | MEDIUM | **Medium** | Objection hooks use reframe-and-proof pattern (not defensive denial). Each hook leads with an alternative framing, then provides a specific proof point. Tone is confident, not combative. |

---

## Appendix A: Page Copy Delivery Checklist

For each of the 7 P0 pages, the following elements must be delivered before implementation begins:

- [ ] H1 headline (approved, vocabulary-compliant)
- [ ] H2 subheadline
- [ ] Section headers (H2/H3 for all content sections)
- [ ] Body copy blocks (all paragraphs, complete text)
- [ ] Feature bullet lists (complete, verified against product review)
- [ ] CTA text (primary and secondary)
- [ ] CTA micro-copy (time commitment, no-obligation framing)
- [ ] Objection hooks (placed per Objection Handling Copy Bank)
- [ ] SEO meta title
- [ ] SEO meta description
- [ ] Flagged items (unvalidated pricing, unverified certifications)
- [ ] Emotional close (if applicable -- bottom of page)

---

## Appendix B: Verified Product Capabilities Referenced in Copy

This appendix maps every product capability claim in the copy deck to its verification status in `product-review-safetrekr-app-v2-verified.md`.

| Claim | Section in Product Review | Status |
|-------|--------------------------|--------|
| 10-step trip creation wizard | Section 1 | Implemented |
| T1/T2/T3 tiered pricing | Section 12 | Implemented |
| Flight lookup via AviationStack API | Section 1 | Implemented |
| Fire safety flagging above 6th floor | Section 1 | Implemented |
| CSV/Excel import with intelligent matching | Section 2 | Implemented |
| Automatic deduplication | Section 2 | Implemented |
| 5 background check types | Section 3 | Implemented |
| 3 screening providers (Checkr, Sterling, GoodHire) | Section 3 | Implemented |
| Participant-by-check compliance matrix | Section 3 | Implemented |
| 9 document requirement templates | Section 4 | Implemented |
| Configurable reminders (7, 3, 1 day) | Section 4 | Implemented |
| 8 checklist categories | Section 5 | Implemented |
| Time-relative and geo-arrival triggers | Section 5 | Implemented |
| Acknowledgment tracking | Section 5 | Implemented |
| 46-endpoint protection API | Section 6 | Implemented |
| Rally points with automatic geofence creation | Section 6 | Implemented |
| Safe houses with exit-alert geofencing | Section 6 | Implemented |
| Three-tier evacuation planning | Section 6 | Implemented |
| Medical facility directory with trauma levels | Section 6 | Implemented |
| Emergency kit profiles | Section 6 | Implemented |
| TarvaRI intelligence engine (data-layer integration) | Section 7 | Implemented |
| Risk scoring with P5/P50/P95 bands | Section 7 | Implemented |
| Alert classification (severity + category) | Section 7 | Implemented |
| Analyst triage workflow | Section 7 | Implemented |
| 18 analyst review dimensions | Section 8 | Implemented |
| Tiered analyst assignment (T1/T2/T3) | Section 8 | Implemented |
| Approval with reason codes | Section 8 | Implemented |
| Evidence and activity tracking (3 source types) | Section 8 | Implemented |
| Native mobile app (Expo SDK 54) | Section 9 | Implemented |
| Offline-first SQLite architecture | Section 9a | Implemented |
| Background geofence monitoring | Section 9a | Implemented |
| SMS emergency broadcast | Section 9b | Implemented |
| 12 predefined certification types | Section 10 | Implemented |
| Expiration monitoring | Section 10 | Implemented |
| 9 insurance coverage types | Section 11 | Implemented |
| Stripe payment processing | Section 12 | Implemented |
| Credit system for volume pricing | Section 12 | Implemented |
| 10 system-level roles | Section 15 | Implemented |
| JWT auth with 2FA | Section 15 | Implemented |
| RLS data isolation | Section 16 | Implemented |
| 4 portal architecture | Section 16 | Implemented |
| Role-based trip packets | Section 9 | Implemented |

**Features explicitly excluded from copy (Scaffolded/Planned):**

| Feature | Status | Why Excluded |
|---------|--------|-------------|
| Communications Log (cross-channel delivery tracking) | Not implemented | No code exists in any codebase |
| HQ Audit module | Scaffolded | Route exists, no functional code |
| HQ Incidents module | Scaffolded | Route exists, no functional code |
| HQ Integrations module | Scaffolded | Route exists, no functional code |
| HQ Security module | Scaffolded | Route exists, no functional code |
| HQ Intel Sources/Config/Metrics/Policies/Triage | Scaffolded | Routes exist, no functional code |
| Automated cert/insurance expiration notifications | Planned | UI computation exists, delivery pipeline not built |
| Multi-language interface | UI implemented | English only; localization planned |
| GDPR data export (backend pipeline) | Partially implemented | UI exists, backend pipeline in progress |

---

*End of WS-B.1: Content Strategy + Copy Drafting*
