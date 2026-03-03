/**
 * Contact form validation schema.
 *
 * Shared between client-side (blur validation + submit) and
 * server-side (API route revalidation). Single source of truth
 * for field constraints and error messages.
 *
 * References: AD-5 (Form Validation Pattern), Gap 3 (No Form Backend)
 */

import { z } from 'zod'

// ============================================================================
// Constants
// ============================================================================

/**
 * Allowed organization types, matching the CHECK constraint
 * on demo_requests.organization_type in Supabase.
 */
export const ORGANIZATION_TYPES = [
  'k12',
  'higher_ed',
  'church',
  'youth_sports',
  'business',
  'other',
] as const

export type OrganizationType = (typeof ORGANIZATION_TYPES)[number]

/**
 * Human-readable labels for each organization type.
 * Used by the select dropdown in the form UI.
 */
export const ORGANIZATION_TYPE_LABELS: Record<OrganizationType, string> = {
  k12: 'K-12 School',
  higher_ed: 'Higher Education',
  church: 'Church / House of Worship',
  youth_sports: 'Youth Sports Organization',
  business: 'Business / Corporate',
  other: 'Other',
} as const

// ============================================================================
// Schema
// ============================================================================

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Full name is required')
    .max(200, 'Name must be under 200 characters')
    .trim(),

  email: z
    .string()
    .min(1, 'Work email is required')
    .email('Please enter a valid email address')
    .max(320, 'Email must be under 320 characters')
    .trim()
    .toLowerCase(),

  phone: z
    .string()
    .max(30, 'Phone number must be under 30 characters')
    .trim()
    .optional()
    .or(z.literal('')),

  organization: z
    .string()
    .min(1, 'Organization name is required')
    .max(300, 'Organization name must be under 300 characters')
    .trim(),

  organizationType: z.enum(ORGANIZATION_TYPES, {
    message: 'Please select an organization type',
  }),

  message: z
    .string()
    .max(2000, 'Message must be under 2,000 characters')
    .trim()
    .optional()
    .or(z.literal('')),

  sourcePage: z.string().max(500).default('/contact'),
})

// ============================================================================
// Derived Types
// ============================================================================

/** Form input data (what the client submits -- pre-transform). */
export type ContactFormInput = z.input<typeof contactFormSchema>

/** Validated form data (after Zod parsing -- trimmed, lowercased email). */
export type ContactFormData = z.output<typeof contactFormSchema>
