/**
 * useScrollDepth -- tracks scroll depth at 25/50/75/100% thresholds.
 *
 * Each threshold fires exactly once per page load. The hook resets
 * when the pathname changes (client-side navigation).
 *
 * Uses a passive scroll listener for zero layout-thread impact.
 *
 * @example
 * ```tsx
 * 'use client'
 * import { useScrollDepth } from '@/hooks/use-scroll-depth'
 *
 * export function MarketingLayout({ children }) {
 *   useScrollDepth()
 *   return <main>{children}</main>
 * }
 * ```
 *
 * @module use-scroll-depth
 */

'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { trackEvent, getPagePath } from '@/lib/analytics'

const THRESHOLDS = [25, 50, 75, 100] as const
type ScrollThreshold = (typeof THRESHOLDS)[number]

export function useScrollDepth(): void {
  const firedRef = useRef<Set<ScrollThreshold>>(new Set())
  const pathname = usePathname()

  useEffect(() => {
    // Reset fired thresholds on route change
    const fired = firedRef.current
    fired.clear()

    function handleScroll() {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) return

      const scrollPercent = Math.round(
        (window.scrollY / scrollHeight) * 100,
      )

      for (const threshold of THRESHOLDS) {
        if (scrollPercent >= threshold && !fired.has(threshold)) {
          fired.add(threshold)
          trackEvent('engage_scroll_depth', {
            percent: threshold,
            page_path: getPagePath(),
          })
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Fire immediately in case the page is already scrolled
    // (e.g., short pages where 100% is visible without scrolling)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])
}
