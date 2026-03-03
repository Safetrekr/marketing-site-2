// src/app/(marketing)/case-studies/page.tsx

import { cn } from '@/lib/utils'
import { SectionContainer } from '@/components/marketing/section-container'
import { CaseStudyCard } from '@/components/marketing/social-proof/case-study-card'
import { BreathingCTA } from '@/components/marketing/breathing-cta'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema } from '@/lib/seo/structured-data'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { getPublishedCaseStudies } from '@/lib/data/case-studies'

// ---------------------------------------------------------------------------
// SEO Metadata
// ---------------------------------------------------------------------------

export const metadata = generatePageMetadata({
  title: 'Case Studies',
  description:
    'See how organizations use Safetrekr to document trip safety, manage risk, and protect travelers. Real results from K-12 schools, universities, churches, and businesses.',
  path: '/case-studies',
  keywords: [
    'trip safety case study',
    'school trip safety results',
    'travel risk management case study',
    'duty of care case study',
  ],
})

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function CaseStudiesPage() {
  const caseStudies = getPublishedCaseStudies()

  return (
    <>
      {/* Breadcrumb JSON-LD */}
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Case Studies', path: '/case-studies' },
        ])}
      />

      {/* Hero */}
      <SectionContainer id="case-studies-hero">
        {/* Monospace metadata label */}
        <p
          className={cn(
            'mb-6 text-center font-mono text-xs font-medium uppercase',
            'tracking-[0.12em]',
            'text-[var(--color-text-tertiary)]',
          )}
        >
          Customer Stories
        </p>

        {/* Page heading */}
        <h1
          className={cn(
            'text-center font-sans text-4xl font-bold',
            'md:text-5xl',
            'text-[var(--color-text-primary)]',
            'leading-[1.1]',
          )}
        >
          Real organizations. Real results.
        </h1>
        <p
          className={cn(
            'mt-6 text-center text-lg leading-relaxed',
            'text-[var(--color-text-secondary)]',
            'mx-auto max-w-[640px]',
          )}
        >
          See how organizations protect their travelers with documented,
          auditable trip safety management.
        </p>
      </SectionContainer>

      {/* Case study grid or empty state */}
      <SectionContainer id="case-studies-grid">
        {caseStudies.length > 0 ? (
          <div
            className={cn(
              'grid gap-8',
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
            )}
          >
            {caseStudies.map((cs) => (
              <CaseStudyCard key={cs.slug} caseStudy={cs} />
            ))}
          </div>
        ) : (
          /* Empty state -- shown until first case study is published */
          <div className="text-center">
            <div
              className={cn(
                'mx-auto max-w-[480px] rounded-2xl p-8',
                'bg-white/[0.04] backdrop-blur-[8px]',
                'border border-white/[0.06]',
              )}
            >
              {/* Status indicator */}
              <p
                className={cn(
                  'mb-4 font-mono text-xs font-medium uppercase',
                  'tracking-[0.12em]',
                  'text-[var(--color-ember)]',
                )}
              >
                Pilot Program Active
              </p>

              <p
                className={cn(
                  'text-base leading-relaxed',
                  'text-[var(--color-text-secondary)]',
                )}
              >
                We are currently working with pilot customers. Case studies will
                be published here as our first organizations complete their
                initial trips with Safetrekr.
              </p>

              <div className="mt-8">
                <BreathingCTA
                  href="/contact"
                  size="lg"
                  data-analytics-id="case-studies-empty-cta"
                >
                  Become a pilot customer
                </BreathingCTA>
              </div>
            </div>
          </div>
        )}
      </SectionContainer>
    </>
  )
}
