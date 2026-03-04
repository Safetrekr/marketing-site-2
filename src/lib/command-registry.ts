/**
 * Command registry for the full command palette.
 *
 * Creates structured commands across three IA categories:
 * - Navigation: go to districts, hub, constellation
 * - View: zoom in/out, zoom to levels, toggle minimap/effects/breadcrumb
 * - Action: refresh telemetry, logout
 *
 * Each command includes its full synonym set from the IA synonym ring
 * (SYNONYM_RING in command-palette.ts) for fuzzy matching.
 *
 * The conditional "Ask AI..." command is handled separately in the
 * component layer, gated by settings.store.aiCameraDirectorEnabled.
 *
 * @module command-registry
 * @see WS-A.2 Section 4.10
 */

import type {
  PaletteCommand,
  CommandCategory,
  CommandResult,
} from '@/lib/interfaces/command-palette'
import { SYNONYM_RING } from '@/lib/interfaces/command-palette'
import { DISTRICTS, type DistrictId } from '@/lib/interfaces/district'
import {
  returnToHub,
  flyToDistrict,
  flyToWorldPoint,
  zoomIn,
  zoomOut,
} from '@/lib/spatial-actions'
import { useCameraStore } from '@/stores/camera.store'
import { useSettingsStore } from '@/stores/settings.store'
import { useAuthStore } from '@/stores/auth.store'
import { ZOOM_DEFAULT } from '@/lib/constants'

// ============================================================================
// Helpers
// ============================================================================

/** Find synonyms for a canonical name in the IA synonym ring. */
function findSynonyms(canonical: string): readonly string[] {
  const entry = SYNONYM_RING.find((s) => s.canonical === canonical)
  return entry?.synonyms ?? []
}

/** Create a success result with a message. */
function success(message: string): CommandResult {
  return { success: true, message }
}

// ============================================================================
// Navigation Commands
// ============================================================================

/**
 * Create navigation commands.
 *
 * go-to-hub, go-to-constellation, go-to-{6 districts}
 */
function createNavigationCommands(): PaletteCommand[] {
  const commands: PaletteCommand[] = []

  // 1. Go to Hub (return to Launch Atrium at Z1)
  commands.push({
    id: 'go-to-hub',
    verb: 'go',
    object: 'hub',
    displayLabel: 'Go to Hub',
    synonyms: ['home', 'center', 'atrium', 'launch', 'hub'],
    category: 'navigation' as CommandCategory,
    handler: async (): Promise<CommandResult> => {
      returnToHub()
      return success('Returned to Hub')
    },
  })

  // 2. Go to Constellation (zoom out to Z0)
  commands.push({
    id: 'go-to-constellation',
    verb: 'go',
    object: 'constellation',
    displayLabel: 'Go to Constellation',
    synonyms: [...findSynonyms('Constellation')],
    category: 'navigation' as CommandCategory,
    handler: async (): Promise<CommandResult> => {
      flyToWorldPoint(0, 0, 0.15)
      return success('Zoomed to Constellation view')
    },
  })

  // 3-9. Go to each of the 7 marketing districts
  const districtIds: DistrictId[] = [
    'how-it-works',
    'who-its-for',
    'platform',
    'security',
    'pricing',
    'get-started',
    'about-us',
  ]

  for (const districtId of districtIds) {
    const district = DISTRICTS.find((d) => d.id === districtId)
    const displayName = district?.displayName ?? districtId
    const synonyms = findSynonyms(displayName)

    commands.push({
      id: `go-to-${districtId}`,
      verb: 'go',
      object: districtId,
      displayLabel: `Go to ${displayName}`,
      synonyms: [...synonyms],
      category: 'navigation' as CommandCategory,
      handler: async (): Promise<CommandResult> => {
        flyToDistrict(districtId)
        return success(`Navigated to ${displayName}`)
      },
    })
  }

  return commands
}

// ============================================================================
// View Commands (9)
// ============================================================================

/**
 * Create the 9 view commands.
 *
 * zoom-in, zoom-out, zoom-to-z0/z1/z2/z3, toggle-minimap/effects/breadcrumb
 */
