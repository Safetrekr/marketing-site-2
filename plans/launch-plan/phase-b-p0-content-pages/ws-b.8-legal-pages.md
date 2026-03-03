# WS-B.8: Legal Pages

> **Workstream ID:** WS-B.8
> **Phase:** B -- P0 Content Pages
> **Assigned Agent:** `react-developer`
> **Status:** Draft
> **Created:** 2026-03-02
> **Last Updated:** 2026-03-02
> **Depends On:** WS-A.1 (Marketing Layout), Business Owner (legal content)
> **Blocks:** Launch
> **Resolves:** Gap 8 (Legal Pages Content Source Unknown)

---

## 1. Objective

Create the Terms of Service and Privacy Policy pages at `/legal/terms` and `/legal/privacy` with a markdown content rendering pipeline, readable typography, and print-friendly styling. These pages render inside the marketing layout (header + footer from WS-A.1) and maintain the Oblivion HUD dark aesthetic while prioritizing maximum text readability -- legal content demands clarity above atmosphere.

This workstream delivers two categories of output:

1. **Page infrastructure (UNBLOCKED):** Route files, shared legal sub-layout, markdown rendering component, typography styles, print stylesheet, placeholder content with expected document structure, and SEO metadata. This can be built immediately after WS-A.1 ships.

2. **Final legal content (BLOCKED):** The actual Terms of Service and Privacy Policy text. This requires a business owner decision (template service like Termly, custom attorney review, or self-authored). The pages cannot go live without real legal text.

Risk R-04 designates this as a **launch blocker**: the site cannot launch without legal pages in place. The infrastructure must be ready so that content insertion is the only remaining step.

---

## 2. Scope

### In Scope

| # | Item | Notes |
|---|------|-------|
| 1 | `src/app/(marketing)/legal/terms/page.tsx` | Terms of Service page (server component) |
| 2 | `src/app/(marketing)/legal/privacy/page.tsx` | Privacy Policy page (server component) |
| 3 | `src/app/(marketing)/legal/layout.tsx` | Shared sub-layout for legal pages: prose container, sidebar table of contents (desktop), "last updated" display |
| 4 | `src/components/marketing/legal-prose.tsx` | Server component that renders markdown string content with styled prose typography |
| 5 | `src/components/marketing/legal-toc.tsx` | Table of contents component auto-generated from heading structure |
| 6 | `content/legal/terms.md` | Markdown file containing Terms of Service text (placeholder initially, replaced by business owner) |
| 7 | `content/legal/privacy.md` | Markdown file containing Privacy Policy text (placeholder initially, replaced by business owner) |
| 8 | `src/styles/legal-prose.css` | Typography styles for legal content: heading hierarchy, paragraph spacing, lists, links, blockquotes, tables. Print stylesheet. |
| 9 | Per-page SEO metadata | `<title>`, `<meta name="description">`, canonical URL |
| 10 | Responsive behavior | Single-column on mobile (TOC above content), sidebar TOC on desktop |
| 11 | Print-friendly output | `@media print` rules: light background, dark text, no glass-morphism, no header/footer chrome, visible URLs after links |

### Out of Scope

| # | Item | Rationale |
|---|------|-----------|
| 1 | Writing final legal content | Business owner responsibility. This workstream provides placeholder structure and rendering infrastructure. |
| 2 | Cookie consent banner | Separate concern; may be handled by a third-party service (Termly, OneTrust) or a future workstream |
| 3 | Legal content versioning or diff viewer | Over-engineering for launch. Legal pages are static documents updated infrequently. |
| 4 | CMS integration for legal content editing | Legal text changes rarely. File-based markdown is sufficient. If a CMS is added later, the rendering component can consume content from any source. |
| 5 | Additional legal pages (DMCA, Acceptable Use, SLA, DPA) | Can be added post-launch using the same infrastructure. Only Terms and Privacy are launch requirements. |
| 6 | Footer legal link wiring | Already handled by WS-A.1 (footer renders links to `/legal/terms` and `/legal/privacy` via `FOOTER_LEGAL_LINKS` config) |

---

## 3. Input Dependencies

### Codebase Files to Reference

| File | What to Use From It |
|------|---------------------|
| `src/app/(marketing)/layout.tsx` | Marketing layout (from WS-A.1). Legal pages render inside this. Legal sub-layout nests within it. |
| `src/styles/spatial-tokens.css` | Safetrekr dark-mode tokens. Legal pages use `--color-deep` or `--color-surface` as the content card background for slightly elevated readability. Text tokens: `--color-text-primary: #e8f0f4`, `--color-text-secondary: #929899`. |
| `src/components/districts/detail-panel.tsx` | Glass-morphism reference: `bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]`, `border border-white/[0.08]`. Legal page content card uses a lighter variant for better text readability. |
| `src/lib/utils.ts` | `cn()` utility. Import: `import { cn } from '@/lib/utils'`. |
| `src/app/globals.css` | Tailwind theme bridge. Confirms `bg-void`, `text-text-primary`, etc. are available as utilities. Font variables: `--font-sans` (Geist Sans), `--font-mono` (Geist Mono). |
| `src/lib/config/marketing-nav.ts` | `FOOTER_LEGAL_LINKS` already defines links to `/legal/terms` and `/legal/privacy` (from WS-A.1). No changes needed in this workstream. |
| `plans/launch-plan/phase-a-foundation/ws-a.1-marketing-route-group-layout.md` | Confirms placeholder pages for `/legal/terms` and `/legal/privacy` are created by WS-A.1. This workstream replaces those placeholders with full implementations. |

