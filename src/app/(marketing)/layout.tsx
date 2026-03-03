// src/app/(marketing)/layout.tsx

import { JsonLd } from '@/components/seo/json-ld'
import { organizationSchema } from '@/lib/seo/structured-data'

/**
 * Marketing layout.
 *
 * Wraps all marketing pages under the (marketing) route group.
 * Injects Organization JSON-LD on every marketing page to avoid
 * duplicating the schema in each individual page file.
 *
 * Header and footer components will be added by WS-A.1 when those
 * components are built. This layout currently provides:
 * - Organization structured data
 * - Skip-to-content accessibility link
 * - Main content landmark
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
      <main id="main-content">{children}</main>
    </>
  )
}
