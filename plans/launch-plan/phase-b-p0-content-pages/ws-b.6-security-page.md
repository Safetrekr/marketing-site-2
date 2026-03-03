# WS-B.6: Security Page

> **Workstream ID:** WS-B.6
> **Phase:** B -- P0 Content Pages
> **Assigned Agent:** `react-developer`
> **Status:** Draft
> **Created:** 2026-03-02
> **Last Updated:** 2026-03-02
> **Depends On:** WS-A.1 (Marketing Layout), WS-B.1 (Copy Deck -- Security section), Gap 10 resolution (compliance verification by business owner / legal)
> **Blocks:** None
> **Resolves:** Gap 10 (Compliance Certifications Unverified), R-05 (Compliance certifications claimed without verification)

---

## 1. Objective

Build the `/security` page for the Safetrekr marketing site -- a technical specification page that communicates the platform's security architecture, authentication model, privacy governance, mobile security posture, and operational security practices. The page must be factual, precise, and forwarding-ready: this is the page that IT directors, legal counsel, and insurance providers receive when evaluating Safetrekr for procurement.

The page enforces a strict separation between two categories of information:

1. **Security Architecture** -- What Safetrekr builds. These are code-verified, implemented capabilities documented in the product review (`product-review-safetrekr-app-v2-verified.md`). Every claim on this page traces to a verified feature.

2. **Compliance Certifications** -- What Safetrekr certifies. Only certifications that have been verified by the business owner or legal counsel appear as "certified." Unverified certifications render with an "under evaluation" qualifier. The `ComplianceBadge` component makes it architecturally impossible to display an unverified certification as verified -- the data model requires an explicit `status` field that drives rendering.

This separation resolves Gap 10 and mitigates Risk R-05 from the combined recommendations. The architecture sections can ship immediately; the compliance section updates as certifications are confirmed.

**Tone:** Technical specification. Zero marketing language. No adjectives. No superlatives. Facts, architecture decisions, and compliance references. This is the page that gets forwarded to IT, legal, and insurance.

The page renders as a server component inside the `(marketing)` layout from WS-A.1 for full SEO indexing and zero client-side JavaScript cost.

---

## 2. Scope

### In Scope

| # | Item | Notes |
|---|------|-------|
| 1 | `src/app/(marketing)/security/page.tsx` page component | Server component with SEO metadata; composes all sections |
| 2 | Security data module (`src/lib/data/security-content.ts`) | TypeScript-typed arrays and objects for all security content -- single source of truth |
| 3 | Type definitions (`src/lib/interfaces/security.ts`) | `SecurityFeature`, `ComplianceCertification`, `RBACRole`, `SecuritySection` interfaces |
| 4 | `SecurityFeatureCard` server component | Glass-morphism card rendering a security feature with icon, title, and specification bullets |
| 5 | `ComplianceBadge` server component | Conditional rendering based on verification status: verified (checkmark), under-evaluation (clock), or hidden |
| 6 | `RBACRoleTable` server component | Accessible data table displaying the 10 system roles with portal assignment and description |
| 7 | `SecurityArchitectureDiagram` server component | Text-based architecture diagram showing data flow and isolation boundaries (CSS-rendered, not image) |
| 8 | Section components for Hero, Data Architecture, Authentication, Privacy, Mobile Security, Operational Security, Compliance, and Bottom CTA | Composable section wrappers following the pattern established in WS-B.9 |
| 9 | Responsive behavior | Single-column on mobile, 2-column card grids on tablet, 3-column on desktop where applicable |
| 10 | Accessibility | Semantic headings, table accessibility (`scope`, `caption`), ARIA landmarks, keyboard navigation |
| 11 | SEO metadata | Page title, description, OpenGraph tags, canonical URL |
| 12 | Structured data (JSON-LD) | `WebPage` schema with security-focused description |
| 13 | Architecture credibility badges | Inline badge row for verified architecture facts: "Row Level Security", "Two-Factor Authentication", "Encrypted at Rest and In Transit", "GDPR-Compliant Data Governance" |
| 14 | Print-friendly rendering | `@media print` overrides for light background and readable text when the page is printed for procurement review |

### Out of Scope

| # | Item | Rationale |
|---|------|-----------|
| 1 | Downloadable PDF security overview | Requires separate document design and content; can be added post-launch. The "Download the Security Overview" CTA in the copy deck is replaced with "Schedule a Security Briefing" linking to `/contact` for launch. PDF creation is deferred. |
| 2 | Interactive compliance status dashboard | Over-engineering for a marketing page. Static badges with conditional rendering are sufficient. |
| 3 | OG image generation | WS-C.4 handles social images as a cross-cutting concern |
| 4 | Analytics instrumentation | WS-C.3 handles analytics events |
| 5 | Security questionnaire form | Would be a separate feature (post-launch). Contact page handles initial inquiries. |
| 6 | Detailed penetration test results or vulnerability disclosures | Not appropriate for a public marketing page. Shared during procurement via NDA. |
| 7 | SOC 2, FERPA, or COPPA certification claims | Cannot be claimed until verified (Q-3, Q-4). Page structure accommodates future addition. |
| 8 | Employee screening or incident response detail | Not verified in codebase. The operational security section references the independent analyst model (verified) and audit trail (verified) only. |

---

## 3. Input Dependencies

### Codebase Files to Reference

| File | What to Use From It |
|------|---------------------|
| `src/app/(marketing)/layout.tsx` | Marketing layout (from WS-A.1). Security page renders inside this. |
| `src/styles/spatial-tokens.css` | Safetrekr dark-mode tokens. Security page uses `--color-void: #061a23` as body background. Content cards use `--color-deep: #0a2733` or `--color-surface: #123646` for elevated readability. Text: `--color-text-primary: #e8f0f4`, `--color-text-secondary: #929899`. Ember accent (green): `--color-ember: #4ba467`, `--color-ember-bright: #6abf84`. |
| `src/components/districts/detail-panel.tsx` | Glass-morphism reference pattern: `bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]`, `border border-white/[0.08]`. Security page cards use a slightly more opaque variant for enhanced text readability (`bg-white/[0.08]`) given the density of technical content. |
| `src/lib/utils.ts` | `cn()` utility. Import: `import { cn } from '@/lib/utils'`. |
| `src/app/globals.css` | Tailwind theme bridge. Confirms `bg-void`, `text-ember`, `text-text-primary`, etc. are available as utilities. |

### Plan Documents to Reference

