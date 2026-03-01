/**
 * ColorSchemeSwitcher -- tiny pill toggle in the top-right corner
 * that lets the user switch between tarva-core (orange) and safetrekr (green)
 * color schemes. Always stays in dark mode. Persists choice in localStorage.
 *
 * @module color-scheme-switcher
 */

'use client'

import { useCallback, useEffect } from 'react'
import { useTarvaTheme } from '@/components/providers/theme-provider'
import type { ColorScheme } from '@tarva/ui'

const STORAGE_KEY = 'tarva-launch-color-scheme'

const SCHEMES: { id: ColorScheme; label: string; dot: string }[] = [
  { id: 'safetrekr', label: 'TREK', dot: '#22c55e' },
  { id: 'tarva-core', label: 'TARVA', dot: '#e05200' },
]

export function ColorSchemeSwitcher() {
  const { colorScheme, setColorScheme } = useTarvaTheme()

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ColorScheme | null
    if (stored && SCHEMES.some((s) => s.id === stored) && stored !== colorScheme) {
      setColorScheme(stored)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps -- run once on mount

  const cycle = useCallback(() => {
    const currentIdx = SCHEMES.findIndex((s) => s.id === colorScheme)
    const next = SCHEMES[(currentIdx + 1) % SCHEMES.length]
    setColorScheme(next.id)
    localStorage.setItem(STORAGE_KEY, next.id)
  }, [colorScheme, setColorScheme])

  const current = SCHEMES.find((s) => s.id === colorScheme) ?? SCHEMES[0]

  return (
    <button
      onClick={cycle}
      className="pointer-events-auto fixed top-4 left-[140px] z-40 flex items-center gap-2 rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1.5 font-mono text-[9px] font-medium tracking-[0.1em] uppercase transition-all duration-200 hover:border-white/[0.12] hover:bg-white/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)]"
      style={{ color: 'rgba(255, 255, 255, 0.35)' }}
      aria-label={`Color scheme: ${current.label}. Click to switch.`}
    >
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: current.dot,
          boxShadow: `0 0 6px ${current.dot}60`,
          transition: 'background-color 300ms ease, box-shadow 300ms ease',
        }}
      />
      {current.label}
    </button>
  )
}