### External Dependencies

| Dependency | Owner | Status | Impact |
|------------|-------|--------|--------|
| Final Terms of Service text | Business Owner | **NOT STARTED** | Cannot launch without it |
| Final Privacy Policy text | Business Owner | **NOT STARTED** | Cannot launch without it |
| Decision: template service vs. custom attorney | Business Owner | **NOT STARTED** | Determines content timeline |

### New Package Dependency

| Package | Version | Purpose | Size Impact |
|---------|---------|---------|-------------|
| `react-markdown` | `^9.0.0` | Renders markdown strings to React elements in server components | ~12KB gzipped |
| `remark-gfm` | `^4.0.0` | GitHub Flavored Markdown: tables, strikethrough, task lists, autolinks | ~3KB gzipped |

**Rationale for adding `react-markdown`:** Legal content will be authored as plain markdown files. Markdown is the most accessible format for non-developer content providers (the business owner or an attorney). `react-markdown` supports server components natively (no `'use client'` required), has zero browser-side JavaScript cost when used in RSC, and allows custom component mapping for styled rendering.

**Alternative considered (zero-dependency):** Render legal content as raw TSX with Tailwind prose classes. Rejected because it couples content to code -- the business owner would need developer assistance to update legal text. Markdown files can be edited with any text editor.

---

## 4. Deliverables

### 4.1 Content Files

#### `content/legal/terms.md`

Placeholder markdown file with the expected document structure. The business owner replaces the placeholder body text with real legal content. The heading structure must be preserved (the table of contents component depends on `##` headings).

```markdown
---
title: Terms of Service
lastUpdated: 2026-03-01
---

# Terms of Service

_Last updated: March 1, 2026_

## 1. Acceptance of Terms

[PLACEHOLDER -- Business owner: replace this section with your Terms of Service
content. This section should cover agreement to be bound by these terms upon
accessing or using the Safetrekr platform.]

## 2. Description of Service

[PLACEHOLDER -- Describe the Safetrekr platform: pre-trip risk assessment,
real-time monitoring, post-trip documentation, incident response coordination.]

## 3. User Accounts and Registration

[PLACEHOLDER -- Account creation requirements, accuracy of information,
account security responsibilities, age restrictions.]

## 4. Acceptable Use

[PLACEHOLDER -- Permitted uses, prohibited conduct, content standards.]

## 5. Payment Terms

[PLACEHOLDER -- Pricing, billing cycles, refund policy, payment methods.]

## 6. Intellectual Property

[PLACEHOLDER -- Ownership of platform, user content licensing, trademarks.]

## 7. Privacy

[PLACEHOLDER -- Reference to Privacy Policy at /legal/privacy, data handling
summary.]

## 8. Disclaimers and Limitation of Liability

[PLACEHOLDER -- Service provided "as is", limitation of damages, force majeure.
CRITICAL: This section requires attorney review.]

## 9. Indemnification

[PLACEHOLDER -- User indemnification of Safetrekr. Requires attorney review.]

## 10. Termination

[PLACEHOLDER -- Grounds for termination, effect of termination, data retention
after termination.]

## 11. Governing Law and Dispute Resolution

[PLACEHOLDER -- Jurisdiction, arbitration clause if applicable. Requires
attorney review.]

## 12. Changes to Terms

[PLACEHOLDER -- How changes are communicated, effective date of changes.]

## 13. Contact Information

For questions about these Terms, contact us at:

- **Email:** legal@safetrekr.com
- **Address:** [PLACEHOLDER -- Business address]
```

#### `content/legal/privacy.md`

Same pattern. Expected sections for a Privacy Policy:

```markdown
---
title: Privacy Policy
lastUpdated: 2026-03-01
---

# Privacy Policy

_Last updated: March 1, 2026_

## 1. Introduction

[PLACEHOLDER -- Business owner: replace this section. Identify Safetrekr as the
data controller, state commitment to privacy, scope of policy.]

## 2. Information We Collect

### 2.1 Information You Provide

[PLACEHOLDER -- Account data, trip details, traveler information, payment info,
communications.]

### 2.2 Information Collected Automatically

[PLACEHOLDER -- Device info, usage data, location data (if applicable), cookies
and tracking technologies.]

### 2.3 Information from Third Parties

[PLACEHOLDER -- SSO providers, payment processors, public databases for risk
assessment.]

## 3. How We Use Your Information

[PLACEHOLDER -- Service delivery, safety monitoring, communication, analytics,
legal compliance.]

## 4. How We Share Your Information

[PLACEHOLDER -- Service providers, legal requirements, business transfers,
with consent. Specify that trip data is shared with designated organization
administrators.]

## 5. Data Retention

[PLACEHOLDER -- Retention periods per data type, deletion procedures.]

## 6. Data Security

[PLACEHOLDER -- Encryption at rest and in transit, access controls, audit
logging, incident response. Reference code-verified capabilities: RLS, JWT
auth, 2FA, 10 role-based access levels.]

## 7. Your Rights and Choices

[PLACEHOLDER -- Access, correction, deletion, portability, opt-out of
marketing. Vary by jurisdiction (CCPA, GDPR if applicable).]

## 8. Children's Privacy

[PLACEHOLDER -- COPPA compliance if applicable. Safetrekr may process data
about minors (K-12 travelers) -- requires specific language about parental
consent and school authorization. CRITICAL: Requires attorney review.]

## 9. International Data Transfers

[PLACEHOLDER -- Where data is processed, safeguards for cross-border
transfers.]

## 10. Cookies and Tracking Technologies

[PLACEHOLDER -- Types of cookies used, how to manage cookie preferences.]

## 11. Changes to This Policy

[PLACEHOLDER -- Notification procedures, material change handling.]

## 12. Contact Information

For privacy-related inquiries:

- **Email:** privacy@safetrekr.com
- **Address:** [PLACEHOLDER -- Business address]
```

