// src/components/marketing/solutions/feature-spotlight.tsx

import {
  ClipboardCheck,
  Shield,
  MapPin,
  Flame,
  Globe,
  UserCheck,
  LifeBuoy,
  Smartphone,
  ShieldCheck,
  WifiOff,
  Bell,
  Award,
  Receipt,
  FileDown,
  AlertTriangle,
} from 'lucide-react'
import type { VerticalFeatureSpotlight } from '@/lib/interfaces/solutions'
import { cn } from '@/lib/utils'

const SPOTLIGHT_ICON_MAP: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  ClipboardCheck,
  Shield,
  MapPin,
  Flame,
  Globe,
  UserCheck,
  LifeBuoy,
  Smartphone,
  ShieldCheck,
  WifiOff,
  Bell,
  Award,
  Receipt,
  FileDown,
  AlertTriangle,
}

interface FeatureSpotlightProps {
  spotlight: VerticalFeatureSpotlight
}

export function FeatureSpotlight({ spotlight }: FeatureSpotlightProps) {
  const Icon = spotlight.iconName
    ? SPOTLIGHT_ICON_MAP[spotlight.iconName]
    : null

  return (
    <div
      className={cn(
        'rounded-xl p-6',
        'bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]',
        'border border-white/[0.08]',
      )}
    >
      {Icon && (
        <div
          className={cn(
            'mb-4 flex h-10 w-10 items-center justify-center rounded-lg',
            'bg-[rgba(var(--ember-rgb),0.08)]',
            'border border-[rgba(var(--ember-rgb),0.12)]',
          )}
        >
          <Icon
            size={20}
            className="text-[var(--color-ember)]"
            aria-hidden="true"
          />
        </div>
      )}
      <h3 className="font-sans text-base font-semibold text-[var(--color-text-primary)]">
        {spotlight.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
        {spotlight.description}
      </p>
      {spotlight.metric && (
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-ember)]">
          {spotlight.metric}
        </p>
      )}
    </div>
  )
}
