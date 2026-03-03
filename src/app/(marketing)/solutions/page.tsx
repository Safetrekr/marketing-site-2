// src/app/(marketing)/solutions/page.tsx

import { generatePageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema } from '@/lib/seo/structured-data'

export const metadata = generatePageMetadata({
  title: 'Solutions by Industry',
  description:
    'Trip safety management for K-12 schools, churches, youth sports, higher ed, and businesses. See how Safetrekr fits your organization. Compare solutions.',
  path: '/solutions',
  keywords: [
    'school trip safety software',
    'mission trip safety',
    'youth sports travel management',
    'study abroad risk management',
  ],
})

export default function SolutionsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([{ name: 'Solutions', path: '/solutions' }])}
      />
      <section>
        <h1>Solutions by Industry</h1>
        {/* Solutions page content -- WS-B.6 */}
      </section>
    </>
  )
}
