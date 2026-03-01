/**
 * ThemeModeSwitcher -- tiny pill toggle in the top-left area
 * that lets the user switch between safetrekr light and dark modes.
 * Persists choice via next-themes (localStorage).
 *
 * @module theme-mode-switcher
 */

'use client'

import { useCallback, useEffect, useState } from 'react'
import { useTheme } from '@/components/providers/theme-provider'

const MODES = [
  { id: 'dark', label: 'DARK', dot: '#4ba467' },
  { id: 'light', label: 'LIGHT', dot: '#4ba467' },
] as const

export function ColorSchemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const resolvedTheme = theme === 'dark' ? 'dark' : 'light'

  const toggle = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }, [resolvedTheme, setTheme])

  // Use a stable default for SSR to avoid hydration mismatch
  const current = mounted
    ? (MODES.find((m) => m.id === resolvedTheme) ?? MODES[0])
    : MODES[0]

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] font-medium tracking-[0.06em] uppercase transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)] border-white/8 bg-deep/60 text-text-secondary backdrop-blur-[8px] hover:border-white/12 hover:bg-deep/80"
      aria-label={`Theme: ${current.label}. Click to switch.`}
    >
      <div
        style={{
          width: 5,
          height: 5,
          borderRadius: '50%',
          backgroundColor: current.dot,
          boxShadow: `0 0 6px ${current.dot}60`,
        }}
      />
      {current.label}
    </button>
  )
}
