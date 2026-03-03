# WS-A.5: Error Pages

> **Workstream ID:** WS-A.5
> **Phase:** A -- Foundation & Infrastructure
> **Assigned Agent:** `react-developer`
> **Status:** Draft
> **Created:** 2026-03-02
> **Last Updated:** 2026-03-02
> **Depends On:** None
> **Blocks:** None
> **Resolves:** Gap 7 (No Error Pages)

---

## 1. Objective

Provide branded error feedback for two failure scenarios -- page not found (404) and unhandled runtime errors -- so that users who hit a dead end stay within the Safetrekr visual world and have a clear path back to working pages. Both pages maintain the Oblivion HUD mission-control aesthetic: dark `void` background, glass-morphism card, green primary accents, mono-font status codes.

---

## 2. Scope

### In Scope

| Item | Notes |
|------|-------|
| `src/app/not-found.tsx` | Next.js App Router 404 page (server component) |
| `src/app/error.tsx` | Next.js App Router error boundary (client component, `'use client'`) |

### Out of Scope

- Custom error pages per route segment (e.g., per-district 404s)
- Server-side error logging or telemetry (tracked separately in observability work)
- `global-error.tsx` (root layout error boundary) -- not needed at launch; the root layout is minimal and unlikely to throw
- Animated transitions or motion/react usage -- these are static pages; keep them dependency-light

---

## 3. Input Dependencies

### Codebase Files to Reference

| File | What to Use From It |
|------|---------------------|
| `src/app/layout.tsx` | Error pages inherit the root layout: `<html data-color-scheme="safetrekr">`, `ThemeProvider`, Geist font variables. No additional wrapping needed. |
| `src/styles/spatial-tokens.css` | Safetrekr dark-mode token values. Key tokens listed below in Section 4. |
| `src/components/districts/detail-panel.tsx` | Glass-morphism pattern reference (lines 91-97): `bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]`, `border border-white/[0.08]`, ember glow shadow. |
| `src/lib/utils.ts` | `cn()` utility for className merging. Import as `import { cn } from '@/lib/utils'`. |

### Existing State

- `src/app/not-found.tsx` does **not** exist (confirmed).
- `src/app/error.tsx` does **not** exist (confirmed).
- No `Link` from `next/link` is currently used in the codebase; these pages will be the first to use it.

---

## 4. Deliverables

### 4.1 `src/app/not-found.tsx` -- "Signal Lost" 404 Page

**Component type:** Server component (no `'use client'` directive). Next.js automatically renders this for unmatched routes.

**Structure:**

```
<main>                            -- full-screen centered flex container
  <div>                           -- glass-morphism card (max-w-md)
    <p>                           -- status code "404" in mono font
    <h1>                          -- "Signal Lost"
    <p>                           -- descriptive body text
    <Link href="/">               -- primary CTA button back to home
  </div>
</main>
```

**Text content:**

| Element | Content |
|---------|---------|
| Status code | `404` |
| Heading | `Signal Lost` |
| Body | `The coordinates you requested don't match any known signal. The page may have been moved or decommissioned.` |
| CTA label | `Return to Base` |

**CSS classes and tokens to use:**

| Element | Classes / Tokens |
|---------|-----------------|
| `<main>` | `min-h-screen bg-void flex items-center justify-center px-6` |
| Glass card | `max-w-md w-full rounded-[32px] p-10 bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_0_1px_0_rgba(var(--ember-rgb),0.3),0_0_24px_rgba(var(--ember-rgb),0.1)]` |
| Status code (`404`) | `font-mono text-[64px] font-bold text-ember-bright leading-none tracking-wider` (uses `--color-ember-bright: #6abf84` via Tailwind `text-ember-bright`) |
| Heading | `font-sans text-[28px] font-bold tracking-[0.02em] uppercase text-[var(--color-text-primary)]` |
| Body text | `text-[var(--color-text-secondary)] text-sm leading-relaxed` |
| CTA link | Styled as a button: `inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium bg-ember text-white hover:bg-ember-bright transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-bright` |

**Imports:**

```ts
import Link from 'next/link'
```

No `cn()` needed if classes are straightforward string literals. Use `cn()` only if conditional logic is introduced.

### 4.2 `src/app/error.tsx` -- "System Fault" Error Boundary

**Component type:** Client component (`'use client'` required). Next.js passes `error` and `reset` props automatically.

**Props interface:**

```ts
interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}
```

**Structure:**

```
<main>                            -- full-screen centered flex container
  <div>                           -- glass-morphism card (max-w-md)
    <p>                           -- status icon or code "ERR" in mono font
    <h1>                          -- "System Fault"
    <p>                           -- descriptive body text
    <div>                         -- button group
      <button onClick={reset}>   -- retry button (primary)
      <Link href="/">             -- secondary: back to home
    </div>
  </div>
</main>
```

**Text content:**

| Element | Content |
|---------|---------|
| Status label | `ERR` |
| Heading | `System Fault` |
| Body | `An unexpected error disrupted this operation. Our systems have been notified. You can retry or return to a known-good state.` |
| Primary button | `Retry Operation` |
| Secondary link | `Return to Base` |

**CSS classes and tokens to use:**

