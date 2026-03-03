// src/app/(marketing)/blog/tag/[tag]/page.tsx

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPostsByTag, getAllTags } from '@/lib/blog'
import { BlogCard } from '@/components/marketing/blog-card'
import { BlogTag } from '@/components/marketing/blog-tag'
import { SITE_CONFIG } from '@/lib/config/site'
import Link from 'next/link'

interface TagPageProps {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map(({ tag }) => ({ tag: encodeURIComponent(tag) }))
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params
  const decoded = decodeURIComponent(tag)

  return {
    title: { absolute: `Posts tagged "${decoded}" | Safetrekr Blog` },
    description: `Browse Safetrekr blog posts about ${decoded}.`,
    alternates: {
      canonical: `${SITE_CONFIG.url}/blog/tag/${tag}`,
    },
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  const decoded = decodeURIComponent(tag)
  const posts = await getPostsByTag(decoded)

  if (posts.length === 0) notFound()

  const allTags = await getAllTags()

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
      {/* Back link */}
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-[var(--color-text-tertiary)] transition-colors hover:text-[var(--color-text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]"
      >
        <span aria-hidden="true">&larr;</span> All Posts
      </Link>

      {/* Header */}
      <div className="mb-12">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[var(--color-ember)]">
          Topic
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
          {decoded}
        </h1>
        <p className="mt-2 text-sm text-[var(--color-text-tertiary)]">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-12">
        {/* Post grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {/* All tags sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-[var(--color-text-tertiary)]">
              All Topics
            </p>
            <div className="flex flex-wrap gap-2">
              {allTags.map(({ tag: t, count }) => (
                <BlogTag key={t} tag={t} showCount count={count} />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