| Document | What to Use From It |
|----------|---------------------|
| `plans/launch-plan/combined-recommendations.md` -- Gap 10 | The authoritative constraint: "Do NOT claim SOC 2 unless certification is confirmed. Do NOT claim FERPA unless verified by legal. Safe claims: RLS, JWT auth, 2FA, encryption at rest/transit, 10 RBAC levels, audit logging. Structure as Security Architecture vs Compliance." |
| `plans/launch-plan/initial-thoughts/product-review-safetrekr-app-v2-verified.md` -- Sections 13, 15, 16 | Code-verified security features: 10 RBAC roles (Section 13), authentication and session management (Section 15), RLS and architecture highlights (Section 16), privacy and data governance (Section 13), offline-first architecture (Section 9a). |
| `plans/launch-plan/phase-b-p0-content-pages/ws-b.1-content-strategy-copy-drafting.md` -- Section 4.4.6 | Security page copy: 5-section structure, role table, compliance callout with "under evaluation" qualifiers, mobile security bullets, operational security bullets, CTA copy. |
| `plans/launch-plan/combined-recommendations.md` -- Risk R-05 | "Compliance certifications claimed without verification. Security page uses Security Architecture vs Compliance Certifications structure. Unverified certs marked under evaluation. Blocked until Q-3 and Q-4 resolve." |

### External Dependencies

| Dependency | Owner | Status | Impact |
|------------|-------|--------|--------|
| SOC 2 Type II certification status | Business Owner (Q-3) | **UNVERIFIED** | Compliance section shows "under evaluation" qualifier until confirmed |
| FERPA compliance verification | Legal (Q-4) | **UNVERIFIED** | Compliance section shows "under evaluation" qualifier until confirmed |
| COPPA compliance verification | Legal | **UNVERIFIED** | Compliance section shows "under evaluation" qualifier until confirmed |
| Approved security copy from WS-B.1 | Content Strategist | **PENDING** | Page implementation uses copy from Section 4.4.6 of the copy deck |

### No New Package Dependencies

This workstream requires no new npm packages. All rendering is handled by server components using existing dependencies: Next.js, Tailwind, `lucide-react` for icons, `cn()` for class merging.

---

## 4. Deliverables

### 4.1 Type Definitions (`src/lib/interfaces/security.ts`)

```typescript
// src/lib/interfaces/security.ts

/**
 * A single security feature specification displayed as a card.
 * Each feature traces to a verified capability in the product review.
 */
export interface SecurityFeature {
  /** Unique identifier for key prop */
  id: string
  /** Feature title (e.g., "Row Level Security") */
  title: string
  /** Lucide icon component name */
  iconName: string
  /** Technical specification bullets -- factual statements only */
  specs: string[]
  /** Source section in product-review-safetrekr-app-v2-verified.md */
  sourceRef: string
}

/**
 * A compliance certification with explicit verification status.
 * The `status` field drives ComplianceBadge rendering:
 * - 'verified': renders with checkmark, full opacity
 * - 'under-evaluation': renders with clock icon, muted styling, qualifier text
 * - 'not-applicable': not rendered at all
 *
 * CRITICAL: Adding a new certification as 'verified' requires business
 * owner or legal confirmation. The data module includes a comment block
 * documenting this requirement.
 */
export interface ComplianceCertification {
  /** Unique identifier */
  id: string
  /** Certification name (e.g., "SOC 2 Type II") */
  name: string
  /** Brief description of what the certification covers */
  description: string
  /** Verification status -- controls rendering behavior */
  status: 'verified' | 'under-evaluation' | 'not-applicable'
  /** Human-readable status note (e.g., "Under evaluation. Contact us for current status.") */
  statusNote: string
  /**
   * Open question reference that blocks verification.
   * Null when status is 'verified'.
   */
  blockingQuestion: string | null
}

/** A system-level RBAC role. */
export interface RBACRole {
  /** Role name as defined in UserRole enum */
  name: string
  /** Which portal this role accesses */
  portal: 'Client' | 'Analyst' | 'HQ'
  /** Brief description of role scope */
  description: string
}

/**
 * An architecture credibility badge -- a verified architectural fact
 * (not a certification claim) displayed in a horizontal badge row.
 */
export interface ArchitectureBadge {
  /** Unique identifier */
  id: string
  /** Badge label (e.g., "Row Level Security") */
  label: string
  /** Lucide icon component name */
  iconName: string
}
```

### 4.2 Security Data Module (`src/lib/data/security-content.ts`)

Static data module exporting all security page content. This is the single source of truth -- the page component imports from here and never contains inline content strings. Every feature claim traces to a verified section of `product-review-safetrekr-app-v2-verified.md`.

```typescript
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
  title: 'Security architecture',
  subtitle:
    'How Safetrekr protects your data. This page is a technical specification designed for IT, legal, and insurance review.',
} as const

// ---------------------------------------------------------------------------
// SEO
// ---------------------------------------------------------------------------

export const SECURITY_SEO = {
  title: 'Safetrekr Security -- Data Architecture, Authentication, Privacy Compliance',
  description:
    'Row Level Security. Two-factor authentication. 10 role-based access levels. Encryption at rest and in transit. GDPR-compliant data governance. See exactly how Safetrekr protects your data.',
  url: 'https://safetrekr.com/security',
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
      'Your organization\'s data cannot be accessed by any other organization, regardless of application-layer logic.',
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
  { name: 'Org Admin', portal: 'Client', description: 'Full organization management' },
  { name: 'Billing Admin', portal: 'Client', description: 'Financial management' },
  { name: 'Security Officer', portal: 'Client', description: 'Safety and compliance' },
  { name: 'Analyst', portal: 'Analyst', description: 'Independent safety review' },
  { name: 'HQ Admin', portal: 'HQ', description: 'Platform administration' },
  { name: 'HQ Supervisor', portal: 'HQ', description: 'Operations management' },
  { name: 'HQ Security', portal: 'HQ', description: 'Platform security' },
  { name: 'HQ Ops', portal: 'HQ', description: 'Day-to-day operations' },
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
    sourceRef: 'Section 8: Evidence and Activity Tracking, Section 16: Audit Trail',
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
  'Safetrekr\'s security architecture is designed to meet institutional compliance requirements. The sections above describe what we build. This section describes what we certify.'

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
      'Children\'s Online Privacy Protection Act. Governs collection of personal information from children under 13.',
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
```

### 4.3 Page Component (`src/app/(marketing)/security/page.tsx`)

Server component that composes all sections. The entire page is a server component -- no client components are needed because the security page has no interactive state (no modals, no toggles, no forms).

**Component signature:**

