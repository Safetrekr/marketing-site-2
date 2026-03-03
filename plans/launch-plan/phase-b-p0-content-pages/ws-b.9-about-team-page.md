# WS-B.9: About / Team Page

> **Workstream ID:** WS-B.9
> **Phase:** B -- P0 Content Pages
> **Assigned Agent:** `react-developer`
> **Status:** Draft
> **Created:** 2026-03-02
> **Last Updated:** 2026-03-02
> **Depends On:** WS-A.1 (Marketing Layout)
> **Blocks:** None
> **Resolves:** None (promoted from D-3 based on content readiness)

---

## 1. Objective

Build the `/about` page for the Safetrekr marketing site -- a trust-building page that introduces the leadership team, field expert bench, technology partners, and contact channels. The page must convey Safetrekr's credibility through real names, real credentials, and real agency affiliations, all presented within the Oblivion-HUD mission-control aesthetic.

This workstream was promoted from Phase D (WS-D.3) to Phase B because a complete reference implementation with real team data, photos, bios, and credentials already exists at the legacy marketing site (`/Users/jessetarvambp1/Sites/Safetrekr/marketing-site/about.html`). All content is extracted and documented in this SOW so the implementing agent does not need to re-read the reference file.

The page renders as a server component inside the `(marketing)` layout from WS-A.1, with a single client component for the expandable leadership bio interaction. All sections use glass-morphism card surfaces, the Safetrekr green accent system, and the spatial token vocabulary.

---

## 2. Scope

### In Scope

| # | Item | Notes |
|---|------|-------|
| 1 | `src/app/(marketing)/about/page.tsx` page component | Server component with SEO metadata; composes all sections |
| 2 | Team data module (`src/lib/data/about-team.ts`) | TypeScript-typed arrays of leaders, agencies, partners, and contact channels |
| 3 | Type definitions (`src/lib/interfaces/about-team.ts`) | `Leader`, `AgencyBadge`, `TechPartner`, `ContactChannel` interfaces |
| 4 | `LeadershipCard` client component | Glass-morphism card with photo, name, title, summary; "Learn more" triggers expandable detail |
| 5 | `LeadershipDetailModal` client component | Dialog overlay for expanded bio (owns, background) -- accessible modal with focus trap |
| 6 | `AgencyBadgeGrid` server component | 6-column responsive grid of agency badges with names and descriptions |
| 7 | `PartnerGrid` server component | Top 3 featured partners (larger cards) + remaining partners (compact grid) |
| 8 | `ContactChannels` server component | 3 contact cards with icon, label, and mailto link |
| 9 | Image asset migration | Copy photos and badges from legacy site to `public/images/people/` and `public/images/squads/` |
| 10 | Section components for Hero, Origin Story, Field Experts summary callout, and bottom CTA | Composable section wrappers for consistent spacing and styling |
| 11 | Responsive behavior | Single-column stack on mobile, 2-column on tablet, 3-column on desktop for card grids |
| 12 | Accessibility | Modal focus trap, Escape to close, ARIA attributes, image alt text, keyboard navigation |
| 13 | SEO metadata | Page title, description, OpenGraph tags, structured data (Organization + Person schemas) |
| 14 | Deferred section stubs | Commented-out placeholder sections for Advisors, Operating Principles, and Open Roles |

### Out of Scope

| # | Item | Rationale |
|---|------|-----------|
| 1 | Advisors section (active) | Content pending clearance; deferred to post-launch. Stub commented in page source. |
| 2 | Operating Principles section (active) | Deferred to post-launch. Stub commented in page source. |
| 3 | Open Roles section (active) | Deferred to post-launch. Stub commented in page source. |
| 4 | Image optimization (WebP/AVIF conversion) | WS-C.2 handles asset optimization as a cross-cutting concern |
| 5 | OG image generation | WS-C.4 handles social images |
| 6 | Analytics instrumentation | WS-C.3 handles analytics events |
| 7 | Contact form or scheduling widget | WS-A.4 handles form backend; this page links to `/contact` via bottom CTA |
| 8 | Video content or animated bios | No motion design beyond modal enter/exit transitions; keep cognitive load low |

---

## 3. Input Dependencies

| Dependency | Source | Status | Notes |
|------------|--------|--------|-------|
| Marketing layout shell | WS-A.1 (`src/app/(marketing)/layout.tsx`) | Pending | Header + footer wrap all marketing pages. About page renders inside `<main id="main-content">`. |
| Reference content (complete) | `/Users/jessetarvambp1/Sites/Safetrekr/marketing-site/about.html` [REFERENCE] | Available | Full HTML with team data, bios, photos, agency badges, partner info, contact emails. All data extracted below in Section 4.2. |
| Team photos | `/Users/jessetarvambp1/Sites/Safetrekr/marketing-site/assets/images/people/` [REFERENCE] | Available | 11 PNG files: `MikeD 1.png`, `Alan-D 1.png`, `bobby-brasher 1.png`, `jesse-o.png`, `chris-h.png`, `justin-tabb.png`, `mike-miller.png`, `joe-yin.png`, `david-l.png`, `joshua-s.png`, `keith-b.png` |
| Agency badge images | `/Users/jessetarvambp1/Sites/Safetrekr/marketing-site/assets/images/squads/` [REFERENCE] | Available | 15 PNG/JPG files. Required for this page: `Badge_of_the_United_States_Secret_Service.png`, `U.S._Navy_SEALs_Special_Warfare_insignia.png`, `640px-USSOCOM-JSOC-JCU_Seal.png`, `640px-USA_-_Special_Forces_Branch_Insignia.png` |
| Glass-morphism pattern | `src/components/districts/detail-panel.tsx` [CODEBASE] | Available | `bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]` + `border border-white/[0.08]` + ember glow shadow |
| Spatial token system | `src/styles/spatial-tokens.css` [CODEBASE] | Available | Safetrekr dark tokens: `--color-void: #061a23`, `--color-ember: #4ba467`, `--color-ember-bright: #6abf84`, `--color-text-primary: #e8f0f4`, `--color-text-secondary: #929899`. RGB: `--ember-rgb: 75, 164, 103`. |
| `cn()` utility | `src/lib/utils.ts` [CODEBASE] | Available | `clsx` + `tailwind-merge`. Import: `import { cn } from '@/lib/utils'` |
| `motion/react` | `motion` package [CODEBASE] | Available | For modal enter/exit animations. Import: `import { motion, AnimatePresence } from 'motion/react'`. NEVER `framer-motion`. |
| Lucide icons | `lucide-react` [CODEBASE] | Available | Thin-stroke icons: `Handshake`, `Rocket`, `Newspaper`, `ChevronRight`, `X`, `Shield`, `Star` |
| Next.js Image component | `next/image` [FRAMEWORK] | Available | For optimized team photo rendering with `sizes`, `placeholder`, `priority` attributes |

---

## 4. Deliverables

### 4.1 Image Asset Migration

Copy required image files from the legacy reference site to the new project's `public/images/` directory. Filenames must be normalized to lowercase-kebab-case (no spaces) to avoid URL encoding issues.

