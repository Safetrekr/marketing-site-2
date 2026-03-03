// src/app/(marketing)/platform/page.tsx

import '@/styles/platform.css'

import { generatePageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import {
  breadcrumbSchema,
  webPageSchema,
} from '@/lib/seo/structured-data'
import { PlatformHero } from '@/components/marketing/platform/platform-hero'
import { PortalOverview } from '@/components/marketing/platform/portal-overview'
import { FeatureGrid } from '@/components/marketing/platform/feature-grid'
import { IntegrationOverview } from '@/components/marketing/platform/integration-overview'
import { PlatformCTA } from '@/components/marketing/platform/platform-cta'

export const metadata = generatePageMetadata({
  title: 'Platform -- Trip Safety Management Features',
  description:
    'Four portals. 10-step trip wizard. Independent analyst review. Real-time intelligence. 46-endpoint protection system. Offline-first traveler app. See the full Safetrekr platform.',
  path: '/platform',
  keywords: [
    'trip safety platform features',
    'duty of care travel management',
    'travel risk management solution',
    'trip safety software',
  ],
})

export default function PlatformPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([{ name: 'Platform', path: '/platform' }])}
      />
      <JsonLd
        data={webPageSchema({
          name: 'Safetrekr Platform',
          description:
            'Four portals. 10-step trip wizard. Independent analyst review. Real-time intelligence. 46-endpoint protection system. Offline-first traveler app.',
          path: '/platform',
        })}
      />
      <div className="flex flex-col">
        <PlatformHero />
        <PortalOverview />
        <FeatureGrid />
        <IntegrationOverview />
        <PlatformCTA />
      </div>
    </>
  )
}
