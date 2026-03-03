// src/components/marketing/about/partner-grid.tsx

import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { TechPartner } from '@/lib/interfaces/about-team'

interface PartnerGridProps {
  featured: TechPartner[]
  additional: TechPartner[]
}

function PartnerCard({
  partner,
  size,
}: {
  partner: TechPartner
  size: 'large' | 'compact'
}) {
  const photoSize = size === 'large' ? 64 : 56
  return (
    <div
      className={cn(
        'rounded-xl p-4',
        'bg-white/[0.06] backdrop-blur-[16px] backdrop-saturate-[130%]',
        'border border-white/[0.08]',
      )}
    >
      <div className="flex items-center gap-3">
        <Image
          src={partner.photo}
          alt={`Portrait of ${partner.name}`}
          width={photoSize}
          height={photoSize}
          className="flex-shrink-0 rounded-lg object-cover"
        />
        <div>
          <h4
            className={cn(
              'font-semibold text-[var(--color-text-primary)]',
              size === 'large' ? 'text-base' : 'text-sm',
            )}
          >
            {partner.name}
          </h4>
          <p
            className={cn(
              'text-[var(--color-text-secondary)]',
              size === 'large' ? 'text-sm' : 'text-xs',
            )}
          >
            {partner.domain}
          </p>
        </div>
      </div>
    </div>
  )
}

export function PartnerGrid({ featured, additional }: PartnerGridProps) {
  return (
    <div>
      {/* Featured partners -- 3 col */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} size="large" />
        ))}
      </div>

      {/* Additional partners -- auto-fit compact grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {additional.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} size="compact" />
        ))}
      </div>
    </div>
  )
}
