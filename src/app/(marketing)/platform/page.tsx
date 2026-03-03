// src/app/(marketing)/platform/page.tsx

import { generatePageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema } from '@/lib/seo/structured-data'

export const metadata = generatePageMetadata({
  title: 'Platform -- Duty of Care Management',
  description:
    'Real-time intelligence, geo-triggered checklists, analyst review, and mobile traveler app. The platform built for organizational duty of care. Schedule a briefing.',
  path: '/platform',
  keywords: [
    'duty of care travel management',
    'travel risk management solution',
    'trip safety platform features',
  ],
})

export default function PlatformPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([{ name: 'Platform', path: '/platform' }])}
      />
      <section>
        <h1>The Safetrekr Platform</h1>
        {/* Platform page content -- WS-B.4 */}
      </section>
    </>
  )
}
