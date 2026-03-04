/**
 * Analytics helper module for the Safetrekr marketing site.
 *
 * This is the single interface for all analytics instrumentation.
 * No component should call `window.gtag()` directly -- all events
 * flow through `trackEvent()` or `trackConversion()`.
 *
 * Safe to import from both server and client components.
 * All functions no-op gracefully during SSR, in development without
 * NEXT_PUBLIC_GA4_MEASUREMENT_ID, or before GA4 has loaded.
 *
 * @module analytics
 */

import type {
  AnalyticsEventName,
  AnalyticsEventParams,
} from '@/lib/interfaces/analytics'

// Re-export types so consumers only need one import path
export type { AnalyticsEventName, AnalyticsEventParams }

// ─── Type augmentation for window.gtag ──────────────────────────────

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'set' | 'consent',
      targetOrAction: string,
      params?: Record<string, unknown>,
    ) => void
    dataLayer?: unknown[]
  }
}

// ─── Consent guard ──────────────────────────────────────────────────

/**
 * Returns true if analytics consent has been granted.
 *
 * Default: true (opt-out model for US-only, English-only launch).
 * When a cookie consent banner is implemented (post-launch), this
 * function should read the consent state from the banner's cookie
 * or localStorage flag.
 *
 * If the site later serves EU visitors (GDPR), switch to opt-in
 * model by defaulting to false and flipping on consent grant.
 */
function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false
  // Future: read from consent cookie/localStorage
  // Example: return localStorage.getItem('analytics_consent') === 'granted'
  return true
}

// ─── Guard: is gtag available? ──────────────────────────────────────

function isGtagReady(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.gtag === 'function' &&
    hasAnalyticsConsent()
  )
}

// ─── Core tracking function ─────────────────────────────────────────

/**
 * Track a custom event in GA4.
 *
 * @example
 * ```ts
 * import { trackEvent } from '@/lib/analytics'
 *
 * trackEvent('convert_cta_click', {
 *   cta_id: 'landing-hero-cta',
 *   cta_text: 'Request a Sample Trip Package',
 *   page_path: '/landing',
 *   destination_url: '/contact',
 * })
 * ```
 *
 * The function is safe to call during SSR (no-ops silently) and
 * when GA4 has not loaded yet (e.g., in development without
 * NEXT_PUBLIC_GA4_MEASUREMENT_ID set).
 */
export function trackEvent<T extends AnalyticsEventName>(
  eventName: T,
  params: AnalyticsEventParams[T],
): void {
  if (!isGtagReady()) return
  window.gtag!('event', eventName, params as Record<string, unknown>)
}

/**
 * Track a conversion event. Identical to trackEvent but semantically
 * distinct -- conversion events are marked in GA4 property settings
 * and appear in the Conversions report.
 *
 * This is a convenience wrapper. The actual "conversion" designation
 * happens in GA4 property configuration, not in code.
 *
 * Designated conversions:
 * - `convert_form_submit` (primary revenue action)
 * - `convert_cta_click` (high commercial intent)
 * - `gateway_choice` (gateway engagement validation)
 */
export function trackConversion<T extends AnalyticsEventName>(
  eventName: T,
  params: AnalyticsEventParams[T],
): void {
  trackEvent(eventName, params)
}

// ─── Page path helper ───────────────────────────────────────────────

/**
 * Returns the current page path. Safe to call in client components.
 * Falls back to '/' during SSR.
 */
export function getPagePath(): string {
  if (typeof window === 'undefined') return '/'
  return window.location.pathname
}

// ─── Named event constants ──────────────────────────────────────────

/**
 * Named constants for all analytics events.
 * Prefer these over string literals for autocomplete and refactor safety.
 */
export const ANALYTICS_EVENTS = {
  // Gateway
  GATEWAY_CHOICE: 'gateway_choice',
  GATEWAY_BOOT_SKIP: 'gateway_boot_skip',
  GATEWAY_BOOT_COMPLETE: 'gateway_boot_complete',

  // Navigation
  NAV_HEADER_CLICK: 'nav_header_click',
  NAV_FOOTER_CLICK: 'nav_footer_click',
  NAV_MOBILE_MENU_OPEN: 'nav_mobile_menu_open',

  // Engagement
  ENGAGE_SCROLL_DEPTH: 'engage_scroll_depth',
  ENGAGE_FAQ_TOGGLE: 'engage_faq_toggle',
  ENGAGE_SECTION_VIEW: 'engage_section_view',
  ENGAGE_VIDEO_PLAY: 'engage_video_play',

  // Conversion
  CONVERT_CTA_CLICK: 'convert_cta_click',
  CONVERT_FORM_SUBMIT: 'convert_form_submit',
  CONVERT_FORM_START: 'convert_form_start',
  CONVERT_FORM_ERROR: 'convert_form_error',
  CONVERT_PRICING_TIER_CLICK: 'convert_pricing_tier_click',
  CONVERT_PRICING_ENTERPRISE_CLICK: 'convert_pricing_enterprise_click',

  // ZUI
  ZUI_CAPSULE_CLICK: 'zui_capsule_click',
  ZUI_DISTRICT_DOCK_CLICK: 'zui_district_dock_click',
  ZUI_ZOOM_LEVEL_CHANGE: 'zui_zoom_level_change',
} as const satisfies Record<string, AnalyticsEventName>
