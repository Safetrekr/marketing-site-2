// src/lib/data/how-it-works.ts

import type {
  Phase,
  WizardStep,
  ReviewDimension,
  ProtectionFeature,
  MonitorFeature,
  HowItWorksCta,
} from '@/lib/interfaces/how-it-works'

// ---------------------------------------------------------------------------
// SEO
// ---------------------------------------------------------------------------

export const HOW_IT_WORKS_SEO = {
  title: 'How Safetrekr Works -- Plan, Review, Protect, Monitor',
  description:
    'Four phases cover the full trip lifecycle. Independent analyst review across 18 dimensions. 46-endpoint protection system. Geo-triggered traveler delivery. See how Safetrekr documents every safeguard.',
  canonical: '/how-it-works',
} as const

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const HERO = {
  h1: 'From trip planning to traveler protection. One system of record.',
  h2: 'Safetrekr replaces scattered spreadsheets, email chains, and paper checklists with a verified, auditable safety platform that covers every stage of the trip lifecycle.',
} as const

// ---------------------------------------------------------------------------
// Problem Statement
// ---------------------------------------------------------------------------

export const PROBLEM_STATEMENT = {
  intro: 'Spreadsheets. Email chains. Paper checklists. Hope.',
  body: 'That is how most organizations manage trip safety today. It works -- until it does not. Until a background check expires and nobody notices. Until an emergency contact form is missing and nobody follows up. Until someone asks: "Did you do everything you could?"',
  close: 'Safetrekr replaces hope with a system.',
} as const

// ---------------------------------------------------------------------------
// Phases
// ---------------------------------------------------------------------------

export const PHASES: Phase[] = [
  {
    id: 'plan',
    number: 1,
    label: 'Plan',
    iconName: 'ClipboardList',
    heading: 'Plan with structure, not spreadsheets.',
    body: "Safetrekr's 10-step trip creation wizard walks administrators through every detail a safety reviewer needs -- from basic logistics to emergency preparedness. The wizard enforces completeness at each stage, reducing back-and-forth between trip organizers and safety teams.",
    supportingStatement:
      'Every trip starts as a draft and moves through a clear lifecycle: draft, in review, active, in progress, completed. Nothing falls through the cracks because the system enforces the process.',
  },
  {
    id: 'review',
    number: 2,
    label: 'Review',
    iconName: 'ShieldCheck',
    heading: 'Verify with independence, not assumption.',
    body: 'This is what makes Safetrekr fundamentally different. Every trip submitted by an organization passes through an independent analyst review before it can be approved for travel. The analyst is not part of the trip planning team. They are a separate pair of eyes -- enforced by the platform, not by policy.',
    supportingStatement:
      "Analysts are assigned by tier: junior analysts review day trips, mid-level analysts handle domestic overnight travel, senior analysts cover international trips. Each analyst's workload is tracked, and every review decision is timestamped and attributed.",
    objectionHook:
      '"We already have a safety review process." -- Safetrekr does not replace your process. It documents and standardizes it, adds independent verification, and creates the audit trail that proves it happened.',
  },
  {
    id: 'protect',
    number: 3,
    label: 'Protect',
    iconName: 'Shield',
    heading: 'Protect with systems, not checklists on a shelf.',
    body: "Safetrekr's protection system goes beyond static emergency preparedness data. A 46-endpoint API manages rally points, safe houses, musters, check-ins, and evacuation plans -- all connected to active geofencing on travelers' devices.",
    supportingStatement:
      'Emergency preparedness is not a binder on a shelf. It is an active, connected system that knows where your travelers are and what threats are nearby.',
  },
  {
    id: 'monitor',
    number: 4,
    label: 'Monitor',
    iconName: 'Radio',
    heading: 'Deliver to every traveler. Document every interaction.',
    body: "The Safetrekr Traveler App puts safety information directly in participants' hands -- with proof that it was received.",
    supportingStatement:
      'When a parent asks whether their child received the safety briefing, the answer is not "we sent an email." The answer is: "They acknowledged it on their phone at 3:47 PM on Tuesday. Here is the record."',
  },
]

// ---------------------------------------------------------------------------
// Wizard Steps (Phase 1)
// ---------------------------------------------------------------------------

