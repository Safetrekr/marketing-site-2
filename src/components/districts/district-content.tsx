/**
 * DistrictContent -- renders marketing preview content inside the
 * district shell (detail panel).
 *
 * Each district shows a headline, bullet list, and CTA link that
 * navigates to the corresponding marketing page. The "Get Started"
 * district uses amber accent for its CTA.
 *
 * @module district-content
 * @see WS-A.2 Section 4.5 (AD-3)
 */

'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import type { DistrictId } from '@/lib/interfaces/district'

// ============================================================================
// Marketing District Config
// ============================================================================

interface MarketingDistrictConfig {
  readonly headline: string
  readonly bullets: readonly string[]
  readonly ctaLabel: string
  readonly ctaHref: string
  /** If true, CTA uses amber accent styling for conversion emphasis. */
  readonly isConversion?: boolean
}

const MARKETING_DISTRICT_CONFIG: Record<DistrictId, MarketingDistrictConfig> = {
  'how-it-works': {
    headline: 'See how Safetrekr protects your people',
    bullets: [
      'Real-time location tracking with sub-meter accuracy',
      'Automated check-in and welfare monitoring',
      'Instant emergency response coordination',
    ],
    ctaLabel: 'Read More',
    ctaHref: '/how-it-works',
  },
  'who-its-for': {
    headline: 'Built for the people accountable when the group travels',
    bullets: [
      'Schools, churches, youth sports, and businesses',
      'Trip leaders, chaperones, and safety officers',
      'Administrators and compliance teams',
    ],
    ctaLabel: 'Read More',
    ctaHref: '/solutions',
  },
  'platform': {
    headline: 'Architecture designed for reliability',
    bullets: [
      'Satellite + cellular hybrid connectivity',
      'Real-time dashboard and reporting',
      'API integrations with existing safety systems',
    ],
    ctaLabel: 'Read More',
    ctaHref: '/platform',
  },
  'security': {
    headline: 'Enterprise-grade data protection',
    bullets: [
      'SOC 2 Type II certified infrastructure',
      'End-to-end encryption at rest and in transit',
      'Role-based access control and audit logging',
    ],
    ctaLabel: 'Read More',
    ctaHref: '/security',
  },
  'pricing': {
    headline: 'Transparent plans for teams of any size',
    bullets: [
      'Free tier for small teams',
      'Per-seat pricing with volume discounts',
      'Enterprise custom plans available',
    ],
    ctaLabel: 'Read More',
    ctaHref: '/pricing',
  },
  'get-started': {
    headline: 'Start protecting your team today',
    bullets: [
      '15-minute onboarding walkthrough',
      'Free trial with full platform access',
      'Dedicated onboarding specialist',
    ],
    ctaLabel: 'Request a Sample Trip Package',
    ctaHref: '/contact',
    isConversion: true,
  },
  'about-us': {
    headline: 'Built by safety professionals',
    bullets: [
      'US-based team with safety industry credentials',
      'Built for schools, churches, youth sports, and businesses',
      'Backed by real-world field operations experience',
    ],
    ctaLabel: 'Read More',
    ctaHref: '/about',
  },
}

// ============================================================================
// District Content
// ============================================================================

interface DistrictContentProps {
  readonly districtId: DistrictId
}

export function DistrictContent({ districtId }: DistrictContentProps) {
  const config = MARKETING_DISTRICT_CONFIG[districtId]

  return (
    <div className="flex flex-col gap-6">
      {/* Headline */}
      <motion.h3
        className="font-sans text-[28px] font-semibold leading-tight text-[var(--color-text-primary)]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        {config.headline}
      </motion.h3>

      {/* Bullet list */}
      <motion.ul
        className="flex flex-col gap-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.08, ease: [0.4, 0, 0.2, 1] }}
      >
        {config.bullets.map((bullet, i) => (
          <li
            key={i}
            className="flex items-start gap-3 font-sans text-[20px] leading-relaxed text-[var(--color-text-secondary)]"
          >
            <span
              className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{
                backgroundColor: config.isConversion
                  ? '#F59E0B'
                  : 'var(--color-ember, #4BA467)',
              }}
              aria-hidden="true"
            />
            {bullet}
          </li>
        ))}
      </motion.ul>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.16, ease: [0.4, 0, 0.2, 1] }}
      >
        <Link
          href={config.ctaHref}
          className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-sans text-[18px] font-medium tracking-wide transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]"
          style={{
            backgroundColor: config.isConversion
              ? 'rgba(245, 158, 11, 0.15)'
              : 'rgba(var(--ember-rgb), 0.12)',
            color: config.isConversion
              ? '#F59E0B'
              : 'var(--color-ember, #4BA467)',
            border: `1px solid ${
              config.isConversion
                ? 'rgba(245, 158, 11, 0.25)'
                : 'rgba(var(--ember-rgb), 0.2)'
            }`,
          }}
        >
          {config.ctaLabel}
        </Link>
      </motion.div>
    </div>
  )
}
