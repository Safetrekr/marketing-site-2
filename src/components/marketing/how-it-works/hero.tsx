// src/components/marketing/how-it-works/hero.tsx

import { HERO } from '@/lib/data/how-it-works'

export function HowItWorksHero() {
  return (
    <section className="mx-auto max-w-4xl px-6 pt-24 pb-12 text-center lg:px-8 lg:pt-32 lg:pb-16">
      <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-5xl">
        {HERO.h1}
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)] lg:text-xl">
        {HERO.h2}
      </p>
    </section>
  )
}