**People photos** (copy from `/Users/jessetarvambp1/Sites/Safetrekr/marketing-site/assets/images/people/` to `public/images/people/`):

| Source Filename | Target Filename | Person | Used In |
|-----------------|-----------------|--------|---------|
| `MikeD 1.png` | `mike-dawson.png` | Mike Dawson | Leadership card |
| `Alan-D 1.png` | `alan-d.png` | Alan D. | Leadership card |
| `bobby-brasher 1.png` | `bobby-brasher.png` | Bobby Brasher | Leadership card |
| `jesse-o.png` | `jesse-orrico.png` | Jesse Orrico | Partner grid (featured) |
| `chris-h.png` | `chris-heerdegen.png` | Chris Heerdegen | Partner grid (featured) |
| `justin-tabb.png` | `justin-tabb.png` | Justin Tabb | Partner grid (featured) |
| `mike-miller.png` | `mike-miller.png` | Mike Miller | Partner grid (compact) |
| `joe-yin.png` | `joe-yin.png` | Joe Yin | Partner grid (compact) |
| `david-l.png` | `david-lindahl.png` | David Lindahl | Partner grid (compact) |

**Agency badges** (copy from `/Users/jessetarvambp1/Sites/Safetrekr/marketing-site/assets/images/squads/` to `public/images/squads/`):

| Source Filename | Target Filename | Agency |
|-----------------|-----------------|--------|
| `Badge_of_the_United_States_Secret_Service.png` | `usss-badge.png` | U.S. Secret Service |
| `U.S._Navy_SEALs_Special_Warfare_insignia.png` | `navy-seals-insignia.png` | Naval Special Warfare |
| `640px-USSOCOM-JSOC-JCU_Seal.png` | `jsoc-seal.png` | Joint Special Operations |
| `640px-USA_-_Special_Forces_Branch_Insignia.png` | `army-sf-insignia.png` | U.S. Army Special Forces |

**Directories to create:**

| Directory | Purpose |
|-----------|---------|
| `public/images/people/` | Team member headshot photos |
| `public/images/squads/` | Agency badge and insignia images |

**Note on DHS and U.S. Marshals badges:** The reference site uses Material Symbols icon font (shield, security) as placeholder badges for DHS Homeland Security and U.S. Marshals Service rather than actual insignia images. In the new implementation, use thin-stroke Lucide icons (`Shield` for DHS, `ShieldCheck` for Marshals) rendered inline as SVG at 80px, styled with `text-[var(--color-ember)] opacity-80`. This maintains the visual rhythm of the badge grid without requiring additional image assets.

### 4.2 Team Data Module (`src/lib/data/about-team.ts`)

Static data module exporting all team, agency, partner, and contact information. This is the single source of truth -- the page component imports from here and never contains inline content strings.

**All data below is extracted verbatim from the reference HTML and JavaScript (`about.html` lines 529-581).**

