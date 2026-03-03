'use client'

// src/components/marketing/about/leadership-card.tsx

import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { Leader } from '@/lib/interfaces/about-team'

interface LeadershipCardProps {
  leader: Leader
  onLearnMore: (leaderId: string) => void
}

export function LeadershipCard({ leader, onLearnMore }: LeadershipCardProps) {
  return (
    <article
      className={cn(
        'group flex cursor-pointer flex-col overflow-hidden rounded-2xl',
        // Glass material (matches detail-panel.tsx canonical pattern)
        'bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]',
        'border border-white/[0.08]',
        // Hover lift
        'transition-all duration-200',
        'hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)]',
        // Focus
        'focus-visible:outline-2 focus-visible:outline-offset-2',
        'focus-visible:outline-[var(--color-ember-bright)]',
      )}
      role="button"
      tabIndex={0}
      aria-label={`Learn more about ${leader.name}, ${leader.title}`}
      onClick={() => onLearnMore(leader.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onLearnMore(leader.id)
        }
      }}
    >
      {/* Photo */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <Image
          src={leader.photo}
          alt={`Portrait of ${leader.name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-sans text-lg font-bold text-[var(--color-text-primary)]">
          {leader.name}
        </h3>
        <p className="mt-1 text-sm font-semibold italic text-[var(--color-ember)]">
          {leader.title}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
          {leader.summary}
        </p>

        {/* Learn more indicator */}
        <div className="mt-4 flex items-center justify-end">
          <span className="text-sm font-semibold text-[var(--color-ember)] transition-colors group-hover:text-[var(--color-ember-bright)]">
            <span className="mr-1" aria-hidden="true">
              &rarr;
            </span>{' '}
            Learn more
          </span>
        </div>
      </div>
    </article>
  )
}