```typescript
// src/app/(marketing)/security/page.tsx

import type { Metadata } from 'next'
import {
  SECURITY_HERO,
  SECURITY_SEO,
  ARCHITECTURE_BADGES,
  DATA_ARCHITECTURE_FEATURES,
  AUTH_FEATURES,
  RBAC_ROLES,
  RBAC_SUMMARY,
  PRIVACY_FEATURES,
  MOBILE_FEATURES,
  OPERATIONAL_FEATURES,
  COMPLIANCE_INTRO,
  COMPLIANCE_CERTIFICATIONS,
  COMPLIANCE_FOOTER,
  BOTTOM_CTA,
} from '@/lib/data/security-content'
import { SecurityFeatureCard } from '@/components/marketing/security/security-feature-card'
import { ComplianceBadge } from '@/components/marketing/security/compliance-badge'
import { RBACRoleTable } from '@/components/marketing/security/rbac-role-table'
import { ArchitectureBadgeRow } from '@/components/marketing/security/architecture-badge-row'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: SECURITY_SEO.title,
  description: SECURITY_SEO.description,
  openGraph: {
    title: SECURITY_SEO.title,
    description: SECURITY_SEO.description,
    type: 'website',
    url: SECURITY_SEO.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: SECURITY_SEO.title,
    description: SECURITY_SEO.description,
  },
}

export default function SecurityPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {/* Architecture Credibility Badges */}
      {/* Section 1: Data Architecture */}
      {/* Section 2: Authentication and Access Control */}
      {/* Section 3: Privacy and Data Governance */}
      {/* Section 4: Mobile Security (Traveler App) */}
      {/* Section 5: Operational Security */}
      {/* Section 6: Compliance Certifications */}
      {/* Bottom CTA */}
      {/* JSON-LD Structured Data */}
    </div>
  )
}
```

**Section layout pattern** (consistent with WS-B.9):

```tsx
<section className="relative py-20 md:py-28">
  <div className="mx-auto max-w-6xl px-6">
    {/* Section header */}
    <div className="mb-12 md:mb-16">
      <h2 className="font-sans text-2xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-3xl">
        {sectionTitle}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--color-text-secondary)]">
          {subtitle}
        </p>
      )}
    </div>
    {/* Section content */}
  </div>
</section>
```

**Note on text alignment:** Unlike the About page (WS-B.9) which centers section headers, the Security page left-aligns all headers and body text. Technical specification content reads faster left-aligned. The audience (IT directors, legal) expects document-style formatting, not marketing-style centered headers.

**Alternating section backgrounds:** Odd sections use `bg-transparent` (inherits void from body). Even sections use `bg-white/[0.02]` to create subtle visual separation. Same pattern as WS-B.9.

**Hero section specifics:**

```tsx
<section className="relative flex min-h-[40vh] items-end pb-16 pt-24 md:pb-20 md:pt-32">
  <div className="mx-auto max-w-6xl px-6">
    <h1 className="font-sans text-3xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-5xl">
      {SECURITY_HERO.title}
    </h1>
    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)] md:text-xl">
      {SECURITY_HERO.subtitle}
    </p>
  </div>
</section>
```

**Hero design rationale:** Bottom-aligned text with `items-end` instead of centered. Technical spec pages should feel like document entry points, not marketing hero sections. The hero is shorter (40vh instead of 50vh) to get the reader to the first specification section faster.

### 4.4 Architecture Badge Row (`src/components/marketing/security/architecture-badge-row.tsx`)

Server component rendering verified architecture facts as a horizontal badge row below the hero. These are architectural truths, not certification claims.

```typescript
// src/components/marketing/security/architecture-badge-row.tsx

import {
  Database,
  ShieldCheck,
  Lock,
  FileCheck,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ArchitectureBadge } from '@/lib/interfaces/security'

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Database,
  ShieldCheck,
  Lock,
  FileCheck,
}

interface ArchitectureBadgeRowProps {
  badges: ArchitectureBadge[]
}

export function ArchitectureBadgeRow({ badges }: ArchitectureBadgeRowProps) {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-12">
      <div className="flex flex-wrap items-center gap-3">
        {badges.map((badge) => {
          const Icon = ICON_MAP[badge.iconName]
          return (
            <div
              key={badge.id}
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-4 py-2',
                'border border-[rgba(var(--ember-rgb),0.15)]',
                'bg-[rgba(var(--ember-rgb),0.06)]',
                'text-sm font-medium text-[var(--color-text-primary)]',
              )}
            >
              {Icon && (
                <Icon size={14} className="text-[var(--color-ember)]" aria-hidden="true" />
              )}
              <span>{badge.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
```

**Visual treatment:** Pills with a subtle green-tinted border and background. Same color vocabulary as the "Combined expertise" callout in WS-B.9, adapted to pill shape. These are factual labels, not interactive.

### 4.5 Security Feature Card (`src/components/marketing/security/security-feature-card.tsx`)

Server component rendering a single security feature as a glass-morphism card with icon, title, and specification bullets.

```typescript
// src/components/marketing/security/security-feature-card.tsx

import {
  Database,
  HardDrive,
  Lock,
  Layers,
  Settings,
  Container,
  KeyRound,
  ShieldCheck,
  UserCheck,
  FileCheck,
  Eye,
  ScrollText,
  Clock,
  WifiOff,
  Fingerprint,
  MapPin,
  RefreshCw,
  UserCog,
  FileSearch,
  ScanSearch,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SecurityFeature } from '@/lib/interfaces/security'

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Database,
  HardDrive,
  Lock,
  Layers,
  Settings,
  Container,
  KeyRound,
  ShieldCheck,
  UserCheck,
  FileCheck,
  Eye,
  ScrollText,
  Clock,
  WifiOff,
  Fingerprint,
  MapPin,
  RefreshCw,
  UserCog,
  FileSearch,
  ScanSearch,
}

interface SecurityFeatureCardProps {
  feature: SecurityFeature
}

export function SecurityFeatureCard({ feature }: SecurityFeatureCardProps) {
  const Icon = ICON_MAP[feature.iconName]

  return (
    <article
      className={cn(
        'flex flex-col rounded-2xl p-6',
        // Glass material -- slightly more opaque than standard for readability
        'bg-white/[0.08] backdrop-blur-[16px] backdrop-saturate-[130%]',
        'border border-white/[0.08]',
      )}
    >
      {/* Icon + Title */}
      <div className="flex items-start gap-3">
        {Icon && (
          <div
            className={cn(
              'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg',
              'bg-[rgba(var(--ember-rgb),0.08)]',
            )}
          >
            <Icon size={20} className="text-[var(--color-ember)]" aria-hidden="true" />
          </div>
        )}
        <h3 className="font-sans text-lg font-bold text-[var(--color-text-primary)]">
          {feature.title}
        </h3>
      </div>

      {/* Specification bullets */}
      <ul className="mt-4 space-y-2" role="list">
        {feature.specs.map((spec, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm leading-relaxed text-[var(--color-text-secondary)]"
          >
            <span
              className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--color-ember)] opacity-60"
              aria-hidden="true"
            />
            {spec}
          </li>
        ))}
      </ul>
    </article>
  )
}
```

