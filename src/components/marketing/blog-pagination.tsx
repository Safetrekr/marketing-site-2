// src/components/marketing/blog-pagination.tsx

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface BlogPaginationProps {
  currentPage: number
  totalPages: number
  basePath?: string // Defaults to '/blog'
}

export function BlogPagination({
  currentPage,
  totalPages,
  basePath = '/blog',
}: BlogPaginationProps) {
  if (totalPages <= 1) return null

  function pageHref(page: number): string {
    return page === 1 ? basePath : `${basePath}?page=${page}`
  }

  return (
    <nav
      aria-label="Blog pagination"
      className="mt-12 flex items-center justify-center gap-2"
    >
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={pageHref(currentPage - 1)}
          className={cn(
            'rounded-lg border border-[var(--color-border-subtle)] px-4 py-2 text-sm transition-colors duration-150',
            'text-[var(--color-text-secondary)] hover:border-[var(--color-ember-muted)] hover:text-[var(--color-text-primary)]',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]',
          )}
          rel="prev"
        >
          Previous
        </Link>
      ) : (
        <span
          className="rounded-lg border border-[var(--color-border-faint)] px-4 py-2 text-sm text-[var(--color-text-ghost)]"
          aria-disabled="true"
        >
          Previous
        </span>
      )}

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={pageHref(page)}
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-lg font-mono text-sm transition-colors duration-150',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]',
              page === currentPage
                ? 'border border-[var(--color-ember-muted)] bg-[rgba(var(--ember-rgb),0.08)] text-[var(--color-ember-bright)]'
                : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]',
            )}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </Link>
        ))}
      </div>

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={pageHref(currentPage + 1)}
          className={cn(
            'rounded-lg border border-[var(--color-border-subtle)] px-4 py-2 text-sm transition-colors duration-150',
            'text-[var(--color-text-secondary)] hover:border-[var(--color-ember-muted)] hover:text-[var(--color-text-primary)]',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]',
          )}
          rel="next"
        >
          Next
        </Link>
      ) : (
        <span
          className="rounded-lg border border-[var(--color-border-faint)] px-4 py-2 text-sm text-[var(--color-text-ghost)]"
          aria-disabled="true"
        >
          Next
        </span>
      )}
    </nav>
  )
}
