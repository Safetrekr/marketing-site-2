// src/app/(marketing)/how-it-works/page.tsx

import { generatePageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema, howToSchema } from '@/lib/seo/structured-data'

export const metadata = generatePageMetadata({
  title: 'How It Works -- 4-Phase Trip Safety',
  description:
    'Plan, review, prepare, and travel with confidence. See how Safetrekr manages every phase of trip safety with independent analyst review. Learn more.',
  path: '/how-it-works',
  keywords: [
    'how trip safety software works',
    'trip safety management process',
    'independent safety review',
  ],
})

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'How It Works', path: '/how-it-works' },
        ])}
      />
      <JsonLd
        data={howToSchema([
          {
            name: 'Plan Your Trip',
            text: 'Define your itinerary, identify participants, and set safety parameters for your group trip.',
          },
          {
            name: 'Independent Safety Review',
            text: 'A certified safety analyst reviews your trip plan, identifies risks, and provides actionable recommendations.',
          },
          {
            name: 'Prepare and Coordinate',
            text: 'Distribute safety briefings, assign chaperone roles, and complete pre-departure checklists.',
          },
          {
            name: 'Travel with Confidence',
            text: 'Real-time monitoring, geo-triggered alerts, and documented accountability throughout the trip.',
          },
        ])}
      />
      <section>
        <h1>How Safetrekr Works</h1>
        {/* How It Works page content -- WS-B.3 */}
      </section>
    </>
  )
}