**Why provide this structure:** The placeholder headings serve as a checklist for the business owner or attorney. Each section maps to a standard legal requirement. Sections marked "CRITICAL: Requires attorney review" flag liability-sensitive language.

### 4.2 Shared Legal Sub-Layout (`src/app/(marketing)/legal/layout.tsx`)

Server component that wraps both legal pages with consistent structure: a content card with prose styling, a sidebar table of contents on desktop, and the "last updated" date.

**Component signature:**

```typescript
// src/app/(marketing)/legal/layout.tsx

import type { ReactNode } from 'react'
import '@/styles/legal-prose.css'

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
      {children}
    </div>
  )
}
```

The sub-layout provides:
- Outer container with centered max-width and responsive padding
- Import of `legal-prose.css` stylesheet (scoped prose typography + print styles)

The actual two-column grid (TOC sidebar + content) is handled within each page file, because the TOC content differs per page and the page component has access to the specific headings.

### 4.3 Legal Prose Component (`src/components/marketing/legal-prose.tsx`)

Server component that renders a markdown string to styled React elements using `react-markdown` and `remark-gfm`.

**Component signature:**

```typescript
// src/components/marketing/legal-prose.tsx

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'

interface LegalProseProps {
  content: string
  className?: string
}

export function LegalProse({ content, className }: LegalProseProps) {
  return (
    <article
      className={cn('legal-prose', className)}
      aria-label="Legal document"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom heading renderers that add id attributes for TOC anchors
          h1: ({ children, ...props }) => (
            <h1 id={slugify(children)} {...props}>{children}</h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 id={slugify(children)} {...props}>{children}</h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 id={slugify(children)} {...props}>{children}</h3>
          ),
          // External links open in new tab
          a: ({ href, children, ...props }) => {
            const isExternal = href?.startsWith('http')
            return (
              <a
                href={href}
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                {...props}
              >
                {children}
              </a>
            )
          },
        }}
      />
    </article>
  )
}

/** Convert heading text to a URL-safe slug for anchor links */
function slugify(children: React.ReactNode): string {
  const text = typeof children === 'string'
    ? children
    : Array.isArray(children)
      ? children.map(c => (typeof c === 'string' ? c : '')).join('')
      : ''
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
```

**Key decisions:**
- `aria-label="Legal document"` identifies the article region for screen readers
- Custom heading renderers inject `id` attributes derived from heading text, enabling anchor linking from the table of contents
- External links get `target="_blank"` + `rel="noopener noreferrer"` for security
- `slugify` is a local utility (not exported) because it is only used within this component

### 4.4 Table of Contents Component (`src/components/marketing/legal-toc.tsx`)

Server component that renders a sticky sidebar navigation for jumping between document sections. Receives a structured list of headings.

**Component signature:**

```typescript
// src/components/marketing/legal-toc.tsx

import { cn } from '@/lib/utils'

export interface TocEntry {
  id: string
  text: string
  level: 2 | 3  // Only h2 and h3 appear in TOC
}

interface LegalTocProps {
  entries: TocEntry[]
  className?: string
}

export function LegalToc({ entries, className }: LegalTocProps) {
  if (entries.length === 0) return null

  return (
    <nav
      aria-label="Table of contents"
      className={cn(
        'sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto',
        'hidden lg:block',  // Hidden on mobile; content is single-column
        className,
      )}
    >
      <p className="mb-4 font-mono text-xs uppercase tracking-widest text-[var(--color-text-tertiary)]">
        Contents
      </p>
      <ul className="space-y-1.5 border-l border-[var(--color-border-faint)]">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              className={cn(
                'block border-l-2 border-transparent py-1 text-sm leading-snug transition-colors duration-150',
                'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
                'hover:border-[var(--color-ember)]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]',
                entry.level === 2 ? 'pl-4 font-medium' : 'pl-8',
              )}
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
```

**Key decisions:**
- `sticky top-28` keeps the TOC visible while scrolling. The `28` (7rem) accounts for the fixed marketing header height (~64px) plus spacing.
- Hidden below `lg` breakpoint (1024px). On smaller screens, users scroll through the document linearly.
- `aria-label="Table of contents"` provides a landmark for screen reader navigation.
- H2 entries have `pl-4 font-medium`; H3 entries indent further with `pl-8` for visual hierarchy.
- The border-left highlight on hover mirrors sidebar navigation patterns common in documentation sites.

### 4.5 Terms of Service Page (`src/app/(marketing)/legal/terms/page.tsx`)

