'use client'

// src/components/marketing/about/leadership-detail-modal.tsx

import { useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Leader } from '@/lib/interfaces/about-team'

interface LeadershipDetailModalProps {
  leader: Leader | null
  onClose: () => void
}

export function LeadershipDetailModal({
  leader,
  onClose,
}: LeadershipDetailModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)

  // Lock body scroll and manage focus when modal opens/closes
  useEffect(() => {
    if (leader) {
      // Store the element that triggered the modal
      previouslyFocusedRef.current = document.activeElement as HTMLElement

      // Lock body scroll
      document.body.style.overflow = 'hidden'

      // Focus close button after animation starts
      requestAnimationFrame(() => {
        closeButtonRef.current?.focus()
      })
    } else {
      // Unlock body scroll
      document.body.style.overflow = ''

      // Return focus to the triggering element
      previouslyFocusedRef.current?.focus()
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [leader])

  // Escape key closes modal
  useEffect(() => {
    if (!leader) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [leader, onClose])

  // Focus trap: Tab cycles within modal only
  const handleFocusTrap = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== 'Tab' || !modalRef.current) return

      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )

      if (focusableElements.length === 0) return

      const firstFocusable = focusableElements[0]
      const lastFocusable = focusableElements[focusableElements.length - 1]

      if (e.shiftKey) {
        // Shift+Tab: wrap to last element
        if (document.activeElement === firstFocusable) {
          e.preventDefault()
          lastFocusable.focus()
        }
      } else {
        // Tab: wrap to first element
        if (document.activeElement === lastFocusable) {
          e.preventDefault()
          firstFocusable.focus()
        }
      }
    },
    [],
  )

  return (
    <AnimatePresence>
      {leader && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Details about ${leader.name}`}
            className={cn(
              'fixed inset-x-4 top-[10vh] z-50 mx-auto max-h-[80vh] max-w-2xl overflow-y-auto rounded-2xl',
              // Glass material -- slightly more opaque for readability
              'bg-[var(--color-deep)]/95 backdrop-blur-[24px] backdrop-saturate-[130%]',
              'border border-white/[0.08]',
              'shadow-[0_20px_60px_rgba(0,0,0,0.3)]',
              'p-8 md:p-10',
            )}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onKeyDown={handleFocusTrap}
          >
            {/* Close button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className={cn(
                'absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full',
                'bg-white/[0.06] hover:bg-white/[0.12]',
                'border border-white/[0.08]',
                'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
                'transition-all duration-200',
                'focus-visible:outline-2 focus-visible:outline-offset-2',
                'focus-visible:outline-[var(--color-ember-bright)]',
              )}
              aria-label={`Close details about ${leader.name}`}
            >
              <X size={16} aria-hidden="true" />
            </button>

            {/* Header: photo + name + title */}
            <div className="flex items-start gap-4 md:gap-6">
              <div className="relative h-[120px] w-[120px] flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={leader.photo}
                  alt={`Portrait of ${leader.name}`}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="font-sans text-xl font-bold text-[var(--color-text-primary)] md:text-2xl">
                  {leader.name}
                </h2>
                <p className="mt-1 text-base font-semibold italic text-[var(--color-ember)]">
                  {leader.title}
                </p>
              </div>
            </div>

            {/* Owns section */}
            <div className="mt-8">
              <h3 className="font-sans text-lg font-bold text-[var(--color-text-primary)]">
                What {leader.name.split(' ')[0]} owns
              </h3>
              <ul className="mt-4 space-y-2">
                {leader.owns.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-base leading-relaxed text-[var(--color-text-secondary)]"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-ember)]"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Background section */}
            <div className="mt-8">
              <h3 className="font-sans text-lg font-bold text-[var(--color-text-primary)]">
                Background
              </h3>
              <ul className="mt-4 space-y-2">
                {leader.background.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-base leading-relaxed text-[var(--color-text-secondary)]"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-ember)]"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
