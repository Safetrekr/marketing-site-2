/**
 * Analytics type definitions for the Safetrekr marketing site.
 *
 * Defines the complete event taxonomy -- every custom event name and
 * its associated parameter shape. This is the single source of truth
 * for what gets tracked. Components import these types via
 * `@/lib/analytics`, never directly.
 *
 * Naming convention: snake_case, prefixed by category.
 * - gateway_*   : Cinematic landing page interactions
 * - nav_*       : Navigation interactions
 * - engage_*    : Content engagement signals
 * - convert_*   : Conversion-intent actions
 * - zui_*       : Spatial ZUI interactions
 *
 * GA4 reserves certain event names (e.g., `page_view`, `first_visit`).
 * Custom events must not collide with reserved names.
 * See: https://support.google.com/analytics/answer/9267735
 *
 * @module interfaces/analytics
 */

// ─── Event Names ──────────────────────────────────────────────────────

export type AnalyticsEventName =
  // Gateway events
  | 'gateway_choice'
  | 'gateway_boot_skip'
  | 'gateway_boot_complete'
  // Navigation events
  | 'nav_header_click'
  | 'nav_footer_click'
  | 'nav_mobile_menu_open'
  // Engagement events
  | 'engage_scroll_depth'
  | 'engage_faq_toggle'
  | 'engage_section_view'
  | 'engage_video_play'
  // Conversion events
  | 'convert_cta_click'
  | 'convert_form_submit'
  | 'convert_form_start'
  | 'convert_form_error'
  | 'convert_pricing_tier_click'
  | 'convert_pricing_enterprise_click'
  // ZUI events
  | 'zui_capsule_click'
  | 'zui_district_dock_click'
  | 'zui_zoom_level_change'

// ─── Event Parameter Types ────────────────────────────────────────────

/**
 * Parameter shapes for each event.
 * Every event must have a defined parameter shape -- this enforces
 * type safety at every `trackEvent()` call site.
 */
export interface AnalyticsEventParams {
  // Gateway
  gateway_choice: {
    destination: 'mission-control' | 'marketing'
  }
  gateway_boot_skip: {
    phase_at_skip: string
    time_elapsed_ms: number
  }
  gateway_boot_complete: {
    duration_ms: number
  }

  // Navigation
  nav_header_click: {
    link_text: string
    link_url: string
  }
  nav_footer_click: {
    link_text: string
    link_url: string
  }
  nav_mobile_menu_open: Record<string, never>

  // Engagement
  engage_scroll_depth: {
    percent: 25 | 50 | 75 | 100
    page_path: string
  }
  engage_faq_toggle: {
    question: string
    index: number
    page_path: string
  }
  engage_section_view: {
    section_id: string
    page_path: string
  }
  engage_video_play: {
    video_title: string
    page_path: string
  }

  // Conversion
  convert_cta_click: {
    cta_id: string
    cta_text: string
    page_path: string
    destination_url: string
  }
  convert_form_submit: {
    form_id: string
    organization_type: string
    source_page: string
  }
  convert_form_start: {
    form_id: string
    source_page: string
  }
  convert_form_error: {
    form_id: string
    error_type: string
    source_page: string
  }
  convert_pricing_tier_click: {
    tier_id: string
    tier_name: string
    price_usd: number | null
  }
  convert_pricing_enterprise_click: {
    source: string
  }

  // ZUI
  zui_capsule_click: {
    district_id: string
    source: 'capsule_ring' | 'constellation' | 'beacon'
  }
  zui_district_dock_click: {
    district_id: string
  }
  zui_zoom_level_change: {
    from_level: string
    to_level: string
  }
}
