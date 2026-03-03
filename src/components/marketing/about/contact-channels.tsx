// src/components/marketing/about/contact-channels.tsx

import { Handshake, Rocket, Newspaper } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ContactChannel } from '@/lib/interfaces/about-team'

const ICON_MAP: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  Handshake,
  Rocket,
  Newspaper,
}

interface ContactChannelsProps {
  channels: ContactChannel[]
}

export function ContactChannels({ channels }: ContactChannelsProps) {
  return (
    <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {channels.map((channel) => {
        const Icon = ICON_MAP[channel.iconName]
        return (
          <div
            key={channel.id}
            className={cn(
              'flex flex-col items-center rounded-xl p-6 text-center',
              'bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]',
              'border border-white/[0.08]',
            )}
          >
            {Icon && (
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.06]">
                <Icon size={24} className="text-[var(--color-ember)]" />
              </div>
            )}
            <h4 className="text-base font-semibold text-[var(--color-text-primary)]">
              {channel.label}
            </h4>
            <a
              href={`mailto:${channel.email}`}
              className={cn(
                'mt-2 text-sm text-[var(--color-ember-bright)]',
                'underline-offset-4 hover:underline',
                'focus-visible:outline-2 focus-visible:outline-offset-2',
                'focus-visible:outline-[var(--color-ember-bright)]',
              )}
            >
              {channel.email}
            </a>
          </div>
        )
      })}
    </div>
  )
}
