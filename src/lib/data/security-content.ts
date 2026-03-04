// src/lib/data/security-content.ts
//
// IMPORTANT: This module is the single source of truth for security page content.
// Every claim must trace to a code-verified feature in the product review.
// Compliance certifications require explicit business owner or legal verification
// before their status can be changed from 'under-evaluation' to 'verified'.
// See: plans/launch-plan/combined-recommendations.md -- Gap 10
//

import type {
  SecurityFeature,
  ComplianceCertification,
  RBACRole,
  ArchitectureBadge,
} from '@/lib/interfaces/security'

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const SECURITY_HERO = {
  metaLabel: 'SECURITY // PRIVACY // COMPLIANCE',
  title: 'Security, Privacy & Compliance',
  subtitle:
    'Safetrekr handles sensitive data -- student information, emergency contacts, background check records, and compliance documentation. Here\'s exactly how that data is collected, stored, accessed, and protected.',
} as const

// ---------------------------------------------------------------------------
// Architecture Credibility Badges
// (Architectural facts, NOT certification claims)
// Source: WS-B.1 Section 4.7, Tier 3 Architecture Credibility
// ---------------------------------------------------------------------------

export const ARCHITECTURE_BADGES: ArchitectureBadge[] = [
  {
    id: 'ferpa',
    label: 'Designed for FERPA Compliance',
    iconName: 'ShieldCheck',
  },
  {
    id: 'clery',
    label: 'Clery Act Support',
    iconName: 'FileCheck',
  },
  {
    id: 'gdpr',
    label: 'GDPR-Aligned',
    iconName: 'Lock',
  },
  {
    id: 'audit',
    label: 'Audit-Ready Documentation',
    iconName: 'ScrollText',
  },
]

// ---------------------------------------------------------------------------
// Section 1: Data Architecture
// Source: product-review Section 16 (Architecture Highlights), Section 13
// ---------------------------------------------------------------------------

export const DATA_ARCHITECTURE_FEATURES: SecurityFeature[] = [
  {
    id: 'rls',
    title: 'Row Level Security (RLS)',
    iconName: 'Database',
    specs: [
      'Supabase PostgreSQL with Row Level Security policies on every table.',
      'Organization data isolation is enforced at the database layer, not the application layer.',
      "Your organization's data cannot be accessed by any other organization, regardless of application-layer logic.",
      'Queries are filtered by organization context before results are returned.',
    ],
    sourceRef: 'Section 16: Architecture Highlights -- RLS',
  },
  {
    id: 'encryption-rest',
    title: 'Encryption at Rest',
    iconName: 'HardDrive',
    specs: [
      'PostgreSQL database encryption managed by Supabase.',
      'All stored data is encrypted using AES-256 at the storage layer.',
    ],
    sourceRef: 'Section 16: Supabase integration',
  },
  {
    id: 'encryption-transit',
    title: 'Encryption in Transit',
    iconName: 'Lock',
    specs: [
      'TLS for all API communication and data transfer.',
      'All client-server communication uses HTTPS.',
      'No unencrypted endpoints are exposed.',
    ],
    sourceRef: 'Section 16: Architecture Highlights',
  },
  {
    id: 'data-isolation',
    title: 'Data Isolation',
    iconName: 'Layers',
    specs: [
      'Four-portal architecture enforces strict role-based separation of concerns.',
      'Client, Analyst, HQ, and Traveler portals each operate within isolated access scopes.',
      'RLS policies enforce organization-scoped access on every table.',
    ],
    sourceRef: 'Section 16: Four-Portal Architecture',
  },
  {
    id: 'runtime-config',
    title: 'Runtime Configuration',
    iconName: 'Settings',
    specs: [
      'Environment variables are injected at runtime, not build time.',
      'The same build artifact serves development, staging, and production environments.',
      'No secrets are embedded in client-side bundles.',
    ],
    sourceRef: 'Section 16: Architecture Highlights -- Runtime Configuration',
  },
  {
    id: 'containerized',
    title: 'Containerized Deployment',
    iconName: 'Container',
    specs: [
      'Docker builds deploy to Kubernetes via CI/CD.',
      'Separate development and production environments.',
      'Infrastructure-as-code deployment pipeline.',
    ],
    sourceRef: 'Section 16: Architecture Highlights -- Containerized Deployment',
  },
]