Server component that reads the terms markdown file, extracts headings for the TOC, and renders the two-column layout.

**Component signature:**

```typescript
// src/app/(marketing)/legal/terms/page.tsx

import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { Metadata } from 'next'
import { LegalProse } from '@/components/marketing/legal-prose'
import { LegalToc, type TocEntry } from '@/components/marketing/legal-toc'

export const metadata: Metadata = {
  title: 'Terms of Service | Safetrekr',
  description: 'Terms of Service for the Safetrekr travel safety platform. Read our terms governing use of the platform, accounts, payments, and liability.',
  alternates: {
    canonical: 'https://safetrekr.com/legal/terms',
  },
}

export default async function TermsPage() {
  const filePath = join(process.cwd(), 'content', 'legal', 'terms.md')
  const raw = await readFile(filePath, 'utf-8')

  // Strip frontmatter (lines between --- delimiters)
  const content = raw.replace(/^---[\s\S]*?---\n*/, '')

  // Extract h2/h3 headings for TOC
  const tocEntries = extractHeadings(content)

  // Extract lastUpdated from frontmatter
  const lastUpdated = extractFrontmatter(raw, 'lastUpdated') ?? 'Not yet published'

  return (
    <>
      {/* Last updated banner */}
      <div className="mb-8 flex items-center gap-3">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-text-tertiary)]">
          Last updated
        </span>
        <time
          className="font-mono text-xs text-[var(--color-text-secondary)]"
          dateTime={lastUpdated}
        >
          {formatDate(lastUpdated)}
        </time>
      </div>

      {/* Two-column layout: TOC sidebar + prose content */}
      <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-12">
        {/* Content card */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 lg:p-12">
          <LegalProse content={content} />
        </div>

        {/* Sidebar TOC (desktop only) */}
        <LegalToc entries={tocEntries} />
      </div>
    </>
  )
}

/** Extract heading text and level from markdown for TOC generation */
function extractHeadings(markdown: string): TocEntry[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const entries: TocEntry[] = []
  let match: RegExpExecArray | null

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length as 2 | 3
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    entries.push({ id, text, level })
  }

  return entries
}

/** Extract a value from YAML-style frontmatter */
function extractFrontmatter(raw: string, key: string): string | null {
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/)
  if (!fmMatch) return null
  const line = fmMatch[1].split('\n').find(l => l.startsWith(`${key}:`))
  return line ? line.slice(key.length + 1).trim() : null
}

/** Format a date string for display */
function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}
```

**Key decisions:**
- `readFile` from `node:fs/promises` reads the markdown file at build time. This works in server components and ensures zero client-side JavaScript for content loading.
- Frontmatter is stripped with a simple regex rather than adding a `gray-matter` dependency. Legal pages have exactly two frontmatter fields (`title`, `lastUpdated`); a full YAML parser is unnecessary.
- Content card uses `bg-white/[0.03]` -- lighter than the standard glass-morphism `bg-white/[0.06]` -- to maximize text contrast for long-form reading. The border is also subtler (`border-white/[0.06]`) to avoid visual noise.
- The two-column grid places content first (left) and TOC second (right). Content takes `1fr`, TOC is fixed at `240px`. This ensures content width is constrained to comfortable reading measure even on wide screens.
- `rounded-2xl` (16px radius) is smaller than the `rounded-[32px]` used on glass-morphism panels elsewhere. Legal content cards benefit from tighter corners that feel more document-like and less "HUD panel."

### 4.6 Privacy Policy Page (`src/app/(marketing)/legal/privacy/page.tsx`)

Identical structure to the Terms page. Reads from `content/legal/privacy.md`.

```typescript
// src/app/(marketing)/legal/privacy/page.tsx

import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { Metadata } from 'next'
import { LegalProse } from '@/components/marketing/legal-prose'
import { LegalToc, type TocEntry } from '@/components/marketing/legal-toc'

export const metadata: Metadata = {
  title: 'Privacy Policy | Safetrekr',
  description: 'Privacy Policy for the Safetrekr travel safety platform. Learn how we collect, use, and protect your personal information and trip data.',
  alternates: {
    canonical: 'https://safetrekr.com/legal/privacy',
  },
}

export default async function PrivacyPage() {
  const filePath = join(process.cwd(), 'content', 'legal', 'privacy.md')
  const raw = await readFile(filePath, 'utf-8')
  const content = raw.replace(/^---[\s\S]*?---\n*/, '')
  const tocEntries = extractHeadings(content)
  const lastUpdated = extractFrontmatter(raw, 'lastUpdated') ?? 'Not yet published'

  return (
    <>
      <div className="mb-8 flex items-center gap-3">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-text-tertiary)]">
          Last updated
        </span>
        <time
          className="font-mono text-xs text-[var(--color-text-secondary)]"
          dateTime={lastUpdated}
        >
          {formatDate(lastUpdated)}
        </time>
      </div>

      <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-12">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 lg:p-12">
          <LegalProse content={content} />
        </div>
        <LegalToc entries={tocEntries} />
      </div>
    </>
  )
}

// extractHeadings, extractFrontmatter, formatDate -- same as terms/page.tsx
// IMPLEMENTATION NOTE: Extract these three functions into a shared utility
// at src/lib/legal-utils.ts to avoid duplication. Both pages import from there.
```