```typescript
// src/lib/data/about-team.ts

import type {
  Leader,
  AgencyBadge,
  TechPartner,
  ContactChannel,
} from '@/lib/interfaces/about-team'

// ---------------------------------------------------------------------------
// Hero + Origin
// ---------------------------------------------------------------------------

export const ABOUT_HERO = {
  title: 'The people behind Safetrekr',
  subtitle:
    'Ex-advance (United States Secret Service) + product and ops leads. We build trip safety that works in the real world.',
} as const

export const ORIGIN_STORY =
  'We spent decades protecting people in high-risk environments\u2014from presidential details to international operations. We watched trip leaders juggle binders, spreadsheets, and group texts, trying to keep students safe with tools built for something else. We knew there had to be a better way. Safetrekr gives schools, churches, and youth organizations the same level of safety intelligence and evidence we used in the field\u2014minus the complexity. One packet, daily briefs, read-checks that prove who knew what, and an evidence file that stands up when it matters most.'

// ---------------------------------------------------------------------------
// Leadership
// ---------------------------------------------------------------------------

export const LEADERS: Leader[] = [
  {
    id: 'mike',
    name: 'Mike Dawson',
    title: 'Co-founder & Chief of Safety Operations',
    photo: '/images/people/mike-dawson.png',
    summary:
      '23 years U.S. Secret Service (Ret.). Turns field intelligence into simple trip playbooks schools can use.',
    owns: [
      'Real-world playbooks for trips (outside-the-wire)',
      'Relationships with schools, churches, and public safety',
      'Threat assessment, risk mitigation, and investigative operations',
    ],
    background: [
      '23 years with U.S. Secret Service (Senior Special Agent, Retired)',
      'Led global fraud investigations, crypto crime ops, and executive protection',
      'Guest lecturer on cryptocurrency fraud and threat finance for international law enforcement',
      'Fraud & Risk Services leadership at GeoComply (fintech, crypto, gaming)',
      'Multiple DHS Exceptional Service Gold Medals & investigative excellence awards',
    ],
  },
  {
    id: 'alan',
    name: 'Alan D.',
    title: 'Chief of Protective Intelligence',
    photo: '/images/people/alan-d.png',
    summary:
      '25 years U.S. Secret Service (Ret.). Merges protective operations with digital forensics for audit-ready evidence.',
    owns: [
      'Protective intelligence & risk: merge physical protection with DFIR (digital forensics & incident response) to harden the product\'s Evidence Binder',
      'Enterprise & insurer credibility; high-stakes customers (universities, corporates)',
      'Channel relationships (associations, training academies, major retailers)',
    ],
    background: [
      '25 years, U.S. Secret Service Special Agent (Ret.); roles include Presidential Protection, Counter-Surveillance, CAT Team Leader, FLETC Instructor',
      'NCFI (National Computer Forensics Institute): DFIR lab manager/instructor; budget & procurement lead; retired as DSAIC managing daily operations',
      'Post-USSS: Senior Risk Research Specialist, GeoComply (cyber/fraud, identity); Senior Manager, Corporate Security, The Home Depot',
      'CRISC (risk) certified; extensive experience turning investigations into prevention programs',
    ],
  },
  {
    id: 'bobby',
    name: 'Bobby Brasher',
    title: 'Co-founder & Chief of School Security',
    photo: '/images/people/bobby-brasher.png',
    summary:
      'Former Director of School Security at Brook Hill. Turns classroom and field experience into safety playbooks schools actually adopt.',
    owns: [
      'K\u201312 & faith-based safety playbooks; policy templates schools actually adopt',
      'Administrator relationships (Brook Hill network influences 400+ schools); rapid pilots \u2192 policy roll-outs',
      'De-escalation training, drills, audits; evidence standards that pass board/insurer review',
    ],
    background: [
      'Former Director of School Security, The Brook Hill School (private, international boarding)',
      '6 years sworn law enforcement (police officer & sheriff\'s deputy); POST certified',
      'DOJ-endorsed de-escalation instructor (law enforcement, healthcare, educators); USSS School Threat Assessment trained',
      'Samaritan\'s Purse International Security Team; consulted schools/churches in Latin America and Africa',
      'Worked security detail at the 2024 Republican National Convention (Milwaukee)',
      'Selected highlights: School Safety Specialist; TCOLE Police Academy & Firearms Instructor; Homeland Security/FEMA SAR; FBI Child-Abduction Rapid Response; Homeland Security Bombing Prevention (IED classification); Texas LTC & DPS PSB Level-II/III/Plain-clothes; Certified Personal Protection Officer',
    ],
  },
]

// ---------------------------------------------------------------------------
// Field Experts -- Agency Badge Grid
// ---------------------------------------------------------------------------

export const FIELD_EXPERTS_INTRO =
  'Safetrekr\'s analyst bench includes approximately 20 former federal agents and special operators\u2014each with hundreds of domestic and overseas advances, protective operations, and high-risk missions. They review trips, curate safety intel, and export evidence binders that meet board and insurer standards.'

export const FIELD_EXPERTS_CALLOUT =
  'All field experts have conducted protective operations alongside U.S. military special operations forces (SOCOM, JSOC, SFOD) across domestic and international venues. They translate decades of advance work, threat assessment, and incident response into trip packets and daily briefs that schools, churches, and youth organizations can actually use.'

export const AGENCY_BADGES: AgencyBadge[] = [
  {
    id: 'usss',
    name: 'U.S. Secret Service',
    description: 'Presidential & VP Protection, Diplomatic Security, Counter Assault Team',
    image: '/images/squads/usss-badge.png',
    imageType: 'file',
  },
  {
    id: 'dhs',
    name: 'DHS Homeland Security',
    description: 'HSI Special Agents, Investigations',
    image: null,
    imageType: 'icon',
    iconName: 'Shield',
  },
  {
    id: 'usms',
    name: 'U.S. Marshals Service',
    description: 'Special Operations Group (SOG)',
    image: null,
    imageType: 'icon',
    iconName: 'ShieldCheck',
  },
  {
    id: 'nsw',
    name: 'Naval Special Warfare',
    description: 'SEAL Teams, DEVGRU',
    image: '/images/squads/navy-seals-insignia.png',
    imageType: 'file',
  },
  {
    id: 'jsoc',
    name: 'Joint Special Operations',
    description: 'JSOC, SOCOM collaborative ops',
    image: '/images/squads/jsoc-seal.png',
    imageType: 'file',
  },
  {
    id: 'arsf',
    name: 'U.S. Army Special Forces',
    description: 'Green Berets, SFOD',
    image: '/images/squads/army-sf-insignia.png',
    imageType: 'file',
  },
]

// ---------------------------------------------------------------------------
// Technology & Delivery Partners
// ---------------------------------------------------------------------------

export const FEATURED_PARTNERS: TechPartner[] = [
  {
    id: 'jesse-orrico',
    name: 'Jesse Orrico',
    domain: 'Business & Product',
    photo: '/images/people/jesse-orrico.png',
    tier: 'featured',
  },
  {
    id: 'chris-heerdegen',
    name: 'Chris Heerdegen',
    domain: 'Ops & Monetization',
    photo: '/images/people/chris-heerdegen.png',
    tier: 'featured',
  },
  {
    id: 'justin-tabb',
    name: 'Justin Tabb',
    domain: 'AI & Emerging-Tech',
    photo: '/images/people/justin-tabb.png',
    tier: 'featured',
  },
]

export const ADDITIONAL_PARTNERS: TechPartner[] = [
  {
    id: 'mike-miller',
    name: 'Mike Miller',
    domain: 'Dev/Sec/Ops',
    photo: '/images/people/mike-miller.png',
    tier: 'standard',
  },
  {
    id: 'joe-yin',
    name: 'Joe Yin',
    domain: 'PMO Director',
    photo: '/images/people/joe-yin.png',
    tier: 'standard',
  },
  {
    id: 'david-lindahl',
    name: 'David Lindahl',
    domain: 'AIO/DM Architecture',
    photo: '/images/people/david-lindahl.png',
    tier: 'standard',
  },
]

export const PARTNERS_SUBTITLE =
  'These leaders augment Safetrekr\'s build velocity and credibility across product, AI, security, and PMO.'

// ---------------------------------------------------------------------------
// Contact Channels
// ---------------------------------------------------------------------------

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: 'partnerships',
    label: 'Partnerships',
    email: 'alan@safetrekr.com',
    iconName: 'Handshake',
  },
  {
    id: 'pilots',
    label: 'Pilots & Customer Delivery',
    email: 'team@safetrekr.com',
    iconName: 'Rocket',
  },
  {
    id: 'media',
    label: 'Media & Investors',
    email: 'founders@safetrekr.com',
    iconName: 'Newspaper',
  },
]

// ---------------------------------------------------------------------------
// Bottom CTA
// ---------------------------------------------------------------------------

export const BOTTOM_CTA = {
  headline: 'Ready to protect your next trip?',
  buttonLabel: 'Schedule a Briefing',
  href: '/contact',
} as const
```

### 4.3 Type Definitions (`src/lib/interfaces/about-team.ts`)

```typescript
// src/lib/interfaces/about-team.ts

/** Leadership team member with expandable bio detail. */
export interface Leader {
  /** Unique identifier for modal targeting and key prop */
  id: string
  /** Full display name */
  name: string
  /** Professional title */
  title: string
  /** Path to headshot photo in /public (relative to domain root) */
  photo: string
  /** 1-sentence summary shown on the card face */
  summary: string
  /** Bullet list: "What [FirstName] owns" -- responsibilities */
  owns: string[]
  /** Bullet list: career highlights and credentials */
  background: string[]
}

/** Agency badge entry in the Field Experts section. */
export interface AgencyBadge {
  id: string
  /** Agency display name */
  name: string
  /** Short description of relevant units/roles */
  description: string
  /** Path to badge image, or null if using icon fallback */
  image: string | null
  /** Whether the badge renders from a file or a Lucide icon */
  imageType: 'file' | 'icon'
  /** Lucide icon component name (only when imageType is 'icon') */
  iconName?: string
}

/** Technology or delivery partner. */
export interface TechPartner {
  id: string
  name: string
  /** Professional domain / role label */
  domain: string
  /** Path to headshot photo in /public */
  photo: string
  /** Display tier: 'featured' gets larger card in 3-col grid; 'standard' gets compact card */
  tier: 'featured' | 'standard'
}

/** Contact channel with mailto link. */
export interface ContactChannel {
  id: string
  /** Channel label (e.g., "Partnerships") */
  label: string
  /** Email address */
  email: string
  /** Lucide icon component name */
  iconName: string
}
```

### 4.4 Page Component (`src/app/(marketing)/about/page.tsx`)

Server component that composes all sections. The page itself is a server component for SEO; the expandable leadership bio interaction is isolated to a client component boundary (`LeadershipCard` + `LeadershipDetailModal`).

**Component signature:**