// ---------------------------------------------------------------------------
// Section 2: Authentication and Access Control
// Source: product-review Section 13 (User Profile and Security), Section 15
// ---------------------------------------------------------------------------

export const AUTH_FEATURES: SecurityFeature[] = [
  {
    id: 'jwt-auth',
    title: 'JWT Authentication',
    iconName: 'KeyRound',
    specs: [
      'Email/password authentication with JWT session tokens.',
      'Automatic token refresh for seamless session continuity.',
      'Secure email-based password reset flow.',
    ],
    sourceRef: 'Section 15: Authentication and Session Management',
  },
  {
    id: '2fa',
    title: 'Two-Factor Authentication',
    iconName: 'ShieldCheck',
    specs: [
      'Supported for all user accounts.',
      'Security device registration and management.',
      'Users manage their own 2FA configuration in profile settings.',
    ],
    sourceRef: 'Section 13: User Profile and Security',
  },
  {
    id: 'invite-only',
    title: 'Invite-Based Account Activation',
    iconName: 'UserCheck',
    specs: [
      'No self-registration. Every account is initiated by an organization administrator or Safetrekr HQ.',
      'Invite-based activation ensures no unauthorized accounts are created.',
      'Guided onboarding wizard for first-time users.',
    ],
    sourceRef: 'Section 13: Onboarding, Section 15: Authentication',
  },
]

// ---------------------------------------------------------------------------
// Section 2 (continued): RBAC Role Table
// Source: product-review Section 15, safetrekr-core/src/db/models.py
// ---------------------------------------------------------------------------

export const RBAC_ROLES: RBACRole[] = [
  { name: 'Traveler', portal: 'Client', description: 'Trip participant' },
  { name: 'Chaperone', portal: 'Client', description: 'Adult supervisor' },
  {
    name: 'Org Admin',
    portal: 'Client',
    description: 'Full organization management',
  },
  {
    name: 'Billing Admin',
    portal: 'Client',
    description: 'Financial management',
  },
  {
    name: 'Security Officer',
    portal: 'Client',
    description: 'Safety and compliance',
  },
  {
    name: 'Analyst',
    portal: 'Analyst',
    description: 'Independent safety review',
  },
  {
    name: 'HQ Admin',
    portal: 'HQ',
    description: 'Platform administration',
  },
  {
    name: 'HQ Supervisor',
    portal: 'HQ',
    description: 'Operations management',
  },
  { name: 'HQ Security', portal: 'HQ', description: 'Platform security' },
  {
    name: 'HQ Ops',
    portal: 'HQ',
    description: 'Day-to-day operations',
  },
]

export const RBAC_SUMMARY =
  '10 system-level roles with ascending privilege levels. Users are directed to the appropriate portal based on their assigned role upon login. Role determines feature access, data visibility, and administrative capabilities.'

// ---------------------------------------------------------------------------
// Section 3: Privacy and Data Governance
// Source: product-review Section 13 (Privacy and Data Governance)
// ---------------------------------------------------------------------------

export const PRIVACY_FEATURES: SecurityFeature[] = [
  {
    id: 'gdpr-features',
    title: 'GDPR Compliance Features',
    iconName: 'FileCheck',
    specs: [
      'User-initiated data export for data portability.',
      'Account deletion with 30-day grace period for recovery before permanent removal.',
      'Consent history with timestamped audit trail of all consent actions (granted, revoked, updated).',
      'Analytics opt-in/out with independent user control.',
      'Marketing preference controls.',
    ],
    sourceRef: 'Section 13: Privacy and Data Governance',
  },
  {
    id: 'contact-visibility',
    title: 'Contact Visibility Controls',
    iconName: 'Eye',
    specs: [
      'Granular controls to show or hide phone number and email address from teammates.',
      'Users share only the contact information they choose to make visible.',
    ],
    sourceRef: 'Section 13: Privacy and Data Governance -- Contact Visibility',
  },
  {
    id: 'audit-trail',
    title: 'Audit Trail',
    iconName: 'ScrollText',
    specs: [
      'All review actions, status changes, and administrative operations are logged.',
      'Timestamps, user attribution, and contextual metadata on every entry.',
      'Activity entries sourced from three origins: client actions, analyst actions, and system actions.',
      'Approval decisions include reason codes and route through multi-stage review.',
    ],
    sourceRef:
      'Section 8: Evidence and Activity Tracking, Section 16: Audit Trail',
  },
  {
    id: 'data-retention',
    title: 'Data Retention',
    iconName: 'Clock',
    specs: [
      'Account deletion is user-initiated with a 30-day grace period.',
      'Recovery is possible within the grace period before permanent removal.',
      'Consent history maintained as a permanent audit record.',
    ],
    sourceRef: 'Section 13: Privacy and Data Governance -- Account Deletion',
  },
]

