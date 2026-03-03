// src/app/(marketing)/how-it-works/page.tsx

import { generatePageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema, howToSchema } from '@/lib/seo/structured-data'
import { HowItWorksHero } from '@/components/marketing/how-it-works/hero'
import { ProblemStatement } from '@/components/marketing/how-it-works/problem-statement'
import { PhaseLifecycleNav } from '@/components/marketing/how-it-works/phase-lifecycle-nav'
import { PlanPhaseSection } from '@/components/marketing/how-it-works/plan-phase-section'
import { ReviewPhaseSection } from '@/components/marketing/how-it-works/review-phase-section'
import { ProtectPhaseSection } from '@/components/marketing/how-it-works/protect-phase-section'
import { MonitorPhaseSection } from '@/components/marketing/how-it-works/monitor-phase-section'
import { DocumentationClosing } from '@/components/marketing/how-it-works/documentation-closing'
import { BottomCtaSection } from '@/components/marketing/shared/bottom-cta-section'

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
      <HowItWorksHero />
      <ProblemStatement />
      <PhaseLifecycleNav />
      <PlanPhaseSection />
      <ReviewPhaseSection />
      <ProtectPhaseSection />
      <MonitorPhaseSection />
      <DocumentationClosing />
      <BottomCtaSection page="how-it-works" />
    </>
  )
}
