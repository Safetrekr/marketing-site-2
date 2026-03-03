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

-- ---------------------------------------------------------------------------
-- Notification Webhook (stub)
-- ---------------------------------------------------------------------------
-- TODO: Configure a Supabase Database Webhook or Edge Function to send
-- email notifications on INSERT to this table.
--
-- Recipient: DEMO_REQUEST_NOTIFY_EMAIL env var (default: team@safetrekr.com)
-- Blocked on: Q-13 (notification recipient + response SLA)
--
-- Option A: Database Webhook in Supabase Dashboard
--   Trigger: INSERT on public.demo_requests
--   Target: HTTP POST to email provider (Resend recommended)
--
-- Option B: Supabase Edge Function at supabase/functions/notify-demo-request/
--   Listens for INSERT webhook, formats + sends notification email.