function createViewCommands(): PaletteCommand[] {
  return [
    // Zoom In
    {
      id: 'zoom-in',
      verb: 'zoom',
      object: 'in',
      displayLabel: 'Zoom In',
      synonyms: ['zoom in', 'closer', 'magnify', '+'],
      category: 'view' as CommandCategory,
      handler: async (): Promise<CommandResult> => {
        zoomIn()
        return success('Zoomed in')
      },
    },
    // Zoom Out
    {
      id: 'zoom-out',
      verb: 'zoom',
      object: 'out',
      displayLabel: 'Zoom Out',
      synonyms: ['zoom out', 'farther', 'shrink', '-'],
      category: 'view' as CommandCategory,
      handler: async (): Promise<CommandResult> => {
        zoomOut()
        return success('Zoomed out')
      },
    },
    // Zoom to Z0 (Constellation)
    {
      id: 'zoom-to-z0',
      verb: 'zoom',
      object: 'z0',
      displayLabel: 'Zoom to Z0 (Constellation)',
      synonyms: ['z0', 'constellation zoom', 'far out', 'global view'],
      category: 'view' as CommandCategory,
      handler: async (): Promise<CommandResult> => {
        flyToWorldPoint(0, 0, 0.15)
        return success('Zoomed to Z0 Constellation level')
      },
    },
    // Zoom to Z1 (Atrium)
    {
      id: 'zoom-to-z1',
      verb: 'zoom',
      object: 'z1',
      displayLabel: 'Zoom to Z1 (Atrium)',
      synonyms: ['z1', 'atrium zoom', 'default zoom', 'home zoom'],
      category: 'view' as CommandCategory,
      handler: async (): Promise<CommandResult> => {
        const { viewportWidth, viewportHeight } = useCameraStore.getState()
        const targetOffsetX = viewportWidth / 2
        const targetOffsetY = viewportHeight / 2
        useCameraStore.getState().flyTo(targetOffsetX, targetOffsetY, ZOOM_DEFAULT)
        return success('Zoomed to Z1 Atrium level')
      },
    },
    // Zoom to Z2 (District)
    {
      id: 'zoom-to-z2',
      verb: 'zoom',
      object: 'z2',
      displayLabel: 'Zoom to Z2 (District)',
      synonyms: ['z2', 'district zoom', 'close'],
      category: 'view' as CommandCategory,
      handler: async (): Promise<CommandResult> => {
        const { viewportWidth, viewportHeight } = useCameraStore.getState()
        const cursorX = viewportWidth / 2
        const cursorY = viewportHeight / 2
        useCameraStore.getState().zoomTo(1.0, cursorX, cursorY)
        return success('Zoomed to Z2 District level')
      },
    },
    // Zoom to Z3 (Station)
    {
      id: 'zoom-to-z3',
      verb: 'zoom',
      object: 'z3',
      displayLabel: 'Zoom to Z3 (Station)',
      synonyms: ['z3', 'station zoom', 'detail', 'close up'],
      category: 'view' as CommandCategory,
      handler: async (): Promise<CommandResult> => {
        const { viewportWidth, viewportHeight } = useCameraStore.getState()
        const cursorX = viewportWidth / 2
        const cursorY = viewportHeight / 2
        useCameraStore.getState().zoomTo(1.8, cursorX, cursorY)
        return success('Zoomed to Z3 Station level')
      },
    },
    // Toggle Minimap
    {
      id: 'toggle-minimap',
      verb: 'toggle',
      object: 'minimap',
      displayLabel: 'Toggle Minimap',
      synonyms: ['minimap', 'mini map', 'map', 'overview map', 'show minimap', 'hide minimap'],
      category: 'view' as CommandCategory,
      handler: async (): Promise<CommandResult> => {
        useSettingsStore.getState().toggleMinimap()
        const visible = useSettingsStore.getState().minimapVisible
        return success(`Minimap ${visible ? 'shown' : 'hidden'}`)
      },
    },
    // Toggle Effects
    {
      id: 'toggle-effects',
      verb: 'toggle',
      object: 'effects',
      displayLabel: 'Toggle Effects',
      synonyms: [
        'effects',
        'particles',
        'ambient',
        'visual effects',
        'show effects',
        'hide effects',
      ],
      category: 'view' as CommandCategory,
      handler: async (): Promise<CommandResult> => {
        useSettingsStore.getState().toggleEffects()
        const enabled = useSettingsStore.getState().effectsEnabled
        return success(`Visual effects ${enabled ? 'enabled' : 'disabled'}`)
      },
    },
    // Toggle Breadcrumb
    {
      id: 'toggle-breadcrumb',
      verb: 'toggle',
      object: 'breadcrumb',
      displayLabel: 'Toggle Breadcrumb',
      synonyms: ['breadcrumb', 'path', 'location bar', 'show breadcrumb', 'hide breadcrumb'],
      category: 'view' as CommandCategory,
      handler: async (): Promise<CommandResult> => {
        useSettingsStore.getState().toggleBreadcrumb()
        const visible = useSettingsStore.getState().breadcrumbVisible
        return success(`Breadcrumb ${visible ? 'shown' : 'hidden'}`)
      },
    },
  ]
}

// ============================================================================
// Action Commands
// ============================================================================

/**
 * Create action commands.
 *
 * refresh-telemetry, logout
 */
function createActionCommands(
  onRefresh: () => Promise<void>,
): PaletteCommand[] {
  const commands: PaletteCommand[] = []

  // Refresh Telemetry
  commands.push({
    id: 'refresh-telemetry',
    verb: 'refresh',
    object: 'telemetry',
    displayLabel: 'Refresh Telemetry',
    synonyms: [
      'refresh',
      'reload',
      'poll',
      'check health',
      're-poll',
      'refresh health',
      'refresh telemetry',
    ],
    category: 'action' as CommandCategory,
    handler: async (): Promise<CommandResult> => {
      await onRefresh()
      return success('Telemetry refreshed')
    },
  })

  // Logout
  commands.push({
    id: 'logout',
    verb: 'logout',
    object: 'session',
    displayLabel: 'Logout',
    synonyms: ['logout', 'log out', 'sign out', 'signout', 'exit'],
    category: 'action' as CommandCategory,
    handler: async (): Promise<CommandResult> => {
      useAuthStore.getState().logout()
      return success('Logged out')
    },
  })

  return commands
}

// ============================================================================
// Full Registry
// ============================================================================

/**
 * Create the complete command set.
 *
 * Call this once during palette initialization. The returned commands
 * are registered with the StructuredCommandPalette instance.
 *
 * @param onRefresh - Callback to trigger immediate telemetry refresh.
 */
export function createFullCommandRegistry(
  onRefresh: () => Promise<void>,
): PaletteCommand[] {
  return [
    ...createNavigationCommands(),
    ...createViewCommands(),
    ...createActionCommands(onRefresh),
  ]
}

// Re-export individual factories for testing
export { createNavigationCommands, createViewCommands, createActionCommands }