| Element | Classes / Tokens |
|---------|-----------------|
| `<main>` | Same as not-found: `min-h-screen bg-void flex items-center justify-center px-6` |
| Glass card | Same glass-morphism pattern as not-found (identical card styling) |
| Status label (`ERR`) | `font-mono text-[64px] font-bold text-error-glow leading-none tracking-wider` (uses `--color-error-glow: #f87171` for a red-tinted status indicator to distinguish from 404) |
| Heading | Same as not-found heading |
| Body text | Same as not-found body |
| Retry button (primary) | `inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium bg-ember text-white hover:bg-ember-bright transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-bright` |
| Home link (secondary) | `inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium bg-white/[0.04] border border-white/[0.08] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/[0.08] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-bright` |
| Button group container | `flex flex-col sm:flex-row gap-3 mt-2` |

**Imports:**

```ts
'use client'

import Link from 'next/link'
```

**Behavior:**

- The `reset()` call re-renders the nearest error boundary segment, giving React a chance to recover without a full page reload.
- The `error.digest` property (server-side error hash) should NOT be displayed to users. It exists for internal correlation only.
- No `useEffect` for error logging in this workstream -- that belongs to observability instrumentation (tracked separately).

---

## 5. Acceptance Criteria

| # | Criterion | Verification |
|---|-----------|-------------|
| 1 | Navigating to a non-existent route (e.g., `/does-not-exist`) renders the "Signal Lost" 404 page | Manual browser test |
| 2 | The 404 page displays the glass-morphism card on a `bg-void` background with correct Safetrekr green accents | Visual inspection |
| 3 | The "Return to Base" link navigates to `/` | Click test |
| 4 | Triggering a runtime error in a page component renders the "System Fault" error page | Temporarily throw in a page component, verify error.tsx catches it |
| 5 | The "Retry Operation" button calls `reset()` and the page re-renders | Click test after inducing a recoverable error |
| 6 | Both pages pass `pnpm typecheck` with no errors | `pnpm typecheck` |
| 7 | Both pages are keyboard-navigable: CTA buttons/links are focusable with visible focus rings | Tab through the page |
| 8 | Both pages render correctly at mobile (375px), tablet (768px), and desktop (1280px) widths | Responsive check in DevTools |
| 9 | Status code text uses `font-mono` (Geist Mono) | Visual inspection |
| 10 | Both pages inherit the root layout (Safetrekr color scheme, Geist fonts) without additional providers | Inspect rendered HTML |

---

## 6. Decisions Made

| # | Decision | Rationale |
|---|----------|-----------|
| 1 | **Server component for not-found, client component for error** | Next.js App Router requires `error.tsx` to be a client component (it uses `reset()`). `not-found.tsx` has no interactivity beyond a link, so it stays as a server component for simpler rendering. |
| 2 | **No `global-error.tsx` at launch** | `global-error.tsx` catches errors in the root layout itself. Our root layout (`layout.tsx`) is minimal (font loading + providers) and unlikely to throw. Adding it later is trivial if needed. |
| 3 | **No motion/react animations on error pages** | Error pages should load fast with minimal JS. The glass-morphism card and green accents provide enough visual identity without animation dependencies. |
| 4 | **Red status indicator (`text-error-glow`) for error.tsx, green (`text-ember-bright`) for not-found** | Differentiates the two states at a glance. 404 is "lost signal" (neutral/informational -- green). Runtime error is "system fault" (problem -- red). |
| 5 | **Reuse glass-morphism pattern from detail-panel.tsx** | Ensures visual consistency with the rest of the Safetrekr UI without inventing new card styles. Same `bg-white/[0.06]`, `backdrop-blur-[16px]`, `backdrop-saturate-[130%]`, and ember glow shadow. |
| 6 | **`rounded-[32px]` card radius** | Matches the `detail-panel.tsx` card radius for consistency across the site. |
| 7 | **CTA buttons use `rounded-full` pill shape** | Differentiates actionable elements from the card container. Common pattern for primary CTAs in HUD-style interfaces. |
| 8 | **No error digest displayed to users** | `error.digest` is a server-side hash for internal debugging. Exposing it provides no value to end users and could leak implementation details. |

---

## 7. Open Questions

| # | Question | Impact | Default If Unresolved |
|---|----------|--------|-----------------------|
| 1 | Should the 404 page include a subtle decorative element (e.g., a static radar sweep or signal icon SVG) above the status code? | Visual polish only. Does not affect functionality. | Ship without it; add in a polish pass if desired. |
| 2 | Should the error page log `error.digest` to the browser console for developer debugging? | Would help developers correlate client errors with server logs. | No logging in this workstream. Defer to observability instrumentation. |
| 3 | Do we want a "Report this issue" link on the error page? | Improves user trust but requires a target (email, form, or issue tracker). | Omit at launch. Can be added when a feedback mechanism exists. |

---

## 8. Risk Register

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|-----------|--------|------------|
| 1 | Glass-morphism `backdrop-blur` not rendering on older browsers (Safari < 9, IE) | Low (target audience uses modern browsers) | Low (page remains functional, just without blur) | The card's `bg-white/[0.06]` provides a fallback semi-transparent background even without blur. No action needed. |
| 2 | Tailwind v4 `text-ember-bright` utility not resolving if `@theme inline` bridge is incomplete | Low (bridge is already set up in globals.css) | Medium (status code would render in default color) | Verify token resolution during implementation. Fallback: use `text-[var(--color-ember-bright)]` inline syntax. |
| 3 | `error.tsx` not catching errors from server components | N/A (this is expected Next.js behavior) | Low | Document that `error.tsx` only catches client-side and RSC render errors within its segment. Server-side data fetching errors in server components surface differently. Acceptable for launch scope. |

---

## Estimated Effort

**Size:** S (Small)
**Estimated time:** 1-2 hours implementation + verification
**Files touched:** 2 new files, 0 modified files
