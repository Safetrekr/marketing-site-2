# WS-A.4: Form Backend + Contact Page

> **Workstream ID:** WS-A.4
> **Phase:** A -- Foundation & Infrastructure
> **Assigned Agent:** `world-class-backend-api-engineer`
> **Status:** Draft
> **Created:** 2026-03-02
> **Last Updated:** 2026-03-02
> **Depends On:** WS-A.1 (Marketing Route Group + Layout)
> **Blocks:** None directly (Phase B content pages reference the contact form pattern)
> **Soft Dependency From:** WS-B.2 (landing page CTA links to `/contact`), WS-C.3 (analytics tracks form submissions)
> **Resolves:** Gap 3 (No Form Backend for Demo Requests), AD-5 (Form Validation Pattern), R-12 (partial -- operational workflow), Q-13 (partial -- notification config)

---

## 1. Objective

Build the complete form submission pipeline for the Safetrekr marketing site -- from Supabase table creation through API route validation to the contact page UI. Visitors requesting a demo or briefing fill out a validated form that writes to a `demo_requests` table in Supabase. The API route performs server-side Zod 4 revalidation, the client performs blur-time validation using the same shared schema, and the UI displays an inline glass-card success state without redirect.

This workstream also establishes the notification pathway so that inbound demo requests are surfaced to the team, defines a `status` field for basic lead-lifecycle tracking, and implements layered anti-spam defenses (honeypot field + rate limiting) without introducing CAPTCHA friction.

---

## 2. Scope

### In Scope

| # | Item | Description |
|---|------|-------------|
| 1 | Supabase migration | `demo_requests` table DDL, RLS policies, indexes |
| 2 | Supabase types | Extend `src/lib/supabase/types.ts` with `DemoRequestRow`, `DemoRequestInsert`, `DemoRequestUpdate` |
| 3 | Shared Zod schema | `src/lib/schemas/contact.ts` -- single schema for client + server validation |
| 4 | API route | `src/app/api/contact/route.ts` -- POST handler with Zod revalidation, honeypot check, rate limiting, Supabase insert |
| 5 | Contact page | `src/app/(marketing)/contact/page.tsx` -- form + side panel + email fallback |
| 6 | Form component | `src/components/marketing/contact-form.tsx` -- client component with blur validation, pending state, success/error states |
| 7 | Anti-spam defenses | Honeypot hidden field + in-memory per-IP rate limiter |
| 8 | Notification stub | Supabase Database Webhook or Edge Function to email on new row insert (recipient address blocked on Q-13) |

### Out of Scope

| # | Item | Reason |
|---|------|--------|
| 1 | CRM integration | Not needed for MVP; Supabase table is the system of record |
| 2 | Auto-response email to submitter | Deferred to post-launch iteration |
| 3 | Admin dashboard for reviewing requests | Supabase Studio serves as admin UI for MVP |
| 4 | CAPTCHA / reCAPTCHA / Turnstile | Deferred; honeypot + rate limiting provides initial protection without UX friction |
| 5 | A/B testing on form copy | Belongs to WS-C.3 (analytics) |
| 6 | Newsletter signup form | Separate form; this workstream establishes the schema pattern for reuse |

---

## 3. Input Dependencies

| Dependency | Source | What We Need | Status |
|------------|--------|--------------|--------|
| Marketing layout shell | WS-A.1 | `(marketing)/layout.tsx` with header/footer wrapping the contact page | Not started |
| Supabase project credentials | Environment | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` already referenced in `src/lib/supabase/client.ts` [CODEBASE] | Available |
| Supabase server client | `src/lib/supabase/client.ts` [CODEBASE] | `createSupabaseServerClient()` for API route. Pattern: creates a new instance per request using the anon key. | Available |
| Zod 4 | `package.json` [CODEBASE] | `"zod": "^4.3.6"` already installed | Available |
| `cn()` utility | `src/lib/utils.ts` [CODEBASE] | `clsx` + `tailwind-merge` composition for form styling | Available |
| Glass-morphism pattern | `src/components/districts/detail-panel.tsx` [CODEBASE] | Reference: `bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]` + `border border-white/[0.08]` + ember glow shadow | Available |
| Breathing glow CSS class | WS-A.1 `src/styles/marketing.css` | `mkt-cta-breathe` animation class for submit button | Not started (WS-A.1 deliverable) |
| Spatial tokens | `src/styles/spatial-tokens.css` [CODEBASE] | Safetrekr color scheme: `--color-ember: #4ba467`, `--color-void: #061a23`, `--color-text-primary: #e8f0f4`, `--color-text-secondary: #929899`, `--color-error: #ef4444`, `--color-error-glow: #f87171` | Available |
| API route pattern | `src/app/api/receipts/route.ts` [CODEBASE] | Pattern reference: NextRequest/NextResponse, `createSupabaseServerClient()`, JSON body parsing, error handling | Available |
| Notification recipient email | Q-13 (business owner) | Who receives demo request notifications | **BLOCKED** |
| Response SLA | Q-13 (business owner) | Expected response time shown in success message | **BLOCKED** -- use placeholder |

---

## 4. Deliverables

### 4.1 Supabase Migration: `demo_requests` Table

**File:** `supabase/migrations/003_demo_requests.sql`

This is the third migration in the project, following the existing `001_launch_receipts.sql` and `002_launch_snapshots.sql` [CODEBASE].

