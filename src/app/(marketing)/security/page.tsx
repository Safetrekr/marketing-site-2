// src/app/(marketing)/security/page.tsx

import { generatePageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema } from '@/lib/seo/structured-data'

export const metadata = generatePageMetadata({
  title: 'Security and Compliance',
  description:
    'SOC 2, encryption at rest and in transit, role-based access, and audit logging. See how Safetrekr protects your organization and traveler data. Learn more.',
  path: '/security',
  keywords: [
    'trip safety software security',
    'travel management data security',
    'duty of care compliance',
  ],
})

export default function SecurityPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([{ name: 'Security', path: '/security' }])}
      />
      <section>
        <h1>Security and Compliance</h1>
        {/* Security page content -- WS-B.7 */}
      </section>
    </>
  )
}
