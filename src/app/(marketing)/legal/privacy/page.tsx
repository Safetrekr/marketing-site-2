// src/app/(marketing)/legal/privacy/page.tsx

import { generatePageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema } from '@/lib/seo/structured-data'
import { LegalProse } from '@/components/marketing/legal-prose'
import { LegalToc } from '@/components/marketing/legal-toc'
import { readLegalContent, formatDate } from '@/lib/legal-utils'

export const metadata = generatePageMetadata({
  title: 'Privacy Policy',
  description:
    'Privacy Policy for the Safetrekr travel safety platform. Learn how we collect, use, and protect your personal information and trip data.',
  path: '/legal/privacy',
  noIndex: false,
})

export default async function PrivacyPage() {
  const { content, tocEntries, lastUpdated } =
    await readLegalContent('privacy.md')

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Privacy Policy', path: '/legal/privacy' },
        ])}
      />

      {/* Last updated banner */}
      <div className="mb-8 flex items-center gap-3">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-text-tertiary)]">
          Last updated
        </span>
        <time
          className="font-mono text-xs text-[var(--color-text-secondary)]"
          dateTime={lastUpdated}
        >
          {formatDate(lastUpdated)}
        </time>
      </div>

      {/* Two-column layout: prose content + TOC sidebar */}
      <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-12">
        {/* Content card */}
        <div className="legal-prose-card rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 lg:p-12">
          <LegalProse content={content} />
        </div>

        {/* Sidebar TOC (desktop only) */}
        <LegalToc entries={tocEntries} />
      </div>
    </>
  )
}
