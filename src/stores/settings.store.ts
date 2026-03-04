/**
 * Settings store -- user preferences persisted to localStorage.
 *
 * Canonical location for:
 * - View preference toggles (minimap, effects, breadcrumb)
 *
 * Uses Zustand + persist middleware with localStorage key
 * `tarva-launch-settings`.
 *
 * @module settings.store
 * @see WS-3.3 Section 4.2
 */

'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

// ============================================================================
// State
// ============================================================================

interface SettingsState {
  /** Whether the minimap overlay is visible. */
  minimapVisible: boolean

  /** Whether ambient visual effects (particles, grid pulse) are enabled. */
  effectsEnabled: boolean

  /** Whether the spatial breadcrumb is visible. */
  breadcrumbVisible: boolean
}

// ============================================================================
// Actions
// ============================================================================

interface SettingsActions {
  /** Toggle the minimap overlay visibility. */
  toggleMinimap: () => void

  /** Toggle ambient visual effects. */
  toggleEffects: () => void

  /** Toggle the spatial breadcrumb visibility. */
  toggleBreadcrumb: () => void
}

export type SettingsStore = SettingsState & SettingsActions

// ============================================================================
// Defaults
// ============================================================================

const DEFAULT_SETTINGS: SettingsState = {
  minimapVisible: true,
  effectsEnabled: true,
  breadcrumbVisible: true,
}

// ============================================================================
// Store
// ============================================================================

export const useSettingsStore = create<SettingsStore>()(
  persist(
    immer((set) => ({
      ...DEFAULT_SETTINGS,

      toggleMinimap: () =>
        set((state) => {
          state.minimapVisible = !state.minimapVisible
        }),

      toggleEffects: () =>
        set((state) => {
          state.effectsEnabled = !state.effectsEnabled
        }),

      toggleBreadcrumb: () =>
        set((state) => {
          state.breadcrumbVisible = !state.breadcrumbVisible
        }),
    })),
    {
      name: 'tarva-launch-settings',
      partialize: (state) => ({
        minimapVisible: state.minimapVisible,
        effectsEnabled: state.effectsEnabled,
        breadcrumbVisible: state.breadcrumbVisible,
      }),
    },
  ),
)

// ============================================================================
// Selectors
// ============================================================================

export const settingsSelectors = {
  /** Whether the minimap is visible. */
  isMinimapVisible: (state: SettingsStore): boolean =>
    state.minimapVisible,

  /** Whether ambient effects are enabled. */
  areEffectsEnabled: (state: SettingsStore): boolean =>
    state.effectsEnabled,

  /** Whether the breadcrumb is visible. */
  isBreadcrumbVisible: (state: SettingsStore): boolean =>
    state.breadcrumbVisible,
} as const
