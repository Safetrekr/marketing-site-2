# WS-D.4: Blog Infrastructure

> **Workstream ID:** WS-D.4
> **Phase:** D -- Content Depth (Post-Launch)
> **Assigned Agent:** `react-developer`
> **Status:** Draft
> **Created:** 2026-03-02
> **Last Updated:** 2026-03-02
> **Depends On:** WS-A.1 (Marketing Layout)
> **Blocks:** None
> **Resolves:** Deferred Item D-4 (Blog / Resources), Risk R-10 (Content Staleness Post-Launch)

---

## 1. Objective

Build the blog infrastructure for the Safetrekr marketing site: a listing page at `/blog`, an individual post template at `/blog/[slug]`, MDX content rendering with custom component support, a tag/category filtering system, RSS feed generation, pagination, and per-post SEO metadata. The blog renders inside the marketing layout (header + footer from WS-A.1) and maintains the Oblivion HUD dark aesthetic while prioritizing long-form reading comfort -- the same readability-over-atmosphere principle established in WS-B.8 (Legal Pages).

This workstream is a **post-launch SEO authority builder**. The infrastructure must be production-ready before the first post is published, but no blog content is written as part of this workstream. Content creation is a separate concern driven by the content marketing strategy.

The system delivers two categories of output:

1. **Blog infrastructure (this workstream):** Routes, MDX rendering pipeline, content loader, listing page, post template, tag system, RSS feed, pagination, prose typography, SEO metadata, and a sample post demonstrating all supported content features (callouts, code blocks, images, CTAs).

2. **Blog content (separate workstream):** Actual articles. The `product-narrative-strategist` agent drafts posts; `react-developer` publishes them by adding `.mdx` files to `content/blog/`. No code changes required per post.

### Strategic Intent

The blog serves three purposes for Safetrekr post-launch:

- **SEO authority:** Long-form content targeting "travel safety," "duty of care," "organizational travel risk management," and vertical-specific keywords (K-12 field trip safety, study abroad risk assessment, church mission trip planning).
- **Thought leadership:** Position Safetrekr founders (ex-USSS protective intelligence) as domain authorities in travel safety.
- **Conversion funnel entry:** Every post includes contextual CTAs ("Schedule a Briefing") and internal links to product pages, creating organic inbound paths.

---

## 2. Scope

### In Scope

| # | Item | Notes |
|---|------|-------|
| 1 | `src/app/(marketing)/blog/page.tsx` | Blog listing page with paginated post cards (server component) |
| 2 | `src/app/(marketing)/blog/[slug]/page.tsx` | Blog post template with MDX rendering (server component) |
| 3 | `src/app/(marketing)/blog/tag/[tag]/page.tsx` | Tag-filtered listing page (server component) |
| 4 | `src/app/(marketing)/blog/layout.tsx` | Shared blog sub-layout (breadcrumb, back-to-blog link) |
| 5 | `src/app/(marketing)/blog/feed.xml/route.ts` | RSS 2.0 feed (route handler) |
| 6 | `src/lib/blog.ts` | Content loader: reads `content/blog/*.mdx`, parses frontmatter, returns typed post data |
| 7 | `src/lib/schemas/blog.ts` | Zod 4 schema for blog post frontmatter validation |
| 8 | `src/components/marketing/blog-card.tsx` | Post preview card for listing pages |
| 9 | `src/components/marketing/blog-prose.tsx` | MDX renderer with custom component mapping |
| 10 | `src/components/marketing/blog-toc.tsx` | Table of contents sidebar for long posts (extends WS-B.8 pattern) |
| 11 | `src/components/marketing/blog-author.tsx` | Author byline component with avatar, name, role |
| 12 | `src/components/marketing/blog-tag.tsx` | Tag badge component, links to tag listing page |
| 13 | `src/components/marketing/blog-pagination.tsx` | Previous/next page navigation for listing pages |
| 14 | `src/components/marketing/blog-cta.tsx` | In-post call-to-action component (MDX custom component) |
| 15 | `src/components/marketing/blog-callout.tsx` | Callout/aside component for tips, warnings, notes (MDX custom component) |
| 16 | `src/components/marketing/blog-figure.tsx` | Image with caption and optional attribution (MDX custom component) |
| 17 | `src/styles/blog-prose.css` | Blog typography: heading hierarchy, paragraph spacing, code blocks, blockquotes, tables. Print stylesheet. Extends the approach from `src/styles/legal-prose.css` (WS-B.8). |
| 18 | `content/blog/` | Directory for MDX blog post files |
| 19 | `content/blog/_sample-post.mdx` | Sample post demonstrating all supported MDX features (prefixed with `_` to exclude from published listing) |
| 20 | `src/lib/blog-authors.ts` | Author data registry (name, role, avatar path, bio) |
| 21 | Per-post SEO metadata | Dynamic `generateMetadata` with title, description, OG image, article structured data, canonical URL |

### Out of Scope

| # | Item | Rationale |
|---|------|-----------|
| 1 | Writing blog content | Content creation is a `product-narrative-strategist` responsibility. This workstream builds the publishing infrastructure. |
| 2 | Headless CMS integration | File-based MDX is sufficient for launch-phase content velocity (1-4 posts/month). CMS migration can be added later without changing the rendering layer. |
| 3 | Comments or discussion system | Over-engineering for a B2B marketing blog. The target audience (safety directors, school administrators) does not expect blog comments. |
| 4 | Newsletter subscription | Separate concern. Can be added as a component later and embedded in the blog layout. |
| 5 | Search within blog | Premature with < 20 posts. Add when content volume justifies the complexity. Browser Ctrl+F and tag filtering are sufficient initially. |
| 6 | Related posts algorithm | Requires content volume to be meaningful. Initial implementation shows the 3 most recent posts from the same tag at the bottom of each post. |
| 7 | Social sharing buttons | Low-value for B2B audience. Can be added as a post-launch enhancement. |
| 8 | Reading progress indicator | Decorative. Can be added later as a UX polish item. |
| 9 | Blog post images / illustrations | Content assets. Authors provide images in `public/images/blog/` when writing posts. |

---

## 3. Input Dependencies

### Codebase Files to Reference

| File | What to Use From It |
|------|---------------------|
| `src/app/(marketing)/layout.tsx` | Marketing layout (from WS-A.1). Blog pages render inside this. |
| `src/styles/spatial-tokens.css` | Safetrekr dark-mode tokens. Blog pages use `--color-deep` or `--color-surface` as the content card background. Text tokens: `--color-text-primary: #e8f0f4`, `--color-text-secondary: #929899`. |
| `src/styles/legal-prose.css` | Typography pattern from WS-B.8. Blog prose extends this with additional styles for code blocks, figures, and MDX custom components. The heading hierarchy, link styles, list styles, and print stylesheet established here are the baseline. |
| `src/components/marketing/legal-prose.tsx` | Rendering pattern reference. Blog prose uses MDX instead of `react-markdown`, but the component architecture (wrapper article, custom component mapping, slugified heading IDs) is the same. |
| `src/components/marketing/legal-toc.tsx` | TOC pattern from WS-B.8. Blog TOC extends this with reading-progress awareness (future enhancement) and "scroll to top" at the end. |
| `src/lib/legal-utils.ts` | Shared utilities from WS-B.8. `extractHeadings`, `formatDate`, and `slugify` can be generalized into a shared `src/lib/content-utils.ts` that both legal pages and blog pages import from. |
| `src/lib/utils.ts` | `cn()` utility. Import: `import { cn } from '@/lib/utils'`. |
| `src/app/globals.css` | Tailwind theme bridge. Confirms spatial color utilities are available. |
| `src/app/sitemap.ts` | WS-A.3 sitemap. Must be updated to include blog post URLs dynamically. |

