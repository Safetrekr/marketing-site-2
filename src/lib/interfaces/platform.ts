// src/lib/interfaces/platform.ts

import type { LucideIcon } from 'lucide-react'

/**
 * A portal in the four-portal architecture.
 * Each portal targets a specific user role in the trip safety lifecycle.
 */
export interface PortalData {
  /** Unique identifier for the portal (used as React key and data-attribute) */
  id: 'client' | 'analyst' | 'hq' | 'traveler'
  /** Display name: "Client Portal", "Analyst Portal", etc. */
  name: string
  /** Monospace label: "PORTAL // CLIENT", etc. */
  monoLabel: string
  /** One-line role description: "For organization administrators." */
  roleLabel: string
  /** 2-3 sentence description of what the portal enables */
  description: string
  /** Lucide icon component reference */
  icon: LucideIcon
  /** Aspect ratio for the screenshot placeholder (width/height) */
  screenshotAspectRatio: number
}

/**
 * A feature domain in the six-domain feature grid.
 * Each domain groups related capabilities under a theme.
 */
export interface DomainData {
  /** Unique identifier (used as React key and data-attribute) */
  id:
    | 'planning'
    | 'intelligence'
    | 'protection'
    | 'delivery'
    | 'compliance'
    | 'hq-command'
  /** Display name: "Planning & Analysis", etc. */
  name: string
  /** Monospace label: "DOMAIN // PLANNING", etc. */
  monoLabel: string
  /** One-line tagline used as H3: "Structured trip planning from day trips to international travel." */
  tagline: string
  /** 3-7 feature bullet strings. Each is a single, concise sentence. */
  features: string[]
  /** Lucide icon component reference */
  icon: LucideIcon
}

/**
 * An integration highlight for the simplified integration section.
 */
export interface IntegrationHighlight {
  /** Integration name: "AviationStack", "Checkr", etc. */
  name: string
  /** One-line purpose */
  purpose: string
  /** Optional category for grouping */
  category: 'data' | 'compliance' | 'infrastructure' | 'delivery'
}
