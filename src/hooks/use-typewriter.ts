/**
 * useTypewriter -- character-by-character text reveal hook.
 *
 * Drives a typing animation that reveals text one character at a time,
 * with configurable speed and optional delay before starting.
 *
 * @module use-typewriter
 */

'use client'

import { useEffect, useState, useRef } from 'react'

// ---------------------------------------------------------------------------
// Options
// ---------------------------------------------------------------------------

interface UseTypewriterOptions {
  /** Text to type out */
  text: string
  /** Whether the typewriter should start */
  enabled?: boolean
  /** Delay before typing starts (ms) */
  delay?: number
  /** Milliseconds per character */
  speed?: number
  /** Callback when typing completes */
  onComplete?: () => void
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useTypewriter({
  text,
  enabled = true,
  delay = 0,
  speed = 35,
  onComplete,
}: UseTypewriterOptions): {
  displayText: string
  isTyping: boolean
  isComplete: boolean
  reset: () => void
} {
  const [charIndex, setCharIndex] = useState(0)
  const [started, setStarted] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const onCompleteRef = useRef(onComplete)

  // Keep callback ref current (in effect, not during render)
  useEffect(() => {
    onCompleteRef.current = onComplete
  })

  // Check reduced motion preference
  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    )
  }, [])

  // Reset when text changes
  useEffect(() => {
    setCharIndex(0)
    setStarted(false)
  }, [text])

  // Instant reveal if reduced motion
  useEffect(() => {
    if (prefersReducedMotion && enabled) {
      setCharIndex(text.length)
      setStarted(true)
      onCompleteRef.current?.()
    }
  }, [text, enabled, prefersReducedMotion])

  // Start delay
  useEffect(() => {
    if (!enabled || prefersReducedMotion) return
    const timer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timer)
  }, [enabled, delay, prefersReducedMotion])

  // Typing loop
  useEffect(() => {
    if (!started || !enabled || prefersReducedMotion) return
    if (charIndex >= text.length) {
      onCompleteRef.current?.()
      return
    }

    const timer = setTimeout(() => {
      setCharIndex((i) => i + 1)
    }, speed)

    return () => clearTimeout(timer)
  }, [started, enabled, charIndex, text.length, speed, prefersReducedMotion])

  const isComplete = charIndex >= text.length
  const isTyping = started && !isComplete

  const reset = () => {
    setCharIndex(0)
    setStarted(false)
  }

  return {
    displayText: started ? text.slice(0, charIndex) : '',
    isTyping,
    isComplete,
    reset,
  }
}
