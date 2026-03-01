# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repo Is

`safetrekr-marketing` is the **Safetrekr marketing site** — a futuristic spatial mission-control interface built with Next.js 16. It uses a custom spatial ZUI (Zoomable User Interface) engine based on CSS transforms, adapted with the Safetrekr green/amber color scheme.

## Build Commands

- `pnpm dev` — Dev server (uses --webpack flag)
- `pnpm build` — Production build (uses --webpack flag)
- `pnpm typecheck` — TypeScript strict check
- `pnpm lint` — ESLint (flat config, Next.js core-web-vitals + TypeScript)
- `pnpm format` / `pnpm format:check` — Prettier

No test runner is configured. Use `pnpm typecheck` to verify changes.

## Tech Stack

- Next.js 16 (App Router), React 19, Tailwind CSS v4
- @tarva/ui component library (workspace link to `../../tarva-org/tarva-ui-library`)
- Zustand 5 + Immer for state management
- motion/react for animations (**never** `framer-motion`)
- @tanstack/react-query for server state
- Supabase for backend, Anthropic SDK for AI features
- Zod 4 for validation
- **pnpm only** (never npm)

## Key Conventions

- Import `motion/react` (never `framer-motion`)
- Use `pnpm` (never `npm`)
- Path alias: `@/*` maps to `./src/*`
- Types go in `src/lib/interfaces/` or feature-local, never `src/types/`
- Default color scheme: `safetrekr` (green primary + amber accent)
- Color scheme toggle available (safetrekr ↔ tarva-core) via `[data-color-scheme]` attribute
- Node >= 22 required

## Architecture

### Spatial ZUI Engine

The core is a CSS-transform-based zoomable interface. The rendering pipeline:

1. **SpatialViewport** (`src/components/spatial/SpatialViewport.tsx`) — Full-screen container, captures pointer/wheel events for pan/zoom via `usePan` and `useZoom` hooks. Measures viewport dimensions.
2. **SpatialCanvas** (`src/components/spatial/SpatialCanvas.tsx`) — The CSS-transformed div. **Critical performance pattern**: uses `useCameraStore.subscribe()` for direct DOM writes, bypassing React reconciliation. `transform-origin: 0 0` is required for zoom-to-cursor math.
3. **Camera Store** (`src/stores/camera.store.ts`) — Zustand store managing offsetX/offsetY/zoom/semanticLevel. Components needing per-frame updates must use `.subscribe()`, not React selectors.
4. **Spatial Math** (`src/lib/spatial-math.ts`) — Pure functions: zoom-to-cursor, coordinate transforms (screen↔world), semantic zoom with hysteresis, spring physics, viewport culling.
5. **Constants** (`src/lib/constants.ts`) — All spatial constants (zoom range, hysteresis thresholds, spring configs). No magic numbers in feature code.

### Semantic Zoom Levels

Four levels with hysteresis to prevent flicker at boundaries:
- **Z0** (zoom < 0.27): Constellation view — zoomed-out overview
- **Z1** (0.30–0.79): Atrium view — default, capsule ring visible
- **Z2** (0.80–1.49): Station level — detailed panels appear
- **Z3** (zoom >= 1.50): Deep zoom — fine details

Components use `<ZoomGate show={['Z1','Z2']}>` to conditionally render at specific zoom levels.

### Morph System

When a user clicks a district capsule, a "morph" transition occurs:
- State machine in `ui.store.ts`: `idle → expanding → settled → collapsing → idle`
- `MorphOrchestrator` (`src/components/districts/morph-orchestrator.tsx`) coordinates capsule ring ↔ district shell transitions
- `useMorphChoreography` hook drives the animation lifecycle
- Peripheral world elements fade/scatter during morph (CSS classes: `morph-ambient-fade`, `morph-panels-scatter`)

### Three-Tier Animation System

