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
function checkRateLimit(
  ip: string
): { allowed: true } | { allowed: false; retryAfterSeconds: number } {
  const now = Date.now()

  // Prune expired entries (cap cleanup work per request)
  let pruned = 0
  for (const [key, entry] of rateLimitMap) {
    if (entry.resetAt <= now) {
      rateLimitMap.delete(key)
      pruned++
      if (pruned >= 100) break
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

// ============================================================================
// Client IP Extraction
// ============================================================================

function getClientIp(request: NextRequest): string {
  // x-forwarded-for may contain multiple IPs; take the first (client IP)
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  // x-real-ip is set by many reverse proxies (Nginx, Vercel, etc.)
  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp.trim()
  }
  // Fallback for direct connections (local dev)
  return '127.0.0.1'
}

// ============================================================================
// POST /api/contact
// ============================================================================

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
      {
        success: false,
        error: 'Too many submissions. Please try again later.',
      },
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
      organization_type: data.organizationType, // camelCase -> snake_case
      message: data.message || null,
      source_page: data.sourcePage, // camelCase -> snake_case
    })
    .select('id')
    .single()

  if (error) {
    // Log the error server-side for debugging, but do not expose internals
    console.error('[POST /api/contact] Supabase insert error:', error.message)
    return NextResponse.json(
      {
        success: false,
        error:
          'An unexpected error occurred. Please try again or email us directly.',
      },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true, id: row.id }, { status: 201 })
}