// ---------------------------------------------------------------------------
// Section 4: Mobile Security (Traveler App)
// Source: product-review Section 9a (Offline-First Architecture)
// ---------------------------------------------------------------------------

export const MOBILE_FEATURES: SecurityFeature[] = [
  {
    id: 'offline-first',
    title: 'Offline-First Architecture',
    iconName: 'WifiOff',
    specs: [
      'Local SQLite database stores trip data on-device for access without network connectivity.',
      'Priority-based queue (high, normal, low) with ordered processing.',
      'Status lifecycle: pending, processing, completed, failed, cancelled.',
      'Automatic sync on network restoration.',
    ],
    sourceRef: 'Section 9a: Offline Data Queue',
  },
  {
    id: 'idempotency',
    title: 'Idempotency Keys',
    iconName: 'Fingerprint',
    specs: [
      'All queued requests include idempotency keys to prevent duplicate server-side effects during sync.',
      'Configurable max retries with retry count tracking per item.',
    ],
    sourceRef: 'Section 9a: Offline Data Queue -- Idempotency',
  },
  {
    id: 'on-device-geofencing',
    title: 'On-Device Geofencing',
    iconName: 'MapPin',
    specs: [
      'Geofence monitoring runs on-device via expo-location and expo-task-manager.',
      'No server-side location tracking. Location data stays on the device.',
      'Background monitoring as a registered background task.',
      'iOS optimization with priority-based region selection (20-region hardware limit).',
    ],
    sourceRef: 'Section 9a: Active Geofencing',
  },
  {
    id: 'secure-sync',
    title: 'Secure Data Sync',
    iconName: 'RefreshCw',
    specs: [
      'All sync communication over TLS.',
      'UI indicators inform users of offline state and pending sync items.',
      'Network state detection with automatic reconnection.',
    ],
    sourceRef: 'Section 9a: Offline-First Architecture',
  },
]

// ---------------------------------------------------------------------------
// Section 5: Operational Security
// Source: product-review Section 8 (Independent Safety Review), Section 16
// NOTE: Only code-verified claims. Employee screening and incident response
// procedures are NOT verified in the codebase and are excluded.
// ---------------------------------------------------------------------------

export const OPERATIONAL_FEATURES: SecurityFeature[] = [
  {
    id: 'independent-analyst',
    title: 'Independent Analyst Model',
    iconName: 'UserCog',
    specs: [
      'Safety review is performed by dedicated analysts who are separate from the trip planning team.',
      'Separation of duties is enforced by the platform architecture: separate portal, separate role, separate access scope.',
      'Analyst assignments are tracked with full audit trails.',
      'Approval workflow supports approve, reject, and conditional approval with reason codes.',
    ],
    sourceRef: 'Section 8: Independent Safety Review and Approval',
  },
  {
    id: 'evidence-tracking',
    title: 'Evidence and Activity Tracking',
    iconName: 'FileSearch',
    specs: [
      'Comprehensive audit trail capturing every meaningful action taken on a trip.',
      'Three activity sources: client actions, analyst actions, and system actions.',
      'Evidence management and documented audit trail for safety assessments.',
      'Timestamped, user-attributed, searchable activity log.',
    ],
    sourceRef: 'Section 8: Evidence and Activity Tracking',
  },
  {
    id: 'background-checks',
    title: 'Background Check Integration',
    iconName: 'ScanSearch',
    specs: [
      'Five background check types: criminal, sex offender, driving, employment, education.',
      'Three integrated screening providers: Checkr, Sterling, GoodHire.',
      'Participant-by-check compliance matrix with six-status tracking.',
      'Audit-logged results tied to trip and participant records.',
    ],
    sourceRef: 'Section 3: Background Checks and Screening',
  },
]

