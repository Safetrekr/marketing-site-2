// src/app/(marketing)/blog/[slug]/page.tsx

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPostBySlug, getAllPostSlugs, getPostsByTag } from '@/lib/blog'
import { getAuthor } from '@/lib/blog-authors'
import { BlogProse } from '@/components/marketing/blog-prose'
import { BlogToc } from '@/components/marketing/blog-toc'
import { BlogAuthorByline } from '@/components/marketing/blog-author'
import { BlogTag } from '@/components/marketing/blog-tag'
import { BlogCard } from '@/components/marketing/blog-card'
import { JsonLd } from '@/components/seo/json-ld'
import { blogPostSchema, breadcrumbSchema } from '@/lib/seo/structured-data'
import { SITE_CONFIG } from '@/lib/config/site'
import Link from 'next/link'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Post Not Found | Safetrekr' }

  const title = post.seoTitle ?? post.title
  const description = post.seoDescription ?? post.description
  const author = getAuthor(post.author)

  return {
    title: { absolute: `${title} | Safetrekr Blog` },
    description,
    alternates: {
      canonical: `${SITE_CONFIG.url}/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.date,
      ...(post.updatedDate && { modifiedTime: post.updatedDate }),
      authors: [author?.name ?? 'Safetrekr'],
      tags: post.tags,
      url: `${SITE_CONFIG.url}/blog/${slug}`,
      siteName: SITE_CONFIG.name,
      ...(post.coverImage && {
        images: [
          {
            url: `${SITE_CONFIG.url}${post.coverImage}`,
            alt: post.coverImageAlt ?? post.title,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(post.coverImage && {
        images: [`${SITE_CONFIG.url}${post.coverImage}`],
      }),
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const author = getAuthor(post.author)

  // Get related posts (same primary tag, excluding current post)
  const relatedPosts = post.tags[0]
    ? (await getPostsByTag(post.tags[0]))
        .filter((p) => p.slug !== slug)
        .slice(0, 3)
    : []

  return (
    <>
      <JsonLd
        data={blogPostSchema({
          title: post.title,
          description: post.description,
          slug,
          date: post.date,
          updatedDate: post.updatedDate,
          authorName: author?.name ?? 'Safetrekr',
          coverImage: post.coverImage,
          tags: post.tags,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${slug}` },
        ])}
      />

      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
        {/* Back link */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-[var(--color-text-tertiary)] transition-colors hover:text-[var(--color-text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]"
        >
          <span aria-hidden="true">&larr;</span> Back to Blog
        </Link>

        {/* Post header */}
        <header className="mb-10">
          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <BlogTag key={tag} tag={tag} size="sm" />
            ))}
          </div>

          {/* Title */}
          <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-[var(--color-text-primary)] lg:text-4xl">
            {post.title}
          </h1>

          {/* Author + date + reading time */}
          {author && (
            <BlogAuthorByline
              author={author}
              date={post.date}
              readingTime={post.readingTime}
            />
          )}
        </header>

        {/* Two-column layout: content + TOC sidebar */}
        <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-12">
          {/* Content card */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 lg:p-12">
            <BlogProse content={post.content} />
          </div>

          {/* TOC sidebar (desktop) */}
          <BlogToc content={post.content} />
        </div>

        {/* Updated date notice */}
        {post.updatedDate && (
          <p className="mt-6 text-xs text-[var(--color-text-ghost)]">
            Last updated:{' '}
            <time dateTime={post.updatedDate}>
              {new Date(post.updatedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </p>
        )}

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16" aria-label="Related posts">
            <h2 className="mb-6 font-mono text-xs uppercase tracking-widest text-[var(--color-text-tertiary)]">
              Related Posts
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <BlogCard key={related.slug} post={related} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
