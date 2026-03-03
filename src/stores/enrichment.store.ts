/**
 * Enrichment store -- Zustand + Immer store for ambient enrichment data.
 *
 * Holds the complete EnrichmentSnapshot consumed by the 12 ambient
 * enrichment components (range rings, orbital readouts, system status
 * panel, activity feed, signal pulse monitor, connection paths, etc.).
 *
 * Written to by `useEnrichmentCycle` on a 2-second interval.
 * Read by ambient components via selectors.
 *
 * @module enrichment.store
 * @see WS-1.6 Ambient Effects Layer
 */

import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import type { DistrictId, HealthState } from '@/lib/interfaces/district'
import { DISTRICTS, DISTRICT_CODES } from '@/lib/interfaces/district'
import type {
  ActivityEvent,
  ConnectionState,
  DistrictEnrichment,
  EnrichmentSnapshot,
  PerformanceMetrics,
  WaveformState,
} from '@/lib/enrichment/enrichment-types'
import { useAttentionStore } from '@/stores/attention.store'

// ============================================================================
// Constants
// ============================================================================

/** Maximum number of activity events retained in the log (FIFO). */
const MAX_ACTIVITY_LOG = 50

// ============================================================================
// Seed data helpers
// ============================================================================

/**
 * Deterministic seed values per district to avoid hydration mismatch.
 * Math.random() differs between server and client, causing React to
 * regenerate the tree. These fixed values provide the same visual variety.
 */
const SEED_VALUES: Record<DistrictId, { uptime: number; responseTimeMs: number; activeWork: number; memoryUsagePct: number; cpuUsagePct: number }> = {
  'how-it-works': { uptime: 9720, responseTimeMs: 42, activeWork: 7, memoryUsagePct: 48, cpuUsagePct: 22 },
  'who-its-for':  { uptime: 28350, responseTimeMs: 31, activeWork: 4, memoryUsagePct: 55, cpuUsagePct: 18 },
  'platform':     { uptime: 14400, responseTimeMs: 58, activeWork: 9, memoryUsagePct: 62, cpuUsagePct: 35 },
  'security':     { uptime: 43200, responseTimeMs: 25, activeWork: 2, memoryUsagePct: 41, cpuUsagePct: 12 },
  'pricing':      { uptime: 7200, responseTimeMs: 67, activeWork: 11, memoryUsagePct: 38, cpuUsagePct: 40 },
  'get-started':  { uptime: 36000, responseTimeMs: 44, activeWork: 5, memoryUsagePct: 52, cpuUsagePct: 28 },
}

/** Build the initial DistrictEnrichment for a single district. */
function seedDistrict(id: DistrictId): DistrictEnrichment {
  const meta = DISTRICTS.find((d) => d.id === id)
  const seed = SEED_VALUES[id]
  return {
    id,
    displayName: meta?.displayName ?? id,
    shortCode: DISTRICT_CODES[id],
    health: 'OPERATIONAL' as HealthState,
    uptime: seed.uptime,
    responseTimeMs: seed.responseTimeMs,
    alertCount: 0,
    activeWork: seed.activeWork,
    version: '1.2.0',
    freshness: 'LIVE',
    memoryUsagePct: seed.memoryUsagePct,
    cpuUsagePct: seed.cpuUsagePct,
  }
}

/** All 6 district IDs in ring order. */
const ALL_DISTRICT_IDS: DistrictId[] = [
  'how-it-works',
  'who-its-for',
  'platform',
  'security',
  'pricing',
  'get-started',
]

/** Build the initial districts record. */
function seedDistricts(): Record<DistrictId, DistrictEnrichment> {
  const result = {} as Record<DistrictId, DistrictEnrichment>
  for (const id of ALL_DISTRICT_IDS) {
    result[id] = seedDistrict(id)
  }
  return result
}

/**
 * Build the initial 6 connections matching connection-paths.tsx.
 *
 * 1. how-it-works -> platform     (DATA LINK)
 * 2. how-it-works -> who-its-for  (DATA LINK)
 * 3. get-started  -> how-it-works (SYNC)
 * 4. get-started  -> who-its-for  (SYNC)
 * 5. pricing      -> platform     (CHANNEL)
 * 6. security     -> null/hub     (CORE LINK)
 */