### External Dependencies

| Dependency | Owner | Status | Impact |
|------------|-------|--------|--------|
| Marketing layout (WS-A.1) | `react-developer` | Phase A | Blog pages need header/footer. Cannot begin implementation without it. |
| Content marketing strategy | Business Owner | **NOT STARTED** | Determines blog categories, target keywords, publishing cadence. Infrastructure can be built without it, but the category taxonomy should align with the strategy. |
| Author headshots | Business Owner | Available (reference site) | Photos available at `/Users/jessetarvambp1/Sites/Safetrekr/marketing-site/assets/images/people/`. Copy to `public/images/authors/` during WS-B.9 (About Page). |

### New Package Dependencies

| Package | Version | Purpose | Size Impact |
|---------|---------|---------|-------------|
| `next-mdx-remote` | `^5.0.0` | Renders MDX strings to React elements in server components via `next-mdx-remote/rsc`. Supports custom component injection. | ~8KB gzipped |
| `rehype-pretty-code` | `^0.14.0` | Syntax-highlighted code blocks using Shiki. Renders at build time (zero client JS). | ~2KB gzipped (Shiki grammar loaded on demand) |
| `rehype-slug` | `^6.0.0` | Auto-generates `id` attributes on headings for anchor linking. Replaces the manual slugify approach from WS-B.8. | ~1KB gzipped |
| `reading-time` | `^2.0.0` | Calculates estimated reading time from text content. | ~1KB gzipped |

**Packages already available (from WS-B.8):**

| Package | Purpose |
|---------|---------|
| `remark-gfm` | GitHub Flavored Markdown: tables, strikethrough, task lists, autolinks |

**Rationale for `next-mdx-remote` over `@next/mdx`:** Blog content lives in `content/blog/` (outside `src/app/`), consistent with the `content/legal/` pattern from WS-B.8. `@next/mdx` requires MDX files inside the app directory as route files. `next-mdx-remote/rsc` decouples content location from routing, supports dynamic `[slug]` routes, and allows frontmatter parsing with the same file-reading pattern established for legal pages.

**Rationale for `rehype-pretty-code` over `rehype-highlight`:** Safetrekr blog posts will include technical content (API examples, configuration snippets, integration guides). `rehype-pretty-code` uses Shiki for server-side syntax highlighting with theme support, producing styled HTML at build time with zero client-side JavaScript. The dark theme aligns naturally with the Oblivion HUD aesthetic.

---

## 4. Deliverables

### 4.1 Blog Post Data Structure

Blog posts are MDX files with YAML frontmatter. The frontmatter schema is validated at build time with Zod 4 to catch authoring errors early.

#### Frontmatter Schema (`src/lib/schemas/blog.ts`)

```typescript
// src/lib/schemas/blog.ts

import { z } from 'zod/v4'

export const blogPostFrontmatterSchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().min(1).max(300),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD format'),
  updatedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  author: z.string().min(1),           // Key into blog-authors.ts registry
  tags: z.array(z.string().min(1)).min(1).max(5),
  category: z.enum([
    'travel-safety',
    'product-updates',
    'industry-insights',
    'compliance',
    'case-studies',
    'guides',
  ]),
  coverImage: z.string().optional(),    // Path relative to /public (e.g., '/images/blog/post-slug/cover.jpg')
  coverImageAlt: z.string().optional(), // Required if coverImage is set
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  seoTitle: z.string().max(70).optional(),       // Override title for <title> tag
  seoDescription: z.string().max(160).optional(), // Override description for meta
})

export type BlogPostFrontmatter = z.infer<typeof blogPostFrontmatterSchema>

export interface BlogPost extends BlogPostFrontmatter {
  slug: string              // Derived from filename (e.g., 'duty-of-care-explained')
  readingTime: string       // Calculated from content (e.g., '8 min read')
  content: string           // Raw MDX content (frontmatter stripped)
}

export interface BlogPostMeta extends Omit<BlogPost, 'content'> {
  // Listing-page subset: everything except the full MDX content body
}
```

#### Example Frontmatter

```yaml
---
title: "Duty of Care in Organizational Travel: What Leaders Need to Know"
description: "A comprehensive guide to duty of care obligations for organizations sending employees, students, or members on domestic and international trips."
date: "2026-04-15"
author: "mike-dawson"
tags:
  - duty-of-care
  - compliance
  - organizational-travel
category: "guides"
coverImage: "/images/blog/duty-of-care-explained/cover.jpg"
coverImageAlt: "Aerial view of a globe with travel routes highlighted"
draft: false
featured: true
---
```

### 4.2 Content Loader (`src/lib/blog.ts`)

Server-only module that reads the `content/blog/` directory, parses frontmatter, validates against the Zod schema, and returns typed blog post data. This is the single source of truth for all blog data -- listing pages, post pages, RSS feed, and sitemap all consume from this module.

```typescript
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
  const files = await readdir(BLOG_CONTENT_DIR)
  const mdxFiles = files.filter(
    (f) => f.endsWith('.mdx') && !f.startsWith('_')
  )

  const posts = await Promise.all(
    mdxFiles.map(async (filename) => {
      const slug = filename.replace(/\.mdx$/, '')
      return getPostMeta(slug)
    })
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
    p.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  )
}

/**
 * Get all posts filtered by category, sorted by date descending.
 */
export async function getPostsByCategory(
  category: string
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
        parsed.error.format()
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
        parsed.error.format()
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
  limit: number = 3
): Promise<BlogPostMeta[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((p) => p.featured).slice(0, limit)
}
```

**Key decisions:**
- Uses `gray-matter` for frontmatter parsing (standard MDX ecosystem choice, unlike the regex approach in WS-B.8 which was justified for 2-field legal frontmatter). Blog frontmatter has 12+ fields -- a proper YAML parser is warranted.
- `_`-prefixed files are excluded from listings. The sample post (`_sample-post.mdx`) uses this convention.
- Drafts are visible in development but filtered in production via `NODE_ENV` check.
- Reading time is calculated server-side at build time. The `reading-time` package returns human-readable strings like "8 min read".
- Pagination uses 12 posts per page (4 rows of 3 cards at desktop breakpoint, 6 rows of 2 on tablet, 12 rows of 1 on mobile).

**Additional package dependency:** `gray-matter` must be added:

| Package | Version | Purpose | Size Impact |
|---------|---------|---------|-------------|
| `gray-matter` | `^4.0.3` | Parse YAML frontmatter from MDX files | ~5KB gzipped |

### 4.3 Author Registry (`src/lib/blog-authors.ts`)

Static author data. Keeps author information centralized rather than repeated in every post's frontmatter.

