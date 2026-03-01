'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AttractorGlyph } from './attractor-glyph'
import { PassphraseField } from './passphrase-field'
import { ReceiptStamp } from './receipt-stamp'
import { Scanline } from './scanline'
import { FIELD_MATERIALIZE_DURATION, RECEIPT_DISPLAY_DURATION } from './constants'

// ---------------------------------------------------------------------------
// ViewTransition helper
// ---------------------------------------------------------------------------

/**
 * Attempts to use the React 19 unstable_ViewTransition API or the
 * browser's native View Transition API. Falls back to a direct callback
 * if neither is available or if reduced motion is preferred.
 */
function startViewTransition(callback: () => void): void {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReduced) {
    callback()
    return
  }

  // Try browser-native View Transition API
  if (typeof document !== 'undefined' && 'startViewTransition' in document) {
    ;(document as unknown as { startViewTransition: (cb: () => void) => void }).startViewTransition(
      callback
    )
    return
  }

  // Fallback: direct navigation
  callback()
}

// ---------------------------------------------------------------------------
// State machine
// ---------------------------------------------------------------------------

type WelcomePhase =
  | 'idle' // Attractor glyph breathing, waiting for keypress
  | 'materializing' // Field animating in, scanline sweeping
  | 'input' // Field visible, user typing
  | 'navigating' // Receipt stamp displayed, awaiting transition

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function LoginScene() {
  const router = useRouter()

  const [phase, setPhase] = useState<WelcomePhase>('idle')
  const [passphrase, setPassphrase] = useState('')
  const [receiptTimestamp, setReceiptTimestamp] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // -------------------------------------------------------------------------
  // Activation (any-key or click)
  // -------------------------------------------------------------------------

  const activateField = useCallback(
    (initialChar?: string) => {
      if (phase !== 'idle') return
      setPassphrase(initialChar ?? '')
      setPhase('materializing')
    },
    [phase]
  )

  const handleGlobalKeyDown = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (phase !== 'idle') return

      // Only activate on alphanumeric keys (no modifiers except Shift for uppercase)
      if (e.ctrlKey || e.metaKey || e.altKey) return
      if (!/^[a-zA-Z0-9]$/.test(e.key)) return

      e.preventDefault()
      activateField(e.key)
    },
    [phase, activateField]
  )

  const handleGlyphClick = useCallback(() => {
    activateField()
  }, [activateField])

  useEffect(() => {
    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [handleGlobalKeyDown])

  // -------------------------------------------------------------------------
  // Phase: materializing -> input (after field animation completes)
  // -------------------------------------------------------------------------

  useEffect(() => {
    if (phase !== 'materializing') return

    const timer = setTimeout(() => {
      setPhase('input')
      // Focus the input after materialization completes
      inputRef.current?.focus()
    }, FIELD_MATERIALIZE_DURATION)

    return () => clearTimeout(timer)
  }, [phase])

  // -------------------------------------------------------------------------
  // Submit handler -- any input + Enter navigates to hub
  // -------------------------------------------------------------------------

  const handleSubmit = useCallback(() => {
    if (phase !== 'input') return
    if (passphrase.length === 0) return

    setReceiptTimestamp(new Date().toISOString())
    setPhase('navigating')
  }, [phase, passphrase])

  // -------------------------------------------------------------------------
  // Phase: navigating -> ViewTransition to hub
  // -------------------------------------------------------------------------

  useEffect(() => {
    if (phase !== 'navigating') return

    const timer = setTimeout(() => {
      startViewTransition(() => {
        router.push('/')
      })
    }, RECEIPT_DISPLAY_DURATION)

    return () => clearTimeout(timer)
  }, [phase, router])

  // -------------------------------------------------------------------------
  // Derived animation states
  // -------------------------------------------------------------------------

  const glyphVisible = phase === 'idle'
  const scanlineActive = phase === 'materializing'

  const fieldPhase = (() => {
    switch (phase) {
      case 'idle':
        return 'hidden' as const
      case 'materializing':
        return 'visible' as const
      case 'input':
        return 'visible' as const
      case 'navigating':
        return 'collapsed' as const
    }
  })()

  const showReceipt = phase === 'navigating'

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-void">
      {/* Attractor glyph -- breathing ember dot */}
      <AttractorGlyph visible={glyphVisible} onClick={handleGlyphClick} />

      {/* Scanline sweep -- triggered on field materialization */}
      <Scanline active={scanlineActive} />

      {/* Passphrase field */}
      <PassphraseField
        ref={inputRef}
        phase={fieldPhase}
        value={passphrase}
        onChange={setPassphrase}
        onSubmit={handleSubmit}
      />

      {/* Receipt stamp -- appears on navigation */}
      {showReceipt && (
        <div className="mt-6">
          <ReceiptStamp traceId="TREK" timestamp={receiptTimestamp} />
        </div>
      )}
    </div>
  )
}
