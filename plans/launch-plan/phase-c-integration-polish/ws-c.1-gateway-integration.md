# WS-C.1: Gateway Integration

> **Workstream ID:** WS-C.1
> **Phase:** C -- Integration & Polish
> **Assigned Agent:** `react-developer`
> **Status:** Draft
> **Created:** 2026-03-02
> **Last Updated:** 2026-03-02
> **Depends On:** WS-B.2 (Landing Page)
> **Blocks:** None
> **Resolves:** Gap 3 (Gateway "Read the Brief" CTA routes to external placeholder instead of internal marketing page)

---

## 1. Objective

Wire the gateway's secondary CTA ("Read the Brief") to the internal marketing landing page at `/landing` so that visitors who choose the traditional content path stay within the site and receive a smooth, animated in-app transition -- identical in character to the primary "Enter Mission Control" path. Today line 89 of `choice-reveal.tsx` calls `window.open('https://safetrekr.com', '_blank')`, which opens a new tab to an external URL. After this workstream, both CTAs use client-side `router.push()` with the same exit-animation pattern and route prefetching.

---

## 2. Scope

### In Scope

| Item | Notes |
|------|-------|
| Modify `handleMarketing` in `src/components/gateway/choice-reveal.tsx` | Replace `window.open()` with `router.push('/landing')` using the same delayed-navigation pattern as `handleMissionControl` |
| Add `/landing` prefetch in `src/components/gateway/gateway-scene.tsx` | Ensure instant navigation by prefetching the marketing landing route alongside the existing `/launch` prefetch |

### Out of Scope

- Landing page content or layout (WS-B.2)
- Marketing route group structure (WS-A.1)
- Gateway visual design, animation timing, or boot sequence changes
- Any changes to the primary "Enter Mission Control" CTA or `/launch` route
- Deep-linking from gateway to specific landing page sections (e.g., anchor scrolling to `#pricing`)

---

## 3. Input Dependencies

### Codebase Files to Modify

| File | What Changes |
|------|-------------|
| `src/components/gateway/choice-reveal.tsx` | `handleMarketing` callback (lines 86-90): replace `window.open()` with `router.push('/landing')`, add exit-animation delay, add `router` to dependency array |
| `src/components/gateway/gateway-scene.tsx` | `useEffect` prefetch block (lines 73-75): add `router.prefetch('/landing')` alongside existing `/launch` prefetch |

### Codebase Files to Reference (Read-Only)

| File | What to Use From It |
|------|---------------------|
| `src/stores/gateway.store.ts` | `selectDestination('marketing')` already sets `phase` to `'transitioning'`. The exit animation (opacity fade to 0 over 0.8s) is driven by `gateway-scene.tsx` lines 125-128. No store changes needed. |
| `src/components/gateway/gateway-cta.tsx` | No changes. The `GatewayCTA` component is a presentation-only button. Its `onClick` prop already receives `handleMarketing`. |
| `src/components/gateway/gateway-scene.tsx` lines 115-128 | The `isTransitioning` flag and `motion.div` `animate={{ opacity: isTransitioning ? 0 : 1 }}` already handle the fade-out when `phase` becomes `'transitioning'`. This means the 0.8s opacity transition fires automatically once `selectDestination('marketing')` is called. |

### Upstream Dependency

| Dependency | What Must Be True |
|------------|-------------------|
| WS-B.2 (Landing Page) | `src/app/(marketing)/landing/page.tsx` must exist and render content at `/landing`. If WS-B.2 is not yet complete, `router.push('/landing')` will route to the WS-A.1 placeholder page, which is acceptable for integration testing. |

---

## 4. Deliverables

### 4.1 Modified `handleMarketing` in `choice-reveal.tsx`

**Current code (lines 86-90):**

```ts
const handleMarketing = useCallback(() => {
  selectDestination('marketing')
  // Placeholder URL -- traditional site not deployed yet
  window.open('https://safetrekr.com', '_blank')
}, [selectDestination])
```

**Target code:**

```ts
const handleMarketing = useCallback(() => {
  selectDestination('marketing')
  // Delay router push to allow exit animation (matches handleMissionControl pattern)
  setTimeout(() => {
    router.push('/landing')
  }, 600)
}, [selectDestination, router])
```

**What changes and why:**

| Change | Rationale |
|--------|-----------|
| `window.open('https://safetrekr.com', '_blank')` replaced with `router.push('/landing')` | Internal client-side navigation instead of external tab. Keeps users in the site. Enables prefetch for instant load. |
| `setTimeout(() => { ... }, 600)` wrapper added | Matches the 600ms delay used by `handleMissionControl` (line 81-83). Gives the gateway's 0.8s opacity fade-out time to begin before the route change unmounts the gateway scene. The 600ms fires the push while the fade is at ~75% opacity, producing a seamless handoff. |
| `router` added to `useCallback` dependency array | `router` is now referenced inside the callback. Required for exhaustive-deps correctness. Already available from `useRouter()` declared on line 67. |
| Comment updated | Removes "Placeholder URL" note. Aligns comment style with the primary CTA handler above it. |

### 4.2 Added `/landing` Prefetch in `gateway-scene.tsx`

**Current code (lines 73-75):**

```ts
useEffect(() => {
  router.prefetch('/launch')
}, [router])
```