```typescript
// src/lib/blog-authors.ts

export interface BlogAuthor {
  id: string
  name: string
  role: string
  avatar: string    // Path relative to /public
  bio: string       // 1-2 sentence bio for author cards
}

export const AUTHORS: Record<string, BlogAuthor> = {
  'mike-dawson': {
    id: 'mike-dawson',
    name: 'Mike Dawson',
    role: 'Co-founder & Chief of Safety Operations',
    avatar: '/images/authors/mike-dawson.jpg',
    bio: '23-year U.S. Secret Service veteran. Former Special Agent in Charge of presidential and foreign dignitary protection details.',
  },
  'alan-d': {
    id: 'alan-d',
    name: 'Alan D.',
    role: 'Chief of Protective Intelligence',
    avatar: '/images/authors/alan-d.jpg',
    bio: '25-year U.S. Secret Service veteran. Former lead of protective intelligence operations across domestic and international venues.',
  },
  'bobby-brasher': {
    id: 'bobby-brasher',
    name: 'Bobby Brasher',
    role: 'Co-founder & Chief of School Security',
    avatar: '/images/authors/bobby-brasher.jpg',
    bio: 'Former Director of School Security at Brook Hill. Specialist in K-12 travel safety and campus protection systems.',
  },
  'safetrekr-team': {
    id: 'safetrekr-team',
    name: 'Safetrekr Team',
    role: 'Safetrekr',
    avatar: '/images/authors/safetrekr-logo.svg',
    bio: 'Product updates and announcements from the Safetrekr team.',
  },
}

export function getAuthor(id: string): BlogAuthor | null {
  return AUTHORS[id] ?? null
}
```

### 4.4 Blog Prose Component (`src/components/marketing/blog-prose.tsx`)

Server component that renders MDX content with custom component mapping and syntax-highlighted code blocks.

```typescript
// src/components/marketing/blog-prose.tsx

import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'
import { cn } from '@/lib/utils'
import { BlogCallout } from '@/components/marketing/blog-callout'
import { BlogCta } from '@/components/marketing/blog-cta'
import { BlogFigure } from '@/components/marketing/blog-figure'

interface BlogProseProps {
  content: string
  className?: string
}

const mdxComponents = {
  Callout: BlogCallout,
  CTA: BlogCta,
  Figure: BlogFigure,
}

export function BlogProse({ content, className }: BlogProseProps) {
  return (
    <article
      className={cn('blog-prose', className)}
      aria-label="Blog post content"
    >
      <MDXRemote
        source={content}
        components={mdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [
                rehypePrettyCode,
                {
                  theme: {
                    dark: 'github-dark-default',
                    light: 'github-light-default',
                  },
                  keepBackground: true,
                  defaultLang: 'plaintext',
                },
              ],
            ],
          },
        }}
      />
    </article>
  )
}
```

**Key decisions:**
- Custom MDX components (`Callout`, `CTA`, `Figure`) are injected into the rendering context. Authors use them as JSX in MDX files: `<Callout type="tip">...</Callout>`.
- `rehype-slug` auto-generates heading IDs, replacing the manual `slugify` function from WS-B.8.
- `rehype-pretty-code` uses a dark theme aligned with the Oblivion HUD aesthetic.
- The `blog-prose` CSS class scopes all typography styles (Section 4.10).

### 4.5 MDX Custom Components

#### Blog Callout (`src/components/marketing/blog-callout.tsx`)

Used in MDX as `<Callout type="tip">` / `<Callout type="warning">` / `<Callout type="info">`.

```typescript
// src/components/marketing/blog-callout.tsx

import { cn } from '@/lib/utils'

interface BlogCalloutProps {
  type?: 'tip' | 'warning' | 'info' | 'important'
  title?: string
  children: React.ReactNode
}

const CALLOUT_STYLES: Record<string, { border: string; bg: string; icon: string; label: string }> = {
  tip: {
    border: 'border-l-[var(--color-ember)]',
    bg: 'bg-[rgba(var(--ember-rgb),0.04)]',
    icon: 'i-lucide-lightbulb',
    label: 'Tip',
  },
  warning: {
    border: 'border-l-[var(--color-warning)]',
    bg: 'bg-[rgba(var(--warning-glow-rgb,250,204,21),0.04)]',
    icon: 'i-lucide-alert-triangle',
    label: 'Warning',
  },
  info: {
    border: 'border-l-[var(--color-teal)]',
    bg: 'bg-[rgba(var(--teal-rgb),0.04)]',
    icon: 'i-lucide-info',
    label: 'Note',
  },
  important: {
    border: 'border-l-[var(--color-ember-bright)]',
    bg: 'bg-[rgba(var(--ember-bright-rgb),0.06)]',
    icon: 'i-lucide-alert-circle',
    label: 'Important',
  },
}

export function BlogCallout({ type = 'info', title, children }: BlogCalloutProps) {
  const style = CALLOUT_STYLES[type] ?? CALLOUT_STYLES.info

  return (
    <aside
      role="note"
      className={cn(
        'my-6 rounded-r-lg border-l-3 p-4',
        style.border,
        style.bg,
      )}
    >
      <p className="mb-1 font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-text-tertiary)]">
        {title ?? style.label}
      </p>
      <div className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
        {children}
      </div>
    </aside>
  )
}
```

#### Blog CTA (`src/components/marketing/blog-cta.tsx`)

In-post call-to-action block. Used as `<CTA href="/contact" label="Schedule a Briefing" />`.

```typescript
// src/components/marketing/blog-cta.tsx

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface BlogCtaProps {
  href: string
  label: string
  description?: string
  variant?: 'default' | 'subtle'
}

export function BlogCta({
  href,
  label,
  description,
  variant = 'default',
}: BlogCtaProps) {
  return (
    <div
      className={cn(
        'my-8 rounded-xl border p-6 text-center',
        variant === 'default'
          ? 'border-[var(--color-ember-muted)] bg-[rgba(var(--ember-rgb),0.04)]'
          : 'border-[var(--color-border-subtle)] bg-white/[0.02]',
      )}
    >
      {description && (
        <p className="mb-3 text-sm text-[var(--color-text-secondary)]">
          {description}
        </p>
      )}
      <Link
        href={href}
        className={cn(
          'inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium transition-colors duration-200',
          'bg-[var(--color-ember)] text-white hover:bg-[var(--color-ember-bright)]',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]',
        )}
      >
        {label}
      </Link>
    </div>
  )
}
```

#### Blog Figure (`src/components/marketing/blog-figure.tsx`)

Image with caption. Used as `<Figure src="/images/blog/post/diagram.png" alt="..." caption="..." />`.

```typescript
// src/components/marketing/blog-figure.tsx

import Image from 'next/image'
import { cn } from '@/lib/utils'

interface BlogFigureProps {
  src: string
  alt: string
  caption?: string
  attribution?: string
  width?: number
  height?: number
  className?: string
}

export function BlogFigure({
  src,
  alt,
  caption,
  attribution,
  width = 800,
  height = 450,
  className,
}: BlogFigureProps) {
  return (
    <figure className={cn('my-8', className)}>
      <div className="overflow-hidden rounded-xl border border-white/[0.06]">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>
      {(caption || attribution) && (
        <figcaption className="mt-3 text-center text-sm text-[var(--color-text-tertiary)]">
          {caption}
          {attribution && (
            <span className="block text-xs italic">{attribution}</span>
          )}
        </figcaption>
      )}
    </figure>
  )
}
```

### 4.6 Blog Card Component (`src/components/marketing/blog-card.tsx`)

Post preview card used on the listing page.

