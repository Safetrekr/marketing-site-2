// src/components/marketing/about/agency-badge-grid.tsx

import Image from 'next/image'
import { Shield, ShieldCheck } from 'lucide-react'
import type { AgencyBadge } from '@/lib/interfaces/about-team'

// Map icon name strings to Lucide components
const ICON_MAP: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  Shield,
  ShieldCheck,
}

interface AgencyBadgeGridProps {
  badges: AgencyBadge[]
}

export function AgencyBadgeGrid({ badges }: AgencyBadgeGridProps) {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
      {badges.map((badge) => (
        <div key={badge.id} className="flex flex-col items-center text-center">
          {/* Badge visual */}
          <div className="mb-3 flex h-[100px] w-[100px] items-center justify-center">
            {badge.imageType === 'file' && badge.image ? (
              <Image
                src={badge.image}
                alt={`${badge.name} insignia`}
                width={90}
                height={90}
                className="object-contain"
              />
            ) : (
              (() => {
                const IconComponent = ICON_MAP[badge.iconName ?? '']
                return IconComponent ? (
                  <IconComponent
                    size={80}
                    className="text-[var(--color-ember)] opacity-80"
                  />
                ) : null
              })()
            )}
          </div>
          {/* Name */}
          <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">
            {badge.name}
          </h4>
          {/* Description */}
          <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
            {badge.description}
          </p>
        </div>
      ))}
    </div>
  )
}
