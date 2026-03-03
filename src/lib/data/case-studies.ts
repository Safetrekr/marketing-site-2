// src/lib/data/case-studies.ts

import type { CaseStudy } from '@/lib/interfaces/social-proof'

/**
 * Case study content.
 *
 * HOW TO ADD A CASE STUDY:
 * 1. Obtain customer approval for the case study narrative
 * 2. Add hero image to /public/images/case-studies/[slug]/
 * 3. Add an entry to this array following the CaseStudy interface
 * 4. The page at /case-studies/[slug] renders automatically
 * 5. Run `pnpm build` to verify static generation
 */
export const CASE_STUDIES: CaseStudy[] = [
  // --- Add case studies here as customer content is approved ---
]

/** Returns all published case studies sorted by order. */
export function getPublishedCaseStudies(): CaseStudy[] {
  return [...CASE_STUDIES].sort((a, b) => a.order - b.order)
}

/** Returns a single case study by slug, or undefined. */
export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((cs) => cs.slug === slug)
}

/** Returns case studies filtered by vertical. */
export function getCaseStudiesByVertical(vertical: string): CaseStudy[] {
  return getPublishedCaseStudies().filter((cs) => cs.vertical === vertical)
}
