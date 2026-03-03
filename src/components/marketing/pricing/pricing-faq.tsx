'use client'

// src/components/marketing/pricing/pricing-faq.tsx

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { PricingFAQItem } from '@/lib/interfaces/pricing'

interface PricingFAQProps {
  items: PricingFAQItem[]
}

export function PricingFAQ({ items }: PricingFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggleItem(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section
      className="mt-16 sm:mt-24 lg:mt-32"
      aria-label="Frequently asked questions"
    >
      {/* Section label */}
      <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-secondary)] text-center mb-4">
        FAQ // PRICING
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] text-center">
        Frequently asked questions.
      </h2>

      <div className="mt-12 max-w-3xl mx-auto space-y-4">
        {items.map((item, index) => (
          <div
            key={item.question}
            className={cn(
              'rounded-xl overflow-hidden',
              'bg-white/[0.04]',
              'border border-white/[0.06]',
            )}
          >
            <button
              className={cn(
                'w-full flex items-center justify-between',
                'px-6 py-5 text-left',
                'text-[var(--color-text-primary)] text-base font-medium',
                'hover:bg-white/[0.04]',
                'transition-colors duration-150',
                'focus-visible:outline-2 focus-visible:outline-offset-[-2px]',
                'focus-visible:outline-[var(--color-ember-bright)]',
                // Minimum 48px touch target
                'min-h-12',
              )}
              onClick={() => toggleItem(index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
              type="button"
            >
              <span>{item.question}</span>
              <ChevronDown
                className={cn(
                  'h-5 w-5 shrink-0 text-[var(--color-text-secondary)] ml-4',
                  'transition-transform duration-200',
                  openIndex === index && 'rotate-180',
                )}
                strokeWidth={1}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}
