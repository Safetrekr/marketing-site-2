// src/app/(marketing)/pricing/page.tsx

import { generatePageMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import {
  productSchema,
  faqPageSchema,
  breadcrumbSchema,
} from '@/lib/seo/structured-data'
import {
  PRICING_TIERS,
  PRICING_FAQ_ITEMS,
  PRICING_ADD_ONS,
  VALUE_REFRAME,
} from '@/lib/data/pricing'
import { PricingHero } from '@/components/marketing/pricing/pricing-hero'
import { PricingTierGrid } from '@/components/marketing/pricing/pricing-tier-grid'
import { ValueReframeSection } from '@/components/marketing/pricing/value-reframe-section'
import { AddOnsSection } from '@/components/marketing/pricing/add-ons-section'
import { PricingFAQ } from '@/components/marketing/pricing/pricing-faq'
import { PricingObjectionHook } from '@/components/marketing/pricing/pricing-objection-hook'
import { PricingBottomCta } from '@/components/marketing/pricing/pricing-bottom-cta'

// ─── SEO Metadata ─────────────────────────────────────────────────

export const metadata = generatePageMetadata({
  title: 'Pricing -- Per-Trip Safety Management',
  description:
    'Per-trip pricing from $450. No annual contracts. Every trip includes independent safety review, intelligence monitoring, and full audit trail. Compare plans.',
  path: '/pricing',
  keywords: [
    'trip safety management pricing',
    'group travel safety cost',
    'school trip safety pricing',
    'travel risk management pricing',
    'per trip safety pricing',
  ],
})

// ─── Page Component ───────────────────────────────────────────────

export default function PricingPage() {
  // Prepare FAQ items for structured data (strip unresolved items)
  const resolvedFaqItems = PRICING_FAQ_ITEMS.filter(
    (item) => !item.unresolved,
  ).map((item) => ({
    question: item.question,
    answer: item.answer,
  }))

  return (
    <>
      {/* Structured Data */}
      <JsonLd data={productSchema()} />
      <JsonLd data={faqPageSchema(resolvedFaqItems)} />
      <JsonLd
        data={breadcrumbSchema([{ name: 'Pricing', path: '/pricing' }])}
      />

      {/* Page Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <PricingHero />

        <PricingTierGrid tiers={PRICING_TIERS} />

        <AddOnsSection addOns={PRICING_ADD_ONS} />

        <ValueReframeSection data={VALUE_REFRAME} />

        <PricingObjectionHook />

        <PricingFAQ items={PRICING_FAQ_ITEMS} />

        <PricingBottomCta />
      </div>
    </>
  )
}
