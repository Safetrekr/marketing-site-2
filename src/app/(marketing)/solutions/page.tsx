// src/app/(marketing)/solutions/page.tsx

import Link from 'next/link'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema } from '@/lib/seo/structured-data'
import { SITE_CONFIG } from '@/lib/config/site'
import {
  SOLUTIONS_HERO,
  CROSS_CUTTING_VALUE_PROP,
  VERTICALS,
  OBJECTION_HOOK,
  SOLUTIONS_BOTTOM_CTA,
} from '@/lib/data/solutions-verticals'
import { VerticalCardGrid } from '@/components/marketing/solutions/vertical-card-grid'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// SEO Metadata
// ---------------------------------------------------------------------------

export const metadata = generatePageMetadata({
  title:
    'Solutions -- Trip Safety for Schools, Churches, Sports, Universities, Business',
  description:
    'K-12 field trips. Church mission trips. Youth sports tournaments. Study abroad programs. Corporate travel. One platform built for every type of organizational travel.',
  path: '/solutions',
  ogTitle: 'Safetrekr Solutions -- Trip Safety for Every Vertical',
  ogDescription:
    'K-12 field trips. Church mission trips. Youth sports tournaments. Study abroad. Corporate travel. One platform for every type of organizational travel.',
  keywords: [
    'school trip safety software',
    'mission trip safety',
    'youth sports travel management',
    'study abroad risk management',
    'corporate duty of care',
    'trip safety management',
  ],
})

// ---------------------------------------------------------------------------
// JSON-LD: SoftwareApplication with audience targeting
// ---------------------------------------------------------------------------

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  applicationCategory: 'BusinessApplication',
  description:
    'Trip safety management platform for schools, churches, youth sports, universities, and businesses.',
  operatingSystem: 'Web',
  audience: [
    {
      '@type': 'EducationalAudience',
      educationalRole: 'administrator',
      audienceType: 'K-12 Schools',
    },
    {
      '@type': 'Audience',
      audienceType: 'Higher Education',
    },
    {
      '@type': 'Audience',
      audienceType: 'Churches and Faith-Based Organizations',
    },
    {
      '@type': 'Audience',
      audienceType: 'Youth Sports Organizations',
    },
    {
      '@type': 'Audience',
      audienceType: 'Businesses',
    },
  ],
  offers: {
    '@type': 'Offer',
    description: 'Per-trip pricing with no annual contracts',
    url: `${SITE_CONFIG.url}/pricing`,
  },
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function SolutionsPage() {
  return (
    <div className="min-h-screen">
      {/* Breadcrumb JSON-LD */}
      <JsonLd
        data={breadcrumbSchema([{ name: 'Solutions', path: '/solutions' }])}
      />

      {/* SoftwareApplication JSON-LD */}
      <JsonLd data={softwareApplicationSchema} />

      {/* 1. Hero -- transparent bg */}
      <section className="relative flex min-h-[50vh] items-center justify-center py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          {/* Monospace metadata label */}
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-text-tertiary)]">
            Solutions // By Vertical
          </p>
          <h1 className="font-sans text-3xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-5xl">
            {SOLUTIONS_HERO.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)] md:text-xl">
            {SOLUTIONS_HERO.subtitle}
          </p>
        </div>
      </section>

      {/* 2. Cross-cutting value prop -- bg-white/[0.02] */}
      <section className="relative bg-white/[0.02] py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div
            className={cn(
              'rounded-xl p-6 md:p-8',
              'border border-[rgba(var(--ember-rgb),0.12)]',
              'bg-[rgba(var(--ember-rgb),0.04)]',
            )}
          >
            <p className="text-center text-base leading-[1.8] text-[var(--color-text-secondary)] md:text-lg">
              {CROSS_CUTTING_VALUE_PROP}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Vertical cards -- transparent bg */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <VerticalCardGrid verticals={VERTICALS} />
        </div>
      </section>

      {/* 4. Objection hook -- bg-white/[0.02] */}
      <section className="relative bg-white/[0.02] py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div
            className={cn(
              'rounded-xl p-6 md:p-8',
              'border border-white/[0.06]',
              'bg-white/[0.03]',
            )}
          >
            <p className="text-center text-lg font-semibold text-[var(--color-text-primary)]">
              {OBJECTION_HOOK.question}
            </p>
            <p className="mt-4 text-center text-base leading-[1.8] text-[var(--color-text-secondary)]">
              {OBJECTION_HOOK.answer}
            </p>
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA -- transparent bg */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-sans text-2xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-3xl">
            {SOLUTIONS_BOTTOM_CTA.headline}
          </h2>
          <div className="mt-8">
            <Link
              href={SOLUTIONS_BOTTOM_CTA.href}
              className={cn(
                'inline-flex items-center rounded-lg px-8 py-3',
                'bg-[var(--color-ember)] text-base font-semibold text-[var(--color-void)]',
                'transition-all duration-200',
                'hover:bg-[var(--color-ember-bright)]',
                'focus-visible:outline-2 focus-visible:outline-offset-2',
                'focus-visible:outline-[var(--color-ember-bright)]',
                // Breathing glow
                'mkt-cta-breathe',
              )}
            >
              {SOLUTIONS_BOTTOM_CTA.buttonLabel}
            </Link>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-tertiary)]">
            {SOLUTIONS_BOTTOM_CTA.microcopy}
          </p>
        </div>
      </section>
    </div>
  )
}
