// src/lib/legal-utils.ts

import type { TocEntry } from '@/components/marketing/legal-toc'

/** Extract h2/h3 headings from markdown for table of contents generation */
export function extractHeadings(markdown: string): TocEntry[] {
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

/** Extract a value from YAML-style frontmatter */
export function extractFrontmatter(
  raw: string,
  key: string,
): string | null {
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/)
  if (!fmMatch) return null
  const line = fmMatch[1].split('\n').find((l) => l.startsWith(`${key}:`))
  return line ? line.slice(key.length + 1).trim() : null
}

/** Format a date string for human-readable display */
export function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}

/** Read and parse a legal markdown file, returning content and metadata */
export async function readLegalContent(filename: string) {
  const { readFile } = await import('node:fs/promises')
  const { join } = await import('node:path')

  const filePath = join(process.cwd(), 'content', 'legal', filename)

  let raw: string
  try {
    raw = await readFile(filePath, 'utf-8')
  } catch {
    // Graceful fallback if content file is missing
    console.warn(
      `[legal-utils] Content file not found: ${filePath}. Rendering fallback.`,
    )
    return {
      content: '# Content Not Yet Available\n\nThis page is under construction.',
      tocEntries: [],
      lastUpdated: 'Not yet published',
      title: filename.replace('.md', ''),
    }
  }

  const content = raw.replace(/^---[\s\S]*?---\n*/, '')
  const tocEntries = extractHeadings(content)
  const lastUpdated =
    extractFrontmatter(raw, 'lastUpdated') ?? 'Not yet published'
  const title =
    extractFrontmatter(raw, 'title') ?? filename.replace('.md', '')

  return { content, tocEntries, lastUpdated, title }
}
