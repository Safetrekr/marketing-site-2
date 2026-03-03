// src/app/(marketing)/legal/layout.tsx

import type { ReactNode } from 'react'
import '@/styles/legal-prose.css'

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
      {children}
    </div>
  )
}
