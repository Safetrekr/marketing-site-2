// src/lib/data/testimonials.ts

import type { Testimonial, CapabilityProof } from '@/lib/interfaces/social-proof'

/**
 * Capability proof cards -- the current placeholder content from WS-B.2.
 * Retained for hybrid mode. These are displayed when fewer than 3
 * real testimonials are available.
 */
export const CAPABILITY_PROOFS: CapabilityProof[] = [
  {
    stat: '18',
    label: 'Review dimensions per trip',
    description:
      'Every trip reviewed by an independent safety analyst across 18 safety dimensions before departure.',
  },
  {
    stat: '46',
    label: 'Protection endpoints',
    description:
      'Rally points, safe houses, geofencing, SMS broadcast, and evacuation plans -- active and connected.',
  },
  {
    stat: '4',
    label: 'Integrated portals',
    description:
      'Client, Analyst, HQ, and Traveler portals working from one system of record.',
  },
]

/**
 * Customer testimonials. Replace placeholder entries with real quotes
 * as pilot customers provide them.
 *
 * HOW TO ADD A TESTIMONIAL:
 * 1. Add a new object to this array following the Testimonial interface
 * 2. Set `featured: true` if it should appear on the landing page
 * 3. Add a headshot to /public/images/testimonials/ (optional, 128x128 min)
 * 4. Run `pnpm typecheck` to verify the entry
 * 5. Deploy -- the testimonial appears automatically
 *
 * IMPORTANT: All testimonials require written permission from the customer.
 * Do not publish quotes without explicit approval.
 */
export const TESTIMONIALS: Testimonial[] = [
  // --- PLACEHOLDER ENTRIES (remove as real testimonials are added) ---
  // These will not render because the SocialProofSection checks
  // TESTIMONIALS.length to decide between testimonial and capability mode.
]

/**
 * Returns the social proof content for the landing page.
 * - If 3+ featured testimonials exist, returns testimonials only.
 * - If 1-2 featured testimonials exist, returns testimonials + capability proofs to fill 3 slots.
 * - If 0 testimonials exist, returns capability proofs (launch default).
 */
export function getLandingPageSocialProof(): {
  testimonials: Testimonial[]
  capabilityProofs: CapabilityProof[]
  mode: 'testimonials' | 'hybrid' | 'capability'
} {
  const featured = TESTIMONIALS.filter((t) => t.featured).sort(
    (a, b) => a.order - b.order,
  )

  if (featured.length >= 3) {
    return {
      testimonials: featured.slice(0, 3),
      capabilityProofs: [],
      mode: 'testimonials',
    }
  }

  if (featured.length > 0) {
    const remainingSlots = 3 - featured.length
    return {
      testimonials: featured,
      capabilityProofs: CAPABILITY_PROOFS.slice(0, remainingSlots),
      mode: 'hybrid',
    }
  }

  return {
    testimonials: [],
    capabilityProofs: CAPABILITY_PROOFS,
    mode: 'capability',
  }
}