**Feature card grid layout** (in the page component):

```tsx
<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
  {DATA_ARCHITECTURE_FEATURES.map((feature) => (
    <SecurityFeatureCard key={feature.id} feature={feature} />
  ))}
</div>
```

**Responsive columns:**
- Mobile (< 768px): 1 column
- Tablet (768-1023px): 2 columns
- Desktop (>= 1024px): 3 columns for Data Architecture (6 cards), 3 columns for Authentication (3 cards), 2 columns for Privacy (4 cards), 2 columns for Mobile (4 cards), 3 columns for Operational (3 cards)

The column count per section is tuned to how many cards each section contains, to avoid orphaned single cards in the last row.

### 4.6 RBAC Role Table (`src/components/marketing/security/rbac-role-table.tsx`)

Server component rendering the 10 RBAC roles as an accessible HTML table with proper semantic markup.

```typescript
// src/components/marketing/security/rbac-role-table.tsx

import { cn } from '@/lib/utils'
import type { RBACRole } from '@/lib/interfaces/security'

interface RBACRoleTableProps {
  roles: RBACRole[]
  summary: string
}

export function RBACRoleTable({ roles, summary }: RBACRoleTableProps) {
  return (
    <div>
      <p className="mb-6 max-w-3xl text-base leading-relaxed text-[var(--color-text-secondary)]">
        {summary}
      </p>
      <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">
            Safetrekr role-based access control: 10 system roles across 3 portals
          </caption>
          <thead>
            <tr className="border-b border-white/[0.08] bg-white/[0.04]">
              <th
                scope="col"
                className="px-4 py-3 font-semibold text-[var(--color-text-primary)]"
              >
                Role
              </th>
              <th
                scope="col"
                className="px-4 py-3 font-semibold text-[var(--color-text-primary)]"
              >
                Portal
              </th>
              <th
                scope="col"
                className="px-4 py-3 font-semibold text-[var(--color-text-primary)]"
              >
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, i) => (
              <tr
                key={role.name}
                className={cn(
                  'border-b border-white/[0.04]',
                  i % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]',
                )}
              >
                <td className="px-4 py-3 font-medium text-[var(--color-text-primary)]">
                  {role.name}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium',
                      role.portal === 'Client' &&
                        'bg-[rgba(var(--ember-rgb),0.1)] text-[var(--color-ember-bright)]',
                      role.portal === 'Analyst' &&
                        'bg-[rgba(var(--teal-rgb),0.1)] text-[var(--color-teal-bright)]',
                      role.portal === 'HQ' &&
                        'bg-white/[0.06] text-[var(--color-text-secondary)]',
                    )}
                  >
                    {role.portal}
                  </span>
                </td>
                <td className="px-4 py-3 text-[var(--color-text-secondary)]">
                  {role.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
```

**Accessibility:** The table uses `<caption>` (visually hidden), `scope="col"` on header cells, and proper `<thead>`/`<tbody>` structure. Alternating row backgrounds use `bg-white/[0.02]` for subtle visual guidance. The table container has `overflow-x-auto` for horizontal scrolling on mobile.

**Portal badge colors:**
- Client portal: green tint (ember) -- aligns with the primary accent
- Analyst portal: teal tint -- differentiates the independent review role
- HQ portal: neutral -- internal operations

### 4.7 Compliance Badge (`src/components/marketing/security/compliance-badge.tsx`)

Server component with conditional rendering based on verification status. This is the critical Gap 10 resolution component -- it makes it architecturally impossible to display an unverified certification without the "under evaluation" qualifier.

```typescript
// src/components/marketing/security/compliance-badge.tsx

import { CheckCircle, Clock, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ComplianceCertification } from '@/lib/interfaces/security'

interface ComplianceBadgeProps {
  certification: ComplianceCertification
}

export function ComplianceBadge({ certification }: ComplianceBadgeProps) {
  // Do not render certifications marked as not applicable
  if (certification.status === 'not-applicable') {
    return null
  }

  const isVerified = certification.status === 'verified'

  return (
    <div
      className={cn(
        'flex flex-col rounded-xl p-5',
        'border',
        isVerified
          ? 'border-[rgba(var(--ember-rgb),0.2)] bg-[rgba(var(--ember-rgb),0.06)]'
          : 'border-white/[0.06] bg-white/[0.04]',
      )}
    >
      {/* Status indicator + Name */}
      <div className="flex items-start gap-3">
        {isVerified ? (
          <CheckCircle
            size={20}
            className="mt-0.5 flex-shrink-0 text-[var(--color-ember)]"
            aria-hidden="true"
          />
        ) : (
          <Clock
            size={20}
            className="mt-0.5 flex-shrink-0 text-[var(--color-text-tertiary)]"
            aria-hidden="true"
          />
        )}
        <div>
          <h4
            className={cn(
              'font-sans text-base font-semibold',
              isVerified
                ? 'text-[var(--color-text-primary)]'
                : 'text-[var(--color-text-secondary)]',
            )}
          >
            {certification.name}
          </h4>
          <p
            className={cn(
              'mt-1 text-sm leading-relaxed',
              isVerified
                ? 'text-[var(--color-text-secondary)]'
                : 'text-[var(--color-text-tertiary)]',
            )}
          >
            {certification.description}
          </p>
        </div>
      </div>

      {/* Status note */}
      <div
        className={cn(
          'mt-3 flex items-center gap-1.5 text-xs font-medium',
          isVerified
            ? 'text-[var(--color-ember)]'
            : 'text-[var(--color-text-tertiary)] italic',
        )}
      >
        {isVerified ? (
          <span>Certified</span>
        ) : (
          <span>{certification.statusNote}</span>
        )}
      </div>
    </div>
  )
}
```

**Rendering behavior by status:**

| Status | Icon | Opacity | Border | Background | Status Text |
|--------|------|---------|--------|------------|-------------|
| `verified` | CheckCircle (green) | Full | Green tint | Green tint | "Certified" |
| `under-evaluation` | Clock (muted) | Reduced | Faint white | Near-transparent | Status note from data |
| `not-applicable` | -- | -- | -- | -- | Not rendered at all |

