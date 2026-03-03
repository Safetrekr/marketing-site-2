// src/app/(marketing)/security/page.tsx

import Link from 'next/link'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import {
  breadcrumbSchema,
  webPageSchema,
} from '@/lib/seo/structured-data'
import { cn } from '@/lib/utils'
import {
  SECURITY_HERO,
  ARCHITECTURE_BADGES,
  DATA_ARCHITECTURE_FEATURES,
  AUTH_FEATURES,
  RBAC_ROLES,
  RBAC_SUMMARY,
  PRIVACY_FEATURES,
  MOBILE_FEATURES,
  OPERATIONAL_FEATURES,
  COMPLIANCE_INTRO,
  COMPLIANCE_CERTIFICATIONS,
  COMPLIANCE_FOOTER,
  BOTTOM_CTA,
} from '@/lib/data/security-content'
import {
  ArchitectureBadgeRow,
  SecurityFeatureCard,
  ComplianceBadge,
  RBACRoleTable,
} from '@/components/marketing/security'

// ---------------------------------------------------------------------------
// SEO Metadata
// ---------------------------------------------------------------------------

export const metadata = generatePageMetadata({
  title: 'Security -- Data Architecture, Authentication, Privacy Compliance',
  description:
    'Row Level Security. Two-factor authentication. 10 role-based access levels. Encryption at rest and in transit. GDPR-compliant data governance. See exactly how Safetrekr protects your data.',
  path: '/security',
  keywords: [
    'trip safety data security',
    'student data protection',
    'travel platform security',
    'row level security',
    'GDPR travel platform',
    'education data privacy',
  ],
})

// ---------------------------------------------------------------------------
// Section Header Component (internal to this page)
// ---------------------------------------------------------------------------

