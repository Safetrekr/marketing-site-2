// src/components/marketing/solutions/vertical-card-grid.tsx

import type { SolutionVertical } from '@/lib/interfaces/solutions'
import { VerticalCard } from './vertical-card'

interface VerticalCardGridProps {
  verticals: SolutionVertical[]
}

export function VerticalCardGrid({ verticals }: VerticalCardGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {verticals.map((vertical) => (
        <VerticalCard key={vertical.id} vertical={vertical} />
      ))}
    </div>
  )
}