**Why this design resolves Gap 10:** The `ComplianceCertification` interface requires an explicit `status` field. The data module (`security-content.ts`) defaults all three certifications to `under-evaluation`. Changing to `verified` requires editing the data module, which is commented with explicit warnings referencing Gap 10, Q-3, Q-4, and the combined recommendations. The component enforces visual differentiation -- there is no code path where an `under-evaluation` certification renders as verified.

### 4.8 Compliance Section Layout (in page component)

The compliance section is visually distinct from the architecture sections to reinforce the "what we build" vs "what we certify" separation.

```tsx
{/* Section 6: Compliance Certifications */}
<section className="relative py-20 md:py-28">
  <div className="mx-auto max-w-6xl px-6">
    {/* Section header with visual separator */}
    <div className="mb-12 md:mb-16">
      {/* Thin separator line */}
      <div
        className="mb-8 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
        aria-hidden="true"
      />
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[var(--color-text-tertiary)]">
        Compliance
      </p>
      <h2 className="font-sans text-2xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-3xl">
        Compliance certifications
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--color-text-secondary)]">
        {COMPLIANCE_INTRO}
      </p>
    </div>

    {/* Certification badges grid */}
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {COMPLIANCE_CERTIFICATIONS.map((cert) => (
        <ComplianceBadge key={cert.id} certification={cert} />
      ))}
    </div>

    {/* Footer note */}
    <p className="mt-8 text-sm text-[var(--color-text-tertiary)]">
      {COMPLIANCE_FOOTER}
    </p>
  </div>
</section>
```

**Visual distinction:** The compliance section adds a monospace "COMPLIANCE" label above the heading and a gradient separator line. This typographic treatment signals a shift from technical specification (architecture) to status reporting (certification). The WS-B.1 copy deck explicitly requires this page to read "like a technical specification" -- the compliance section is the one area where status qualifiers are appropriate.

### 4.9 Bottom CTA Section

```tsx
<section className="relative py-20 md:py-28">
  <div className="mx-auto max-w-2xl px-6 text-center">
    <h2 className="font-sans text-2xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-3xl">
      {BOTTOM_CTA.headline}
    </h2>
    <p className="mt-4 text-base text-[var(--color-text-secondary)]">
      {BOTTOM_CTA.supportingText}
    </p>
    <div className="mt-8">
      <a
        href={BOTTOM_CTA.primaryButton.href}
        className={cn(
          'inline-flex items-center rounded-lg px-8 py-3',
          'bg-[var(--color-ember)] text-base font-semibold text-[var(--color-void)]',
          'transition-all duration-200',
          'hover:bg-[var(--color-ember-bright)]',
          'focus-visible:outline-2 focus-visible:outline-offset-2',
          'focus-visible:outline-[var(--color-ember-bright)]',
          // Breathing glow (from WS-A.1 marketing.css: mkt-cta-breathe)
          'mkt-cta-breathe',
        )}
      >
        {BOTTOM_CTA.primaryButton.label}
      </a>
    </div>
  </div>
</section>
```

### 4.10 Print Styles

The security page is frequently printed or saved as PDF for procurement file attachment. Add print-specific styles to the page component or to a shared marketing print stylesheet.

**Approach:** Add a `<style>` block in the page component (server-rendered, zero JS cost) with `@media print` rules.

