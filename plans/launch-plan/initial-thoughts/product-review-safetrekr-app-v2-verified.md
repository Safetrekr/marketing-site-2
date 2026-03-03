# Safetrekr Platform -- Product Capabilities (Verified)

*This is a code-verified revision of `product-review-safetrekr-app-v2.md`. Every claim has been cross-referenced against the three Safetrekr codebases: `safetrekr-app-v2` (Next.js frontend), `safetrekr-core` (FastAPI backend), and `native-mobile-app` (Expo React Native). Features are marked with implementation status: **Implemented**, **Scaffolded** (UI route exists but no functional code), or **Planned** (described but not present in any codebase). Verification date: March 2026.*

---

## Executive Summary

Safetrekr is an enterprise trip safety management platform purpose-built for organizations that move groups of people. Schools sending students abroad, churches organizing mission trips, youth sports teams traveling to tournaments, and businesses managing corporate travel all share a common challenge: ensuring the safety, compliance, and coordination of every traveler before, during, and after a trip. Safetrekr replaces scattered spreadsheets, email chains, and paper-based safety checklists with a single, auditable system of record.

The platform operates through four integrated portals. Organization administrators use the **Client Portal** to plan trips, manage rosters, collect documents, and monitor real-time intelligence alerts. Dedicated **Safety Analysts** use the Analyst Portal to independently review every trip for safety compliance -- verifying lodging, evaluating emergency preparedness, and approving trips before departure. Safetrekr's own operations team uses the **HQ Console** to manage the entire ecosystem of organizations, analysts, policies, and intelligence infrastructure. And travelers, chaperones, and guardians access the **Traveler App** -- a dedicated native mobile application that delivers live safety checklists, real-time intelligence alerts, itineraries, emergency preparedness information, geofence-aware location monitoring, SMS emergency broadcast, and acknowledgment workflows directly to participants before and during travel.

Safetrekr serves organizations across five verticals -- K-12 schools, colleges and universities, churches and faith-based organizations, youth sports organizations, and businesses -- with a tiered pricing model that scales from simple day trips (T1) through domestic overnight travel (T2) to complex international itineraries (T3). Each tier unlocks progressively deeper safety features, ensuring organizations pay only for the complexity they need.

---

## Table of Contents

