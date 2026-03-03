'use client'

// src/components/marketing/marketing-particle-field.tsx
//
// Simplified HTML5 Canvas particle animation for marketing pages.
// No spatial engine dependencies. Reads --ember-rgb CSS variable
// for color-scheme-aware rendering.

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Default fallback ember RGB (safetrekr green) */
const FALLBACK_EMBER_RGB = '75, 164, 103'

/** Shimmer period range in seconds */
const SHIMMER_PERIOD_MIN = 8
const SHIMMER_PERIOD_MAX = 12

/** Brownian drift speed range in px/sec */
const DRIFT_SPEED_MIN = 0.3
const DRIFT_SPEED_MAX = 1.2

/** Edge wrap margin in CSS pixels */
const WRAP_MARGIN = 20

// ---------------------------------------------------------------------------
// Particle type
// ---------------------------------------------------------------------------

interface Particle {
  x: number
  y: number
  size: number
  vx: number
  vy: number
  maxSpeed: number
  shimmerPeriod: number
  shimmerPhase: number
}

// ---------------------------------------------------------------------------
// Deterministic seeded random for reduced-motion initial positions
// ---------------------------------------------------------------------------

function seededRandom(seed: number): number {
  let t = (seed + 0x6d2b79f5) | 0
  t = Math.imul(t ^ (t >>> 15), t | 1)
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

// ---------------------------------------------------------------------------
// Size distribution: 60% small, 25% medium, 15% large
// ---------------------------------------------------------------------------

function getSizeForIndex(index: number, total: number): number {
  const fraction = index / total
  if (fraction < 0.6) return 1.5
  if (fraction < 0.85) return 2.5
  return 4
}

// ---------------------------------------------------------------------------
// Create particles
// ---------------------------------------------------------------------------

function createParticles(
  width: number,
  height: number,
  count: number,
): Particle[] {
  const particles: Particle[] = []

  for (let i = 0; i < count; i++) {
    const size = getSizeForIndex(i, count)
    const speedScale = 1 - (size - 1.5) / (4 - 1.5)
    const maxSpeed = DRIFT_SPEED_MIN + speedScale * (DRIFT_SPEED_MAX - DRIFT_SPEED_MIN)

    particles.push({
      x: seededRandom(i * 3 + 1) * width,
      y: seededRandom(i * 3 + 2) * height,
      size,
      vx: (seededRandom(i * 5 + 10) - 0.5) * maxSpeed,
      vy: (seededRandom(i * 5 + 11) - 0.5) * maxSpeed,
      maxSpeed,
      shimmerPeriod:
        SHIMMER_PERIOD_MIN +
        seededRandom(i * 7 + 20) * (SHIMMER_PERIOD_MAX - SHIMMER_PERIOD_MIN),
      shimmerPhase: seededRandom(i * 7 + 21) * Math.PI * 2,
    })
  }

  return particles
}

// ---------------------------------------------------------------------------
// Setup canvas helper (pure function, no hooks)
// ---------------------------------------------------------------------------

function setupCanvasSize(
  canvas: HTMLCanvasElement,
  particleCount: number,
): { particles: Particle[]; emberColor: string } {
  const dpr = window.devicePixelRatio || 1
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr

  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.scale(dpr, dpr)
  }

  // Read ember color from CSS variable
  const computedStyle = getComputedStyle(canvas)
  const emberRGB = computedStyle.getPropertyValue('--ember-rgb').trim()

  return {
    particles: createParticles(rect.width, rect.height, particleCount),
    emberColor: emberRGB || FALLBACK_EMBER_RGB,
  }
}

// ---------------------------------------------------------------------------
// Render a single static frame (for reduced motion)
// ---------------------------------------------------------------------------

function renderStaticParticles(
  canvas: HTMLCanvasElement,
  particles: Particle[],
  emberColor: string,
  opacityMin: number,
  opacityMax: number,
): void {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const dpr = window.devicePixelRatio || 1
  const width = canvas.width / dpr
  const height = canvas.height / dpr

  ctx.clearRect(0, 0, width, height)

  const midOpacity = (opacityMin + opacityMax) / 2

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${emberColor}, ${midOpacity})`
    ctx.fill()
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface MarketingParticleFieldProps {
  /** Number of particles. Default: 12 */
  particleCount?: number
  /** Opacity range [min, max]. Default: [0.01, 0.05] */
  opacityRange?: [number, number]
  /** Additional CSS classes for the canvas container */
  className?: string
}

export function MarketingParticleField({
  particleCount = 12,
  opacityRange = [0.01, 0.05],
  className,
}: MarketingParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [opacityMin, opacityMax] = opacityRange

  // Single effect handles the entire lifecycle: setup, animation, resize, cleanup
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    // Setup
    let { particles, emberColor } = setupCanvasSize(canvas, particleCount)

    if (prefersReducedMotion) {
      renderStaticParticles(canvas, particles, emberColor, opacityMin, opacityMax)

      // Handle resize for static frame
      let resizeTimeout: ReturnType<typeof setTimeout> | null = null
      const handleResize = () => {
        if (resizeTimeout) clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(() => {
          const result = setupCanvasSize(canvas, particleCount)
          particles = result.particles
          emberColor = result.emberColor
          renderStaticParticles(canvas, particles, emberColor, opacityMin, opacityMax)
        }, 200)
      }

      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
        if (resizeTimeout) clearTimeout(resizeTimeout)
      }
    }

    // Animation state
    let lastTime = 0
    let rafId = 0

    function tick(timestamp: number) {
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const dpr = window.devicePixelRatio || 1
      const width = canvas.width / dpr
      const height = canvas.height / dpr

      // Calculate delta time
      const dt =
        lastTime === 0
          ? 0.016
          : Math.min((timestamp - lastTime) / 1000, 0.1)
      lastTime = timestamp

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      const now = timestamp / 1000

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Brownian perturbation
        if (dt > 0) {
          p.vx += (Math.random() - 0.5) * 0.4
          p.vy += (Math.random() - 0.5) * 0.4

          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
          if (speed > p.maxSpeed) {
            p.vx = (p.vx / speed) * p.maxSpeed
            p.vy = (p.vy / speed) * p.maxSpeed
          }

          p.x += p.vx * dt
          p.y += p.vy * dt

          // Wrap at edges
          if (p.x < -WRAP_MARGIN) p.x = width + WRAP_MARGIN
          if (p.x > width + WRAP_MARGIN) p.x = -WRAP_MARGIN
          if (p.y < -WRAP_MARGIN) p.y = height + WRAP_MARGIN
          if (p.y > height + WRAP_MARGIN) p.y = -WRAP_MARGIN
        }

        // Shimmer opacity
        const shimmerT = Math.sin(
          (now * Math.PI * 2) / p.shimmerPeriod + p.shimmerPhase,
        )
        const opacity =
          opacityMin + ((shimmerT + 1) / 2) * (opacityMax - opacityMin)

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${emberColor}, ${opacity})`
        ctx.fill()
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    // Handle resize for animated mode
    let resizeTimeout: ReturnType<typeof setTimeout> | null = null
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        const result = setupCanvasSize(canvas, particleCount)
        particles = result.particles
        emberColor = result.emberColor
      }, 200)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
      if (resizeTimeout) clearTimeout(resizeTimeout)
    }
  }, [particleCount, opacityMin, opacityMax])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn('pointer-events-none', className)}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
      }}
    />
  )
}
