# Safetrekr Marketing Site -- Product Owner Review

**Author:** Software Product Owner (AI Agent)
**Date:** 2026-03-02
**Status:** Initial Review
**Scope:** Marketing site strategy, information architecture, feature prioritization, and launch criteria

---

## Executive Summary

Safetrekr has a genuinely differentiated product in the trip safety management space. The verified capabilities document reveals a platform with serious depth -- independent analyst review with separation of duties, a 46-endpoint protection API, geofence-aware checklist delivery, real-time intelligence scoring, and an offline-first mobile app. These are not features that exist elsewhere in a single integrated platform.

The marketing site's job is to translate this depth into buyer confidence, fast. The target audience -- security directors, safety officers, risk managers, and administrators -- are risk-averse, process-oriented, accountability-focused professionals. They do not buy because a product looks impressive. They buy because they believe it will protect their organization from liability, their travelers from harm, and their reputation from damage.

This review covers personas, feature prioritization for marketing, information architecture, content hierarchy, a prioritized backlog, and acceptance criteria for launch.

---

## 1. User Stories and Personas

### Persona 1: The Safety Director (Decision Maker)

**Role:** Director of Safety, Risk Manager, Chief Safety Officer
**Organization:** K-12 school district, university, large church, corporate travel department
**Demographics:** 35-55 years old, 10+ years in safety/risk management, reports to superintendent or VP of Operations

**Jobs-to-Be-Done:**
- Demonstrate due diligence and defensible process to board/leadership
- Reduce organizational liability exposure for group travel
- Ensure compliance with regulations, policies, and insurance requirements
- Replace fragmented, paper-based safety processes with an auditable system
- Justify the investment to leadership with clear ROI

**What They Search For:**
- "trip safety management software"
- "student travel risk management"
- "group travel safety platform"
- "duty of care travel compliance"

**What They Need From the Marketing Site:**
- Evidence that Safetrekr provides a SYSTEM, not just a tool
- Independent safety review as proof of professional-grade rigor
- Compliance and audit trail capabilities front and center
- Security posture and data protection practices
- Pricing transparency so they can build a budget case
- Case studies or social proof from similar organizations
- A clear path to talk to someone (demo request)

**Key User Story:**
> "As a safety director, I need to evaluate whether Safetrekr provides a defensible, auditable safety management system so that I can recommend it to my superintendent with confidence that it reduces our liability exposure."

**Buying Behavior:** Researches independently before involving procurement. Will share the security page with IT. Will share the pricing page with finance. Needs ammunition for an internal business case.

---

### Persona 2: The Trip Organizer (Daily User)

**Role:** Trip Coordinator, Activities Director, Youth Pastor, Athletic Director, Office Manager
**Organization:** Individual school, church, youth sports league, small business
**Demographics:** 28-50 years old, wears many hats, not a safety specialist, manages trips as one of many responsibilities

**Jobs-to-Be-Done:**
- Plan and execute safe trips without becoming a safety expert
- Collect documents, consents, and background checks without chasing people
- Have a clear process to follow so nothing falls through the cracks
- Get trips approved by leadership/safety teams without back-and-forth
- Communicate with parents/guardians/travelers efficiently

**What They Search For:**
- "field trip planning software"
- "church mission trip management"
- "youth travel permission slips online"
- "sports team travel coordination"

**What They Need From the Marketing Site:**
- "How it works" explained simply and visually
- The 10-step wizard as evidence that the platform guides them
- Document and consent collection features highlighted
- Mobile app for travelers and parents
- That it handles the complexity so they do not have to

**Key User Story:**
> "As a trip organizer, I need to understand whether Safetrekr will simplify my trip planning workflow so that I can stop juggling spreadsheets, email chains, and paper forms."

**Buying Behavior:** May be the one who discovers Safetrekr and champions it upward. Needs to be able to explain the value to their supervisor quickly. Price-sensitive because they often lack dedicated budget.

---

### Persona 3: The IT/Security Evaluator (Technical Gatekeeper)

**Role:** IT Director, Information Security Officer, CISO, Technology Coordinator
**Organization:** School district, university, corporate IT department
**Demographics:** 30-50 years old, security-focused, evaluates vendors for compliance

**Jobs-to-Be-Done:**
- Evaluate the platform's security posture before it touches organizational data
- Verify data handling practices comply with internal policies (FERPA, COPPA for schools; internal security standards for business)
- Understand the architecture, integrations, and data flow
- Complete a security questionnaire or vendor assessment
- Ensure SSO/identity integration is possible or planned

**What They Search For:**
- "Safetrekr security" (will type this directly)
- "SOC 2 compliance trip management"
- "FERPA compliant travel platform"

**What They Need From the Marketing Site:**
- A dedicated Security page (non-negotiable)
- Data handling, encryption, hosting details
- Row Level Security and tenant isolation explained
- Compliance certifications or roadmap
- Authentication model (JWT, 2FA, invite-based activation)
- A contact path for security-specific questions
- Ideally a downloadable security whitepaper or trust center

**Key User Story:**
> "As an IT director, I need to verify Safetrekr's security posture and data handling practices so that I can approve it for use with our student/employee data."

**Buying Behavior:** Has veto power. Will not approve without a security page. May request a security questionnaire response. Their approval is a prerequisite, not a purchase trigger.

---

### Persona 4: The Concerned Parent/Guardian (Trust Builder)

