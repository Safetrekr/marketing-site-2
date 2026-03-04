// src/app/(marketing)/resources/page.tsx

import Link from 'next/link'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema } from '@/lib/seo/structured-data'
import { SectionContainer } from '@/components/marketing/section-container'
import { GlassCard } from '@/components/marketing/glass-card'
import { cn } from '@/lib/utils'
import {
  FileText,
  Download,
  Zap,
  ShieldCheck,
  Users,
} from 'lucide-react'
import {
  RESOURCES_HERO,
  RESOURCES,
  RESOURCES_PLATFORM_CTA,
  RESOURCES_WHY_DOWNLOAD,
} from '@/lib/data/resources'

// ─── SEO Metadata ─────────────────────────────────────────────────

export const metadata = generatePageMetadata({
  title: 'Free Trip Safety Resources & Templates',
  description:
    'Download free trip planning resources including checklists, templates, forms, and guides. Professional tools for safer school trips, mission travel, and group excursions.',
  path: '/resources',
  keywords: [
    'trip planning checklist',
    'itinerary template',
    'parent communication',
    'risk assessment',
    'emergency contact form',
    'trip planning resources',
  ],
})

// ─── Icon map ─────────────────────────────────────────────────────

const ICON_MAP: Record<string, typeof Zap> = {
  Zap,
  ShieldCheck,
  Users,
}

// ─── Page Component ───────────────────────────────────────────────

export default function ResourcesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([{ name: 'Resources', path: '/resources' }])}
      />

      {/* Hero */}
      <SectionContainer id="resources-hero">
        <p
          className={cn(
            'mb-4 text-center font-mono text-xs font-medium uppercase',
            'tracking-[0.12em]',
            'text-[var(--color-text-tertiary)]',
          )}
        >
          Free Downloads
        </p>

        <h1
          className={cn(
            'text-center font-sans text-3xl font-bold',
            'md:text-5xl',
            'text-[var(--color-text-primary)]',
            'leading-[1.1]',
          )}
        >
          {RESOURCES_HERO.title}
        </h1>
        <p
          className={cn(
            'mt-4 text-center text-lg leading-relaxed',
            'text-[var(--color-text-secondary)]',
            'mx-auto max-w-[600px]',
          )}
        >
          {RESOURCES_HERO.subtitle}
        </p>
      </SectionContainer>

      {/* Resource Grid */}
      <SectionContainer id="resource-grid" className="!pt-0">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((resource) => (
            <GlassCard key={resource.id}>
              <div className="flex h-full flex-col">
                <div className="mb-4 flex items-center gap-2">
                  <FileText
                    size={18}
                    className="text-[var(--color-ember-bright)]"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-tertiary)]">
                    {resource.format} &middot; {resource.pages} pages
                  </span>
                </div>

                <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                  {resource.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {resource.description}
                </p>

                <a
                  href={resource.downloadHref}
                  className={cn(
                    'mt-4 inline-flex items-center gap-2',
                    'text-sm font-semibold text-[var(--color-ember-bright)]',
                    'transition-colors duration-200',
                    'hover:text-[var(--color-ember)]',
                  )}
                  data-analytics-id={`resource-download-${resource.id}`}
                >
                  <Download size={16} strokeWidth={1.5} aria-hidden="true" />
                  Download {resource.format}
                </a>
              </div>
            </GlassCard>
          ))}
        </div>
      </SectionContainer>

      {/* Platform CTA */}
      <SectionContainer id="platform-cta">
        <div className="mx-auto max-w-3xl">
          <GlassCard>
            <div className="text-center">
              <h2 className="text-xl font-bold text-[var(--color-text-primary)] md:text-2xl">
                {RESOURCES_PLATFORM_CTA.heading}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--color-text-secondary)]">
                {RESOURCES_PLATFORM_CTA.body}
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href={RESOURCES_PLATFORM_CTA.primaryHref}
                  className={cn(
                    'rounded-xl px-8 py-3 text-base font-semibold',
                    'bg-[var(--color-ember)] text-[var(--color-void)]',
                    'hover:bg-[var(--color-ember-bright)]',
                    'transition-all duration-200',
                    'focus-visible:outline-2 focus-visible:outline-offset-2',
                    'focus-visible:outline-[var(--color-ember-bright)]',
                    'mkt-cta-breathe',
                  )}
                  data-analytics-id="resources-cta-primary"
                >
                  {RESOURCES_PLATFORM_CTA.primaryLabel}
                </Link>

                <Link
                  href={RESOURCES_PLATFORM_CTA.secondaryHref}
                  className={cn(
                    'rounded-xl px-8 py-3 text-base font-semibold',
                    'bg-white/[0.06] text-[var(--color-text-primary)]',
                    'border border-white/[0.08]',
                    'hover:bg-white/[0.1]',
                    'transition-all duration-200',
                    'focus-visible:outline-2 focus-visible:outline-offset-2',
                    'focus-visible:outline-[var(--color-ember-bright)]',
                  )}
                  data-analytics-id="resources-cta-secondary"
                >
                  {RESOURCES_PLATFORM_CTA.secondaryLabel}
                </Link>
              </div>
            </div>
          </GlassCard>
        </div>
      </SectionContainer>

      {/* Why Download */}
      <SectionContainer id="why-download">
        <p
          className={cn(
            'mb-6 text-center font-mono text-xs font-medium uppercase',
            'tracking-[0.12em]',
            'text-[var(--color-text-tertiary)]',
          )}
        >
          Why Download
        </p>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
          {RESOURCES_WHY_DOWNLOAD.map((item) => {
            const Icon = ICON_MAP[item.iconName] ?? Zap
            return (
              <div key={item.title} className="text-center">
                <div
                  className={cn(
                    'mx-auto flex h-12 w-12 items-center justify-center rounded-xl',
                    'bg-[rgba(var(--ember-rgb),0.08)]',
                  )}
                >
                  <Icon
                    size={22}
                    className="text-[var(--color-ember-bright)]"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-[var(--color-text-primary)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </SectionContainer>
    </>
  )
}