```sql
-- =============================================================================
-- Migration 003: demo_requests
--
-- Marketing contact form submissions from the Safetrekr marketing site.
-- Stores demo/briefing requests submitted via /contact and other pages.
--
-- References:
-- - Gap 3 (No Form Backend for Demo Requests)
-- - AD-5 (Form Validation Pattern)
-- - WS-A.4
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.demo_requests (
  -- Primary key: UUID v4, database-generated.
  -- Unlike launch_receipts (UUIDv7, client-generated), this low-volume table
  -- does not need time-sortable IDs. created_at handles chronological queries.
  id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Contact information
  name              TEXT        NOT NULL
                    CHECK (char_length(name) <= 200),
  email             TEXT        NOT NULL
                    CHECK (char_length(email) <= 320),
  phone             TEXT
                    CHECK (phone IS NULL OR char_length(phone) <= 30),

  -- Organization details
  organization      TEXT        NOT NULL
                    CHECK (char_length(organization) <= 300),
  organization_type TEXT        NOT NULL
                    CHECK (organization_type IN (
                      'k12', 'higher_ed', 'church', 'youth_sports', 'business', 'other'
                    )),

  -- Optional message from the visitor
  message           TEXT
                    CHECK (message IS NULL OR char_length(message) <= 2000),

  -- Tracking: which page the form was submitted from
  source_page       TEXT        NOT NULL DEFAULT '/contact'
                    CHECK (char_length(source_page) <= 500),

  -- Lead lifecycle: enables basic workflow tracking in Supabase Studio
  status            TEXT        NOT NULL DEFAULT 'new'
                    CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),

  -- Audit metadata
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------

-- Admin review: filter by lead status
CREATE INDEX idx_demo_requests_status
  ON public.demo_requests (status);

-- Chronological review: newest first
CREATE INDEX idx_demo_requests_created_at
  ON public.demo_requests (created_at DESC);

-- Deduplication checks: lookup by email address
CREATE INDEX idx_demo_requests_email
  ON public.demo_requests (email);

-- Source tracking: which pages generate the most leads
CREATE INDEX idx_demo_requests_source_page
  ON public.demo_requests (source_page);

-- ---------------------------------------------------------------------------
-- Row-Level Security
-- ---------------------------------------------------------------------------

ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Anonymous visitors can INSERT (form submissions from the public internet).
-- No SELECT/UPDATE/DELETE for anon -- write-only from the public internet.
CREATE POLICY "anon_can_insert_demo_requests"
  ON public.demo_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Authenticated users can read all requests (admin review in Supabase Studio).
CREATE POLICY "authenticated_can_read_demo_requests"
  ON public.demo_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can update status (lead management workflow).
CREATE POLICY "authenticated_can_update_demo_requests"
  ON public.demo_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- No DELETE policy: demo requests are append-only for audit trail.
-- GDPR deletion handled via Supabase Studio with service role key, bypassing RLS.

-- ---------------------------------------------------------------------------
-- Comments
-- ---------------------------------------------------------------------------

COMMENT ON TABLE public.demo_requests IS
  'Marketing contact form submissions from the Safetrekr marketing site.';
COMMENT ON COLUMN public.demo_requests.id IS
  'UUID v4, database-generated via gen_random_uuid().';
COMMENT ON COLUMN public.demo_requests.organization_type IS
  'One of: k12, higher_ed, church, youth_sports, business, other.';
COMMENT ON COLUMN public.demo_requests.source_page IS
  'URL path of the page the form was submitted from (e.g., /contact, /pricing).';
COMMENT ON COLUMN public.demo_requests.status IS
  'Lead lifecycle: new -> contacted -> qualified -> closed.';
```

**Design Decisions:**

- **UUID v4** (`gen_random_uuid()`) instead of UUIDv7: This table does not require time-sortable IDs. The `created_at` column with a descending index handles chronological queries. This is simpler than the UUIDv7 pattern used in `src/lib/receipt-store/uuid-v7.ts` [CODEBASE] and appropriate for a low-volume marketing form.
- **`status` column added** beyond original Gap 3 spec: Resolves R-12 (operational workflow undefined) by providing basic lead lifecycle tracking. Supabase Studio serves as the admin interface for updating status.
- **CHECK constraints on lengths**: Mirror the Zod schema's `.max()` constraints at the database level, providing defense-in-depth.
- **No DELETE policy**: Demo requests are append-only. If a request needs to be removed (e.g., GDPR), an authenticated admin can do so via Supabase Studio with the service role key, bypassing RLS.

---

### 4.2 Supabase Type Definitions

**File:** `src/lib/supabase/types.ts` (MODIFY -- extend existing)

Add to the existing `Database` interface alongside `launch_receipts` and `launch_snapshots` [CODEBASE]:

```typescript
// Add to Database.public.Tables:
demo_requests: {
  Row: DemoRequestRow
  Insert: DemoRequestInsert
  Update: DemoRequestUpdate
}
```

New type definitions to add below the existing `LaunchSnapshot*` types:

```typescript
// ============================================================================
// demo_requests
// ============================================================================

/** Row type: what you get back from a SELECT. */
export interface DemoRequestRow {
  id: string                // UUID v4
  name: string
  email: string
  phone: string | null
  organization: string
  organization_type: string // 'k12' | 'higher_ed' | 'church' | 'youth_sports' | 'business' | 'other'
  message: string | null
  source_page: string
  status: string            // 'new' | 'contacted' | 'qualified' | 'closed'
  created_at: string        // TIMESTAMPTZ (ISO 8601)
}

/** Insert type: what you provide for an INSERT. */
export interface DemoRequestInsert {
  id?: string               // defaults to gen_random_uuid()
  name: string
  email: string
  phone?: string | null
  organization: string
  organization_type: string
  message?: string | null
  source_page?: string      // defaults to '/contact'
  status?: string           // defaults to 'new'
  created_at?: string       // defaults to now()
}

/** Update type: all fields optional. */
export type DemoRequestUpdate = Partial<DemoRequestInsert>
```

**Pattern:** Follows the existing `LaunchReceiptRow` / `LaunchReceiptInsert` / `LaunchReceiptUpdate` pattern in `src/lib/supabase/types.ts` [CODEBASE].

---

### 4.3 Shared Zod 4 Schema

**File:** `src/lib/schemas/contact.ts` (NEW directory + file)

This creates a new `schemas/` directory under `src/lib/` for form validation schemas. No existing `schemas/` directory exists in the codebase [CODEBASE]. This file establishes the pattern for future form schemas (e.g., newsletter signup).

```typescript
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
  k12: 'K-12',
  higher_ed: 'Higher Ed',
  church: 'Church',
  youth_sports: 'Youth Sports',
  business: 'Business',
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

  sourcePage: z
    .string()
    .max(500)
    .default('/contact'),
})

// ============================================================================
// Derived Types
// ============================================================================

/** Form input data (what the client submits -- pre-transform). */
export type ContactFormInput = z.input<typeof contactFormSchema>

/** Validated form data (after Zod parsing -- trimmed, lowercased email). */
export type ContactFormData = z.output<typeof contactFormSchema>
```

