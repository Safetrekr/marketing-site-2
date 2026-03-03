// src/components/marketing/blog-author.tsx

import Image from 'next/image'
import type { BlogAuthor } from '@/lib/blog-authors'

interface BlogAuthorProps {
  author: BlogAuthor
  date: string
  readingTime: string
}

export function BlogAuthorByline({
  author,
  date,
  readingTime,
}: BlogAuthorProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="flex items-center gap-4">
      <Image
        src={author.avatar}
        alt={author.name}
        width={44}
        height={44}
        className="rounded-full border border-white/[0.06]"
      />
      <div>
        <p className="text-sm font-medium text-[var(--color-text-primary)]">
          {author.name}
        </p>
        <p className="text-xs text-[var(--color-text-tertiary)]">
          <time dateTime={date}>{formattedDate}</time>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <span>{readingTime}</span>
        </p>
      </div>
    </div>
  )
}
