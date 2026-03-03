// src/app/(marketing)/layout.tsx

import { JsonLd } from '@/components/seo/json-ld'
import { organizationSchema } from '@/lib/seo/structured-data'
import { MarketingHeader } from '@/components/marketing/marketing-header'
import { MarketingFooter } from '@/components/marketing/marketing-footer'

/**
 * Marketing layout.
 *
 * Wraps all marketing pages under the (marketing) route group.
 * Provides header/footer landmarks, Organization JSON-LD, and
 * skip-to-content accessibility link.
 */
export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        Skip to main content
      </a>
      <MarketingHeader />
      <main id="main-content">{children}</main>
      <MarketingFooter />
    </>
  )
}
