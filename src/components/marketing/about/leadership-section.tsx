'use client'

// src/components/marketing/about/leadership-section.tsx

import { useState, useCallback } from 'react'
import type { Leader } from '@/lib/interfaces/about-team'
import { LeadershipCard } from './leadership-card'
import { LeadershipDetailModal } from './leadership-detail-modal'

interface LeadershipSectionProps {
  leaders: Leader[]
}

export function LeadershipSection({ leaders }: LeadershipSectionProps) {
  const [activeLeader, setActiveLeader] = useState<Leader | null>(null)

  const handleLearnMore = useCallback(
    (leaderId: string) => {
      const leader = leaders.find((l) => l.id === leaderId) ?? null
      setActiveLeader(leader)
    },
    [leaders],
  )

  const handleClose = useCallback(() => {
    setActiveLeader(null)
  }, [])

  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {leaders.map((leader) => (
          <LeadershipCard
            key={leader.id}
            leader={leader}
            onLearnMore={handleLearnMore}
          />
        ))}
      </div>
      <LeadershipDetailModal leader={activeLeader} onClose={handleClose} />
    </>
  )
}
