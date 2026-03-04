'use client'

/**
 * Contact form component for demo/briefing requests.
 *
 * Features:
 * - Blur-time field validation using the shared Zod schema
 * - Honeypot hidden field for bot detection
 * - Pending/success/error submission states
 * - Inline glass-card success state (no redirect)
 * - Green accent focus rings matching the Safetrekr HUD aesthetic
 *
 * References: WS-A.4, AD-5 (Form Validation Pattern)
 */

import { useState, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import {
  contactFormSchema,
  ORGANIZATION_TYPES,
  ORGANIZATION_TYPE_LABELS,
  type OrganizationType,
} from '@/lib/schemas/contact'

// ============================================================================
// Types
// ============================================================================

interface ContactFormProps {
  /** URL path to record as source_page (e.g., '/contact', '/pricing') */
  sourcePage?: string
}

type FormStatus =
  | { state: 'idle' }
  | { state: 'submitting' }
  | { state: 'success' }
  | { state: 'error'; fieldErrors: Record<string, string>; serverError?: string }

// ============================================================================
// Field Input Styling
// ============================================================================

const inputBaseClasses = cn(
  'w-full rounded-xl px-4 py-3',
  'bg-white/[0.04]',
  'border border-white/[0.08]',
  'text-[var(--color-text-primary)] text-sm',
  'placeholder:text-[var(--color-text-ghost)]',
  'focus:outline-none focus:border-[var(--color-ember)]',
  'focus:ring-1 focus:ring-[var(--color-ember)]',
  'transition-colors duration-[var(--duration-hover)]'
)

const inputErrorClasses =
  'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]'

const labelClasses = cn(
  'block text-sm font-medium mb-1.5',
  'text-[var(--color-text-secondary)]'
)

// ============================================================================
// Component
// ============================================================================

export function ContactForm({ sourcePage = '/contact' }: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>({ state: 'idle' })
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())
  const [honeypotValue, setHoneypotValue] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  // ---------------------------------------------------------------------------
  // Field-level validation on blur
  // ---------------------------------------------------------------------------

  const getFieldErrors = useCallback((): Record<string, string> => {
    if (!formRef.current) return {}

    const formData = new FormData(formRef.current)
    const rawData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      organization: formData.get('organization') as string,
      organizationType: formData.get('organizationType') as string,
      message: formData.get('message') as string,
      sourcePage,
    }

    const result = contactFormSchema.safeParse(rawData)
    if (result.success) return {}

    const errors: Record<string, string> = {}
    for (const issue of result.error.issues) {
      const field = issue.path[0]
      if (typeof field === 'string' && !errors[field]) {
        errors[field] = issue.message
      }
    }
    return errors
  }, [sourcePage])

  const handleBlur = useCallback(
    (fieldName: string) => {
      setTouchedFields((prev) => {
        const next = new Set(prev)
        next.add(fieldName)
        return next
      })

      // Revalidate to update errors for this field
      const errors = getFieldErrors()

      setStatus((prev) => {
        if (prev.state === 'error') {
          return { ...prev, fieldErrors: errors }
        }
        // Only show errors if field has been touched
        const visibleErrors: Record<string, string> = {}
        for (const [key, msg] of Object.entries(errors)) {
          if (touchedFields.has(key) || key === fieldName) {
            visibleErrors[key] = msg
          }
        }
        if (Object.keys(visibleErrors).length > 0) {
          return { state: 'error', fieldErrors: visibleErrors }
        }
        return { state: 'idle' }
      })
    },
    [getFieldErrors, touchedFields]
  )

  // ---------------------------------------------------------------------------
  // Clear error on input change
  // ---------------------------------------------------------------------------

  const handleFieldChange = useCallback(
    (fieldName: string) => {
      setStatus((prev) => {
        if (prev.state !== 'error') return prev
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [fieldName]: _removed, ...remaining } = prev.fieldErrors
        if (Object.keys(remaining).length === 0 && !prev.serverError) {
          return { state: 'idle' }
        }
        return { ...prev, fieldErrors: remaining }
      })
    },
    []
  )

  // ---------------------------------------------------------------------------
  // Form submission
  // ---------------------------------------------------------------------------

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const formData = new FormData(e.currentTarget)
      const rawData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        organization: formData.get('organization') as string,
        organizationType: formData.get('organizationType') as string,
        message: formData.get('message') as string,
        sourcePage,
        website: honeypotValue,
      }

      // Client-side validation (all fields)
      const validation = contactFormSchema.safeParse(rawData)
      if (!validation.success) {
        const errors: Record<string, string> = {}
        for (const issue of validation.error.issues) {
          const field = issue.path[0]
          if (typeof field === 'string' && !errors[field]) {
            errors[field] = issue.message
          }
        }
        // Touch all fields to show all errors
        setTouchedFields(
          new Set([
            'name',
            'email',
            'phone',
            'organization',
            'organizationType',
            'message',
          ])
        )
        setStatus({ state: 'error', fieldErrors: errors })
        return
      }

      setStatus({ state: 'submitting' })

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(rawData),
        })

        const json = await response.json()

        if (response.ok && json.success) {
          setStatus({ state: 'success' })
          return
        }

        if (response.status === 429) {
          setStatus({
            state: 'error',
            fieldErrors: {},
            serverError:
              'Too many submissions. Please wait a few minutes and try again.',
          })
          return
        }

        if (response.status === 400 && json.errors) {
          const errors: Record<string, string> = {}
          for (const err of json.errors as Array<{
            field: string
            message: string
          }>) {
            if (!errors[err.field]) {
              errors[err.field] = err.message
            }
          }
          setStatus({ state: 'error', fieldErrors: errors })
          return
        }

        setStatus({
          state: 'error',
          fieldErrors: {},
          serverError:
            json.error ??
            'An unexpected error occurred. Please try again or email us directly.',
        })
      } catch {
        setStatus({
          state: 'error',
          fieldErrors: {},
          serverError:
            'Unable to reach the server. Please check your connection and try again.',
        })
      }
    },
    [sourcePage, honeypotValue]
  )

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  const isSubmitting = status.state === 'submitting'
  const fieldErrors =
    status.state === 'error' ? status.fieldErrors : ({} as Record<string, string>)
  const serverError =
    status.state === 'error' ? status.serverError : undefined

  function fieldHasError(fieldName: string): boolean {
    return touchedFields.has(fieldName) && fieldName in fieldErrors
  }

  // ---------------------------------------------------------------------------
  // Success State
  // ---------------------------------------------------------------------------

  if (status.state === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        {/* Green checkmark circle */}
        <div
          className={cn(
            'mb-6 flex h-16 w-16 items-center justify-center rounded-full',
            'bg-[var(--color-ember)]/10 border border-[var(--color-ember)]/20'
          )}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-ember)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
          Thank you for reaching out.
        </h3>
        <p className="mt-2 max-w-sm text-sm text-[var(--color-text-secondary)]">
          We&apos;ve received your request and will be in touch within 1
          business day.
          {/* PLACEHOLDER: "1 business day" blocked on Q-13 SLA answer */}
        </p>
        <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
          In the meantime, explore{' '}
          <a
            href="/how-it-works"
            className={cn(
              'text-[var(--color-ember-bright)]',
              'underline underline-offset-4',
              'hover:text-[var(--color-ember-glow)]',
              'transition-colors duration-[var(--duration-hover)]'
            )}
          >
            how Safetrekr works
          </a>
          .
        </p>
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // Form Render
  // ---------------------------------------------------------------------------

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5"
    >
      {/* Server error banner */}
      {serverError && (
        <div
          className={cn(
            'rounded-xl px-4 py-3',
            'bg-[var(--color-error-dim)] border border-[var(--color-error)]/20',
            'text-sm text-[var(--color-error-glow)]'
          )}
          role="alert"
        >
          {serverError}
        </div>
      )}

      {/* Full name */}
      <div>
        <label htmlFor="contact-name" className={labelClasses}>
          Full name <span className="ml-0.5 text-[var(--color-ember)]">*</span>
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          required
          autoComplete="name"
          placeholder="Jane Rodriguez"
          className={cn(
            inputBaseClasses,
            fieldHasError('name') && inputErrorClasses
          )}
          onBlur={() => handleBlur('name')}
          onChange={() => handleFieldChange('name')}
          disabled={isSubmitting}
        />
        {fieldHasError('name') && (
          <p className="mt-1 text-xs text-[var(--color-error-glow)]">
            {fieldErrors.name}
          </p>
        )}
      </div>

      {/* Work email */}
      <div>
        <label htmlFor="contact-email" className={labelClasses}>
          Work email{' '}
          <span className="ml-0.5 text-[var(--color-ember)]">*</span>
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          required
          autoComplete="email"
          placeholder="jane@organization.edu"
          className={cn(
            inputBaseClasses,
            fieldHasError('email') && inputErrorClasses
          )}
          onBlur={() => handleBlur('email')}
          onChange={() => handleFieldChange('email')}
          disabled={isSubmitting}
        />
        {fieldHasError('email') && (
          <p className="mt-1 text-xs text-[var(--color-error-glow)]">
            {fieldErrors.email}
          </p>
        )}
      </div>

      {/* Phone (optional) */}
      <div>
        <label htmlFor="contact-phone" className={labelClasses}>
          Phone
        </label>
        <input
          type="tel"
          id="contact-phone"
          name="phone"
          autoComplete="tel"
          placeholder="+1 (555) 000-0000"
          className={cn(
            inputBaseClasses,
            fieldHasError('phone') && inputErrorClasses
          )}
          onBlur={() => handleBlur('phone')}
          onChange={() => handleFieldChange('phone')}
          disabled={isSubmitting}
        />
        {fieldHasError('phone') && (
          <p className="mt-1 text-xs text-[var(--color-error-glow)]">
            {fieldErrors.phone}
          </p>
        )}
      </div>

      {/* Organization */}
      <div>
        <label htmlFor="contact-organization" className={labelClasses}>
          Organization{' '}
          <span className="ml-0.5 text-[var(--color-ember)]">*</span>
        </label>
        <input
          type="text"
          id="contact-organization"
          name="organization"
          required
          autoComplete="organization"
          placeholder="Springfield School District"
          className={cn(
            inputBaseClasses,
            fieldHasError('organization') && inputErrorClasses
          )}
          onBlur={() => handleBlur('organization')}
          onChange={() => handleFieldChange('organization')}
          disabled={isSubmitting}
        />
        {fieldHasError('organization') && (
          <p className="mt-1 text-xs text-[var(--color-error-glow)]">
            {fieldErrors.organization}
          </p>
        )}
      </div>

      {/* Organization type */}
      <div>
        <label htmlFor="contact-org-type" className={labelClasses}>
          Organization type{' '}
          <span className="ml-0.5 text-[var(--color-ember)]">*</span>
        </label>
        <div className="relative">
          <select
            id="contact-org-type"
            name="organizationType"
            required
            className={cn(
              inputBaseClasses,
              'appearance-none cursor-pointer',
              fieldHasError('organizationType') && inputErrorClasses
            )}
            defaultValue=""
            onBlur={() => handleBlur('organizationType')}
            onChange={() => handleFieldChange('organizationType')}
            disabled={isSubmitting}
          >
            <option value="" disabled>
              Select organization type
            </option>
            {ORGANIZATION_TYPES.map((type) => (
              <option key={type} value={type}>
                {ORGANIZATION_TYPE_LABELS[type as OrganizationType]}
              </option>
            ))}
          </select>
          {/* Custom chevron */}
          <svg
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-ghost)]"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
        {fieldHasError('organizationType') && (
          <p className="mt-1 text-xs text-[var(--color-error-glow)]">
            {fieldErrors.organizationType}
          </p>
        )}
      </div>

      {/* Message (optional) */}
      <div>
        <label htmlFor="contact-message" className={labelClasses}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="Tell us about your safety needs..."
          className={cn(
            inputBaseClasses,
            'resize-none',
            fieldHasError('message') && inputErrorClasses
          )}
          onBlur={() => handleBlur('message')}
          onChange={() => handleFieldChange('message')}
          disabled={isSubmitting}
        />
        {fieldHasError('message') && (
          <p className="mt-1 text-xs text-[var(--color-error-glow)]">
            {fieldErrors.message}
          </p>
        )}
      </div>

      {/* Honeypot field -- hidden from humans, visible to bots */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] -top-[9999px]"
      >
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypotValue}
          onChange={(e) => setHoneypotValue(e.target.value)}
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          'mkt-cta-breathe',
          'w-full rounded-full px-6 py-3.5 mt-2',
          'text-sm font-medium',
          'bg-[var(--color-ember)] text-[var(--color-void)]',
          'hover:bg-[var(--color-ember-bright)]',
          'active:scale-[0.97]',
          'transition-all duration-[var(--duration-hover)]',
          'focus-visible:outline-2 focus-visible:outline-offset-2',
          'focus-visible:outline-[var(--color-ember-bright)]',
          isSubmitting && 'opacity-70 cursor-not-allowed'
        )}
      >
        {isSubmitting ? 'Sending...' : 'Request a Sample Trip Package'}
      </button>
    </form>
  )
}
