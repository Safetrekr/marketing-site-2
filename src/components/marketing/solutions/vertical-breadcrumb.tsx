// src/components/marketing/solutions/vertical-breadcrumb.tsx

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VerticalBreadcrumbProps {
  verticalName: string
}

export function VerticalBreadcrumb({ verticalName }: VerticalBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto max-w-6xl px-6 pt-8 md:pt-12"
    >
      <ol className="flex items-center gap-1.5 text-sm">
        <li>
          <Link
            href="/solutions"
            className={cn(
              'text-[var(--color-text-tertiary)]',
              'transition-colors duration-200',
              'hover:text-[var(--color-ember)]',
              'focus-visible:outline-2 focus-visible:outline-offset-2',
              'focus-visible:outline-[var(--color-ember-bright)]',
              'rounded-sm',
            )}
          >
            Solutions
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight
            size={14}
            className="text-[var(--color-text-tertiary)]"
          />
        </li>
        <li>
          <span
            className="font-medium text-[var(--color-text-primary)]"
            aria-current="page"
          >
            {verticalName}
          </span>
        </li>
      </ol>
    </nav>
  )
}
