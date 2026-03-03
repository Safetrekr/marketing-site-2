// src/app/(marketing)/blog/page.tsx

import type { Metadata } from 'next'
import { getPaginatedPosts, getAllTags, getFeaturedPosts } from '@/lib/blog'
import { BlogCard } from '@/components/marketing/blog-card'
import { BlogTag } from '@/components/marketing/blog-tag'
import { BlogPagination } from '@/components/marketing/blog-pagination'
import { generatePageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Blog',
  description:
    'Insights on travel safety, duty of care, organizational risk management, and product updates from the Safetrekr team.',
  path: '/blog',
})

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const page = Math.max(1, parseInt(params.page ?? '1', 10) || 1)
  const { posts, totalPages, currentPage } = await getPaginatedPosts(page)
  const tags = await getAllTags()
  const featured = page === 1 ? await getFeaturedPosts(1) : []

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
      {/* Page header */}
      <div className="mb-12">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[var(--color-ember)]">
          Blog
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] lg:text-4xl">
          Insights & Updates
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--color-text-secondary)]">
          Travel safety intelligence, product updates, and expert perspectives
          from former federal protective operations professionals.
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-12">
        {/* Post grid */}
        <div>
          {/* Featured post (first page only) */}
          {featured.length > 0 && (
            <div className="mb-8">
              <BlogCard post={featured[0]} featured />
            </div>
          )}

          {/* Post cards */}
          {posts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {posts
                .filter((p) => !featured.some((f) => f.slug === p.slug))
                .map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-12 text-center">
              <p className="font-mono text-sm uppercase tracking-wider text-[var(--color-text-tertiary)]">
                No posts published yet
              </p>
              <p className="mt-2 text-sm text-[var(--color-text-ghost)]">
                Check back soon for insights on travel safety and organizational
                risk management.
              </p>
            </div>
          )}

          {/* Pagination */}
          <BlogPagination currentPage={currentPage} totalPages={totalPages} />
        </div>

        {/* Tag sidebar (desktop) */}
        {tags.length > 0 && (
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-[var(--color-text-tertiary)]">
                Topics
              </p>
              <div className="flex flex-wrap gap-2">
                {tags.map(({ tag, count }) => (
                  <BlogTag key={tag} tag={tag} showCount count={count} />
                ))}
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
