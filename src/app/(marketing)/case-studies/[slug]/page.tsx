// src/app/(marketing)/case-studies/[slug]/page.tsx

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cn } from '@/lib/utils'
import { SectionContainer } from '@/components/marketing/section-container'
import { GlassCard } from '@/components/marketing/glass-card'
import { BreathingCTA } from '@/components/marketing/breathing-cta'
import { TestimonialCard } from '@/components/marketing/social-proof/testimonial-card'
import { CaseStudySectionRenderer } from '@/components/marketing/social-proof/case-study-section-renderer'
import { JsonLd } from '@/components/seo/json-ld'
import {
  breadcrumbSchema,
  articleSchema,
} from '@/lib/seo/structured-data'
import { getCaseStudyBySlug, CASE_STUDIES } from '@/lib/data/case-studies'
import { VERTICAL_META } from '@/lib/data/verticals'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>
}

// ---------------------------------------------------------------------------
// Static generation
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }))
}

// ---------------------------------------------------------------------------
// Dynamic metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const cs = getCaseStudyBySlug(slug)
  if (!cs) return {}

  return {
    title: `${cs.seo.title} | Safetrekr`,
    description: cs.seo.description,
    alternates: { canonical: `/case-studies/${slug}` },
    openGraph: {
      type: 'article',
      title: `${cs.seo.title} | Safetrekr`,
      description: cs.seo.description,
      publishedTime: cs.publishedAt,
    },
  }
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)
  if (!caseStudy) notFound()

  const vertical = VERTICAL_META[caseStudy.vertical]

  return (
    <article>
      {/* Structured data */}
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Case Studies', path: '/case-studies' },
          { name: caseStudy.customer, path: `/case-studies/${slug}` },
        ])}
      />
      <JsonLd
        data={articleSchema({
          headline: caseStudy.title,
          description: caseStudy.seo.description,
          path: `/case-studies/${slug}`,
          publishedAt: caseStudy.publishedAt,
        })}
      />

      {/* Hero */}
      <SectionContainer id="case-study-hero">
        {/* Vertical badge */}
        <div className="mb-6 flex justify-center">
          <span
            className={cn(
              'inline-block rounded-full px-4 py-1.5',
              'border border-[var(--color-ember-muted)]',
              'font-mono text-xs font-medium uppercase',
              'tracking-[0.12em]',
              'text-[var(--color-ember)]',
            )}
          >
            {vertical.label} Case Study
          </span>
        </div>

        {/* Customer + Title */}
        <h1
          className={cn(
            'text-center font-sans text-4xl font-bold',
            'md:text-5xl',
            'text-[var(--color-text-primary)]',
            'leading-[1.1]',
          )}
        >
          {caseStudy.customer}
        </h1>
        <p
          className={cn(
            'mt-4 text-center text-xl',
            'text-[var(--color-ember-bright)]',
            'font-medium',
          )}
        >
          {caseStudy.title}
        </p>

        {/* Summary */}
        <p
          className={cn(
            'mt-6 text-center text-lg leading-relaxed',
            'text-[var(--color-text-secondary)]',
            'mx-auto max-w-[640px]',
          )}
        >
          {caseStudy.summary}
        </p>

        {/* Headline stats */}
        {caseStudy.stats.length > 0 && (
          <div className="mt-12 flex flex-wrap justify-center gap-8 lg:gap-16">
            {caseStudy.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div
                  className={cn(
                    'font-mono text-4xl font-bold',
                    'text-[var(--color-ember)]',
                    'lg:text-5xl',
                  )}
                >
                  {stat.value}
                </div>
                <div
                  className={cn(
                    'mt-1 font-mono text-xs font-medium uppercase',
                    'tracking-[0.08em]',
                    'text-[var(--color-text-secondary)]',
                  )}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionContainer>

      {/* Content sections */}
      {caseStudy.sections.map((section, i) => (
        <SectionContainer
          key={i}
          id={`section-${section.type}-${i}`}
          className={i % 2 === 0 ? '' : 'bg-[var(--color-abyss)]'}
        >
          <GlassCard
            variant={section.type === 'results' ? 'elevated' : 'default'}
          >
            <CaseStudySectionRenderer section={section} />
          </GlassCard>
        </SectionContainer>
      ))}

      {/* Pull quotes */}
      {caseStudy.pullQuotes.length > 0 && (
        <SectionContainer id="pull-quotes">
          <div
            className={cn(
              'grid gap-8',
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
            )}
          >
            {caseStudy.pullQuotes.map((quote) => (
              <TestimonialCard key={quote.id} testimonial={quote} />
            ))}
          </div>
        </SectionContainer>
      )}

      {/* Bottom CTA */}
      <SectionContainer id="case-study-cta" className="text-center">
        <p
          className={cn(
            'text-2xl font-bold',
            'md:text-3xl',
            'text-[var(--color-text-primary)]',
          )}
        >
          Ready to protect your travelers like {caseStudy.customer}?
        </p>
        <p
          className={cn(
            'mt-4 text-base leading-relaxed',
            'text-[var(--color-text-secondary)]',
            'mx-auto max-w-[480px]',
          )}
        >
          Schedule a briefing to learn how Safetrekr can bring the same
          documented accountability to your organization.
        </p>
        <div className="mt-8">
          <BreathingCTA
            href="/contact"
            size="lg"
            data-analytics-id="case-study-bottom-cta"
          >
            Request a Sample Trip Package
          </BreathingCTA>
        </div>
      </SectionContainer>
    </article>
  )
}
