// src/app/robots.ts

import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/config/site'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/login', // Authentication page -- no SEO value
          '/launch', // Spatial ZUI -- client-rendered SPA, not crawlable
        ],
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  }
}
