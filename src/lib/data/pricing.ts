// src/lib/data/pricing.ts

import type {
  PricingTier,
  PricingAddOn,
  PricingFAQItem,
} from '@/lib/interfaces/pricing'

// ─── [UNVALIDATED] Flag ──────────────────────────────────────────
// All dollar amounts in this file are working assumptions from the
// product codebase. Business owner must confirm before the pricing
// page goes live. See Q-1 (per-trip prices) and Q-2 (free trial).
// ──────────────────────────────────────────────────────────────────

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'day-trip',
    name: 'Day Trip',
    tagline: 'Local and day travel with structured safety management.',
    priceUsd: 450_00, // [UNVALIDATED] $450/trip
    unit: '/trip',
    highlighted: false,
    ctaLabel: 'Schedule a Briefing',
    ctaHref: '/contact',
    features: [
      { label: '10-step trip planning wizard', included: true },
      { label: 'Independent safety analyst review', included: true },
      { label: 'Document and consent collection', included: true },
      { label: 'Background check tracking', included: true },
      { label: 'Emergency preparedness configuration', included: true },
      { label: 'Safety checklist delivery', included: true },
      { label: 'Full audit trail', included: true },
      { label: 'Lodging review with fire safety', included: false },
      { label: 'Extended intelligence monitoring', included: false },
      { label: 'International destination intelligence', included: false },
    ],
  },
  {
    id: 'domestic-overnight',
    name: 'Domestic Overnight',
    tagline: 'Multi-day domestic travel with extended monitoring.',
    priceUsd: 750_00, // [UNVALIDATED] $750/trip
    unit: '/trip',
    highlighted: true,
    badge: 'Most Popular',
    ctaLabel: 'Schedule a Briefing',
    ctaHref: '/contact',
    features: [
      { label: '10-step trip planning wizard', included: true },
      { label: 'Independent safety analyst review', included: true },
      { label: 'Document and consent collection', included: true },
      { label: 'Background check tracking', included: true },
      { label: 'Emergency preparedness configuration', included: true },
      { label: 'Safety checklist delivery', included: true },
      { label: 'Full audit trail', included: true },
      { label: 'Lodging review with fire safety', included: true },
      { label: 'Extended intelligence monitoring', included: true },
      { label: 'Day-by-day itinerary management', included: true },
      { label: 'Transportation documentation', included: true },
      { label: 'Lodging geofence with safe zone', included: true },
      { label: 'International destination intelligence', included: false },
    ],
  },
  {
    id: 'international',
    name: 'International',
    tagline: 'International travel with full-spectrum safety intelligence.',
    priceUsd: 1250_00, // [UNVALIDATED] $1,250/trip
    unit: '/trip',
    highlighted: false,
    ctaLabel: 'Schedule a Briefing',
    ctaHref: '/contact',
    features: [
      { label: '10-step trip planning wizard', included: true },
      { label: 'Independent safety analyst review', included: true },
      { label: 'Document and consent collection', included: true },
      { label: 'Background check tracking', included: true },
      { label: 'Emergency preparedness configuration', included: true },
      { label: 'Safety checklist delivery', included: true },
      { label: 'Full audit trail', included: true },
      { label: 'Lodging review with fire safety', included: true },
      { label: 'Extended intelligence monitoring', included: true },
      { label: 'Day-by-day itinerary management', included: true },
      { label: 'Transportation documentation', included: true },
      { label: 'Lodging geofence with safe zone', included: true },
      { label: 'International destination intelligence', included: true },
      { label: 'Visa and passport tracking', included: true },
      { label: 'Three-tier evacuation protocols', included: true },
      { label: 'Medical facility directory', included: true },
      { label: 'Senior analyst assignment', included: true },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'High-volume organizations and custom requirements.',
    priceUsd: null,
    unit: '',
    highlighted: false,
    ctaLabel: 'Contact Sales',
    ctaHref: '/contact',
    features: [
      { label: 'Volume pricing', included: true },
      { label: 'Dedicated analyst teams', included: true },
      { label: 'Custom integrations', included: true },
      { label: 'Priority support', included: true },
      { label: 'Custom reporting', included: true },
      { label: 'SSO and provisioning', included: true },
    ],
  },
]

export const PRICING_ADD_ONS: PricingAddOn[] = [
  {
    name: 'Background Checks',
    priceDisplay: '$35/check', // [UNVALIDATED]
    description:
      '5 check types: criminal, sex offender, driving, employment, education. Results tracked in participant compliance matrix.',
    integrationNote: 'Checkr, Sterling, or GoodHire integration',
  },
  {
    name: 'Travel Insurance',
    priceDisplay: '$25/participant', // [UNVALIDATED]
    description:
      'Per-participant travel insurance integrated directly into the trip workflow. Added during Step 9 of the trip wizard.',
  },
]

export const PRICING_FAQ_ITEMS: PricingFAQItem[] = [
  {
    question: 'Is there an annual fee?',
    answer:
      'No. You pay per trip. No minimum commitment. No seat licenses. No annual contracts.',
  },
  {
    question: 'What if we only run 2-3 trips a year?',
    answer:
      'Safetrekr is built for organizations of every size. Per-trip pricing means you pay only when you travel. Organizations with infrequent travel often have the least established safety processes -- which means they have the most to gain.',
  },
  {
    question: 'Can we purchase trip credits in advance?',
    answer:
      'Yes. Credit packages are available for organizations that want volume pricing. Contact sales for details.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'Credit card, check, and wire transfer. Stripe-powered payment processing with receipt generation.',
  },
  {
    question: 'What exactly is included in each tier?',
    answer:
      'Every tier includes the full Safetrekr platform: 10-step trip wizard, independent analyst review, document collection, background check tracking, safety checklists, emergency preparedness, traveler delivery via mobile app, and complete audit trail. Higher tiers add capabilities matched to trip complexity -- lodging review, extended intelligence monitoring, and international documentation tracking.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Contact our team for current trial availability and pilot program options.',
    unresolved: true, // Q-2 unresolved -- update when business owner confirms
  },
  {
    question: 'What happens if I need to cancel a trip?',
    answer:
      'Contact our team for details on our cancellation and rescheduling policy.',
    unresolved: true, // Cancellation policy TBD
  },
  {
    question: 'Do you offer volume discounts?',
    answer:
      'Yes. Organizations running more than 10 trips per year qualify for volume pricing through our Enterprise plan. Contact sales for a custom quote.',
  },
]

// ─── Value Reframe Data ──────────────────────────────────────────

export const VALUE_REFRAME = {
  headline: 'Less than 1% of most trip budgets.',
  comparisons: [
    {
      label: 'Average school field trip cost',
      range: '$200-500 per student',
    },
    {
      label: 'Domestic overnight cost',
      range: '$500-1,500 per traveler',
    },
    {
      label: 'International trip cost',
      range: '$2,000-5,000+ per participant',
    },
  ],
  examples: [
    {
      scenario: '30-person domestic overnight',
      tierPrice: 750, // [UNVALIDATED]
      perTraveler: 25, // $750 / 30
      tierName: 'T2',
    },
    {
      scenario: '20-person international trip',
      tierPrice: 1250, // [UNVALIDATED]
      perTraveler: 62.5, // $1,250 / 20
      tierName: 'T3',
    },
  ],
  incidentCost:
    'Compare that to the cost of one unmanaged incident: legal consultation starts at $300/hour. A single liability claim can exceed six figures. Insurance premium increases after an incident are permanent.',
  closingStatement:
    'Safetrekr is not an expense line. It is the cost of documented accountability.',
} as const
