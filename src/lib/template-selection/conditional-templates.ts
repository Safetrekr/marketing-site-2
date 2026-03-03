/**
 * Conditional station templates for Phase 3 dynamic selection.
 *
 * These templates have TriggerCondition arrays that activate them
 * when specific system state conditions are met. They supplement
 * the static AD-8 templates from WS-1.7.
 *
 * Naming convention: {districtId}--{name}--conditional
 * Example: "how-it-works--diagnostics--conditional"
 *
 * References: AD-8 (Station Content per District), AD-7 (disposable stations)
 */

import type { StationTemplate } from '@/lib/interfaces/station-template-registry'

// ============================================================================
// Agent Builder Conditional Templates
// ============================================================================

export const HOW_IT_WORKS_DIAGNOSTICS: StationTemplate = {
  id: 'how-it-works--diagnostics--conditional',
  districtId: 'how-it-works',
  name: 'diagnostics',
  displayName: 'Diagnostics',
  description:
    'Active alerts and recent errors for How It Works. Surfaces when alertCount > 0 or health is DEGRADED/DOWN.',
  category: 'app-specific',
  layout: {
    header: { title: 'Diagnostics', icon: 'AlertTriangle' },
    bodyType: 'list',
    actions: [
      {
        id: 'view-alerts',
        label: 'View All Alerts',
        variant: 'default',
        command: 'show alerts in ${districtId}',
        icon: 'Bell',
      },
      {
        id: 'dismiss-all',
        label: 'Dismiss All',
        variant: 'secondary',
        command: 'dismiss alerts in ${districtId}',
        icon: 'CheckCircle',
      },
    ],
  },
  triggers: [
    {
      field: 'apps.how-it-works.alertCount',
      operator: 'gt',
      value: 0,
      weight: 0.8,
    },
    {
      field: 'apps.how-it-works.health',
      operator: 'eq',
      value: 'DEGRADED',
      weight: 0.6,
    },
    {
      field: 'apps.how-it-works.health',
      operator: 'eq',
      value: 'DOWN',
      weight: 1.0,
    },
  ],
  priority: 70,
  disposable: false,
}

// ============================================================================
// Tarva Chat Conditional Templates
// ============================================================================

export const WHO_ITS_FOR_HIGHLIGHTS: StationTemplate = {
  id: 'who-its-for--highlights--conditional',
  districtId: 'who-its-for',
  name: 'highlights',
  displayName: 'Highlights',
  description:
    'Promoted view of audience highlights. Surfaces when district is healthy and no active alerts.',
  category: 'app-specific',
  layout: {
    header: { title: 'Highlights', icon: 'Users' },
    bodyType: 'list',
    actions: [
      {
        id: 'go-district',
        label: 'Explore',
        variant: 'default',
        command: 'go who-its-for',
        icon: 'ArrowRight',
      },
    ],
  },
  triggers: [
    {
      field: 'apps.who-its-for.health',
      operator: 'eq',
      value: 'OPERATIONAL',
      weight: 0.3,
    },
    {
      field: 'apps.who-its-for.alertCount',
      operator: 'eq',
      value: 0,
      weight: 0.2,
    },
  ],
  priority: 45,
  disposable: false,
}

// ============================================================================
// Project Room Conditional Templates
// ============================================================================

export const PLATFORM_ALERT_SUMMARY: StationTemplate = {
  id: 'platform--alert-summary--conditional',
  districtId: 'platform',
  name: 'alert-summary',
  displayName: 'Alert Summary',
  description:
    'Aggregated alert view for Platform. Surfaces when alertCount > 2 or health is not OPERATIONAL.',
  category: 'app-specific',
  layout: {
    header: { title: 'Alert Summary', icon: 'ShieldAlert' },
    bodyType: 'list',
    actions: [
      {
        id: 'investigate',
        label: 'Investigate',
        variant: 'default',
        command: 'show alerts in ${districtId}',
        icon: 'Search',
      },
      {
        id: 'go-platform',
        label: 'Go to Platform',
        variant: 'secondary',
        command: 'go platform',
        icon: 'ArrowRight',
      },
    ],
  },
  triggers: [
    {
      field: 'apps.platform.alertCount',
      operator: 'gt',
      value: 2,
      weight: 0.7,
    },
    {
      field: 'apps.platform.health',
      operator: 'eq',
      value: 'DEGRADED',
      weight: 0.5,
    },
    {
      field: 'apps.platform.health',
      operator: 'eq',
      value: 'DOWN',
      weight: 1.0,
    },
  ],
  priority: 65,
  disposable: false,
}

// ============================================================================
// Universal Conditional Templates
// ============================================================================

export const UNIVERSAL_SYSTEM_ALERT: StationTemplate = {
  id: 'universal--system-alert--conditional',
  districtId: '*',
  name: 'system-alert',
  displayName: 'System Alert',
  description:
    'Global system alert station. Surfaces in any district when the global alert count is high or system pulse is degraded.',
  category: 'universal',
  layout: {
    header: { title: 'System Alert', icon: 'AlertOctagon' },
    bodyType: 'metrics',
    actions: [
      {
        id: 'go-hub',
        label: 'Return to Hub',
        variant: 'default',
        command: 'go hub',
        icon: 'Home',
      },
    ],
  },
  triggers: [
    {
      field: 'globalMetrics.alertCount',
      operator: 'gt',
      value: 5,
      weight: 0.9,
    },
    {
      field: 'globalMetrics.systemPulse',
      operator: 'eq',
      value: 'DEGRADED',
      weight: 0.6,
    },
    {
      field: 'globalMetrics.systemPulse',
      operator: 'eq',
      value: 'DOWN',
      weight: 1.0,
    },
  ],
  priority: 85,
  disposable: false,
}

// ============================================================================
// All Conditional Templates
// ============================================================================

/** All Phase 3 conditional templates to register with the DynamicStationTemplateRegistry. */
export const CONDITIONAL_TEMPLATES: readonly StationTemplate[] = [
  HOW_IT_WORKS_DIAGNOSTICS,
  WHO_ITS_FOR_HIGHLIGHTS,
  PLATFORM_ALERT_SUMMARY,
  UNIVERSAL_SYSTEM_ALERT,
] as const
