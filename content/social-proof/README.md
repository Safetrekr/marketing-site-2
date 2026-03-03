# Social Proof Content Guide

How to add testimonials, customer logos, and case studies to the Safetrekr marketing site.

All social proof content requires **written permission** from the customer before publication.

---

## 1. Adding a Testimonial

### What you need

| Field | Required? | Notes |
|-------|-----------|-------|
| Quote | Yes | 1-3 sentences. Plain text, no HTML. |
| Name | Yes | Full name of the person quoted |
| Title | Yes | Job title (e.g., "Director of Safety") |
| Organization | Yes | Organization name |
| Vertical | Yes | One of: `k12`, `higher-ed`, `churches`, `youth-sports`, `business` |
| Headshot | No | Minimum 128x128px. Place in `/public/images/testimonials/` |
| Highlight stat | No | A single stat (e.g., "12 trips managed") |
| Written permission | Yes | Email or signed release from the quoted person |

### Steps

1. Open `src/lib/data/testimonials.ts`
2. Add an entry to the `TESTIMONIALS` array:

```typescript
{
  id: 'testimonial-lastname-org',
  quote: 'The actual customer quote goes here.',
  attribution: {
    name: 'Jane Smith',
    title: 'Director of Safety',
    organization: 'Lincoln School District',
    organizationType: 'k12',
  },
  vertical: 'k12',
  headshotSrc: '/images/testimonials/jane-smith.jpg', // optional
  highlightStat: {                                     // optional
    value: '12',
    label: 'trips managed',
  },
  order: 1,       // lower = appears first
  featured: true, // true = shows on landing page
},
```

3. Run `pnpm typecheck` to verify the entry compiles
4. Deploy. The testimonial appears automatically.

### How it works

- With 0 testimonials: landing page shows 3 capability-proof stat cards
- With 1-2 featured testimonials: landing page shows testimonials + stat cards to fill 3 slots
- With 3+ featured testimonials: landing page shows 3 testimonials, no stat cards

---

## 2. Adding a Customer Logo

### What you need

| Field | Required? | Notes |
|-------|-----------|-------|
| SVG logo file | Yes | White/monochrome. Max 200px wide, 48px tall. |
| Organization name | Yes | Used as alt text |
| Vertical | Yes | One of the 5 vertical IDs |
| Written permission | Yes | Email or signed release to display logo |

### Logo preparation

- Format: SVG preferred (scales cleanly on all screens)
- Color: Must be white or light color (displays on dark #061A23 background)
- If only a color logo is available, convert to white/monochrome
- Remove any background fills from the SVG
- Recommended dimensions: max 200px wide, 48px tall

### Steps

1. Place the SVG file in `/public/images/logos/customers/`
2. Open `src/lib/data/customer-logos.ts`
3. Add an entry:

```typescript
{
  id: 'org-name',
  name: 'Organization Name',
  logoSrc: '/images/logos/customers/org-name.svg',
  vertical: 'k12',
  order: 1,
  // caseStudySlug: 'org-name-case-study', // optional: link to case study
},
```

4. Run `pnpm typecheck`
5. The logo bar only renders when **3 or more** logos are available

---

## 3. Adding a Case Study

### What you need

| Field | Required? | Notes |
|-------|-----------|-------|
| Customer name | Yes | Organization name |
| Vertical | Yes | One of the 5 vertical IDs |
| Title | Yes | Case study headline |
| Summary | Yes | 1-2 sentences for card preview |
| Stats | Yes | 2-3 headline numbers (e.g., "12 trips", "450 travelers") |
| Sections | Yes | At least: challenge, solution, results |
| Pull quotes | No | Customer quotes to display between sections |
| Hero image | No | Place in `/public/images/case-studies/[slug]/` |
| Customer approval | Yes | Full written approval of the narrative |

### Steps

1. Add images (if any) to `/public/images/case-studies/your-slug/`
2. Open `src/lib/data/case-studies.ts`
3. Add a `CaseStudy` entry:

```typescript
{
  slug: 'lincoln-school-district',
  customer: 'Lincoln School District',
  vertical: 'k12',
  title: 'How Lincoln School District Documented Safety Across 40+ Annual Field Trips',
  summary: 'Lincoln School District replaced spreadsheet-based trip planning with Safetrekr, achieving 100% safety documentation compliance across all field trips.',
  heroImageSrc: '/images/case-studies/lincoln-school-district/hero.jpg', // optional
  stats: [
    { value: '42', label: 'Trips managed', unit: 'trips' },
    { value: '1,200', label: 'Students protected', unit: 'students' },
    { value: '100%', label: 'Documentation compliance', unit: 'compliance' },
  ],
  sections: [
    {
      type: 'challenge',
      heading: 'Managing safety across 40+ annual field trips',
      body: 'Lincoln School District runs over 40 field trips per year...\n\n- Pain point one\n- Pain point two\n- Pain point three',
    },
    {
      type: 'solution',
      heading: 'A documented safety system for every trip',
      body: 'With Safetrekr, Lincoln School District now...\n\n**Key capability** enabled the district to...',
    },
    {
      type: 'results',
      heading: 'Measurable improvement in safety documentation',
      body: 'After one academic year with Safetrekr...',
    },
  ],
  pullQuotes: [
    {
      id: 'lincoln-pullquote-1',
      quote: 'A pull quote from someone at the organization.',
      attribution: {
        name: 'Jane Smith',
        title: 'Safety Director',
        organization: 'Lincoln School District',
        organizationType: 'k12',
      },
      vertical: 'k12',
      order: 1,
      featured: false,
    },
  ],
  seo: {
    title: 'Lincoln School District Case Study',
    description: 'How Lincoln School District documented safety across 40+ annual field trips with Safetrekr.',
  },
  publishedAt: '2026-06-01T00:00:00Z',
  order: 1,
},
```

4. Run `pnpm build` to verify static page generation
5. The case study page is automatically available at `/case-studies/lincoln-school-district`

### Body formatting

The `body` field in each section supports limited formatting:

- **Paragraphs**: Separate with double newlines (`\n\n`)
- **Bold text**: Wrap in double asterisks (`**bold text**`)
- **Bullet lists**: Start lines with `- ` (dash + space)

This is intentionally not full Markdown. Keep content straightforward.

---

## 4. Approval Checklist

Before publishing any social proof content:

- [ ] Written permission obtained from customer
- [ ] Quote reviewed and approved by the quoted person
- [ ] Organization name spelled correctly
- [ ] Job title is current and accurate
- [ ] Headshot/logo has appropriate resolution
- [ ] No confidential information disclosed
- [ ] Stats are accurate and verifiable
- [ ] Case study narrative reviewed and approved by customer
- [ ] `pnpm typecheck` passes with 0 errors
- [ ] Visual review on staging confirms correct rendering

---

## 5. File Locations

| Content Type | Data File | Image Directory |
|-------------|-----------|-----------------|
| Testimonials | `src/lib/data/testimonials.ts` | `/public/images/testimonials/` |
| Customer Logos | `src/lib/data/customer-logos.ts` | `/public/images/logos/customers/` |
| Case Studies | `src/lib/data/case-studies.ts` | `/public/images/case-studies/[slug]/` |
| Type Definitions | `src/lib/interfaces/social-proof.ts` | -- |
| Vertical Metadata | `src/lib/data/verticals.ts` | -- |
