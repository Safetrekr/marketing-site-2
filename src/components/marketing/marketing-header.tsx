'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BASE_PATH } from '@/lib/config/site'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_ITEMS, CTA_CONFIG } from '@/lib/config/marketing-nav'
import { MarketingMobileNav } from './marketing-mobile-nav'

export function MarketingHeader() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20)
    }

    // Check initial scroll position
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 right-0 left-0 z-50',
          'h-14 md:h-16',
          'bg-white/[0.04] backdrop-blur-[16px] backdrop-saturate-[130%]',
          'border-b border-white/[0.06]',
          'transition-colors duration-300',
          isScrolled && 'mkt-header-scrolled'
        )}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-8"
        >
          {/* Desktop logo */}
          <Link href="/launch" className="hidden md:block" aria-label="Safetrekr home">
            <Image
              src={`${BASE_PATH}/images/logos/safetrekr-logo-horiz-light.svg`}
              alt="Safetrekr"
              width={120}
              height={28}
              className="h-7 w-auto"
              priority
            />
          </Link>

          {/* Mobile logo mark */}
          <Link href="/launch" className="block md:hidden" aria-label="Safetrekr home">
            <Image
              src={`${BASE_PATH}/images/logos/safetrekr-mark-light.svg`}
              alt="Safetrekr"
              width={32}
              height={32}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200',
                      'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/[0.04]',
                      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]',
                      isActive && 'text-[var(--color-ember-bright)] bg-white/[0.04]'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Desktop CTA */}
          <Link
            href={CTA_CONFIG.href}
            className={cn(
              'hidden md:inline-flex',
              'mkt-cta-breathe',
              'rounded-full px-5 py-2 text-sm font-medium',
              'bg-[var(--color-ember)] text-[var(--color-void)]',
              'hover:bg-[var(--color-ember-bright)]',
              'active:scale-[0.97]',
              'transition-all duration-200',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]'
            )}
          >
            {CTA_CONFIG.label}
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setIsMobileNavOpen(true)}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full md:hidden',
              'bg-white/[0.04] hover:bg-white/[0.08]',
              'border border-white/[0.06] hover:border-white/[0.12]',
              'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
              'transition-all duration-200',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]'
            )}
            aria-expanded={isMobileNavOpen}
            aria-controls="mobile-nav-panel"
            aria-label="Open navigation menu"
          >
            <Menu size={24} strokeWidth={1} />
          </button>
        </nav>
      </header>

      <MarketingMobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </>
  )
}
