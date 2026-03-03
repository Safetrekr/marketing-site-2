// src/app/(marketing)/solutions/[vertical]/page.tsx

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const VALID_VERTICALS = [
  'k12',
  'higher-ed',
  'churches',
  'youth-sports',
  'business',
]

const VERTICAL_LABELS: Record<string, string> = {
  k12: 'K-12 Schools',
  'higher-ed': 'Higher Education',
  churches: 'Churches & Faith-Based Organizations',
  'youth-sports': 'Youth Sports',
  business: 'Business',
}

interface VerticalPageProps {
  params: Promise<{ vertical: string }>
}

export async function generateStaticParams() {
  return VALID_VERTICALS.map((v) => ({ vertical: v }))
}

export async function generateMetadata({
  params,
}: VerticalPageProps): Promise<Metadata> {
  const { vertical } = await params
  if (!VALID_VERTICALS.includes(vertical)) return {}
  const label = VERTICAL_LABELS[vertical] || vertical
  return {
    title: `${label} Solutions | Safetrekr`,
    robots: { index: false },
  }
}

export default async function VerticalDetailPage({
  params,
}: VerticalPageProps) {
  const { vertical } = await params
  if (!VALID_VERTICALS.includes(vertical)) notFound()

  const label = VERTICAL_LABELS[vertical] || vertical

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-text-tertiary)]">
        Solutions // {label}
      </p>
      <p className="text-lg text-[var(--color-text-secondary)]">
        Detailed solutions page coming soon.
      </p>
      <Link
        href="/solutions"
        className="mt-4 text-sm font-semibold text-[var(--color-ember)] hover:text-[var(--color-ember-bright)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]"
      >
        Back to Solutions Overview
      </Link>
    </div>
  )
}
