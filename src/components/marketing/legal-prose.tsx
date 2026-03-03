// src/components/marketing/legal-prose.tsx

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'

interface LegalProseProps {
  content: string
  className?: string
}

export function LegalProse({ content, className }: LegalProseProps) {
  return (
    <article
      className={cn('legal-prose', className)}
      aria-label="Legal document"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom heading renderers that add id attributes for TOC anchors
          h1: ({ children, ...props }) => (
            <h1 id={slugify(children)} {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 id={slugify(children)} {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 id={slugify(children)} {...props}>
              {children}
            </h3>
          ),
          // External links open in new tab
          a: ({ href, children, ...props }) => {
            const isExternal = href?.startsWith('http')
            return (
              <a
                href={href}
                {...(isExternal
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                {...props}
              >
                {children}
              </a>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}

/** Convert heading text to a URL-safe slug for anchor links */
function slugify(children: React.ReactNode): string {
  const text =
    typeof children === 'string'
      ? children
      : Array.isArray(children)
        ? children.map((c) => (typeof c === 'string' ? c : '')).join('')
        : ''
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
