// src/components/marketing/security/architecture-badge-row.tsx

import {
  Database,
  ShieldCheck,
  Lock,
  FileCheck,
  UserCheck,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ArchitectureBadge } from '@/lib/interfaces/security'

const ICON_MAP: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  Database,
  ShieldCheck,
  Lock,
  FileCheck,
  UserCheck,
}

interface ArchitectureBadgeRowProps {
  badges: ArchitectureBadge[]
}

export function ArchitectureBadgeRow({ badges }: ArchitectureBadgeRowProps) {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-12">
      <p className="sr-only">
        Verified architecture capabilities: {badges.map((b) => b.label).join(', ')}
      </p>
      <div className="flex flex-wrap items-center gap-3" role="list">
        {badges.map((badge) => {
          const Icon = ICON_MAP[badge.iconName]
          return (
            <div
              key={badge.id}
              role="listitem"
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-4 py-2',
                'border border-[rgba(var(--ember-rgb),0.15)]',
                'bg-[rgba(var(--ember-rgb),0.06)]',
                'text-sm font-medium text-[var(--color-text-primary)]',
              )}
            >
              {Icon && (
                <Icon
                  size={14}
                  className="text-[var(--color-ember)]"
                  aria-hidden="true"
                />
              )}
              <span>{badge.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