1. **rAF physics** — Camera pan/zoom momentum, spring animations (direct DOM writes via store subscriptions)
2. **motion/react morphs** — Component enter/exit transitions, morph choreography
3. **CSS @keyframes ambient** — Background effects: breathing glow, grid pulse, particle field, scanlines

### Stores (`src/stores/`)

All use Zustand + Immer:
- `camera.store.ts` — ZUI camera state (position, zoom, semantic level)
- `ui.store.ts` — UI state (morph phase, command palette, panels)
- `settings.store.ts` — User preferences (effects, minimap, breadcrumb visibility)
- `ai.store.ts`, `attention.store.ts`, `narration.store.ts`, `enrichment.store.ts`, `triage.store.ts`, `builder.store.ts`, `districts.store.ts`, `auth.store.ts`

### Page Structure

- `src/app/(launch)/page.tsx` — Main spatial interface (the "Launch Atrium"). Client component that composes the entire ZUI.
- `src/app/login/` — Login page
- `src/app/api/` — API routes: `ai/` (chat, claude, narrate), `districts/` (agent-builder, project-room, tarva-chat), `receipts/`, `snapshots/`, `telemetry/`

### Component Organization

- `src/components/spatial/` — ZUI engine: SpatialViewport, SpatialCanvas, CommandPalette, Minimap, ZoomIndicator, ViewportCuller
- `src/components/districts/` — District capsules, morph orchestrator, capsule ring, hub glyph, connector lines
- `src/components/ambient/` — Decorative overlays: particle fields, scanlines, gauges, status panels, telemetry bars. Barrel-exported from `index.ts`.
- `src/components/ui/` — UI primitives (breadcrumb, color scheme switcher)
- `src/components/providers/` — ThemeProvider, QueryProvider

### CSS / Styling

Layered CSS architecture in `src/app/globals.css`:
1. `@tarva/ui/styles.css` — Base tokens
2. `src/styles/spatial-tokens.css` — Spatial design tokens (colors, spacing, glows, capsule dimensions). Defines `:root` defaults (tarva-core) and `[data-color-scheme='safetrekr']` overrides.
3. Tailwind v4 engine
4. `@theme inline` bridges — Make token CSS vars usable as Tailwind utilities (`bg-void`, `text-ember`, etc.)

Spatial color vocabulary: `void → abyss → deep → surface → raised → overlay` (background depth stops), `ember-*` (primary accent scale), `teal-*` (secondary accent scale).

### Hooks (`src/hooks/`)

Heavy use of custom hooks. Key patterns:
- `use-pan.ts` / `use-zoom.ts` — Core ZUI interaction (pointer + wheel events)
- `use-fly-to.ts` — Animated camera navigation to world coordinates
- `use-viewport-cull.ts` — Only render elements visible in current viewport
- `use-morph-choreography.ts` — Morph animation state machine driver
- `use-pan-pause.ts` — Disables expensive backdrop effects during camera motion
- `use-semantic-zoom.ts` — Subscribe to semantic zoom level changes
- `use-camera-sync.ts` — Sync camera state to URL query params

### Interfaces (`src/lib/interfaces/`)

Core domain types: `district.ts` (district definitions, capsule data), `receipt-store.ts`, `camera-controller.ts`, `command-palette.ts`, `exception-triage.ts`, `ai-router.ts`, `station-template-registry.ts`, `system-state-provider.ts`

## Color Scheme

Defaults to `safetrekr`:
- Primary: Muted green (#4BA467 / `rgb(75, 164, 103)`), replaces ember-orange in token system
- Secondary: Teal-slate (#365462 / `rgb(54, 84, 98)`), replaces teal
- Backgrounds: Dark teal (`#061A23` void → `#365462` overlay)
- Text: Cool neutral whites

Toggling to `tarva-core` restores orange/teal/navy-dark. All switching is via `[data-color-scheme]` CSS attribute — token variables are overridden, no component changes needed.