**Implementation note on deduplication:** The `extractHeadings`, `extractFrontmatter`, and `formatDate` functions are identical between the two pages. During implementation, extract them into `src/lib/legal-utils.ts` and import from both pages. The SOW shows them inline in the Terms page (Section 4.5) for completeness, then references them here.

### 4.7 Legal Utilities (`src/lib/legal-utils.ts`)

Shared utility module for legal page helpers.

```typescript
// src/lib/legal-utils.ts

import type { TocEntry } from '@/components/marketing/legal-toc'

/** Extract h2/h3 headings from markdown for table of contents generation */
export function extractHeadings(markdown: string): TocEntry[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const entries: TocEntry[] = []
  let match: RegExpExecArray | null

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length as 2 | 3
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    entries.push({ id, text, level })
  }

  return entries
}

/** Extract a value from YAML-style frontmatter */
export function extractFrontmatter(raw: string, key: string): string | null {
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/)
  if (!fmMatch) return null
  const line = fmMatch[1].split('\n').find(l => l.startsWith(`${key}:`))
  return line ? line.slice(key.length + 1).trim() : null
}

/** Format a date string for human-readable display */
export function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}

/** Read and parse a legal markdown file, returning content and metadata */
export async function readLegalContent(filename: string) {
  const { readFile } = await import('node:fs/promises')
  const { join } = await import('node:path')

  const filePath = join(process.cwd(), 'content', 'legal', filename)
  const raw = await readFile(filePath, 'utf-8')
  const content = raw.replace(/^---[\s\S]*?---\n*/, '')
  const tocEntries = extractHeadings(content)
  const lastUpdated = extractFrontmatter(raw, 'lastUpdated') ?? 'Not yet published'
  const title = extractFrontmatter(raw, 'title') ?? filename.replace('.md', '')

  return { content, tocEntries, lastUpdated, title }
}
```

### 4.8 Legal Prose Stylesheet (`src/styles/legal-prose.css`)

Typography styles for legal content. These are scoped to the `.legal-prose` class applied by the `LegalProse` component.

```css
/* =================================================================
   Legal Prose Typography
   =================================================================
   Scoped to .legal-prose (applied by LegalProse component).
   Optimized for long-form legal document readability on dark backgrounds.
   ================================================================= */

.legal-prose {
  /* Base text: slightly larger than body default for reading comfort */
  font-family: var(--font-sans);
  font-size: 1rem;         /* 16px */
  line-height: 1.75;       /* 28px -- generous for legal text */
  color: var(--color-text-primary);
  max-width: 65ch;         /* Optimal reading measure */
}

/* --- Headings ---------------------------------------------------- */

.legal-prose h1 {
  font-size: 1.75rem;      /* 28px */
  font-weight: 700;
  letter-spacing: 0.01em;
  color: var(--color-text-primary);
  margin-top: 0;
  margin-bottom: 1.5rem;
  line-height: 1.3;
}

.legal-prose h2 {
  font-size: 1.25rem;      /* 20px */
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--color-text-primary);
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border-faint);
  line-height: 1.4;
}

.legal-prose h2:first-of-type {
  border-top: none;
  padding-top: 0;
}

.legal-prose h3 {
  font-size: 1.1rem;       /* ~17.6px */
  font-weight: 600;
  color: var(--color-text-primary);
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

/* --- Paragraphs -------------------------------------------------- */

.legal-prose p {
  margin-bottom: 1.25rem;
}

.legal-prose p:last-child {
  margin-bottom: 0;
}

/* --- Links ------------------------------------------------------- */

.legal-prose a {
  color: var(--color-ember-bright);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: rgba(var(--ember-bright-rgb), 0.4);
  transition: text-decoration-color 150ms ease;
}

.legal-prose a:hover {
  text-decoration-color: var(--color-ember-bright);
}

.legal-prose a:focus-visible {
  outline: 2px solid var(--color-ember-bright);
  outline-offset: 2px;
  border-radius: 2px;
}

/* --- Lists ------------------------------------------------------- */

.legal-prose ul,
.legal-prose ol {
  margin-bottom: 1.25rem;
  padding-left: 1.5rem;
}

.legal-prose ul {
  list-style-type: disc;
}

.legal-prose ol {
  list-style-type: decimal;
}

.legal-prose li {
  margin-bottom: 0.375rem;
  line-height: 1.65;
}

.legal-prose li > ul,
.legal-prose li > ol {
  margin-top: 0.375rem;
  margin-bottom: 0;
}

/* --- Emphasis and strong ----------------------------------------- */

.legal-prose strong {
  font-weight: 600;
  color: var(--color-text-primary);
}

.legal-prose em {
  font-style: italic;
  color: var(--color-text-secondary);
}

/* --- Blockquotes ------------------------------------------------- */

.legal-prose blockquote {
  margin: 1.5rem 0;
  padding: 1rem 1.25rem;
  border-left: 3px solid var(--color-ember-muted);
  background: rgba(var(--ember-rgb), 0.04);
  border-radius: 0 8px 8px 0;
  color: var(--color-text-secondary);
}

.legal-prose blockquote p {
  margin-bottom: 0.5rem;
}

.legal-prose blockquote p:last-child {
  margin-bottom: 0;
}

/* --- Tables (for structured legal data) -------------------------- */

.legal-prose table {
  width: 100%;
  margin: 1.5rem 0;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.legal-prose th {
  text-align: left;
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-text-tertiary);
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--color-border-subtle);
}

.legal-prose td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--color-border-faint);
  color: var(--color-text-secondary);
  vertical-align: top;
}

.legal-prose tr:last-child td {
  border-bottom: none;
}

/* --- Horizontal rules -------------------------------------------- */

.legal-prose hr {
  margin: 2.5rem 0;
  border: none;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    var(--color-border-subtle),
    transparent
  );
}

/* --- Code (for referencing API endpoints, data fields, etc.) ----- */

.legal-prose code {
  font-family: var(--font-mono);
  font-size: 0.875em;
  padding: 0.15em 0.35em;
  background: rgba(var(--ember-rgb), 0.06);
  border: 1px solid var(--color-border-faint);
  border-radius: 4px;
  color: var(--color-ember-bright);
}

/* =================================================================
   PRINT STYLES
   =================================================================
   Legal pages are frequently printed. Switch to light background,
   dark text, remove decorative UI, show link URLs inline.
   ================================================================= */

@media print {
  .legal-prose {
    color: #1a1a1a;
    font-size: 11pt;
    line-height: 1.6;
    max-width: none;
  }

  .legal-prose h1 { font-size: 18pt; color: #000; }
  .legal-prose h2 { font-size: 14pt; color: #000; border-top-color: #ccc; }
  .legal-prose h3 { font-size: 12pt; color: #000; }

  .legal-prose a {
    color: #1a1a1a;
    text-decoration: underline;
  }

  /* Show link URLs inline after link text */
  .legal-prose a[href^="http"]::after {
    content: ' (' attr(href) ')';
    font-size: 0.8em;
    color: #666;
    font-style: italic;
  }

  .legal-prose blockquote {
    border-left-color: #999;
    background: #f5f5f5;
    color: #333;
  }

  .legal-prose th { color: #333; border-bottom-color: #999; }
  .legal-prose td { color: #333; border-bottom-color: #ddd; }

  .legal-prose code {
    background: #f0f0f0;
    border-color: #ccc;
    color: #333;
  }
}
```

