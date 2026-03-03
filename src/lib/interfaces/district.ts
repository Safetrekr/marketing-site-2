/**
 * District type definitions and constants for the Launch Atrium.
 *
 * Defines the 6 Safetrekr marketing districts, health states,
 * capsule telemetry shape, and the health-to-color mapping consumed
 * by capsule and ambient components.
 *
 * @module district
 * @see WS-A.2 Section 4.1
 */

// ---------------------------------------------------------------------------
// District identity
// ---------------------------------------------------------------------------

/** Unique identifier for each Safetrekr marketing district. */
export type DistrictId =
  | 'how-it-works'
  | 'who-its-for'
  | 'platform'
  | 'security'
  | 'pricing'
  | 'get-started'

/** Operational health state of a district (used by ambient decorative effects). */
export type HealthState =
  | 'OPERATIONAL'
  | 'DEGRADED'
  | 'DOWN'
  | 'OFFLINE'
  | 'UNKNOWN'

// ---------------------------------------------------------------------------
// Telemetry
// ---------------------------------------------------------------------------

/** Marketing-relevant metadata surfaced by each district capsule. */
export interface CapsuleTelemetry {
  /** Short tagline displayed on the capsule face. */
  tagline: string
  /** Stat line for visual interest (e.g. "256-bit AES" or "SOC 2 Type II"). */
  statLine: string
  /** Target marketing page path for navigation. */
  targetPage: string
}

// ---------------------------------------------------------------------------
// District metadata
// ---------------------------------------------------------------------------

/** Static metadata for a single Safetrekr marketing district. */
export interface DistrictMeta {
  /** Unique district identifier. */
  id: DistrictId
  /** Full display name (e.g. "How It Works"). */
  displayName: string
  /** Abbreviated name for tight spaces (e.g. "HOW"). */
  shortName: string
  /** Position index in the capsule ring (0-5). */
  ringIndex: 0 | 1 | 2 | 3 | 4 | 5
  /** Target marketing page path (e.g. "/how-it-works"). */
  targetPage: string
  /** Single-line tagline for capsule display. */
  tagline: string
  /** Whether this district uses amber accent for conversion emphasis. */
  isConversionDistrict?: boolean
}

// ---------------------------------------------------------------------------
// Capsule data (metadata + telemetry + sparkline)
// ---------------------------------------------------------------------------