function SectionHeader({
  metaLabel,
  title,
  subtitle,
}: {
  metaLabel: string
  title: string
  subtitle?: string
}) {
  return (
    <div className="mb-12 md:mb-16">
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[var(--color-text-tertiary)]">
        {metaLabel}
      </p>
      <h2 className="font-sans text-2xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--color-text-secondary)]">
          {subtitle}
        </p>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function SecurityPage() {
  return (
    <>
      {/* Structured Data */}
      <JsonLd
        data={breadcrumbSchema([{ name: 'Security', path: '/security' }])}
      />
      <JsonLd
        data={webPageSchema({
          name: 'Safetrekr Security Architecture',
          description:
            "Technical specification of Safetrekr's security architecture: Row Level Security, JWT authentication with 2FA, 10-role RBAC, encryption at rest and in transit, GDPR-compliant data governance.",
          path: '/security',
        })}
      />

      <div className="min-h-screen" data-security-page="">
        {/* ================================================================
            Hero Section
            ================================================================ */}
        <section className="relative flex min-h-[40vh] items-end pb-16 pt-24 md:pb-20 md:pt-32">
          <div className="mx-auto max-w-6xl px-6">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-[var(--color-text-tertiary)]">
              {SECURITY_HERO.metaLabel}
            </p>
            <h1 className="font-sans text-3xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-5xl">
              {SECURITY_HERO.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)] md:text-xl">
              {SECURITY_HERO.subtitle}
            </p>
          </div>
        </section>

        {/* ================================================================
            Architecture Credibility Badges
            ================================================================ */}
        <ArchitectureBadgeRow badges={ARCHITECTURE_BADGES} />

        {/* ================================================================
            Section 1: Data Architecture
            ================================================================ */}
        <section className="relative py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader
              metaLabel="SYSTEM // DATA ARCHITECTURE"
              title="Data architecture"
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {DATA_ARCHITECTURE_FEATURES.map((feature) => (
                <SecurityFeatureCard key={feature.id} feature={feature} />
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            Section 2: Authentication and Access Control
            ================================================================ */}
        <section className="relative bg-white/[0.02] py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader
              metaLabel="SYSTEM // AUTHENTICATION"
              title="Authentication and access control"
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {AUTH_FEATURES.map((feature) => (
                <SecurityFeatureCard key={feature.id} feature={feature} />
              ))}
            </div>

            {/* RBAC Role Table */}
            <div className="mt-16">
              <h3 className="mb-6 font-sans text-xl font-bold text-[var(--color-text-primary)]">
                Role-based access control
              </h3>
              <RBACRoleTable roles={RBAC_ROLES} summary={RBAC_SUMMARY} />
            </div>
          </div>
        </section>

        {/* ================================================================
            Section 3: Privacy and Data Governance
            ================================================================ */}
        <section className="relative py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader
              metaLabel="SYSTEM // PRIVACY"
              title="Privacy and data governance"
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {PRIVACY_FEATURES.map((feature) => (
                <SecurityFeatureCard key={feature.id} feature={feature} />
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            Section 4: Mobile Security (Traveler App)
            ================================================================ */}
        <section className="relative bg-white/[0.02] py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader
              metaLabel="SYSTEM // MOBILE SECURITY"
              title="Traveler app security"
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {MOBILE_FEATURES.map((feature) => (
                <SecurityFeatureCard key={feature.id} feature={feature} />
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            Section 5: Operational Security
            ================================================================ */}
        <section className="relative py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader
              metaLabel="SYSTEM // OPERATIONAL SECURITY"
              title="Operational security"
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {OPERATIONAL_FEATURES.map((feature) => (
                <SecurityFeatureCard key={feature.id} feature={feature} />
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            Section 6: Compliance Certifications
            ================================================================ */}
        <section className="relative bg-white/[0.02] py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            {/* Section header with visual separator */}
            <div className="mb-12 md:mb-16">
              {/* Thin separator line */}
              <div
                className="mb-8 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
                aria-hidden="true"
              />
              <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[var(--color-text-tertiary)]">
                Compliance
              </p>
              <h2 className="font-sans text-2xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-3xl">
                Compliance certifications
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--color-text-secondary)]">
                {COMPLIANCE_INTRO}
              </p>
            </div>

            {/* Certification badges grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {COMPLIANCE_CERTIFICATIONS.map((cert) => (
                <ComplianceBadge key={cert.id} certification={cert} />
              ))}
            </div>

            {/* Footer note */}
            <p className="mt-8 text-sm text-[var(--color-text-tertiary)]">
              {COMPLIANCE_FOOTER}
            </p>
          </div>
        </section>

        {/* ================================================================
            Bottom CTA
            ================================================================ */}
        <section className="relative py-20 md:py-28">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2 className="font-sans text-2xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-3xl">
              {BOTTOM_CTA.headline}
            </h2>
            <p className="mt-4 text-base text-[var(--color-text-secondary)]">
              {BOTTOM_CTA.supportingText}
            </p>
            <div className="mt-8">
              <Link
                href={BOTTOM_CTA.primaryButton.href}
                className={cn(
                  'mkt-cta-breathe',
                  'inline-flex items-center rounded-lg px-8 py-3',
                  'bg-[var(--color-ember)] text-base font-semibold text-[var(--color-void)]',
                  'transition-all duration-200',
                  'hover:bg-[var(--color-ember-bright)]',
                  'focus-visible:outline-2 focus-visible:outline-offset-2',
                  'focus-visible:outline-[var(--color-ember-bright)]',
                )}
              >
                {BOTTOM_CTA.primaryButton.label}
              </Link>
            </div>
          </div>
        </section>

        {/* ================================================================
            Print Styles
            ================================================================ */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @media print {
                /* Light background for print */
                body { background: white !important; color: #1a1a1a !important; }

                /* Remove glass-morphism effects */
                [data-security-page] * {
                  backdrop-filter: none !important;
                  -webkit-backdrop-filter: none !important;
                }

                /* Light backgrounds for cards */
                [data-security-page] article {
                  background: #f9f9f9 !important;
                  border: 1px solid #e5e5e5 !important;
                  padding: 12px !important;
                  page-break-inside: avoid;
                }

                /* Ensure text readability */
                [data-security-page] h1,
                [data-security-page] h2,
                [data-security-page] h3,
                [data-security-page] h4 { color: #1a1a1a !important; }
                [data-security-page] p,
                [data-security-page] li,
                [data-security-page] td { color: #333 !important; }
                [data-security-page] span { color: #555 !important; }

                /* Monospace labels visible in print */
                [data-security-page] .font-mono { color: #666 !important; }

                /* Remove background tints on sections */
                [data-security-page] section { background: transparent !important; }

                /* Hide CTA glow animation */
                .mkt-cta-breathe { animation: none !important; }

                /* Table readability */
                [data-security-page] table {
                  border-collapse: collapse;
                }
                [data-security-page] th,
                [data-security-page] td {
                  border: 1px solid #e5e5e5 !important;
                  padding: 8px !important;
                }
                [data-security-page] thead tr {
                  background: #f0f0f0 !important;
                }

                /* Badge row readable in print */
                [data-security-page] .rounded-full {
                  border: 1px solid #ccc !important;
                  background: #f5f5f5 !important;
                }
              }
            `,
          }}
        />
      </div>
    </>
  )
}