export const WIZARD_STEPS: WizardStep[] = [
  {
    number: 1,
    name: 'Trip Type Selection',
    description:
      'Choose the complexity tier: T1 (day trip), T2 (domestic overnight), or T3 (international). The selected tier determines which safety requirements apply.',
  },
  {
    number: 2,
    name: 'Basic Information',
    description:
      'Trip name, destination, travel dates, departure city, purpose, rally point, and point of contact.',
  },
  {
    number: 3,
    name: 'Participants',
    description:
      'Add travelers, chaperones, and guardians individually or in bulk. CSV and Excel import with intelligent field matching and automatic deduplication.',
  },
  {
    number: 4,
    name: 'Air Travel',
    description:
      'Flight details with built-in flight lookup that auto-populates airline, airport, terminal, and gate from a flight number.',
  },
  {
    number: 5,
    name: 'Lodging',
    description:
      'Accommodations with check-in/check-out dates, floor assignments, and contact information. Automatic fire safety flagging for rooms above the sixth floor.',
  },
  {
    number: 6,
    name: 'Venues',
    description:
      'Every venue catalogued by category: museum, historical site, educational facility, sports venue, entertainment venue, restaurant, park, or other.',
  },
  {
    number: 7,
    name: 'Itinerary',
    description:
      'Day-by-day event schedule with times and locations. Events from flights, lodging, and venues are auto-populated.',
  },
  {
    number: 8,
    name: 'Transportation',
    description:
      'Ground transportation modes between events: walking, public transit, rideshare, charter bus, or private vehicles.',
  },
  {
    number: 9,
    name: 'Add-Ons',
    description:
      'Optional services including background check packages, travel insurance, and accessibility or dietary tracking. Pricing calculated in real time.',
  },
  {
    number: 10,
    name: 'Review',
    description:
      'Final summary of every detail for confirmation before submission to safety review.',
  },
]

// ---------------------------------------------------------------------------
// Review Dimensions (Phase 2 -- CENTERPIECE)
// ---------------------------------------------------------------------------

export const REVIEW_DIMENSIONS_HEADER = {
  subheading: '18 review dimensions. One independent analyst.',
} as const

export const REVIEW_DIMENSIONS: ReviewDimension[] = [
  { number: 1, name: 'Overview', description: 'Trip summary and key metrics' },
  { number: 2, name: 'Participants', description: 'Roster verification' },
  { number: 3, name: 'Air Travel', description: 'Flight details review' },
  {
    number: 4,
    name: 'Lodging',
    description:
      'Accommodation review with interactive map and fire safety assessment',
  },
  { number: 5, name: 'Venues', description: 'Venue review with map overlay' },
  { number: 6, name: 'Itinerary', description: 'Day-by-day timeline review' },
  {
    number: 7,
    name: 'Transportation',
    description: 'Ground transport review',
  },
  {
    number: 8,
    name: 'Safety Review',
    description:
      'Safety checklist verification with participant compliance tracking',
  },
  {
    number: 9,
    name: 'Emergency Preparedness',
    description:
      'Contacts, services, facilities, evacuation plans, and kit profiles',
  },
  {
    number: 10,
    name: 'Documents',
    description: 'Document requirement and submission status verification',
  },
  {
    number: 11,
    name: 'Background Checks',
    description:
      'Screening status verification across all participants and check types',
  },
  {
    number: 12,
    name: 'Intel Alerts',
    description: 'Real-time alert review and acknowledgment workflow',
  },
  {
    number: 13,
    name: 'Issues',
    description: 'Issue flagging, categorization, and resolution tracking',
  },
  {
    number: 14,
    name: 'Evidence and Activity',
    description: 'Evidence management and documented audit trail',
  },
  {
    number: 15,
    name: 'Checklists',
    description:
      'Assignment, release timing, audience targeting, and acknowledgment tracking',
  },
  {
    number: 16,
    name: 'Packet Builder',
    description: 'Trip packet assembly for role-based distribution',
  },
  {
    number: 17,
    name: 'Communications',
    description: 'Activity tracking',
  },
  {
    number: 18,
    name: 'Approval',
    description:
      'Final approve, reject, or conditional approval with documented reason codes',
  },
]

// ---------------------------------------------------------------------------
// Protection Features (Phase 3)
// ---------------------------------------------------------------------------