**Additionally, add page-level print rules** to hide the header, footer, TOC sidebar, and background effects when printing. These should be added to `legal-prose.css`:

```css
@media print {
  /* Hide non-content elements when printing legal pages */
  [data-marketing-header],
  [data-marketing-footer],
  nav[aria-label="Table of contents"] {
    display: none !important;
  }

  /* Reset dark background for printing */
  body {
    background: white !important;
    color: #1a1a1a !important;
  }

  /* Remove glass-morphism card styling */
  .legal-prose-card {
    background: transparent !important;
    border: none !important;
    backdrop-filter: none !important;
    padding: 0 !important;
    border-radius: 0 !important;
  }
}
```

**Note:** The `[data-marketing-header]` and `[data-marketing-footer]` selectors assume WS-A.1 adds these data attributes to the header and footer components. If not, use the component class names or ARIA labels instead. Verify during implementation.

### 4.9 SEO Metadata

Already defined in each page's `metadata` export (Sections 4.5 and 4.6). Summary:

| Page | Title | Description | Canonical |
|------|-------|-------------|-----------|
| Terms of Service | `Terms of Service \| Safetrekr` | Terms of Service for the Safetrekr travel safety platform. Read our terms governing use of the platform, accounts, payments, and liability. | `https://safetrekr.com/legal/terms` |
| Privacy Policy | `Privacy Policy \| Safetrekr` | Privacy Policy for the Safetrekr travel safety platform. Learn how we collect, use, and protect your personal information and trip data. | `https://safetrekr.com/legal/privacy` |

**Note:** `robots` metadata is not set per-page. Legal pages should be indexable (they build trust with search engines and are expected by users). The sitemap (WS-A.3) should include both legal URLs with a lower priority weight (e.g., `0.3`).

### 4.10 File Manifest

| # | File | Type | Notes |
|---|------|------|-------|
| 1 | `content/legal/terms.md` | Content | Markdown. Placeholder initially; business owner replaces with real text. |
| 2 | `content/legal/privacy.md` | Content | Markdown. Placeholder initially; business owner replaces with real text. |
| 3 | `src/app/(marketing)/legal/layout.tsx` | Server component | Shared sub-layout for legal pages. Imports legal-prose.css. |
| 4 | `src/app/(marketing)/legal/terms/page.tsx` | Server component | Reads terms.md, renders with LegalProse + LegalToc. Replaces WS-A.1 placeholder. |
| 5 | `src/app/(marketing)/legal/privacy/page.tsx` | Server component | Reads privacy.md, renders with LegalProse + LegalToc. Replaces WS-A.1 placeholder. |
| 6 | `src/components/marketing/legal-prose.tsx` | Server component | Markdown-to-React renderer with styled heading output. |
| 7 | `src/components/marketing/legal-toc.tsx` | Server component | Sticky sidebar table of contents. |
| 8 | `src/lib/legal-utils.ts` | Utility module | extractHeadings, extractFrontmatter, formatDate, readLegalContent. |
| 9 | `src/styles/legal-prose.css` | Stylesheet | Prose typography, table styles, print stylesheet. |

**Modified files (from WS-A.1 placeholders):**

