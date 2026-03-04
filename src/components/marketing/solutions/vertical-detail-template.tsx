// src/components/marketing/solutions/vertical-detail-template.tsx

import Link from 'next/link'
import type { VerticalDetailData } from '@/lib/interfaces/solutions'
import type { SolutionVertical } from '@/lib/interfaces/solutions'
import { VerticalCard } from './vertical-card'
import { CaseStudyPlaceholder } from './case-study-placeholder'
import { RegulationCard } from './regulation-card'
import { FeatureSpotlight } from './feature-spotlight'
import { VerticalBreadcrumb } from './vertical-breadcrumb'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema } from '@/lib/seo/structured-data'
import { SITE_CONFIG } from '@/lib/config/site'
import { cn } from '@/lib/utils'

interface VerticalDetailTemplateProps {
  data: VerticalDetailData
  siblingVerticals: SolutionVertical[]
}

export function VerticalDetailTemplate({
  data,
  siblingVerticals,
}: VerticalDetailTemplateProps) {
  // JSON-LD structured data
  const verticalSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Safetrekr',
    url: SITE_CONFIG.url,
    applicationCategory: 'BusinessApplication',
    description: data.seoDescription,
    operatingSystem: 'Web',
    audience: {
      '@type': 'Audience',
      audienceType: data.name,
    },
    offers: {
      '@type': 'Offer',
      description: 'Per-trip pricing with no annual contracts',
      url: `${SITE_CONFIG.url}/pricing`,
    },
  }

  return (
    <>
      {/* JSON-LD: BreadcrumbList */}
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Solutions', path: '/solutions' },
          { name: data.name, path: `/solutions/${data.id}` },
        ])}
      />
      {/* JSON-LD: SoftwareApplication (vertical-specific) */}
      <JsonLd data={verticalSchema} />

      {/* 1. Breadcrumb */}
      <VerticalBreadcrumb verticalName={data.name} />

      {/* 2. Hero */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="font-sans text-3xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-5xl">
            {data.heroHeadline}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)] md:text-xl">
            {data.heroSubheadline}
          </p>
        </div>
      </section>

      {/* 3. The Challenge */}
      <section className="relative bg-white/[0.02] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="font-sans text-2xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-3xl">
              The challenge
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)]">
              {data.challengeIntro}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.challenges.map((challenge, i) => (
              <div
                key={i}
                className={cn(
                  'rounded-xl p-6',
                  'bg-white/[0.04] border border-white/[0.06]',
                )}
              >
                <h3 className="font-sans text-base font-semibold text-[var(--color-text-primary)]">
                  {challenge.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {challenge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. The Safetrekr Response */}
      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="font-sans text-2xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-3xl">
              The Safetrekr response
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)]">
              {data.responseIntro}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.responses.map((response, i) => (
              <div
                key={i}
                className={cn(
                  'rounded-xl p-6',
                  'bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]',
                  'border border-[rgba(var(--ember-rgb),0.12)]',
                )}
              >
                <h3 className="font-sans text-base font-semibold text-[var(--color-ember)]">
                  {response.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {response.description}
                </p>
                {response.featureRef && (
                  <p className="mt-3 text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-text-tertiary)]">
                    {response.featureRef}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Differentiator Callout */}
      <section className="relative bg-white/[0.02] py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div
            className={cn(
              'rounded-xl p-8 md:p-10',
              'border border-[rgba(var(--ember-rgb),0.15)]',
              'bg-[rgba(var(--ember-rgb),0.04)]',
            )}
          >
            <p className="text-center text-lg font-semibold italic text-[var(--color-text-primary)] md:text-xl">
              {data.accountabilityQuestion}
            </p>
            <p className="mt-6 text-center text-base leading-[1.8] text-[var(--color-text-secondary)]">
              {data.accountabilityAnswer}
            </p>
          </div>
        </div>
      </section>

      {/* 6. Regulatory and Compliance */}
      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="font-sans text-2xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-3xl">
              Regulatory and compliance
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)]">
              {data.regulatoryIntro}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {data.regulations.map((regulation, i) => (
              <RegulationCard key={i} regulation={regulation} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Feature Spotlights */}
      <section className="relative bg-white/[0.02] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="font-sans text-2xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-3xl">
              Platform features for {data.name.toLowerCase()}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {data.featureSpotlights.map((spotlight, i) => (
              <FeatureSpotlight key={i} spotlight={spotlight} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. Case Study Placeholder */}
      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <CaseStudyPlaceholder caseStudy={data.caseStudy} />
        </div>
      </section>

      {/* 9. Objection Hook */}
      <section className="relative bg-white/[0.02] py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <p className="text-lg font-semibold text-[var(--color-text-primary)] md:text-xl">
              {data.objectionQuestion}
            </p>
            <p className="mt-6 text-base leading-[1.8] text-[var(--color-text-secondary)]">
              {data.objectionAnswer}
            </p>
          </div>
        </div>
      </section>

      {/* 10. Sibling Vertical Cross-Links */}
      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="font-sans text-2xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-3xl">
              Solutions for other verticals
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {siblingVerticals.map((v) => (
              <VerticalCard key={v.id} vertical={v} />
            ))}
          </div>
        </div>
      </section>

      {/* 11. Bottom CTA */}
      <section className="relative bg-white/[0.02] py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-sans text-2xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-3xl">
            See Safetrekr in action.
          </h2>
          <div className="mt-8">
            <Link
              href="/contact"
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
              Request a Sample Trip Package
            </Link>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-tertiary)]">
            {data.ctaMicrocopy}
          </p>
        </div>
      </section>
    </>
  )
}
