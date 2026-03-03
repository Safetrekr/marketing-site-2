// src/lib/config/platform-data.ts

import {
  LayoutDashboard, // Client Portal
  Shield, // Analyst Portal
  Monitor, // HQ Console
  Smartphone, // Traveler App
  ClipboardList, // Planning & Analysis
  AlertTriangle, // Intelligence & Risk
  ShieldCheck, // Protection System
  Send, // Traveler Delivery
  FileCheck, // Compliance & Audit
  Settings, // HQ Command
} from 'lucide-react'

import type {
  PortalData,
  DomainData,
  IntegrationHighlight,
} from '@/lib/interfaces/platform'

// --- Portal Data ----------------------------------------------------------

export const PORTALS: PortalData[] = [
  {
    id: 'client',
    name: 'Client Portal',
    monoLabel: 'PORTAL // CLIENT',
    roleLabel: 'For organization administrators.',
    description:
      'Plan trips with the 10-step wizard. Manage rosters, collect documents, track background checks, and monitor real-time intelligence alerts. Your operational command center for every trip.',
    icon: LayoutDashboard,
    screenshotAspectRatio: 16 / 10,
  },
  {
    id: 'analyst',
    name: 'Analyst Portal',
    monoLabel: 'PORTAL // ANALYST',
    roleLabel: 'For independent safety analysts.',
    description:
      'Review every trip across 18 safety dimensions. Triage intelligence alerts. Flag issues, assign checklists, and make approval decisions -- all documented with full audit trail.',
    icon: Shield,
    screenshotAspectRatio: 16 / 10,
  },
  {
    id: 'hq',
    name: 'HQ Console',
    monoLabel: 'PORTAL // HQ',
    roleLabel: 'For Safetrekr operations.',
    description:
      'Manage organizations, analysts, policies, and platform configuration. Monitor system health, manage review queues, and oversee the analyst workforce.',
    icon: Monitor,
    screenshotAspectRatio: 16 / 10,
  },
  {
    id: 'traveler',
    name: 'Traveler App',
    monoLabel: 'PORTAL // TRAVELER',
    roleLabel: 'For travelers, chaperones, and guardians.',
    description:
      'Native mobile app with offline-first architecture. Receive live itineraries, safety checklists, intelligence alerts, and emergency preparedness information. Acknowledge alerts. Access emergency contacts. All on-device, even without connectivity.',
    icon: Smartphone,
    screenshotAspectRatio: 9 / 16, // Mobile app: portrait aspect ratio
  },
]

// --- Domain Data ----------------------------------------------------------