```tsx
<style
  dangerouslySetInnerHTML={{
    __html: `
      @media print {
        /* Light background for print */
        body { background: white !important; color: #1a1a1a !important; }

        /* Remove glass-morphism effects */
        [data-security-page] * {
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          background: transparent !important;
          border-color: #e5e5e5 !important;
        }

        /* Ensure text readability */
        [data-security-page] h1,
        [data-security-page] h2,
        [data-security-page] h3,
        [data-security-page] h4 { color: #1a1a1a !important; }
        [data-security-page] p,
        [data-security-page] li,
        [data-security-page] td { color: #333 !important; }

        /* Feature cards get borders instead of glass */
        [data-security-page] article {
          border: 1px solid #e5e5e5 !important;
          padding: 12px !important;
          page-break-inside: avoid;
        }

        /* Hide header, footer, CTA glow */
        header, footer, .mkt-cta-breathe { animation: none !important; }

        /* Table readability */
        [data-security-page] table {
          border-collapse: collapse;
        }
        [data-security-page] th,
        [data-security-page] td {
          border: 1px solid #e5e5e5 !important;
          padding: 8px !important;
        }
      }
    `,
  }}
/>
```

The page wrapper `<div>` uses `data-security-page` as a scoping attribute for these styles.

### 4.11 Structured Data (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Safetrekr Security Architecture",
  "description": "Technical specification of Safetrekr's security architecture: Row Level Security, JWT authentication with 2FA, 10-role RBAC, encryption at rest and in transit, GDPR-compliant data governance.",
  "url": "https://safetrekr.com/security",
  "publisher": {
    "@type": "Organization",
    "name": "Safetrekr",
    "url": "https://safetrekr.com"
  },
  "about": {
    "@type": "Thing",
    "name": "Data Security and Privacy",
    "description": "Enterprise security architecture for trip safety management platform"
  }
}
```

Rendered in the page component:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(webPageSchema),
  }}
/>
```

### 4.12 Component File Manifest

Complete list of all new files to be created:

| # | File Path | Type | Directive | Dependencies |
|---|-----------|------|-----------|--------------|
| 1 | `src/app/(marketing)/security/page.tsx` | Server component | -- | All data from `security-content.ts`, all security section components, Metadata type |
| 2 | `src/lib/interfaces/security.ts` | Type definitions | -- | None |
| 3 | `src/lib/data/security-content.ts` | Static data module | -- | `security` interfaces |
| 4 | `src/components/marketing/security/security-feature-card.tsx` | Server component | -- | `lucide-react` (20 icons), `cn`, `SecurityFeature` type |
| 5 | `src/components/marketing/security/compliance-badge.tsx` | Server component | -- | `lucide-react` (CheckCircle, Clock), `cn`, `ComplianceCertification` type |
| 6 | `src/components/marketing/security/rbac-role-table.tsx` | Server component | -- | `cn`, `RBACRole` type |
| 7 | `src/components/marketing/security/architecture-badge-row.tsx` | Server component | -- | `lucide-react` (Database, ShieldCheck, Lock, FileCheck), `cn`, `ArchitectureBadge` type |
| 8 | `src/components/marketing/security/index.ts` | Barrel export | -- | Re-exports all security section components |

**New directories:**

| Directory | Purpose |
|-----------|---------|
| `src/components/marketing/security/` | Security page section components |

**Total new TypeScript/TSX files: 8**
**Total new image files: 0** (no images needed -- all visual elements are icon-based)

---

## 5. Acceptance Criteria

### Verified Claims (Architecture Sections)

| ID | Criterion | Verification Method |
|----|-----------|---------------------|
| AC-1 | `/security` route resolves and renders inside the marketing layout (header visible above, footer visible below, WS-A.1 shell intact) | Manual: navigate to `/security` in dev server; verify header and footer presence |
| AC-2 | Hero section displays "Security architecture" title and technical specification subtitle, left-aligned | Manual: visual inspection |
| AC-3 | Architecture credibility badges render in a horizontal row below the hero: "Row Level Security", "Two-Factor Authentication", "Encrypted at Rest and In Transit", "GDPR-Compliant Data Governance" | Manual: verify all 4 badges present with green-tinted pill styling |
| AC-4 | Data Architecture section renders 6 feature cards in a responsive grid: 3-col on desktop, 2-col on tablet, 1-col on mobile | Manual: resize browser at each breakpoint; verify column count and card content |
| AC-5 | Each SecurityFeatureCard displays an icon, title, and specification bullets with green dot indicators | Manual: inspect multiple cards across all sections |
| AC-6 | Authentication section renders 3 feature cards (JWT, 2FA, Invite-Based) plus the RBAC role table | Manual: verify cards and table presence |
| AC-7 | RBAC role table displays all 10 roles with correct portal assignment and description, matching `product-review-safetrekr-app-v2-verified.md` Section 15 | Manual: compare table rows against source data |
| AC-8 | RBAC table uses `<table>`, `<thead>`, `<tbody>`, `<caption>` (sr-only), and `scope="col"` on header cells | DevTools: inspect table DOM structure |
| AC-9 | Portal badges in the RBAC table use color-coded pills: green for Client, teal for Analyst, neutral for HQ | Manual: visual inspection of all 10 rows |
| AC-10 | Privacy section renders 4 feature cards (GDPR, Contact Visibility, Audit Trail, Data Retention) | Manual: verify all 4 cards present with correct content |
| AC-11 | Mobile Security section renders 4 feature cards (Offline-First, Idempotency, On-Device Geofencing, Secure Sync) | Manual: verify all 4 cards present |
| AC-12 | Operational Security section renders 3 feature cards (Independent Analyst, Evidence Tracking, Background Checks) | Manual: verify all 3 cards present |

### Unverified Claims (Compliance Section)

| ID | Criterion | Verification Method |
|----|-----------|---------------------|
| AC-13 | Compliance section is visually separated from architecture sections with a gradient separator and monospace "COMPLIANCE" label | Manual: verify visual separation |
| AC-14 | Compliance intro text reads: "The sections above describe what we build. This section describes what we certify." | Manual: compare rendered text |
| AC-15 | All three compliance badges (SOC 2, FERPA, COPPA) render with `under-evaluation` status: Clock icon, muted text, italic status note "Under evaluation. Contact us for current status." | Manual: verify all 3 badges show muted/under-evaluation treatment |
| AC-16 | No compliance badge renders with a CheckCircle (verified) icon unless its `status` field in the data module has been explicitly changed to `'verified'` | Code review: verify `security-content.ts` has all statuses set to `'under-evaluation'` |
| AC-17 | Data module (`security-content.ts`) contains a comment block above the compliance section referencing Gap 10, Q-3, Q-4, and the requirement for business owner / legal confirmation before status changes | Code review: verify comment block exists |

### Cross-Cutting

| ID | Criterion | Verification Method |
|----|-----------|---------------------|
| AC-18 | Every security claim on the page traces to a code-verified "Implemented" feature in `product-review-safetrekr-app-v2-verified.md`. No scaffolded or planned features are mentioned. | Cross-reference: map each SecurityFeature's `sourceRef` to the product review; verify "Implemented" status |
| AC-19 | Page metadata renders correct `<title>` ("Safetrekr Security -- Data Architecture, Authentication, Privacy Compliance"), `<meta name="description">`, and OpenGraph tags | DevTools: inspect `<head>` elements |
| AC-20 | JSON-LD structured data renders with WebPage schema | DevTools: inspect `<script type="application/ld+json">` |
| AC-21 | Bottom CTA renders "Schedule a Security Briefing" linking to `/contact` with the `mkt-cta-breathe` glow animation class | Manual: verify link target and visual glow effect |
| AC-22 | All glass-morphism surfaces use the canonical pattern: `bg-white/[0.08] backdrop-blur-[16px] backdrop-saturate-[130%]` (slightly more opaque than standard for readability) + `border border-white/[0.08]` | Code review: verify CSS classes on all card components |
| AC-23 | No hardcoded hex colors in component files -- all colors reference spatial token CSS variables | Code review: grep for hex color values in security page components |
| AC-24 | No `import` from `'framer-motion'` -- only `'motion/react'` (though this page uses no motion/react since there are no client components) | Code review: verify no framer-motion imports |
| AC-25 | All section headings use proper heading hierarchy: `<h1>` for page title, `<h2>` for section titles, `<h3>` for card titles, `<h4>` for compliance cert names | DevTools: verify heading level sequence |
| AC-26 | All interactive elements (CTA button, any links) have visible focus indicators | Manual: Tab through all interactive elements |
| AC-27 | Print stylesheet renders the page with light background, dark text, borders instead of glass-morphism, and `page-break-inside: avoid` on feature cards | Manual: use browser Print Preview (Cmd+P) |
| AC-28 | `pnpm typecheck` passes with zero errors | CLI: run `pnpm typecheck` |
| AC-29 | `pnpm lint` passes with zero errors | CLI: run `pnpm lint` |
| AC-30 | `pnpm build` completes successfully | CLI: run `pnpm build` |

---

## 6. Decisions Made

| # | Decision | Rationale | Alternatives Considered |
|---|----------|-----------|------------------------|
| D-1 | Entire page is a server component with zero client components | The security page has no interactive state: no modals, no toggles, no forms, no animations. Server-only rendering gives optimal SEO, zero JS bundle cost, and the fastest possible paint for a content-heavy page. | Client component for collapsible sections (unnecessary complexity -- the audience reads this cover-to-cover, not selectively); client component for "copy to clipboard" on architecture badges (over-engineering for launch) |
| D-2 | `ComplianceCertification` interface requires an explicit `status` field with three valid values | This is the core Gap 10 resolution. The type system enforces that every certification has a deliberate status assignment. The data module defaults to `'under-evaluation'`. Changing to `'verified'` requires a conscious code change in a file with prominent warning comments. | Boolean `isVerified` field (less expressive -- no "under evaluation" vs "not applicable" distinction); no status field with a comment "TODO: verify" (easy to miss during implementation); environment variable toggle (too easy to accidentally flip in production) |
| D-3 | Security page uses left-aligned text, not centered headers | Technical specification content reads faster left-aligned. The target audience (IT directors, legal counsel, 40-60 age range) expects document-style formatting. Centered headers are appropriate for marketing pages (landing, about) but not for specification pages. | Centered headers matching WS-B.9 pattern (inconsistent with spec-document reading pattern); mixed alignment (visually inconsistent) |
| D-4 | Feature cards use `bg-white/[0.08]` (slightly more opaque than standard `bg-white/[0.06]`) | The security page has higher text density than other marketing pages. The additional 2% opacity improves contrast ratio for specification bullets, which are read word-for-word by the target audience. | Standard `bg-white/[0.06]` (adequate but tighter contrast margins on the dense spec text); `bg-white/[0.10]` (too much departure from the glass-morphism vocabulary) |
| D-5 | RBAC table uses portal-colored badges (green/teal/neutral) instead of a plain text column | Color-coded portal badges provide instant visual grouping of roles by access scope. IT directors evaluating access control need to quickly identify which roles access which portal. The color coding maps to the spatial token vocabulary (ember for primary/client, teal for secondary/analyst, neutral for internal/HQ). | Plain text "Client" / "Analyst" / "HQ" (harder to scan in a 10-row table); icon-based portal indicators (unclear meaning without labels) |
| D-6 | Print stylesheet is inlined in the page component via `<style>` tag, not in a shared CSS file | The security page is the only page with a print-optimized layout requirement (procurement teams print it). Inlining scopes the styles precisely and avoids loading print CSS on non-security pages. | Shared `print.css` imported in `globals.css` (affects all pages unnecessarily); `@media print` in `marketing.css` (couples print concerns to the marketing stylesheet) |
| D-7 | "Download the Security Overview" PDF CTA from WS-B.1 copy deck is replaced with "Schedule a Security Briefing" for launch | No PDF document exists yet. Shipping a download button with no file is worse than offering a human-to-human briefing. The PDF can be added post-launch when content is ready. "Schedule a Security Briefing" is functionally equivalent to "Schedule a Technical Review" from the copy deck. | Placeholder PDF with copy from this page (low quality; procurement teams expect a designed document, not a page dump); link to a Notion or Google Doc (unprofessional for the target audience) |
| D-8 | Architecture credibility badges use pill-shaped elements, not square cards or icon grids | Pills are compact and scannable. They communicate factual labels (not interactive features). The horizontal row placement directly below the hero creates a trust-signal strip that the reader sees before scrolling into the specification sections. This pattern matches the Tier 3 badges specified in WS-B.1 Section 4.7. | Large cards (visually competes with the feature card grid below); floating badges in the hero (clutters the hero; hero should be clean); footer placement (too late -- the reader needs to see these before the spec) |
| D-9 | Employee screening and incident response procedures are excluded from the page | WS-B.1 copy includes an "Operational security" section mentioning employee screening and incident response. However, these procedures are NOT verified in any Safetrekr codebase. The product review does not document them. Per the combined recommendations (R-03, R-05), only code-verified features appear on the marketing site. The operational security section covers the independent analyst model and audit trail -- both verified. | Include as prose without code reference (violates R-03 -- marketing unverified capabilities); include with a "policy in place" qualifier (still unverifiable; creates liability) |
| D-10 | Compliance section uses a gradient separator line and monospace "COMPLIANCE" label to visually distinguish it from architecture sections | The separation between "what we build" and "what we certify" is the central design principle of this page (Gap 10). Visual differentiation prevents the reader from conflating architectural facts with certification claims. The monospace label is a typographic cue that signals a shift from specification to status reporting. | Same styling as architecture sections (conflation risk); different background color for the entire section (too heavy-handed; breaks page flow); only a heading change (insufficient differentiation for a forwarded document where the recipient may scan headers only) |

---

## 7. Open Questions

| # | Question | Impact | Owner | Resolution Deadline |
|---|----------|--------|-------|---------------------|
| OQ-1 | What is the SOC 2 Type II certification status? Is it in progress, planned, or not pursued? | If verified: compliance badge changes to `'verified'` status. If not pursued: badge changes to `'not-applicable'` and is removed from the page. If in progress: current `'under-evaluation'` status is correct. | Business Owner (Q-3) | Before security page goes live |
| OQ-2 | Is FERPA compliance verified by legal counsel? | Same impact as OQ-1 for FERPA badge. Also affects K-12 Solutions card messaging in WS-B.7. | Legal (Q-4) | Before security page goes live |
| OQ-3 | Is COPPA compliance verified or under evaluation? | Same impact as OQ-1 for COPPA badge. | Legal | Before security page goes live |
| OQ-4 | Does Safetrekr have a formal incident response plan documented outside the codebase? | If yes: the operational security section could include an additional card referencing the plan (without disclosing details). If no: the current section content (independent analyst model, evidence tracking, background checks) is correct. | Business Owner | Before security page goes live |
| OQ-5 | Should the "Schedule a Security Briefing" CTA link to `/contact` or to a dedicated Calendly/scheduling URL for security-specific meetings? | Matches OQ-3 from WS-B.9. If external scheduling, the link needs `target="_blank"` and `rel="noopener noreferrer"`. | Product | Before WS-A.4 implementation |
| OQ-6 | Should a downloadable PDF security overview be prioritized for Phase C or Phase D? | The WS-B.1 copy deck includes "Download the Security Overview" as a primary CTA. This SOW defers it, but procurement teams strongly prefer a PDF. Creating the PDF requires content design work beyond this workstream's scope. | Product | Phase C planning |
| OQ-7 | Does Safetrekr encrypt data in Supabase using customer-managed keys, or is it Supabase-managed encryption only? | Affects the specificity of the "Encryption at Rest" card. Currently worded as "managed by Supabase." If customer-managed keys exist, this is a stronger claim. | Engineering | Before security page goes live |

---

## 8. Risk Register

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|------------|--------|------------|
| R-1 | A compliance certification is accidentally changed to `'verified'` without actual verification, creating a false claim on a public page | Low | Critical | Three safeguards: (1) The data module has a prominent comment block referencing Gap 10, Q-3, Q-4. (2) The `ComplianceCertification` type requires an explicit `status` field -- there is no default or implicit verified state. (3) Code review during implementation should verify all statuses match the current verification state. If additional safeguard is needed: add a build-time assertion that fails if any certification has `status: 'verified'` (can be removed when certifications are confirmed). |
| R-2 | Target audience (IT directors, 40-60 age range) finds the dark glass-morphism aesthetic unprofessional or difficult to read | Medium | High | The security page uses `bg-white/[0.08]` (more opaque than standard) for feature cards and includes a print stylesheet with light background for physical/PDF distribution. The print-friendly rendering is the primary mitigation -- IT directors who struggle with the dark interface can print the page. Post-launch: monitor bounce rate on `/security`; if higher than other pages, consider a dedicated light-mode toggle for this page only. |
| R-3 | WS-B.1 (copy deck) delivers security copy that differs from the specification-style content drafted in this SOW | Medium | Medium | This SOW's data module is derived directly from the WS-B.1 copy deck Section 4.4.6 and the verified product review. If WS-B.1 delivers revised copy, the data module is the only file that needs updating -- components are content-agnostic. The implementing agent should prefer WS-B.1 final copy over the data module in this SOW if they differ. |
| R-4 | RBAC role table does not render well on narrow mobile screens (3 columns may be too wide) | Medium | Low | The table container has `overflow-x-auto` for horizontal scrolling on mobile. This is a standard pattern for data tables on responsive layouts. If scrolling is problematic in testing, an alternative is to render the table as stacked cards on mobile (using `<dl>` instead of `<table>` at the mobile breakpoint). |
| R-5 | Structured data (JSON-LD) is flagged by search engines as missing expected fields for a security page | Low | Low | The WebPage schema is the most appropriate generic schema. There is no Schema.org type specifically for security specification pages. If Google Search Console flags issues, add `SoftwareApplication` schema with security-related properties. |
| R-6 | WS-A.1 (marketing layout) is not yet complete, blocking page implementation | Medium | High | Same mitigation as WS-B.9 R-7: Security page components (feature cards, compliance badges, RBAC table) can be developed in isolation and composed into the layout once WS-A.1 ships. The page can render with a minimal local layout wrapper as a temporary shim. |
| R-7 | Approved copy from WS-B.1 arrives after the implementation window, delaying the security page | Medium | Medium | The data module in this SOW contains implementation-ready content derived from the WS-B.1 draft and the verified product review. Implementation can proceed with this content. If WS-B.1 produces revised copy later, only the data module needs updating. |
| R-8 | Print stylesheet does not render correctly across all browsers (especially Chrome vs Safari print engines) | Low | Medium | The print styles use standard CSS properties (`background`, `color`, `border`) that are well-supported. `page-break-inside: avoid` has broad support. Test in Chrome and Safari during implementation. If issues arise, simplify the print stylesheet to focus on text readability over layout precision. |

---

## Verified Feature Traceability Matrix

Every security claim on this page must trace to a code-verified "Implemented" feature. This matrix documents the traceability from page content to source verification.

| Page Section | Claim | Product Review Source | Status |
|--------------|-------|----------------------|--------|
| Data Architecture | Row Level Security on every table | Section 16: Architecture Highlights | **Implemented** |
| Data Architecture | Encryption at rest (Supabase-managed) | Section 16: Supabase integration | **Implemented** |
| Data Architecture | TLS for all communication | Section 16: Architecture Highlights | **Implemented** |
| Data Architecture | Four-portal role-based separation | Section 16: Four-Portal Architecture | **Implemented** |
| Data Architecture | Runtime configuration (not build-time) | Section 16: Runtime Configuration | **Implemented** |
| Data Architecture | Containerized Kubernetes deployment | Section 16: Containerized Deployment | **Implemented** |
| Authentication | JWT with automatic token refresh | Section 15: Authentication and Session Management | **Implemented** |
| Authentication | Two-factor authentication | Section 13: User Profile and Security | **Implemented** |
| Authentication | Invite-based activation (no self-registration) | Section 13: Onboarding | **Implemented** |
| Authentication | 10 system-level RBAC roles | Section 15: Role-Based Access Control | **Implemented** |
| Authentication | Automatic portal routing by role | Section 15: Role-Based Access Control | **Implemented** |
| Privacy | GDPR data export UI | Section 13: Data Export | **UI implemented** (backend in progress) |
| Privacy | Account deletion with 30-day grace | Section 13: Account Deletion | **Implemented** |
| Privacy | Consent history with timestamps | Section 13: Consent History | **Implemented** |
| Privacy | Contact visibility controls | Section 13: Contact Visibility | **Implemented** |
| Privacy | Analytics opt-in/out | Section 13: Analytics Opt-In/Out | **Implemented** |
| Privacy | Audit trail with user attribution | Section 8: Evidence and Activity Tracking, Section 16 | **Implemented** |
| Mobile | Offline-first SQLite database | Section 9a: Offline Data Queue | **Implemented** |
| Mobile | Idempotency keys on queued requests | Section 9a: Offline Data Queue | **Implemented** |
| Mobile | On-device geofencing (expo-location) | Section 9a: Active Geofencing | **Implemented** |
| Mobile | Background task for geofence monitoring | Section 9a: Active Geofencing | **Implemented** |
| Operational | Independent analyst review model | Section 8: Independent Safety Review | **Implemented** |
| Operational | Evidence and activity tracking | Section 8: Evidence and Activity Tracking | **Implemented** |
| Operational | Background check integration (3 providers) | Section 3: Background Checks | **Implemented** |
| Compliance | SOC 2 Type II | -- | **UNVERIFIED** (Q-3) |
| Compliance | FERPA | -- | **UNVERIFIED** (Q-4) |
| Compliance | COPPA | -- | **UNVERIFIED** |

**Note on GDPR data export:** The UI is implemented but the backend data extraction pipeline is in progress (per product review Section 13). The security page states "User-initiated data export for data portability" which accurately describes the UI capability. The word "capability" rather than "fully operational pipeline" is deliberate. If the implementing agent judges this claim too aggressive, it can be softened to "User-initiated data export (data portability interface deployed)" -- but the feature is genuinely implemented on the user-facing side.

---

## Estimated Effort

**Size:** M (Medium)
**Estimated time:** 4-6 hours implementation + verification
**Files touched:** 8 new TypeScript/TSX files, 0 modified existing files, 0 image files
**Client components:** 0 (entire page is server-rendered)
