// src/lib/interfaces/how-it-works.ts

/** One of the four lifecycle phases. */
export interface Phase {
  /** Unique phase identifier: 'plan' | 'review' | 'protect' | 'monitor' */
  id: 'plan' | 'review' | 'protect' | 'monitor'
  /** Display number (1-4) */
  number: number
  /** Short phase name for the lifecycle nav */
  label: string
  /** Lucide icon component name */
  iconName: string
  /** Heading (H2) for the phase section */
  heading: string
  /** Body paragraph(s) for the phase section */
  body: string
  /** Supporting statement after feature content */
  supportingStatement: string
  /** Inline objection hook text (optional, only Phase 2 uses this) */
  objectionHook?: string
}

/** One step of the 10-step trip creation wizard. */
export interface WizardStep {
  /** Step number (1-10) */
  number: number
  /** Step name (bold display) */
  name: string
  /** 1-2 sentence description */
  description: string
}

/** One of the 18 analyst review dimensions. */
export interface ReviewDimension {
  /** Dimension number (1-18) */
  number: number
  /** Dimension name */
  name: string
  /** Brief description of what the analyst reviews in this dimension */
  description: string
}

/** A protection system feature card. */
export interface ProtectionFeature {
  /** Unique identifier */
  id: string
  /** Feature name (bold display) */
  name: string
  /** 1-2 sentence description */
  description: string
  /** Lucide icon component name */
  iconName: string
}

/** A monitor/traveler delivery feature bullet. */
export interface MonitorFeature {
  /** Unique identifier */
  id: string
  /** Feature name (bold display) */
  name: string
  /** 1-2 sentence description */
  description: string
  /** Lucide icon component name */
  iconName: string
}

/** Bottom CTA configuration. */
export interface HowItWorksCta {
  /** CTA section headline */
  headline: string
  /** Supporting body text */
  body: string
  /** Primary CTA button label */
  primaryLabel: string
  /** Primary CTA href */
  primaryHref: string
  /** Primary CTA micro-copy */
  primaryMicrocopy: string
  /** Secondary CTA button label */
  secondaryLabel: string
  /** Secondary CTA href */
  secondaryHref: string
  /** Secondary CTA micro-copy */
  secondaryMicrocopy: string
}
