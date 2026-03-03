// src/app/(marketing)/landing/page.tsx

import { generatePageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import {
  softwareApplicationSchema,
  breadcrumbSchema,
} from '@/lib/seo/structured-data'

export const metadata = generatePageMetadata({
  title: 'Trip Safety Intelligence for Organizations',
  description:
    'Safetrekr manages trip safety for schools, churches, and organizations. Every trip independently reviewed by a certified safety analyst. Book a demo.',
  path: '/landing',
  keywords: [
    'group travel safety management',
    'trip safety platform',
    'travel risk management software',
    'duty of care travel',
  ],
})

export default function LandingPage() {
  return (
    <>
      <JsonLd data={softwareApplicationSchema()} />
      <JsonLd data={breadcrumbSchema([])} />
      <section>
        <h1>Trip Safety Intelligence for Organizations</h1>
        {/* Landing page content -- WS-B.2 */}
      </section>
    </>
  )
}
