// src/lib/schemas/blog.ts

import { z } from 'zod/v4'

export const blogPostFrontmatterSchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().min(1).max(300),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD format'),
  updatedDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  author: z.string().min(1), // Key into blog-authors.ts registry
  tags: z.array(z.string().min(1)).min(1).max(5),
  category: z.enum([
    'travel-safety',
    'product-updates',
    'industry-insights',
    'compliance',
    'case-studies',
    'guides',
  ]),
  coverImage: z.string().optional(), // Path relative to /public
  coverImageAlt: z.string().optional(), // Required if coverImage is set
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  seoTitle: z.string().max(70).optional(), // Override title for <title> tag
  seoDescription: z.string().max(160).optional(), // Override description for meta
})

export type BlogPostFrontmatter = z.infer<typeof blogPostFrontmatterSchema>

export interface BlogPost extends BlogPostFrontmatter {
  slug: string // Derived from filename (e.g., 'duty-of-care-explained')
  readingTime: string // Calculated from content (e.g., '8 min read')
  content: string // Raw MDX content (frontmatter stripped)
}

export interface BlogPostMeta extends Omit<BlogPost, 'content'> {
  // Listing-page subset: everything except the full MDX content body
}