function seedConnections(): ConnectionState[] {
  return [
    { fromId: 'how-it-works', toId: 'platform', health: 'OPERATIONAL', label: 'DATA LINK' },
    { fromId: 'how-it-works', toId: 'who-its-for', health: 'OPERATIONAL', label: 'DATA LINK' },
    { fromId: 'get-started', toId: 'how-it-works', health: 'OPERATIONAL', label: 'SYNC' },
    { fromId: 'get-started', toId: 'who-its-for', health: 'OPERATIONAL', label: 'SYNC' },
    { fromId: 'pricing', toId: 'platform', health: 'OPERATIONAL', label: 'CHANNEL' },
    { fromId: 'security', toId: null, health: 'OPERATIONAL', label: 'CORE LINK' },
  ]
}

// ============================================================================
// State
// ============================================================================

type EnrichmentStoreState = EnrichmentSnapshot

// ============================================================================
// Actions
// ============================================================================

interface EnrichmentStoreActions {
  /** Merge a partial enrichment snapshot into state. */
  updateSnapshot: (snapshot: Partial<EnrichmentSnapshot>) => void
  /** Add an activity event to the log (FIFO, max 50). */
  pushActivity: (event: ActivityEvent) => void
  /** Set the currently focused (hovered) district. */
  setFocusedDistrict: (id: DistrictId | null) => void
  /** Advance systemEpoch by 2 seconds. Called by the cycle hook each tick. */
  tick: () => void
}

export type EnrichmentStore = EnrichmentStoreState & EnrichmentStoreActions

// ============================================================================
// Store
// ============================================================================

export const useEnrichmentStore = create<EnrichmentStore>()(
  immer((set) => ({
    // --- Initial state ---
    districts: seedDistricts(),
    activityLog: [],
    performance: {
      systemHealthPct: 100,
      throughputPct: 85,
      agentCapacityPct: 70,
    },
    connections: seedConnections(),
    waveform: {
      frequency: 1.0,
      noise: 0,
    },
    systemEpoch: 0,
    focusedDistrictId: null,

    // --- Actions ---

    updateSnapshot: (snapshot) =>
      set((draft) => {
        if (snapshot.districts) {
          for (const [id, enrichment] of Object.entries(snapshot.districts)) {
            draft.districts[id as DistrictId] = enrichment
          }
        }
        if (snapshot.activityLog !== undefined) {
          draft.activityLog = snapshot.activityLog
        }
        if (snapshot.performance) {
          draft.performance = snapshot.performance
        }
        if (snapshot.connections) {
          draft.connections = snapshot.connections
        }
        if (snapshot.waveform) {
          draft.waveform = snapshot.waveform
        }
        if (snapshot.systemEpoch !== undefined) {
          draft.systemEpoch = snapshot.systemEpoch
        }
        if (snapshot.focusedDistrictId !== undefined) {
          draft.focusedDistrictId = snapshot.focusedDistrictId
        }
      }),

    pushActivity: (event) =>
      set((draft) => {
        draft.activityLog.unshift(event)
        if (draft.activityLog.length > MAX_ACTIVITY_LOG) {
          draft.activityLog.length = MAX_ACTIVITY_LOG
        }
      }),

    setFocusedDistrict: (id) =>
      set((draft) => {
        draft.focusedDistrictId = id
      }),

    tick: () =>
      set((draft) => {
        draft.systemEpoch += 2
      }),
  })),
)

// ============================================================================
// Selectors
// ============================================================================

export const enrichmentSelectors = {
  /** Select a single district's enrichment data. */
  district: (id: DistrictId) => (s: EnrichmentStore) => s.districts[id],

  /** Select the full activity log array. */
  activityLog: (s: EnrichmentStore) => s.activityLog,

  /** Select aggregate performance metrics. */
  performance: (s: EnrichmentStore) => s.performance,

  /** Select all connection states. */
  connections: (s: EnrichmentStore) => s.connections,

  /** Select waveform parameters for the signal pulse monitor. */
  waveform: (s: EnrichmentStore) => s.waveform,

  /** Select the currently focused district ID (or null). */
  focusedDistrictId: (s: EnrichmentStore) => s.focusedDistrictId,

  /** Select the system epoch (seconds since page load). */
  systemEpoch: (s: EnrichmentStore) => s.systemEpoch,

  /**
   * Derived: whether the attention system is in "tighten" mode.
   * Reads from the attention store -- not stored in this store.
   * Useful for enrichment consumers that want to intensify visuals
   * when the system is under stress.
   */
  isTightening: () => useAttentionStore.getState().attentionState === 'tighten',
} as const