**Target code:**

```ts
useEffect(() => {
  router.prefetch('/launch')
  router.prefetch('/landing')
}, [router])
```

**Rationale:** The gateway presents two CTA destinations. Both should be prefetched so that whichever the user selects loads instantly after the exit animation completes. Next.js `router.prefetch()` fetches the route's RSC payload and JS chunks in the background. The cost is one additional fetch during the gateway's reveal phase -- negligible given that the gateway boot sequence already provides several seconds of idle network time.

---

## 5. Acceptance Criteria

| # | Criterion | Verification |
|---|-----------|-------------|
| 1 | Clicking "Read the Brief" navigates to `/landing` within the same tab (no new tab opens) | Click the secondary CTA; observe URL changes to `/landing` in the same window |
| 2 | The gateway's 0.8s opacity fade-out plays before the landing page appears | Visual inspection: gateway fades to transparent, then marketing layout renders |
| 3 | Clicking "Enter Mission Control" still navigates to `/launch` (no regression) | Click the primary CTA; verify `/launch` route loads the spatial ZUI |
| 4 | `/landing` is prefetched when the gateway scene mounts | Open browser DevTools Network tab; confirm a prefetch request for `/landing` RSC payload appears during or after the boot sequence |
| 5 | `pnpm typecheck` passes with no errors | Run `pnpm typecheck` |
| 6 | `pnpm lint` passes with no errors (including `react-hooks/exhaustive-deps`) | Run `pnpm lint` |
| 7 | `window.open` is no longer called anywhere in `choice-reveal.tsx` | Grep the file for `window.open`; zero matches |
| 8 | The gateway store `selectedDestination` is set to `'marketing'` when the secondary CTA is clicked | Inspect Zustand devtools or add a temporary `console.log` in the store's `selectDestination` action |

---

## 6. Decisions Made

| # | Decision | Rationale |
|---|----------|-----------|
| 1 | **Use `router.push('/landing')` instead of `router.push('/(marketing)/landing')`** | `(marketing)` is a Next.js route group -- parenthesized segments are excluded from the URL. The public-facing path is `/landing`. Using the route group prefix in the push would result in a 404. |
| 2 | **Match the 600ms `setTimeout` delay from `handleMissionControl`** | Both CTAs trigger `selectDestination()` which sets `phase` to `'transitioning'`, starting the same 0.8s opacity fade. Using the same 600ms delay ensures a visually consistent exit regardless of which CTA is clicked. |
| 3 | **Prefetch `/landing` alongside `/launch` in the same `useEffect`** | Both destinations are known at mount time. A single effect with both prefetches is simpler than separate effects and avoids unnecessary effect lifecycle overhead. |
| 4 | **No changes to the gateway store** | `selectDestination('marketing')` already transitions the phase to `'transitioning'` and records the destination. The store's state machine is already correct for this flow. |
| 5 | **No changes to `GatewayCTA` component** | The button is a pure presentation component. Routing logic belongs in the parent (`ChoiceReveal`) via the `onClick` prop, not in the button itself. |

---

## 7. Open Questions

| # | Question | Impact | Default If Unresolved |
|---|----------|--------|-----------------------|
| 1 | Should the "Read the Brief" CTA use a `<Link>` component instead of `router.push()` for better accessibility (native anchor semantics, right-click "Open in new tab")? | Moderate -- affects how assistive technology announces the element and whether users can middle-click to open in a new tab. However, `GatewayCTA` is currently a `<button>` with an `onClick` handler. Changing it to a `<Link>` would require refactoring the component API. | Keep `router.push()` in this workstream to match the established `handleMissionControl` pattern. Evaluate a `Link`-based refactor as a separate polish task if needed. |
| 2 | Should the exit animation delay differ between the two CTAs (e.g., faster transition to the marketing page since it is static content, slower for the spatial ZUI which is heavier)? | Low -- perceptual difference between 500ms and 600ms is negligible. | Use the same 600ms for both. Consistent behavior is more important than micro-optimizing perceived load time. |

---

## 8. Risk Register

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|-----------|--------|------------|
| 1 | WS-B.2 landing page not yet implemented when this workstream is executed | Medium (depends on execution order) | Low | `router.push('/landing')` will navigate to the WS-A.1 placeholder page if it exists, or to the 404 page if neither exists. Both are acceptable during development. The integration can be verified end-to-end once WS-B.2 is complete. |
| 2 | The 600ms delay feels too long or too short after the landing page content is in place | Low | Low | The delay is a single numeric constant, trivially adjustable. If tuning is needed, extract it to a named constant (e.g., `GATEWAY_EXIT_DELAY_MS`) in `src/lib/constants.ts` alongside existing spatial constants. |
| 3 | Prefetching `/landing` increases initial network usage on slow connections | Very Low | Very Low | `router.prefetch()` uses low-priority fetch and only downloads the RSC payload + JS chunks. On slow connections, the browser will deprioritize it in favor of the gateway's own assets. The gateway boot sequence provides ample idle time for the prefetch to complete without contention. |

---

## Estimated Effort

**Size:** XS (Extra Small)
**Estimated time:** 15-30 minutes implementation + verification
**Files touched:** 2 modified files, 0 new files
**Lines changed:** ~6 lines modified, 1 line added