**Zod 4 Note:** The schema uses `z.input<>` and `z.output<>` (Zod 4's improved type inference) rather than `z.infer<>`. `z.input` represents pre-transform types (what the user types), `z.output` represents post-transform types (after `.trim()`, `.toLowerCase()`, `.default()`). Both are Zod 4 features. This pattern aligns with `src/lib/ai/builder-proposal-schema.ts` [CODEBASE].

---

### 4.4 API Route

**File:** `src/app/api/contact/route.ts` (NEW)

```typescript
/**
 * Contact form submission endpoint.
 *
 * POST /api/contact
 *
 * Accepts a JSON body matching the contactFormSchema, checks the
 * honeypot field for bot detection, revalidates server-side with
 * Zod 4, enforces per-IP rate limiting, and inserts into the
 * demo_requests table in Supabase.
 *
 * Rate limited to 5 submissions per IP per 15-minute window.
 *
 * References: Gap 3 (No Form Backend), AD-5 (Form Validation Pattern)
 */

import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/client'
import { contactFormSchema } from '@/lib/schemas/contact'
```

**Handler Signature:**

```typescript
export async function POST(request: NextRequest): Promise<NextResponse>
```

**Request/Response Contract:**

| Aspect | Specification |
|--------|---------------|
| Method | `POST` only |
| Content-Type | `application/json` |
| Request body | `ContactFormInput` (matches `contactFormSchema`) + optional `website` honeypot field |
| Success response | `201 Created` -- `{ success: true, id: string }` |
| Validation error | `400 Bad Request` -- `{ success: false, errors: Array<{ field: string, message: string }> }` |
| Malformed JSON | `400 Bad Request` -- `{ success: false, error: 'Invalid request body' }` |
| Honeypot triggered | `200 OK` -- `{ success: true, id: '<fake-uuid>' }` (silent rejection -- see 4.8) |
| Rate limit error | `429 Too Many Requests` -- `{ success: false, error: string }` + `Retry-After: <seconds>` header |
| Server error | `500 Internal Server Error` -- `{ success: false, error: string }` |
| CORS | Not needed (same-origin; API route served from same Next.js app) |

**Processing Steps:**

```
1. Parse JSON body (return 400 on failure)
2. Check honeypot field (`website`): if non-empty, return fake 200 success
3. Extract client IP from `request.headers.get('x-forwarded-for')` or `request.ip`
4. Check in-memory rate limiter (5 requests per IP per 15-minute window)
5. Validate with `contactFormSchema.safeParse(body)` (return 400 with field errors)
6. Instantiate Supabase server client via `createSupabaseServerClient()`
7. Map validated data: camelCase schema fields -> snake_case DB columns
8. Insert into `demo_requests` table
9. Return 201 with the new row ID
```

**Rate Limiter Implementation:**

Simple in-memory sliding-window counter. Not distributed (single-instance marketing site). Uses a `Map<string, { count: number, resetAt: number }>` with a 15-minute window and a maximum of 5 submissions per IP.

```typescript
// ============================================================================
// Rate Limiter (in-memory, per-IP)
// ============================================================================

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const RATE_LIMIT_MAX = 5

interface RateLimitEntry {
  count: number
  resetAt: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

/**
 * Check and increment the rate limit counter for a given IP.
 * Returns { allowed: true } or { allowed: false, retryAfterSeconds: number }.
 * Prunes expired entries to prevent memory leaks.
 */
function checkRateLimit(ip: string): { allowed: true } | { allowed: false; retryAfterSeconds: number } {
  const now = Date.now()

  // Prune expired entries (max 1000 to bound work per request)
  let pruned = 0
  for (const [key, entry] of rateLimitMap) {
    if (entry.resetAt <= now) {
      rateLimitMap.delete(key)
      pruned++
      if (pruned >= 100) break // cap cleanup work per request
    }
  }

  const entry = rateLimitMap.get(ip)

  if (!entry || entry.resetAt <= now) {
    // New window
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return { allowed: true }
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    const retryAfterSeconds = Math.ceil((entry.resetAt - now) / 1000)
    return { allowed: false, retryAfterSeconds }
  }

  entry.count++
  return { allowed: true }
}
```

**Client IP Extraction:**

```typescript
function getClientIp(request: NextRequest): string {
  // x-forwarded-for may contain multiple IPs; take the first (client IP)
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  // Fallback for direct connections (local dev)
  return request.ip ?? '127.0.0.1'
}
```

**Full Handler Logic (pseudocode with key implementation details):**

```typescript
export async function POST(request: NextRequest): Promise<NextResponse> {
  // 1. Parse JSON body
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    )
  }

  // 2. Honeypot check: if the hidden 'website' field has any value, silently reject
  if (typeof body.website === 'string' && body.website.length > 0) {
    // Return fake success to avoid revealing the honeypot to bots
    return NextResponse.json(
      { success: true, id: '00000000-0000-0000-0000-000000000000' },
      { status: 200 }
    )
  }

  // 3. Rate limiting
  const ip = getClientIp(request)
  const rateResult = checkRateLimit(ip)

  if (!rateResult.allowed) {
    return NextResponse.json(
      { success: false, error: 'Too many submissions. Please try again later.' },
      {
        status: 429,
        headers: { 'Retry-After': String(rateResult.retryAfterSeconds) },
      }
    )
  }

  // 4. Server-side Zod validation (revalidates client-side checks)
  const result = contactFormSchema.safeParse(body)

  if (!result.success) {
    // Map Zod errors to field-level error array
    const errors = result.error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }))
    return NextResponse.json({ success: false, errors }, { status: 400 })
  }

  const data = result.data

  // 5. Insert into Supabase
  const client = createSupabaseServerClient()

  const { data: row, error } = await client
    .from('demo_requests')
    .insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      organization: data.organization,
      organization_type: data.organizationType,   // camelCase -> snake_case
      message: data.message || null,
      source_page: data.sourcePage,               // camelCase -> snake_case
    })
    .select('id')
    .single()

  if (error) {
    // Log the error server-side for debugging, but do not expose internals
    // eslint-disable-next-line no-console
    console.error('[POST /api/contact] Supabase insert error:', error.message)
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again or email us directly.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true, id: row.id }, { status: 201 })
}
```

**Security Considerations:**

- Server-side revalidation with the same Zod schema prevents bypass of client-side validation
- Input trimming (`.trim()`) and email lowercasing (`.toLowerCase()`) are applied by the Zod schema transforms before database insert
- No user-supplied data is reflected in error messages beyond Zod's predefined error strings
- The `source_page` field is validated to max 500 chars to prevent storage abuse
- Phone field is optional and length-capped but not format-validated (international format variance)
- Honeypot field triggers silent fake success to avoid revealing the mechanism to bots
- Rate limiter prevents abuse from a single IP source

---

### 4.5 Contact Page

**File:** `src/app/(marketing)/contact/page.tsx` (REPLACE placeholder from WS-A.1)

This is a Server Component that renders metadata and composes the client-side form component. It replaces the placeholder page created by WS-A.1.

**Metadata:**

```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | Safetrekr',
  description:
    'Schedule a briefing with the Safetrekr team. Learn how field-grade safety intelligence protects your travelers.',
}
```

**Page Layout (two-column on desktop, stacked on mobile):**

```
+-------------------------------------------------------+
|  [Marketing Header -- from WS-A.1 layout]             |
+-------------------------------------------------------+
|                                                        |
|  Page heading: "Schedule a Briefing"                   |
|  Subheading: "See how Safetrekr keeps every            |
|               traveler accounted for."                 |
|                                                        |
|  +------------------------+  +---------------------+  |
|  |                        |  |                     |  |
|  |   Contact Form         |  |  "What to Expect"   |  |
|  |   (glass card)         |  |  Side Panel          |  |
|  |                        |  |  (glass card)        |  |
|  |   - Full name          |  |                     |  |
|  |   - Work email         |  |  * We'll respond    |  |
|  |   - Phone              |  |    within [SLA]     |  |
|  |   - Organization       |  |  * 30-min intro     |  |
|  |   - Org type           |  |    call             |  |
|  |   - Message            |  |  * Custom demo      |  |
|  |                        |  |    for your use     |  |
|  |   [Schedule a          |  |    case             |  |
|  |    Briefing]           |  |  * No commitment    |  |
|  |                        |  |    required         |  |
|  +------------------------+  +---------------------+  |
|                                                        |
|  "Or email us at team@safetrekr.com"                   |
|                                                        |
+-------------------------------------------------------+
|  [Marketing Footer -- from WS-A.1 layout]              |
+-------------------------------------------------------+
```

**Component Structure:**

```typescript
import { ContactForm } from '@/components/marketing/contact-form'

export default function ContactPage() {
  return (
    <section className="min-h-[calc(100vh-64px)] px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Page heading */}
        <div className="mb-12 text-center">
          <h1 className={cn(
            'font-sans text-4xl font-bold tracking-[0.02em]',
            'text-[var(--color-text-primary)]',
            'lg:text-5xl',
          )}>
            Schedule a Briefing
          </h1>
          <p className={cn(
            'mt-4 text-lg',
            'text-[var(--color-text-secondary)]',
          )}>
            See how Safetrekr keeps every traveler accounted for.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Left: Form card */}
          <div className={cn(
            'rounded-[32px] p-8 lg:p-10',
            'bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]',
            'border border-white/[0.08]',
            'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]',
          )}>
            <ContactForm sourcePage="/contact" />
          </div>

          {/* Right: "What to Expect" side panel */}
          <div className={cn(
            'rounded-[32px] p-8',
            'bg-white/[0.04] backdrop-blur-[12px]',
            'border border-white/[0.06]',
            'h-fit lg:sticky lg:top-24',
          )}>
            {/* Side panel content -- see below */}
          </div>
        </div>

        {/* Email fallback */}
        <p className="mt-12 text-center text-sm text-[var(--color-text-secondary)]">
          Or email us at{' '}
          <a
            href="mailto:team@safetrekr.com"
            className={cn(
              'text-[var(--color-ember-bright)]',
              'hover:text-[var(--color-ember-glow)]',
              'underline underline-offset-4',
              'transition-colors duration-[var(--duration-hover)]',
            )}
          >
            team@safetrekr.com
          </a>
        </p>
      </div>
    </section>
  )
}
```

**Side Panel -- "What to Expect" Content:**

```typescript
<aside>
  <h2 className={cn(
    'font-mono text-xs font-medium uppercase',
    'tracking-[var(--tracking-widest)]',
    'text-[var(--color-text-tertiary)]',
    'mb-6',
  )}>
    What to Expect
  </h2>
  <ul className="space-y-4">
    {[
      'We\'ll respond within 1 business day',       // PLACEHOLDER: blocked on Q-13 SLA
      '30-minute introductory call tailored to your organization',
      'Custom demo of Safetrekr for your use case',
      'No commitment required',
    ].map((item, i) => (
      <li key={i} className="flex gap-3 text-sm text-[var(--color-text-secondary)]">
        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-ember)]" />
        {item}
      </li>
    ))}
  </ul>
</aside>
```

**Responsive Behavior:**

| Breakpoint | Layout |
|------------|--------|
| < 1024px (mobile/tablet) | Single column -- form card stacked above side panel |
| >= 1024px (desktop) | Two columns -- form left (flex-1), side panel right (340px fixed width, sticky) |

---

### 4.6 Form Component

**File:** `src/components/marketing/contact-form.tsx` (NEW)

A `'use client'` component that handles form state, validation, and submission.

**Component Signature:**

```typescript
'use client'

import { useState, useRef } from 'react'
import { cn } from '@/lib/utils'
import {
  contactFormSchema,
  ORGANIZATION_TYPES,
  ORGANIZATION_TYPE_LABELS,
  type ContactFormInput,
} from '@/lib/schemas/contact'

interface ContactFormProps {
  /** URL path to record as source_page (e.g., '/contact', '/pricing') */
  sourcePage?: string
}

export function ContactForm({ sourcePage = '/contact' }: ContactFormProps)
```

**State Management:**

```typescript
type FormStatus =
  | { state: 'idle' }
  | { state: 'submitting' }
  | { state: 'success' }
  | { state: 'error'; fieldErrors: Record<string, string>; serverError?: string }

const [status, setStatus] = useState<FormStatus>({ state: 'idle' })
const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())
```

**Behavior Specification:**

| Behavior | Detail |
|----------|--------|
| Client validation timing | Validate each field on `blur` (only if field has been touched). Validate all fields on `submit`. |
| Validation schema | Import `contactFormSchema` from `@/lib/schemas/contact` |
| Submit method | `fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })` |
| Pending state | Disable submit button, replace button text with "Sending...", reduce button opacity |
| Success state | Replace entire form with glass-card "Thank you" message (inline, no redirect) |
| Server validation error (400) | Map `errors[]` array from response to inline field error messages below each field |
| Server error (500) | Display error banner above form with generic message |
| Rate limit error (429) | Display error banner with "Too many submissions" message |
| `sourcePage` hidden field | Injected from prop, not shown to user, sent in request body |
| Submit button text | "Schedule a Briefing" (not "Submit") |
| Submit button pending text | "Sending..." |

**Form Fields:**

| Field | HTML Element | Required | Zod Rule | Placeholder | Notes |
|-------|-------------|----------|----------|-------------|-------|
| Full name | `<input type="text">` | Yes | `.min(1).max(200).trim()` | "Jane Rodriguez" | `autoComplete="name"` |
| Work email | `<input type="email">` | Yes | `.email().max(320).trim().toLowerCase()` | "jane@organization.edu" | `autoComplete="email"` |
| Phone | `<input type="tel">` | No | `.max(30).trim().optional()` | "+1 (555) 000-0000" | `autoComplete="tel"` |
| Organization | `<input type="text">` | Yes | `.min(1).max(300).trim()` | "Springfield School District" | `autoComplete="organization"` |
| Organization type | `<select>` | Yes | `.enum(ORGANIZATION_TYPES)` | "Select organization type" | Options from `ORGANIZATION_TYPE_LABELS` |
| Message | `<textarea rows={4}>` | No | `.max(2000).trim().optional()` | "Tell us about your safety needs..." | |
| Source page | hidden | -- | `.default('/contact')` | -- | Set from `sourcePage` prop, not shown to user |
| Website (honeypot) | hidden | -- | -- | -- | See section 4.8 |

**Form Input Styling (per AD-2 visual pattern):**

Labels:

```
cn(
  'block text-sm font-medium mb-1.5',
  'text-[var(--color-text-secondary)]',
)
```

Text inputs and select:

```
cn(
  'w-full rounded-xl px-4 py-3',
  'bg-white/[0.04]',
  'border border-white/[0.08]',
  'text-[var(--color-text-primary)] text-sm',
  'placeholder:text-[var(--color-text-ghost)]',
  // Focus state: green accent ring
  'focus:outline-none focus:border-[var(--color-ember)]',
  'focus:ring-1 focus:ring-[var(--color-ember)]',
  // Transition
  'transition-colors duration-[var(--duration-hover)]',
  // Error state (applied conditionally)
  hasError && 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]',
)
```

Textarea (same as text input plus):

```
'resize-none' // prevent manual resize to maintain layout
```

Select dropdown (additional styling):

```
'appearance-none cursor-pointer'
// Custom chevron via background SVG or Lucide ChevronDown icon positioned absolutely
```

Required field indicator:

```
<span className="text-[var(--color-ember)] ml-0.5">*</span>
```

**Error Display Pattern (per AD-5):**

```
// Inline error message below field
<p className={cn(
  'mt-1 text-xs',
  'text-[var(--color-error-glow)]', // #f87171 -- softer red for dark backgrounds
)}>
  {errorMessage}
</p>
```

Error clears when the user begins editing the field (on `onChange` or `onInput`).

**Submit Button Styling:**

```
cn(
  'mkt-cta-breathe',                           // breathing glow animation (from WS-A.1 marketing.css)
  'w-full rounded-full px-6 py-3.5 mt-2',
  'text-sm font-medium',
  'bg-[var(--color-ember)] text-[var(--color-void)]',
  'hover:bg-[var(--color-ember-bright)]',
  'active:scale-[0.97]',
  'transition-all duration-[var(--duration-hover)]',
  // Focus
  'focus-visible:outline-2 focus-visible:outline-offset-2',
  'focus-visible:outline-[var(--color-ember-bright)]',
  // Disabled/pending state
  isSubmitting && 'opacity-70 cursor-not-allowed',
)
```

**Server Error Banner:**

Displayed above the form when a 429 or 500 response is received:

```
<div className={cn(
  'mb-6 rounded-xl px-4 py-3',
  'bg-[var(--color-error-dim)] border border-[var(--color-error)]/20',
  'text-sm text-[var(--color-error-glow)]',
)}>
  {serverError}
</div>
```

**Success State Content:**

Glass-card overlay that replaces the entire form on successful submission:

```typescript
<div className={cn(
  'flex flex-col items-center justify-center py-12 text-center',
)}>
  {/* Green checkmark circle */}
  <div className={cn(
    'mb-6 flex h-16 w-16 items-center justify-center rounded-full',
    'bg-[var(--color-ember)]/10 border border-[var(--color-ember)]/20',
  )}>
    {/* Check icon (Lucide or inline SVG) */}
  </div>

  <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
    Thank you for reaching out.
  </h3>
  <p className="mt-2 max-w-sm text-sm text-[var(--color-text-secondary)]">
    We've received your request and will be in touch within 1 business day.
    {/* PLACEHOLDER: "1 business day" blocked on Q-13 SLA answer */}
  </p>
  <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
    In the meantime, explore{' '}
    <a href="/how-it-works" className="text-[var(--color-ember-bright)] underline underline-offset-4">
      how Safetrekr works
    </a>.
  </p>
</div>
```

---

### 4.7 Notification Mechanism (Partial -- Blocked on Q-13)

**Approach:** Supabase Database Webhook or Edge Function triggered on `INSERT` to `demo_requests`.

**Option A -- Database Webhook (simplest):**

Configure a Supabase Database Webhook in the Supabase Dashboard:
- Trigger: `INSERT` on `public.demo_requests`
- Target: HTTP POST to an external email service (e.g., Resend, SendGrid) or a Supabase Edge Function
- Payload: Row data (name, email, organization, organization_type, message, created_at)

**Option B -- Supabase Edge Function (recommended):**

**File:** `supabase/functions/notify-demo-request/index.ts`

Listens for `INSERT` webhook, formats an email notification, and sends via email provider API.

```typescript
// supabase/functions/notify-demo-request/index.ts

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

const NOTIFY_EMAIL = Deno.env.get('DEMO_REQUEST_NOTIFY_EMAIL') ?? 'team@safetrekr.com'
// Email provider API key (e.g., Resend)
const EMAIL_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  const payload = await req.json()
  const record = payload.record // The new demo_requests row

  // Format and send notification email via provider API
  // Implementation depends on Q-13 resolution (recipient, provider choice)

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
```

**Blocked Items:**

| Item | Blocker | Placeholder |
|------|---------|-------------|
| Recipient email address | Q-13 | `DEMO_REQUEST_NOTIFY_EMAIL` env var, default `team@safetrekr.com` |
| Response SLA | Q-13 | "1 business day" |
| Email provider selection | Q-A4.3 | Recommend Resend (simple API, generous free tier) |

**Recommendation:** Implement Option B (Edge Function) for flexibility. The function can be deployed with a placeholder recipient and updated when Q-13 is resolved.

---

### 4.8 Anti-Spam Measures

**Honeypot Field:**

A hidden `website` field is included in the form but invisible to human users. Bots that auto-fill all fields will populate this field, allowing the server to silently reject the submission.

**Client-side implementation:**

```typescript
{/* Honeypot field -- hidden from humans, visible to bots */}
<div aria-hidden="true" className="absolute -left-[9999px] -top-[9999px]">
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
```

**Key honeypot design decisions:**

- Positioned off-screen with `absolute -left-[9999px]` rather than `display: none` or `visibility: hidden` (which bots commonly detect)
- Uses `aria-hidden="true"` to hide from screen readers
- Uses `tabIndex={-1}` to prevent keyboard navigation reaching it
- Field name `website` is a natural-sounding field that bots are likely to fill
- `autoComplete="off"` prevents browser auto-fill from triggering false positives

**Server-side handling (in API route):**

When the `website` field contains any value, the API returns a fake `200 OK` success response with a dummy ID. This prevents bots from learning that the honeypot was detected.

```typescript
// In POST handler, before rate limiting and validation:
if (typeof body.website === 'string' && body.website.length > 0) {
  return NextResponse.json(
    { success: true, id: '00000000-0000-0000-0000-000000000000' },
    { status: 200 }
  )
}
```

**CSRF Protection:**

No explicit CSRF token is required. Justification:
- The API route is a same-origin POST endpoint served by the same Next.js application
- Modern browsers enforce `SameSite=Lax` cookie policy by default, which prevents cross-origin form submissions from carrying session cookies
- The API route uses `Content-Type: application/json`, which cannot be sent via a plain HTML `<form>` submission (requires JavaScript `fetch()`)
- There is no session cookie to steal -- the form uses the Supabase anon key for insert-only access

This is documented as decision D-12 below.

---

## 5. Acceptance Criteria

### 5.1 Database

| ID | Criterion | Verification |
|----|-----------|-------------|
| AC-1 | `demo_requests` table exists in Supabase with all columns matching the DDL in section 4.1 | Supabase Studio: inspect table schema |
| AC-2 | Column constraints enforced: `organization_type` CHECK, `status` CHECK, NOT NULL on required fields, length CHECKs | Supabase Studio: attempt invalid insert |
| AC-3 | RLS enabled: anonymous can INSERT, authenticated can SELECT and UPDATE, no DELETE policy | Supabase Studio: test with anon key (insert-only) and authenticated key (read + update) |
| AC-4 | Indexes exist on `status`, `created_at DESC`, `email`, and `source_page` | Supabase Studio: inspect indexes |
| AC-5 | A test INSERT via Supabase Studio succeeds with valid data | Manual test |
| AC-6 | A test INSERT with invalid `organization_type` is rejected by the CHECK constraint | Manual test |

### 5.2 Types

| ID | Criterion | Verification |
|----|-----------|-------------|
| AC-7 | `DemoRequestRow`, `DemoRequestInsert`, `DemoRequestUpdate` types exist in `src/lib/supabase/types.ts` | Code review |
| AC-8 | `Database` interface includes `demo_requests` in `Tables` | Code review |
| AC-9 | `pnpm typecheck` passes with no errors | CLI: `pnpm typecheck` |

### 5.3 Zod Schema

| ID | Criterion | Verification |
|----|-----------|-------------|
| AC-10 | `src/lib/schemas/contact.ts` exports `contactFormSchema`, `ContactFormInput`, `ContactFormData` | Code review |
| AC-11 | `ORGANIZATION_TYPES` and `ORGANIZATION_TYPE_LABELS` are exported | Code review |
| AC-12 | Schema validates a correct payload without errors | Unit test or manual: `contactFormSchema.parse(validPayload)` |
| AC-13 | Schema rejects: missing `name`, invalid `email`, `organizationType` not in enum, `message` over 2000 chars | Unit test or manual: `contactFormSchema.safeParse(invalidPayload)` |
| AC-14 | `.trim()` removes leading/trailing whitespace from string fields | Unit test or manual |
| AC-15 | `.toLowerCase()` normalizes email casing | Unit test or manual |

### 5.4 API Route

| ID | Criterion | Verification |
|----|-----------|-------------|
| AC-16 | `POST /api/contact` returns 201 with `{ success: true, id: string }` for valid input | `curl` test |
| AC-17 | `POST /api/contact` returns 400 with field-level `errors[]` array for invalid input | `curl` test |
| AC-18 | `POST /api/contact` returns 429 with `Retry-After` header after 5 submissions from same IP in 15 minutes | `curl` test: send 6 rapid requests |
| AC-19 | `POST /api/contact` returns 400 for malformed JSON body | `curl` test: send non-JSON body |
| AC-20 | `POST /api/contact` returns 500 with generic error message on Supabase failure (no internal details leaked) | Code review: verify error.message is not included in response |
| AC-21 | Submitted data appears in `demo_requests` table in Supabase with correct values | Supabase Studio: verify row after form submission |
| AC-22 | All Zod transforms (trim, lowercase email) are applied before insert | Supabase Studio: verify trimmed/lowercased values in row |
| AC-23 | Honeypot: submitting with `website` field filled returns fake 200 success and does NOT insert a row | `curl` test + Supabase Studio verification |

### 5.5 Contact Page

| ID | Criterion | Verification |
|----|-----------|-------------|
| AC-24 | Page renders at `/contact` with correct `<title>` and `<meta>` tags | Browser DevTools: inspect `<head>` |
| AC-25 | Two-column layout on desktop (form left, side panel right), stacked on mobile | Browser: resize viewport |
| AC-26 | "What to Expect" side panel displays 4 bullet points | Visual inspection |
| AC-27 | Email fallback link renders below the form with `mailto:` href | Visual inspection + click test |
| AC-28 | Page uses the marketing layout from WS-A.1 (header + footer visible) | Visual inspection |
| AC-29 | Page background matches `--color-void` -> `--color-deep` gradient or solid dark background | Visual inspection |
| AC-30 | Glass-morphism card matches the specified visual treatment: `bg-white/[0.06] backdrop-blur-[16px]` | Browser DevTools: inspect computed styles |

### 5.6 Form Component

| ID | Criterion | Verification |
|----|-----------|-------------|
| AC-31 | Each field validates on blur with inline error message below the field | Manual: tab through fields leaving required ones empty |
| AC-32 | Error messages clear when user begins editing the field | Manual: trigger error, then start typing |
| AC-33 | Submit button reads "Schedule a Briefing" | Visual inspection |
| AC-34 | Submit button shows "Sending..." and is disabled during submission | Manual: submit form, observe button state |
| AC-35 | Submit button has breathing glow animation (`mkt-cta-breathe` class) | Visual inspection: observe pulsing glow |
| AC-36 | Successful submission replaces the form with a glass-card "Thank you" message (no redirect) | Manual: submit valid form |
| AC-37 | Server validation errors (400) display inline below the corresponding field | Manual: bypass client validation (DevTools) and submit invalid data |
| AC-38 | Server errors (500, 429) display a banner above the form | Manual: trigger rate limit (6 rapid submissions) |
| AC-39 | `sourcePage` is included in the submission payload (hidden from user) | Browser DevTools: inspect fetch request body |
| AC-40 | Honeypot field is invisible to sighted users and screen readers | Visual inspection + screen reader test |
| AC-41 | Form inputs have green accent focus rings matching `--color-ember` | Manual: tab through fields |
| AC-42 | Form inputs have error state border matching `--color-error` | Manual: trigger validation error |
| AC-43 | All interactive elements have visible focus indicators | Manual: tab through entire form |

### 5.7 Build Integrity

| ID | Criterion | Verification |
|----|-----------|-------------|
| AC-44 | `pnpm typecheck` passes with zero errors | CLI: `pnpm typecheck` |
| AC-45 | `pnpm lint` passes with zero errors | CLI: `pnpm lint` |
| AC-46 | `pnpm build` succeeds | CLI: `pnpm build` |

---

## 6. Decisions Made

| ID | Decision | Rationale | Alternatives Considered |
|----|----------|-----------|------------------------|
| D-1 | UUID v4 (`gen_random_uuid()`) for `demo_requests.id` instead of UUIDv7 | Low-volume table; `created_at` index handles ordering. Avoids client-side ID generation complexity. Simpler than the UUIDv7 pattern in `src/lib/receipt-store/uuid-v7.ts` [CODEBASE]. | UUIDv7 client-generated (over-engineered for contact form volume) |
| D-2 | Added `status` column (`new`, `contacted`, `qualified`, `closed`) beyond original Gap 3 spec | Resolves R-12 (operational workflow undefined). Enables basic lead-lifecycle tracking without a CRM. Supabase Studio serves as admin UI. | No status tracking (leaves workflow undefined); full CRM integration (over-scoped) |
| D-3 | No DELETE RLS policy -- append-only | Audit trail preservation. GDPR deletion handled via Supabase Studio with service role key, bypassing RLS. | Allow DELETE for anon (security risk); allow DELETE for authenticated (loses audit trail) |
| D-4 | In-memory rate limiter (not Redis/distributed) | Marketing site runs as a single instance. 5 req/15min per IP is sufficient for a contact form. Upgrading to Redis is trivial if needed post-launch. | Redis-backed limiter (adds infrastructure dependency for low-volume form); no rate limiting (leaves endpoint unprotected) |
| D-5 | Shared Zod schema in `src/lib/schemas/contact.ts` (new directory) | Per AD-5. No existing `schemas/` directory in `src/lib/` [CODEBASE]. Establishes pattern for future form schemas. | Inline schema in API route (no client reuse); separate client/server schemas (duplication risk) |
| D-6 | `organization_type` stored as snake_case enum strings (`k12`, `higher_ed`) | Database convention. Labels (`K-12`, `Higher Ed`) are a UI concern, mapped via `ORGANIZATION_TYPE_LABELS` in the schema file. | Human-readable labels in DB (complicates queries); PostgreSQL ENUM type (harder to extend without migration) |
| D-7 | Phone field: no format validation, only length cap (30 chars) | International phone number formats vary too widely for a single regex. Length cap prevents abuse. | Regex validation (would reject valid international formats); libphonenumber (heavy dependency for a single field) |
| D-8 | Email fallback uses `team@safetrekr.com` as placeholder | Blocked on Q-13 for confirmed address. Easy to update -- single string in the page component. | No fallback (reduces accessibility); mailto form (over-engineered) |
| D-9 | Response SLA placeholder: "1 business day" | Blocked on Q-13. Used in success state and side panel. Grep-friendly placeholder text for later update. | No SLA mention (less informative); "within 24 hours" (may be unrealistic without confirmation) |
| D-10 | Client-side `fetch()` to API route (not Server Action) | The API route provides a testable, curl-friendly endpoint. Server Actions are an alternative the implementing developer may adopt for the form; the API route is the canonical backend regardless. | React 19 Server Action only (loses curl testability); both (complexity without clear benefit at this stage) |
| D-11 | Honeypot hidden field (`website`) for anti-spam | Zero UX friction; effective against simple bots. Does not require external service. More sophisticated protection (CAPTCHA) can be added later if needed. | CAPTCHA/reCAPTCHA (friction for legitimate users); Turnstile (adds external dependency); no anti-spam (relies solely on rate limiting) |
| D-12 | No explicit CSRF token required | Same-origin POST with `Content-Type: application/json` cannot be sent via HTML form submission. Modern `SameSite=Lax` cookies prevent cross-origin cookie attachment. No session cookie exists to protect -- the Supabase anon key is a public key used for insert-only access. | CSRF token in form + cookie (unnecessary given JSON API constraint); double-submit cookie (adds complexity without benefit) |
| D-13 | Database-level CHECK constraints mirror Zod schema length limits | Defense-in-depth: even if the API route is bypassed (direct Supabase access), the database enforces constraints. | Zod-only validation (single point of enforcement); database-only constraints (poor error messages) |

---

## 7. Open Questions

| ID | Question | Impact | Needed By | Status |
|----|----------|--------|-----------|--------|
| Q-13 | Who receives demo request notification emails? What is the response SLA? | Determines notification recipient, SLA copy in success message, and "What to Expect" panel content | Before production deployment | **OPEN** -- ask business owner |
| Q-A4.1 | Should the form include a "How did you hear about us?" field? | Low-effort addition; useful for marketing attribution. Would add one more field to schema, DB, and form. | Before implementation | **OPEN** |
| Q-A4.2 | Is `team@safetrekr.com` the correct fallback email for the contact page? | Displayed below form as alternative contact method | Before implementation | **OPEN** |
| Q-A4.3 | Email provider for notification function: Resend, SendGrid, or other? | Affects Edge Function implementation and environment variable setup | Before notification implementation | **OPEN** -- recommend Resend |
| Q-A4.4 | Should duplicate email submissions be detected/warned? (e.g., same email within 24 hours) | The email index supports this query; needs product decision on behavior (warn, block, or allow) | Before implementation | **OPEN** |
| Q-A4.5 | Should the submit button CTA text change based on `sourcePage`? (e.g., "Request Pricing Info" on `/pricing`) | Minor UX refinement. Would require passing a `ctaLabel` prop to the form component. | Before Phase B pages embed the form | **OPEN** |

---

## 8. Risk Register

| ID | Risk | Likelihood | Impact | Severity | Mitigation |
|----|------|------------|--------|----------|------------|
| R-12 | Contact form operational workflow undefined -- who reviews, responds, and tracks demo requests? | HIGH | MEDIUM | **High** | Added `status` column for lifecycle tracking. Supabase Studio is the admin UI for MVP. Notification mechanism is specced but blocked on Q-13. Define human process before launch. |
| R-A4.1 | Notification not configured at deploy time (Q-13 unresolved) | MEDIUM | MEDIUM | **Medium** | Form submissions still persist to Supabase regardless of notification status. Team can poll Supabase Studio manually. Notification is additive, not blocking for form functionality. |
| R-A4.2 | In-memory rate limiter resets on server restart / redeployment | LOW | LOW | **Low** | Acceptable for a marketing contact form. The rate limiter is a convenience anti-abuse measure, not a security boundary. If abuse is observed, upgrade to a Redis-backed rate limiter or add CAPTCHA. |
| R-A4.3 | Form spam bypasses honeypot + rate limiting | MEDIUM | LOW | **Low** | Layered defense (honeypot + rate limiting) stops simple bots. Supabase RLS prevents read-back of data. If sophisticated spam is observed post-launch, add Cloudflare Turnstile (invisible CAPTCHA) as a follow-up. |
| R-A4.4 | WS-A.1 layout not ready when this workstream begins | MEDIUM | LOW | **Low** | The API route, Supabase table, schema, and form component can all be built independently. Only the contact page composition (`page.tsx`) requires the marketing layout. Build order: backend first (steps 1-4), compose page last (step 6). |
| R-A4.5 | Zod 4 API differences from documentation examples | LOW | LOW | **Low** | Zod 4 is already used in 3 files in the codebase [CODEBASE: `builder-proposal-schema.ts`, `exception-classifier.ts`, `camera-directive-schema.ts`]. Patterns are validated. |
| R-A4.6 | `backdrop-blur` on form card causes performance issues on low-end mobile devices | MEDIUM | LOW | **Low** | Apply the same fallback as WS-A.1: `@supports (backdrop-filter: blur(16px))` conditional. Without blur support, the `bg-white/[0.06]` still provides a usable semi-transparent background. |
| R-A4.7 | Form not usable without JavaScript | MEDIUM | LOW | **Low** | The form requires JavaScript for client-side validation and fetch submission. Progressive enhancement is limited to rendering the page structure (fields visible, but non-functional without JS). This is acceptable for a marketing site where JS availability is near-universal. |

---

## Appendix A: File Manifest

| # | File | Action | Description |
|---|------|--------|-------------|
| 1 | `supabase/migrations/003_demo_requests.sql` | CREATE | Table DDL, RLS policies, indexes, comments |
| 2 | `src/lib/supabase/types.ts` | MODIFY | Add `DemoRequestRow`, `DemoRequestInsert`, `DemoRequestUpdate` to `Database` interface |
| 3 | `src/lib/schemas/contact.ts` | CREATE | Shared Zod 4 validation schema + organization type constants + derived types |
| 4 | `src/app/api/contact/route.ts` | CREATE | POST handler with honeypot check, rate limiting, Zod validation, Supabase insert |
| 5 | `src/app/(marketing)/contact/page.tsx` | CREATE (replaces WS-A.1 placeholder) | Contact page server component with two-column layout |
| 6 | `src/components/marketing/contact-form.tsx` | CREATE | Client form component with blur validation, honeypot, submission states |
| 7 | `supabase/functions/notify-demo-request/index.ts` | CREATE (partial) | Notification Edge Function -- blocked on Q-13 for recipient |

**Existing files referenced (read-only):**

| File | Usage |
|------|-------|
| `src/lib/supabase/client.ts` [CODEBASE] | `createSupabaseServerClient()` used in API route |
| `src/lib/utils.ts` [CODEBASE] | `cn()` used in form component styling |
| `src/app/api/receipts/route.ts` [CODEBASE] | Pattern reference for API route structure (NextRequest/NextResponse, JSON parsing, error handling) |
| `src/lib/ai/builder-proposal-schema.ts` [CODEBASE] | Pattern reference for Zod 4 schema definition |
| `src/lib/receipt-store/uuid-v7.ts` [CODEBASE] | Referenced in D-1 decision (not used -- UUID v4 chosen instead) |
| `src/styles/spatial-tokens.css` [CODEBASE] | Token values for form styling (ember, error, text, glass) |
| `src/components/districts/detail-panel.tsx` [CODEBASE] | Glass-morphism pattern reference (card styling) |

---

## Appendix B: Implementation Order

Given the dependency on WS-A.1 for the marketing layout, the recommended build order within this workstream is:

```
1. Supabase migration .......... (no code dependencies; can run immediately)
2. Supabase types ............... (depends on step 1 for column reference)
3. Zod schema ................... (no dependencies beyond zod package)
4. API route .................... (depends on 2 + 3; testable with curl)
5. Form component ............... (depends on 3 + 4; can render standalone)
6. Contact page ................. (depends on 5 + WS-A.1 layout)
7. Notification function ........ (blocked on Q-13; can be added independently)
```

Steps 1--4 can proceed immediately without waiting for WS-A.1. The form component (step 5) can be developed and tested in isolation. Only the contact page composition (step 6) requires the marketing layout to be in place.

**Curl test commands for the API route (step 4 verification):**

```bash
# Valid submission
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Rodriguez","email":"jane@springfield.edu","organization":"Springfield SD","organizationType":"k12","sourcePage":"/contact"}'

# Validation error (missing required field)
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"","email":"not-an-email","organization":"","organizationType":"invalid"}'

# Honeypot triggered (should return fake success, no DB insert)
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Bot","email":"bot@spam.com","organization":"SpamCo","organizationType":"other","website":"http://spam.com"}'

# Rate limit test (send 6 rapid requests)
for i in {1..6}; do
  curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:3000/api/contact \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"Test $i\",\"email\":\"test$i@example.com\",\"organization\":\"Org\",\"organizationType\":\"business\"}"
done
# Expected: five 201 responses, then one 429
```

---

## Appendix C: Visual Reference

**Color tokens used in form UI (Safetrekr dark mode):**

| Token | Value | Usage |
|-------|-------|-------|
| `--color-void` | `#061a23` | Page background |
| `--color-ember` | `#4ba467` | Focus rings, required indicators, CTA bg, side panel bullets |
| `--color-ember-bright` | `#6abf84` | CTA hover, email fallback link |
| `--color-ember-glow` | `#92d4a6` | Email fallback link hover |
| `--color-text-primary` | `#e8f0f4` | Input text, headings |
| `--color-text-secondary` | `#929899` | Labels, side panel text, subheading |
| `--color-text-tertiary` | `#5a7a88` | Side panel heading |
| `--color-text-ghost` | `#33505e` | Placeholder text |
| `--color-error` | `#ef4444` | Error state border, error banner border |
| `--color-error-dim` | `#3a1212` | Error banner background |
| `--color-error-glow` | `#f87171` | Error message text (softer red for dark bg) |
| `--ember-rgb` | `75, 164, 103` | Glass card glow shadow (`rgba()` usage) |
