// src/lib/data/pricing.ts

import type {
  PricingTier,
  PricingAddOn,
  PricingFAQItem,
} from '@/lib/interfaces/pricing'

// ─── Pricing Source ─────────────────────────────────────────────
// Per-trip pricing confirmed via reference marketing site.
// Business owner should verify before go-live.
// ────────────────────────────────────────────────────────────────

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'day-trip',
    name: 'Domestic Day Trip',
    tagline: 'Local field trips, day trips, single overnight stays, and in-state travel.',
    priceUsd: 450_00,
    unit: '/trip',
    highlighted: false,
    ctaLabel: 'Request a Sample Trip Package',
    ctaHref: '/contact',
    features: [
      { label: 'Professional analyst review across 18 dimensions', included: true },
      { label: 'Structured emergency preparedness plan', included: true },
      { label: 'Real-time intelligence monitoring', included: true },
      { label: 'Traveler App for your entire group', included: true },
      { label: 'Board-ready trip packets (4 role-based variants)', included: true },
      { label: 'Full audit trail', included: true },
      { label: 'Typical turnaround: 3-5 business days', included: true },
    ],
  },
  {
    id: 'domestic-overnight',
    name: 'Domestic Multi-Day Trip',
    tagline: 'Multi-day trips, out-of-state travel, multiple lodging sites, and regional tours.',
    priceUsd: 750_00,
    unit: '/trip',
    highlighted: true,
    badge: 'Most Popular',
    ctaLabel: 'Request a Sample Trip Package',
    ctaHref: '/contact',
    features: [
      { label: 'Everything in Day Trip, plus:', included: true },
      { label: 'Multi-site itinerary review', included: true },
      { label: 'Route safety analysis', included: true },
      { label: 'Multiple lodging verification with fire safety', included: true },
      { label: 'Extended emergency resource mapping', included: true },
      { label: 'Typical turnaround: 5-7 business days', included: true },
    ],
  },
  {
    id: 'international',
    name: 'International Trip',
    tagline: 'International travel, study abroad, mission trips, and complex multi-destination itineraries.',
    priceUsd: 1250_00,
    unit: '/trip',
    highlighted: false,
    ctaLabel: 'Request a Sample Trip Package',
    ctaHref: '/contact',
    features: [
      { label: 'Everything in Multi-Day, plus:', included: true },
      { label: 'International safety protocols', included: true },
      { label: 'Embassy and consulate mapping', included: true },
      { label: 'Medical evacuation planning', included: true },
      { label: 'Country-specific intelligence assessment', included: true },
      { label: 'Small groups (9 or fewer): $750', included: true },
      { label: 'Typical turnaround: 7-10 business days', included: true },
    ],
  },
]

export const PRICING_ADD_ONS: PricingAddOn[] = [
  {
    name: 'Background Check (Domestic)',
    priceDisplay: '$35/person',
    description:
      'U.S. background checks for chaperones and volunteers. Five check types available: criminal, sex offender registry, driving record, employment verification, and education verification. Results tracked at the organization level across trips.',
    integrationNote: 'Checkr, Sterling, or GoodHire integration',
  },
  {
    name: 'Background Check (International)',
    priceDisplay: '$65/person',
    description:
      'International background checks for adults with international travel history. A chaperone cleared this semester does not need to be re-screened next semester if their check is current.',
  },
]

export const PRICING_FAQ_ITEMS: PricingFAQItem[] = [
  {
    question: 'How do I know which tier is right for my trip?',
    answer:
      'Our tier system is based on trip complexity, not distance or duration alone. Choose Tier 1 for local day trips or single-night stays within your state. Choose Tier 2 for multi-day domestic trips with multiple destinations. Choose Tier 3 for any international travel. Still unsure? Our team can help you select the right tier during the quote process.',
  },
  {
    question: 'Do you offer volume discounts?',
    answer:
      'Yes! Organizations managing 5 or more trips per year qualify for volume pricing. Additionally, recurring annual trips (the same trip run each year) receive a 25% discount starting in year two. Contact us for a custom volume quote based on your trip mix.',
  },
  {
    question: 'What\'s included in the base trip price?',
    answer:
      'Every trip includes: professional analyst review across 18 dimensions, structured emergency preparedness plan, real-time intelligence monitoring from 11+ authoritative government sources, Traveler App access for your entire group with live checklists and alerts, board-ready trip packets in 4 role-based variants, document and consent collection, certification tracking, and a full audit trail. Higher tiers add multi-site review, international protocols, embassy mapping, and evacuation planning.',
  },
  {
    question: 'How do refunds work?',
    answer:
      'If you cancel a trip before our analyst begins work, you receive a full refund. If work has started but hasn\'t been completed, you receive a 50% refund. Once your trip packet is delivered, the fee is non-refundable (though you can use the packet for future trips to the same destinations). We understand plans change and work with you to reschedule or repurpose our work whenever possible.',
  },
  {
    question: 'Can I pay via invoice or purchase order?',
    answer:
      'Absolutely! We accept credit card, ACH transfer, invoice (net 30), and purchase orders from schools, universities, churches, and established organizations. For first-time customers, we require payment upfront via credit card. After your first successful trip, we can set up invoicing or PO terms.',
  },
  {
    question: 'Are there any hidden fees or per-user charges?',
    answer:
      'No. What you see is what you pay. Our pricing is per-trip, not per-user. You can have as many travelers, chaperones, and stakeholders as needed at no additional charge. The only additional costs are optional add-ons like background checks that you explicitly select. There are no setup fees, maintenance fees, or surprise charges.',
  },
  {
    question: 'How does pricing work for recurring annual trips?',
    answer:
      'If you run the same trip annually (e.g., senior class trip to Washington DC), we offer a 25% discount on the second year and all subsequent years. Your analyst builds on the previous year\'s review, updates the trip with current conditions and intelligence, and re-validates all locations at the discounted rate.',
  },
  {
    question: 'What if I need to change my trip after paying?',
    answer:
      'Minor changes (date adjustments, small itinerary tweaks) are accommodated as part of the review process. Major changes (destination changes, adding multiple days, changing from domestic to international) may require upgrading to a higher tier. We work with you to accommodate changing plans without unnecessary charges.',
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
      scenario: '30-person day trip',
      tierPrice: 450,
      perTraveler: 15,
      tierName: 'T1',
    },
    {
      scenario: '30-person domestic overnight',
      tierPrice: 750,
      perTraveler: 25,
      tierName: 'T2',
    },
    {
      scenario: '30-person international trip',
      tierPrice: 1250,
      perTraveler: 42,
      tierName: 'T3',
    },
  ],
  incidentCost:
    'Compare that to the cost of one unmanaged incident: legal consultation starts at $300/hour. A single liability claim can exceed six figures. Insurance premium increases after an incident are permanent.',
  closingStatement:
    'Safetrekr is not an expense line. It is the cost of documented accountability.',
} as const