```typescript
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
        <h3 className={cn(
          'mb-2 font-semibold leading-snug text-[var(--color-text-primary)]',
          featured ? 'text-xl lg:text-2xl' : 'text-lg',
        )}>
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
              <span aria-hidden="true" className="text-[var(--color-border-subtle)]">/</span>
            </>
          )}
          <time dateTime={post.date}>{formattedDate}</time>
          <span aria-hidden="true" className="text-[var(--color-border-subtle)]">/</span>
          <span>{post.readingTime}</span>
        </div>
      </div>
    </article>
  )
}
```

### 4.7 Blog Tag Component (`src/components/marketing/blog-tag.tsx`)

Tag badge that links to the tag listing page.

```typescript
// src/components/marketing/blog-tag.tsx

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface BlogTagProps {
  tag: string
  size?: 'sm' | 'md'
  showCount?: boolean
  count?: number
}

export function BlogTag({ tag, size = 'md', showCount = false, count }: BlogTagProps) {
  const href = `/blog/tag/${encodeURIComponent(tag.toLowerCase())}`

  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-[var(--color-border-subtle)] font-mono uppercase tracking-wider transition-colors duration-150',
        'text-[var(--color-text-tertiary)] hover:border-[var(--color-ember-muted)] hover:text-[var(--color-ember-bright)]',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]',
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs',
      )}
    >
      {tag}
      {showCount && count !== undefined && (
        <span className="text-[var(--color-text-ghost)]">({count})</span>
      )}
    </Link>
  )
}
```

### 4.8 Blog Pagination Component (`src/components/marketing/blog-pagination.tsx`)

Page navigation for the listing page.

```typescript
// src/components/marketing/blog-pagination.tsx

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface BlogPaginationProps {
  currentPage: number
  totalPages: number
  basePath?: string   // Defaults to '/blog'
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
    <nav aria-label="Blog pagination" className="mt-12 flex items-center justify-center gap-2">
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
        <span className="rounded-lg border border-[var(--color-border-faint)] px-4 py-2 text-sm text-[var(--color-text-ghost)]" aria-disabled="true">
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
              'flex h-9 w-9 items-center justify-center rounded-lg text-sm font-mono transition-colors duration-150',
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
        <span className="rounded-lg border border-[var(--color-border-faint)] px-4 py-2 text-sm text-[var(--color-text-ghost)]" aria-disabled="true">
          Next
        </span>
      )}
    </nav>
  )
}
```

**Implementation note:** For blogs with many pages (30+), replace the full page-number list with a truncated display (e.g., `1 2 3 ... 28 29 30`). This is not needed at launch volume and can be added when content exceeds ~5 pages.

### 4.9 Blog Author Component (`src/components/marketing/blog-author.tsx`)

Author byline displayed at the top of each blog post.

```typescript
// src/components/marketing/blog-author.tsx

import Image from 'next/image'
import type { BlogAuthor } from '@/lib/blog-authors'

interface BlogAuthorProps {
  author: BlogAuthor
  date: string
  readingTime: string
}

export function BlogAuthorByline({ author, date, readingTime }: BlogAuthorProps) {
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
          <span className="mx-2" aria-hidden="true">/</span>
          <span>{readingTime}</span>
        </p>
      </div>
    </div>
  )
}
```

### 4.10 Blog Listing Page (`src/app/(marketing)/blog/page.tsx`)

Server component that renders the paginated blog listing with tag sidebar.

```typescript
// src/app/(marketing)/blog/page.tsx

import type { Metadata } from 'next'
import { getPaginatedPosts, getAllTags, getFeaturedPosts } from '@/lib/blog'
import { BlogCard } from '@/components/marketing/blog-card'
import { BlogTag } from '@/components/marketing/blog-tag'
import { BlogPagination } from '@/components/marketing/blog-pagination'

export const metadata: Metadata = {
  title: 'Blog | Safetrekr',
  description:
    'Insights on travel safety, duty of care, organizational risk management, and product updates from the Safetrekr team.',
  alternates: {
    canonical: 'https://safetrekr.com/blog',
  },
}

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const page = Math.max(1, parseInt(params.page ?? '1', 10) || 1)
  const { posts, totalPages, currentPage, totalPosts } =
    await getPaginatedPosts(page)
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
      </div>
    </div>
  )
}
```

### 4.11 Blog Post Page (`src/app/(marketing)/blog/[slug]/page.tsx`)

Server component that renders a single blog post with MDX content, author byline, TOC sidebar, and related posts.

```typescript
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

  return {
    title: `${title} | Safetrekr Blog`,
    description,
    alternates: {
      canonical: `https://safetrekr.com/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.date,
      ...(post.updatedDate && { modifiedTime: post.updatedDate }),
      authors: [getAuthor(post.author)?.name ?? 'Safetrekr'],
      tags: post.tags,
      ...(post.coverImage && {
        images: [
          {
            url: post.coverImage,
            alt: post.coverImageAlt ?? post.title,
          },
        ],
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
  )
}
```

### 4.12 Blog TOC Component (`src/components/marketing/blog-toc.tsx`)

Extends the WS-B.8 `LegalToc` pattern. Extracts headings from MDX content for sidebar navigation.

```typescript
// src/components/marketing/blog-toc.tsx

import { cn } from '@/lib/utils'

interface TocEntry {
  id: string
  text: string
  level: 2 | 3
}

interface BlogTocProps {
  content: string
  className?: string
}

export function BlogToc({ content, className }: BlogTocProps) {
  const entries = extractHeadings(content)
  if (entries.length < 3) return null // Only show TOC for substantial posts

  return (
    <nav
      aria-label="Table of contents"
      className={cn(
        'sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto',
        'hidden lg:block',
        className,
      )}
    >
      <p className="mb-4 font-mono text-xs uppercase tracking-widest text-[var(--color-text-tertiary)]">
        On this page
      </p>
      <ul className="space-y-1.5 border-l border-[var(--color-border-faint)]">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              className={cn(
                'block border-l-2 border-transparent py-1 text-sm leading-snug transition-colors duration-150',
                'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
                'hover:border-[var(--color-ember)]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]',
                entry.level === 2 ? 'pl-4 font-medium' : 'pl-8',
              )}
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function extractHeadings(markdown: string): TocEntry[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const entries: TocEntry[] = []
  let match: RegExpExecArray | null

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length as 2 | 3
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    entries.push({ id, text, level })
  }

  return entries
}
```

### 4.13 Tag Listing Page (`src/app/(marketing)/blog/tag/[tag]/page.tsx`)

Server component that shows all posts with a given tag.

```typescript
// src/app/(marketing)/blog/tag/[tag]/page.tsx

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPostsByTag, getAllTags } from '@/lib/blog'
import { BlogCard } from '@/components/marketing/blog-card'
import { BlogTag } from '@/components/marketing/blog-tag'
import Link from 'next/link'

interface TagPageProps {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map(({ tag }) => ({ tag: encodeURIComponent(tag) }))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params
  const decoded = decodeURIComponent(tag)

