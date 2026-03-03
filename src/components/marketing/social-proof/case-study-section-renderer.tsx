// src/components/marketing/social-proof/case-study-section-renderer.tsx

import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { CaseStudySection } from '@/lib/interfaces/social-proof'

const SECTION_CONFIG: Record<
  CaseStudySection['type'],
  {
    prefix: string
    accentClass: string
  }
> = {
  challenge: {
    prefix: 'The Challenge',
    accentClass: 'text-[var(--color-warning)]',
  },
  solution: {
    prefix: 'The Solution',
    accentClass: 'text-[var(--color-ember)]',
  },
  results: {
    prefix: 'The Results',
    accentClass: 'text-[var(--color-healthy)]',
  },
  implementation: {
    prefix: 'Implementation',
    accentClass: 'text-[var(--color-teal-bright)]',
  },
  quote: {
    prefix: '',
    accentClass: 'text-[var(--color-ember-bright)]',
  },
}

interface CaseStudySectionRendererProps {
  section: CaseStudySection
}

export function CaseStudySectionRenderer({
  section,
}: CaseStudySectionRendererProps) {
  const config = SECTION_CONFIG[section.type]

  return (
    <div
      className={cn(
        'flex flex-col gap-6',
        section.imageSrc && 'lg:flex-row lg:gap-12',
      )}
    >
      <div className="flex-1">
        {/* Section prefix label */}
        {config.prefix && (
          <span
            className={cn(
              'font-mono text-xs font-medium uppercase',
              'tracking-[0.12em]',
              config.accentClass,
              'mb-2 block',
            )}
          >
            {config.prefix}
          </span>
        )}

        {/* Section heading */}
        <h2
          className={cn(
            'font-sans text-2xl font-bold',
            'text-[var(--color-text-primary)]',
            'leading-snug',
          )}
        >
          {section.heading}
        </h2>

        {/* Body content */}
        <div
          className={cn(
            'mt-4 text-base leading-relaxed',
            'text-[var(--color-text-secondary)]',
            'space-y-4',
          )}
        >
          {renderBody(section.body)}
        </div>
      </div>

      {/* Optional image */}
      {section.imageSrc && (
        <div className="relative h-64 w-full overflow-hidden rounded-xl lg:h-auto lg:w-80 lg:shrink-0">
          <Image
            src={section.imageSrc}
            alt={section.imageAlt ?? ''}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 320px"
          />
        </div>
      )}
    </div>
  )
}

/**
 * Lightweight body formatter. Supports:
 * - Paragraphs (double newline separated)
 * - Bullet lists (lines starting with "- ")
 * - **bold** text
 *
 * This is intentionally NOT a full markdown parser. If case study
 * content requires richer formatting, migrate to MDX.
 */
function renderBody(body: string): React.ReactNode[] {
  const blocks = body.split('\n\n')

  return blocks.map((block, i) => {
    const trimmed = block.trim()

    // Bullet list
    if (trimmed.startsWith('- ')) {
      const items = trimmed
        .split('\n')
        .filter((line) => line.startsWith('- '))
        .map((line) => line.slice(2))

      return (
        <ul key={i} className="list-disc space-y-1 pl-5">
          {items.map((item, j) => (
            <li key={j}>{formatBold(item)}</li>
          ))}
        </ul>
      )
    }

    // Paragraph
    return <p key={i}>{formatBold(trimmed)}</p>
  })
}

/** Replaces **text** with <strong>text</strong>. */
function formatBold(text: string): React.ReactNode {
  const parts = text.split(/\*\*(.+?)\*\*/g)
  if (parts.length === 1) return text

  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong
        key={i}
        className="font-semibold text-[var(--color-text-primary)]"
      >
        {part}
      </strong>
    ) : (
      part
    ),
  )
}