```typescript
// src/app/(marketing)/about/page.tsx

import type { Metadata } from 'next'
import Image from 'next/image'
import {
  ABOUT_HERO,
  ORIGIN_STORY,
  LEADERS,
  FIELD_EXPERTS_INTRO,
  FIELD_EXPERTS_CALLOUT,
  AGENCY_BADGES,
  FEATURED_PARTNERS,
  ADDITIONAL_PARTNERS,
  PARTNERS_SUBTITLE,
  CONTACT_CHANNELS,
  BOTTOM_CTA,
} from '@/lib/data/about-team'
import { LeadershipSection } from '@/components/marketing/about/leadership-section'
import { AgencyBadgeGrid } from '@/components/marketing/about/agency-badge-grid'
import { PartnerGrid } from '@/components/marketing/about/partner-grid'
import { ContactChannels } from '@/components/marketing/about/contact-channels'

export const metadata: Metadata = {
  title: 'About | Safetrekr',
  description:
    'Meet the people behind Safetrekr. Ex-advance (United States Secret Service) + product and ops leads building trip safety that works in the real world.',
  openGraph: {
    title: 'About | Safetrekr',
    description:
      'Ex-advance (Secret Service) + product and ops leads. We build trip safety that works in the real world.',
    type: 'website',
    url: 'https://safetrekr.com/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Safetrekr',
    description:
      'Ex-advance (Secret Service) + product and ops leads building trip safety that works.',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {/* Origin Story Section */}
      {/* Leadership Section */}
      {/* Field Experts Section */}
      {/* Technology & Delivery Partners Section */}
      {/* Contact Section */}
      {/* Bottom CTA Section */}
    </div>
  )
}
```

**Section layout pattern** (each section follows this structure):

```tsx
<section className="relative py-20 md:py-28">
  <div className="mx-auto max-w-6xl px-6">
    {/* Section header */}
    <div className="mb-12 text-center md:mb-16">
      <h2 className="font-sans text-2xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-3xl">
        {sectionTitle}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)]">
          {subtitle}
        </p>
      )}
    </div>
    {/* Section content */}
  </div>
</section>
```

**Alternating section backgrounds:** Odd sections use `bg-transparent` (inherits void from body). Even sections use `bg-white/[0.02]` to create subtle visual separation -- the same pattern used in the reference HTML's `.st-marketing-section-alt` class. Border separators are omitted in favor of the background difference.

**Hero section specifics:**

```tsx
<section className="relative flex min-h-[50vh] items-center justify-center py-24 md:py-32">
  <div className="mx-auto max-w-3xl px-6 text-center">
    <h1 className="font-sans text-3xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-5xl">
      {ABOUT_HERO.title}
    </h1>
    <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)] md:text-xl">
      {ABOUT_HERO.subtitle}
    </p>
  </div>
</section>
```

**Origin Story section specifics:**

```tsx
<section className="relative bg-white/[0.02] py-20 md:py-28">
  <div className="mx-auto max-w-3xl px-6">
    <div className="mb-12 text-center">
      <h2 className="font-sans text-2xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-3xl">
        Why we started Safetrekr
      </h2>
    </div>
    <p className="text-center text-lg leading-[1.8] text-[var(--color-text-secondary)]">
      {ORIGIN_STORY}
    </p>
  </div>
</section>
```

### 4.5 Leadership Card Component (`src/components/marketing/about/leadership-card.tsx`)

Client component (`'use client'`) implementing a glass-morphism card with photo, name, title, summary, and a "Learn more" trigger.

**Component signature:**

```typescript
'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { Leader } from '@/lib/interfaces/about-team'

interface LeadershipCardProps {
  leader: Leader
  onLearnMore: (leaderId: string) => void
}

export function LeadershipCard({ leader, onLearnMore }: LeadershipCardProps) {
  // ...
}
```

**Visual treatment:**

```tsx
<article
  className={cn(
    'group flex cursor-pointer flex-col overflow-hidden rounded-2xl',
    // Glass material (matches detail-panel.tsx canonical pattern)
    'bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]',
    'border border-white/[0.08]',
    // Hover lift
    'transition-all duration-200',
    'hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)]',
    // Focus
    'focus-visible:outline-2 focus-visible:outline-offset-2',
    'focus-visible:outline-[var(--color-ember-bright)]',
  )}
  role="button"
  tabIndex={0}
  aria-label={`Learn more about ${leader.name}, ${leader.title}`}
  onClick={() => onLearnMore(leader.id)}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onLearnMore(leader.id)
    }
  }}
>
  {/* Photo */}
  <div className="relative h-[300px] w-full overflow-hidden">
    <Image
      src={leader.photo}
      alt={`Portrait of ${leader.name}`}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
    />
  </div>

  {/* Content */}
  <div className="flex flex-1 flex-col p-6">
    <h3 className="font-sans text-lg font-bold text-[var(--color-text-primary)]">
      {leader.name}
    </h3>
    <p className="mt-1 text-sm font-semibold italic text-[var(--color-ember)]">
      {leader.title}
    </p>
    <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
      {leader.summary}
    </p>

    {/* Learn more indicator */}
    <div className="mt-4 flex items-center justify-end">
      <span className="text-sm font-semibold text-[var(--color-ember)] transition-colors group-hover:text-[var(--color-ember-bright)]">
        <span className="mr-1">&rarr;</span> Learn more
      </span>
    </div>
  </div>
</article>
```

**Responsive grid:** The parent `LeadershipSection` renders cards in a responsive grid:

```tsx
<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
  {LEADERS.map((leader) => (
    <LeadershipCard
      key={leader.id}
      leader={leader}
      onLearnMore={handleLearnMore}
    />
  ))}
</div>
```

### 4.6 Leadership Detail Modal (`src/components/marketing/about/leadership-detail-modal.tsx`)

Client component (`'use client'`) implementing an accessible dialog overlay for expanded leadership bios. Uses `motion/react` for enter/exit animation.

**Component signature:**

```typescript
'use client'

import { useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Leader } from '@/lib/interfaces/about-team'

interface LeadershipDetailModalProps {
  leader: Leader | null
  onClose: () => void
}

export function LeadershipDetailModal({ leader, onClose }: LeadershipDetailModalProps) {
  // ...
}
```

**Accessibility requirements:**

- `role="dialog"` on the modal container
- `aria-modal="true"` to indicate modal behavior
- `aria-label` set to `"Details about {leader.name}"`
- Focus trap: on open, focus moves to the close button; Tab/Shift+Tab cycles within modal elements only
- Escape key closes the modal (via `useEffect` keydown listener)
- Clicking the backdrop (outside the modal content) closes the modal
- On close, focus returns to the triggering `LeadershipCard` element
- `body` scroll is locked while modal is open (`overflow: hidden` on `document.body`)

**Visual treatment:**

