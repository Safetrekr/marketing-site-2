/**
 * District explore store — manages the progressive disclosure state
 * for the district showcase system (step bar + expanding dock).
 *
 * Flow: autoplay → overview → step-focus → tiles → detail
 *
 * @module district-explore.store
 */

import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Current exploration mode within a district panel. */
export type ExploreMode =
  | 'autoplay'    // Step bar auto-animating through steps
  | 'overview'    // All steps visible, none selected (post-autoplay)
  | 'step-focus'  // One step selected, typewriter text + "Learn More" visible
  | 'tiles'       // Dock showing tile grid for active step's sub-items
  | 'detail'      // Dock expanded with full detail for selected sub-item

// ---------------------------------------------------------------------------
// State + Actions
// ---------------------------------------------------------------------------

interface DistrictExploreState {
  /** Current exploration mode. */
  mode: ExploreMode
  /** Index of the currently active/selected step (0-based). */
  activeStepIndex: number
  /** Index of the step currently being auto-played (0-based). */
  autoplayStepIndex: number
  /** ID of the selected sub-item (for detail mode). */
  selectedSubItemId: string | null
  /** Whether the typewriter animation has completed for the current step. */
  typewriterComplete: boolean
}

interface DistrictExploreActions {
  /** Set the exploration mode directly. */
  setMode: (mode: ExploreMode) => void
  /** Select a step by index and enter step-focus mode. */
  focusStep: (index: number) => void
  /** Advance autoplay to the next step index. */
  advanceAutoplay: () => void
  /** Mark the current typewriter animation as complete. */
  completeTypewriter: () => void
  /** Enter tiles mode (dock shows sub-item tiles). */
  enterTiles: () => void
  /** Select a sub-item and enter detail mode. */
  selectSubItem: (id: string) => void
  /** Go back one level in the navigation stack. */
  goBack: () => void
  /** Reset to autoplay state (used on district change). */
  reset: () => void
}

export type DistrictExploreStore = DistrictExploreState & DistrictExploreActions

// ---------------------------------------------------------------------------
// Initial state
// ---------------------------------------------------------------------------

const INITIAL_STATE: DistrictExploreState = {
  mode: 'autoplay',
  activeStepIndex: 0,
  autoplayStepIndex: 0,
  selectedSubItemId: null,
  typewriterComplete: false,
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useDistrictExploreStore = create<DistrictExploreStore>()(
  immer((set) => ({
    ...INITIAL_STATE,

    setMode: (mode) =>
      set((state) => {
        state.mode = mode
      }),

    focusStep: (index) =>
      set((state) => {
        state.mode = 'step-focus'
        state.activeStepIndex = index
        state.typewriterComplete = false
        state.selectedSubItemId = null
      }),

    advanceAutoplay: () =>
      set((state) => {
        state.autoplayStepIndex += 1
        state.activeStepIndex = state.autoplayStepIndex
        state.typewriterComplete = false
      }),

    completeTypewriter: () =>
      set((state) => {
        state.typewriterComplete = true
      }),

    enterTiles: () =>
      set((state) => {
        state.mode = 'tiles'
        state.selectedSubItemId = null
      }),

    selectSubItem: (id) =>
      set((state) => {
        state.mode = 'detail'
        state.selectedSubItemId = id
      }),

    goBack: () =>
      set((state) => {
        switch (state.mode) {
          case 'detail':
            state.mode = 'tiles'
            state.selectedSubItemId = null
            break
          case 'tiles':
            state.mode = 'step-focus'
            break
          case 'step-focus':
            state.mode = 'overview'
            state.typewriterComplete = false
            break
          default:
            // overview / autoplay — no further back
            break
        }
      }),

    reset: () =>
      set(() => ({ ...INITIAL_STATE })),
  })),
)

// ---------------------------------------------------------------------------
// Selectors
// ---------------------------------------------------------------------------

export const exploreSelectors = {
  /** Whether the dock should show tiles (tiles or detail mode). */
  isDockActive: (state: DistrictExploreStore): boolean =>
    state.mode === 'tiles' || state.mode === 'detail',

  /** Whether the dock is in expanded (detail) mode. */
  isDockExpanded: (state: DistrictExploreStore): boolean =>
    state.mode === 'detail',

  /** Whether the center card should be in compact mode. */
  isCenterCompact: (state: DistrictExploreStore): boolean =>
    state.mode === 'detail',
}
