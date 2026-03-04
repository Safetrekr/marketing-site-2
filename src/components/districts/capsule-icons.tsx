/**
 * CapsuleIcons -- thin-stroke 24x24 SVG icons for each district capsule.
 *
 * All icons use strokeWidth 1, line-art style, currentColor for fill/stroke
 * so they inherit opacity and color from the parent context.
 *
 * @module capsule-icons
 */

import type { DistrictId } from '@/lib/interfaces/district'

interface IconProps {
  className?: string
  size?: number
}

/** Circuit Sequence — 3 connected circles (process flow) */
function HowItWorksIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="4" cy="12" r="2.5" stroke="currentColor" strokeWidth={1} />
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth={1} />
      <circle cx="20" cy="12" r="2.5" stroke="currentColor" strokeWidth={1} />
      <line x1="6.5" y1="12" x2="9.5" y2="12" stroke="currentColor" strokeWidth={1} />
      <line x1="14.5" y1="12" x2="17.5" y2="12" stroke="currentColor" strokeWidth={1} />
    </svg>
  )
}

/** Shield Figures — shield outline with 2 small figure marks */
function WhoItsForIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2L4 6v5c0 5.25 3.4 10.2 8 12 4.6-1.8 8-6.75 8-12V6l-8-4z"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="10" r="1" stroke="currentColor" strokeWidth={0.8} />
      <circle cx="14.5" cy="10" r="1" stroke="currentColor" strokeWidth={0.8} />
      <line x1="9.5" y1="11" x2="9.5" y2="13.5" stroke="currentColor" strokeWidth={0.8} />
      <line x1="14.5" y1="11" x2="14.5" y2="13.5" stroke="currentColor" strokeWidth={0.8} />
    </svg>
  )
}

/** Grid Matrix — 3x3 connected dot grid, center node filled */
function PlatformIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      {/* Grid dots */}
      <circle cx="6" cy="6" r="1.5" stroke="currentColor" strokeWidth={1} />
      <circle cx="12" cy="6" r="1.5" stroke="currentColor" strokeWidth={1} />
      <circle cx="18" cy="6" r="1.5" stroke="currentColor" strokeWidth={1} />
      <circle cx="6" cy="12" r="1.5" stroke="currentColor" strokeWidth={1} />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="currentColor" strokeWidth={1} />
      <circle cx="18" cy="12" r="1.5" stroke="currentColor" strokeWidth={1} />
      <circle cx="6" cy="18" r="1.5" stroke="currentColor" strokeWidth={1} />
      <circle cx="12" cy="18" r="1.5" stroke="currentColor" strokeWidth={1} />
      <circle cx="18" cy="18" r="1.5" stroke="currentColor" strokeWidth={1} />
      {/* Connect center to edges */}
      <line x1="7.5" y1="12" x2="10.5" y2="12" stroke="currentColor" strokeWidth={0.5} />
      <line x1="13.5" y1="12" x2="16.5" y2="12" stroke="currentColor" strokeWidth={0.5} />
      <line x1="12" y1="7.5" x2="12" y2="10.5" stroke="currentColor" strokeWidth={0.5} />
      <line x1="12" y1="13.5" x2="12" y2="16.5" stroke="currentColor" strokeWidth={0.5} />
    </svg>
  )
}

/** Lock Scan — padlock with horizontal scan lines */
function SecurityIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="6" y="10" width="12" height="10" rx="2" stroke="currentColor" strokeWidth={1} />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth={1} strokeLinecap="round" />
      <line x1="7" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth={0.5} opacity={0.5} />
      <line x1="7" y1="16.5" x2="17" y2="16.5" stroke="currentColor" strokeWidth={0.5} opacity={0.5} />
    </svg>
  )
}

/** Signal Tiers — 3 ascending bars (tier levels) */
function PricingIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="4" y="14" width="4" height="6" rx="1" stroke="currentColor" strokeWidth={1} />
      <rect x="10" y="10" width="4" height="10" rx="1" stroke="currentColor" strokeWidth={1} />
      <rect x="16" y="5" width="4" height="15" rx="1" stroke="currentColor" strokeWidth={1} />
    </svg>
  )
}

/** Launch Vector — upward chevron with orbit ring */
function GetStartedIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth={1} />
      <polyline points="8,14 12,8 16,14" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Beacon Pulse — simplified shield with radiating arcs */
function AboutUsIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 3L6 6v4c0 4.5 2.6 8.7 6 10.5 3.4-1.8 6-6 6-10.5V6l-6-3z"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinejoin="round"
      />
      <path d="M8 8.5a5.5 5.5 0 0 1 4-2" stroke="currentColor" strokeWidth={0.7} opacity={0.5} />
      <path d="M7 7a7 7 0 0 1 5-2.5" stroke="currentColor" strokeWidth={0.5} opacity={0.3} />
    </svg>
  )
}

/** Map from DistrictId to its icon component. */
const ICON_MAP: Record<DistrictId, (props: IconProps) => React.JSX.Element> = {
  'how-it-works': HowItWorksIcon,
  'who-its-for': WhoItsForIcon,
  'platform': PlatformIcon,
  'security': SecurityIcon,
  'pricing': PricingIcon,
  'get-started': GetStartedIcon,
  'about-us': AboutUsIcon,
}

export interface CapsuleIconProps {
  districtId: DistrictId
  className?: string
  size?: number
}

export function CapsuleIcon({ districtId, className, size = 24 }: CapsuleIconProps) {
  const IconComponent = ICON_MAP[districtId]
  return <IconComponent className={className} size={size} />
}
