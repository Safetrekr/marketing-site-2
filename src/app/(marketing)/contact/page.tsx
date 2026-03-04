// src/app/(marketing)/contact/page.tsx

import Link from 'next/link'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema } from '@/lib/seo/structured-data'
import { SectionContainer } from '@/components/marketing/section-container'
import { GlassCard } from '@/components/marketing/glass-card'
import { ContactForm } from '@/components/marketing/contact-form'
import { cn } from '@/lib/utils'
import { Clock, Shield, FileCheck, FileText, CalendarCheck, Download } from 'lucide-react'

export const metadata = generatePageMetadata({
  title: 'Contact -- Request a Sample Trip Package',
  description:
    'Request a sample trip package to see what professional analyst review, real-time intelligence monitoring, and board-ready documentation look like for your organization.',
  path: '/contact',
  keywords: [
    'trip safety demo',
    'safetrekr demo request',
    'sample trip package',
    'schedule safety briefing',
  ],
})

const QUICK_OPTIONS = [
  {
    icon: FileText,
    heading: 'Sample Trip Package',
    body: 'See what a professionally reviewed trip package looks like before committing to anything.',
  },
  {
    icon: CalendarCheck,
    heading: 'Schedule a Walkthrough',
    body: 'A focused 20-minute walkthrough tailored to your organization type and trip profile.',
  },
  {
    icon: Download,
    heading: 'Free Resources',
    body: 'Download free checklists, templates, and guides you can use today.',
    href: '/resources',
  },
] as const

const WHAT_TO_EXPECT = [
  {
    icon: Clock,
    heading: '20-Minute Briefing',
    body: 'A focused walkthrough tailored to your organization type, trip profile, and safety requirements.',
  },
  {
    icon: Shield,
    heading: 'Live Platform Demo',
    body: 'See the analyst review workflow, traveler app, and HQ dashboard with your use case in mind.',
  },
  {
    icon: FileCheck,
    heading: 'Custom Safety Assessment',
    body: 'Receive a preliminary assessment of how Safetrekr maps to your current trip safety process.',
  },
] as const

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([{ name: 'Contact', path: '/contact' }])}
      />

      <SectionContainer id="contact-hero">
        {/* Section label */}
        <p
          className={cn(
            'mb-4 text-center font-mono text-xs font-medium uppercase',
            'tracking-[0.12em]',
            'text-[var(--color-text-tertiary)]',
          )}
        >
          Get Started
        </p>

        <h1
          className={cn(
            'text-center font-sans text-4xl font-bold',
            'md:text-5xl',
            'text-[var(--color-text-primary)]',
            'leading-[1.1]',
          )}
        >
          Request a Sample Trip Package
        </h1>
        <p
          className={cn(
            'mt-4 text-center text-lg leading-relaxed',
            'text-[var(--color-text-secondary)]',
            'mx-auto max-w-[560px]',
          )}
        >
          See what professional analyst review, real-time intelligence
          monitoring, and board-ready documentation look like for your
          organization.
        </p>
      </SectionContainer>

      {/* Quick Options */}
      <SectionContainer id="quick-options" className="!pt-0 !pb-8">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3">
          {QUICK_OPTIONS.map((opt) => {
            const inner = (
              <div
                key={opt.heading}
                className={cn(
                  'flex items-start gap-4 rounded-xl p-5',
                  'border border-white/[0.06] bg-white/[0.03]',
                  'transition-colors duration-200',
                  'hover:bg-white/[0.06]',
                )}
              >
                <div
                  className={cn(
                    'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg',
                    'bg-[rgba(var(--ember-rgb),0.08)]',
                  )}
                >
                  <opt.icon
                    size={20}
                    className="text-[var(--color-ember-bright)]"
                    aria-hidden="true"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                    {opt.heading}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                    {opt.body}
                  </p>
                </div>
              </div>
            )
            return 'href' in opt && opt.href ? (
              <Link key={opt.heading} href={opt.href}>
                {inner}
              </Link>
            ) : (
              <div key={opt.heading}>{inner}</div>
            )
          })}
        </div>
      </SectionContainer>

      <SectionContainer id="contact-form" className="!pt-0">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          {/* Form card */}
          <GlassCard>
            <ContactForm sourcePage="/contact" />
          </GlassCard>

          {/* What to Expect sidebar */}
          <aside aria-label="What to expect">
            <h2
              className={cn(
                'mb-6 font-mono text-xs font-medium uppercase',
                'tracking-[0.12em]',
                'text-[var(--color-text-tertiary)]',
              )}
            >
              What to Expect
            </h2>
            <div className="space-y-6">
              {WHAT_TO_EXPECT.map((item) => (
                <div key={item.heading} className="flex items-start gap-4">
                  <div
                    className={cn(
                      'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg',
                      'bg-[rgba(var(--ember-rgb),0.08)]',
                    )}
                  >
                    <item.icon
                      size={20}
                      className="text-[var(--color-ember-bright)]"
                      aria-hidden="true"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                      {item.heading}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </SectionContainer>
    </>
  )
}
