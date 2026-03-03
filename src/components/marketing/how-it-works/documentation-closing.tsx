// src/components/marketing/how-it-works/documentation-closing.tsx

import { DOCUMENTATION_CLOSING } from '@/lib/data/how-it-works'

export function DocumentationClosing() {
  return (
    <section
      aria-labelledby="documentation-heading"
      className="mx-auto max-w-4xl px-6 py-16 text-center lg:px-8 lg:py-24"
    >
      <h2
        id="documentation-heading"
        className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl"
      >
        {DOCUMENTATION_CLOSING.heading}
      </h2>
      {DOCUMENTATION_CLOSING.body.map((paragraph, i) => (
        <p
          key={i}
          className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)] lg:text-lg"
        >
          {paragraph}
        </p>
      ))}
    </section>
  )
}
