// src/app/(marketing)/legal/terms/page.tsx

import { generatePageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema } from '@/lib/seo/structured-data'

export const metadata = generatePageMetadata({
  title: 'Terms of Service',
  description:
    'Safetrekr terms of service. Read our legal terms governing the use of the Safetrekr trip safety management platform.',
  path: '/legal/terms',
  noIndex: false, // Legal pages should be indexable for transparency
})

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Terms of Service', path: '/legal/terms' },
        ])}
      />
      <section>
        <h1>Terms of Service</h1>
        {/* Terms of Service content -- WS-B.10 */}
      </section>
    </>
  )
}