export const DOMAINS: DomainData[] = [
  {
    id: 'planning',
    name: 'Planning & Analysis',
    monoLabel: 'DOMAIN // PLANNING',
    tagline: 'Structured trip planning from day trips to international travel.',
    icon: ClipboardList,
    features: [
      '10-step trip creation wizard with tier-based complexity (T1 / T2 / T3)',
      'Traveler registry with intelligent matching, bulk CSV/Excel import, and automatic deduplication',
      'Flight lookup via AviationStack API with auto-populated airline and terminal data',
      'Day-by-day itinerary builder with auto-populated events from flights, lodging, and venues',
      'Ground transportation documentation between itinerary events',
      'Real-time add-on pricing calculated per participant count',
      'Client dashboard with KPI cards, activity feed, and sortable trip directory',
    ],
  },
  {
    id: 'intelligence',
    name: 'Intelligence & Risk',
    monoLabel: 'DOMAIN // INTELLIGENCE',
    tagline: 'Real-time threat monitoring with analyst triage.',
    icon: AlertTriangle,
    features: [
      'TarvaRI intelligence engine with multi-source data aggregation',
      'Alert classification by severity (critical, high, medium, low) and category (weather, security, health, transport, political)',
      'Risk scoring with percentile confidence bands (P5, P50, P95)',
      'Analyst triage workflow: pending, approved, rejected, snoozed',
      'Delivery routing by urgency: urgent, AM digest, PM digest, scheduled',
      'Continuous feed with infinite scroll, severity color coding, and status indicators',
      'Traveler acknowledgment tracking with proof of receipt',
    ],
  },
  {
    id: 'protection',
    name: 'Protection System',
    monoLabel: 'DOMAIN // PROTECTION',
    tagline: 'Active emergency preparedness, not a binder on a shelf.',
    icon: ShieldCheck,
    features: [
      '46-endpoint protection API covering rally points, safe houses, musters, and check-ins',
      'Rally point management with GPS coordinates, approval workflows, and automatic geofence creation',
      'Safe house management with type categorization and exit-alert geofencing',
      'Three-tier evacuation planning: shelter in place, local evacuation, relocation',
      'Medical facility directory with trauma capability levels and estimated travel times',
      'Emergency kit profile recommendations based on trip characteristics',
      'Automatic geofence synchronization when protection resources change',
    ],
  },
  {
    id: 'delivery',
    name: 'Traveler Delivery',
    monoLabel: 'DOMAIN // DELIVERY',
    tagline: "Safety information on every traveler's device, with proof.",
    icon: Send,
    features: [
      'Native mobile app (iOS and Android) with offline-first SQLite architecture',
      'Geo-triggered checklist delivery activated by zone entry',
      'Time-relative checklist delivery (configurable days before departure)',
      'Background geofence monitoring with violation alerts for chaperones and guardians',
      'SMS emergency broadcast to all trip participants',
      'Alert acknowledgment with audit trail',
      'Role-based trip packet generation for offline reference',
    ],
  },
  {
    id: 'compliance',
    name: 'Compliance & Audit',
    monoLabel: 'DOMAIN // COMPLIANCE',
    tagline:
      'Background checks, documents, certifications -- tracked automatically.',
    icon: FileCheck,
    features: [
      '5 background check types (criminal, sex offender, driving, employment, education)',
      '3 integrated screening providers (Checkr, Sterling, GoodHire)',
      'Participant-by-check compliance matrix with six-status tracking',
      '9 document requirement templates (4 consent types + 5 document types) with role-based targeting',
      'Configurable due dates with automated reminders (7, 3, 1 day before deadline)',
      '12 predefined certification types with expiration monitoring (valid, expiring, expired)',
      'Full evidence and activity audit trail with three source types (client, analyst, system)',
    ],
  },
  {
    id: 'hq-command',
    name: 'HQ Command',
    monoLabel: 'DOMAIN // MANAGEMENT',
    tagline: 'Team roles, branding, and platform configuration.',
    icon: Settings,
    features: [
      '10 system-level roles with ascending privilege and automatic portal routing',
      'Team invitation and role assignment (Org Admin, Billing Admin, Security Officer)',
      'Organization branding: logo, brand colors, trip packet watermarks, security hotline',
      'Trip defaults: chaperone ratios, floor policies, required data fields, packet templates',
      'Two-factor authentication and security device management',
      'GDPR-compliant privacy controls: contact visibility, analytics opt-in/out, data export, account deletion',
      'Consent history with timestamped audit trail',
    ],
  },
]

// --- Integration Highlights -----------------------------------------------

export const INTEGRATION_HIGHLIGHTS: IntegrationHighlight[] = [
  {
    name: 'AviationStack',
    purpose: 'Real-time flight data lookup during trip creation',
    category: 'data',
  },
  {
    name: 'TarvaRI',
    purpose: 'Multi-source intelligence aggregation and risk scoring',
    category: 'data',
  },
  {
    name: 'Checkr / Sterling / GoodHire',
    purpose: 'Background check screening across five check types',
    category: 'compliance',
  },
  {
    name: 'Supabase',
    purpose:
      'PostgreSQL with Row Level Security and real-time subscriptions',
    category: 'infrastructure',
  },
  {
    name: 'Stripe',
    purpose: 'Payment processing for trip purchases and add-on services',
    category: 'infrastructure',
  },
  {
    name: 'MapLibre GL',
    purpose:
      'Interactive map visualization for lodging, venues, and emergency facilities',
    category: 'data',
  },
  {
    name: 'expo-location',
    purpose:
      'Native geofencing with background monitoring on mobile devices',
    category: 'delivery',
  },
  {
    name: 'expo-sqlite',
    purpose: 'Offline-first action queue for the Traveler App',
    category: 'delivery',
  },
]

// --- Architecture Highlights (badge pills) --------------------------------

export const ARCHITECTURE_HIGHLIGHTS = [
  'Four-Portal Architecture',
  'Row Level Security',
  'Offline-First Mobile',
  '46-Endpoint Protection API',
  'Real-Time Subscriptions',
] as const