// ---------------------------------------------------------------------------
// Section 6: Compliance Certifications
//
// CRITICAL: DO NOT change any certification status to 'verified' without
// explicit written confirmation from the business owner (SOC 2: Q-3) or
// legal counsel (FERPA: Q-4, COPPA).
//
// See: plans/launch-plan/combined-recommendations.md -- Gap 10
// See: plans/launch-plan/combined-recommendations.md -- R-05
// ---------------------------------------------------------------------------

export const COMPLIANCE_INTRO =
  "Safetrekr's security architecture is designed to meet institutional compliance requirements. The sections above describe what we build. This section describes what we certify."

export const COMPLIANCE_CERTIFICATIONS: ComplianceCertification[] = [
  {
    id: 'soc2',
    name: 'SOC 2 Type II',
    description:
      'Service Organization Control report covering security, availability, and confidentiality.',
    status: 'under-evaluation',
    statusNote: 'Under evaluation. Contact us for current status.',
    blockingQuestion: 'Q-3: Requires business owner confirmation.',
  },
  {
    id: 'ferpa',
    name: 'FERPA',
    description:
      'Family Educational Rights and Privacy Act. Governs access to student education records.',
    status: 'under-evaluation',
    statusNote: 'Under evaluation. Contact us for current status.',
    blockingQuestion: 'Q-4: Requires legal verification.',
  },
  {
    id: 'coppa',
    name: 'COPPA',
    description:
      "Children's Online Privacy Protection Act. Governs collection of personal information from children under 13.",
    status: 'under-evaluation',
    statusNote: 'Under evaluation. Contact us for current status.',
    blockingQuestion: 'Requires legal verification.',
  },
]

export const COMPLIANCE_FOOTER =
  'Contact us for the current status of any compliance certification.'

// ---------------------------------------------------------------------------
// Section 7: Regulatory Alignment
// Source: reference marketing site security.html
// ---------------------------------------------------------------------------

export const REGULATORY_ALIGNMENT = [
  {
    id: 'ferpa',
    name: 'FERPA',
    description:
      'Safetrekr is designed for FERPA compliance. The platform supports organizations that handle student information through role-based access control, data minimization (no SSNs, academic records, or disciplinary records stored), guardian consent tracking, and comprehensive audit trails. Safetrekr does not claim FERPA certification -- no third party certifies FERPA compliance. The platform is designed so that organizations using Safetrekr can meet their own FERPA obligations when managing student trip data.',
  },
  {
    id: 'title-ix',
    name: 'Title IX',
    description:
      'Organizations with Title IX obligations can use Safetrekr\'s documentation and safety review capabilities to support their compliance posture for group travel: background check and screening workflows, documented safety review across 18 dimensions, time-stamped records of every communication and acknowledgment, and board-ready documentation packages.',
  },
  {
    id: 'clery',
    name: 'Clery Act',
    description:
      'For colleges and universities subject to the Clery Act, Safetrekr provides documentation that supports campus safety reporting obligations related to off-campus travel: time-stamped incident and alert records, documented safety reviews with analyst sign-off, communication logs, and searchable audit trails.',
  },
  {
    id: 'gdpr',
    name: 'GDPR',
    description:
      'For organizations with international travel involving EU travelers or destinations, Safetrekr\'s data handling practices support GDPR alignment: right to access, right to data portability, right to erasure (user-initiated deletion with 30-day grace period), timestamped consent management, data minimization, and granular privacy controls.',
  },
] as const

// ---------------------------------------------------------------------------
// Section 8: Procurement
// Source: reference marketing site security.html
// ---------------------------------------------------------------------------

