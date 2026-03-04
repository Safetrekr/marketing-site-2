// src/app/(marketing)/about/page.tsx

import { cn } from '@/lib/utils'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema } from '@/lib/seo/structured-data'
import {
  ABOUT_HERO,
  ORIGIN_STORY,
  LEADERS,
  FIELD_EXPERTS_INTRO,
  FIELD_EXPERTS_CALLOUT,
  AGENCY_BADGES,
  CONTACT_CHANNELS,
  BOTTOM_CTA,
  ABOUT_ORGANIZATION_SCHEMA,
} from '@/lib/data/about-team'
import { LeadershipSection } from '@/components/marketing/about/leadership-section'
import { AgencyBadgeGrid } from '@/components/marketing/about/agency-badge-grid'
import { ContactChannels } from '@/components/marketing/about/contact-channels'

export const metadata = generatePageMetadata({
  title: 'About -- The Team Behind Professional Trip Safety Management',
  description:
    'Meet the people behind Safetrekr. Former U.S. Secret Service agents and school security professionals building trip safety management that works in the real world.',
  path: '/about',
  ogDescription:
    'Former U.S. Secret Service agents and school security professionals building trip safety that works in the real world.',
  keywords: [
    'safetrekr team',
    'trip safety mission',
    'safety analysts',
    'travel risk management',
    'secret service safety experts',
  ],
})

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'About', path: '/about' }])} />
      <JsonLd data={ABOUT_ORGANIZATION_SCHEMA as Record<string, unknown>} />

      <div className="min-h-screen">
        {/* ============================================================
            Hero Section
            ============================================================ */}
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

        {/* ============================================================
            Origin Story Section
            ============================================================ */}
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

        {/* ============================================================
            Leadership Section
            ============================================================ */}
        <section className="relative py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center md:mb-16">
              <h2 className="font-sans text-2xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-3xl">
                Leadership
              </h2>
            </div>
            <LeadershipSection leaders={LEADERS} />
          </div>
        </section>

        {/* ============================================================
            Field Experts Section
            ============================================================ */}
        <section className="relative bg-white/[0.02] py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center md:mb-16">
              <h2 className="font-sans text-2xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-3xl">
                Field Expert Bench
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)]">
                {FIELD_EXPERTS_INTRO}
              </p>
            </div>
            <AgencyBadgeGrid badges={AGENCY_BADGES} />

            {/* Combined Expertise callout */}
            <div
              className={cn(
                'mx-auto mt-12 max-w-3xl rounded-xl p-6',
                'border border-[rgba(var(--ember-rgb),0.1)]',
                'bg-[rgba(var(--ember-rgb),0.05)]',
              )}
            >
              <p className="text-center text-sm leading-[1.8] text-[var(--color-text-secondary)]">
                <strong className="text-[var(--color-text-primary)]">
                  Combined expertise:
                </strong>{' '}
                {FIELD_EXPERTS_CALLOUT}
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================
            Contact Section
            ============================================================ */}
        <section className="relative py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center md:mb-16">
              <h2 className="font-sans text-2xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-3xl">
                Get in Touch
              </h2>
            </div>
            <ContactChannels channels={CONTACT_CHANNELS} />
          </div>
        </section>

        {/* ============================================================
            Bottom CTA Section
            ============================================================ */}
        <section className="relative bg-white/[0.02] py-20 md:py-28">
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
                  'mkt-cta-breathe',
                )}
              >
                {BOTTOM_CTA.buttonLabel}
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
