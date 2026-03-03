'use client'

import { useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import { NAV_ITEMS, CTA_CONFIG } from '@/lib/config/marketing-nav'

interface MarketingMobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MarketingMobileNav({ isOpen, onClose }: MarketingMobileNavProps) {
  const pathname = usePathname()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Close on route change
  useEffect(() => {
    if (isOpen) {
      onClose()
    }
    // Only close when pathname changes, not when isOpen/onClose change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Scroll lock
  useEffect(() => {
    if (isOpen) {
      const previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = previousOverflow
      }
    }
  }, [isOpen])

  // Focus trap and keyboard handling
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      if (e.key !== 'Tab' || !panelRef.current) return

      const focusableElements = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )

      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      // Focus the close button on open
      requestAnimationFrame(() => {
        closeButtonRef.current?.focus()
      })
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Slide-in panel */}
          <motion.div
            ref={panelRef}
            id="mobile-nav-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className={cn(
              'fixed top-0 right-0 bottom-0 z-50',
              'w-[80vw] max-w-[320px]',
              'bg-[var(--color-void)]/95 backdrop-blur-[24px]',
              'border-l border-white/[0.08]'
            )}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-full flex-col p-6 pt-4">
              {/* Close button */}
              <div className="flex justify-end">
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full',
                    'bg-white/[0.04] hover:bg-white/[0.08]',
                    'border border-white/[0.06] hover:border-white/[0.12]',
                    'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
                    'transition-all duration-200',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]'
                  )}
                  aria-label="Close navigation menu"
                >
                  <X size={24} strokeWidth={1} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="mt-4 flex flex-col gap-1" aria-label="Mobile navigation">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname.startsWith(item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'w-full rounded-lg px-4 py-3 text-left text-base font-medium transition-colors duration-200',
                        'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/[0.04]',
                        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]',
                        isActive && 'text-[var(--color-ember-bright)] bg-white/[0.04]'
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </nav>

              {/* Divider */}
              <hr className="my-4 border-white/[0.06]" />

              {/* CTA */}
              <Link
                href={CTA_CONFIG.href}
                className={cn(
                  'mkt-cta-breathe',
                  'w-full rounded-full px-5 py-3 text-center text-base font-medium',
                  'bg-[var(--color-ember)] text-[var(--color-void)]',
                  'hover:bg-[var(--color-ember-bright)]',
                  'active:scale-[0.97]',
                  'transition-all duration-200',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]'
                )}
              >
                {CTA_CONFIG.label}
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
