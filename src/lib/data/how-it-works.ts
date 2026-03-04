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
  title: 'How Safetrekr Works -- From Trip Idea to Defensible Record in 5 Steps',
  description:
    'Safetrekr assigns a professional safety analyst to every trip. They review your plans, verify your destinations, monitor conditions during travel, and deliver a documented safety record. Per-trip pricing starting at $450.',
  canonical: '/how-it-works',
} as const

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const HERO = {
  h1: 'From trip idea to defensible record in 5 steps',
  h2: 'Safetrekr assigns a professional safety analyst to every trip. They review your plans, verify your destinations, monitor conditions during travel, and deliver a documented safety record -- while your travelers receive live checklists and real-time alerts directly through the Traveler App.',
} as const

// ---------------------------------------------------------------------------
// Problem Statement
// ---------------------------------------------------------------------------

export const PROBLEM_STATEMENT = {
  intro: 'Five steps from trip idea to defensible record',
  body: 'You plan the trip. A professional analyst reviews it. Your travelers get connected. Conditions are monitored in real time. Everything is documented for the record.',
  close: 'Safetrekr replaces hope with a system.',
} as const

// ---------------------------------------------------------------------------
// Phases
// ---------------------------------------------------------------------------

export const PHASES: Phase[] = [
  {
    id: 'plan',
    number: 1,
    label: 'Plan Your Trip',
    iconName: 'ClipboardList',
    heading: 'Plan Your Trip',
    body: 'Complete our guided 10-step wizard with everything a safety analyst needs to review your trip: destinations, dates, travelers, flights, lodging, venues, day-by-day itinerary, ground transportation, add-on services, and a final review.',
    supportingStatement:
      'Import participants in bulk from CSV or Excel with intelligent matching against your traveler registry. Interactive maps visualize every location on your itinerary. Lodging entries automatically flag rooms above the sixth floor for fire safety review.',
  },
  {
    id: 'review',
    number: 2,
    label: 'Professional Analyst Review',
    iconName: 'ShieldCheck',
    heading: 'Professional Analyst Review',
    body: 'A trained safety analyst independently reviews your trip across 18 safety dimensions. They validate every location, route, and lodging -- then build a structured emergency preparedness plan tailored to your specific trip, destinations, and group composition.',
    supportingStatement:
      'Nearby hospitals mapped with trauma capability levels and estimated travel times. Three-tier evacuation plans with rally points on interactive maps. Safety checklists assigned across eight categories with timing triggers. Real-time intelligence assessed from 11+ government sources.',
    objectionHook:
      'Review timelines vary by trip complexity -- domestic day trips in 3-5 business days, multi-day and international trips may require additional time.',
  },
  {
    id: 'connect',
    number: 3,
    label: 'Travelers Get Connected',
    iconName: 'Smartphone',
    heading: 'Travelers Get Connected',
    body: 'Before your group departs, travelers, chaperones, and guardians access the Safetrekr Traveler App -- a mobile-first portal that delivers live safety information directly to their devices.',
    supportingStatement:
      'Safety checklists delivered live with timing triggers. Emergency preparedness information accessible on-device. Day-by-day itineraries with real-time updates. Documents and consents submitted directly through the app. Every acknowledgment tracked.',
  },
  {
    id: 'monitor',
    number: 4,
    label: 'Travel With Confidence',
    iconName: 'Radar',
    heading: 'Travel With Confidence',
    body: 'On travel days, Safetrekr continuously monitors conditions at your destinations from 11+ authoritative government and international sources. When risks are identified, alerts are surfaced for analyst review and routed to affected trips with course-of-action guidance.',
    supportingStatement:
      'Monitoring sources include NWS, USGS, CDC, State Department, FEMA, FAA, GDACS, and ReliefWeb. Alerts are reviewed by analysts before delivery. Automatic escalation for critical events when alerts go unacknowledged.',
  },
  {
    id: 'document',
    number: 5,
    label: 'Document Everything',
    iconName: 'FileCheck',
    heading: 'Document Everything',
    body: 'After travel, your complete trip record is ready. Every precaution your organization took is documented with timestamps, and board-ready trip packets are generated for every stakeholder who needs them.',
    supportingStatement:
      'Every alert sent, every checklist acknowledged, every analyst review decision documented with evidence and audit trail. Board-ready trip packets in four role-based variants: traveler, chaperone, guardian, and administrator. Trip packets carry your organization\'s branding.',
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
  headline: 'Start with one trip',
  body: 'At $450, a single domestic day trip falls within discretionary spending authority at most schools. No procurement committee. No board approval required. One trip gives your board, your insurance provider, and the parents of every traveler a documented record that every precaution was taken.',
  primaryLabel: 'Request a Sample Trip Package',
  primaryHref: '/contact',
  primaryMicrocopy: 'See the analyst review, Traveler App, and documentation we produce.',
  secondaryLabel: 'View Pricing Details',
  secondaryHref: '/pricing',
  secondaryMicrocopy: 'Per-trip pricing starting at $450.',
}
