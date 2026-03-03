// src/app/(marketing)/contact/page.tsx

import { generatePageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema } from '@/lib/seo/structured-data'

export const metadata = generatePageMetadata({
  title: 'Schedule a Briefing',
  description:
    'Request a personalized demo of Safetrekr for your organization. See how independent safety analyst review works for your trips. Schedule a briefing today.',
  path: '/contact',
  keywords: [
    'trip safety demo',
    'safetrekr demo request',
    'schedule safety briefing',
  ],
})

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([{ name: 'Contact', path: '/contact' }])}
      />
      <section>
        <h1>Schedule a Briefing</h1>
        {/* Contact page content -- WS-B.9 */}
      </section>
    </>
  )
}
