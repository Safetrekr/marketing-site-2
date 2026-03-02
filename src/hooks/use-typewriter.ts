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
} {
  const [charIndex, setCharIndex] = useState(0)
  const [started, setStarted] = useState(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  // Reset when text changes
  useEffect(() => {
    setCharIndex(0)
    setStarted(false)
  }, [text])

  // Start delay
  useEffect(() => {
    if (!enabled) return
    const timer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timer)
  }, [enabled, delay])

  // Typing loop
  useEffect(() => {
    if (!started || !enabled) return
    if (charIndex >= text.length) {
      onCompleteRef.current?.()
      return
    }

    const timer = setTimeout(() => {
      setCharIndex((i) => i + 1)
    }, speed)

    return () => clearTimeout(timer)
  }, [started, enabled, charIndex, text.length, speed])

  const isComplete = charIndex >= text.length
  const isTyping = started && !isComplete

  return {
    displayText: started ? text.slice(0, charIndex) : '',
    isTyping,
    isComplete,
  }
}