export const PROTECTION_FEATURES: ProtectionFeature[] = [
  {
    id: 'rally-points',
    name: 'Rally Points',
    description:
      'Designated assembly locations with GPS coordinates, contact information, and automatic geofence creation. Geofences alert on entry.',
    iconName: 'MapPin',
  },
  {
    id: 'safe-houses',
    name: 'Safe Houses',
    description:
      'Vetted safe locations with approval workflows and automatic geofence creation. Geofences alert on exit -- tracking when travelers leave safe zones.',
    iconName: 'Home',
  },
  {
    id: 'evacuation-plans',
    name: 'Evacuation Plans',
    description:
      'Three escalation tiers: shelter in place, local evacuation, and full relocation. Each with designated decision-makers and transport protocols.',
    iconName: 'Route',
  },
  {
    id: 'medical-facilities',
    name: 'Medical Facility Directory',
    description:
      'Nearby facilities catalogued with trauma capability levels (Level I through Level V), estimated travel times, and primary/backup designation.',
    iconName: 'Hospital',
  },
  {
    id: 'emergency-kits',
    name: 'Emergency Kit Profiles',
    description:
      'Recommended medical kit configurations based on group composition, environment type, and expected emergency response times.',
    iconName: 'BriefcaseMedical',
  },
  {
    id: 'real-time-intel',
    name: 'Real-Time Intelligence',
    description:
      'TarvaRI intelligence engine monitors destinations for security, weather, health, transport, and political risks. Alerts are risk-scored with percentile confidence bands and analyst-triaged before delivery.',
    iconName: 'Radar',
  },
]

// ---------------------------------------------------------------------------
// Monitor Features (Phase 4)
// ---------------------------------------------------------------------------

export const MONITOR_FEATURES: MonitorFeature[] = [
  {
    id: 'live-delivery',
    name: 'Live Trip Delivery',
    description:
      'Itineraries, safety checklists, intelligence alerts, and emergency preparedness information delivered to a native mobile app.',
    iconName: 'Smartphone',
  },
  {
    id: 'offline-first',
    name: 'Offline-First Architecture',
    description:
      'All critical trip data cached locally in SQLite. Travelers can access safety information even without network connectivity.',
    iconName: 'WifiOff',
  },
  {
    id: 'geo-checklists',
    name: 'Geo-Triggered Checklists',
    description:
      'Context-appropriate safety guidance activated when participants enter designated zones. Pre-departure checklists triggered by date.',
    iconName: 'MapPinCheck',
  },
  {
    id: 'acknowledgment',
    name: 'Alert Acknowledgment',
    description:
      'Two-way confirmation that safety-critical information has been received and reviewed. Every acknowledgment recorded.',
    iconName: 'CheckCheck',
  },
  {
    id: 'geofence-monitoring',
    name: 'Geofence Monitoring',
    description:
      'Background location monitoring against trip-defined zones. Violation alerts surface to chaperones and guardians when travelers leave safe zones.',
    iconName: 'Radar',
  },
  {
    id: 'sms-broadcast',
    name: 'SMS Emergency Broadcast',
    description:
      'Chaperones can send SMS broadcast messages to all trip participants directly from the app.',
    iconName: 'MessageSquareWarning',
  },
]

// ---------------------------------------------------------------------------
// Documentation Closing
// ---------------------------------------------------------------------------

export const DOCUMENTATION_CLOSING = {
  heading: 'Document everything. Prove everything.',
  body: [
    'Every action in Safetrekr is logged: trip creation, participant additions, document submissions, analyst reviews, approval decisions, alert deliveries, checklist acknowledgments. The audit trail captures who did what, when, and why.',
    'When stakeholders ask questions -- when a superintendent, a board member, an insurance provider, or a parent asks what safeguards were in place -- you have answers. Timestamped, attributed, and complete.',
  ],
} as const

// ---------------------------------------------------------------------------
// Bottom CTA
// ---------------------------------------------------------------------------

export const BOTTOM_CTA: HowItWorksCta = {
  headline: 'Your travelers trust you to bring them home safely.',
  body: 'Safetrekr makes sure that trust is backed by a system -- not just good intentions.',
  primaryLabel: 'Schedule a Briefing',
  primaryHref: '/contact',
  primaryMicrocopy: '20 minutes. No obligation.',
  secondaryLabel: 'Download the Platform Overview',
  secondaryHref: '/resources/platform-overview',
  secondaryMicrocopy: '4-page overview. PDF.',
}
