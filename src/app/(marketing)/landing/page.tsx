// src/app/(marketing)/landing/page.tsx

import '@/styles/landing.css'

import { generatePageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import {
  softwareApplicationSchema,
  breadcrumbSchema,
} from '@/lib/seo/structured-data'
import { HeroSection } from '@/components/marketing/landing/hero-section'
import { ValuePropsSection } from '@/components/marketing/landing/value-props-section'
import { HowItWorksSection } from '@/components/marketing/landing/how-it-works-section'
import { VerticalsSection } from '@/components/marketing/landing/verticals-section'
import { SocialProofSection } from '@/components/marketing/landing/social-proof-section'
import { BottomCTASection } from '@/components/marketing/landing/bottom-cta-section'

export const metadata = generatePageMetadata({
  title: 'Safetrekr -- Trip Safety Management for Organizations That Move People',
  description:
    'Every traveler accounted for. Safetrekr replaces spreadsheets and email chains with a documented, auditable safety platform. Independent analyst review. Real-time intelligence. Per-trip pricing.',
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
      <HeroSection />
      <ValuePropsSection />
      <HowItWorksSection />
      <VerticalsSection />
      <SocialProofSection />
      <BottomCTASection />
    </>
  )
}