| File | Change |
|------|--------|
| `src/app/(marketing)/legal/terms/page.tsx` | Replaced: WS-A.1 placeholder with full implementation |
| `src/app/(marketing)/legal/privacy/page.tsx` | Replaced: WS-A.1 placeholder with full implementation |

**New directories:**

| Directory | Purpose |
|-----------|---------|
| `content/` | Project-root content directory (new) |
| `content/legal/` | Legal markdown files |

**New dependencies (added to `package.json`):**

| Package | Command |
|---------|---------|
| `react-markdown` | `pnpm add react-markdown` |
| `remark-gfm` | `pnpm add remark-gfm` |

---

## 5. Acceptance Criteria

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | `/legal/terms` renders the Terms of Service content inside the marketing layout (header above, footer below) | Manual: navigate to `/legal/terms` in dev server |
| 2 | `/legal/privacy` renders the Privacy Policy content inside the marketing layout | Manual: navigate to `/legal/privacy` in dev server |
| 3 | Both pages display a "Last updated" date in mono font above the content, reading from the markdown frontmatter | Visual inspection |
| 4 | Markdown headings, paragraphs, lists, links, blockquotes, and tables render with correct typography styles | Visual inspection: compare against legal-prose.css spec |
| 5 | Table of contents sidebar appears on desktop (>= 1024px) with anchor links to each h2/h3 section | Manual: click TOC links; page scrolls to correct heading |
| 6 | Table of contents is hidden on mobile (< 1024px) | Manual: resize to mobile; TOC not visible |
| 7 | TOC anchor links produce correct `id` attributes on headings that match the `href` in the TOC | DevTools: inspect heading `id` attributes; click TOC links |
| 8 | Content card uses reduced glass-morphism (`bg-white/[0.03]`, `border-white/[0.06]`) for maximum text readability | Visual inspection; DevTools computed styles |
| 9 | Prose text meets WCAG 2.1 AA contrast ratio (minimum 4.5:1 for body text) against the content card background | Contrast check: `#e8f0f4` text on `#061a23` + `white/3%` overlay background |
| 10 | Links within legal content use `text-ember-bright` (#6abf84) with underline, hover increases underline opacity | Visual inspection + hover test |
| 11 | External links open in new tab with `rel="noopener noreferrer"` | DevTools: inspect `<a>` attributes |
| 12 | Print preview (Cmd+P / Ctrl+P) shows: light background, dark text, no header/footer/TOC, link URLs visible inline | Manual: trigger print preview from browser |
| 13 | Both pages are responsive: comfortable reading at 375px, 768px, and 1280px viewport widths | Manual: resize browser or use DevTools responsive mode |
| 14 | Body text line length does not exceed 65 characters (`max-w: 65ch`) for reading comfort | DevTools: measure line length or count characters |
| 15 | `pnpm typecheck` passes with zero errors | CLI: `pnpm typecheck` |
| 16 | `pnpm build` completes successfully (markdown files are read at build time) | CLI: `pnpm build` |
| 17 | All interactive elements (TOC links, content links) have visible focus indicators: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]` | Manual: Tab through interactive elements |
| 18 | `<article>` element has `aria-label="Legal document"` | DevTools: inspect article attributes |
| 19 | TOC `<nav>` has `aria-label="Table of contents"` | DevTools: inspect nav attributes |
| 20 | Placeholder content includes [PLACEHOLDER] markers that are visually distinct, making it obvious which sections need business owner input | Visual inspection: placeholders are clearly identifiable |

---

## 6. Decisions Made

| # | Decision | Rationale |
|---|----------|-----------|
| 1 | **Use `react-markdown` + `remark-gfm` for content rendering** | Legal text will be authored by a non-developer (business owner or attorney). Markdown is the most accessible authoring format. `react-markdown` renders in server components with zero client JS. Cost: ~15KB gzipped total for both packages. |
| 2 | **Store content as `.md` files in `content/legal/` at project root** | Separates content from code. The `content/` directory at project root is a common convention for file-based content in Next.js projects. The business owner can edit these files directly without touching `src/`. |
| 3 | **Use simple frontmatter parsing instead of `gray-matter` dependency** | Legal pages have exactly two frontmatter fields (`title`, `lastUpdated`). A regex-based extractor is sufficient and avoids adding another dependency. |
| 4 | **Content card uses lighter glass-morphism (`bg-white/[0.03]`) than standard panels** | Legal pages prioritize readability over atmosphere. The standard `bg-white/[0.06]` adds too much visual noise for long-form text. The lighter treatment maintains the dark theme while improving reading comfort. |
| 5 | **`rounded-2xl` (16px) card radius instead of `rounded-[32px]`** | Legal content cards should feel document-like rather than HUD-panel-like. The 32px radius from detail-panel.tsx is designed for interactive panels. 16px is more appropriate for a reading surface. |
| 6 | **TOC sidebar on right, content on left** | Follows established documentation site conventions (React docs, MDN, Tailwind docs). Users expect the main content in primary reading position (left) with navigation aids on the side. |
| 7 | **TOC hidden on mobile, no accordion/dropdown replacement** | Legal documents on mobile are scrolled linearly. A collapsed TOC adds interaction complexity for minimal value. If the document is long, browser "find in page" serves the same navigation purpose on mobile. |
| 8 | **Print styles included from day one** | Legal pages are uniquely likely to be printed (attorney review, compliance filing, internal records). Deferring print styles to a "polish pass" risks forgetting them. The implementation cost is minimal (CSS-only). |
| 9 | **Placeholder content includes section structure, not just "Coming soon"** | A structured placeholder (numbered sections with expected topic areas) serves as a specification for the business owner. It communicates what legal topics need to be covered, reducing back-and-forth. |
| 10 | **No `'use client'` directive on any file in this workstream** | All legal page components are server components. There is no client-side interactivity (no state, no effects, no event handlers beyond native anchor links). This results in zero JavaScript shipped to the browser for these pages. |

---

## 7. Open Questions

| # | Question | Impact | Owner | Default If Unresolved |
|---|----------|--------|-------|-----------------------|
| 1 | Will the business owner use a legal template service (Termly, iubenda, Rocket Lawyer) or engage a custom attorney for Terms and Privacy content? | Determines content timeline. Template services can generate content in hours; custom attorney review takes weeks. | Business Owner | Use template service for launch speed; upgrade to custom attorney review post-launch if needed. |
| 2 | Does Safetrekr process data about minors (K-12 travelers)? If so, COPPA and potentially FERPA obligations apply and the Privacy Policy must include specific language about children's data. | Changes Privacy Policy structure significantly. May require dedicated "Children's Privacy" section with parental consent mechanisms. | Business Owner + Legal | Include a placeholder section for Children's Privacy (Section 8 in the template). Flag as requiring attorney review before launch. |
| 3 | What jurisdiction governs the Terms of Service? (e.g., State of [X], USA) | Determines governing law clause. | Business Owner | Leave as placeholder. This MUST be resolved before launch. |
| 4 | Should legal pages include a "Download PDF" option? | Adds implementation scope: server-side PDF generation or pre-rendered static PDFs. | Product | Omit at launch. Print-to-PDF from browser is sufficient. Can add later if attorney or compliance requires downloadable format. |
| 5 | Does WS-A.1 add `data-marketing-header` and `data-marketing-footer` attributes to the header and footer components? | Affects the CSS selectors used in the print stylesheet to hide navigation chrome. | WS-A.1 implementer | If not, use alternative selectors (`header[aria-label]`, `footer[aria-label]`) during implementation. |

---

## 8. Risk Register

| # | Risk | Likelihood | Impact | Severity | Mitigation |
|---|------|-----------|--------|----------|------------|
| 1 | **Legal content not provided before launch** (R-04) | HIGH | HIGH | **CRITICAL** | Flag to business owner immediately. Provide template service recommendation (Termly: ~$10/month, generates Terms + Privacy in minutes). Set hard deadline: content must be in `content/legal/` at least 48 hours before launch for review. If still missing, the site CANNOT launch -- legal pages are a regulatory and trust requirement. |
| 2 | **Placeholder content accidentally ships to production** | MEDIUM | HIGH | **HIGH** | Add a build-time check: grep for `[PLACEHOLDER` in `content/legal/*.md` and emit a warning during `pnpm build`. Optionally fail the build in CI if placeholders remain. The `[PLACEHOLDER` prefix in the template makes detection trivial. |
| 3 | **Children's data handling not addressed in Privacy Policy** | MEDIUM | HIGH | **HIGH** | Safetrekr serves K-12 schools. If the platform collects any information about student travelers, COPPA compliance language is legally required. Flag to business owner for attorney review. |
| 4 | **`react-markdown` server component compatibility issue** | LOW | MEDIUM | **MEDIUM** | `react-markdown` v9+ supports React server components. Verify during implementation with `pnpm build`. Fallback: render markdown to HTML string on the server using `unified` + `rehype` pipeline and inject via `dangerouslySetInnerHTML` with sanitization. |
| 5 | **Markdown file not found at build time** | LOW | HIGH | **MEDIUM** | `readFile` will throw if the content file is missing. Wrap in try/catch with a graceful fallback that renders a "Content not yet available" message instead of crashing the build. Log a warning to the build output. |
| 6 | **Print stylesheet conflicts with marketing layout print rules** | LOW | LOW | **LOW** | Legal prose print styles use high-specificity selectors (`.legal-prose` class scoping). Test print output during implementation and adjust specificity if needed. |

---

## Estimated Effort

**Size:** S (Small)
**Estimated time:** 3-4 hours for infrastructure + placeholder content; < 1 hour additional to swap in real content when provided.
**Files created:** 9 new files
**Files modified:** 2 (replacing WS-A.1 placeholders)
**New dependencies:** 2 (`react-markdown`, `remark-gfm`)

### Implementation Order

1. Install dependencies: `pnpm add react-markdown remark-gfm`
2. Create `content/legal/` directory and placeholder `.md` files
3. Create `src/lib/legal-utils.ts` (shared utilities)
4. Create `src/components/marketing/legal-prose.tsx` (markdown renderer)
5. Create `src/components/marketing/legal-toc.tsx` (table of contents)
6. Create `src/styles/legal-prose.css` (typography + print styles)
7. Create `src/app/(marketing)/legal/layout.tsx` (shared sub-layout)
8. Replace `src/app/(marketing)/legal/terms/page.tsx` (Terms page)
9. Replace `src/app/(marketing)/legal/privacy/page.tsx` (Privacy page)
10. Run `pnpm typecheck` and `pnpm build` to verify
11. Test in browser: both routes, TOC anchors, responsive, print preview
