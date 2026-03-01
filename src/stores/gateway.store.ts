/**
 * Gateway store -- state machine for the cinematic landing page.
 *
 * Manages the boot sequence phases, system check states, and
 * return-visitor optimization via localStorage persistence.
 *
 * Follows the same Zustand + Immer + persist pattern as settings.store.ts.
 *
 * @module gateway.store
 */

'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { GATEWAY_CHECKS } from '@/lib/gateway-checks'

// ============================================================================
// Types
// ============================================================================

export type GatewayPhase =
  | 'idle'
  | 'arriving'
  | 'booting'
  | 'revealing'
  | 'ambient'
  | 'transitioning'
  | 'exited'

export type CheckStatus = 'waiting' | 'active' | 'complete' | 'collapsed'

export interface SystemCheckState {
  id: string
  label: string
  completionValue: string
  status: CheckStatus
  progress: number
}

// ============================================================================
// State + Actions
// ============================================================================

interface GatewayState {
  phase: GatewayPhase
  checks: SystemCheckState[]
  activeCheckIndex: number
  selectedDestination: 'mission-control' | 'marketing' | null
  hasSeenRitual: boolean
  nominalFlash: boolean
}

interface GatewayActions {
  setPhase: (phase: GatewayPhase) => void
  setCheckStatus: (index: number, status: CheckStatus) => void
  setCheckProgress: (index: number, progress: number) => void
  setNominalFlash: (show: boolean) => void
  selectDestination: (dest: 'mission-control' | 'marketing') => void
  skipToReveal: () => void
  reset: () => void
}

export type GatewayStore = GatewayState & GatewayActions

// ============================================================================
// Initial state factory
// ============================================================================

function createInitialChecks(): SystemCheckState[] {
  return GATEWAY_CHECKS.map((def) => ({
    id: def.id,
    label: def.label,
    completionValue: def.completionValue,
    status: 'waiting' as CheckStatus,
    progress: 0,
  }))
}

// ============================================================================
// Store
// ============================================================================

export const useGatewayStore = create<GatewayStore>()(
  persist(
    immer((set) => ({
      // State
      phase: 'idle' as GatewayPhase,
      checks: createInitialChecks(),
      activeCheckIndex: 0,
      selectedDestination: null,
      hasSeenRitual: false,
      nominalFlash: false,

      // Actions
      setPhase: (phase) =>
        set((state) => {
          state.phase = phase
          if (phase === 'revealing') {
            state.hasSeenRitual = true
          }
        }),

      setCheckStatus: (index, status) =>
        set((state) => {
          if (index >= 0 && index < state.checks.length) {
            state.checks[index].status = status
            if (status === 'active') {
              state.activeCheckIndex = index
            }
          }
        }),

      setCheckProgress: (index, progress) =>
        set((state) => {
          if (index >= 0 && index < state.checks.length) {
            state.checks[index].progress = Math.min(1, Math.max(0, progress))
          }
        }),

      setNominalFlash: (show) =>
        set((state) => {
          state.nominalFlash = show
        }),

      selectDestination: (dest) =>
        set((state) => {
          state.selectedDestination = dest
          state.phase = 'transitioning'
        }),

      skipToReveal: () =>
        set((state) => {
          if (state.phase !== 'arriving' && state.phase !== 'booting') return
          // Collapse all checks instantly
          for (const check of state.checks) {
            check.status = 'collapsed'
            check.progress = 1
          }
          state.activeCheckIndex = state.checks.length
          state.phase = 'revealing'
        }),

      reset: () =>
        set((state) => {
          state.phase = 'idle'
          state.checks = createInitialChecks()
          state.activeCheckIndex = 0
          state.selectedDestination = null
          state.nominalFlash = false
        }),
    })),
    {
      name: 'safetrekr-gateway',
      partialize: (state) => ({
        hasSeenRitual: state.hasSeenRitual,
      }),
    },
  ),
)
