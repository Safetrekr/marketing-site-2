// src/app/robots.ts

import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/config/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/', // API routes -- no crawlable content
          '/login', // Authentication page -- no SEO value
          '/launch', // Spatial ZUI -- client-rendered SPA, not crawlable
          '/spike', // Dev test harness -- must never be indexed
        ],
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  }
}