  return {
    title: `Posts tagged "${decoded}" | Safetrekr Blog`,
    description: `Browse Safetrekr blog posts about ${decoded}.`,
    alternates: {
      canonical: `https://safetrekr.com/blog/tag/${tag}`,
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
```

### 4.14 RSS Feed (`src/app/(marketing)/blog/feed.xml/route.ts`)

Route handler that generates an RSS 2.0 feed. No external dependencies -- the XML is templated directly.

```typescript
// src/app/(marketing)/blog/feed.xml/route.ts

import { getAllPosts } from '@/lib/blog'
import { getAuthor } from '@/lib/blog-authors'

const SITE_URL = 'https://safetrekr.com'

export async function GET() {
  const posts = await getAllPosts()

  const items = posts
    .slice(0, 20) // Limit feed to 20 most recent
    .map((post) => {
      const author = getAuthor(post.author)
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${author ? `<dc:creator><![CDATA[${author.name}]]></dc:creator>` : ''}
      ${post.tags.map((tag) => `<category>${tag}</category>`).join('\n      ')}
    </item>`
    })
    .join('')

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2005/Atom"
>
  <channel>
    <title>Safetrekr Blog</title>
    <description>Insights on travel safety, duty of care, and organizational risk management from the Safetrekr team.</description>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`

  return new Response(feed.trim(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
```

### 4.15 Blog Prose Stylesheet (`src/styles/blog-prose.css`)

Blog-specific typography. Extends the patterns from `legal-prose.css` (WS-B.8) with code block styles, figure captions, and MDX component spacing.

```css
/* =================================================================
   Blog Prose Typography
   =================================================================
   Scoped to .blog-prose (applied by BlogProse component).
   Optimized for long-form blog content on dark backgrounds.
   Extends the approach from legal-prose.css (WS-B.8).
   ================================================================= */

.blog-prose {
  font-family: var(--font-sans);
  font-size: 1.0625rem;     /* 17px -- slightly larger than legal for casual reading */
  line-height: 1.8;         /* 30.6px -- generous for blog content */
  color: var(--color-text-primary);
  max-width: 65ch;
}

/* --- Headings ---------------------------------------------------- */

.blog-prose h1 {
  font-size: 1.875rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  color: var(--color-text-primary);
  margin-top: 0;
  margin-bottom: 1.5rem;
  line-height: 1.25;
}

.blog-prose h2 {
  font-size: 1.375rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--color-text-primary);
  margin-top: 3rem;
  margin-bottom: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border-faint);
  line-height: 1.35;
}

.blog-prose h2:first-of-type {
  border-top: none;
  padding-top: 0;
  margin-top: 0;
}

.blog-prose h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.blog-prose h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

/* --- Paragraphs -------------------------------------------------- */

.blog-prose p {
  margin-bottom: 1.375rem;
}

.blog-prose p:last-child {
  margin-bottom: 0;
}

/* --- Links ------------------------------------------------------- */

.blog-prose a {
  color: var(--color-ember-bright);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: rgba(var(--ember-bright-rgb), 0.4);
  transition: text-decoration-color 150ms ease;
}

.blog-prose a:hover {
  text-decoration-color: var(--color-ember-bright);
}

.blog-prose a:focus-visible {
  outline: 2px solid var(--color-ember-bright);
  outline-offset: 2px;
  border-radius: 2px;
}

/* --- Lists ------------------------------------------------------- */

.blog-prose ul,
.blog-prose ol {
  margin-bottom: 1.375rem;
  padding-left: 1.5rem;
}

.blog-prose ul {
  list-style-type: disc;
}

.blog-prose ol {
  list-style-type: decimal;
}

.blog-prose li {
  margin-bottom: 0.5rem;
  line-height: 1.7;
}

.blog-prose li > ul,
.blog-prose li > ol {
  margin-top: 0.5rem;
  margin-bottom: 0;
}

/* --- Emphasis and strong ----------------------------------------- */

.blog-prose strong {
  font-weight: 600;
  color: var(--color-text-primary);
}

.blog-prose em {
  font-style: italic;
  color: var(--color-text-secondary);
}

/* --- Blockquotes ------------------------------------------------- */

.blog-prose blockquote {
  margin: 1.5rem 0;
  padding: 1rem 1.25rem;
  border-left: 3px solid var(--color-ember-muted);
  background: rgba(var(--ember-rgb), 0.04);
  border-radius: 0 8px 8px 0;
  color: var(--color-text-secondary);
  font-style: italic;
}

.blog-prose blockquote p {
  margin-bottom: 0.5rem;
}

.blog-prose blockquote p:last-child {
  margin-bottom: 0;
}

/* --- Code: inline ------------------------------------------------ */

.blog-prose :not(pre) > code {
  font-family: var(--font-mono);
  font-size: 0.875em;
  padding: 0.15em 0.35em;
  background: rgba(var(--ember-rgb), 0.06);
  border: 1px solid var(--color-border-faint);
  border-radius: 4px;
  color: var(--color-ember-bright);
}

/* --- Code: blocks (styled by rehype-pretty-code) ----------------- */

.blog-prose pre {
  margin: 1.5rem 0;
  border-radius: 12px;
  border: 1px solid var(--color-border-subtle);
  overflow-x: auto;
}

.blog-prose pre > code {
  display: block;
  padding: 1.25rem;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  line-height: 1.65;
}

/* rehype-pretty-code: line highlighting */
.blog-prose pre [data-highlighted-line] {
  background: rgba(var(--ember-rgb), 0.06);
  border-left: 2px solid var(--color-ember-muted);
  padding-left: calc(1.25rem - 2px);
}

/* rehype-pretty-code: line numbers */
.blog-prose pre [data-line-numbers] > [data-line]::before {
  content: counter(line);
  counter-increment: line;
  display: inline-block;
  width: 1.5rem;
  margin-right: 1rem;
  text-align: right;
  color: var(--color-text-ghost);
  font-size: 0.75rem;
}

/* rehype-pretty-code: code title (filename) */
.blog-prose [data-rehype-pretty-code-title] {
  padding: 0.5rem 1.25rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
  border-bottom: 1px solid var(--color-border-faint);
  background: rgba(var(--ember-rgb), 0.03);
  border-radius: 12px 12px 0 0;
}

.blog-prose [data-rehype-pretty-code-title] + pre {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  margin-top: 0;
}

/* --- Tables ------------------------------------------------------ */

.blog-prose table {
  width: 100%;
  margin: 1.5rem 0;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.blog-prose th {
  text-align: left;
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-text-tertiary);
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--color-border-subtle);
}

.blog-prose td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--color-border-faint);
  color: var(--color-text-secondary);
  vertical-align: top;
}

.blog-prose tr:last-child td {
  border-bottom: none;
}

/* --- Horizontal rules -------------------------------------------- */

.blog-prose hr {
  margin: 3rem 0;
  border: none;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    var(--color-border-subtle),
    transparent
  );
}

/* --- Images (markdown syntax, not Figure component) -------------- */

.blog-prose img {
  margin: 1.5rem 0;
  border-radius: 12px;
  border: 1px solid var(--color-border-faint);
  max-width: 100%;
  height: auto;
}

/* =================================================================
   PRINT STYLES
   ================================================================= */

@media print {
  .blog-prose {
    color: #1a1a1a;
    font-size: 11pt;
    line-height: 1.6;
    max-width: none;
  }

  .blog-prose h1 { font-size: 18pt; color: #000; }
  .blog-prose h2 { font-size: 14pt; color: #000; border-top-color: #ccc; }
  .blog-prose h3 { font-size: 12pt; color: #000; }

  .blog-prose a {
    color: #1a1a1a;
    text-decoration: underline;
  }

  .blog-prose a[href^="http"]::after {
    content: ' (' attr(href) ')';
    font-size: 0.8em;
    color: #666;
    font-style: italic;
  }

  .blog-prose pre {
    border-color: #ccc;
    background: #f5f5f5 !important;
  }

  .blog-prose pre > code {
    color: #333;
  }

  .blog-prose blockquote {
    border-left-color: #999;
    background: #f5f5f5;
    color: #333;
  }

  .blog-prose th { color: #333; border-bottom-color: #999; }
  .blog-prose td { color: #333; border-bottom-color: #ddd; }
}
```

### 4.16 Blog Sub-Layout (`src/app/(marketing)/blog/layout.tsx`)

```typescript
// src/app/(marketing)/blog/layout.tsx

import type { ReactNode } from 'react'
import '@/styles/blog-prose.css'

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
```

The blog sub-layout is intentionally minimal. Its primary purpose is to import the `blog-prose.css` stylesheet so it is available to all blog routes. Layout-level chrome (header, footer) comes from the parent `(marketing)/layout.tsx`.

### 4.17 Sitemap Integration

The existing `src/app/sitemap.ts` (from WS-A.3) must be updated to dynamically include blog post URLs. Add a function call to `getAllPosts()` and merge blog URLs into the sitemap.

```typescript
// Addition to src/app/sitemap.ts (WS-A.3)
// Import: import { getAllPosts } from '@/lib/blog'

// In the sitemap generation function, add:
const blogPosts = await getAllPosts()
const blogUrls = blogPosts.map((post) => ({
  url: `${SITE_URL}/blog/${post.slug}`,
  lastModified: post.updatedDate ?? post.date,
  changeFrequency: 'monthly' as const,
  priority: 0.6,
}))

// Also add the blog listing page:
// { url: `${SITE_URL}/blog`, changeFrequency: 'weekly', priority: 0.7 }
```

### 4.18 Sample Post (`content/blog/_sample-post.mdx`)

A sample post that demonstrates all supported MDX features. Prefixed with `_` to exclude from published listings but available in development for testing the rendering pipeline.

```mdx
---
title: "Sample Post: Demonstrating Blog Features"
description: "A test post that exercises all supported MDX components, code blocks, images, callouts, and typography features."
date: "2026-01-01"
author: "safetrekr-team"
tags:
  - product-updates
  - internal
category: "product-updates"
draft: true
featured: false
---

## Introduction

This sample post demonstrates the full set of features available to blog authors. Use it as a reference when writing new posts.

## Text Formatting

Regular paragraphs with **bold text**, *italic text*, and `inline code`. Links look like [this example](https://safetrekr.com).

## Code Blocks

Code blocks with syntax highlighting:

```typescript title="example.ts"
interface TripSafetyReport {
  tripId: string
  riskLevel: 'low' | 'moderate' | 'elevated' | 'high'
  reviewDate: string
  analyst: string
}

function assessRisk(trip: TripSafetyReport): string {
  return `Risk level for trip ${trip.tripId}: ${trip.riskLevel}`
}
```

## Callouts

<Callout type="tip">
This is a tip callout. Use it for helpful suggestions that enhance the reader's understanding.
</Callout>

<Callout type="warning">
This is a warning callout. Use it for important caveats or potential pitfalls.
</Callout>

<Callout type="info">
This is an info callout. Use it for supplementary information that adds context.
</Callout>

<Callout type="important" title="Key Takeaway">
This is an important callout with a custom title.
</Callout>

## Images

<Figure
  src="/images/blog/_sample/placeholder.jpg"
  alt="Placeholder image for testing"
  caption="This is a figure with a caption and attribution."
  attribution="Photo by Example Photographer"
/>

## In-Post CTA

<CTA
  href="/contact"
  label="Schedule a Briefing"
  description="Ready to learn how Safetrekr protects your travelers?"
/>

## Lists

Unordered list:
- First item
- Second item with a longer description that wraps
- Third item
  - Nested item A
  - Nested item B

Ordered list:
1. Step one
2. Step two
3. Step three

## Tables

| Feature | Standard | Premium | Enterprise |
|---------|----------|---------|------------|
| Trip Planning | Yes | Yes | Yes |
| Risk Assessment | Basic | Full 18-dimension | Custom |
| Real-time Monitoring | No | Yes | Yes |

## Blockquotes

> "When someone asks 'Did you do everything you could?' -- Safetrekr is the documented answer."

---

## Conclusion

This post exercises all supported features. Authors can copy sections from this file as a starting point for new posts.

<CTA href="/blog" label="Back to Blog" variant="subtle" />
```

### 4.19 File Manifest

| # | File | Type | Notes |
|---|------|------|-------|
| 1 | `src/lib/schemas/blog.ts` | Schema | Zod 4 frontmatter validation schema + TypeScript types |
| 2 | `src/lib/blog.ts` | Server utility | Content loader: reads directory, parses frontmatter, pagination, filtering |
| 3 | `src/lib/blog-authors.ts` | Data module | Author registry (name, role, avatar, bio) |
| 4 | `src/app/(marketing)/blog/layout.tsx` | Server component | Blog sub-layout. Imports blog-prose.css. |
| 5 | `src/app/(marketing)/blog/page.tsx` | Server component | Blog listing page with paginated cards + tag sidebar |
| 6 | `src/app/(marketing)/blog/[slug]/page.tsx` | Server component | Blog post template with MDX rendering, TOC, related posts |
| 7 | `src/app/(marketing)/blog/tag/[tag]/page.tsx` | Server component | Tag-filtered listing page |
| 8 | `src/app/(marketing)/blog/feed.xml/route.ts` | Route handler | RSS 2.0 feed (XML) |
| 9 | `src/components/marketing/blog-prose.tsx` | Server component | MDX renderer with custom component mapping |
| 10 | `src/components/marketing/blog-toc.tsx` | Server component | Table of contents sidebar (extracted from MDX headings) |
| 11 | `src/components/marketing/blog-card.tsx` | Server component | Post preview card for listing pages |
| 12 | `src/components/marketing/blog-tag.tsx` | Server component | Tag badge linking to tag listing page |
| 13 | `src/components/marketing/blog-pagination.tsx` | Server component | Previous/next page navigation |
| 14 | `src/components/marketing/blog-author.tsx` | Server component | Author byline with avatar, date, reading time |
| 15 | `src/components/marketing/blog-callout.tsx` | Server component | MDX custom component: callout/aside (tip, warning, info, important) |
| 16 | `src/components/marketing/blog-cta.tsx` | Server component | MDX custom component: in-post call-to-action |
| 17 | `src/components/marketing/blog-figure.tsx` | Server component | MDX custom component: image with caption |
| 18 | `src/styles/blog-prose.css` | Stylesheet | Blog typography, code blocks, print styles |
| 19 | `content/blog/_sample-post.mdx` | Content | Sample post demonstrating all MDX features (excluded from listings) |

**Modified files:**

| File | Change |
|------|--------|
| `src/app/sitemap.ts` | Add dynamic blog post URLs to sitemap |

**New directories:**

| Directory | Purpose |
|-----------|---------|
| `content/blog/` | Blog MDX content files |
| `public/images/blog/` | Blog post images (per-post subdirectories) |
| `public/images/authors/` | Author headshots (may already exist from WS-B.9) |

**New dependencies (added to `package.json`):**

| Package | Command |
|---------|---------|
| `next-mdx-remote` | `pnpm add next-mdx-remote` |
| `gray-matter` | `pnpm add gray-matter` |
| `rehype-pretty-code` | `pnpm add rehype-pretty-code` |
| `rehype-slug` | `pnpm add rehype-slug` |
| `reading-time` | `pnpm add reading-time` |

**Packages already available from WS-B.8:** `remark-gfm`

**Packages NOT needed (already handled):**
- `react-markdown` -- replaced by `next-mdx-remote` for blog (legal pages continue using `react-markdown`)

---

## 5. Acceptance Criteria

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | `/blog` renders a listing page with paginated post cards inside the marketing layout | Manual: navigate to `/blog` in dev server |
| 2 | `/blog/[slug]` renders the full MDX content of a blog post with styled typography | Manual: navigate to a post URL |
| 3 | `/blog/tag/[tag]` renders posts filtered by the given tag | Manual: click a tag on the listing page |
| 4 | `/blog/feed.xml` returns valid RSS 2.0 XML with correct Content-Type header | Manual: navigate to `/blog/feed.xml`; validate with an RSS validator |
| 5 | Blog post frontmatter is validated against the Zod schema at build time. Invalid frontmatter logs an error and excludes the post. | CLI: add a post with invalid frontmatter, run `pnpm build`, verify error logged and post excluded |
| 6 | `generateStaticParams` produces correct slugs for all published posts | CLI: `pnpm build` completes and generates static pages for each post |
| 7 | Blog post page displays: author byline (avatar, name), publication date, reading time, tags | Visual inspection on a post page |
| 8 | Table of contents sidebar appears on desktop (>= 1024px) for posts with 3+ headings | Manual: view a post with multiple headings on desktop |
| 9 | Table of contents is hidden on mobile (< 1024px) | Manual: resize to mobile width |
| 10 | MDX custom component `<Callout>` renders with correct variant styles (tip, warning, info, important) | Visual: verify in sample post |
| 11 | MDX custom component `<CTA>` renders with correct button styling and links to the specified href | Visual + click: verify in sample post |
| 12 | MDX custom component `<Figure>` renders with `next/image`, caption, and optional attribution | Visual: verify in sample post |
| 13 | Code blocks render with syntax highlighting via `rehype-pretty-code` (server-side, zero client JS) | Visual: verify code colors in sample post; DevTools: confirm no client-side Shiki bundle |
| 14 | Pagination shows correct page numbers and disables previous/next at boundaries | Manual: verify with 13+ posts (triggers page 2) |
| 15 | Tag sidebar on listing page shows all unique tags with post counts | Visual inspection |
| 16 | Draft posts (frontmatter `draft: true`) are visible in development but excluded in production builds | CLI: set `draft: true` on a post, verify visible in `pnpm dev`, absent after `pnpm build && pnpm start` |
| 17 | Files prefixed with `_` in `content/blog/` are excluded from listings | CLI: verify `_sample-post.mdx` does not appear on `/blog` |
| 18 | Related posts section shows up to 3 posts from the same primary tag (excluding current post) | Visual: verify on a post page |
| 19 | Blog listing page shows an empty state with appropriate messaging when no posts exist | Manual: remove all content files (except `_sample-post.mdx`), verify empty state |
| 20 | SEO: each blog post page generates correct `<title>`, `<meta name="description">`, canonical URL, and Open Graph article metadata | DevTools: inspect `<head>` of a post page |
| 21 | SEO: blog post URLs appear in the sitemap at `/sitemap.xml` | Manual: check sitemap output |
| 22 | RSS feed: includes correct `<title>`, `<link>`, `<pubDate>`, `<dc:creator>`, and `<category>` per post | Manual: inspect feed XML |
| 23 | Prose text meets WCAG 2.1 AA contrast ratio (minimum 4.5:1 for body text) against the content card background | Contrast check: `#e8f0f4` on `#061a23 + white/3%` |
| 24 | All interactive elements have visible focus indicators using `focus-visible:outline` | Manual: Tab through page elements |
| 25 | Print preview produces readable output: light background, dark text, no header/footer/sidebar | Manual: Cmd+P on a post page |
| 26 | `pnpm typecheck` passes with zero errors | CLI |
| 27 | `pnpm build` completes successfully | CLI |
| 28 | Blog post rendering produces zero client-side JavaScript (all server components) | DevTools: Network tab, filter JS, verify no blog-specific client bundles |

---

## 6. Decisions Made

| # | Decision | Rationale |
|---|----------|-----------|
| 1 | **Use MDX (via `next-mdx-remote`) instead of plain markdown** | Blog posts benefit from embedded React components (callouts, CTAs, figures with `next/image`). MDX compiles at build time with zero client JS when rendered in server components. The legal pages use plain markdown (correct for their use case), but blog content needs richer authoring capabilities. |
| 2 | **Use `next-mdx-remote/rsc` instead of `@next/mdx`** | Content lives in `content/blog/` outside the app directory, consistent with the legal content pattern from WS-B.8. `@next/mdx` requires MDX files as route files inside `src/app/`, which couples content location to routing. `next-mdx-remote` decouples them. |
| 3 | **Use `gray-matter` for frontmatter parsing** | Blog frontmatter has 12+ fields including arrays and optional values. The regex-based extractor from WS-B.8 was appropriate for 2-field legal frontmatter but would be fragile here. `gray-matter` is the standard MDX ecosystem choice. |
| 4 | **Use `rehype-pretty-code` for syntax highlighting** | Blog will include technical content (API examples, configuration). Shiki-based highlighting renders at build time (zero client JS), supports the dark theme natively, and provides line highlighting for code walkthroughs. |
| 5 | **File-based content (`content/blog/*.mdx`) over headless CMS** | At launch-phase content velocity (1-4 posts/month), file-based content is simpler, has zero infrastructure cost, and keeps content in version control. CMS can be added later without changing the rendering layer -- only the content loader (`src/lib/blog.ts`) needs to change. |
| 6 | **Separate `blog-prose.css` from `legal-prose.css`** | Blog typography has different needs: slightly larger base size (17px vs 16px), code block styling, figure captions, callout spacing. Sharing a single stylesheet would create brittle overrides. Both files follow the same structural pattern. |
| 7 | **12 posts per page for pagination** | 4 rows of 3 cards at desktop (lg), 6 rows of 2 on tablet (sm), 12 single-column on mobile. Balances page weight against scroll depth. |
| 8 | **Category as enum, tags as freeform strings** | Categories map to content strategy pillars (6 fixed values). Tags are flexible and author-defined. This prevents category proliferation while allowing granular topic tagging. |
| 9 | **RSS feed is a route handler (not a static file)** | Dynamic generation ensures the feed always reflects published posts without a separate build step. Caching headers (`max-age=3600`) prevent regeneration on every request. |
| 10 | **`_`-prefixed files excluded from listings** | Convention from content management systems. Allows sample and draft content to exist in the content directory without appearing on the site. Combined with the `draft` frontmatter flag for published-but-hidden posts. |
| 11 | **No `'use client'` directive on any blog component** | All blog pages and components are server components. There is no client-side interactivity (no state, no effects, no event handlers beyond native links). This results in zero JavaScript shipped to the browser for blog pages. |
| 12 | **Related posts use simple tag-matching, not a recommendation algorithm** | Content volume at launch does not justify algorithmic recommendations. Showing 3 recent posts with the same primary tag is sufficient and trivial to implement. Can be upgraded when content exceeds 50+ posts. |

---

## 7. Open Questions

| # | Question | Impact | Owner | Default If Unresolved |
|---|----------|--------|-------|-----------------------|
| 1 | What are the initial blog categories? The schema proposes 6 (`travel-safety`, `product-updates`, `industry-insights`, `compliance`, `case-studies`, `guides`). Are these aligned with the content marketing strategy? | Determines the category enum in the Zod schema. Can be changed later but affects existing post categorization. | Business Owner / Content Strategist | Use the 6 proposed categories. Adjust when the content marketing strategy is formalized. |
| 2 | Should blog posts have a dedicated OG image per post, or use a templated OG image with the post title overlaid? | Dedicated images require design effort per post. Templated OG images can be generated dynamically using `next/og`. | Product | Use post `coverImage` as OG image when available. Fall back to a templated OG image (blog title + Safetrekr branding) generated via `next/og` for posts without cover images. |
| 3 | Should the blog listing page be accessible from the marketing header navigation? If so, what label -- "Blog", "Insights", or "Resources"? | Affects WS-A.1 header nav config. | Product / UX | Add "Insights" to the marketing header navigation, linking to `/blog`. This aligns with the "Calm Authority" voice (not "Blog" which feels casual for B2B). |
| 4 | Is there a target publication cadence? (e.g., 2 posts/month, 1 post/week) | Influences whether to add scheduling features (publish date in the future). Currently all published posts are immediately visible. | Business Owner | No scheduling feature at launch. Posts are published when the MDX file is committed. Future-dated posts appear immediately -- adjust if needed. |
| 5 | Should the RSS feed include a `<content:encoded>` field with the full HTML content, or just `<description>` with the summary? | Full content in RSS allows reading in feed readers without visiting the site. Summary drives traffic to the site. | Product | Summary only (using the `description` frontmatter field). Drives traffic to the site where the CTA and full formatting are visible. |
| 6 | Does the blog need a JSON Feed (`/blog/feed.json`) in addition to RSS? | Some modern feed readers prefer JSON Feed. Minimal additional effort. | Product | Omit at launch. Add if requested. RSS 2.0 is universally supported. |
| 7 | Who are the initial blog authors? The author registry includes the 3 founders + "Safetrekr Team." Should additional team members (technology partners) be included? | Determines entries in `blog-authors.ts`. Can be expanded at any time. | Business Owner | Start with the 4 proposed authors. Add technology partners when they author content. |

---

## 8. Risk Register

| # | Risk | Likelihood | Impact | Severity | Mitigation |
|---|------|-----------|--------|----------|------------|
| 1 | **No blog content published post-launch** -- Infrastructure is ready but no one writes posts | HIGH | MEDIUM | **HIGH** | Flag to business owner: blog infrastructure without content has zero SEO value. Recommend creating an editorial calendar with 4 seed posts before activating the blog publicly. The `product-narrative-strategist` agent can draft seed posts from existing material (product review, holistic overview). |
| 2 | **MDX compilation errors from author-written content** | MEDIUM | LOW | **MEDIUM** | Zod frontmatter validation catches schema errors. MDX compilation errors are surfaced during `pnpm build` with clear file and line references. The sample post (`_sample-post.mdx`) serves as an authoring reference. Consider adding a `pnpm blog:validate` script that compiles all MDX files and reports errors. |
| 3 | **`next-mdx-remote` server component compatibility with Next.js 16** | LOW | HIGH | **MEDIUM** | `next-mdx-remote` v5+ supports React Server Components via the `/rsc` export. Verify during implementation with `pnpm build`. Fallback: use `@next/mdx` with MDX files as route segments (would require restructuring content location). |
| 4 | **Syntax highlighting bundle size** | LOW | MEDIUM | **LOW** | `rehype-pretty-code` loads Shiki grammars on demand at build time. No client-side bundle impact. Monitor build time -- if adding many language grammars slows builds, limit to the languages used in blog posts (TypeScript, JSON, bash, YAML). |
| 5 | **Content directory not found at build time** | LOW | HIGH | **MEDIUM** | If `content/blog/` does not exist or is empty, `readdir` will throw. The `getAllPosts` function should catch this and return an empty array, rendering the empty state on the listing page. Do not crash the build for missing content. |
| 6 | **RSS feed validation failures** | LOW | LOW | **LOW** | Test the feed output against the W3C Feed Validation Service during implementation. CDATA sections protect against XML-unsafe characters in titles and descriptions. |
| 7 | **Stale sitemap after post deletion** | LOW | LOW | **LOW** | The sitemap is dynamically generated from `getAllPosts()`. Deleting a content file removes it from the sitemap on the next build. No manual intervention needed. |
| 8 | **Image paths in MDX broken in production** | MEDIUM | MEDIUM | **MEDIUM** | All blog images must be placed in `public/images/blog/` and referenced with absolute paths starting with `/images/blog/`. The `Figure` component uses `next/image` for optimization. Document the image convention in the sample post. |

---

## Estimated Effort

**Size:** M (Medium)
**Estimated time:** 8-12 hours for full infrastructure; < 30 minutes per post to publish new content thereafter.
**Files created:** 19 new files
**Files modified:** 1 (sitemap.ts)
**New dependencies:** 5 (`next-mdx-remote`, `gray-matter`, `rehype-pretty-code`, `rehype-slug`, `reading-time`)

### Implementation Order

1. Install dependencies: `pnpm add next-mdx-remote gray-matter rehype-pretty-code rehype-slug reading-time`
2. Create `content/blog/` directory and sample post (`_sample-post.mdx`)
3. Create `src/lib/schemas/blog.ts` (Zod frontmatter schema + types)
4. Create `src/lib/blog-authors.ts` (author registry)
5. Create `src/lib/blog.ts` (content loader, pagination, filtering)
6. Create `src/styles/blog-prose.css` (typography + code blocks + print styles)
7. Create MDX custom components: `blog-callout.tsx`, `blog-cta.tsx`, `blog-figure.tsx`
8. Create `src/components/marketing/blog-prose.tsx` (MDX renderer)
9. Create `src/components/marketing/blog-toc.tsx` (table of contents)
10. Create `src/components/marketing/blog-tag.tsx` (tag badge)
11. Create `src/components/marketing/blog-card.tsx` (post preview card)
12. Create `src/components/marketing/blog-author.tsx` (author byline)
13. Create `src/components/marketing/blog-pagination.tsx` (page navigation)
14. Create `src/app/(marketing)/blog/layout.tsx` (blog sub-layout)
15. Create `src/app/(marketing)/blog/page.tsx` (listing page)
16. Create `src/app/(marketing)/blog/[slug]/page.tsx` (post template)
17. Create `src/app/(marketing)/blog/tag/[tag]/page.tsx` (tag listing)
18. Create `src/app/(marketing)/blog/feed.xml/route.ts` (RSS feed)
19. Update `src/app/sitemap.ts` (add blog URLs)
20. Run `pnpm typecheck` and `pnpm build` to verify
21. Test in browser: listing page, post rendering, tag filtering, RSS feed, pagination, empty state, print preview

### Content Utilities Refactoring

During implementation, consider extracting shared utilities from WS-B.8's `src/lib/legal-utils.ts` into a common `src/lib/content-utils.ts` module that both legal pages and blog pages import from. Shared candidates:

- `formatDate(dateStr: string): string` -- identical usage in both contexts
- `extractHeadings(markdown: string): TocEntry[]` -- identical logic (used by both TOC components)
- `slugify(text: string): string` -- used by heading ID generation

This refactoring is optional but reduces duplication. The legal pages continue to work unchanged -- only the import path would change.