```tsx
<AnimatePresence>
  {leader && (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Details about ${leader.name}`}
        className={cn(
          'fixed inset-x-4 top-[10vh] z-50 mx-auto max-h-[80vh] max-w-2xl overflow-y-auto rounded-2xl',
          // Glass material -- slightly more opaque for readability
          'bg-[var(--color-deep)]/95 backdrop-blur-[24px] backdrop-saturate-[130%]',
          'border border-white/[0.08]',
          'shadow-[0_20px_60px_rgba(0,0,0,0.3)]',
          'p-8 md:p-10',
        )}
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className={cn(
            'absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full',
            'bg-white/[0.06] hover:bg-white/[0.12]',
            'border border-white/[0.08]',
            'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
            'transition-all duration-200',
            'focus-visible:outline-2 focus-visible:outline-offset-2',
            'focus-visible:outline-[var(--color-ember-bright)]',
          )}
          aria-label={`Close details about ${leader.name}`}
        >
          <X size={16} aria-hidden="true" />
        </button>

        {/* Header: photo + name + title */}
        <div className="flex items-start gap-4 md:gap-6">
          <div className="relative h-[120px] w-[120px] flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={leader.photo}
              alt={`Portrait of ${leader.name}`}
              fill
              sizes="120px"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-sans text-xl font-bold text-[var(--color-text-primary)] md:text-2xl">
              {leader.name}
            </h2>
            <p className="mt-1 text-base font-semibold italic text-[var(--color-ember)]">
              {leader.title}
            </p>
          </div>
        </div>

        {/* Owns section */}
        <div className="mt-8">
          <h3 className="font-sans text-lg font-bold text-[var(--color-text-primary)]">
            What {leader.name.split(' ')[0]} owns
          </h3>
          <ul className="mt-4 space-y-2">
            {leader.owns.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-base leading-relaxed text-[var(--color-text-secondary)]"
              >
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-ember)]" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Background section */}
        <div className="mt-8">
          <h3 className="font-sans text-lg font-bold text-[var(--color-text-primary)]">
            Background
          </h3>
          <ul className="mt-4 space-y-2">
            {leader.background.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-base leading-relaxed text-[var(--color-text-secondary)]"
              >
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-ember)]" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>
```

### 4.7 Leadership Section Wrapper (`src/components/marketing/about/leadership-section.tsx`)

Client component (`'use client'`) that composes the leadership cards grid and manages modal state (which leader is currently expanded). This component is the client boundary -- the page server component imports it and passes the `LEADERS` array as a prop.

```typescript
'use client'

import { useState, useCallback } from 'react'
import type { Leader } from '@/lib/interfaces/about-team'
import { LeadershipCard } from './leadership-card'
import { LeadershipDetailModal } from './leadership-detail-modal'

interface LeadershipSectionProps {
  leaders: Leader[]
}

export function LeadershipSection({ leaders }: LeadershipSectionProps) {
  const [activeLeader, setActiveLeader] = useState<Leader | null>(null)

  const handleLearnMore = useCallback(
    (leaderId: string) => {
      const leader = leaders.find((l) => l.id === leaderId) ?? null
      setActiveLeader(leader)
    },
    [leaders],
  )

  const handleClose = useCallback(() => {
    setActiveLeader(null)
  }, [])

  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {leaders.map((leader) => (
          <LeadershipCard
            key={leader.id}
            leader={leader}
            onLearnMore={handleLearnMore}
          />
        ))}
      </div>
      <LeadershipDetailModal leader={activeLeader} onClose={handleClose} />
    </>
  )
}
```

### 4.8 Agency Badge Grid (`src/components/marketing/about/agency-badge-grid.tsx`)

Server component rendering the 6-column badge grid. Badges with `imageType: 'file'` render via `next/image`; badges with `imageType: 'icon'` render a Lucide icon.

**Component signature:**

```typescript
// src/components/marketing/about/agency-badge-grid.tsx

import Image from 'next/image'
import { Shield, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AgencyBadge } from '@/lib/interfaces/about-team'

// Map icon name strings to Lucide components
const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Shield,
  ShieldCheck,
}

interface AgencyBadgeGridProps {
  badges: AgencyBadge[]
}

export function AgencyBadgeGrid({ badges }: AgencyBadgeGridProps) {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
      {badges.map((badge) => (
        <div key={badge.id} className="flex flex-col items-center text-center">
          {/* Badge visual */}
          <div className="mb-3 flex h-[100px] w-[100px] items-center justify-center">
            {badge.imageType === 'file' && badge.image ? (
              <Image
                src={badge.image}
                alt={`${badge.name} insignia`}
                width={90}
                height={90}
                className="object-contain"
              />
            ) : (
              (() => {
                const IconComponent = ICON_MAP[badge.iconName ?? '']
                return IconComponent ? (
                  <IconComponent
                    size={80}
                    className="text-[var(--color-ember)] opacity-80"
                  />
                ) : null
              })()
            )}
          </div>
          {/* Name */}
          <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">
            {badge.name}
          </h4>
          {/* Description */}
          <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
            {badge.description}
          </p>
        </div>
      ))}
    </div>
  )
}
```

**Combined Expertise callout** (rendered in the page component, below the badge grid):

```tsx
<div
  className={cn(
    'mx-auto mt-12 max-w-3xl rounded-xl p-6',
    'border border-[rgba(var(--ember-rgb),0.1)]',
    'bg-[rgba(var(--ember-rgb),0.05)]',
  )}
>
  <p className="text-center text-sm leading-[1.8] text-[var(--color-text-secondary)]">
    <strong className="text-[var(--color-text-primary)]">Combined expertise:</strong>{' '}
    {FIELD_EXPERTS_CALLOUT}
  </p>
</div>
```

### 4.9 Partner Grid (`src/components/marketing/about/partner-grid.tsx`)

Server component rendering technology and delivery partners in two tiers: featured partners in a 3-column grid with larger cards (photo 64px, body text), and additional partners in a responsive auto-fit grid with compact cards (photo 56px, smaller text).

**Component signature:**

```typescript
// src/components/marketing/about/partner-grid.tsx

import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { TechPartner } from '@/lib/interfaces/about-team'

interface PartnerGridProps {
  featured: TechPartner[]
  additional: TechPartner[]
}

