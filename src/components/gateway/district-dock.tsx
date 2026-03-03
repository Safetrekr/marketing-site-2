/**
 * DistrictDock -- bottom row of 64×64 icon-only district buttons.
 *
 * Each button links directly to /launch?district={id}, bypassing
 * the intermediate ZUI landing. Buttons appear one at a time with
 * staggered entrance animation and have a living, breathing glow.
 *
 * Icons are inline SVGs themed to each district's purpose.
 *
 * @module district-dock
 */

'use client'

import { useCallback, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useRouter } from 'next/navigation'

import { useGatewayStore, type GatewayPhase } from '@/stores/gateway.store'

// ---------------------------------------------------------------------------
// District definitions for dock
// ---------------------------------------------------------------------------

interface DockDistrict {
  id: string
  icon: React.ReactNode
}

// ---------------------------------------------------------------------------
// SVG Icons -- minimal 24×24 line icons for each district
// ---------------------------------------------------------------------------

const ICON_STYLE: React.SVGProps<SVGSVGElement> = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

// How It Works -- workflow/steps icon
function HowItWorksIcon() {
  return (
    <svg {...ICON_STYLE}>
      <path d="M4 6h16M4 12h10M4 18h6" />
      <circle cx={20} cy={12} r={2} />
      <circle cx={14} cy={18} r={2} />
    </svg>
  )
}

// Who It's For -- people/audience icon
function WhoItsForIcon() {
  return (
    <svg {...ICON_STYLE}>
      <circle cx={9} cy={7} r={3} />
      <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
      <circle cx={17} cy={10} r={2} />
      <path d="M21 21v-1a3 3 0 00-2-2.83" />
    </svg>
  )
}

// Platform -- dashboard/grid icon
function PlatformIcon() {
  return (
    <svg {...ICON_STYLE}>
      <rect x={3} y={3} width={7} height={9} rx={1} />
      <rect x={14} y={3} width={7} height={5} rx={1} />
      <rect x={3} y={15} width={7} height={6} rx={1} />
      <rect x={14} y={11} width={7} height={10} rx={1} />
    </svg>
  )
}

// Security -- shield/lock icon
function SecurityIcon() {
  return (
    <svg {...ICON_STYLE}>
      <path d="M12 2l8 4v6c0 5.25-3.5 9.74-8 11-4.5-1.26-8-5.75-8-11V6l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

// Pricing -- tag/price icon
function PricingIcon() {
  return (
    <svg {...ICON_STYLE}>
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  )
}

// Get Started -- arrow/launch icon
function GetStartedIcon() {
  return (
    <svg {...ICON_STYLE}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Dock districts
// ---------------------------------------------------------------------------

const DOCK_DISTRICTS: DockDistrict[] = [
  { id: 'how-it-works', icon: <HowItWorksIcon /> },
  { id: 'who-its-for', icon: <WhoItsForIcon /> },
  { id: 'platform', icon: <PlatformIcon /> },
  { id: 'security', icon: <SecurityIcon /> },
  { id: 'pricing', icon: <PricingIcon /> },
  { id: 'get-started', icon: <GetStartedIcon /> },
]

// ---------------------------------------------------------------------------
// Visibility
// ---------------------------------------------------------------------------

function shouldShow(phase: GatewayPhase): boolean {
  return phase === 'revealing' || phase === 'ambient'
}

function isExiting(phase: GatewayPhase): boolean {
  return phase === 'transitioning' || phase === 'exited'
}

// ---------------------------------------------------------------------------
// Stagger hook: reveals items one at a time
// ---------------------------------------------------------------------------

function useStaggeredReveal(count: number, enabled: boolean, interval: number = 200): number {
  const [revealed, setRevealed] = useState(0)

  useEffect(() => {
    if (!enabled) {
      setRevealed(0)
      return
    }

    if (revealed >= count) return

    const timer = setTimeout(() => {
      setRevealed((r) => r + 1)
    }, interval)

    return () => clearTimeout(timer)
  }, [enabled, revealed, count, interval])

  return revealed
}

// ---------------------------------------------------------------------------
// Single dock button
// ---------------------------------------------------------------------------

interface DockButtonProps {
  district: DockDistrict
  index: number
  onClick: (id: string) => void
}

function DockButton({ district, index, onClick }: DockButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 16, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="gateway-dock-breathe"
      style={{
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(var(--ambient-ink-rgb), 0.03)',
        border: '1px solid rgba(var(--ambient-ink-rgb), 0.08)',
        borderRadius: 8,
        color: 'rgba(var(--ember-rgb), 0.40)',
        cursor: 'pointer',
        backdropFilter: 'blur(8px)',
        transition: 'color 200ms ease, border-color 200ms ease, background 200ms ease',
      }}
      onClick={() => onClick(district.id)}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.color = 'rgba(var(--ember-rgb), 0.80)'
        el.style.borderColor = 'rgba(var(--ember-rgb), 0.20)'
        el.style.background = 'rgba(var(--ambient-ink-rgb), 0.06)'
        el.classList.remove('gateway-dock-breathe')
        el.style.boxShadow =
          '0 0 24px rgba(75, 164, 103, 0.12), inset 0 0 12px rgba(75, 164, 103, 0.06)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.color = 'rgba(var(--ember-rgb), 0.40)'
        el.style.borderColor = 'rgba(var(--ambient-ink-rgb), 0.08)'
        el.style.background = 'rgba(var(--ambient-ink-rgb), 0.03)'
        el.classList.add('gateway-dock-breathe')
        el.style.boxShadow = ''
      }}
      aria-label={`Open ${district.id.replace(/-/g, ' ')}`}
    >
      {district.icon}
    </motion.button>
  )
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function DistrictDock() {
  const phase = useGatewayStore((s) => s.phase)
  const selectDestination = useGatewayStore((s) => s.selectDestination)
  const router = useRouter()

  const visible = shouldShow(phase)
  const exiting = isExiting(phase)
  const revealedCount = useStaggeredReveal(DOCK_DISTRICTS.length, visible, 150)

  const handleClick = useCallback(
    (districtId: string) => {
      selectDestination('mission-control')
      setTimeout(() => {
        router.push(`/launch?district=${districtId}`)
      }, 600)
    },
    [selectDestination, router],
  )

  if (!visible && !exiting) return null

  return (
    <motion.div
      className="fixed bottom-6 left-0 right-0 z-40 flex justify-center"
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        style={{
          display: 'flex',
          gap: 8,
          padding: '6px 12px',
          borderRadius: 16,
          background: 'rgba(var(--ambient-ink-rgb), 0.02)',
          border: '1px solid rgba(var(--ambient-ink-rgb), 0.04)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <AnimatePresence>
          {DOCK_DISTRICTS.slice(0, revealedCount).map((district, i) => (
            <DockButton
              key={district.id}
              district={district}
              index={i}
              onClick={handleClick}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
