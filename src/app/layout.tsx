import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { QueryProvider } from '@/components/providers/query-provider'
import { GA4Script } from '@/components/analytics/ga4-script'
import { SITE_CONFIG } from '@/lib/config/site'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  // Title template: child pages provide a title, this template wraps it.
  // If a child exports title: 'Pricing', the rendered title becomes 'Pricing | Safetrekr'.
  // The `default` is used when no child provides a title (e.g., the gateway page at /).
  title: {
    template: `%s | ${SITE_CONFIG.name}`,
    default: `${SITE_CONFIG.name} -- ${SITE_CONFIG.tagline}`,
  },

  description: SITE_CONFIG.description,

  // Favicons — must include basePath manually (Next.js metadata doesn't auto-prepend it)
  icons: {
    icon: [
      { url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/favicon-32x32.png`, sizes: '32x32', type: 'image/png' },
      { url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/favicon-16x16.png`, sizes: '16x16', type: 'image/png' },
    ],
    apple: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/apple-touch-icon.png`,
  },

  // Site-wide Open Graph defaults
  openGraph: {
    type: 'website',
    siteName: SITE_CONFIG.name,
    locale: SITE_CONFIG.locale,
    images: [
      {
        url: `${SITE_CONFIG.url}${SITE_CONFIG.defaultOgImage}`,
        width: SITE_CONFIG.ogImageDimensions.width,
        height: SITE_CONFIG.ogImageDimensions.height,
        alt: SITE_CONFIG.name,
      },
    ],
  },

  // Site-wide Twitter Card defaults
  twitter: {
    card: 'summary_large_image',
    creator: `@${SITE_CONFIG.social.twitter}`,
    site: `@${SITE_CONFIG.social.twitter}`,
  },

  // Resolves relative OG image URLs into absolute URLs.
  // Without this, OG images may render as relative paths that social
  // platforms cannot fetch.
  metadataBase: new URL(SITE_CONFIG.url),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-color-scheme="safetrekr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          colorScheme="safetrekr"
          defaultTheme="dark"
          storageKey="safetrekr-theme"
          disableTransitionOnChange
        >
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
        <GA4Script />
      </body>
    </html>
  )
}
