// src/lib/interfaces/security.ts

/**
 * A single security feature specification displayed as a card.
 * Each feature traces to a verified capability in the product review.
 */
export interface SecurityFeature {
  /** Unique identifier for key prop */
  id: string
  /** Feature title (e.g., "Row Level Security") */
  title: string
  /** Lucide icon component name */
  iconName: string
  /** Technical specification bullets -- factual statements only */
  specs: string[]
  /** Source section in product-review-safetrekr-app-v2-verified.md */
  sourceRef: string
}

/**
 * A compliance certification with explicit verification status.
 * The `status` field drives ComplianceBadge rendering:
 * - 'verified': renders with checkmark, full opacity
 * - 'under-evaluation': renders with clock icon, muted styling, qualifier text
 * - 'not-applicable': not rendered at all
 *
 * CRITICAL: Adding a new certification as 'verified' requires business
 * owner or legal confirmation. The data module includes a comment block
 * documenting this requirement.
 */
export interface ComplianceCertification {
  /** Unique identifier */
  id: string
  /** Certification name (e.g., "SOC 2 Type II") */
  name: string
  /** Brief description of what the certification covers */
  description: string
  /** Verification status -- controls rendering behavior */
  status: 'verified' | 'under-evaluation' | 'not-applicable'
  /** Human-readable status note (e.g., "Under evaluation. Contact us for current status.") */
  statusNote: string
  /**
   * Open question reference that blocks verification.
   * Null when status is 'verified'.
   */
  blockingQuestion: string | null
}

/** A system-level RBAC role. */
export interface RBACRole {
  /** Role name as defined in UserRole enum */
  name: string
  /** Which portal this role accesses */
  portal: 'Client' | 'Analyst' | 'HQ'
  /** Brief description of role scope */
  description: string
}

/**
 * An architecture credibility badge -- a verified architectural fact
 * (not a certification claim) displayed in a horizontal badge row.
 */
export interface ArchitectureBadge {
  /** Unique identifier */
  id: string
  /** Badge label (e.g., "Row Level Security") */
  label: string
  /** Lucide icon component name */
  iconName: string
}
