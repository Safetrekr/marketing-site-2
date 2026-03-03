// src/components/marketing/security/security-feature-card.tsx

import {
  Database,
  HardDrive,
  Lock,
  Layers,
  Settings,
  Container,
  KeyRound,
  ShieldCheck,
  UserCheck,
  FileCheck,
  Eye,
  ScrollText,
  Clock,
  WifiOff,
  Fingerprint,
  MapPin,
  RefreshCw,
  UserCog,
  FileSearch,
  ScanSearch,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SecurityFeature } from '@/lib/interfaces/security'

const ICON_MAP: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  Database,
  HardDrive,
  Lock,
  Layers,
  Settings,
  Container,
  KeyRound,
  ShieldCheck,
  UserCheck,
  FileCheck,
  Eye,
  ScrollText,
  Clock,
  WifiOff,
  Fingerprint,
  MapPin,
  RefreshCw,
  UserCog,
  FileSearch,
  ScanSearch,
}

interface SecurityFeatureCardProps {
  feature: SecurityFeature
}

export function SecurityFeatureCard({ feature }: SecurityFeatureCardProps) {
  const Icon = ICON_MAP[feature.iconName]

  return (
    <article
      className={cn(
        'flex flex-col rounded-2xl p-6',
        // Glass material -- slightly more opaque than standard for readability
        'bg-white/[0.08] backdrop-blur-[16px] backdrop-saturate-[130%]',
        'border border-white/[0.08]',
      )}
    >
      {/* Icon + Title */}
      <div className="flex items-start gap-3">
        {Icon && (
          <div
            className={cn(
              'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg',
              'bg-[rgba(var(--ember-rgb),0.08)]',
            )}
          >
            <Icon
              size={20}
              className="text-[var(--color-ember)]"
              aria-hidden="true"
            />
          </div>
        )}
        <h3 className="font-sans text-lg font-bold text-[var(--color-text-primary)]">
          {feature.title}
        </h3>
      </div>

      {/* Specification bullets */}
      <ul className="mt-4 space-y-2" role="list">
        {feature.specs.map((spec, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm leading-relaxed text-[var(--color-text-secondary)]"
          >
            <span
              className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--color-ember)] opacity-60"
              aria-hidden="true"
            />
            {spec}
          </li>
        ))}
      </ul>
    </article>
  )
}
