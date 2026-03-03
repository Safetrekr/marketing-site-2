import { MarketingHeader } from '@/components/marketing/marketing-header'
import { MarketingFooter } from '@/components/marketing/marketing-footer'
import '@/styles/marketing.css'

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded focus:bg-ember focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-void"
      >
        Skip to main content
      </a>
      <MarketingHeader />
      <main id="main-content">
        {children}
      </main>
      <MarketingFooter />
    </>
  )
}
