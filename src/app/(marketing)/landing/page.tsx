// src/app/(marketing)/landing/page.tsx

import '@/styles/landing.css'

import { generatePageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import {
  softwareApplicationSchema,
  breadcrumbSchema,
} from '@/lib/seo/structured-data'
import { HeroSection } from '@/components/marketing/landing/hero-section'
import { ProofStrip } from '@/components/marketing/landing/proof-strip'
import { ValuePropsSection } from '@/components/marketing/landing/value-props-section'
import { CostOfInactionSection } from '@/components/marketing/landing/cost-of-inaction-section'
import { HowItWorksSection } from '@/components/marketing/landing/how-it-works-section'
import { VerticalsSection } from '@/components/marketing/landing/verticals-section'
import { PricingPreviewSection } from '@/components/marketing/landing/pricing-preview-section'
import { BottomCTASection } from '@/components/marketing/landing/bottom-cta-section'

export const metadata = generatePageMetadata({
  title: 'Safetrekr -- Trip Safety Management for Organizations That Move People',
  description:
    'You\'re responsible for their safety. Can you prove it? Safetrekr assigns a professional safety analyst to every trip. Professionally reviewed. Actively monitored. Fully documented. Per-trip pricing starting at $450.',
  path: '/landing',
  keywords: [
    'group travel safety management',
    'trip safety platform',
    'travel risk management software',
    'duty of care travel',
    'trip safety analyst review',
  ],
})

export default function LandingPage() {
  return (
    <>
      <JsonLd data={softwareApplicationSchema()} />
      <JsonLd data={breadcrumbSchema([])} />
      <HeroSection />
      <ProofStrip />
      <ValuePropsSection />
      <CostOfInactionSection />
      <HowItWorksSection />
      <VerticalsSection />
      <PricingPreviewSection />
      <BottomCTASection />
    </>
  )
}
