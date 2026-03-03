// src/components/marketing/social-proof/testimonial-grid.tsx

import { cn } from '@/lib/utils'
import { TestimonialCard } from './testimonial-card'
import type { Testimonial } from '@/lib/interfaces/social-proof'

interface TestimonialGridProps {
  testimonials: Testimonial[]
  className?: string
}

export function TestimonialGrid({
  testimonials,
  className,
}: TestimonialGridProps) {
  return (
    <div
      className={cn(
        'grid gap-8',
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        className,
      )}
    >
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </div>
  )
}
