// src/lib/data/solutions-verticals.ts

import type { SolutionVertical } from '@/lib/interfaces/solutions'

// ---------------------------------------------------------------------------
// Hero + Cross-Cutting Value Prop
// ---------------------------------------------------------------------------

export const SOLUTIONS_HERO = {
  title: 'Your travelers. Your responsibility. Your system.',
  subtitle:
    'Schools, churches, sports teams, universities, and businesses each face unique trip safety challenges. Safetrekr is built to handle all of them -- with independent safety review, real-time intelligence, and documented accountability for every trip.',
} as const

export const CROSS_CUTTING_VALUE_PROP =
  'Every organization on this page shares one thing: the people they send to travel depend on them to come home safely. Safetrekr gives every organization the same operational rigor -- a 10-step planning wizard, independent analyst review, real-time intelligence, and a complete audit trail -- adapted to the compliance requirements and travel patterns of each vertical.'

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
      'Parental consent forms tracked in folders, not systems',
      'Background checks for chaperones managed manually',
      'No independent review of trip safety plans',
      'Regulatory compliance adds complexity to data handling',
    ],
    solutions: [
      'Structured document collection with role-based targeting and automated reminders',
      "Background check compliance matrix showing every chaperone's screening status at a glance",
      'Independent analyst review of every trip before departure',
      'Audit trail that answers questions from parents, superintendents, and school boards',
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
      'International travel risk assessment across multiple countries and programs',
      'Institutional liability exposure for student safety abroad',
      'Compliance documentation spread across departments',
      'No centralized system for tracking student safety across all travel programs',
    ],
    solutions: [
      'International trip planning with visa/passport tracking and destination intelligence',
      'Independent analyst review with tiered assignment matched to trip complexity',
      'Real-time intelligence alerts for international destinations',
      'Institutional audit documentation for risk management and legal review',
    ],
    ctaLabel: 'Learn more about Safetrekr for Higher Education',
    ctaHref: '/solutions/higher-ed',
  },
  {
    id: 'churches',
    name: 'Churches & Faith-Based Organizations',
    iconName: 'Church',
    tagline: 'Mission trips deserve mission-grade safety planning.',
    painPoints: [
      'Volunteer screening is manual and inconsistent',
      'International mission trips to complex security environments',
      'Emergency preparedness relies on contact lists, not connected systems',
      'No documentation trail if something goes wrong',
    ],
    solutions: [
      '5 background check types across 3 integrated providers for volunteer screening',
      'International risk assessment with real-time intelligence from multiple sources',
      'Three-tier evacuation planning with rally points, safe houses, and medical facility directories',
      'Complete audit trail from volunteer screening through trip completion',
    ],
    ctaLabel: 'Learn more about Safetrekr for Churches',
    ctaHref: '/solutions/churches',
  },
  {
    id: 'youth-sports',
    name: 'Youth Sports',
    iconName: 'Trophy',
    tagline:
      'Tournament travel is complex. Protecting your athletes is not optional.',
    painPoints: [
      'Coach and volunteer screening requirements across multiple jurisdictions',
      'Medical consent and emergency contact collection for minor athletes',
      'Multi-team travel coordination for tournaments and competitions',
      'SafeSport compliance tracking',
    ],
    solutions: [
      'Background check compliance matrix covering every adult with supervisory responsibility',
      'Structured medical consent and document collection with automated reminders',
      'Certification tracking with expiration monitoring (SafeSport, CPR, First Aid)',
      'Real-time alerts and SMS emergency broadcast during travel',
    ],
    ctaLabel: 'Learn more about Safetrekr for Youth Sports',
    ctaHref: '/solutions/youth-sports',
  },
  {
    id: 'business',
    name: 'Business',
    iconName: 'Briefcase',
    tagline: 'Corporate duty of care -- documented, not assumed.',
    painPoints: [
      'Duty of care obligations that are acknowledged but not systematically documented',
      'Employee travel risk varies by destination but is managed the same way',
      'No centralized proof of safety measures for legal or insurance review',
      'Annual contracts and per-seat licensing create cost overhead for variable travel volumes',
    ],
    solutions: [
      'Per-trip pricing with no annual contracts -- pay only when employees travel',
      'Tiered trip complexity matching safety requirements to travel risk level',
      'Independent analyst review provides separation of duties for compliance',
      'Downloadable audit trail for legal, insurance, and procurement review',
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
  buttonLabel: 'Schedule a Briefing',
  microcopy: 'Tell us your vertical. We will tailor the conversation.',
  href: '/contact',
} as const
