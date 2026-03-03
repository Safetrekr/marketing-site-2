// src/app/(marketing)/legal/privacy/page.tsx

import { generatePageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema } from '@/lib/seo/structured-data'

export const metadata = generatePageMetadata({
  title: 'Privacy Policy',
  description:
    'Safetrekr privacy policy. Learn how we collect, use, and protect your data on the Safetrekr trip safety management platform.',
  path: '/legal/privacy',
  noIndex: false, // Legal pages should be indexable for transparency
})

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Privacy Policy', path: '/legal/privacy' },
        ])}
      />
      <section>
        <h1>Privacy Policy</h1>
        {/* Privacy Policy content -- WS-B.10 */}
      </section>
    </>
  )
}
