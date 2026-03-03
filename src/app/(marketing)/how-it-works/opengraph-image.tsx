import { generateOgImage } from '@/lib/og/og-image-template'
import {
  OG_WIDTH,
  OG_HEIGHT,
  OG_CONTENT_TYPE,
  OG_PAGE_CONFIGS,
} from '@/lib/og/og-constants'

export const runtime = 'edge'
export const alt = OG_PAGE_CONFIGS['how-it-works'].alt
export const size = { width: OG_WIDTH, height: OG_HEIGHT }
export const contentType = OG_CONTENT_TYPE

export default function OgImage() {
  return generateOgImage(OG_PAGE_CONFIGS['how-it-works'])
}
