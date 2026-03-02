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

// Agent Builder -- bot/agent icon
function AgentIcon() {
  return (
    <svg {...ICON_STYLE}>
      <rect x={4} y={4} width={16} height={12} rx={2} />
      <circle cx={9} cy={10} r={1} fill="currentColor" stroke="none" />
      <circle cx={15} cy={10} r={1} fill="currentColor" stroke="none" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  )
}

// Tarva Chat -- chat bubble
function ChatIcon() {
  return (
    <svg {...ICON_STYLE}>
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      <path d="M8 10h8M8 13h4" opacity={0.5} />
    </svg>
  )
}

// Project Room -- grid/kanban
function ProjectIcon() {
  return (
    <svg {...ICON_STYLE}>
      <rect x={3} y={3} width={7} height={9} rx={1} />
      <rect x={14} y={3} width={7} height={5} rx={1} />
      <rect x={3} y={15} width={7} height={6} rx={1} />
      <rect x={14} y={11} width={7} height={10} rx={1} />
    </svg>
  )
}

// TarvaCORE -- hexagon/core
function CoreIcon() {
  return (
    <svg {...ICON_STYLE}>
      <path d="M12 2l8.5 5v10L12 22l-8.5-5V7z" />
      <circle cx={12} cy={12} r={3} />
    </svg>
  )
}

// TarvaERP -- chart/analytics
function ERPIcon() {
  return (
    <svg {...ICON_STYLE}>
      <path d="M3 3v18h18" />
      <path d="M7 16l4-5 4 3 5-7" />
      <circle cx={7} cy={16} r={0.8} fill="currentColor" stroke="none" />
      <circle cx={11} cy={11} r={0.8} fill="currentColor" stroke="none" />
      <circle cx={15} cy={14} r={0.8} fill="currentColor" stroke="none" />
      <circle cx={20} cy={7} r={0.8} fill="currentColor" stroke="none" />
    </svg>
  )
}

// tarvaCODE -- terminal/code
function CodeIcon() {
  return (
    <svg {...ICON_STYLE}>
      <polyline points="4 17 10 11 4 5" />
      <line x1={12} y1={19} x2={20} y2={19} />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Dock districts
// ---------------------------------------------------------------------------

const DOCK_DISTRICTS: DockDistrict[] = [
  { id: 'agent-builder', icon: <AgentIcon /> },
  { id: 'tarva-chat', icon: <ChatIcon /> },
  { id: 'project-room', icon: <ProjectIcon /> },
  { id: 'tarva-core', icon: <CoreIcon /> },
  { id: 'tarva-erp', icon: <ERPIcon /> },
  { id: 'tarva-code', icon: <CodeIcon /> },
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
