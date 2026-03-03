'use client'

// src/components/marketing/how-it-works/wizard-stepper.tsx

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { WizardStep } from '@/lib/interfaces/how-it-works'

interface WizardStepperProps {
  steps: WizardStep[]
}

export function WizardStepper({ steps }: WizardStepperProps) {
  const [openSteps, setOpenSteps] = useState<Set<number>>(new Set())

  const toggleStep = useCallback((stepNumber: number) => {
    setOpenSteps((prev) => {
      const next = new Set(prev)
      if (next.has(stepNumber)) {
        next.delete(stepNumber)
      } else {
        next.add(stepNumber)
      }
      return next
    })
  }, [])

  const expandAll = useCallback(() => {
    setOpenSteps(new Set(steps.map((s) => s.number)))
  }, [steps])

  const collapseAll = useCallback(() => {
    setOpenSteps(new Set())
  }, [])

  const allOpen = openSteps.size === steps.length

  return (
    <div className="mt-4">
      {/* Expand/collapse all toggle */}
      <div className="mb-3 flex justify-end">
        <button
          type="button"
          onClick={allOpen ? collapseAll : expandAll}
          className={cn(
            'text-xs font-medium text-[var(--color-ember-bright)]',
            'hover:text-[var(--color-ember-glow)]',
            'transition-colors duration-150',
            'focus-visible:outline-2 focus-visible:outline-offset-2',
            'focus-visible:outline-[var(--color-ember-bright)]',
          )}
        >
          {allOpen ? 'Collapse all' : 'Expand all'}
        </button>
      </div>

      {/* Step list */}
      <ol className="space-y-2">
        {steps.map((step) => {
          const isOpen = openSteps.has(step.number)
          return (
            <li
              key={step.number}
              className={cn(
                'rounded-xl',
                'bg-white/[0.03]',
                'border border-white/[0.06]',
                'transition-colors duration-200',
                isOpen && 'bg-white/[0.05] border-white/[0.08]',
              )}
            >
              <button
                type="button"
                onClick={() => toggleStep(step.number)}
                aria-expanded={isOpen}
                aria-controls={`wizard-step-${step.number}-content`}
                id={`wizard-step-${step.number}-trigger`}
                className={cn(
                  'flex w-full items-center gap-4 px-4 py-3 text-left',
                  'focus-visible:outline-2 focus-visible:outline-offset-[-2px]',
                  'focus-visible:outline-[var(--color-ember-bright)]',
                  'rounded-xl',
                )}
              >
                {/* Number badge */}
                <span
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                    'bg-[var(--color-ember-dim)] text-[var(--color-ember-bright)]',
                    'text-sm font-bold',
                  )}
                >
                  {step.number}
                </span>

                {/* Step name */}
                <span className="flex-1 text-sm font-medium text-[var(--color-text-primary)]">
                  {step.name}
                </span>

                {/* Chevron */}
                <ChevronDown
                  className={cn(
                    'h-4 w-4 shrink-0 text-[var(--color-text-tertiary)]',
                    'transition-transform duration-200',
                    isOpen && 'rotate-180',
                  )}
                  aria-hidden="true"
                />
              </button>

              {/* Expandable content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`wizard-step-${step.number}-content`}
                    role="region"
                    aria-labelledby={`wizard-step-${step.number}-trigger`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-4 pl-16 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                      {step.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
