// src/app/(marketing)/how-it-works/page.tsx

import { generatePageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema, howToSchema } from '@/lib/seo/structured-data'
import { HowItWorksHero } from '@/components/marketing/how-it-works/hero'
import { ProblemStatement } from '@/components/marketing/how-it-works/problem-statement'
import { PhaseLifecycleNav } from '@/components/marketing/how-it-works/phase-lifecycle-nav'
import { PlanPhaseSection } from '@/components/marketing/how-it-works/plan-phase-section'
import { ReviewPhaseSection } from '@/components/marketing/how-it-works/review-phase-section'
import { ConnectPhaseSection } from '@/components/marketing/how-it-works/connect-phase-section'
import { MonitorPhaseSection } from '@/components/marketing/how-it-works/monitor-phase-section'
import { DocumentPhaseSection } from '@/components/marketing/how-it-works/document-phase-section'
import { DocumentationClosing } from '@/components/marketing/how-it-works/documentation-closing'
import { BottomCtaSection } from '@/components/marketing/shared/bottom-cta-section'

export const metadata = generatePageMetadata({
  title: 'How It Works -- From Trip Idea to Defensible Record in 5 Steps',
  description:
    'Safetrekr assigns a professional safety analyst to every trip. Plan, review, connect, monitor, and document -- see how every trip gets a defensible safety record. Per-trip pricing starting at $450.',
  path: '/how-it-works',
  keywords: [
    'how trip safety software works',
    'trip safety management process',
    'independent safety review',
    'trip safety analyst',
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
            text: 'Complete our guided 10-step wizard in about 15 minutes with destinations, dates, travelers, flights, lodging, venues, itinerary, and transportation.',
          },
          {
            name: 'Professional Analyst Review',
            text: 'A trained safety analyst independently reviews your trip across 18 safety dimensions within 3-5 business days.',
          },
          {
            name: 'Travelers Get Connected',
            text: 'Travelers, chaperones, and guardians access the Traveler App with live safety checklists, emergency information, and acknowledgment tracking.',
          },
          {
            name: 'Travel With Confidence',
            text: 'Safetrekr continuously monitors conditions at your destinations from 11+ authoritative sources with analyst-reviewed alerts.',
          },
          {
            name: 'Document Everything',
            text: 'Complete trip record with board-ready packets for every stakeholder -- every alert, checklist, and safety decision documented with timestamps.',
          },
        ])}
      />
      <HowItWorksHero />
      <ProblemStatement />
      <PhaseLifecycleNav />
      <PlanPhaseSection />
      <ReviewPhaseSection />
      <ConnectPhaseSection />
      <MonitorPhaseSection />
      <DocumentPhaseSection />
      <DocumentationClosing />
      <BottomCtaSection page="how-it-works" />
    </>
  )
}
