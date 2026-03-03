// src/components/marketing/solutions/case-study-placeholder.tsx

import Link from 'next/link'
import { FileText } from 'lucide-react'
import type { CaseStudyPlaceholderData } from '@/lib/interfaces/solutions'
import { cn } from '@/lib/utils'

interface CaseStudyPlaceholderProps {
  caseStudy: CaseStudyPlaceholderData
}

export function CaseStudyPlaceholder({
  caseStudy,
}: CaseStudyPlaceholderProps) {
  return (
    <div
      className={cn(
        'rounded-xl p-8 md:p-10',
        'bg-white/[0.04] border border-white/[0.06]',
        'border-dashed',
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg',
            'bg-white/[0.06] border border-white/[0.08]',
          )}
        >
          <FileText
            size={20}
            className="text-[var(--color-text-tertiary)]"
            aria-hidden="true"
          />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-text-tertiary)]">
            Case study -- {caseStudy.verticalType}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {caseStudy.placeholderCopy}
          </p>
          <Link
            href="/contact"
            className={cn(
              'mt-4 inline-flex items-center text-sm font-semibold',
              'text-[var(--color-ember)]',
              'transition-colors duration-200',
              'hover:text-[var(--color-ember-bright)]',
              'rounded-sm',
              'focus-visible:outline-2 focus-visible:outline-offset-2',
              'focus-visible:outline-[var(--color-ember-bright)]',
            )}
          >
            Schedule a Briefing
          </Link>
        </div>
      </div>
    </div>
  )
}