export function PartnerGrid({ featured, additional }: PartnerGridProps) {
  return (
    <div>
      {/* Featured partners -- 3 col */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} size="large" />
        ))}
      </div>

      {/* Additional partners -- auto-fit compact grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {additional.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} size="compact" />
        ))}
      </div>
    </div>
  )
}
```

**Partner card visual treatment:**

```tsx
function PartnerCard({
  partner,
  size,
}: {
  partner: TechPartner
  size: 'large' | 'compact'
}) {
  const photoSize = size === 'large' ? 64 : 56
  return (
    <div
      className={cn(
        'rounded-xl p-4',
        'bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]',
        'border border-white/[0.08]',
      )}
    >
      <div className="flex items-center gap-3">
        <Image
          src={partner.photo}
          alt={`Portrait of ${partner.name}`}
          width={photoSize}
          height={photoSize}
          className="flex-shrink-0 rounded-lg object-cover"
        />
        <div>
          <h4
            className={cn(
              'font-semibold text-[var(--color-text-primary)]',
              size === 'large' ? 'text-base' : 'text-sm',
            )}
          >
            {partner.name}
          </h4>
          <p
            className={cn(
              'text-[var(--color-text-secondary)]',
              size === 'large' ? 'text-sm' : 'text-xs',
            )}
          >
            {partner.domain}
          </p>
        </div>
      </div>
    </div>
  )
}
```

### 4.10 Contact Channels (`src/components/marketing/about/contact-channels.tsx`)

Server component rendering 3 contact cards with icon, label, and mailto link.

```typescript
// src/components/marketing/about/contact-channels.tsx

import { Handshake, Rocket, Newspaper } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ContactChannel } from '@/lib/interfaces/about-team'

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Handshake,
  Rocket,
  Newspaper,
}

interface ContactChannelsProps {
  channels: ContactChannel[]
}

export function ContactChannels({ channels }: ContactChannelsProps) {
  return (
    <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {channels.map((channel) => {
        const Icon = ICON_MAP[channel.iconName]
        return (
          <div
            key={channel.id}
            className={cn(
              'flex flex-col items-center rounded-xl p-6 text-center',
              'bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]',
              'border border-white/[0.08]',
            )}
          >
            {Icon && (
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.06]">
                <Icon size={24} className="text-[var(--color-ember)]" />
              </div>
            )}
            <h4 className="text-base font-semibold text-[var(--color-text-primary)]">
              {channel.label}
            </h4>
            <a
              href={`mailto:${channel.email}`}
              className={cn(
                'mt-2 text-sm text-[var(--color-ember)]',
                'underline-offset-4 hover:underline',
                'focus-visible:outline-2 focus-visible:outline-offset-2',
                'focus-visible:outline-[var(--color-ember-bright)]',
              )}
            >
              {channel.email}
            </a>
          </div>
        )
      })}
    </div>
  )
}
```

### 4.11 Bottom CTA Section

Rendered directly in the page component, not extracted to a separate component (it is page-specific, not reused).

```tsx
<section className="relative py-20 md:py-28">
  <div className="mx-auto max-w-2xl px-6 text-center">
    <h2 className="font-sans text-2xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-3xl">
      {BOTTOM_CTA.headline}
    </h2>
    <div className="mt-8">
      <a
        href={BOTTOM_CTA.href}
        className={cn(
          'inline-flex items-center rounded-lg px-8 py-3',
          'bg-[var(--color-ember)] text-base font-semibold text-[var(--color-void)]',
          'transition-all duration-200',
          'hover:bg-[var(--color-ember-bright)]',
          'focus-visible:outline-2 focus-visible:outline-offset-2',
          'focus-visible:outline-[var(--color-ember-bright)]',
          // Breathing glow (from WS-A.1 marketing.css: mkt-cta-breathe)
          'mkt-cta-breathe',
        )}
      >
        {BOTTOM_CTA.buttonLabel}
      </a>
    </div>
  </div>
</section>
```

### 4.12 Deferred Sections

Three sections are pre-drafted in the reference file but explicitly deferred to post-launch. Include them as HTML comments in the page component source so they can be enabled by removing the comment markers. Each comment block should include:

1. A `TODO(post-launch):` label
2. The section's purpose
3. The data keys that would need to be added to `about-team.ts`

```tsx
{/* TODO(post-launch): Advisors Section
    Enable when advisor names are cleared for public display.
    Data: Add ADVISORS array to about-team.ts with interface Advisor { title, domain, iconName }.
    Reference: about.html lines 299-351 (5 advisor cards: K-12 Safety Director,
    University Study-Abroad Leader, Diocesan Risk Advisor, Insurance/Risk Partner,
    Public Safety & Legal) */}

{/* TODO(post-launch): Operating Principles Section
    Enable when brand team approves final copy.
    Data: Add OPERATING_PRINCIPLES array to about-team.ts.
    Reference: about.html lines 353-414 (5 principles: Field-true first,
    Proof beats promises, Low noise, Simple wins, Privacy by default) */}

{/* TODO(post-launch): Open Roles Section
    Enable when hiring pipeline is active.
    Data: Add OPEN_ROLES array to about-team.ts with interface OpenRole { title, summary, iconName }.
    Reference: about.html lines 416-457 (3 roles: Senior Full-Stack Engineer,
    Safety Analyst, Customer Delivery Lead. Apply: founders@safetrekr.com) */}
```

### 4.13 Structured Data (JSON-LD)

Include structured data in the page for SEO. The page component renders a `<script type="application/ld+json">` block in its return body.

**Organization schema:**

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Safetrekr",
  "url": "https://safetrekr.com",
  "description": "Trip safety intelligence for schools, churches, and youth organizations.",
  "founders": [
    {
      "@type": "Person",
      "name": "Mike Dawson",
      "jobTitle": "Co-founder & Chief of Safety Operations"
    },
    {
      "@type": "Person",
      "name": "Bobby Brasher",
      "jobTitle": "Co-founder & Chief of School Security"
    }
  ],
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "contactType": "partnerships",
      "email": "alan@safetrekr.com"
    },
    {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "team@safetrekr.com"
    },
    {
      "@type": "ContactPoint",
      "contactType": "media",
      "email": "founders@safetrekr.com"
    }
  ]
}
```

Render this in the page component:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(organizationSchema),
  }}
