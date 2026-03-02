/**
 * GatewayHeader -- mission control telemetry header bar.
 *
 * Appears after the boot sequence completes (revealing/ambient phase).
 * Shows live-updating telemetry stats in the TopTelemetryBar style:
 * frequency, trace ID, epoch counter, uplink signal, district count.
 *
 * Slides in from top with staggered stat reveals.
 *
 * @module gateway-header
 */

'use client'

import { memo, useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

import { useGatewayStore, type GatewayPhase } from '@/stores/gateway.store'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const LABEL_COLOR = 'rgba(var(--ambient-ink-rgb), 0.30)'
const VALUE_COLOR = 'rgba(var(--ambient-ink-rgb), 0.50)'
const ACCENT_COLOR = 'rgba(var(--ember-rgb), 0.40)'
const SEPARATOR_COLOR = 'rgba(var(--ambient-ink-rgb), 0.08)'
const DOT_ACTIVE = 'rgba(var(--ember-rgb), 0.50)'
const DOT_DIM = 'rgba(var(--ambient-ink-rgb), 0.10)'

const FONT_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-mono, monospace)',
  fontSize: 8,
  fontWeight: 500,
  letterSpacing: '0.08em',
  lineHeight: 1,
  textTransform: 'uppercase',
}

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
// Live epoch counter
// ---------------------------------------------------------------------------

function useEpochCounter(): string {
  const [epoch, setEpoch] = useState('--------')

  useEffect(() => {
    setEpoch(Math.floor(Date.now() / 1000).toString(16).toUpperCase())
    const interval = setInterval(() => {
      setEpoch(Math.floor(Date.now() / 1000).toString(16).toUpperCase())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return epoch
}

// ---------------------------------------------------------------------------
// Cycling frequency
// ---------------------------------------------------------------------------

const FREQUENCIES = [
  '11.434 GHz',
  '2.4117 GHz',
  '54.521 MHz',
  '8.100 MHz',
  '3.005 GHz',
]

function useCyclingFrequency(): string {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % FREQUENCIES.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return FREQUENCIES[index]
}

// ---------------------------------------------------------------------------
// Random trace
// ---------------------------------------------------------------------------

function useRandomTrace(): string {
  const [trace, setTrace] = useState('7F2A.B91C')

  useEffect(() => {
    const interval = setInterval(() => {
      const a = Math.random().toString(16).substring(2, 6).toUpperCase()
      const b = Math.random().toString(16).substring(2, 6).toUpperCase()
      setTrace(`${a}.${b}`)
    }, 12000)
    return () => clearInterval(interval)
  }, [])

  return trace
}

// ---------------------------------------------------------------------------
// Signal dots
// ---------------------------------------------------------------------------

function SignalDots() {
  const [strength, setStrength] = useState(4)

  useEffect(() => {
    const interval = setInterval(() => {
      setStrength(3 + Math.floor(Math.random() * 3))
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 2,
            height: 2 + i * 1.5,
            backgroundColor: i < strength ? DOT_ACTIVE : DOT_DIM,
            borderRadius: 0.5,
            transition: 'background-color 600ms ease',
          }}
        />
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Frame sync bars
// ---------------------------------------------------------------------------

function FrameSyncBars() {
  const barsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf: number
    const animate = () => {
      if (barsRef.current) {
        const children = barsRef.current.children
        const t = performance.now() / 1000
        for (let i = 0; i < children.length; i++) {
          const el = children[i] as HTMLElement
          const h = 3 + Math.sin(t * 2.5 + i * 0.8) * 3
          el.style.height = `${h}px`
        }
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div ref={barsRef} style={{ display: 'flex', gap: 1, alignItems: 'flex-end', height: 8 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 1.5,
            height: 4,
            backgroundColor: ACCENT_COLOR,
            borderRadius: 0.5,
          }}
        />
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const GatewayHeader = memo(function GatewayHeader() {
  const phase = useGatewayStore((s) => s.phase)
  const epoch = useEpochCounter()
  const frequency = useCyclingFrequency()
  const trace = useRandomTrace()

  const visible = shouldShow(phase)
  const exiting = isExiting(phase)

  if (!visible && !exiting) return null

  return (
    <motion.div
      className="fixed left-0 right-0 z-40"
      style={{
        top: 14,
        height: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32,
        pointerEvents: 'none',
        borderBottom: `1px solid ${SEPARATOR_COLOR}`,
      }}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: exiting ? 0 : 1, y: exiting ? -12 : 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Left cluster */}
      <div className="hidden sm:flex" style={{ alignItems: 'center', gap: 16 }}>
        <FrameSyncBars />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ ...FONT_STYLE, color: LABEL_COLOR }}>FREQ</span>
          <span style={{ ...FONT_STYLE, color: VALUE_COLOR, fontSize: 9 }}>
            {frequency}
          </span>
        </div>
        <div
          style={{
            width: 1,
            height: 10,
            backgroundColor: SEPARATOR_COLOR,
          }}
        />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ ...FONT_STYLE, color: LABEL_COLOR }}>TRACE</span>
          <span style={{ ...FONT_STYLE, color: VALUE_COLOR, fontSize: 9 }}>
            {trace}
          </span>
        </div>
      </div>

      {/* Center: Mission ID */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div
          className="enrichment-rec-pulse"
          style={{
            width: 3,
            height: 3,
            borderRadius: '50%',
            backgroundColor: DOT_ACTIVE,
          }}
        />
        <span style={{ ...FONT_STYLE, color: LABEL_COLOR, fontSize: 7 }}>
          SAFETREKR // MISSION CONTROL
        </span>
        <div
          className="enrichment-rec-pulse"
          style={{
            width: 3,
            height: 3,
            borderRadius: '50%',
            backgroundColor: DOT_ACTIVE,
          }}
        />
      </div>

      {/* Right cluster */}
      <div className="hidden sm:flex" style={{ alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ ...FONT_STYLE, color: LABEL_COLOR }}>EPOCH</span>
          <span style={{ ...FONT_STYLE, color: VALUE_COLOR, fontSize: 9 }}>
            {epoch}
          </span>
        </div>
        <div
          style={{
            width: 1,
            height: 10,
            backgroundColor: SEPARATOR_COLOR,
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ ...FONT_STYLE, color: LABEL_COLOR }}>UPLINK</span>
          <SignalDots />
        </div>
      </div>
    </motion.div>
  )
})
