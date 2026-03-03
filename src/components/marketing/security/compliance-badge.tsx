// src/components/marketing/security/compliance-badge.tsx

import { CheckCircle, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ComplianceCertification } from '@/lib/interfaces/security'

interface ComplianceBadgeProps {
  certification: ComplianceCertification
}

export function ComplianceBadge({ certification }: ComplianceBadgeProps) {
  // Do not render certifications marked as not applicable
  if (certification.status === 'not-applicable') {
    return null
  }

  const isVerified = certification.status === 'verified'

  return (
    <div
      className={cn(
        'flex flex-col rounded-xl p-5',
        'border',
        isVerified
          ? 'border-[rgba(var(--ember-rgb),0.2)] bg-[rgba(var(--ember-rgb),0.06)]'
          : 'border-white/[0.06] bg-white/[0.04]',
      )}
    >
      {/* Status indicator + Name */}
      <div className="flex items-start gap-3">
        {isVerified ? (
          <CheckCircle
            size={20}
            className="mt-0.5 flex-shrink-0 text-[var(--color-ember)]"
            aria-hidden="true"
          />
        ) : (
          <Clock
            size={20}
            className="mt-0.5 flex-shrink-0 text-[var(--color-text-tertiary)]"
            aria-hidden="true"
          />
        )}
        <div>
          <h4
            className={cn(
              'font-sans text-base font-semibold',
              isVerified
                ? 'text-[var(--color-text-primary)]'
                : 'text-[var(--color-text-secondary)]',
            )}
          >
            {certification.name}
          </h4>
          <p
            className={cn(
              'mt-1 text-sm leading-relaxed',
              isVerified
                ? 'text-[var(--color-text-secondary)]'
                : 'text-[var(--color-text-tertiary)]',
            )}
          >
            {certification.description}
          </p>
        </div>
      </div>

      {/* Status note */}
      <div
        className={cn(
          'mt-3 flex items-center gap-1.5 text-xs font-medium',
          isVerified
            ? 'text-[var(--color-ember)]'
            : 'text-[var(--color-text-tertiary)] italic',
        )}
      >
        {isVerified ? (
          <span>Certified</span>
        ) : (
          <span>{certification.statusNote}</span>
        )}
      </div>
    </div>
  )
}