/>
```

The schema object should be defined in a `const` within the page component or extracted to a helper in `src/lib/data/about-team.ts` if the pattern is reused on other pages.

### 4.14 Component File Manifest

Complete list of all new files to be created:

| # | File Path | Type | Directive | Dependencies |
|---|-----------|------|-----------|--------------|
| 1 | `src/app/(marketing)/about/page.tsx` | Server component | -- | All data from `about-team.ts`, all about section components, `next/image`, Metadata type |
| 2 | `src/lib/interfaces/about-team.ts` | Type definitions | -- | None |
| 3 | `src/lib/data/about-team.ts` | Static data module | -- | `about-team` interfaces |
| 4 | `src/components/marketing/about/leadership-section.tsx` | Client component | `'use client'` | `LeadershipCard`, `LeadershipDetailModal`, `Leader` type |
| 5 | `src/components/marketing/about/leadership-card.tsx` | Client component | `'use client'` | `next/image`, `cn`, `Leader` type |
| 6 | `src/components/marketing/about/leadership-detail-modal.tsx` | Client component | `'use client'` | `motion/react`, `lucide-react` (X), `next/image`, `cn`, `Leader` type |
| 7 | `src/components/marketing/about/agency-badge-grid.tsx` | Server component | -- | `next/image`, `lucide-react` (Shield, ShieldCheck), `cn`, `AgencyBadge` type |
| 8 | `src/components/marketing/about/partner-grid.tsx` | Server component | -- | `next/image`, `cn`, `TechPartner` type |
| 9 | `src/components/marketing/about/contact-channels.tsx` | Server component | -- | `lucide-react` (Handshake, Rocket, Newspaper), `cn`, `ContactChannel` type |
| 10 | `src/components/marketing/about/index.ts` | Barrel export | -- | Re-exports all about section components |

**New directories:**

| Directory | Purpose |
|-----------|---------|
| `src/components/marketing/about/` | About page section components |
| `src/lib/data/` | Static data modules (new directory if not existing) |
| `public/images/people/` | Team member headshot photos (directory exists but needs new files) |
| `public/images/squads/` | Agency badge and insignia images (new directory) |

**Image files to copy (9 photos + 4 badges = 13 files):**

See Section 4.1 for the complete migration manifest.

**Total new TypeScript/TSX files: 10**
**Total new image files: 13**

---

## 5. Acceptance Criteria

| ID | Criterion | Verification Method |
|----|-----------|---------------------|
| AC-1 | `/about` route resolves and renders inside the marketing layout (header visible above, footer visible below, WS-A.1 shell intact) | Manual: navigate to `/about` in dev server; verify header and footer presence |
| AC-2 | Hero section displays the correct title ("The people behind Safetrekr") and subtitle | Manual: visual inspection |
| AC-3 | "Why we started Safetrekr" origin story section renders the full origin paragraph with no truncation | Manual: compare rendered text against `ORIGIN_STORY` constant |
| AC-4 | Three leadership cards render in a 3-column grid on desktop (>= 1024px), 2-column on tablet (768-1023px), single column on mobile (< 768px) | Manual: resize browser at each breakpoint; verify column count |
| AC-5 | Each leadership card shows photo, name, title (in green/ember), summary text, and "Learn more" affordance | Manual: inspect each of the 3 cards |
| AC-6 | Clicking a leadership card (or pressing Enter/Space when focused) opens a modal overlay with expanded bio | Manual: click Mike Dawson card; verify modal opens with "What Mike owns" and "Background" sections |
| AC-7 | Leadership modal is accessible: has `role="dialog"`, `aria-modal="true"`, focus moves to close button on open, Escape key closes, backdrop click closes, focus returns to triggering card on close | Manual + DevTools: test keyboard flow; inspect ARIA attributes |
| AC-8 | Leadership modal body scroll is locked while open (no background scroll) | Manual: open modal on scrollable page; attempt to scroll background |
| AC-9 | Agency badge grid renders 6 items in a responsive grid: 6-col on desktop (>= 1024px), 3-col on tablet (>= 640px), 2-col on mobile | Manual: resize and count columns at each breakpoint |
| AC-10 | Agency badges with image files (USSS, Navy SEALs, JSOC, Army SF) render actual badge images; DHS and Marshals render Lucide icon fallbacks | Manual: visually verify all 6 badges render correctly |
| AC-11 | "Combined expertise" callout box renders below the badge grid with green-tinted border and background | Manual: verify visual treatment matches spec |
| AC-12 | Technology & Delivery Partners section renders 3 featured partners in larger cards and 3 additional partners in compact cards | Manual: count cards in each tier; verify photo sizes (64px featured, 56px compact) |
| AC-13 | Contact section renders 3 cards (Partnerships, Pilots & Customer Delivery, Media & Investors) with correct email addresses as `mailto:` links | Manual: verify each card; click email links; confirm mailto behavior |
| AC-14 | Bottom CTA renders "Schedule a Briefing" button linking to `/contact` with the `mkt-cta-breathe` glow animation class | Manual: verify link target and visual glow effect |
| AC-15 | All images have meaningful `alt` text (e.g., "Portrait of Mike Dawson", "U.S. Secret Service insignia") | DevTools: inspect all `<img>` elements for alt attributes |
| AC-16 | All interactive elements (leadership cards, modal close button, email links, CTA button) have visible focus indicators: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]` | Manual: Tab through all interactive elements; verify focus rings |
| AC-17 | Page metadata renders correct `<title>` ("About | Safetrekr"), `<meta name="description">`, and OpenGraph tags | DevTools: inspect `<head>` elements |
| AC-18 | JSON-LD structured data (`application/ld+json`) renders with Organization schema including founders and contact points | DevTools: inspect `<script type="application/ld+json">` content; validate with Google Rich Results Test |
| AC-19 | Deferred sections (Advisors, Operating Principles, Open Roles) exist as `{/* TODO(post-launch): ... */}` comments in the page source -- not rendered in the DOM | Code review: verify comments exist; DevTools: verify no DOM elements for deferred sections |
| AC-20 | All glass-morphism surfaces use the canonical pattern from `detail-panel.tsx`: `bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]` + `border border-white/[0.08]` | Code review: verify CSS classes on all card components |
| AC-21 | Page uses ONLY spatial token CSS variables -- no hardcoded hex colors in component files | Code review: grep for hex color values (`#[0-9a-fA-F]`) in about page components; expect 0 results |
| AC-22 | No `import` from `'framer-motion'` anywhere -- only `'motion/react'` | Code review: `grep -r "framer-motion" src/components/marketing/about/` returns 0 results |
| AC-23 | `pnpm typecheck` passes with zero errors after all files are created | CLI: run `pnpm typecheck` |
| AC-24 | `pnpm lint` passes with zero errors after all files are created | CLI: run `pnpm lint` |
| AC-25 | `pnpm build` completes successfully | CLI: run `pnpm build` |
| AC-26 | All 13 image assets are present in `public/images/people/` and `public/images/squads/` with normalized filenames | CLI: `ls public/images/people/ public/images/squads/`; verify filenames match Section 4.1 manifest |
| AC-27 | Page renders correctly with `prefers-reduced-motion: reduce` enabled -- modal transitions are instant, CTA glow is static | Manual: enable reduced motion in OS settings; verify behavior |

---

## 6. Decisions Made