export const PROCUREMENT_INFO = {
  heading: 'Purchasing information for institutional buyers',
  subtitle:
    'We understand institutional purchasing. Transparent pricing, flexible payment options, and we\'ll sign your standard data privacy agreement.',
  paymentMethods: [
    {
      name: 'Credit Card',
      description: 'Immediate activation via credit card. Visa, Mastercard, American Express, and Discover accepted.',
    },
    {
      name: 'Purchase Order',
      description: 'Purchase orders accepted from schools, universities, churches, and established organizations.',
    },
    {
      name: 'Net 30 Invoice',
      description: 'After your first successful trip, we can set up Net 30 invoicing or PO terms.',
    },
    {
      name: 'ACH Transfer',
      description: 'ACH transfer accepted. Contact us for bank details after quote acceptance.',
    },
  ],
  contractTerms: [
    'No annual commitment -- pay per trip, no minimum trip volume, no forced renewals.',
    'Volume pricing for organizations managing 5 or more trips per year.',
    '25% recurring trip discount starting in year two for the same annual trip.',
    'You own your data. Export anytime. Full data deletion upon request.',
    'Termination for convenience with 30 days written notice. No early termination fees.',
  ],
  vendorEvaluation: [
    'Sign your standard data privacy agreement or student data privacy addendum',
    'Walk through the platform\'s security controls in a live demonstration',
    'Provide answers to your organization\'s vendor security questionnaire',
    'Discuss data handling practices specific to your regulatory requirements',
    'Participate in formal RFP processes for institutional buyers',
  ],
} as const

// ---------------------------------------------------------------------------
// Security FAQs
// Source: reference marketing site security.html
// ---------------------------------------------------------------------------

export const SECURITY_FAQ_ITEMS = [
  {
    question: 'Is Safetrekr designed for FERPA compliance for K-12 schools?',
    answer:
      'Safetrekr is designed for FERPA compliance. The platform supports organizations that handle student information through role-based access control, data minimization (no SSNs, academic records, or disciplinary records stored), guardian consent tracking, and comprehensive audit trails. We will sign your standard student data privacy agreement.',
  },
  {
    question: 'What certifications does Safetrekr hold?',
    answer:
      'Safetrekr is designed for regulatory alignment with FERPA, the Clery Act, Title IX, and GDPR. The platform enforces role-based access control at the database level, encrypts data in transit and at rest, and maintains comprehensive audit trails. We will sign your organization\'s standard data privacy agreement.',
  },
  {
    question: 'Where is our data stored?',
    answer:
      'Data is stored on US-based cloud infrastructure. All data is encrypted in transit via TLS and at rest through database-level storage encryption. Participant data is not shared with third parties for marketing, analytics, or any purpose outside the direct delivery of trip safety management services.',
  },
  {
    question: 'How does Safetrekr handle data deletion requests?',
    answer:
      'We support right-to-erasure requests per GDPR and similar regulations. User accounts can be deleted by the user with a 30-day recovery window before permanent removal. Organizations can request data deletion in accordance with applicable data privacy agreements.',
  },
  {
    question: 'Can we conduct a security review of Safetrekr?',
    answer:
      'Yes. We welcome security reviews. We are prepared to walk through our platform\'s security controls in a live demonstration, provide answers to your vendor security questionnaire, and discuss data handling practices specific to your regulatory requirements.',
  },
  {
    question: 'What happens if there\'s a security incident?',
    answer:
      'We have documented incident response procedures. In the event of a security incident, we work to contain the threat, assess the impact, and notify affected customers in accordance with applicable regulations and our data privacy agreements.',
  },
  {
    question: 'How does background check integration maintain compliance?',
    answer:
      'Safetrekr integrates with FCRA-compliant screening providers (Checkr, Sterling, GoodHire). Safetrekr stores check status -- not the full background check report content. Results are tracked at both the trip level and the organization level, and access to results is role-based.',
  },
  {
    question: 'Can we use single sign-on (SSO)?',
    answer:
      'Safetrekr supports two-factor authentication and invite-based account activation. SSO is not currently available. Contact us to discuss your organization\'s authentication requirements.',
  },
] as const

// ---------------------------------------------------------------------------
// Bottom CTA
// ---------------------------------------------------------------------------

export const BOTTOM_CTA = {
  headline: 'Questions about security or compliance?',
  primaryButton: {
    label: 'Request a Sample Trip Package',
    href: '/contact',
  },
  secondaryButton: {
    label: 'Schedule Security Review',
    href: '/contact?type=security',
  },
  supportingText:
    'Request our evaluation checklist or schedule a call to discuss your specific compliance requirements.',
} as const