**Role:** Parent, Legal Guardian
**Organization:** N/A (their child's school, church, or sports team uses Safetrekr)
**Demographics:** 25-55 years old, non-technical, wants to know their child is safe

**Jobs-to-Be-Done:**
- Understand what safety measures are in place for their child's trip
- Feel confident that the organization has done its due diligence
- Know how to access trip information and emergency contacts
- Understand how their personal and child's data is handled

**What They Need From the Marketing Site:**
- A clear explanation of the Traveler App and what parents receive
- Emergency preparedness capabilities (rally points, evacuation plans, SMS broadcast)
- Intelligence alerts and real-time monitoring as reassurance
- Privacy practices (especially for minors' data)

**Key User Story:**
> "As a parent, I need to understand how Safetrekr protects my child during a school trip so that I can feel confident signing the consent forms."

**Buying Behavior:** Does not buy. But their trust in the platform reinforces the organization's decision to use it. A "For Parents" section or clear Traveler App information serves the trip organizer's need to communicate "we use professional safety tools."

ASSUMPTION: Parents are a secondary audience for the marketing site. The primary conversion path serves Personas 1-3. However, trip organizers (Persona 2) will share the site with parents, so parent-facing content has indirect conversion value.
Validation plan: Interview 3-5 trip organizers about whether parents ask about safety tools during trip planning.

---

## 2. Feature Prioritization for Marketing

The product has 16 major capability areas. Not all are equally compelling for the marketing site. Below is a prioritized ranking based on what resonates with safety professionals and what differentiates Safetrekr from alternatives (spreadsheets, generic travel tools, and competitors).

### Tier 1: Lead With These (Hero-Level Differentiators)

These features should be prominently featured on the homepage and "How It Works" page. They are the reason a safety professional chooses Safetrekr over the status quo.

| # | Feature | Why It Leads | Product Doc Section |
|---|---------|-------------|---------------------|
| 1 | **Independent Safety Review and Approval** | No competitor offers built-in separation of duties with dedicated safety analysts. This is the single most defensible differentiator. It transforms Safetrekr from "a tool" into "a safety management system." Enterprise buyers understand and value independent review. | Section 8 |
| 2 | **Emergency Preparedness and Protection System** | Rally points, safe houses, evacuation plans, medical facility directories, emergency kit profiles, and AI-powered suggestions -- all with automatic geofence synchronization. This is the "if something goes wrong" story, and safety professionals live in that world. The 46-endpoint protection API signals engineering depth. | Section 6 |
| 3 | **Real-Time Intelligence and Alerts** | Risk-scored intelligence alerts from the TarvaRI engine, classified by severity and category, with acknowledgment tracking. This moves safety from reactive to proactive. The alert triage workflow (pending/approved/rejected/snoozed with delivery buckets) shows operational maturity. | Section 7 |
| 4 | **Traveler App with Geofence Monitoring** | Know where your people are. Geo-triggered safety checklists. SMS emergency broadcast. Offline-first with automatic sync. This is the feature that makes parents, guardians, and safety directors exhale. | Section 9, 9a, 9b |

### Tier 2: Showcase These (Core Value Props)

These features build confidence and demonstrate platform completeness. They should have dedicated sections on the "How It Works" page and feature prominently in vertical-specific solutions pages.

| # | Feature | Why It Matters | Product Doc Section |
|---|---------|---------------|---------------------|
| 5 | **Comprehensive Trip Planning (10-Step Wizard)** | Shows that Safetrekr guides users through a structured process, catching details that spreadsheets miss. The guided wizard reduces the "this looks complicated" objection. Auto-flight lookup via AviationStack is a nice touch. | Section 1 |
| 6 | **Document and Consent Collection** | Replaces paper permission slips, emailed waivers, and manual tracking. Nine templates out of the box. Role-based targeting. Automated reminders at 7, 3, and 1 day before deadline. This is a daily pain point for trip organizers. | Section 4 |
| 7 | **Background Checks and Screening** | Integrated with Checkr, Sterling, and GoodHire. Compliance matrix with visual status. This is table stakes for any organization with minors, but having it integrated (not separate) is the value. | Section 3 |
| 8 | **Safety Guidance and Checklist Delivery** | Eight categories, smart delivery triggers (time-relative AND geo-arrival), acknowledgment tracking. The smart triggers are technically impressive and operationally valuable. | Section 5 |
| 9 | **Certification and Training Tracking** | 12 predefined types (CPR, First Aid, SafeSport, etc.), expiration monitoring, warning banners. Ensures compliance gaps are visible before trip approval. | Section 10 |

### Tier 3: Include but Do Not Lead (Supporting Features)

These features are important for a complete picture but should not be in the hero section. They belong on detailed feature pages, FAQ, or vertical-specific content.

| # | Feature | Where to Surface | Product Doc Section |
|---|---------|-----------------|---------------------|
| 10 | Traveler and Roster Management | How It Works - Trip Planning section | Section 2 |
| 11 | Trip Packet Generation | How It Works - Delivery section | Section 9 |
| 12 | Insurance Policy Management | Features page, vertical pages | Section 11 |
| 13 | Billing and Payments | Pricing page | Section 12 |
| 14 | Team and Organization Management | Security page (RBAC section) | Section 13 |
| 15 | HQ Console (Operational Command Center) | About page (shows operational depth) | Section 14 |
| 16 | Platform-Wide Capabilities (RBAC, audit trail, real-time subscriptions) | Security page, architecture section | Section 15, 16 |

### The Messaging Hierarchy

When a safety director visits the site, the story should unfold in this order:

1. **"Safetrekr is the system of record for group travel safety."** (What it is)
2. **"Every trip is independently reviewed by a certified safety analyst."** (Why it is different)
3. **"Real-time intelligence, geofence monitoring, and emergency preparedness -- before, during, and after every trip."** (What it does)
4. **"Replace spreadsheets, email chains, and paper checklists with one auditable platform."** (What it replaces)
5. **"Used by schools, churches, youth sports organizations, and businesses."** (Who it is for)
6. **"Request a demo."** (What to do next)

---

## 3. Information Architecture

### Proposed Site Map

```
/                               Landing page (Gateway -- cinematic entry)
/launch                         Marketing hub (repurposed spatial ZUI)
/launch/how-it-works            Platform overview & trip lifecycle
/launch/solutions               Solutions hub (vertical selector)
/launch/solutions/k12           K-12 Schools
/launch/solutions/higher-ed     Colleges & Universities
/launch/solutions/faith         Churches & Faith-Based Organizations
/launch/solutions/youth-sports  Youth Sports Organizations
/launch/solutions/business      Corporate & Business Travel
/launch/pricing                 Pricing & tiers
/launch/security                Security, compliance, data practices
/launch/about                   Company, mission, analyst network
/launch/contact                 Contact form & demo request
/launch/legal/terms             Terms of Service
/launch/legal/privacy           Privacy Policy
```

### Rationale for Key Decisions

**Decision 1: Keep /launch as the marketing hub, repurpose the ZUI**

The spatial ZUI is the site's architectural backbone. Rather than fight it, repurpose it. Replace the 6 Tarva district capsules with 6 Safetrekr marketing capsules that map to the trip safety lifecycle:

| Ring Position | Old (Tarva) | New (Safetrekr) | Lifecycle Phase | Links To |
|--------------|-------------|-----------------|-----------------|----------|
| 0 | Agent Builder | **Plan** | Trip planning, wizard, roster | /launch/how-it-works |
| 1 | Tarva Chat | **Prepare** | Background checks, docs, certs | /launch/how-it-works |
| 2 | Project Room | **Protect** | Emergency prep, rally points, safe houses | /launch/how-it-works |
| 3 | TarvaCORE | **Monitor** | Intelligence, alerts, geofencing | /launch/how-it-works |
| 4 | TarvaERP | **Deliver** | Traveler app, checklists, packets | /launch/how-it-works |
| 5 | tarvaCODE | **Review** | Independent analyst review, approval | /launch/how-it-works |

The hub glyph at center becomes the Safetrekr logo/wordmark. The "mission control" metaphor directly reinforces the product's value proposition: Safetrekr IS mission control for group travel safety.

Alternatives considered:
- Full traditional marketing site (abandons the ZUI investment and visual differentiation)
- ZUI as optional "explore" mode (splits attention and engineering effort)

Revisit if: User testing shows that enterprise buyers find the ZUI confusing or unprofessional. Add a "Skip to site" escape hatch in the Gateway.

**Decision 2: Primary navigation in a persistent header, not solely in the ZUI**

The spatial ZUI should not be the ONLY way to navigate. A persistent top navigation bar must exist with standard links. The ZUI capsules serve as a visually engaging secondary navigation that reinforces the lifecycle narrative.

Rationale: Safety professionals need fast, predictable navigation. A beautiful ZUI that makes content hard to find will increase bounce rate. The ZUI is the differentiator; the nav bar is the safety net.

**Decision 3: Vertical-specific solutions pages organized by market**

Safetrekr serves 5 distinct verticals. Each has different pain points, regulatory environments, and language:

| Vertical | Key Pain Point | Regulatory Context |
|----------|---------------|-------------------|
| K-12 Schools | Student safety liability, parent communication, FERPA | FERPA, state education codes, Title IX |
| Higher Ed | Study abroad risk, international travel complexity | FERPA, Clery Act, state regulations |
| Faith-Based | Mission trip safety, volunteer screening, duty of care | Denominational policies, child protection laws |
| Youth Sports | Tournament travel, chaperone screening, SafeSport | SafeSport Act, state athletic association rules |
| Business | Corporate duty of care, international travel policy | OSHA, corporate travel policies, insurance requirements |

Each vertical page should use the language of that community, reference their specific regulations, and highlight the features most relevant to them.

**Decision 4: Security page is a first-class citizen, not an afterthought**

For this audience, the Security page is as important as the pricing page. It must be in the primary navigation, not buried in a footer. IT evaluators will navigate directly to it, often before reading anything else.

**Decision 5: "Request Demo" as primary CTA, not "Sign Up"**

Enterprise safety software is not a self-serve signup product. The buying cycle involves evaluation, procurement, and often legal review. "Request a Demo" or "Request Information" is the appropriate primary CTA. "Sign In" belongs in the top-right for existing customers.

Alternatives considered:
- "Start Free Trial" (rejected -- the product has a tiered pricing model that starts at $450/trip; this is not a PLG motion)
- "Get Started" (too vague for enterprise buyers who need to evaluate first)

Revisit if: Safetrekr introduces a free tier or self-serve onboarding for small organizations (e.g., T1 day trips).

---

## 4. Content Hierarchy per Page

### 4.1 Landing Page (/)

The Gateway page currently runs a cinematic boot sequence. This is fine as a brief (under 5 second) brand moment, but it MUST have a skip option and must not block access to content for returning visitors.

| Priority | Content Element | Purpose |
|----------|----------------|---------|
| 1 | Skip/Enter button | Accessibility, returning visitors |
| 2 | Safetrekr wordmark | Brand recognition |
| 3 | Value proposition line | "Group travel safety, managed." or similar |
| 4 | Two paths: "Explore Platform" → /launch, "Learn More" → /launch/how-it-works | Route by intent |

**CTA:** Enter the site (remove friction, not convert)
**Proof Points:** None needed -- this is a threshold page

ASSUMPTION: The cinematic gateway adds brand value and is worth the brief friction for first-time visitors.
Validation plan: Monitor bounce rate on / vs. direct traffic to /launch. If bounce rate exceeds 40%, simplify or remove the gateway.

---

### 4.2 Marketing Hub (/launch)

This is the repurposed spatial ZUI serving as the marketing homepage. It must do the work of a traditional homepage while leveraging the spatial engine for visual differentiation.

| Priority | Content Element | Purpose |
|----------|----------------|---------|
| 1 | **Persistent navigation bar** | Header with: How It Works, Solutions, Pricing, Security, About -- plus "Sign In" and "Request Demo" buttons top-right |
| 2 | **Hero message** (visible at Z1 default zoom) | "The safety management system for organizations that move people." Subtitle: "Independent safety review. Real-time intelligence. Emergency preparedness. One auditable platform." |
| 3 | **Six lifecycle capsules** (Plan, Prepare, Protect, Monitor, Deliver, Review) | Interactive navigation + visual storytelling of the Safetrekr lifecycle |
| 4 | **Hub center** | Safetrekr logo with "mission control" glyph, reinforcing the brand metaphor |
| 5 | **Telemetry/ambient data** | Repurpose the ambient overlays to show Safetrekr-relevant data: "12,400 travelers protected", "847 trips reviewed", "99.8% analyst review SLA" (mock data for launch) |
| 6 | **Trust bar** (visible below capsule ring or at Z0) | "Trusted by K-12 schools, churches, youth sports, and businesses" with vertical icons |
| 7 | **CTA overlay** | Persistent "Request a Demo" button visible at all zoom levels |

**Primary CTA:** Request a Demo
**Secondary CTA:** How It Works (for visitors who need more information before converting)
**Proof Points:** Vertical logos/icons, metric counters (trips reviewed, travelers protected), security badges

---

### 4.3 How It Works (/launch/how-it-works)

This is the most important content page. It must tell the Safetrekr story in a structured, scannable way.

| Priority | Content Element | Purpose |
|----------|----------------|---------|
| 1 | **Page headline** | "How Safetrekr Works" |
| 2 | **The Problem** (2-3 sentences) | "Organizations move thousands of people every year -- students, parishioners, athletes, employees. Safety planning is scattered across spreadsheets, email chains, and paper forms. When something goes wrong, there is no system of record." |
| 3 | **The Safetrekr Solution** (visual overview) | Four-portal architecture diagram: Client Portal, Analyst Portal, Traveler App, HQ Console. Brief description of each. |
| 4 | **Trip Lifecycle** (6-phase visual walkthrough) | Plan -> Prepare -> Protect -> Monitor -> Deliver -> Review. Each phase expands into 3-4 bullet points with feature highlights. This mirrors the ZUI capsule structure. |
| 5 | **The Analyst Difference** (dedicated section) | "Every trip is independently reviewed by a certified safety analyst." Explain separation of duties, tiered assignment, 18-section review workspace, approve/reject/conditional outcomes. This is the hero differentiator -- give it room. |
| 6 | **Platform screenshot gallery** | Authenticated screenshots of the trip detail view, analyst workspace, traveler app. Real product, not mockups. |
| 7 | **CTA** | "See Safetrekr in action. Request a demo." |

**Primary CTA:** Request a Demo
**Proof Points:** 18-section analyst review, 46-endpoint protection API (translated as "comprehensive emergency preparedness"), 8 checklist categories, 5 background check types

---

### 4.4 Solutions Hub (/launch/solutions)

| Priority | Content Element | Purpose |
|----------|----------------|---------|
| 1 | **Page headline** | "Built for organizations that move people" |
| 2 | **Vertical cards** (5) | K-12 Schools, Colleges & Universities, Churches & Faith-Based, Youth Sports, Business. Each card: icon, headline, 1-sentence description, "Learn more" link. |
| 3 | **Cross-cutting value props** | 3-4 benefits that apply to all verticals: "Auditable system of record", "Independent safety review", "Real-time intelligence", "Compliance tracking" |
| 4 | **CTA** | "Which type of organization are you? Request a demo tailored to your needs." |

**Primary CTA:** Request a Demo (with vertical pre-selection)

---

### 4.5 Vertical Solutions Pages (/launch/solutions/{vertical})

Each vertical page follows the same template but with customized language.

| Priority | Content Element | Purpose |
|----------|----------------|---------|
| 1 | **Vertical-specific headline** | e.g., "Safetrekr for K-12 Schools: Student travel safety, managed." |
| 2 | **Pain points** (3-4 bullets) | Specific to this vertical's challenges. Use their language. |
| 3 | **Feature highlights** (4-6) | The Safetrekr features most relevant to this vertical, with vertical-specific framing. |
| 4 | **Regulatory alignment** | Which regulations/standards Safetrekr helps address (FERPA, SafeSport Act, etc.) |
| 5 | **Use case scenario** | "A day in the life" narrative showing how Safetrekr works for this organization type. |
| 6 | **Social proof** | Testimonial or case study from this vertical (placeholder for launch; replace with real ones ASAP). |
| 7 | **CTA** | "Request a demo for your [school/church/organization]." |

**Primary CTA:** Request a Demo
**Proof Points:** Vertical-specific regulatory compliance, use case scenarios

---

### 4.6 Pricing (/launch/pricing)

| Priority | Content Element | Purpose |
|----------|----------------|---------|
| 1 | **Page headline** | "Pricing that scales with trip complexity" |
| 2 | **Tier comparison** (3 columns) | T1 Day Trip ($450), T2 Domestic Overnight ($750), T3 International ($1,250). Clear feature breakdown by tier. Highlight which safety features unlock at each tier. |
| 3 | **What is included** | List of capabilities available at every tier: trip planning wizard, document collection, background check tracking, analyst review, traveler app, emergency preparedness, intelligence alerts. |
| 4 | **Add-ons** | Background Checks ($35/check), Travel Insurance ($25/participant). |
| 5 | **Volume pricing** | "Organizations with high trip volume: contact us for credit packages and custom pricing." |
| 6 | **FAQ** | Common pricing questions: "How are trips counted?", "What happens if I cancel a trip?", "Is there a per-user fee?" (there is not -- this is a per-trip model, which is unusual and worth highlighting). |
| 7 | **CTA** | "Have questions about pricing? Talk to our team." |

**Primary CTA:** Request a Demo / Contact Sales
**Key Messaging:** Per-trip pricing (not per-seat) is a significant differentiator. Organizations pay for what they use, not for headcount. Emphasize this.

ASSUMPTION: The current pricing ($450/$750/$1,250 per trip) is the go-to-market pricing.
Validation plan: Confirm with founder before publishing. Pricing page is the most frequently screenshot and shared page -- it must be accurate.

---

### 4.7 Security (/launch/security)

This page must be comprehensive and honest. Safety professionals and IT evaluators will scrutinize it.

| Priority | Content Element | Purpose |
|----------|----------------|---------|
| 1 | **Page headline** | "Security and trust at Safetrekr" |
| 2 | **Security overview** | "Safetrekr is built with security as a foundational requirement, not an afterthought." 2-3 sentences on the security philosophy. |
| 3 | **Data protection** | Encryption at rest and in transit, Supabase-hosted PostgreSQL, Row Level Security for tenant isolation, data residency information. |
| 4 | **Authentication** | JWT tokens, automatic refresh, 2FA support, invite-based activation, password reset flow. |
| 5 | **Access control** | 10-role RBAC model, portal-level routing, role-based data visibility. |
| 6 | **Audit trail** | Comprehensive logging of all review actions, status changes, and administrative operations with timestamps and user attribution. |
| 7 | **Compliance** | Current certifications (if any), planned certifications, regulatory alignment (FERPA awareness, data handling practices). Be honest about what exists vs. what is planned. |
| 8 | **Architecture** | Four-portal architecture, containerized deployment to Kubernetes, runtime configuration, CI/CD pipeline. |
| 9 | **Data handling for minors** | Special section on how Safetrekr handles student/minor data, given the K-12 and youth sports verticals. |
| 10 | **Privacy practices** | Link to privacy policy, GDPR-aware data export capability, account deletion with 30-day grace period, consent history tracking. |
| 11 | **Contact for security questions** | "Have security questions? Contact our security team at security@safetrekr.com" or equivalent. |
| 12 | **CTA** | "Request our security questionnaire response" or "Download our security whitepaper" |

**Primary CTA:** Request Security Documentation / Request a Demo
**Proof Points:** Row Level Security, 10-role RBAC, comprehensive audit trail, 2FA, containerized deployment

ASSUMPTION: Safetrekr does not yet have SOC 2, ISO 27001, or HIPAA certifications.
Validation plan: Confirm current compliance posture with founder. If certifications are planned, include a "Compliance Roadmap" section.

---

### 4.8 About (/launch/about)

| Priority | Content Element | Purpose |
|----------|----------------|---------|
| 1 | **Company story** | Why Safetrekr exists. The problem that inspired it. The mission. |
| 2 | **The analyst network** | Explain the concept of independent safety analysts. This is unique and builds trust. |
| 3 | **Team** | Founders, key team members. Enterprise buyers want to know who they are working with. |
| 4 | **Verticals served** | K-12, higher ed, churches, youth sports, business. |
| 5 | **Contact** | Link to contact page. |

**Primary CTA:** Request a Demo
**Proof Points:** Team credentials, analyst network description

---

### 4.9 Contact (/launch/contact)

| Priority | Content Element | Purpose |
|----------|----------------|---------|
| 1 | **Demo request form** | Name, email, organization name, organization type (dropdown: K-12, Higher Ed, Church, Youth Sports, Business, Other), role, message. |
| 2 | **What to expect** | "We will respond within 1 business day. A typical demo takes 30 minutes and covers your specific use case." |
| 3 | **Alternative contact** | Email address, phone number if available. |
| 4 | **Security inquiries** | Separate contact path for IT/security evaluators. |

**Primary CTA:** Submit form
**Success State:** Clear confirmation with expected timeline

---

### 4.10 Legal Pages (/launch/legal/terms, /launch/legal/privacy)

Standard legal pages. Must exist before launch. Content should be reviewed by legal counsel.

| Priority | Content Element | Purpose |
|----------|----------------|---------|
| 1 | Terms of Service | Standard SaaS ToS |
| 2 | Privacy Policy | Data collection, usage, sharing, retention, deletion practices. Must address minor data handling given K-12/youth verticals. |

---

## 5. Prioritized Backlog

### P0: Must Have for Launch (Blocks Revenue)

These items must be complete before the marketing site goes live. Without them, enterprise buyers cannot evaluate Safetrekr.

| # | Item | Type | Rationale |
|---|------|------|-----------|
| 1 | **Persistent navigation bar** | Component | Enterprise buyers navigate via nav bar, not spatial exploration. Header: logo, How It Works, Solutions, Pricing, Security, About. Right: Sign In, Request Demo (button). |
| 2 | **Persistent footer** | Component | Contact, Terms of Service, Privacy Policy, copyright. Standard enterprise expectation. |
| 3 | **Repurpose ZUI capsules** | Refactor | Replace 6 Tarva districts with 6 Safetrekr lifecycle phases (Plan, Prepare, Protect, Monitor, Deliver, Review). Update DistrictId type, display names, telemetry, and capsule content. |
| 4 | **Hub hero messaging** | Content | Value proposition, subtitle, and trust signals visible at default zoom on /launch. |
| 5 | **How It Works page** | Page | Platform overview, trip lifecycle, analyst difference section. The most important content page. |
| 6 | **Pricing page** | Page | Tier comparison (T1/T2/T3), included features, add-ons, FAQ. |
| 7 | **Security page** | Page | Data protection, authentication, RBAC, audit trail, architecture, compliance posture. |
| 8 | **Contact / Request Demo page** | Page | Form with organization type dropdown. Must submit to a real endpoint (email notification or CRM). |
| 9 | **Solutions hub page** | Page | 5 vertical cards with brief descriptions. Individual vertical pages can follow in P1. |
| 10 | **About page** | Page | Company story, analyst network, team. |
| 11 | **Terms of Service** | Page | Legal requirement for launch. |
| 12 | **Privacy Policy** | Page | Legal requirement for launch. Especially important given minor data in K-12/youth verticals. |
| 13 | **Mobile responsive design** | Design | All pages must work at 320px through 1440px+. The ZUI can degrade gracefully on mobile (simplified view, not full pan/zoom). |
| 14 | **Remove all Tarva branding** | Cleanup | No references to Tarva districts, Agent Builder, TarvaCORE, etc. in any user-facing content. District types, mock data, and component labels must all be Safetrekr-native. |
| 15 | **Meta tags and OG tags** | SEO | Unique title and description for every page. Open Graph tags for social sharing. Favicon. |
| 16 | **Analytics instrumentation** | Tracking | Page views, CTA clicks (Request Demo, Sign In, nav items), form submissions. Minimum viable tracking to measure launch effectiveness. |
| 17 | **Form submission backend** | Integration | Contact form must deliver submissions to the team (email, Supabase, or CRM). Confirmation state for the user. |
| 18 | **Gateway skip option** | UX | The cinematic boot sequence at / must have a visible skip/enter button. Returning visitors should not be forced through it. Consider a cookie/localStorage flag to auto-skip on return visits. |

---

### P1: Should Have (First 2 Weeks Post-Launch)

These items increase conversion and credibility but do not block the initial launch.

| # | Item | Type | Rationale |
|---|------|------|-----------|
| 19 | **K-12 Schools vertical page** | Page | Likely the highest-volume first market. FERPA alignment, student safety, parent communication. |
| 20 | **Churches & Faith-Based vertical page** | Page | Mission trip safety is a high-urgency use case. Volunteer screening, international travel complexity. |
| 21 | **Product screenshots** | Content | Authenticated screenshots of the trip detail view, analyst workspace, traveler app, and dashboard. Real product shots build credibility. |
| 22 | **FAQ page** | Page | Common questions about pricing, security, onboarding, and the analyst model. Reduces demo request friction. |
| 23 | **Sitemap.xml** | SEO | For search engine crawling. |
| 24 | **robots.txt** | SEO | Standard configuration. |
| 25 | **Cookie consent banner** | Compliance | If analytics or any third-party scripts are used. |

---

### P2: Nice to Have (Month 2)

| # | Item | Type | Rationale |
|---|------|------|-----------|
| 26 | **Youth Sports vertical page** | Page | SafeSport Act alignment, tournament travel, chaperone screening. |
| 27 | **Business / Corporate vertical page** | Page | Corporate duty of care, international travel policy. |
| 28 | **Higher Ed vertical page** | Page | Study abroad risk management, Clery Act. |
| 29 | **Customer stories / case studies** | Content | Even composite/anonymized stories build trust. "A K-12 district with 200 trips/year replaced spreadsheets with Safetrekr." |
| 30 | **"Become an Analyst" page** | Page | Recruit safety analysts to the Safetrekr network. Explain the role, requirements, and value proposition. |
| 31 | **Interactive platform tour** | Feature | Guided walkthrough of the product using screenshots or a sandboxed demo environment. |
| 32 | **Blog / Resources section** | Structure | Launch with 2-3 articles: "What is independent safety review?", "How to build an emergency preparedness plan", "Checklist: what to verify before your next school trip." |
| 33 | **ROI calculator** | Tool | "How much does your current process cost in time, risk, and liability? See what Safetrekr saves." Input: # of trips/year, average trip size, hours spent on safety planning. Output: time saved, risk reduction narrative. |
| 34 | **Comparison page** | Content | "Safetrekr vs. Spreadsheets" -- show the gap. Avoid naming competitors directly unless the market has an obvious incumbent. |

---

### P3: Future (Quarter 2+)

| # | Item | Type | Rationale |
|---|------|------|-----------|
| 35 | **Trust Center** | Page | Downloadable security whitepaper, SOC 2 report (when available), data processing agreement template, sub-processor list. |
| 36 | **Integration partners page** | Page | Checkr, Sterling, GoodHire, AviationStack, Stripe. Shows ecosystem maturity. |
| 37 | **Webinar / event promotion** | Feature | Registration for live demos, webinars, conference appearances. |
| 38 | **Resource library** | Section | Whitepapers, safety planning guides, regulatory compliance checklists. Lead generation via gated content. |
| 39 | **Help center (public)** | Section | Public-facing version of the integrated help center. Serves existing customers and prospects. |
| 40 | **API documentation** | Section | If/when Safetrekr opens integrations to third parties. |
| 41 | **Multi-language support** | Feature | Spanish at minimum for K-12 market. |
| 42 | **Chatbot / AI assistant** | Feature | Conversational demo or FAQ assistant. Leverages existing Anthropic SDK integration. |

---

## 6. Acceptance Criteria for Launch

The marketing site is "done" and ready to go live when ALL of the following conditions are true.

### Content Completeness

- [ ] All P0 pages (items 1-18) are published and accessible
- [ ] Every page has a unique, descriptive `<title>` tag (under 60 characters)
- [ ] Every page has a unique `<meta name="description">` tag (under 160 characters)
- [ ] Every page has Open Graph tags (`og:title`, `og:description`, `og:image`)
- [ ] No placeholder text ("Lorem ipsum", "Coming soon", "TBD") on any P0 page
- [ ] No Tarva branding, district names, or Tarva-specific terminology visible to users
- [ ] Pricing matches confirmed go-to-market pricing
- [ ] Legal pages (ToS, Privacy Policy) have been reviewed by counsel
- [ ] Security page accurately represents current security posture (no overclaiming)

### Functionality

- [ ] All navigation links work (no 404s)
- [ ] Contact/demo request form submits successfully
- [ ] Form submission triggers a notification to the Safetrekr team (verified in production)
- [ ] Form shows a confirmation state after successful submission
- [ ] "Sign In" link routes to the correct login page or app URL
- [ ] Gateway (/) has a visible skip/enter mechanism
- [ ] Returning visitors can bypass the gateway (cookie/localStorage)
- [ ] All external links open in new tabs

### Design and Responsiveness

- [ ] All pages render correctly at 320px, 768px, 1024px, and 1440px viewport widths
- [ ] The spatial ZUI degrades gracefully on mobile (accessible content, simplified interaction)
- [ ] Navigation is usable on mobile (hamburger menu or equivalent)
- [ ] Text is readable at default zoom on all devices (minimum 16px body text)
- [ ] Color contrast meets WCAG AA (4.5:1 for body text, 3:1 for large text)
- [ ] Interactive elements have visible focus states for keyboard navigation

### Performance

- [ ] Lighthouse Performance score >= 80 on all pages (target 90+)
- [ ] Lighthouse Accessibility score >= 90 on all content pages
- [ ] First Contentful Paint < 2 seconds on 4G connection
- [ ] No layout shift visible during page load (CLS < 0.1)
- [ ] Images are optimized (WebP/AVIF, lazy loaded below the fold)

### Analytics and Tracking

- [ ] Page view tracking fires on every page
- [ ] "Request Demo" CTA click tracking fires on every page where it appears
- [ ] Form submission event fires on successful contact form submission
- [ ] Navigation click tracking fires for primary nav items
- [ ] No PII is included in analytics events

### SEO

- [ ] `sitemap.xml` is generated and accessible
- [ ] `robots.txt` is configured correctly
- [ ] Canonical URLs are set for all pages
- [ ] Structured data (Organization, WebSite) is present on the homepage
- [ ] All pages are crawlable (content is server-rendered or statically generated, not locked inside client-only ZUI)

### Cross-Browser

- [ ] Chrome (latest 2 versions) -- all pages render and function correctly
- [ ] Safari (latest 2 versions) -- all pages render and function correctly
- [ ] Firefox (latest 2 versions) -- all pages render and function correctly
- [ ] Edge (latest 2 versions) -- all pages render and function correctly
- [ ] iOS Safari (latest 2 versions) -- all pages render and function correctly
- [ ] Chrome on Android (latest 2 versions) -- all pages render and function correctly

### Guardrails (Must NOT Regress)

- [ ] The spatial ZUI engine continues to function (pan, zoom, semantic levels, morph transitions)
- [ ] The Safetrekr color scheme is applied (green primary, amber accent, dark teal backgrounds)
- [ ] No console errors on any page in production build
- [ ] No broken images or missing assets
- [ ] Page load does not exceed 3MB total transfer size on any page

---

## 7. Expert Opinions and Recommendations

### On the Owner's Proposed Navigation

The owner suggested: How It Works, Solutions, Pricing, About, Security (primary); Sign In, Request Info (top right); Contact, ToS & Privacy (secondary).

**My recommendation:** This is solid. Two adjustments:

1. **Reorder to: How It Works, Solutions, Pricing, Security, About.** Move Security ahead of About. For this audience, Security is more important than About. IT evaluators go directly to Security; it should be easy to find.

2. **"Request Info" should be "Request a Demo."** "Request Info" is passive and vague. "Request a Demo" is specific, action-oriented, and signals that Safetrekr has a product worth demonstrating. It also sets the expectation for the sales team: the lead expects a demo, not a PDF.

3. **"Contact" should be accessible from both the footer AND as a standalone page.** Do not bury it as secondary-only. Some visitors (especially referrals who already know what Safetrekr is) will want to go directly to contact.

### On the Spatial ZUI for Enterprise Marketing

The ZUI is Safetrekr's visual differentiator. Enterprise safety platforms are universally boring -- institutional blue, stock photos of people in hard hats, generic SaaS layouts. Safetrekr's mission-control aesthetic says "we take this seriously at a level others do not."

However, the ZUI must not be the ONLY way to access content. Enterprise buyers need:
- Standard, crawlable pages for SEO
- Fast, predictable navigation for evaluation
- Accessible content for compliance with their own accessibility standards
- Mobile access for evaluators on the go

**Recommendation:** The ZUI is the visual wrapper for /launch, but all content pages (/launch/how-it-works, etc.) are standard server-rendered pages with conventional layouts. The capsules on /launch link to these pages. The ZUI creates the first impression; the content pages close the deal.

### On the Six-Capsule Lifecycle Mapping

Mapping the 6 capsules to Plan, Prepare, Protect, Monitor, Deliver, Review is a strong narrative structure because:

1. It mirrors the actual product workflow (trip lifecycle)
2. It is intuitive for safety professionals (they think in phases)
3. It creates a visual story that reinforces the platform's comprehensiveness
4. Each phase maps naturally to specific product features

The capsule telemetry data should be repurposed to show Safetrekr-relevant metrics:
- Plan: "3,200 trips planned" / "10-step guided wizard"
- Prepare: "15,000 documents collected" / "98% on-time submission"
- Protect: "2,100 emergency plans" / "46-point protection system"
- Monitor: "8,400 alerts triaged" / "5 intelligence categories"
- Deliver: "22,000 travelers served" / "Offline-first mobile app"
- Review: "1,800 analyst reviews" / "Independent safety verification"

These are aspirational/mock numbers for launch. Replace with real data as the platform scales.

### On What Is Missing from the Owner's Initial Thinking

1. **No "For Analysts" path.** Safetrekr's analyst model is unique. There should eventually be a page for recruiting safety analysts. This is P2 but should be planned into the IA now.

2. **No blog/resources strategy.** Content marketing for safety professionals is high-value. Articles on safety best practices, regulatory updates, and incident case studies drive organic search traffic. Structure this into the IA even if it launches empty.

3. **No social proof strategy.** Enterprise buyers need evidence from peers. The marketing site should have a clear plan for collecting and displaying testimonials, case studies, and logos. Even "Safetrekr is trusted by organizations across K-12, faith-based, and youth sports" with vertical icons is better than nothing.

4. **No competitor positioning.** The site should subtly (not explicitly) address "why Safetrekr vs. the status quo" (spreadsheets, email, paper). The How It Works page should open with the problem statement that makes the alternative painful.

---

## 8. Risk Register

| Risk | Likelihood | Impact | Mitigation | Contingency |
|------|-----------|--------|------------|-------------|
| ZUI confuses enterprise buyers, increases bounce rate | Medium | High | Add persistent nav bar, standard content pages, skip option on gateway | Implement A/B test: ZUI hub vs. traditional homepage |
| Pricing is wrong or changes before launch | Medium | High | Confirm pricing with founder before publishing pricing page | Use "Contact for pricing" as interim |
| Security page overclaims compliance posture | Low | Critical | Review security page with engineering; label planned items as "Roadmap" | Remove unverified claims immediately |
| Content pages are not crawlable by search engines | Medium | Medium | Server-render or statically generate all content pages; avoid client-only rendering for text content | Add server-side rendering to content pages post-launch |
| Contact form submissions are lost | Low | Critical | Test form submission end-to-end in production before launch; set up backup email notification | Manual email address as fallback on contact page |
| Mobile experience is broken for ZUI | High | Medium | Test on iOS Safari and Chrome Android; implement simplified mobile layout for /launch | Redirect mobile users to /launch/how-it-works (content-first) |
| No real customer testimonials at launch | High | Medium | Use composite case studies or "Safetrekr is designed for..." language | Add testimonial collection to sales process; update site monthly |

---

## 9. Instrumentation Plan

| Event | When | Properties (No PII) |
|-------|------|---------------------|
| `page.viewed` | Every page load | `pagePath`, `pageTitle`, `referrer`, `viewport` (mobile/tablet/desktop) |
| `cta.clicked` | Any CTA button click | `ctaType` (request-demo, sign-in, learn-more, contact), `pagePath`, `position` (header, hero, inline, footer) |
| `nav.clicked` | Primary nav item click | `navItem`, `source` (header, footer, capsule) |
| `form.submitted` | Contact form success | `formType` (demo-request, contact), `orgType` (k12, church, etc.), `hasMessage` (boolean) |
| `form.abandoned` | Form started but not submitted (after 30s) | `formType`, `fieldsCompleted` (count) |
| `capsule.clicked` | ZUI capsule interaction | `capsuleId` (plan, prepare, protect, monitor, deliver, review), `zoomLevel` |
| `gateway.skipped` | Skip button on gateway | `timeOnGateway` (seconds) |
| `gateway.completed` | Gateway animation completes | `timeOnGateway` (seconds) |
| `scroll.depth` | 25%, 50%, 75%, 100% of content pages | `pagePath`, `depth` |

**Guardrail Metrics:**
- Bounce rate on /launch must stay below 60%
- Time to first CTA click should decrease over time (indicates clearer messaging)
- Form submission rate should be > 2% of contact page visitors
- Mobile bounce rate should not be more than 20% higher than desktop

---

## 10. Decision Log

| Decision | Alternatives Considered | Rationale | Revisit If |
|----------|------------------------|-----------|------------|
| Keep spatial ZUI at /launch as marketing hub | (a) Full traditional site, (b) ZUI as optional "explore" mode | ZUI is built, visually differentiating, and the mission-control metaphor fits the safety narrative. Standard content pages handle the accessibility/SEO/mobile concerns. | User testing shows > 50% bounce rate on /launch or enterprise buyers explicitly cite confusion |
| Map 6 capsules to trip lifecycle (Plan, Prepare, Protect, Monitor, Deliver, Review) | (a) Map to page types (How It Works, Solutions, etc.), (b) Map to personas (Schools, Churches, etc.) | Lifecycle mapping tells a story, mirrors the product, and is more compelling than a navigation menu rendered as capsules | Lifecycle phases prove confusing in user testing |
| "Request a Demo" as primary CTA over "Request Info" or "Start Free Trial" | See CTA alternatives above | Enterprise buyers expect demos; self-serve does not fit the current pricing model ($450+ per trip) | Safetrekr launches a free tier or self-serve onboarding |
| Security in primary nav, not secondary | Standard practice of burying security in footer | This audience (safety professionals) prioritizes security evaluation. IT evaluators navigate to Security immediately. | Security page gets < 5% of traffic (indicates it is not a priority for this audience) |
| Vertical-specific solutions pages | (a) Single "Use Cases" page, (b) No vertical segmentation | Each vertical has different pain points, regulatory environments, and language. Vertical pages enable targeted messaging and SEO. | A single vertical accounts for > 80% of customers (then optimize for that vertical on the main solutions page) |
| Per-trip pricing displayed publicly | (a) "Contact for pricing", (b) Pricing hidden entirely | Transparent pricing builds trust, reduces unqualified demo requests, and is increasingly expected in SaaS. The per-trip model (vs. per-seat) is a differentiator worth showcasing. | Pricing complexity increases (enterprise tiers, volume discounts) to the point where a simple comparison table is misleading |

---

## Appendix A: Capsule Data Refactor Specification

To implement Decision 2 (lifecycle capsules), the following code changes are required in `src/lib/interfaces/district.ts`:

**Current DistrictId type:**
```typescript
export type DistrictId =
  | 'agent-builder'
  | 'tarva-chat'
  | 'project-room'
  | 'tarva-core'
  | 'tarva-erp'
  | 'tarva-code'
```

**Proposed DistrictId type:**
```typescript
export type DistrictId =
  | 'plan'
  | 'prepare'
  | 'protect'
  | 'monitor'
  | 'deliver'
  | 'review'
```

**Proposed DISTRICTS constant:**
```typescript
export const DISTRICTS: readonly DistrictMeta[] = [
  {
    id: 'plan',
    displayName: 'Plan',
    shortName: 'PLAN',
    ringIndex: 0,
    port: null,
  },
  {
    id: 'prepare',
    displayName: 'Prepare',
    shortName: 'PREPARE',
    ringIndex: 1,
    port: null,
  },
  {
    id: 'protect',
    displayName: 'Protect',
    shortName: 'PROTECT',
    ringIndex: 2,
    port: null,
  },
  {
    id: 'monitor',
    displayName: 'Monitor',
    shortName: 'MONITOR',
    ringIndex: 3,
    port: null,
  },
  {
    id: 'deliver',
    displayName: 'Deliver',
    shortName: 'DELIVER',
    ringIndex: 4,
    port: null,
  },
  {
    id: 'review',
    displayName: 'Review',
    shortName: 'REVIEW',
    ringIndex: 5,
    port: null,
  },
] as const
```

Additional changes needed:
- `DISTRICT_CODES` map updated for new IDs
- `MOCK_CAPSULE_DATA` telemetry updated to Safetrekr metrics
- All components referencing specific district IDs (e.g., `'agent-builder'`) updated
- API routes under `src/app/api/districts/` may need refactoring or removal
- District view content (what appears when a capsule is clicked) must be replaced with Safetrekr marketing content for each lifecycle phase

---

## Appendix B: Content Pages Technical Approach

Content pages under /launch/ should be implemented as standard Next.js pages with:

1. **Server-side rendering or static generation** -- Content must be crawlable by search engines.
2. **Shared layout** -- `/launch/layout.tsx` provides the persistent nav bar and footer.
3. **Standard scroll** -- No ZUI interaction required. Pages scroll vertically like any marketing site.
4. **Consistent design system** -- Use Safetrekr color tokens, typography, and spacing from `spatial-tokens.css`.
5. **Motion/react for transitions** -- Page transitions and scroll-triggered animations using `motion/react` (never `framer-motion`).
6. **Responsive design** -- Tailwind CSS responsive utilities for all breakpoints.

The ZUI lives only on `/launch/page.tsx`. All child routes are conventional pages.

---

*This review represents the Product Owner's analysis based on the verified product capabilities document and current codebase state as of March 2, 2026. All recommendations should be validated against actual user feedback and business priorities before implementation. Assumptions are labeled throughout and should be validated per the stated validation plans.*
