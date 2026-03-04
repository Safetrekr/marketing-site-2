/**
 * District showcase configurations for the animated step bar system.
 *
 * Each district has a set of steps (center card) with sub-items (dock tiles).
 * How It Works maps from existing PHASES + feature data.
 * Other districts use marketing-focused step breakdowns.
 *
 * @module district-showcases
 */

import type { DistrictId } from '@/lib/interfaces/district'
import type { DistrictShowcaseConfig, ShowcaseStep } from '@/lib/interfaces/district-showcase'
import {
  WIZARD_STEPS,
  REVIEW_DIMENSIONS,
  PROTECTION_FEATURES,
  MONITOR_FEATURES,
} from '@/lib/data/how-it-works'

// ---------------------------------------------------------------------------
// How It Works
// ---------------------------------------------------------------------------

const HOW_IT_WORKS_STEPS: ShowcaseStep[] = [
  {
    id: 'plan',
    number: 1,
    label: 'Plan Your Trip',
    summary:
      'Complete our guided 10-step wizard with everything a safety analyst needs to review your trip.',
    subItems: WIZARD_STEPS.map((ws) => ({
      id: `wizard-${ws.number}`,
      label: ws.name,
      iconName: 'ClipboardList',
      description: ws.description,
      detail: ws.description,
    })),
  },
  {
    id: 'review',
    number: 2,
    label: 'Analyst Review',
    summary:
      'A trained safety analyst independently reviews your trip across 18 safety dimensions.',
    subItems: REVIEW_DIMENSIONS.map((rd) => ({
      id: `dim-${rd.number}`,
      label: rd.name,
      iconName: 'ShieldCheck',
      description: rd.description,
      detail: rd.description,
    })),
  },
  {
    id: 'connect',
    number: 3,
    label: 'Get Connected',
    summary:
      'Travelers, chaperones, and guardians access the Safetrekr Traveler App for live safety information.',
    subItems: PROTECTION_FEATURES.map((pf) => ({
      id: pf.id,
      label: pf.name,
      iconName: pf.iconName,
      description: pf.description,
      detail: pf.description,
    })),
  },
  {
    id: 'monitor',
    number: 4,
    label: 'Travel Safe',
    summary:
      'Safetrekr monitors conditions at your destinations from 11+ authoritative government and international sources.',
    subItems: MONITOR_FEATURES.map((mf) => ({
      id: mf.id,
      label: mf.name,
      iconName: mf.iconName,
      description: mf.description,
      detail: mf.description,
    })),
  },
  {
    id: 'document',
    number: 5,
    label: 'Document All',
    summary:
      'Every precaution documented with timestamps. Board-ready trip packets generated for every stakeholder.',
    subItems: [
      {
        id: 'audit-trail',
        label: 'Audit Trail',
        iconName: 'FileCheck',
        description: 'Every action logged with who, what, when, and why.',
        detail:
          'Every action in Safetrekr is logged: trip creation, participant additions, document submissions, analyst reviews, approval decisions, alert deliveries, checklist acknowledgments. The audit trail captures who did what, when, and why.',
      },
      {
        id: 'trip-packets',
        label: 'Trip Packets',
        iconName: 'FileText',
        description: 'Board-ready packets in four role-based variants.',
        detail:
          'Board-ready trip packets in four role-based variants: traveler, chaperone, guardian, and administrator. Trip packets carry your organization\'s branding.',
      },
      {
        id: 'traveler-packet',
        label: 'Traveler View',
        iconName: 'User',
        description: 'Traveler-specific packet with itinerary and safety info.',
        detail: 'Travelers receive their complete itinerary, safety checklists, emergency contacts, and acknowledgment records.',
      },
      {
        id: 'admin-packet',
        label: 'Admin View',
        iconName: 'Settings',
        description: 'Administrator packet with full oversight and compliance data.',
        detail: 'Administrators receive comprehensive trip records including all analyst reviews, compliance verification, and the complete audit trail.',
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Who It's For
// ---------------------------------------------------------------------------

const WHO_ITS_FOR_STEPS: ShowcaseStep[] = [
  {
    id: 'schools',
    number: 1,
    label: 'K-12 Schools',
    summary: 'Field trips, athletic travel, band competitions, and international exchange programs.',
    subItems: [
      { id: 'field-trips', label: 'Field Trips', iconName: 'Bus', description: 'Day trips and overnight excursions for students.', detail: 'Safetrekr manages day trips (T1), domestic overnights (T2), and international travel (T3) with tier-appropriate safety requirements.' },
      { id: 'athletics', label: 'Athletic Travel', iconName: 'Trophy', description: 'Tournament and competition travel for student athletes.', detail: 'Student athlete travel with roster management, equipment tracking, and game-day safety checklists.' },
      { id: 'exchange', label: 'Exchange Programs', iconName: 'Globe', description: 'International student exchange and study abroad.', detail: 'International programs with embassy information, cultural safety briefings, and real-time destination monitoring.' },
    ],
  },
  {
    id: 'churches',
    number: 2,
    label: 'Churches',
    summary: 'Mission trips, youth retreats, and congregation travel with duty-of-care documentation.',
    subItems: [
      { id: 'mission-trips', label: 'Mission Trips', iconName: 'Heart', description: 'Domestic and international mission travel.', detail: 'Mission trip safety with destination risk assessments, volunteer background checks, and real-time monitoring.' },
      { id: 'youth-retreats', label: 'Youth Retreats', iconName: 'Users', description: 'Youth group camps and retreats.', detail: 'Youth retreat management with parent communication, chaperone ratios, and venue safety verification.' },
      { id: 'congregation', label: 'Congregation Travel', iconName: 'MapPin', description: 'Group pilgrimages and church-organized trips.', detail: 'Large group travel with participant management, medical information tracking, and emergency preparedness.' },
    ],
  },
  {
    id: 'sports',
    number: 3,
    label: 'Youth Sports',
    summary: 'Tournament travel, training camps, and league competitions for youth athletic organizations.',
    subItems: [
      { id: 'tournaments', label: 'Tournaments', iconName: 'Medal', description: 'Multi-day tournament travel and logistics.', detail: 'Tournament travel with venue mapping, game schedules integrated into itineraries, and team roster management.' },
      { id: 'training-camps', label: 'Training Camps', iconName: 'Dumbbell', description: 'Off-site training facilities and camps.', detail: 'Training camp safety with facility verification, medical facility mapping, and heat/weather monitoring.' },
    ],
  },
  {
    id: 'business',
    number: 4,
    label: 'Businesses',
    summary: 'Corporate retreats, conferences, and international business travel with compliance records.',
    subItems: [
      { id: 'corporate-travel', label: 'Corporate Travel', iconName: 'Briefcase', description: 'Business conferences and team retreats.', detail: 'Corporate travel management with duty-of-care compliance, risk assessments, and automated documentation for HR and legal teams.' },
      { id: 'international', label: 'International', iconName: 'Plane', description: 'International business travel and assignments.', detail: 'International business travel with State Department advisory integration, embassy locations, and real-time geopolitical monitoring.' },
    ],
  },
]

// ---------------------------------------------------------------------------
// Platform
// ---------------------------------------------------------------------------

const PLATFORM_STEPS: ShowcaseStep[] = [
  {
    id: 'dashboards',
    number: 1,
    label: 'Dashboards',
    summary: 'Four role-based dashboards — Admin, Analyst, Traveler, and HQ — each with tailored views.',
    subItems: [
      { id: 'admin-dash', label: 'Admin Dashboard', iconName: 'LayoutDashboard', description: 'Organization-wide trip oversight.', detail: 'Trip portfolio management, compliance tracking, team management, and billing.' },
      { id: 'analyst-dash', label: 'Analyst Dashboard', iconName: 'Search', description: 'Safety analyst review workspace.', detail: 'The 18-dimension review interface, evidence management, and trip approval workflow.' },
      { id: 'traveler-dash', label: 'Traveler App', iconName: 'Smartphone', description: 'Mobile-first traveler experience.', detail: 'Live itineraries, safety checklists, emergency contacts, and alert acknowledgment on iOS and Android.' },
      { id: 'hq-dash', label: 'HQ Dashboard', iconName: 'Building', description: 'Executive oversight and reporting.', detail: 'Portfolio analytics, risk trends, compliance metrics, and board-ready reporting.' },
    ],
  },
  {
    id: 'intelligence',
    number: 2,
    label: 'Intelligence',
    summary: 'TarvaRI engine monitors 11+ government sources for security, weather, health, and transport risks.',
    subItems: [
      { id: 'sources', label: 'Data Sources', iconName: 'Database', description: 'NWS, USGS, CDC, State Dept, FEMA, FAA, GDACS, ReliefWeb, and more.', detail: 'Real-time feeds from authoritative government and international sources, aggregated and normalized into a unified risk model.' },
      { id: 'risk-scoring', label: 'Risk Scoring', iconName: 'BarChart3', description: 'Percentile confidence bands on every alert.', detail: 'Each alert is risk-scored with percentile confidence bands, enabling analysts to prioritize by severity and confidence.' },
      { id: 'analyst-triage', label: 'Analyst Triage', iconName: 'Shield', description: 'Alerts reviewed by analysts before delivery.', detail: 'Every alert is reviewed by a trained analyst before it reaches travelers, eliminating false alarm fatigue.' },
    ],
  },
  {
    id: 'mobile',
    number: 3,
    label: 'Mobile',
    summary: 'Offline-first architecture with SQLite caching. Critical safety data available without connectivity.',
    subItems: [
      { id: 'offline', label: 'Offline-First', iconName: 'WifiOff', description: 'All critical data cached locally in SQLite.', detail: 'Complete trip data — itinerary, emergency contacts, evacuation plans — cached locally so travelers have access even without network connectivity.' },
      { id: 'geofencing', label: 'Geofencing', iconName: 'MapPinCheck', description: 'Location-based safety triggers.', detail: 'Background geofence monitoring with entry/exit alerts. Rally points alert on entry; safe houses alert on exit.' },
      { id: 'push', label: 'Push Alerts', iconName: 'Bell', description: 'Real-time push notifications for critical alerts.', detail: 'Critical alerts delivered via push notification with automatic escalation if unacknowledged.' },
    ],
  },
]

// ---------------------------------------------------------------------------
// Security
// ---------------------------------------------------------------------------

const SECURITY_STEPS: ShowcaseStep[] = [
  {
    id: 'compliance',
    number: 1,
    label: 'Compliance',
    summary: 'SOC 2 Type II certified infrastructure with continuous monitoring and annual third-party audits.',
    subItems: [
      { id: 'soc2', label: 'SOC 2 Type II', iconName: 'ShieldCheck', description: 'Continuous third-party auditing.', detail: 'SOC 2 Type II certification with annual audits covering security, availability, processing integrity, confidentiality, and privacy.' },
      { id: 'audit-logs', label: 'Audit Logging', iconName: 'ScrollText', description: 'Immutable record of every system action.', detail: 'Every API call, data access, configuration change, and user action logged with timestamps and attribution.' },
    ],
  },
  {
    id: 'encryption',
    number: 2,
    label: 'Encryption',
    summary: 'End-to-end encryption at rest and in transit. AES-256 for storage, TLS 1.3 for transport.',
    subItems: [
      { id: 'at-rest', label: 'At Rest', iconName: 'HardDrive', description: 'AES-256 encryption for all stored data.', detail: 'All data encrypted at rest using AES-256 with key rotation managed by AWS KMS.' },
      { id: 'in-transit', label: 'In Transit', iconName: 'Lock', description: 'TLS 1.3 for all network communication.', detail: 'All network traffic encrypted using TLS 1.3 with certificate pinning on mobile clients.' },
    ],
  },
  {
    id: 'access',
    number: 3,
    label: 'Access Control',
    summary: 'Role-based access control with row-level security. Every data request verified against permissions.',
    subItems: [
      { id: 'rbac', label: 'RBAC', iconName: 'Users', description: 'Role-based access control across all resources.', detail: 'Fine-grained role definitions: admin, analyst, chaperone, traveler, guardian — each with precisely scoped data access.' },
      { id: 'rls', label: 'Row-Level Security', iconName: 'Table', description: 'Database-enforced data isolation.', detail: 'PostgreSQL row-level security policies ensure users can only access data belonging to their organization and assigned trips.' },
      { id: '2fa', label: 'Two-Factor Auth', iconName: 'KeyRound', description: 'Multi-factor authentication for all accounts.', detail: 'TOTP-based two-factor authentication required for all administrative and analyst accounts.' },
    ],
  },
]

// ---------------------------------------------------------------------------
// Pricing
// ---------------------------------------------------------------------------

const PRICING_STEPS: ShowcaseStep[] = [
  {
    id: 'tiers',
    number: 1,
    label: 'Trip Tiers',
    summary: 'Per-trip pricing based on complexity: day trips, domestic overnights, and international travel.',
    subItems: [
      { id: 't1', label: 'T1: Day Trip', iconName: 'Sun', description: 'Single-day domestic trips. Starting at $450.', detail: 'Day trips within the continental US. Includes analyst review, Traveler App access, real-time monitoring, and documented trip record. Starting at $450.' },
      { id: 't2', label: 'T2: Domestic', iconName: 'Moon', description: 'Multi-day domestic trips with lodging.', detail: 'Overnight domestic trips with lodging verification, fire safety assessment, and extended monitoring. Per-trip pricing scales with group size and duration.' },
      { id: 't3', label: 'T3: International', iconName: 'Globe', description: 'International travel with full risk assessment.', detail: 'International trips with embassy mapping, State Department advisory integration, cultural safety briefings, and 24/7 monitoring across time zones.' },
    ],
  },
  {
    id: 'addons',
    number: 2,
    label: 'Add-Ons',
    summary: 'Optional services including background checks, travel insurance, and accessibility tracking.',
    subItems: [
      { id: 'bg-checks', label: 'Background Checks', iconName: 'UserCheck', description: 'Screening packages for chaperones and staff.', detail: 'Multi-tier background check packages integrated into the trip workflow. Results tracked in the participant registry.' },
      { id: 'insurance', label: 'Travel Insurance', iconName: 'Shield', description: 'Group travel insurance options.', detail: 'Bundled group travel insurance options with claims documentation integrated into the trip record.' },
    ],
  },
  {
    id: 'enterprise',
    number: 3,
    label: 'Enterprise',
    summary: 'Volume discounts, custom SLAs, and dedicated account management for large organizations.',
    subItems: [
      { id: 'volume', label: 'Volume Pricing', iconName: 'TrendingDown', description: 'Discounted rates for high-volume organizations.', detail: 'Tiered volume discounts for organizations running 10+ trips per year. Custom pricing available for districts and dioceses.' },
      { id: 'sla', label: 'Custom SLAs', iconName: 'FileText', description: 'Guaranteed review timelines and support response.', detail: 'Enterprise SLAs with guaranteed analyst review timelines, priority support, and dedicated account management.' },
    ],
  },
]

// ---------------------------------------------------------------------------
// Get Started
// ---------------------------------------------------------------------------

const GET_STARTED_STEPS: ShowcaseStep[] = [
  {
    id: 'briefing',
    number: 1,
    label: 'Schedule',
    summary: 'Schedule a 20-minute live walkthrough. See the analyst review, Traveler App, and documentation firsthand.',
    subItems: [
      { id: 'live-demo', label: 'Live Walkthrough', iconName: 'Video', description: '20-minute guided demo with a product specialist.', detail: 'A product specialist walks you through the complete workflow: trip creation wizard, analyst review dashboard, Traveler App, and trip documentation.' },
      { id: 'sample-packet', label: 'Sample Trip Package', iconName: 'Package', description: 'See real output from an actual trip review.', detail: 'Receive a sample trip package showing the analyst review, Traveler App screens, safety checklists, and board-ready documentation.' },
    ],
  },
  {
    id: 'trial',
    number: 2,
    label: 'Try It',
    summary: 'Start with one domestic day trip at $450. No procurement committee. No board approval needed.',
    subItems: [
      { id: 'first-trip', label: 'First Trip', iconName: 'Rocket', description: 'Create your first trip in the wizard.', detail: 'Your first trip falls within discretionary spending authority at most schools. No procurement committee. No board approval required.' },
      { id: 'onboarding', label: 'Onboarding', iconName: 'GraduationCap', description: '15-minute onboarding with a specialist.', detail: 'A dedicated onboarding specialist guides you through your first trip creation and explains every step of the review process.' },
    ],
  },
  {
    id: 'scale',
    number: 3,
    label: 'Scale Up',
    summary: 'One trip gives every stakeholder documented proof that every precaution was taken.',
    subItems: [
      { id: 'proof', label: 'Documented Proof', iconName: 'CheckCircle', description: 'Board-ready evidence of due diligence.', detail: 'One trip gives your board, your insurance provider, and the parents of every traveler a documented record that every precaution was taken.' },
      { id: 'expand', label: 'Expand Coverage', iconName: 'TrendingUp', description: 'Add more trips as confidence grows.', detail: 'Once stakeholders see the documentation quality, expanding coverage across your organization becomes a straightforward conversation.' },
    ],
  },
]

// ---------------------------------------------------------------------------
// About Us
// ---------------------------------------------------------------------------

const ABOUT_US_STEPS: ShowcaseStep[] = [
  {
    id: 'mission',
    number: 1,
    label: 'Our Mission',
    summary: 'Replace hope with a system. When someone asks "Did you do everything you could?" — we are the answer.',
    subItems: [
      { id: 'why', label: 'Why We Exist', iconName: 'Target', description: 'The gap between good intentions and documented safety.', detail: 'Every year, millions of travelers are entrusted to trip leaders who do their best — but have no system to document it. Safetrekr closes that gap.' },
      { id: 'approach', label: 'Our Approach', iconName: 'Compass', description: 'Independent analyst review as the foundation.', detail: 'We believe every trip deserves independent professional review — not a checklist, not an app feature, but a trained analyst who validates every location, route, and lodging.' },
    ],
  },
  {
    id: 'team',
    number: 2,
    label: 'Our Team',
    summary: 'US-based team with safety industry credentials and real-world field operations experience.',
    subItems: [
      { id: 'credentials', label: 'Credentials', iconName: 'Award', description: 'Safety industry certifications and experience.', detail: 'Our analysts hold professional safety certifications and bring real-world field operations experience from military, emergency management, and security backgrounds.' },
      { id: 'us-based', label: 'US-Based', iconName: 'Flag', description: 'Headquartered in the United States.', detail: 'Entire team based in the United States. All data processed and stored domestically. All analyst reviews conducted by US-based professionals.' },
    ],
  },
  {
    id: 'values',
    number: 3,
    label: 'Our Values',
    summary: 'Transparency, accountability, and the belief that every traveler deserves documented protection.',
    subItems: [
      { id: 'transparency', label: 'Transparency', iconName: 'Eye', description: 'Every decision documented and attributable.', detail: 'Every analyst decision is documented with reasoning. Every system action is logged. Stakeholders can trace any safety determination back to its source.' },
      { id: 'accountability', label: 'Accountability', iconName: 'Scale', description: 'We stand behind every review we deliver.', detail: 'Our analysts sign every review. Our platform timestamps every action. When questions arise, the record speaks for itself.' },
    ],
  },
]

// ---------------------------------------------------------------------------
// Config Registry
// ---------------------------------------------------------------------------

export const DISTRICT_SHOWCASE_CONFIGS: Record<DistrictId, DistrictShowcaseConfig> = {
  'how-it-works': {
    districtId: 'how-it-works',
    title: 'How It Works',
    steps: HOW_IT_WORKS_STEPS,
    ctaLabel: 'Explore the Full Process',
    ctaHref: '/how-it-works',
  },
  'who-its-for': {
    districtId: 'who-its-for',
    title: "Who It's For",
    steps: WHO_ITS_FOR_STEPS,
    ctaLabel: 'See All Solutions',
    ctaHref: '/solutions',
  },
  'platform': {
    districtId: 'platform',
    title: 'Platform',
    steps: PLATFORM_STEPS,
    ctaLabel: 'Explore the Platform',
    ctaHref: '/platform',
  },
  'security': {
    districtId: 'security',
    title: 'Security',
    steps: SECURITY_STEPS,
    ctaLabel: 'Read Security Details',
    ctaHref: '/security',
  },
  'pricing': {
    districtId: 'pricing',
    title: 'Pricing',
    steps: PRICING_STEPS,
    ctaLabel: 'View Pricing Details',
    ctaHref: '/pricing',
  },
  'get-started': {
    districtId: 'get-started',
    title: 'Get Started',
    steps: GET_STARTED_STEPS,
    ctaLabel: 'Request a Sample Trip Package',
    ctaHref: '/contact',
  },
  'about-us': {
    districtId: 'about-us',
    title: 'About Us',
    steps: ABOUT_US_STEPS,
    ctaLabel: 'Meet the Team',
    ctaHref: '/about',
  },
}