/** Complete data payload for a single capsule in the ring. */
export interface CapsuleData {
  /** Static district metadata. */
  district: DistrictMeta
  /** Marketing telemetry for capsule display. */
  telemetry: CapsuleTelemetry
  /** Array of numeric data points for the sparkline chart (decorative). */
  sparklineData: number[]
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** All 6 Safetrekr marketing districts, ordered by ring position. */
export const DISTRICTS: readonly DistrictMeta[] = [
  {
    id: 'how-it-works',
    displayName: 'How It Works',
    shortName: 'HOW',
    ringIndex: 0,
    targetPage: '/how-it-works',
    tagline: 'See the system in action',
  },
  {
    id: 'who-its-for',
    displayName: "Who It's For",
    shortName: 'WHO',
    ringIndex: 1,
    targetPage: '/solutions',
    tagline: 'Built for safety leaders',
  },
  {
    id: 'platform',
    displayName: 'Platform',
    shortName: 'PLATFORM',
    ringIndex: 2,
    targetPage: '/platform',
    tagline: 'Architecture & capabilities',
  },
  {
    id: 'security',
    displayName: 'Security',
    shortName: 'SECURITY',
    ringIndex: 3,
    targetPage: '/security',
    tagline: 'Enterprise-grade protection',
  },
  {
    id: 'pricing',
    displayName: 'Pricing',
    shortName: 'PRICING',
    ringIndex: 4,
    targetPage: '/pricing',
    tagline: 'Transparent plans',
  },
  {
    id: 'get-started',
    displayName: 'Get Started',
    shortName: 'START',
    ringIndex: 5,
    targetPage: '/contact',
    tagline: 'Schedule a briefing',
    isConversionDistrict: true,
  },
] as const

/**
 * Maps each HealthState to its CSS color token, glow token,
 * StatusBadge category, dot animation, and accessible label.
 *
 * Retained for ambient decorative effects (glowing dots, connection
 * path colors, constellation view) even though capsules no longer
 * represent real operational health.
 */
export const HEALTH_STATE_MAP: Record<
  HealthState,
  {
    /** CSS custom property name for the status color. */
    color: string
    /** CSS custom property name for the glow box-shadow. */
    glowToken: string
    /** StatusBadge category for @tarva/ui integration. */
    statusCategory: 'success' | 'warning' | 'danger' | 'neutral' | 'muted'
    /** Whether the status dot should pulse. */
    dotAnimation: 'pulse' | 'none'
    /** Human-readable health label. */
    label: string
  }
> = {
  OPERATIONAL: {
    color: '--color-healthy',
    glowToken: '--glow-healthy',
    statusCategory: 'success',
    dotAnimation: 'pulse',
    label: 'Operational',
  },
  DEGRADED: {
    color: '--color-warning',
    glowToken: '--glow-warning',
    statusCategory: 'warning',
    dotAnimation: 'none',
    label: 'Degraded',
  },
  DOWN: {
    color: '--color-error',
    glowToken: '--glow-error',
    statusCategory: 'danger',
    dotAnimation: 'pulse',
    label: 'Down',
  },
  OFFLINE: {
    color: '--color-offline',
    glowToken: '',
    statusCategory: 'neutral',
    dotAnimation: 'none',
    label: 'Offline',
  },
  UNKNOWN: {
    color: '--color-offline',
    glowToken: '',
    statusCategory: 'muted',
    dotAnimation: 'none',
    label: 'Unknown',
  },
}

// ---------------------------------------------------------------------------
// Constellation View (Z0) types
// ---------------------------------------------------------------------------

/** Two-letter compact codes for Z0 beacon labels. */
export type DistrictCode = 'HW' | 'WF' | 'PL' | 'SE' | 'PR' | 'GS'

/** Maps DistrictId to its compact code for Z0 display. */
export const DISTRICT_CODES: Record<DistrictId, DistrictCode> = {
  'how-it-works': 'HW',
  'who-its-for': 'WF',
  'platform': 'PL',
  'security': 'SE',
  'pricing': 'PR',
  'get-started': 'GS',
} as const

/** Data shape for a single beacon at Z0. */
export interface BeaconData {
  /** District identifier. */
  id: DistrictId
  /** Compact two-letter code. */
  code: DistrictCode
  /** Current health state (drives color + glow). */
  health: HealthState
  /** Number of active alerts for this district. */
  alerts: number
  /** Ring position index (0-5, same as capsule positions). */
  ringIndex: number
}

/** Three aggregate metrics displayed at Z0. */
export interface ConstellationMetrics {
  /** Total alert count across all districts. */
  alertCount: number
  /** Total active work items (sum of pulse counts). */
  activeWork: number
  /** Worst health state across all districts (worst-of-five). */
  systemPulse: HealthState
}

// ---------------------------------------------------------------------------
// Marketing capsule data
// ---------------------------------------------------------------------------

/** Sample sparkline data (12 points, decorative). */
function generateSparklineData(): number[] {
  return [42, 55, 48, 62, 58, 71, 65, 78, 72, 85, 80, 88]
}

/** Per-district stat lines for capsule display. */
const MARKETING_STAT_LINES: Record<DistrictId, string> = {
  'how-it-works': '3-step process',
  'who-its-for': '5 industries',
  'platform': 'Real-time tracking',
  'security': 'SOC 2 Type II',
  'pricing': 'From $0/month',
  'get-started': 'Free trial',
}

/** Marketing capsule data for all 6 districts. */
export const MARKETING_CAPSULE_DATA: CapsuleData[] = DISTRICTS.map((district) => ({
  district,
  telemetry: {
    tagline: district.tagline,
    statLine: MARKETING_STAT_LINES[district.id],
    targetPage: district.targetPage,
  },
  sparklineData: generateSparklineData(),
}))
