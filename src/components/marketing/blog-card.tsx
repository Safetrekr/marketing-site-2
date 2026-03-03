// src/components/marketing/blog-card.tsx

import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { BlogTag } from '@/components/marketing/blog-tag'
import { getAuthor } from '@/lib/blog-authors'
import type { BlogPostMeta } from '@/lib/schemas/blog'

interface BlogCardProps {
  post: BlogPostMeta
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const author = getAuthor(post.author)
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] transition-all duration-300',
        'hover:border-[var(--color-ember-muted)] hover:bg-white/[0.05]',
        featured && 'lg:col-span-2 lg:flex-row',
      )}
    >
      {/* Cover image */}
      {post.coverImage && (
        <Link
          href={`/blog/${post.slug}`}
          className={cn(
            'relative block shrink-0 overflow-hidden',
            featured ? 'lg:w-1/2' : 'aspect-[16/9]',
          )}
          tabIndex={-1}
          aria-hidden="true"
        >
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt ?? ''}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes={
              featured
                ? '(max-width: 1024px) 100vw, 50vw'
                : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
            }
          />
        </Link>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Tags */}
        <div className="mb-3 flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <BlogTag key={tag} tag={tag} size="sm" />
          ))}
        </div>

        {/* Title */}
        <h3
          className={cn(
            'mb-2 font-semibold leading-snug text-[var(--color-text-primary)]',
            featured ? 'text-xl lg:text-2xl' : 'text-lg',
          )}
        >
          <Link
            href={`/blog/${post.slug}`}
            className="hover:text-[var(--color-ember-bright)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]"
          >
            {post.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
          {post.description}
        </p>

        {/* Meta row: author + date + reading time */}
        <div className="mt-auto flex items-center gap-3 text-xs text-[var(--color-text-tertiary)]">
          {author && (
            <>
              <Image
                src={author.avatar}
                alt={author.name}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span>{author.name}</span>
              <span
                aria-hidden="true"
                className="text-[var(--color-border-subtle)]"
              >
                /
              </span>
            </>
          )}
          <time dateTime={post.date}>{formattedDate}</time>
          <span
            aria-hidden="true"
            className="text-[var(--color-border-subtle)]"
          >
            /
          </span>
          <span>{post.readingTime}</span>
        </div>
      </div>
    </article>
  )
}
