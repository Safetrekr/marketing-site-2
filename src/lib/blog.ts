// src/lib/blog.ts

import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import {
  blogPostFrontmatterSchema,
  type BlogPost,
  type BlogPostMeta,
} from '@/lib/schemas/blog'

const BLOG_CONTENT_DIR = join(process.cwd(), 'content', 'blog')
const POSTS_PER_PAGE = 12

/**
 * Get all published blog posts, sorted by date descending.
 * Excludes drafts in production. Excludes files prefixed with _.
 */
export async function getAllPosts(): Promise<BlogPostMeta[]> {
  let files: string[]
  try {
    files = await readdir(BLOG_CONTENT_DIR)
  } catch {
    // content/blog/ directory does not exist yet -- return empty list
    return []
  }

  const mdxFiles = files.filter(
    (f) => f.endsWith('.mdx') && !f.startsWith('_'),
  )

  const posts = await Promise.all(
    mdxFiles.map(async (filename) => {
      const slug = filename.replace(/\.mdx$/, '')
      return getPostMeta(slug)
    }),
  )

  const published = posts
    .filter((p): p is BlogPostMeta => p !== null)
    .filter((p) => {
      // In production, exclude drafts
      if (process.env.NODE_ENV === 'production' && p.draft) return false
      return true
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return published
}

/**
 * Get paginated blog posts for listing pages.
 */
export async function getPaginatedPosts(page: number): Promise<{
  posts: BlogPostMeta[]
  totalPages: number
  currentPage: number
  totalPosts: number
}> {
  const allPosts = await getAllPosts()
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)
  const currentPage = Math.max(1, Math.min(page, totalPages || 1))
  const start = (currentPage - 1) * POSTS_PER_PAGE
  const posts = allPosts.slice(start, start + POSTS_PER_PAGE)

  return { posts, totalPages, currentPage, totalPosts: allPosts.length }
}

/**
 * Get all posts filtered by tag, sorted by date descending.
 */
export async function getPostsByTag(tag: string): Promise<BlogPostMeta[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((p) =>
    p.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
  )
}

/**
 * Get all posts filtered by category, sorted by date descending.
 */
export async function getPostsByCategory(
  category: string,
): Promise<BlogPostMeta[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((p) => p.category === category)
}

/**
 * Get all unique tags across all published posts, with post count per tag.
 */
export async function getAllTags(): Promise<
  Array<{ tag: string; count: number }>
> {
  const allPosts = await getAllPosts()
  const tagMap = new Map<string, number>()

  for (const post of allPosts) {
    for (const tag of post.tags) {
      const normalized = tag.toLowerCase()
      tagMap.set(normalized, (tagMap.get(normalized) ?? 0) + 1)
    }
  }

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
}

/**
 * Get a single post by slug, including full MDX content.
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = join(BLOG_CONTENT_DIR, `${slug}.mdx`)
    const raw = await readFile(filePath, 'utf-8')
    const { data, content } = matter(raw)

    const parsed = blogPostFrontmatterSchema.safeParse(data)
    if (!parsed.success) {
      console.error(
        `[blog] Invalid frontmatter in ${slug}.mdx:`,
        parsed.error.issues,
      )
      return null
    }

    const stats = readingTime(content)

    return {
      ...parsed.data,
      slug,
      readingTime: stats.text,
      content,
    }
  } catch {
    return null
  }
}

/**
 * Get post metadata (no content) by slug.
 */
async function getPostMeta(slug: string): Promise<BlogPostMeta | null> {
  try {
    const filePath = join(BLOG_CONTENT_DIR, `${slug}.mdx`)
    const raw = await readFile(filePath, 'utf-8')
    const { data, content } = matter(raw)

    const parsed = blogPostFrontmatterSchema.safeParse(data)
    if (!parsed.success) {
      console.error(
        `[blog] Invalid frontmatter in ${slug}.mdx:`,
        parsed.error.issues,
      )
      return null
    }

    const stats = readingTime(content)

    return {
      ...parsed.data,
      slug,
      readingTime: stats.text,
    }
  } catch {
    return null
  }
}

/**
 * Get slugs for all published posts (used by generateStaticParams).
 */
export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await getAllPosts()
  return posts.map((p) => p.slug)
}

/**
 * Get featured posts (for homepage or blog sidebar).
 */
export async function getFeaturedPosts(
  limit: number = 3,
): Promise<BlogPostMeta[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((p) => p.featured).slice(0, limit)
}