| # | Decision | Rationale | Alternatives Considered |
|---|----------|-----------|------------------------|
| D-1 | Page component is a server component; only the leadership interaction (card + modal) is a client component | Maximizes server-rendered HTML for SEO and initial paint performance. The agency badge grid, partner grid, and contact channels need no client-side interactivity and benefit from zero-JS rendering. | Entire page as client component (unnecessary JS bundle, worse SEO); every section as client component (wasteful) |
| D-2 | Leadership bio detail uses a modal overlay, not inline expand/collapse | Modal provides more vertical space for the substantial bios (3-6 bullet points per section). Inline expansion would push subsequent cards down, causing layout shift. Modal also follows the reference site's existing UX pattern. | Inline accordion expand (layout shift, harder to read long bios); separate detail page per person (over-engineering for 3 people); sheet/drawer from side (unfamiliar pattern for team pages) |
| D-3 | Team data lives in a static TypeScript module (`src/lib/data/about-team.ts`), not in a CMS or API | Team data changes infrequently (personnel updates, not daily). Static data ensures zero runtime latency, full type safety, and no external dependency for a launch-critical page. Migration to a CMS can happen post-launch if edit frequency increases. | Supabase table (adds API call, auth complexity for public page); MDX per person (over-engineering); inline in component (unstructured, untestable) |
| D-4 | Image filenames are normalized to lowercase-kebab-case during migration | Original filenames contain spaces (`MikeD 1.png`, `bobby-brasher 1.png`) which cause URL encoding issues and are error-prone in path strings. Normalizing once at migration time prevents bugs downstream. | Keep original filenames (URL encoding issues); numeric IDs (`person-1.png`) -- loses human readability |
| D-5 | Agency badges without image files (DHS, U.S. Marshals) use Lucide icon fallbacks, not placeholder images | The reference site used Material Symbols font icons for these two agencies, indicating no official badge assets are available. Lucide icons are already in the project dependency tree and provide consistent thin-stroke aesthetic. | Create custom SVG badges (design effort, accuracy concerns); use no visual for those agencies (breaks grid rhythm); use a generic badge shape (misleading) |
| D-6 | About page components are namespaced under `src/components/marketing/about/` | Follows the codebase convention of domain-specific component directories (`districts/`, `spatial/`, `ambient/`). Keeps about-specific components discoverable and isolates them from other marketing page components. | Flat in `src/components/marketing/` (namespace pollution as pages accumulate); co-located in route directory (Next.js discourages this for shared component patterns) |
| D-7 | Contact channels use `mailto:` links, not an inline contact form | The contact section on the about page serves as a directory of email addresses, not a form submission endpoint. The dedicated `/contact` page (WS-A.4) handles form-based contact. This avoids duplicating form infrastructure. | Inline forms per channel (scope creep, duplicates WS-A.4); click-to-copy (less accessible, confusing on mobile) |
| D-8 | Deferred sections are TSX comments (`{/* TODO */}`), not feature-flagged components | Feature flags are appropriate for runtime toggle of live features. These sections have no content yet -- they are pre-drafted HTML patterns. Comments are the lightest-weight approach and produce zero bundle cost. When ready, uncomment and add data. | Feature flag wrapping (over-engineering for static content); separate branch (merge conflicts over time); remove entirely (loses reference implementation) |
| D-9 | Leadership card uses `role="button"` + `tabIndex={0}` on the `<article>` element | The entire card is clickable (not just the "Learn more" text). Using `role="button"` communicates the interactive nature to assistive technology. `tabIndex={0}` ensures keyboard focusability. The card also handles Enter/Space key events. | Wrap card in `<button>` (breaks semantic structure of article containing heading + paragraph); only "Learn more" text clickable (smaller hit target, inconsistent with hover effect on entire card) |
| D-10 | Focus trap in modal is implemented manually, not via a library | Consistent with the decision in WS-A.1 D-13 (mobile nav focus trap). The modal has a predictable structure (close button + scrollable content), making manual focus management straightforward. | `focus-trap-react` library (unnecessary dependency for a single dialog); `@radix-ui/react-dialog` (pulls in Radix for one component) |

---

## 7. Open Questions

| # | Question | Impact | Owner | Resolution Deadline |
|---|----------|--------|-------|---------------------|
| OQ-1 | Should Alan D.'s last name be displayed in full or kept abbreviated as "Alan D." for security/privacy reasons? | Affects the `name` field in the data module and all rendered instances. Currently matches reference site (abbreviated). | Product / Alan D. | Before implementation begins |
| OQ-2 | Are the team photos suitable for production use as-is (resolution, framing, consistency), or do they need professional retouching? | If retouching is needed, placeholder images may be used at launch with a follow-up asset swap. Current files range from 123KB to 302KB (PNG), which is adequate for web display at 300px card height. | Design | Before implementation begins |
| OQ-3 | Should the bottom CTA ("Schedule a Briefing") link to `/contact` or to an external scheduling tool (e.g., Calendly)? | Matches OQ-1 from WS-A.1. If external, the link needs `target="_blank"` and `rel="noopener noreferrer"`. | Product | Before WS-A.4 implementation |
| OQ-4 | Are there additional technology partners or field experts who should be added before launch? The reference site lists 6 partners; should `joshua-s.png` and `keith-b.png` (present in images directory but not in reference HTML) be included? | Would add 2 more partner cards. | Product | Before implementation begins |
| OQ-5 | Should the Field Experts section include an approximate count ("~20 former federal agents") or a precise count? The reference HTML says "approximately 20" -- is this still accurate? | Affects the intro paragraph text. | Product | Before implementation begins |

---

## 8. Risk Register

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|------------|--------|------------|
| R-1 | Team photos have inconsistent dimensions, aspect ratios, or backgrounds, resulting in a visually jarring card grid | Medium | Medium | Use `object-cover` on all photos with a fixed container height (`h-[300px]` for leadership, fixed width/height for partners). This crops consistently regardless of source photo dimensions. If visual inconsistency is severe after implementation, add a subtle CSS `filter: grayscale(0.1) brightness(0.95)` to normalize tone. |
| R-2 | Glass-morphism `backdrop-blur` causes performance issues on low-end mobile devices | Medium | Low | The about page has fewer blur surfaces than the spatial ZUI (3 leadership cards + ~10 smaller cards vs. dozens of ambient elements). Performance risk is lower. Follow WS-A.1 R-1 mitigation: use `@supports (backdrop-filter: blur(16px))` to fall back to `bg-[var(--color-deep)]/90` on unsupported browsers. |
| R-3 | Modal focus trap has edge cases (browser extensions injecting focusable elements) | Low | Low | Use the same manual focus trap pattern specified in WS-A.1 D-13. Query focusable elements within the modal container on open; wrap Tab at first/last element. If bugs emerge in testing, swap in `focus-trap-react` without changing the component API. |
| R-4 | Image file sizes (up to 302KB for `bobby-brasher 1.png`) cause slow page loads on mobile | Medium | Medium | Use `next/image` with `sizes` attribute for responsive loading and automatic format negotiation (WebP where supported). Set `loading="lazy"` on all images except the first leadership card (which should use `priority` for LCP). WS-C.2 will handle further optimization (AVIF, dimension reduction) as a cross-cutting concern. |
| R-5 | Alan D.'s abbreviated name may confuse search engines or appear unprofessional | Low | Low | This is an intentional privacy decision matching the reference site. If the full name is approved (OQ-1), update the data module. Structured data (JSON-LD) can be updated to include the full name independently of the display name if needed. |
| R-6 | Deferred section comments are accidentally uncommented and shipped without complete data | Low | Medium | The comments include explicit `TODO(post-launch):` labels and reference the data keys that need to be added. Without those data arrays in `about-team.ts`, the page would fail typecheck (`pnpm typecheck`), catching the error at build time. |
| R-7 | WS-A.1 (marketing layout) is not yet complete, blocking page implementation | Medium | High | This workstream depends on WS-A.1 only for the header/footer shell. The about page components (cards, modal, grids) can be developed in isolation and composed into the layout once WS-A.1 ships. If urgently needed, the page can render with a minimal local layout wrapper as a temporary shim. |
| R-8 | Badge images from the reference site may have licensing restrictions (Wikipedia-sourced government insignia) | Low | Medium | U.S. government insignia images are generally in the public domain. The specific files in the reference site appear to be Wikipedia-sourced public domain images of official insignia. Verify during implementation; if licensing is unclear, replace with SVG recreations or Lucide icon fallbacks for all badges. |

---

## Estimated Effort

**Size:** M (Medium)
**Estimated time:** 4-6 hours implementation + verification
**Files touched:** 10 new TypeScript/TSX files, 13 image files copied, 0 modified existing files
