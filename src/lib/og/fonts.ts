/**
 * Font Loading Utility for OG Image Generation
 *
 * Loads Geist Sans and Geist Mono font files as ArrayBuffers for the
 * Satori renderer used by Next.js `ImageResponse`. The fonts are bundled
 * as static assets at `src/assets/fonts/` and resolved via `import.meta.url`
 * at build time by the Edge runtime bundler.
 *
 * Geist is a variable-weight font, so a single file supports multiple
 * weight registrations. We register it at weights 400 (Regular) and 700
 * (Bold) to enable Satori's weight-based rendering.
 */

import { FONT_SANS, FONT_MONO } from './og-constants'

export interface OgFont {
  name: string
  data: ArrayBuffer
  weight: 400 | 700
  style: 'normal'
}

/**
 * Load all font files required for OG image rendering.
 * Returns an array of font descriptors compatible with the
 * `ImageResponse` constructor's `fonts` option.
 */
export async function loadOgFonts(): Promise<OgFont[]> {
  const [geistSansData, geistMonoData] = await Promise.all([
    fetch(
      new URL('../../assets/fonts/GeistSans-Regular.woff2', import.meta.url)
    ).then((res) => res.arrayBuffer()),
    fetch(
      new URL('../../assets/fonts/GeistMono-Regular.woff2', import.meta.url)
    ).then((res) => res.arrayBuffer()),
  ])

  return [
    {
      name: FONT_SANS,
      data: geistSansData,
      weight: 700 as const,
      style: 'normal' as const,
    },
    {
      name: FONT_SANS,
      data: geistSansData,
      weight: 400 as const,
      style: 'normal' as const,
    },
    {
      name: FONT_MONO,
      data: geistMonoData,
      weight: 400 as const,
      style: 'normal' as const,
    },
  ]
}
