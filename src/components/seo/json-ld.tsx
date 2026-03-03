// src/components/seo/json-ld.tsx

/**
 * Renders one or more JSON-LD structured data blocks as <script> tags.
 *
 * Server component -- no 'use client' directive. JSON-LD is static markup
 * that does not need client-side interactivity.
 *
 * Usage:
 * ```tsx
 * import { JsonLd } from '@/components/seo/json-ld'
 * import { organizationSchema, breadcrumbSchema } from '@/lib/seo/structured-data'
 *
 * export default function PricingPage() {
 *   return (
 *     <>
 *       <JsonLd data={organizationSchema()} />
 *       <JsonLd data={breadcrumbSchema([{ name: 'Pricing', path: '/pricing' }])} />
 *       // ... page content ...
 *     </>
 *   )
 * }
 * ```
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
