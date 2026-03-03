/**
 * GA4Script -- Google Analytics 4 script injection component.
 *
 * Server component that conditionally renders GA4 gtag.js scripts
 * using `next/script` with `strategy="afterInteractive"`. The scripts
 * only render when NEXT_PUBLIC_GA4_MEASUREMENT_ID is set, preventing
 * console errors in development and avoiding localhost data pollution.
 *
 * Place this component inside the root layout's `<body>`, after the
 * main content providers.
 *
 * @example
 * ```tsx
 * // src/app/layout.tsx
 * import { GA4Script } from '@/components/analytics/ga4-script'
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html lang="en">
 *       <body>
 *         {children}
 *         <GA4Script />
 *       </body>
 *     </html>
 *   )
 * }
 * ```
 *
 * @module ga4-script
 */

import Script from 'next/script'

const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID

/**
 * Renders GA4 gtag.js script tags when a measurement ID is configured.
 * Returns null when NEXT_PUBLIC_GA4_MEASUREMENT_ID is not set.
 *
 * Uses `strategy="afterInteractive"` so analytics loads after hydration
 * completes, never blocking first paint or time-to-interactive.
 */
export function GA4Script() {
  if (!GA4_MEASUREMENT_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA4_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: true,
            });
          `,
        }}
      />
    </>
  )
}
