// src/lib/data/solutions-verticals.ts

import type { SolutionVertical } from '@/lib/interfaces/solutions'

// ---------------------------------------------------------------------------
// Hero + Cross-Cutting Value Prop
// ---------------------------------------------------------------------------

export const SOLUTIONS_HERO = {
  title: 'Professional trip safety management for your organization',
  subtitle:
    'Every organization that moves groups of people carries a duty of care. Safetrekr assigns a professional safety analyst to every trip -- whether it is a kindergarten field trip, a study abroad program, a mission trip, or a corporate offsite. Professionally reviewed before departure. Actively monitored during travel. Fully documented for the record.',
} as const

export const CROSS_CUTTING_VALUE_PROP =
  'Every organization on this page shares one thing: the people they send to travel depend on them to come home safely. Safetrekr gives every organization the same operational rigor -- guided trip planning, independent analyst review, real-time intelligence, and a complete audit trail -- adapted to the compliance requirements and travel patterns of each vertical.'

// ---------------------------------------------------------------------------
// Five Vertical Cards
// ---------------------------------------------------------------------------

export const VERTICALS: SolutionVertical[] = [
  {
    id: 'k12',
    name: 'K-12 Schools',
    iconName: 'GraduationCap',
    tagline: 'Every field trip. Every student. Every safeguard documented.',
    painPoints: [
      'Trip coordinator is already doing three jobs -- safety planning falls on teachers and coaches',
      'Board asks for documentation and gets a manila folder',
      'No real-time information during travel when conditions change',
      'Rising liability exposure -- defense costs have nearly doubled regardless of claims history',
    ],
    solutions: [
      'Professional analyst review across 18 safety dimensions before departure',
      'Live Traveler App with safety checklists, emergency contacts, and acknowledgment tracking',
      'Real-time intelligence monitoring from 11+ authoritative government sources',
      'Board-ready trip packets with a complete, timestamped audit trail',
    ],
    ctaLabel: 'Learn more about Safetrekr for K-12',
    ctaHref: '/solutions/k12',
  },
  {
    id: 'higher-ed',
    name: 'Higher Education',
    iconName: 'Building2',
    tagline:
      'Study abroad. Exchange programs. Research expeditions. All verified.',
    painPoints: [
      'International risk complexity across dozens of countries with distinct risk profiles',
      'Inconsistent safety standards across departments -- no unified view of institutional travel',
      'Compliance documentation gaps for Clery Act, Title IX, and risk management',
      'Emergency response coordination -- first hours of a crisis spent assembling information',
    ],
    solutions: [
      'Professional analyst review across 18 dimensions for every trip -- domestic or international',
      'Real-time intelligence from 11+ authoritative government and international sources',
      'Traveler App for students, faculty, and staff with acknowledgment tracking',
      'Audit-ready documentation supporting Clery Act reporting and risk management requirements',
    ],
    ctaLabel: 'Learn more about Safetrekr for Higher Education',
    ctaHref: '/solutions/higher-ed',
  },
  {
    id: 'churches',
    name: 'Churches & Mission Organizations',
    iconName: 'Church',
    tagline: 'Mission trips deserve mission-grade safety planning.',
    painPoints: [
      'Volunteer leaders are called to serve, not trained in emergency management',
      'Remote and high-risk destinations with limited medical infrastructure',
      'Insurance expects documented safety plans you do not have',
      'Tight ministry budgets -- but a single incident costs $50K-$500K+',
    ],
    solutions: [
      'A professional safety analyst handles the safety planning across 18 dimensions',
      'Volunteer screening with background checks built directly into the trip workflow',
      'Traveler App for every participant -- no group texts, full acknowledgment tracking',
      'Per-trip pricing starting at $450 -- fits ministry budgets with no subscription',
    ],
    ctaLabel: 'Learn more about Safetrekr for Churches',
    ctaHref: '/solutions/churches',
  },
  {
    id: 'youth-sports',
    name: 'Youth & Club Sports',
    iconName: 'Trophy',
    tagline:
      'Tournament travel is complex. Protecting your athletes is not optional.',
    painPoints: [
      'Coach and volunteer screening across multiple states and governing bodies',
      'No real-time visibility into travel conditions during tournaments',
      'Medical consent forms locked in a binder at the hotel when the emergency is at the venue',
      'Safety planning falls on people who already have three other jobs',
    ],
    solutions: [
      'Background check compliance matrix for every adult with supervisory responsibility',
      'Real-time monitoring with analyst-reviewed alerts and course-of-action guidance',
      'Traveler App with on-device medical consent, emergency contacts, and evacuation plans',
      'Board-ready trip packets that demonstrate documented duty of care',
    ],
    ctaLabel: 'Learn more about Safetrekr for Youth Sports',
    ctaHref: '/solutions/youth-sports',
  },
  {
    id: 'business',
    name: 'Corporate Travel',
    iconName: 'Briefcase',
    tagline: 'Duty of care -- documented, not assumed.',
    painPoints: [
      'Duty of care without a system behind it -- obligation acknowledged but not documented',
      'No real-time visibility into travel conditions when employees are on the road',
      'Unstructured emergency response -- no pre-established evacuation plans or rally points',
      'Safety planning falls on office managers and coordinators with other primary roles',
    ],
    solutions: [
      'Documented duty of care with professional analyst review across 18 dimensions',
      'Real-time monitoring from 11+ authoritative government sources with analyst-reviewed alerts',
      'Traveler App for every employee with emergency contacts and evacuation plans on-device',
      'Downloadable audit trail for legal, insurance, and board review',
    ],
    ctaLabel: 'Learn more about Safetrekr for Business',
    ctaHref: '/solutions/business',
  },
]

// ---------------------------------------------------------------------------
// Objection Hook (inline, below cards)
// ---------------------------------------------------------------------------

export const OBJECTION_HOOK = {
  question: 'Already managing trip safety with spreadsheets and email?',
  answer:
    'A spreadsheet tracks what you enter. It cannot track what you miss. It cannot verify that a background check is current. It cannot deliver a safety alert to a chaperone\'s phone at 2 AM. And when someone asks "Did we do everything we could?" -- a spreadsheet is not proof.',
} as const

// ---------------------------------------------------------------------------
// Bottom CTA
// ---------------------------------------------------------------------------

export const SOLUTIONS_BOTTOM_CTA = {
  headline: 'One platform for every type of organizational travel.',
  buttonLabel: 'Request a Sample Trip Package',
  microcopy: 'Tell us your vertical. We will tailor the conversation.',
  href: '/contact',
} as const
