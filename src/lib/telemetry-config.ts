/**
 * Telemetry aggregator configuration.
 *
 * Contains the district registry (all 6 Safetrekr marketing districts),
 * polling intervals, and display constants consumed by the client-side
 * hook and components.
 *
 * In the marketing context, these are decorative entries used by ambient
 * effects. No actual health check endpoints are polled.
 *
 * @module telemetry-config
 * @see WS-1.5
 */

import type { TelemetryAppConfig } from './telemetry-types'

// ---------------------------------------------------------------------------
// App registry
// ---------------------------------------------------------------------------

/**
 * Registry of all 6 Safetrekr marketing districts.
 *
 * Marketing districts do not have real health check endpoints.
 * All entries use 'stub' checkType for decorative ambient effects.
 */
export const TELEMETRY_APPS: TelemetryAppConfig[] = [
  {
    id: 'how-it-works',
    name: 'How It Works',
    port: null,
    healthPath: '',
    checkType: 'stub',
  },
  {
    id: 'who-its-for',
    name: "Who It's For",
    port: null,
    healthPath: '',
    checkType: 'stub',
  },
  {
    id: 'platform',
    name: 'Platform',
    port: null,
    healthPath: '',
    checkType: 'stub',
  },
  {
    id: 'security',
    name: 'Security',
    port: null,
    healthPath: '',
    checkType: 'stub',
  },
  {
    id: 'pricing',
    name: 'Pricing',
    port: null,
    healthPath: '',
    checkType: 'stub',
  },
  {
    id: 'get-started',
    name: 'Get Started',
    port: null,
    healthPath: '',
    checkType: 'stub',
  },
]

// ---------------------------------------------------------------------------
// Polling configuration
// ---------------------------------------------------------------------------

/** Health check timeout in milliseconds. */
export const HEALTH_CHECK_TIMEOUT_MS = 3000

/** Adaptive polling intervals (milliseconds). */
export const POLLING_INTERVALS = {
  /** Default polling interval. */
  normal: 15_000,
  /** Tightened interval when any app is DEGRADED or DOWN. */
  alert: 5_000,
  /** Relaxed interval after consecutive stable cycles. */
  relaxed: 30_000,
  /** Number of consecutive stable cycles before relaxing. */
  stableCyclesThreshold: 5,
} as const

// ---------------------------------------------------------------------------
// Display constants
// ---------------------------------------------------------------------------

/** Maximum sparkline data points to retain in client-side history. */
export const SPARKLINE_HISTORY_LENGTH = 30
