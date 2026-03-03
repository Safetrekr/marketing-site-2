// src/components/marketing/blog-prose.tsx

import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
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
            rehypePlugins: [rehypeSlug],
          },
        }}
      />
    </article>
  )
}