1. [Comprehensive Trip Planning](#1-comprehensive-trip-planning)
2. [Traveler and Roster Management](#2-traveler-and-roster-management)
3. [Background Checks and Screening](#3-background-checks-and-screening)
4. [Document and Consent Collection](#4-document-and-consent-collection)
5. [Safety Guidance and Checklist Delivery](#5-safety-guidance-and-checklist-delivery)
6. [Emergency Preparedness and Protection System](#6-emergency-preparedness-and-protection-system)
7. [Real-Time Intelligence and Alerts](#7-real-time-intelligence-and-alerts)
8. [Independent Safety Review and Approval](#8-independent-safety-review-and-approval)
9. [Live Traveler Delivery and Trip Packet Generation](#9-live-traveler-delivery-and-trip-packet-generation)
10. [Certification and Training Tracking](#10-certification-and-training-tracking)
11. [Insurance Policy Management](#11-insurance-policy-management)
12. [Billing and Payments](#12-billing-and-payments)
13. [Team and Organization Management](#13-team-and-organization-management)
14. [Operational Command Center (HQ Console)](#14-operational-command-center-hq-console)
15. [Platform-Wide Capabilities](#15-platform-wide-capabilities)
16. [Integrations and Technical Architecture](#16-integrations-and-technical-architecture)

---

## 1. Comprehensive Trip Planning

> **Status: Implemented**

### Guided Trip Creation Wizard

Safetrekr walks organization administrators through a 10-step trip creation process that captures every detail a safety reviewer needs -- from basic logistics to granular flight assignments. The wizard enforces completeness at each stage, reducing back-and-forth between trip organizers and safety teams.

*Source: `safetrekr-app-v2/src/types/trip-draft.ts` defines the canonical `WIZARD_STEPS` array with exactly 10 entries. The navigation hook at `src/modules/client/hooks/use-wizard-navigation.ts` references `WIZARD_STEPS.length` as the authoritative step count.*

**Step 1 -- Trip Type Selection.** Choose the complexity tier that matches the trip: T1 (day trip), T2 (domestic overnight), or T3 (international). The selected tier determines which subsequent steps appear and which safety requirements apply.

**Step 2 -- Basic Information.** Enter the trip name, destination, travel dates, departure city, purpose, rally point, and point of contact. This information anchors the trip record and drives downstream scheduling.

**Step 3 -- Participants.** Add travelers, chaperones, and guardians individually or in bulk. The platform supports CSV and Excel import with intelligent field mapping, confidence-scored matching against the organization's traveler registry, and automatic deduplication on email, phone, and name-plus-date-of-birth combinations.

**Step 4 -- Air Travel.** Enter outbound and return flight details including airline, airport, terminal, and gate. A built-in flight lookup powered by the AviationStack API auto-populates flight data from a flight number, reducing manual entry and transcription errors.

**Step 5 -- Lodging.** Record accommodations with check-in and check-out dates, floor assignments, contact information, and reservation codes. The platform automatically flags fire safety concerns for rooms assigned above the sixth floor, a detail that feeds into the analyst's safety review.

**Step 6 -- Venues.** Catalog every venue the group will visit, classified by category: museum, historical site, educational facility, sports venue, entertainment venue, restaurant, park, or other. Venue data feeds into the interactive map view and safety assessment.

**Step 7 -- Itinerary.** Build a day-by-day event schedule with times and locations. Events from flights, lodging, and venues are automatically populated. The itinerary becomes the backbone of the trip detail view and feeds into the analyst review workspace.

**Step 8 -- Transportation.** Document ground transportation modes between events -- walking, public transit, rideshare, charter bus, or private vehicles. Auto-generated transportation legs between itinerary events can be assigned modes and provider details.

**Step 9 -- Add-Ons.** Select optional services including background check packages, travel insurance, and accessibility or dietary tracking. Pricing is calculated in real time based on participant count and selections.

**Step 10 -- Review.** A final summary screen presents every detail for confirmation before the trip is submitted for safety review.

### Trip Detail View

Once created, every trip has a comprehensive tabbed detail view that serves as the single source of truth throughout the trip lifecycle (draft, in review, active, in progress, completed, or cancelled):

- **Overview** -- Trip summary with key dates, participant count, flight count, event count, review status, and days until departure.
- **Participants** -- Full roster with role assignments, contact details, and status indicators.
- **Lodging** -- Accommodation details with an interactive map showing property locations.
- **Venues** -- Categorized venue list with map visualization.
- **Air Travel** -- Flight details and participant-to-flight assignments.
- **Itinerary** -- Day-by-day event timeline.
- **Transportation** -- Ground transport details between events.
- **Background Checks** -- Participant-by-check-type compliance matrix (see Section 3).
- **Documents** -- Consent and document collection status (see Section 4).
- **Guidance** -- Safety checklists and acknowledgment tracking (see Section 5).
- **Safety Review** -- Organization administrator safety verification checklist.
- **Emergency Preparedness** -- Emergency contacts, local services, medical facilities, evacuation plans, and kit profiles (see Section 6).
- **Packets** -- Generated trip packets by role (see Section 9).
- **Payment** -- Tier-based pricing, add-on costs, payment methods, and transaction history.
- **Issues** -- Flagged issues from the safety review process (scaffolded).
- **Analyst Notes** -- Read-only view of notes from the assigned safety analyst (scaffolded).
- **Settings** -- Trip-specific configuration.
- **Transactions** -- Payment transaction history and receipt access.

### Day-by-Day View and Print

The itinerary tab supports a day-by-day visualization mode that breaks the trip schedule into individual daily views. A persistent trip summary sidebar provides contextual reference -- key dates, participant count, and trip status -- while users navigate through each day's events, venues, and transportation legs. Browser print integration allows administrators to produce clean hard copies of trip details directly from the detail view, supporting offline reference during travel.

### Client Dashboard

The Client Portal dashboard provides organization administrators with an at-a-glance operational picture:

- **KPI Cards** -- Total trips, active trips, trips in review, upcoming trips, and pending approvals.
- **Recent Activity Feed** -- Chronological stream of trip status changes, review milestones, and team actions.
- **Trip List** -- Sortable, filterable trip directory supporting tile and list view modes with sort options (newest, oldest, departure date, title).

---

## 2. Traveler and Roster Management

> **Status: Implemented**

### Traveler Registry (Prefill Cache)

Organizations that run recurring trips benefit from Safetrekr's persistent traveler registry. Every traveler added to a trip is automatically catalogued, building an institutional memory that accelerates future trip planning.

- **Persistent Records** -- Traveler profiles persist across trips, storing contact information, address, medical notes (allergies, medications, dietary restrictions), and emergency contacts.
- **Intelligent Matching** -- When adding participants to a new trip, Safetrekr searches the registry and presents match candidates with confidence scoring. Matches are scored across multiple signals: email match (highest confidence), phone match (high confidence), name-plus-date-of-birth match (medium-high confidence), and name-only match (lower confidence).
- **Bulk Import** -- Upload a CSV or Excel file and map columns to Safetrekr fields. The import engine reports imported, updated, skipped, and error counts with row-level error details. Every import is audit-logged with file metadata, row counts, and duration.
- **Deduplication** -- Automatic deduplication on canonical email, normalized phone (E.164 format), and name-plus-date-of-birth prevents duplicate traveler records from accumulating.
- **Quick Prefill** -- Select a registry match and auto-populate all participant fields, eliminating redundant data entry.

### Participant Role Assignment

Every participant is assigned a role that determines their permissions, document requirements, and information visibility:

- **Traveler** -- The person making the trip.
- **Chaperone** -- Adult supervisor accompanying travelers.
- **Guardian** -- Parent or legal guardian (typically for minor travelers).

Guardian relationships are tracked explicitly, with a guardian bypass workflow available when guardian consent requirements need documented exceptions.

*Note: The frontend additionally defines a `chaperone_admin` participant role for lead chaperone designation. This is a trip-level participant role, not a system-level identity role.*

---

## 3. Background Checks and Screening

> **Status: Implemented**

Safetrekr provides a structured background check workflow that ensures every adult with supervisory responsibility has been properly screened before a trip is approved.

### Check Types

Five categories of background check are supported:

| Check Type | Description |
|---|---|
| Criminal | Criminal background check |
| Sex Offender | National sex offender registry search |
| Driving Record | Motor vehicle record check |
| Employment | Employment history verification |
| Education | Education verification |

### Provider Integration

Organizations can select from three integrated background check providers -- **Checkr**, **Sterling**, and **GoodHire** -- or manage checks through their existing provider and record results in Safetrekr.

### Compliance Matrix

The trip-level background checks tab displays a participant-by-check-type matrix showing the status of every required check at a glance. Each cell carries one of six statuses: approved, pending, not started, rejected, not required, or expired.

### Organization-Level Checks

Beyond trip-specific screening, organizations can initiate and track background checks at the organization level, maintaining a central record of check history and status across all team members.

### Status Summary

KPI cards on the background checks view surface aggregate statistics -- total checks, approved, pending, not started, and rejected -- so administrators can immediately see where compliance gaps exist.

---

## 4. Document and Consent Collection

> **Status: Implemented**

Safetrekr replaces paper permission slips and emailed waivers with a structured, trackable document collection system.

### Requirement Types

Nine document requirement templates are available out of the box, organized into two categories:

**Consents:**
- General Waiver -- Liability release and waiver agreement
- Medical Consent -- Medical treatment authorization
- Photo Release -- Photo and video usage permission
- Code of Conduct -- Behavioral agreement and expectations

**Documents:**
- Passport Copy -- Identification documentation (typically for T3 international trips)
- Visa Copy -- Visa documentation for international travel
- Insurance Proof -- Travel insurance certificate
- Emergency Contacts -- Emergency contact information form
- Custom Document -- User-defined document type for organization-specific needs

### Role-Based Requirements

Each document requirement can be scoped to specific participant roles (travelers, chaperones, guardians), ensuring that the right people receive the right requests.

### Submission Tracking

Every participant's document status flows through a clear lifecycle: not submitted, pending review, approved, or rejected (with rejection reason). Per-participant progress summaries show total required, submitted, approved, pending review, rejected, and not submitted counts with a completion percentage.

### Configurable Due Dates and Reminders

Document requirements support configurable due dates and automated reminder schedules (7 days, 3 days, and 1 day before the deadline).

### Document Sharing

Uploaded trip documents can be categorized (insurance, policy, waiver, itinerary, or other) and shared selectively with analysts, travelers, chaperones, or guardians.

---

## 5. Safety Guidance and Checklist Delivery

> **Status: Implemented** (including smart delivery triggers)

Safetrekr's guidance system delivers context-appropriate safety information to the right people at the right time through configurable checklists. Checklists are pushed live to the Traveler App, where travelers, chaperones, and guardians receive and acknowledge them -- not just bundled into static packets.

### Checklist Categories

Eight checklist template categories cover the full spectrum of trip safety guidance:

| Category | Purpose |
|---|---|
| Pre-Departure | Preparation tasks before the trip begins |
| Cyber Safety | Digital security awareness and precautions |
| General Awareness | Situational awareness and safety fundamentals |
| Location Fallbacks | Alternate plans when venues or routes change |
| Lodging Safety | Hotel and accommodation safety protocols |
| Banking & Currency | Financial safety and currency management abroad |
| OPSEC | Operational security practices for travelers |
| Daily Briefing | Recurring daily safety updates during the trip |

### Smart Delivery Triggers

Checklists are delivered automatically based on configurable trigger types. Both time-relative and geo-arrival triggers have working service implementations in the backend.

*Source: `safetrekr-core/src/services/checklist_service.py` implements `evaluate_time_triggers()` and `evaluate_geo_trigger()` with full business logic.*

- **Time-Relative** -- Delivered T-X days before departure (e.g., T-14 days for pre-departure preparation). The backend evaluates trips with start dates within the next 60 days, activating checklists when the offset threshold is reached. Designed for daily cron execution.
- **Geo-Arrival** -- Triggered when the group arrives at a specific location. The mobile app's geofence transition handler invokes the backend's geo-trigger evaluation, which matches triggers by geofence category. Supports a `first_time_only` flag that checks the `checklist_acknowledgements` table to prevent re-delivery.
- **Event-Based** -- Triggered by a specific trip event.
- **Manual** -- Released manually by the analyst or administrator.

### Audience Targeting

Each checklist targets a specific audience: all travelers, travelers only, chaperones only, guardians only, client admins, or analysts.

### Rich Content

Checklist items support priority levels (info, important, critical), detailed body text, and video content URLs for multimedia safety briefings. Items can be marked as required or optional.

### Acknowledgment Tracking

When a checklist requires acknowledgment, Safetrekr tracks which participants have acknowledged and which have not. Per-checklist and per-participant completion percentages provide visibility into compliance readiness. The backend records acknowledgments with full audit trail including IP address and user agent.

### Automated Reminders

The backend implements periodic reminder functionality (`send_checklist_reminders()`) for unacknowledged required checklists, supporting proactive follow-up without manual intervention.

---

## 6. Emergency Preparedness and Protection System

> **Status: Implemented** (including 46-endpoint protection API)

Every trip in Safetrekr has a dedicated emergency preparedness configuration, built by the assigned safety analyst and made available (read-only) to the organization administrator and to travelers, chaperones, and guardians through the Traveler App.

### Emergency Contacts

Structured contact records cover seven role types: trip leader, alternate leader, local host, school/org emergency line, organization safety officer, medical contact, and other. Each contact has audience visibility controls (chaperones only, all leaders, or everyone).

### Local Emergency Services

Catalogued local emergency services include police, fire department, combined services, ambulance, and other emergency resources -- with phone numbers, names, and notes. System-suggested services can be supplemented with manually added entries.

### Medical Facility Directory

Nearby medical facilities are catalogued with trauma capability levels (Level I through Level V trauma centers, plus high, medium, and basic emergency capability), estimated travel times in minutes, contact information, and primary/backup designation. This ensures trip leaders know exactly where to go in a medical emergency and how long it will take to get there.

### Evacuation Plans

Comprehensive evacuation planning covers three escalation tiers:

- **Shelter in Place** -- Designated location, trigger conditions, and decision-maker assignment.
- **Local Evacuation** -- Route description, rally point reference, safe house designation, and transport notes.
- **Relocation** -- Full relocation protocol description with authorizer designation.

### Emergency Kit Profiles

Safetrekr recommends medical kit profiles based on the trip's characteristics:

| Profile | When Recommended |
|---|---|
| Basic Student Group Kit | Standard group travel |
| Enhanced Kit (No Medic) | Extended or remote travel without medical professional |
| Medic-Managed Kit | Travel with a medical professional on the team |
| Minimal Urban Kit | Urban travel with nearby medical facilities |

Recommendations factor in three variables: whether a medical professional is traveling with the group, the environment type (urban, rural, or remote/backcountry), and the expected emergency response time band (0-10, 10-30, or 30+ minutes).

### Emergency Relocation Points

Named emergency rally and relocation points are recorded with GPS coordinates, physical address, contact person, contact phone and email, and access instructions. These appear as markers on the trip's interactive map.

### Protection System (Backend)

The Safetrekr Core API implements a comprehensive protection system with **46 dedicated endpoints** that go significantly beyond static emergency preparedness data.

*Source: `safetrekr-core/src/api/v1/routes/protection.py` -- 46 endpoints for managing trip protection resources.*

**Rally Points** -- Full CRUD operations with approval workflows, status management, automatic geofence synchronization, and visibility controls. When a rally point is created or updated, the system automatically creates a corresponding circle geofence around it.

**Safe Houses** -- Full CRUD with approval workflows, type categorization, and automatic geofence creation. Safe house geofences are configured to alert on exit (tracking when people leave safe zones), in contrast to rally point geofences which alert on entry.

**Musters** -- Full CRUD for group assembly events with notes and status management, enabling trip leaders to initiate and track group check-ins.

**Check-ins** -- Full CRUD with type categorization and role-based access, providing a structured record of participant status verification throughout the trip.

**AI-Powered Suggestions** -- An endpoint for AI-powered protection resource suggestions integrates with TarvaRI to recommend appropriate rally points, safe houses, and emergency resources based on trip destination and characteristics.

**Automatic Geofence Synchronization** -- The `geofence_sync` service (`safetrekr-core/src/services/geofence_sync.py`) automatically creates, updates, and deletes geofences when rally points, safe houses, or lodging locations change:
- Rally point geofences: circle type, configurable radius, active only when approved
- Safe house geofences: safe zone type, alert on exit
- Lodging geofences: auto-created safe zones with 400m default radius
- `batch_sync_trip_geofences()` for full trip re-synchronization with GeoJSON coordinate extraction

---

## 7. Real-Time Intelligence and Alerts

> **Status: Implemented** (data-layer integration with TarvaRI)

Safetrekr's intelligence system, powered by the TarvaRI engine, continuously monitors conditions at trip destinations and delivers risk alerts to the people who need them.

### Integration Model

TarvaRI operates as an independent intelligence service that writes alerts into the shared `trip_alerts` Supabase table. Safetrekr reads from this table across all portals. The backend (`safetrekr-core`) has `TARVARI_BASE_URL` and `TARVARI_INTERNAL_KEY` configured for service-to-service communication. The primary data flow is TarvaRI pushing normalized, risk-scored alerts into the shared database rather than Safetrekr pulling from TarvaRI via direct API calls.

*Source: Frontend type system at `safetrekr-app-v2/src/modules/analyst/types/intel-alert.ts`; API layer at `src/shared/api/supabase/analyst-intel.ts` (~599 lines); backend config at `safetrekr-core/src/core/config.py`.*

### Alert Classification

Alerts are classified by severity (critical, high, medium, low) and category (weather, security, health, transport, political), providing immediate context for decision-making. Alert source is inferred: alerts with a `bundle_id` are classified as `tarva_ri` sourced; those without are classified as `analyst_created`.

### Risk Scoring

Each alert carries relevance scoring and risk percentile bands (P5, P50, P95) so safety teams can distinguish between broadly elevated risk and specific, high-confidence threats. Risk scores are stored as `risk_p5`, `risk_p50`, `risk_p95` columns.

### Acknowledgment Workflow

When an alert is delivered, Safetrekr tracks which travelers, chaperones, and administrators have acknowledged it, providing a clear record that the information reached the intended recipients. Alerts are pushed live to the Traveler App, where participants can review details and submit acknowledgments directly from their mobile device.

### Triage Workflow

Analysts review incoming alerts and assign triage status: pending, approved, rejected, or snoozed. Approved alerts are routed with delivery audience targeting and delivery bucket assignment (urgent, AM digest, PM digest, or scheduled).

### Continuous Feed

The Client Portal intel view presents alerts in a continuously updating feed with infinite scroll, severity-based color coding, and status indicators. The Analyst Portal's intel queue provides a parallel view optimized for triage and response. The Traveler App surfaces relevant alerts to trip participants with acknowledgment prompts, closing the loop between intelligence delivery and confirmed awareness.

---

## 8. Independent Safety Review and Approval

> **Status: Implemented**

Safetrekr enforces a separation of duties between trip organizers and safety reviewers. Every trip submitted by an organization passes through an independent analyst review before it can be approved for travel.

### Analyst Review Workspace

The analyst trip review workspace presents 18 review sections, each dedicated to a specific safety dimension:

- **Overview** -- Trip summary and key metrics.
- **Participants** -- Roster verification.
- **Air Travel** -- Flight details review.
- **Lodging** -- Accommodation review with interactive MapLibre map, point-of-interest discovery, and fire safety assessment (floor-level flagging).
- **Venues** -- Venue review with interactive map overlay.
- **Itinerary** -- Day-by-day timeline review.
- **Transportation** -- Ground transport review.
- **Safety Review** -- Safety checklist verification with participant compliance tracking.
- **Emergency Preparedness** -- Full emergency configuration including contacts, services, facilities, evacuation plans, and kit profiles.
- **Documents** -- Document requirement and submission status verification.
- **Background Checks** -- Screening status verification across all participants and check types.
- **Intel Alerts** -- Real-time alert review and acknowledgment workflow.
- **Issues** -- Issue flagging, categorization, and resolution tracking.
- **Evidence & Activity** -- Evidence management and documented audit trail for safety assessments.
- **Checklists** -- Checklist assignment, release timing control, audience targeting, and acknowledgment tracking.
- **Packet Builder** -- Trip packet assembly (see Section 9).
- **Communications** -- Section-level activity tracking (planned; see note below).
- **Approval** -- Final approve, reject, or conditional approval with reason codes.

*Note on Communications: The original document described a "Comms Log" tab with delivery tracking across four channels (email, SMS, push, in-app) and six message categories. Code verification found no implementation of this feature in any of the three codebases. No `comms_log`, `CommsLog`, or similar identifiers exist in the frontend, backend, or mobile app. This feature should be considered planned/future.*

### Evidence and Activity Tracking

The Evidence and Activity tab provides a comprehensive audit trail that captures every meaningful action taken on a trip across all portal users and automated systems. Activity entries are sourced from three origins:

- **Client Actions** -- Organization administrator actions such as trip edits, participant additions, document uploads, and status changes.
- **Analyst Actions** -- Analyst review actions including section completions, issue flagging, checklist assignments, and approval decisions.
- **System Events** -- Automated events such as alert routing, notification delivery, expiration warnings, and status transitions.

The activity log supports both table and list display modes, with search functionality spanning description text, actor name, entity name, and action type. Activity statistics provide aggregate metrics on event volume and frequency, giving analysts a quantitative view of trip engagement and review progress. Filter controls allow analysts to isolate events by source, making it straightforward to review only client-side changes or only system-generated events during a safety assessment. Section-level threaded comments enable structured communication between analysts and, where appropriate, with organization administrators.

### Tiered Assignment

Analyst assignments follow a tiered model matched to trip complexity:

| Analyst Tier | Trip Types | Experience Level |
|---|---|---|
| Tier 1 (Junior) | T1 day trips | Entry-level analysts |
| Tier 2 (Mid-Level) | T2 domestic overnight | Experienced analysts |
| Tier 3 (Senior) | T3 international | Senior analysts |

### Assignment Modes

Trips can be assigned to analysts through three modes: unassigned (awaiting assignment), pool self-claim (analysts claim from a queue), or direct HQ-assigned (operations team assigns a specific analyst).

### Review Queue

The analyst review queue surfaces trips by priority with visibility into tier, assignment mode, and status, enabling analysts to manage their workload effectively.

### Calibration Module

A built-in calibration module provides benchmark trip criteria, consistency checking across analysts, training exercises, and tier override practice to maintain review quality and uniformity across the analyst team.

### Approval Workflow

The approval workflow supports approve, reject, and conditional approval outcomes. Each decision includes reason codes and routes through multi-stage review when required. Analyst assignments are tracked with full audit trails.

---

## 9. Live Traveler Delivery and Trip Packet Generation

> **Status: Implemented**

Safetrekr delivers trip information to participants through two complementary channels: the **Traveler App** for live, interactive access and **trip packets** for offline reference.

### Traveler App (Live Delivery)

The Safetrekr Traveler App is a dedicated native mobile application (Expo SDK 54, React Native) for travelers, chaperones, and guardians. Rather than relying solely on static documents, participants receive live access to:

- **Trip itineraries** -- Day-by-day schedules with real-time updates as changes are made by organizers or analysts.
- **Safety checklists** -- Context-triggered guidance delivered before and during travel, with in-app acknowledgment. Geo-arrival triggers activate checklists when participants enter designated zones.
- **Intelligence alerts** -- Real-time safety alerts pushed to participants with acknowledgment tracking.
- **Emergency preparedness** -- Emergency contacts, local services, medical facilities, evacuation plans, and rally points accessible on-device.
- **Document submission** -- Travelers can submit required documents and consents directly through the app.
- **Alert acknowledgments** -- Two-way confirmation that safety-critical information has been received and reviewed.
- **Geofence monitoring** -- Active geofencing with background location tracking (see Section 9a).
- **SMS emergency broadcast** -- Chaperone-initiated SMS broadcast to all trip participants (see Section 9b).

### 9a. Offline-First Architecture and Geofence Monitoring

> **Status: Implemented** -- Production-grade implementation verified in codebase.

The Traveler App implements a robust **offline-first architecture** ensuring functionality even without network connectivity.

*Source: `native-mobile-app/lib/offline/database.ts`, `queue.ts`, `types.ts`; `native-mobile-app/providers/GeofenceProvider.tsx` (~636 lines); `native-mobile-app/lib/geofencing/` utilities.*

**Offline Data Queue** -- All network requests can be queued locally in SQLite (`safetrekr_offline.db`) when connectivity is unavailable:
- Priority-based queue (high, normal, low) with ordered processing
- Status lifecycle: pending → processing → completed / failed → cancelled
- Idempotency keys prevent duplicate server-side effects
- Configurable max retries with retry count tracking per item
- Automatic sync on network restoration via `startAutoSync()` with `onNetworkAvailable()` callback
- UI indicators: `OfflineStatusBanner` and `QueueStatusBadge` components inform users of offline state and pending sync items

**Active Geofencing** -- The app implements production-grade geofencing that monitors participant locations against trip-defined zones:
- **Geofence types**: Circle geofences (expo-location native) and polygon geofences (JavaScript ray-casting fallback)
- **Geofence categories**: `safe_zone`, `rally_point`, `restricted_area`, `activity_location`
- **Background monitoring**: Registered as an `expo-task-manager` background task (`GEOFENCE_TASK`), enabling monitoring even when the app is backgrounded
- **Transition handling**: Entry/exit events with 60-second debounce cooldown to prevent duplicate triggers
- **iOS optimization**: Priority-based region selection respecting the iOS 20-region hardware limit
- **Spatial math**: Haversine distance calculation, point-in-circle detection, ray-casting point-in-polygon algorithm
- **Role-based features**: Chaperone and guardian roles receive participant status polling — they can see where their travelers are relative to geofence boundaries
- **Violation acknowledgment**: When a participant leaves a safe zone or enters a restricted area, the app surfaces violation alerts requiring acknowledgment
- **Checklist integration**: Geo-arrival triggers fire when a participant enters a designated zone, activating context-appropriate safety checklists (see Section 5)
- **Zone health status**: React Query hook (`useGeofences`) provides real-time containment status and zone health calculations

### 9b. SMS Emergency Broadcast

> **Status: Implemented**

*Source: `native-mobile-app/components/broadcast/SmsBroadcastSection.tsx` (~538 lines); supporting hooks `useBroadcast.ts` and `useParticipantPhones.ts`.*

Chaperones can initiate SMS broadcast messages to trip participants directly from the Traveler App:
- **Recipient groups**: All participants, travelers only, or chaperones only
- **Message composition**: Real-time character counting with SMS segment tracking (160-character standard SMS limit)
- **Native integration**: Uses `expo-sms` (`SMS.sendSMSAsync()`) for direct device-level SMS sending
- **Broadcast history**: Stored locally via AsyncStorage for audit reference
- **Phone collection**: Automatic phone number aggregation from trip participant records
- **Permission handling**: SMS availability detection and permission checking before broadcast

### Trip Packets (Offline Reference)

In addition to live delivery, Safetrekr's packet builder assembles customized trip information packets for offline reference and distribution.

### Role-Based Variants

Packets are generated in role-specific variants: traveler, chaperone, guardian, and administrator. Each variant includes only the information relevant to that role.

### Customizable Assembly

Analysts control which sections appear in each packet variant, with drag-and-drop reordering and section-level previews. Sections can be included or excluded per variant.

### Multi-Role Generation

A single build action can generate packets for all role variants simultaneously, eliminating repetitive manual assembly.

---

## 10. Certification and Training Tracking

> **Status: Implemented**

Safetrekr tracks staff certifications and training credentials to ensure chaperones and trip leaders meet organizational and regulatory requirements.

### Predefined Certification Types

Twelve predefined certification types cover common safety training requirements:

CPR, First Aid, AED, Wilderness First Aid, Lifeguard, EMT, Child Safety, SafeSport, Mental Health First Aid, Epi-Pen Administration, Food Handler, and Driver Safety.

Organizations can also define custom certification types for specialized training programs.

### Expiration Monitoring

Each certification record includes issue date, expiration date, certifying organization, and optional document upload. Safetrekr automatically computes expiration status:

| Status | Condition |
|---|---|
| Valid | More than 90 days until expiration |
| Expiring | Within 90 days of expiration |
| Expiring Soon | Within 30 days of expiration |
| Expired | Past expiration date |

### Warning Banners

Certification warning banners surface on relevant views when team members have expiring or expired credentials, ensuring compliance gaps are visible before a trip is approved.

### Expiring Certifications Widget

A dedicated widget surfaces certifications approaching expiration with user name, certification type, expiration date, and days remaining -- enabling proactive renewal.

---

## 11. Insurance Policy Management

> **Status: Implemented**

Safetrekr provides structured insurance policy tracking at the trip level, ensuring coverage documentation is centralized and reviewable.

### Coverage Types

Nine standard coverage types are supported: Medical, Emergency Evacuation, Trip Cancellation, Trip Interruption, Baggage Loss, Liability, Rental Car, Adventure Sports, and Other.

### Policy Records

Each policy record captures provider name and contact information, policy number, coverage types, coverage limits and deductibles (with currency), effective dates, and notes.

### Document Attachment

Insurance policy documents (certificates, cards, coverage summaries) can be uploaded and attached directly to policy records with file metadata and checksums.

### Expiration Tracking

Policy expiration status is computed automatically (valid, expiring soon, expired) with days-until-expiration calculations and trip-level insurance status summaries.

---

## 12. Billing and Payments

> **Status: Implemented**

### Tiered Trip Pricing

Safetrekr uses a per-trip pricing model scaled to trip complexity:

| Trip Type | Description | Base Price |
|---|---|---|
| T1 | Day trip | $450 |
| T2 | Domestic overnight | $750 |
| T3 | International | $1,250 |

*Pricing reflects current application defaults and is subject to change.*

### Add-On Services

Optional add-on services are priced per unit:

- Background Checks: $35 per check
- Travel Insurance: $25 per participant

### Payment Processing

Payments are processed through Stripe with support for saved payment methods, credit card input, and receipt generation. Transaction history and receipt URLs are available in the trip detail view.

### Credit System

Organizations can purchase credit packages for volume pricing. Credit balances are tracked at the organization level and applied to trip purchases.

### First-Trip Payment Flow

A dedicated first-trip payment modal guides new organizations through their initial payment setup, reducing friction in the onboarding process.

---

## 13. Team and Organization Management

> **Status: Implemented**

### Team Invitations and Roles

Organization administrators can invite team members and assign portal-level roles:

- **Org Admin** -- Full access to trip creation, management, and settings.
- **Billing Admin** -- Access to billing, payments, and credit management.
- **Security Officer** -- Access to background checks and safety review features.

Team members can be edited, reassigned, or removed as organizational needs change.

### Organization Settings

Comprehensive organization configuration includes:

- **Branding** -- Organization name and logo.
- **Legal Documents** -- Organization-specific legal agreements.
- **Locale and Timezone** -- Regional formatting preferences.
- **Privacy Policy** -- Organization privacy policy.
- **Notification Preferences** -- Communication frequency and channel settings.
- **Trip Defaults** -- Default chaperone-to-traveler ratios and other trip planning defaults.
- **Signature Upload** -- Authorized signature for trip packets and official documents.

#### Branding and Customization

Beyond basic name and logo, organizations can fully customize their branded presence within the platform. Brand color customization ensures trip packets and exported documents reflect the organization's visual identity. Trip packet watermarks with adjustable opacity provide an additional layer of branding on all generated materials. Organizations can also set custom cover titles and subtitles for packet covers, and configure a security hotline phone number that appears in safety-critical communications and packet materials.

#### Trip Defaults and Templates

Organization-level trip defaults reduce repetitive configuration by establishing baseline settings that apply to every new trip:

- **Emergency Response Targets** -- Configurable emergency response time targets for ER and other response metrics, establishing the safety baseline for analyst review.
- **Lodging Policy Defaults** -- Floor policies (maximum allowable floor for room assignments), night arrival rules, and international travel addendums that pre-populate during trip creation.
- **Required Traveler Data Fields** -- Organization-wide requirements for medical alerts, medical notes, passport documentation, and permission slip collection, ensuring consistent data capture across all trips.
- **Chaperone Policies** -- Default chaperone-to-traveler ratio requirements and background check policies that enforce organizational standards.
- **Packet Template Packs** -- Pre-configured packet templates for common trip types (US cities, international cities) that accelerate packet assembly.
- **Packet Section Defaults** -- Configurable default section inclusion for trip packets, allowing organizations to establish which sections are included by default for each packet variant.
- **Map Display Defaults** -- Default map style, unit system, and region settings that align with the organization's geographic focus.

### User Profile and Security

Individual users manage their own profile, password, two-factor authentication, and registered security devices.

### User Settings and Preferences

Each user has access to a comprehensive settings panel that governs how they interact with the platform across all portals.

#### Notification Preferences

Users configure notification delivery across four channels -- email, SMS, in-app, and push -- with granular control over which events trigger notifications on each channel. The event-based notification matrix covers:

- **Assignment Notifications** -- Alerts when the user is assigned to a trip, review, or task.
- **Form Completion** -- Notifications when participants complete required forms or document submissions.
- **Packet Ready** -- Alerts when a trip packet has been generated and is available for download.
- **Analyst Comments** -- Notifications when an analyst posts a comment or note on a trip the user is associated with.
- **Brief Postings** -- Alerts when new daily briefings or safety guidance checklists are published.
- **Critical Alerts** -- High-priority intelligence and safety alerts requiring immediate attention.

A Quiet Hours / Do Not Disturb mode allows users to suppress non-critical notifications during designated time windows, with a critical alert bypass that ensures safety-critical communications are never silenced.

#### Locale and Accessibility Settings

Users can tailor the platform's display and formatting to match their regional and personal preferences:

- **Timezone** -- Selection from common timezones covering North America, Europe, Asia, and Oceania, ensuring all dates and times display in the user's local context.
- **Date Format** -- Choice of MDY (Month/Day/Year), DMY (Day/Month/Year), or YMD (Year/Month/Day) formatting.
- **Time Format** -- 12-hour or 24-hour clock display.
- **Unit System** -- Imperial or metric measurement units for distances and related calculations.
- **Language** -- Interface language preference supporting English, Spanish, French, German, Portuguese, Chinese, and Japanese. The interface is currently delivered in English; additional language support is planned.
- **Accessibility Options** -- Reduce motion (minimizes animations), high contrast mode (enhances visual distinction for users with low vision), and large text mode for improved readability.

#### Digital Signatures

Users can create and store digital signatures for use across trip packets and official documents. Two capture methods are supported: typed signatures that render the user's name in a signature-style format, and hand-drawn signatures using a canvas-based drawing interface. Stored signatures are automatically applied to trip packets and other platform documents requiring authorization.

#### Privacy and Data Governance

Safetrekr provides users with direct control over their personal data and privacy settings:

- **Contact Visibility** -- Granular controls to show or hide phone number and email address from teammates, ensuring users share only the contact information they are comfortable making visible.
- **Analytics Opt-In/Out** -- Users can choose whether their usage data is included in platform analytics.
- **Marketing Preferences** -- Independent control over marketing email subscriptions.
- **Data Export** -- GDPR-compliant full data export capability, enabling users to download a complete copy of all personal data held by the platform for data portability purposes. *Note: The settings UI form is implemented; full backend data extraction pipeline integration is in progress.*
- **Account Deletion** -- User-initiated account deletion with a 30-day grace period, during which the account can be recovered before permanent removal.
- **Consent History** -- A timestamped record of all consent actions (granted, revoked, updated) providing a transparent audit trail of the user's privacy decisions.

### Onboarding

New users follow a guided onboarding flow: account activation via invite link, account setup, legal agreement acceptance, and completion confirmation.

---

## 14. Operational Command Center (HQ Console)

The HQ Console gives Safetrekr's internal operations team full visibility and control over the platform ecosystem.

*Implementation status verified against `safetrekr-app-v2/src/app/hq/` routes and `src/modules/hq/components/`. Modules are classified as Implemented (functional components with data fetching) or Scaffolded (route exists with "coming soon" placeholder page).*

### System Overview Dashboard

> **Status: Implemented**

- **KPI Cards** -- Total organizations, active organizations, total trips, active trips, open reviews, and incidents.
- **System Health Monitoring** -- Real-time status of Core API, TarvaRI intelligence engine, and Supabase database.
- **Onboarding Pipeline** -- Visibility into organizations moving through the activation funnel.

### Organization Management

> **Status: Implemented**

Full CRUD management of organizations across all five verticals (K-12, College, Church, Youth Sports, Business) with status tracking (active, suspended, trial), plan management (free, standard, enterprise), payment status visibility, credit balance tracking, and aggregate trip and user counts.

### User Management

> **Status: Implemented**

Cross-organization user administration supporting all 10 role types, analyst tier assignment (Tier 1-3), maximum trip load configuration per analyst, last login tracking, invitation and activation management, suspension and deactivation, and role reassignment.

### Analyst Roster

> **Status: Implemented**

The HQ Console includes a dedicated analyst roster view that provides operations staff with a centralized picture of the analyst workforce. The roster displays all analysts with their current status (active, assigned, or available), enabling quick identification of analysts ready to accept new trip assignments. Workload tracking surfaces per-analyst metrics including total trips assigned and in-progress review counts. Search and filter controls allow operations staff to locate analysts by status, activity level, and assignment history. Performance metrics per analyst support workload balancing decisions and help identify analysts who may need additional support or who are ready for tier advancement.

### Queue Management

> **Status: Implemented**

Centralized review queue control with tiered queue overview, assignment mode management, tier override capability with documented reason codes (high-risk destination, complex itinerary, special requirements, expedited review, training exercise, VIP organization), pool management, and workload balancing.

### Analyst Workload Dashboard

> **Status: Implemented**

Per-analyst workload metrics: claimed, directly assigned, in-progress, and completed trip counts with average review time, tier display, and workload balancing tools.

### Checklist Template Library

> **Status: Implemented**

Global checklist template management across eight categories (pre-departure, cyber safety, general awareness, location fallbacks, lodging safety, banking and currency, OPSEC, and daily briefing) with video content, product recommendation links, audience targeting, and priority configuration.

### Policy Management

> **Status: Implemented**

Policy templates with versioning, activation/deactivation controls, and organization assignment.

### Feature Flags

> **Status: Implemented**

Global feature flags with organization-specific overrides for controlled feature rollouts.

### Finance

> **Status: Implemented**

The Finance module provides a three-tab interface for comprehensive financial operations:

- **Orders** -- Credit purchases, subscription management, and add-on service orders with status tracking, failed payment detection, and refund processing. Each order record captures the purchase type, amount, organization, and payment status.
- **Wallets** -- Organization credit balances and usage history. Operations staff can view current balances, track credit consumption against trip purchases, and manage credit allocations across organizations.
- **Invoices** -- Billing document management including invoice generation, delivery tracking, and historical invoice records for accounting and audit purposes.

#### Payment Processing

Beyond standard Stripe-based card processing, the HQ Console supports manual payment methods for organizations that require them:

- **Check and Wire Transfer Processing** -- Operations staff can record and process payments received via check or wire transfer, linking them to the corresponding organization and order.
- **Payment Rejection** -- A structured rejection workflow allows staff to decline payments with documented reasons and notes, maintaining a clear audit trail of rejected transactions.
- **Multi-Step Confirmation** -- Payment processing follows a multi-step confirmation workflow to prevent accidental approvals or rejections.
- **Payment Aging Metrics** -- The finance dashboard tracks payment aging, surfacing the oldest pending payments to ensure timely processing and follow-up on outstanding balances.

### System Status

> **Status: Implemented**

System health monitoring dashboard for Core API, TarvaRI, and Supabase service status.

### Settings

> **Status: Implemented**

HQ-level platform configuration and administrative settings.

### Scaffolded HQ Modules (Route Exists, Pending Implementation)

The following HQ modules have route definitions and placeholder pages but no functional implementation. Each follows an identical pattern: `<PageHeader>` followed by "coming soon" content.

| Module | Route | Description |
|---|---|---|
| **Audit** | `/hq/audit` | Complete audit trail of system actions with filtering and search |
| **Communications** | `/hq/communications` | System-wide notification and announcement distribution |
| **Incidents** | `/hq/incidents` | Dedicated incident tracking for safety events requiring operational response |
| **Integrations** | `/hq/integrations` | Webhook management and third-party service configuration |
| **Security** | `/hq/security` | IP whitelisting, API key management, and access policy configuration |
| **Intel Sources** | `/hq/intel-sources` | Intelligence source management |
| **Intel Config** | `/hq/intel-config` | Alert policy definition and configuration |
| **Intel Metrics** | `/hq/intel-metrics` | Intelligence performance metrics and dashboards |
| **Intel Policies** | `/hq/intel-policies` | Triage rule configuration and risk scoring thresholds |
| **Intel Triage** | `/hq/intel-triage` | Intelligence triage rule management |

---

## 15. Platform-Wide Capabilities

### Role-Based Access Control

> **Status: Implemented**

Ten system-level roles with ascending privilege levels control access across the platform:

| Role | Portal | Description |
|---|---|---|
| Traveler | Client | Trip participant |
| Chaperone | Client | Adult supervisor |
| Org Admin | Client | Organization administrator |
| Billing Admin | Client | Financial management |
| Security Officer | Client | Safety and compliance |
| Analyst | Analyst | Independent safety reviewer |
| HQ Admin | HQ | Safetrekr operations |
| HQ Supervisor | HQ | Operations management |
| HQ Security | HQ | Platform security |
| HQ Ops | HQ | Day-to-day operations |

*Source: `safetrekr-core/src/db/models.py` defines the canonical `UserRole` enum with exactly these 10 values.*

Portal routing is automatic: users are directed to the appropriate portal based on their role upon login.

*Note: The frontend additionally defines participant-scoped roles (`guardian`, `chaperone_admin`) in `safetrekr-app-v2/src/types/participant-roles.ts` and `team-member.ts`. These are trip-level participant roles used for audience targeting and permission scoping, not system-level identity roles.*

### Authentication and Session Management

- Email/password authentication with JWT session tokens.
- Automatic token refresh for seamless session continuity.
- Invite-based account activation for new users.
- Password reset flow.
- Two-factor authentication support.
- Guided onboarding wizard for first-time users.

### Interactive Maps

MapLibre GL-powered interactive maps appear throughout the platform for lodging location visualization, venue mapping, emergency rally and relocation point plotting, point-of-interest discovery during analyst review, and medical facility proximity assessment.

### Advanced Data Grids

AG-Grid-powered data tables provide sortable and filterable views across all list-based interfaces, with custom cell renderers for status badges, role indicators, and action buttons. Bulk actions and export capabilities support high-volume workflows.

### Safety Review Checklist (Client-Side)

Organization administrators have their own safety verification checklist with categorized items, completion tracking, and participant compliance feeds. Categories support both manual checkbox checklists and auto-populated participant compliance views that aggregate registration status, document compliance, medical information completeness, and guardian consent (for minors).

### Dark and Light Theme

A system-aware theme with manual override provides comfortable viewing in any lighting condition, powered by CSS variable design tokens.

### Real-Time Data Subscriptions

Safetrekr uses Supabase Realtime subscriptions to deliver live data updates in the Analyst Portal, with TanStack Query cache invalidation ensuring data freshness across all three portals:

- **Review Queue Live Updates** -- New trip submissions and status transitions surface in the analyst review queue in real time, ensuring analysts always see the current queue state.
- **Intel Queue Live Updates** -- New intelligence alerts from the TarvaRI engine appear in the analyst intel queue as they are routed, enabling immediate triage without polling or manual refresh.
- **Analyst Dashboard Live Updates** -- Combined subscriptions for review queue changes, intel alert routing, and analyst activity feed updates keep the analyst dashboard current.
- **Automatic Cache Invalidation** -- Database change events trigger automatic TanStack Query cache invalidation, ensuring all connected clients see consistent, current information without manual page refresh.

This real-time infrastructure enables safety analysts and HQ operations staff to work concurrently on trip data with confidence that their views reflect the latest state of the system. Client Portal views rely on automatic refetch-on-focus and configurable stale-time mechanisms for data freshness.

### Automated Monitoring and Alerts (Planned)

Safetrekr is architected to run automated daily monitoring checks that surface expiring compliance records before they become safety gaps. Expiration status computation is implemented in the UI (see Section 10 and Section 11); the automated notification delivery pipeline described below is planned.

#### Insurance Policy Expiration Alerts

The platform performs daily automated scans of all active insurance policies, generating advance warning notifications at 90, 60, and 30 days before policy expiration. Alerts are delivered automatically to organization administrators and policy holders, ensuring ample time for renewal. Policies that have already expired trigger immediate notification. A built-in deduplication system prevents repeated notifications for the same expiration event, keeping inboxes clean while maintaining compliance visibility.

#### Certification Expiration Alerts

A parallel daily scan monitors all staff certifications across the platform, generating advance warnings at 90, 60, and 30 days before a certification expires. Notifications are sent to both the certificate holder and their organization's administrators, supporting proactive renewal. The system handles all predefined and custom certification types with the same monitoring rigor. Deduplication logic ensures each expiration event generates only a single notification per warning threshold, preventing alert fatigue.

### Help Center

An integrated help center provides a structured knowledge base with full-text search across all help content. Help topics are organized into visual categories with iconography for easy navigation. Four content types address different user needs:

- **Getting Started** -- Onboarding guides that walk new users through initial platform setup and core workflows.
- **How-To Articles** -- Step-by-step instructions for specific tasks and features, with deep-linked topics for contextual access.
- **Glossary** -- Definitions of Safetrekr-specific terminology, trip tiers, roles, and safety concepts.
- **Troubleshooting** -- Diagnostic guides for common issues and resolution steps.

---

## 16. Integrations and Technical Architecture

### External Service Integrations

| Integration | Purpose |
|---|---|
| **Supabase** | Cloud-hosted PostgreSQL database with Row Level Security, authentication, and file storage. Serves as the shared data layer across all services. |
| **Stripe** | Payment processing for trip purchases, credit packages, and add-on services. Supports saved payment methods and receipt generation. |
| **AviationStack** | Real-time flight data lookup by flight number, auto-populating airline, airport, terminal, and gate information during trip creation. |
| **TarvaRI** | Safetrekr's proprietary intelligence aggregation engine. Ingests data from multiple intelligence sources, normalizes and bundles alerts, applies risk scoring with percentile bands, and routes alerts to affected trips. Integration is data-layer: TarvaRI writes to the shared `trip_alerts` Supabase table; all portals read from it. Backend has service URL and internal key configured for direct communication. |
| **MapLibre GL** | Open-source map rendering for interactive lodging, venue, rally point, and emergency facility visualization. |
| **Checkr / Sterling / GoodHire** | Background check provider integrations for criminal, sex offender, driving, employment, and education screening. |
| **expo-location** | Native geofencing on mobile devices with background monitoring via expo-task-manager. Supports circle geofences natively; polygon geofences via JavaScript ray-casting fallback. |
| **expo-sms** | Native SMS composition for emergency broadcast functionality in the Traveler App. |
| **expo-sqlite** | Local SQLite database for offline action queue, enabling offline-first architecture in the Traveler App. |

### Architecture Highlights

- **Four-Portal Architecture** -- Client, Analyst, HQ, and Traveler portals enforce strict role-based separation of concerns. The Client, Analyst, and HQ portals share a common Next.js 16 codebase and design system (`safetrekr-app-v2`). The Traveler App (`native-mobile-app`) is a dedicated Expo SDK 54 React Native application optimized for trip participants with offline-first capabilities.
- **Tiered Trip Complexity** -- T1/T2/T3 tiers progressively unlock features, keeping the interface clean for simple trips while providing full capability for complex international travel.
- **Row Level Security (RLS)** -- Supabase RLS policies enforce data isolation at the database level, ensuring organizations can only access their own data regardless of application-layer logic.
- **Real-Time Data Subscriptions** -- Supabase Realtime subscriptions with TanStack Query cache invalidation provide live data updates across the Analyst Portal (see Section 15 for details).
- **Runtime Configuration** -- Environment variables are injected at runtime (not build time), enabling the same build artifact to serve development, staging, and production environments.
- **Containerized Deployment** -- Docker builds deploy to Kubernetes via CI/CD with separate development and production environments.
- **Audit Trail** -- All review actions, status changes, and administrative operations are logged with timestamps, user attribution, and contextual metadata.
- **Progressive Web App (PWA)** -- The platform supports Progressive Web App installation with a web manifest and Android-optimized icons (192x192 and 512x512), enabling users to add Safetrekr to their device home screens for a native-like experience with faster access and offline-capable shell loading.
- **Offline-First Mobile** -- The Traveler App uses SQLite-backed request queuing with priority levels, idempotency keys, and automatic sync-on-reconnect, ensuring participants can interact with trip data even without network connectivity.
- **46-Endpoint Protection API** -- The backend protection system (`safetrekr-core/src/api/v1/routes/protection.py`) implements 46 endpoints covering rally points, safe houses, musters, check-ins, and AI-powered suggestions with automatic geofence synchronization.
- **Background Geofencing** -- The mobile app registers an expo-task-manager background task for continuous geofence monitoring, with automatic transition logging, violation detection, and checklist activation.

### Data Flow

```
Organization Admin (Client Portal)
        |
        v
Trip Creation --> Supabase (PostgreSQL + RLS)
                        |
                        v
               Safetrekr Core API (FastAPI, 50+ endpoints)
                  |              |
                  v              v
    Protection System      Checklist Service
    (46 endpoints)         (time + geo triggers)
                  |              |
                  v              v
Safety Analyst (Analyst Portal) <-- TarvaRI Intelligence Engine
        |                                    ^
        v                                    |
Trip Approval                    Intel Sources (weather, security,
        |                        health, transport, political)
        v                                    |
  ┌─────────────────────────────────────┐    v
  │  Traveler App (Native Mobile)       │  trip_alerts table
  │  • Offline-first SQLite queue       │  (shared data layer)
  │  • Background geofence monitoring   │
  │  • Geo-triggered checklist delivery │
  │  • Real-time intel alerts           │
  │  • SMS emergency broadcast          │
  │  • Itineraries & schedules          │
  │  • Emergency preparedness           │
  │  • Document submission              │
  ├─────────────────────────────────────┤
  │  Trip Packets (Offline Reference)   │
  │  • Role-based PDF packets           │
  └─────────────────────────────────────┘
        |
        v
  Travelers, Chaperones, Guardians
```

Intelligence alerts flow through a multi-stage pipeline: raw data ingestion from external sources, normalization, bundling, risk-scored triage, and routing to affected trips -- surfacing in the Client Portal's intel view, the Analyst Portal's intel queue, and the Traveler App for participant acknowledgment.

Protection resources (rally points, safe houses) automatically synchronize with the geofencing system, creating monitored zones that the Traveler App tracks in real time. When participants cross geofence boundaries, the system can activate context-appropriate safety checklists and surface violation alerts to chaperones and guardians.

---

## Appendix: Implementation Status Summary

| Section | Feature Area | Status |
|---|---|---|
| 1 | Trip Planning (10-step wizard, detail view, dashboard) | **Implemented** |
| 2 | Traveler & Roster Management | **Implemented** |
| 3 | Background Checks & Screening | **Implemented** |
| 4 | Document & Consent Collection | **Implemented** |
| 5 | Safety Guidance & Checklists (including smart triggers) | **Implemented** |
| 6 | Emergency Preparedness & Protection System (46 endpoints) | **Implemented** |
| 7 | Real-Time Intelligence (TarvaRI data-layer integration) | **Implemented** |
| 8 | Independent Safety Review & Approval | **Implemented** |
| 8 | Communications Log (cross-channel delivery tracking) | **Not implemented** — no code exists in any codebase |
| 9 | Traveler App (live delivery) | **Implemented** |
| 9a | Offline-first architecture & geofence monitoring | **Implemented** |
| 9b | SMS emergency broadcast | **Implemented** |
| 9 | Trip packets (offline reference) | **Implemented** |
| 10 | Certification tracking (UI computation) | **Implemented** |
| 10 | Certification expiration auto-alerts | **Planned** |
| 11 | Insurance policy tracking (UI computation) | **Implemented** |
| 11 | Insurance expiration auto-alerts | **Planned** |
| 12 | Billing & Payments (Stripe) | **Implemented** |
| 13 | Team & Organization Management | **Implemented** |
| 13 | GDPR data export (backend pipeline) | **UI implemented**, backend in progress |
| 13 | Multi-language interface | **UI implemented** (English only), localization planned |
| 14 | HQ Console — 11 core modules | **Implemented** |
| 14 | HQ Console — 10 planned modules | **Scaffolded** (route + placeholder only) |
| 15 | RBAC (10 system roles) | **Implemented** |
| 15 | Real-time subscriptions | **Implemented** |
| 15 | Automated monitoring alerts | **Planned** |
| 16 | Four-portal architecture | **Implemented** |

---

*This document reflects the Safetrekr platform capabilities as verified against the v2 codebases (`safetrekr-app-v2`, `safetrekr-core`, `native-mobile-app`) in March 2026. Implementation status annotations are based on code-level verification: "Implemented" means functional code with business logic exists; "Scaffolded" means a route/page exists with placeholder content; "Planned" means the feature is described in product documentation but has no corresponding code. The Comms Log feature described in the original document was removed as no implementation exists in any codebase. The interface is currently delivered in English. Pricing figures reflect current application defaults and are subject to change. Feature availability may vary by organization plan and trip tier.*
