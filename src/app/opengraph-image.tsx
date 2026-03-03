/**
 * Root Default OG Image
 *
 * Fallback OG image for any page that does not have a co-located
 * `opengraph-image.tsx`. Uses the same shared template as marketing
 * pages with generic Safetrekr branding.
 */

import { generateOgImage } from '@/lib/og/og-image-template'
import { OG_WIDTH, OG_HEIGHT, OG_CONTENT_TYPE } from '@/lib/og/og-constants'

export const runtime = 'edge'
export const alt =
  'Safetrekr -- Trip safety intelligence platform for schools, churches, and organizations'
export const size = { width: OG_WIDTH, height: OG_HEIGHT }
export const contentType = OG_CONTENT_TYPE

export default function OgImage() {
  return generateOgImage({
    title: 'Trip Safety Intelligence\nfor Organizations',
    description:
      'Every trip independently reviewed by a certified safety analyst. Safetrekr keeps every traveler accounted for.',
    badgeLabel: 'OVERVIEW',
    badgeIcon: 'shield',
    alt: 'Safetrekr -- Trip safety intelligence platform for schools, churches, and organizations',
  })
}
