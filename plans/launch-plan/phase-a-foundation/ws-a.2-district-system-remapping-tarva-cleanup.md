# WS-A.2: District System Remapping + Tarva Cleanup

> **Workstream ID:** WS-A.2
> **Phase:** A -- Foundation & Infrastructure
> **Assigned Agent:** `react-developer`
> **Status:** Draft
> **Created:** 2026-03-02
> **Last Updated:** 2026-03-02
> **Depends On:** None
> **Blocks:** WS-B.2 (Landing Page), WS-B.3--B.9 (content pages reference district routing targets), WS-C.1 (Gateway Integration)
> **Resolves:** Gap 4 (District System Contains Tarva Branding), AD-3 (District Content Morphing), R-13 (Tarva-Specific Code Artifacts)

---

## 1. Objective

Remap the ZUI district system from 6 Tarva product identifiers to 6 Safetrekr marketing districts, replace operational telemetry fields with marketing-relevant metadata, and remove all Tarva-specific code artifacts (type libraries, API routes, district hooks, station components, scene components) that have no purpose in a marketing site.

The capsule ring, morph orchestrator, semantic zoom engine, camera store, and spatial math layer remain intact -- only the data model and content layer change. When this workstream is complete:

- The 6 capsules in the Launch Atrium represent Safetrekr marketing sections (`how-it-works`, `who-its-for`, `platform`, `security`, `pricing`, `get-started`)
- Capsule telemetry displays marketing metadata (tagline + stat line) instead of operational health/pulse/alerts
- The detail panel shows marketing preview cards with "Read More" or "Schedule a Briefing" CTAs instead of StationCard components with "Open {app}" buttons
- The "Get Started" capsule at ring position 5 uses amber (#F59E0B) accent for conversion emphasis
- Z0 constellation beacons show updated 2-letter codes (HW, WF, PL, SE, PR, GS)
- No Tarva-branded strings, dead type libraries, or dead API routes remain in `src/`
- `pnpm typecheck` and `pnpm build` pass cleanly

---

## 2. Scope

### 2.1 In Scope

| # | Deliverable | Description |
|---|-------------|-------------|
| 1 | **DistrictId union remap** | Replace 6 Tarva product IDs with 6 marketing district IDs across the entire type system and all 36 consuming files |
| 2 | **DistrictMeta interface update** | Remove `port` field, add `targetPage`, `tagline`, `isConversionDistrict` |
| 3 | **CapsuleTelemetry interface replacement** | Replace `health`/`pulse`/`lastEvent`/`alerts`/`freshness` with `tagline`/`statLine`/`targetPage` |
| 4 | **MARKETING_CAPSULE_DATA constant** | Replace `MOCK_CAPSULE_DATA` with marketing content for all 6 districts |
| 5 | **DISTRICT_CODES update** | New 2-letter Z0 beacon codes: HW, WF, PL, SE, PR, GS |
| 6 | **DistrictContent component rewrite** | Replace StationCard rendering + localhost links with marketing preview cards per AD-3 |
| 7 | **DetailPanel adaptation** | Render marketing preview cards with "Read More" / "Schedule a Briefing" CTAs |
| 8 | **District view overlay update** | Replace `DISTRICT_TINTS`, `SCENE_MAP`, and `STATION_CONFIG` for marketing districts |
| 9 | **Ambient component updates** | Update 6 ambient components that hardcode Tarva district IDs or labels |
| 10 | **Constants cleanup** | `APP_NAME` from `'Tarva Launch'` to `'Safetrekr'`, `APP_DESCRIPTION` update |
| 11 | **Amber accent for "Get Started"** | Ring position 5 capsule uses amber (#F59E0B) for border glow, health bar, and CTA |
| 12 | **Tarva type libraries deletion** | Remove 6 Tarva-specific type files (agent-builder, tarva-chat, project-room, tarva-core, tarva-erp, tarva-code) |
| 13 | **Tarva API routes deletion** | Remove 3 API route handlers under `src/app/api/districts/` |
| 14 | **Tarva district hooks deletion** | Remove 3 TanStack Query hooks for Tarva district data fetching |
| 15 | **Evidence Ledger deletion** | Remove 9 components + 1 CSS file + 1 type file |
| 16 | **Station components deletion** | Remove 6 Tarva station subdirectories (27 files) |
| 17 | **District view scenes replacement** | Delete 6 Tarva scene components, create single `MarketingScene` |
| 18 | **Enrichment store seed data rekey** | Update `SEED_VALUES` keys in enrichment store to new district IDs |
| 19 | **Command registry update** | Update district IDs and remove Evidence Ledger navigation command |
| 20 | **Capsule component updates** | Update `capsule-telemetry.tsx` and `district-capsule.tsx` for new data shape |

### 2.2 Out of Scope

| # | Item | Rationale |
|---|------|-----------|
| 1 | AI subsystem (`src/lib/ai/`, ~29 files) | Does not import Tarva district string literals directly. Reads from generic districts store. Separate risk profile. Deferred. |
| 2 | Marketing page content (WS-B.2--B.9) | District remapping establishes routing targets; actual page content is separate |
| 3 | Gateway integration (WS-C.1) | Depends on this workstream but is a separate deliverable |
| 4 | Telemetry aggregator route (`/api/telemetry`) | Generic infrastructure, not Tarva-specific |
| 5 | `@tarva/ui` component library references | External workspace dependency; renaming is a separate concern |
| 6 | Spatial engine / ZUI mechanics | Pan, zoom, camera store, viewport culling -- all identity-agnostic |
| 7 | Color scheme token system | Safetrekr tokens already active via `[data-color-scheme='safetrekr']` |
| 8 | Final marketing copy | Placeholder copy acceptable; real copy from content team in WS-B.x |

---

## 3. Input Dependencies

| Dependency | Source | Status | Notes |
|------------|--------|--------|-------|
| Current `DistrictId` type and all exports | `src/lib/interfaces/district.ts` lines 16--22 | Available | 6-member union: `agent-builder`, `tarva-chat`, `project-room`, `tarva-core`, `tarva-erp`, `tarva-code` |
| Marketing district names and IDs | Combined Recommendations, Gap 4 | Defined | `how-it-works`, `who-its-for`, `platform`, `security`, `pricing`, `get-started` |
| AD-3 decision (preview card + CTA pattern) | Combined Recommendations, AD-3 | Decided | Marketing preview card with headline, bullets, and "View Page" CTA |
| Safetrekr color scheme tokens | `src/styles/spatial-tokens.css` | Available | Active via `[data-color-scheme='safetrekr']`. Green primary (`--color-ember: #4ba467`), dark backgrounds (`--color-void: #061a23`) |
| Glass-morphism card pattern | `src/components/districts/detail-panel.tsx` | Available | `bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]` + glow shadow |
| District content copy (headlines, bullets) | Product/Content team | **Pending** | Placeholder copy acceptable for this workstream; final copy in WS-B.x |

---

## 4. Deliverables

### 4.1 District Identity Remap

#### 4.1.1 Current `DistrictId` Type

**File:** `src/lib/interfaces/district.ts`, lines 16--22

```typescript
/** Unique identifier for each Tarva district. */
export type DistrictId =
  | 'agent-builder'
  | 'tarva-chat'
  | 'project-room'
  | 'tarva-core'
  | 'tarva-erp'
  | 'tarva-code'
```

#### 4.1.2 New `DistrictId` Type

```typescript
/** Unique identifier for each Safetrekr marketing district. */
export type DistrictId =
  | 'how-it-works'
  | 'who-its-for'
  | 'platform'
  | 'security'
  | 'pricing'
  | 'get-started'
```

#### 4.1.3 Mapping Table

| Ring Position | Old ID | New ID | Display Name | Short Name | Z0 Code (Old) | Z0 Code (New) |
|:---:|---|---|---|---|:---:|:---:|
| 0 | `agent-builder` | `how-it-works` | How It Works | HOW | AB | HW |
| 1 | `tarva-chat` | `who-its-for` | Who It's For | WHO | CH | WF |
| 2 | `project-room` | `platform` | Platform | PLATFORM | PR | PL |
| 3 | `tarva-core` | `security` | Security | SECURITY | CO | SE |
| 4 | `tarva-erp` | `pricing` | Pricing | PRICING | ER | PR |
| 5 | `tarva-code` | `get-started` | Get Started | START | CD | GS |

#### 4.1.4 Complete Impact List -- All Files Importing `DistrictId`

Every file below imports `DistrictId`, `DISTRICTS`, `DISTRICT_CODES`, `CapsuleTelemetry`, or hardcodes Tarva district string literals. Each requires verification or modification after the type change.

**Core type and data files (modify in place):**

| # | File | Imports/References | Change Required |
|---|------|-------------------|-----------------|
| 1 | `src/lib/interfaces/district.ts` | Defines `DistrictId`, `DistrictMeta`, `CapsuleTelemetry`, `DISTRICTS`, `DISTRICT_CODES`, `MOCK_CAPSULE_DATA`, `HealthState`, `BeaconData`, `ConstellationMetrics` | **Full rewrite.** New DistrictId union, new DistrictMeta shape (remove `port`, add `targetPage`/`tagline`/`isConversionDistrict`), new CapsuleTelemetry interface, new DISTRICTS array, new DISTRICT_CODES map, new MARKETING_CAPSULE_DATA. See Sections 4.2--4.3. |
| 2 | `src/lib/constants.ts` | Lines 15--16: `APP_NAME = 'Tarva Launch'`, `APP_DESCRIPTION` | Change to `'Safetrekr'` and `'Safetrekr marketing site'`. See Section 4.6. |
| 3 | `src/lib/spatial-actions.ts` | Lines 18, 58, 97: `DISTRICTS`, `DistrictId`, `DistrictMeta` | No string literals. Import paths unchanged. `getDistrictById()` and `flyToDistrict()` are generic over DistrictId. **Verify after type change.** |
| 4 | `src/lib/morph-types.ts` | `DistrictId` (type only) | No changes. Type flows through automatically. |
| 5 | `src/lib/enrichment/enrichment-types.ts` | `DistrictId`, `HealthState` | No string literals. Type flows automatically. |

**Store files (modify in place):**

| # | File | Imports/References | Change Required |
|---|------|-------------------|-----------------|
| 6 | `src/stores/ui.store.ts` | `DistrictId` (type only) | No changes. Type flows through. |
| 7 | `src/stores/districts.store.ts` | Uses `Record<string, AppTelemetry>` (line 22). Imports from `telemetry-types`, not `district.ts`. | No changes to store structure. Generic string keys. |
| 8 | `src/stores/enrichment.store.ts` | Lines 18--19: `DistrictId`, `DISTRICTS`, `DISTRICT_CODES`. Lines 46--53: `SEED_VALUES` Record keyed by old DistrictId. Line 62: `shortCode: DISTRICT_CODES[id]`. | **Rewrite `SEED_VALUES` keys** to new district IDs. See Section 4.8. |
| 9 | `src/stores/builder.store.ts` | `DistrictId` (type only) | Verify after type change. |
| 10 | `src/stores/ai.store.ts` | `DistrictId` (type only) | Verify after type change. |

**District component files (modify in place):**

| # | File | Change Required |
|---|------|-----------------|
| 11 | `src/components/districts/district-content.tsx` | **Complete rewrite.** Replace `DISTRICT_CONFIG` (lines 40--83) with `MARKETING_DISTRICT_CONFIG`. Replace `StationCard` + `handleLaunch` + `getHealthColor`/`getHealthLabel` with marketing preview cards. Remove `useDistrictsStore` subscription. See Section 4.5. |
| 12 | `src/components/districts/capsule-telemetry.tsx` | **Rewrite.** Currently renders `pulse`, `lastEvent`, `alerts` from `CapsuleTelemetry` (lines 78--94). Change to render `tagline` and `statLine`. Remove `isOffline` logic (marketing capsules are never offline). See Section 4.4.1. |
| 13 | `src/components/districts/district-capsule.tsx` | Line 72: `isOfflineState(data.telemetry.health)` and line 73: `data.telemetry.health === 'UNKNOWN'`. **Remove** these code paths -- marketing capsules are never offline. Update `aria-label` to use district display name + tagline instead of health state. See Section 4.4.2. |
| 14 | `src/components/districts/capsule-health-bar.tsx` | Keep for decorative effect. All capsules show "OPERATIONAL" glow. "Get Started" at ring position 5 uses amber (#F59E0B). |
| 15 | `src/components/districts/detail-panel.tsx` | Lines 17--18: `DistrictId`, `getDistrictById`. No string literals. `displayName` lookup flows automatically. **Verify rendering.** |
| 16 | `src/components/districts/capsule-ring.tsx` | Lines 22--23: `CapsuleData`, `DistrictId`. No string literals. Generic over data shape. No changes. |
| 17 | `src/components/districts/morph-orchestrator.tsx` | Line 31: `CapsuleData`, `DistrictId`. No string literals. Generic. No changes. |
| 18 | `src/components/districts/constellation-view.tsx` | Lines 24--31: `DISTRICTS`, `DISTRICT_CODES`, `BeaconData`, `ConstellationMetrics`, `DistrictId`, `HealthState`. Lines 131--141: `deriveBeacons()` uses `DISTRICT_CODES[district.id]`. **Auto-updated** by data change. No manual changes needed. |
| 19 | `src/components/districts/district-beacon.tsx` | Line 17: `BeaconData`, `DistrictId`, `HealthState`. No string literals. |
| 20 | `src/components/districts/district-shell.tsx` | `DistrictId` type only. No string literals. |

**District View system (major changes):**

| # | File | Change Required |
|---|------|-----------------|
| 21 | `src/components/district-view/district-view-overlay.tsx` | Lines 36--43: `DISTRICT_TINTS` Record keyed by old DistrictId. **Rewrite** with new district IDs. See Section 4.7.3. |
| 22 | `src/components/district-view/district-view-content.tsx` | Lines 26--33: `SCENE_MAP` Record keyed by old DistrictId. Imports 6 Tarva scene components. **Complete rewrite.** Replace with single `MarketingScene`. See Section 4.7.2. |
| 23 | `src/components/district-view/district-view-dock.tsx` | Lines 28--59: `STATION_CONFIG` Record with Tarva app descriptions, localhost URLs, port numbers, station lists. **Complete rewrite.** Replace with marketing district descriptions. See Section 4.7.4. |
| 24 | `src/components/district-view/district-view-header.tsx` | Line 19: `DISTRICTS`, `DistrictId`. No string literals. `displayName` lookup flows automatically. |
| 25 | `src/components/district-view/scenes/index.ts` | Lines 1--6: Exports 6 Tarva scene components. **Rewrite** to export `MarketingScene`. |
| 26--31 | `src/components/district-view/scenes/{agent-builder,tarva-chat,project-room,tarva-core,tarva-erp,tarva-code}-scene.tsx` | **Delete all 6.** Replace with `marketing-scene.tsx`. |

**Ambient components (hardcoded Tarva district IDs):**

| # | File | Hardcoded References | Change Required |
|---|------|---------------------|-----------------|
| 32 | `src/components/ambient/bottom-status-strip.tsx` | Lines 174--179: `Record<DistrictId, string[]>` with Tarva subsystem codes (`SDK`, `CLI`, `MCP`, `DB`, `TST`, `BLD`, etc.) | **Rewrite** with marketing-themed codes. See Section 4.9.1. |
| 33 | `src/components/ambient/orbital-readouts.tsx` | Lines 83--88: Array of all 6 old DistrictId string literals | **Replace** with new district IDs. |
| 34 | `src/components/ambient/activity-ticker.tsx` | Lines 70--77: Hardcoded Tarva activity events (`DEPLOY.AGENT`, `CHAT.MSG`, `BUILD.AGENT`, `SYNC.ERP`, `REASON.CORE`) | **Rewrite** with marketing-themed ticker events. See Section 4.9.3. |
| 35 | `src/components/ambient/connection-paths.tsx` | Lines 77--81: Inter-district connection labels (`agent-builder -> project-room`, etc.). Lines 159--164: `Record<DistrictId, number>` index mapping. | **Rewrite** connection labels and index mapping. See Section 4.9.4. |
| 36 | `src/components/ambient/feed-panel.tsx` | Lines 30--31: Imports `DISTRICTS`, `DistrictId` | Auto-updated by data change. Verify sensor readout labels. |
| 37 | `src/components/ambient/system-status-panel.tsx` | Line 32: Imports `HealthState` | No changes. |

**Other consumers:**

| # | File | Change Required |
|---|------|-----------------|
| 38 | `src/app/launch/page.tsx` | Line 37: Remove `EvidenceLedgerDistrict` + `EVIDENCE_LEDGER_POSITION` import. Line 76: Change `MOCK_CAPSULE_DATA` to `MARKETING_CAPSULE_DATA`. Remove Evidence Ledger JSX reference. |
| 39 | `src/components/ui/SpatialBreadcrumb.tsx` | `DISTRICTS`, `DistrictId`. No string literals. `displayName` lookup flows. |
| 40 | `src/components/spatial/Minimap.tsx` | `DISTRICTS`, `DistrictMeta`. Renders generically. No changes. |
| 41 | `src/components/spatial/CommandPalette.tsx` | Line 80: Icon mapping `'go-to-evidence-ledger': BookOpen`. Line 241: Title string `'Tarva Launch Command Palette'`. **Update** title and remove evidence ledger icon mapping. |
| 42 | `src/lib/command-registry.ts` | Lines 50--52: localhost URLs keyed by Tarva app IDs. Lines 110--122: Evidence Ledger navigation command. Lines 125--132: `districtIds` array with old IDs. | **Rewrite** district IDs array, remove Evidence Ledger command, remove localhost URLs, update display names. See Section 4.10. |
| 43 | `src/hooks/use-enrichment-cycle.ts` | `DistrictId`, `HealthState`. Type flows. Verify health computation logic. |
| 44 | `src/hooks/use-morph-choreography.ts` | `DistrictId`. Type flows. No changes. |
| 45 | `src/hooks/use-district-position.ts` | `DistrictId`, `DISTRICTS`. Generic lookup. No changes. |
| 46 | `src/hooks/use-builder-mode.ts` | `DistrictId`. Type flows. |
| 47 | `src/hooks/use-camera-director.ts` | `DistrictId`. Builds spatial context. Generic. |
| 48 | `src/components/ai/BuilderModePanel.tsx` | `DistrictId`. Type flows. |
| 49 | `src/lib/ai/builder-receipt.ts` | `DistrictId`. Type flows. |
| 50 | `src/lib/ai/builder-types.ts` | `DistrictId`. Type flows. |

---

### 4.2 Interface Changes

#### 4.2.1 `DistrictMeta` -- Current vs. Proposed

**File:** `src/lib/interfaces/district.ts`, lines 55--66

**Current:**
```typescript
export interface DistrictMeta {
  id: DistrictId
  displayName: string
  shortName: string
  ringIndex: 0 | 1 | 2 | 3 | 4 | 5
  port: number | null
}
```

**Proposed:**
```typescript
/** Static metadata for a single Safetrekr marketing district. */
export interface DistrictMeta {
  /** Unique district identifier. */
  id: DistrictId
  /** Full display name (e.g. "How It Works"). */
  displayName: string
  /** Abbreviated name for tight spaces (e.g. "HOW"). */
  shortName: string
  /** Position index in the capsule ring (0-5). */
  ringIndex: 0 | 1 | 2 | 3 | 4 | 5
  /** Target marketing page path (e.g. "/how-it-works"). */
  targetPage: string
  /** Single-line tagline for capsule display. */
  tagline: string
  /** Whether this district uses amber accent for conversion emphasis. */
  isConversionDistrict?: boolean
}
```

**Changes:**
- **Removed:** `port: number | null` -- no dev server ports in marketing context
- **Added:** `targetPage: string` -- marketing page route for navigation
- **Added:** `tagline: string` -- capsule display text
- **Added:** `isConversionDistrict?: boolean` -- amber accent for "Get Started"

#### 4.2.2 `CapsuleTelemetry` -- Current vs. Proposed

**File:** `src/lib/interfaces/district.ts`, lines 37--48

**Current:**
```typescript
export interface CapsuleTelemetry {
  health: HealthState
  pulse: string
  lastEvent: string
  alerts: number
  freshness: string
}
```

**Proposed:**
```typescript
/** Marketing-relevant metadata surfaced by each district capsule. */
export interface CapsuleTelemetry {
  /** Short tagline displayed on the capsule face. */
  tagline: string
  /** Stat line for visual interest (e.g. "256-bit AES" or "SOC 2 Type II"). */
  statLine: string
  /** Target marketing page path for navigation. */
  targetPage: string
}
```

**Changes:**
- **Removed:** `health`, `pulse`, `lastEvent`, `alerts`, `freshness` (operational telemetry fields)
- **Added:** `tagline`, `statLine`, `targetPage` (marketing display fields)

**Impact on `HealthState`:** The `HealthState` type and `HEALTH_STATE_MAP` constant become orphaned for capsule usage. However, `HealthState` is still imported by `enrichment-types.ts`, the enrichment store, constellation-view, district-beacon, and ambient components for decorative health animations. **Decision: Keep `HealthState` and `HEALTH_STATE_MAP`** for ambient decorative use. They drive the glowing status dots and connection path colors that contribute to the mission-control aesthetic, even though they no longer represent real operational health.

#### 4.2.3 `CapsuleData` -- Proposed

**File:** `src/lib/interfaces/district.ts`, lines 73--80

No structural change. The `telemetry` field type changes automatically via the updated `CapsuleTelemetry` interface. `sparklineData` retained for decorative capsule chart.

```typescript
/** Complete data payload for a single capsule in the ring. */
export interface CapsuleData {
  /** Static district metadata. */
  district: DistrictMeta
  /** Marketing telemetry for capsule display. */
  telemetry: CapsuleTelemetry
  /** Array of numeric data points for the sparkline chart (decorative). */
  sparklineData: number[]
}
```

#### 4.2.4 `DistrictCode` -- Current vs. Proposed

**File:** `src/lib/interfaces/district.ts`, lines 193--203

**Current:**
```typescript
export type DistrictCode = 'AB' | 'CH' | 'PR' | 'CO' | 'ER' | 'CD'

export const DISTRICT_CODES: Record<DistrictId, DistrictCode> = {
  'agent-builder': 'AB',
  'tarva-chat': 'CH',
  'project-room': 'PR',
  'tarva-core': 'CO',
  'tarva-erp': 'ER',
  'tarva-code': 'CD',
} as const
```

**Proposed:**
```typescript
/** Two-letter compact codes for Z0 beacon labels. */
export type DistrictCode = 'HW' | 'WF' | 'PL' | 'SE' | 'PR' | 'GS'

/** Maps DistrictId to its compact code for Z0 display. */
export const DISTRICT_CODES: Record<DistrictId, DistrictCode> = {
  'how-it-works': 'HW',
  'who-its-for': 'WF',
  'platform': 'PL',
  'security': 'SE',
  'pricing': 'PR',
  'get-started': 'GS',
} as const
```

---

### 4.3 DISTRICTS Array and MARKETING_CAPSULE_DATA

#### 4.3.1 `DISTRICTS` Array -- Proposed

**File:** `src/lib/interfaces/district.ts`, replaces lines 87--130

```typescript
/** All 6 Safetrekr marketing districts, ordered by ring position. */
export const DISTRICTS: readonly DistrictMeta[] = [
  {
    id: 'how-it-works',
    displayName: 'How It Works',
    shortName: 'HOW',
    ringIndex: 0,
    targetPage: '/how-it-works',
    tagline: 'See the system in action',
  },
  {
    id: 'who-its-for',
    displayName: "Who It's For",
    shortName: 'WHO',
    ringIndex: 1,
    targetPage: '/solutions',
    tagline: 'Built for safety leaders',
  },
  {
    id: 'platform',
    displayName: 'Platform',
    shortName: 'PLATFORM',
    ringIndex: 2,
    targetPage: '/platform',
    tagline: 'Architecture & capabilities',
  },
  {
    id: 'security',
    displayName: 'Security',
    shortName: 'SECURITY',
    ringIndex: 3,
    targetPage: '/security',
    tagline: 'Enterprise-grade protection',
  },
  {
    id: 'pricing',
    displayName: 'Pricing',
    shortName: 'PRICING',
    ringIndex: 4,
    targetPage: '/pricing',
    tagline: 'Transparent plans',
  },
  {
    id: 'get-started',
    displayName: 'Get Started',
    shortName: 'START',
    ringIndex: 5,
    targetPage: '/contact',
    tagline: 'Schedule a briefing',
    isConversionDistrict: true,
  },
] as const
```

**Note:** `targetPage` values use the marketing route paths established in WS-A.1. "Who It's For" maps to `/solutions` (the solutions/verticals page). "Get Started" maps to `/contact` (the contact/demo request page).

#### 4.3.2 `MARKETING_CAPSULE_DATA` -- Proposed

Replaces `MOCK_CAPSULE_DATA` (lines 239--249).

```typescript
/** Per-district stat lines for capsule display. */
const MARKETING_STAT_LINES: Record<DistrictId, string> = {
  'how-it-works': '3-step process',
  'who-its-for': '5 industries',
  'platform': 'Real-time tracking',
  'security': 'SOC 2 Type II',
  'pricing': 'From $0/month',
  'get-started': 'Free trial',
}

/** Marketing capsule data for all 6 districts. */
export const MARKETING_CAPSULE_DATA: CapsuleData[] = DISTRICTS.map((district) => ({
  district,
  telemetry: {
    tagline: district.tagline,
    statLine: MARKETING_STAT_LINES[district.id],
    targetPage: district.targetPage,
  },
  sparklineData: generateSparklineData(),
}))
```

**Note:** All stat line content is placeholder. Final copy comes from content team in WS-B.1.

---

### 4.4 Capsule Component Updates

#### 4.4.1 `capsule-telemetry.tsx` -- Rewrite

**File:** `src/components/districts/capsule-telemetry.tsx` (97 lines)

**Current:** Renders 3 telemetry rows -- `PULSE` (from `telemetry.pulse`), `LAST EVENT` (from `telemetry.lastEvent`), `ALERTS` (from `telemetry.alerts`). Accepts `isOffline` boolean to show `--` placeholders.

**Proposed:** Render 2 rows -- `TAGLINE` (from `telemetry.tagline`), `STAT` (from `telemetry.statLine`). Remove `isOffline` prop entirely (marketing capsules are never offline). Remove the alert dot indicator.

```typescript
export interface CapsuleTelemetryProps {
  telemetry: CapsuleTelemetryData
}

export function CapsuleTelemetry({ telemetry }: CapsuleTelemetryProps) {
  return (
    <div className="flex flex-col gap-6">
      <TelemetryRow label="TAGLINE" value={telemetry.tagline} />
      <TelemetryRow label="STAT" value={telemetry.statLine} />
    </div>
  )
}
```

#### 4.4.2 `district-capsule.tsx` -- Update

**File:** `src/components/districts/district-capsule.tsx`

**Current (line 72--73):**
```typescript
const isOffline = isOfflineState(data.telemetry.health)
const isUnknown = data.telemetry.health === 'UNKNOWN'
```

**Change:** Remove `isOffline` and `isUnknown` checks. Marketing capsules always render in active state. Remove `isOfflineState` import. Update `aria-label` to use `data.district.displayName` + `data.telemetry.tagline` instead of health state. Remove the `isOffline` prop passed to `CapsuleTelemetry`.

#### 4.4.3 `capsule-health-bar.tsx` -- Simplify

Keep for decorative effect. All marketing capsules show "OPERATIONAL" green glow by default. The "Get Started" capsule at ring position 5 should detect `district.isConversionDistrict` and use amber (#F59E0B) instead of the default green health color.

---

### 4.5 District Content Replacement (AD-3)

**File:** `src/components/districts/district-content.tsx` (247 lines)

**Current:** `DISTRICT_CONFIG` (lines 40--83) maps each Tarva DistrictId to `{ displayName, url, port, description, stations }`. The `DistrictContent` component renders `StationCard` elements with "Open {app}" buttons that call `window.open(config.url, '_blank')` to localhost ports.

**Proposed:** Complete rewrite. Replace `DISTRICT_CONFIG` with `MARKETING_DISTRICT_CONFIG`:

```typescript
interface MarketingDistrictConfig {
  readonly headline: string
  readonly bullets: readonly string[]
  readonly ctaLabel: string
  readonly ctaHref: string
  /** If true, CTA uses amber accent styling for conversion emphasis. */
  readonly isConversion?: boolean
}

const MARKETING_DISTRICT_CONFIG: Record<DistrictId, MarketingDistrictConfig> = {
  'how-it-works': {
    headline: 'See how Safetrekr protects your people',
    bullets: [
      'Real-time location tracking with sub-meter accuracy',
      'Automated check-in and welfare monitoring',
      'Instant emergency response coordination',
    ],
    ctaLabel: 'Read More',
    ctaHref: '/how-it-works',
  },
  'who-its-for': {
    headline: 'Built for safety-critical industries',
    bullets: [
      'Mining, construction, energy, and forestry',
      'Lone workers and remote site teams',
      'Safety managers and compliance officers',
    ],
    ctaLabel: 'Read More',
    ctaHref: '/solutions',
  },
  'platform': {
    headline: 'Architecture designed for reliability',
    bullets: [
      'Satellite + cellular hybrid connectivity',
      'Real-time dashboard and reporting',
      'API integrations with existing safety systems',
    ],
    ctaLabel: 'Read More',
    ctaHref: '/platform',
  },
  'security': {
    headline: 'Enterprise-grade data protection',
    bullets: [
      'SOC 2 Type II certified infrastructure',
      'End-to-end encryption at rest and in transit',
      'Role-based access control and audit logging',
    ],
    ctaLabel: 'Read More',
    ctaHref: '/security',
  },
  'pricing': {
    headline: 'Transparent plans for teams of any size',
    bullets: [
      'Free tier for small teams',
      'Per-seat pricing with volume discounts',
      'Enterprise custom plans available',
    ],
    ctaLabel: 'Read More',
    ctaHref: '/pricing',
  },
  'get-started': {
    headline: 'Start protecting your team today',
    bullets: [
      '15-minute onboarding walkthrough',
      'Free trial with full platform access',
      'Dedicated onboarding specialist',
    ],
    ctaLabel: 'Schedule a Briefing',
    ctaHref: '/contact',
    isConversion: true,
  },
}
```

**Note:** All copy above is placeholder. Final copy is a content team deliverable (WS-B.1), not gated by this workstream.

**Component changes:**
- Remove `StationCard` sub-component
- Remove `getHealthColor`, `getHealthLabel` helper functions
- Remove `useDistrictsStore` telemetry subscription (no live telemetry needed)
- Remove `handleLaunch` callback (no `window.open` to localhost)
- New component renders: headline (`<h3>`), bullet list (`<ul>`), CTA link (Next.js `<Link>` from `next/link`)
- "Get Started" district CTA uses amber accent class
- CTA links use `router.push()` or `<Link>` for client-side navigation to marketing pages

---

### 4.6 Constants Update

**File:** `src/lib/constants.ts`, lines 15--16

**Current:**
```typescript
export const APP_NAME = 'Tarva Launch'
export const APP_DESCRIPTION = 'Spatial mission control for the Tarva ecosystem'
```

**Proposed:**
```typescript
export const APP_NAME = 'Safetrekr'
export const APP_DESCRIPTION = 'Safetrekr marketing site'
```

**Additional `APP_NAME`/`APP_DESCRIPTION` references to update:**

The `APP_NAME` constant is imported in at least the command palette title string (`src/components/spatial/CommandPalette.tsx` line 241: `'Tarva Launch Command Palette'`). This string should be updated to `'Safetrekr Command Palette'` even if it does not import the constant (it is hardcoded).

---

### 4.7 District View System Updates

#### 4.7.1 Scene Components -- Delete and Replace

**Directory:** `src/components/district-view/scenes/`

**Delete all 6 Tarva scene files:**
- `agent-builder-scene.tsx` (8,278 bytes)
- `tarva-chat-scene.tsx` (7,045 bytes)
- `project-room-scene.tsx` (9,057 bytes)
- `tarva-core-scene.tsx` (8,198 bytes)
- `tarva-erp-scene.tsx` (8,620 bytes)
- `tarva-code-scene.tsx` (10,248 bytes)

**Create:** `marketing-scene.tsx` -- a single shared scene component that accepts `districtId` and renders a generic ambient decorative background (particle field, grid lines) with per-district color tinting via `DISTRICT_TINTS`. The existing `shared-scene-primitives.tsx` file (12,389 bytes) should be preserved and its primitives (`GhostText`, data stream animations, etc.) reused in the new `MarketingScene`.

**Update `scenes/index.ts`:**
```typescript
export { MarketingScene } from './marketing-scene'
```

#### 4.7.2 `district-view-content.tsx` Update

**Current `SCENE_MAP` (lines 26--33):**
```typescript
const SCENE_MAP: Record<DistrictId, React.ComponentType<{ dockSide: PanelSide }>> = {
  'agent-builder': AgentBuilderScene,
  'tarva-chat': TarvaChatScene,
  'project-room': ProjectRoomScene,
  'tarva-core': TarvaCoreScene,
  'tarva-erp': TarvaErpScene,
  'tarva-code': TarvaCodeScene,
}
```

**Proposed:** Remove `SCENE_MAP` record. Replace with direct `MarketingScene` usage:
```typescript
import { MarketingScene } from './scenes'

function DistrictViewContent({ districtId, panelSide }: DistrictViewContentProps) {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }} aria-hidden="true">
      <MarketingScene districtId={districtId} dockSide={panelSide} />
    </div>
  )
}
```

#### 4.7.3 `district-view-overlay.tsx` -- DISTRICT_TINTS Update

**Current (lines 36--43):**
```typescript
const DISTRICT_TINTS: Record<DistrictId, string> = {
  'agent-builder': 'rgba(var(--ember-rgb), 0.06)',
  'tarva-chat': 'rgba(var(--teal-bright-rgb), 0.06)',
  'project-room': 'rgba(var(--healthy-rgb), 0.04)',
  'tarva-core': 'rgba(var(--ember-bright-rgb), 0.05)',
  'tarva-erp': 'rgba(var(--ember-rgb), 0.04)',
  'tarva-code': 'rgba(var(--teal-rgb), 0.04)',
}
```

**Proposed:**
```typescript
const DISTRICT_TINTS: Record<DistrictId, string> = {
  'how-it-works': 'rgba(var(--ember-rgb), 0.06)',
  'who-its-for': 'rgba(var(--teal-bright-rgb), 0.06)',
  'platform': 'rgba(var(--healthy-rgb), 0.04)',
  'security': 'rgba(var(--ember-bright-rgb), 0.05)',
  'pricing': 'rgba(var(--ember-rgb), 0.04)',
  'get-started': 'rgba(245, 158, 11, 0.08)',  // amber emphasis for conversion
}
```

#### 4.7.4 `district-view-dock.tsx` -- STATION_CONFIG Rewrite

**Current (lines 28--59):** Contains Tarva app descriptions, localhost URLs, port references, and station lists.

**Proposed:** Replace with marketing district descriptions. Remove `url` field (marketing districts link to pages, not localhost apps). Remove `stations` list. Add `bullets` and `ctaHref` fields that mirror `MARKETING_DISTRICT_CONFIG`.

---

### 4.8 Enrichment Store Update

**File:** `src/stores/enrichment.store.ts`, lines 46--53

**Current `SEED_VALUES`:**
```typescript
const SEED_VALUES: Record<DistrictId, { uptime: number; responseTimeMs: number; activeWork: number; memoryUsagePct: number; cpuUsagePct: number }> = {
  'agent-builder': { uptime: 9720, responseTimeMs: 42, activeWork: 7, memoryUsagePct: 48, cpuUsagePct: 22 },
  'tarva-chat':    { uptime: 28350, responseTimeMs: 31, activeWork: 4, memoryUsagePct: 55, cpuUsagePct: 18 },
  'project-room':  { uptime: 14400, responseTimeMs: 58, activeWork: 9, memoryUsagePct: 62, cpuUsagePct: 35 },
  'tarva-core':    { uptime: 43200, responseTimeMs: 25, activeWork: 2, memoryUsagePct: 41, cpuUsagePct: 12 },
  'tarva-erp':     { uptime: 7200, responseTimeMs: 67, activeWork: 11, memoryUsagePct: 38, cpuUsagePct: 40 },
  'tarva-code':    { uptime: 36000, responseTimeMs: 44, activeWork: 5, memoryUsagePct: 52, cpuUsagePct: 28 },
}
```

**Proposed:** Rekey with new district IDs. Numeric values remain identical (they are decorative seed data for ambient animations, not meaningful operational metrics):

```typescript
const SEED_VALUES: Record<DistrictId, { uptime: number; responseTimeMs: number; activeWork: number; memoryUsagePct: number; cpuUsagePct: number }> = {
  'how-it-works': { uptime: 9720, responseTimeMs: 42, activeWork: 7, memoryUsagePct: 48, cpuUsagePct: 22 },
  'who-its-for':  { uptime: 28350, responseTimeMs: 31, activeWork: 4, memoryUsagePct: 55, cpuUsagePct: 18 },
  'platform':     { uptime: 14400, responseTimeMs: 58, activeWork: 9, memoryUsagePct: 62, cpuUsagePct: 35 },
  'security':     { uptime: 43200, responseTimeMs: 25, activeWork: 2, memoryUsagePct: 41, cpuUsagePct: 12 },
  'pricing':      { uptime: 7200, responseTimeMs: 67, activeWork: 11, memoryUsagePct: 38, cpuUsagePct: 40 },
  'get-started':  { uptime: 36000, responseTimeMs: 44, activeWork: 5, memoryUsagePct: 52, cpuUsagePct: 28 },
}
```

Add explicit `satisfies Record<DistrictId, ...>` assertion to catch mismatches at compile time.

---

### 4.9 Ambient Component Updates

#### 4.9.1 `bottom-status-strip.tsx`

**Current (lines 174--179):** Subsystem codes keyed by Tarva DistrictId:
```typescript
'agent-builder': ['SDK', 'CLI', 'MCP', 'DB', 'TST', 'BLD'],
'tarva-chat': ['MSG', 'RTR', 'MCP', 'WSS', 'CTX', 'STR'],
// ... 4 more
```

**Proposed:** Replace with marketing-themed decorative codes:
```typescript
'how-it-works': ['TRK', 'MON', 'CHK', 'ALR', 'RPT', 'MAP'],
'who-its-for': ['MNG', 'CON', 'ENR', 'FOR', 'LNW', 'RMT'],
'platform': ['SAT', 'CEL', 'API', 'DSH', 'IOT', 'GPS'],
'security': ['AES', 'SOC', 'RBA', 'AUD', 'ENC', 'PEN'],
'pricing': ['FRE', 'PRO', 'ENT', 'VOL', 'SLA', 'SUP'],
'get-started': ['TRL', 'ONB', 'DEM', 'CAL', 'SET', 'GO!'],
```

#### 4.9.2 `orbital-readouts.tsx`

**Current (lines 83--88):** Array of 6 old DistrictId string literals.

**Change:** Replace with `['how-it-works', 'who-its-for', 'platform', 'security', 'pricing', 'get-started']`.

#### 4.9.3 `activity-ticker.tsx`

**Current (lines 70--77):** Hardcoded Tarva-specific events.

**Proposed:** Marketing-themed decorative ticker events:
```typescript
{ time: '14:22', verb: 'TRACK.UPDATE', target: 'platform', status: 'OK', category: 'data' },
{ time: '14:19', verb: 'CHECKIN.RCV', target: 'how-it-works', status: 'OK', category: 'data' },
{ time: '14:15', verb: 'ALERT.CLR', target: 'security', status: 'OK', category: 'system' },
{ time: '14:11', verb: 'PLAN.SYNC', target: 'pricing', status: 'OK', category: 'system' },
{ time: '14:08', verb: 'USER.JOIN', target: 'get-started', status: 'OK', category: 'user' },
{ time: '14:04', verb: 'REPORT.GEN', target: 'who-its-for', status: 'OK', category: 'data' },
```

#### 4.9.4 `connection-paths.tsx`

**Current (lines 77--81, 159--164):** Inter-district connection labels and `Record<DistrictId, number>` index mapping.

**Proposed:** Update labels to marketing-relevant decorative connections and update index mapping:
```typescript
const DISTRICT_INDICES: Record<DistrictId, number> = {
  'how-it-works': 0,
  'who-its-for': 1,
  'platform': 2,
  'security': 3,
  'pricing': 4,
  'get-started': 5,
}
```

Connection labels should be generic (e.g., `"DATA LINK 01"`, `"SYNC CHANNEL"`) since these are purely decorative.

---

### 4.10 Command Registry Update

**File:** `src/lib/command-registry.ts`

**Changes:**

1. **Lines 50--52:** Remove localhost URL mapping (`LAUNCH_URLS` or equivalent). Marketing districts do not have external app URLs.

2. **Lines 110--122:** Remove the `go-to-evidence-ledger` navigation command entirely:
   ```typescript
   // DELETE this command block
   commands.push({
     id: 'go-to-evidence-ledger',
     verb: 'go',
     object: 'evidence-ledger',
     ...
   })
   ```

3. **Lines 125--132:** Replace `districtIds` array:
   ```typescript
   // Current:
   const districtIds = ['agent-builder', 'tarva-chat', 'project-room', 'tarva-core', 'tarva-erp', 'tarva-code']

   // Proposed:
   const districtIds: DistrictId[] = ['how-it-works', 'who-its-for', 'platform', 'security', 'pricing', 'get-started']
   ```

4. **Line 313+:** Update any `open-{district}` commands that reference Tarva app names.

5. **Update `APP_DISPLAY_NAMES`** mapping to use new district display names.

---

### 4.11 Launch Page Update

**File:** `src/app/launch/page.tsx`

1. **Line 37:** Remove `EvidenceLedgerDistrict` and `EVIDENCE_LEDGER_POSITION` import
2. **Line 76:** Change `MOCK_CAPSULE_DATA` to `MARKETING_CAPSULE_DATA`
3. **Remove** the `EvidenceLedgerDistrict` component reference in the JSX (rendered in the spatial canvas)
4. **Line 89--91:** Remove `InMemoryReceiptStore` import and instantiation (no receipt store needed)

---

### 4.12 Auth Component Update

**File:** `src/components/auth/attractor-glyph.tsx`

Line 5: `import { TarvaStarIcon } from '@/components/districts/hub-center-glyph'`

**Action:** Rename the exported `TarvaStarIcon` to `HubStarIcon` in `hub-center-glyph.tsx`. Update the import in `attractor-glyph.tsx`. This is a cosmetic naming concern, not functional.

---

### 4.13 File Deletions

#### 4.13.1 Tarva Type Libraries (6 files)

| File | Size | Reason |
|------|------|--------|
| `src/lib/agent-builder-types.ts` | 247 lines | Defines `AgentBuilderDistrictData`, `PipelineRun`, `InstalledAgentSummary`, etc. for Agent Builder app. No marketing equivalent. |
| `src/lib/tarva-chat-types.ts` | 186 lines | Defines `TarvaChatSnapshot`, `ChatStatusData`, `ChatConversation`, etc. No marketing equivalent. |
| `src/lib/project-room-types.ts` | 237 lines | Defines `ProjectRoomSnapshot`, `ProjectRoomRun`, `ProjectRoomArtifact`, etc. No marketing equivalent. |
| `src/lib/tarva-core-types.ts` | 46 lines | Defines `CoreConnectionInfo`, `CoreSessionSummary`. No marketing equivalent. |
| `src/lib/tarva-erp-types.ts` | 72 lines | Defines `ErpModuleId`, `ErpModuleStatus`, `ErpHealthDetail`. No marketing equivalent. |
| `src/lib/tarva-code-types.ts` | 46 lines | Defines `CodeStubInfo`, `TARVA_CODE_STUB`. No marketing equivalent. |

#### 4.13.2 Evidence Ledger (9 files + 1 CSS + 1 type file)

| File | Reason |
|------|--------|
| `src/components/evidence-ledger/evidence-ledger-district.tsx` | Tarva-specific district component for receipt timeline |
| `src/components/evidence-ledger/timeline-strip.tsx` | Z2 density bar for receipt data |
| `src/components/evidence-ledger/timeline-panel.tsx` | Z3 interactive panel with faceted filtering |
| `src/components/evidence-ledger/timeline-item.tsx` | Single receipt display |
| `src/components/evidence-ledger/receipt-detail-panel.tsx` | Receipt detail expansion |
| `src/components/evidence-ledger/faceted-filter.tsx` | Receipt filtering UI |
| `src/components/evidence-ledger/facet-chip.tsx` | Filter chip component |
| `src/components/evidence-ledger/index.ts` | Barrel export |
| `src/components/evidence-ledger/evidence-ledger.css` | Component styles (14,060 bytes) |
| `src/lib/evidence-ledger-types.ts` | Depends on receipt types. Not relevant to marketing. |

**Action:** Delete entire `src/components/evidence-ledger/` directory and the type file. Remove import from `src/app/launch/page.tsx` (line 37). Remove command from `src/lib/command-registry.ts`. Remove icon mapping from `src/components/spatial/CommandPalette.tsx` (line 80).

**Additional consumers to clean up:**
- `src/hooks/use-faceted-filter.ts` -- imports from `evidence-ledger-types.ts`. **Delete** this hook.
- `src/hooks/use-receipt-timeline.ts` -- imports from `evidence-ledger-types.ts`. **Delete** this hook.
- `src/lib/template-selection/conditional-templates.ts` (line 191) -- references `go evidence-ledger`. **Remove** reference.
- `src/lib/ai/exception-rules.ts` (line 176) -- references `go evidence-ledger`. **Remove** reference.
- `src/lib/ai/recovery-templates.ts` (line 89) -- references `go evidence-ledger`. **Remove** reference.

#### 4.13.3 Tarva API Route Handlers (3 route files + directory)

| File | Size | Reason |
|------|------|--------|
| `src/app/api/districts/agent-builder/route.ts` | 249 lines | Fetches data from localhost:3000 Agent Builder app. Dead route in marketing context. |
| `src/app/api/districts/tarva-chat/route.ts` | ~200 lines | Fetches data from localhost:4000 Tarva Chat app. Dead route. |
| `src/app/api/districts/project-room/route.ts` | ~300 lines | Fetches data from localhost:3005 Project Room app. Dead route. |

**Action:** Delete all 3 route files and remove the `src/app/api/districts/` directory entirely.

#### 4.13.4 Tarva District Hooks (3 files)

| File | Size | Reason |
|------|------|--------|
| `src/hooks/use-agent-builder-district.ts` | 55 lines | TanStack Query hook fetching `/api/districts/agent-builder`. Route will be deleted. |
| `src/hooks/use-tarva-chat-district.ts` | 96 lines | TanStack Query hook fetching `/api/districts/tarva-chat`. Route will be deleted. |
| `src/hooks/use-project-room-district.ts` | 86 lines | TanStack Query hook fetching `/api/districts/project-room`. Route will be deleted. |

#### 4.13.5 District View Scenes (6 files)

| File | Size | Reason |
|------|------|--------|
| `src/components/district-view/scenes/agent-builder-scene.tsx` | 8,278 bytes | Tarva-specific ambient scene |
| `src/components/district-view/scenes/tarva-chat-scene.tsx` | 7,045 bytes | Tarva-specific ambient scene |
| `src/components/district-view/scenes/project-room-scene.tsx` | 9,057 bytes | Tarva-specific ambient scene |
| `src/components/district-view/scenes/tarva-core-scene.tsx` | 8,198 bytes | Tarva-specific ambient scene |
| `src/components/district-view/scenes/tarva-erp-scene.tsx` | 8,620 bytes | Tarva-specific ambient scene |
| `src/components/district-view/scenes/tarva-code-scene.tsx` | 10,248 bytes | Tarva-specific ambient scene |

**Action:** Delete all 6. Create `marketing-scene.tsx` replacement. Update `scenes/index.ts`.

#### 4.13.6 Station Components (~27 Tarva-specific files)

**Directory:** `src/components/stations/`

Tarva-specific station subdirectories to remove:

| Subdirectory | Files | Reason |
|---|---|---|
| `agent-builder/` | ~8 files (index.ts, launch-station, status-station, pipeline-station, library-station, agent-list-item, dual-launch-target, pipeline-phase-bar) | Agent Builder station components |
| `tarva-chat/` | ~5 files (index.ts, chat-launch-station, chat-status-station, chat-agents-station, chat-conversations-station) | Tarva Chat station components |
| `project-room/` | ~6 files (index.ts, launch-station, status-station, runs-station, artifacts-station, governance-station) | Project Room station components |
| `tarva-core/` | ~3 files (index.ts, core-status-station, core-sessions-station) | TarvaCORE station components |
| `tarva-code/` | ~2 files (index.ts, code-status-station) | tarvaCODE station components |
| `tarva-erp/` | ~3 files (index.ts, erp-status-station, erp-manufacturing-station) | TarvaERP station components |

**Preserve:** The station framework files in root `stations/` directory (`station-panel.tsx`, `station-header.tsx`, `station-body.tsx`, `station-actions.tsx`, `station-context.tsx`, `receipt-stamp.tsx`, `use-receipt-stamp.ts`, `index.ts`, `station-panel.css`) and `template-browser/` directory -- may be useful as patterns for marketing page structure. **See Open Question Q1.**

#### 4.13.7 Evidence Ledger Support Hooks (2 files)

| File | Reason |
|------|--------|
| `src/hooks/use-faceted-filter.ts` | Imports from `evidence-ledger-types.ts`. Only used by Evidence Ledger. |
| `src/hooks/use-receipt-timeline.ts` | Imports from `evidence-ledger-types.ts`. Only used by Evidence Ledger. |

---

### 4.14 TypeScript Compiler Strategy

After renaming `DistrictId`, the TypeScript compiler becomes the primary verification tool. The approach:

1. **Modify `district.ts` first** -- change the `DistrictId` union type. This immediately surfaces every consumer as a type error.
2. **Run `pnpm typecheck`** -- the compiler reports every file with a mismatched string literal or property access.
3. **Fix file groups in order:** Core types > Stores > District components > District view > Ambient components > Page files > Hooks
4. **Run `pnpm typecheck` after each group** -- validate incrementally.
5. **Run `pnpm build` at the end** -- catches dynamic imports and route resolution issues not covered by type checking alone.
6. **Run `grep -r` scan for orphaned Tarva strings** -- catches hardcoded strings in comments, CSS, and template literals not covered by type system.

**Add `satisfies` assertions** to all `Record<DistrictId, ...>` constants to ensure compile-time completeness:
```typescript
const MARKETING_STAT_LINES = {
  'how-it-works': '3-step process',
  // ... all 6
} satisfies Record<DistrictId, string>
```

---

## 5. Acceptance Criteria

| # | Criterion | Verification Method |
|---|-----------|-------------------|
| 1 | `pnpm typecheck` passes with zero errors | CI / manual run |
| 2 | `pnpm build` completes successfully | CI / manual run |
| 3 | `pnpm lint` passes with zero errors | CI / manual run |
| 4 | No string literal `'agent-builder'`, `'tarva-chat'`, `'project-room'`, `'tarva-core'`, `'tarva-erp'`, `'tarva-code'` appears anywhere in `src/` (excluding `node_modules`, `.next`) | `grep -rn` scan |
| 5 | No string `'Tarva Launch'` appears in `src/` (excluding comments in AI prompt files, which are deferred) | `grep -rn` scan |
| 6 | The `DistrictId` type resolves to exactly: `'how-it-works' \| 'who-its-for' \| 'platform' \| 'security' \| 'pricing' \| 'get-started'` | TypeScript inspection |
| 7 | Capsule ring renders 6 capsules with correct marketing display names | Visual inspection in dev server |
| 8 | Z0 constellation view shows correct 2-letter codes (HW, WF, PL, SE, PR, GS) | Visual inspection at zoom < 0.27 |
| 9 | Clicking any capsule opens detail panel with marketing preview card (headline, bullets, CTA) | Manual interaction test on all 6 districts |
| 10 | "Get Started" capsule (ring position 5) uses amber (#F59E0B) accent color | Visual inspection |
| 11 | "Get Started" detail panel shows "Schedule a Briefing" CTA | Manual interaction test |
| 12 | All other 5 districts show "Read More" CTA linking to their `targetPage` | Manual interaction test |
| 13 | All deleted files are absent from the file tree (type libraries, API routes, hooks, evidence-ledger directory, station subdirectories, scene files) | `find` scan |
| 14 | District view overlay (morph to full-screen) renders without errors for all 6 new districts | Manual interaction test on each district |
| 15 | Ambient components (ticker, orbital readouts, bottom strip, connection paths) render without errors and show no Tarva-branded text | Visual inspection at Z1 and Z2 |
| 16 | `APP_NAME` constant equals `'Safetrekr'` | Code inspection of `src/lib/constants.ts` |
| 17 | No dead imports remain (all removed files have their import references cleaned up) | `pnpm typecheck` + `pnpm lint` |
| 18 | Command palette no longer shows "Go to Evidence Ledger" command | Manual test: open command palette, search "evidence" |
| 19 | All `Record<DistrictId, ...>` constants use `satisfies` for compile-time completeness checking | Code review |

---

## 6. Decisions Made

| # | Decision | Rationale | Alternatives Considered |
|---|----------|-----------|------------------------|
| D1 | **Keep `HealthState` and `HEALTH_STATE_MAP`** for ambient decorative use | Ambient components (enrichment store, connection paths, constellation metrics, status panels) use health states for the glowing mission-control aesthetic. Removing them would require rewriting 12+ ambient components with no user-facing benefit. | Remove entirely and use static colors. Rejected: high effort, low value, degrades visual appeal. |
| D2 | **Replace 6 district view scenes with a single `MarketingScene`** | Each Tarva scene had app-specific ambient art (data streams, node graphs, etc.). Marketing districts do not need per-district custom scenes. A shared decorative background with per-district color tinting is sufficient for launch. | Create 6 new per-district scenes. Deferred: only justified if design requires distinct per-district art. |
| D3 | **Delete (not feature-gate) Tarva station components** | The per-district station implementations are deeply coupled to Tarva app data models (`AgentBuilderDistrictData`, `ProjectRoomRun`, etc.) and have zero reuse value for marketing. The station framework files (station-panel, station-header, etc.) in the root `stations/` directory are preserved separately. | Feature-gate behind a flag. Rejected: adds dead code and maintenance burden with no path to re-enablement. |
| D4 | **Delete (not feature-gate) Evidence Ledger** | Evidence Ledger depends on receipt types, faceted filter hooks, and Tarva data flows. No marketing equivalent exists. Git history preserves everything. | Feature-gate. Rejected: same rationale as D3. |
| D5 | **Keep `sparklineData` in `CapsuleData`** as decorative | The sparkline chart on each capsule contributes to the mission-control aesthetic. Static decorative data is simpler than removing the sparkline rendering path from capsule components. | Remove sparkline from capsules. Rejected: degrades visual appeal for minimal code savings. |
| D6 | **Use placeholder marketing copy** | Content team will provide final copy in WS-B.x workstreams. This workstream establishes the data structure and renders placeholder text that validates the component architecture. | Block on final copy. Rejected: would delay all downstream workstreams. |
| D7 | **Remove `port` field from `DistrictMeta`** | No localhost dev servers to display in a marketing context. The field has no equivalent and would be `null` for all 6 districts. | Keep as `null` for all. Rejected: dead field creates confusion in the type definition. |
| D8 | **Preserve AI subsystem** (`src/lib/ai/`, ~29 files) | AI files do not import Tarva district string literals directly. They read from the generic districts store and use `DistrictId` as a type parameter. Removing or refactoring them is a separate concern with its own risk profile. | Delete now. Rejected: unnecessary risk, out of scope for district remapping. |
| D9 | **Preserve `shared-scene-primitives.tsx`** | This file (12,389 bytes) exports reusable animation primitives (`GhostText`, data stream effects, etc.) that the new `MarketingScene` component can use for ambient decoration. | Delete with the Tarva scenes. Rejected: would lose useful primitives with no benefit. |

---

## 7. Open Questions

| # | Question | Impact | Proposed Default | Owner |
|---|----------|--------|-----------------|-------|
| Q1 | Should the station framework files (`station-panel.tsx`, `station-header.tsx`, `station-body.tsx`, etc.) and `template-browser/` in `src/components/stations/` root be preserved for potential marketing page use? | Determines whether we delete the entire `stations/` directory or only the 6 Tarva subdirectories | Preserve root framework files and delete only the 6 Tarva subdirectories + `template-browser/` | Product |
| Q2 | Should `TarvaStarIcon` in `hub-center-glyph.tsx` be renamed to `SafetrekrStarIcon` or a generic `HubStarIcon`? | Cosmetic, but affects brand naming consistency | Rename to `HubStarIcon` (brand-neutral, avoids future rename if branding changes) | Engineering |
| Q3 | Do ambient connection path labels between capsules need marketing-relevant semantic content, or are they purely decorative? | If decorative, generic labels suffice. If semantic, content team input needed. | Treat as decorative. Use generic labels like `"DATA LINK 01"`, `"SYNC CHANNEL"` | Design |
| Q4 | Should the districts store (`districts.store.ts`) continue to accept live telemetry snapshots from the polling hook, or be simplified to a static data source? | Store currently expects `AppTelemetry` records from `use-telemetry.ts`. Marketing site has no live telemetry source. | Defer simplification. The enrichment cycle populates the store with decorative seed data. Removing the telemetry contract risks breaking ambient components that read from the store. | Engineering |
| Q5 | For the "Get Started" amber accent: should amber be applied to capsule border/glow only, or also to health bar, sparkline, and detail panel CTA button? | Visual design decision affecting multiple components | Apply to: capsule border glow, health bar accent, and CTA button background. Keep sparkline consistent with other capsules for visual cohesion. | Design |
| Q6 | Should `Tarva Launch` references in AI prompt templates (`src/lib/ai/narration-prompts.ts`, `src/lib/ai/camera-director/context-assembler.ts`, etc.) be updated in this workstream or deferred? | ~8 AI prompt files contain `Tarva Launch` in prompt strings. These are user-invisible (backend AI context). | Defer to a separate AI subsystem cleanup workstream. These strings do not affect the user-visible marketing site. Flag for the AI refactoring effort. | Engineering |

---

## 8. Risk Register

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|-----------|--------|------------|
| R1 | **TypeScript cascade errors** -- Changing the `DistrictId` union triggers type errors in 36+ files simultaneously. If any file is missed, `pnpm typecheck` fails. | High | Medium | Execute DistrictId rename as a single atomic commit. Use TypeScript "find all references" to enumerate every usage before starting. Fix file groups incrementally (types > stores > components > ambient > pages). Run `pnpm typecheck` after each group. |
| R2 | **Ambient component visual regression** -- Updating hardcoded district IDs in 6 ambient components may subtly break decorative animations (connection paths, orbital readouts, ticker) in ways not caught by typecheck. | Medium | Low | Visual inspection of all ambient components at Z0, Z1, Z2 zoom levels after changes. Screenshot comparison before/after. |
| R3 | **Enrichment cycle crash** -- The enrichment store builds `DistrictEnrichment` records keyed by `DistrictId`. If `SEED_VALUES` keys don't match the new `DistrictId` union, the store crashes on init. | High | High | Update `SEED_VALUES` in the same commit as the `DistrictId` type change. Add explicit `satisfies Record<DistrictId, ...>` assertion to catch mismatches at compile time. |
| R4 | **Dead import references** -- Deleted files (6 type libraries, 3 hooks, 3 API routes, 9 evidence-ledger components, 6 station subdirectories) may be imported by files not caught in the initial grep. Build fails. | Medium | Low | Run `pnpm build` after all deletions. Any unresolved imports surface as build errors. Fix iteratively. The grep analysis in Section 4.1.4 and 4.13 enumerates all known consumers. |
| R5 | **District view morph regression** -- The morph orchestrator, ring rotation, and panel positioning math are tightly coupled. If the DistrictId change introduces any mismatch in the morph state machine, the capsule-to-panel transition breaks. | Low | High | The morph system treats `DistrictId` as an opaque string for state tracking (see `morph-orchestrator.tsx` line 54: `startMorph(id)`). Risk is low. **Test all 6 districts** through full morph cycle: click capsule -> detail panel appears -> district view overlay -> close -> return to ring. |
| R6 | **Downstream blocker cascade** -- This workstream blocks WS-B.2 through WS-B.9 and WS-C.1. Any delay cascades to the majority of Phase B and Phase C. | Medium | High | Prioritize as the first workstream in Phase A. Keep scope tight: placeholder copy is acceptable. Do not block on content team deliverables. |
| R7 | **AI subsystem latent dependency** -- The AI subsystem (29 files, explicitly out of scope) may have latent assumptions about Tarva district IDs in prompt templates or string interpolation. These would not surface as type errors. | Low | Medium | Grep `src/lib/ai/` for old Tarva district string literals after the rename. Fix any found, but do not attempt a full AI subsystem refactor. Known files with `Tarva Launch` strings: `narration-prompts.ts`, `camera-director/context-assembler.ts`, `exception-prompt.ts`, `station-proposal-generator.ts`. |
| R8 | **Evidence Ledger deletion cascade** -- Evidence Ledger is referenced by 5 files beyond its own directory: `launch/page.tsx`, `command-registry.ts`, `CommandPalette.tsx`, `conditional-templates.ts`, `exception-rules.ts`, `recovery-templates.ts`, plus 2 support hooks (`use-faceted-filter.ts`, `use-receipt-timeline.ts`). Missing any of these causes build failure. | Medium | Medium | The complete consumer list is documented in Section 4.13.2. Process: delete directory, then run `pnpm build`, fix each import error. |
| R9 | **Command registry type mismatch** -- The command registry uses an `AppIdentifier` type that may be distinct from `DistrictId`. If `AppIdentifier` is defined elsewhere and includes Tarva IDs, the fix is broader than expected. | Low | Low | Verify `AppIdentifier` definition. If it is an alias for `DistrictId`, the type change flows automatically. If it is a separate union, update it to match. |
