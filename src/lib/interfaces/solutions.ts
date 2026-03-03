// src/lib/interfaces/solutions.ts

/** A single vertical solution for the Solutions overview page. */
export interface SolutionVertical {
  /** Unique identifier, used as React key and URL slug */
  id: string
  /** Display name shown as card title */
  name: string
  /** Lucide icon component name */
  iconName: string
  /** H3 tagline for the card */
  tagline: string
  /** 3-4 pain points the vertical faces */
  painPoints: string[]
  /** 3-4 Safetrekr solutions addressing the pain points */
  solutions: string[]
  /** CTA label (e.g., "Learn more about Safetrekr for K-12") */
  ctaLabel: string
  /** Link to vertical detail page (e.g., "/solutions/k12") */
  ctaHref: string
}
