import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing | Safetrekr',
  description:
    'Simple, transparent pricing for trip safety intelligence.',
}

export default function PricingPage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-6">
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] px-12 py-16 text-center backdrop-blur-[8px]">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-text-tertiary)]">
          WS-B.5
        </p>
        <h1 className="mt-4 font-sans text-3xl font-bold text-[var(--color-text-primary)]">
          Pricing
        </h1>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          Content pending — Phase B
        </p>
      </div>
    </div>
  )
}
