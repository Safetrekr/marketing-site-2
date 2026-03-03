// src/app/(marketing)/about/page.tsx

import { generatePageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema } from '@/lib/seo/structured-data'

export const metadata = generatePageMetadata({
  title: 'About Safetrekr',
  description:
    'Built by safety professionals, security experts, and technologists. Meet the team behind the platform that keeps every traveler accounted for.',
  path: '/about',
  keywords: [
    'safetrekr team',
    'trip safety company',
    'travel risk management company',
  ],
})

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'About', path: '/about' }])} />
      <section>
        <h1>About Safetrekr</h1>
        {/* About page content -- WS-B.8 */}
      </section>
    </>
  )
}
