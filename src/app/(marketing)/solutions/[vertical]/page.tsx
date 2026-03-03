// src/app/(marketing)/solutions/[vertical]/page.tsx

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { VERTICAL_DETAIL_MAP, VALID_VERTICAL_SLUGS } from '@/lib/data/verticals'
import { VERTICALS } from '@/lib/data/solutions-verticals'
import { VerticalDetailTemplate } from '@/components/marketing/solutions/vertical-detail-template'
import { generatePageMetadata } from '@/lib/seo/metadata'

interface VerticalPageProps {
  params: Promise<{ vertical: string }>
}

export async function generateStaticParams() {
  return VALID_VERTICAL_SLUGS.map((slug) => ({ vertical: slug }))
}

export async function generateMetadata({
  params,
}: VerticalPageProps): Promise<Metadata> {
  const { vertical } = await params
  const data = VERTICAL_DETAIL_MAP[vertical]
  if (!data) return {}

  return generatePageMetadata({
    title: data.seoTitle,
    description: data.seoDescription,
    path: `/solutions/${vertical}`,
    keywords: data.seoKeywords,
  })
}

export default async function VerticalDetailPage({
  params,
}: VerticalPageProps) {
  const { vertical } = await params
  const data = VERTICAL_DETAIL_MAP[vertical]
  if (!data) notFound()

  // Get sibling verticals for cross-links (exclude current)
  const siblingVerticals = VERTICALS.filter((v) => v.id !== data.id)

  return (
    <VerticalDetailTemplate
      data={data}
      siblingVerticals={siblingVerticals}
    />
  )
}
