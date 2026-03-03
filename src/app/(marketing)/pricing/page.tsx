// src/app/(marketing)/pricing/page.tsx

import { generatePageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema, productSchema } from '@/lib/seo/structured-data'

export const metadata = generatePageMetadata({
  title: 'Pricing -- Per-Trip Safety Management',
  description:
    'Trip safety starting at $450 per trip. Independent analyst review included in every tier. Day trips, overnight, and international plans. Compare pricing.',
  path: '/pricing',
  keywords: [
    'trip safety management pricing',
    'group travel safety cost',
    'per-trip safety management',
  ],
})

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([{ name: 'Pricing', path: '/pricing' }])}
      />
      <JsonLd data={productSchema()} />
      {/* FAQPage JSON-LD will be added when WS-B.5 provides FAQ content */}
      <section>
        <h1>Pricing</h1>
        {/* Pricing page content -- WS-B.5 */}
      </section>
    </>
  )
}
