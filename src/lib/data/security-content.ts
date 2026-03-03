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
  metaLabel: 'SYSTEM // SECURITY ARCHITECTURE',
  title: 'Security architecture',
  subtitle:
    'Safetrekr handles sensitive personal information -- student records, medical data, emergency contacts, minor children\u2019s safety records. Here is exactly how we protect it.',
} as const

// ---------------------------------------------------------------------------
// Architecture Credibility Badges
// (Architectural facts, NOT certification claims)
// Source: WS-B.1 Section 4.7, Tier 3 Architecture Credibility
// ---------------------------------------------------------------------------

export const ARCHITECTURE_BADGES: ArchitectureBadge[] = [
  {
    id: 'rls',
    label: 'Row Level Security',
    iconName: 'Database',
  },
  {
    id: '2fa',
    label: 'Two-Factor Authentication',
    iconName: 'ShieldCheck',
  },
  {
    id: 'encryption',
    label: 'Encrypted at Rest and In Transit',
    iconName: 'Lock',
  },
  {
    id: 'gdpr',
    label: 'GDPR-Compliant Data Governance',
    iconName: 'FileCheck',
  },
  {
    id: 'invite-only',
    label: 'Invite-Only Access',
    iconName: 'UserCheck',
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
// Bottom CTA
// ---------------------------------------------------------------------------

export const BOTTOM_CTA = {
  headline: 'Questions about our security architecture?',
  primaryButton: {
    label: 'Schedule a Security Briefing',
    href: '/contact',
  },
  supportingText:
    'We walk IT, legal, and insurance teams through our architecture in detail.',
} as const
